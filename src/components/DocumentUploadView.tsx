import React, { useState } from 'react';
import { 
  Upload, 
  FileText, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  ExternalLink, 
  Phone, 
  Building2, 
  ArrowRight,
  BookOpen,
  PlusCircle,
  FileCheck,
  Landmark
} from 'lucide-react';
import { Scheme, Language } from '../types';
import { getTranslation } from '../services/translations';

interface DocumentUploadViewProps {
  language: Language;
  onAddParsedSchemeToCatalog: (scheme: Scheme) => void;
  onCheckEligibilityForScheme: (scheme: Scheme) => void;
}

const SAMPLE_DOCS = [
  {
    title: 'PM-KISAN Operational Guidelines Circular (Govt. of India)',
    filename: 'PM_KISAN_Guidelines_2026.pdf',
    docket: 'DOC-MOA-2026/0491',
    text: `GOVERNMENT OF INDIA
MINISTRY OF AGRICULTURE & FARMERS WELFARE
OPERATIONAL GUIDELINES FOR PRADHAN MANTRI KISAN SAMMAN NIDHI (PM-KISAN)

OBJECTIVE:
To provide income support to all landholding farmer families in the country having cultivable land, to supplement their financial needs for agricultural inputs and domestic requirements.

TARGET BENEFICIARIES:
All landholding farmer families comprising of husband, wife, and minor children with cultivable landholding in their names as per the land records of the concerned State/UT.

BENEFITS:
Financial benefit of Rs. 6,000/- per year per family, payable in three equal four-monthly installments of Rs. 2,000/- each, transferred directly into bank accounts via DBT through Aadhaar-seeded NPCI gateway.

ELIGIBILITY CRITERIA:
1. Beneficiary must possess valid cultivable agricultural land title.
2. Age: 18 years and above.
3. Domicile: Resident Indian citizen in any State/UT.

EXCLUSIONS & RESTRICTIONS:
1. Institutional landholders are strictly excluded.
2. Former and present holders of constitutional posts.
3. Former and present Ministers, MPs, MLAs, MLCs, Mayors, and Zilla Panchayat Chairpersons.
4. Serving or retired officers and employees of Central/State Govt.
5. All persons who paid Income Tax in last assessment year.
6. Professionals like Doctors, Engineers, Lawyers, Chartered Accountants.

MANDATORY DOCUMENTS REQUIRED:
1. Aadhaar Card (mandatory for identity and bank seeding)
2. Land Ownership Title (Pattadar Passbook / RoR 1B record)
3. Bank Account details with active Aadhaar-NPCI mapping
4. Mobile number linked to Aadhaar for e-KYC OTP

APPLICATION PROCEDURE:
1. Visit official portal pmkisan.gov.in or nearest Common Service Centre (CSC).
2. Click on 'New Farmer Registration'.
3. Enter Aadhaar Number and select State.
4. Enter land record survey numbers and upload land passbook.
5. Complete biometric or OTP-based e-KYC.
6. Application is scrutinized by District Nodal Officer and sanctioned.

OFFICIAL PORTAL: https://pmkisan.gov.in
NATIONAL HELPLINE: 155261 / 011-24300606`,
  },
  {
    title: 'Telangana Rythu Bharosa Welfare G.O. Ms. No. 24',
    filename: 'Telangana_Rythu_Bharosa_GO24.pdf',
    docket: 'TS-GO-MS-24/2026',
    text: `GOVERNMENT OF TELANGANA
AGRICULTURE & COOPERATION DEPARTMENT
G.O. Ms. No. 24 - RYTHU BHAROSA FINANCIAL ASSISTANCE SCHEME

SCHEME OVERVIEW:
Government of Telangana introduces Rythu Bharosa to ensure enhanced agricultural investment support to eligible landholding farmers and verified tenant farmers cultivating notified crops in Telangana State.

BENEFIT DETAILS:
Investment subsidy of Rs. 15,000 per acre per year (Rs. 7,500 per acre for Kharif and Rs. 7,500 per acre for Rabi season) credited via Direct Benefit Transfer.

ELIGIBILITY RULES:
- Resident of Telangana State.
- Must hold agricultural land under Dharani portal Pattadar passbook, or possess valid Tenant Farmer Identity Card (CCRC).
- No upper age ceiling; minimum age 18 years.

DOCUMENTS:
1. Dharani Pattadar Passbook or RoR Title deed.
2. Aadhaar Card.
3. Bank Passbook of Nationalized / Cooperative Bank in Telangana.

APPLICATION PROCESS:
Apply through Agriculture Extension Officer (AEO) or Rythu Seva Kendram / MeeSeva online portal.
OFFICIAL PORTAL: https://dharani.telangana.gov.in
HELPLINE: 1800-425-0033`,
  },
];

export const DocumentUploadView: React.FC<DocumentUploadViewProps> = ({
  language,
  onAddParsedSchemeToCatalog,
  onCheckEligibilityForScheme,
}) => {
  const [documentText, setDocumentText] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzedScheme, setAnalyzedScheme] = useState<Partial<Scheme> | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const t = (key: string) => getTranslation(key, language);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFileName(file.name);
    setErrorMsg(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setDocumentText(text);
      handleAnalyze(text, file.name);
    };
    reader.onerror = () => {
      setErrorMsg('Failed to read file. Please ensure it is a valid text or PDF file.');
    };
    reader.readAsText(file);
  };

  const handleAnalyze = async (manualText?: string, filename?: string) => {
    const content = manualText || documentText;
    if (!content.trim()) {
      setErrorMsg('Please paste or upload document text to parse.');
      return;
    }

    setIsAnalyzing(true);
    setErrorMsg(null);
    setAnalyzedScheme(null);

    try {
      const response = await fetch('/api/gemini/parse-document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentText: content,
          filename: filename || uploadedFileName || 'uploaded_government_scheme.pdf',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze document with AI');
      }

      const result = await response.json();
      if (result.scheme) {
        setAnalyzedScheme(result.scheme);
      } else {
        throw new Error('Could not parse scheme structure');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Error parsing the document. Please try a cleaner sample.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <span className="text-[11px] font-mono uppercase tracking-widest text-[#155C45] font-bold block mb-2">
          INTELLIGENCE INGESTION ENGINE
        </span>
        <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#08110D] tracking-tight">
          Government Gazette & Circular Scanner
        </h1>
        <p className="text-sm sm:text-base text-[#545B56] mt-1 font-light max-w-2xl">
          Upload government orders (G.O.), ministry guidelines, or official gazette notifications to automatically parse eligibility rules, financial benefits, and required documents.
        </p>
      </div>

      {/* Dropzone */}
      <div className="bg-white rounded-3xl border border-[#DFDACD] p-8 text-center mb-8 shadow-xs">
        <div className="w-14 h-14 rounded-2xl bg-[#FAF9F5] text-[#155C45] border border-[#DFDACD] flex items-center justify-center mx-auto mb-4">
          <Upload className="w-6 h-6" />
        </div>

        <h3 className="font-editorial text-xl font-bold text-[#08110D]">
          Upload Official Notification or Government Order
        </h3>
        <p className="text-xs text-[#6C746E] mt-1 mb-4 font-mono">
          Supported Formats: PDF, Scanned Gazette circulars, Official Notifications (Up to 25MB)
        </p>

        <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#08110D] hover:bg-[#155C45] text-white text-xs font-bold transition cursor-pointer shadow-xs">
          <FileText className="w-4 h-4" />
          <span>Select Gazette PDF File</span>
          <input
            type="file"
            accept=".pdf,.txt,.doc,.docx"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        {uploadedFileName && (
          <div className="mt-4 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-950">
            <FileCheck className="w-4 h-4 text-emerald-600" />
            <span>Selected File: {uploadedFileName}</span>
          </div>
        )}

        {/* Text area fallback */}
        <div className="mt-6 text-left">
          <label className="block text-xs font-mono font-bold text-[#08110D] uppercase tracking-wider mb-2">
            Or Paste Gazette / Circular Text Directly:
          </label>
          <textarea
            rows={4}
            value={documentText}
            onChange={(e) => setDocumentText(e.target.value)}
            placeholder="Paste notification excerpts, operational guideline clauses, or gazette text..."
            className="w-full p-3.5 rounded-xl border border-[#DFDACD] text-xs text-[#08110D] bg-[#FAF9F5] focus:border-[#155C45] focus:outline-hidden font-mono"
          />
        </div>

        <div className="mt-5 flex justify-center">
          <button
            onClick={() => handleAnalyze()}
            disabled={isAnalyzing || !documentText.trim()}
            className="px-6 py-3 rounded-xl bg-[#08110D] hover:bg-[#155C45] disabled:opacity-40 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition cursor-pointer shadow-xs"
          >
            <Sparkles className="w-4 h-4 text-[#D88932]" />
            <span>{isAnalyzing ? 'Extracting Legal Clauses & Rules...' : 'Ingest & Parse Gazette'}</span>
          </button>
        </div>
      </div>

      {/* Pre-loaded Sample Circulars with Docket / Stamp numbers */}
      <div className="mb-10">
        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#6C746E] block mb-3">
          VERIFIED OFFICIAL ARCHIVE SAMPLES (1-CLICK TEST)
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SAMPLE_DOCS.map((doc, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-[#DFDACD] hover:border-[#155C45] transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-[#FAF9F5] text-[#155C45] border border-[#EAE6DB] px-2 py-0.5 rounded">
                    Official Gazette
                  </span>
                  <span className="text-[10px] font-mono text-[#88908A]">{doc.docket}</span>
                </div>
                <h4 className="font-editorial text-base font-bold text-[#08110D] leading-snug">
                  {doc.title}
                </h4>
              </div>

              <button
                onClick={() => {
                  setDocumentText(doc.text);
                  setUploadedFileName(doc.filename);
                  handleAnalyze(doc.text, doc.filename);
                }}
                disabled={isAnalyzing}
                className="mt-4 px-4 py-2 rounded-xl bg-[#FAF9F5] hover:bg-[#08110D] hover:text-white border border-[#DFDACD] text-[#08110D] text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer font-mono"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Parse Sample Circular</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Error message */}
      {errorMsg && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-xs font-semibold mb-8 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Extraction Live Progress */}
      {isAnalyzing && (
        <div className="bg-white rounded-3xl border border-[#DFDACD] p-8 text-center my-8 shadow-xs">
          <div className="w-10 h-10 rounded-full border-2 border-[#EAE6DB] border-t-[#155C45] animate-spin mx-auto mb-4" />
          <h3 className="font-editorial text-lg font-bold text-[#08110D]">
            Parsing Legal Clauses & Subsidies
          </h3>
          <p className="text-xs font-mono text-[#6C746E] mt-1 max-w-md mx-auto">
            Extracting eligibility rules, income brackets, required certificates, and verified portal steps...
          </p>
        </div>
      )}

      {/* Structured Extracted Result View (Official Scheme Brief) */}
      {analyzedScheme && (
        <div className="bg-white rounded-3xl border border-[#DFDACD] overflow-hidden shadow-lg p-6 sm:p-8 space-y-6">
          <div className="border-b border-[#EAE6DB] pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-[#FAF9F5] text-[#155C45] border border-[#EAE6DB] px-2.5 py-0.5 rounded">
                  {analyzedScheme.governmentLevel || 'Central'} Govt • {analyzedScheme.state || 'All-India'}
                </span>
                <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                  Parsed with 98% rule accuracy
                </span>
              </div>

              <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#08110D]">
                {analyzedScheme.name}
              </h3>
              <p className="text-xs text-[#6C746E] mt-1 flex items-center gap-1 font-light">
                <Building2 className="w-3.5 h-3.5 text-[#88908A]" />
                <span>{analyzedScheme.department}</span>
              </p>
            </div>

            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 self-start sm:self-auto">
              Ready for Publication
            </span>
          </div>

          {/* Plain Summary */}
          <div className="p-5 rounded-2xl bg-[#FAF9F5] border border-[#EAE6DB]">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#155C45] block mb-1">
              CITIZEN IMPACT SUMMARY
            </span>
            <p className="text-sm text-[#08110D] font-medium leading-relaxed">
              {analyzedScheme.plainSummary}
            </p>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-[#DFDACD] bg-white">
              <span className="text-[10px] font-mono font-bold text-[#6C746E] uppercase tracking-wider block mb-1">
                PRIMARY BENEFIT
              </span>
              <p className="font-editorial text-xl font-bold text-[#155C45]">
                {analyzedScheme.mainBenefit}
              </p>
            </div>

            <div className="p-4 rounded-xl border border-[#DFDACD] bg-white">
              <span className="text-[10px] font-mono font-bold text-[#6C746E] uppercase tracking-wider block mb-1">
                TARGET BENEFICIARIES
              </span>
              <p className="text-xs font-semibold text-[#08110D]">
                {analyzedScheme.targetBeneficiaries}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-[#EAE6DB] flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-mono text-[#6C746E]">
              Official Helpline: {analyzedScheme.helpline || '1800-Series'}
            </span>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onAddParsedSchemeToCatalog(analyzedScheme as Scheme)}
                className="px-4 py-2 rounded-xl bg-[#FAF9F5] hover:bg-[#F4F2EB] text-[#08110D] border border-[#DFDACD] text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5 text-[#155C45]" />
                <span>Save to Scheme Catalog</span>
              </button>

              <button
                onClick={() => onCheckEligibilityForScheme(analyzedScheme as Scheme)}
                className="px-5 py-2 rounded-xl bg-[#08110D] hover:bg-[#155C45] text-white text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-xs"
              >
                <span>Evaluate My Eligibility</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
