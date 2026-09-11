import React from 'react';
import { 
  Building2, 
  ExternalLink, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Scale, 
  Bookmark, 
  BookmarkCheck, 
  ShieldCheck, 
  Calendar,
  Sparkles,
  FileDown,
  Landmark,
  ArrowRight
} from 'lucide-react';
import { Scheme, RuleEvaluationResult, Language } from '../types';
import { getTranslation } from '../services/translations';
import { getLocalizedScheme, getLocalizedBenefitType } from '../services/schemeLocalization';
import { getSafeUrl } from '../services/urlUtils';
import { exportSchemeDocumentsToPdf } from '../services/schemePdfExport';

export interface SchemeCardProps {
  scheme: Scheme;
  evaluation?: RuleEvaluationResult;
  language: Language;
  onViewDetails: (scheme: Scheme) => void;
  onCheckEligibility: (scheme: Scheme) => void;
  onToggleCompare: (scheme: Scheme) => void;
  isCompared: boolean;
  onToggleSave: (scheme: Scheme) => void;
  isSaved: boolean;
  matchReason?: string;
  isFeatured?: boolean;
}

export const SchemeCard: React.FC<SchemeCardProps> = ({
  scheme,
  evaluation,
  language,
  onViewDetails,
  onCheckEligibility,
  onToggleCompare,
  isCompared,
  onToggleSave,
  isSaved,
  matchReason,
  isFeatured = false,
}) => {
  const t = (key: string) => getTranslation(key, language);
  const localizedScheme = getLocalizedScheme(scheme, language);

  const verdict = evaluation?.verdict;
  const matchScore = evaluation?.aiMatchScore;

  // Localized native name if available
  const displayNativeName = 
    language === 'Hindi' && localizedScheme.nativeNames?.hindi
      ? localizedScheme.nativeNames.hindi
      : language === 'Telugu' && localizedScheme.nativeNames?.telugu
      ? localizedScheme.nativeNames.telugu
      : language === 'Tamil' && localizedScheme.nativeNames?.tamil
      ? localizedScheme.nativeNames.tamil
      : language === 'Kannada' && localizedScheme.nativeNames?.kannada
      ? localizedScheme.nativeNames.kannada
      : language === 'Bengali' && localizedScheme.nativeNames?.bengali
      ? localizedScheme.nativeNames.bengali
      : language === 'Marathi' && localizedScheme.nativeNames?.marathi
      ? localizedScheme.nativeNames.marathi
      : null;

  const isPortal = localizedScheme.recordType === 'PORTAL';

  return (
    <div 
      className={`bg-white rounded-2xl transition-all duration-200 flex flex-col justify-between relative group ${
        isFeatured 
          ? 'border-2 border-[#155C45] shadow-lg p-6 sm:p-7 md:col-span-2 bg-gradient-to-br from-white via-[#FAF9F5] to-[#F4F2EB]' 
          : 'border border-[#EAE6DB] hover:border-[#155C45]/80 p-5 sm:p-6 shadow-2xs hover:shadow-md'
      }`}
    >
      <div>
        {/* Top Minimal Hierarchy Meta */}
        <div className="flex items-center justify-between gap-3 mb-3.5">
          <div className="flex items-center gap-2 flex-wrap text-xs">
            {/* Minimal Category & Tier pill */}
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#155C45] bg-[#FAF9F5] px-2.5 py-0.5 rounded-md border border-[#EAE6DB]">
              {localizedScheme.category} • {localizedScheme.governmentLevel === 'Central' ? 'Central' : localizedScheme.state || 'State'}
            </span>

            {/* Official Source Verified Tag */}
            {localizedScheme.isOfficialSourceVerified && (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Verified Source</span>
              </span>
            )}
            
            {isFeatured && (
              <span className="text-[10px] font-bold uppercase tracking-widest bg-[#D88932] text-white px-2 py-0.5 rounded shadow-xs">
                Featured Program
              </span>
            )}
          </div>

          {/* Quick Actions (PDF Export & Save) */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={(e) => {
                e.stopPropagation();
                exportSchemeDocumentsToPdf(localizedScheme);
              }}
              className="p-1.5 rounded-lg border border-[#EAE6DB] bg-[#FAF9F5] hover:bg-[#F4F2EB] text-[#6C746E] hover:text-[#0C1511] transition cursor-pointer"
              title="Download Documents Checklist (PDF)"
              aria-label="Download PDF Checklist"
            >
              <FileDown className="w-4 h-4" />
            </button>

            <button
              onClick={() => onToggleSave(scheme)}
              className={`p-1.5 rounded-lg border transition cursor-pointer ${
                isSaved
                  ? 'bg-amber-50 text-[#D88932] border-amber-300'
                  : 'bg-[#FAF9F5] text-[#6C746E] hover:text-[#0C1511] border-[#EAE6DB]'
              }`}
              title={isSaved ? 'Saved to My Schemes' : 'Bookmark Scheme'}
              aria-label={isSaved ? 'Saved' : 'Save Scheme'}
            >
              {isSaved ? <BookmarkCheck className="w-4 h-4 fill-[#D88932] text-[#D88932]" /> : <Bookmark className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Scheme Name */}
        <h3 
          onClick={() => onViewDetails(scheme)}
          className={`font-bold text-[#08110D] group-hover:text-[#155C45] transition-colors cursor-pointer leading-snug tracking-tight ${
            isFeatured ? 'text-xl sm:text-2xl' : 'text-base sm:text-lg'
          }`}
        >
          {localizedScheme.name}
        </h3>

        {/* Native Name / Regional Script */}
        {displayNativeName && (
          <p className="text-xs font-semibold text-[#155C45] mt-1">
            {displayNativeName}
          </p>
        )}

        {/* Ministry / Department */}
        <p className="text-xs text-[#6C746E] mt-1.5 flex items-center gap-1.5 font-medium">
          <Building2 className="w-3.5 h-3.5 shrink-0 text-[#88908A]" />
          <span className="truncate">{localizedScheme.ministry || localizedScheme.department}</span>
        </p>

        {/* One-Line Human Explanation */}
        <p className="text-xs sm:text-sm text-[#545B56] mt-3 leading-relaxed line-clamp-2">
          {localizedScheme.shortDescription}
        </p>

        {/* Match Reason Banner */}
        {matchReason && (
          <div className="mt-3 p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-[#0C1511] text-xs font-medium flex items-start gap-2 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#D88932] shrink-0 mt-0.5" />
            <div className="leading-snug">
              <span className="font-bold text-[#08110D]">Matched: </span>
              <span>{matchReason}</span>
            </div>
          </div>
        )}

        {/* Primary Benefit in High-Contrast Box */}
        {isPortal ? (
          <div className="mt-4 p-3.5 rounded-xl bg-[#0C1511] text-stone-100 border border-emerald-950">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1">
                <Landmark className="w-3.5 h-3.5 text-emerald-400" />
                Centralized Public Portal
              </span>
              <span className="text-[10px] font-bold text-amber-400 font-mono">
                Direct Submission
              </span>
            </div>
            <p className="text-xs text-stone-200 mt-1 font-medium leading-relaxed">
              Official gateway for citizen applications, status tracking, and direct benefit disbursement.
            </p>
          </div>
        ) : (
          <div className="mt-4 p-3.5 rounded-xl bg-[#F4F2EB] border border-[#DFDACD] flex items-start justify-between gap-3">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#155C45]">
                PRIMARY BENEFIT
              </span>
              <p className="text-sm sm:text-base font-bold text-[#08110D] mt-0.5 leading-snug">
                {localizedScheme.mainBenefit}
              </p>
            </div>
            <span className="px-2 py-0.5 text-[10px] font-mono font-semibold rounded bg-white text-[#155C45] border border-[#DFDACD] shrink-0">
              {getLocalizedBenefitType(localizedScheme.benefitType, language)}
            </span>
          </div>
        )}

        {/* Eligibility Status Badge */}
        {verdict && (
          <div className="mt-3.5 p-2.5 rounded-xl border flex items-center justify-between text-xs bg-[#FAF9F5] border-[#EAE6DB]">
            <div className="flex items-center gap-2">
              {verdict === 'LIKELY_ELIGIBLE' && (
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
              )}
              {verdict === 'POSSIBLY_ELIGIBLE' && (
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              )}
              {verdict === 'LIKELY_NOT_ELIGIBLE' && (
                <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
              )}
              <div>
                <span className={`font-bold ${
                  verdict === 'LIKELY_ELIGIBLE'
                    ? 'text-emerald-900'
                    : verdict === 'POSSIBLY_ELIGIBLE'
                    ? 'text-amber-900'
                    : 'text-rose-900'
                }`}>
                  {verdict === 'LIKELY_ELIGIBLE' && t('statusLikelyEligible')}
                  {verdict === 'POSSIBLY_ELIGIBLE' && t('statusPossiblyEligible')}
                  {verdict === 'LIKELY_NOT_ELIGIBLE' && t('statusLikelyNotEligible')}
                </span>
                <span className="text-[10px] text-[#6C746E] block">
                  Based on self-declared citizen profile
                </span>
              </div>
            </div>

            {matchScore !== undefined && (
              <div className="text-right">
                <span className="text-xs font-mono font-bold text-[#155C45]">{matchScore}% Match</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer & Action Buttons */}
      <div className="mt-5 pt-4 border-t border-[#EAE6DB]">
        <div className="flex items-center justify-between text-[11px] text-[#6C746E] mb-3">
          <span className="flex items-center gap-1 font-mono">
            <Calendar className="w-3 h-3 text-[#88908A]" />
            <span>Deadline: {localizedScheme.deadline || 'Ongoing'}</span>
          </span>
          <span className="text-[10px] font-mono text-[#88908A]">
            Verified: {localizedScheme.lastVerified}
          </span>
        </div>

        {/* Action Button Row */}
        <div className="grid grid-cols-2 gap-2 text-xs font-bold">
          <button
            onClick={() => onViewDetails(scheme)}
            className="px-3 py-2 rounded-xl bg-[#F4F2EB] hover:bg-[#EAE6DB] text-[#0C1511] transition cursor-pointer text-center"
          >
            {t('viewDetails')}
          </button>

          <button
            onClick={() => onCheckEligibility(scheme)}
            className="px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-[#155C45] border border-emerald-200 transition cursor-pointer text-center flex items-center justify-center gap-1"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#155C45]" />
            <span>{t('checkRules')}</span>
          </button>

          <button
            onClick={() => onToggleCompare(scheme)}
            className={`px-3 py-2 rounded-xl border transition cursor-pointer text-center flex items-center justify-center gap-1 ${
              isCompared
                ? 'bg-indigo-50 text-indigo-900 border-indigo-300'
                : 'bg-white hover:bg-slate-50 text-slate-700 border-[#EAE6DB]'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>{isCompared ? t('btnCompared') : t('btnCompare')}</span>
          </button>

          <a
            href={getSafeUrl(localizedScheme.officialUrl)}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 rounded-xl bg-[#08110D] hover:bg-[#155C45] text-white transition-colors cursor-pointer text-center flex items-center justify-center gap-1"
            title="Open Verified Government Portal"
          >
            <span>{t('apply')}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
