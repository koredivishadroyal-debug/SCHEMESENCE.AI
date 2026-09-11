/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Scheme, 
  UserProfile, 
  Language, 
  SchemeCategory, 
  DocumentStatus, 
  RuleEvaluationResult, 
  AlertNotification 
} from './types';
import { SAMPLE_SCHEMES, DEFAULT_USER_PROFILE } from './data/sampleSchemes';
import { evaluateSchemeEligibility } from './services/ruleEngine';
import { getTranslation } from './services/translations';

// Components
import { Navbar } from './components/Navbar';
import { LandingHero } from './components/LandingHero';
import { EligibilityForm } from './components/EligibilityForm';
import { SchemeCard } from './components/SchemeCard';
import { SchemeFinder } from './components/SchemeFinder';
import { SchemeDetailModal } from './components/SchemeDetailModal';
import { DocumentUploadView } from './components/DocumentUploadView';
import { SchemeComparisonView } from './components/SchemeComparisonView';
import { FamilyFinderView } from './components/FamilyFinderView';
import { SavedSchemesView } from './components/SavedSchemesView';
import { AdminDashboard } from './components/AdminDashboard';
import { AiChatbotModal } from './components/AiChatbotModal';
import { PrivacyModal } from './components/PrivacyModal';
import { AboutModal } from './components/AboutModal';
import { CitizenSignInModal } from './components/CitizenSignInModal';
import { AiSchemeDiscoveryPage } from './components/AiSchemeDiscoveryPage';
import { CitizenDashboard } from './components/CitizenDashboard';

// Icons
import { 
  ShieldCheck, 
  ExternalLink, 
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

const INITIAL_NOTIFICATIONS: AlertNotification[] = [
  {
    id: 'n1',
    schemeId: 'nsp_postmatric',
    schemeName: 'National Scholarship Portal',
    message: 'Post-Matric Scholarship renewal window closes on 31st October 2026. Keep income certificates ready.',
    date: '10 Sep 2026',
    isRead: false,
    type: 'deadline',
  },
  {
    id: 'n2',
    schemeId: 'pm-kisan',
    schemeName: 'PM-KISAN 19th Tranche',
    message: 'Mandatory e-KYC deadline extended by Ministry of Agriculture for landholding farmers.',
    date: '08 Sep 2026',
    isRead: false,
    type: 'update',
  },
  {
    id: 'n3',
    schemeId: 'ayushman_bharat',
    schemeName: 'Ayushman Bharat',
    message: 'Senior citizens aged 70+ now eligible for unconditional ₹5 Lakh cover regardless of family income.',
    date: '05 Sep 2026',
    isRead: false,
    type: 'update',
  },
];

export default function App() {
  // Navigation & View state
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [language, setLanguage] = useState<Language>('English');
  const [schemes, setSchemes] = useState<Scheme[]>(SAMPLE_SCHEMES);
  const [userProfile, setUserProfile] = useState<UserProfile>(DEFAULT_USER_PROFILE);
  const [selectedCategory, setSelectedCategory] = useState<SchemeCategory>('All');
  const [finderSearchQuery, setFinderSearchQuery] = useState<string>('');
  const [aiInitialQuery, setAiInitialQuery] = useState<string>('');

  // Interactive selection & modal states
  const [activeDetailScheme, setActiveDetailScheme] = useState<Scheme | null>(null);
  const [detailModalInitialTab, setDetailModalInitialTab] = useState<'overview' | 'eligibility' | 'documents' | 'application' | 'faq'>('overview');
  const [comparedIds, setComparedIds] = useState<string[]>([]);
  const [savedIds, setSavedIds] = useState<string[]>(['nsp_postmatric', 'ayushman_bharat']);
  const [documentStatuses, setDocumentStatuses] = useState<Record<string, DocumentStatus>>({
    income_cert_nsp: 'Need to Apply',
    bonafide_student_cert: 'Available',
    ration_bpl_card: 'Available',
  });

  const handleOpenDetails = (scheme: Scheme, tab: 'overview' | 'eligibility' | 'documents' | 'application' | 'faq' = 'overview') => {
    setDetailModalInitialTab(tab);
    setActiveDetailScheme(scheme);
  };

  // Modals & Chatbot
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);
  const [aiChatContext, setAiChatContext] = useState<string | null>(null);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isCitizenProfileOpen, setIsCitizenProfileOpen] = useState(false);

  // Accessibility & Admin
  const [largeText, setLargeText] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Notifications
  const [notifications] = useState<AlertNotification[]>(INITIAL_NOTIFICATIONS);

  // Evaluated schemes cache based on userProfile
  const evaluations: Record<string, RuleEvaluationResult> = useMemo(() => {
    const map: Record<string, RuleEvaluationResult> = {};
    schemes.forEach((s) => {
      map[s.id] = evaluateSchemeEligibility(s, userProfile);
    });
    return map;
  }, [schemes, userProfile]);

  // Handlers
  const handleSaveProfile = (updatedProfile: UserProfile) => {
    setUserProfile(updatedProfile);
  };

  const handleToggleSave = (scheme: Scheme) => {
    setSavedIds((prev) =>
      prev.includes(scheme.id)
        ? prev.filter((id) => id !== scheme.id)
        : [...prev, scheme.id]
    );
  };

  const handleToggleCompare = (scheme: Scheme) => {
    setComparedIds((prev) => {
      if (prev.includes(scheme.id)) {
        return prev.filter((id) => id !== scheme.id);
      }
      if (prev.length >= 3) {
        alert('You can compare a maximum of 3 schemes simultaneously.');
        return prev;
      }
      return [...prev, scheme.id];
    });
  };

  const handleUpdateDocStatus = (schemeId: string, docId: string, status: DocumentStatus) => {
    setDocumentStatuses((prev) => ({
      ...prev,
      [docId]: status,
    }));
  };

  const handleOpenAiChatWithContext = (context: string) => {
    setAiChatContext(context);
    setIsAiChatOpen(true);
  };

  const handleAddParsedScheme = (parsed: Scheme) => {
    setSchemes((prev) => [parsed, ...prev]);
    setActiveDetailScheme(parsed);
    setDetailModalInitialTab('overview');
  };

  const t = (key: string) => getTranslation(key, language);

  return (
    <div className={`min-h-screen flex flex-col antialiased transition-all ${
      largeText ? 'text-base' : 'text-sm'
    } ${
      highContrast 
        ? 'bg-black text-yellow-300' 
        : 'bg-slate-50/70 text-slate-800'
    }`}>
      {/* Top Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        language={language}
        setLanguage={setLanguage}
        savedCount={savedIds.length}
        openAiChat={() => {
          setAiChatContext(null);
          setIsAiChatOpen(true);
        }}
        openPrivacyModal={() => setIsPrivacyModalOpen(true)}
        openAboutModal={() => setIsAboutModalOpen(true)}
        openCitizenProfileModal={() => setIsCitizenProfileOpen(true)}
        userProfile={userProfile}
        notifications={notifications}
        largeText={largeText}
        setLargeText={setLargeText}
        highContrast={highContrast}
        setHighContrast={setHighContrast}
        isAdmin={isAdmin}
        setIsAdmin={setIsAdmin}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {/* VIEW 1: HOME / LANDING PAGE */}
        {currentTab === 'home' && (
          <div>
            <LandingHero
              language={language}
              popularSchemes={schemes}
              evaluations={evaluations}
              savedIds={savedIds}
              onCheckEligibility={(scheme) => {
                if (scheme) {
                  handleOpenDetails(scheme, 'eligibility');
                } else {
                  setCurrentTab('eligibility');
                }
              }}
              onSearchSchemes={(query?: string) => {
                if (query !== undefined) {
                  setFinderSearchQuery(query);
                }
                setCurrentTab('find');
              }}
              onAskAi={(query?: string) => {
                if (query) {
                  setAiInitialQuery(query);
                }
                setCurrentTab('ask-ai');
              }}
              onSelectCategory={(cat) => {
                setSelectedCategory(cat);
                setFinderSearchQuery('');
                setCurrentTab('find');
              }}
              onViewScheme={(scheme) => handleOpenDetails(scheme, 'overview')}
              onToggleSave={handleToggleSave}
            />

            {/* Quick Recommended Section on Home */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Recommended For Your Profile
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Tailored for: <strong className="text-slate-700">{userProfile.occupation}</strong>, {userProfile.state}, Age {userProfile.age}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsCitizenProfileOpen(true)}
                    className="text-xs font-bold text-teal-800 hover:text-teal-950 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Change Profile</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => setCurrentTab('dashboard')}
                    className="px-4 py-2 rounded-xl bg-teal-800 hover:bg-teal-900 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs transition"
                  >
                    <span>Go to Citizen Dashboard</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Scheme Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {schemes.slice(0, 6).map((scheme, index) => (
                  <SchemeCard
                    key={`${scheme.id}-${scheme.recordId || index}`}
                    scheme={scheme}
                    evaluation={evaluations[scheme.id]}
                    language={language}
                    onViewDetails={(s) => handleOpenDetails(s, 'overview')}
                    onCheckEligibility={(s) => handleOpenDetails(s, 'eligibility')}
                    onToggleCompare={handleToggleCompare}
                    isCompared={comparedIds.includes(scheme.id)}
                    onToggleSave={handleToggleSave}
                    isSaved={savedIds.includes(scheme.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: SCHEME FINDER / DIRECTORY */}
        {currentTab === 'find' && (
          <SchemeFinder
            schemes={schemes}
            userProfile={userProfile}
            evaluations={evaluations}
            language={language}
            onViewDetails={(s) => handleOpenDetails(s, 'overview')}
            onCheckEligibility={(s) => handleOpenDetails(s, 'eligibility')}
            onToggleCompare={handleToggleCompare}
            comparedIds={comparedIds}
            onToggleSave={handleToggleSave}
            savedIds={savedIds}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            initialSearchQuery={finderSearchQuery}
            onSearchQueryChange={setFinderSearchQuery}
            onUpdateProfile={handleSaveProfile}
          />
        )}

        {/* VIEW 3: CONVERSATIONAL ASK SCHEMESENSE AI */}
        {currentTab === 'ask-ai' && (
          <AiSchemeDiscoveryPage
            schemes={schemes}
            evaluations={evaluations}
            language={language}
            userProfile={userProfile}
            initialQuery={aiInitialQuery}
            onViewScheme={(s) => handleOpenDetails(s, 'overview')}
            onCheckEligibility={(s) => handleOpenDetails(s, 'eligibility')}
            onToggleSave={handleToggleSave}
            savedIds={savedIds}
          />
        )}

        {/* VIEW 4: CITIZEN DASHBOARD */}
        {currentTab === 'dashboard' && (
          <CitizenDashboard
            schemes={schemes}
            evaluations={evaluations}
            userProfile={userProfile}
            savedIds={savedIds}
            documentStatuses={documentStatuses}
            onOpenProfileModal={() => setIsCitizenProfileOpen(true)}
            onViewScheme={(s) => handleOpenDetails(s, 'overview')}
            onCheckEligibility={(s) => handleOpenDetails(s, 'eligibility')}
            onToggleSave={handleToggleSave}
            onNavigate={(tab) => setCurrentTab(tab)}
          />
        )}

        {/* VIEW 5: ELIGIBILITY CHECKER FORM */}
        {currentTab === 'eligibility' && (
          <EligibilityForm
            initialProfile={userProfile}
            onSaveProfile={(updated) => {
              handleSaveProfile(updated);
              setCurrentTab('dashboard');
            }}
            language={language}
          />
        )}

        {/* VIEW 6: SAVED SCHEMES */}
        {currentTab === 'saved' && (
          <SavedSchemesView
            schemes={schemes}
            savedIds={savedIds}
            onRemoveSaved={handleToggleSave}
            documentStatuses={documentStatuses}
            language={language}
            onViewDetails={(s) => handleOpenDetails(s, 'overview')}
          />
        )}

        {/* VIEW 7: SCHEME COMPARISON */}
        {currentTab === 'compare' && (
          <SchemeComparisonView
            schemes={schemes}
            comparedIds={comparedIds}
            onRemoveFromCompare={(id) => setComparedIds((prev) => prev.filter((i) => i !== id))}
            onClearCompare={() => setComparedIds([])}
            language={language}
            onViewDetails={(s) => handleOpenDetails(s, 'overview')}
          />
        )}

        {/* VIEW 8: FAMILY BENEFIT FINDER */}
        {currentTab === 'family' && (
          <FamilyFinderView
            schemes={schemes}
            language={language}
            onViewDetails={(s) => handleOpenDetails(s, 'overview')}
          />
        )}

        {/* VIEW 9: DOCUMENT UPLOAD & AI PARSER */}
        {currentTab === 'upload' && (
          <DocumentUploadView
            language={language}
            onAddParsedSchemeToCatalog={handleAddParsedScheme}
            onCheckEligibilityForScheme={(s) => {
              handleOpenDetails(s, 'eligibility');
            }}
          />
        )}

        {/* VIEW 10: ADMIN / DATA VERIFICATION DASHBOARD */}
        {currentTab === 'admin' && (
          <div className="bg-slate-100/70">
            <AdminDashboard
              schemes={schemes}
              onAddScheme={(newS) => setSchemes((prev) => [newS, ...prev])}
              onUpdateScheme={(updated) =>
                setSchemes((prev) => prev.map((s) => (s.id === updated.id ? updated : s)))
              }
              onDeleteScheme={(id) => setSchemes((prev) => prev.filter((s) => s.id !== id))}
            />
          </div>
        )}
      </main>

      {/* Scheme Detail Modal */}
      {activeDetailScheme && (
        <SchemeDetailModal
          scheme={activeDetailScheme}
          evaluation={evaluations[activeDetailScheme.id]}
          language={language}
          onClose={() => setActiveDetailScheme(null)}
          documentStatuses={documentStatuses}
          onUpdateDocStatus={handleUpdateDocStatus}
          onOpenAiChatWithContext={handleOpenAiChatWithContext}
          initialTab={detailModalInitialTab}
          userProfile={userProfile}
        />
      )}

      {/* Floating AI Chatbot trigger & modal */}
      <AiChatbotModal
        isOpen={isAiChatOpen}
        onClose={() => {
          setIsAiChatOpen(false);
          setAiChatContext(null);
        }}
        language={language}
        initialContextPrompt={aiChatContext}
      />

      {/* Citizen Sign In / Persona Switcher Modal */}
      <CitizenSignInModal
        isOpen={isCitizenProfileOpen}
        onClose={() => setIsCitizenProfileOpen(false)}
        currentProfile={userProfile}
        onSelectProfile={(updated) => {
          setUserProfile(updated);
          setIsCitizenProfileOpen(false);
        }}
      />

      {/* About SchemeSense AI Modal */}
      <AboutModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
      />

      {/* Privacy Guarantee Modal */}
      <PrivacyModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />

      {/* Official Government Tech Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 pt-12 pb-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800">
            {/* Column 1: Brand & Tagline */}
            <div className="space-y-3">
              <div className="flex items-center gap-2.5 text-white font-black text-lg">
                <div className="w-8 h-8 rounded-lg bg-teal-700 flex items-center justify-center text-white text-sm border border-teal-500">
                  SS
                </div>
                <span>SchemeSense AI</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                “Find the schemes meant for you.” Discover eligible public welfare schemes, understand benefits in simple language, and apply through verified government sources.
              </p>
              <div className="flex items-center gap-2 text-emerald-400 text-[11px] font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Zero Aadhaar Numbers Collected or Stored</span>
              </div>
            </div>

            {/* Column 2: Platform Navigation */}
            <div>
              <h4 className="text-white font-bold mb-3 text-xs uppercase tracking-wider">
                Platform Navigation
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <button onClick={() => setCurrentTab('home')} className="hover:text-white cursor-pointer">
                    Home
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentTab('find')} className="hover:text-white cursor-pointer">
                    Explore Schemes Directory
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentTab('ask-ai')} className="hover:text-white cursor-pointer">
                    Ask SchemeSense AI
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentTab('dashboard')} className="hover:text-white cursor-pointer">
                    Citizen Dashboard
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentTab('eligibility')} className="hover:text-white cursor-pointer">
                    5-Step Eligibility Check
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentTab('admin')} className="hover:text-white cursor-pointer">
                    Verification & Audit Hub
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Official Portals Reference */}
            <div>
              <h4 className="text-white font-bold mb-3 text-xs uppercase tracking-wider">
                Official Portals Reference
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <a href="https://www.india.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1">
                    <span>National Portal of India</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a href="https://pmkisan.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1">
                    <span>PM-KISAN Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a href="https://scholarships.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1">
                    <span>National Scholarship Portal (NSP)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a href="https://pmjay.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1">
                    <span>Ayushman Bharat PM-JAY</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a href="https://dharani.telangana.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1">
                    <span>Telangana Rythu Bharosa (Dharani)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Official Disclaimers */}
            <div>
              <h4 className="text-white font-bold mb-2 text-xs uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                <span>Official Nodal Notice</span>
              </h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                SchemeSense AI guides you to the official government portal. We do not collect fees or submit applications on your behalf.
              </p>
              <p className="text-[11px] text-slate-500 mt-2">
                Always verify scheme details on the respective department’s .gov.in or .nic.in website prior to final submission.
              </p>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-3">
            <div>
              © 2026 SchemeSense AI. Citizen-First Open GovTech Platform.
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => setIsAboutModalOpen(true)} className="hover:text-slate-300 cursor-pointer">
                About SchemeSense
              </button>
              <span>•</span>
              <button onClick={() => setIsPrivacyModalOpen(true)} className="hover:text-slate-300 cursor-pointer">
                Privacy Policy
              </button>
              <span>•</span>
              <span className="text-emerald-400 font-semibold">Grounded in Official Gazettes</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
