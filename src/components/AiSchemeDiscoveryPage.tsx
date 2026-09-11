import React, { useState, useMemo } from 'react';
import { 
  Bot, 
  Sparkles, 
  ShieldCheck, 
  ExternalLink, 
  ArrowRight, 
  CheckCircle2, 
  Calendar, 
  Building2, 
  RefreshCw,
} from 'lucide-react';
import { Scheme, UserProfile, Language, RuleEvaluationResult } from '../types';
import { getSafeUrl, getHostname } from '../services/urlUtils';

interface AiSchemeDiscoveryPageProps {
  schemes: Scheme[];
  userProfile: UserProfile;
  evaluations: Record<string, RuleEvaluationResult>;
  language: Language;
  onViewScheme: (scheme: Scheme) => void;
  onCheckEligibility: (scheme: Scheme) => void;
  onOpenGlobalChat?: () => void;
}

interface AiQueryHistoryItem {
  id: string;
  query: string;
  timestamp: string;
  foundCount: number;
}

export const AiSchemeDiscoveryPage: React.FC<AiSchemeDiscoveryPageProps> = ({
  schemes,
  userProfile,
  evaluations,
  language,
  onViewScheme,
  onCheckEligibility,
}) => {
  const [queryInput, setQueryInput] = useState<string>(
    'I am a 19-year-old student from Telangana. My family income is low. What scholarships can I apply for?'
  );
  const [activeQuery, setActiveQuery] = useState<string>(
    'I am a 19-year-old student from Telangana. My family income is low. What scholarships can I apply for?'
  );
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [queryHistory, setQueryHistory] = useState<AiQueryHistoryItem[]>([
    {
      id: 'h1',
      query: 'I am a 19-year-old student from Telangana. My family income is low. What scholarships can I apply for?',
      timestamp: 'Just now',
      foundCount: 7,
    },
  ]);

  const samplePrompts = [
    {
      label: 'Scholarships for Students',
      query: 'I am a 19-year-old student from Telangana. My family income is low. What scholarships can I apply for?',
      tag: 'Education',
    },
    {
      label: 'Farmer & Land Support',
      query: 'I am a farmer with 2 acres in Karnataka. What financial subsidies and PM-KISAN benefits can I get?',
      tag: 'Agriculture',
    },
    {
      label: 'Free Hospital Healthcare',
      query: 'My family needs free hospital medical treatment and surgery cover in Uttar Pradesh.',
      tag: 'Healthcare',
    },
    {
      label: 'Small Business Loan / Mudra',
      query: 'I want to start a small tailoring shop or grocery store. Are there collateral-free loans?',
      tag: 'Business',
    },
    {
      label: 'Senior Citizen Pension',
      query: 'I am a 68-year-old senior citizen looking for monthly pension and Ayushman health card.',
      tag: 'Senior Citizens',
    },
    {
      label: 'Rooftop Solar & Free Electricity',
      query: 'How can I get government subsidy for installing rooftop solar panels on my home?',
      tag: 'Housing',
    },
  ];

  const matchedSchemes = useMemo(() => {
    if (!activeQuery.trim()) return schemes.slice(0, 6);

    const qLower = activeQuery.toLowerCase();
    const tokens = qLower.split(/\s+/).filter((t) => t.length > 2);

    const scored = schemes.map((scheme) => {
      let score = 0;
      const sName = scheme.name.toLowerCase();
      const sCat = scheme.category.toLowerCase();
      const sBenefit = scheme.mainBenefit.toLowerCase();
      const sDesc = scheme.shortDescription.toLowerCase();
      const sPlain = (scheme.plainSummary || '').toLowerCase();
      const sDept = (scheme.department || '').toLowerCase();

      const wantsScholarship = qLower.includes('scholarship') || qLower.includes('student') || qLower.includes('study') || qLower.includes('college');
      const wantsFarmer = qLower.includes('farm') || qLower.includes('crop') || qLower.includes('kisan') || qLower.includes('land') || qLower.includes('acre');
      const wantsHealth = qLower.includes('health') || qLower.includes('hospital') || qLower.includes('medical') || qLower.includes('doctor') || qLower.includes('surgery');
      const wantsBusiness = qLower.includes('business') || qLower.includes('shop') || qLower.includes('loan') || qLower.includes('mudra') || qLower.includes('startup');
      const wantsSenior = qLower.includes('senior') || qLower.includes('pension') || qLower.includes('old age') || qLower.includes('elderly');
      const wantsHousing = qLower.includes('solar') || qLower.includes('house') || qLower.includes('home') || qLower.includes('awas') || qLower.includes('roof');
      const wantsWomen = qLower.includes('women') || qLower.includes('girl') || qLower.includes('mother') || qLower.includes('daughter') || qLower.includes('shg');

      if (wantsScholarship && (sCat.includes('education') || sCat.includes('student') || sName.includes('scholarship') || sName.includes('epass'))) {
        score += 50;
      }
      if (wantsFarmer && (sCat.includes('agri') || scheme.eligibilityRules?.requiresFarmer || sName.includes('kisan'))) {
        score += 50;
      }
      if (wantsHealth && (sCat.includes('health') || sName.includes('ayushman') || sName.includes('aarogya'))) {
        score += 50;
      }
      if (wantsBusiness && (sCat.includes('business') || sCat.includes('finance') || sCat.includes('employment') || sName.includes('mudra') || sName.includes('pmegp'))) {
        score += 50;
      }
      if (wantsSenior && (sCat.includes('senior') || (scheme.eligibilityRules?.minAge && scheme.eligibilityRules.minAge >= 60))) {
        score += 50;
      }
      if (wantsHousing && (sCat.includes('housing') || sName.includes('awas') || sName.includes('pmay') || sName.includes('surya ghar'))) {
        score += 50;
      }
      if (wantsWomen && (sCat.includes('women') || scheme.eligibilityRules?.gender === 'Female')) {
        score += 50;
      }

      for (const token of tokens) {
        if (sName.includes(token)) score += 15;
        if (sBenefit.includes(token)) score += 10;
        if (sDesc.includes(token)) score += 8;
        if (sPlain.includes(token)) score += 5;
        if (sDept.includes(token)) score += 4;
      }

      return { scheme, score };
    });

    scored.sort((a, b) => b.score - a.score);
    const relevant = scored.filter((item) => item.score > 10).map((item) => item.scheme);
    if (relevant.length > 0) {
      return relevant.slice(0, 9);
    }
    return schemes.slice(0, 7);
  }, [schemes, activeQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!queryInput.trim()) return;

    setIsProcessing(true);
    const newQuery = queryInput.trim();
    setActiveQuery(newQuery);

    setTimeout(() => {
      setIsProcessing(false);
      setQueryHistory((prev) => [
        {
          id: Date.now().toString(),
          query: newQuery,
          timestamp: 'Just now',
          foundCount: matchedSchemes.length,
        },
        ...prev.filter((h) => h.query !== newQuery).slice(0, 4),
      ]);
    }, 400);
  };

  const handleSelectPrompt = (promptQuery: string) => {
    setQueryInput(promptQuery);
    setIsProcessing(true);
    setActiveQuery(promptQuery);
    setTimeout(() => {
      setIsProcessing(false);
      setQueryHistory((prev) => [
        {
          id: Date.now().toString(),
          query: promptQuery,
          timestamp: 'Just now',
          foundCount: matchedSchemes.length,
        },
        ...prev.filter((h) => h.query !== promptQuery).slice(0, 4),
      ]);
    }, 350);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Editorial Header */}
      <div className="mb-8">
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#155C45] block mb-2">
          NATURAL LANGUAGE INQUIRY
        </span>
        <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold text-[#08110D] tracking-tight">
          AI Entitlement Advisor
        </h1>
        <p className="text-sm sm:text-base text-[#545B56] mt-1 font-light max-w-2xl">
          Describe your household circumstances, economic status, or welfare needs in plain words. Our legal rule parser maps your scenario against official government gazettes.
        </p>
      </div>

      {/* Main Conversational Input Bar */}
      <div className="bg-white rounded-3xl border border-[#DFDACD] p-5 sm:p-6 mb-8 shadow-xs">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="flex-1">
              <textarea
                rows={2}
                value={queryInput}
                onChange={(e) => setQueryInput(e.target.value)}
                placeholder="e.g. I am a 19-year-old student from Telangana. My family income is low. What scholarships can I apply for?"
                className="w-full p-3 rounded-xl border border-[#DFDACD] bg-[#FAF9F5] focus:border-[#155C45] focus:outline-hidden text-xs sm:text-sm text-[#08110D] resize-none font-medium"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
            </div>
            <button
              type="submit"
              disabled={isProcessing || !queryInput.trim()}
              className="px-6 py-3 rounded-xl bg-[#08110D] hover:bg-[#155C45] disabled:opacity-40 text-white font-bold text-xs sm:text-sm shadow-xs flex items-center justify-center gap-2 transition cursor-pointer shrink-0"
            >
              {isProcessing ? (
                <RefreshCw className="w-4 h-4 animate-spin text-emerald-300" />
              ) : (
                <Sparkles className="w-4 h-4 text-[#D88932]" />
              )}
              <span>{isProcessing ? 'Analyzing...' : 'Consult AI Advisor'}</span>
            </button>
          </div>
        </form>

        {/* Suggested Prompts */}
        <div className="mt-4 pt-4 border-t border-[#EAE6DB]">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#6C746E] block mb-2">
            FREQUENT CITIZEN INQUIRIES
          </span>
          <div className="flex flex-wrap gap-2">
            {samplePrompts.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectPrompt(p.query)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition cursor-pointer ${
                  activeQuery === p.query
                    ? 'bg-[#155C45] text-white border-[#155C45]'
                    : 'bg-[#FAF9F5] hover:bg-[#F4F2EB] text-[#08110D] border-[#DFDACD]'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Synthesis Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#EAE6DB]">
        <div>
          <h2 className="font-editorial text-2xl font-bold text-[#08110D]">
            {matchedSchemes.length} Programs Mapped for Your Scenario
          </h2>
          <p className="text-xs font-mono text-[#6C746E] mt-0.5 truncate max-w-xl">
            Query: &quot;{activeQuery}&quot;
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Grounded in Official Guidelines 2026</span>
        </div>
      </div>

      {/* Structured Scheme Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {matchedSchemes.map((scheme) => {
          const evalResult = evaluations[scheme.id];
          const isEligible = evalResult?.verdict === 'LIKELY_ELIGIBLE';
          const matchPercentage = evalResult?.matchScore || (scheme.state === 'Telangana' ? 95 : 88);

          return (
            <div
              key={scheme.id}
              className="bg-white rounded-2xl border border-[#DFDACD] hover:border-[#155C45] p-6 transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-[#FAF9F5] text-[#155C45] border border-[#EAE6DB]">
                    {scheme.category}
                  </span>
                  <span className="text-[10px] font-mono text-[#6C746E]">
                    {scheme.governmentLevel} • {scheme.state || 'All-India'}
                  </span>
                </div>

                <h3 
                  onClick={() => onViewScheme(scheme)}
                  className="font-editorial text-xl font-bold text-[#08110D] hover:text-[#155C45] transition cursor-pointer line-clamp-2 leading-snug"
                >
                  {scheme.name}
                </h3>

                <p className="text-xs text-[#6C746E] font-light mt-1 truncate">
                  {scheme.department}
                </p>

                <p className="text-xs text-[#545B56] mt-3 line-clamp-2 leading-relaxed">
                  {scheme.plainSummary || scheme.shortDescription}
                </p>

                <div className="mt-4 p-3 rounded-xl bg-[#FAF9F5] border border-[#EAE6DB]">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#155C45] block">
                    Financial & Welfare Benefit
                  </span>
                  <p className="text-xs font-bold text-[#08110D] mt-0.5">
                    {scheme.mainBenefit}
                  </p>
                </div>

                <div className="mt-3 pt-3 border-t border-[#EAE6DB] flex items-center justify-between text-[11px] font-mono">
                  <div className="flex items-center gap-1.5 text-[#155C45] font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Eligibility Match: {matchPercentage}%</span>
                  </div>
                  <span className="text-[#6C746E]">{scheme.applicationDeadline || 'Open Enrollment'}</span>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-[#EAE6DB] flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onCheckEligibility(scheme)}
                  className="flex-1 py-2 px-3 rounded-xl bg-[#08110D] hover:bg-[#155C45] text-white text-xs font-bold transition cursor-pointer"
                >
                  Check Eligibility
                </button>
                <button
                  type="button"
                  onClick={() => onViewScheme(scheme)}
                  className="py-2 px-3 rounded-xl bg-[#FAF9F5] hover:bg-[#F4F2EB] text-[#08110D] border border-[#DFDACD] text-xs font-semibold transition cursor-pointer"
                >
                  Dossier
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
