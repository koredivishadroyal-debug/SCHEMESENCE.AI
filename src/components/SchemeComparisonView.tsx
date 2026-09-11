import React from 'react';
import { Scale, X, ExternalLink, ShieldCheck } from 'lucide-react';
import { Scheme, Language } from '../types';
import { getTranslation } from '../services/translations';
import { getLocalizedScheme, getLocalizedBenefitType } from '../services/schemeLocalization';
import { getSafeUrl } from '../services/urlUtils';

interface SchemeComparisonViewProps {
  schemes: Scheme[];
  comparedIds: string[];
  onRemoveFromCompare: (id: string) => void;
  onClearCompare: () => void;
  language: Language;
  onViewDetails: (scheme: Scheme) => void;
}

export const SchemeComparisonView: React.FC<SchemeComparisonViewProps> = ({
  schemes,
  comparedIds,
  onRemoveFromCompare,
  onClearCompare,
  language,
  onViewDetails,
}) => {
  const t = (key: string) => getTranslation(key, language);

  const rawCompared = schemes.filter((s) => comparedIds.includes(s.id));
  const comparedSchemes = rawCompared.map((s) => getLocalizedScheme(s, language));

  if (comparedSchemes.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-2xl bg-[#F4F2EB] text-[#88908A] flex items-center justify-center mx-auto mb-4 border border-[#DFDACD]">
          <Scale className="w-7 h-7 text-[#6C746E]" />
        </div>
        <h3 className="font-editorial text-2xl font-bold text-[#08110D]">Comparative Matrix Empty</h3>
        <p className="text-xs sm:text-sm text-[#545B56] mt-1 max-w-sm mx-auto font-light">
          Select 2 or more schemes using the &quot;Compare&quot; button while browsing to evaluate eligibility rules, benefit values, and documentation side-by-side.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-[#EAE6DB]">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#155C45] block mb-1">
            POLICY BENCHMARK
          </span>
          <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#08110D] tracking-tight">
            Comparative Scheme Matrix
          </h2>
          <p className="text-xs sm:text-sm text-[#545B56] mt-0.5 font-light">
            Evaluating {comparedSchemes.length} welfare programs across eligibility limits, disbursement modes, and required records.
          </p>
        </div>

        <button
          onClick={onClearCompare}
          className="text-xs font-mono font-semibold text-stone-500 hover:text-rose-600 transition cursor-pointer self-start sm:self-auto"
        >
          Clear Matrix
        </button>
      </div>

      {/* Authoritative Side-by-Side Policy Matrix */}
      <div className="bg-white rounded-2xl border border-[#DFDACD] overflow-x-auto shadow-xs">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-[#DFDACD] bg-[#FAF9F5]">
              <th className="p-5 font-mono font-bold text-[#6C746E] uppercase tracking-wider w-48 shrink-0">
                Evaluation Parameter
              </th>
              {comparedSchemes.map((scheme) => (
                <th key={scheme.id} className="p-5 font-bold text-[#08110D] min-w-[280px] relative">
                  <button
                    onClick={() => onRemoveFromCompare(scheme.id)}
                    className="absolute top-4 right-4 p-1 rounded-md text-[#88908A] hover:text-[#08110D] hover:bg-[#EAE6DB] transition cursor-pointer"
                    title="Remove from matrix"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-[#F4F2EB] text-[#155C45] border border-[#DFDACD] block w-fit mb-2">
                    {scheme.governmentLevel} • {scheme.state || 'All-India'}
                  </span>
                  <h4 className="font-editorial text-lg font-bold leading-tight">{scheme.name}</h4>
                  <p className="text-xs text-[#6C746E] font-light mt-1">{scheme.ministry || scheme.department}</p>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-[#EAE6DB]">
            {/* Primary Financial Benefit */}
            <tr>
              <td className="p-5 font-bold font-mono text-[#08110D] bg-[#FAF9F5]">
                Primary Benefit
              </td>
              {comparedSchemes.map((s) => (
                <td key={s.id} className="p-5">
                  <span className="font-editorial text-lg font-bold text-[#155C45] block">
                    {s.mainBenefit}
                  </span>
                  <span className="text-[11px] font-mono text-[#6C746E] mt-0.5 block">
                    Mode: {getLocalizedBenefitType(s.benefitType, language)}
                  </span>
                </td>
              ))}
            </tr>

            {/* Target Demographic & Category */}
            <tr>
              <td className="p-5 font-bold font-mono text-[#08110D] bg-[#FAF9F5]">
                Target Demographic
              </td>
              {comparedSchemes.map((s) => (
                <td key={s.id} className="p-5 text-[#545B56] leading-relaxed">
                  <span className="font-bold text-[#08110D] block">{s.category}</span>
                  <span className="text-xs">{s.shortDescription}</span>
                </td>
              ))}
            </tr>

            {/* Eligibility Thresholds */}
            <tr>
              <td className="p-5 font-bold font-mono text-[#08110D] bg-[#FAF9F5]">
                Eligibility Thresholds
              </td>
              {comparedSchemes.map((s) => (
                <td key={s.id} className="p-5 space-y-1 text-xs">
                  <div>
                    <span className="text-[#6C746E] font-mono">Age: </span>
                    <strong className="text-[#08110D]">
                      {s.eligibilityRules.minAge ? `${s.eligibilityRules.minAge}y` : 'No min'} - {s.eligibilityRules.maxAge ? `${s.eligibilityRules.maxAge}y` : 'No max'}
                    </strong>
                  </div>
                  <div>
                    <span className="text-[#6C746E] font-mono">Income Cap: </span>
                    <strong className="text-[#08110D]">
                      {s.eligibilityRules.maxIncome ? `₹${(s.eligibilityRules.maxIncome / 100000).toFixed(1)} Lakh/yr` : 'No cap'}
                    </strong>
                  </div>
                </td>
              ))}
            </tr>

            {/* Key Required Documents */}
            <tr>
              <td className="p-5 font-bold font-mono text-[#08110D] bg-[#FAF9F5]">
                Required Documents
              </td>
              {comparedSchemes.map((s) => (
                <td key={s.id} className="p-5">
                  <ul className="space-y-1 text-xs text-[#545B56]">
                    {s.requiredDocuments.slice(0, 4).map((d) => (
                      <li key={d.id} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#155C45]" />
                        <span>{d.name}</span>
                      </li>
                    ))}
                    {s.requiredDocuments.length > 4 && (
                      <li className="text-[11px] font-mono text-[#6C746E]">
                        + {s.requiredDocuments.length - 4} additional documents
                      </li>
                    )}
                  </ul>
                </td>
              ))}
            </tr>

            {/* Official Portal Actions */}
            <tr>
              <td className="p-5 font-bold font-mono text-[#08110D] bg-[#FAF9F5]">
                Gateway & Actions
              </td>
              {comparedSchemes.map((s) => {
                const orig = rawCompared.find((o) => o.id === s.id) || s;
                return (
                  <td key={s.id} className="p-5">
                    <div className="space-y-2">
                      <a
                        href={getSafeUrl(s.officialUrl)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full px-3 py-2 rounded-xl bg-[#08110D] hover:bg-[#155C45] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition"
                      >
                        <span>Apply on Official Portal</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button
                        onClick={() => onViewDetails(orig)}
                        className="w-full px-3 py-2 rounded-xl bg-[#FAF9F5] hover:bg-[#F4F2EB] text-[#08110D] border border-[#DFDACD] text-xs font-semibold transition cursor-pointer"
                      >
                        Open Full Dossier
                      </button>
                    </div>
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
