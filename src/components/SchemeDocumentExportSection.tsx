import React, { useState } from 'react';
import { 
  FileDown, 
  CheckCircle2, 
  Printer, 
  Sparkles, 
  Clock, 
  FileText, 
  ShieldCheck, 
  Settings2,
  ChevronDown,
  ChevronUp,
  ExternalLink
} from 'lucide-react';
import { Scheme, DocumentStatus, UserProfile, Language } from '../types';
import { exportSchemeDocumentsToPdf, PdfExportOptions } from '../services/schemePdfExport';
import { getTranslation } from '../services/translations';

interface SchemeDocumentExportSectionProps {
  scheme: Scheme;
  documentStatuses: Record<string, DocumentStatus>;
  userProfile?: UserProfile;
  language: Language;
  onOpenAiChatWithContext?: (context: string) => void;
}

export const SchemeDocumentExportSection: React.FC<SchemeDocumentExportSectionProps> = ({
  scheme,
  documentStatuses,
  userProfile,
  language,
  onOpenAiChatWithContext,
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [downloadSuccessMessage, setDownloadSuccessMessage] = useState<string | null>(null);
  const [showOptions, setShowOptions] = useState(false);

  // Export options state
  const [includeSteps, setIncludeSteps] = useState(true);
  const [includeRules, setIncludeRules] = useState(true);
  const [includeReadiness, setIncludeReadiness] = useState(true);
  const [applicantName, setApplicantName] = useState(
    userProfile?.state ? `Citizen Applicant (${userProfile.state})` : 'Citizen Applicant'
  );
  const [applicantNotes, setApplicantNotes] = useState('');

  const t = (key: string) => getTranslation(key, language);

  const allDocs = [
    ...(scheme.requiredDocuments || []),
    ...(scheme.optionalDocuments || []),
  ];
  const totalDocs = allDocs.length;
  const readyDocs = allDocs.filter(
    (d) => (documentStatuses[d.id] || 'Available') === 'Available'
  ).length;
  const pendingDocs = totalDocs - readyDocs;

  const handleExport = () => {
    setIsExporting(true);
    setDownloadSuccessMessage(null);

    try {
      const options: PdfExportOptions = {
        includeApplicationSteps: includeSteps,
        includeEligibilityCriteria: includeRules,
        includeDocumentReadiness: includeReadiness,
        applicantName: applicantName.trim() || 'Citizen Applicant',
        applicantNotes: applicantNotes.trim(),
      };

      const result = exportSchemeDocumentsToPdf(
        scheme,
        documentStatuses,
        userProfile,
        options
      );

      setDownloadSuccessMessage(`Document packet "${result.fileName}" has been generated and saved directly to your device.`);
    } catch (err) {
      console.error('Error exporting scheme documents to PDF:', err);
      alert('Unable to generate PDF on this device. Please ensure downloads are permitted.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="rounded-2xl border border-teal-200 bg-gradient-to-br from-teal-50/70 via-white to-slate-50 p-5 sm:p-6 shadow-xs space-y-4">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <FileDown className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base font-black text-slate-900">
                Export Scheme Documents to PDF
              </h3>
              <span className="px-2 py-0.5 rounded-md bg-teal-100 text-teal-800 text-[10px] font-extrabold uppercase tracking-wider">
                Direct Device Save
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5 max-w-xl leading-relaxed">
              Generate an official, printable PDF checklist of all required documents, issuing authorities, and application steps directly saved to your device for offline submission, CSC center visits, or personal record.
            </p>
          </div>
        </div>

        {/* Quick CTA Button */}
        <button
          onClick={handleExport}
          disabled={isExporting}
          className="px-4 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition cursor-pointer shrink-0 disabled:opacity-50"
        >
          <FileDown className="w-4 h-4" />
          <span>{isExporting ? 'Generating PDF...' : 'Download Documents PDF'}</span>
        </button>
      </div>

      {/* Quick stats chips */}
      <div className="flex items-center gap-2 flex-wrap text-xs pt-1">
        <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 font-semibold flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5 text-teal-600" />
          <span>{totalDocs} Documents Included</span>
        </span>
        <span className="px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>{readyDocs} Ready</span>
        </span>
        {pendingDocs > 0 && (
          <span className="px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 font-semibold flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span>{pendingDocs} Need Action</span>
          </span>
        )}
        <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-600 font-medium flex items-center gap-1.5">
          <Printer className="w-3.5 h-3.5 text-slate-400" />
          <span>A4 Printable Format</span>
        </span>
      </div>

      {/* Success Notification Banner */}
      {downloadSuccessMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs flex items-start gap-2.5 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-bold">Download Complete!</p>
            <p className="text-emerald-800 mt-0.5">{downloadSuccessMessage}</p>
          </div>
          <button
            onClick={() => setDownloadSuccessMessage(null)}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-900 underline cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Customizable Export Options Collapsible */}
      <div className="pt-2 border-t border-teal-100/80">
        <button
          type="button"
          onClick={() => setShowOptions(!showOptions)}
          className="text-xs font-bold text-slate-600 hover:text-teal-800 flex items-center gap-1.5 transition cursor-pointer"
        >
          <Settings2 className="w-3.5 h-3.5 text-teal-600" />
          <span>{showOptions ? 'Hide PDF Customization Options' : 'Customize PDF Sections & Notes'}</span>
          {showOptions ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {showOptions && (
          <div className="mt-3 p-4 rounded-xl bg-white border border-slate-200 space-y-3.5 text-xs text-slate-700">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <label className="flex items-center gap-2 font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeReadiness}
                  onChange={(e) => setIncludeReadiness(e.target.checked)}
                  className="rounded text-teal-600 focus:ring-teal-500 w-4 h-4 cursor-pointer"
                />
                <span>Document Readiness Breakdown</span>
              </label>

              <label className="flex items-center gap-2 font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeSteps}
                  onChange={(e) => setIncludeSteps(e.target.checked)}
                  className="rounded text-teal-600 focus:ring-teal-500 w-4 h-4 cursor-pointer"
                />
                <span>Application Steps Timeline</span>
              </label>

              <label className="flex items-center gap-2 font-medium cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeRules}
                  onChange={(e) => setIncludeRules(e.target.checked)}
                  className="rounded text-teal-600 focus:ring-teal-500 w-4 h-4 cursor-pointer"
                />
                <span>Official Eligibility Criteria</span>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  Applicant Name or Label (Printed on document header)
                </label>
                <input
                  type="text"
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  placeholder="e.g. Ramesh Kumar or Citizen Applicant"
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 text-xs focus:bg-white focus:outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">
                  Optional Citizen Note (CSC application number, local office, etc.)
                </label>
                <input
                  type="text"
                  value={applicantNotes}
                  onChange={(e) => setApplicantNotes(e.target.value)}
                  placeholder="e.g. Application for upcoming kharif season / MeeSeva Center #4"
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 text-xs focus:bg-white focus:outline-none focus:border-teal-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end pt-2">
              <button
                onClick={handleExport}
                disabled={isExporting}
                className="px-4 py-2 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer disabled:opacity-50"
              >
                <FileDown className="w-3.5 h-3.5" />
                <span>Save Customized PDF to Device</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
