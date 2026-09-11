import { Scheme } from '../types';

/**
 * SCHEMESENSE AI — NATIONWIDE REPOSITORY (UNION TERRITORIES)
 * Covers all 8 Union Territories of India:
 * 1. Andaman and Nicobar Islands
 * 2. Chandigarh
 * 3. Dadra and Nagar Haveli and Daman and Diu
 * 4. Delhi (NCT of Delhi)
 * 5. Jammu and Kashmir
 * 6. Ladakh
 * 7. Lakshadweep
 * 8. Puducherry
 */
export const NATIONWIDE_UT_SCHEMES: Scheme[] = [
  // =========================================================================
  // 1. ANDAMAN AND NICOBAR ISLANDS (Union Territory)
  // =========================================================================
  {
    id: 'an-janani-suraksha',
    recordId: 'AN-HLT-001',
    recordType: 'SCHEME',
    name: 'Andaman and Nicobar Janani Suraksha Assistance',
    scheme_name: 'Andaman and Nicobar Janani Suraksha Assistance',
    scheme_type: 'Maternal Health & Institutional Delivery Cash Assistance',
    governmentLevel: 'Union Territory',
    government_level: 'UT',
    state: 'Andaman and Nicobar Islands',
    unionTerritory: 'Andaman and Nicobar Islands',
    department: 'Directorate of Health Services, Andaman and Nicobar Administration',
    category: 'Healthcare',
    shortDescription: 'Cash assistance of ₹1,000 to ₹1,500 plus free referral boat/ambulance transport for pregnant mothers delivering in UT island health institutions.',
    description: 'Promotes institutional delivery and safe motherhood across remote islands of Andaman and Nicobar with direct cash incentive and 100% free marine inter-island medical transit.',
    plainSummary: 'Pregnant mothers delivering in government hospitals and PHCs across the Andaman & Nicobar islands receive cash assistance plus free island-to-island emergency transport.',
    mainBenefit: '₹1,000 to ₹1,500 Cash Support + 100% Free Inter-Island Referral Transport',
    benefits: 'Direct cash transfer and emergency boat ambulance support.',
    benefitType: 'Direct Cash Transfer',
    eligibility: 'Pregnant woman resident of Andaman and Nicobar delivering in a government health facility.',
    eligibilityRules: {
      gender: 'Female',
      states: ['Andaman and Nicobar Islands'],
      customConditions: [
        'Must be a resident of Andaman and Nicobar Islands registered at local Sub-Centre / PHC',
        'Delivery must take place in an island government health facility (G.B. Pant Hospital, CHC, or PHC)',
        'Mother and Child Protection (MCP) card must be duly stamped'
      ]
    },
    requiredDocuments: [
      { id: 'an-js-1', name: 'Maternal and Child Protection (MCP) Card', whyNeeded: 'Proves antenatal registration & checkups', howToObtain: 'Sub-Centre / Anganwadi', isMandatory: true },
      { id: 'an-js-2', name: 'Island Resident / Islander Card or Aadhaar', whyNeeded: 'Validates island domicile', howToObtain: 'District Commissioner Office Port Blair', isMandatory: true },
      { id: 'an-js-3', name: 'Bank Passbook', whyNeeded: 'Direct payment into mother’s account', howToObtain: 'Bank branch in UT', isMandatory: true }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Register at Island PHC', description: 'Register pregnancy in the first trimester at the local health sub-centre.' },
      { stepNumber: 2, title: 'Institutional Delivery', description: 'Undergo delivery at government health centre or Port Blair hospital.' },
      { stepNumber: 3, title: 'Disbursement at Discharge', description: 'Cash / DBT payment processed before hospital discharge.' }
    ],
    deadline: 'Rolling Continuous Window',
    openingDate: 'Active',
    officialUrl: 'https://andaman.gov.in',
    officialPortal: 'https://dhs.andaman.gov.in',
    officialSource: 'https://andaman.gov.in',
    sourceDocument: 'Directorate of Health Services Circular No. DHS/MCH/2021',
    sourceLastUpdated: 'May 2026',
    lastVerified: 'September 2026',
    isOfficialSourceVerified: true,
    verificationStatus: 'Verified',
    verification_status: 'VERIFIED',
    applicationStatus: 'Open',
    status: 'ACTIVE',
    helpline: '102 / 03192-232704 (Health Control Room Port Blair)'
  },

  // =========================================================================
  // 2. CHANDIGARH (Union Territory)
  // =========================================================================
  {
    id: 'chandigarh-disability-pension',
    recordId: 'CH-SOC-001',
    recordType: 'SCHEME',
    name: 'Chandigarh UT Financial Assistance for Persons with Disabilities',
    scheme_name: 'Chandigarh UT Disability Pension Scheme',
    scheme_type: 'Disability Social Security Pension',
    governmentLevel: 'Union Territory',
    government_level: 'UT',
    state: 'Chandigarh',
    unionTerritory: 'Chandigarh',
    department: 'Department of Social Welfare, Chandigarh Administration',
    category: 'Social Welfare',
    shortDescription: 'Monthly pension of ₹1,000 to ₹2,000 for persons with 40%+ benchmark disability residing in Chandigarh UT.',
    description: 'Provides monthly monetary sustenance directly into the bank accounts of disabled residents of Chandigarh whose annual household income does not exceed ₹1,50,000.',
    plainSummary: 'Persons with 40% or more disability living in Chandigarh receive a monthly pension of up to ₹2,000 directly into their bank account from the Chandigarh Administration.',
    mainBenefit: '₹1,000 to ₹2,000 / month Guaranteed Disability Pension',
    benefits: 'Monthly social security pension for life.',
    benefitType: 'Direct Cash Transfer',
    eligibility: 'Resident of Chandigarh for 3+ years with minimum 40% benchmark disability and income under ₹1.5 Lakh.',
    eligibilityRules: {
      maxIncome: 150000,
      states: ['Chandigarh'],
      customConditions: [
        'Must be a bonafide resident of Chandigarh UT for at least 3 years prior to application',
        'Must hold Unique Disability ID (UDID) card or disability certificate of 40% or above',
        'Total family income from all sources must not exceed ₹1,50,000 per annum'
      ]
    },
    requiredDocuments: [
      { id: 'ch-dp-1', name: 'UDID Card / Disability Certificate from GMSH-16 / GMCH-32', whyNeeded: 'Certifies 40%+ disability', howToObtain: 'Medical Board Chandigarh', isMandatory: true },
      { id: 'ch-dp-2', name: '3-Year Chandigarh Residence Proof (Voter ID / Rent Deed / Aadhaar)', whyNeeded: 'Proves 3 years UT residency', howToObtain: 'Election Dept / Estate Office', isMandatory: true },
      { id: 'ch-dp-3', name: 'Income Certificate & Bank Passbook', whyNeeded: 'Validates income and enables DBT', howToObtain: 'Sub-Divisional Magistrate Chandigarh', isMandatory: true }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Apply on Chandigarh e-District Portal', description: 'Log in to chdsw.gov.in or apply at local Sampark Centre.' },
      { stepNumber: 2, title: 'Social Welfare Officer Scrutiny', description: 'District Social Welfare Officer validates UDID with GMCH records.' },
      { stepNumber: 3, title: 'Monthly Direct Credit', description: 'Pension transferred directly to bank account on a monthly basis.' }
    ],
    deadline: 'Rolling Continuous Window',
    openingDate: 'Active',
    officialUrl: 'https://chdsw.gov.in',
    officialPortal: 'https://chandigarh.gov.in',
    officialSource: 'https://chdsw.gov.in',
    sourceDocument: 'Chandigarh Administration Notification No. SW3/Disability/2021/412',
    sourceLastUpdated: 'June 2026',
    lastVerified: 'September 2026',
    isOfficialSourceVerified: true,
    verificationStatus: 'Verified',
    verification_status: 'VERIFIED',
    applicationStatus: 'Open',
    status: 'ACTIVE',
    helpline: '0172-2700062 (Directorate of Social Welfare Chandigarh)'
  },

  // =========================================================================
  // 3. DADRA AND NAGAR HAVELI AND DAMAN AND DIU (Union Territory)
  // =========================================================================
  {
    id: 'dnhdd-fishermen-subsidy',
    recordId: 'DD-AGRI-001',
    recordType: 'SCHEME',
    name: 'DNH & DD Marine Fishermen Boat & Motorization Subsidy',
    scheme_name: 'DNH & DD Marine Fishermen Boat & Motorization Subsidy',
    scheme_type: 'Fisheries Modernization & Livelihood Subsidy',
    governmentLevel: 'Union Territory',
    government_level: 'UT',
    state: 'Dadra and Nagar Haveli and Daman and Diu',
    unionTerritory: 'Dadra and Nagar Haveli and Daman and Diu',
    department: 'Department of Fisheries, Administration of Dadra and Nagar Haveli and Daman and Diu',
    category: 'Agriculture',
    shortDescription: 'Up to 50% capital subsidy on outboard motors (OBM), fishing nets, safety equipment, and ice-boxes for traditional fishermen in Daman and Diu.',
    description: 'Empowers coastal marine fishermen in Daman and Diu by subsidizing up to 50% of the cost of boat motors, insulated boxes, and navigation safety gear to increase sea catch and maritime safety.',
    plainSummary: 'Traditional fishermen in Daman and Diu receive up to 50% government subsidy to purchase boat engines, GPS devices, life jackets, and insulated fish storage boxes.',
    mainBenefit: 'Up to 50% Capital Subsidy on Marine Engines & Equipment',
    benefits: 'Direct capital equipment subsidy.',
    benefitType: 'Subsidy',
    eligibility: 'Registered traditional marine fisherman holding a biometric fisherman card in DNH & DD.',
    eligibilityRules: {
      states: ['Dadra and Nagar Haveli and Daman and Diu'],
      customConditions: [
        'Must be a permanent resident fisherman of Dadra and Nagar Haveli and Daman and Diu',
        'Must possess an active Biometric National Fishermen Identity Card',
        'Fishing boat must be registered with the Mercantile Marine Department / Fisheries Dept'
      ]
    },
    requiredDocuments: [
      { id: 'dd-fm-1', name: 'Biometric Marine Fishermen ID Card', whyNeeded: 'Proves bonafide fisherman status', howToObtain: 'Fisheries Department Daman', isMandatory: true },
      { id: 'dd-fm-2', name: 'Boat Registration Certificate (Form 2)', whyNeeded: 'Proves vessel ownership', howToObtain: 'Fisheries Dept / Ports', isMandatory: true },
      { id: 'dd-fm-3', name: 'Quotation / Tax Invoice for Motor/Gear', whyNeeded: 'Validates purchase value', howToObtain: 'Authorized Marine Equipment Dealer', isMandatory: true }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Submit Application to Fisheries Officer', description: 'Submit form with boat registration at Fisheries Office in Daman, Diu, or Silvassa.' },
      { stepNumber: 2, title: 'Physical Inspection', description: 'Fisheries Inspector inspects craft and verifies engine installation.' },
      { stepNumber: 3, title: 'Subsidy Reimbursement', description: 'Subsidy credited directly into the fisherman’s bank account.' }
    ],
    deadline: 'Rolling Continuous Window',
    openingDate: 'Active',
    officialUrl: 'https://daman.nic.in',
    officialPortal: 'https://daman.nic.in/fisheries.aspx',
    officialSource: 'https://dnh.gov.in',
    sourceDocument: 'Administration Notification No. DF/DMN/SUBSIDY/2020-21/118',
    sourceLastUpdated: 'March 2026',
    lastVerified: 'September 2026',
    isOfficialSourceVerified: true,
    verificationStatus: 'Verified',
    verification_status: 'VERIFIED',
    applicationStatus: 'Open',
    status: 'ACTIVE',
    helpline: '0260-2230973 (Fisheries Department Daman)'
  },

  // =========================================================================
  // 4. DELHI (NCT of Delhi)
  // =========================================================================
  {
    id: 'delhi-ladli-scheme',
    recordId: 'SCH-DEL-017',
    recordType: 'SCHEME',
    name: 'Delhi Ladli Scheme (NCT of Delhi)',
    scheme_name: 'Delhi Ladli Scheme',
    scheme_type: 'Girl Child Welfare & Higher Education Deposit',
    governmentLevel: 'Union Territory',
    government_level: 'UT',
    state: 'Delhi',
    unionTerritory: 'Delhi',
    department: 'Department of Women & Child Development, Govt of NCT of Delhi',
    category: 'Women',
    shortDescription: 'Up to ₹35,000 deposited in fixed deposits at 6 stages from birth to passing Class 12 for daughters of Delhi resident families.',
    description: 'Provides ₹11,000 if born in hospital (or ₹10,000 at home) and ₹5,000 at each admission milestone: Class 1, 6, 9, 10, and 12, maturing with interest when the girl turns 18 and passes Class 10.',
    plainSummary: 'Families in Delhi with annual income under ₹1 Lakh receive up to ₹35,000 deposited into a growing trust fund for their daughter across 6 school milestones, paying out when she turns 18.',
    mainBenefit: 'Up to ₹35,000 Milestone Deposits (Maturing with Compound Interest at Age 18)',
    benefits: 'Trust deposit for girl child higher education.',
    benefitType: 'Direct Cash Transfer',
    eligibility: 'Girl child born in Delhi whose parents have resided in Delhi for at least 3 years with income under ₹1,00,000/year.',
    eligibilityRules: {
      gender: 'Female',
      maxIncome: 100000,
      states: ['Delhi'],
      customConditions: [
        'Parents must be bonafide residents of the National Capital Territory of Delhi for at least 3 years',
        'Annual household income must not exceed ₹1,00,000',
        'Girl child must be born in Delhi and enrolled in a recognized school in Delhi',
        'Limited to two daughters per family'
      ]
    },
    requiredDocuments: [
      { id: 'dl-ls-1', name: '3-Year Delhi Residence Proof (Ration Card / Voter ID / Electricity Bill)', whyNeeded: 'Proves 3 years Delhi residency', howToObtain: 'Competent Authority Delhi', isMandatory: true },
      { id: 'dl-ls-2', name: 'Girl Child Birth Certificate', whyNeeded: 'Confirms birth in Delhi', howToObtain: 'MCD / NDMC', isMandatory: true },
      { id: 'dl-ls-3', name: 'Income Certificate (SDM)', whyNeeded: 'Proves family income under ₹1 Lakh', howToObtain: 'e-District Delhi (edistrict.delhigovt.nic.in)', officialLink: 'https://edistrict.delhigovt.nic.in', isMandatory: true },
      { id: 'dl-ls-4', name: 'School Admission Certificate', whyNeeded: 'Proves milestone class enrollment', howToObtain: 'School Principal', isMandatory: true }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Apply via School or WCD District Office', description: 'School nodal teacher or SBI branch officer assists in submitting form.' },
      { stepNumber: 2, title: 'WCD Scrutiny & Sanction', description: 'District WCD officer verifies birth and residence documents.' },
      { stepNumber: 3, title: 'SBIL Maturity Certificate Issuance', description: 'State Bank of India issues a bond letter tracking deposit and interest.' }
    ],
    deadline: 'Within 1 year of reaching each milestone',
    openingDate: 'Active',
    officialUrl: 'https://wcd.delhi.gov.in',
    officialPortal: 'https://edistrict.delhigovt.nic.in',
    officialSource: 'https://delhi.gov.in',
    sourceDocument: 'Govt of NCT of Delhi Notification No. F.2(44)/DSW/PL/2007',
    sourceLastUpdated: 'May 2026',
    lastVerified: 'September 2026',
    isOfficialSourceVerified: true,
    verificationStatus: 'Verified',
    verification_status: 'VERIFIED',
    applicationStatus: 'Open',
    status: 'ACTIVE',
    helpline: '011-23381611 / 181 (Delhi Women Helpline)'
  },
  {
    id: 'delhi-arogya-nidhi',
    recordId: 'DL-HLT-002',
    recordType: 'SCHEME',
    name: 'Delhi Arogya Nidhi (DAN) & Delhi Arogya Kosh (DAK)',
    scheme_name: 'Delhi Arogya Nidhi & Kosh',
    scheme_type: 'Critical Illness Cashless Medical Aid',
    governmentLevel: 'Union Territory',
    government_level: 'UT',
    state: 'Delhi',
    unionTerritory: 'Delhi',
    department: 'Directorate General of Health Services (DGHS), Govt of NCT of Delhi',
    category: 'Healthcare',
    shortDescription: 'Direct financial assistance up to ₹10,00,000 for treatment of life-threatening and chronic diseases in Delhi government hospitals.',
    description: 'Provides grants up to ₹10 Lakh for major surgeries, cancer chemotherapy, cardiac procedures, and kidney transplants for poor residents living in Delhi for at least 3 years.',
    plainSummary: 'Low-income residents of Delhi receive up to ₹10,00,000 for major surgeries, cancer therapy, and specialized hospital procedures in Delhi government super-specialty hospitals.',
    mainBenefit: 'Up to ₹10,00,000 Financial Grant for Life-Threatening Treatments',
    benefits: 'Direct financial aid for specialized medical interventions.',
    benefitType: 'Reimbursement',
    eligibility: 'Resident of Delhi for 3+ years holding NFSA ration card or monthly income under BPL norms.',
    eligibilityRules: {
      maxIncome: 150000,
      states: ['Delhi'],
      customConditions: [
        'Must be a resident of Delhi for at least 3 continuous years prior to treatment',
        'Treatment must be recommended by a designated Delhi Government super-specialty hospital or AIIMS',
        'Household income must be under BPL criteria or covered under National Food Security card'
      ]
    },
    requiredDocuments: [
      { id: 'dl-dan-1', name: '3-Year Delhi Residence Proof', whyNeeded: 'Validates 3 years continuous Delhi stay', howToObtain: 'Voter ID / Passport / Delhi Ration Card', isMandatory: true },
      { id: 'dl-dan-2', name: 'Medical Treatment Estimate from Govt Hospital', whyNeeded: 'Quantifies medical package and cost breakdown', howToObtain: 'Treating Doctor / Medical Superintendent', isMandatory: true },
      { id: 'dl-dan-3', name: 'Income Certificate from SDM / Ration Card', whyNeeded: 'Proves financial need', howToObtain: 'Revenue Department Delhi', isMandatory: true }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Get Medical Estimate', description: 'Obtain estimate from treating specialist at GB Pant, LNJP, or Delhi State Cancer Institute.' },
      { stepNumber: 2, title: 'Submit to Medical Superintendent', description: 'Hospital committee scrutinizes documents and forwards to DGHS.' },
      { stepNumber: 3, title: 'Direct Fund Sanction to Hospital', description: 'DGHS releases funds directly to the hospital pharmacy/billing cell for cashless surgery.' }
    ],
    deadline: 'Open Throughout the Year (Emergency Processing)',
    openingDate: 'Active',
    officialUrl: 'https://health.delhigovt.nic.in',
    officialPortal: 'https://health.delhigovt.nic.in',
    officialSource: 'https://delhi.gov.in',
    sourceDocument: 'DGHS Delhi Order No. F.25(III)/DHS/NHP/2011/3211',
    sourceLastUpdated: 'May 2026',
    lastVerified: 'September 2026',
    isOfficialSourceVerified: true,
    verificationStatus: 'Verified',
    verification_status: 'VERIFIED',
    applicationStatus: 'Open',
    status: 'ACTIVE',
    helpline: '1031 / 011-22307145 (Delhi Health Services Helpdesk)'
  },

  // =========================================================================
  // 5. JAMMU AND KASHMIR (Union Territory)
  // =========================================================================
  {
    id: 'jk-sehat-scheme',
    recordId: 'JK-HLT-001',
    recordType: 'SCHEME',
    name: 'Ayushman Bharat SEHAT Golden Card Jammu & Kashmir',
    scheme_name: 'Ayushman Bharat SEHAT Golden Card J&K',
    scheme_type: 'Universal Cashless Health Coverage',
    governmentLevel: 'Union Territory',
    government_level: 'UT',
    state: 'Jammu and Kashmir',
    unionTerritory: 'Jammu and Kashmir',
    department: 'State Health Agency, Health & Medical Education Dept, Govt of J&K',
    category: 'Healthcare',
    shortDescription: 'Universal cashless health coverage up to ₹5,00,000 per family per year for 100% of all residents of Jammu and Kashmir.',
    description: 'Provides universal health insurance coverage of ₹5 Lakh per year for all 1.3 crore residents of J&K across 2,000+ medical and surgical packages with zero income criteria.',
    plainSummary: 'Every resident of Jammu and Kashmir is eligible for ₹5,00,000 in free cashless hospital medical treatment and surgery across India with the SEHAT Golden Card.',
    mainBenefit: '₹5,00,000 / year 100% Universal Cashless Health Cover per Family',
    benefits: 'Universal cashless health insurance.',
    benefitType: 'Insurance',
    eligibility: 'All permanent residents and domicile certificate holders of Jammu and Kashmir.',
    eligibilityRules: {
      states: ['Jammu and Kashmir'],
      customConditions: [
        'Open to ALL permanent residents of Jammu and Kashmir regardless of income or employment status',
        'Covers all members registered in the household state NFSA / Non-NFSA ration database',
        'Cashless access across 28,000+ empaneled hospitals across India'
      ]
    },
    requiredDocuments: [
      { id: 'jk-sehat-1', name: 'J&K Ration Card (NFSA or Non-NFSA)', whyNeeded: 'Proves family roster in J&K database', howToObtain: 'Food, Civil Supplies & Consumer Affairs J&K', isMandatory: true },
      { id: 'jk-sehat-2', name: 'Aadhaar Card of Patient', whyNeeded: 'Biometric identity verification', howToObtain: 'UIDAI', isMandatory: true }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Visit CSC or Hospital PMAM Desk', description: 'Visit any Common Service Centre or Pradhan Mantri Arogya Mitra desk at hospital.' },
      { stepNumber: 2, title: 'Biometric e-KYC', description: 'Operator verifies Ration Card and completes Aadhaar fingerprint/iris scan.' },
      { stepNumber: 3, title: 'Instant Golden Card', description: 'SEHAT Golden Card issued instantly for immediate cashless hospitalization.' }
    ],
    deadline: 'Active Continuous Universal Coverage',
    openingDate: 'Active',
    officialUrl: 'https://sehat.jk.gov.in',
    officialPortal: 'https://beneficiary.nha.gov.in',
    officialSource: 'https://jk.gov.in',
    sourceDocument: 'Govt Order No. 907-JK(HME) of 2020, Health & Medical Education Dept',
    sourceLastUpdated: 'May 2026',
    lastVerified: 'September 2026',
    isOfficialSourceVerified: true,
    verificationStatus: 'Verified',
    verification_status: 'VERIFIED',
    applicationStatus: 'Open',
    status: 'ACTIVE',
    helpline: '14555 / 104 (Ayushman Bharat SEHAT J&K Helpline)'
  },
  {
    id: 'jk-mumkin-scheme',
    recordId: 'JK-EMP-002',
    recordType: 'SCHEME',
    name: 'Mumkin Livelihood Scheme J&K (Mission Youth)',
    scheme_name: 'Mumkin Scheme J&K',
    scheme_type: 'Commercial Transport Youth Self-Employment Subsidy',
    governmentLevel: 'Union Territory',
    government_level: 'UT',
    state: 'Jammu and Kashmir',
    unionTerritory: 'Jammu and Kashmir',
    department: 'Mission Youth, Govt of Jammu & Kashmir',
    category: 'Business',
    shortDescription: '20% capital subsidy (up to ₹80,000 Govt subsidy + matching manufacturer discount) for purchasing small commercial vehicles for unemployed youth.',
    description: 'Empowers unemployed youth aged 18 to 35 in Jammu & Kashmir to become commercial transport operators by providing 10% government subsidy, 10% vehicle manufacturer discount, and 80% bank loan with no collateral.',
    plainSummary: 'Unemployed youth in Jammu and Kashmir receive up to ₹1,60,000 in upfront discounts and subsidies to buy small commercial delivery trucks, pick-ups, or passenger taxis with a collateral-free bank loan.',
    mainBenefit: '20% Total Subsidy/Discount on Commercial Vehicles + Zero Collateral Bank Loan',
    benefits: 'Direct capital subsidy and price discount on commercial transport vehicles.',
    benefitType: 'Subsidy',
    eligibility: 'Domicile of J&K aged 18-35 holding valid commercial/transport driving license and registered unemployed.',
    eligibilityRules: {
      minAge: 18,
      maxAge: 35,
      states: ['Jammu and Kashmir'],
      occupations: ['Unemployed'],
      customConditions: [
        'Must be a domicile of Jammu & Kashmir aged between 18 and 35 years',
        'Must possess a valid Commercial/Transport Driving License (LMV/HMV)',
        'Must be registered with the District Employment & Counseling Centre as unemployed',
        'Applicant must NOT already own a commercial vehicle in their name'
      ]
    },
    requiredDocuments: [
      { id: 'jk-mk-1', name: 'J&K Domicile Certificate', whyNeeded: 'Proves permanent J&K domicile', howToObtain: 'Tehsildar / e-Services J&K', officialLink: 'https://jkeservices.gov.in', isMandatory: true },
      { id: 'jk-mk-2', name: 'Commercial Driving License', whyNeeded: 'Authorizes commercial vehicle driving', howToObtain: 'Motor Vehicles Dept J&K', isMandatory: true },
      { id: 'jk-mk-3', name: 'Employment Exchange Registration Card', whyNeeded: 'Confirms unemployed status', howToObtain: 'jakemp.nic.in', isMandatory: true }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Apply on Mission Youth Portal', description: 'Log in to missionyouth.jk.gov.in and select Mumkin Scheme.' },
      { stepNumber: 2, title: 'District Level Task Force (DLTFC) Interview', description: 'Deputy Commissioner committee conducts counseling and approves candidates.' },
      { stepNumber: 3, title: 'Vehicle Handover', description: 'J&K Bank / partner bank disburses loan and dealer delivers vehicle with applied subsidy.' }
    ],
    deadline: 'Rolling Continuous Window',
    openingDate: 'Active',
    officialUrl: 'https://missionyouth.jk.gov.in',
    officialPortal: 'https://missionyouth.jk.gov.in',
    officialSource: 'https://jk.gov.in',
    sourceDocument: 'Mission Youth J&K Guidelines No. FD/MY/2021/118',
    sourceLastUpdated: 'May 2026',
    lastVerified: 'September 2026',
    isOfficialSourceVerified: true,
    verificationStatus: 'Verified',
    verification_status: 'VERIFIED',
    applicationStatus: 'Open',
    status: 'ACTIVE',
    helpline: '0194-2452145 (Mission Youth Srinagar) / 0191-2565646 (Jammu)'
  },

  // =========================================================================
  // 6. LADAKH (Union Territory)
  // =========================================================================
  {
    id: 'ladakh-greenhouse-scheme',
    recordId: 'LA-AGRI-001',
    recordType: 'SCHEME',
    name: 'Ladakh Greenhouse Solar Passive Agriculture Subsidy',
    scheme_name: 'Ladakh Greenhouse Scheme',
    scheme_type: 'High-Altitude Solar Greenhouse Subsidy',
    governmentLevel: 'Union Territory',
    government_level: 'UT',
    state: 'Ladakh',
    unionTerritory: 'Ladakh',
    department: 'Department of Agriculture, UT Administration of Ladakh',
    category: 'Agriculture',
    shortDescription: '75% capital subsidy for erecting solar passive polycarbonate greenhouses to grow fresh vegetables during harsh winter (-30°C) in Ladakh.',
    description: 'Revolutionary high-altitude agricultural technology providing 75% financial subsidy to farmers in Leh and Kargil to construct DIHAR-designed polycarbonate greenhouses producing fresh greens even at -30°C.',
    plainSummary: 'Farmers in Ladakh receive a 75% subsidy to build modern solar greenhouses that trap warmth and grow fresh leafy vegetables throughout the sub-zero winter.',
    mainBenefit: '75% Government Capital Subsidy on Commercial / Domestic Greenhouses',
    benefits: 'Direct capital equipment and construction subsidy.',
    benefitType: 'Subsidy',
    eligibility: 'Farmer resident of Leh or Kargil district with title to agricultural land.',
    eligibilityRules: {
      requiresFarmer: true,
      states: ['Ladakh'],
      occupations: ['Farmer'],
      customConditions: [
        'Must be a resident farmer of UT of Ladakh (Leh or Kargil district)',
        'Must own cultivable land with accessible water source for winter irrigation',
        'Priority to progressive vegetable growers and women self-help groups'
      ]
    },
    requiredDocuments: [
      { id: 'la-gh-1', name: 'Ladakh Resident Certificate / Voter ID', whyNeeded: 'Proves Ladakh residence', howToObtain: 'DC Office Leh / Kargil', isMandatory: true },
      { id: 'la-gh-2', name: 'Revenue Land Title Extract (Fard / Jamabandi)', whyNeeded: 'Proves land site for greenhouse', howToObtain: 'Tehsildar Leh / Kargil', isMandatory: true },
      { id: 'la-gh-3', name: 'Aadhaar Card & Bank Passbook', whyNeeded: 'Direct subsidy transfer', howToObtain: 'UIDAI / Bank', isMandatory: true }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Apply at Chief Agriculture Officer (CAO)', description: 'Submit application at CAO office Leh or Kargil during spring.' },
      { stepNumber: 2, title: 'Site Feasibility Verification', description: 'Agriculture Extension Officer inspects solar orientation and water source.' },
      { stepNumber: 3, title: 'Erection & Subsidy Credit', description: 'Subsidy materials or direct cash grant released upon structural completion.' }
    ],
    deadline: 'Spring Season Intake (March - May)',
    openingDate: 'March 2026',
    officialUrl: 'https://ladakh.gov.in',
    officialPortal: 'https://leh.nic.in',
    officialSource: 'https://ladakh.gov.in',
    sourceDocument: 'UT Ladakh Agriculture Dept Order No. 12-Agri(UTL) of 2021',
    sourceLastUpdated: 'May 2026',
    lastVerified: 'September 2026',
    isOfficialSourceVerified: true,
    verificationStatus: 'Verified',
    verification_status: 'VERIFIED',
    applicationStatus: 'Open',
    status: 'ACTIVE',
    helpline: '01982-252033 (Chief Agriculture Officer Leh)'
  },
  {
    id: 'ladakh-rewa-scheme',
    recordId: 'LA-EDU-002',
    recordType: 'SCHEME',
    name: 'Rewa Scheme for Higher Education Ladakh',
    scheme_name: 'Rewa Scheme Ladakh',
    scheme_type: 'National Competitive Exam Incentive & Coaching Grant',
    governmentLevel: 'Union Territory',
    government_level: 'UT',
    state: 'Ladakh',
    unionTerritory: 'Ladakh',
    department: 'Higher Education Department, UT Administration of Ladakh',
    category: 'Students',
    shortDescription: 'Up to ₹1,00,000 cash incentive and coaching fee reimbursement for meritorious Ladakhi students qualifying NEET, JEE, and UPSC Prelims.',
    description: 'Financial rewards and coaching grants up to ₹1 Lakh for students of Ladakh who clear premier national competitive examinations (NEET UG, JEE Advanced, GATE, UPSC Civil Services Prelims).',
    plainSummary: 'Students from Ladakh who qualify national examinations like NEET, JEE, or UPSC Prelims receive up to ₹1,00,000 cash reward to cover college admissions and coaching fees.',
    mainBenefit: 'Up to ₹1,00,000 Direct Cash Incentive for National Exam Qualifiers',
    benefits: 'Direct financial incentive into student bank account.',
    benefitType: 'Direct Cash Transfer',
    eligibility: 'Student resident of Ladakh who has qualified notified national entrance exams.',
    eligibilityRules: {
      states: ['Ladakh'],
      occupations: ['Student'],
      customConditions: [
        'Must be a permanent resident student of UT of Ladakh',
        'Must have cleared the preliminary/qualifying round of NEET UG, JEE Advanced, or UPSC Civil Services',
        'Family income ceiling of ₹8,00,000 per annum (100% grant for income under ₹5 Lakh)'
      ]
    },
    requiredDocuments: [
      { id: 'la-rw-1', name: 'Ladakh Resident / Domicile Certificate', whyNeeded: 'Proves Ladakh residence', howToObtain: 'DC Office Leh / Kargil', isMandatory: true },
      { id: 'la-rw-2', name: 'Admit Card & Scorecard of National Exam', whyNeeded: 'Evidence of clearing exam cutoff', howToObtain: 'NTA / UPSC', isMandatory: true },
      { id: 'la-rw-3', name: 'Income Certificate & Student Bank Passbook', whyNeeded: 'Validates income tier & DBT', howToObtain: 'Tehsildar / Bank', isMandatory: true }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Submit Form on Ladakh Education Portal', description: 'Log in to leh.nic.in or submit form at Higher Education Dept Leh.' },
      { stepNumber: 2, title: 'Scrutiny of Scorecard', description: 'Verification committee checks NTA/UPSC roll numbers.' },
      { stepNumber: 3, title: 'Direct Bank Transfer', description: 'Incentive amount credited directly into student’s bank account.' }
    ],
    deadline: 'Within 90 days of national exam result declaration',
    openingDate: 'Active',
    officialUrl: 'https://leh.nic.in',
    officialPortal: 'https://leh.nic.in',
    officialSource: 'https://ladakh.gov.in',
    sourceDocument: 'UT Ladakh Higher Education Order No. 04-HE(UTL) of 2021',
    sourceLastUpdated: 'June 2026',
    lastVerified: 'September 2026',
    isOfficialSourceVerified: true,
    verificationStatus: 'Verified',
    verification_status: 'VERIFIED',
    applicationStatus: 'Open',
    status: 'ACTIVE',
    helpline: '01982-252112 (Higher Education Dept Leh)'
  },

  // =========================================================================
  // 7. LAKSHADWEEP (Union Territory)
  // =========================================================================
  {
    id: 'lakshadweep-fisheries-scheme',
    recordId: 'LD-AGRI-001',
    recordType: 'SCHEME',
    name: 'Lakshadweep Island Fishermen Safety & Motorization Subsidy',
    scheme_name: 'Lakshadweep Island Fishermen Subsidy',
    scheme_type: 'Deep Sea Fisheries & Motorization Grant',
    governmentLevel: 'Union Territory',
    government_level: 'UT',
    state: 'Lakshadweep',
    unionTerritory: 'Lakshadweep',
    department: 'Department of Fisheries, UT Administration of Lakshadweep',
    category: 'Agriculture',
    shortDescription: '50% capital subsidy on Outboard Motors (OBM), solar distress radio beacons, and pole-and-line tuna fishing gear for island fishermen.',
    description: 'Protects the traditional pole-and-line skipjack tuna fishing industry of Lakshadweep by providing 50% subsidy on fuel-efficient marine engines and safety distress beacons.',
    plainSummary: 'Island fishermen in Lakshadweep receive 50% government subsidy to purchase outboard boat engines, safety transponders, and pole-and-line tuna fishing gear.',
    mainBenefit: '50% Capital Subsidy on Outboard Boat Motors & Navigation Safety Gear',
    benefits: 'Direct capital equipment subsidy.',
    benefitType: 'Subsidy',
    eligibility: 'Bonafide native island fisherman of Lakshadweep.',
    eligibilityRules: {
      states: ['Lakshadweep'],
      customConditions: [
        'Must be a bonafide native resident fisherman of Lakshadweep',
        'Vessel must be registered with the Port and Fisheries Department Kavaratti',
        'Must hold valid Biometric National Fishermen Identity Card'
      ]
    },
    requiredDocuments: [
      { id: 'ld-fs-1', name: 'Lakshadweep Native Certificate', whyNeeded: 'Proves island native status', howToObtain: 'Sub-Divisional Officer / DC Kavaratti', isMandatory: true },
      { id: 'ld-fs-2', name: 'Boat Registration Certificate & Fishermen ID', whyNeeded: 'Proves boat ownership & fishing license', howToObtain: 'Fisheries Department Kavaratti', isMandatory: true },
      { id: 'ld-fs-3', name: 'Bank Passbook (Syndicate/Canara Bank Kavaratti)', whyNeeded: 'Direct subsidy transfer', howToObtain: 'Bank branch', isMandatory: true }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Submit Form to Island Fisheries Officer', description: 'Submit application at the local island fisheries unit.' },
      { stepNumber: 2, title: 'Vessel Inspection', description: 'Fisheries Officer inspects vessel and certifies suitability for engine fitment.' },
      { stepNumber: 3, title: 'Subsidy Disbursement', description: 'Subsidy released directly to bank account upon installation verification.' }
    ],
    deadline: 'Annual Seasonal Allocation',
    openingDate: 'Active',
    officialUrl: 'https://lakshadweep.gov.in',
    officialPortal: 'https://lakshadweep.gov.in/departments/fisheries',
    officialSource: 'https://lakshadweep.gov.in',
    sourceDocument: 'Directorate of Fisheries Order No. F.No.12/03/2020-FSH',
    sourceLastUpdated: 'May 2026',
    lastVerified: 'September 2026',
    isOfficialSourceVerified: true,
    verificationStatus: 'Verified',
    verification_status: 'VERIFIED',
    applicationStatus: 'Open',
    status: 'ACTIVE',
    helpline: '04896-262234 (Directorate of Fisheries Kavaratti)'
  },

  // =========================================================================
  // 8. PUDUCHERRY (Union Territory)
  // =========================================================================
  {
    id: 'puducherry-old-age-pension',
    recordId: 'PY-SOC-001',
    recordType: 'SCHEME',
    name: 'Puducherry Old Age & Destitute Pension Scheme',
    scheme_name: 'Puducherry Old Age & Destitute Pension Scheme',
    scheme_type: 'Senior Citizen Social Security Pension',
    governmentLevel: 'Union Territory',
    government_level: 'UT',
    state: 'Puducherry',
    unionTerritory: 'Puducherry',
    department: 'Department of Social Welfare, Govt of Puducherry',
    category: 'Senior Citizens',
    shortDescription: 'Monthly social security pension of ₹2,000 to ₹3,500 based on age brackets for senior citizens aged 60+ in Puducherry UT.',
    description: 'Disburses ₹2,000 per month for ages 60-69, ₹2,500 for ages 70-79, and ₹3,500 for ages 80+ directly into bank accounts of low-income senior citizens in Puducherry.',
    plainSummary: 'Senior citizens aged 60 and above in Puducherry receive up to ₹3,500 every month directly in their bank account from the Department of Social Welfare.',
    mainBenefit: '₹2,000 to ₹3,500 / month Age-Graded Pension',
    benefits: 'Monthly social security cash pension for life.',
    benefitType: 'Direct Cash Transfer',
    eligibility: 'Resident of Puducherry for 5+ continuous years aged 60+ with annual income under ₹1,00,000.',
    eligibilityRules: {
      minAge: 60,
      maxIncome: 100000,
      states: ['Puducherry'],
      customConditions: [
        'Must be a permanent resident of Puducherry UT for at least 5 continuous years',
        'Applicant must be aged 60 years or older',
        'Annual household income must not exceed ₹1,00,000'
      ]
    },
    requiredDocuments: [
      { id: 'py-oap-1', name: '5-Year Puducherry Residence Certificate', whyNeeded: 'Proves 5 years UT residency', howToObtain: 'Tahsildar / Taluk Office Puducherry', isMandatory: true },
      { id: 'py-oap-2', name: 'Age Proof (Birth Certificate / Voter ID / Aadhaar)', whyNeeded: 'Confirms age 60+', howToObtain: 'Municipality / Election Dept', isMandatory: true },
      { id: 'py-oap-3', name: 'Income Certificate & Bank Passbook', whyNeeded: 'Validates income under ₹1 Lakh and enables DBT', howToObtain: 'Tahsildar / Bank', isMandatory: true }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Apply on e-District Puducherry', description: 'Visit socwelfare.py.gov.in or apply at local Taluk Social Welfare Office.' },
      { stepNumber: 2, title: 'Welfare Inspector Field Verification', description: 'Social Welfare Inspector verifies age, family members, and residence.' },
      { stepNumber: 3, title: 'Monthly Direct Credit', description: 'Pension transferred directly to bank account on a monthly basis.' }
    ],
    deadline: 'Rolling Continuous Window',
    openingDate: 'Active',
    officialUrl: 'https://socwelfare.py.gov.in',
    officialPortal: 'https://py.gov.in',
    officialSource: 'https://socwelfare.py.gov.in',
    sourceDocument: 'Govt of Puducherry Gazette Notification No. 12/SW/2021',
    sourceLastUpdated: 'May 2026',
    lastVerified: 'September 2026',
    isOfficialSourceVerified: true,
    verificationStatus: 'Verified',
    verification_status: 'VERIFIED',
    applicationStatus: 'Open',
    status: 'ACTIVE',
    helpline: '0413-2205698 (Directorate of Social Welfare Puducherry)'
  },
  {
    id: 'puducherry-kamarajar-financial-assistance',
    recordId: 'PY-EDU-002',
    recordType: 'SCHEME',
    name: 'Perunthalaivar Kamarajar Financial Assistance for Higher Studies',
    scheme_name: 'Perunthalaivar Kamarajar Scheme Puducherry',
    scheme_type: 'Higher Professional Education Tuition Sponsorship',
    governmentLevel: 'Union Territory',
    government_level: 'UT',
    state: 'Puducherry',
    unionTerritory: 'Puducherry',
    department: 'Directorate of Higher & Technical Education (DHTE), Govt of Puducherry',
    category: 'Students',
    shortDescription: '100% tuition fee sponsorship for students of Puducherry admitted through CENTAC to professional colleges (MBBS, B.Tech, BDS, Nursing).',
    description: 'Sponsors full annual tuition fees charged by government and private professional colleges for students of Puducherry domicile admitted through the Centralised Admission Committee (CENTAC).',
    plainSummary: 'Students from Puducherry securing seats through CENTAC in medical (MBBS), engineering (B.Tech), and nursing colleges have their entire college tuition fees paid by the Puducherry government.',
    mainBenefit: '100% Tuition Fee Sponsorship throughout Professional Degree',
    benefits: 'Direct tuition fee payment to admitting professional colleges.',
    benefitType: 'Reimbursement',
    eligibility: 'Resident student of Puducherry securing admission in professional colleges through CENTAC.',
    eligibilityRules: {
      states: ['Puducherry'],
      occupations: ['Student'],
      customConditions: [
        'Must be a resident student of Puducherry (continuous schooling in Puducherry for at least 5 years)',
        'Must have secured admission through CENTAC in MBBS, BDS, B.Tech, B.Pharm, or Nursing courses',
        'Must maintain minimum academic attendance and clear annual exams'
      ]
    },
    requiredDocuments: [
      { id: 'py-pk-1', name: 'CENTAC Seat Allotment Order', whyNeeded: 'Proves centralized merit admission', howToObtain: 'centacpuducherry.in', officialLink: 'https://www.centacpuducherry.in', isMandatory: true },
      { id: 'py-pk-2', name: 'Puducherry Residence / Domicile Certificate', whyNeeded: 'Validates 5 years UT domicile', howToObtain: 'Revenue Department Puducherry', isMandatory: true },
      { id: 'py-pk-3', name: 'College Fee Demand Letter & Bonafide', whyNeeded: 'Proves tuition fee amount', howToObtain: 'College Dean / Principal', isMandatory: true }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Apply via College to DHTE', description: 'Submit Kamarajar assistance form through college administrative office.' },
      { stepNumber: 2, title: 'DHTE CENTAC Verification', description: 'Directorate cross-verifies CENTAC merit list and student details.' },
      { stepNumber: 3, title: 'Direct Fee Settlement', description: 'Govt releases tuition payment directly to the professional college on behalf of the student.' }
    ],
    deadline: 'Annual CENTAC Admission Season (August - October)',
    openingDate: 'Active',
    officialUrl: 'https://dhte.py.gov.in',
    officialPortal: 'https://centacpuducherry.in',
    officialSource: 'https://py.gov.in',
    sourceDocument: 'G.O.Ms.No. 45, Directorate of Higher and Technical Education Puducherry',
    sourceLastUpdated: 'June 2026',
    lastVerified: 'September 2026',
    isOfficialSourceVerified: true,
    verificationStatus: 'Verified',
    verification_status: 'VERIFIED',
    applicationStatus: 'Open',
    status: 'ACTIVE',
    helpline: '0413-2253597 (DHTE Puducherry)'
  }
];
