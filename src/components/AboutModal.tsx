import React from 'react';
import { 
  X, 
  ShieldCheck, 
  Sparkles, 
  Landmark, 
  ExternalLink, 
  Lock, 
  Search, 
  CheckCircle2, 
  FileCheck2,
  Users
} from 'lucide-react';
import { Language } from '../types';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
      <div 
        id="about-schemesense-modal"
        className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white p-6 sm:p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-3">
            {/* Logo Emblem */}
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 via-teal-600 to-emerald-600 flex items-center justify-center text-white font-black text-xl shadow-lg border border-white/20">
              <span className="tracking-tighter">SS</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-black text-white tracking-tight">SchemeSense AI</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-teal-400 text-teal-950">
                  GovTech 2.0
                </span>
              </div>
              <p className="text-xs text-teal-200 font-medium mt-0.5">
                “Find the schemes meant for you.”
              </p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
            SchemeSense AI is an intelligent government scheme discovery platform that helps Indian citizens discover relevant government schemes, understand eligibility and benefits in simple language, and reach the official application source.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Mission & Purpose */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200/80">
              <Search className="w-5 h-5 text-teal-700 mb-2" />
              <h4 className="text-xs font-bold text-slate-900">Google-Grade Simplicity</h4>
              <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                Search in your own words, local language, or voice without navigating bureaucratic jargon.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200/80">
              <Sparkles className="w-5 h-5 text-indigo-700 mb-2" />
              <h4 className="text-xs font-bold text-slate-900">Fintech-Grade Clarity</h4>
              <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                Clear cash and welfare values, required document checklists, and transparent eligibility rules.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80">
              <ShieldCheck className="w-5 h-5 text-emerald-700 mb-2" />
              <h4 className="text-xs font-bold text-slate-900">Official Trust First</h4>
              <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                Direct links to verified .gov.in and .nic.in portals. SchemeSense assists, never replaces official portals.
              </p>
            </div>
          </div>

          {/* Core Commitments */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Our Core Citizen Commitments
            </h4>
            
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <Lock className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block">Zero Storage of Sensitive ID Data</strong>
                  <span className="text-slate-600">
                    SchemeSense never asks for or stores Aadhaar numbers, PAN cards, or bank OTPs. Eligibility is computed client-side.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <Landmark className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block">100% Free Public Service</strong>
                  <span className="text-slate-600">
                    All schemes, guidance, and document generation tools are completely free. We never charge citizens or middleman commissions.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <FileCheck2 className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 block">Audited Against Official Gazettes</strong>
                  <span className="text-slate-600">
                    Every listed scheme is cross-referenced with Central and State government notifications and audited periodically.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Official Disclaimer */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
            <strong className="font-bold block mb-1">Important Government Disclaimer:</strong>
            <p className="leading-relaxed text-amber-800 text-[11px]">
              SchemeSense AI is an independent civic technology platform. While we strive to maintain verified information, final eligibility, sanctioning, and disbursement are solely determined by the respective government ministries and nodal agencies.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            National Hackathon Prototype • Open GovTech
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs transition cursor-pointer shadow-xs"
          >
            Got It, Thanks
          </button>
        </div>
      </div>
    </div>
  );
};
