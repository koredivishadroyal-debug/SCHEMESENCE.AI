export type Language = 
  | 'English' 
  | 'Hindi' 
  | 'Telugu' 
  | 'Tamil' 
  | 'Kannada' 
  | 'Malayalam' 
  | 'Marathi' 
  | 'Bengali' 
  | 'Gujarati' 
  | 'Punjabi' 
  | 'Odia' 
  | 'Assamese' 
  | 'Urdu'
  | 'Kashmiri'
  | 'Dogri'
  | 'Konkani'
  | 'Maithili'
  | 'Santali'
  | 'Bodo'
  | 'Manipuri'
  | 'Nepali'
  | 'Sanskrit'
  | 'Sindhi'
  | 'Mizo'
  | 'Khasi'
  | 'Garo'
  | 'Kokborok'
  | 'Ladakhi';

export type GovernmentRecordType =
  | 'SCHEME'
  | 'SERVICE'
  | 'DOCUMENT'
  | 'CERTIFICATE'
  | 'BENEFIT'
  | 'REGISTRATION'
  | 'APPLICATION'
  | 'PROGRAM'
  | 'LICENSE'
  | 'PERMIT'
  | 'SCHOLARSHIP'
  | 'PORTAL'
  | 'OTHER_GOVERNMENT_SERVICE';

export type GovernmentLevel = 'Central' | 'State' | 'Union Territory' | 'District/Local';

export type SchemeCategory =
  | 'All'
  | 'Education'
  | 'Agriculture'
  | 'Employment'
  | 'Housing'
  | 'Healthcare'
  | 'Women'
  | 'Women & Child'
  | 'Students'
  | 'Senior Citizens'
  | 'Business'
  | 'Entrepreneurship'
  | 'Skill Development'
  | 'Social Welfare'
  | 'Disability'
  | 'Rural Development'
  | 'Documents'
  | 'Certificates'
  | 'Citizen Services'
  | 'Finance'
  | 'Youth'
  | 'Other';

export type EligibilityVerdict = 'LIKELY_ELIGIBLE' | 'POSSIBLY_ELIGIBLE' | 'LIKELY_NOT_ELIGIBLE';

export type DocumentStatus = 'Available' | 'Not Available' | 'Need to Apply';

export interface RequiredDocument {
  id: string;
  name: string;
  whyNeeded: string;
  howToObtain: string;
  officialLink?: string;
  isMandatory: boolean;
}

export interface ApplicationStep {
  stepNumber: number;
  title: string;
  description: string;
  portalUrl?: string;
}

export interface SchemeEligibilityRules {
  minAge?: number;
  maxAge?: number;
  gender?: 'Any' | 'Female' | 'Male';
  occupations?: string[];
  maxIncome?: number;
  states?: string[]; // 'All-India' or specific states
  socialCategories?: string[]; // 'General', 'OBC', 'SC', 'ST', 'EWS'
  speciallyAbledOnly?: boolean;
  requiresFarmer?: boolean;
  maxLandAcres?: number;
  housingStatusAllowed?: string[];
  customConditions: string[];
}

export type SchemeVerificationStatus = 
  | 'VERIFIED' 
  | 'PENDING_VERIFICATION' 
  | 'STALE' 
  | 'INACTIVE' 
  | 'FAILED_IMPORT' 
  | 'DUPLICATE';

export interface Scheme {
  id: string;
  recordId?: string;
  recordType?: GovernmentRecordType;
  name: string;
  nativeNames?: {
    hindi?: string;
    telugu?: string;
    tamil?: string;
    kannada?: string;
    bengali?: string;
    marathi?: string;
    urdu?: string;
    punjabi?: string;
    gujarati?: string;
    odia?: string;
    assamese?: string;
    malayalam?: string;
  };

  ministry?: string;
  department: string;
  governmentLevel: GovernmentLevel;
  state: string; // 'All-India', state name, or union territory
  unionTerritory?: string;
  district?: string;
  category: SchemeCategory;
  targetBeneficiary?: string;
  shortDescription: string;
  detailedDescription?: string;
  plainSummary: string; // In simple plain language
  mainBenefit: string;
  benefitType: 'Direct Cash Transfer' | 'Subsidy' | 'Insurance' | 'Reimbursement' | 'In-Kind' | 'Loan / Credit' | 'Certificate / Identity' | 'Licence / Approval' | 'Citizen Service';
  fees?: string; // Officially stated government fee e.g. "Free (₹0)" or "₹50"
  processingTime?: string; // e.g. "Instant via Aadhaar OTP", "15-30 days"
  applicationMode?: 'Online' | 'Offline' | 'CSC / Seva Kendra' | 'Hybrid';
  eligibilityRules: SchemeEligibilityRules;
  requiredDocuments: RequiredDocument[];
  optionalDocuments?: RequiredDocument[];
  applicationSteps: ApplicationStep[];
  deadline: string;
  openingDate: string;
  officialUrl: string;
  officialPortal?: string;
  officialSource?: string;
  sourceDocument: string;
  sourceType?: string;
  sourceLastUpdated?: string;
  lastVerified: string;
  isOfficialSourceVerified: boolean;
  verificationStatus?: 'Verified' | 'Pending' | 'Stale';
  applicationStatus: 'Open' | 'Upcoming' | 'Closed' | 'Rolling';
  helpline: string;
  keywords?: string[];
  aliases?: string[];
  searchableText?: string;

  // Extended Alias and Entity Fields
  official_name?: string;
  short_name?: string;
  acronym?: string;
  portal_aliases?: string[];
  department_aliases?: string[];
  common_names?: string[];
  old_names?: string[];
  alternate_spellings?: string[];
  regional_names?: Record<string, string>;
  portal_id?: string;

  // Nationwide Production Registry Fields
  scheme_name?: string;
  scheme_type?: string;
  government_level?: 'CENTRAL' | 'STATE' | 'UT' | 'DISTRICT';
  description?: string;
  eligibility?: string | string[];
  benefits?: string;
  required_documents?: string[] | RequiredDocument[];
  application_process?: string | string[];
  official_portal?: string;
  official_source?: string;
  source_document?: string;
  source_last_updated?: string;
  last_verified?: string;
  verification_status?: SchemeVerificationStatus;
  status?: 'ACTIVE' | 'CLOSED' | 'UPCOMING';
  duplicate_of?: string;
  state_implementation_of?: string;
}

export type PortalType = 
  | 'SCHOLARSHIP_PORTAL' 
  | 'CITIZEN_SERVICES' 
  | 'FARMER_PORTAL' 
  | 'EMPLOYMENT_PORTAL' 
  | 'WELFARE_PORTAL' 
  | 'BUSINESS_PORTAL' 
  | 'HEALTH_PORTAL' 
  | 'HOUSING_PORTAL' 
  | 'GENERAL_GOVERNMENT_PORTAL';

export type PortalRelationshipType = 
  | 'HOSTS' 
  | 'PROVIDES_APPLICATION_FOR' 
  | 'PROVIDES_INFORMATION_FOR' 
  | 'MANAGES' 
  | 'LISTS';

export interface GovernmentPortal {
  portal_id: string;
  portal_name: string;
  portal_type: PortalType;
  government_level: 'CENTRAL' | 'STATE' | 'UT' | 'DISTRICT';
  state: string; // 'All-India' or state/UT name
  union_territory?: string;
  department: string;
  official_url: string;
  official_source: string;
  description: string;
  aliases: string[];
  status: 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE';
  last_verified: string;
  programs_hosted?: string[]; // IDs of schemes hosted
}

export interface PortalSchemeMapping {
  portal_id: string;
  scheme_id: string;
  relationship_type: PortalRelationshipType;
  official_source: string;
  last_verified: string;
}

export interface SearchDebugInfo {
  originalQuery: string;
  normalizedQuery: string;
  detectedState: string | null;
  detectedIntent: string | null;
  detectedEntity: string | null;
  resolvedPortal: string | null;
  portalName?: string;
  portalUrl?: string;
  aliasesMatched: string[];
  sourcesSearched: number;
  programsFound: number;
  verifiedResults: number;
  pipelineSteps: string[];
}

// Alias for generic government records
export type GovernmentRecord = Scheme;

export interface ExtractedUserProfile {
  age?: number;
  gender?: 'Male' | 'Female' | 'Other' | 'Prefer not to say';
  state?: string;
  unionTerritory?: string;
  district?: string;

  city?: string;
  annualIncome?: number;
  educationLevel?: 'Below 10th' | '10th Pass' | '12th Pass' | 'Diploma' | 'Undergraduate' | 'Postgraduate / Higher';
  occupation?: 'Student' | 'Farmer' | 'Employee' | 'Business' | 'Daily Wage / Laborer' | 'Unemployed' | 'Retired' | 'Homemaker' | 'Other';
  socialCategory?: 'General' | 'OBC' | 'SC' | 'ST' | 'EWS';
  speciallyAbled?: boolean;
  rawQuery?: string;
}

export interface UserProfile {
  age: number;
  gender: 'Male' | 'Female' | 'Other' | 'Prefer not to say';
  state: string;
  district: string;
  occupation: 'Student' | 'Farmer' | 'Employee' | 'Business' | 'Daily Wage / Laborer' | 'Unemployed' | 'Retired' | 'Homemaker' | 'Other';
  annualIncome: number;
  educationLevel: 'Below 10th' | '10th Pass' | '12th Pass' | 'Diploma' | 'Undergraduate' | 'Postgraduate / Higher';
  familySize: number;
  housingStatus: 'Own Pucca House' | 'Kutcha House' | 'Rented House' | 'Homeless' | 'BPL / Antyodaya Card Holder';
  landOwnershipAcres: number;
  socialCategory: 'General' | 'OBC' | 'SC' | 'ST' | 'EWS';
  speciallyAbled: boolean;
  existingBenefits: string[];
}

export interface RuleEvaluationResult {
  schemeId: string;
  verdict: EligibilityVerdict;
  aiMatchScore: number;
  whyYouMatch: string[];
  needsVerification: string[];
  missingRequirements: string[];
  actionAdvice: string[];
}

export interface FamilyMember {
  id: string;
  name: string;
  relationship?: string;
  relation?: string;
  age: number;
  occupation: string;
  annualIncome?: number;
  notes?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  sources?: string[];
}

export interface SavedSchemeRecord {
  schemeId: string;
  savedAt: string;
  docStatuses: Record<string, DocumentStatus>;
  notes?: string;
}

export interface AlertNotification {
  id: string;
  schemeId: string;
  schemeName: string;
  type: 'deadline' | 'update' | 'new_scheme';
  message: string;
  date: string;
  isRead: boolean;
}

export interface DocumentAnalysisResult {
  schemeName: string;
  objective: string;
  targetBeneficiaries: string;
  eligibilityCriteria: string[];
  benefits: string;
  requiredDocuments: Array<{ name: string; reason: string }>;
  applicationProcedure: string[];
  importantDates: string;
  restrictions: string;
  contactInfo: string;
  officialWebsite: string;
  plainLanguageSummary: string;
  importantConditions: string;
  lastVerified: string;
}

export const ALL_INDIAN_STATES = [
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
] as const;

export const ALL_UNION_TERRITORIES = [
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Jammu and Kashmir',
  'Ladakh',
  'Lakshadweep',
  'Puducherry'
] as const;

export const ALL_RECORD_TYPES: GovernmentRecordType[] = [
  'SCHEME',
  'SERVICE',
  'DOCUMENT',
  'CERTIFICATE',
  'BENEFIT',
  'REGISTRATION',
  'APPLICATION',
  'PROGRAM',
  'LICENSE',
  'PERMIT',
  'OTHER_GOVERNMENT_SERVICE'
];

