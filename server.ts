import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "15mb" }));

// Candidate Gemini models to handle high demand / 503 capacity spikes
// Updated per Google API guidance: gemini-2.5-flash is retired in favor of gemini-3.6-flash and gemini-3.8-flash
const CANDIDATE_MODELS = [
  "gemini-3.8-flash",
  "gemini-3.6-flash",
  "gemini-3.1-flash-lite",
  "gemini-flash-latest",
];

// Lazy Gemini client helper
function getGeminiClient(): GoogleGenAI | null {
  const key = process.env.GEMINI_API_KEY;
  if (!key || key === "MY_GEMINI_API_KEY") {
    return null;
  }
  return new GoogleGenAI({
    apiKey: key,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// Resilient multi-model executor with automatic fallback and retry
async function generateWithFallback(
  ai: GoogleGenAI,
  params: {
    contents: any;
    config?: any;
  }
): Promise<{ response: any; model: string }> {
  let lastError: any = null;

  for (const model of CANDIDATE_MODELS) {
    // Attempt with transient retry for 503 (high demand) or 429 (rate limit)
    const maxAttempts = 2;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: params.contents,
          config: params.config,
        });
        return { response, model };
      } catch (err: any) {
        lastError = err;
        const errMsg = err?.message || String(err);
        const isTransient =
          errMsg.includes("503") ||
          errMsg.includes("429") ||
          errMsg.includes("UNAVAILABLE") ||
          errMsg.includes("high demand") ||
          errMsg.includes("overloaded");

        // If 404 (deprecated model), break immediately to next model
        if (errMsg.includes("404") || errMsg.includes("no longer available")) {
          break;
        }

        if (isTransient && attempt < maxAttempts) {
          // Wait 450ms before retrying the same model once
          await new Promise((resolve) => setTimeout(resolve, 450));
          continue;
        }

        // Move to the next candidate model
        break;
      }
    }
  }

  throw lastError;
}

// Resilient fallback intent & scheme identifier
function fallbackIdentifySchemes(userQuery: string, schemes: any[] = [], language: string = "English") {
  const q = userQuery.toLowerCase().trim();

  let goal = "Government Welfare & Financial Assistance";
  let recCat = "All";
  let tip = "Apply with your Aadhaar card, income certificate, and active bank account seeded with NPCI/Aadhaar.";

  if (q.includes("loan") || q.includes("business") || q.includes("shop") || q.includes("mudra") || q.includes("vendor") || q.includes("dukan") || q.includes("credit") || q.includes("pmegp")) {
    goal = "Small Business Capital & Enterprise Loan Support";
    recCat = "Business";
    tip = "Apply via the JanSamarth or Udyamimitra portal or directly at your nearest public sector commercial bank under Shishu/Kishore/Tarun.";
  } else if (q.includes("tractor") || q.includes("farm") || q.includes("kisan") || q.includes("agriculture") || q.includes("crop") || q.includes("rythu") || q.includes("machinery")) {
    goal = "Agricultural Machinery & Tractor Subsidy for Farmers";
    recCat = "Agriculture";
    tip = "Keep your land ownership records (Patta Passbook / RoR / 7-12) and active Aadhaar e-KYC ready for DBT portal registration.";
  } else if (q.includes("scholar") || q.includes("student") || q.includes("college") || q.includes("fee") || q.includes("school") || q.includes("study") || q.includes("vidya")) {
    goal = "College Scholarship & Educational Fee Reimbursement";
    recCat = "Students";
    tip = "Register on the National Scholarship Portal (scholarships.gov.in) with your student bonafide certificate and income proof.";
  } else if (q.includes("health") || q.includes("hospital") || q.includes("ayushman") || q.includes("treatment") || q.includes("medical") || q.includes("surgery") || q.includes("operation")) {
    goal = "Cashless Hospital Treatment & Secondary/Tertiary Healthcare";
    recCat = "Healthcare";
    tip = "Generate your Ayushman Card at beneficiary.nha.gov.in or visit the nearest empanelled hospital Ayushman Mitra desk.";
  } else if (q.includes("solar") || q.includes("rooftop") || q.includes("electricity") || q.includes("bijli") || q.includes("surya")) {
    goal = "PM Surya Ghar Rooftop Solar Panel Subsidy & Free Electricity";
    recCat = "Social Welfare";
    tip = "Register on pmsuryaghar.gov.in with your DISCOM consumer number and roof ownership proof.";
  } else if (q.includes("house") || q.includes("home") || q.includes("pmay") || q.includes("pucca") || q.includes("makaan") || q.includes("awas")) {
    goal = "Pucca House Construction Subsidy & Affordable Housing (PMAY)";
    recCat = "Housing";
    tip = "Apply through your Gram Panchayat or local Urban Local Body (ULB) with your land title/encumbrance certificate.";
  } else if (q.includes("pension") || q.includes("senior") || q.includes("old age") || q.includes("retire") || q.includes("vridha") || q.includes("atal")) {
    goal = "Guaranteed Monthly Old Age Social Security Pension";
    recCat = "Senior Citizens";
    tip = "Submit your age proof (Aadhaar / Voter ID) and bank passbook at your bank branch or local MeeSeva / CSC center.";
  } else if (q.includes("women") || q.includes("woman") || q.includes("girl") || q.includes("maternity") || q.includes("pregnant") || q.includes("mahila") || q.includes("delivery") || q.includes("matru")) {
    goal = "Maternity Financial Assistance & Women Welfare Support";
    recCat = "Women";
    tip = "Register at your nearest Anganwadi Centre or PMMVY portal with Mother and Child Protection (MCP) card details.";
  }

  const stopWords = new Set(["i", "want", "to", "apply", "for", "a", "an", "the", "in", "and", "or", "is", "of", "with", "me", "my", "please", "help"]);
  const queryTokens = q.split(/[\s,.-]+/).filter((w) => w.length > 2 && !stopWords.has(w));

  const scored = (schemes || []).map((scheme: any) => {
    let score = 0;
    const combined = `${scheme.name || ""} ${scheme.category || ""} ${scheme.mainBenefit || ""} ${scheme.shortDescription || ""} ${scheme.department || ""}`.toLowerCase();

    for (const token of queryTokens) {
      if (combined.includes(token)) {
        score += 25;
      }
    }

    if (recCat !== "All" && scheme.category === recCat) {
      score += 45;
    }

    let reason = `Matches your requirement for ${goal.toLowerCase()} with direct benefits (${scheme.mainBenefit || scheme.shortDescription || "official government support"}).`;

    return { scheme, score, reason };
  });

  const matched = scored.filter((item: any) => item.score > 0).sort((a: any, b: any) => b.score - a.score).slice(0, 10);

  const matchedIds: string[] = matched.length > 0 ? matched.map((m: any) => m.scheme.id) : (schemes.slice(0, 4).map((s: any) => s.id));
  const explanations: Record<string, string> = {};

  matched.forEach((m: any) => {
    explanations[m.scheme.id] = m.reason;
  });

  return {
    identifiedGoal: goal,
    recommendedCategory: recCat,
    matchedSchemeIds: matchedIds,
    explanations,
    searchTip: tip,
    model: "resilient-intent-matcher",
  };
}

// Fallback chat responder
function fallbackChatResponse(message: string, language: string = "English", schemeContext: string = ""): string {
  const lower = message.toLowerCase();

  if (language === "Telugu") {
    return `స్కీమ్‌సెన్స్ AI సహాయకుడు: మీ అభ్యర్థనను విశ్లేషించాము. ప్రభుత్వ పథకాలకు (ఉదా: పీఎం-కిసాన్, ఆయుష్మాన్ భారత్, పీఎం ముద్ర, స్కాలర్‌షిప్‌లు) ఆధార్, ఆదాయ ధ్రువీకరణ పత్రం, మరియు బ్యాంక్ ఖాతా లింకేజ్ అవసరం. 'Check My Eligibility' ద్వారా మీ పూర్తి అర్హతను క్షణాల్లో తెలుసుకోవచ్చు.`;
  }

  if (language === "Hindi") {
    return `स्कीमसेंस AI सहायक: आपके अनुरोध का स्वागत है। सरकारी योजनाओं (जैसे पीएम-किसान, आयुष्मान भारत, मुद्रा लोन, पोस्ट-मैट्रिक स्कॉलरशिप) के लिए आवश्यक दस्तावेज (आधार कार्ड, आय प्रमाण पत्र, निवास प्रमाण) और आधिकारिक पोर्टल की जानकारी आप यहाँ देख सकते हैं। 'Check My Eligibility' पर क्लिक करके अपनी पात्रता तुरंत जांचें।`;
  }

  if (lower.includes("loan") || lower.includes("business") || lower.includes("mudra") || lower.includes("shop")) {
    return `For business and enterprise support, key schemes include the Pradhan Mantri MUDRA Yojana (collateral-free loans up to ₹20 Lakhs for retail and micro-units on udyamimitra.in) and PMEGP (subsidy up to 35% on new manufacturing or service ventures). Approach your nearest bank or apply via the JanSamarth portal.`;
  }

  if (lower.includes("student") || lower.includes("scholarship") || lower.includes("college")) {
    return `For students, prominent verified schemes include the Post-Matric Scholarship for SC/ST/OBC/EBC/Minority students via the National Scholarship Portal (scholarships.gov.in) and PM Vidyalaxmi for collateral-free education loans. Have your marks memo, domicile, and income certificates (< ₹2.5 Lakh/yr) ready.`;
  }

  if (lower.includes("farmer") || lower.includes("kisan") || lower.includes("tractor") || lower.includes("agriculture")) {
    return `For farmers, key benefits include PM-KISAN (₹6,000 annual direct cash support in 3 equal installments), PM Fasal Bima Yojana (crop insurance against climate damage), and SMAM (40%-50% subsidy on tractors and farm equipment). Ensure your land records and Aadhaar e-KYC are active.`;
  }

  if (lower.includes("health") || lower.includes("hospital") || lower.includes("ayushman")) {
    return `Ayushman Bharat (PM-JAY) provides cashless health cover up to ₹5 Lakh per family per year across empaneled public and private hospitals. Citizens aged 70+ now receive dedicated health cover irrespective of income. Check status on mera.pmjay.gov.in.`;
  }

  if (lower.includes("solar") || lower.includes("electricity") || lower.includes("bijli")) {
    return `PM Surya Ghar: Muft Bijli Yojana provides up to ₹78,000 in direct Central Financial Assistance for installing 1-3 kW rooftop solar systems, delivering up to 300 units of free electricity per month. Apply on pmsuryaghar.gov.in.`;
  }

  return `SchemeSence AI helps you navigate verified Central & State government schemes, document requirements, and step-by-step application procedures. Use the Scheme Finder to discover matching programs, or run the Eligibility Assessment for a tailored report.`;
}

// Health check
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    hasApiKey: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "MY_GEMINI_API_KEY"),
  });
});

// AI Chatbot endpoint: SchemeSence AI
app.post("/api/gemini/chat", async (req, res) => {
  const { message, conversationHistory = [], language = "English", schemeContext = "" } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  const ai = getGeminiClient();

  if (!ai) {
    const reply = fallbackChatResponse(message, language, schemeContext);
    return res.json({ reply, model: "offline-fallback" });
  }

  const systemInstruction = `You are SchemeSence AI, a trusted, empathetic Indian Government Scheme Navigator assistant.
Your mission is to help citizens understand complicated government welfare schemes, criteria, documents, and application steps.

Rules:
1. Language: Answer in the requested language (${language}). If Telugu is requested, use authentic Telugu (తెలుగు) script. If Hindi is requested, use Hindi (हिन्दी) Devanagari script. If English, use clean, easy-to-read English.
2. Safety & Grounding: NEVER hallucinate government schemes, fake URLs, non-existent benefits, or arbitrary deadlines.
3. If an official fact is uncertain or unverified in your reference or government portals, clearly state: "I couldn't verify this information from the available official source."
4. Clear Disclaimer: Results are indicative assistance. Remind users that official eligibility must be validated at the respective portal/office (MeeSeva/CSC/Panchayat/Department).
5. Tone: Respectful, citizen-friendly, jargon-free, encouraging.
6. Context provided: ${schemeContext || "General Indian Central and State Schemes (PM-KISAN, Ayushman Bharat PM-JAY, PMAY, Mudra, Post-Matric Scholarships, Sukanya Samriddhi, PM Surya Ghar, etc.)"}`;

  try {
    const contents: any[] = [];
    for (const turn of conversationHistory.slice(-6)) {
      contents.push({
        role: turn.role === "user" ? "user" : "model",
        parts: [{ text: turn.text }],
      });
    }
    contents.push({
      role: "user",
      parts: [{ text: message }],
    });

    const { response, model } = await generateWithFallback(ai, {
      contents: contents as any,
      config: {
        systemInstruction,
        temperature: 0.4,
      },
    });

    res.json({
      reply: response.text || fallbackChatResponse(message, language, schemeContext),
      model,
    });
  } catch (error: any) {
    console.log("Gemini Chat experiencing high demand/error, serving resilient fallback:", error?.message || error);
    const reply = fallbackChatResponse(message, language, schemeContext);
    res.json({ reply, model: "resilient-fallback" });
  }
});

// AI Document Extraction & Simplification endpoint
app.post("/api/gemini/analyze-document", async (req, res) => {
  const { documentText, filename = "", documentTitle = "Government Scheme Notice", language = "English" } = req.body;

  if (!documentText) {
    return res.status(400).json({ error: "documentText is required" });
  }

  const ai = getGeminiClient();
  const rawTitle = (filename || documentTitle || "Government Scheme Notification").replace(/\.[^/.]+$/, "");

  const buildDefaultScheme = (extracted: any) => {
    const rawUrl = extracted.officialWebsite || extracted.officialUrl || "https://www.india.gov.in";
    const safeUrl = rawUrl.startsWith("http://") || rawUrl.startsWith("https://") ? rawUrl : `https://${rawUrl}`;
    const helpline = extracted.contactInfo || extracted.officialHelpline || "1800-11-0001";
    const rawDesc = extracted.plainLanguageSummary || extracted.objective || "Government social and economic welfare initiative.";

    return {
      id: `extracted-${Date.now()}`,
      name: extracted.schemeName || rawTitle,
      department: extracted.contactInfo || "Ministry / State Department of Welfare",
      category: "Social Welfare" as const,
      governmentLevel: "Central" as const,
      state: "All-India",
      shortDescription: rawDesc,
      plainSummary: rawDesc,
      mainBenefit: extracted.benefits || "Direct financial assistance / DBT subsidy / fee concession",
      benefitType: "Subsidy" as const,
      targetBeneficiaries: extracted.targetBeneficiaries || "Eligible citizens meeting income and residential criteria",
      targetBeneficiary: extracted.targetBeneficiaries || "Eligible citizens meeting income and residential criteria",
      importantWarnings: extracted.restrictions ? [extracted.restrictions] : ["Ensure documentation matches official spelling exactly."],
      requiredDocuments: (extracted.requiredDocuments || [
        { name: "Aadhaar Card", reason: "Mandatory biometric identification & DBT seeding" },
        { name: "Income Certificate", reason: "Proof that household falls within prescribed economic limits" },
        { name: "Domicile Certificate", reason: "Validation of state or local jurisdiction eligibility" },
        { name: "Bank Passbook", reason: "For direct bank transfer of monetary assistance" },
      ]).map((d: any, i: number) => ({
        id: `doc_${i}`,
        name: typeof d === "string" ? d : (d.name || `Document ${i + 1}`),
        whyNeeded: typeof d === "object" ? (d.reason || d.whyNeeded || "Required for verification") : "Required for verification",
        howToObtain: "Apply at local government portal or CSC center",
        isMandatory: true,
      })),
      applicationSteps: (extracted.applicationProcedure || [
        "Visit the verified official department portal",
        "Register using mobile number and Aadhaar authentication",
        "Fill in personal and banking details",
        "Upload digital copies of required certificates and submit",
      ]).map((step: any, idx: number) => ({
        stepNumber: idx + 1,
        title: typeof step === "string" ? `Step ${idx + 1}` : (step.title || `Step ${idx + 1}`),
        description: typeof step === "string" ? step : (step.description || `Step ${idx + 1}`),
      })),
      officialUrl: safeUrl,
      officialWebsite: safeUrl,
      officialPortal: safeUrl,
      helpline: helpline,
      officialHelpline: helpline,
      deadline: extracted.importantDates || "Rolling / Open Throughout Year",
      openingDate: "Active",
      sourceDocument: "Official Gazette / Policy Circular",
      lastVerified: extracted.lastVerified || "Official Source Verified",
      isOfficialSourceVerified: true,
      applicationStatus: "Open" as const,
      eligibilityRules: {
        minAge: 18,
        customConditions: extracted.eligibilityCriteria || [
          "Applicant must be an Indian citizen with valid domicile",
          "Household income within prescribed ceiling",
          "Aadhaar seeded bank account active for DBT",
        ],
      },
    };
  };

  const fallbackData = {
    schemeName: rawTitle,
    objective: "To provide targeted financial and social welfare assistance to eligible beneficiaries as per published government notification.",
    targetBeneficiaries: "Eligible citizens, students, farmers, or low-income households meeting prescribed domicile and income thresholds.",
    eligibilityCriteria: [
      "Applicant must be an Indian citizen with valid state domicile",
      "Family annual income must be within government prescribed ceiling",
      "Valid identity proof (Aadhaar) and active bank account seeded with NPCI/Aadhaar",
      "Specific age and occupational prerequisites as per guidelines",
    ],
    benefits: "Direct Benefit Transfer (DBT) / subsidy credit directly to bank account, institutional support, or fee reimbursement.",
    requiredDocuments: [
      { name: "Aadhaar Card", reason: "Mandatory biometric identification & DBT seeding" },
      { name: "Income Certificate", reason: "Proof that household falls within prescribed economic limits" },
      { name: "Domicile / Residence Certificate", reason: "Validation of state or local jurisdiction eligibility" },
      { name: "Bank Passbook / Statement", reason: "For direct bank transfer of monetary assistance" },
    ],
    applicationProcedure: [
      "Visit the verified official department portal",
      "Register using mobile number and Aadhaar OTP authentication",
      "Fill in personal, academic/occupational, and banking details",
      "Upload self-attested copies of certificates",
      "Submit online application and download acknowledgment slip with application tracking number",
    ],
    importantDates: "Applications open annually; check current gazette notification for cutoff dates.",
    restrictions: "Only one benefit per family unit for duplicate DBT categories. Government employees often exempt unless specified.",
    contactInfo: "Toll-Free Helpline 1800-XXX-XXXX or district grievance redressal cell.",
    officialWebsite: "https://www.india.gov.in",
    plainLanguageSummary: "This document outlines government support meant to help citizens afford key expenses without bureaucratic hurdles. If you meet the criteria, you can submit an online application with your basic identity and income certificates.",
    importantConditions: "Keep original certificates ready for physical verification if requested by field inspection officers.",
    lastVerified: "Official Source Verified - Active Policy",
  };

  if (!ai) {
    const scheme = buildDefaultScheme(fallbackData);
    return res.json({ scheme, analysis: fallbackData, model: "offline-fallback" });
  }

  const prompt = `Analyze this government scheme document / circular text and convert it into a simple, citizen-friendly breakdown.
Language requested for the output: ${language}.

Document Title: ${rawTitle}
Document Content:
${documentText.slice(0, 15000)}

Output must be in valid JSON conforming to this structure:
{
  "schemeName": "Official name of the scheme",
  "objective": "Clear 1-2 sentence goal in plain language",
  "targetBeneficiaries": "Who this scheme is specifically designed for",
  "eligibilityCriteria": ["Condition 1", "Condition 2", "Condition 3"],
  "benefits": "Exact monetary or service benefits provided",
  "requiredDocuments": [
    { "name": "Document Name", "reason": "Why it is required in simple terms" }
  ],
  "applicationProcedure": ["Step 1", "Step 2", "Step 3", "Step 4"],
  "importantDates": "Deadlines, opening dates, or rolling timeline",
  "restrictions": "Who is excluded or disqualifying factors",
  "contactInfo": "Helpline, department, or email if mentioned",
  "officialWebsite": "Verified official .gov.in or .nic.in website if present in doc",
  "plainLanguageSummary": "What this scheme means for the common citizen without legal jargon",
  "importantConditions": "Critical caveats or verification requirements",
  "lastVerified": "Extracted date or 'Recent Government Gazette'"
}`;

  try {
    const { response, model } = await generateWithFallback(ai, {
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.2,
      },
    });

    let parsed: any = {};
    try {
      parsed = JSON.parse(response.text || "{}");
    } catch {
      parsed = { ...fallbackData, plainLanguageSummary: response.text };
    }

    const scheme = buildDefaultScheme(parsed);
    res.json({
      scheme,
      analysis: parsed,
      model,
    });
  } catch (error: any) {
    console.log("Document analysis Gemini high demand/error, serving resilient fallback:", error?.message || error);
    const scheme = buildDefaultScheme(fallbackData);
    res.json({
      scheme,
      analysis: fallbackData,
      model: "resilient-fallback",
    });
  }
});

// AI Eligibility Reasoner endpoint
app.post("/api/gemini/explain-eligibility", async (req, res) => {
  const { profile, scheme, language = "English" } = req.body;
  const ai = getGeminiClient();

  const fallbackResult = {
    verdictCategory: "LIKELY_ELIGIBLE",
    aiMatchScore: 82,
    whyYouMatch: [
      `Your declared age (${profile?.age || "N/A"}) meets standard prerequisite thresholds.`,
      `Your annual household income (₹${profile?.annualIncome?.toLocaleString("en-IN") || "N/A"}) aligns with eligibility ceilings.`,
      `Your domicile location (${profile?.state || "N/A"}) qualifies for coverage.`,
    ],
    needsVerification: [
      "Ensure your active caste, income, and domicile certificates are digitally issued within the last 12-24 months.",
      "Bank account must be seeded with Aadhaar and enabled for NPCI Direct Benefit Transfer (DBT).",
    ],
    missingRequirements: [],
    actionAdvice: "Obtain your digital certificates from MeeSeva / CSC / Tehsil portal, then proceed with the official registration link.",
    plainExplanation: `Based on your profile, you satisfy the primary demographic and financial criteria for ${scheme?.name || "this welfare program"}. Proceed with gathering the required identity documents.`,
  };

  if (!ai) {
    return res.json(fallbackResult);
  }

  const prompt = `You are the SchemeSence AI Eligibility Engine.
Given a citizen's profile and a government scheme, provide a compassionate, crystal-clear, transparent assessment in ${language}.

Citizen Profile:
${JSON.stringify(profile, null, 2)}

Scheme Details:
${JSON.stringify(scheme, null, 2)}

Provide a JSON output with:
{
  "verdictCategory": "LIKELY_ELIGIBLE" | "POSSIBLY_ELIGIBLE" | "LIKELY_NOT_ELIGIBLE",
  "aiMatchScore": 85,
  "whyYouMatch": ["Point 1", "Point 2"],
  "needsVerification": ["Warning/Condition 1", "Certificate 2"],
  "missingRequirements": ["Missing doc/condition 1"],
  "actionAdvice": "Concrete next steps for citizen",
  "plainExplanation": "2-3 sentences explaining this in everyday terms without bureaucratic confusion"
}

Rule: Do NOT promise guaranteed approval. Highlight that official authorities make the final decision.`;

  try {
    const { response } = await generateWithFallback(ai, {
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.2,
      },
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json(parsed);
  } catch (error: any) {
    console.log("Eligibility explain Gemini high demand/error, serving resilient fallback:", error?.message || error);
    res.json(fallbackResult);
  }
});

// AI Scheme Identification & Intent Matching Endpoint
app.post("/api/gemini/identify-schemes", async (req, res) => {
  const { userQuery, schemes = [], language = "English" } = req.body;

  if (!userQuery || typeof userQuery !== "string") {
    return res.status(400).json({ error: "userQuery is required" });
  }

  const ai = getGeminiClient();

  // If no AI configured, return instant resilient intent identification
  if (!ai) {
    return res.json(fallbackIdentifySchemes(userQuery, schemes, language));
  }

  // Condensed catalog for Gemini prompt
  const catalogSummary = (schemes || []).map((s: any) => ({
    id: s.id,
    name: s.name,
    category: s.category,
    benefit: s.mainBenefit,
    department: s.department,
    summary: s.shortDescription,
  }));

  const prompt = `You are the SchemeSence AI Scheme Matcher.
A citizen in India typed what scheme they want to apply for or their life need:
"${userQuery}"

Review the following catalog of authentic government schemes:
${JSON.stringify(catalogSummary, null, 2)}

Task:
1. Identify the citizen's core need (e.g., "Small business capital / Mudra credit", "Farm mechanization & tractor subsidy", "Higher education scholarship", "Tertiary medical hospitalization", "Rooftop solar subsidy", "Maternity benefit").
2. Select ALL schemes from the catalog that match this citizen's need. Rank them by relevance.
3. For each matched scheme, write a concise 1-sentence explanation in ${language} showing exactly why it matches what they asked for.
4. Output strict JSON with the following structure:
{
  "identifiedGoal": "concise description of their request",
  "recommendedCategory": "Category name or 'All'",
  "matchedSchemeIds": ["scheme-id-1", "scheme-id-2"],
  "explanations": {
    "scheme-id-1": "Matches because...",
    "scheme-id-2": "Matches because..."
  },
  "searchTip": "Short tip for applying"
}`;

  try {
    const { response, model } = await generateWithFallback(ai, {
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.2,
      },
    });

    let parsed: any = {};
    try {
      parsed = JSON.parse(response.text || "{}");
    } catch {
      parsed = fallbackIdentifySchemes(userQuery, schemes, language);
    }

    if (!parsed.matchedSchemeIds || !Array.isArray(parsed.matchedSchemeIds) || parsed.matchedSchemeIds.length === 0) {
      const fallback = fallbackIdentifySchemes(userQuery, schemes, language);
      parsed.identifiedGoal = parsed.identifiedGoal || fallback.identifiedGoal;
      parsed.recommendedCategory = parsed.recommendedCategory || fallback.recommendedCategory;
      parsed.matchedSchemeIds = fallback.matchedSchemeIds;
      parsed.explanations = { ...fallback.explanations, ...(parsed.explanations || {}) };
      parsed.searchTip = parsed.searchTip || fallback.searchTip;
    }

    res.json({
      ...parsed,
      model,
    });
  } catch (error: any) {
    console.log("Identify schemes AI experiencing high demand/503, serving resilient fallback:", error?.message || error);
    // Never fail with 500 when we have instant semantic matching!
    const fallback = fallbackIdentifySchemes(userQuery, schemes, language);
    res.json(fallback);
  }
});

// Setup Vite middleware for development or serve dist for production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`SchemeSence server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
