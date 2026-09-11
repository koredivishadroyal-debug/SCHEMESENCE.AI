import React, { useState } from 'react';
import { 
  X, 
  Building2, 
  ExternalLink, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  FileText, 
  CheckSquare, 
  HelpCircle, 
  Calendar, 
  Phone, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  Volume2, 
  FileDown,
  ChevronDown,
  ChevronUp,
  Landmark,
  MessageSquare,
  UserCheck
} from 'lucide-react';
import { Scheme, RuleEvaluationResult, DocumentStatus, Language, UserProfile } from '../types';
import { getTranslation } from '../services/translations';
import { 
  getLocalizedScheme, 
  getLocalizedBenefitType, 
  getLocalizedEvaluation, 
  getSpeechSynthesisLang 
} from '../services/schemeLocalization';
import { getHostname, getSafeUrl } from '../services/urlUtils';
import { SchemeDocumentExportSection } from './SchemeDocumentExportSection';
import { exportSchemeDocumentsToPdf } from '../services/schemePdfExport';

interface SchemeDetailModalProps {
  scheme: Scheme;
  evaluation?: RuleEvaluationResult;
  language: Language;
  onClose: () => void;
  documentStatuses: Record<string, DocumentStatus>;
  onUpdateDocStatus: (schemeId: string, docId: string, status: DocumentStatus) => void;
  onOpenAiChatWithContext: (context: string) => void;
  initialTab?: 'overview' | 'eligibility' | 'documents' | 'application' | 'faq';
  userProfile?: UserProfile;
}

export const SchemeDetailModal: React.FC<SchemeDetailModalProps> = ({
  scheme,
  evaluation,
  language,
  onClose,
  documentStatuses,
  onUpdateDocStatus,
  onOpenAiChatWithContext,
  initialTab = 'overview',
  userProfile,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'eligibility' | 'documents' | 'application' | 'faq'>(initialTab);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [simplifiedExplanation, setSimplifiedExplanation] = useState<string | null>(null);
  const [isExplaining, setIsExplaining] = useState(false);
  const [isPlayingTts, setIsPlayingTts] = useState(false);
  const [isQuickExporting, setIsQuickExporting] = useState(false);
  const [quickExportSuccess, setQuickExportSuccess] = useState<string | null>(null);

  const t = (key: string) => getTranslation(key, language);

  const localizedScheme = getLocalizedScheme(scheme, language);
  const localizedEval = evaluation ? getLocalizedEvaluation(evaluation, language) : undefined;

  const handleQuickExport = () => {
    setIsQuickExporting(true);
    setQuickExportSuccess(null);
    try {
      const result = exportSchemeDocumentsToPdf(
        localizedScheme,
        documentStatuses,
        userProfile
      );
      setQuickExportSuccess(`"${result.fileName}" downloaded directly to your device.`);
      setTimeout(() => setQuickExportSuccess(null), 6000);
    } catch (err) {
      console.error(err);
      alert('Unable to generate PDF. Please ensure browser permissions allow downloads.');
    } finally {
      setIsQuickExporting(false);
    }
  };

  const handleReadAloud = (textToRead: string) => {
    if (!('speechSynthesis' in window)) {
      alert(t('audioNotSupported'));
      return;
    }

    if (isPlayingTts) {
      window.speechSynthesis.cancel();
      setIsPlayingTts(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = getSpeechSynthesisLang(language);
    utterance.rate = 0.95;
    utterance.onend = () => setIsPlayingTts(false);
    utterance.onerror = () => setIsPlayingTts(false);

    setIsPlayingTts(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleRequestSimpleExplanation = async () => {
    setIsExplaining(true);
    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Explain this government scheme in extremely simple, friendly, easy-to-understand terms for a common citizen in ${language}. Focus on: Who it is for, What cash/benefit they get, and What is the easiest way to apply. Scheme details: ${localizedScheme.name} - ${localizedScheme.plainSummary}`,
          language,
          schemeContext: `${localizedScheme.name}: ${localizedScheme.shortDescription}`,
        }),
      });
      const data = await res.json();
      setSimplifiedExplanation(data.reply || localizedScheme.plainSummary);
    } catch {
      setSimplifiedExplanation(localizedScheme.plainSummary);
    } finally {
      setIsExplaining(false);
    }
  };

  const verdict = localizedEval?.verdict;
  const matchScore = localizedEval?.aiMatchScore;

  const totalDocs = localizedScheme.requiredDocuments.length;
  const availableDocs = localizedScheme.requiredDocuments.filter(
    (d) => (documentStatuses[d.id] || 'Available') === 'Available'
  ).length;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-[#FAF9F5] w-full max-w-4xl rounded-3xl shadow-2xl border border-[#DFDACD] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Editorial Official Brief Header */}
        <div className="px-6 sm:px-8 py-6 bg-[#08110D] text-white flex items-start justify-between border-b border-[#155C45]/40">
          <div className="pr-4 max-w-2xl">
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#D88932] bg-[#D88932]/10 border border-[#D88932]/30 px-2.5 py-0.5 rounded">
                Official Government Dossier
              </span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
                {localizedScheme.governmentLevel === 'Central' ? 'Central Government' : localizedScheme.state || 'State Government'}
              </span>
              {localizedScheme.isOfficialSourceVerified && (
                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Verified Source</span>
                </span>
              )}
            </div>

            <h2 className="font-editorial text-2xl sm:text-3xl text-white font-bold tracking-tight leading-tight">
              {localizedScheme.name}
            </h2>

            <p className="text-xs text-stone-300 mt-1 flex items-center gap-1.5 font-light">
              <Building2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{localizedScheme.ministry || localizedScheme.department}</span>
            </p>

            {(localizedScheme.fees || localizedScheme.processingTime) && (
              <div className="flex items-center gap-3 mt-3 text-xs text-stone-300 font-mono">
                {localizedScheme.fees && (
                  <span className="px-2 py-0.5 rounded bg-white/10">
                    Statutory Fee: <strong className="text-white">{localizedScheme.fees}</strong>
                  </span>
                )}
                {localizedScheme.processingTime && (
                  <span className="px-2 py-0.5 rounded bg-white/10">
                    Timeline: <strong className="text-white">{localizedScheme.processingTime}</strong>
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleQuickExport}
              disabled={isQuickExporting}
              className="px-3 py-1.5 rounded-xl bg-[#155C45] hover:bg-[#1E7658] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition cursor-pointer border border-emerald-600/50 disabled:opacity-50"
              title="Download official PDF documents checklist directly to device"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isQuickExporting ? 'Exporting...' : 'Export Docs (PDF)'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-white/10 transition cursor-pointer shrink-0"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Export Toast Notification */}
        {quickExportSuccess && (
          <div className="px-6 py-2.5 bg-[#155C45] text-white text-xs font-bold flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-200 shrink-0" />
              <span>{quickExportSuccess}</span>
            </div>
            <button
              onClick={() => setQuickExportSuccess(null)}
              className="text-emerald-200 hover:text-white text-xs underline cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* High-Contrast Dossier Sub-Navigation Tabs */}
        <div className="px-6 border-b border-[#EAE6DB] bg-white flex items-center gap-2 sm:gap-6 overflow-x-auto text-xs font-semibold">
          {[
            { id: 'overview', label: 'Dossier Overview' },
            { id: 'eligibility', label: 'Eligibility Assessment', hasBadge: Boolean(verdict) },
            { id: 'documents', label: `Required Documents (${availableDocs}/${totalDocs})` },
            { id: 'application', label: 'Application Pathway' },
            { id: 'faq', label: 'Common Questions (FAQ)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-3.5 px-2 border-b-2 transition cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? 'border-[#155C45] text-[#155C45] font-bold'
                  : 'border-transparent text-[#6C746E] hover:text-[#08110D]'
              }`}
            >
              <span>{tab.label}</span>
              {tab.hasBadge && (
                <span className={`w-2 h-2 rounded-full ${
                  verdict === 'LIKELY_ELIGIBLE' ? 'bg-emerald-600' : verdict === 'POSSIBLY_ELIGIBLE' ? 'bg-amber-500' : 'bg-rose-500'
                }`} />
              )}
            </button>
          ))}
        </div>

        {/* Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-[#08110D]">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Primary Benefit Typographic Highlight Box */}
              <div className="p-6 rounded-2xl bg-white border border-[#DFDACD] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#155C45]">
                    PRIMARY WELFARE BENEFIT
                  </span>
                  <h3 className="font-editorial text-2xl sm:text-3xl text-[#08110D] font-bold mt-1 leading-snug">
                    {localizedScheme.mainBenefit}
                  </h3>
                  <p className="text-xs text-[#545B56] mt-1 font-mono">
                    Mode of Support: <strong className="text-[#155C45]">{getLocalizedBenefitType(localizedScheme.benefitType, language)}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={getSafeUrl(localizedScheme.officialUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-[#08110D] hover:bg-[#155C45] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition"
                  >
                    <span>Apply Officially</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Crisp Plain Language Synthesis */}
              <div className="p-5 rounded-2xl bg-white border border-[#DFDACD]">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 font-bold text-[#08110D] text-sm">
                    <Sparkles className="w-4 h-4 text-[#D88932]" />
                    <span>Citizen Explanation (Plain Language)</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleReadAloud(simplifiedExplanation || localizedScheme.plainSummary)}
                      className="p-1.5 rounded-lg bg-[#FAF9F5] hover:bg-[#F4F2EB] border border-[#DFDACD] text-[#545B56] text-xs font-semibold flex items-center gap-1 cursor-pointer"
                      title="Read aloud with Text-to-Speech"
                    >
                      <Volume2 className={`w-3.5 h-3.5 ${isPlayingTts ? 'text-[#155C45] animate-pulse' : ''}`} />
                      <span className="hidden sm:inline">{isPlayingTts ? 'Stop' : 'Listen'}</span>
                    </button>

                    <button
                      onClick={handleRequestSimpleExplanation}
                      disabled={isExplaining}
                      className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-[#155C45] border border-emerald-200 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#155C45]" />
                      <span>{isExplaining ? 'Simplifying...' : 'Simplify Language'}</span>
                    </button>
                  </div>
                </div>

                <p className="text-sm text-[#545B56] leading-relaxed">
                  {simplifiedExplanation || localizedScheme.plainSummary}
                </p>
              </div>

              {/* Official Source & Verification Block */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-[#DFDACD] bg-white">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#6C746E] block mb-1">
                    OFFICIAL CITATION
                  </span>
                  <p className="text-xs font-bold text-[#08110D]">
                    {localizedScheme.sourceDocument}
                  </p>
                  <p className="text-[11px] font-mono text-[#88908A] mt-1">
                    Last Verified: {localizedScheme.lastVerified}
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-[#DFDACD] bg-white">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#6C746E] block mb-1">
                    NODAL HELPLINE & SUPPORT
                  </span>
                  <p className="text-xs font-bold text-[#08110D] flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#155C45]" />
                    <span>{localizedScheme.helpline}</span>
                  </p>
                  <a
                    href={getSafeUrl(localizedScheme.officialUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-[#155C45] hover:underline font-bold mt-1 inline-flex items-center gap-1 font-mono"
                  >
                    <span>Visit Gateway ({getHostname(localizedScheme.officialUrl)})</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ELIGIBILITY ASSESSMENT */}
          {activeTab === 'eligibility' && (
            <div className="space-y-6">
              {/* Verdict Header */}
              {localizedEval ? (
                <div className={`p-5 rounded-2xl border ${
                  verdict === 'LIKELY_ELIGIBLE'
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                    : verdict === 'POSSIBLY_ELIGIBLE'
                    ? 'bg-amber-50 border-amber-300 text-amber-950'
                    : 'bg-rose-50 border-rose-300 text-rose-950'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {verdict === 'LIKELY_ELIGIBLE' && (
                        <CheckCircle2 className="w-7 h-7 text-emerald-600 shrink-0" />
                      )}
                      {verdict === 'POSSIBLY_ELIGIBLE' && (
                        <AlertTriangle className="w-7 h-7 text-amber-600 shrink-0" />
                      )}
                      {verdict === 'LIKELY_NOT_ELIGIBLE' && (
                        <XCircle className="w-7 h-7 text-rose-600 shrink-0" />
                      )}
                      <div>
                        <span className="text-xs font-mono font-bold uppercase tracking-wider opacity-80">
                          Automated Rule Evaluation
                        </span>
                        <h3 className="text-lg font-bold">
                          {verdict === 'LIKELY_ELIGIBLE' && '🟢 Likely Eligible'}
                          {verdict === 'POSSIBLY_ELIGIBLE' && '🟡 Review Specified Conditions'}
                          {verdict === 'LIKELY_NOT_ELIGIBLE' && '🔴 Not Eligible Based on Profile'}
                        </h3>
                      </div>
                    </div>

                    <div className="text-right bg-white/80 px-3 py-1.5 rounded-xl border border-current/20">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider block opacity-70">
                        Match Confidence
                      </span>
                      <span className="text-base font-bold font-mono">{matchScore}% Match</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-white border border-[#DFDACD] text-xs text-[#545B56]">
                  Complete your citizen profile to unlock automatic rule assessment against your income, location, and social category.
                </div>
              )}

              {/* Explicit Criteria Breakdown Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                <div className="p-4 rounded-xl bg-white border border-[#DFDACD]">
                  <span className="text-[10px] font-mono font-bold text-[#6C746E] uppercase block">Age Limits</span>
                  <p className="font-bold text-[#08110D] mt-1">
                    {localizedScheme.eligibilityRules.minAge ? `${localizedScheme.eligibilityRules.minAge} years` : 'No minimum'} - {localizedScheme.eligibilityRules.maxAge ? `${localizedScheme.eligibilityRules.maxAge} years` : 'No maximum'}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#DFDACD]">
                  <span className="text-[10px] font-mono font-bold text-[#6C746E] uppercase block">Annual Income Ceiling</span>
                  <p className="font-bold text-[#08110D] mt-1">
                    {localizedScheme.eligibilityRules.maxIncome ? `Up to ₹${(localizedScheme.eligibilityRules.maxIncome / 100000).toFixed(1)} Lakh/year` : 'No specific income cap'}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#DFDACD]">
                  <span className="text-[10px] font-mono font-bold text-[#6C746E] uppercase block">Jurisdiction</span>
                  <p className="font-bold text-[#08110D] mt-1">
                    {localizedScheme.governmentLevel === 'Central' ? 'All-India (Central)' : localizedScheme.state || 'State-Specific'}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#DFDACD]">
                  <span className="text-[10px] font-mono font-bold text-[#6C746E] uppercase block">Gender Qualification</span>
                  <p className="font-bold text-[#08110D] mt-1">
                    {localizedScheme.eligibilityRules.gender ? localizedScheme.eligibilityRules.gender : 'All Genders'}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#DFDACD]">
                  <span className="text-[10px] font-mono font-bold text-[#6C746E] uppercase block">Social Category</span>
                  <p className="font-bold text-[#08110D] mt-1">
                    {localizedScheme.eligibilityRules.socialCategories ? localizedScheme.eligibilityRules.socialCategories.join(', ') : 'General / All Categories'}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#DFDACD]">
                  <span className="text-[10px] font-mono font-bold text-[#6C746E] uppercase block">Occupation / Sector</span>
                  <p className="font-bold text-[#08110D] mt-1">
                    {localizedScheme.eligibilityRules.occupations ? localizedScheme.eligibilityRules.occupations.join(', ') : 'Any Occupation'}
                  </p>
                </div>
              </div>

              {/* Transparent Reasoning: Why you match */}
              {localizedEval?.whyYouMatch && localizedEval.whyYouMatch.length > 0 && (
                <div className="p-5 rounded-2xl bg-white border border-[#DFDACD]">
                  <h4 className="font-bold text-sm text-[#08110D] flex items-center gap-2 mb-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Satisfied Eligibility Criteria</span>
                  </h4>
                  <ul className="space-y-2 text-xs text-[#545B56]">
                    {localizedEval.whyYouMatch.map((reason, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-2">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: REQUIRED DOCUMENTS */}
          {activeTab === 'documents' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-white border border-[#DFDACD] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-sm text-[#08110D]">
                    Document Readiness Checklist
                  </h3>
                  <p className="text-xs text-[#6C746E] mt-0.5">
                    Track the status of your records before beginning the application.
                  </p>
                </div>

                <button
                  onClick={handleQuickExport}
                  disabled={isQuickExporting}
                  className="px-4 py-2 rounded-xl bg-[#155C45] hover:bg-[#1E7658] text-white text-xs font-bold flex items-center gap-1.5 transition cursor-pointer self-start sm:self-auto"
                >
                  <FileDown className="w-3.5 h-3.5" />
                  <span>Download PDF Checklist</span>
                </button>
              </div>

              {/* Document items list */}
              <div className="space-y-3">
                {localizedScheme.requiredDocuments.map((doc) => {
                  const currentStatus = documentStatuses[doc.id] || 'Available';
                  return (
                    <div
                      key={doc.id}
                      className="p-4 rounded-xl bg-white border border-[#DFDACD] space-y-2"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <span className="font-bold text-sm text-[#08110D] flex items-center gap-2">
                          <FileText className="w-4 h-4 text-[#155C45]" />
                          <span>{doc.name}</span>
                        </span>

                        <div className="flex items-center gap-1.5 text-xs font-semibold">
                          {(['Available', 'Need to Apply', 'Not Available'] as DocumentStatus[]).map((st) => (
                            <button
                              key={st}
                              onClick={() => onUpdateDocStatus(scheme.id, doc.id, st)}
                              className={`px-2.5 py-1 rounded-lg text-[11px] transition cursor-pointer ${
                                currentStatus === st
                                  ? st === 'Available'
                                    ? 'bg-emerald-600 text-white'
                                    : st === 'Need to Apply'
                                    ? 'bg-amber-500 text-white'
                                    : 'bg-rose-600 text-white'
                                  : 'bg-[#FAF9F5] hover:bg-[#F4F2EB] text-[#6C746E] border border-[#DFDACD]'
                              }`}
                            >
                              {st}
                            </button>
                          ))}
                        </div>
                      </div>

                      <p className="text-xs text-[#545B56] leading-relaxed">
                        <strong className="text-[#08110D]">Why needed:</strong> {doc.whyNeeded}
                      </p>

                      <div className="text-xs text-[#6C746E] bg-[#FAF9F5] p-2.5 rounded-lg border border-[#EAE6DB] flex items-start justify-between gap-2">
                        <span>
                          <strong className="text-[#08110D]">How to obtain:</strong> {doc.howToObtain}
                        </span>
                        {doc.officialLink && (
                          <a
                            href={doc.officialLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#155C45] hover:underline font-bold shrink-0 inline-flex items-center gap-1 font-mono text-[11px]"
                          >
                            <span>Gov Portal</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: APPLICATION PROCESS */}
          {activeTab === 'application' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-2 border-b border-[#EAE6DB]">
                <div>
                  <h3 className="font-bold text-sm text-[#08110D]">
                    Step-by-Step Application Pathway
                  </h3>
                  <p className="text-xs text-[#6C746E] mt-0.5">
                    Official procedure prescribed by the nodal department.
                  </p>
                </div>

                <a
                  href={getSafeUrl(localizedScheme.officialUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#08110D] hover:bg-[#155C45] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition"
                >
                  <span>Open Official Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Vertical Steps Pathway */}
              <div className="space-y-4">
                {localizedScheme.applicationSteps.map((step) => (
                  <div
                    key={step.stepNumber}
                    className="flex items-start gap-4 p-4 rounded-xl bg-white border border-[#DFDACD]"
                  >
                    <div className="w-7 h-7 rounded-full bg-[#155C45] text-white font-bold font-mono text-xs flex items-center justify-center shrink-0">
                      {step.stepNumber}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-[#08110D]">
                        {step.title}
                      </h4>
                      <p className="text-xs text-[#545B56] mt-1 leading-relaxed">
                        {step.description}
                      </p>
                      {step.portalUrl && (
                        <a
                          href={step.portalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-bold text-[#155C45] hover:underline mt-2 font-mono"
                        >
                          <span>{step.portalUrl}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Official Gateway Advisory */}
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 space-y-1">
                <span className="font-bold flex items-center gap-1.5 text-[#155C45]">
                  <ShieldCheck className="w-4 h-4 text-[#155C45]" />
                  Official Nodal Gateway Notice
                </span>
                <p className="leading-relaxed text-emerald-900">
                  SchemeSense AI guides you directly to the official state or central government portal. We do not collect application fees or handle citizen funds.
                </p>
              </div>
            </div>
          )}

          {/* TAB 5: FAQ */}
          {activeTab === 'faq' && (
            <div className="space-y-3">
              {[
                {
                  q: 'Who is eligible and can multiple members of my family apply?',
                  a: 'Eligibility depends on the specific scheme criteria set by the nodal department. For direct benefit transfer (DBT) programs like PM-KISAN, benefits are provided per eligible household/landowner. For individual scholarships or pension programs, each family member fulfilling the age and income conditions may apply individually.'
                },
                {
                  q: 'How long does it take for financial benefits or DBT transfers to reflect?',
                  a: 'Direct Benefit Transfer (DBT) usually reflects in the beneficiary’s Aadhaar-seeded bank account within 15 to 45 working days following district/nodal officer scrutiny. You can track real-time disbursement status using the official portal link.'
                },
                {
                  q: 'Are there any charges or middlemen required to submit an application?',
                  a: 'No. Government applications on official .gov.in and state portals are free of charge (except for nominal statutory processing fees where explicitly notified). SchemeSense AI never charges any fee and connects you directly to official government portals.'
                },
                {
                  q: 'What documents should I prepare before applying?',
                  a: 'Essential documents typically include Aadhaar Card, proof of address/domicile, an active bank passbook showing IFSC code, and relevant income/caste or category certificates. You can use our "Export Documents PDF" feature to download an offline checklist.'
                }
              ].map((faq, fIdx) => (
                <div key={fIdx} className="p-4 rounded-xl bg-white border border-[#DFDACD]">
                  <h4 className="font-bold text-sm text-[#08110D] mb-1">
                    {faq.q}
                  </h4>
                  <p className="text-xs text-[#545B56] leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Persistent Bottom Actions Bar */}
        <div className="px-6 py-4 bg-white border-t border-[#EAE6DB] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenAiChatWithContext(`I have a question regarding ${localizedScheme.name}. Can you help explain its requirements?`)}
              className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-[#155C45] border border-emerald-200 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#155C45]" />
              <span>Ask AI About This Scheme</span>
            </button>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#545B56] hover:text-[#08110D] hover:bg-[#FAF9F5] transition cursor-pointer"
            >
              Close Dossier
            </button>

            <a
              href={getSafeUrl(localizedScheme.officialUrl)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-[#08110D] hover:bg-[#155C45] text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-xs transition cursor-pointer"
            >
              <span>Apply on Official Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
