import { Scheme } from '../types';

export const NATIONWIDE_STATE_SCHOLARSHIPS: Scheme[] = [
  // ==========================================
  // TELANGANA ePASS SCHOLARSHIPS (Authoritative: https://telanganaepass.cgg.gov.in/)
  // ==========================================
  {
    id: 'telangana-epass-post-matric',
    recordId: 'TS-EPASS-PMS-2026',
    recordType: 'SCHOLARSHIP',
    name: 'Telangana Post-Matric Scholarship (ePASS PMS)',
    official_name: 'Post-Matric Scholarships for SC, ST, BC, EBC, Minority & PwD Students',
    short_name: 'Telangana ePASS PMS',
    acronym: 'PMS',
    portal_id: 'telangana-epass',
    aliases: [
      'ePASS',
      'EPASS',
      'e-pass',
      'e pass',
      'E Pass',
      'Telangana ePASS',
      'Telangana EPASS',
      'ePASS scholarship',
      'Telangana scholarship',
      'Telangana post matric scholarship',
      'Post Matric Scholarship Telangana',
      'post matric scholarship telangana',
      'Telangana post-matric scholarship',
      'fee reimbursement telangana',
      'Telangana fee reimbursement',
      'RTF',
      'MTF',
      'scholarship for Telangana students',
      'epass.cgg.gov.in',
      'Telangana scholarship portal',
      'SC scholarship Telangana',
      'ST scholarship Telangana',
      'BC scholarship Telangana',
      'Minority scholarship Telangana'
    ],
    common_names: ['ePASS Scholarship', 'Telangana Fee Reimbursement', 'Telangana PMS'],
    nativeNames: {
      telugu: 'తెలంగాణ ఈ-పాస్ పోస్ట్-మెట్రిక్ స్కాలర్‌షిప్ (ఫీజు రీయింబర్స్‌మెంట్)',
      hindi: 'तेलंगाना ई-पास पोस्ट-मैट्रिक छात्रवृत्ति और शुल्क प्रतिपूर्ति'
    },
    ministry: 'Government of Telangana',
    department: 'Scheduled Castes Development, BC Welfare, Tribal Welfare & Minorities Welfare Departments',
    governmentLevel: 'State',
    government_level: 'STATE',
    state: 'Telangana',
    category: 'Students',
    targetBeneficiary: 'SC, ST, BC, EBC, Minority, and Differently-Abled students studying Intermediate, ITI, Polytechnic, Degree, PG, Engineering, Medicine, and Professional courses',
    shortDescription: 'Full college Tuition Fee Reimbursement (RTF) and monthly student Maintenance Charges (MTF) delivered through the official Telangana ePASS system.',
    plainSummary: 'If you are studying after 10th standard in Telangana, ePASS pays your college fees directly to your college (RTF) and gives you a monthly living allowance (MTF) deposited into your Aadhaar-linked bank account.',
    mainBenefit: '100% Tuition Fee Reimbursement (RTF) directly to colleges plus up to ₹20,000/year Maintenance Charges (MTF) to student bank accounts',
    benefitType: 'Reimbursement',
    applicationMode: 'Online',
    applicationStatus: 'Open',
    status: 'ACTIVE',
    deadline: '31 October 2026 (Annual Academic Cycle)',
    openingDate: '1 July 2026',
    officialUrl: 'https://telanganaepass.cgg.gov.in/',
    officialPortal: 'https://telanganaepass.cgg.gov.in/',
    officialSource: 'https://telanganaepass.cgg.gov.in/',
    sourceDocument: 'G.O.Ms.No. 66 & G.O.Ms.No. 84, Higher Education and Social Welfare Departments, Telangana',
    sourceType: 'Official State Portal & Government Orders',
    lastVerified: '10/09/2026',
    isOfficialSourceVerified: true,
    verificationStatus: 'Verified',
    verification_status: 'VERIFIED',
    helpline: '040-23390228 / 040-23399863 (ePASS Help Desk: 10:30 AM to 5:00 PM on Working Days)',
    keywords: [
      'epass', 'e-pass', 'telangana epass', 'pms', 'rtf', 'mtf', 'fee reimbursement', 'telangana scholarship',
      'post matric', 'btech', 'degree', 'inter', 'hostel', 'cgg', 'telangana'
    ],
    eligibilityRules: {
      minAge: 15,
      maxAge: 35,
      states: ['Telangana'],
      maxIncome: 200000,
      socialCategories: ['SC', 'ST', 'OBC', 'EWS', 'General'],
      customConditions: [
        'Candidate must be a bonafide resident of Telangana',
        'Must have completed SSC (10th standard) and enrolled in a recognized Post-Matric course',
        'Annual parental income limit: ₹2,00,000 for SC/ST and rural BC/EBC; ₹1,50,000 for urban BC/EBC; ₹2,00,000 for Minorities',
        'Minimum 75% attendance required in the academic year'
      ]
    },
    requiredDocuments: [
      {
        id: 'epass_aadhaar',
        name: 'Aadhaar Card (Student & Parents)',
        whyNeeded: 'Mandatory biometric identity and Direct Benefit Transfer (DBT) verification',
        howToObtain: 'From UIDAI Portal or Aadhaar Seva Kendra',
        isMandatory: true,
        officialLink: 'https://myaadhaar.uidai.gov.in/'
      },
      {
        id: 'epass_caste_cert',
        name: 'Integrated Caste Certificate (MeeSeva)',
        whyNeeded: 'Statutory proof of SC, ST, BC, or Minority category',
        howToObtain: 'Apply through MeeSeva portal or nearest MeeSeva Kendra',
        isMandatory: true,
        officialLink: 'https://ts.meeseva.telangana.gov.in/'
      },
      {
        id: 'epass_income_cert',
        name: 'Income Certificate issued by Tahsildar (MeeSeva)',
        whyNeeded: 'Proof of family income within eligible ceiling issued after prescribed date',
        howToObtain: 'Apply via MeeSeva portal with valid ration card / salary slip',
        isMandatory: true,
        officialLink: 'https://ts.meeseva.telangana.gov.in/'
      },
      {
        id: 'epass_bank_passbook',
        name: 'Nationalized Bank Passbook (NPCI Seeded)',
        whyNeeded: 'Direct deposit of student Maintenance Allowance (MTF)',
        howToObtain: 'From any nationalized bank; account must be Aadhaar-NPCI mapped',
        isMandatory: true
      },
      {
        id: 'epass_bonafide',
        name: 'Bonafide / Study Certificate (Past 7 Years)',
        whyNeeded: 'Proof of local Telangana candidate status',
        howToObtain: 'From the Head of Institution / College Principal',
        isMandatory: true
      }
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: 'Visit Telangana ePASS Portal',
        description: 'Open https://telanganaepass.cgg.gov.in and click on "Post Matric Scholarship Services".',
        portalUrl: 'https://telanganaepass.cgg.gov.in/'
      },
      {
        stepNumber: 2,
        title: 'Register as Fresh or Renewal Student',
        description: 'Provide SSC Hall Ticket Number, Year of Pass, and Aadhaar Number to auto-fetch demographic details.',
        portalUrl: 'https://telanganaepass.cgg.gov.in/'
      },
      {
        stepNumber: 3,
        title: 'Enter MeeSeva Certificate Numbers',
        description: 'Input MeeSeva Application Numbers for Caste Certificate and Income Certificate for real-time online verification.',
        portalUrl: 'https://telanganaepass.cgg.gov.in/'
      },
      {
        stepNumber: 4,
        title: 'Upload Scanned Documents & Submit',
        description: 'Upload scanned copies of bank passbook, bonafide, and photograph, then print the submitted acknowledgement.',
        portalUrl: 'https://telanganaepass.cgg.gov.in/'
      },
      {
        stepNumber: 5,
        title: 'Verification by College & District Welfare Officer',
        description: 'Submit physical hard copy to college principal for online biometric endorsement and sanction by DWO.'
      }
    ]
  },

  // Pre-Matric Scholarship Services
  {
    id: 'telangana-epass-pre-matric',
    recordId: 'TS-EPASS-PRE-2026',
    recordType: 'SCHOLARSHIP',
    name: 'Telangana Pre-Matric Scholarship (ePASS)',
    official_name: 'Pre-Matric Scholarship for SC, ST, BC & Minority Students (Classes 5 to 10)',
    short_name: 'Telangana Pre-Matric ePASS',
    portal_id: 'telangana-epass',
    aliases: [
      'Pre Matric Scholarship Telangana',
      'Telangana pre matric scholarship',
      'pre matric scholarship telangana',
      'ePASS pre matric',
      'ePASS school scholarship',
      'Telangana school scholarship',
      'Telangana pre-matric scholarship',
      'pre-matric epass'
    ],
    common_names: ['Telangana Pre-Matric ePASS', 'School Student Scholarship Telangana'],
    nativeNames: {
      telugu: 'తెలంగాణ ఈ-పాస్ ప్రీ-మెట్రిక్ స్కాలర్‌షిప్ (5 నుంచి 10వ తరగతి)',
      hindi: 'तेलंगाना प्री-मैट्रिक छात्रवृत्ति'
    },
    ministry: 'Government of Telangana',
    department: 'Social Welfare, Tribal Welfare, BC Welfare & Minority Welfare Departments',
    governmentLevel: 'State',
    government_level: 'STATE',
    state: 'Telangana',
    category: 'Students',
    targetBeneficiary: 'SC, ST, BC, and Minority students studying in Classes 5 to 10 in government and aided schools',
    shortDescription: 'Annual financial stipends and educational allowances for school students from disadvantaged communities studying in Classes 5 to 10.',
    plainSummary: 'Provides an annual cash grant for books, uniforms, and study expenses for Telangana school children studying in classes 5th to 10th.',
    mainBenefit: 'Annual educational allowance up to ₹3,500 for day scholars and ₹7,000 for hostellers plus book grants',
    benefitType: 'Direct Cash Transfer',
    applicationMode: 'Online',
    applicationStatus: 'Open',
    status: 'ACTIVE',
    deadline: '30 September 2026',
    openingDate: '15 June 2026',
    officialUrl: 'https://telanganaepass.cgg.gov.in/',
    officialPortal: 'https://telanganaepass.cgg.gov.in/',
    officialSource: 'https://telanganaepass.cgg.gov.in/',
    sourceDocument: 'Pre-Matric Scholarship Guidelines, Social Welfare Department, Telangana',
    sourceType: 'Official State Portal',
    lastVerified: '10/09/2026',
    isOfficialSourceVerified: true,
    verificationStatus: 'Verified',
    verification_status: 'VERIFIED',
    helpline: '040-23390228 (ePASS Pre-Matric Cell)',
    keywords: ['pre-matric', 'school scholarship', 'epass', 'classes 5 to 10', 'sc scholarship', 'telangana'],
    eligibilityRules: {
      minAge: 9,
      maxAge: 17,
      states: ['Telangana'],
      maxIncome: 200000,
      socialCategories: ['SC', 'ST', 'OBC', 'General'],
      customConditions: [
        'Enrolled in Classes 5 to 10 in a recognized Government / Zilla Parishad / Municipal school in Telangana',
        'Family income not exceeding ₹2,00,000 per annum',
        'Minimum 75% attendance in the previous academic year'
      ]
    },
    requiredDocuments: [
      {
        id: 'pre_aadhaar',
        name: 'Student Aadhaar Card',
        whyNeeded: 'Identity authentication and DBT seeding',
        howToObtain: 'From UIDAI Portal or School enrolment drive',
        isMandatory: true
      },
      {
        id: 'pre_caste',
        name: 'MeeSeva Caste Certificate',
        whyNeeded: 'Proof of SC/ST/BC category',
        howToObtain: 'From MeeSeva Center',
        isMandatory: true
      },
      {
        id: 'pre_income',
        name: 'Income Certificate',
        whyNeeded: 'Proof of annual income eligibility',
        howToObtain: 'From MeeSeva Center',
        isMandatory: true
      }
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: 'School Enrolment Verification',
        description: 'Headmaster / Principal initiates online student registration on Telangana ePASS Pre-Matric module.',
        portalUrl: 'https://telanganaepass.cgg.gov.in/'
      },
      {
        stepNumber: 2,
        title: 'Authentication & Sanction',
        description: 'District Welfare Officer approves the list and funds are credited directly to student bank accounts.'
      }
    ]
  },

  // Overseas Scholarship Services: Mahatma Jyothiba Phule Overseas Vidya Nidhi
  {
    id: 'telangana-epass-mjpov-overseas',
    recordId: 'TS-EPASS-MJPOV-2026',
    recordType: 'SCHOLARSHIP',
    name: 'Mahatma Jyothiba Phule Overseas Vidya Nidhi (MJPOV)',
    official_name: 'Mahatma Jyothiba Phule BC Overseas Vidya Nidhi Scheme for BC & EBC Students',
    short_name: 'MJPOV',
    acronym: 'MJPOV',
    portal_id: 'telangana-epass',
    aliases: [
      'MJPOV',
      'BC Overseas Scholarship',
      'BC Overseas Vidya Nidhi',
      'Telangana BC Overseas Scholarship',
      'Overseas scholarship',
      'Overseas Scholarship Telangana',
      'ePASS overseas scholarship',
      'Telangana overseas scholarship',
      'study abroad scholarship telangana',
      'Telangana BC overseas scholarship',
      'Telangana overseas vidya nidhi',
      'telangana overseas scholarship'
    ],
    common_names: ['MJPOV Overseas Scholarship', 'BC Overseas Vidya Nidhi', 'Telangana BC Overseas Scholarship'],
    nativeNames: {
      telugu: 'మహాత్మా జ్యోతిబా ఫూలే బీసీ విదేశీ విద్యా నిధి',
      hindi: 'महात्मा ज्योतिबा फुले विदेशी विद्या निधि'
    },
    ministry: 'Government of Telangana',
    department: 'Backward Classes Welfare Department, Govt. of Telangana',
    governmentLevel: 'State',
    government_level: 'STATE',
    state: 'Telangana',
    category: 'Students',
    targetBeneficiary: 'Backward Classes (BC) and Economically Backward Classes (EBC) graduates pursuing Masters or Ph.D abroad',
    shortDescription: 'Flagship Telangana Government overseas scholarship providing up to ₹20,00,000 grant and airfare for BC/EBC students studying in top foreign universities.',
    plainSummary: 'If you are a BC or EBC student from Telangana with an admit to a top university in the USA, UK, Australia, Canada, or Europe, the government gives you ₹20 Lakhs non-repayable grant plus one-way airfare.',
    mainBenefit: 'Direct financial scholarship grant of ₹20,00,000 (Twenty Lakhs) in two installments plus one-way economy airfare and visa charges',
    benefitType: 'Direct Cash Transfer',
    applicationMode: 'Online',
    applicationStatus: 'Open',
    status: 'ACTIVE',
    deadline: '30 September & 31 March (Biannual Intakes)',
    openingDate: '1 August 2026',
    officialUrl: 'https://telanganaepass.cgg.gov.in/',
    officialPortal: 'https://telanganaepass.cgg.gov.in/',
    officialSource: 'https://telanganaepass.cgg.gov.in/',
    sourceDocument: 'G.O.Ms.No. 23, BC Welfare (B) Department, Govt. of Telangana',
    sourceType: 'Official State Government Order',
    lastVerified: '10/09/2026',
    isOfficialSourceVerified: true,
    verificationStatus: 'Verified',
    verification_status: 'VERIFIED',
    helpline: '040-23390228 / 040-24558500 (BC Welfare Overseas Cell)',
    keywords: ['overseas scholarship', 'mjpov', 'bc welfare', 'study abroad', 'epass', '20 lakhs', 'telangana'],
    eligibilityRules: {
      minAge: 20,
      maxAge: 35,
      states: ['Telangana'],
      maxIncome: 500000,
      socialCategories: ['OBC', 'EWS'],
      customConditions: [
        'Must belong to BC or EBC community of Telangana state',
        'Annual family income from all sources must not exceed ₹5,00,000',
        'Must have secured minimum 60% marks in Degree (Engineering, Management, Pure Sciences, Agriculture, Medicine, or Humanities)',
        'Must have valid score in GRE / GMAT / TOEFL / IELTS / PTE',
        'Must possess confirmed I-20 or unconditional admission offer from accredited universities in USA, UK, Australia, Canada, Singapore, Germany, etc.',
        'Only one candidate per family is eligible'
      ]
    },
    requiredDocuments: [
      {
        id: 'mjpov_caste',
        name: 'MeeSeva BC/EBC Caste Certificate',
        whyNeeded: 'Proof of backward class domicile in Telangana',
        howToObtain: 'From MeeSeva Portal',
        isMandatory: true,
        officialLink: 'https://ts.meeseva.telangana.gov.in/'
      },
      {
        id: 'mjpov_income',
        name: 'Income Certificate (Family Income ≤ ₹5 Lakh)',
        whyNeeded: 'Proof of income limit issued by Tahsildar',
        howToObtain: 'From MeeSeva Portal',
        isMandatory: true
      },
      {
        id: 'mjpov_admit',
        name: 'Unconditional Admission Letter / Form I-20',
        whyNeeded: 'Confirmation of foreign university admission',
        howToObtain: 'From university admissions office',
        isMandatory: true
      },
      {
        id: 'mjpov_tests',
        name: 'GRE / GMAT / IELTS / TOEFL Score Card',
        whyNeeded: 'Mandatory standardized test qualification',
        howToObtain: 'From ETS / Pearson / IELTS testing agency',
        isMandatory: true
      },
      {
        id: 'mjpov_passport',
        name: 'Valid Indian Passport & Student Visa',
        whyNeeded: 'Statutory verification for international travel',
        howToObtain: 'From Passport Seva & respective Embassy',
        isMandatory: true
      }
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: 'Online Application on ePASS Overseas Portal',
        description: 'Navigate to https://telanganaepass.cgg.gov.in and click on "Overseas Scholarship Services" -> "Mahatma Jyothiba Phule Overseas Vidya Nidhi".',
        portalUrl: 'https://telanganaepass.cgg.gov.in/'
      },
      {
        stepNumber: 2,
        title: 'Upload Documents & Test Scores',
        description: 'Enter passport, academic transcripts, score cards, I-20/offer letter, and MeeSeva caste/income certificate numbers.',
        portalUrl: 'https://telanganaepass.cgg.gov.in/'
      },
      {
        stepNumber: 3,
        title: 'State-Level Selection Committee Interview',
        description: 'Appear before the high-level screening committee chaired by the Secretary, BC Welfare Department for verification.'
      },
      {
        stepNumber: 4,
        title: 'Sanction & Fund Disbursement',
        description: 'First installment of ₹10,00,000 is released upon landing at university; second installment of ₹10,00,000 is released upon 1st semester results.'
      }
    ]
  },

  // Dr. B.R. Ambedkar Overseas Vidya Nidhi (SC/ST)
  {
    id: 'telangana-epass-ambedkar-overseas',
    recordId: 'TS-EPASS-AMBEDKAR-2026',
    recordType: 'SCHOLARSHIP',
    name: 'Dr. B.R. Ambedkar Overseas Vidya Nidhi (SC/ST)',
    official_name: 'Dr. B.R. Ambedkar Overseas Vidya Nidhi for SC and ST Students',
    short_name: 'Ambedkar Overseas Vidya Nidhi',
    acronym: 'BRAOVN',
    portal_id: 'telangana-epass',
    aliases: [
      'Ambedkar Overseas Vidya Nidhi',
      'SC Overseas Scholarship Telangana',
      'ST Overseas Scholarship Telangana',
      'Telangana SC overseas scholarship',
      'ePASS SC overseas',
      'BR Ambedkar overseas scholarship',
      'SC overseas scholarship',
      'ST overseas scholarship'
    ],
    common_names: ['Ambedkar Overseas Scholarship', 'Telangana SC/ST Overseas Vidya Nidhi'],
    nativeNames: {
      telugu: 'డా. బి.ఆర్. అంబేద్కర్ విదేశీ విద్యా నిధి (ఎస్సీ/ఎస్టీ)',
      hindi: 'डॉ. बी.आर. अंबेडकर विदेशी विद्या निधि'
    },
    ministry: 'Government of Telangana',
    department: 'Scheduled Castes Development & Tribal Welfare Departments',
    governmentLevel: 'State',
    government_level: 'STATE',
    state: 'Telangana',
    category: 'Students',
    targetBeneficiary: 'SC and ST graduate students from Telangana admitted to Post Graduate and Doctoral courses in top global institutions',
    shortDescription: 'Comprehensive overseas financial scholarship of ₹20 Lakhs grant plus visa and flight expenses for Scheduled Caste and Scheduled Tribe students.',
    plainSummary: 'Provides ₹20,00,000 cash grant and air travel assistance for Telangana SC and ST students to complete higher education degrees in top universities abroad.',
    mainBenefit: '₹20 Lakhs direct grant in two installments plus one-way economy airfare and visa application fees',
    benefitType: 'Direct Cash Transfer',
    applicationMode: 'Online',
    applicationStatus: 'Open',
    status: 'ACTIVE',
    deadline: '30 September & 31 March',
    openingDate: '1 August 2026',
    officialUrl: 'https://telanganaepass.cgg.gov.in/',
    officialPortal: 'https://telanganaepass.cgg.gov.in/',
    officialSource: 'https://telanganaepass.cgg.gov.in/',
    sourceDocument: 'G.O.Ms.No. 54, Scheduled Castes Development (Edn) Department, Telangana',
    sourceType: 'Official State Government Order',
    lastVerified: '10/09/2026',
    isOfficialSourceVerified: true,
    verificationStatus: 'Verified',
    verification_status: 'VERIFIED',
    helpline: '040-23390228 / 040-23391063 (SCDD Overseas Cell)',
    keywords: ['ambedkar overseas', 'sc scholarship', 'st scholarship', 'study abroad', 'epass', 'telangana'],
    eligibilityRules: {
      minAge: 20,
      maxAge: 35,
      states: ['Telangana'],
      maxIncome: 500000,
      socialCategories: ['SC', 'ST'],
      customConditions: [
        'Must belong to Scheduled Caste (SC) or Scheduled Tribe (ST) native to Telangana',
        'Family income not exceeding ₹5,00,000 per annum',
        'Minimum 60% marks in Degree graduation',
        'Unconditional admission offer in recognized overseas university'
      ]
    },
    requiredDocuments: [
      { id: 'ambedkar_caste', name: 'SC/ST Caste Certificate', whyNeeded: 'Proof of community', howToObtain: 'From MeeSeva', isMandatory: true },
      { id: 'ambedkar_income', name: 'Income Certificate', whyNeeded: 'Proof of income', howToObtain: 'From MeeSeva', isMandatory: true },
      { id: 'ambedkar_admit', name: 'Foreign University Admission Letter & I-20', whyNeeded: 'Course enrolment verification', howToObtain: 'From foreign university', isMandatory: true }
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: 'Apply Online via ePASS',
        description: 'Submit application under "Dr. B.R. Ambedkar Overseas Vidya Nidhi" on https://telanganaepass.cgg.gov.in.',
        portalUrl: 'https://telanganaepass.cgg.gov.in/'
      }
    ]
  },

  // Chief Minister's Overseas Scholarship Scheme for Minorities
  {
    id: 'telangana-epass-cm-minority-overseas',
    recordId: 'TS-EPASS-MINORITY-2026',
    recordType: 'SCHOLARSHIP',
    name: "Chief Minister's Overseas Scholarship Scheme for Minorities",
    official_name: "Chief Minister's Overseas Scholarship Scheme for Telangana Minority Students",
    short_name: 'Minority Overseas Scholarship',
    acronym: 'CMOSM',
    portal_id: 'telangana-epass',
    aliases: [
      'Minority Overseas Scholarship Telangana',
      'CM Overseas Minority',
      'ePASS minority overseas',
      'Telangana Muslim overseas scholarship',
      'Minority study abroad telangana',
      'Minority overseas scholarship'
    ],
    common_names: ['CM Overseas Scholarship for Minorities', 'Telangana Minority Overseas Scholarship'],
    nativeNames: {
      telugu: 'మైనారిటీల కోసం ముఖ్యమంత్రి విదేశీ విద్యా నిధి',
      urdu: 'چیف منسٹر اوورسیز اسکالرشپ اسکیم برائے اقلیت'
    },
    ministry: 'Government of Telangana',
    department: 'Minorities Welfare Department, Govt. of Telangana',
    governmentLevel: 'State',
    government_level: 'STATE',
    state: 'Telangana',
    category: 'Students',
    targetBeneficiary: 'Muslim, Christian, Sikh, Buddhist, Jain, and Parsi graduate students pursuing Post Graduate and Ph.D studies abroad',
    shortDescription: 'State overseas grant of ₹20 Lakhs plus one-way airfare for minority students pursuing higher education abroad.',
    plainSummary: 'Helps Telangana minority students achieve foreign Master’s and Doctoral degrees with a ₹20 Lakh direct government grant.',
    mainBenefit: 'Direct non-repayable grant of ₹20,00,000 in two installments plus one-way economy airfare and visa charges',
    benefitType: 'Direct Cash Transfer',
    applicationMode: 'Online',
    applicationStatus: 'Open',
    status: 'ACTIVE',
    deadline: '30 September & 31 March',
    openingDate: '1 August 2026',
    officialUrl: 'https://telanganaepass.cgg.gov.in/',
    officialPortal: 'https://telanganaepass.cgg.gov.in/',
    officialSource: 'https://telanganaepass.cgg.gov.in/',
    sourceDocument: 'G.O.Ms.No. 57, Minorities Welfare (Estt.I) Department, Govt. of Telangana',
    sourceType: 'Official State Government Order',
    lastVerified: '10/09/2026',
    isOfficialSourceVerified: true,
    verificationStatus: 'Verified',
    verification_status: 'VERIFIED',
    helpline: '040-23390228 / 040-23244585 (Minorities Welfare Overseas Cell)',
    keywords: ['minority overseas', 'muslim overseas scholarship', 'epass', 'study abroad', 'telangana'],
    eligibilityRules: {
      minAge: 20,
      maxAge: 35,
      states: ['Telangana'],
      maxIncome: 500000,
      socialCategories: ['General', 'OBC', 'EWS'],
      customConditions: [
        'Belong to notified religious minority (Muslim, Christian, Sikh, Buddhist, Jain, Parsi) resident in Telangana',
        'Family income not exceeding ₹5,00,000 per annum',
        'Minimum 60% in graduation degree',
        'Admission offer from accredited foreign university'
      ]
    },
    requiredDocuments: [
      { id: 'min_cert', name: 'Minority Community Certificate', whyNeeded: 'Proof of minority status', howToObtain: 'From MeeSeva / Minorities Welfare', isMandatory: true },
      { id: 'min_income', name: 'Income Certificate', whyNeeded: 'Income limit', howToObtain: 'From MeeSeva', isMandatory: true },
      { id: 'min_admit', name: 'University Admission Letter / I-20', whyNeeded: 'Admissions proof', howToObtain: 'From foreign university', isMandatory: true }
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: 'Apply on Telangana ePASS Portal',
        description: 'Select Chief Minister’s Overseas Scholarship Scheme for Minorities on https://telanganaepass.cgg.gov.in.',
        portalUrl: 'https://telanganaepass.cgg.gov.in/'
      }
    ]
  },

  // Telangana ePASS Skill Upgradation & Corporate Training
  {
    id: 'telangana-epass-skill-upgradation',
    recordId: 'TS-EPASS-SKILL-2026',
    recordType: 'PROGRAM',
    name: 'Telangana ePASS Skill Upgradation & Corporate Training',
    official_name: 'Skill Upgradation and Employment-Linked Corporate Training Scheme',
    short_name: 'ePASS Skill Upgradation',
    portal_id: 'telangana-epass',
    aliases: [
      'ePASS skill',
      'ePASS corporate training',
      'Telangana skill upgradation',
      'ePASS employment training',
      'ePASS skill upgradation'
    ],
    common_names: ['ePASS Corporate Training', 'Telangana Skill Upgradation'],
    ministry: 'Government of Telangana',
    department: 'Centre for Good Governance (CGG) & Welfare Departments, Telangana',
    governmentLevel: 'State',
    government_level: 'STATE',
    state: 'Telangana',
    category: 'Skill Development',
    targetBeneficiary: 'Unemployed SC, ST, BC, and Minority graduates seeking high-skill corporate and IT employment',
    shortDescription: 'Free corporate technical skill training, IT certification bootcamps, and direct job placement support administered via the ePASS portal.',
    plainSummary: 'Provides free tech and corporate job training in Hyderabad for SC/ST/BC graduates with monthly stipends and job placement assistance.',
    mainBenefit: '100% free corporate skill training course, certification fees waived, and ₹3,000 monthly stipend during training',
    benefitType: 'Subsidy',
    applicationMode: 'Online',
    applicationStatus: 'Open',
    status: 'ACTIVE',
    deadline: 'Rolling Batches',
    openingDate: '1 April 2026',
    officialUrl: 'https://telanganaepass.cgg.gov.in/',
    officialPortal: 'https://telanganaepass.cgg.gov.in/',
    officialSource: 'https://telanganaepass.cgg.gov.in/',
    sourceDocument: 'CGG & Welfare Department Skill Upgradation Notifications, Telangana',
    sourceType: 'Official State Portal',
    lastVerified: '10/09/2026',
    isOfficialSourceVerified: true,
    verificationStatus: 'Verified',
    verification_status: 'VERIFIED',
    helpline: '040-23390228',
    keywords: ['skill upgradation', 'corporate training', 'epass', 'it training', 'jobs', 'telangana'],
    eligibilityRules: {
      minAge: 18,
      maxAge: 30,
      states: ['Telangana'],
      maxIncome: 250000,
      customConditions: [
        'Graduate in any stream or Diploma holder resident in Telangana',
        'Registered on Telangana ePASS database',
        'Currently unemployed and seeking private sector job placement'
      ]
    },
    requiredDocuments: [
      { id: 'skill_degree', name: 'Degree Provisional Certificate', whyNeeded: 'Proof of education', howToObtain: 'From University / College', isMandatory: true }
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: 'Register on ePASS Skill Module',
        description: 'Choose preferred technical track (Cloud, Data, Full-Stack, Banking) on https://telanganaepass.cgg.gov.in.',
        portalUrl: 'https://telanganaepass.cgg.gov.in/'
      }
    ]
  },

  // ==========================================
  // ANDHRA PRADESH: JNANABHUMI SCHOLARSHIPS (Authoritative: https://jnanabhumi.ap.gov.in/)
  // ==========================================
  {
    id: 'ap-jnanabhumi-vidya-deevena',
    recordId: 'AP-JB-JVD-2026',
    recordType: 'SCHOLARSHIP',
    name: 'Jagananna Vidya Deevena (RTF Tuition Fee Reimbursement)',
    official_name: 'Jagananna Vidya Deevena Scheme (Post-Matric Fee Reimbursement)',
    short_name: 'Vidya Deevena',
    acronym: 'JVD',
    portal_id: 'ap-jnanabhumi',
    aliases: [
      'Jnanabhumi',
      'JNANABHUMI',
      'jnanabhumi scholarship',
      'Vidya Deevena',
      'Jagananna Vidya Deevena',
      'AP ePASS',
      'AP fee reimbursement',
      'AP scholarship',
      'Andhra Pradesh scholarship',
      'Andhra Pradesh post matric scholarship',
      'RTF AP',
      'Jnanabhumi portal',
      'jnanabhumi.ap.gov.in'
    ],
    common_names: ['Jagananna Vidya Deevena', 'Jnanabhumi Scholarship', 'AP Fee Reimbursement'],
    nativeNames: {
      telugu: 'జగనన్న విద్యా దీవెన (ఫీజు రీయింబర్స్‌మెంట్ - జ్ఞానభూమి)',
      hindi: 'जगन्नन्ना विद्या दीवेना (आंध्र प्रदेश)'
    },
    ministry: 'Government of Andhra Pradesh',
    department: 'Social Welfare & Higher Education Departments, Andhra Pradesh',
    governmentLevel: 'State',
    government_level: 'STATE',
    state: 'Andhra Pradesh',
    category: 'Students',
    targetBeneficiary: 'SC, ST, BC, EBC, Kapu, Minority, and Differently-Abled students pursuing ITI, Polytechnic, Degree, B.Tech, M.Tech, MBA, MCA, and Pharmacy',
    shortDescription: 'Complete 100% tuition fee reimbursement credited directly into mothers’ bank accounts in quarterly installments via the official Jnanabhumi system.',
    plainSummary: 'Pays 100% of college tuition fees directly for students in Andhra Pradesh through the Jnanabhumi portal.',
    mainBenefit: '100% full college tuition fee reimbursement credited directly to student mothers’ bank accounts',
    benefitType: 'Direct Cash Transfer',
    applicationMode: 'Online',
    applicationStatus: 'Open',
    status: 'ACTIVE',
    deadline: '30 November 2026',
    openingDate: '1 July 2026',
    officialUrl: 'https://jnanabhumi.ap.gov.in/',
    officialPortal: 'https://jnanabhumi.ap.gov.in/',
    officialSource: 'https://jnanabhumi.ap.gov.in/',
    sourceDocument: 'G.O.Ms.No. 115, Social Welfare (EDN) Department, Govt. of Andhra Pradesh',
    sourceType: 'Official State Government Order',
    lastVerified: '10/09/2026',
    isOfficialSourceVerified: true,
    verificationStatus: 'Verified',
    verification_status: 'VERIFIED',
    helpline: '1902 (Spandana Helpline) / 08645-274025 (Jnanabhumi Support)',
    keywords: ['jnanabhumi', 'vidya deevena', 'ap scholarship', 'fee reimbursement', 'andhra pradesh'],
    eligibilityRules: {
      minAge: 16,
      maxAge: 32,
      states: ['Andhra Pradesh'],
      maxIncome: 250000,
      socialCategories: ['SC', 'ST', 'OBC', 'EWS', 'General'],
      customConditions: [
        'Must be native resident student of Andhra Pradesh',
        'Family annual income not exceeding ₹2,50,000',
        'Total agricultural land holding below 10 acres wetland or 25 acres dryland',
        'No family member should be a government employee or pensioner (sanitary workers exempted)'
      ]
    },
    requiredDocuments: [
      { id: 'ap_aadhaar', name: 'Aadhaar of Student & Mother', whyNeeded: 'Direct deposit into mother account', howToObtain: 'From UIDAI', isMandatory: true },
      { id: 'ap_rice_card', name: 'AP Rice Card / Income Certificate', whyNeeded: 'Income eligibility', howToObtain: 'From Grama Ward Sachivalayam', isMandatory: true }
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: 'Registration via College on Jnanabhumi',
        description: 'College admission office verifies student records and uploads verification on https://jnanabhumi.ap.gov.in.',
        portalUrl: 'https://jnanabhumi.ap.gov.in/'
      }
    ]
  },

  {
    id: 'ap-jnanabhumi-vasathi-deevena',
    recordId: 'AP-JB-JVD-VASATHI-2026',
    recordType: 'SCHOLARSHIP',
    name: 'Jagananna Vasathi Deevena (Food & Hostel Assistance)',
    official_name: 'Jagananna Vasathi Deevena Hostel and Boarding Assistance Scheme',
    short_name: 'Vasathi Deevena',
    portal_id: 'ap-jnanabhumi',
    aliases: [
      'Vasathi Deevena',
      'Jagananna Vasathi Deevena',
      'AP hostel scholarship',
      'AP boarding scholarship',
      'jnanabhumi vasathi'
    ],
    common_names: ['Vasathi Deevena', 'AP Hostel Assistance'],
    ministry: 'Government of Andhra Pradesh',
    department: 'Social Welfare Department, Andhra Pradesh',
    governmentLevel: 'State',
    government_level: 'STATE',
    state: 'Andhra Pradesh',
    category: 'Students',
    targetBeneficiary: 'Post-matric college students in Andhra Pradesh needing boarding, food, and mess allowance',
    shortDescription: 'Provides ₹10,000 for ITI, ₹15,000 for Polytechnic, and ₹20,000 for Degree/Engineering students per year for hostel and food expenses.',
    plainSummary: 'Gives up to ₹20,000 per year directly to students’ mothers to cover hostel, room rent, and food expenses while studying in college.',
    mainBenefit: 'Annual cash grant of ₹10,000 (ITI), ₹15,000 (Polytechnic), or ₹20,000 (Degree/PG) in two installments',
    benefitType: 'Direct Cash Transfer',
    applicationMode: 'Online',
    applicationStatus: 'Open',
    status: 'ACTIVE',
    deadline: '30 November 2026',
    openingDate: '1 July 2026',
    officialUrl: 'https://jnanabhumi.ap.gov.in/',
    officialPortal: 'https://jnanabhumi.ap.gov.in/',
    officialSource: 'https://jnanabhumi.ap.gov.in/',
    sourceDocument: 'G.O.Ms.No. 116, Social Welfare Department, Andhra Pradesh',
    sourceType: 'Official State Government Order',
    lastVerified: '10/09/2026',
    isOfficialSourceVerified: true,
    verificationStatus: 'Verified',
    verification_status: 'VERIFIED',
    helpline: '1902',
    keywords: ['vasathi deevena', 'hostel allowance', 'jnanabhumi', 'ap scholarship'],
    eligibilityRules: {
      minAge: 16,
      maxAge: 32,
      states: ['Andhra Pradesh'],
      maxIncome: 250000,
      customConditions: ['Enrolled in recognized post-matric course in AP', 'Eligible under Vidya Deevena criteria']
    },
    requiredDocuments: [
      { id: 'vd_aadhaar', name: 'Aadhaar Card', whyNeeded: 'DBT verification', howToObtain: 'UIDAI', isMandatory: true }
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: 'Auto-linked with Jnanabhumi Profile',
        description: 'Auto-sanctioned when student applies for Jagananna Vidya Deevena on https://jnanabhumi.ap.gov.in.',
        portalUrl: 'https://jnanabhumi.ap.gov.in/'
      }
    ]
  },

  // ==========================================
  // KARNATAKA: STATE SCHOLARSHIP PORTAL (SSP) (Authoritative: https://ssp.postmatric.karnataka.gov.in/)
  // ==========================================
  {
    id: 'karnataka-ssp-post-matric',
    recordId: 'KA-SSP-PMS-2026',
    recordType: 'SCHOLARSHIP',
    name: 'Karnataka State Scholarship Portal (SSP Post-Matric Scholarship)',
    official_name: 'Post-Matric Scholarship for SC, ST, OBC, Minority & General Students (SSP Karnataka)',
    short_name: 'Karnataka SSP Scholarship',
    acronym: 'SSP',
    portal_id: 'karnataka-ssp',
    aliases: [
      'SSP',
      'SSP Karnataka',
      'SSP scholarship',
      'State Scholarship Portal',
      'Karnataka SSP',
      'SSP post matric',
      'Karnataka scholarship',
      'scholarship in Karnataka',
      'Karnataka post matric scholarship',
      'Vidyasiri Karnataka',
      'e-Kalyan Karnataka',
      'ssp.postmatric.karnataka.gov.in'
    ],
    common_names: ['SSP Scholarship', 'Karnataka Post-Matric SSP', 'Karnataka State Scholarship Portal'],
    nativeNames: {
      kannada: 'ಕರ್ನಾಟಕ ರಾಜ್ಯ ವಿದ್ಯಾರ್ಥಿವೇತನ ತಂತ್ರಾಂಶ (SSP ಪೋಸ್ಟ್-ಮೆಟ್ರಿಕ್ ಸ್ಕಾಲರ್‌ಶಿಪ್)',
      hindi: 'कर्नाटक स्टेट स्कॉलरशिप पोर्टल (एसएसपी पोस्ट-मैट्रिक)'
    },
    ministry: 'Government of Karnataka',
    department: 'Social Welfare, Tribal Welfare, Backward Classes Welfare & Minorities Welfare Departments',
    governmentLevel: 'State',
    government_level: 'STATE',
    state: 'Karnataka',
    category: 'Students',
    targetBeneficiary: 'Karnataka students pursuing PUC, Diploma, ITI, Degree, Engineering, Medical, and Post-Graduate studies',
    shortDescription: 'Unified scholarship delivery portal by Government of Karnataka offering fee concession, maintenance allowance, and freeships directly via Aadhaar-linked bank accounts.',
    plainSummary: 'Karnataka’s official scholarship portal paying college tuition fee concessions and monthly living stipends for post-matric students.',
    mainBenefit: 'Full college fee concession/reimbursement plus ₹1,500 to ₹10,000 annual maintenance allowance',
    benefitType: 'Direct Cash Transfer',
    applicationMode: 'Online',
    applicationStatus: 'Open',
    status: 'ACTIVE',
    deadline: '31 December 2026',
    openingDate: '1 August 2026',
    officialUrl: 'https://ssp.postmatric.karnataka.gov.in/',
    officialPortal: 'https://ssp.postmatric.karnataka.gov.in/',
    officialSource: 'https://ssp.postmatric.karnataka.gov.in/',
    sourceDocument: 'Official SSP Portal Guidelines, Centre for e-Governance, Karnataka',
    sourceType: 'Official State Government Portal',
    lastVerified: '10/09/2026',
    isOfficialSourceVerified: true,
    verificationStatus: 'Verified',
    verification_status: 'VERIFIED',
    helpline: '1902 / 080-35254757 (SSP Karnataka Helpdesk)',
    keywords: ['ssp', 'ssp karnataka', 'karnataka scholarship', 'vidyasiri', 'post matric', 'state scholarship portal'],
    eligibilityRules: {
      minAge: 16,
      maxAge: 32,
      states: ['Karnataka'],
      maxIncome: 250000,
      socialCategories: ['SC', 'ST', 'OBC', 'EWS', 'General'],
      customConditions: [
        'Domicile of Karnataka with valid Kutumba / SATS student ID',
        'Enrolled in recognized post-matric course in Karnataka or premier national institutes',
        'Income limit: ₹2.5 Lakh for SC/ST; ₹1 Lakh for Category-1 OBC; ₹2 Lakh for Minorities'
      ]
    },
    requiredDocuments: [
      { id: 'ssp_aadhaar', name: 'Aadhaar Card (NPCI mapped)', whyNeeded: 'Aadhaar DBT linking', howToObtain: 'UIDAI', isMandatory: true },
      { id: 'ssp_caste', name: 'RD Number (Caste Certificate)', whyNeeded: 'Nadakacheri caste verification', howToObtain: 'From Nadakacheri portal', isMandatory: true },
      { id: 'ssp_income', name: 'RD Number (Income Certificate)', whyNeeded: 'Income verification', howToObtain: 'From Nadakacheri portal', isMandatory: true }
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: 'Create Account on Karnataka SSP',
        description: 'Register with Aadhaar and Kutumba ID on https://ssp.postmatric.karnataka.gov.in.',
        portalUrl: 'https://ssp.postmatric.karnataka.gov.in/'
      },
      {
        stepNumber: 2,
        title: 'Submit RD Numbers for Auto-Verification',
        description: 'Input Nadakacheri RD numbers; system automatically validates caste and income without paper uploads.',
        portalUrl: 'https://ssp.postmatric.karnataka.gov.in/'
      }
    ]
  },

  // ==========================================
  // MAHARASHTRA: MAHADBT PORTAL (Authoritative: https://mahadbt.maharashtra.gov.in/)
  // ==========================================
  {
    id: 'maharashtra-mahadbt-rajarshi-shahu',
    recordId: 'MH-MAHADBT-RCSM-2026',
    recordType: 'SCHOLARSHIP',
    name: 'Rajarshi Chhatrapati Shahu Maharaj Shikshan Shulkh Shishyavrutti (MahaDBT)',
    official_name: 'Rajarshi Chhatrapati Shahu Maharaj Tuition Fee Reimbursement Scheme',
    short_name: 'MahaDBT RCSM Scholarship',
    acronym: 'MahaDBT',
    portal_id: 'mahadbt',
    aliases: [
      'MahaDBT',
      'Maha DBT',
      'mahadbt',
      'mahadbt scholarship',
      'Maharashtra scholarship',
      'Rajarshi Shahu Maharaj scholarship',
      'EBC scholarship Maharashtra',
      'MahaDBT post matric',
      'Aaple Sarkar DBT',
      'mahadbt.maharashtra.gov.in'
    ],
    common_names: ['MahaDBT Scholarship', 'Rajarshi Shahu Maharaj Scholarship', 'Maharashtra EBC Scholarship'],
    nativeNames: {
      marathi: 'राजर्षी छत्रपती शाहू महाराज शिक्षण शुल्क शिष्यवृत्ती योजना (महाडीबीटी)',
      hindi: 'महाडीबीटी राजर्षि छत्रपति शाहू महाराज छात्रवृत्ति (महाराष्ट्र)'
    },
    ministry: 'Government of Maharashtra',
    department: 'Directorate of Higher Education & Directorate of Technical Education, Maharashtra',
    governmentLevel: 'State',
    government_level: 'STATE',
    state: 'Maharashtra',
    category: 'Students',
    targetBeneficiary: 'Students pursuing Higher and Technical education (Engineering, MBA, Medical, Architecture, Pharmacy, Degree) admitted via CAP rounds',
    shortDescription: 'Maharashtra’s premier tuition and exam fee reimbursement scheme providing 50% to 100% tuition concession through MahaDBT.',
    plainSummary: 'Reimburses 50% to 100% of college tuition and exam fees for students belonging to EBC, SEBC, and Open categories in Maharashtra through MahaDBT.',
    mainBenefit: '50% fee reimbursement for private un-aided colleges; up to 100% fee waiver for government/aided colleges',
    benefitType: 'Reimbursement',
    applicationMode: 'Online',
    applicationStatus: 'Open',
    status: 'ACTIVE',
    deadline: '31 January 2027',
    openingDate: '1 August 2026',
    officialUrl: 'https://mahadbt.maharashtra.gov.in/',
    officialPortal: 'https://mahadbt.maharashtra.gov.in/',
    officialSource: 'https://mahadbt.maharashtra.gov.in/',
    sourceDocument: 'Government Resolution No. EBC-2016/C.R.221/Edu-1, Higher & Technical Education Dept, Maharashtra',
    sourceType: 'Official State Government Resolution',
    lastVerified: '10/09/2026',
    isOfficialSourceVerified: true,
    verificationStatus: 'Verified',
    verification_status: 'VERIFIED',
    helpline: '022-49150800 (MahaDBT Helpline)',
    keywords: ['mahadbt', 'rajarshi shahu', 'ebc scholarship', 'maharashtra scholarship', 'fee reimbursement'],
    eligibilityRules: {
      minAge: 16,
      maxAge: 32,
      states: ['Maharashtra'],
      maxIncome: 800000,
      customConditions: [
        'Domicile of Maharashtra state',
        'Annual family income not exceeding ₹8,00,000',
        'Admitted through Centralized Admission Process (CAP) round',
        'Not more than two children from the same family can avail benefit'
      ]
    },
    requiredDocuments: [
      { id: 'mh_domicile', name: 'Maharashtra Domicile Certificate', whyNeeded: 'Proof of state residency', howToObtain: 'From Aaple Sarkar portal', isMandatory: true },
      { id: 'mh_income', name: 'Income Certificate (≤ ₹8 Lakh)', whyNeeded: 'Income ceiling proof', howToObtain: 'From Tehsildar / Aaple Sarkar', isMandatory: true },
      { id: 'mh_cap', name: 'CAP Allotment Letter', whyNeeded: 'Proof of merit CAP admission', howToObtain: 'From State CET Cell', isMandatory: true }
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: 'Register on MahaDBT Portal',
        description: 'Log in at https://mahadbt.maharashtra.gov.in and click on "Post Matric Scholarship".',
        portalUrl: 'https://mahadbt.maharashtra.gov.in/'
      }
    ]
  },

  // ==========================================
  // WEST BENGAL: OASIS & AIKYASHREE (Authoritative: https://oasis.gov.in/ & https://wbmdfcscholarship.in/)
  // ==========================================
  {
    id: 'wb-oasis-post-matric',
    recordId: 'WB-OASIS-PMS-2026',
    recordType: 'SCHOLARSHIP',
    name: 'West Bengal OASIS Post-Matric Scholarship (SC/ST/OBC)',
    official_name: 'Online Application for Scholarships in Studies (OASIS) Post-Matric Scheme',
    short_name: 'WB OASIS Scholarship',
    acronym: 'OASIS',
    portal_id: 'wb-oasis',
    aliases: [
      'OASIS',
      'oasis',
      'Oasis scholarship',
      'WB Oasis',
      'West Bengal scholarship',
      'OASIS post matric',
      'SC ST scholarship West Bengal',
      'oasis.gov.in'
    ],
    common_names: ['OASIS Scholarship', 'West Bengal SC/ST Scholarship', 'OASIS Portal'],
    nativeNames: {
      bengali: 'ওয়েস্ট বেঙ্গল ওয়েসিস পোস্ট-ম্যাট্রিক স্কলারশিপ (OASIS)',
      hindi: 'पश्चिम बंगाल ओएसिस पोस्ट-मैट्रिक छात्रवृत्ति'
    },
    ministry: 'Government of West Bengal',
    department: 'Backward Classes Welfare and Tribal Development Departments, West Bengal',
    governmentLevel: 'State',
    government_level: 'STATE',
    state: 'West Bengal',
    category: 'Students',
    targetBeneficiary: 'SC, ST, and OBC students of West Bengal studying in Classes 11, 12, ITI, Polytechnic, UG, and PG courses',
    shortDescription: 'Comprehensive government scholarship providing maintenance stipend and tuition fees for SC/ST/OBC students via the OASIS portal.',
    plainSummary: 'Provides financial assistance and living stipends for SC, ST, and OBC students in West Bengal studying after Class 10.',
    mainBenefit: 'Maintenance stipend up to ₹1,200/month plus compulsory non-refundable fees reimbursement',
    benefitType: 'Direct Cash Transfer',
    applicationMode: 'Online',
    applicationStatus: 'Open',
    status: 'ACTIVE',
    deadline: '31 January 2027',
    openingDate: '1 August 2026',
    officialUrl: 'https://oasis.gov.in/',
    officialPortal: 'https://oasis.gov.in/',
    officialSource: 'https://oasis.gov.in/',
    sourceDocument: 'OASIS Portal Guidelines, Backward Classes Welfare Dept, West Bengal',
    sourceType: 'Official State Government Portal',
    lastVerified: '10/09/2026',
    isOfficialSourceVerified: true,
    verificationStatus: 'Verified',
    verification_status: 'VERIFIED',
    helpline: '033-22040030 / 1800-102-8014 (OASIS Helpline)',
    keywords: ['oasis', 'west bengal scholarship', 'oasis.gov.in', 'sc st scholarship', 'post matric'],
    eligibilityRules: {
      minAge: 15,
      maxAge: 32,
      states: ['West Bengal'],
      maxIncome: 250000,
      socialCategories: ['SC', 'ST', 'OBC'],
      customConditions: [
        'Domicile resident of West Bengal',
        'Annual parental income: ≤ ₹2,50,000 for SC/ST; ≤ ₹1,00,000 for OBC',
        'Regular student in a recognized institution'
      ]
    },
    requiredDocuments: [
      { id: 'wb_caste', name: 'WB SC/ST/OBC Certificate', whyNeeded: 'Category proof', howToObtain: 'From SDO / BDO Office', isMandatory: true }
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: 'Register on OASIS Portal',
        description: 'Visit https://oasis.gov.in and click "Student Registration".',
        portalUrl: 'https://oasis.gov.in/'
      }
    ]
  },

  // ==========================================
  // KERALA: DCE SCHOLARSHIP PORTAL (Authoritative: https://dcescholarship.kerala.gov.in/)
  // ==========================================
  {
    id: 'kerala-dce-suvarna-jubilee',
    recordId: 'KL-DCE-SJM-2026',
    recordType: 'SCHOLARSHIP',
    name: 'Kerala Suvarna Jubilee Merit Scholarship (DCE Kerala)',
    official_name: 'Suvarna Jubilee Merit Scholarship for BPL College Students',
    short_name: 'Suvarna Jubilee Scholarship',
    portal_id: 'kerala-dce',
    aliases: [
      'DCE Kerala',
      'Kerala scholarship',
      'scholarship in Kerala',
      'Suvarna Jubilee scholarship',
      'Kerala DCE scholarship',
      'dcescholarship.kerala.gov.in',
      'scholarships in Kerala'
    ],
    common_names: ['Suvarna Jubilee Scholarship', 'DCE Kerala Scholarship'],
    nativeNames: {
      malayalam: 'കേരള സുവർണ്ണ ജൂബിലി മെറിറ്റ് സ്കോളർഷിപ്പ് (DCE)',
      hindi: 'केरल सुवर्ण जुबली मेरिट छात्रवृत्ति'
    },
    ministry: 'Government of Kerala',
    department: 'Directorate of Collegiate Education (DCE), Govt. of Kerala',
    governmentLevel: 'State',
    government_level: 'STATE',
    state: 'Kerala',
    category: 'Students',
    targetBeneficiary: 'Economically backward (BPL) first-year UG and PG students studying in government and aided colleges in Kerala',
    shortDescription: 'State merit-cum-means scholarship providing ₹10,000 per year directly to BPL collegiate students in Kerala.',
    plainSummary: 'Provides an annual cash scholarship of ₹10,000 for college degree and master’s students from BPL families in Kerala.',
    mainBenefit: 'Direct cash grant of ₹10,000 per year credited into student bank account throughout degree duration',
    benefitType: 'Direct Cash Transfer',
    applicationMode: 'Online',
    applicationStatus: 'Open',
    status: 'ACTIVE',
    deadline: '15 November 2026',
    openingDate: '1 September 2026',
    officialUrl: 'https://dcescholarship.kerala.gov.in/',
    officialPortal: 'https://dcescholarship.kerala.gov.in/',
    officialSource: 'https://dcescholarship.kerala.gov.in/',
    sourceDocument: 'Directorate of Collegiate Education Notification, Govt. of Kerala',
    sourceType: 'Official State Department Portal',
    lastVerified: '10/09/2026',
    isOfficialSourceVerified: true,
    verificationStatus: 'Verified',
    verification_status: 'VERIFIED',
    helpline: '0471-2306580 / 9446096580 (DCE Scholarship Cell)',
    keywords: ['kerala scholarship', 'suvarna jubilee', 'dce kerala', 'bpl scholarship', 'college students'],
    eligibilityRules: {
      minAge: 17,
      maxAge: 28,
      states: ['Kerala'],
      customConditions: [
        'Must be a permanent resident of Kerala',
        'Must belong to Below Poverty Line (BPL) category',
        'Must have secured minimum 50% marks in previous qualifying examination',
        'First-year student of regular UG or PG course in government/aided colleges in Kerala'
      ]
    },
    requiredDocuments: [
      { id: 'kl_bpl', name: 'BPL Certificate / Yellow or Pink Ration Card', whyNeeded: 'Proof of BPL status', howToObtain: 'From Civil Supplies Dept Kerala', isMandatory: true },
      { id: 'kl_mark', name: 'Qualifying Marksheet (+2 / Degree)', whyNeeded: 'Proof of 50% marks', howToObtain: 'From Board / University', isMandatory: true }
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: 'Apply on DCE Scholarship Portal',
        description: 'Navigate to https://dcescholarship.kerala.gov.in, register profile, and select "Suvarna Jubilee Merit Scholarship".',
        portalUrl: 'https://dcescholarship.kerala.gov.in/'
      }
    ]
  },

  // ==========================================
  // TAMIL NADU: POST-MATRIC & PUDHUMAI PENN (Authoritative: https://escholarship.tn.gov.in/)
  // ==========================================
  {
    id: 'tamil-nadu-pudhumai-penn-scheme',
    recordId: 'TN-PUDHUMAI-PENN-2026',
    recordType: 'SCHOLARSHIP',
    name: 'Moovalur Ramamirtham Ammaiyar Higher Education (Pudhumai Penn)',
    official_name: 'Moovalur Ramamirtham Ammaiyar Higher Education Assurance Scheme (Pudhumai Penn)',
    short_name: 'Pudhumai Penn Scheme',
    portal_id: 'tn-scholarships',
    aliases: [
      'Pudhumai Penn',
      'Pudhumai Penn Scheme',
      'TN scholarship',
      'Tamil Nadu scholarship',
      'Moovalur Ramamirtham scholarship',
      '1000 per month girl student',
      'Tamil Nadu girl student scholarship',
      'pudhumai penn portal'
    ],
    common_names: ['Pudhumai Penn Scheme', 'TN ₹1,000 Monthly Girl Student Assistance'],
    nativeNames: {
      tamil: 'மூவலூர் இராமாமிர்தம் அம்மையார் புதுமைப் பெண் திட்டம்',
      hindi: 'पुधुमाई पेन योजना (तमिलनाडु)'
    },
    ministry: 'Government of Tamil Nadu',
    department: 'Social Welfare and Women Empowerment Department, Tamil Nadu',
    governmentLevel: 'State',
    government_level: 'STATE',
    state: 'Tamil Nadu',
    category: 'Students',
    targetBeneficiary: 'Girl students from Tamil Nadu who studied in government schools (Classes 6 to 12) pursuing higher education',
    shortDescription: 'Monthly ₹1,000 cash grant deposited directly into female students’ bank accounts till completion of their degree, diploma, or ITI.',
    plainSummary: 'Provides ₹1,000 every month directly to female college students in Tamil Nadu who completed their schooling in government schools.',
    mainBenefit: 'Direct monthly deposit of ₹1,000 into girl students’ bank accounts until completion of graduation / diploma / ITI',
    benefitType: 'Direct Cash Transfer',
    applicationMode: 'Online',
    applicationStatus: 'Open',
    status: 'ACTIVE',
    deadline: 'Rolling with college admissions',
    openingDate: '1 July 2026',
    officialUrl: 'https://pudhumaipenn.tn.gov.in/',
    officialPortal: 'https://pudhumaipenn.tn.gov.in/',
    officialSource: 'https://pudhumaipenn.tn.gov.in/',
    sourceDocument: 'G.O.(Ms) No. 47, Social Welfare and Women Empowerment Dept, Tamil Nadu',
    sourceType: 'Official State Government Order',
    lastVerified: '10/09/2026',
    isOfficialSourceVerified: true,
    verificationStatus: 'Verified',
    verification_status: 'VERIFIED',
    helpline: '181 (Women Helpline) / 044-24351891',
    keywords: ['pudhumai penn', 'tamil nadu scholarship', '1000 per month', 'girl student', 'higher education'],
    eligibilityRules: {
      minAge: 17,
      maxAge: 25,
      gender: 'Female',
      states: ['Tamil Nadu'],
      customConditions: [
        'Must be a female student native to Tamil Nadu',
        'Must have studied continuously from Class 6 to 12 in Tamil Nadu Government Schools',
        'Currently enrolled in recognized UG degree, professional course, polytechnic, or ITI'
      ]
    },
    requiredDocuments: [
      { id: 'tn_emis', name: 'School EMIS Number', whyNeeded: 'Verification of government school education Classes 6-12', howToObtain: 'From school Headmaster', isMandatory: true }
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: 'College Campus Enrolment',
        description: 'College nodal officer registers eligible female students using their EMIS number on https://pudhumaipenn.tn.gov.in.',
        portalUrl: 'https://pudhumaipenn.tn.gov.in/'
      }
    ]
  },

  // ==========================================
  // CENTRAL GOVERNMENT: NATIONAL SCHOLARSHIP PORTAL (NSP) (Authoritative: https://scholarships.gov.in/)
  // ==========================================
  {
    id: 'central-nsp-csss-scholarship',
    recordId: 'CENTRAL-NSP-CSSS-2026',
    recordType: 'SCHOLARSHIP',
    name: 'Central Sector Scheme of Scholarship for College and University Students (NSP)',
    official_name: 'Central Sector Scheme of Scholarship for College and University Students (PM-USP CSSS)',
    short_name: 'Central Sector Scholarship',
    acronym: 'CSSS',
    portal_id: 'national-scholarship-portal',
    aliases: [
      'NSP',
      'National Scholarship Portal',
      'NSP scholarship',
      'Central Sector Scholarship',
      'CSSS',
      'scholarships.gov.in',
      'government schemes for students in India',
      'central scholarship for college students'
    ],
    common_names: ['NSP Central Sector Scholarship', 'PM-USP CSSS', 'scholarships.gov.in'],
    nativeNames: {
      hindi: 'कॉलेज और विश्वविद्यालय के छात्रों के लिए केंद्रीय क्षेत्र छात्रवृत्ति योजना'
    },
    ministry: 'Ministry of Education, Government of India',
    department: 'Department of Higher Education',
    governmentLevel: 'Central',
    government_level: 'CENTRAL',
    state: 'All-India',
    category: 'Students',
    targetBeneficiary: 'Top 82,000 meritorious Class 12 pass-outs across all state and central boards pursuing full-time higher education',
    shortDescription: 'National Scholarship Portal (NSP) flagship merit-cum-means scholarship of ₹12,000/year for graduation and ₹20,000/year for post-graduation.',
    plainSummary: 'If you scored above the 80th percentile in your 12th Board examinations and have family income under ₹4.5 Lakhs, this Central scheme pays ₹12,000/year for your degree.',
    mainBenefit: '₹12,000 per year for first 3 years of UG degree; ₹20,000 per year for 4th/5th year and PG courses',
    benefitType: 'Direct Cash Transfer',
    applicationMode: 'Online',
    applicationStatus: 'Open',
    status: 'ACTIVE',
    deadline: '31 December 2026',
    openingDate: '15 July 2026',
    officialUrl: 'https://scholarships.gov.in/',
    officialPortal: 'https://scholarships.gov.in/',
    officialSource: 'https://scholarships.gov.in/',
    sourceDocument: 'Guidelines for Central Sector Scheme of Scholarship, Department of Higher Education, GoI',
    sourceType: 'Official Government of India Notification',
    lastVerified: '10/09/2026',
    isOfficialSourceVerified: true,
    verificationStatus: 'Verified',
    verification_status: 'VERIFIED',
    helpline: '0120-6619540 (NSP Helpdesk)',
    keywords: ['nsp', 'central sector scholarship', 'scholarships.gov.in', 'merit scholarship', 'higher education'],
    eligibilityRules: {
      minAge: 17,
      maxAge: 25,
      states: ['All-India'],
      maxIncome: 450000,
      customConditions: [
        'Scored above 80th percentile in respective Class 12 board examination (CBSE, ICSE, or State Boards)',
        'Pursuing regular full-time degree/diploma course in recognized college/university',
        'Gross annual parental income not exceeding ₹4,50,000',
        'Not receiving any other Central or State government scholarship'
      ]
    },
    requiredDocuments: [
      { id: 'nsp_aadhaar', name: 'Aadhaar Card (Aadhaar Seeded Bank Account)', whyNeeded: 'Direct Benefit Transfer', howToObtain: 'From UIDAI', isMandatory: true },
      { id: 'nsp_income', name: 'Income Certificate (≤ ₹4.5 Lakh)', whyNeeded: 'Proof of income limit', howToObtain: 'From competent revenue authority', isMandatory: true }
    ],
    applicationSteps: [
      {
        stepNumber: 1,
        title: 'One-Time Registration (OTR) on NSP',
        description: 'Complete One-Time Registration using Aadhaar / Face RD app on https://scholarships.gov.in.',
        portalUrl: 'https://scholarships.gov.in/'
      }
    ]
  }
];
