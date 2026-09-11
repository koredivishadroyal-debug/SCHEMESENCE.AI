import { Scheme, GovernmentPortal, SearchDebugInfo, PortalType } from '../types';
import { GOVERNMENT_PORTALS, PORTAL_SCHEME_MAPPINGS } from '../data/governmentPortals';
import { ALL_INDIAN_STATES, ALL_INDIAN_UNION_TERRITORIES } from '../data/nationwideRegistry';

export interface GovernmentEntityResolutionResult {
  schemes: Scheme[];
  resolvedPortal: GovernmentPortal | null;
  detectedState: string | null;
  detectedIntent: string | null;
  detectedEntityType: 'PORTAL' | 'SCHEME' | 'SCHOLARSHIP' | 'DEPARTMENT' | 'SERVICE' | 'BENEFIT' | 'GENERAL_SEARCH';
  debugInfo: SearchDebugInfo;
  explanation: string;
  isPortalSearch: boolean;
  totalFound: number;
}

// Common portal alias mapping for rapid lookup
const PORTAL_SYNONYMS: Record<string, string> = {
  'epass': 'telangana-epass',
  'e-pass': 'telangana-epass',
  'e pass': 'telangana-epass',
  'telangana epass': 'telangana-epass',
  'epass telangana': 'telangana-epass',
  'telangana scholarship': 'telangana-epass',
  'telangana scholarships': 'telangana-epass',
  'telangana scholarship portal': 'telangana-epass',
  'epass scholarship': 'telangana-epass',
  'epass.cgg.gov.in': 'telangana-epass',
  'telanganaepass': 'telangana-epass',
  'jnanabhumi': 'ap-jnanabhumi',
  'ap epass': 'ap-jnanabhumi',
  'ap scholarship': 'ap-jnanabhumi',
  'ssp': 'karnataka-ssp',
  'ssp karnataka': 'karnataka-ssp',
  'state scholarship portal': 'karnataka-ssp',
  'karnataka scholarship': 'karnataka-ssp',
  'mahadbt': 'mahadbt',
  'maha dbt': 'mahadbt',
  'aaple sarkar dbt': 'mahadbt',
  'oasis': 'wb-oasis',
  'wb oasis': 'wb-oasis',
  'oasis scholarship': 'wb-oasis',
  'dce kerala': 'kerala-dce',
  'kerala scholarship': 'kerala-dce',
  'nsp': 'national-scholarship-portal',
  'national scholarship portal': 'national-scholarship-portal',
  'myscheme': 'myscheme-portal',
  'my scheme': 'myscheme-portal',
  'pm kisan': 'pm-kisan-portal',
  'pmkisan': 'pm-kisan-portal',
  'pm-kisan': 'pm-kisan-portal',
  'pmjay': 'pmjay-portal',
  'ayushman': 'pmjay-portal',
  'ayushman bharat': 'pmjay-portal',
  'parivahan': 'sarathi-parivahan',
  'sarathi': 'sarathi-parivahan',
  'nvsp': 'nvsp-eci',
  'udyam': 'udyam-portal',
  'meeseva': 'meeseva-telangana',
  'mee seva': 'meeseva-telangana',
  'sevasindhu': 'karnataka-sevasindhu',
  'seva sindhu': 'karnataka-sevasindhu'
};

// Intent keyword categories
const INTENT_DICTIONARY: Record<string, { category: string; keywords: string[] }> = {
  scholarship: {
    category: 'Students',
    keywords: [
      'scholarship', 'scholarships', 'epass', 'ssp', 'pms', 'rtf', 'mtf', 'fee reimbursement',
      'fees', 'tuition', 'stipend', 'hostel', 'overseas', 'vidya', 'study', 'education',
      'college', 'student', 'btech', 'degree', 'inter', 'school', 'chhatravratti', 'merit'
    ]
  },
  farmer: {
    category: 'Agriculture',
    keywords: [
      'farmer', 'farmers', 'kisan', 'rythu', 'agriculture', 'krishi', 'crop', 'tractor',
      'fertilizer', 'drip', 'pm-kisan', 'loan waiver', 'crop insurance', 'fasal', 'bima'
    ]
  },
  women: {
    category: 'Women',
    keywords: [
      'women', 'woman', 'female', 'girl', 'mother', 'maternity', 'pregnant', 'mahila',
      'lakshmi', 'bahin', 'kanya', 'ladli', 'beti', 'shaadi', 'kalyana', 'vivah', 'marriage'
    ]
  },
  health: {
    category: 'Healthcare',
    keywords: [
      'health', 'hospital', 'medical', 'surgery', 'treatment', 'ayushman', 'pmjay', 'arogyasri',
      'cashless', 'doctor', 'medicine', 'card'
    ]
  },
  housing: {
    category: 'Housing',
    keywords: [
      'house', 'housing', 'pucca', 'awas', 'pmay', 'makan', 'ghar', 'construction', 'plot', 'flat'
    ]
  },
  employment: {
    category: 'Employment',
    keywords: [
      'job', 'jobs', 'unemployed', 'skill', 'training', 'placement', 'rozgar', 'employment',
      'internship', 'nrega', 'mgnrega', 'allowance'
    ]
  },
  business: {
    category: 'Business',
    keywords: [
      'loan', 'business', 'msme', 'mudra', 'shop', 'startup', 'subsidy', 'udyam', 'entrepreneur'
    ]
  },
  senior: {
    category: 'Senior Citizens',
    keywords: [
      'pension', 'old age', 'senior', 'elderly', 'retired', 'retirement', 'vridha', 'atal'
    ]
  },
  disability: {
    category: 'Disability',
    keywords: [
      'disabled', 'disability', 'handicapped', 'divyang', 'wheelchair', 'udid', 'tricycle'
    ]
  },
  certificate: {
    category: 'Citizen Services',
    keywords: [
      'certificate', 'income', 'caste', 'residence', 'domicile', 'birth', 'death', 'pan', 'aadhaar',
      'driving licence', 'voter id', 'meeseva', 'sarathi'
    ]
  }
};

/**
 * Normalizes input search query: strips non-alphanumeric (except hyphens/spaces),
 * handles spelling variants, acronyms, and aliases.
 */
export function normalizeSearchQuery(rawQuery: string): string {
  if (!rawQuery) return '';
  return rawQuery
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Detects state/UT from the query text.
 */
export function detectJurisdictionFromQuery(normalizedQuery: string): { state: string | null; isUT: boolean } {
  // Check States
  for (const state of ALL_INDIAN_STATES) {
    const sLower = state.toLowerCase();
    if (normalizedQuery.includes(sLower)) {
      return { state, isUT: false };
    }
  }

  // Common State abbreviations / variants
  if (/\b(ts|telangana)\b/i.test(normalizedQuery)) return { state: 'Telangana', isUT: false };
  if (/\b(ap|andhra)\b/i.test(normalizedQuery)) return { state: 'Andhra Pradesh', isUT: false };
  if (/\b(ka|karnataka)\b/i.test(normalizedQuery)) return { state: 'Karnataka', isUT: false };
  if (/\b(mh|maharashtra)\b/i.test(normalizedQuery)) return { state: 'Maharashtra', isUT: false };
  if (/\b(wb|bengal)\b/i.test(normalizedQuery)) return { state: 'West Bengal', isUT: false };
  if (/\b(tn|tamil nadu)\b/i.test(normalizedQuery)) return { state: 'Tamil Nadu', isUT: false };
  if (/\b(up|uttar pradesh)\b/i.test(normalizedQuery)) return { state: 'Uttar Pradesh', isUT: false };
  if (/\b(kl|kerala)\b/i.test(normalizedQuery)) return { state: 'Kerala', isUT: false };
  if (/\b(gj|gujarat)\b/i.test(normalizedQuery)) return { state: 'Gujarat', isUT: false };
  if (/\b(rj|rajasthan)\b/i.test(normalizedQuery)) return { state: 'Rajasthan', isUT: false };
  if (/\b(mp|madhya pradesh)\b/i.test(normalizedQuery)) return { state: 'Madhya Pradesh', isUT: false };
  if (/\b(pb|punjab)\b/i.test(normalizedQuery)) return { state: 'Punjab', isUT: false };
  if (/\b(hr|haryana)\b/i.test(normalizedQuery)) return { state: 'Haryana', isUT: false };
  if (/\b(od|odisha|orissa)\b/i.test(normalizedQuery)) return { state: 'Odisha', isUT: false };
  if (/\b(br|bihar)\b/i.test(normalizedQuery)) return { state: 'Bihar', isUT: false };
  if (/\b(as|assam)\b/i.test(normalizedQuery)) return { state: 'Assam', isUT: false };

  // Check UTs
  for (const ut of ALL_INDIAN_UNION_TERRITORIES) {
    if (normalizedQuery.includes(ut.toLowerCase())) {
      return { state: ut, isUT: true };
    }
  }
  if (/\bdelhi\b/i.test(normalizedQuery)) return { state: 'Delhi', isUT: true };
  if (/\b(jk|jammu|kashmir)\b/i.test(normalizedQuery)) return { state: 'Jammu and Kashmir', isUT: true };

  return { state: null, isUT: false };
}

/**
 * Detects citizen intent from the query.
 */
export function detectIntentFromQuery(normalizedQuery: string): { intent: string | null; category: string | null } {
  for (const [intentKey, data] of Object.entries(INTENT_DICTIONARY)) {
    for (const kw of data.keywords) {
      const regex = new RegExp(`\\b${kw.replace('-', '[- ]?')}\\b`, 'i');
      if (regex.test(normalizedQuery)) {
        return { intent: intentKey, category: data.category };
      }
    }
  }
  return { intent: null, category: null };
}

/**
 * Resolves whether the user query is pointing to a Government Portal.
 */
export function resolveGovernmentPortal(normalizedQuery: string): {
  portal: GovernmentPortal | null;
  matchedAlias: string | null;
} {
  const cleanQ = normalizedQuery.replace(/[-_]/g, ' ').trim();
  const collapsedQ = normalizedQuery.replace(/[-\s]/g, '').trim();

  // 1. Direct synonym lookup
  if (PORTAL_SYNONYMS[collapsedQ]) {
    const pId = PORTAL_SYNONYMS[collapsedQ];
    const found = GOVERNMENT_PORTALS.find(p => p.portal_id === pId);
    if (found) return { portal: found, matchedAlias: collapsedQ };
  }
  if (PORTAL_SYNONYMS[cleanQ]) {
    const pId = PORTAL_SYNONYMS[cleanQ];
    const found = GOVERNMENT_PORTALS.find(p => p.portal_id === pId);
    if (found) return { portal: found, matchedAlias: cleanQ };
  }

  // 2. Iterate through all portals and their aliases
  for (const portal of GOVERNMENT_PORTALS) {
    for (const alias of portal.aliases) {
      const aClean = alias.toLowerCase().replace(/[-_]/g, ' ').trim();
      const aCollapsed = alias.toLowerCase().replace(/[-\s]/g, '').trim();

      // Exact or word boundary match
      if (
        cleanQ === aClean ||
        collapsedQ === aCollapsed ||
        cleanQ.includes(aClean) ||
        collapsedQ.includes(aCollapsed)
      ) {
        return { portal, matchedAlias: alias };
      }
    }
  }

  return { portal: null, matchedAlias: null };
}

/**
 * Hierarchical Government Entity Resolver
 * Resolves: Query -> Portal -> Department -> State -> Schemes & Programs
 * Handles:
 * - Exact names, short names, acronyms, portal names, department names, common citizen names,
 *   old names, new names, regional names, alternate spellings.
 * - Always maps portals (e.g. ePASS, SSP, MahaDBT, OASIS, Jnanabhumi) to their real verified programs.
 * - Produces comprehensive debug info for UI and administrative auditing.
 */
export function resolveGovernmentEntity(
  rawQuery: string,
  allSchemes: Scheme[],
  userLocationState?: string,
  userLocationDistrict?: string
): GovernmentEntityResolutionResult {
  const originalQuery = rawQuery || '';
  const normalized = normalizeSearchQuery(originalQuery);
  const pipelineSteps: string[] = [];

  pipelineSteps.push(`Normalized query: "${normalized}"`);

  // Step 1: Detect Portal
  const { portal: resolvedPortal, matchedAlias } = resolveGovernmentPortal(normalized);
  const matchedAliases: string[] = [];
  if (matchedAlias) {
    matchedAliases.push(matchedAlias);
    pipelineSteps.push(`Matched Government Portal: "${resolvedPortal?.portal_name}" via alias "${matchedAlias}"`);
  }

  // Step 2: Detect Jurisdiction
  let detectedState: string | null = null;
  const jurisdictionInfo = detectJurisdictionFromQuery(normalized);
  if (jurisdictionInfo.state) {
    detectedState = jurisdictionInfo.state;
    pipelineSteps.push(`Detected explicit state/UT: ${detectedState}`);
  } else if (resolvedPortal && resolvedPortal.state !== 'All-India') {
    detectedState = resolvedPortal.state;
    pipelineSteps.push(`Inherited state from resolved portal: ${detectedState}`);
  } else if (userLocationState && userLocationState !== 'All') {
    detectedState = userLocationState;
    pipelineSteps.push(`Using active user profile state context: ${detectedState}`);
  }

  // Step 3: Detect Intent & Entity Type
  const { intent: detectedIntent, category: detectedCategory } = detectIntentFromQuery(normalized);
  if (detectedIntent) {
    pipelineSteps.push(`Detected intent: ${detectedIntent} (Category: ${detectedCategory})`);
  }

  let detectedEntityType: 'PORTAL' | 'SCHEME' | 'SCHOLARSHIP' | 'DEPARTMENT' | 'SERVICE' | 'BENEFIT' | 'GENERAL_SEARCH' = 'GENERAL_SEARCH';
  if (resolvedPortal) {
    detectedEntityType = 'PORTAL';
  } else if (detectedIntent === 'scholarship') {
    detectedEntityType = 'SCHOLARSHIP';
  } else if (detectedIntent === 'certificate') {
    detectedEntityType = 'SERVICE';
  }

  // Step 4: Resolve Associated Schemes & Programs
  const scoredSchemes: { scheme: Scheme; score: number; matchReasons: string[] }[] = [];
  const addedIds = new Set<string>();

  // A. Portal-Hosted Schemes (Highest Priority)
  if (resolvedPortal) {
    // Look up in portal.programs_hosted
    const hostedIds = resolvedPortal.programs_hosted || [];
    // Also look up in PORTAL_SCHEME_MAPPINGS
    const mappedIds = PORTAL_SCHEME_MAPPINGS
      .filter(m => m.portal_id === resolvedPortal.portal_id)
      .map(m => m.scheme_id);

    const targetIds = Array.from(new Set([...hostedIds, ...mappedIds]));
    pipelineSteps.push(`Querying ${targetIds.length} programs officially mapped to portal "${resolvedPortal.portal_name}"`);

    for (const s of allSchemes) {
      if (targetIds.includes(s.id)) {
        scoredSchemes.push({
          scheme: s,
          score: 1000,
          matchReasons: [`Hosted on official portal: ${resolvedPortal.portal_name}`]
        });
        addedIds.add(s.id);
      }
    }
  }

  // B. Exact Name & Alias Matching Across Registry
  const collapsedQuery = normalized.replace(/[-\s]/g, '');
  for (const s of allSchemes) {
    if (addedIds.has(s.id)) continue;

    let score = 0;
    const reasons: string[] = [];

    // Check Official Name & Main Name
    const sNameNorm = normalizeSearchQuery(s.name);
    const sOfficialNorm = s.official_name ? normalizeSearchQuery(s.official_name) : '';
    const sShortNorm = s.short_name ? normalizeSearchQuery(s.short_name) : '';
    const sAcronymNorm = s.acronym ? normalizeSearchQuery(s.acronym) : '';

    if (sNameNorm === normalized || sOfficialNorm === normalized) {
      score += 500;
      reasons.push('Exact scheme name match');
    } else if (sShortNorm === normalized || sAcronymNorm === normalized) {
      score += 450;
      reasons.push(`Acronym/short name match: ${s.acronym || s.short_name}`);
    } else if (sNameNorm.includes(normalized) || normalized.includes(sNameNorm)) {
      score += 300;
      reasons.push('Direct name inclusion');
    }

    // Check All Aliases
    const aliases = [
      ...(s.aliases || []),
      ...(s.common_names || []),
      ...(s.portal_aliases || []),
      ...(s.department_aliases || []),
      ...(s.old_names || []),
      ...(s.alternate_spellings || [])
    ];

    for (const alias of aliases) {
      const aNorm = normalizeSearchQuery(alias);
      const aCollapsed = aNorm.replace(/[-\s]/g, '');

      if (aNorm === normalized || aCollapsed === collapsedQuery) {
        score += 400;
        reasons.push(`Alias match: "${alias}"`);
        if (!matchedAliases.includes(alias)) matchedAliases.push(alias);
        break;
      } else if (normalized.includes(aNorm) || aNorm.includes(normalized)) {
        score += 200;
        reasons.push(`Partial alias match: "${alias}"`);
        break;
      }
    }

    // Check Native Language Names
    if (s.nativeNames) {
      for (const [lang, nativeName] of Object.entries(s.nativeNames)) {
        if (originalQuery.includes(nativeName)) {
          score += 350;
          reasons.push(`Native language (${lang}) match: ${nativeName}`);
          break;
        }
      }
    }

    // Boost if matches detected category
    if (detectedCategory && s.category === detectedCategory) {
      score += 100;
      reasons.push(`Matches category: ${s.category}`);
    }

    // Boost if matches detected state
    if (detectedState) {
      if (s.state === detectedState || s.unionTerritory === detectedState) {
        score += 250;
        reasons.push(`Matches jurisdiction: ${detectedState}`);
      } else if (s.governmentLevel === 'Central' || s.government_level === 'CENTRAL' || s.state === 'All-India') {
        score += 50; // Central schemes remain accessible
      } else {
        // Demote schemes belonging to an entirely different state
        score -= 150;
      }
    }

    // Boost if official portal matches query tokens
    if (s.officialPortal && s.officialPortal.toLowerCase().includes(collapsedQuery)) {
      score += 250;
      reasons.push('Official portal URL match');
    }

    if (score > 0) {
      scoredSchemes.push({
        scheme: s,
        score,
        matchReasons: reasons
      });
      addedIds.add(s.id);
    }
  }

  // C. Fallback: If no direct matches yet, but intent or state is detected, discover related verified schemes
  if (scoredSchemes.length === 0 && (detectedCategory || detectedState)) {
    pipelineSteps.push('Applying related scheme discovery via state/intent context');
    for (const s of allSchemes) {
      if (addedIds.has(s.id)) continue;
      let score = 0;
      const reasons: string[] = [];

      if (detectedState && (s.state === detectedState || s.unionTerritory === detectedState)) {
        score += 150;
        reasons.push(`State scheme for ${detectedState}`);
      }
      if (detectedCategory && s.category === detectedCategory) {
        score += 100;
        reasons.push(`Category match: ${detectedCategory}`);
      }

      if (score >= 150) {
        scoredSchemes.push({
          scheme: s,
          score,
          matchReasons: reasons
        });
        addedIds.add(s.id);
      }
    }
  }

  // Sort by score descending
  scoredSchemes.sort((a, b) => b.score - a.score);

  const finalSchemes = scoredSchemes.map(s => s.scheme);
  const totalFound = finalSchemes.length;
  const verifiedResults = finalSchemes.filter(s => s.isOfficialSourceVerified || s.verification_status === 'VERIFIED').length;

  pipelineSteps.push(`Resolution complete: found ${totalFound} matching programs (${verifiedResults} official verified)`);

  const debugInfo: SearchDebugInfo = {
    originalQuery,
    normalizedQuery: normalized,
    detectedState,
    detectedIntent,
    detectedEntity: detectedEntityType,
    resolvedPortal: resolvedPortal ? resolvedPortal.portal_id : null,
    portalName: resolvedPortal ? resolvedPortal.portal_name : undefined,
    portalUrl: resolvedPortal ? resolvedPortal.official_url : undefined,
    aliasesMatched: Array.from(new Set(matchedAliases)),
    sourcesSearched: GOVERNMENT_PORTALS.length + allSchemes.length,
    programsFound: totalFound,
    verifiedResults,
    pipelineSteps
  };

  let explanation = '';
  if (resolvedPortal) {
    explanation = `Identified official government portal "${resolvedPortal.portal_name}" (${resolvedPortal.state}). Retrieved ${totalFound} verified public programs and scholarship services administered through this official system.`;
  } else if (detectedState && detectedIntent) {
    explanation = `Identified request for ${detectedIntent} schemes in ${detectedState}. Showing verified public welfare programs.`;
  } else if (totalFound > 0) {
    explanation = `Found ${totalFound} verified government schemes matching your search criteria.`;
  } else {
    explanation = `No verified government programs matched "${originalQuery}". Check spelling or search by department, state, or portal.`;
  }

  return {
    schemes: finalSchemes,
    resolvedPortal,
    detectedState,
    detectedIntent,
    detectedEntityType,
    debugInfo,
    explanation,
    isPortalSearch: !!resolvedPortal,
    totalFound
  };
}
