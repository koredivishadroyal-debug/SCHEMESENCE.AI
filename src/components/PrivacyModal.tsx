import React from 'react';
import { X, ShieldCheck, Lock, EyeOff, CheckCircle2, Award } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-emerald-800 to-teal-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-emerald-300">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black">Privacy & Citizen Data Guarantee</h3>
              <p className="text-[11px] text-emerald-200">Zero Sensitive ID Requirement</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 text-xs sm:text-sm text-slate-700">
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-emerald-950">
              <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>What SchemeSence NEVER asks for:</span>
            </div>
            <ul className="space-y-1 text-xs text-emerald-900 list-disc list-inside">
              <li>No 12-digit Aadhaar Card numbers</li>
              <li>No Bank account numbers, PINs, or UPI passwords</li>
              <li>No One-Time Passwords (OTPs)</li>
              <li>No biometric scans or confidential financial login keys</li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <EyeOff className="w-4 h-4 text-teal-600 mt-1 shrink-0" />
              <div>
                <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Client-Side Session State</h4>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                  Your age, occupation, and income bracket entries are processed directly in your active browser session. They are not stored in central surveillance databases.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-teal-600 mt-1 shrink-0" />
              <div>
                <h4 className="font-bold text-slate-900 text-xs sm:text-sm">Direct Official Redirection</h4>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                  When you are ready to submit an application, you are redirected directly to official government portals (such as <code>.gov.in</code> or <code>.nic.in</code>).
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs cursor-pointer transition shadow-2xs"
          >
            I Understand & Agree
          </button>
        </div>
      </div>
    </div>
  );
};
