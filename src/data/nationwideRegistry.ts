import { Scheme, SchemeVerificationStatus } from '../types';
import { NATIONWIDE_SERVICES_AND_SCHEMES } from './nationwideServicesAndSchemes';
import { NATIONWIDE_STATE_SCHOLARSHIPS } from './nationwideStateScholarships';
import { NATIONWIDE_STATE_AND_UT_SCHEMES } from './nationwideStateSchemes';
import { NATIONWIDE_STATE_SCHEMES_PART_2 } from './nationwideStateSchemesPart2';
import { NATIONWIDE_STATE_SCHEMES_PART_3 } from './nationwideStateSchemesPart3';
import { NATIONWIDE_UT_SCHEMES } from './nationwideUTSchemes';

// Canonical Lists of all 28 Indian States
export const ALL_INDIAN_STATES: string[] = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal'
];

// Canonical Lists of all 8 Indian Union Territories
export const ALL_INDIAN_UNION_TERRITORIES: string[] = [
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Jammu and Kashmir',
  'Ladakh',
  'Lakshadweep',
  'Puducherry'
];

export interface JurisdictionCoverage {
  name: string;
  type: 'State' | 'UT' | 'Central';
  verifiedCount: number;
  pendingCount: number;
  totalCount: number;
  categories: string[];
  officialPortals: string[];
  coverageStatus: 'Comprehensive' | 'Verified Active' | 'Expanding';
  verifiedRecordsAvailable: string;
}

export interface IngestionResult {
  accepted: Scheme[];
  rejectedDuplicates: {
    scheme: Partial<Scheme>;
    reason: string;
    existingId: string;
  }[];
  totalProcessed: number;
}

/**
 * Normalizes strings for duplicate detection and phonetic/semantic matching
 */
function normalizeForComparison(val?: string): string {
  if (!val) return '';
  return val
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .trim();
}

/**
 * Deduplication Engine:
 * Validates uniqueness based on:
 * 1. scheme_identifier / recordId / id
 * 2. normalized scheme_name + state + government_level
 * 3. official_source / officialUrl
 */
export function deduplicateSchemes(schemes: Scheme[]): { unique: Scheme[]; duplicatesFound: number } {
  const seenIds = new Set<string>();
  const seenSignatures = new Set<string>();
  const uniqueList: Scheme[] = [];
  let duplicatesFound = 0;

  for (const scheme of schemes) {
    const rawId = scheme.id;
    const recordId = scheme.recordId;
    const hasSeenId = (rawId && seenIds.has(rawId)) || (recordId && seenIds.has(recordId));

    // Normalize name by removing parenthesized jurisdiction/government labels
    const cleanName = (scheme.scheme_name || scheme.name || '')
      .replace(/\(.*?\)/g, '')
      .trim();
    const nameKey = normalizeForComparison(cleanName || scheme.scheme_name || scheme.name);
    const stateKey = normalizeForComparison(scheme.state || (scheme as any).unionTerritory || 'all-india');
    const govtKey = normalizeForComparison(scheme.government_level || scheme.governmentLevel || 'central');
    const signature = `${nameKey}__${stateKey}__${govtKey}`;

    if (hasSeenId || seenSignatures.has(signature)) {
      duplicatesFound++;
      continue;
    }

    if (rawId) seenIds.add(rawId);
    if (recordId) seenIds.add(recordId);
    seenSignatures.add(signature);
    
    // Ensure verified fields are normalized
    const normalizedScheme: Scheme = {
      ...scheme,
      verification_status: scheme.verification_status || (scheme.isOfficialSourceVerified ? 'VERIFIED' : 'PENDING_VERIFICATION'),
      verificationStatus: scheme.verificationStatus || (scheme.isOfficialSourceVerified ? 'Verified' : 'Pending'),
      government_level: scheme.government_level || (scheme.governmentLevel === 'State' ? 'STATE' : scheme.governmentLevel === 'Union Territory' ? 'UT' : 'CENTRAL'),
      governmentLevel: scheme.governmentLevel || (scheme.government_level === 'STATE' ? 'State' : scheme.government_level === 'UT' ? 'Union Territory' : 'Central')
    };

    uniqueList.push(normalizedScheme);
  }

  return { unique: uniqueList, duplicatesFound };
}

// Assemble all verified records across the nationwide repository
const RAW_NATIONWIDE_SCHEMES: Scheme[] = [
  ...NATIONWIDE_STATE_SCHOLARSHIPS,
  ...NATIONWIDE_SERVICES_AND_SCHEMES,
  ...NATIONWIDE_STATE_AND_UT_SCHEMES,
  ...NATIONWIDE_STATE_SCHEMES_PART_2,
  ...NATIONWIDE_STATE_SCHEMES_PART_3,
  ...NATIONWIDE_UT_SCHEMES
];

// Perform ingestion deduplication
const { unique: DEDUPLICATED_NATIONWIDE_SCHEMES, duplicatesFound: INITIAL_DUPLICATES_COUNT } = deduplicateSchemes(RAW_NATIONWIDE_SCHEMES);

export const ALL_NATIONWIDE_SCHEMES: Scheme[] = DEDUPLICATED_NATIONWIDE_SCHEMES;
export const TOTAL_DUPLICATES_FILTERED = INITIAL_DUPLICATES_COUNT;

/**
 * Calculates real-time coverage statistics for every State, UT, and Central government
 */
export function getJurisdictionCoverageStats(): {
  statesCoverage: JurisdictionCoverage[];
  utsCoverage: JurisdictionCoverage[];
  centralCoverage: JurisdictionCoverage;
  totalNationwideVerified: number;
  totalNationwidePending: number;
  totalNationwideRecords: number;
} {
  const coverageMap = new Map<string, JurisdictionCoverage>();

  // Initialize Central
  coverageMap.set('Central Government', {
    name: 'Central Government (All-India)',
    type: 'Central',
    verifiedCount: 0,
    pendingCount: 0,
    totalCount: 0,
    categories: [],
    officialPortals: [],
    coverageStatus: 'Comprehensive',
    verifiedRecordsAvailable: 'Verified records currently available: 0'
  });

  // Initialize all 28 States
  ALL_INDIAN_STATES.forEach(state => {
    coverageMap.set(state, {
      name: state,
      type: 'State',
      verifiedCount: 0,
      pendingCount: 0,
      totalCount: 0,
      categories: [],
      officialPortals: [],
      coverageStatus: 'Verified Active',
      verifiedRecordsAvailable: 'Verified records currently available: 0'
    });
  });

  // Initialize all 8 UTs
  ALL_INDIAN_UNION_TERRITORIES.forEach(ut => {
    coverageMap.set(ut, {
      name: ut,
      type: 'UT',
      verifiedCount: 0,
      pendingCount: 0,
      totalCount: 0,
      categories: [],
      officialPortals: [],
      coverageStatus: 'Verified Active',
      verifiedRecordsAvailable: 'Verified records currently available: 0'
    });
  });

  // Aggregate schemes
  let totalVerified = 0;
  let totalPending = 0;

  ALL_NATIONWIDE_SCHEMES.forEach(scheme => {
    const isVerified = scheme.verification_status === 'VERIFIED' || scheme.verificationStatus === 'Verified' || scheme.isOfficialSourceVerified;
    if (isVerified) {
      totalVerified++;
    } else {
      totalPending++;
    }

    let targetKey = 'Central Government';
    if (scheme.state && scheme.state !== 'All-India' && coverageMap.has(scheme.state)) {
      targetKey = scheme.state;
    } else if (scheme.unionTerritory && coverageMap.has(scheme.unionTerritory)) {
      targetKey = scheme.unionTerritory;
    }

    const entry = coverageMap.get(targetKey);
    if (entry) {
      if (isVerified) {
        entry.verifiedCount++;
      } else {
        entry.pendingCount++;
      }
      entry.totalCount++;

      if (scheme.category && !entry.categories.includes(scheme.category)) {
        entry.categories.push(scheme.category);
      }

      const portal = scheme.officialPortal || scheme.officialUrl || scheme.officialSource;
      if (portal && !entry.officialPortals.includes(portal)) {
        entry.officialPortals.push(portal);
      }

      entry.verifiedRecordsAvailable = `Verified records currently available: ${entry.verifiedCount}`;
      if (entry.verifiedCount >= 5) {
        entry.coverageStatus = 'Comprehensive';
      } else if (entry.verifiedCount > 0) {
        entry.coverageStatus = 'Verified Active';
      } else {
        entry.coverageStatus = 'Expanding';
      }
    }
  });

  const statesCoverage = ALL_INDIAN_STATES.map(s => coverageMap.get(s)!);
  const utsCoverage = ALL_INDIAN_UNION_TERRITORIES.map(ut => coverageMap.get(ut)!);
  const centralCoverage = coverageMap.get('Central Government')!;

  return {
    statesCoverage,
    utsCoverage,
    centralCoverage,
    totalNationwideVerified: totalVerified,
    totalNationwidePending: totalPending,
    totalNationwideRecords: ALL_NATIONWIDE_SCHEMES.length
  };
}

/**
 * SEARCH RANKING ENGINE:
 * Prioritizes results in the strict mandatory order:
 * 1. Exact relevant verified scheme
 * 2. State-specific verified scheme
 * 3. District/local verified scheme
 * 4. Central Government scheme
 * 5. Related government program
 * 6. Service / document / certificate where relevant
 */
export function rankSchemesForQuery(
  query: string,
  userState?: string,
  userDistrict?: string,
  userCategory?: string
): Scheme[] {
  const cleanQuery = query.toLowerCase().trim();
  const queryTokens = cleanQuery.split(/\s+/).filter(t => t.length > 2);

  // Score each scheme
  const scored = ALL_NATIONWIDE_SCHEMES.map(scheme => {
    let score = 0;
    const isVerified = scheme.verification_status === 'VERIFIED' || scheme.verificationStatus === 'Verified' || scheme.isOfficialSourceVerified;
    const isStateScheme = scheme.government_level === 'STATE' || scheme.governmentLevel === 'State';
    const isUTScheme = scheme.government_level === 'UT' || scheme.governmentLevel === 'Union Territory';
    const isCentralScheme = scheme.government_level === 'CENTRAL' || scheme.governmentLevel === 'Central' || scheme.state === 'All-India';
    const isDocumentOrService = scheme.recordType === 'SERVICE' || scheme.recordType === 'DOCUMENT' || scheme.category === 'Documents' || scheme.category === 'Certificates' || scheme.category === 'Citizen Services';

    const stateMatch = userState && (
      (scheme.state && scheme.state.toLowerCase() === userState.toLowerCase()) ||
      (scheme.unionTerritory && scheme.unionTerritory.toLowerCase() === userState.toLowerCase()) ||
      (scheme.eligibilityRules.states && scheme.eligibilityRules.states.some(s => s.toLowerCase() === userState.toLowerCase()))
    );

    const districtMatch = userDistrict && scheme.district && scheme.district.toLowerCase() === userDistrict.toLowerCase();

    // Text relevance scoring
    const schemeAliases = [
      ...(scheme.aliases || []),
      ...(scheme.common_names || []),
      ...(scheme.portal_aliases || []),
      ...(scheme.old_names || [])
    ];

    const schemeText = [
      scheme.name,
      scheme.scheme_name,
      scheme.official_name,
      scheme.short_name,
      scheme.acronym,
      scheme.portal_id,
      ...schemeAliases,
      scheme.shortDescription,
      scheme.plainSummary,
      scheme.category,
      scheme.department,
      scheme.ministry,
      scheme.mainBenefit,
      scheme.officialPortal,
      ...(scheme.keywords || [])
    ].filter(Boolean).join(' ').toLowerCase();

    let matchedTokensCount = 0;
    for (const token of queryTokens) {
      if (schemeText.includes(token)) {
        matchedTokensCount++;
      }
    }

    const tokenRelevance = queryTokens.length > 0 ? (matchedTokensCount / queryTokens.length) : 0;
    const isExactNameMatch = cleanQuery.length >= 2 && (
      scheme.name.toLowerCase().includes(cleanQuery) ||
      (scheme.scheme_name && scheme.scheme_name.toLowerCase().includes(cleanQuery)) ||
      (scheme.short_name && scheme.short_name.toLowerCase() === cleanQuery) ||
      (scheme.acronym && scheme.acronym.toLowerCase() === cleanQuery)
    );

    const isExactAliasMatch = cleanQuery.length >= 2 && schemeAliases.some(alias => {
      const aLower = alias.toLowerCase().trim();
      return aLower === cleanQuery || aLower.replace(/[-\s]/g, '') === cleanQuery.replace(/[-\s]/g, '');
    });

    // --- MANDATORY TIERED SCORING ACCORDING TO RANKING PRIORITY ---
    // Tier 1: Exact relevant verified scheme or exact alias match
    if ((isExactNameMatch || isExactAliasMatch) && isVerified) {
      score += 10000;
    } else if (isExactAliasMatch) {
      score += 8000;
    }

    // Keyword relevance weight
    score += matchedTokensCount * 500;

    // Tier 2: State-specific verified scheme
    if (stateMatch && (isStateScheme || isUTScheme) && isVerified) {
      score += 5000;
    }

    // Tier 3: District / local verified scheme
    if (districtMatch && isVerified) {
      score += 4000;
    }

    // Tier 4: Central Government scheme
    if (isCentralScheme && isVerified) {
      score += 2000;
    }

    // Category match bonus
    if (userCategory && scheme.category.toLowerCase() === userCategory.toLowerCase()) {
      score += 1000;
    }

    // Tier 5: Related government program
    if (!isDocumentOrService && score > 0) {
      score += 300;
    }

    // Tier 6: Service/document/certificate where relevant
    if (isDocumentOrService) {
      score += 100;
    }

    return { scheme, score, tokenRelevance };
  });

  // Filter out completely irrelevant schemes if there is a query
  const filtered = queryTokens.length > 0
    ? scored.filter(item => item.score > 100)
    : scored;

  // Sort descending by score
  filtered.sort((a, b) => b.score - a.score);

  return filtered.map(item => item.scheme);
}

/**
 * Ingestion Pipeline Interface:
 * Allows batch registration of verified schemes with duplicate checks
 */
export function ingestVerifiedSchemes(newSchemes: Scheme[]): IngestionResult {
  const result: IngestionResult = {
    accepted: [],
    rejectedDuplicates: [],
    totalProcessed: newSchemes.length
  };

  const existingIds = new Set<string>();
  ALL_NATIONWIDE_SCHEMES.forEach(s => {
    if (s.id) existingIds.add(s.id);
    if (s.recordId) existingIds.add(s.recordId);
  });
  const existingSignatures = new Set(
    ALL_NATIONWIDE_SCHEMES.map(s => {
      const cleanName = (s.scheme_name || s.name || '').replace(/\(.*?\)/g, '').trim();
      const nameKey = normalizeForComparison(cleanName || s.scheme_name || s.name);
      const stateKey = normalizeForComparison(s.state || (s as any).unionTerritory || 'all-india');
      const govtKey = normalizeForComparison(s.government_level || s.governmentLevel || 'central');
      return `${nameKey}__${stateKey}__${govtKey}`;
    })
  );

  for (const s of newSchemes) {
    const rawId = s.id;
    const recordId = s.recordId;
    const hasSeenId = (rawId && existingIds.has(rawId)) || (recordId && existingIds.has(recordId));
    const cleanName = (s.scheme_name || s.name || '').replace(/\(.*?\)/g, '').trim();
    const nameKey = normalizeForComparison(cleanName || s.scheme_name || s.name);
    const stateKey = normalizeForComparison(s.state || (s as any).unionTerritory || 'all-india');
    const govtKey = normalizeForComparison(s.government_level || s.governmentLevel || 'central');
    const signature = `${nameKey}__${stateKey}__${govtKey}`;

    if (hasSeenId) {
      result.rejectedDuplicates.push({
        scheme: s,
        reason: 'Duplicate Scheme Identifier / Record ID',
        existingId: rawId || recordId || ''
      });
      continue;
    }

    if (existingSignatures.has(signature)) {
      result.rejectedDuplicates.push({
        scheme: s,
        reason: 'Duplicate Scheme Name and State combination',
        existingId: rawId || recordId || ''
      });
      continue;
    }

    // Add to accepted
    if (rawId) existingIds.add(rawId);
    if (recordId) existingIds.add(recordId);
    existingSignatures.add(signature);
    result.accepted.push(s);
  }

  return result;
}
