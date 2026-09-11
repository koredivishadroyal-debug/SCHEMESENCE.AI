import { Scheme, UserProfile } from '../types';
import { NATIONWIDE_SERVICES_AND_SCHEMES } from './nationwideServicesAndSchemes';
import { ALL_NATIONWIDE_SCHEMES, deduplicateSchemes } from './nationwideRegistry';

const BASE_SCHEMES: Scheme[] = [
  {
    id: 'pm-kisan',
    name: 'PM Kisan Samman Nidhi Yojana',
    nativeNames: {
      hindi: 'प्रधानमंत्री किसान सम्मान निधि योजना',
      telugu: 'పీఎం కిసాన్ సమ్మాన్ నిధి యోజన',
    },
    department: 'Ministry of Agriculture & Farmers Welfare',
    governmentLevel: 'Central',
    state: 'All-India',
    category: 'Agriculture',
    shortDescription: 'Income support of ₹6,000 per year in three equal installments to all landholding farmer families across India.',
    plainSummary: 'If your family owns cultivable agricultural land and is registered as a farmer, the central government deposits ₹2,000 directly into your bank account every 4 months (total ₹6,000 annually) to help with seed, fertilizer, and farming expenses.',
    mainBenefit: '₹6,000 / year (Direct Bank Transfer in 3 cycles)',
    benefitType: 'Direct Cash Transfer',
    eligibilityRules: {
      minAge: 18,
      requiresFarmer: true,
      maxLandAcres: 50, // Landholding farmer
      occupations: ['Farmer'],
      customConditions: [
        'Must own cultivable agricultural land with land title in applicant name',
        'Applicant or family member must NOT be an institutional landholder or high-income tax payer',
        'Must complete Aadhaar e-KYC on PM-KISAN portal or via biometric CSC'
      ]
    },
    requiredDocuments: [
      {
        id: 'doc-aadhaar',
        name: 'Aadhaar Card',
        whyNeeded: 'Used for biometric verification and Direct Benefit Transfer (DBT) linking.',
        howToObtain: 'Download e-Aadhaar from UIDAI portal (eaadhaar.uidai.gov.in) or visit Aadhaar Seva Kendra.',
        officialLink: 'https://uidai.gov.in',
        isMandatory: true,
      },
      {
        id: 'doc-land-patta',
        name: 'Land Ownership Document / Patta Passbook / RoR (Record of Rights)',
        whyNeeded: 'Proves legal title and ownership of cultivable agricultural land in your name.',
        howToObtain: 'Obtain digitally from your State Land Records portal (e.g., Dharani/Meebhoomi/Bhulekh) or local Tahsildar/Village Revenue Officer (VRO).',
        isMandatory: true,
      },
      {
        id: 'doc-bank-passbook',
        name: 'Active Bank Passbook seeded with NPCI / Aadhaar',
        whyNeeded: 'Ensures DBT payment successfully lands in your bank without rejection.',
        howToObtain: 'Request your bank branch to link Aadhaar with NPCI mapping for DBT receipt.',
        isMandatory: true,
      }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Check Land Record & e-KYC', description: 'Ensure your land document (Khata/Khesra/Patta) is updated in state land records.' },
      { stepNumber: 2, title: 'Visit PM-KISAN Portal', description: 'Open verified portal https://pmkisan.gov.in and click on "New Farmer Registration".', portalUrl: 'https://pmkisan.gov.in' },
      { stepNumber: 3, title: 'Enter Aadhaar & State', description: 'Select Rural/Urban Farmer, enter Aadhaar number, mobile number, and select your state.' },
      { stepNumber: 4, title: 'Fill Land Survey Details', description: 'Enter Village, Sub-District, Survey/Khata Number, and upload land deed copy.' },
      { stepNumber: 5, title: 'Verification by Nodal Officer', description: 'District agriculture officer verifies land records within 15-30 days.' },
      { stepNumber: 6, title: 'DBT Credit to Account', description: 'Installment of ₹2,000 credited directly to Aadhaar-linked bank account.' }
    ],
    deadline: 'Rolling (Open all year)',
    openingDate: 'Active round-the-clock',
    officialUrl: 'https://pmkisan.gov.in',
    sourceDocument: 'Ministry of Agriculture Gazette Circular Ref No. 1-1/2019-Credit',
    lastVerified: 'September 2026',
    isOfficialSourceVerified: true,
    applicationStatus: 'Rolling',
    helpline: '155261 / 011-24300606 (PM-Kisan Toll-Free)'
  },
  {
    id: 'ayushman-bharat',
    name: 'Ayushman Bharat – Pradhan Mantri Jan Arogya Yojana (PM-JAY)',
    nativeNames: {
      hindi: 'आयुष्मान भारत - प्रधानमंत्री जन आरोग्य योजना',
      telugu: 'ఆయుష్మాన్ భారత్ - ప్రధాన మంత్రి జన్ ఆరోగ్య యోజన',
    },
    department: 'National Health Authority (NHA) & Ministry of Health',
    governmentLevel: 'Central',
    state: 'All-India',
    category: 'Healthcare',
    shortDescription: 'World\'s largest public health assurance scheme offering ₹5,00,000 free hospitalization cover per family per year.',
    plainSummary: 'Provides free, cashless medical treatment up to ₹5 Lakh per year for your entire family across 27,000+ government and private network hospitals for surgeries, treatments, diagnostics, and medicines.',
    mainBenefit: '₹5,00,000 / year Cashless Health Coverage',
    benefitType: 'Insurance',
    eligibilityRules: {
      maxIncome: 300000,
      customConditions: [
        'Households listed in Socio-Economic Caste Census (SECC 2011) or possessing active NFSA/BPL Ration Card',
        'All Senior Citizens aged 70+ are universally eligible irrespective of income under PM-JAY Senior Citizen expansion',
        'No ceiling on family size or age of family members'
      ]
    },
    requiredDocuments: [
      {
        id: 'doc-aadhaar',
        name: 'Aadhaar Card',
        whyNeeded: 'Primary biometric photo identity to generate your unique ABHA / Ayushman Card.',
        howToObtain: 'Download e-Aadhaar from UIDAI or present physical card.',
        officialLink: 'https://uidai.gov.in',
        isMandatory: true
      },
      {
        id: 'doc-ration-card',
        name: 'Ration Card (BPL / Antyodaya / Food Security Card)',
        whyNeeded: 'Proves family unit membership and economic category as per state civil supplies registry.',
        howToObtain: 'Civil Supplies Dept or State PDS portal (Food & Consumer Affairs).',
        isMandatory: true
      }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Check Eligibility Online', description: 'Visit https://beneficiary.nha.gov.in or https://mera.pmjay.gov.in and enter your mobile/Ration card.', portalUrl: 'https://beneficiary.nha.gov.in' },
      { stepNumber: 2, title: 'e-KYC Authentication', description: 'Authenticate using Aadhaar OTP or visit nearest Common Service Center (CSC) or Government Hospital Ayushman Mitra kiosk.' },
      { stepNumber: 3, title: 'Download Ayushman Card (PVC / Digital)', description: 'Once approved, download the laminated Ayushman Card with unique QR code.' },
      { stepNumber: 4, title: 'Cashless Hospital Admission', description: 'Show the card at any empanelled hospital helpdesk for completely cashless treatment.' }
    ],
    deadline: 'Rolling (Open all year)',
    openingDate: 'Continuous enrollment',
    officialUrl: 'https://beneficiary.nha.gov.in',
    sourceDocument: 'National Health Authority Operational Guidelines Vol IV',
    lastVerified: 'August 2026',
    isOfficialSourceVerified: true,
    applicationStatus: 'Rolling',
    helpline: '14555 (Toll-Free 24x7 National Health Helpline)'
  },
  {
    id: 'post-matric-scholarship',
    name: 'Post-Matric Scholarship Scheme for Students',
    nativeNames: {
      hindi: 'पोस्ट मैट्रिक छात्रवृत्ति योजना',
      telugu: 'పోస్ట్ మెట్రిక్ స్కాలర్‌షిప్ పథకం',
    },
    department: 'Ministry of Social Justice & Empowerment / State Higher Education Dept',
    governmentLevel: 'Central',
    state: 'All-India',
    category: 'Students',
    shortDescription: '100% course tuition fee waiver plus monthly maintenance allowance for Class 11 to PhD students.',
    plainSummary: 'If you are studying after 10th standard (Intermediate, Diploma, ITI, Degree, Engineering, Medicine, or Masters) and your family income is under ₹2.5 Lakh, the government pays your college fees directly and sends a monthly student stipend to your bank.',
    mainBenefit: 'Full Tuition Fee Reimbursement + up to ₹13,500/year allowance',
    benefitType: 'Reimbursement',
    eligibilityRules: {
      minAge: 15,
      maxAge: 35,
      occupations: ['Student'],
      maxIncome: 250000,
      socialCategories: ['SC', 'ST', 'OBC', 'EWS'],
      customConditions: [
        'Must be enrolled in a recognized Post-Matriculation or Post-Secondary course (Class 11, Degree, PG, Professional)',
        'Must have passed the previous qualifying examination with minimum required attendance (75%)',
        'Annual parental income from all sources must not exceed ₹2,50,000'
      ]
    },
    requiredDocuments: [
      {
        id: 'doc-income-cert',
        name: 'Income Certificate (Current Financial Year)',
        whyNeeded: 'Certifies that total family annual income is below ₹2.5 Lakh.',
        howToObtain: 'Issued by Tahsildar / Revenue Divisional Officer via State portal (MeeSeva / e-District).',
        isMandatory: true
      },
      {
        id: 'doc-caste-cert',
        name: 'Community / Caste Certificate',
        whyNeeded: 'Verifies eligibility under SC / ST / OBC / EWS categories.',
        howToObtain: 'Obtain from local Revenue Department / MeeSeva / CSC center.',
        isMandatory: true
      },
      {
        id: 'doc-marks-memo',
        name: 'Previous Class Marks Sheet & Bonafide Certificate',
        whyNeeded: 'Proof of continuous academic progression and college admission confirmation.',
        howToObtain: 'Issued by your School / Junior College / University Registrar.',
        isMandatory: true
      },
      {
        id: 'doc-aadhaar-bank',
        name: 'Aadhaar Seeded Bank Account Details',
        whyNeeded: 'For direct DBT deposit of maintenance allowance.',
        howToObtain: 'Bank branch confirmation letter / Passbook front page copy.',
        isMandatory: true
      }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Register on National Scholarship Portal', description: 'Visit https://scholarships.gov.in and click "New Registration" using Aadhaar.', portalUrl: 'https://scholarships.gov.in' },
      { stepNumber: 2, title: 'Fill Application Details', description: 'Select your state, scholarship category, institution, and enter bank IFSC.' },
      { stepNumber: 3, title: 'Upload Scanned Documents', description: 'Upload income certificate, caste certificate, and previous year marks memo.' },
      { stepNumber: 4, title: 'Institute Level Verification', description: 'Your college/institution verification officer verifies your admission records.' },
      { stepNumber: 5, title: 'District Nodal Officer Approval', description: 'District welfare officer sanctions the scholarship.' },
      { stepNumber: 6, title: 'Disbursement via PFMS', description: 'Tuition fees credited to college and maintenance allowance credited to student account.' }
    ],
    deadline: 'October 31, 2026',
    openingDate: 'July 1, 2026',
    officialUrl: 'https://scholarships.gov.in',
    sourceDocument: 'NSP Guidelines 2026-27 Ref MSJE/NSP-402',
    lastVerified: 'September 2026',
    isOfficialSourceVerified: true,
    applicationStatus: 'Open',
    helpline: '0120-6619540 (NSP Helpdesk)'
  },
  {
    id: 'pm-awas-yojana',
    name: 'Pradhan Mantri Awas Yojana (PMAY - Housing for All)',
    nativeNames: {
      hindi: 'प्रधानमंत्री आवास योजना (ग्रामीण एवं शहरी)',
      telugu: 'ప్రధాన మంత్రి ఆవాస్ యోజన',
    },
    department: 'Ministry of Housing and Urban Affairs & Ministry of Rural Development',
    governmentLevel: 'Central',
    state: 'All-India',
    category: 'Housing',
    shortDescription: 'Financial assistance of ₹1.2 Lakh (Gramin) up to ₹2.67 Lakh interest subsidy (Urban) to build your own permanent pucca home.',
    plainSummary: 'If your family lives in a kutcha (temporary/thatched) house or does not own a pucca house anywhere in India, the government provides direct financial assistance to build a durable cement home equipped with toilet and electricity.',
    mainBenefit: '₹1,20,000 to ₹2,67,000 Housing Subsidy / Grant',
    benefitType: 'Subsidy',
    eligibilityRules: {
      minAge: 21,
      maxIncome: 600000,
      housingStatusAllowed: ['Kutcha House', 'Rented House', 'Homeless', 'BPL / Antyodaya Card Holder'],
      customConditions: [
        'Beneficiary family must NOT own a pucca house anywhere in India in any member\'s name',
        'Preference given to women-headed households, widows, SC/ST, and disabled citizens',
        'House construction must adhere to disaster-resilient building standards'
      ]
    },
    requiredDocuments: [
      {
        id: 'doc-aadhaar',
        name: 'Aadhaar Card of all family members',
        whyNeeded: 'Verifies no member has claimed PMAY house anywhere in the country.',
        howToObtain: 'UIDAI portal or physical cards.',
        isMandatory: true
      },
      {
        id: 'doc-bpl-ration',
        name: 'BPL Ration Card / SECC Household Registration Slip',
        whyNeeded: 'Validates housing deprivation status in rural/urban census.',
        howToObtain: 'Grama Panchayat office or State Municipal Office.',
        isMandatory: true
      },
      {
        id: 'doc-house-site-patta',
        name: 'House Site Title Deed / Land Ownership Paper',
        whyNeeded: 'Proof of legal ownership of land plot where house will be constructed.',
        howToObtain: 'Tahsildar / Village Revenue Officer (VRO).',
        isMandatory: true
      },
      {
        id: 'doc-bank-acc',
        name: 'Active Bank Passbook',
        whyNeeded: 'Installments are released in 3 geo-tagged construction stages directly to bank.',
        howToObtain: 'Nationalized or Gramin bank passbook.',
        isMandatory: true
      }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Verify SECC / Housing List', description: 'Check your family name on Awaas+ list via Gram Panchayat or municipality.' },
      { stepNumber: 2, title: 'Online Registration via CSC', description: 'Visit nearest Common Service Center (CSC) or apply on https://pmaymis.gov.in.', portalUrl: 'https://pmaymis.gov.in' },
      { stepNumber: 3, title: 'Field Geo-tagging of Current House', description: 'Panchayat Secretary or Ward Officer takes photo of your kutcha house with geo-coordinates.' },
      { stepNumber: 4, title: 'Sanction Letter Issuance', description: 'District Collector sanctions first installment of funds.' },
      { stepNumber: 5, title: 'Phased Construction & Direct DBT', description: 'Funds released in 3 stages: Foundation level, Lintel level, and Roof completion.' }
    ],
    deadline: 'Rolling (Phase III ongoing)',
    openingDate: 'Active round-the-clock',
    officialUrl: 'https://pmaymis.gov.in',
    sourceDocument: 'MoHUA PMAY Operational Guidelines Rev 2025',
    lastVerified: 'August 2026',
    isOfficialSourceVerified: true,
    applicationStatus: 'Rolling',
    helpline: '1800-11-3377 / 1800-11-3388 (PMAY Helpline)'
  },
  {
    id: 'mudra-yojana',
    name: 'Pradhan Mantri MUDRA Yojana (PMMY - Business Loans)',
    nativeNames: {
      hindi: 'प्रधानमंत्री मुद्रा योजना',
      telugu: 'ప్రధాన మంత్రి ముద్ర యోజన',
    },
    department: 'Ministry of Finance & Small Industries Development Bank of India (SIDBI)',
    governmentLevel: 'Central',
    state: 'All-India',
    category: 'Business',
    shortDescription: 'Collateral-free business loans up to ₹10-20 Lakh with low interest rates for small entrepreneurs, shops, and startups.',
    plainSummary: 'Provides easy, collateral-free loans to start or expand small shops, grocery stores, food stalls, transport, repairs, manufacturing, or service businesses without asking for property mortgage.',
    mainBenefit: 'Up to ₹10,00,000 Collateral-Free Business Credit (Shishu, Kishor, Tarun)',
    benefitType: 'Loan / Credit',
    eligibilityRules: {
      minAge: 18,
      maxAge: 65,
      occupations: ['Business', 'Self-Employed', 'Daily Wage / Laborer', 'Unemployed'],
      customConditions: [
        'Non-corporate small business segment (proprietorship, partnership, small manufacturing, trading)',
        'Applicant must not be a defaulter with any commercial bank or microfinance institution',
        'Three categories: Shishu (loans up to ₹50,000), Kishor (₹50,000 to ₹5 Lakh), Tarun (₹5 Lakh to ₹10 Lakh)'
      ]
    },
    requiredDocuments: [
      {
        id: 'doc-aadhaar-pan',
        name: 'Aadhaar Card & PAN Card',
        whyNeeded: 'Mandatory KYC identity and tax validation.',
        howToObtain: 'From UIDAI and NSDL/UTIITSL portals.',
        isMandatory: true
      },
      {
        id: 'doc-business-address',
        name: 'Business Address Proof & Trade License / Udyam Registration',
        whyNeeded: 'Confirms existence of commercial premise or small business setup.',
        howToObtain: 'Free instant Udyam registration at https://udyamregistration.gov.in.',
        officialLink: 'https://udyamregistration.gov.in',
        isMandatory: true
      },
      {
        id: 'doc-bank-statement',
        name: 'Bank Statement of Last 6 Months',
        whyNeeded: 'Assesses financial transactions and business cash flow.',
        howToObtain: 'Downloaded from Net Banking or branch stamp.',
        isMandatory: true
      },
      {
        id: 'doc-project-report',
        name: 'Brief Business Project Report / Quotations',
        whyNeeded: 'Shows estimated expenditure on machinery, stock, or shop renovation.',
        howToObtain: 'Prepared with bank manager or local chartered accountant / chartered accountant-free template.',
        isMandatory: false
      }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Get Free Udyam Registration', description: 'Register your micro enterprise for free on https://udyamregistration.gov.in using Aadhaar.' },
      { stepNumber: 2, title: 'Apply on JanSamarth Portal', description: 'Visit official credit platform https://www.jansamarth.in and select "Business Activity Loan - PMMY".', portalUrl: 'https://www.jansamarth.in' },
      { stepNumber: 3, title: 'Choose Loan Category', description: 'Select Shishu (up to ₹50K), Kishor (up to ₹5L), or Tarun (up to ₹10L).' },
      { stepNumber: 4, title: 'Bank Match & In-Principle Approval', description: 'Platform connects your request to preferred partner bank branch.' },
      { stepNumber: 5, title: 'Disbursement & MUDRA Card', description: 'Loan sanctioned without collateral security and MUDRA debit card issued for working capital.' }
    ],
    deadline: 'Rolling (Open all year)',
    openingDate: 'Continuous availability',
    officialUrl: 'https://www.mudra.org.in',
    sourceDocument: 'RBI & Dept of Financial Services Gazette Notification',
    lastVerified: 'September 2026',
    isOfficialSourceVerified: true,
    applicationStatus: 'Rolling',
    helpline: '1800-180-1111 (National MUDRA Helpline)'
  },
  {
    id: 'sukanya-samriddhi',
    name: 'Sukanya Samriddhi Yojana (Beti Bachao, Beti Padhao)',
    nativeNames: {
      hindi: 'सुकन्या समृद्धि योजना',
      telugu: 'సుకున్య సమృద్ధి యోజన',
    },
    department: 'Ministry of Women and Child Development & Department of Posts',
    governmentLevel: 'Central',
    state: 'All-India',
    category: 'Women',
    shortDescription: 'Highest guaranteed government interest rate (8.2% p.a.) savings scheme with 100% tax exemption for girl child education and marriage.',
    plainSummary: 'A special government-backed high-interest savings account for any girl child under age 10. Start with as little as ₹250 per year. The accumulated amount grows safely with tax-free interest to pay for her college degree and wedding.',
    mainBenefit: '8.2% Compounded Interest + 100% Tax Free Corpus at age 21',
    benefitType: 'Subsidy',
    eligibilityRules: {
      maxAge: 10,
      gender: 'Female',
      customConditions: [
        'Girl child must be an Indian citizen under 10 years of age at the time of account opening',
        'Account can be opened by natural or legal guardian (maximum 2 accounts per family, with twin exception)',
        'Deposit can be made for 15 years; matures when the girl turns 21'
      ]
    },
    requiredDocuments: [
      {
        id: 'doc-birth-cert',
        name: 'Girl Child Birth Certificate',
        whyNeeded: 'Official proof of date of birth and parentage.',
        howToObtain: 'From Municipal Corporation or Village Registrar of Births & Deaths.',
        isMandatory: true
      },
      {
        id: 'doc-guardian-kyc',
        name: 'Guardian Identity & Address Proof (Aadhaar & PAN)',
        whyNeeded: 'KYC of the parent or legal guardian operating the account.',
        howToObtain: 'UIDAI / Income Tax department.',
        isMandatory: true
      }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Obtain Form-1 Account Opening Form', description: 'Download from India Post website or visit nearest Post Office or authorized nationalized bank branch.', portalUrl: 'https://www.indiapost.gov.in' },
      { stepNumber: 2, title: 'Attach Birth Certificate & KYC', description: 'Attach child’s birth certificate and guardian Aadhaar/PAN copy with passport photos.' },
      { stepNumber: 3, title: 'Initial Deposit', description: 'Deposit minimum initial amount (starting at just ₹250 up to ₹1.5 Lakh/yr).' },
      { stepNumber: 4, title: 'Receive Passbook', description: 'Post office or bank issues a dedicated Sukanya Samriddhi passbook with account number.' }
    ],
    deadline: 'Rolling (Open until child reaches 10 years)',
    openingDate: 'Continuous',
    officialUrl: 'https://www.indiapost.gov.in',
    sourceDocument: 'Government Savings Promotion Act Notification G.S.R. 914(E)',
    lastVerified: 'September 2026',
    isOfficialSourceVerified: true,
    applicationStatus: 'Rolling',
    helpline: '1800-266-6868 (India Post Customer Care)'
  },
  {
    id: 'pm-vishwakarma',
    name: 'PM Vishwakarma Scheme (Support for Traditional Artisans & Craftspeople)',
    nativeNames: {
      hindi: 'पीएम विश्वकर्मा योजना',
      telugu: 'పీఎం విశ్వకర్మ పథకం',
    },
    department: 'Ministry of Micro, Small and Medium Enterprises (MSME)',
    governmentLevel: 'Central',
    state: 'All-India',
    category: 'Skill Development',
    shortDescription: 'Free modern toolkit incentive of ₹15,000, 5-7 days paid skill training (₹500/day stipend), and collateral-free loans at 5% interest.',
    plainSummary: 'Designed for 18 traditional trades (carpenters, blacksmiths, potters, masons, cobblers, tailors, sculptors, barbers, washermen, etc.). Gives you an official ID card, ₹15,000 voucher for modern toolkits, and low-interest business loans up to ₹3 Lakh.',
    mainBenefit: '₹15,000 Toolkit Incentive + ₹3 Lakh Loan at 5% interest + ₹500/day training stipend',
    benefitType: 'In-Kind',
    eligibilityRules: {
      minAge: 18,
      occupations: ['Daily Wage / Laborer', 'Self-Employed', 'Business', 'Other'],
      customConditions: [
        'Must be working in one of the 18 recognized traditional family-based trades (Carpenter, Boat Maker, Armorer, Blacksmith, Hammer & Tool Kit Maker, Locksmith, Sculptor, Goldsmith, Potter, Cobbler, Mason, Basket/Mat/Broom maker, Doll & Toy Maker, Barber, Garland Maker, Washerman, Tailor, Fishing Net Maker)',
        'Only one member per family can register',
        'Should not have availed similar government credit schemes (PMEGP, PM SVANidhi, MUDRA) in the last 5 years'
      ]
    },
    requiredDocuments: [
      {
        id: 'doc-aadhaar',
        name: 'Aadhaar Card linked with active mobile number',
        whyNeeded: 'For biometric authentication during registration at Common Service Center (CSC).',
        howToObtain: 'UIDAI.',
        isMandatory: true
      },
      {
        id: 'doc-bank-account',
        name: 'Bank Passbook / Account details',
        whyNeeded: 'For direct credit of training stipend and toolkit e-vouchers.',
        howToObtain: 'Bank branch passbook.',
        isMandatory: true
      },
      {
        id: 'doc-ration-card',
        name: 'Ration Card (Family ID)',
        whyNeeded: 'Ensures only one eligible member per household is enrolled.',
        howToObtain: 'Food & Civil Supplies Department.',
        isMandatory: true
      }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Visit CSC for Biometric Enrolment', description: 'Visit nearest Common Service Center (CSC) with Aadhaar and mobile phone.' },
      { stepNumber: 2, title: 'Register on PM Vishwakarma Portal', description: 'CSC operator registers your specific trade on https://pmvishwakarma.gov.in.', portalUrl: 'https://pmvishwakarma.gov.in' },
      { stepNumber: 3, title: 'Three-Stage Verification', description: 'Verified by Gram Panchayat / Urban Local Body, District Implementation Committee, and Screening Committee.' },
      { stepNumber: 4, title: 'Receive PM Vishwakarma Digital Certificate & ID', description: 'Digital ID card and certificate recognizing your craftmanship issued.' },
      { stepNumber: 5, title: 'Basic Skill Training & ₹15,000 Toolkit Grant', description: 'Attend 5-7 days training at ITI/training center with ₹500/day stipend and receive ₹15,000 toolkit voucher.' },
      { stepNumber: 6, title: 'Concessional Credit Support', description: 'Apply for 1st tranche loan up to ₹1 Lakh at 5% interest without collateral.' }
    ],
    deadline: 'Rolling (Open all year)',
    openingDate: 'Active round-the-clock',
    officialUrl: 'https://pmvishwakarma.gov.in',
    sourceDocument: 'MSME Gazette Notification Ref PMV/2023/HQ',
    lastVerified: 'September 2026',
    isOfficialSourceVerified: true,
    applicationStatus: 'Rolling',
    helpline: '1800-267-7777 / 011-23061500 (PM Vishwakarma Toll-Free)'
  },
  {
    id: 'rythu-bharosa-telangana',
    name: 'Telangana Rythu Bharosa / Investment Support Scheme',
    nativeNames: {
      hindi: 'तेलंगाना रैतु भरोसा योजना',
      telugu: 'తెలంగాణ రైతు భరోసా పథకం',
    },
    department: 'Department of Agriculture & Farmers Welfare, Govt of Telangana',
    governmentLevel: 'State',
    state: 'Telangana',
    category: 'Agriculture',
    shortDescription: 'Direct investment support of ₹15,000 per acre per year for landholding farmers and tenant farmers in Telangana.',
    plainSummary: 'Government of Telangana provides direct cash transfer of ₹15,000 per acre annually (₹7,500 per crop season for Kharif and Rabi) directly to your bank account to purchase seeds, fertilizers, pesticides, and cover field preparation costs.',
    mainBenefit: '₹15,000 / acre / year Investment Support',
    benefitType: 'Direct Cash Transfer',
    eligibilityRules: {
      minAge: 18,
      states: ['Telangana'],
      requiresFarmer: true,
      occupations: ['Farmer'],
      customConditions: [
        'Applicant must be a resident of Telangana owning registered agricultural land in Dharani portal or verified tenant farmer',
        'Valid Pattadar Passbook with Aadhaar linkage',
        'Direct credit disbursed before each crop sowing season'
      ]
    },
    requiredDocuments: [
      {
        id: 'doc-pattadar-passbook',
        name: 'Dharani Pattadar Passbook / Digital RoR 1B',
        whyNeeded: 'Proof of land parcel extent and ownership in Telangana.',
        howToObtain: 'Download digital copy from Dharani portal (dharani.telangana.gov.in).',
        officialLink: 'https://dharani.telangana.gov.in',
        isMandatory: true
      },
      {
        id: 'doc-aadhaar',
        name: 'Aadhaar Card',
        whyNeeded: 'Biometric identification and Aadhaar-enabled payment system.',
        howToObtain: 'UIDAI.',
        isMandatory: true
      },
      {
        id: 'doc-bank-acc',
        name: 'Bank Passbook (Telangana Grameena Bank, Cooperative, or Commercial Bank)',
        whyNeeded: 'For direct electronic transfer of seasonal funds.',
        howToObtain: 'Bank branch copy.',
        isMandatory: true
      }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Land Verification on Dharani', description: 'Confirm that your land records and survey numbers are validated on Dharani portal.' },
      { stepNumber: 2, title: 'Submit Details to Agriculture Extension Officer (AEO)', description: 'Provide Pattadar passbook number and Aadhaar details to your village AEO.' },
      { stepNumber: 3, title: 'Village Level Display List (Social Audit)', description: 'Panchayat displays the beneficiary list before season disbursement for transparency.' },
      { stepNumber: 4, title: 'Seasonal DBT Credit', description: 'Funds credited directly to bank account ahead of sowing season.' }
    ],
    deadline: 'Seasonal (Prior to Kharif & Rabi cycles)',
    openingDate: 'May & November each year',
    officialUrl: 'https://rythubharosa.telangana.gov.in',
    sourceDocument: 'Govt of Telangana G.O. Ms. No. 24, Agriculture & Cooperation Dept',
    lastVerified: 'September 2026',
    isOfficialSourceVerified: true,
    applicationStatus: 'Open',
    helpline: '1800-425-3502 (Telangana Kisan Call Centre)'
  },
  {
    id: 'kalyana-lakshmi-shaadi-mubarak',
    name: 'Telangana Kalyana Lakshmi / Shaadi Mubarak Scheme',
    nativeNames: {
      hindi: 'कल्याणा लक्ष्मी / शादी मुबारक योजना',
      telugu: 'కళ్యాణ లక్ష్మి / షాదీ ముబారక్ పథకం',
    },
    department: 'BC / SC / ST / Minorities Welfare Dept, Govt of Telangana',
    governmentLevel: 'State',
    state: 'Telangana',
    category: 'Women',
    shortDescription: 'One-time financial assistance of ₹1,00,116 for marriage of girls belonging to poor families.',
    plainSummary: 'Provides a one-time cash grant of ₹1,00,116 transferred to the unmarried bride\'s mother\'s bank account to curb child marriage and help underprivileged families meet wedding expenses with dignity.',
    mainBenefit: '₹1,00,116 One-Time Cash Grant',
    benefitType: 'Direct Cash Transfer',
    eligibilityRules: {
      minAge: 18,
      gender: 'Female',
      states: ['Telangana'],
      maxIncome: 200000,
      socialCategories: ['SC', 'ST', 'OBC', 'EWS'],
      customConditions: [
        'Bride must be at least 18 years old at the date of marriage',
        'Family annual income must not exceed ₹2,00,000 in urban areas or ₹1,50,000 in rural areas',
        'Bride and family must be permanent residents of Telangana'
      ]
    },
    requiredDocuments: [
      {
        id: 'doc-bride-age-proof',
        name: 'Bride Age Proof (Birth Certificate or SSC 10th Marks Memo)',
        whyNeeded: 'Strictly verifies bride is 18 years or older on wedding date.',
        howToObtain: 'From school board or municipal registrar.',
        isMandatory: true
      },
      {
        id: 'doc-income-caste-meeseva',
        name: 'MeeSeva Income & Caste Certificate',
        whyNeeded: 'Proof of economic criteria and social category.',
        howToObtain: 'Obtained via MeeSeva portal (ts.meeseva.telangana.gov.in).',
        isMandatory: true
      },
      {
        id: 'doc-wedding-card',
        name: 'Wedding Invitation Card & Marriage Certificate / Confirmation Letter',
        whyNeeded: 'Confirms wedding solemnization details.',
        howToObtain: 'From Gram Panchayat secretary or Marriage registrar.',
        isMandatory: true
      },
      {
        id: 'doc-mother-bank-acc',
        name: 'Bride\'s Mother\'s Bank Passbook & Aadhaar',
        whyNeeded: 'Funds are strictly credited to bride\'s mother\'s account to safeguard empowerment.',
        howToObtain: 'Nationalized bank passbook.',
        isMandatory: true
      }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Apply on Telanganpass Portal', description: 'Visit official ePASS portal https://telanganaepass.cgg.gov.in and click on "Kalyana Lakshmi / Shaadi Mubarak".', portalUrl: 'https://telanganaepass.cgg.gov.in' },
      { stepNumber: 2, title: 'Upload Scanned Certificates', description: 'Upload bride\'s age proof, wedding invitation card, income certificate, and mother\'s bank passbook.' },
      { stepNumber: 3, title: 'Verification by Revenue Dept (MRO/Tahsildar)', description: 'Mandal Revenue Officer conducts physical verification of age and economic status.' },
      { stepNumber: 4, title: 'Cheque / Direct Treasury Transfer', description: 'Sanction order generated and ₹1,00,116 transferred directly to mother\'s bank account.' }
    ],
    deadline: 'Apply before marriage or within 30 days after marriage',
    openingDate: 'Continuous',
    officialUrl: 'https://telanganaepass.cgg.gov.in',
    sourceDocument: 'Govt of Telangana G.O. Ms. No. 4, Backward Classes Welfare Dept',
    lastVerified: 'September 2026',
    isOfficialSourceVerified: true,
    applicationStatus: 'Open',
    helpline: '040-23390228 / MeeSeva 1100'
  },
  {
    id: 'old-age-pension-nsap',
    name: 'National Social Assistance Programme (Indira Gandhi National Old Age Pension - IGNOAPS)',
    nativeNames: {
      hindi: 'इंदिरा गांधी राष्ट्रीय वृद्धावस्था पेंशन योजना',
      telugu: 'ఇందిరా గాంధీ జాతీయ వృద్ధాప్య పెన్షన్ పథకం',
    },
    department: 'Ministry of Rural Development & State Social Welfare Departments',
    governmentLevel: 'Central',
    state: 'All-India',
    category: 'Senior Citizens',
    shortDescription: 'Monthly social security pension for senior citizens aged 60 years and above living below poverty line.',
    plainSummary: 'Provides monthly monetary social security to elderly citizens from underprivileged families who have no regular income source, ensuring independent dignity in their senior years.',
    mainBenefit: '₹1,000 to ₹3,000 / month depending on state top-up',
    benefitType: 'Direct Cash Transfer',
    eligibilityRules: {
      minAge: 60,
      maxIncome: 100000,
      customConditions: [
        'Applicant must be 60 years of age or older',
        'Applicant must belong to a household living Below Poverty Line (BPL) as per state criteria',
        'Must not be drawing another government pension'
      ]
    },
    requiredDocuments: [
      {
        id: 'doc-age-proof',
        name: 'Age Proof (Aadhaar / Voter ID / Birth Certificate)',
        whyNeeded: 'Confirms applicant is 60 years or older.',
        howToObtain: 'UIDAI or Election Commission of India.',
        isMandatory: true
      },
      {
        id: 'doc-bpl-cert',
        name: 'BPL Ration Card / White Ration Card',
        whyNeeded: 'Proof that household falls under BPL social assistance bracket.',
        howToObtain: 'Food & Civil Supplies Department.',
        isMandatory: true
      },
      {
        id: 'doc-bank-acc',
        name: 'Bank / Post Office Savings Account Passbook',
        whyNeeded: 'Pension is credited monthly directly to account or post office door step.',
        howToObtain: 'Local post office or bank.',
        isMandatory: true
      }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Obtain Application Form', description: 'Collect physical form from Village Panchayat / Ward office or apply on https://nsap.nic.in.', portalUrl: 'https://nsap.nic.in' },
      { stepNumber: 2, title: 'Attach Age & BPL Proofs', description: 'Submit with Aadhaar, BPL card, and bank passbook copies.' },
      { stepNumber: 3, title: 'Field Verification by Panchayat Officer', description: 'Local welfare committee inspects eligibility in Gram Sabha meeting.' },
      { stepNumber: 4, title: 'Sanction Order & Monthly Credit', description: 'Pension order issued; pension credited on 1st of every month.' }
    ],
    deadline: 'Rolling (Open all year)',
    openingDate: 'Continuous',
    officialUrl: 'https://nsap.nic.in',
    sourceDocument: 'Ministry of Rural Development NSAP Framework 2026',
    lastVerified: 'August 2026',
    isOfficialSourceVerified: true,
    applicationStatus: 'Rolling',
    helpline: '1800-180-6727 (NSAP National Helpdesk)'
  },
  {
    id: 'divyangjan-swavalamban',
    name: 'Divyangjan Swavalamban Yojana (Concessional Credit for Persons with Disabilities)',
    nativeNames: {
      hindi: 'दिव्यांगजन स्वावलंबन योजना',
      telugu: 'దివ్యాంగుల స్వావలంబన పథకం',
    },
    department: 'Department of Empowerment of Persons with Disabilities (DEPwD), Ministry of Social Justice',
    governmentLevel: 'Central',
    state: 'All-India',
    category: 'Disability',
    shortDescription: 'Concessional self-employment loans up to ₹50 Lakh at low interest rates (5-8%) with rebate for women with disabilities.',
    plainSummary: 'Assists citizens with disabilities (40% or more disability) in setting up their own business, purchasing assistive equipment, pursuing professional higher education, or establishing small shops with heavily subsidized interest rates.',
    mainBenefit: 'Concessional loans up to ₹50,000,000 + interest rebate up to 1%',
    benefitType: 'Loan / Credit',
    eligibilityRules: {
      minAge: 18,
      speciallyAbledOnly: true,
      customConditions: [
        'Applicant must have a minimum 40% disability certified by medical authority or possess valid UDID Card (Unique Disability ID)',
        'Indian citizen with no credit default record with nationalized banks',
        'Valid business or educational plan'
      ]
    },
    requiredDocuments: [
      {
        id: 'doc-udid-card',
        name: 'UDID Card (Unique Disability Identity Card) or Medical Certificate',
        whyNeeded: 'Verifies disability type and percentage benchmark (minimum 40%).',
        howToObtain: 'From District Medical Board or portal https://www.swavlambancard.gov.in.',
        officialLink: 'https://www.swavlambancard.gov.in',
        isMandatory: true
      },
      {
        id: 'doc-aadhaar',
        name: 'Aadhaar Card',
        whyNeeded: 'Personal identity and KYC proof.',
        howToObtain: 'UIDAI.',
        isMandatory: true
      },
      {
        id: 'doc-business-project',
        name: 'Project Proposal / Higher Education Admission Letter',
        whyNeeded: 'Explains the purpose of the credit facility.',
        howToObtain: 'Self-prepared or from training institute.',
        isMandatory: true
      }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Obtain UDID Card', description: 'Register on https://www.swavlambancard.gov.in to get digital UDID card.' },
      { stepNumber: 2, title: 'Apply through State Channelising Agency (SCA)', description: 'Submit loan application via National Handicapped Finance and Development Corporation (NHFDC) partner bank or online.', portalUrl: 'http://www.nhfdc.nic.in' },
      { stepNumber: 3, title: 'Project Appraisal', description: 'Bank reviews proposal feasibility and approves concessional interest rate.' },
      { stepNumber: 4, title: 'Disbursement & Toolkit Subsidy', description: 'Loan amount disbursed with 0.5% - 1% interest rebate for prompt repayment.' }
    ],
    deadline: 'Rolling (Open all year)',
    openingDate: 'Continuous',
    officialUrl: 'http://www.nhfdc.nic.in',
    sourceDocument: 'NHFDC Operational Guidelines 2026',
    lastVerified: 'September 2026',
    isOfficialSourceVerified: true,
    applicationStatus: 'Rolling',
    helpline: '0129-2226910 / 2287512 (NHFDC)'
  },
  {
    id: 'ddu-gky-rural-skills',
    name: 'Deen Dayal Upadhyaya Grameen Kaushalya Yojana (DDU-GKY)',
    nativeNames: {
      hindi: 'दीन दयाल उपाध्याय ग्रामीण कौशल्य योजना',
      telugu: 'దీన్ దయాళ్ ఉపాధ్యాయ గ్రామీణ కౌశల్య యోజన',
    },
    department: 'Ministry of Rural Development (MoRD)',
    governmentLevel: 'Central',
    state: 'All-India',
    category: 'Rural Development',
    shortDescription: 'Free residential placement-linked skill training, free boarding, uniform, books, tablet, and guaranteed jobs for rural youth.',
    plainSummary: 'If you are a rural young person aged 15-35 from a poor household, DDU-GKY offers 100% free residential vocational training in IT, healthcare, logistics, hospitality, or retail with free food, hostel, clothes, and placement in guaranteed private sector jobs.',
    mainBenefit: '100% Free Residential Training + Free Boarding + Placement Assistance',
    benefitType: 'In-Kind',
    eligibilityRules: {
      minAge: 15,
      maxAge: 35,
      occupations: ['Unemployed', 'Student', 'Daily Wage / Laborer', 'Other'],
      maxIncome: 200000,
      customConditions: [
        'Must be a resident of a rural area in India',
        'Applicant must belong to a poor rural household (BPL card, SECC list, or MGNREGA job card holder for 15+ days)',
        'Age relaxable up to 45 years for women, disabled, and primitive tribal groups'
      ]
    },
    requiredDocuments: [
      {
        id: 'doc-aadhaar',
        name: 'Aadhaar Card',
        whyNeeded: 'Personal identification and attendance biometric logging.',
        howToObtain: 'UIDAI.',
        isMandatory: true
      },
      {
        id: 'doc-rural-residence',
        name: 'Rural Residence Certificate / Gram Panchayat Certificate',
        whyNeeded: 'Verifies rural inhabitant status.',
        howToObtain: 'From Gram Panchayat Sarpanch or Village Secretary.',
        isMandatory: true
      },
      {
        id: 'doc-education-cert',
        name: 'School / College Leaving Certificate (Minimum 5th or 8th Pass)',
        whyNeeded: 'To assign appropriate vocational trade course.',
        howToObtain: 'School last attended.',
        isMandatory: true
      }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Visit Kaushal Panjee Portal', description: 'Register as candidate on https://kaushalpanjee.nic.in using your mobile number.', portalUrl: 'https://kaushalpanjee.nic.in' },
      { stepNumber: 2, title: 'Mobilization Camp / Rozgar Mela', description: 'Attend local block mobilization camp organized by State Rural Livelihood Mission (SRLM).' },
      { stepNumber: 3, title: 'Enrollment in Training Center', description: 'Join accredited residential training center in your chosen skill trade.' },
      { stepNumber: 4, title: 'Certification & Job Placement', description: 'Get NCVT / Sector Skill Council certification and receive offer letter for verified employment.' }
    ],
    deadline: 'Rolling batches start every quarter',
    openingDate: 'Continuous admission',
    officialUrl: 'https://ddugky.gov.in',
    sourceDocument: 'MoRD Gazette Notification Ref DDUGKY/2026/V1',
    lastVerified: 'September 2026',
    isOfficialSourceVerified: true,
    applicationStatus: 'Rolling',
    helpline: '011-23743625 (National Rural Livelihoods Mission)'
  },
  {
    id: 'pm-surya-ghar',
    name: 'PM Surya Ghar: Muft Bijli Yojana',
    nativeNames: {
      hindi: 'पीएम सूर्य घर: मुफ्त बिजली योजना',
      telugu: 'పీఎం సూర్య ఘర్: ఉచిత విద్యుత్ పథకం',
    },
    department: 'Ministry of New and Renewable Energy (MNRE)',
    governmentLevel: 'Central',
    state: 'All-India',
    category: 'Housing',
    shortDescription: 'Direct central government subsidy up to ₹78,000 for installing rooftop solar panels, providing up to 300 units of free electricity monthly.',
    plainSummary: 'If you live in your own house and want to cut your electricity bill to zero, the government provides a direct bank subsidy of ₹30,000 for 1kW, ₹60,000 for 2kW, and ₹78,000 for 3kW or higher solar rooftop systems. Plus, you can sell excess power back to the grid.',
    mainBenefit: 'Direct subsidy up to ₹78,000 + Up to 300 units free monthly solar power',
    benefitType: 'Subsidy',
    eligibilityRules: {
      minAge: 18,
      occupations: ['Employee', 'Farmer', 'Business', 'Retired', 'Daily Wage / Laborer', 'Other'],
      housingStatusAllowed: ['Own Pucca House'],
      customConditions: [
        'Must possess a residential electricity consumer connection in applicant name',
        'Must have suitable shadow-free rooftop space for solar panel installation',
        'Must not have availed any previous central financial assistance for rooftop solar'
      ]
    },
    requiredDocuments: [
      {
        id: 'doc-electricity-bill',
        name: 'Recent Electricity Bill (Last 6 Months)',
        whyNeeded: 'Verifies consumer number (CA number) and sanctioned load.',
        howToObtain: 'From your electricity DISCOM app or physical bill.',
        isMandatory: true
      },
      {
        id: 'doc-aadhaar-solar',
        name: 'Aadhaar Card of Electricity Consumer',
        whyNeeded: 'National KYC and subsidy DBT transfer verification.',
        howToObtain: 'UIDAI.',
        isMandatory: true
      },
      {
        id: 'doc-roof-ownership',
        name: 'House / Roof Ownership Proof',
        whyNeeded: 'Confirms applicant has legal rights to install panels on the terrace.',
        howToObtain: 'Property tax receipt or sale deed copy.',
        isMandatory: true
      },
      {
        id: 'doc-bank-passbook-solar',
        name: 'Bank Passbook / Cancelled Cheque',
        whyNeeded: 'To credit the central financial subsidy within 30 days of net-metering.',
        howToObtain: 'Bank branch or mobile banking.',
        isMandatory: true
      }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Register on National Portal', description: 'Visit pmsuryaghar.gov.in, select your State and DISCOM, and enter your Electricity Consumer Number.', portalUrl: 'https://pmsuryaghar.gov.in' },
      { stepNumber: 2, title: 'DISCOM Feasibility Approval', description: 'Apply for rooftop solar net metering and receive online technical feasibility approval from your power company.' },
      { stepNumber: 3, title: 'Installation by Registered Vendor', description: 'Select an empaneled registered vendor in your district to install solar panels and inverter.' },
      { stepNumber: 4, title: 'Net Meter Commissioning & Subsidy Credit', description: 'DISCOM inspects setup, installs bi-directional net meter, and government releases subsidy directly into your bank.' }
    ],
    deadline: 'Open throughout 2026-2027 (Target 1 Crore Households)',
    openingDate: '15 February 2024',
    officialUrl: 'https://pmsuryaghar.gov.in',
    sourceDocument: 'MNRE Notification File No. 318/631/2024-GCRT',
    lastVerified: 'September 2026',
    isOfficialSourceVerified: true,
    applicationStatus: 'Open',
    helpline: '15555 / 1800-180-3333 (National Solar Helpline)'
  },
  {
    id: 'smam-tractor-subsidy',
    name: 'Sub-Mission on Agricultural Mechanization (SMAM) – Tractor & Farm Machinery Subsidy',
    nativeNames: {
      hindi: 'कृषि यंत्रीकरण उप-मिशन (ट्रैक्टर एवं कृषि यंत्र सब्सिडी)',
      telugu: 'వ్యవసాయ యాంత్రీకరణ సబ్-మిషన్ (ట్రాక్టర్ & వ్యవసాయ పరికరాల రాయితీ)',
    },
    department: 'Department of Agriculture & Farmers Welfare',
    governmentLevel: 'Central',
    state: 'All-India',
    category: 'Agriculture',
    shortDescription: '40% to 50% government subsidy (up to ₹2,00,000 for tractors and ₹5,00,000 for Custom Hiring Centers) on agricultural equipment for farmers.',
    plainSummary: 'Farmers can purchase tractors, rotavators, power tillers, seed drills, and drone sprayers at 40% to 50% discount paid directly by the government through direct benefit transfer (DBT in Agriculture). Special higher subsidy is given to small/marginal farmers, women, and SC/ST farmers.',
    mainBenefit: '40% to 50% financial subsidy on tractors, tillers, and farm implements',
    benefitType: 'Subsidy',
    eligibilityRules: {
      minAge: 18,
      requiresFarmer: true,
      occupations: ['Farmer'],
      customConditions: [
        'Must own cultivable agricultural land registered in land records (RoR / Patta)',
        'Must not have received a tractor subsidy from government in the last 7 years',
        'Valid driving license or tractor operator credential (for tractor applicants)'
      ]
    },
    requiredDocuments: [
      {
        id: 'doc-land-ror',
        name: 'Land Record (Patta Passbook / RoR / Khasra-Khatauni)',
        whyNeeded: 'Verifies legal landholding status of the farmer.',
        howToObtain: 'From State Revenue Portal (Dharani/Bhulekh/Meebhoomi) or Tahsildar.',
        isMandatory: true
      },
      {
        id: 'doc-aadhaar-farmer',
        name: 'Aadhaar Card linked with Mobile',
        whyNeeded: 'Biometric identity and DBT subsidy verification.',
        howToObtain: 'UIDAI.',
        isMandatory: true
      },
      {
        id: 'doc-caste-cert-farmer',
        name: 'Caste Certificate (if SC/ST/OBC)',
        whyNeeded: 'Required to claim the higher 50% subsidy concession.',
        howToObtain: 'From MeeSeva / CSC / Tehsildar office.',
        isMandatory: false
      },
      {
        id: 'doc-bank-passbook-smam',
        name: 'Bank Passbook (NPCI Seeded)',
        whyNeeded: 'Subsidy amount is directly transferred to this account.',
        howToObtain: 'Bank branch.',
        isMandatory: true
      }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Register on Agri-Machinery Portal', description: 'Log in to https://agrimachinery.nic.in with Aadhaar and farmer mobile number.', portalUrl: 'https://agrimachinery.nic.in' },
      { stepNumber: 2, title: 'Select Machinery & Manufacturer', description: 'Choose tractor horsepower or equipment type from the approved manufacturer list.' },
      { stepNumber: 3, title: 'District Agriculture Verification', description: 'District Agriculture Officer (DAO) verifies land documents and issues online subsidy permit.' },
      { stepNumber: 4, title: 'Delivery & Subsidy Transfer', description: 'Purchase equipment from authorized dealer; physical inspection takes place and subsidy is credited to your bank.' }
    ],
    deadline: 'Financial Year 2026-2027 allocations (Lottery / First-Come windows per state)',
    openingDate: '1 April 2026',
    officialUrl: 'https://agrimachinery.nic.in',
    sourceDocument: 'Ministry of Agriculture Circular DAC&FW/SMAM/2026/01',
    lastVerified: 'September 2026',
    isOfficialSourceVerified: true,
    applicationStatus: 'Open',
    helpline: '011-23382012 / Kisan Call Centre 1800-180-1551'
  },
  {
    id: 'pmegp-business-loan',
    name: 'Prime Minister’s Employment Generation Programme (PMEGP)',
    nativeNames: {
      hindi: 'प्रधानमंत्री रोजगार सृजन कार्यक्रम (PMEGP ऋण एवं सब्सिडी)',
      telugu: 'ప్రధాన మంత్రి ఉపాధి కల్పన పథకం (PMEGP వ్యాపార రుణం & రాయితీ)',
    },
    department: 'Ministry of Micro, Small and Medium Enterprises (MSME)',
    governmentLevel: 'Central',
    state: 'All-India',
    category: 'Business',
    shortDescription: 'Credit-linked bank loan up to ₹50 Lakhs with 15% to 35% government capital subsidy for setting up new micro-enterprises, manufacturing, or service units.',
    plainSummary: 'If you want to start a new business, shop, food processing unit, fabrication workshop, or service center, banks provide up to ₹50 Lakh for manufacturing or ₹20 Lakh for service units. The government pays 15% to 35% of the total project cost as a non-repayable grant (margin money subsidy).',
    mainBenefit: 'Loans up to ₹50 Lakh with 15% to 35% non-repayable government subsidy',
    benefitType: 'Subsidy',
    eligibilityRules: {
      minAge: 18,
      occupations: ['Business', 'Unemployed', 'Student', 'Other'],
      customConditions: [
        'Applicant must be at least 18 years old',
        'For projects above ₹10 Lakh in manufacturing or ₹5 Lakh in service, minimum educational qualification is 8th standard pass',
        'Only new micro-enterprises are eligible (existing units cannot apply)'
      ]
    },
    requiredDocuments: [
      {
        id: 'doc-project-report',
        name: 'Detailed Project Report (DPR)',
        whyNeeded: 'Explains business model, estimated capital expenditure, and projected revenues to the bank.',
        howToObtain: 'Prepare using KVIC online DPR templates on kviconline.gov.in or from a Chartered Accountant.',
        isMandatory: true
      },
      {
        id: 'doc-aadhaar-pan',
        name: 'Aadhaar Card and PAN Card',
        whyNeeded: 'Identity, credit score verification, and business registration.',
        howToObtain: 'UIDAI and Income Tax Portal.',
        isMandatory: true
      },
      {
        id: 'doc-education-cert',
        name: '8th / 10th / Degree Pass Certificate',
        whyNeeded: 'Verifies minimum educational requirement for projects above ₹10 Lakhs.',
        howToObtain: 'School or Board certificate.',
        isMandatory: true
      },
      {
        id: 'doc-caste-special-cert',
        name: 'Special Category Proof (Women / SC / ST / OBC / Ex-Servicemen / Disabled)',
        whyNeeded: 'Eligible for 25% to 35% higher subsidy instead of 15% general rate.',
        howToObtain: 'MeeSeva / Revenue Department.',
        isMandatory: false
      }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Fill Online PMEGP Application', description: 'Submit applicant details and upload DPR on https://www.kviconline.gov.in/pmegpeportal.', portalUrl: 'https://www.kviconline.gov.in' },
      { stepNumber: 2, title: 'Agency Screening', description: 'District Industries Centre (DIC) or KVIC scrutinizes your application and forwards it to your preferred bank branch.' },
      { stepNumber: 3, title: 'Bank Sanction & EDP Training', description: 'Bank sanctions loan; complete 5 to 10 days Entrepreneurship Development Programme (EDP) training online or offline.' },
      { stepNumber: 4, title: 'Subsidy Disbursement', description: 'Bank releases loan funds; government deposits margin money subsidy into a 3-year term deposit lock-in.' }
    ],
    deadline: 'Open all year round',
    openingDate: 'Continuous',
    officialUrl: 'https://www.kviconline.gov.in',
    sourceDocument: 'Ministry of MSME PMEGP Guidelines 2026',
    lastVerified: 'September 2026',
    isOfficialSourceVerified: true,
    applicationStatus: 'Open',
    helpline: '1800-180-6763 (KVIC Helpdesk)'
  },
  {
    id: 'pm-svanidhi',
    name: 'PM SVANidhi – Micro Credit for Street Vendors & Small Hawkers',
    nativeNames: {
      hindi: 'पीएम स्वनिधि योजना (रेहड़ी-पटरी एवं छोटे दुकानदारों के लिए ऋण)',
      telugu: 'పీఎం స్వనిధి పథకం (చిరు వ్యాపారులు మరియు వీధి వ్యాపారుల రుణం)',
    },
    department: 'Ministry of Housing and Urban Affairs (MoHUA)',
    governmentLevel: 'Central',
    state: 'All-India',
    category: 'Business',
    shortDescription: 'Collateral-free working capital loan starting from ₹10,000 up to ₹50,000 with 7% annual interest subsidy and cashback on digital transactions.',
    plainSummary: 'Provides affordable collateral-free loans to street vendors, roadside stalls, pushcart sellers, tea stalls, and vegetable vendors. First tranche gives ₹10,000; upon timely repayment, second loan of ₹20,000 and third loan of ₹50,000 are sanctioned with zero collateral and 7% interest rebate.',
    mainBenefit: 'Collateral-free loan of ₹10,000 to ₹50,000 + 7% interest subsidy',
    benefitType: 'Loan / Credit',
    eligibilityRules: {
      minAge: 18,
      occupations: ['Business', 'Daily Wage / Laborer', 'Other'],
      customConditions: [
        'Must be engaged in street vending or small roadside business in urban/peri-urban areas',
        'Should possess a Certificate of Vending / ID Card issued by Urban Local Body (Municipality/Corporation), or a Letter of Recommendation (LoR)'
      ]
    },
    requiredDocuments: [
      {
        id: 'doc-vending-id',
        name: 'Vending ID Card or Letter of Recommendation (LoR)',
        whyNeeded: 'Proof of street vending business from Municipality.',
        howToObtain: 'From local Municipal Ward Office or apply for LoR on PM SVANidhi portal.',
        isMandatory: true
      },
      {
        id: 'doc-aadhaar-svanidhi',
        name: 'Aadhaar Card linked with Mobile',
        whyNeeded: 'Biometric identification and instant e-KYC.',
        howToObtain: 'UIDAI.',
        isMandatory: true
      },
      {
        id: 'doc-bank-account-svanidhi',
        name: 'Bank Account Passbook / UPI QR Code',
        whyNeeded: 'Loan disbursement and receipt of monthly digital transaction cashbacks.',
        howToObtain: 'Bank branch.',
        isMandatory: true
      }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Check Vendor Survey Status', description: 'Visit https://pmsvanidhi.mohua.gov.in and search your name in the municipal vendor list or apply with LoR.', portalUrl: 'https://pmsvanidhi.mohua.gov.in' },
      { stepNumber: 2, title: 'Submit Loan Application', description: 'Select your preferred bank or microfinance institution and submit basic KYC online or via CSC center.' },
      { stepNumber: 3, title: 'Loan Disbursement', description: 'Amount of ₹10,000 is credited straight into your bank account without any processing fee or physical collateral.' }
    ],
    deadline: 'Active and ongoing through 2026',
    openingDate: '1 June 2020',
    officialUrl: 'https://pmsvanidhi.mohua.gov.in',
    sourceDocument: 'MoHUA Scheme Operational Guidelines PM-SVANidhi-2026',
    lastVerified: 'September 2026',
    isOfficialSourceVerified: true,
    applicationStatus: 'Open',
    helpline: '1800-11-1979'
  },
  {
    id: 'pm-matru-vandana',
    name: 'Pradhan Mantri Matru Vandana Yojana (PMMVY)',
    nativeNames: {
      hindi: 'प्रधानमंत्री मातृ वंदना योजना (गर्भवती महिला सहायता)',
      telugu: 'ప్రధాన మంత్రి మాతృ వందన యోజన (గర్భిణీ స్త్రీల ఆర్థిక సహాయం)',
    },
    department: 'Ministry of Women and Child Development',
    governmentLevel: 'Central',
    state: 'All-India',
    category: 'Women',
    shortDescription: 'Direct cash benefit of ₹5,000 for the first living child and ₹6,000 for the second child (if female) for pregnant and lactating mothers.',
    plainSummary: 'Financial assistance directly deposited into the pregnant woman’s bank account to compensate for wage loss, encourage hospital antenatal checkups, safe institutional delivery, and full child immunization. If the second newborn is a baby girl, ₹6,000 is transferred in a single installment.',
    mainBenefit: 'Direct cash benefit of ₹5,000 to ₹6,000 into mother’s bank account',
    benefitType: 'Direct Cash Transfer',
    eligibilityRules: {
      minAge: 19,
      gender: 'Female',
      maxIncome: 800000,
      customConditions: [
        'Must be a pregnant woman or lactating mother aged 19 years or above',
        'Must belong to socially/economically weaker sections (e.g. BPL/EWS, PM-JAY cardholder, e-Shram holder, or income under ₹8 Lakh/yr)',
        'Women in regular employment with Central or State Government or PSUs are not eligible'
      ]
    },
    requiredDocuments: [
      {
        id: 'doc-mcp-card',
        name: 'Mother and Child Protection (MCP) Card / RCH ID',
        whyNeeded: 'Proves pregnancy registration and antenatal checkups (ANC).',
        howToObtain: 'Issued free of cost at local Anganwadi Centre or Government Hospital.',
        isMandatory: true
      },
      {
        id: 'doc-mother-aadhaar',
        name: 'Mother’s Aadhaar Card (Aadhaar-seeded Bank Account)',
        whyNeeded: 'Direct Benefit Transfer (DBT) verification.',
        howToObtain: 'UIDAI.',
        isMandatory: true
      },
      {
        id: 'doc-child-birth-cert',
        name: 'Child Birth Registration Certificate',
        whyNeeded: 'Required for claiming subsequent tranche / second girl child installment.',
        howToObtain: 'Hospital of delivery or local Registrar of Births.',
        isMandatory: true
      }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Register at Anganwadi / PMMVY Portal', description: 'Register on https://pmmvy.wcd.gov.in directly or submit form at nearest Anganwadi Centre / ASHA worker.', portalUrl: 'https://pmmvy.wcd.gov.in' },
      { stepNumber: 2, title: 'Antenatal Checkup & 1st Installment', description: 'Upon early registration and at least one ANC checkup, ₹3,000 is credited.' },
      { stepNumber: 3, title: 'Child Birth & 2nd Installment', description: 'After institutional birth registration and primary immunization, remaining ₹2,000 (or ₹6,000 for second girl child) is credited.' }
    ],
    deadline: 'Apply within 270 days of date of last menstrual period / delivery',
    openingDate: 'Continuous',
    officialUrl: 'https://pmmvy.wcd.gov.in',
    sourceDocument: 'MWCD PMMVY Mission Shakti Guidelines',
    lastVerified: 'September 2026',
    isOfficialSourceVerified: true,
    applicationStatus: 'Open',
    helpline: '011-23382393 / Childline 1098'
  },
  {
    id: 'atal-pension-yojana',
    name: 'Atal Pension Yojana (APY)',
    nativeNames: {
      hindi: 'अटल पेंशन योजना (गारंटीशुदा मासिक पेंशन)',
      telugu: 'అటల్ పెన్షన్ యోజన (హామీ ఇవ్వబడిన నెలవారీ పింఛను)',
    },
    department: 'Pension Fund Regulatory and Development Authority (PFRDA)',
    governmentLevel: 'Central',
    state: 'All-India',
    category: 'Senior Citizens',
    shortDescription: 'Government-guaranteed monthly pension of ₹1,000, ₹2,000, ₹3,000, ₹4,000 or ₹5,000 from age 60 for all Indian citizens aged 18 to 40.',
    plainSummary: 'A lifetime social security pension scheme for individuals working in the unorganized sector, daily laborers, shop helpers, and private workers. By contributing a nominal amount (e.g. ₹42 to ₹210/month starting at age 18), the government guarantees a lifelong monthly pension after reaching age 60, followed by spouse pension and full corpus return to nominees.',
    mainBenefit: 'Guaranteed lifetime monthly pension of ₹1,000 to ₹5,000 upon turning 60',
    benefitType: 'Direct Cash Transfer',
    eligibilityRules: {
      minAge: 18,
      maxAge: 40,
      customConditions: [
        'Must be an Indian citizen aged between 18 and 40 years',
        'Must have an active savings bank account or Post Office account',
        'Must NOT be an income tax payer under Income Tax Act rules'
      ]
    },
    requiredDocuments: [
      {
        id: 'doc-savings-bank-apy',
        name: 'Savings Bank Account Passbook (Auto-Debit Enabled)',
        whyNeeded: 'Monthly subscription amount is deducted automatically on chosen date.',
        howToObtain: 'Any commercial bank, regional rural bank, or Post Office.',
        isMandatory: true
      },
      {
        id: 'doc-aadhaar-apy',
        name: 'Aadhaar Card and Mobile Number',
        whyNeeded: 'KYC identity and nominee authentication.',
        howToObtain: 'UIDAI.',
        isMandatory: true
      }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Visit Bank / NetBanking Portal', description: 'Apply online through your bank’s NetBanking / mobile app, or visit your local bank branch/Post Office.' },
      { stepNumber: 2, title: 'Select Pension Tier', description: 'Choose your desired pension amount (₹1,000 to ₹5,000) and debit frequency (monthly, quarterly, or half-yearly).' },
      { stepNumber: 3, title: 'PRAN Generation', description: 'Receive your Permanent Retirement Account Number (PRAN) card digitally via SMS.' }
    ],
    deadline: 'Join between ages 18 and 40',
    openingDate: 'Continuous',
    officialUrl: 'https://www.npscra.nsdl.co.in',
    sourceDocument: 'PFRDA Gazette Notification No. PFRDA/12/RGL/139/10',
    lastVerified: 'September 2026',
    isOfficialSourceVerified: true,
    applicationStatus: 'Open',
    helpline: '1800-110-069 (PFRDA APY Helpline)'
  }
];

export const SAMPLE_SCHEMES: Scheme[] = deduplicateSchemes([
  ...BASE_SCHEMES,
  ...ALL_NATIONWIDE_SCHEMES
]).unique;

export const DEFAULT_USER_PROFILE: UserProfile = {
  age: 22,
  gender: 'Male',
  state: 'All-India',
  district: '',
  occupation: 'Student',
  annualIncome: 180000,
  educationLevel: 'Undergraduate',
  familySize: 4,
  housingStatus: 'Rented House',
  landOwnershipAcres: 0,
  socialCategory: 'General',
  speciallyAbled: false,
  existingBenefits: [],
};

