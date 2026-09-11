import { Scheme, ExtractedUserProfile, ALL_INDIAN_STATES, ALL_UNION_TERRITORIES } from '../types';

export interface IntentMatchResult {
  scheme: Scheme;
  matchScore: number;
  matchReason: string;
  matchedTags: string[];
}

export interface AiIdentificationResponse {
  identifiedGoal?: string;
  recommendedCategory?: string;
  matchedSchemeIds: string[];
  explanations: Record<string, string>;
  searchTip?: string;
}

// Stop words to remove so they don't corrupt keyword matching
const STOP_WORDS = new Set([
  'i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'you', 'your', 'he', 'him', 'his', 'she', 'her',
  'they', 'them', 'their', 'what', 'which', 'who', 'whom', 'this', 'that', 'these', 'those', 'am',
  'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does',
  'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until', 'while',
  'of', 'at', 'by', 'for', 'with', 'about', 'against', 'between', 'into', 'through', 'during',
  'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off', 'over',
  'under', 'again', 'further', 'then', 'once', 'want', 'need', 'apply', 'applied', 'applying',
  'please', 'show', 'tell', 'help', 'give', 'get', 'got', 'can', 'could', 'should', 'would', 'like',
  'search', 'find', 'looking', 'look', 'seeking', 'types', 'schemes', 'scheme', 'yojana', 'sarkari',
  'government', 'govt', 'keliye', 'ke', 'liye', 'ko', 'me', 'se', 'chahiye', 'kavali', 'ivvandi'
]);

// Semantic Concept Clusters
interface ConceptCluster {
  concept: string;
  keywords: string[];
  targetSchemeIds: string[];
  category?: string;
  reasonTemplate: string;
}

const CONCEPT_CLUSTERS: ConceptCluster[] = [
  {
    concept: 'Solar & Electricity Subsidy',
    keywords: [
      'solar', 'sun', 'rooftop', 'roof', 'surya', 'bijli', 'electricity', 'current', 'meter',
      'terrace', 'power', 'units', 'solar panel', 'free electricity', 'muft bijli', 'bijli bill',
      'కరెంట్', 'సౌర', 'సూర్య', 'విద్యుత్'
    ],
    targetSchemeIds: ['pm-surya-ghar'],
    category: 'Housing',
    reasonTemplate: 'Provides up to ₹78,000 direct subsidy for rooftop solar installation and 300 free monthly electricity units.'
  },
  {
    concept: 'Tractor & Farm Machinery Subsidy',
    keywords: [
      'tractor', 'rotavator', 'tiller', 'machinery', 'equipment', 'farm equipment', 'harvester',
      'drone', 'sprayer', 'agri machinery', 'smam', 'ట్రాక్టర్', 'వ్యవసాయ పరికరాలు', 'ट्रैक्टर', 'कृषि यंत्र'
    ],
    targetSchemeIds: ['smam-tractor-subsidy', 'pm-kisan', 'rythu-bharosa-telangana'],
    category: 'Agriculture',
    reasonTemplate: 'Offers 40% to 50% government subsidy on tractors, power tillers, and farm machinery.'
  },
  {
    concept: 'Farmer Support & Investment',
    keywords: [
      'farmer', 'kisan', 'agriculture', 'crop', 'fasal', 'farming', 'land', 'patta', 'seed',
      'fertilizer', 'rythu', 'bharosa', 'dharani', 'cultivator', 'agri', 'రైతు', 'వ్యవసాయం', 'భూమి',
      'किसान', 'खेती', 'फसल', 'खाद'
    ],
    targetSchemeIds: ['pm-kisan', 'smam-tractor-subsidy', 'rythu-bharosa-telangana'],
    category: 'Agriculture',
    reasonTemplate: 'Provides direct financial support, input subsidies, and investment grants for agricultural families.'
  },
  {
    concept: 'Small Business & Mudra Loans',
    keywords: [
      'loan', 'business', 'shop', 'dukaan', 'startup', 'store', 'kirana', 'credit', 'capital',
      'mudra', 'msme', 'enterprise', 'commercial', 'money to start', 'boutique', 'grocery',
      'వ్యాపారం', 'రుణం', 'షాపు', 'व्यापार', 'दुकान', 'कर्ज', 'लोन', 'मुद्रा'
    ],
    targetSchemeIds: ['mudra-yojana', 'pmegp-business-loan', 'pm-svanidhi', 'pm-vishwakarma'],
    category: 'Business',
    reasonTemplate: 'Offers collateral-free business loans, bank credit, and government margin capital subsidy.'
  },
  {
    concept: 'Street Vendors & Hawkers',
    keywords: [
      'street vendor', 'vendor', 'hawker', 'thela', 'cart', 'stall', 'roadside', 'svanidhi',
      'vegetable vendor', 'fruit seller', 'tea stall', 'వీధి వ్యాపారి', 'చిరు వ్యాపారి', 'रेहड़ी', 'पटरी'
    ],
    targetSchemeIds: ['pm-svanidhi', 'mudra-yojana'],
    category: 'Business',
    reasonTemplate: 'Offers ₹10,000 to ₹50,000 micro-credit without collateral with 7% interest subsidy for small vendors.'
  },
  {
    concept: 'Artisans & Traditional Crafts',
    keywords: [
      'tailor', 'sewing machine', 'silai', 'carpenter', 'blacksmith', 'potter', 'barber',
      'goldsmith', 'sculptor', 'artisan', 'craftsman', 'vishwakarma', 'toolkit', 'darzi',
      'దర్జీ', 'కుట్టు మిషన్', 'చేతి వృత్తులు', 'दर्जी', 'सिलाई मशीन', 'कारीगर', 'विश्वकर्मा'
    ],
    targetSchemeIds: ['pm-vishwakarma', 'pmegp-business-loan'],
    category: 'Skill Development',
    reasonTemplate: 'Provides ₹15,000 free toolkit grant, skill training, and 5% low-interest enterprise loans.'
  },
  {
    concept: 'Hospital & Healthcare Cover',
    keywords: [
      'hospital', 'medical', 'health', 'treatment', 'surgery', 'operation', 'ayushman', 'pmjay',
      'card', 'doctor', 'disease', 'illness', 'medicine', 'aarogyasri', 'cashless', 'admission',
      'ఆసుపత్రి', 'చికిత్స', 'ఆరోగ్యం', 'వైద్యం', 'అస్పత్రి', 'अस्पताल', 'इलाज', 'दवा', 'आयुष्मान'
    ],
    targetSchemeIds: ['ayushman-bharat'],
    category: 'Healthcare',
    reasonTemplate: 'Provides up to ₹5,00,000 cashless secondary and tertiary hospital treatment per family per year.'
  },
  {
    concept: 'College & Student Scholarships',
    keywords: [
      'scholarship', 'scholarships', 'epass', 'e-pass', 'ssp', 'mahadbt', 'oasis', 'jnanabhumi', 'college', 'student', 'school', 'fee', 'fees', 'tuition', 'reimbursement',
      'study', 'studies', 'education', 'degree', 'btech', 'engineering', 'post matric', 'vidyarthi', 'pms', 'rtf', 'mtf', 'overseas',
      'విద్యార్థి', 'స్కాలర్‌షిప్', 'ఫీజు', 'చదువు', 'छात्र', 'छात्रवृत्ति', 'पढ़ाई', 'कॉलेज', 'फीस'
    ],
    targetSchemeIds: [
      'telangana-epass-post-matric',
      'telangana-epass-mjpov-overseas',
      'ap-jnanabhumi-vidya-deevena',
      'karnataka-ssp-post-matric',
      'maharashtra-mahadbt-rajarshi-shahu',
      'wb-oasis-post-matric',
      'kerala-dce-suvarna-jubilee',
      'tamil-nadu-pudhumai-penn-scheme',
      'central-nsp-csss-scholarship',
      'post-matric-scholarship',
      'ddu-gky-rural-skills'
    ],
    category: 'Students',
    reasonTemplate: 'Reimburses college academic fees and provides monthly student maintenance allowances.'
  },
  {
    concept: 'Housing & Pucca House',
    keywords: [
      'house', 'housing', 'home', 'makan', 'ghar', 'pucca', 'awas', 'construction', 'plot',
      'roof', 'flat', 'slum', 'ఇల్లు', 'గృహం', 'ఆవాస్', 'घर', 'मकान', 'आवास', 'छत'
    ],
    targetSchemeIds: ['pm-awas-yojana', 'pm-surya-ghar'],
    category: 'Housing',
    reasonTemplate: 'Offers direct financial assistance and subsidies for constructing a permanent pucca house.'
  },
  {
    concept: 'Pregnant Women & Maternity',
    keywords: [
      'pregnant', 'pregnancy', 'maternity', 'mother', 'delivery', 'lactating', 'baby', 'infant',
      'child birth', 'hospital delivery', 'matru', 'pmmvy', 'గర్భిణీ', 'ప్రసవం', 'తల్లి', 'गर्भवती', 'प्रसूति', 'माता'
    ],
    targetSchemeIds: ['pm-matru-vandana', 'sukanya-samriddhi'],
    category: 'Women',
    reasonTemplate: 'Direct cash assistance of ₹5,000 to ₹6,000 into mother’s bank account for pregnancy and nutrition.'
  },
  {
    concept: 'Girl Child & Bride Marriage',
    keywords: [
      'girl', 'daughter', 'beti', 'female child', 'sukanya', 'kalyana', 'lakshmi', 'shaadi',
      'marriage', 'wedding', 'bride', 'vivah', 'mubarak', 'కూతురు', 'పెళ్లి', 'వివాహం', 'షాదీ',
      'बेटी', 'शादी', 'विवाह', 'सुकन्या'
    ],
    targetSchemeIds: ['sukanya-samriddhi', 'kalyana-lakshmi-shaadi-mubarak', 'pm-matru-vandana'],
    category: 'Women',
    reasonTemplate: 'Special high-interest savings and direct financial aid (up to ₹1,00,116) for girl child education and marriage.'
  },
  {
    concept: 'Senior Citizens & Pensions',
    keywords: [
      'pension', 'old age', 'senior', 'elderly', 'retired', 'retirement', 'vridha', 'atal', 'apy',
      'monthly pension', '60 years', 'వృద్ధులు', 'పింఛను', 'పెన్షన్', 'పెద్దలు', 'वृद्ध', 'पेंशन', 'बुजुर्ग'
    ],
    targetSchemeIds: ['old-age-pension-nsap', 'atal-pension-yojana', 'ayushman-bharat'],
    category: 'Senior Citizens',
    reasonTemplate: 'Guarantees regular monthly retirement pension and free medical care for elderly citizens.'
  },
  {
    concept: 'Disability & Divyangjan Welfare',
    keywords: [
      'disabled', 'disability', 'handicapped', 'divyang', 'wheelchair', 'tricycle', 'hearing aid',
      'prosthetic', 'special needs', 'udid', 'దివ్యాంగులు', 'వికలాంగులు', 'दिव्यांग', 'विकलांग'
    ],
    targetSchemeIds: ['divyangjan-swavalamban'],
    category: 'Disability',
    reasonTemplate: 'Provides free assistive aids (wheelchairs, hearing equipment) and concessional low-interest loans.'
  },
  {
    concept: 'Job Training & Skill Placement',
    keywords: [
      'skill', 'training', 'job', 'employment', 'placement', 'course', 'vocational', 'iti',
      'kaushal', 'rozgar', 'unemployed', 'నైపుణ్యం', 'శిక్షణ', 'ఉద్యోగం', 'कौशल', 'प्रशिक्षण', 'रोजगार'
    ],
    targetSchemeIds: ['ddu-gky-rural-skills', 'pm-vishwakarma'],
    category: 'Skill Development',
    reasonTemplate: 'Free industry-certified job training with guaranteed employment placements and stipends.'
  },
  {
    concept: 'Voter ID & Voter Registration',
    keywords: [
      'voter', 'voter id', 'voter card', 'epic', 'chunav card', 'election card', 'vote',
      'voters', 'form 6', 'eci', 'polling booth', 'ఓటరు కార్డు', 'ఓటు', 'वोटर कार्ड', 'मतदाता'
    ],
    targetSchemeIds: ['voter-id-card'],
    category: 'Documents',
    reasonTemplate: 'Official Election Commission Voter ID (EPIC) registration for all Indian citizens aged 18+.'
  },
  {
    concept: 'PAN Card & Tax ID',
    keywords: [
      'pan', 'pan card', 'pancard', 'e-pan', 'instant pan', 'form 49a', 'nsdl', 'utiitsl',
      'tax id', 'incometax', 'పాన్ కార్డు', 'पैन कार्ड'
    ],
    targetSchemeIds: ['pan-card-service'],
    category: 'Documents',
    reasonTemplate: 'Permanent Account Number (PAN) issued for banking, tax returns, and identity verification.'
  },
  {
    concept: 'Aadhaar & Biometric Services',
    keywords: [
      'aadhaar', 'aadhar', 'uidai', 'eaadhaar', 'biometric', 'aadhaar card', 'aadhar card',
      'myaadhaar', 'ఆధార్', 'आधार कार्ड', 'बायोमेट्रिक'
    ],
    targetSchemeIds: ['aadhaar-services'],
    category: 'Documents',
    reasonTemplate: 'Universal 12-digit digital biometric identity required for all direct welfare subsidies and banking.'
  },
  {
    concept: 'Driving Licence & Vehicle Services',
    keywords: [
      'driving licence', 'driving license', 'learner licence', 'learner license', 'dl', 'll',
      'parivahan', 'sarathi', 'rto', 'driving test', 'motor vehicle', 'డ్రైవింగ్ లైసెన్స్', 'ड्राइविंग लाइसेंस'
    ],
    targetSchemeIds: ['driving-licence-service'],
    category: 'Citizen Services',
    reasonTemplate: 'Official smart card driving licence and learner licence issued via Sarathi Parivahan.'
  },
  {
    concept: 'Passport & International Travel',
    keywords: [
      'passport', 'passport seva', 'tatkaal', 'psk', 'popsk', 'travel abroad', 'mea',
      'పాస్‌పోర్ట్', 'पासपोर्ट'
    ],
    targetSchemeIds: ['passport-seva'],
    category: 'Documents',
    reasonTemplate: 'Sovereign Indian Passport issued for international travel, overseas employment, and study.'
  },
  {
    concept: 'Income Certificate',
    keywords: [
      'income certificate', 'income cert', 'aay praman', 'meeseva income', 'tehsildar income',
      'edistrict income', 'ఆదాయ ధృవీకరణ', 'आय प्रमाण पत्र'
    ],
    targetSchemeIds: ['income-certificate-service'],
    category: 'Certificates',
    reasonTemplate: 'Official Revenue Department income certificate required to qualify for scholarships, fee waivers, and EWS quotas.'
  },
  {
    concept: 'Caste Certificate & Reservation',
    keywords: [
      'caste certificate', 'caste cert', 'community certificate', 'jaati praman', 'obc certificate',
      'ncl', 'non creamy layer', 'sc certificate', 'st certificate', 'కుల ధృవీకరణ', 'जाति प्रमाण पत्र'
    ],
    targetSchemeIds: ['caste-certificate-service'],
    category: 'Certificates',
    reasonTemplate: 'Statutory proof of social community required to claim educational admissions, recruitment quotas, and welfare benefits.'
  },
  {
    concept: 'Udyam MSME Business Registration',
    keywords: [
      'udyam', 'msme registration', 'msme certificate', 'udyog aadhaar', 'small business registration',
      'collateral free loan', 'उद्योग आधार', 'उद्यम'
    ],
    targetSchemeIds: ['udyam-msme-registration', 'mudra-yojana'],
    category: 'Business',
    reasonTemplate: 'Free Government of India MSME registration unlocking collateral-free bank loans and interest concessions.'
  },
  {
    concept: 'Birth & Death Registration',
    keywords: [
      'birth certificate', 'death certificate', 'crs', 'orgi', 'janm praman', 'hospital birth',
      'జనన ధృవీకరణ', 'जन्म प्रमाण पत्र'
    ],
    targetSchemeIds: ['birth-death-certificate'],
    category: 'Certificates',
    reasonTemplate: 'Conclusive statutory proof of age, date of birth, and parentage issued under the Civil Registration System.'
  },
  {
    concept: 'Disability Certificate & UDID',
    keywords: [
      'udid', 'udid card', 'disability certificate', 'handicapped card', 'swavlamban', 'divyang card',
      'దివ్యాంగుల కార్డు', 'दिव्यांग प्रमाण पत्र'
    ],
    targetSchemeIds: ['udid-disability-certificate'],
    category: 'Disability',
    reasonTemplate: 'National Unique Disability ID (UDID) card unlocking 4% job reservation, free bus passes, and 75% rail discounts.'
  },
  {
    concept: 'State Women Welfare & Monthly Cash',
    keywords: [
      'ladki bahin', 'gruha lakshmi', 'magalir urimai', 'kanya utthan', 'kanyashree', 'delhi ladli',
      '1500 per month', '2000 per month', '1000 per month', '50000 graduation'
    ],
    targetSchemeIds: ['majhi-ladki-bahin-maharashtra', 'gruha-lakshmi-karnataka', 'kalaignar-magalir-urimai-tn', 'kanya-utthan-bihar', 'kanyashree-prakalpa-wb', 'delhi-ladli-scheme'],
    category: 'Women',
    reasonTemplate: 'Flagship State government basic income and welfare entitlement deposited directly into female bank accounts.'
  }
];

/**
 * Client-side Intent and Semantic Matcher
 * Analyzes natural language strings typed by the user (e.g., "I want to apply for tractor subsidy"
 * or "need loan for grocery store", "hospital surgery for mother")
 */
export function identifySchemesFromQuery(
  rawQuery: string,
  schemes: Scheme[]
): IntentMatchResult[] {
  if (!rawQuery || !rawQuery.trim()) {
    return [];
  }

  const query = rawQuery.toLowerCase().trim();
  const tokens = query
    .replace(/[^\w\s\u0900-\u097F\u0C00-\u0C7F]/gi, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOP_WORDS.has(w));

  const results: IntentMatchResult[] = [];
  const queryLower = query;

  for (const scheme of schemes) {
    let score = 0;
    const matchedTags: string[] = [];
    let customReason = '';

    const keywordsText = (scheme.keywords || []).join(' ');
    const aliasesText = (scheme.aliases || []).join(' ');
    const recordTypeText = scheme.recordType || 'SCHEME';

    const searchableText = `
      ${scheme.name} 
      ${scheme.nativeNames?.hindi || ''} 
      ${scheme.nativeNames?.telugu || ''} 
      ${scheme.nativeNames?.tamil || ''} 
      ${scheme.nativeNames?.kannada || ''} 
      ${scheme.nativeNames?.bengali || ''} 
      ${scheme.nativeNames?.marathi || ''} 
      ${scheme.shortDescription} 
      ${scheme.plainSummary} 
      ${scheme.mainBenefit} 
      ${scheme.department} 
      ${scheme.ministry || ''}
      ${scheme.category}
      ${scheme.state || ''}
      ${scheme.unionTerritory || ''}
      ${recordTypeText}
      ${keywordsText}
      ${aliasesText}
    `.toLowerCase();

    // Direct match against scheme name or aliases
    if (queryLower.includes(scheme.name.toLowerCase())) {
      score += 70;
      matchedTags.push('Exact Name Match');
    }
    for (const alias of scheme.aliases || []) {
      if (queryLower.includes(alias.toLowerCase())) {
        score += 65;
        matchedTags.push(`Alias: ${alias}`);
      }
    }
    for (const kw of scheme.keywords || []) {
      if (queryLower.includes(kw.toLowerCase())) {
        score += 35;
        matchedTags.push(kw);
      }
    }

    // 1. Direct text inclusion of tokens
    for (const token of tokens) {
      if (searchableText.includes(token)) {
        score += 20;
        if (!matchedTags.includes(token)) matchedTags.push(token);
      }
      if (scheme.name.toLowerCase().includes(token)) {
        score += 35;
      }
    }

    // Boost if query mentions record type specifically
    if (queryLower.includes('service') && scheme.recordType === 'SERVICE') score += 30;
    if (queryLower.includes('document') && scheme.recordType === 'DOCUMENT') score += 30;
    if (queryLower.includes('certificate') && scheme.recordType === 'CERTIFICATE') score += 30;
    if ((queryLower.includes('license') || queryLower.includes('licence')) && scheme.recordType === 'LICENSE') score += 40;
    if (queryLower.includes('registration') && scheme.recordType === 'REGISTRATION') score += 35;

    // 2. Check concept clusters
    for (const cluster of CONCEPT_CLUSTERS) {
      let clusterHits = 0;
      for (const kw of cluster.keywords) {
        if (queryLower.includes(kw)) {
          clusterHits++;
        }
      }

      if (clusterHits > 0) {
        if (cluster.targetSchemeIds.includes(scheme.id)) {
          score += 70 + clusterHits * 20;
          matchedTags.push(cluster.concept);
          if (!customReason) {
            customReason = cluster.reasonTemplate;
          }
        } else if (cluster.category === scheme.category) {
          score += 30;
          matchedTags.push(cluster.concept);
        }
      }
    }

    // 3. Fallback reason if none matched
    if (score > 0 && !customReason) {
      customReason = `Identified for your request: ${scheme.mainBenefit}`;
    }

    if (score > 0) {
      results.push({
        scheme,
        matchScore: Math.min(score, 100),
        matchReason: customReason,
        matchedTags: Array.from(new Set(matchedTags)),
      });
    }
  }

  // Sort by matchScore descending
  return results.sort((a, b) => b.matchScore - a.matchScore);
}

/**
 * Natural Language User Profile Extractor
 * Parses conversational prompt queries into structured demographic attributes.
 * Example: "I am a 20-year-old student from Telangana with family income of ₹2.5 lakh. What schemes can I get?"
 */
export function extractProfileFromQuery(rawQuery: string): Partial<ExtractedUserProfile> {
  if (!rawQuery || !rawQuery.trim()) return {};

  const q = rawQuery.toLowerCase();
  const profile: Partial<ExtractedUserProfile> = {};

  // 1. Age extraction (e.g., "20-year-old", "age 22", "25 yrs old", "20 yo", "age is 28")
  const ageMatch = q.match(/\b(\d{1,2})\s*(?:-| )?(?:years?|yrs?|yo|year old|years old)\b/) ||
                   q.match(/\bage\s*(?:is|:)?\s*(\d{1,2})\b/);
  if (ageMatch && ageMatch[1]) {
    const parsedAge = parseInt(ageMatch[1], 10);
    if (parsedAge >= 1 && parsedAge <= 110) {
      profile.age = parsedAge;
    }
  }

  // 2. State & Union Territory extraction
  for (const state of ALL_INDIAN_STATES) {
    if (q.includes(state.toLowerCase())) {
      profile.state = state;
      break;
    }
  }
  if (!profile.state) {
    for (const ut of ALL_UNION_TERRITORIES) {
      if (q.includes(ut.toLowerCase())) {
        profile.state = ut;
        profile.unionTerritory = ut;
        break;
      }
    }
  }

  // 3. Annual Income extraction
  // Matches: "₹2.5 lakh", "2.5 lakh", "2.5l", "250000", "income 200000", "income of 3 lakh"
  const lakhMatch = q.match(/(?:income|earning|salary)?\s*(?:of|is|under|below|around)?\s*₹?\s*(\d+(?:\.\d+)?)\s*(?:lakh|lakhs|lac|lacs|l)\b/);
  if (lakhMatch && lakhMatch[1]) {
    profile.annualIncome = Math.round(parseFloat(lakhMatch[1]) * 100000);
  } else {
    const rawNumberMatch = q.match(/(?:income|earning|salary)\s*(?:of|is|under|below|around)?\s*₹?\s*(\d{4,8})\b/);
    if (rawNumberMatch && rawNumberMatch[1]) {
      profile.annualIncome = parseInt(rawNumberMatch[1], 10);
    }
  }

  // 4. Occupation extraction
  if (q.includes('student') || q.includes('studying') || q.includes('college') || q.includes('school')) {
    profile.occupation = 'Student';
  } else if (q.includes('farmer') || q.includes('kisan') || q.includes('cultivator') || q.includes('agriculture')) {
    profile.occupation = 'Farmer';
  } else if (q.includes('business') || q.includes('shop') || q.includes('store') || q.includes('trader') || q.includes('entrepreneur') || q.includes('vendor')) {
    profile.occupation = 'Business';
  } else if (q.includes('unemployed') || q.includes('looking for job') || q.includes('jobless')) {
    profile.occupation = 'Unemployed';
  } else if (q.includes('homemaker') || q.includes('housewife')) {
    profile.occupation = 'Homemaker';
  } else if (q.includes('artisan') || q.includes('tailor') || q.includes('carpenter') || q.includes('craftsman')) {
    profile.occupation = 'Other';
  } else if (q.includes('employee') || q.includes('private job') || q.includes('salaried')) {
    profile.occupation = 'Employee';
  }


  // 5. Gender extraction
  if (q.includes('woman') || q.includes('women') || q.includes('female') || q.includes('girl') || q.includes('mother') || q.includes('daughter') || q.includes('lady') || q.includes('housewife')) {
    profile.gender = 'Female';
  } else if (q.includes(' man ') || q.includes('boy') || q.includes('male') || q.includes('father') || q.includes('son') || q.includes('husband')) {
    profile.gender = 'Male';
  }

  // 6. Social category extraction
  if (q.includes('sc') || q.includes('scheduled caste')) {
    profile.socialCategory = 'SC';
  } else if (q.includes('st') || q.includes('scheduled tribe')) {
    profile.socialCategory = 'ST';
  } else if (q.includes('obc') || q.includes('other backward class') || q.includes('non creamy layer') || q.includes('ncl')) {
    profile.socialCategory = 'OBC';
  } else if (q.includes('ews') || q.includes('economically weaker')) {
    profile.socialCategory = 'EWS';
  } else if (q.includes('general category') || q.includes('open category')) {
    profile.socialCategory = 'General';
  }

  // 7. Specially abled / disability extraction
  if (q.includes('disabled') || q.includes('disability') || q.includes('handicapped') || q.includes('specially abled') || q.includes('divyang') || q.includes('pwd')) {
    profile.speciallyAbled = true;
  }

  // 8. Education level inference
  if (q.includes('graduate') || q.includes('degree') || q.includes('btech') || q.includes('b.tech') || q.includes('bsc') || q.includes('ba ') || q.includes('bcom') || q.includes('undergraduate')) {
    profile.educationLevel = 'Undergraduate';
  } else if (q.includes('masters') || q.includes('mtech') || q.includes('postgraduate') || q.includes('pg ') || q.includes('phd')) {
    profile.educationLevel = 'Postgraduate / Higher';
  } else if (q.includes('10th') || q.includes('ssc') || q.includes('metric')) {

    profile.educationLevel = '10th Pass';
  } else if (q.includes('12th') || q.includes('intermediate') || q.includes('plus two')) {
    profile.educationLevel = '12th Pass';
  } else if (q.includes('diploma') || q.includes('iti')) {
    profile.educationLevel = 'Diploma';
  }

  return profile;
}


/**
 * Call server Gemini API to perform deeper semantic reasoning and ranking
 */
export async function identifySchemesWithAi(
  userQuery: string,
  schemes: Scheme[],
  language: string = 'English'
): Promise<AiIdentificationResponse | null> {
  try {
    const res = await fetch('/api/gemini/identify-schemes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userQuery,
        schemes: schemes.map((s) => ({
          id: s.id,
          name: s.name,
          category: s.category,
          mainBenefit: s.mainBenefit,
          department: s.department,
          shortDescription: s.shortDescription,
        })),
        language,
      }),
    });

    if (res.ok) {
      const data: AiIdentificationResponse = await res.json();
      if (data && data.matchedSchemeIds && data.matchedSchemeIds.length > 0) {
        return data;
      }
    }
  } catch (err) {
    console.log('AI Scheme identification network query notice, using local intent analysis:', err);
  }

  // Resilient local matcher fallback if network or model temporarily unavailable
  const localMatches = identifySchemesFromQuery(userQuery, schemes);
  if (localMatches.length > 0) {
    const explanations: Record<string, string> = {};
    localMatches.forEach((m) => {
      explanations[m.scheme.id] = m.matchReason;
    });

    return {
      identifiedGoal: userQuery.trim(),
      recommendedCategory: localMatches[0]?.scheme.category || 'All',
      matchedSchemeIds: localMatches.map((m) => m.scheme.id),
      explanations,
      searchTip: 'Review the eligibility rules and prepare your Aadhaar, bank passbook, and income certificate.',
    };
  }

  return null;
}
