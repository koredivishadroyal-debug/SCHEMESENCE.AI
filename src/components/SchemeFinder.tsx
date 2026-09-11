import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Sparkles, 
  CheckCircle2, 
  MapPin, 
  Layers, 
  RotateCcw,
  Mic,
  MicOff,
  Loader2,
  HelpCircle,
  ArrowRight,
  Info,
  UserCheck,
  Landmark,
  ShieldCheck,
  Terminal,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Building2,
  Bookmark,
  BookmarkCheck,
  Scale,
  ChevronRight,
  AlertTriangle,
  XCircle
} from 'lucide-react';
import { 
  Scheme, 
  SchemeCategory, 
  UserProfile, 
  RuleEvaluationResult, 
  Language, 
  GovernmentRecordType,
  SearchDebugInfo,
  ALL_INDIAN_STATES, 
  ALL_UNION_TERRITORIES 
} from '../types';
import { SchemeCard } from './SchemeCard';
import { getTranslation } from '../services/translations';
import { 
  identifySchemesFromQuery, 
  identifySchemesWithAi, 
  extractProfileFromQuery,
  AiIdentificationResponse, 
  IntentMatchResult 
} from '../services/intentMatcher';
import { resolveGovernmentEntity } from '../services/governmentEntityResolver';
import { executeMultilingualSearch } from '../services/multilingualSearch';
import { getLocalizedCategory, getGlossaryTerm } from '../data/multilingualGlossary';
import { SCHEME_TRANSLATIONS } from '../services/schemeLocalization';

interface SchemeFinderProps {
  schemes: Scheme[];
  userProfile: UserProfile;
  evaluations: Record<string, RuleEvaluationResult>;
  language: Language;
  onViewDetails: (scheme: Scheme) => void;
  onCheckEligibility: (scheme: Scheme) => void;
  onToggleCompare: (scheme: Scheme) => void;
  comparedIds: string[];
  onToggleSave: (scheme: Scheme) => void;
  savedIds: string[];
  selectedCategory: SchemeCategory;
  onSelectCategory: (cat: SchemeCategory) => void;
  initialSearchQuery?: string;
  onSearchQueryChange?: (query: string) => void;
  onUpdateProfile?: (newProfile: UserProfile) => void;
}

const CATEGORIES: SchemeCategory[] = [
  'All',
  'Documents',
  'Citizen Services',
  'Certificates',
  'Education',
  'Agriculture',
  'Employment',
  'Housing',
  'Healthcare',
  'Women',
  'Students',
  'Senior Citizens',
  'Business',
  'Skill Development',
  'Social Welfare',
  'Disability',
  'Rural Development',
];

/**
 * Normalizes government_level across varied registry records.
 * Honors both scheme.government_level ('CENTRAL' | 'STATE' | 'UT' | 'DISTRICT')
 * and scheme.governmentLevel ('Central' | 'State' | 'Union Territory' | 'District/Local').
 */
export const getNormalizedGovLevel = (scheme: Scheme): 'CENTRAL' | 'STATE' | 'UT' | 'DISTRICT' => {
  if (scheme.government_level) {
    return scheme.government_level;
  }
  const gl = (scheme.governmentLevel || '').toLowerCase();
  if (gl === 'central' || (scheme.state || '').toLowerCase() === 'all-india') return 'CENTRAL';
  if (gl === 'state') return 'STATE';
  if (gl.includes('territory') || gl === 'ut') return 'UT';
  if (gl.includes('district') || gl.includes('local')) return 'DISTRICT';
  return 'CENTRAL';
};

/**
 * Checks if a scheme matches the specified jurisdiction filter.
 * Central schemes and All-India schemes are valid nationwide across all jurisdictions.
 */
export const isSchemeMatchingJurisdiction = (scheme: Scheme, targetJurisdiction: string): boolean => {
  if (!targetJurisdiction || targetJurisdiction === 'All') return true;

  const target = targetJurisdiction.toLowerCase().trim();
  const schemeState = (scheme.state || '').toLowerCase().trim();
  const schemeUT = (scheme.unionTerritory || '').toLowerCase().trim();
  const govLevel = getNormalizedGovLevel(scheme);

  // All-India filter: only Central / All-India schemes
  if (target === 'all-india') {
    return schemeState === 'all-india' || govLevel === 'CENTRAL';
  }

  // Central schemes apply in every state/UT
  if (schemeState === 'all-india' || govLevel === 'CENTRAL') {
    return true;
  }

  // State or Union Territory match
  if (schemeState === target || schemeUT === target) {
    return true;
  }

  // Multi-state eligibility check
  if (scheme.eligibilityRules?.states && scheme.eligibilityRules.states.some(s => s.toLowerCase().trim() === target || s.toLowerCase().trim() === 'all-india')) {
    return true;
  }

  return false;
};


export const SchemeFinder: React.FC<SchemeFinderProps> = ({
  schemes,
  userProfile,
  evaluations,
  language,
  onViewDetails,
  onCheckEligibility,
  onToggleCompare,
  comparedIds,
  onToggleSave,
  savedIds,
  selectedCategory,
  onSelectCategory,
  initialSearchQuery = '',
  onSearchQueryChange,
  onUpdateProfile,
}) => {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);

  // Extract structured profile directly from conversational query
  const extractedProfile = useMemo(() => {
    return extractProfileFromQuery(searchQuery);
  }, [searchQuery]);

  // User Location Context from Profile & Search Query
  const userProfileState = userProfile.state && userProfile.state !== 'All-India' ? userProfile.state : null;
  const userLocationState = extractedProfile.state || userProfileState;
  const userLocationDistrict = extractedProfile.district || (userProfile.district ? userProfile.district : null);

  // Default to user's profile location context as primary search filter if available
  const [selectedState, setSelectedState] = useState<string>(() => userProfileState || 'All');
  const [selectedGovLevel, setSelectedGovLevel] = useState<string>('All');
  const [selectedRecordType, setSelectedRecordType] = useState<string>('All');
  const [eligibilityFilter, setEligibilityFilter] = useState<'All' | 'Likely' | 'Possible'>('All');
  const [isListening, setIsListening] = useState(false);
  const [isAiIdentifying, setIsAiIdentifying] = useState(false);
  const [aiResult, setAiResult] = useState<AiIdentificationResponse | null>(null);
  const [profileAppliedMessage, setProfileAppliedMessage] = useState<string | null>(null);
  const [showSearchDebug, setShowSearchDebug] = useState(false);

  // Deep Nationwide Government Entity, Portal & Scheme Resolution
  const entityResolution = useMemo(() => {
    if (!searchQuery.trim()) return null;
    return resolveGovernmentEntity(searchQuery, schemes, userProfile.state, userProfile.district);
  }, [searchQuery, schemes, userProfile.state, userProfile.district]);

  // Set of schemes hosted on or associated with the resolved portal or entity
  const portalAssociatedIds = useMemo(() => {
    if (!entityResolution) return new Set<string>();
    return new Set(entityResolution.schemes.map(s => s.id));
  }, [entityResolution]);

  // User view mode when a government portal is identified ('portal_showcase' or 'grid')
  const [portalViewMode, setPortalViewMode] = useState<'portal_showcase' | 'grid'>('portal_showcase');

  // Programs and welfare schemes officially hosted or mapped under the resolved portal
  const portalRelatedSchemes = useMemo(() => {
    if (!entityResolution?.resolvedPortal) return [];
    const portal = entityResolution.resolvedPortal;
    const hostedIds = portal.programs_hosted || [];

    // Find all schemes from the entire repository that are hosted or mapped to this portal
    const matched = schemes.filter(s => {
      const isHosted = hostedIds.includes(s.id);
      const isPortalIdMatch = s.portal_id === portal.portal_id;
      const isNameMatch = s.officialPortal && s.officialPortal.toLowerCase().includes(portal.portal_name.toLowerCase());
      return isHosted || isPortalIdMatch || isNameMatch;
    });

    // Also include schemes from entityResolution.schemes if not already included
    const matchedIds = new Set(matched.map(s => s.id));
    entityResolution.schemes.forEach(s => {
      if (!matchedIds.has(s.id)) {
        if (hostedIds.includes(s.id) || s.portal_id === portal.portal_id) {
          matched.push(s);
          matchedIds.add(s.id);
        }
      }
    });

    return matched;
  }, [entityResolution?.resolvedPortal, entityResolution?.schemes, schemes]);

  // Reset to portal_showcase view when a new portal is identified
  useEffect(() => {
    if (entityResolution?.resolvedPortal) {
      setPortalViewMode('portal_showcase');
    }
  }, [entityResolution?.resolvedPortal?.portal_id]);

  const t = (key: string) => getTranslation(key, language);

  // Sync when initialSearchQuery changes from props
  useEffect(() => {
    if (initialSearchQuery !== undefined && initialSearchQuery !== searchQuery) {
      setSearchQuery(initialSearchQuery);
    }
  }, [initialSearchQuery]);

  // Sync selectedState when userProfile.state updates
  useEffect(() => {
    if (userProfileState) {
      setSelectedState(userProfileState);
    }
  }, [userProfile.state]);

  // Sync selectedState when query context provides a specific location intent
  useEffect(() => {
    if (extractedProfile.state) {
      setSelectedState(extractedProfile.state);
    }
  }, [extractedProfile.state]);

  const handleQueryChange = (val: string) => {
    setSearchQuery(val);
    setAiResult(null);
    setProfileAppliedMessage(null);
    if (onSearchQueryChange) onSearchQueryChange(val);
  };

  const hasExtractedProfile = Boolean(
    extractedProfile.age ||
    extractedProfile.state ||
    extractedProfile.annualIncome !== undefined ||
    extractedProfile.occupation ||
    extractedProfile.gender ||
    extractedProfile.socialCategory ||
    extractedProfile.speciallyAbled
  );

  const handleApplyExtractedProfile = () => {
    if (!onUpdateProfile) return;
    const updated: UserProfile = {
      ...userProfile,
      age: extractedProfile.age ?? userProfile.age,
      state: extractedProfile.state ?? userProfile.state,
      annualIncome: extractedProfile.annualIncome ?? userProfile.annualIncome,
      occupation: (extractedProfile.occupation as any) ?? userProfile.occupation,
      gender: (extractedProfile.gender as any) ?? userProfile.gender,
      socialCategory: (extractedProfile.socialCategory as any) ?? userProfile.socialCategory,
      speciallyAbled: extractedProfile.speciallyAbled ?? userProfile.speciallyAbled,
      educationLevel: (extractedProfile.educationLevel as any) ?? userProfile.educationLevel,
    };
    onUpdateProfile(updated);
    setProfileAppliedMessage('Profile updated! Live rule verdicts re-assessed across all catalog records.');
    setTimeout(() => setProfileAppliedMessage(null), 4000);
  };

  // Nationwide States & Union Territories
  const stateOptions = useMemo(() => {
    return ['All', 'All-India', ...ALL_INDIAN_STATES, ...ALL_UNION_TERRITORIES];
  }, []);

  // Voice speech-to-text
  const toggleVoiceSearch = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Please type your query.');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = language === 'Telugu' ? 'te-IN' : language === 'Hindi' ? 'hi-IN' : 'en-IN';
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        handleQueryChange(transcript);
      };

      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  // Trigger server Gemini AI identification
  const runAiIdentification = async () => {
    if (!searchQuery.trim()) return;
    setIsAiIdentifying(true);
    try {
      const res = await identifySchemesWithAi(searchQuery, schemes, language);
      if (res) {
        setAiResult(res);
      }
    } finally {
      setIsAiIdentifying(false);
    }
  };

  // Evaluate instant client-side intent matching
  const intentMatches = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return identifySchemesFromQuery(searchQuery, schemes);
  }, [searchQuery, schemes]);

  // Multilingual Intent & Entity Matching across 13 Indian languages
  const multilingualSearchResult = useMemo(() => {
    if (!searchQuery.trim()) return null;
    return executeMultilingualSearch(searchQuery, schemes, language);
  }, [searchQuery, schemes, language]);

  // Map of scheme ID to match reason and score
  const matchDetailsMap = useMemo(() => {
    const map: Record<string, { score: number; reason: string }> = {};

    // 1. Client-side intent matches
    intentMatches.forEach((match) => {
      map[match.scheme.id] = {
        score: match.matchScore,
        reason: match.matchReason,
      };
    });

    // 2. Multilingual Search Engine matches (13 Indian languages)
    if (multilingualSearchResult && multilingualSearchResult.matchedSchemes.length > 0) {
      multilingualSearchResult.matchedSchemes.forEach((s, idx) => {
        const expl = multilingualSearchResult.intentDescription || 'Matched multilingual citizen inquiry';
        map[s.id] = {
          score: Math.max(map[s.id]?.score || 0, 96 - idx),
          reason: map[s.id]?.reason ? `${map[s.id].reason} | ${expl}` : expl,
        };
      });
    }

    // 3. Deep AI result overrides/enhancements if available
    if (aiResult?.explanations) {
      Object.entries(aiResult.explanations).forEach(([sId, exp]) => {
        map[sId] = {
          score: (map[sId]?.score || 70) + 30,
          reason: String(exp),
        };
      });
    }

    // 4. Government Entity & Portal Resolution mappings
    if (entityResolution && entityResolution.schemes.length > 0) {
      entityResolution.schemes.forEach((s, idx) => {
        const portalText = entityResolution.resolvedPortal 
          ? `Hosted on official portal "${entityResolution.resolvedPortal.portal_name}" (${entityResolution.resolvedPortal.state}).`
          : (entityResolution.debugInfo?.aliasesMatched?.length 
              ? `Matched government alias: "${entityResolution.debugInfo.aliasesMatched.join(', ')}".`
              : 'Matched official government directory.');
        map[s.id] = {
          score: Math.max(map[s.id]?.score || 0, 98 - idx),
          reason: map[s.id]?.reason ? `${portalText} ${map[s.id].reason}` : portalText
        };
      });
    }

    return map;
  }, [intentMatches, multilingualSearchResult, aiResult, entityResolution]);

  // Natural Language & Attribute filtering using User Location Context as Primary Search Filter
  const filteredSchemes = useMemo(() => {
    const hasSearch = Boolean(searchQuery.trim());
    const matchedSchemeIds = new Set(Object.keys(matchDetailsMap));

    // Active primary location filter: explicit selection or profile location context
    const primaryLocationState = selectedState !== 'All' ? selectedState : userLocationState;

    return schemes.filter((scheme) => {
      // 0. Resolved Portal / Government Entity Direct Inclusion:
      // If user searched for a specific portal or verified entity (e.g., ePASS, SSP, MahaDBT),
      // schemes officially hosted or mapped to this entity are always included!
      if (portalAssociatedIds.has(scheme.id)) {
        return true;
      }

      // Record type filter
      if (selectedRecordType !== 'All') {
        const type = scheme.recordType || 'SCHEME';
        if (type !== selectedRecordType) return false;
      }

      // Category filter
      if (selectedCategory !== 'All' && scheme.category !== selectedCategory) {
        return false;
      }

      // 1. Government Level filter: checks both 'government_level' and 'governmentLevel' properties
      const govLevel = getNormalizedGovLevel(scheme);
      const isCentral = govLevel === 'CENTRAL' || (scheme.state || '').toLowerCase() === 'all-india' || scheme.governmentLevel === 'Central';
      const isState = govLevel === 'STATE' || scheme.governmentLevel === 'State';
      const isUT = govLevel === 'UT' || scheme.governmentLevel === 'Union Territory';
      const isDistrict = govLevel === 'DISTRICT' || scheme.governmentLevel === 'District/Local';

      if (selectedGovLevel !== 'All') {
        if (selectedGovLevel === 'Central' && !isCentral) return false;
        if (selectedGovLevel === 'State' && !isState) return false;
        if (selectedGovLevel === 'Union Territory' && !isUT) return false;
        if (selectedGovLevel === 'District/Local' && !isDistrict) return false;
      }

      // 2. Primary Search Filter: User Location Context from Profile & State selection
      if (selectedState !== 'All') {
        if (!isSchemeMatchingJurisdiction(scheme, selectedState)) {
          return false;
        }
      } else if (primaryLocationState) {
        // When selectedState is 'All', apply user location context from profile as primary search filter
        // (Central schemes apply nationwide; state schemes must match user's profile location)
        if (!isSchemeMatchingJurisdiction(scheme, primaryLocationState)) {
          return false;
        }
      }

      // 3. Eligibility status filter
      if (eligibilityFilter !== 'All') {
        const evalResult = evaluations[scheme.id];
        if (eligibilityFilter === 'Likely' && evalResult?.verdict !== 'LIKELY_ELIGIBLE') {
          return false;
        }
        if (eligibilityFilter === 'Possible' && evalResult?.verdict !== 'POSSIBLY_ELIGIBLE' && evalResult?.verdict !== 'LIKELY_ELIGIBLE') {
          return false;
        }
      }

      // 4. Search Filter: Direct text or semantic intent match
      if (hasSearch) {
        if (matchedSchemeIds.has(scheme.id)) {
          return true;
        }

        const query = searchQuery.toLowerCase().trim();
        const trans = SCHEME_TRANSLATIONS[scheme.id];
        const transText = trans ? Object.values(trans).map(t => `${t?.name || ''} ${t?.plainSummary || ''} ${t?.mainBenefit || ''}`).join(' ') : '';
        const fullSearchString = `
          ${scheme.name} 
          ${(scheme.aliases || []).join(' ')}
          ${(scheme.keywords || []).join(' ')}
          ${scheme.nativeNames?.hindi || ''} 
          ${scheme.nativeNames?.telugu || ''} 
          ${scheme.nativeNames?.tamil || ''} 
          ${scheme.nativeNames?.kannada || ''} 
          ${scheme.nativeNames?.bengali || ''} 
          ${scheme.nativeNames?.marathi || ''} 
          ${transText}
          ${scheme.shortDescription} 
          ${scheme.mainBenefit} 
          ${scheme.department} 
          ${scheme.ministry || ''}
          ${scheme.category}
          ${scheme.state}
          ${scheme.unionTerritory || ''}
          ${scheme.government_level || ''}
          ${scheme.governmentLevel || ''}
          ${scheme.recordType || ''}
          ${scheme.officialPortal || ''}
          ${scheme.plainSummary}
        `.toLowerCase();

        // Direct containment
        if (fullSearchString.includes(query)) return true;

        return false;
      }

      return true;
    });
  }, [schemes, selectedRecordType, selectedCategory, selectedGovLevel, selectedState, userLocationState, eligibilityFilter, searchQuery, matchDetailsMap]);

  // Active jurisdiction detection for state-level transparency & ranking
  const activeStateName = selectedState !== 'All'
    ? selectedState
    : (userLocationState || null);

  // Transparent calculation: "Verified records currently available: X"
  const stateVerifiedCount = useMemo(() => {
    if (!activeStateName || activeStateName === 'All-India') return null;
    return schemes.filter((s) => {
      const isVerified = s.verification_status === 'VERIFIED' || s.verificationStatus === 'Verified' || s.isOfficialSourceVerified;
      const matchesState = (s.state && s.state.toLowerCase() === activeStateName.toLowerCase()) ||
                           (s.unionTerritory && s.unionTerritory.toLowerCase() === activeStateName.toLowerCase()) ||
                           (s.eligibilityRules.states && s.eligibilityRules.states.some(st => st.toLowerCase() === activeStateName.toLowerCase()));
      return isVerified && matchesState;
    }).length;
  }, [schemes, activeStateName]);

  // Sort schemes according to mandatory Nationwide Ranking Priority:
  // Prioritizes results based on 'government_level' and 'state' properties, honoring user location context
  const sortedSchemes = useMemo(() => {
    const cleanQuery = searchQuery.toLowerCase().trim();
    const effectiveDistrict = (userLocationDistrict || '').toLowerCase().trim();
    const targetStateLower = (activeStateName || '').toLowerCase().trim();

    const getSchemePriorityScore = (scheme: Scheme): number => {
      let score = 0;
      const govLevel = getNormalizedGovLevel(scheme);
      const isCentral = govLevel === 'CENTRAL' || (scheme.state || '').toLowerCase() === 'all-india' || scheme.governmentLevel === 'Central';
      const isState = govLevel === 'STATE' || scheme.governmentLevel === 'State';
      const isUT = govLevel === 'UT' || scheme.governmentLevel === 'Union Territory';
      const isDistrict = govLevel === 'DISTRICT' || scheme.governmentLevel === 'District/Local';
      const isDocOrService = scheme.recordType === 'SERVICE' || scheme.recordType === 'DOCUMENT' || scheme.recordType === 'CERTIFICATE' || scheme.recordType === 'LICENSE';

      const schemeStateLower = (scheme.state || '').toLowerCase().trim();
      const schemeUTLower = (scheme.unionTerritory || '').toLowerCase().trim();

      const exactStateMatch = targetStateLower && (schemeStateLower === targetStateLower || schemeUTLower === targetStateLower);
      const multiStateMatch = targetStateLower && scheme.eligibilityRules?.states && scheme.eligibilityRules.states.some(s => s.toLowerCase().trim() === targetStateLower);
      const stateMatches = Boolean(exactStateMatch || multiStateMatch);

      const districtMatches = effectiveDistrict && scheme.district && scheme.district.toLowerCase().trim() === effectiveDistrict;

      // 0. Explicit Portal or Entity Association Top Priority
      if (portalAssociatedIds.has(scheme.id)) {
        score += 150000;
      }

      // 1. Hyper-local District/Local scheme matching user's profile district
      if (districtMatches && (isDistrict || isState)) {
        score += 80000;
      }

      // 2. State-specific or UT-specific verified scheme matching user's profile location
      if ((isState || isUT) && stateMatches) {
        score += 65000;
      }

      // 3. Central Government scheme (available to user nationwide)
      if (isCentral) {
        score += 45000;
      }

      // 4. Non-matching other state schemes (deprioritized during nationwide browsing)
      if ((isState || isUT) && !stateMatches && targetStateLower) {
        score -= 25000;
      }

      // 5. Exact query match on scheme title, aliases, or identifiers
      if (cleanQuery.length > 2) {
        const nameLower = scheme.name.toLowerCase();
        const schemeNameLower = (scheme.scheme_name || '').toLowerCase();
        const aliases = scheme.aliases || [];
        const isExactMatch = nameLower.includes(cleanQuery) || schemeNameLower.includes(cleanQuery) || aliases.some(a => a.toLowerCase().includes(cleanQuery));
        if (isExactMatch) {
          score += 40000;
        }
      }

      // 6. AI Intent match boost from semantic matcher
      const intentScore = matchDetailsMap[scheme.id]?.score || 0;
      score += intentScore * 100;

      // 7. Official Source Verification boost
      const isVerified = scheme.verification_status === 'VERIFIED' || scheme.verificationStatus === 'Verified' || scheme.isOfficialSourceVerified;
      if (isVerified) {
        score += 15000;
      }

      // 8. Welfare program preference over standalone service/license
      if (!isDocOrService) {
        score += 8000;
      } else {
        score += 2000;
      }

      // 9. Live rule evaluation score & verdict boost
      const evalResult = evaluations[scheme.id];
      if (evalResult) {
        if (evalResult.verdict === 'LIKELY_ELIGIBLE') {
          score += 10000;
        } else if (evalResult.verdict === 'POSSIBLY_ELIGIBLE') {
          score += 5000;
        }
        score += (evalResult.aiMatchScore || 50);
      }

      return score;
    };

    return [...filteredSchemes].sort((a, b) => {
      const scoreA = getSchemePriorityScore(a);
      const scoreB = getSchemePriorityScore(b);
      return scoreB - scoreA;
    });
  }, [filteredSchemes, matchDetailsMap, evaluations, activeStateName, userLocationDistrict, searchQuery, portalAssociatedIds]);

  const resetFilters = () => {
    handleQueryChange('');
    setSelectedState(userProfileState || 'All');
    setSelectedGovLevel('All');
    setSelectedRecordType('All');
    setEligibilityFilter('All');
    onSelectCategory('All');
    setAiResult(null);
    setProfileAppliedMessage(null);
  };

  const sampleSearchQueries = [
    { label: 'Telangana ePASS', query: 'Telangana ePASS' },
    { label: 'ePASS Scholarships', query: 'ePASS' },
    { label: 'Karnataka SSP', query: 'SSP' },
    { label: 'MahaDBT (MH)', query: 'MahaDBT' },
    { label: 'AP Jnanabhumi', query: 'Jnanabhumi' },
    { label: 'WB OASIS', query: 'OASIS' },
    { label: 'Kerala DCE', query: 'DCE Kerala' },
    { label: 'NSP Central', query: 'NSP' },
    { label: 'Voter ID Online', query: 'Voter ID card registration Form 6 NVSP' },
    { label: 'Instant e-PAN Card', query: 'Instant e-PAN card online using Aadhaar' },
    { label: 'Driving Licence', query: 'Apply for learner and driving licence Sarathi Parivahan' },
    { label: 'Income Certificate', query: 'Income and asset certificate for scholarship or EWS' },
    { label: 'Majhi Ladki Bahin', query: 'Mukhyamantri Majhi Ladki Bahin Yojana 1500 monthly' },
    { label: 'Gruha Lakshmi ₹2000', query: 'Gruha Lakshmi scheme monthly aid for woman head of family' },
    { label: 'Ayushman Bharat Card', query: 'Ayushman Bharat free hospital operation PMJAY 5 lakh' },
    { label: 'PMAY Pucca House', query: 'Pradhan Mantri Awas Yojana financial aid for house' },
    { label: 'Small Business Loan', query: 'Loan for small grocery store or MSME business Mudra' },
    { label: 'Kisan Tractor Subsidy', query: 'Kisan tractor and farm equipment subsidy PM Kisan' },
  ];


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Editorial Page Header */}
      <div className="mb-8">
        <span className="text-[11px] font-mono uppercase tracking-widest text-[#155C45] font-bold block mb-2">
          Official Government Catalog
        </span>
        <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#08110D] tracking-tight font-bold">
          Explore government schemes.
        </h1>
        <p className="text-sm sm:text-base text-[#545B56] mt-2 max-w-2xl font-light">
          Browse verified welfare schemes, educational scholarships, healthcare support, and public services across India.
        </p>
      </div>

      {/* Primary Search & Natural Language Intent Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs mb-8">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-teal-600 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleQueryChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  runAiIdentification();
                }
              }}
              placeholder={t('searchPlaceholder')}
              className="w-full pl-12 pr-20 py-3.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:outline-hidden text-sm sm:text-base text-slate-900 placeholder:text-slate-400 bg-slate-50/50 focus:bg-white transition"
            />
            
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => handleQueryChange('')}
                  className="px-2 py-1 text-xs text-slate-400 hover:text-slate-700 font-semibold cursor-pointer"
                >
                  Clear
                </button>
              )}
              <button
                type="button"
                onClick={toggleVoiceSearch}
                title="Speak what you need"
                className={`p-1.5 rounded-lg text-slate-500 hover:text-teal-700 transition cursor-pointer ${isListening ? 'bg-red-100 text-red-600 animate-pulse' : ''}`}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Search Diagnostics Toggle Button */}
          <button
            type="button"
            onClick={() => setShowSearchDebug(!showSearchDebug)}
            title="View Search Diagnostics & Resolution Pipeline"
            className={`px-3 py-3.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer shrink-0 ${
              showSearchDebug 
                ? 'bg-slate-900 text-teal-300 border-slate-900' 
                : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300'
            }`}
          >
            <Terminal className="w-4 h-4 text-teal-600" />
            <span className="hidden sm:inline">Diagnostics</span>
          </button>

          {/* AI Deep Match Button */}
          {searchQuery.trim() && (
            <button
              onClick={runAiIdentification}
              disabled={isAiIdentifying}
              className="px-4 py-3.5 rounded-xl bg-teal-700 hover:bg-teal-800 disabled:bg-teal-400 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition cursor-pointer shrink-0 shadow-xs"
            >
              {isAiIdentifying ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-teal-200" />
                  <span>Analyzing Need...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-teal-200" />
                  <span>AI Match Reason</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Quick natural query suggestions */}
        <div className="mt-3 pt-3 border-t border-slate-100">
          <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-teal-600" />
            <span>Try searching portals or citizen services:</span>
          </p>
          <div className="flex flex-wrap items-center gap-1.5">
            {sampleSearchQueries.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleQueryChange(item.query)}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-teal-50 text-slate-700 hover:text-teal-900 border border-slate-200 hover:border-teal-300 text-xs font-medium cursor-pointer transition"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Official Government Portal Identification Banner */}
        {entityResolution?.resolvedPortal && (
          <div className="mt-4 p-4 rounded-xl bg-teal-50/90 border border-teal-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-teal-700 text-white shrink-0 mt-0.5 shadow-2xs">
                <Landmark className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-teal-200 text-teal-950">
                    Official Government Portal Identified
                  </span>
                  <span className="text-xs font-bold text-slate-700">
                    Jurisdiction: {entityResolution.resolvedPortal.state}
                  </span>
                  <span className="text-xs text-slate-500">
                    Type: {entityResolution.resolvedPortal.portal_type.replace('_', ' ')}
                  </span>
                </div>
                <h4 className="text-sm sm:text-base font-bold text-teal-950 mt-1">
                  {entityResolution.resolvedPortal.portal_name}
                </h4>
                <p className="text-xs text-teal-900 mt-0.5 leading-relaxed">
                  {entityResolution.explanation}
                </p>
                <div className="mt-2 flex items-center gap-4 text-xs text-slate-600 flex-wrap">
                  <span className="font-semibold text-slate-700">
                    Department: {entityResolution.resolvedPortal.department}
                  </span>
                  <a
                    href={entityResolution.resolvedPortal.official_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-700 hover:text-teal-900 font-bold inline-flex items-center gap-1 underline"
                  >
                    <span>Visit Official Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
            <div className="flex sm:flex-col items-end gap-2 shrink-0 self-stretch sm:self-center justify-between sm:justify-center border-t sm:border-t-0 pt-2 sm:pt-0 border-teal-200">
              <div className="text-right">
                <span className="text-xs text-slate-500 block">Programs Hosted</span>
                <span className="text-sm font-black text-teal-900">
                  {entityResolution.schemes.length} verified programs
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowSearchDebug(!showSearchDebug)}
                className="text-xs text-teal-800 hover:text-teal-950 font-bold underline flex items-center gap-1 cursor-pointer"
              >
                <span>{showSearchDebug ? 'Hide Pipeline' : 'View Pipeline'}</span>
                {showSearchDebug ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        )}

        {/* Search Diagnostics & Entity Resolution Debug Panel */}
        {showSearchDebug && (
          <div className="mt-4 p-4 rounded-xl bg-slate-900 text-slate-100 text-xs shadow-md border border-slate-800 font-mono">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-700">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-teal-400" />
                <span className="font-bold text-teal-400 uppercase tracking-wider text-[11px]">
                  Government Scheme Discovery & Entity Resolution Diagnostics
                </span>
              </div>
              <button
                onClick={() => setShowSearchDebug(false)}
                className="text-slate-400 hover:text-white text-[11px] cursor-pointer"
              >
                Close [✕]
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-3 text-[11px]">
              <div className="bg-slate-800/80 p-2.5 rounded">
                <span className="text-slate-400 block text-[10px]">ORIGINAL QUERY</span>
                <span className="font-bold text-white truncate block">
                  "{entityResolution?.debugInfo?.originalQuery || searchQuery || 'N/A'}"
                </span>
              </div>
              <div className="bg-slate-800/80 p-2.5 rounded">
                <span className="text-slate-400 block text-[10px]">NORMALIZED QUERY</span>
                <span className="font-bold text-teal-300 truncate block">
                  "{entityResolution?.debugInfo?.normalizedQuery || 'N/A'}"
                </span>
              </div>
              <div className="bg-slate-800/80 p-2.5 rounded">
                <span className="text-slate-400 block text-[10px]">DETECTED JURISDICTION</span>
                <span className="font-bold text-amber-300 block">
                  {entityResolution?.debugInfo?.detectedState || (userLocationState ? `${userLocationState} (Profile)` : 'All-India / Nationwide')}
                </span>
              </div>
              <div className="bg-slate-800/80 p-2.5 rounded">
                <span className="text-slate-400 block text-[10px]">RESOLVED ENTITY TYPE</span>
                <span className="font-bold text-emerald-300 block">
                  {entityResolution?.debugInfo?.detectedEntity || 'GENERAL_SEARCH'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3 text-[11px]">
              <div className="bg-slate-800/80 p-2.5 rounded">
                <span className="text-slate-400 block text-[10px]">RESOLVED GOVERNMENT PORTAL</span>
                <span className="font-bold text-white block truncate">
                  {entityResolution?.debugInfo?.portalName || (entityResolution?.debugInfo?.resolvedPortal ? entityResolution.debugInfo.resolvedPortal : 'None')}
                </span>
              </div>
              <div className="bg-slate-800/80 p-2.5 rounded">
                <span className="text-slate-400 block text-[10px]">ALIASES & ACRONYMS MATCHED</span>
                <span className="font-bold text-cyan-300 block truncate">
                  {entityResolution?.debugInfo?.aliasesMatched?.length 
                    ? entityResolution.debugInfo.aliasesMatched.join(', ')
                    : 'Direct catalog match'}
                </span>
              </div>
              <div className="bg-slate-800/80 p-2.5 rounded">
                <span className="text-slate-400 block text-[10px]">PROGRAMS RETRIEVED</span>
                <span className="font-bold text-white block">
                  {entityResolution?.debugInfo?.programsFound ?? filteredSchemes.length} programs ({entityResolution?.debugInfo?.verifiedResults ?? filteredSchemes.length} verified)
                </span>
              </div>
            </div>

            {entityResolution?.debugInfo?.pipelineSteps && entityResolution.debugInfo.pipelineSteps.length > 0 && (
              <div className="bg-slate-950/80 p-3 rounded border border-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">
                  Resolution Pipeline Execution Trace:
                </span>
                <ol className="list-decimal list-inside space-y-1 text-[11px] text-slate-300">
                  {entityResolution.debugInfo.pipelineSteps.map((step, sIdx) => (
                    <li key={sIdx}>
                      <span className="text-slate-200">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        )}

        {/* AI Intent Result Banner */}
        {aiResult && (
          <div className="mt-4 p-4 rounded-xl bg-teal-50/90 border border-teal-200/80 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
            <div className="text-xs text-teal-950">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-extrabold text-sm text-teal-900">
                  AI Identified Need: {aiResult.identifiedGoal}
                </span>
                {aiResult.recommendedCategory && aiResult.recommendedCategory !== 'All' && (
                  <span className="px-2 py-0.5 rounded-full bg-teal-200 text-teal-900 text-[10px] font-bold">
                    Category: {aiResult.recommendedCategory}
                  </span>
                )}
              </div>
              {aiResult.searchTip && (
                <p className="mt-1 text-teal-800 font-medium">
                  Tip: {aiResult.searchTip}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Natural Language Extracted Profile Banner */}
        {hasExtractedProfile && (
          <div className="mt-4 p-4 rounded-xl bg-linear-to-r from-amber-50 to-orange-50 border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
            <div>
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-amber-700 shrink-0" />
                <span className="text-xs font-black uppercase tracking-wider text-amber-900">
                  Profile Detected in Search Prompt
                </span>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap mt-2">
                {extractedProfile.age && (
                  <span className="px-2 py-0.5 rounded-md bg-white border border-amber-300 text-amber-900 text-xs font-bold">
                    Age: {extractedProfile.age}
                  </span>
                )}
                {extractedProfile.state && (
                  <span className="px-2 py-0.5 rounded-md bg-white border border-amber-300 text-amber-900 text-xs font-bold">
                    State: {extractedProfile.state}
                  </span>
                )}
                {extractedProfile.occupation && (
                  <span className="px-2 py-0.5 rounded-md bg-white border border-amber-300 text-amber-900 text-xs font-bold">
                    Role: {extractedProfile.occupation}
                  </span>
                )}
                {extractedProfile.annualIncome !== undefined && (
                  <span className="px-2 py-0.5 rounded-md bg-white border border-amber-300 text-amber-900 text-xs font-bold">
                    Income: ₹{(extractedProfile.annualIncome / 100000).toFixed(1)} Lakh
                  </span>
                )}
                {extractedProfile.gender && (
                  <span className="px-2 py-0.5 rounded-md bg-white border border-amber-300 text-amber-900 text-xs font-bold">
                    {extractedProfile.gender}
                  </span>
                )}
                {extractedProfile.socialCategory && (
                  <span className="px-2 py-0.5 rounded-md bg-white border border-amber-300 text-amber-900 text-xs font-bold">
                    Category: {extractedProfile.socialCategory}
                  </span>
                )}
                {extractedProfile.speciallyAbled && (
                  <span className="px-2 py-0.5 rounded-md bg-white border border-amber-300 text-amber-900 text-xs font-bold">
                    PwD / Divyangjan
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={handleApplyExtractedProfile}
              className="px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs transition cursor-pointer shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              <span>Apply to Profile & Check All Rules</span>
            </button>
          </div>
        )}

        {/* Profile applied success message */}
        {profileAppliedMessage && (
          <div className="mt-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{profileAppliedMessage}</span>
          </div>
        )}

        {/* Active Query Match Count & Reset */}
        {searchQuery.trim() && (
          <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-800">
                Found {sortedSchemes.length} records matching:
              </span>
              <span className="px-2 py-0.5 rounded-md bg-teal-100 text-teal-900 font-extrabold truncate max-w-xs">
                "{searchQuery}"
              </span>
            </div>
            <button
              onClick={() => handleQueryChange('')}
              className="text-xs text-slate-500 hover:text-slate-800 font-semibold cursor-pointer underline"
            >
              Clear search
            </button>
          </div>
        )}

        {/* Compact, Modern Filter Bar */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2.5">
            {/* State filter */}
            <div className="flex items-center gap-1.5 bg-[#FAF9F5] px-2.5 py-1.5 rounded-xl border border-[#EAE6DB]">
              <MapPin className="w-3.5 h-3.5 text-[#155C45]" />
              <span className="font-semibold text-stone-700">State:</span>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="bg-transparent text-xs text-stone-900 font-medium focus:outline-hidden cursor-pointer max-w-44 truncate"
              >
                <option value="All">{userLocationState ? 'All States (Nationwide)' : 'All States'}</option>
                <option value="All-India">Central Schemes Only</option>
                {userLocationState && (
                  <option value={userLocationState}>📍 {userLocationState} (My Profile)</option>
                )}
                {ALL_INDIAN_STATES.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}{opt === userLocationState ? ' (Profile)' : ''}
                  </option>
                ))}
                {ALL_UNION_TERRITORIES.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}{opt === userLocationState ? ' (Profile)' : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Dropdown Filter */}
            <div className="flex items-center gap-1.5 bg-[#FAF9F5] px-2.5 py-1.5 rounded-xl border border-[#EAE6DB]">
              <span className="font-semibold text-stone-700">Category:</span>
              <select
                value={selectedCategory}
                onChange={(e) => onSelectCategory(e.target.value as SchemeCategory)}
                className="bg-transparent text-xs text-stone-900 font-medium focus:outline-hidden cursor-pointer max-w-40 truncate"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === 'All' ? 'All Categories' : getLocalizedCategory(cat, language).name || cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Government Level filter */}
            <div className="flex items-center gap-1.5 bg-[#FAF9F5] px-2.5 py-1.5 rounded-xl border border-[#EAE6DB]">
              <Layers className="w-3.5 h-3.5 text-[#155C45]" />
              <span className="font-semibold text-stone-700">Tier:</span>
              <select
                value={selectedGovLevel}
                onChange={(e) => setSelectedGovLevel(e.target.value)}
                className="bg-transparent text-xs text-stone-900 font-medium focus:outline-hidden cursor-pointer"
              >
                <option value="All">All Tiers</option>
                <option value="Central">Central Govt</option>
                <option value="State">State Govt</option>
                <option value="Union Territory">Union Territory</option>
              </select>
            </div>

            {/* Eligibility quick filter */}
            <div className="flex items-center gap-1.5 bg-[#FAF9F5] px-2.5 py-1.5 rounded-xl border border-[#EAE6DB]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#155C45]" />
              <span className="font-semibold text-stone-700">Eligibility:</span>
              <select
                value={eligibilityFilter}
                onChange={(e) => setEligibilityFilter(e.target.value as any)}
                className="bg-transparent text-xs text-stone-900 font-medium focus:outline-hidden cursor-pointer"
              >
                <option value="All">All Records</option>
                <option value="Likely">Likely Eligible Only</option>
                <option value="Possible">Review Conditions</option>
              </select>
            </div>

            {/* Record Type Dropdown Filter */}
            <div className="flex items-center gap-1.5 bg-[#FAF9F5] px-2.5 py-1.5 rounded-xl border border-[#EAE6DB]">
              <span className="font-semibold text-stone-700">Type:</span>
              <select
                value={selectedRecordType}
                onChange={(e) => setSelectedRecordType(e.target.value)}
                className="bg-transparent text-xs text-stone-900 font-medium focus:outline-hidden cursor-pointer"
              >
                <option value="All">All Types</option>
                <option value="SCHEME">Public Schemes</option>
                <option value="SERVICE">Citizen Services</option>
                <option value="DOCUMENT">Documents & IDs</option>
                <option value="CERTIFICATE">Certificates</option>
                <option value="REGISTRATION">Registrations</option>
                <option value="LICENSE">Licences</option>
              </select>
            </div>
          </div>

          <button
            onClick={resetFilters}
            className="flex items-center gap-1.5 text-xs text-[#6C746E] hover:text-[#08110D] font-medium cursor-pointer transition px-2.5 py-1.5 rounded-lg hover:bg-slate-100"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        </div>
      </div>

      {/* Quick Curated Domain Tabs */}
      <div className="mb-8 overflow-x-auto pb-1">
        <div className="flex items-center gap-1.5">
          {['All', 'Education', 'Agriculture', 'Healthcare', 'Employment', 'Housing', 'Women', 'Students', 'Business', 'Senior Citizens'].map((catName) => {
            const isSelected = selectedCategory === catName;
            return (
              <button
                key={catName}
                onClick={() => onSelectCategory(catName as SchemeCategory)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#155C45] text-white shadow-xs'
                    : 'bg-white hover:bg-[#FAF9F5] text-[#545B56] border border-[#EAE6DB]'
                }`}
              >
                {catName === 'All' ? 'All Schemes' : catName}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Section */}
      {entityResolution?.resolvedPortal && portalViewMode === 'portal_showcase' ? (
        <div id="government-portal-showcase-container" className="mb-8">
          {/* Top Bar with Switcher */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
                <span>Official Government Portal</span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-100 text-teal-900 border border-teal-200">
                  {portalRelatedSchemes.length} Administered Programs
                </span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Displaying the identified portal gateway and all officially hosted public programs
              </p>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setPortalViewMode('portal_showcase')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                  portalViewMode === 'portal_showcase'
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Landmark className="w-3.5 h-3.5" />
                <span>Portal & Programs ({portalRelatedSchemes.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setPortalViewMode('grid')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                  portalViewMode === 'grid'
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>All Results Grid ({sortedSchemes.length})</span>
              </button>
            </div>
          </div>

          {/* Identified Government Portal Primary Showcase Card */}
          <div 
            id="government-portal-card" 
            className="bg-white rounded-2xl border-2 border-teal-700 shadow-md overflow-hidden"
          >
            {/* Authority Header Section */}
            <div className="bg-gradient-to-r from-teal-950 via-teal-900 to-slate-900 text-white p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2 flex-wrap">
                  {/* Government Portal Badge */}
                  <span 
                    id="government-portal-badge"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-teal-400 text-teal-950 border border-teal-300 shadow-xs"
                  >
                    <Landmark className="w-3.5 h-3.5 text-teal-950" />
                    Government Portal
                  </span>

                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-white border border-white/20">
                    State: {entityResolution.resolvedPortal.state}
                  </span>

                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-teal-100 border border-white/20">
                    {entityResolution.resolvedPortal.portal_type.replace(/_/g, ' ')}
                  </span>

                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                    Verified Public Authority
                  </span>
                </div>

                <a
                  href={entityResolution.resolvedPortal.official_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-teal-950 font-black text-xs sm:text-sm inline-flex items-center gap-2 shadow-xs transition cursor-pointer shrink-0"
                >
                  <span>Visit Official Portal</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight">
                {entityResolution.resolvedPortal.portal_name}
              </h2>

              <p className="text-xs sm:text-sm text-teal-200 font-semibold mt-1 flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-teal-300 shrink-0" />
                <span>{entityResolution.resolvedPortal.department}</span>
              </p>

              <p className="text-xs sm:text-sm text-slate-200 mt-3 max-w-4xl leading-relaxed">
                {entityResolution.resolvedPortal.description || entityResolution.explanation}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-teal-200 pt-4 border-t border-teal-800/80">
                {entityResolution.resolvedPortal.helpline && (
                  <span className="bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/10">
                    Toll-Free Helpline: <strong className="text-white ml-1">{entityResolution.resolvedPortal.helpline}</strong>
                  </span>
                )}
                {entityResolution.resolvedPortal.nodal_agency && (
                  <span className="bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/10">
                    Nodal Agency: <strong className="text-white ml-1">{entityResolution.resolvedPortal.nodal_agency}</strong>
                  </span>
                )}
                <span>Last Audited: {entityResolution.resolvedPortal.last_audited}</span>
                <span className="text-teal-400 font-bold ml-auto flex items-center gap-1">
                  Official Gateway URL: <code className="text-white font-mono text-[11px] underline">{entityResolution.resolvedPortal.official_url}</code>
                </span>
              </div>
            </div>

            {/* List of Programs Hosted Under this Portal */}
            <div id="portal-related-programs-section" className="p-6 sm:p-8 bg-slate-50/60">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
                <div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
                    <span>Programs & Welfare Schemes Administered on this Portal</span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-teal-100 text-teal-900 border border-teal-200">
                      {portalRelatedSchemes.length} Verified Programs
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Applications, eligibility verifications, and financial benefits for these schemes are processed directly via {entityResolution.resolvedPortal.portal_name}.
                  </p>
                </div>
              </div>

              {/* List of Program Items */}
              {portalRelatedSchemes.length > 0 ? (
                <div id="portal-related-programs-list" className="space-y-4">
                  {portalRelatedSchemes.map((scheme) => {
                    const evalResult = evaluations[scheme.id];
                    const isSaved = savedIds.includes(scheme.id);
                    const isCompared = comparedIds.includes(scheme.id);

                    return (
                      <div
                        key={scheme.id}
                        id={`portal-program-card-${scheme.id}`}
                        className="bg-white rounded-2xl border border-slate-200 hover:border-teal-400 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all duration-200"
                      >
                        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                          {/* Main Information */}
                          <div className="flex-1">
                            {/* Badges row */}
                            <div className="flex items-center gap-2 flex-wrap mb-2">
                              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-teal-50 text-teal-800 border border-teal-200">
                                {scheme.category}
                              </span>
                              <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-slate-100 text-slate-700">
                                {scheme.governmentLevel} • {scheme.state || 'All-India'}
                              </span>
                              {scheme.isOfficialSourceVerified && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                                  <span>Verified</span>
                                </span>
                              )}
                              {scheme.applicationStatus && (
                                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                                  Status: {scheme.applicationStatus}
                                </span>
                              )}
                            </div>

                            {/* Title */}
                            <h4 
                              onClick={() => onViewDetails(scheme)}
                              className="text-base sm:text-lg font-bold text-slate-900 hover:text-teal-700 transition cursor-pointer"
                            >
                              {scheme.name}
                            </h4>

                            {scheme.targetBeneficiary && (
                              <p className="text-xs text-slate-600 font-medium mt-1">
                                <strong className="text-slate-700">Beneficiary:</strong> {scheme.targetBeneficiary}
                              </p>
                            )}

                            {/* Benefit Highlight Box */}
                            <div className="mt-3 p-3 rounded-xl bg-teal-50/80 border border-teal-100 flex items-start justify-between gap-3">
                              <div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800">
                                  Official Welfare Benefit
                                </span>
                                <p className="text-xs sm:text-sm font-black text-teal-950 mt-0.5">
                                  {scheme.mainBenefit}
                                </p>
                              </div>
                              <span className="px-2.5 py-1 text-[10px] font-bold rounded-lg bg-white text-teal-800 border border-teal-200 shrink-0">
                                {scheme.benefitType}
                              </span>
                            </div>

                            {/* User Profile Evaluation verdict if present */}
                            {evalResult && (
                              <div className="mt-2.5 flex items-center gap-2 text-xs">
                                {evalResult.verdict === 'LIKELY_ELIGIBLE' && (
                                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                    <span>Likely Eligible ({evalResult.matchScore}%)</span>
                                  </span>
                                )}
                                {evalResult.verdict === 'POSSIBLY_ELIGIBLE' && (
                                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 font-bold">
                                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                                    <span>Review Conditions ({evalResult.matchScore}%)</span>
                                  </span>
                                )}
                                {evalResult.verdict === 'LIKELY_NOT_ELIGIBLE' && (
                                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-50 text-rose-800 border border-rose-200 font-bold">
                                    <XCircle className="w-3.5 h-3.5 text-rose-600" />
                                    <span>Not Eligible Based on Profile</span>
                                  </span>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Action Buttons Column */}
                          <div className="flex flex-row lg:flex-col items-center lg:items-stretch gap-2 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                            <button
                              type="button"
                              onClick={() => onViewDetails(scheme)}
                              className="flex-1 lg:flex-none px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-bold text-center transition cursor-pointer"
                            >
                              View Details
                            </button>

                            <button
                              type="button"
                              onClick={() => onCheckEligibility(scheme)}
                              className="flex-1 lg:flex-none px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold text-center transition cursor-pointer shadow-xs"
                            >
                              Check Eligibility
                            </button>

                            <a
                              href={scheme.officialUrl || entityResolution.resolvedPortal.official_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-2 rounded-xl border border-teal-200 bg-teal-50 hover:bg-teal-100 text-teal-800 text-xs font-bold text-center inline-flex items-center justify-center gap-1 transition cursor-pointer"
                            >
                              <span>Apply on Portal</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>

                            <div className="flex items-center gap-1.5 justify-center mt-1">
                              <button
                                type="button"
                                onClick={() => onToggleSave(scheme)}
                                className={`p-2 rounded-lg border text-xs font-semibold transition cursor-pointer flex items-center gap-1 ${
                                  isSaved
                                    ? 'bg-amber-50 text-amber-800 border-amber-300'
                                    : 'bg-white text-slate-500 hover:text-slate-800 border-slate-200'
                                }`}
                                title={isSaved ? 'Saved to My Schemes' : 'Save Scheme'}
                              >
                                {isSaved ? (
                                  <BookmarkCheck className="w-3.5 h-3.5 text-amber-600" />
                                ) : (
                                  <Bookmark className="w-3.5 h-3.5" />
                                )}
                                <span className="text-[11px]">{isSaved ? 'Saved' : 'Save'}</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => onToggleCompare(scheme)}
                                className={`p-2 rounded-lg border text-xs font-semibold transition cursor-pointer flex items-center gap-1 ${
                                  isCompared
                                    ? 'bg-teal-50 text-teal-800 border-teal-300'
                                    : 'bg-white text-slate-500 hover:text-slate-800 border-slate-200'
                                }`}
                                title={isCompared ? 'Comparing' : 'Compare'}
                              >
                                <Scale className="w-3.5 h-3.5" />
                                <span className="text-[11px]">{isCompared ? 'Added' : 'Compare'}</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
                  <p className="text-sm font-semibold text-slate-700">No specific program records currently mapped to this portal.</p>
                  <a
                    href={entityResolution.resolvedPortal.official_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-teal-700 hover:underline"
                  >
                    <span>Visit {entityResolution.resolvedPortal.portal_name} Directly</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}

              {/* Notice to explore other general matching welfare schemes */}
              {sortedSchemes.length > portalRelatedSchemes.length && (
                <div className="mt-6 p-4 rounded-xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="font-bold text-slate-800 block sm:inline">
                      Looking for more?
                    </span>
                    <span className="text-slate-500 ml-0 sm:ml-1">
                      {sortedSchemes.length - portalRelatedSchemes.length} other nationwide welfare programs also matched your search criteria.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPortalViewMode('grid')}
                    className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold transition cursor-pointer whitespace-nowrap"
                  >
                    View All {sortedSchemes.length} Results in Grid
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Results Header for Standard Grid */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                {selectedCategory === 'All' ? t('allVerifiedSchemes') : `${selectedCategory}`}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {t('showingSchemesMatching').replace('{count}', sortedSchemes.length.toString())}
              </p>
            </div>

            {entityResolution?.resolvedPortal && (
              <button
                type="button"
                onClick={() => setPortalViewMode('portal_showcase')}
                className="px-3 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-300 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer self-start sm:self-auto"
              >
                <Landmark className="w-3.5 h-3.5 text-teal-700" />
                <span>Switch to Government Portal View ({portalRelatedSchemes.length} Programs)</span>
              </button>
            )}
          </div>

          {/* Scheme Cards Grid */}
          {sortedSchemes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedSchemes.map((scheme, index) => (
                <SchemeCard
                  key={`${scheme.id}-${scheme.recordId || index}`}
                  scheme={scheme}
                  evaluation={evaluations[scheme.id]}
                  language={language}
                  onViewDetails={onViewDetails}
                  onCheckEligibility={onCheckEligibility}
                  onToggleCompare={onToggleCompare}
                  isCompared={comparedIds.includes(scheme.id)}
                  onToggleSave={onToggleSave}
                  isSaved={savedIds.includes(scheme.id)}
                  matchReason={matchDetailsMap[scheme.id]?.reason}
                  isFeatured={index === 0 && (scheme.isOfficialSourceVerified || (evaluations[scheme.id]?.aiMatchScore ?? 0) >= 70)}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto">
              <Filter className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-900">{t('noSchemesFound')}</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                {t('noSchemesComparedDesc')}
              </p>
              <button
                onClick={resetFilters}
                className="mt-4 px-4 py-2 rounded-xl bg-teal-700 text-white text-xs font-bold hover:bg-teal-800 transition cursor-pointer"
              >
                {t('resetFiltersBtn')}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};
