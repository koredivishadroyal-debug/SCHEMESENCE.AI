import React, { useState, useMemo } from 'react';
import { 
  Terminal, 
  Search, 
  Landmark, 
  ExternalLink, 
  Tag, 
  ShieldCheck, 
  CheckCircle2, 
  Layers, 
  FileText,
  Sparkles,
  ArrowRight,
  Globe2
} from 'lucide-react';
import { Scheme } from '../types';
import { resolveGovernmentEntity } from '../services/governmentEntityResolver';
import { GOVERNMENT_PORTALS } from '../data/governmentPortals';

interface AdminEntityDiagnosticsProps {
  schemes: Scheme[];
}

export const AdminEntityDiagnostics: React.FC<AdminEntityDiagnosticsProps> = ({
  schemes
}) => {
  const [testQuery, setTestQuery] = useState<string>('ePASS');
  const [selectedStateContext, setSelectedStateContext] = useState<string>('Telangana');

  const resolutionResult = useMemo(() => {
    return resolveGovernmentEntity(testQuery, schemes, selectedStateContext);
  }, [testQuery, schemes, selectedStateContext]);

  const presetQueries = [
    { label: 'ePASS (Telangana)', query: 'ePASS', state: 'Telangana' },
    { label: 'SSP (Karnataka)', query: 'SSP', state: 'Karnataka' },
    { label: 'MahaDBT (Maharashtra)', query: 'MahaDBT', state: 'Maharashtra' },
    { label: 'Jnanabhumi (AP)', query: 'Jnanabhumi', state: 'Andhra Pradesh' },
    { label: 'OASIS (West Bengal)', query: 'OASIS', state: 'West Bengal' },
    { label: 'DCE (Kerala)', query: 'DCE Kerala', state: 'Kerala' },
    { label: 'NSP (Central)', query: 'NSP', state: 'All-India' },
    { label: 'NVSP Voter ID', query: 'NVSP', state: 'All-India' },
    { label: 'Sarathi Driving Licence', query: 'Sarathi Parivahan', state: 'All-India' },
    { label: 'Rythu Bharosa', query: 'Rythu Bharosa', state: 'Telangana' },
    { label: 'Ladki Bahin', query: 'Majhi Ladki Bahin', state: 'Maharashtra' },
    { label: 'Gruha Lakshmi', query: 'Gruha Lakshmi', state: 'Karnataka' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-md border border-slate-800 font-mono">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Terminal className="w-5 h-5 text-teal-400" />
              <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
                System Diagnostics & Entity Resolution Inspector
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white font-sans">
              Test & Audit Government Entity Resolution
            </h2>
            <p className="text-xs text-slate-300 font-sans mt-1">
              Inspect how citizen queries, acronyms, and portal names map to official state portals, departments, and programs.
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400 block font-sans">Official Portals Indexed</span>
            <span className="text-lg font-bold text-teal-400">{GOVERNMENT_PORTALS.length} Portals</span>
          </div>
        </div>
      </div>

      {/* Interactive Query Input */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={testQuery}
              onChange={(e) => setTestQuery(e.target.value)}
              placeholder="Type acronym, portal name, or citizen query (e.g. ePASS, SSP, MahaDBT)..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500 font-medium"
            />
          </div>

          <div className="w-full sm:w-56">
            <select
              value={selectedStateContext}
              onChange={(e) => setSelectedStateContext(e.target.value)}
              className="w-full px-3 py-3 rounded-xl border border-slate-300 text-xs bg-white text-slate-800 focus:ring-2 focus:ring-teal-500"
            >
              <option value="All-India">Location: All-India / National</option>
              <option value="Telangana">Location: Telangana</option>
              <option value="Karnataka">Location: Karnataka</option>
              <option value="Maharashtra">Location: Maharashtra</option>
              <option value="West Bengal">Location: West Bengal</option>
              <option value="Andhra Pradesh">Location: Andhra Pradesh</option>
              <option value="Kerala">Location: Kerala</option>
              <option value="Tamil Nadu">Location: Tamil Nadu</option>
              <option value="Delhi">Location: Delhi</option>
            </select>
          </div>
        </div>

        {/* Presets */}
        <div>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
            Click Preset Query to Test Resolution Pipeline:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {presetQueries.map((p, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setTestQuery(p.query);
                  setSelectedStateContext(p.state);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition cursor-pointer ${
                  testQuery.toLowerCase() === p.query.toLowerCase()
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-slate-50 hover:bg-teal-50 text-slate-700 hover:text-teal-900 border-slate-200'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Resolution Breakdown Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Pipeline Details & Portals */}
        <div className="lg:col-span-2 space-y-6">
          {/* Resolved Portal Card */}
          {resolutionResult.resolvedPortal ? (
            <div className="bg-teal-50/90 border border-teal-300 rounded-2xl p-5 shadow-xs">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2.5 rounded-xl bg-teal-700 text-white shadow-2xs">
                    <Landmark className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-teal-200 text-teal-900">
                      Official Portal Matched
                    </span>
                    <h3 className="text-base font-bold text-teal-950 mt-0.5">
                      {resolutionResult.resolvedPortal.portal_name}
                    </h3>
                  </div>
                </div>

                <a
                  href={resolutionResult.resolvedPortal.official_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-teal-700 hover:text-teal-900 flex items-center gap-1 underline shrink-0"
                >
                  <span>Visit Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <p className="text-xs text-teal-900 mb-3 leading-relaxed">
                {resolutionResult.explanation}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs bg-white/80 p-3 rounded-xl border border-teal-200/80">
                <div>
                  <span className="text-slate-500 block text-[10px]">Managing State</span>
                  <span className="font-bold text-slate-800">{resolutionResult.resolvedPortal.state}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Portal Type</span>
                  <span className="font-bold text-slate-800">{resolutionResult.resolvedPortal.portal_type}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Managing Department</span>
                  <span className="font-bold text-slate-800 truncate block">{resolutionResult.resolvedPortal.department}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-100 border border-slate-200 rounded-2xl p-5 text-center text-xs text-slate-500">
              No specific official portal identified for "{testQuery}". Falling back to generalized nationwide catalog search.
            </div>
          )}

          {/* Associated Programs from Registry */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-slate-900">
                Retrieved Verified Programs ({resolutionResult.schemes.length})
              </h3>
              <span className="text-xs text-slate-500">
                Ranked for intent & jurisdiction
              </span>
            </div>

            {resolutionResult.schemes.length === 0 ? (
              <p className="text-xs text-slate-500 italic p-4 text-center">
                No matching verified schemes found in catalog for this query. Use "+ Discover Government Schemes" tab to crawl and ingest candidates.
              </p>
            ) : (
              <div className="space-y-2">
                {resolutionResult.schemes.map((scheme, idx) => (
                  <div
                    key={scheme.id}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 hover:border-teal-400 transition"
                  >
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-slate-900">
                          {idx + 1}. {scheme.name}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-teal-100 text-teal-900 font-bold">
                          {scheme.state}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200 text-slate-800 font-semibold">
                          {scheme.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-1 line-clamp-1">
                        {scheme.mainBenefit}
                      </p>
                    </div>

                    <div className="shrink-0 text-right">
                      <span className="text-[10px] font-mono font-bold text-teal-700 block">
                        Rank #{idx + 1}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Col: Diagnostics Execution Trace */}
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-2xl p-5 text-slate-100 border border-slate-800 shadow-xs font-mono text-xs">
            <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-800">
              <Terminal className="w-4 h-4 text-teal-400" />
              <span className="font-bold text-teal-400 uppercase tracking-wider text-[11px]">
                Execution Pipeline Trace
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-slate-400 text-[10px] block">NORMALIZED QUERY</span>
                <span className="text-teal-300 font-bold">"{resolutionResult.debugInfo.normalizedQuery}"</span>
              </div>

              <div>
                <span className="text-slate-400 text-[10px] block">DETECTED STATE</span>
                <span className="text-amber-300 font-bold">{resolutionResult.debugInfo.detectedState || 'All-India / Nationwide'}</span>
              </div>

              <div>
                <span className="text-slate-400 text-[10px] block">DETECTED ENTITY TYPE</span>
                <span className="text-emerald-300 font-bold">{resolutionResult.debugInfo.detectedEntity}</span>
              </div>

              <div>
                <span className="text-slate-400 text-[10px] block">ALIASES MATCHED</span>
                <span className="text-cyan-300 font-bold">
                  {resolutionResult.debugInfo.aliasesMatched.length > 0 
                    ? resolutionResult.debugInfo.aliasesMatched.join(', ')
                    : 'Direct keyword'}
                </span>
              </div>

              <div className="pt-2 border-t border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">
                  Pipeline Steps:
                </span>
                <ol className="list-decimal list-inside space-y-1 text-[11px] text-slate-300">
                  {resolutionResult.debugInfo.pipelineSteps.map((step, sIdx) => (
                    <li key={sIdx} className="leading-tight">
                      <span className="text-slate-200">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
