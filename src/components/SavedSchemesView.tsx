import React from 'react';
import { Bookmark, ExternalLink, Trash2, Calendar, FileDown } from 'lucide-react';
import { Scheme, DocumentStatus, Language } from '../types';
import { getTranslation } from '../services/translations';
import { getLocalizedScheme } from '../services/schemeLocalization';
import { getSafeUrl } from '../services/urlUtils';
import { exportSchemeDocumentsToPdf } from '../services/schemePdfExport';

interface SavedSchemesViewProps {
  schemes: Scheme[];
  savedIds: string[];
  onRemoveSaved: (scheme: Scheme) => void;
  documentStatuses: Record<string, DocumentStatus>;
  language: Language;
  onViewDetails: (scheme: Scheme) => void;
}

export const SavedSchemesView: React.FC<SavedSchemesViewProps> = ({
  schemes,
  savedIds,
  onRemoveSaved,
  documentStatuses,
  language,
  onViewDetails,
}) => {
  const t = (key: string) => getTranslation(key, language);

  const rawSaved = schemes.filter((s) => savedIds.includes(s.id));
  const savedSchemes = rawSaved.map((s) => getLocalizedScheme(s, language));

  if (savedSchemes.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-2xl bg-[#F4F2EB] text-[#88908A] flex items-center justify-center mx-auto mb-4 border border-[#DFDACD]">
          <Bookmark className="w-7 h-7 text-[#6C746E]" />
        </div>
        <h3 className="font-editorial text-2xl font-bold text-[#08110D]">No Saved Bookmarks Yet</h3>
        <p className="text-xs sm:text-sm text-[#545B56] mt-1 max-w-sm mx-auto font-light">
          Save schemes to create an offline dossier, track application readiness, and export documents.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#EAE6DB]">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#155C45] block mb-1">
            CITIZEN ARCHIVE
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#08110D] tracking-tight">
            Saved Schemes & Entitlements
          </h2>
          <p className="text-xs sm:text-sm text-[#545B56] mt-0.5 font-light">
            {savedSchemes.length} programs bookmarked for active review and document submission
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {savedSchemes.map((scheme, idx) => {
          const orig = rawSaved.find((o) => o.id === scheme.id) || scheme;
          const totalDocs = scheme.requiredDocuments.length;
          const readyDocs = scheme.requiredDocuments.filter(
            (d) => (documentStatuses[d.id] || 'Available') === 'Available'
          ).length;
          const docPercent = totalDocs > 0 ? Math.round((readyDocs / totalDocs) * 100) : 100;

          return (
            <div
              key={`${scheme.id}-${scheme.recordId || idx}`}
              className="bg-white rounded-2xl border border-[#DFDACD] hover:border-[#155C45] p-6 transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-[#FAF9F5] text-[#155C45] border border-[#EAE6DB]">
                    {scheme.governmentLevel === 'Central' ? 'Central Government' : scheme.state || 'State'}
                  </span>
                  <button
                    onClick={() => onRemoveSaved(orig)}
                    className="p-1 text-[#88908A] hover:text-rose-600 transition cursor-pointer"
                    title="Remove from bookmarks"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <h3
                  onClick={() => onViewDetails(orig)}
                  className="font-editorial text-xl font-bold text-[#08110D] hover:text-[#155C45] transition cursor-pointer leading-snug"
                >
                  {scheme.name}
                </h3>
                <p className="text-xs text-[#6C746E] mt-1 font-light">{scheme.ministry || scheme.department}</p>

                <div className="mt-4 p-3 rounded-xl bg-[#FAF9F5] border border-[#EAE6DB] text-xs">
                  <span className="font-mono text-[10px] font-bold text-[#155C45] uppercase tracking-wider block">Welfare Benefit</span>
                  <span className="font-bold text-[#08110D] text-xs mt-0.5 block">{scheme.mainBenefit}</span>
                </div>

                {/* Document Readiness Progress Bar */}
                <div className="mt-4">
                  <div className="flex items-center justify-between text-[11px] font-mono font-bold text-[#545B56] mb-1.5">
                    <span>Document Readiness: {readyDocs}/{totalDocs}</span>
                    <span className={docPercent === 100 ? 'text-[#155C45]' : 'text-[#D88932]'}>{docPercent}% Ready</span>
                  </div>
                  <div className="w-full bg-[#EAE6DB] rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-1.5 rounded-full transition-all ${
                        docPercent === 100 ? 'bg-[#155C45]' : 'bg-[#D88932]'
                      }`}
                      style={{ width: `${docPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#EAE6DB] flex items-center justify-between gap-3">
                <button
                  onClick={() => onViewDetails(orig)}
                  className="text-xs font-semibold text-[#155C45] hover:underline cursor-pointer"
                >
                  View Full Dossier
                </button>

                <a
                  href={getSafeUrl(scheme.officialUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#08110D] hover:bg-[#155C45] text-white text-xs font-bold inline-flex items-center gap-1.5 transition cursor-pointer"
                >
                  <span>Apply Officially</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
