import React, { useState, useMemo } from 'react';
import { 
  User, 
  Sparkles, 
  Bookmark, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  ArrowRight, 
  ExternalLink, 
  ShieldCheck, 
  Building2, 
  FileText, 
  Bell, 
  Edit3,
  BookmarkCheck,
  Landmark,
  TrendingUp,
  AlertTriangle,
  Upload,
  Check
} from 'lucide-react';
import { Scheme, UserProfile, Language, RuleEvaluationResult, AlertNotification } from '../types';
import { getSafeUrl, getHostname } from '../services/urlUtils';

interface CitizenDashboardProps {
  userProfile: UserProfile;
  schemes: Scheme[];
  evaluations: Record<string, RuleEvaluationResult>;
  savedIds: string[];
  notifications: AlertNotification[];
  language: Language;
  onEditProfile: () => void;
  onViewScheme: (scheme: Scheme) => void;
  onCheckEligibility: (scheme: Scheme) => void;
  onToggleSave: (scheme: Scheme) => void;
  onExploreAll: () => void;
  onOpenAiDiscovery: () => void;
}

export const CitizenDashboard: React.FC<CitizenDashboardProps> = ({
  userProfile,
  schemes,
  evaluations,
  savedIds,
  notifications,
  language,
  onEditProfile,
  onViewScheme,
  onCheckEligibility,
  onToggleSave,
  onExploreAll,
  onOpenAiDiscovery,
}) => {
  const [dashboardTab, setDashboardTab] = useState<'recommended' | 'saved' | 'deadlines' | 'vault'>('recommended');

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  }, []);

  const savedSchemes = useMemo(() => {
    return schemes.filter((s) => savedIds.includes(s.id));
  }, [schemes, savedIds]);

  const recommendedSchemes = useMemo(() => {
    const list = schemes.filter((s) => {
      const evalRes = evaluations[s.id];
      if (evalRes?.verdict === 'LIKELY_ELIGIBLE') return true;
      if (evalRes && evalRes.matchScore >= 70) return true;
      if (s.state === userProfile.state || s.state === 'All-India') return true;
      return false;
    });
    return list.slice(0, 6);
  }, [schemes, evaluations, userProfile]);

  const deadlineItems = useMemo(() => {
    return [
      {
        id: 'd1',
        title: 'NSP Post-Matric Scholarship 2026-27',
        department: 'Ministry of Social Justice / Tribal Affairs',
        deadline: '31 October 2026',
        daysLeft: 50,
        status: 'Open for Registration',
        actionUrl: 'https://scholarships.gov.in',
      },
      {
        id: 'd2',
        title: 'PM-KISAN 19th Installment e-KYC Verification',
        department: 'Ministry of Agriculture & Farmers Welfare',
        deadline: '30 September 2026',
        daysLeft: 19,
        status: 'Mandatory OTP / Biometric KYC',
        actionUrl: 'https://pmkisan.gov.in',
      },
      {
        id: 'd3',
        title: 'Ayushman Bharat Senior Citizen (70+) Vay Vandana Card',
        department: 'National Health Authority',
        deadline: 'Active Open Enrolment',
        daysLeft: 999,
        status: 'Enrolment Live',
        actionUrl: 'https://pmjay.gov.in',
      },
      {
        id: 'd4',
        title: 'PM Surya Ghar Muft Bijli Yojana Rooftop Survey',
        department: 'Ministry of New and Renewable Energy',
        deadline: 'Open Registration',
        daysLeft: 120,
        status: 'Vendor Allocation Active',
        actionUrl: 'https://pmsuryaghar.gov.in',
      },
    ];
  }, []);

  // Standard citizen vault documents
  const [vaultDocs, setVaultDocs] = useState([
    { id: 'v1', name: 'Aadhaar Card (UIDAI)', status: 'Verified', date: 'Linked & Verified' },
    { id: 'v2', name: 'State Domicile Certificate', status: 'Available', date: 'Issued 2025' },
    { id: 'v3', name: 'Annual Income Certificate', status: 'Available', date: 'Valid for FY 2026-27' },
    { id: 'v4', name: 'Bank Passbook / IFSC Link', status: 'DBT-Active', date: 'NPCI Seeded' },
    { id: 'v5', name: 'Caste / Category Certificate', status: 'Pending Upload', date: 'Optional' },
  ]);

  return (
    <div id="citizen-personalized-dashboard" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Top Profile Command Bar */}
      <div className="bg-[#08110D] text-white rounded-3xl p-6 sm:p-8 border border-[#155C45]/40 mb-8 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#D88932] bg-[#D88932]/10 border border-[#D88932]/30 px-2.5 py-0.5 rounded">
                Verified Citizen Dossier
              </span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>e-Pramaan Authenticated</span>
              </span>
            </div>

            <h1 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
              {greeting}, {userProfile.name || 'Citizen'}
            </h1>

            {/* Subtitle citizen info */}
            <p className="text-xs sm:text-sm text-stone-300 mt-1 font-mono">
              {userProfile.occupation || 'Resident'} • {userProfile.state || 'Telangana'} • Age {userProfile.age} • Income: ₹{(userProfile.annualIncome / 100000).toFixed(1)} Lakh/yr
            </p>

            {/* Profile Completeness Bar */}
            <div className="mt-4 flex items-center gap-3 max-w-md">
              <div className="flex-1 bg-white/10 rounded-full h-1.5 overflow-hidden">
                <div className="bg-[#D88932] h-1.5 rounded-full w-[85%]" />
              </div>
              <span className="text-[11px] font-mono text-stone-300 shrink-0">
                Profile 85% Complete
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={onEditProfile}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition flex items-center gap-2 border border-white/20 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Modify Details</span>
            </button>

            <button
              onClick={onOpenAiDiscovery}
              className="px-5 py-2.5 rounded-xl bg-[#155C45] hover:bg-[#1E7658] text-white text-xs font-bold transition flex items-center gap-2 border border-emerald-500/40 shadow-sm cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D88932]" />
              <span>Consult AI Advisor</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats Row (High Typographic Contrast) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div className="p-6 rounded-2xl bg-white border border-[#DFDACD]">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#6C746E] block">
            MATCHED SCHEMES
          </span>
          <p className="font-editorial text-3xl sm:text-4xl font-bold text-[#08110D] mt-2">
            {recommendedSchemes.length}
          </p>
          <span className="text-[11px] font-mono text-[#155C45] mt-1 block">
            Qualifying for your demographic
          </span>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-[#DFDACD]">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#6C746E] block">
            ESTIMATED ANNUAL BENEFIT
          </span>
          <p className="font-editorial text-3xl sm:text-4xl font-bold text-[#155C45] mt-2">
            ₹72,000<span className="text-base font-normal text-[#545B56]"> / yr</span>
          </p>
          <span className="text-[11px] font-mono text-[#545B56] mt-1 block">
            Across active DBT programs
          </span>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-[#DFDACD]">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#6C746E] block">
            SAVED SCHEMES
          </span>
          <p className="font-editorial text-3xl sm:text-4xl font-bold text-[#08110D] mt-2">
            {savedSchemes.length}
          </p>
          <span className="text-[11px] font-mono text-[#6C746E] mt-1 block">
            Bookmarked for submission
          </span>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-[#DFDACD]">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#6C746E] block">
            DOCUMENT READINESS
          </span>
          <p className="font-editorial text-3xl sm:text-4xl font-bold text-[#D88932] mt-2">
            80%
          </p>
          <span className="text-[11px] font-mono text-[#545B56] mt-1 block">
            4 of 5 core records verified
          </span>
        </div>
      </div>

      {/* Command Center Tabs Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-2 border-b border-[#EAE6DB]">
        <div className="flex items-center gap-1 sm:gap-4 overflow-x-auto text-xs font-semibold">
          {[
            { id: 'recommended', label: `Recommended Schemes (${recommendedSchemes.length})` },
            { id: 'saved', label: `Saved Schemes (${savedSchemes.length})` },
            { id: 'deadlines', label: `Upcoming Deadlines (${deadlineItems.length})` },
            { id: 'vault', label: 'Document Vault (5)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setDashboardTab(tab.id as any)}
              className={`py-3 px-3 border-b-2 transition cursor-pointer whitespace-nowrap ${
                dashboardTab === tab.id
                  ? 'border-[#155C45] text-[#155C45] font-bold'
                  : 'border-transparent text-[#6C746E] hover:text-[#08110D]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <button
          onClick={onExploreAll}
          className="text-xs font-mono font-bold text-[#155C45] hover:underline flex items-center gap-1 cursor-pointer self-start sm:self-auto"
        >
          <span>Explore All 24+ Records</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* SECTION 1: RECOMMENDED SCHEMES */}
      {dashboardTab === 'recommended' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {recommendedSchemes.map((scheme) => {
              const evalResult = evaluations[scheme.id];
              const isSaved = savedIds.includes(scheme.id);
              const isEligible = evalResult?.verdict === 'LIKELY_ELIGIBLE';

              return (
                <div
                  key={scheme.id}
                  className="bg-white rounded-2xl border border-[#DFDACD] hover:border-[#155C45] p-5 transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#155C45] bg-[#FAF9F5] border border-[#EAE6DB] px-2 py-0.5 rounded">
                        {scheme.category}
                      </span>
                      <span className="text-[11px] font-mono font-bold text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>{isEligible ? 'Likely Eligible' : 'Review Criteria'}</span>
                      </span>
                    </div>

                    <h4 
                      onClick={() => onViewScheme(scheme)}
                      className="font-editorial text-lg font-bold text-[#08110D] hover:text-[#155C45] transition cursor-pointer line-clamp-2 leading-snug"
                    >
                      {scheme.name}
                    </h4>

                    <p className="text-xs text-[#6C746E] mt-1 truncate font-light">
                      {scheme.department}
                    </p>

                    <div className="mt-3 p-3 rounded-xl bg-[#FAF9F5] border border-[#EAE6DB]">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#155C45] block">Primary Benefit</span>
                      <p className="text-xs font-bold text-[#08110D] mt-0.5 line-clamp-2">
                        {scheme.mainBenefit}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#EAE6DB] flex items-center gap-2">
                    <button
                      onClick={() => onCheckEligibility(scheme)}
                      className="flex-1 py-2 px-3 rounded-xl bg-[#08110D] hover:bg-[#155C45] text-white text-xs font-bold transition cursor-pointer"
                    >
                      Check Eligibility
                    </button>
                    <button
                      onClick={() => onViewScheme(scheme)}
                      className="py-2 px-3 rounded-xl bg-[#FAF9F5] hover:bg-[#F4F2EB] text-[#08110D] border border-[#DFDACD] text-xs font-semibold transition cursor-pointer"
                    >
                      Dossier
                    </button>
                    <button
                      onClick={() => onToggleSave(scheme)}
                      className={`p-2 rounded-xl border transition cursor-pointer ${
                        isSaved ? 'bg-amber-50 text-amber-700 border-amber-300' : 'bg-white text-stone-400 border-[#DFDACD]'
                      }`}
                      title={isSaved ? 'Remove from Saved' : 'Save Scheme'}
                    >
                      {isSaved ? <BookmarkCheck className="w-4 h-4 text-amber-600" /> : <Bookmark className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SECTION 2: SAVED SCHEMES */}
      {dashboardTab === 'saved' && (
        <div>
          {savedSchemes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {savedSchemes.map((scheme) => (
                <div
                  key={scheme.id}
                  className="bg-white rounded-2xl border border-[#DFDACD] p-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 rounded">
                        Saved Bookmark
                      </span>
                      <span className="text-[11px] font-mono text-[#6C746E]">
                        {scheme.governmentLevel}
                      </span>
                    </div>

                    <h4 
                      onClick={() => onViewScheme(scheme)}
                      className="font-editorial text-lg font-bold text-[#08110D] hover:text-[#155C45] transition cursor-pointer line-clamp-2"
                    >
                      {scheme.name}
                    </h4>

                    <p className="text-xs text-[#6C746E] mt-1 truncate">
                      {scheme.department}
                    </p>

                    <div className="mt-3 p-3 rounded-xl bg-[#FAF9F5] border border-[#EAE6DB]">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#155C45] block">Welfare Benefit</span>
                      <p className="text-xs font-bold text-[#08110D] mt-0.5">
                        {scheme.mainBenefit}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#EAE6DB] flex items-center gap-2">
                    <a
                      href={getSafeUrl(scheme.officialUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 px-3 rounded-xl bg-[#08110D] hover:bg-[#155C45] text-white text-xs font-bold text-center inline-flex items-center justify-center gap-1 transition cursor-pointer"
                    >
                      <span>Open Official Portal</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <button
                      onClick={() => onToggleSave(scheme)}
                      className="p-2 rounded-xl bg-[#FAF9F5] hover:bg-rose-50 text-[#6C746E] hover:text-rose-600 border border-[#DFDACD] transition cursor-pointer"
                      title="Remove bookmark"
                    >
                      <BookmarkCheck className="w-4 h-4 text-amber-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-12 bg-white rounded-2xl border border-[#DFDACD]">
              <Bookmark className="w-10 h-10 text-[#DFDACD] mx-auto mb-2" />
              <h3 className="font-editorial text-lg font-bold text-[#08110D]">No Saved Schemes Yet</h3>
              <p className="text-xs text-[#6C746E] mt-1 max-w-sm mx-auto">
                Bookmark schemes while searching to track application deadlines and documents.
              </p>
              <button
                onClick={onExploreAll}
                className="mt-4 px-4 py-2 rounded-xl bg-[#08110D] text-white text-xs font-bold hover:bg-[#155C45] transition cursor-pointer"
              >
                Browse Schemes
              </button>
            </div>
          )}
        </div>
      )}

      {/* SECTION 3: APPLICATION DEADLINES */}
      {dashboardTab === 'deadlines' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-[#DFDACD] overflow-hidden">
            <div className="p-4 sm:p-5 bg-[#FAF9F5] border-b border-[#EAE6DB] flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#08110D]">Official Government Deadlines & Reminders</h3>
                <p className="text-xs text-[#6C746E] mt-0.5">Application cutoffs and mandatory biometric verification schedules</p>
              </div>
              <span className="px-2.5 py-1 rounded text-xs font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                Audited September 2026
              </span>
            </div>

            <div className="divide-y divide-[#EAE6DB]">
              {deadlineItems.map((item) => (
                <div key={item.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#FAF9F5] transition">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-50 text-amber-900 border border-amber-200">
                        {item.status}
                      </span>
                      <span className="text-xs font-mono font-bold text-[#08110D] flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#6C746E]" />
                        Deadline: {item.deadline}
                      </span>
                    </div>
                    <h4 className="font-editorial text-base font-bold text-[#08110D]">{item.title}</h4>
                    <p className="text-xs text-[#6C746E] flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-[#88908A] shrink-0" />
                      <span>{item.department}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <a
                      href={item.actionUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-[#08110D] hover:bg-[#155C45] text-white text-xs font-bold inline-flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <span>Visit Portal</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: DOCUMENT VAULT */}
      {dashboardTab === 'vault' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-[#DFDACD] overflow-hidden p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EAE6DB]">
              <div>
                <h3 className="font-bold text-sm text-[#08110D]">Citizen Identity & Document Vault</h3>
                <p className="text-xs text-[#6C746E] mt-0.5">Pre-verified credentials to speed up application submissions across state & central portals.</p>
              </div>

              <button className="px-4 py-2 rounded-xl bg-[#155C45] hover:bg-[#1E7658] text-white text-xs font-bold flex items-center gap-1.5 transition cursor-pointer self-start sm:self-auto">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload New Document</span>
              </button>
            </div>

            <div className="divide-y divide-[#EAE6DB] mt-2">
              {vaultDocs.map((doc) => (
                <div key={doc.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-[#155C45]" />
                    <div>
                      <h4 className="text-xs font-bold text-[#08110D]">{doc.name}</h4>
                      <span className="text-[11px] font-mono text-[#6C746E]">{doc.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {doc.status}
                    </span>
                    <button className="text-xs font-mono font-semibold text-[#155C45] hover:underline cursor-pointer">
                      View Record
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
