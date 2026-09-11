import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Search, 
  Sparkles, 
  Bookmark, 
  Bot, 
  ShieldCheck, 
  CheckCircle2, 
  User, 
  Menu, 
  X,
  Bell,
  SlidersHorizontal,
  Type,
  SunMedium,
  Moon,
  Info,
  ChevronDown
} from 'lucide-react';
import { Language, AlertNotification, UserProfile } from '../types';
import { getTranslation } from '../services/translations';
import { LanguageSelectorDropdown } from './LanguageSelectorDropdown';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  savedCount: number;
  openAiChat: () => void;
  openPrivacyModal: () => void;
  openAboutModal: () => void;
  openCitizenProfileModal: () => void;
  userProfile: UserProfile;
  notifications: AlertNotification[];
  largeText: boolean;
  setLargeText: (val: boolean | ((prev: boolean) => boolean)) => void;
  highContrast: boolean;
  setHighContrast: (val: boolean | ((prev: boolean) => boolean)) => void;
  isAdmin: boolean;
  setIsAdmin: (val: boolean | ((prev: boolean) => boolean)) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  language,
  setLanguage,
  savedCount,
  openPrivacyModal,
  openAboutModal,
  openCitizenProfileModal,
  userProfile,
  notifications,
  largeText,
  setLargeText,
  highContrast,
  setHighContrast,
  isAdmin,
  setIsAdmin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const t = (key: string) => getTranslation(key, language);

  const getNavLabel = (id: string, defaultLabel: string) => {
    switch (id) {
      case 'home':
        return t('navHome') || 'Home';
      case 'find':
        return t('navFindSchemes') || 'Explore';
      case 'ask-ai':
        return t('navAiAssistant') || 'Ask AI';
      case 'eligibility':
        return t('navCheckEligibility') || 'Eligibility';
      case 'saved':
        return t('navMySchemes') || 'Saved';
      default:
        return defaultLabel;
    }
  };

  const navItems = [
    { id: 'home', label: getNavLabel('home', 'Home'), icon: Building2 },
    { id: 'find', label: getNavLabel('find', 'Explore'), icon: Search },
    { id: 'ask-ai', label: getNavLabel('ask-ai', 'Ask AI'), icon: Bot, isAi: true },
    { id: 'eligibility', label: getNavLabel('eligibility', 'Eligibility'), icon: CheckCircle2 },
    { id: 'saved', label: getNavLabel('saved', 'Saved'), icon: Bookmark, badge: savedCount },
  ];

  const unreadAlerts = notifications.filter((n) => !n.isRead).length;

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        highContrast
          ? 'bg-black text-yellow-300 border-b border-yellow-400'
          : isScrolled
          ? 'bg-[#08110D]/95 backdrop-blur-xl border-b border-emerald-900/40 text-stone-100 shadow-lg shadow-black/20'
          : 'bg-[#08110D] border-b border-emerald-950/60 text-stone-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? 'h-14' : 'h-16'}`}>
          
          {/* Brand Logo [SS] SchemeSense AI */}
          <div 
            onClick={() => setCurrentTab('home')} 
            className="flex items-center gap-3 cursor-pointer group select-none shrink-0"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setCurrentTab('home')}
            aria-label="SchemeSense AI Home"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#155C45] via-[#1E7658] to-[#D88932] p-[1px] shadow-sm">
              <div className="w-full h-full bg-[#0C1511] rounded-[7px] flex items-center justify-center font-bold text-xs tracking-tighter text-amber-400 group-hover:text-amber-300 transition-colors">
                SS
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-tight text-base sm:text-lg text-stone-100 group-hover:text-white transition-colors">
                  SchemeSense <span className="text-[#2C8C6B] font-light font-editorial italic text-lg">AI</span>
                </span>
                <span className="hidden sm:inline-block text-[10px] uppercase tracking-widest text-emerald-400/80 font-mono px-1.5 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/40">
                  GovTech
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-all cursor-pointer relative flex items-center gap-1.5 ${
                    isActive
                      ? 'text-white bg-emerald-900/40 border border-emerald-700/40 shadow-xs'
                      : 'text-stone-300 hover:text-white hover:bg-emerald-950/30'
                  }`}
                >
                  {item.isAi && (
                    <Sparkles className="w-3 h-3 text-[#D88932] animate-pulse" />
                  )}
                  <span>{item.label}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="ml-1 px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-[#155C45] text-white border border-emerald-600/30">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#D88932] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Controls: Language & Citizen Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Language Dropdown */}
            <div className="shrink-0">
              <LanguageSelectorDropdown
                language={language}
                currentLanguage={language}
                setLanguage={setLanguage}
                onSelectLanguage={setLanguage}
                highContrast={highContrast}
              />
            </div>

            {/* Citizen Persona Profile Pill */}
            <button
              onClick={openCitizenProfileModal}
              className="group flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-800/30 text-stone-200 text-xs font-medium transition cursor-pointer"
              title="Citizen Profile & Preferences"
              aria-label="Open Citizen Profile"
            >
              <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#155C45] to-[#2C8C6B] text-white flex items-center justify-center text-[10px] font-bold shadow-xs">
                {userProfile.name ? userProfile.name.charAt(0).toUpperCase() : 'C'}
              </div>
              <span className="hidden lg:inline text-xs font-medium text-stone-300 group-hover:text-white truncate max-w-[110px]">
                {userProfile.name || 'Citizen'}
              </span>
              <ChevronDown className="w-3 h-3 text-stone-400 group-hover:text-stone-200 transition-transform" />
            </button>

            {/* Quick Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen((prev) => !prev)}
                className="p-2 rounded-lg text-stone-400 hover:text-stone-200 hover:bg-emerald-950/40 transition cursor-pointer relative"
                title="Notifications & Scheme Updates"
                aria-label="Alerts"
              >
                <Bell className="w-4 h-4" />
                {unreadAlerts > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#D88932] ring-2 ring-[#08110D]"></span>
                )}
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-[#0C1511] text-stone-200 rounded-xl shadow-2xl border border-emerald-900/50 p-3 z-50 text-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-emerald-950 font-bold text-stone-100">
                    <span className="tracking-tight">Notifications & Deadlines</span>
                    <span className="text-[10px] text-emerald-400 font-mono">{notifications.length} Active</span>
                  </div>
                  <div className="max-h-64 overflow-y-auto divide-y divide-emerald-950/60 mt-2">
                    {notifications.map((n) => (
                      <div key={n.id} className="py-2.5 hover:bg-emerald-950/30 rounded-lg px-2 transition-colors">
                        <div className="flex items-center justify-between text-[11px] font-semibold text-stone-200">
                          <span className="truncate pr-1">{n.schemeName}</span>
                          <span className="text-[9px] text-amber-400/90 font-mono uppercase bg-amber-950/40 px-1 rounded">{n.type}</span>
                        </div>
                        <p className="text-[11px] text-stone-400 mt-1 leading-snug">{n.message}</p>
                        <span className="text-[9px] text-stone-500 font-mono mt-1 block">{n.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Micro Accessibility & System Settings toggle */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setSettingsOpen((prev) => !prev)}
                className="p-2 rounded-lg text-stone-400 hover:text-stone-200 hover:bg-emerald-950/40 transition cursor-pointer"
                title="Accessibility & Platform Settings"
                aria-label="Settings"
              >
                <SlidersHorizontal className="w-4 h-4" />
              </button>

              {settingsOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-[#0C1511] text-stone-200 rounded-xl shadow-2xl border border-emerald-900/50 p-2.5 z-50 text-xs space-y-1">
                  <div className="px-2 py-1 text-[10px] uppercase font-mono tracking-wider text-emerald-400/80 border-b border-emerald-950/60 pb-1.5 mb-1">
                    Accessibility & Mode
                  </div>

                  <button
                    onClick={() => setLargeText((prev) => !prev)}
                    className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-emerald-950/40 text-left transition cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <Type className="w-3.5 h-3.5 text-stone-400" />
                      <span>Large Text</span>
                    </span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${largeText ? 'bg-emerald-600 text-white' : 'bg-stone-800 text-stone-400'}`}>
                      {largeText ? 'ON' : 'OFF'}
                    </span>
                  </button>

                  <button
                    onClick={() => setHighContrast((prev) => !prev)}
                    className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-emerald-950/40 text-left transition cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      {highContrast ? <SunMedium className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-stone-400" />}
                      <span>High Contrast</span>
                    </span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${highContrast ? 'bg-amber-500 text-black' : 'bg-stone-800 text-stone-400'}`}>
                      {highContrast ? 'ON' : 'OFF'}
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      setIsAdmin((prev) => !prev);
                      if (!isAdmin) setCurrentTab('admin');
                    }}
                    className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-emerald-950/40 text-left transition cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Verification Hub</span>
                    </span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${isAdmin ? 'bg-emerald-700 text-white' : 'bg-stone-800 text-stone-400'}`}>
                      {isAdmin ? 'ADMIN' : 'OFF'}
                    </span>
                  </button>

                  <div className="border-t border-emerald-950/60 pt-1 mt-1">
                    <button
                      onClick={() => {
                        openPrivacyModal();
                        setSettingsOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-emerald-950/40 text-left text-stone-400 hover:text-stone-200 transition cursor-pointer"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                      <span>0 Aadhaar Stored Policy</span>
                    </button>
                    <button
                      onClick={() => {
                        openAboutModal();
                        setSettingsOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-emerald-950/40 text-left text-stone-400 hover:text-stone-200 transition cursor-pointer"
                    >
                      <Info className="w-3.5 h-3.5 text-stone-400" />
                      <span>About Platform</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="p-2 rounded-lg text-stone-300 hover:text-white hover:bg-emerald-950/40 md:hidden transition cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0C1511] border-b border-emerald-900/50 px-4 pt-3 pb-6 space-y-1 shadow-2xl">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full px-3.5 py-2.5 rounded-lg text-xs font-medium flex items-center justify-between transition cursor-pointer ${
                  isActive
                    ? 'bg-emerald-900/50 text-white border border-emerald-700/50'
                    : 'text-stone-300 hover:bg-emerald-950/40 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 text-emerald-400" />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-[#155C45] text-white">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-3 border-t border-emerald-950/80 flex items-center justify-between text-xs">
            <button
              onClick={() => {
                openCitizenProfileModal();
                setMobileMenuOpen(false);
              }}
              className="text-stone-300 hover:text-white flex items-center gap-1.5 py-1"
            >
              <User className="w-3.5 h-3.5 text-emerald-400" />
              <span>{userProfile.name || 'Citizen Profile'}</span>
            </button>
            <button
              onClick={() => {
                openAboutModal();
                setMobileMenuOpen(false);
              }}
              className="text-stone-400 hover:text-stone-200 py-1"
            >
              About
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
