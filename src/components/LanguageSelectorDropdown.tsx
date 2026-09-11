import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Globe, ChevronDown, Check, Search, X, MapPin } from 'lucide-react';
import { Language } from '../types';
import { INDIAN_LANGUAGES, IndianLanguageInfo } from '../data/indianLanguages';

interface LanguageSelectorDropdownProps {
  language?: Language;
  currentLanguage?: Language;
  setLanguage?: (lang: Language) => void;
  onSelectLanguage?: (lang: Language) => void;
  highContrast?: boolean;
}

export const LanguageSelectorDropdown: React.FC<LanguageSelectorDropdownProps> = ({
  language,
  currentLanguage,
  setLanguage,
  onSelectLanguage,
  highContrast = false,
}) => {
  const activeLanguage = language || currentLanguage || 'English';
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
      // Auto-focus search input when opened
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const currentLangInfo = useMemo(() => {
    return INDIAN_LANGUAGES.find((l) => l.id === activeLanguage) || INDIAN_LANGUAGES[0];
  }, [activeLanguage]);

  // Filter languages based on search query and region filter
  const filteredLanguages = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return INDIAN_LANGUAGES.filter((item) => {
      // Region filter
      if (selectedRegion !== 'All') {
        if (selectedRegion === 'South' && item.region !== 'South') return false;
        if (selectedRegion === 'North' && item.region !== 'North' && item.region !== 'Central') return false;
        if (selectedRegion === 'East & NE' && item.region !== 'East' && item.region !== 'North-East') return false;
        if (selectedRegion === 'West' && item.region !== 'West') return false;
      }

      if (!q) return true;

      return (
        item.name.toLowerCase().includes(q) ||
        item.nativeName.toLowerCase().includes(q) ||
        item.code.toLowerCase().includes(q) ||
        item.statesAndUTs.toLowerCase().includes(q)
      );
    });
  }, [searchQuery, selectedRegion]);

  const handleSelectLanguage = (lang: Language) => {
    if (typeof setLanguage === 'function') {
      setLanguage(lang);
    }
    if (typeof onSelectLanguage === 'function') {
      onSelectLanguage(lang);
    }
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Scroll-Down Bar Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer transition select-none shadow-xs ${
          highContrast
            ? 'bg-zinc-800 border-yellow-400 text-yellow-300 hover:bg-zinc-700'
            : isOpen
            ? 'bg-teal-50 border-teal-400 text-teal-900 ring-2 ring-teal-500/20'
            : 'bg-white hover:bg-slate-50 border-slate-300 text-slate-800'
        }`}
        title="Select from Indian Languages across 28 States & 8 Union Territories"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <Globe className={`w-3.5 h-3.5 ${highContrast ? 'text-yellow-300' : 'text-teal-600'}`} />
        
        <div className="flex items-center gap-1">
          <span className="font-bold text-[13px]">{currentLangInfo.nativeName}</span>
          <span className="text-[11px] text-slate-500 hidden sm:inline">({currentLangInfo.name})</span>
        </div>

        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-teal-600' : ''
          }`}
        />
      </button>

      {/* Floating Scroll-Down Dropdown Menu */}
      {isOpen && (
        <div
          className={`absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl shadow-2xl border z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150 ${
            highContrast
              ? 'bg-zinc-900 border-yellow-400 text-yellow-100'
              : 'bg-white border-slate-200 text-slate-800'
          }`}
          role="listbox"
        >
          {/* Header */}
          <div className="p-3 pb-2.5 border-b border-slate-100 bg-slate-50/70">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                <span className="text-xs font-bold text-slate-900">
                  Indian Languages (28 States & 8 UTs)
                </span>
              </div>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-teal-100 text-teal-800 border border-teal-200">
                {INDIAN_LANGUAGES.length} Languages
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Access welfare schemes in your state or mother tongue
            </p>

            {/* Search Bar inside scroll down menu */}
            <div className="relative mt-2.5">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search language, state, or UT (e.g., Tamil, Bihar, Ladakh)..."
                className="w-full pl-8 pr-7 py-1.5 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-slate-800 placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-600 rounded"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Region Filter Chips */}
            <div className="flex items-center gap-1 overflow-x-auto pt-2 pb-0.5 scrollbar-none text-[10px]">
              {['All', 'South', 'North', 'East & NE', 'West'].map((region) => (
                <button
                  key={region}
                  onClick={() => setSelectedRegion(region)}
                  className={`px-2 py-0.5 rounded-full font-semibold whitespace-nowrap transition cursor-pointer ${
                    selectedRegion === region
                      ? 'bg-teal-700 text-white shadow-2xs'
                      : 'bg-white hover:bg-slate-200 text-slate-600 border border-slate-200'
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>

          {/* Scrollable Language List Bar */}
          <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 p-1.5 focus:outline-none">
            {filteredLanguages.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-500">
                <MapPin className="w-5 h-5 mx-auto text-slate-400 mb-1 opacity-60" />
                <p className="font-semibold text-slate-700">No language found</p>
                <p className="text-[11px] mt-0.5">Try searching for a state like "Kerala", "Assam", "Gujarat", or "Ladakh"</p>
              </div>
            ) : (
              filteredLanguages.map((item) => {
                const isSelected = item.id === language;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectLanguage(item.id)}
                    className={`w-full text-left p-2.5 rounded-xl transition cursor-pointer flex items-start justify-between gap-2 group ${
                      isSelected
                        ? 'bg-teal-50 border border-teal-200'
                        : 'hover:bg-slate-50 border border-transparent'
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900 group-hover:text-teal-700">
                          {item.nativeName}
                        </span>
                        <span className="text-xs font-semibold text-slate-600">
                          {item.name}
                        </span>
                        {item.isScheduled && (
                          <span className="text-[9px] px-1.5 py-0.2 rounded font-medium bg-amber-50 text-amber-800 border border-amber-200 hidden sm:inline">
                            8th Sched.
                          </span>
                        )}
                      </div>

                      {/* States and UTs where spoken */}
                      <p className="text-[11px] text-slate-500 mt-1 flex items-start gap-1 leading-snug">
                        <MapPin className="w-3 h-3 text-teal-600 shrink-0 mt-0.5" />
                        <span className="truncate" title={item.statesAndUTs}>
                          {item.statesAndUTs}
                        </span>
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0 self-center">
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-bold uppercase">
                        {item.code}
                      </span>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-teal-700 flex items-center justify-center text-white shadow-xs">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })
            )}
          </div>

          {/* Footer status notice */}
          <div className="p-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span className="flex items-center gap-1 font-medium">
              🇮🇳 Republic of India • 28 States & 8 UTs
            </span>
            <span className="text-teal-700 font-semibold">
              Live AI Translations
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
