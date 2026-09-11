import { Scheme } from '../types';

/**
 * SCHEMESENSE AI — NATIONWIDE REPOSITORY (PART 2)
 * States 8 to 18:
 * - Haryana
 * - Himachal Pradesh
 * - Jharkhand
 * - Karnataka
 * - Kerala
 * - Madhya Pradesh
 * - Maharashtra
 * - Manipur
 * - Meghalaya
 * - Mizoram
 * - Nagaland
 */
export const NATIONWIDE_STATE_SCHEMES_PART_2: Scheme[] = [
  // =========================================================================
  // 8. HARYANA (State)
  // =========================================================================
  {
    id: 'haryana-ppp-old-age-pension',
    recordId: 'HR-SOC-001',
    recordType: 'SCHEME',
    name: 'Haryana Old Age Samman Bhatta (PPP Auto-Sanction)',
    scheme_name: 'Haryana Old Age Samman Bhatta (PPP Auto-Sanction)',
    scheme_type: 'Senior Citizen Social Security Pension',
    governmentLevel: 'State',
    government_level: 'STATE',
    state: 'Haryana',
    department: 'Social Justice, Empowerment & Antyodaya Department, Govt of Haryana',
    category: 'Senior Citizens',
    shortDescription: 'Guaranteed monthly old age pension of ₹3,000 automatically sanctioned through Parivar Pehchan Patra (PPP) upon turning 60.',
    description: 'Provides proactive auto-sanctioned monthly financial support of ₹3,000 directly into the bank accounts of Haryana senior citizens aged 60+ with annual family income up to ₹3,00,000.',
    plainSummary: 'Senior citizens aged 60 and above in Haryana receive ₹3,000 every month directly in their bank account. Through Haryana’s Parivar Pehchan Patra (PPP) system, the pension is automatically approved without needing to visit offices.',
    mainBenefit: '₹3,000 / month Guaranteed Old Age Pension',
    benefits: 'Monthly lifelong pension credited directly to beneficiary bank account.',
    benefitType: 'Direct Cash Transfer',
    eligibility: 'Resident of Haryana aged 60+ verified in Parivar Pehchan Patra with family income under ₹3 Lakh.',
    eligibilityRules: {
      minAge: 60,
      maxIncome: 300000,
      states: ['Haryana'],
      customConditions: [
        'Must be a permanent resident of Haryana verified in Parivar Pehchan Patra (Family ID)',
        'Applicant must be aged 60 years or older',
        'Combined annual income of husband and wife from all sources must not exceed ₹3,00,000'
      ]
    },
    requiredDocuments: [
      { id: 'hr-oas-1', name: 'Parivar Pehchan Patra (Family ID)', whyNeeded: 'Automatic age and family income verification', howToObtain: 'meraparivar.haryana.gov.in', officialLink: 'https://meraparivar.haryana.gov.in', isMandatory: true },
      { id: 'hr-oas-2', name: 'Aadhaar Card', whyNeeded: 'Biometric identity & DBT seeding', howToObtain: 'UIDAI', isMandatory: true },
      { id: 'hr-oas-3', name: 'Aadhaar-Linked Bank Account', whyNeeded: 'Direct deposit', howToObtain: 'Bank branch', isMandatory: true }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Automatic PPP Verification', description: 'When citizen turns 60, system verifies age from birth data in Parivar Pehchan Patra.' },
      { stepNumber: 2, title: 'Field Verification by ADC Office', description: 'Additional Deputy Commissioner office sends consent team to the citizen’s doorstep.' },
      { stepNumber: 3, title: 'Monthly Direct Credit', description: '₹3,000 credited automatically to the bank account every month.' }
    ],
    deadline: 'Proactive Automated Enrollment',
    openingDate: 'Active',
    officialUrl: 'https://pension.haryana.gov.in',
    officialPortal: 'https://meraparivar.haryana.gov.in',
    officialSource: 'https://socialjusticehry.gov.in',
    sourceDocument: 'Haryana Social Justice Gazette Notification No. 1188-SW(1)-2023',
    sourceLastUpdated: 'January 2026',
    lastVerified: 'September 2026',
    isOfficialSourceVerified: true,
    verificationStatus: 'Verified',
    verification_status: 'VERIFIED',
    applicationStatus: 'Open',
    status: 'ACTIVE',
    helpline: '1800-2000-023 (Haryana Parivar Pehchan Patra Helpdesk)'
  },
  {
    id: 'haryana-bhavantar-bharpayee',
    recordId: 'HR-AGRI-002',
    recordType: 'SCHEME',
    name: 'Bhavantar Bharpayee Yojana (BBY) Haryana',
    scheme_name: 'Bhavantar Bharpayee Yojana (BBY) Haryana',
    scheme_type: 'Horticulture Price Deficit Payment',
    governmentLevel: 'State',
    government_level: 'STATE',
    state: 'Haryana',
    department: 'Department of Agriculture & Farmers Welfare, Govt of Haryana',
    category: 'Agriculture',
    shortDescription: 'Price deficit compensation to vegetable, fruit, and bajra/millet farmers when market wholesale price falls below protected benchmark.',
    description: 'Protects vegetable, fruit, and millet farmers against market price volatility by directly transferring the deficit difference between actual mandi selling price and state assured base price.',
    plainSummary: 'If market prices fall below the government benchmark for potatoes, tomatoes, onions, cauliflower, or bajra, the Haryana government pays the deficit amount directly into your bank account.',
    mainBenefit: 'Deficit Price Difference Compensation (Direct to Bank Account)',
    benefits: 'Direct cash compensation for horticulture market price crashes.',
    benefitType: 'Subsidy',
    eligibility: 'Farmer in Haryana registered on Meri Fasal Mera Byora portal.',
    eligibilityRules: {
      requiresFarmer: true,
      states: ['Haryana'],
      occupations: ['Farmer'],
      customConditions: [
        'Cultivator farmer residing in Haryana growing notified horticulture crops or millets',
        'Mandatory prior crop registration on Meri Fasal Mera Byora (MFMB) portal',
        'Sale must take place in registered Haryana APMC mandis'
      ]
    },
    requiredDocuments: [
      { id: 'hr-bby-1', name: 'Meri Fasal Mera Byora (MFMB) Registration Slip', whyNeeded: 'Proves crop acreage and sowing verification', howToObtain: 'fasal.haryana.gov.in', officialLink: 'https://fasal.haryana.gov.in', isMandatory: true },
      { id: 'hr-bby-2', name: 'Mandi J-Form (Sale Receipt)', whyNeeded: 'Proves price and quantity sold in APMC market', howToObtain: 'Haryana State Agricultural Marketing Board (HSAMB)', isMandatory: true },
      { id: 'hr-bby-3', name: 'Aadhaar-Linked Bank Account', whyNeeded: 'Direct deficit reimbursement', howToObtain: 'Bank branch', isMandatory: true }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Register Crop on MFMB', description: 'Log in to fasal.haryana.gov.in during the sowing season and declare crop acreage.' },
      { stepNumber: 2, title: 'Sell in Mandi with J-Form', description: 'Sell produce at local Haryana APMC grain/vegetable market.' },
      { stepNumber: 3, title: 'Deficit DBT Transfer', description: 'Agriculture Department calculates gap vs benchmark and deposits deficit into bank account.' }
    ],
    deadline: 'Seasonal Crop Sowing Window',
    openingDate: 'Active',
    officialUrl: 'https://fasal.haryana.gov.in',
    officialPortal: 'https://fasal.haryana.gov.in',
    officialSource: 'https://agriharyana.gov.in',
    sourceDocument: 'Haryana Govt Notification No. 1204-Agri-II(1)-2017/23908',
    sourceLastUpdated: 'May 2026',
    lastVerified: 'September 2026',
    isOfficialSourceVerified: true,
    verificationStatus: 'Verified',
    verification_status: 'VERIFIED',
    applicationStatus: 'Open',
    status: 'ACTIVE',
    helpline: '1800-180-2117 (Meri Fasal Mera Byora Toll-Free)'
  },

  // =========================================================================
  // 9. HIMACHAL PRADESH (State)
  // =========================================================================
  {
    id: 'hp-himcare-scheme',
    recordId: 'HP-HLT-001',
    recordType: 'SCHEME',
    name: 'Himcare Scheme Himachal Pradesh',
    scheme_name: 'Himcare Scheme Himachal Pradesh',
    scheme_type: 'Cashless Universal Healthcare',
    governmentLevel: 'State',
    government_level: 'STATE',
    state: 'Himachal Pradesh',
    department: 'Department of Health & Family Welfare, Govt of Himachal Pradesh',
    category: 'Healthcare',
    shortDescription: 'Cashless hospital treatment up to ₹5,00,000 per family per year for Himachal residents not covered under Ayushman Bharat.',
    description: 'Provides cashless treatment in empaneled public and private hospitals up to ₹5 Lakh per year for families of Himachal Pradesh on a floater basis.',
    plainSummary: 'Resident families of Himachal Pradesh who do not have Ayushman Bharat cards receive ₹5,00,000 in free cashless hospital medical cover across all empaneled hospitals.',
    mainBenefit: '₹5,00,000 / year Cashless Hospital Treatment per Family',
    benefits: 'Cashless secondary and tertiary hospitalization coverage.',
    benefitType: 'Insurance',
    eligibility: 'Permanent resident of Himachal Pradesh not covered under Ayushman Bharat or government employee medical rules.',
    eligibilityRules: {
      states: ['Himachal Pradesh'],
      customConditions: [
        'Must be a permanent resident of Himachal Pradesh possessing a valid state ration card',
        'Must NOT be an existing beneficiary of Ayushman Bharat (PM-JAY)',
        'Must NOT be a regular government employee or pensioner receiving medical reimbursement'
      ]
    },
    requiredDocuments: [
      { id: 'hp-hc-1', name: 'Digital State Ration Card', whyNeeded: 'Proves family unit and state domicile', howToObtain: 'Food, Civil Supplies Dept HP', isMandatory: true },
      { id: 'hp-hc-2', name: 'Aadhaar Cards of All Family Members', whyNeeded: 'Identity authentication & card creation', howToObtain: 'UIDAI', isMandatory: true },
      { id: 'hp-hc-3', name: 'Category Certificate (BPL/EWS/Senior/Street Vendor)', whyNeeded: 'Determines nominal premium slab (free for BPL/Divyang)', howToObtain: 'Tehsildar / Competent Authority', isMandatory: false }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Apply on HPSBYS Portal', description: 'Visit hpsbys.in or apply at nearest Lok Mitra Kendra (LMK).' },
      { stepNumber: 2, title: 'Upload Ration Card & Aadhaar', description: 'Enter ration card number to auto-populate family details.' },
      { stepNumber: 3, title: 'Download Himcare Card', description: 'Card activated instantly for cashless hospital admission.' }
    ],
    deadline: 'Rolling Continuous Enrollment',
    openingDate: 'Active',
    officialUrl: 'https://hpsbys.in',
    officialPortal: 'https://hpsbys.in',
    officialSource: 'https://himachal.nic.in',
    sourceDocument: 'HP Health Dept Notification No. HFW-B(F)4-9/2018',
    sourceLastUpdated: 'April 2026',
    lastVerified: 'September 2026',
    isOfficialSourceVerified: true,
    verificationStatus: 'Verified',
    verification_status: 'VERIFIED',
    applicationStatus: 'Open',
    status: 'ACTIVE',
    helpline: '104 / 0177-2629840 (Himcare Helpdesk Shimla)'
  },
  {
    id: 'hp-mukhya-mantri-swavlamban',
    recordId: 'HP-IND-002',
    recordType: 'SCHEME',
    name: 'Mukhya Mantri Swavlamban Yojana (MMSY) HP',
    scheme_name: 'Mukhya Mantri Swavlamban Yojana (MMSY) HP',
    scheme_type: 'Youth Self-Employment & Capital Subsidy',
    governmentLevel: 'State',
    government_level: 'STATE',
    state: 'Himachal Pradesh',
    department: 'Department of Industries, Govt of Himachal Pradesh',
    category: 'Business',
    shortDescription: '25% to 35% capital investment subsidy on project loans up to ₹1 Crore and 5% interest subvention for 3 years for Himachali youth.',
    description: 'Promotes local entrepreneurship in tourism, homestays, horticulture processing, IT, and light engineering with 25% subsidy for men, 30% for women, and 35% for widows.',
    plainSummary: 'If you are aged 18 to 45 in Himachal Pradesh and want to start a business or homestay with a project cost up to ₹1 Crore, the state gives 25% to 35% capital subsidy plus 5% interest rebate for 3 years.',
    mainBenefit: '25% to 35% Capital Subsidy + 5% Interest Rebate for 3 Years',
    benefits: 'Direct capital subsidy credit on bank loans for viable enterprise projects.',
    benefitType: 'Subsidy',
    eligibility: 'Bonafide Himachali resident aged 18 to 45 years.',
    eligibilityRules: {
      minAge: 18,
      maxAge: 45,
      states: ['Himachal Pradesh'],
      customConditions: [
        'Must be a bonafide resident of Himachal Pradesh',
        'Applicant age must be between 18 and 45 years (up to 50 years for widows)',
        'Eligible for manufacturing, services, tourism, and horticulture ventures'
      ]
    },
    requiredDocuments: [
      { id: 'hp-mmsy-1', name: 'Himachali Bonafide Certificate', whyNeeded: 'Proves permanent Himachal domicile', howToObtain: 'e-District HP (edistrict.hp.gov.in)', officialLink: 'https://edistrict.hp.gov.in', isMandatory: true },
      { id: 'hp-mmsy-2', name: 'Detailed Project Report (DPR)', whyNeeded: 'Outlines business viability, machinery & costs', howToObtain: 'Chartered Accountant / DIC', isMandatory: true },
      { id: 'hp-mmsy-3', name: 'Aadhaar & PAN Card', whyNeeded: 'Identity & financial verification', howToObtain: 'UIDAI / Income Tax Dept', isMandatory: true }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Register on MMSY Portal', description: 'Log in to mmsy.hp.gov.in and fill in personal and proposed enterprise details.' },
      { stepNumber: 2, title: 'District Level Committee (DLC)', description: 'General Manager of District Industries Centre (DIC) scrutinizes and forwards to bank.' },
      { stepNumber: 3, title: 'Loan Disbursement & Subsidy Credit', description: 'Bank sanctions loan and government subsidy is kept in fixed deposit reserve.' }
    ],
    deadline: 'Rolling Continuous Window',
    openingDate: 'Active',
    officialUrl: 'https://mmsy.hp.gov.in',
    officialPortal: 'https://mmsy.hp.gov.in',
    officialSource: 'https://emerginghimachal.hp.gov.in',
    sourceDocument: 'HP Industries Dept Notification No. Ind.II(F)6-1/2018',
    sourceLastUpdated: 'May 2026',
    lastVerified: 'September 2026',
    isOfficialSourceVerified: true,
    verificationStatus: 'Verified',
    verification_status: 'VERIFIED',
    applicationStatus: 'Open',
    status: 'ACTIVE',
    helpline: '0177-2813414 (Directorate of Industries Shimla)'
  },

  // =========================================================================
  // 10. JHARKHAND (State)
  // =========================================================================
  {
    id: 'jharkhand-abua-awas',
    recordId: 'JH-HOU-001',
    recordType: 'SCHEME',
    name: 'Abua Awas Yojana Jharkhand',
    scheme_name: 'Abua Awas Yojana Jharkhand',
    scheme_type: 'Rural Affordable Housing Grant',
    governmentLevel: 'State',
    government_level: 'STATE',
    state: 'Jharkhand',
    department: 'Rural Development Department, Govt of Jharkhand',
    category: 'Housing',
    shortDescription: '₹2,00,000 direct grant in 4 installments for construction of 3-room pucca houses with hygienic kitchen for homeless rural families.',
    description: 'State-funded housing initiative providing ₹2 Lakh in four staged installments plus 95 person-days of wage labor under MGNREGS for rural families without a permanent pucca house.',
    plainSummary: 'Homeless rural families in Jharkhand receive ₹2,00,000 cash assistance directly into their bank account to construct a 3-room pucca house with a kitchen.',
    mainBenefit: '₹2,00,000 Housing Grant in 4 Installments + 95 Days MGNREGA Wages',
    benefits: 'Direct financial assistance for rural home construction.',
    benefitType: 'Subsidy',
    eligibility: 'Rural resident of Jharkhand living in kutcha/dilapidated house or houseless.',
    eligibilityRules: {
      states: ['Jharkhand'],
      customConditions: [
        'Must be a permanent resident of rural Jharkhand',
        'Must not possess a 3-room pucca house anywhere in the state',
        'Must NOT have previously received a pucca house under PMAY-G, Birsa Awas, or Baba Saheb Bhimrao Ambedkar Awas Yojana'
      ]
    },
    requiredDocuments: [
      { id: 'jh-aa-1', name: 'Aadhaar Card & Ration Card', whyNeeded: 'Identity and rural household verification', howToObtain: 'UIDAI / Food Supplies Jharkhand', isMandatory: true },
      { id: 'jh-aa-2', name: 'Land Possession / Vested Land Proof', whyNeeded: 'Proves homestead land where house will be built', howToObtain: 'Anchal Adhikari / Gram Panchayat', isMandatory: true },
      { id: 'jh-aa-3', name: 'Aadhaar-Seeded Bank Passbook', whyNeeded: 'Direct staged DBT transfer', howToObtain: 'Bank branch', isMandatory: true }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Submit at Aapki Yojana Aapki Sarkar Camp', description: 'Submit form during village camps or directly to Gram Panchayat.' },
      { stepNumber: 2, title: 'Gram Sabha Approval', description: 'Gram Sabha prioritizes and verifies beneficiary list.' },
      { stepNumber: 3, title: 'Geo-Tagged Installments', description: 'Funds disbursed in 4 stages (Plinth, Lintel, Roof, and Completion) based on geo-tagged photos.' }
    ],
    deadline: 'Camp-Based Periodic Enrollments',
    openingDate: 'Active',
    officialUrl: 'https://abuaawas.jharkhand.gov.in',
    officialPortal: 'https://abuaawas.jharkhand.gov.in',
    officialSource: 'https://rural.jharkhand.gov.in',
    sourceDocument: 'Rural Development Dept Notification No. 4/PM-01/2023-4122',
    sourceLastUpdated: 'June 2026',
    lastVerified: 'September 2026',
    isOfficialSourceVerified: true,
    verificationStatus: 'Verified',
    verification_status: 'VERIFIED',
    applicationStatus: 'Open',
    status: 'ACTIVE',
    helpline: '1800-345-6540 (Jharkhand Rural Development Helpdesk)'
  },
  {
    id: 'jharkhand-marang-gomke-scholarship',
    recordId: 'JH-EDU-002',
    recordType: 'SCHEME',
    name: 'Marang Gomke Jaipal Singh Munda Overseas Scholarship',
    scheme_name: 'Marang Gomke Jaipal Singh Munda Overseas Scholarship',
    scheme_type: 'Overseas Higher Education Fellowship',
    governmentLevel: 'State',
    government_level: 'STATE',
    state: 'Jharkhand',
    department: 'Scheduled Tribe, SC, Minorities & Backward Classes Welfare Dept, Govt of Jharkhand',
    category: 'Students',
    shortDescription: '100% fully funded scholarship covering tuition and living expenses to pursue Master’s/MPhil degrees in top universities in the UK and Ireland.',
    description: 'Provides complete financial sponsorship (full tuition fee, living expenses, visa, health insurance, and airfare) for up to 25 selected students from SC, ST, OBC, and minority communities of Jharkhand.',
    plainSummary: 'Tribal, Dalit, and backward class students from Jharkhand admitted to premier universities in the United Kingdom or Ireland receive 100% free tuition and living stipends from the state government.',
    mainBenefit: '100% Full Tuition Fee + Annual Living Allowance + International Airfare',
    benefits: 'Full overseas study scholarship.',
    benefitType: 'Reimbursement',
    eligibility: 'Resident of Jharkhand from ST, SC, OBC, or Minority community holding admission offer from recognized UK/Ireland university.',
    eligibilityRules: {
      maxAge: 35,
      maxIncome: 1200000,
      states: ['Jharkhand'],
      occupations: ['Student'],
      customConditions: [
        'Must be a permanent resident of Jharkhand belonging to ST, SC, OBC, or Minority category',
        'Must have secured unconditional or conditional admission offer from notified institutions in UK/Ireland',
        'Applicant must have at least 55% marks in undergraduate degree',
        'Age must be 35 years or less'
      ]
    },
    requiredDocuments: [
      { id: 'jh-mg-1', name: 'University Offer Letter (UK/Ireland)', whyNeeded: 'Proves admission into approved Master/MPhil program', howToObtain: 'Admitting University', isMandatory: true },
      { id: 'jh-mg-2', name: 'Caste Certificate (ST/SC/BC)', whyNeeded: 'Proves reserved category status in Jharkhand', howToObtain: 'Jharsewa Portal (jharsewa.jharkhand.gov.in)', officialLink: 'https://jharsewa.jharkhand.gov.in', isMandatory: true },
      { id: 'jh-mg-3', name: 'Jharkhand Domicile & Income Certificate', whyNeeded: 'Proves state residence & income under ₹12 Lakh', howToObtain: 'Circle Officer / SDO', isMandatory: true }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Online Application', description: 'Apply on maranggomke.jharkhand.gov.in and submit university admission letter.' },
      { stepNumber: 2, title: 'State Selection Committee Interview', description: 'High-level committee evaluates academic profile and statements of purpose.' },
      { stepNumber: 3, title: 'Direct Award & Fee Transfer', description: 'State government transfers tuition fees directly to UK university and living stipend to student.' }
    ],
    deadline: 'Annual Cohort (Typically May - June)',
    openingDate: 'March 2026',
    officialUrl: 'https://maranggomke.jharkhand.gov.in',
    officialPortal: 'https://maranggomke.jharkhand.gov.in',
    officialSource: 'https://jharkhand.gov.in',
    sourceDocument: 'Tribal Welfare Dept Notification No. 12/Scheme-02/2020-562',
    sourceLastUpdated: 'March 2026',
    lastVerified: 'September 2026',
    isOfficialSourceVerified: true,
    verificationStatus: 'Verified',
    verification_status: 'VERIFIED',
    applicationStatus: 'Open',
    status: 'ACTIVE',
    helpline: '0651-2446282 (Welfare Department Ranchi)'
  },

  // =========================================================================
  // 11. KARNATAKA (State)
  // =========================================================================
  {
    id: 'karnataka-gruha-lakshmi',
    recordId: 'KA-WOM-001',
    recordType: 'SCHEME',
    name: 'Gruha Lakshmi Scheme Karnataka',
    scheme_name: 'Gruha Lakshmi Scheme Karnataka',
    scheme_type: 'Women Household Empowerment DBT',
    governmentLevel: 'State',
    government_level: 'STATE',
    state: 'Karnataka',
    department: 'Department of Women and Child Development, Govt of Karnataka',
    category: 'Women',
    shortDescription: '₹2,000 monthly Direct Benefit Transfer to the woman head of household in every eligible family in Karnataka.',
    description: 'Guarantees ₹2,000 per month directly into bank accounts of female heads of households designated on Antyodaya, BPL, and APL ration cards to support domestic welfare.',
    plainSummary: 'The female head of family listed on the ration card in Karnataka receives ₹2,000 every month directly in her bank account via DBT.',
    mainBenefit: '₹2,000 / month (₹24,000 / year Direct Cash Transfer)',
    benefits: 'Monthly cash benefit credited to bank account.',
    benefitType: 'Direct Cash Transfer',
    eligibility: 'Woman listed as head of household on valid Karnataka Ration Card (APL/BPL/AAY).',
    eligibilityRules: {
      gender: 'Female',
      states: ['Karnataka'],
      customConditions: [
        'Must be named as woman head of family on Karnataka state ration card (APL / BPL / Antyodaya)',
        'Applicant or her husband must NOT be an income tax payer or GST filer',
        'Applicant must have an active bank account linked with Aadhaar NPCI mapper'
      ]
    },
    requiredDocuments: [
      { id: 'ka-gl-1', name: 'Karnataka Ration Card (BPL/APL/AAY)', whyNeeded: 'Proves woman head of family designation', howToObtain: 'Food, Civil Supplies Dept Karnataka', isMandatory: true },
      { id: 'ka-gl-2', name: 'Aadhaar Card of Woman & Husband', whyNeeded: 'Biometric identity & e-KYC', howToObtain: 'UIDAI', isMandatory: true },
      { id: 'ka-gl-3', name: 'Aadhaar-Seeded Bank Passbook', whyNeeded: 'Receives direct DBT transfer', howToObtain: 'Bank branch', isMandatory: true }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Visit Seva Sindhu / Bangalore One / Grama One', description: 'Visit Seva Sindhu center or apply online at sevasindhu.karnataka.gov.in.' },
      { stepNumber: 2, title: 'Biometric e-KYC', description: 'Operator authenticates ration card and Aadhaar details.' },
      { stepNumber: 3, title: 'Monthly Credit', description: '₹2,000 disbursed on fixed schedule every month.' }
    ],
    deadline: 'Rolling Continuous Window',
    openingDate: 'Active',
    officialUrl: 'https://sevasindhuservices.karnataka.gov.in',
    officialPortal: 'https://sevasindhuservices.karnataka.gov.in',
    officialSource: 'https://wcd.karnataka.gov.in',
    sourceDocument: 'Govt Order No. WCD 134 BBS 2023, Govt of Karnataka',
    sourceLastUpdated: 'July 2026',
    lastVerified: 'September 2026',
    isOfficialSourceVerified: true,
    verificationStatus: 'Verified',
    verification_status: 'VERIFIED',
    applicationStatus: 'Open',
    status: 'ACTIVE',
    helpline: '1902 / 080-22279954 (Gruha Lakshmi Helpline Karnataka)'
  },
  {
    id: 'karnataka-yuva-nidhi',
    recordId: 'KA-YTH-002',
    recordType: 'SCHEME',
    name: 'Yuva Nidhi Scheme Karnataka',
    scheme_name: 'Yuva Nidhi Scheme Karnataka',
    scheme_type: 'Unemployment Financial Support & Skill Training',
    governmentLevel: 'State',
    government_level: 'STATE',
    state: 'Karnataka',
    department: 'Department of Skill Development, Entrepreneurship & Livelihood, Govt of Karnataka',
    category: 'Students',
    shortDescription: 'Monthly unemployment allowance of ₹3,000 for degree holders and ₹1,500 for diploma holders for up to 2 years while seeking employment.',
    description: 'Provides monthly cash support and free job training for unemployed graduates and diploma holders of Karnataka domicile who remain without jobs after 180 days of graduation.',
    plainSummary: 'Unemployed college graduates in Karnataka receive ₹3,000 per month and diploma holders receive ₹1,500 per month for up to 2 years, plus free skill training to help secure a job.',
    mainBenefit: '₹3,000 / month (Degree) or ₹1,500 / month (Diploma) for up to 24 Months',
    benefits: 'Monthly unemployment allowance directly to student bank account.',
    benefitType: 'Direct Cash Transfer',
    eligibility: 'Resident of Karnataka who passed degree/diploma in the preceding academic year and is unemployed after 180 days.',
    eligibilityRules: {
      maxAge: 30,
      states: ['Karnataka'],
      occupations: ['Unemployed', 'Student'],
      customConditions: [
        'Must be a permanent resident of Karnataka (studied in Karnataka for at least 6 years)',
        'Must have passed graduation or diploma degree from a recognized university/board',
        'Must have completed 180 days post-passing without securing employment or higher education admission',
        'Must NOT be employed in private or public sector or self-employed'
      ]
    },
    requiredDocuments: [
      { id: 'ka-yn-1', name: 'Degree / Diploma Certificate & Marks Cards', whyNeeded: 'Proves qualification and graduation year', howToObtain: 'Graduating University / Board', isMandatory: true },
      { id: 'ka-yn-2', name: 'Karnataka Domicile / Study Certificate', whyNeeded: 'Proves 6 years of study in Karnataka', howToObtain: 'School/College Head', isMandatory: true },
      { id: 'ka-yn-3', name: 'Self-Declaration of Unemployment', whyNeeded: 'Affidavit confirming no active job or business', howToObtain: 'Online portal declaration', isMandatory: true }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Register on Seva Sindhu', description: 'Log in to sevasindhugs.karnataka.gov.in and select Yuva Nidhi.' },
      { stepNumber: 2, title: 'Enter University Reg Number', description: 'System fetches marks and degree verification via NAD / State Education Portal.' },
      { stepNumber: 3, title: 'Monthly Self-Declaration & DBT', description: 'Submit monthly online declaration of continued unemployment to trigger allowance.' }
    ],
    deadline: 'Rolling Continuous Window',
    openingDate: 'Active',
    officialUrl: 'https://sevasindhugs.karnataka.gov.in',
    officialPortal: 'https://sevasindhugs.karnataka.gov.in',
    officialSource: 'https://skilldevelopment.karnataka.gov.in',
    sourceDocument: 'Govt Order No. SDEL 43 DES 2023, Govt of Karnataka',
    sourceLastUpdated: 'May 2026',
    lastVerified: 'September 2026',
    isOfficialSourceVerified: true,
    verificationStatus: 'Verified',
    verification_status: 'VERIFIED',
    applicationStatus: 'Open',
    status: 'ACTIVE',
    helpline: '1800-599-9918 (Yuva Nidhi Toll-Free)'
  },

  // =========================================================================
  // 12. KERALA (State)
  // =========================================================================
  {
    id: 'kerala-kasp-scheme',
    recordId: 'KL-HLT-001',
    recordType: 'SCHEME',
    name: 'Karunya Arogya Suraksha Padhathi (KASP) Kerala',
    scheme_name: 'Karunya Arogya Suraksha Padhathi (KASP) Kerala',
    scheme_type: 'Comprehensive Cashless Hospitalization',
    governmentLevel: 'State',
    government_level: 'STATE',
    state: 'Kerala',
    department: 'State Health Agency (SHA), Department of Health & Family Welfare, Govt of Kerala',
    category: 'Healthcare',
    shortDescription: 'Cashless hospital treatment up to ₹5,00,000 per family per year across empaneled public and private hospitals in Kerala.',
    description: 'Converges Ayushman Bharat with state health initiatives to cover 42+ lakh poor and vulnerable families in Kerala with cashless secondary and tertiary medical treatment.',
    plainSummary: 'Eligible families in Kerala receive ₹5,00,000 per year for free cashless hospital surgery and medical treatment in government and empaneled private hospitals.',
    mainBenefit: '₹5,00,000 / year Cashless Hospital Treatment per Family',
    benefits: 'Cashless hospitalization coverage.',
    benefitType: 'Insurance',
    eligibility: 'Resident of Kerala holding priority ration card (Pink/Yellow) or enrolled under Karunya Benevolent Fund.',
    eligibilityRules: {
      states: ['Kerala'],
      customConditions: [
        'Must be a resident of Kerala listed in SECC 2011 or holding priority ration card (AAY / PHH)',
        'Card covers all members listed in the household ration card',
        'Valid in all government medical colleges and empaneled private super-specialty hospitals'
      ]
    },
    requiredDocuments: [
      { id: 'kl-kasp-1', name: 'Kerala Ration Card (Pink or Yellow priority card)', whyNeeded: 'Proves household priority eligibility', howToObtain: 'Civil Supplies Dept Kerala', isMandatory: true },
      { id: 'kl-kasp-2', name: 'Aadhaar Card of Patient', whyNeeded: 'Biometric hospital admission authentication', howToObtain: 'UIDAI', isMandatory: true }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Visit Hospital KASP Kiosk', description: 'Approach the dedicated KASP Arogyamithra desk at the empaneled hospital.' },
      { stepNumber: 2, title: 'Biometric Authentication', description: 'Arogyamithra scans Aadhaar and validates ration card on the SHA portal.' },
      { stepNumber: 3, title: 'Cashless Pre-Authorization', description: 'Hospital issues instant pre-authorization and provides cashless treatment.' }
    ],
    deadline: 'Active Continuous Coverage',
    openingDate: 'Active',
    officialUrl: 'https://sha.kerala.gov.in',
    officialPortal: 'https://sha.kerala.gov.in',
    officialSource: 'https://dhs.kerala.gov.in',
    sourceDocument: 'G.O.(P) No. 18/2020/H&FWD, Govt of Kerala',
    sourceLastUpdated: 'May 2026',
    lastVerified: 'September 2026',
    isOfficialSourceVerified: true,
    verificationStatus: 'Verified',
    verification_status: 'VERIFIED',
    applicationStatus: 'Open',
    status: 'ACTIVE',
    helpline: '1056 / 1800-425-1073 (DISHA Kerala Health Helpline)'
  },
  {
    id: 'kerala-life-mission',
    recordId: 'KL-HOU-002',
    recordType: 'SCHEME',
    name: 'LIFE Mission Housing Scheme Kerala',
    scheme_name: 'LIFE Mission Housing Scheme Kerala',
    scheme_type: 'Comprehensive Housing for Landless & Homeless',
    governmentLevel: 'State',
    government_level: 'STATE',
    state: 'Kerala',
    department: 'Local Self Government Department (LSGD), Govt of Kerala',
    category: 'Housing',
    shortDescription: '₹4,00,000 financial assistance for land-owning homeless families, or free apartment dwelling for landless homeless families in Kerala.',
    description: 'Flagship housing mission ensuring safe, permanent homes with electricity, water, and sanitation for landless and homeless citizens across panchayats and municipalities in Kerala.',
    plainSummary: 'Homeless families in Kerala receive ₹4,00,000 in direct assistance to build a durable house if they own land, or receive a free flat in a modern government housing complex if they are landless.',
    mainBenefit: '₹4,00,000 Construction Subsidy or Free Government Housing Unit',
    benefits: 'Direct financial assistance for house construction.',
    benefitType: 'Subsidy',
    eligibility: 'Homeless or landless resident of Kerala verified by Local Self Government body.',
    eligibilityRules: {
      states: ['Kerala'],
      customConditions: [
        'Must be a permanent resident of Kerala without a habitable pucca home',
        'Annual household income must be within BPL norms (under ₹1,00,000)',
        'Priority to families headed by women, widows, palliative patients, and SC/ST households'
      ]
    },
    requiredDocuments: [
      { id: 'kl-life-1', name: 'Kerala Ration Card', whyNeeded: 'Proves economic status & family members', howToObtain: 'Civil Supplies Dept', isMandatory: true },
      { id: 'kl-life-2', name: 'Land Title Deed (Aadheyam / Thandapper)', whyNeeded: 'Proves land ownership for house building (if applicable)', howToObtain: 'Village Office / Sub-Registrar', isMandatory: false },
      { id: 'kl-life-3', name: 'Caste & Income Certificate', whyNeeded: 'Validates priority ranking', howToObtain: 'e-District Kerala', officialLink: 'https://edistrict.kerala.gov.in', isMandatory: true }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Apply on LIFE Mission Portal', description: 'Log in to lifemission.kerala.gov.in through Akshaya Centre or personal login.' },
      { stepNumber: 2, title: 'Local Body Scrutiny & Grama Sabha', description: 'Panchayat Secretary inspects site and Grama Sabha finalizes priority list.' },
      { stepNumber: 3, title: 'Staged Fund Disbursement', description: '₹4 Lakh disbursed in 4 milestone installments upon foundation, roof, and finishing.' }
    ],
    deadline: 'Periodic Cohort Ingestion',
    openingDate: 'Active',
    officialUrl: 'https://lifemission.kerala.gov.in',
    officialPortal: 'https://lifemission.kerala.gov.in',
    officialSource: 'https://lsgkerala.gov.in',
    sourceDocument: 'LSGD Govt Order (MS) No. 132/2017/LSGD',
    sourceLastUpdated: 'April 2026',
    lastVerified: 'September 2026',
    isOfficialSourceVerified: true,
    verificationStatus: 'Verified',
    verification_status: 'VERIFIED',
    applicationStatus: 'Open',
    status: 'ACTIVE',
    helpline: '0471-2518175 (LIFE Mission State Office Thiruvananthapuram)'
  },

  // =========================================================================
  // 13. MADHYA PRADESH (State)
  // =========================================================================
  {
    id: 'mp-ladli-behna',
    recordId: 'MP-WOM-001',
    recordType: 'SCHEME',
    name: 'Mukhyamantri Ladli Behna Yojana MP',
    scheme_name: 'Mukhyamantri Ladli Behna Yojana MP',
    scheme_type: 'Women Financial Independence DBT',
    governmentLevel: 'State',
    government_level: 'STATE',
    state: 'Madhya Pradesh',
    department: 'Department of Women & Child Development, Govt of Madhya Pradesh',
    category: 'Women',
    shortDescription: '₹1,250 monthly Direct Benefit Transfer into bank accounts of married women aged 21-60 with family income under ₹2.5 Lakh.',
    description: 'Disburses ₹1,250 per month on the 10th of every month to married, widowed, and divorced women in Madhya Pradesh to foster health, nutrition, and financial autonomy.',
    plainSummary: 'Women aged 21 to 60 in Madhya Pradesh belonging to households with income under ₹2.5 Lakh receive ₹1,250 every month directly in their bank account.',
    mainBenefit: '₹1,250 / month (₹15,000 / year Direct Cash Transfer)',
    benefits: 'Monthly DBT credited into beneficiary bank account.',
    benefitType: 'Direct Cash Transfer',
    eligibility: 'Married woman resident of MP aged 21-60 with annual family income under ₹2.5 Lakh.',
    eligibilityRules: {
      minAge: 21,
      maxAge: 60,
      gender: 'Female',
      maxIncome: 250000,
      states: ['Madhya Pradesh'],
      customConditions: [
        'Must be a permanent resident woman of Madhya Pradesh',
        'Applicant must be married (including widow, divorced, or abandoned)',
        'Age must be between 21 and 60 years',
        'Family must own less than 5 acres of agricultural land and no four-wheeler vehicle'
      ]
    },
    requiredDocuments: [
      { id: 'mp-lb-1', name: 'Samagra ID (Family & Member ID)', whyNeeded: 'State social security registry validation', howToObtain: 'samagra.gov.in', officialLink: 'https://samagra.gov.in', isMandatory: true },
      { id: 'mp-lb-2', name: 'Aadhaar Card', whyNeeded: 'Biometric identity & e-KYC', howToObtain: 'UIDAI', isMandatory: true },
      { id: 'mp-lb-3', name: 'Active Bank Account with Aadhaar DBT Seeding', whyNeeded: 'Receives direct DBT transfer', howToObtain: 'Bank branch', isMandatory: true }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Verify Samagra e-KYC', description: 'Complete Aadhaar e-KYC on the Samagra portal (samagra.gov.in).' },
      { stepNumber: 2, title: 'Submit Form at Camp / Ward', description: 'Visit local Gram Panchayat or Ward office camp where operator fills the online form.' },
      { stepNumber: 3, title: 'Monthly Credit', description: '₹1,250 credited on the 10th of every month.' }
    ],
    deadline: 'Rolling Continuous Window',
    openingDate: 'Active',
    officialUrl: 'https://cmladlibahna.mp.gov.in',
    officialPortal: 'https://cmladlibahna.mp.gov.in',
    officialSource: 'https://mpwcdmis.gov.in',
    sourceDocument: 'WCD Dept Gazette Notification No. F-01-01/2023/50-2',
    sourceLastUpdated: 'July 2026',
    lastVerified: 'September 2026',
    isOfficialSourceVerified: true,
    verificationStatus: 'Verified',
    verification_status: 'VERIFIED',
    applicationStatus: 'Open',
    status: 'ACTIVE',
    helpline: '0755-2700800 (CM Ladli Behna Helpline Bhopal)'
  },
  {
    id: 'mp-sambal-yojana',
    recordId: 'MP-LAB-002',
    recordType: 'SCHEME',
    name: 'Mukhya Mantri Jan Kalyan (Sambal 2.0) Yojana MP',
    scheme_name: 'Mukhya Mantri Jan Kalyan (Sambal 2.0) Yojana MP',
    scheme_type: 'Unorganized Workers Comprehensive Social Security',
    governmentLevel: 'State',
    government_level: 'STATE',
    state: 'Madhya Pradesh',
    department: 'Labour Department, Govt of Madhya Pradesh',
    category: 'Social Welfare',
    shortDescription: 'Comprehensive social security for unorganized workers: ₹4 Lakh accidental death assistance, ₹2 Lakh normal death assistance, and ₹16,000 maternity assistance.',
    description: 'Provides end-to-end protection for unorganized sector workers and their families in Madhya Pradesh, including funeral assistance, disability compensation, and complete tuition fee reimbursement for children in higher education.',
    plainSummary: 'Registered unorganized laborers in Madhya Pradesh receive ₹4 Lakh in accidental death assistance, ₹16,000 for maternity, and 100% free higher education fees for their children.',
    mainBenefit: '₹4,00,000 Accidental Death Cover + ₹16,000 Maternity Benefit + 100% Free College Fees for Children',
    benefits: 'Direct financial protection and welfare subsidies.',
    benefitType: 'Direct Cash Transfer',
    eligibility: 'Unorganized worker resident of MP aged 18 to 60 not paying income tax.',
    eligibilityRules: {
      minAge: 18,
      maxAge: 60,
      states: ['Madhya Pradesh'],
      customConditions: [
        'Must be a resident of Madhya Pradesh working in the unorganized sector',
        'Applicant age must be between 18 and 60 years',
        'Must NOT be an income tax payer or government employee',
        'Must hold less than 1 hectare of agricultural land'
      ]
    },
    requiredDocuments: [
      { id: 'mp-sm-1', name: 'Samagra ID & Aadhaar Card', whyNeeded: 'Proves family identity in MP database', howToObtain: 'samagra.gov.in', isMandatory: true },
      { id: 'mp-sm-2', name: 'Labour Self-Declaration', whyNeeded: 'Affidavit of unorganized worker status', howToObtain: 'Sambal portal', isMandatory: true },
      { id: 'mp-sm-3', name: 'Bank Account Passbook', whyNeeded: 'For direct DBT benefits', howToObtain: 'Bank branch', isMandatory: true }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Apply on Sambal Portal', description: 'Log in to sambal.mp.gov.in using Samagra ID and Aadhaar.' },
      { stepNumber: 2, title: 'Inquiry by Gram Panchayat / Ward Officer', description: 'Local inquiry officer validates worker status within 15 days.' },
      { stepNumber: 3, title: 'Sambal Card Issuance', description: 'Digital Sambal Card issued for accessing cash benefits and education fee waivers.' }
    ],
    deadline: 'Open Throughout the Year',
    openingDate: 'Active',
    officialUrl: 'https://sambal.mp.gov.in',
    officialPortal: 'https://sambal.mp.gov.in',
    officialSource: 'https://labour.mp.gov.in',
    sourceDocument: 'Labour Dept Notification No. 182/2018/16-B',
    sourceLastUpdated: 'May 2026',
    lastVerified: 'September 2026',
    isOfficialSourceVerified: true,
    verificationStatus: 'Verified',
    verification_status: 'VERIFIED',
    applicationStatus: 'Open',
    status: 'ACTIVE',
    helpline: '1800-233-1560 (Sambal 2.0 Helpline)'
  },

  // =========================================================================
  // 14. MAHARASHTRA (State)
  // =========================================================================
  {
    id: 'mh-ladki-bahin-yojana',
    recordId: 'MH-WOM-001',
    recordType: 'SCHEME',
    name: 'Mukhyamantri Majhi Ladki Bahin Yojana Maharashtra',
    scheme_name: 'Mukhyamantri Majhi Ladki Bahin Yojana Maharashtra',
    scheme_type: 'Women Financial Assistance DBT',
    governmentLevel: 'State',
    government_level: 'STATE',
    state: 'Maharashtra',
    department: 'Women and Child Development Department, Govt of Maharashtra',
    category: 'Women',
    shortDescription: '₹1,500 monthly Direct Benefit Transfer (₹18,000 annually) into bank accounts of women aged 21-65 with family income under ₹2.5 Lakh.',
    description: 'Transfers ₹1,500 per month directly into bank accounts of eligible women in Maharashtra to foster health, nutrition, and financial independence.',
    plainSummary: 'Women aged 21 to 65 residing in Maharashtra with annual family income up to ₹2.5 Lakh receive ₹1,500 every month directly in their Aadhaar-linked bank account.',
    mainBenefit: '₹1,500 / month (₹18,000 / year Direct Bank Transfer)',
    benefits: 'Direct cash transfer credited into woman bank account.',
    benefitType: 'Direct Cash Transfer',
    eligibility: 'Resident woman of Maharashtra aged 21-65 with annual family income under ₹2.5 Lakh.',
    eligibilityRules: {
      minAge: 21,
      maxAge: 65,
      gender: 'Female',
      maxIncome: 250000,
      states: ['Maharashtra'],
      customConditions: [
        'Must be a resident woman of Maharashtra state',
        'Age must be between 21 and 65 years',
        'Annual household income from all sources must not exceed ₹2,50,000 (verified by Income Certificate or Yellow/Orange Ration Card)',
        'No family member must be an income tax payer or permanent government employee'
      ]
    },
    requiredDocuments: [
      { id: 'mh-lb-1', name: 'Aadhaar Card', whyNeeded: 'Identity & DBT e-KYC', howToObtain: 'UIDAI', isMandatory: true },
      { id: 'mh-lb-2', name: 'Maharashtra Domicile / School Leaving / Voter ID', whyNeeded: 'Proves residence in Maharashtra', howToObtain: 'Aaple Sarkar / Tehsil', officialLink: 'https://aaplesarkar.mahaonline.gov.in', isMandatory: true },
      { id: 'mh-lb-3', name: 'Yellow or Orange Ration Card / Income Certificate', whyNeeded: 'Proves income under ₹2.5 Lakh', howToObtain: 'Food, Civil Supplies Dept / Tehsil', isMandatory: true },
      { id: 'mh-lb-4', name: 'Aadhaar-Linked Bank Account Passbook', whyNeeded: 'Direct monthly DBT credit', howToObtain: 'Bank branch', isMandatory: true }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Apply via Nari Shakti Doot App or Portal', description: 'Log in to ladkibahin.maharashtra.gov.in or use the mobile app.' },
      { stepNumber: 2, title: 'Upload Ration Card & Bank Details', description: 'Submit Aadhaar number and verify via OTP.' },
      { stepNumber: 3, title: 'Monthly Credit', description: '₹1,500 credited directly into the bank account every month.' }
    ],
    deadline: 'Rolling Continuous Window',
    openingDate: 'Active',
    officialUrl: 'https://ladkibahin.maharashtra.gov.in',
    officialPortal: 'https://ladkibahin.maharashtra.gov.in',
    officialSource: 'https://womenchild.maharashtra.gov.in',
    sourceDocument: 'Govt Resolution No. MAMA-2024/C.R.76/Ka-02, WCD Dept',
    sourceLastUpdated: 'August 2026',
    lastVerified: 'September 2026',
    isOfficialSourceVerified: true,
    verificationStatus: 'Verified',
    verification_status: 'VERIFIED',
    applicationStatus: 'Open',
    status: 'ACTIVE',
    helpline: '181 / 022-22025251 (Women & Child Development Helpline Mumbai)'
  },
  {
    id: 'mh-mjpjay-scheme',
    recordId: 'MH-HLT-002',
    recordType: 'SCHEME',
    name: 'Mahatma Jyotirao Phule Jan Arogya Yojana (MJPJAY)',
    scheme_name: 'Mahatma Jyotirao Phule Jan Arogya Yojana (MJPJAY)',
    scheme_type: 'Universal Cashless Hospitalization Coverage',
    governmentLevel: 'State',
    government_level: 'STATE',
    state: 'Maharashtra',
    department: 'State Health Assurance Society, Public Health Department, Govt of Maharashtra',
    category: 'Healthcare',
    shortDescription: 'Universal cashless health coverage up to ₹5,00,000 per family per year across 1,356 surgical and medical procedures in Maharashtra.',
    description: 'Expanded state health insurance scheme covering all ration card holding resident families in Maharashtra for up to ₹5 Lakh per year for critical illnesses, surgeries, and cancer therapies.',
    plainSummary: 'All families in Maharashtra holding a ration card are eligible for up to ₹5,00,000 free cashless hospital treatment and surgeries in over 1,000 empaneled hospitals.',
    mainBenefit: '₹5,00,000 / year Cashless Hospital Cover per Family across 1,356 Procedures',
    benefits: 'Cashless hospital treatment for surgeries, ICU, and medications.',
    benefitType: 'Insurance',
    eligibility: 'Resident family of Maharashtra holding a valid state ration card (Yellow, Orange, or White).',
    eligibilityRules: {
      states: ['Maharashtra'],
      customConditions: [
        'Must be a resident family of Maharashtra holding a valid Yellow, Orange, or White Ration Card',
        'Covers all pre-existing conditions from Day 1',
        'Treatment available across all government and empaneled private network hospitals'
      ]
    },
    requiredDocuments: [
      { id: 'mh-mjp-1', name: 'Maharashtra Ration Card', whyNeeded: 'Validates family unit in state database', howToObtain: 'Food, Civil Supplies Dept', isMandatory: true },
      { id: 'mh-mjp-2', name: 'Aadhaar Card / Voter ID of Patient', whyNeeded: 'Biometric identity for hospital admission', howToObtain: 'UIDAI', isMandatory: true }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Visit Empaneled Hospital Arogyamitra Desk', description: 'Approach the Arogyamitra stationed at any empaneled hospital in Maharashtra.' },
      { stepNumber: 2, title: 'Diagnosis & Pre-Authorization', description: 'Treating doctor uploads diagnostic records and submits online pre-authorization.' },
      { stepNumber: 3, title: 'Cashless Discharge', description: 'Full treatment, surgery, tests, and 10 days of post-discharge medications provided free of cost.' }
    ],
    deadline: 'Active Continuous Universal Coverage',
    openingDate: 'Active',
    officialUrl: 'https://jeevandayee.gov.in',
    officialPortal: 'https://jeevandayee.gov.in',
    officialSource: 'https://arogya.maharashtra.gov.in',
    sourceDocument: 'Public Health Dept Govt Resolution No. MJPJAY-2023/C.R.184/Arogya-6',
    sourceLastUpdated: 'May 2026',
    lastVerified: 'September 2026',
    isOfficialSourceVerified: true,
    verificationStatus: 'Verified',
    verification_status: 'VERIFIED',
    applicationStatus: 'Open',
    status: 'ACTIVE',
    helpline: '155388 / 1800-233-2200 (MJPJAY 24x7 Toll-Free)'
  },

  // =========================================================================
  // 15. MANIPUR (State)
  // =========================================================================
  {
    id: 'manipur-cmht-scheme',
    recordId: 'MN-HLT-001',
    recordType: 'SCHEME',
    name: 'Chief Minister-gi Hakshelgi Tengbang (CMHT) Manipur',
    scheme_name: 'Chief Minister-gi Hakshelgi Tengbang (CMHT) Manipur',
    scheme_type: 'Cashless Medical Hospitalization',
    governmentLevel: 'State',
    government_level: 'STATE',
    state: 'Manipur',
    department: 'Department of Health & Family Welfare, Govt of Manipur',
    category: 'Healthcare',
    shortDescription: 'Cashless hospital treatment up to ₹5,00,000 per family per year for poor, widowed, and disabled families in Manipur.',
    description: 'Provides cashless secondary and tertiary medical cover up to ₹5 Lakh per year for Antyodaya Anna Yojana (AAY) card holders, widows, and low-income families in Manipur.',
    plainSummary: 'Poor families, widows, and disabled citizens in Manipur receive up to ₹5,00,000 in free cashless hospital medical care across empaneled hospitals.',
    mainBenefit: '₹5,00,000 / year Cashless Hospital Cover per Family',
    benefits: 'Cashless medical and surgical care.',
    benefitType: 'Insurance',
    eligibility: 'Resident of Manipur belonging to AAY, BPL, widow, or disabled category.',
    eligibilityRules: {
      states: ['Manipur'],
      customConditions: [
        'Must be a permanent resident of Manipur',
        'Must possess AAY (Antyodaya) ration card, BPL card, or be verified as a widow or disabled person',
        'Covers treatments in JNIMS, RIMS, and empaneled hospitals across Manipur and outside the state'
      ]
    },
    requiredDocuments: [
      { id: 'mn-cmht-1', name: 'AAY / BPL Ration Card / Income Certificate', whyNeeded: 'Proves economic category in Manipur', howToObtain: 'DC Office / CAF&PD Dept', isMandatory: true },
      { id: 'mn-cmht-2', name: 'Aadhaar Card of Family Members', whyNeeded: 'Identity & CMHT card generation', howToObtain: 'UIDAI', isMandatory: true }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Enrollment at CMHT Kiosk', description: 'Visit District Hospital or health center enrollment camp.' },
      { stepNumber: 2, title: 'Biometric Capture', description: 'Kiosk operator captures photo and fingerprint and issues instant laminated CMHT card.' },
      { stepNumber: 3, title: 'Cashless Hospitalization', description: 'Produce card at hospital desk for instant cashless pre-authorization.' }
    ],
    deadline: 'Rolling Continuous Enrollment',
    openingDate: 'Active',
    officialUrl: 'https://cmhtmanipur.gov.in',
    officialPortal: 'https://cmhtmanipur.gov.in',
    officialSource: 'https://manipur.gov.in',
    sourceDocument: 'Health Dept Notification No. 2/43/2017-M(CMHT)',
    sourceLastUpdated: 'March 2026',
    lastVerified: 'September 2026',
    isOfficialSourceVerified: true,
    verificationStatus: 'Verified',
    verification_status: 'VERIFIED',
    applicationStatus: 'Open',
    status: 'ACTIVE',
    helpline: '1800-103-2015 (CMHT Toll-Free Manipur)'
  },

  // =========================================================================
  // 16. MEGHALAYA (State)
  // =========================================================================
  {
    id: 'meghalaya-mhis-scheme',
    recordId: 'ML-HLT-001',
    recordType: 'SCHEME',
    name: 'Megha Health Insurance Scheme (MHIS VI)',
    scheme_name: 'Megha Health Insurance Scheme (MHIS VI)',
    scheme_type: 'Universal Health Insurance',
    governmentLevel: 'State',
    government_level: 'STATE',
    state: 'Meghalaya',
    department: 'Department of Health & Family Welfare, Govt of Meghalaya',
    category: 'Healthcare',
    shortDescription: 'Universal cashless health coverage up to ₹5,30,000 per family per year for all residents of Meghalaya.',
    description: 'Universal health insurance covering all citizens of Meghalaya (excluding state/central government employees) providing up to ₹5,30,000 cashless cover converged with PM-JAY.',
    plainSummary: 'All families residing in Meghalaya are entitled to ₹5,30,000 per year for free cashless hospital surgery and medical treatment.',
    mainBenefit: '₹5,30,000 / year Cashless Hospital Cover per Family',
    benefits: 'Cashless hospitalization and critical illness treatment.',
    benefitType: 'Insurance',
    eligibility: 'All permanent residents of Meghalaya holding a valid EPIC / Voter ID or Ration Card.',
    eligibilityRules: {
      states: ['Meghalaya'],
      customConditions: [
        'Open to all permanent residents of Meghalaya regardless of income',
        'Covers all family members listed on the household ration card or voter slip',
        'State and Central government employees are excluded as they have separate reimbursement'
      ]
    },
    requiredDocuments: [
      { id: 'ml-mhis-1', name: 'Electoral Photo Identity Card (EPIC) / Ration Card', whyNeeded: 'Validates Meghalaya residency', howToObtain: 'Election Commission / Food Dept', isMandatory: true },
      { id: 'ml-mhis-2', name: 'Aadhaar Card', whyNeeded: 'Identity authentication', howToObtain: 'UIDAI', isMandatory: true }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Register at Village Camp', description: 'Visit the mobile enrollment camp in your village/locality or local PHC.' },
      { stepNumber: 2, title: 'Biometric Capture', description: 'Operator verifies Voter ID, captures photo, and prints the MHIS smart card.' },
      { stepNumber: 3, title: 'Cashless Access', description: 'Show smart card at any empaneled hospital in Meghalaya or Guwahati.' }
    ],
    deadline: 'Annual Enrollment Drives',
    openingDate: 'Active',
    officialUrl: 'https://mhis.org.in',
    officialPortal: 'https://mhis.org.in',
    officialSource: 'https://meghalaya.gov.in',
    sourceDocument: 'Govt Notification No. Health.99/2012/Pt/310',
    sourceLastUpdated: 'May 2026',
    lastVerified: 'September 2026',
    isOfficialSourceVerified: true,
    verificationStatus: 'Verified',
    verification_status: 'VERIFIED',
    applicationStatus: 'Open',
    status: 'ACTIVE',
    helpline: '1800-345-3644 (MHIS Toll-Free Shillong)'
  },

  // =========================================================================
  // 17. MIZORAM (State)
  // =========================================================================
  {
    id: 'mizoram-health-care-scheme',
    recordId: 'MZ-HLT-001',
    recordType: 'SCHEME',
    name: 'Mizoram State Health Care Scheme (MSHCS)',
    scheme_name: 'Mizoram State Health Care Scheme (MSHCS)',
    scheme_type: 'State Cashless Medical Reimbursement',
    governmentLevel: 'State',
    government_level: 'STATE',
    state: 'Mizoram',
    department: 'Mizoram State Health Care Society, Govt of Mizoram',
    category: 'Healthcare',
    shortDescription: 'Cashless hospital reimbursement up to ₹2,00,000 per family per year for families not covered by PM-JAY in Mizoram.',
    description: 'Provides medical assistance and hospitalization reimbursement up to ₹2 Lakh for resident families in Mizoram with subsidized nominal enrollment contribution.',
    plainSummary: 'Families in Mizoram not covered by Ayushman Bharat receive up to ₹2,00,000 per year in hospital treatment assistance from the state health society.',
    mainBenefit: 'Up to ₹2,00,000 / year Hospitalization Reimbursement per Family',
    benefits: 'Direct cashless treatment or medical reimbursement.',
    benefitType: 'Reimbursement',
    eligibility: 'Permanent resident of Mizoram not covered by PM-JAY or government employee medical rules.',
    eligibilityRules: {
      states: ['Mizoram'],
      customConditions: [
        'Must be a permanent resident of Mizoram',
        'Must not be an active beneficiary of Ayushman Bharat PM-JAY',
        'Annual household enrollment fee of ₹1,000 (subsidized to ₹500 for low income)'
      ]
    },
    requiredDocuments: [
      { id: 'mz-mshcs-1', name: 'Mizoram Domicile / Tribal Certificate', whyNeeded: 'Proves permanent residency in Mizoram', howToObtain: 'DC Office Aizawl / District', isMandatory: true },
      { id: 'mz-mshcs-2', name: 'Ration Card & Aadhaar', whyNeeded: 'Identity and family roster', howToObtain: 'FCS&CA Mizoram', isMandatory: true }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Enrollment at Health Care Desk', description: 'Submit form at the District Medical Superintendent office or online portal.' },
      { stepNumber: 2, title: 'Card Issuance', description: 'Mizoram Health Care Card issued with annual policy validity.' },
      { stepNumber: 3, title: 'Claim Reimbursement / Cashless', description: 'Avail cashless care in state hospitals or claim reimbursement for outside empaneled centers.' }
    ],
    deadline: 'Annual Renewal Season',
    openingDate: 'Active',
    officialUrl: 'https://health.mizoram.gov.in',
    officialPortal: 'https://health.mizoram.gov.in',
    officialSource: 'https://mizoram.gov.in',
    sourceDocument: 'Govt of Mizoram Health Dept Notification No. B.12015/2/2019-HFW',
    sourceLastUpdated: 'April 2026',
    lastVerified: 'September 2026',
    isOfficialSourceVerified: true,
    verificationStatus: 'Verified',
    verification_status: 'VERIFIED',
    applicationStatus: 'Open',
    status: 'ACTIVE',
    helpline: '0389-2325992 (Mizoram Health Care Society Aizawl)'
  },

  // =========================================================================
  // 18. NAGALAND (State)
  // =========================================================================
  {
    id: 'nagaland-cmhis-scheme',
    recordId: 'NL-HLT-001',
    recordType: 'SCHEME',
    name: 'Chief Minister’s Health Insurance Scheme (CMHIS) Nagaland',
    scheme_name: 'Chief Minister’s Health Insurance Scheme (CMHIS) Nagaland',
    scheme_type: 'Universal Health Coverage',
    governmentLevel: 'State',
    government_level: 'STATE',
    state: 'Nagaland',
    department: 'Department of Health and Family Welfare, Govt of Nagaland',
    category: 'Healthcare',
    shortDescription: 'Universal health insurance providing ₹5,00,000 cashless hospital cover per family per year for all indigenous residents of Nagaland.',
    description: 'Comprehensive universal health insurance covering all Indigenous Inhabitants and Permanent Residents of Nagaland for ₹5 Lakh cashless treatment per family per year.',
    plainSummary: 'All indigenous and permanent resident families of Nagaland are entitled to ₹5,00,000 per year for free cashless hospital treatments across India.',
    mainBenefit: '₹5,00,000 / year Cashless Hospital Cover per Family',
    benefits: 'Cashless hospital treatment for general and critical care.',
    benefitType: 'Insurance',
    eligibility: 'Indigenous Inhabitant Certificate (IIC) or Permanent Resident Certificate (PRC) holder in Nagaland.',
    eligibilityRules: {
      states: ['Nagaland'],
      customConditions: [
        'Must be an Indigenous Inhabitant of Nagaland holding valid IIC or holding valid PRC issued on or before 25/04/1977',
        'Covers tertiary and secondary treatments in empaneled hospitals across Nagaland, Assam, and metro cities',
        'Family members validated through state household database'
      ]
    },
    requiredDocuments: [
      { id: 'nl-cmhis-1', name: 'Indigenous Inhabitant Certificate (IIC) / PRC', whyNeeded: 'Proves indigenous resident status in Nagaland', howToObtain: 'Deputy Commissioner Office', isMandatory: true },
      { id: 'nl-cmhis-2', name: 'Aadhaar Card', whyNeeded: 'Biometric identity verification', howToObtain: 'UIDAI', isMandatory: true },
      { id: 'nl-cmhis-3', name: 'Ration Card', whyNeeded: 'Validates family composition', howToObtain: 'Food & Civil Supplies Dept Nagaland', isMandatory: true }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Register on CMHIS Portal', description: 'Log in to cmhis.nagaland.gov.in or visit designated Common Service Centre (CSC).' },
      { stepNumber: 2, title: 'Upload IIC and Aadhaar', description: 'Submit document scans for verification by District Administration.' },
      { stepNumber: 3, title: 'Download CMHIS Card', description: 'Digital CMHIS e-Card generated for cashless hospital admission.' }
    ],
    deadline: 'Rolling Continuous Window',
    openingDate: 'Active',
    officialUrl: 'https://cmhis.nagaland.gov.in',
    officialPortal: 'https://cmhis.nagaland.gov.in',
    officialSource: 'https://nagaland.gov.in',
    sourceDocument: 'Govt Notification No. HFW-28/B-10/CMHIS/2022, Govt of Nagaland',
    sourceLastUpdated: 'May 2026',
    lastVerified: 'September 2026',
    isOfficialSourceVerified: true,
    verificationStatus: 'Verified',
    verification_status: 'VERIFIED',
    applicationStatus: 'Open',
    status: 'ACTIVE',
    helpline: '1800-345-3715 / 0370-2270565 (CMHIS Helpline Kohima)'
  }
];
