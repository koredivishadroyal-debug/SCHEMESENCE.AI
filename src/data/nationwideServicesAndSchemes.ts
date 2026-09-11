import { Scheme } from '../types';

export const NATIONWIDE_SERVICES_AND_SCHEMES: Scheme[] = [
  // ==========================================
  // CITIZEN SERVICES & DOCUMENTS (ALL-INDIA)
  // ==========================================
  {
    id: 'voter-id-card',
    recordId: 'SRV-ECI-001',
    recordType: 'SERVICE',
    name: 'Voter ID Card (EPIC) & Voter Registration',
    nativeNames: {
      hindi: 'मतदाता पहचान पत्र (वोटर आईडी) एवं मतदाता पंजीकरण',
      telugu: 'ఓటరు గుర్తింపు కార్డు (ఎపిక్) మరియు ఓటరు నమోదు',
      tamil: 'வாக்காளர் அடையாள அட்டை மற்றும் பதிவு',
      kannada: 'ಮತದಾರರ ಗುರುತಿನ ಚೀಟಿ ಮತ್ತು ನೋಂದಣಿ',
      bengali: 'ভোটার আইডি কার্ড ও ভোটার নিবন্ধন',
      marathi: 'मतदार ओळखपत्र (EPIC) आणि मतदार नोंदणी'
    },
    ministry: 'Election Commission of India (ECI)',
    department: 'Election Commission of India',
    governmentLevel: 'Central',
    state: 'All-India',
    category: 'Documents',
    targetBeneficiary: 'All Indian citizens who have attained or are turning 18 years of age',
    shortDescription: 'Official government photo voter identity card (EPIC) enabling adult citizens to cast votes in General, Assembly, and Local elections.',
    detailedDescription: 'The ECI Voter ID (Elector’s Photo Identity Card) serves as a constitutional proof of identity and citizenship in India. Citizens who are 18 years or older as of the qualifying date can register online through Form 6 on the unified ECINET / ECI Voters Service Portal or via the Voter Helpline App. Registration is 100% free with no government fee.',
    plainSummary: 'If you are an Indian citizen aged 18 or above, you can register for your free Voter ID (EPIC) card online using Form 6 on voters.eci.gov.in. It is issued free of cost by the Election Commission of India and delivered to your home by your local BLO/Speed Post.',
    mainBenefit: 'Official Constitutional Voting Right + Valid National Photo Identity & Address Proof',
    benefitType: 'Citizen Service',
    fees: 'Free of Cost (₹0 - Government charges zero fees)',
    processingTime: '15 to 30 days (Field verification by Booth Level Officer - BLO)',
    applicationMode: 'Online',
    eligibilityRules: {
      minAge: 18,
      states: ['All-India'],
      customConditions: [
        'Must be a citizen of India',
        'Must be 18 years or older on the qualifying date (Jan 1, Apr 1, Jul 1, Oct 1)',
        'Must be an ordinary resident of the constituency where applying',
        'Must NOT already be registered in another assembly constituency without transfer request'
      ]
    },
    requiredDocuments: [
      {
        id: 'voter-doc-age',
        name: 'Proof of Age / Date of Birth',
        whyNeeded: 'Verifies the applicant is 18 years of age or above.',
        howToObtain: 'Birth Certificate, 10th Class Passing Certificate/Marksheet, Aadhaar Card, PAN Card, or Indian Passport.',
        officialLink: 'https://voters.eci.gov.in',
        isMandatory: true
      },
      {
        id: 'voter-doc-address',
        name: 'Proof of Ordinary Residence (Address Proof)',
        whyNeeded: 'Determines the exact polling booth and parliamentary/assembly constituency.',
        howToObtain: 'Aadhaar Card, Water/Electricity/Gas Bill (in self or parent/spouse name), Bank Passbook, or Registered Rent Deed.',
        isMandatory: true
      },
      {
        id: 'voter-doc-photo',
        name: 'Recent Passport-size Color Photograph (White Background)',
        whyNeeded: 'Printed on physical EPIC smart card and electoral roll.',
        howToObtain: 'Clear digital photograph in .jpg/.jpeg format (under 2MB).',
        isMandatory: true
      }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Visit Voters Service Portal', description: 'Open the verified portal https://voters.eci.gov.in or install the Voter Helpline App from Play Store/App Store.', portalUrl: 'https://voters.eci.gov.in' },
      { stepNumber: 2, title: 'Sign Up / Login with Mobile', description: 'Create an account using your mobile number and authenticate with OTP.' },
      { stepNumber: 3, title: 'Fill Form 6 (New Elector Registration)', description: 'Select your State, District, and Assembly Constituency. Enter your name, relative details, date of birth, and ordinary residence address.' },
      { stepNumber: 4, title: 'Upload Proof Documents & Photo', description: 'Upload age proof, address proof, and passport photo.' },
      { stepNumber: 5, title: 'Submit & Note Reference Number', description: 'Review preview, submit, and save the 13-character Reference ID for tracking status.' },
      { stepNumber: 6, title: 'BLO Verification & e-EPIC Download', description: 'Booth Level Officer (BLO) performs physical verification. Once approved, download e-EPIC PDF immediately and physical card is delivered via post.' }
    ],
    deadline: 'Rolling (Open all 365 days of the year)',
    openingDate: 'Active continuously',
    officialUrl: 'https://voters.eci.gov.in',
    officialPortal: 'https://voters.eci.gov.in',
    officialSource: 'Election Commission of India (ECI)',
    sourceDocument: 'Representation of the People Act, 1950 & Registration of Electors Rules, 1960',
    sourceType: 'Constitutional Statutory Service',
    sourceLastUpdated: 'September 2026',
    lastVerified: 'September 2026',
    isOfficialSourceVerified: true,
    verificationStatus: 'Verified',
    applicationStatus: 'Rolling',
    helpline: '1950 (National Toll-Free Voter Helpline - Available across all States)',
    keywords: ['voter id', 'voter card', 'epic', 'election card', 'voter registration', 'form 6', 'eci', 'vote', 'polling', 'elector photo identity card'],
    aliases: ['Voter Card', 'EPIC Card', 'Chunav Card', 'Pehchan Patra', 'ఓటరు గుర్తింపు కార్డు']
  },
  {
    id: 'pan-card-service',
    recordId: 'DOC-CBDT-002',
    recordType: 'DOCUMENT',
    name: 'Permanent Account Number (PAN Card) – Form 49A & Instant e-PAN',
    nativeNames: {
      hindi: 'पैन कार्ड (स्थायी खाता संख्या) – फॉर्म 49A एवं तत्काल ई-पैन',
      telugu: 'పాన్ కార్డ్ (పర్మనెంట్ అకౌంట్ నంబర్) – ఫారం 49A & ఇ-పాన్',
      tamil: 'பான் அட்டை (நிரந்தர கணக்கு எண்)',
      kannada: 'ಪ್ಯಾನ್ ಕಾರ್ಡ್ (ಶಾಶ್ವತ ಖಾತೆ ಸಂಖ್ಯೆ)'
    },
    ministry: 'Ministry of Finance / Income Tax Department',
    department: 'Central Board of Direct Taxes (CBDT)',
    governmentLevel: 'Central',
    state: 'All-India',
    category: 'Documents',
    targetBeneficiary: 'Any Indian citizen, minor through guardian, professional, or commercial entity',
    shortDescription: '10-digit alphanumeric national tax identification card essential for opening bank accounts, financial transactions, and filing income tax returns.',
    detailedDescription: 'PAN (Permanent Account Number) is issued under Section 139A of the Income Tax Act, 1961. It links financial transactions, bank deposits, property acquisitions, and tax assessments. Citizens can obtain an Instant e-PAN within 10 minutes free of charge using Aadhaar e-KYC on the Income Tax e-filing portal, or apply for a physical PVC plastic card on Protean (NSDL) / UTIITSL for ₹107.',
    plainSummary: 'Every adult in India needs a PAN card for opening bank accounts, taking loans, getting a job, or doing business. You can get an instant e-PAN completely free within 10 minutes using your Aadhaar and mobile OTP, or pay ₹107 to get a physical plastic card delivered home.',
    mainBenefit: 'Mandatory Financial Identity + Banking & Credit Verification + Income Tax Compliance',
    benefitType: 'Citizen Service',
    fees: '₹0 (Free) for Instant e-PAN on Income Tax Portal | ₹107 (incl. GST) for Physical Card delivery in India',
    processingTime: 'Instant (10 mins) for digital e-PAN | 7 to 15 working days for physical card delivery via India Post',
    applicationMode: 'Online',
    eligibilityRules: {
      minAge: 1, // Minors can apply via guardian
      states: ['All-India'],
      customConditions: [
        'Must be an individual residing in India or Non-Resident Indian (NRI)',
        'For Instant e-PAN: Must have an active Aadhaar number linked to mobile for OTP verification',
        'Must not already possess a valid PAN card (having multiple PANs is an offense under Section 272B)'
      ]
    },
    requiredDocuments: [
      {
        id: 'pan-doc-aadhaar',
        name: 'Aadhaar Card (Primary Identity & Address Proof)',
        whyNeeded: 'Enables paperless e-KYC and immediate demographic verification.',
        howToObtain: 'Download e-Aadhaar from uidai.gov.in or provide 12-digit Aadhaar number.',
        officialLink: 'https://uidai.gov.in',
        isMandatory: true
      },
      {
        id: 'pan-doc-photo',
        name: 'Scanned Photograph & Signature',
        whyNeeded: 'Imprinted on the physical PAN card for legal validity.',
        howToObtain: 'Clear digital scan of your passport-size photo and signature on plain white paper.',
        isMandatory: false
      }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Choose Application Route', description: 'For Free Instant e-PAN, visit https://eportal.incometax.gov.in. For Physical PVC Card, visit https://onlineservices.nsdl.com or UTIITSL.', portalUrl: 'https://eportal.incometax.gov.in' },
      { stepNumber: 2, title: 'Instant e-PAN via Aadhaar (Option A)', description: 'Click "Instant e-PAN", enter your 12-digit Aadhaar, enter the OTP sent to your Aadhaar-registered mobile, and confirm demographic details.' },
      { stepNumber: 3, title: 'Download e-PAN PDF', description: 'Download the digitally signed, legally valid e-PAN PDF within 10 minutes.' },
      { stepNumber: 4, title: 'Physical PAN via Protean/NSDL (Option B)', description: 'Select "Application Type: Indian Citizen (Form 49A)", enter details, pay ₹107 fee online, and complete e-Sign with Aadhaar.' }
    ],
    deadline: 'Rolling (Open all year)',
    openingDate: 'Continuous',
    officialUrl: 'https://eportal.incometax.gov.in',
    officialPortal: 'https://onlineservices.nsdl.com',
    officialSource: 'Income Tax Department, Ministry of Finance, Government of India',
    sourceDocument: 'Income Tax Act, 1961 Section 139A & CBDT Notification No. 112/2020',
    sourceType: 'Statutory Financial Document',
    sourceLastUpdated: 'September 2026',
    lastVerified: 'September 2026',
    isOfficialSourceVerified: true,
    verificationStatus: 'Verified',
    applicationStatus: 'Rolling',
    helpline: '1800-180-1961 (ITD Helpline) / 020-27218080 (Protean NSDL)',
    keywords: ['pan card', 'pan', 'nsdl', 'utiitsl', 'income tax', 'form 49a', 'instant e-pan', 'e-pan', 'tax id', 'cbdt', 'పాన్ కార్డు', 'पैन कार्ड'],
    aliases: ['PAN', 'e-PAN', 'Form 49A', 'Tax ID Card']
  },
  {
    id: 'aadhaar-services',
    recordId: 'SRV-UIDAI-003',
    recordType: 'SERVICE',
    name: 'Aadhaar Services – Enrolment, Demographic & Biometric Update (UIDAI)',
    nativeNames: {
      hindi: 'आधार सेवाएं – नामांकन, जनसांख्यिकीय एवं बायोमेट्रिक अपडेट (UIDAI)',
      telugu: 'ఆధార్ సేవలు – నమోదు, డెమోగ్రాఫిక్ & బయోమెట్రిక్ నవీకరణ (UIDAI)',
      tamil: 'ஆதார் சேவைகள் – பதிவு மற்றும் புதுப்பித்தல்'
    },
    ministry: 'Ministry of Electronics and Information Technology (MeitY)',
    department: 'Unique Identification Authority of India (UIDAI)',
    governmentLevel: 'Central',
    state: 'All-India',
    category: 'Documents',
    targetBeneficiary: 'All residents of India regardless of age, religion, or income',
    shortDescription: '12-digit verifiable biometric and demographic digital identity card underpinning all DBT government welfare disbursements in India.',
    detailedDescription: 'Aadhaar is a 12-digit unique identity number issued by UIDAI under the Aadhaar Act, 2016. It serves as primary proof of identity and address across India. Enrolment and mandatory child updates (at age 5 and 15) are completely free. Citizens can update name, address, date of birth, mobile number, and download password-protected e-Aadhaar 24/7 on myaadhaar.uidai.gov.in.',
    plainSummary: 'Aadhaar is India’s universal digital identity card required for subsidies, bank accounts, SIM cards, and college admissions. First-time enrolment is completely free. You can update your mobile number, address, or photo at your nearest Aadhaar Seva Kendra or online through myaadhaar.uidai.gov.in.',
    mainBenefit: 'Universal Digital Identity + Direct Benefit Transfer (DBT) Linking + e-KYC Verification',
    benefitType: 'Citizen Service',
    fees: '₹0 (Free) for New Enrolment & Mandatory Child Biometrics at age 5 and 15 | ₹50 for Demographic Update | ₹100 for Biometric Update',
    processingTime: 'Instant acknowledgement generated; 3 to 15 working days for backend verification & updated e-Aadhaar download',
    applicationMode: 'Hybrid',
    eligibilityRules: {
      minAge: 0,
      states: ['All-India'],
      customConditions: [
        'Must be a resident of India (resided in India for 182 days or more in the past 12 months, or valid visa/OCI card)',
        'Mandatory biometric updates required for children upon attaining 5 years and 15 years of age'
      ]
    },
    requiredDocuments: [
      {
        id: 'aadhaar-doc-poi',
        name: 'Proof of Identity (POI)',
        whyNeeded: 'Establishes applicant name and photograph.',
        howToObtain: 'Passport, PAN Card, Ration Card, Voter ID, Driving Licence, or Government ID.',
        officialLink: 'https://uidai.gov.in',
        isMandatory: true
      },
      {
        id: 'aadhaar-doc-poa',
        name: 'Proof of Address (POA)',
        whyNeeded: 'Verifies residential location for postal delivery and district records.',
        howToObtain: 'Electricity bill (last 3 months), Water bill, Rent agreement, Bank statement, or Domicile certificate.',
        isMandatory: true
      },
      {
        id: 'aadhaar-doc-dob',
        name: 'Proof of Date of Birth (DOB)',
        whyNeeded: 'Registers verified date of birth.',
        howToObtain: 'Birth Certificate issued by Registrar of Births, 10th marksheet, or Passport.',
        isMandatory: true
      }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Locate Aadhaar Seva Kendra / Book Online', description: 'Visit https://appointments.uidai.gov.in or https://myaadhaar.uidai.gov.in and click "Book an Appointment".', portalUrl: 'https://myaadhaar.uidai.gov.in' },
      { stepNumber: 2, title: 'Visit Kendra with Original Documents', description: 'Visit the authorized bank/post office/UIDAI center. Operator captures fingerprints, iris scan, and facial photo.' },
      { stepNumber: 3, title: 'Collect Enrolment Slip (EID)', description: 'Collect the 28-digit Enrolment ID (EID) acknowledgement slip.' },
      { stepNumber: 4, title: 'Download e-Aadhaar Online', description: 'Track status on myaadhaar.uidai.gov.in and download your digital e-Aadhaar PDF using your Aadhaar number and OTP.' }
    ],
    deadline: 'Rolling (Available round the year)',
    openingDate: 'Continuous',
    officialUrl: 'https://myaadhaar.uidai.gov.in',
    officialPortal: 'https://uidai.gov.in',
    officialSource: 'Unique Identification Authority of India (UIDAI)',
    sourceDocument: 'Aadhaar (Targeted Delivery of Financial and Other Subsidies, Benefits and Services) Act, 2016',
    sourceType: 'Constitutional Statutory Service',
    sourceLastUpdated: 'September 2026',
    lastVerified: 'September 2026',
    isOfficialSourceVerified: true,
    verificationStatus: 'Verified',
    applicationStatus: 'Rolling',
    helpline: '1947 (Toll-Free 24x7 UIDAI National Helpline) / help@uidai.gov.in',
    keywords: ['aadhaar', 'uidai', 'eaadhaar', 'aadhaar card', 'aadhaar update', 'biometric update', 'aadhar', 'ఆధార్', 'आधार कार्ड'],
    aliases: ['Aadhaar', 'Aadhar Card', 'UID', 'e-Aadhaar']
  },
  {
    id: 'driving-licence-service',
    recordId: 'LIC-MORTH-004',
    recordType: 'LICENSE',
    name: 'Driving Licence (DL) & Learner\'s Licence (Sarathi Parivahan)',
    nativeNames: {
      hindi: 'ड्राइविंग लाइसेंस एवं लर्नर लाइसेंस (सारथी परिवहन)',
      telugu: 'డ్రైవింగ్ లైసెన్స్ & లెర్నర్స్ లైసెన్స్ (సారథి పరివాహన్)',
      tamil: 'ஓட்டுநர் உரிமம் (சாரதி பரிவாஹன்)'
    },
    ministry: 'Ministry of Road Transport and Highways (MoRTH)',
    department: 'Transport Department / Regional Transport Offices (RTO)',
    governmentLevel: 'Central',
    state: 'All-India',
    category: 'Citizen Services',
    targetBeneficiary: 'Citizens desiring to operate motor vehicles legally on Indian roads',
    shortDescription: 'National smart card licence authorizing the holder to drive two-wheelers (MCWG), four-wheelers (LMV), or commercial transport vehicles across India.',
    detailedDescription: 'Issued under the Motor Vehicles Act, 1988 via the centralized national Sarathi Parivahan portal. Citizens first acquire a Learner’s Licence (valid for 6 months), and after 30 days can appear for the driving test at their jurisdictional RTO to receive a permanent Smart Card Driving Licence valid for 20 years or until age 40.',
    plainSummary: 'To drive a bike or car legally in India, you first apply online for a Learner’s Licence (LL) on sarathi.parivahan.gov.in. After 30 days, you book a driving test slot at your local RTO. On passing the practical driving test, your permanent Smart Card Driving Licence is mailed to your home.',
    mainBenefit: 'Legal Authorization to Drive Nationwide + Recognized National Identity & Address Proof',
    benefitType: 'Licence / Approval',
    fees: '₹200 (Learner Licence) + ₹200 (Driving Licence Issue) + ₹300 (Driving Test Fee) + ₹200 (Smart Card Fee) = Approx ₹900 total statutory fee',
    processingTime: 'Learner Licence: Same day online test | Driving Licence: 7 to 15 days after passing practical test at RTO',
    applicationMode: 'Hybrid',
    eligibilityRules: {
      minAge: 18, // 16 for gearless 50cc, 18 for LMV/MCWG, 20 for transport
      states: ['All-India'],
      customConditions: [
        'Age 18+ for Light Motor Vehicle (LMV) and Motorcycles with Gear (MCWG)',
        'Age 16+ for Motorcycles without gear (engine capacity up to 50cc) with parental consent',
        'Must hold an active Learner\'s Licence for at least 30 days before taking the permanent DL test',
        'Must meet medical and physical fitness standards (Form 1 / Form 1A)'
      ]
    },
    requiredDocuments: [
      {
        id: 'dl-doc-ll',
        name: 'Learner\'s Licence Number (Held for min 30 days)',
        whyNeeded: 'Mandatory statutory prerequisite to book the practical driving track test.',
        howToObtain: 'Applied on Sarathi portal after passing computerized road sign test.',
        officialLink: 'https://sarathi.parivahan.gov.in',
        isMandatory: true
      },
      {
        id: 'dl-doc-age',
        name: 'Proof of Age',
        whyNeeded: 'Verifies minimum age requirement.',
        howToObtain: '10th Class mark sheet, Birth Certificate, Aadhaar Card, or Passport.',
        isMandatory: true
      },
      {
        id: 'dl-doc-address',
        name: 'Proof of Address',
        whyNeeded: 'Determines local RTO jurisdiction.',
        howToObtain: 'Aadhaar Card, Voter ID, Electricity Bill, or Registered Rent Agreement.',
        isMandatory: true
      }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Apply for Learner Licence (LL)', description: 'Visit https://sarathi.parivahan.gov.in, select your State, and choose "Apply for Learner Licence". Complete Aadhaar e-KYC for contactless LL test from home.', portalUrl: 'https://sarathi.parivahan.gov.in' },
      { stepNumber: 2, title: 'Pass Online Traffic Signs Test', description: 'Take the online computerized multiple-choice test on road safety rules.' },
      { stepNumber: 3, title: 'Complete 30 Days & Book DL Slot', description: 'After holding LL for 30 days, log in to Sarathi and choose "Apply for Driving Licence" & "Book Test Slot".' },
      { stepNumber: 4, title: 'Appear for RTO Driving Test', description: 'Take your vehicle to the automated testing track at the RTO. On passing, the Motor Vehicle Inspector approves issuance.' },
      { stepNumber: 5, title: 'Receive Smart Card DL by Post', description: 'Track speed post consignment on parivahan portal. Digital DL is instantly visible in DigiLocker and mParivahan.' }
    ],
    deadline: 'Permanent DL must be applied within 180 days of Learner Licence issue',
    openingDate: 'Continuous',
    officialUrl: 'https://sarathi.parivahan.gov.in',
    officialPortal: 'https://sarathi.parivahan.gov.in',
    officialSource: 'Ministry of Road Transport and Highways (MoRTH)',
    sourceDocument: 'Motor Vehicles (Amendment) Act, 2019 & Central Motor Vehicles Rules, 1989',
    sourceType: 'Statutory Licence',
    sourceLastUpdated: 'September 2026',
    lastVerified: 'September 2026',
    isOfficialSourceVerified: true,
    verificationStatus: 'Verified',
    applicationStatus: 'Rolling',
    helpline: '0120-4925505 (Sarathi Parivahan Helpdesk) / helpdesk-sarathi@gov.in',
    keywords: ['driving licence', 'dl', 'learner licence', 'parivahan', 'sarathi', 'rto', 'driving test', 'licence', 'డ్రైవింగ్ లైసెన్స్', 'ड्राइविंग लाइसेंस'],
    aliases: ['Driving License', 'DL', 'Learner License', 'LL', 'Sarathi DL']
  },
  {
    id: 'passport-seva',
    recordId: 'DOC-MEA-005',
    recordType: 'DOCUMENT',
    name: 'Passport Seva – Fresh Passport & Renewal (Normal / Tatkaal)',
    nativeNames: {
      hindi: 'पासपोर्ट सेवा – नया पासपोर्ट एवं नवीनीकरण (सामान्य / तत्काल)',
      telugu: 'పాస్‌పోర్ట్ సేవ – కొత్త పాస్‌పోర్ట్ & పునరుద్ధరణ (సాధారణ / తత్కాల్)',
      tamil: 'பாஸ்போர்ட் சேவா – புதிய மற்றும் புதுப்பித்தல்'
    },
    ministry: 'Ministry of External Affairs (MEA)',
    department: 'Consular, Passport and Visa (CPV) Division',
    governmentLevel: 'Central',
    state: 'All-India',
    category: 'Documents',
    targetBeneficiary: 'Indian citizens intending to travel abroad for work, study, tourism, or business',
    shortDescription: 'National sovereign travel and citizenship document issued by the President of India for international travel and official overseas identity.',
    detailedDescription: 'Administered under the Passports Act, 1967 through 500+ Passport Seva Kendras (PSK) and Post Office Passport Seva Kendras (POPSK). Citizens fill the online form, pay statutory fees, book an appointment for biometric capture and document verification, followed by police verification at their local station before delivery by India Post Speed Post.',
    plainSummary: 'To travel abroad for work, studies, or holiday, you apply for an Indian Passport online at passportindia.gov.in. After filling the application and paying ₹1,500, you visit your chosen Passport Seva Kendra (PSK) for biometric capture. After routine police verification, your passport is delivered to your address.',
    mainBenefit: 'Sovereign International Travel Clearance + High-Trust Citizenship & Identity Credential',
    benefitType: 'Citizen Service',
    fees: '₹1,500 for Fresh Normal Passport (36 Pages, 10-year validity) | ₹2,000 for 60 Pages Jumbo Booklet | ₹3,500 for Tatkaal Urgent Processing',
    processingTime: 'Normal: 15 to 25 working days | Tatkaal: 1 to 3 working days (dispatch without prior police verification)',
    applicationMode: 'Hybrid',
    eligibilityRules: {
      minAge: 0,
      states: ['All-India'],
      customConditions: [
        'Must be a citizen of India by birth, descent, or registration',
        'Must have clean criminal record with no ongoing non-bailable warrants or travel prohibitions'
      ]
    },
    requiredDocuments: [
      {
        id: 'psk-doc-poi',
        name: 'Proof of Date of Birth (DOB Proof)',
        whyNeeded: 'Verifies birth identity as per MEA guidelines.',
        howToObtain: 'Birth Certificate issued by Municipal Corporation/Registrar of Births, 10th passing certificate, or Aadhaar Card.',
        officialLink: 'https://www.passportindia.gov.in',
        isMandatory: true
      },
      {
        id: 'psk-doc-poa',
        name: 'Proof of Present Address',
        whyNeeded: 'Determines jurisdictional Police Station for security clearance.',
        howToObtain: 'Aadhaar Card, active bank passbook with photo and stamp, electricity bill, or spouse passport copy.',
        isMandatory: true
      },
      {
        id: 'psk-doc-ecnr',
        name: 'Proof of Educational Qualification for Non-ECR (Emigration Check Not Required)',
        whyNeeded: 'Exempts passport holder from emigration clearance when traveling for employment to ECR countries.',
        howToObtain: '10th Class (Matriculation) or higher educational degree/diploma certificate.',
        isMandatory: false
      }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Register on Official Passport Portal', description: 'Visit https://www.passportindia.gov.in and click "New User Registration". Select your local Passport Office.', portalUrl: 'https://www.passportindia.gov.in' },
      { stepNumber: 2, title: 'Fill Online Application Form', description: 'Select "Apply for Fresh Passport / Re-issue", enter personal details, family details, and address history of the last 1 year.' },
      { stepNumber: 3, title: 'Pay Statutory Fee & Book Appointment', description: 'Pay ₹1,500 online using NetBanking/UPI/Credit Card and pick a date/time slot at your nearest PSK or POPSK.' },
      { stepNumber: 4, title: 'Visit PSK / POPSK on Appointment Day', description: 'Carry original documents. Undergo token verification, biometric fingerprint scan, and photo capture in Counters A, B, and C.' },
      { stepNumber: 5, title: 'Police Verification & Delivery', description: 'Local police officer completes address inquiry. Passport is printed and dispatched via Speed Post with tracking SMS.' }
    ],
    deadline: 'Rolling (Open all year)',
    openingDate: 'Continuous',
    officialUrl: 'https://www.passportindia.gov.in',
    officialPortal: 'https://www.passportindia.gov.in',
    officialSource: 'Ministry of External Affairs (MEA), Government of India',
    sourceDocument: 'Passports Act, 1967 & Passport Rules, 1980',
    sourceType: 'Constitutional Statutory Travel Document',
    sourceLastUpdated: 'September 2026',
    lastVerified: 'September 2026',
    isOfficialSourceVerified: true,
    verificationStatus: 'Verified',
    applicationStatus: 'Rolling',
    helpline: '1800-258-1800 (National Passport Call Centre - Multilingual Toll-Free)',
    keywords: ['passport', 'passport seva', 'tatkaal', 'psk', 'popsk', 'mea', 'international travel', 'visa', 'పాస్‌పోర్ట్', 'पासपोर्ट सेवा'],
    aliases: ['Indian Passport', 'Passport Seva Kendra', 'Tatkaal Passport']
  },
  {
    id: 'income-certificate-service',
    recordId: 'CRT-REV-006',
    recordType: 'CERTIFICATE',
    name: 'Income Certificate (Tehsildar / e-District / MeeSeva / CSC)',
    nativeNames: {
      hindi: 'आय प्रमाण पत्र (तहसीलदार / ई-डिस्ट्रिक्ट)',
      telugu: 'ఆదాయ ధృవీకరణ పత్రం (తహశీల్దార్ / మీసేవ)',
      tamil: 'வருமானச் சான்றிதழ் (இ-சேவை)',
      marathi: 'उत्पन्नाचा दाखला (तहसील कार्यालय)'
    },
    ministry: 'State Revenue Department & Ministry of Personnel',
    department: 'District Revenue Administration / Tehsildar Office',
    governmentLevel: 'State',
    state: 'All-India',
    category: 'Certificates',
    targetBeneficiary: 'Students, job applicants, and citizens applying for scholarships, fee reimbursement, or welfare subsidies',
    shortDescription: 'Legally certified proof of annual family income issued by the executive magistrate/Tehsildar required to establish eligibility for government schemes.',
    detailedDescription: 'Income Certificate is issued by the Revenue Department under State Public Service Delivery Acts across all 28 States and 8 Union Territories. It confirms the gross annual household income from all sources (agriculture, salary, business, daily wages) and is mandatory for claiming post-matric scholarships, fee reimbursement, EWS quota reservations, and BPL healthcare cards.',
    plainSummary: 'An Income Certificate is an official document from your local Tehsildar certifying your family’s annual income. You need it to get government college scholarships, free hostel admission, fee waivers, or EWS reservations. You can apply online through your State e-District / MeeSeva portal or at your local CSC center.',
    mainBenefit: 'Mandatory Proof of Family Income for College Scholarships, Fee Waivers, and EWS Quotas',
    benefitType: 'Certificate / Identity',
    fees: '₹15 to ₹50 nominal user charge / statutory stamp fee (varies marginally by state)',
    processingTime: '7 to 15 working days (Field inquiry by Village Revenue Officer / Revenue Inspector)',
    applicationMode: 'Hybrid',
    eligibilityRules: {
      minAge: 18, // Or parent applying on behalf of student
      states: ['All-India'],
      customConditions: [
        'Must be a bona fide resident of the state and revenue mandal/tehsil where applying',
        'Income declared must be supported by salary slip, land passbook, income tax return, or self-declaration affidavit'
      ]
    },
    requiredDocuments: [
      {
        id: 'inc-doc-id',
        name: 'Aadhaar Card of Applicant & Family Head',
        whyNeeded: 'Identity authentication and address verification.',
        howToObtain: 'UIDAI.',
        officialLink: 'https://uidai.gov.in',
        isMandatory: true
      },
      {
        id: 'inc-doc-ration',
        name: 'Ration Card / Food Security Card / Family Member Details',
        whyNeeded: 'Validates family composition and economic tier.',
        howToObtain: 'State Food & Civil Supplies portal.',
        isMandatory: true
      },
      {
        id: 'inc-doc-proof',
        name: 'Income Proof Document',
        whyNeeded: 'Substantiates declared earnings.',
        howToObtain: 'Salary Certificate/Form 16 from employer, Land Revenue/Pattadar Passbook for farmers, or Notarized Affidavit for unorganized laborers.',
        isMandatory: true
      }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Visit State Citizen Portal or CSC', description: 'Access your State e-District portal (e.g. MeeSeva in Telangana/AP, edistrict.up.gov.in in UP, Aaple Sarkar in Maharashtra, Seva Sindhu in Karnataka) or visit any Village/Ward Secretariat/CSC.', portalUrl: 'https://serviceonline.gov.in' },
      { stepNumber: 2, title: 'Fill Application & Attach Documents', description: 'Enter applicant details, father/spouse name, address, and upload salary slip/land records and affidavit.' },
      { stepNumber: 3, title: 'Revenue Inspector Verification', description: 'Application routed to local Village Revenue Officer (VRO) and Revenue Inspector (RI) for ground inquiry.' },
      { stepNumber: 4, title: 'Tehsildar Digital Signature & Download', description: 'Tehsildar / Executive Magistrate signs the certificate with digital signature. Download certificate with QR verification code.' }
    ],
    deadline: 'Rolling (Valid for 1 financial year / 3 years depending on state rule)',
    openingDate: 'Continuous',
    officialUrl: 'https://serviceonline.gov.in',
    officialPortal: 'https://serviceonline.gov.in',
    officialSource: 'State Revenue Departments & National Service Online Portal (NIC)',
    sourceDocument: 'State Public Services Guarantee Acts & Citizen Charter',
    sourceType: 'Statutory Revenue Certificate',
    sourceLastUpdated: 'September 2026',
    lastVerified: 'September 2026',
    isOfficialSourceVerified: true,
    verificationStatus: 'Verified',
    applicationStatus: 'Rolling',
    helpline: '1800-425-4440 (State Citizen Helpline) or local Tehsildar office',
    keywords: ['income certificate', 'aay praman patra', 'meeseva', 'edistrict', 'tehsildar', 'scholarship income', 'ews income', 'ఆదాయ ధృవీకరణ పత్రం', 'आय प्रमाण पत्र'],
    aliases: ['Income Certificate', 'Aay Praman Patra', 'MeeSeva Income Certificate', 'eDistrict Income']
  },
  {
    id: 'caste-certificate-service',
    recordId: 'CRT-REV-007',
    recordType: 'CERTIFICATE',
    name: 'Caste / Community Certificate & Non-Creamy Layer (NCL)',
    nativeNames: {
      hindi: 'जाति प्रमाण पत्र एवं गैर-क्रीमी लेयर (NCL) प्रमाण पत्र',
      telugu: 'కుల ధృవీకరణ పత్రం మరియు నాన్-క్రీమీ లేయర్ (NCL)',
      tamil: 'சாதிச் சான்றிதழ்',
      marathi: 'जात प्रमाणपत्र आणि नॉन-क्रिमीलेअर दाखला'
    },
    ministry: 'Ministry of Social Justice and Empowerment & State Revenue Depts',
    department: 'Revenue & Social Welfare Department',
    governmentLevel: 'State',
    state: 'All-India',
    category: 'Certificates',
    targetBeneficiary: 'Citizens belonging to Scheduled Castes (SC), Scheduled Tribes (ST), and Other Backward Classes (OBC/SEBC)',
    shortDescription: 'Official statutory proof of caste and social category needed to claim affirmative action reservations in admissions, government jobs, and welfare benefits.',
    detailedDescription: 'Issued by Sub-Divisional Magistrates / Tehsildars under Constitutional (Scheduled Castes/Scheduled Tribes) Orders and Central/State OBC lists. For OBC applicants seeking Central Government jobs and educational quotas, a Non-Creamy Layer (NCL) certificate certifying annual income below ₹8 Lakh is also issued alongside.',
    plainSummary: 'A Caste Certificate officially proves that you belong to a recognized SC, ST, or OBC community. It is required to claim reserved seats in colleges (IIT, NIT, Medical, State Universities), government recruitment, and reserved welfare schemes.',
    mainBenefit: 'Affirmative Action Reservation in Educational Admissions & Public Employment + Welfare Eligibility',
    benefitType: 'Certificate / Identity',
    fees: '₹15 to ₹45 statutory fee at CSC / MeeSeva / e-District',
    processingTime: '15 to 30 working days (requires lineage verification)',
    applicationMode: 'Hybrid',
    eligibilityRules: {
      minAge: 0,
      states: ['All-India'],
      socialCategories: ['SC', 'ST', 'OBC', 'EWS'],
      customConditions: [
        'Must belong to a caste or tribe officially notified in the Presidential Order or State Government backward classes gazette',
        'For OBC-NCL: Gross annual family income must be below ₹8 Lakhs for the preceding 3 consecutive financial years'
      ]
    },
    requiredDocuments: [
      {
        id: 'caste-doc-father',
        name: 'Father\'s or Paternal Blood Relative\'s Caste Certificate / School Record',
        whyNeeded: 'Proves inherited caste lineage through paternal line.',
        howToObtain: 'Father/grandfather caste certificate, school leaving certificate (TC), or revenue settlement record.',
        officialLink: 'https://serviceonline.gov.in',
        isMandatory: true
      },
      {
        id: 'caste-doc-aadhaar',
        name: 'Aadhaar Card of Applicant & Parents',
        whyNeeded: 'Biometric identification and address proof.',
        howToObtain: 'UIDAI.',
        isMandatory: true
      },
      {
        id: 'caste-doc-domicile',
        name: 'Proof of Domicile / Residence in the State',
        whyNeeded: 'Verifies state belonging as of the cut-off date (e.g. 1950 for SC/ST, 1993 for OBC).',
        howToObtain: 'State voter ID, land records, or old ration card.',
        isMandatory: true
      }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Submit Application on State Portal', description: 'Log in to your State e-District / MeeSeva / CSC portal and select "Issuance of Caste / Community Certificate".', portalUrl: 'https://serviceonline.gov.in' },
      { stepNumber: 2, title: 'Upload Paternal Lineage Proof', description: 'Upload father\'s school TC or old caste certificate showing community entry and residence.' },
      { stepNumber: 3, title: 'Field Scrutiny by Revenue Inspector', description: 'Village Revenue Officer and Revenue Inspector conduct local verification regarding traditional social standing.' },
      { stepNumber: 4, title: 'Issue of Digitally Signed Certificate', description: 'Tehsildar / Sub-Divisional Officer approves and issues the barcoded, verifiable digital caste certificate.' }
    ],
    deadline: 'Rolling (SC/ST certificate is lifetime valid; OBC-NCL certificate valid for 1 financial year)',
    openingDate: 'Continuous',
    officialUrl: 'https://serviceonline.gov.in',
    officialPortal: 'https://serviceonline.gov.in',
    officialSource: 'State Social Welfare & Revenue Administration',
    sourceDocument: 'Constitutional Orders (SC/ST) & National Commission for Backward Classes (NCBC) Guidelines',
    sourceType: 'Constitutional Statutory Certificate',
    sourceLastUpdated: 'September 2026',
    lastVerified: 'September 2026',
    isOfficialSourceVerified: true,
    verificationStatus: 'Verified',
    applicationStatus: 'Rolling',
    helpline: '1800-425-4440 or district social welfare office',
    keywords: ['caste certificate', 'jaati praman patra', 'obc ncl', 'non creamy layer', 'sc certificate', 'st certificate', 'meeseva caste', 'కుల ధృవీకరణ పత్రం', 'जाति प्रमाण पत्र'],
    aliases: ['Community Certificate', 'Jaati Praman Patra', 'OBC-NCL Certificate', 'Social Status Certificate']
  },
  {
    id: 'udyam-msme-registration',
    recordId: 'REG-MSME-008',
    recordType: 'REGISTRATION',
    name: 'Udyam MSME Registration Certificate (Government of India)',
    nativeNames: {
      hindi: 'उद्यम एमएसएमई पंजीकरण प्रमाण पत्र (सूक्ष्म, लघु एवं मध्यम उद्यम)',
      telugu: 'ఉద్యమ్ ఎంఎస్ఎంఈ రిజిస్ట్రేషన్ సర్టిఫికేట్',
      tamil: 'உத்யாம் குறு, சிறு மற்றும் நடுத்தர தொழில் பதிவு'
    },
    ministry: 'Ministry of Micro, Small and Medium Enterprises (MSME)',
    department: 'Office of the Development Commissioner (MSME)',
    governmentLevel: 'Central',
    state: 'All-India',
    category: 'Business',
    targetBeneficiary: 'Small business owners, traders, shopkeepers, service providers, and manufacturing enterprises',
    shortDescription: 'Free, paperless, permanent registration certificate for micro, small, and medium businesses to unlock priority bank lending, collateral-free loans, and government subsidies.',
    detailedDescription: 'Udyam Registration is the single, official, statutory portal for registering micro, small, and medium enterprises in India. The process is completely paperless and 100% free of charge (the Ministry charges zero fees). Udyam-registered businesses receive priority sector lending, collateral-free loans under CGTMSE, 1% interest rate concessions, exemption on tender security deposits (EMD), and 50% discount on trademark patents.',
    plainSummary: 'If you run a small business, shop, manufacturing unit, or service enterprise, you can get a free government Udyam Certificate in 5 minutes using your Aadhaar and PAN on udyamregistration.gov.in. It qualifies your business for low-interest bank loans without property mortgage and government tender exemptions.',
    mainBenefit: 'Collateral-Free Bank Credit (CGTMSE) + 1% Bank Interest Concession + MSME Subsidy Access',
    benefitType: 'Citizen Service',
    fees: 'Free of Cost (₹0 - Government of India warns against private agents charging fees)',
    processingTime: 'Instant acknowledgement generated; Udyam e-Certificate with permanent QR code issued in 1 to 3 days',
    applicationMode: 'Online',
    eligibilityRules: {
      minAge: 18,
      occupations: ['Business', 'Employee'],
      states: ['All-India'],
      customConditions: [
        'Must own or operate a micro, small, or medium enterprise in manufacturing, service, or retail trade',
        'Micro Enterprise: Investment in plant & machinery ≤ ₹1 Crore AND annual turnover ≤ ₹5 Crore',
        'Small Enterprise: Investment ≤ ₹10 Crore AND annual turnover ≤ ₹50 Crore',
        'Medium Enterprise: Investment ≤ ₹50 Crore AND annual turnover ≤ ₹250 Crore'
      ]
    },
    requiredDocuments: [
      {
        id: 'udyam-doc-aadhaar',
        name: 'Aadhaar Card of Business Owner / Partner / Director',
        whyNeeded: 'Proprietor/Director verification and instant OTP signing.',
        howToObtain: 'UIDAI.',
        officialLink: 'https://udyamregistration.gov.in',
        isMandatory: true
      },
      {
        id: 'udyam-doc-pan',
        name: 'PAN Card (Personal PAN for Proprietorship, Firm PAN for Company/LLP)',
        whyNeeded: 'Fetches automated income tax turnover and investment data directly from CBDT.',
        howToObtain: 'Income Tax Department.',
        isMandatory: true
      },
      {
        id: 'udyam-doc-bank',
        name: 'Business Bank Account Details (Account Number & IFSC)',
        whyNeeded: 'Required for DBT government subsidy credits and priority sector tagging.',
        howToObtain: 'Bank cheque book or bank passbook.',
        isMandatory: true
      }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Visit Official Udyam Portal', description: 'Open verified portal https://udyamregistration.gov.in and click "For New Entrepreneurs who are not Registered yet as MSME".', portalUrl: 'https://udyamregistration.gov.in' },
      { stepNumber: 2, title: 'Enter Aadhaar & OTP', description: 'Enter proprietor/partner Aadhaar and validate with mobile OTP.' },
      { stepNumber: 3, title: 'PAN Validation & Business Profile', description: 'Enter PAN and organization type. System auto-verifies tax return details.' },
      { stepNumber: 4, title: 'Enter Enterprise Details & NIC Code', description: 'Enter enterprise name, plant address, bank details, and National Industry Classification (NIC) code matching your business activity.' },
      { stepNumber: 5, title: 'Instant Udyam Certificate Download', description: 'Submit and receive your permanent Udyam Registration Number (URN). Download the certificate with QR verification code.' }
    ],
    deadline: 'Rolling (Open all year round)',
    openingDate: 'Continuous',
    officialUrl: 'https://udyamregistration.gov.in',
    officialPortal: 'https://udyamregistration.gov.in',
    officialSource: 'Ministry of Micro, Small and Medium Enterprises (MoMSME)',
    sourceDocument: 'MSMED Act, 2006 & Gazette Notification S.O. 2119(E) dated 26th June 2020',
    sourceType: 'Statutory Business Registration',
    sourceLastUpdated: 'September 2026',
    lastVerified: 'September 2026',
    isOfficialSourceVerified: true,
    verificationStatus: 'Verified',
    applicationStatus: 'Rolling',
    helpline: '011-23063288 / Champions MSME Portal Toll-Free 1800-572-8888',
    keywords: ['udyam', 'msme registration', 'msme', 'business certificate', 'small business loan', 'cgtmse', 'udyam certificate', 'उद्योग आधार', 'ఉద్యమ్'],
    aliases: ['MSME Registration', 'Udyog Aadhaar', 'Udyam Certificate', 'MSME Certificate']
  },
  {
    id: 'birth-death-certificate',
    recordId: 'CRT-CRS-009',
    recordType: 'CERTIFICATE',
    name: 'Birth & Death Certificate Registration (Civil Registration System - CRS)',
    nativeNames: {
      hindi: 'जन्म एवं मृत्यु प्रमाण पत्र पंजीकरण (नागरिक पंजीकरण प्रणाली)',
      telugu: 'జనన మరియు మరణ ధృవీకరణ పత్రం (CRS)',
      tamil: 'பிறப்பு மற்றும் இறப்பு சான்றிதழ்'
    },
    ministry: 'Ministry of Home Affairs / Office of the Registrar General of India (ORGI)',
    department: 'Civil Registration System & Municipal Administration',
    governmentLevel: 'Central',
    state: 'All-India',
    category: 'Certificates',
    targetBeneficiary: 'Parents of newborns and legal family representatives of deceased individuals',
    shortDescription: 'Constitutional vital event registration establishing legal identity, parentage, date of birth, or succession rights.',
    detailedDescription: 'Registration of Births and Deaths Act, 1969 mandates that every birth and death must be reported within 21 days to the local Registrar (Municipal Commissioner in urban areas, Panchayat Secretary/Tahsildar in rural areas). Birth certificates serve as the ultimate, foundational identity document for school admissions, passports, voter IDs, and government jobs.',
    plainSummary: 'A Birth Certificate is the first official identity document of every child in India, required for school admissions, Aadhaar, and passports. If registered within 21 days of birth at the hospital or local municipality/gram panchayat, it is issued completely free of cost.',
    mainBenefit: 'Conclusive Proof of Age, Parentage, and Legal Existence for All Government Services',
    benefitType: 'Certificate / Identity',
    fees: 'Free of Cost (₹0) if registered within 21 days of the event | Nominal search fee of ₹2 to ₹10 for subsequent copies',
    processingTime: '3 to 7 working days (Immediate for institutional hospital births)',
    applicationMode: 'Hybrid',
    eligibilityRules: {
      minAge: 0,
      states: ['All-India'],
      customConditions: [
        'Event (birth or death) must have occurred within the territorial jurisdiction of the Registrar',
        'Reporting must be accompanied by hospital discharge certificate or doctor\'s intimation'
      ]
    },
    requiredDocuments: [
      {
        id: 'crs-doc-hospital',
        name: 'Hospital / Nursing Home Discharge Summary / Form 1 Birth Slip',
        whyNeeded: 'Medical certificate confirming date, time, sex, and mother\'s name.',
        howToObtain: 'Issued by hospital authorities at time of discharge.',
        officialLink: 'https://crsorgi.gov.in',
        isMandatory: true
      },
      {
        id: 'crs-doc-parents',
        name: 'Aadhaar Cards of Mother and Father',
        whyNeeded: 'Verifies parents\' identity and legal residential address.',
        howToObtain: 'UIDAI.',
        isMandatory: true
      }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Institutional Registration at Hospital', description: 'For hospital births, the hospital directly enters details on the National CRS portal https://crsorgi.gov.in.' },
      { stepNumber: 2, title: 'Online Application for Home Births', description: 'If birth occurred at home, parent reports within 21 days on crsorgi.gov.in or at local Gram Panchayat / Municipality.' },
      { stepNumber: 3, title: 'Name Inclusion & Download', description: 'Parents can add the child\'s official name online within 1 year and download the digitally signed birth certificate.' }
    ],
    deadline: 'Within 21 days for free issuance; delayed registration up to 1 year requires SDM permission',
    openingDate: 'Continuous',
    officialUrl: 'https://crsorgi.gov.in',
    officialPortal: 'https://crsorgi.gov.in',
    officialSource: 'Office of the Registrar General of India (ORGI), Ministry of Home Affairs',
    sourceDocument: 'Registration of Births and Deaths (Amendment) Act, 2023',
    sourceType: 'Constitutional Statutory Certificate',
    sourceLastUpdated: 'September 2026',
    lastVerified: 'September 2026',
    isOfficialSourceVerified: true,
    verificationStatus: 'Verified',
    applicationStatus: 'Rolling',
    helpline: 'Local Municipal Corporation / Gram Panchayat Helpdesk',
    keywords: ['birth certificate', 'death certificate', 'crs', 'orgi', 'janm praman patra', 'hospital birth', 'జనన ధృవీకరణ పత్రం', 'जन्म प्रमाण पत्र'],
    aliases: ['Birth Certificate', 'Death Certificate', 'Janm Praman Patra', 'CRS Certificate']
  },
  {
    id: 'udid-disability-certificate',
    recordId: 'CRT-DEPWD-010',
    recordType: 'CERTIFICATE',
    name: 'Unique Disability ID (UDID) & Disability Certificate',
    nativeNames: {
      hindi: 'विशिष्ट दिव्यांगता पहचान पत्र (UDID) एवं दिव्यांगता प्रमाण पत्र',
      telugu: 'యూనిక్ డిసేబిలిటీ ఐడీ (UDID) & దివ్యాంగుల ధృవీకరణ పత్రం',
      tamil: 'தனித்துவ மாற்றுத்திறனாளி அடையாள அட்டை'
    },
    ministry: 'Ministry of Social Justice and Empowerment',
    department: 'Department of Empowerment of Persons with Disabilities (DEPwD)',
    governmentLevel: 'Central',
    state: 'All-India',
    category: 'Disability',
    targetBeneficiary: 'Specially-abled persons with benchmark disabilities (locomotor, visual, hearing, intellectual, autism, etc.)',
    shortDescription: 'National smart card identity for persons with disabilities unlocking 4% government job reservation, free railway/bus concessions, assistive equipment grants, and pensions.',
    detailedDescription: 'The UDID project implements the Rights of Persons with Disabilities (RPwD) Act, 2016 across all States and UTs. It eliminates the need for multiple paper certificates. Medical boards evaluate disability percentage and issue a tamper-proof Smart UDID Card with QR code recognized nationwide by Indian Railways, State Road Transport, banks, and scholarship authorities.',
    plainSummary: 'If you or a family member is specially abled (physically challenged, blind, hearing impaired, etc.), the government issues a free Unique Disability ID (UDID) card. It provides free bus passes, 75% railway ticket discounts, monthly disability pensions, free wheelchairs/hearing aids, and 4% government job reservations.',
    mainBenefit: 'Smart National Card + Free Public Transit Concessions + Assistive Aids + 4% Reservation',
    benefitType: 'Certificate / Identity',
    fees: 'Free of Cost (₹0 - Government charges zero fees)',
    processingTime: '15 to 30 working days (Medical evaluation by District Medical Board / Civil Surgeon)',
    applicationMode: 'Hybrid',
    eligibilityRules: {
      minAge: 0,
      speciallyAbledOnly: true,
      states: ['All-India'],
      customConditions: [
        'Must have benchmark disability of 40% or higher as assessed by an authorized medical board',
        'Covers 21 specified disabilities under Rights of Persons with Disabilities Act, 2016'
      ]
    },
    requiredDocuments: [
      {
        id: 'udid-doc-medical',
        name: 'Hospital Medical Assessment / Clinical Examination Report',
        whyNeeded: 'Evaluates disability category and percentage of impairment.',
        howToObtain: 'District Civil Hospital / Chief Medical Officer (CMO) / Medical Board.',
        officialLink: 'https://www.swavlambancard.gov.in',
        isMandatory: true
      },
      {
        id: 'udid-doc-aadhaar',
        name: 'Aadhaar Card of Specially-Abled Applicant',
        whyNeeded: 'Identity authentication and address verification.',
        howToObtain: 'UIDAI.',
        isMandatory: true
      },
      {
        id: 'udid-doc-photo',
        name: 'Recent Passport-size Photograph Showing Disability',
        whyNeeded: 'Imprinted on the plastic UDID smart card.',
        howToObtain: 'Photograph clearly displaying nature of impairment where applicable.',
        isMandatory: true
      }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Apply on Swavlamban Portal', description: 'Visit https://www.swavlambancard.gov.in and click "Apply for Disability Certificate & UDID Card".', portalUrl: 'https://www.swavlambancard.gov.in' },
      { stepNumber: 2, title: 'Upload Personal & Disability Details', description: 'Enter address, education, employment, and choose your preferred District Hospital for medical checkup.' },
      { stepNumber: 3, title: 'Appear at District Medical Board', description: 'Visit the designated Government Hospital on appointed day for physical assessment by specialist doctors.' },
      { stepNumber: 4, title: 'Download e-UDID & Card Dispatch', description: 'Once approved by CMO, download digital e-UDID card immediately. Physical laminated Smart Card is mailed to your address.' }
    ],
    deadline: 'Rolling (Open continuously)',
    openingDate: 'Active round-the-clock',
    officialUrl: 'https://www.swavlambancard.gov.in',
    officialPortal: 'https://www.swavlambancard.gov.in',
    officialSource: 'Department of Empowerment of Persons with Disabilities (DEPwD), Government of India',
    sourceDocument: 'Rights of Persons with Disabilities (RPwD) Act, 2016',
    sourceType: 'Statutory National Identity Card',
    sourceLastUpdated: 'September 2026',
    lastVerified: 'September 2026',
    isOfficialSourceVerified: true,
    verificationStatus: 'Verified',
    applicationStatus: 'Rolling',
    helpline: '1800-111-200 / 011-24365019 (DEPwD UDID Helpdesk)',
    keywords: ['udid', 'disability certificate', 'handicapped card', 'specially abled', 'swavlamban', 'railway concession', 'దివ్యాంగుల సర్టిఫికేట్', 'दिव्यांग प्रमाण पत्र'],
    aliases: ['UDID Card', 'Disability Certificate', 'Swavlamban Card', 'Divyangjan ID']
  },

  // ==========================================
  // STATE & UT FLAGSHIP SCHEMES (ACROSS INDIA)
  // ==========================================
  {
    id: 'majhi-ladki-bahin-maharashtra',
    recordId: 'SCH-MAH-011',
    recordType: 'SCHEME',
    name: 'Mukhyamantri Majhi Ladki Bahin Yojana (Maharashtra)',
    nativeNames: {
      marathi: 'मुख्यमंत्री माझी लाडकी बहीण योजना (महाराष्ट्र)',
      hindi: 'मुख्यमंत्री माझी लाड़की बहिन योजना (महाराष्ट्र)'
    },
    ministry: 'Women and Child Development Department',
    department: 'Women and Child Development, Government of Maharashtra',
    governmentLevel: 'State',
    state: 'Maharashtra',
    category: 'Women',
    targetBeneficiary: 'Economically disadvantaged women aged 21 to 65 years residing in Maharashtra',
    shortDescription: 'Direct financial assistance of ₹1,500 per month deposited into the bank accounts of women from eligible low-income families in Maharashtra.',
    detailedDescription: 'Flagship social welfare initiative by the Government of Maharashtra to empower women and ensure their financial independence. Eligible women receiving ₹1,500 monthly DBT transfers use the funds for health, nutrition, and personal emergencies. Family income must not exceed ₹2.5 Lakh per year.',
    plainSummary: 'If you are a woman living in Maharashtra aged between 21 and 65, and your family income is under ₹2.5 Lakh, the Maharashtra government deposits ₹1,500 every month directly into your Aadhaar-linked bank account.',
    mainBenefit: '₹1,500 / month (₹18,000 / year) Direct Bank Transfer',
    benefitType: 'Direct Cash Transfer',
    fees: 'Free of Cost (₹0)',
    processingTime: '15 to 30 days after document verification',
    applicationMode: 'Online',
    eligibilityRules: {
      minAge: 21,
      maxAge: 65,
      gender: 'Female',
      states: ['Maharashtra'],
      maxIncome: 250000,
      customConditions: [
        'Must be a permanent resident of Maharashtra with valid Domicile Certificate or 15-year Ration Card',
        'Annual household income must NOT exceed ₹2.50 Lakh',
        'Must have an active savings bank account seeded with Aadhaar and NPCI DBT mapping',
        'No family member should be a regular/permanent government employee or income tax payer'
      ]
    },
    requiredDocuments: [
      {
        id: 'ladki-doc-aadhaar',
        name: 'Aadhaar Card of Applicant Woman',
        whyNeeded: 'Direct Benefit Transfer (DBT) verification.',
        howToObtain: 'UIDAI.',
        officialLink: 'https://uidai.gov.in',
        isMandatory: true
      },
      {
        id: 'ladki-doc-domicile',
        name: 'Domicile Certificate of Maharashtra / 15-Year Resident Proof',
        whyNeeded: 'Proves permanent residency in Maharashtra.',
        howToObtain: 'Aaple Sarkar portal or Tehsildar office.',
        isMandatory: true
      },
      {
        id: 'ladki-doc-income',
        name: 'Income Certificate (Under ₹2.5 Lakh) or Yellow/Orange Ration Card',
        whyNeeded: 'Validates economic need.',
        howToObtain: 'Tahsildar / Sub-Divisional Officer.',
        isMandatory: true
      }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Visit Portal or Nari Shakti Doot App', description: 'Apply via the Nari Shakti Doot mobile app or visit https://ladakibahin.maharashtra.gov.in.', portalUrl: 'https://ladakibahin.maharashtra.gov.in' },
      { stepNumber: 2, title: 'Fill Personal Details', description: 'Enter Aadhaar, mobile number, marital status, and bank account details.' },
      { stepNumber: 3, title: 'Submit & Anganwadi Verification', description: 'Local Anganwadi Sevika / Ward Officer verifies documents.' },
      { stepNumber: 4, title: 'Monthly Direct Benefit Transfer', description: 'Approved beneficiaries receive ₹1,500 credited monthly directly to their bank.' }
    ],
    deadline: 'Rolling enrollment',
    openingDate: 'Continuous',
    officialUrl: 'https://ladakibahin.maharashtra.gov.in',
    officialPortal: 'https://ladakibahin.maharashtra.gov.in',
    officialSource: 'Government of Maharashtra WCD Resolution No. MMB-2024/CR-104/KA-04',
    sourceDocument: 'Maharashtra Government Gazette Extraordinary Notification',
    sourceType: 'State Cabinet Scheme',
    sourceLastUpdated: 'September 2026',
    lastVerified: 'September 2026',
    isOfficialSourceVerified: true,
    verificationStatus: 'Verified',
    applicationStatus: 'Open',
    helpline: '181 (Women Helpline) / 022-22027050',
    keywords: ['ladki bahin', 'maharashtra women scheme', 'majhi ladki bahin', '1500 per month', 'wcd maharashtra', 'माझी लाडकी बहीण'],
    aliases: ['Majhi Ladki Bahin', 'Mukhyamantri Ladki Bahin', 'Maharashtra ₹1500 Scheme']
  },
  {
    id: 'up-scholarship-scheme',
    recordId: 'SCH-UP-012',
    recordType: 'SCHEME',
    name: 'UP Post-Matric Scholarship & Fee Reimbursement Scheme (Uttar Pradesh)',
    nativeNames: {
      hindi: 'उत्तर प्रदेश पोस्ट-मैट्रिक छात्रवृत्ति एवं शुल्क प्रतिपूर्ति योजना'
    },
    ministry: 'Social Welfare Department, Government of Uttar Pradesh',
    department: 'Social Welfare & Backward Classes Welfare Department, UP',
    governmentLevel: 'State',
    state: 'Uttar Pradesh',
    category: 'Students',
    targetBeneficiary: 'Students pursuing Class 11, 12, Diploma, Graduation, Post-Graduation, or Professional courses in UP',
    shortDescription: 'Full tuition fee reimbursement and annual scholarship stipends up to ₹50,000 for economically vulnerable students studying in Uttar Pradesh.',
    detailedDescription: 'The Uttar Pradesh Scholarship and Fee Reimbursement Online System (Scholarship & Fee Reimbursement Online System) supports students from SC, ST, General, OBC, and Minority communities. Students studying in state-approved universities, degree colleges, polytechnics, and engineering institutes receive 100% reimbursement of non-refundable tuition fees plus a monthly maintenance allowance.',
    plainSummary: 'If you are studying in Uttar Pradesh (11th, 12th, B.Tech, B.Sc, BA, B.Com, MBA, Medical, etc.) and your family income is under ₹2 Lakh (₹2.5 Lakh for SC/ST), the UP government reimburses your full college fee and pays you an annual student stipend.',
    mainBenefit: '100% College Tuition Fee Reimbursement + Annual Student Maintenance Allowance up to ₹50,000',
    benefitType: 'Reimbursement',
    fees: 'Free of Cost (₹0)',
    processingTime: '30 to 45 days after college and district welfare officer verification',
    applicationMode: 'Online',
    eligibilityRules: {
      minAge: 15,
      maxAge: 35,
      occupations: ['Student'],
      states: ['Uttar Pradesh'],
      maxIncome: 200000, // ₹2.5L for SC/ST
      customConditions: [
        'Must be a permanent resident of Uttar Pradesh',
        'Must be enrolled in a recognized school/college/university in Class 11, 12, or higher degree course',
        'Annual family income must not exceed ₹2,00,000 for General/OBC/Minority (₹2,50,000 for SC/ST)'
      ]
    },
    requiredDocuments: [
      {
        id: 'up-sch-doc-income',
        name: 'UP State Income Certificate (Digitally Verified)',
        whyNeeded: 'Determines financial eligibility under state cutoff.',
        howToObtain: 'edistrict.up.gov.in / Tehsildar.',
        officialLink: 'https://scholarship.up.gov.in',
        isMandatory: true
      },
      {
        id: 'up-sch-doc-caste',
        name: 'Caste Certificate (For SC, ST, OBC students)',
        whyNeeded: 'Allocates welfare quota and scholarship funding category.',
        howToObtain: 'edistrict.up.gov.in.',
        isMandatory: false
      },
      {
        id: 'up-sch-doc-fee',
        name: 'College Fee Receipt & Bonafide Student Certificate',
        whyNeeded: 'Proves exact non-refundable college fees to be reimbursed.',
        howToObtain: 'College Administration / Accounts office.',
        isMandatory: true
      }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Register on UP Scholarship Portal', description: 'Visit https://scholarship.up.gov.in and click "Student" -> "Registration" -> "Postmatric Other Than Inter".', portalUrl: 'https://scholarship.up.gov.in' },
      { stepNumber: 2, title: 'Fill Academic & Bank Details', description: 'Enter high school roll number, college admission number, fee receipt, and Aadhaar number.' },
      { stepNumber: 3, title: 'Aadhaar e-KYC & Lock Application', description: 'Authenticate with Aadhaar OTP, review draft, print form, and submit hardcopy to college within 7 days.' },
      { stepNumber: 4, title: 'Direct Benefit Transfer to Bank', description: 'District Social Welfare Officer audits records and releases scholarship directly via PFMS DBT.' }
    ],
    deadline: 'Annual portal window (July to November each academic year)',
    openingDate: 'July every academic year',
    officialUrl: 'https://scholarship.up.gov.in',
    officialPortal: 'https://scholarship.up.gov.in',
    officialSource: 'Social Welfare Department, Government of Uttar Pradesh',
    sourceDocument: 'UP Scholarship Rules & Government Order No. 1289/26-3-2023',
    sourceType: 'State Statutory Scholarship',
    sourceLastUpdated: 'September 2026',
    lastVerified: 'September 2026',
    isOfficialSourceVerified: true,
    verificationStatus: 'Verified',
    applicationStatus: 'Open',
    helpline: '1800-180-5131 (UP Social Welfare Toll-Free) / 1076 (CM Helpline)',
    keywords: ['up scholarship', 'uttar pradesh scholarship', 'up fee reimbursement', 'post matric up', 'scholarship up gov in', 'यूपी छात्रवृत्ति'],
    aliases: ['UP Scholarship', 'UP Fee Reimbursement', 'UP Post-Matric']
  },
  {
    id: 'gruha-lakshmi-karnataka',
    recordId: 'SCH-KAR-013',
    recordType: 'SCHEME',
    name: 'Gruha Lakshmi Scheme (Karnataka)',
    nativeNames: {
      kannada: 'ಗೃಹಲಕ್ಷ್ಮಿ ಯೋಜನೆ (ಕರ್ನಾಟಕ)',
      hindi: 'गृह लक्ष्मी योजना (कर्नाटक)'
    },
    ministry: 'Women and Child Development Department',
    department: 'Women and Child Development, Government of Karnataka',
    governmentLevel: 'State',
    state: 'Karnataka',
    category: 'Women',
    targetBeneficiary: 'Woman head of household registered in BPL / APL / Antyodaya Ration Card in Karnataka',
    shortDescription: 'Direct financial assistance of ₹2,000 per month deposited into the bank accounts of women heads of households in Karnataka.',
    detailedDescription: 'Guaranteed welfare entitlement by the Government of Karnataka providing ₹2,000 every month via Direct Benefit Transfer (DBT) to the woman designated as the head of the family in the state Food & Civil Supplies ration card database.',
    plainSummary: 'If you are the woman head of your family in Karnataka (listed as head on your BPL/APL ration card), the Karnataka government gives you ₹2,000 every month directly in your bank account.',
    mainBenefit: '₹2,000 / month (₹24,000 / year) Unconditional Cash Support',
    benefitType: 'Direct Cash Transfer',
    fees: 'Free of Cost (₹0)',
    processingTime: '15 to 30 days',
    applicationMode: 'Hybrid',
    eligibilityRules: {
      minAge: 18,
      gender: 'Female',
      states: ['Karnataka'],
      customConditions: [
        'Must be registered as the woman head of household in Karnataka Ration Card (BPL, Antyodaya, or APL)',
        'Neither the woman head nor her husband should be an income tax payer or GST filer',
        'Neither the woman head nor her husband should be a permanent government employee'
      ]
    },
    requiredDocuments: [
      {
        id: 'gruha-doc-ration',
        name: 'Karnataka Ration Card (BPL / APL / Antyodaya Card)',
        whyNeeded: 'Verifies applicant is the official head of household.',
        howToObtain: 'Food & Civil Supplies Department Karnataka.',
        officialLink: 'https://sevasindhugs.karnataka.gov.in',
        isMandatory: true
      },
      {
        id: 'gruha-doc-aadhaar',
        name: 'Aadhaar Card of Woman Head & Husband',
        whyNeeded: 'Biometric deduplication and DBT bank linking.',
        howToObtain: 'UIDAI.',
        isMandatory: true
      }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Visit Seva Sindhu or Grama One Center', description: 'Apply online on https://sevasindhugs.karnataka.gov.in or visit your nearest Grama One, Karnataka One, or Bengaluru One center.', portalUrl: 'https://sevasindhugs.karnataka.gov.in' },
      { stepNumber: 2, title: 'Provide Ration Card Number', description: 'System auto-fetches family details. Confirm woman head name and Aadhaar details.' },
      { stepNumber: 3, title: 'Direct Monthly DBT', description: 'Upon approval, ₹2,000 is transferred monthly directly via Aadhaar-linked NPCI DBT account.' }
    ],
    deadline: 'Rolling (Continuous)',
    openingDate: 'Continuous',
    officialUrl: 'https://sevasindhugs.karnataka.gov.in',
    officialPortal: 'https://sevasindhugs.karnataka.gov.in',
    officialSource: 'Government of Karnataka WCD Notification No. WCD/GL/2023-24',
    sourceDocument: 'Karnataka State Gazette Notification',
    sourceType: 'State Guarantee Scheme',
    sourceLastUpdated: 'September 2026',
    lastVerified: 'September 2026',
    isOfficialSourceVerified: true,
    verificationStatus: 'Verified',
    applicationStatus: 'Open',
    helpline: '1902 (Karnataka Seva Sindhu Toll-Free Helpline)',
    keywords: ['gruha lakshmi', 'karnataka women 2000', 'seva sindhu gruha lakshmi', 'karnataka guarantee', 'ಗೃಹಲಕ್ಷ್ಮಿ'],
    aliases: ['Gruha Lakshmi', 'Karnataka ₹2000 Scheme', 'Seva Sindhu Gruha Lakshmi']
  },
  {
    id: 'kalaignar-magalir-urimai-tn',
    recordId: 'SCH-TN-014',
    recordType: 'SCHEME',
    name: 'Kalaignar Magalir Urimai Thittam (Tamil Nadu)',
    nativeNames: {
      tamil: 'கலைஞர் மகளிர் உரிமைத் திட்டம் (தமிழ்நாடு)',
      hindi: 'कलैग्नार महिला अधिकार योजना (तमिलनाडु)'
    },
    ministry: 'Special Programme Implementation Department',
    department: 'Revenue & Disaster Management Department, Government of Tamil Nadu',
    governmentLevel: 'State',
    state: 'Tamil Nadu',
    category: 'Women',
    targetBeneficiary: 'Women heads of eligible households in Tamil Nadu',
    shortDescription: 'Basic income entitlement of ₹1,000 per month deposited directly into bank accounts of 1.15 Crore women in Tamil Nadu.',
    detailedDescription: 'Historic women\'s basic income scheme recognizing the unpaid domestic and reproductive labor of homemakers in Tamil Nadu. The scheme provides ₹1,000 every month on the 15th to eligible female family heads meeting annual household income criteria under ₹2.5 Lakh.',
    plainSummary: 'If you are a woman living in Tamil Nadu, aged 21 or older, with a family income under ₹2.5 Lakh, the Tamil Nadu government gives you a monthly honorarium of ₹1,000 directly into your bank account on the 15th of every month.',
    mainBenefit: '₹1,000 / month (₹12,000 / year) Direct Bank Transfer',
    benefitType: 'Direct Cash Transfer',
    fees: 'Free of Cost (₹0)',
    processingTime: '15 to 30 days',
    applicationMode: 'Hybrid',
    eligibilityRules: {
      minAge: 21,
      gender: 'Female',
      states: ['Tamil Nadu'],
      maxIncome: 250000,
      customConditions: [
        'Must be a permanent resident of Tamil Nadu with smart family ration card',
        'Annual household income must be below ₹2,50,000',
        'Household electricity consumption must be below 3,600 units per year',
        'Family landholding must be below 5 acres (wetland) or 10 acres (dryland)'
      ]
    },
    requiredDocuments: [
      {
        id: 'km-doc-smartcard',
        name: 'Tamil Nadu Smart Family Card (Ration Card)',
        whyNeeded: 'Verifies family composition and ration shop linkage.',
        howToObtain: 'tnpds.gov.in / Civil Supplies.',
        officialLink: 'https://kmut.tn.gov.in',
        isMandatory: true
      },
      {
        id: 'km-doc-aadhaar',
        name: 'Aadhaar Card of Woman Applicant',
        whyNeeded: 'DBT bank verification.',
        howToObtain: 'UIDAI.',
        isMandatory: true
      },
      {
        id: 'km-doc-eb',
        name: 'TANGEDCO Electricity Consumer Number / Recent Bill',
        whyNeeded: 'Verifies annual power consumption is under 3,600 units.',
        howToObtain: 'Electricity meter card or TANGEDCO portal.',
        isMandatory: true
      }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Submit Form at Special Camps / e-Sevai', description: 'Submit the application at your designated ration shop camp or e-Sevai centre.', portalUrl: 'https://kmut.tn.gov.in' },
      { stepNumber: 2, title: 'Field Verification by Revenue Staff', description: 'Village administrative officers verify economic criteria.' },
      { stepNumber: 3, title: 'SMS Notification & Monthly Credit', description: 'Approved beneficiaries receive SMS confirmation and ₹1,000 deposited on the 15th of each month.' }
    ],
    deadline: 'Rolling grievance & new application windows',
    openingDate: 'Continuous',
    officialUrl: 'https://kmut.tn.gov.in',
    officialPortal: 'https://kmut.tn.gov.in',
    officialSource: 'Government of Tamil Nadu G.O. (Ms) No. 398 Revenue and Disaster Management',
    sourceDocument: 'Tamil Nadu Government Gazette Order',
    sourceType: 'State Basic Income Entitlement',
    sourceLastUpdated: 'September 2026',
    lastVerified: 'September 2026',
    isOfficialSourceVerified: true,
    verificationStatus: 'Verified',
    applicationStatus: 'Open',
    helpline: '044-25619222 / 1100 (CM Helpline)',
    keywords: ['magalir urimai', 'tamil nadu 1000 scheme', 'kalaignar magalir urimai thittam', 'kmut', 'tn women 1000', 'மகளிர் உரிமைத் திட்டம்'],
    aliases: ['Kalaignar Magalir Urimai', 'TN ₹1000 Scheme', 'KMUT']
  },
  {
    id: 'kanya-utthan-bihar',
    recordId: 'SCH-BIH-015',
    recordType: 'SCHEME',
    name: 'Mukhyamantri Kanya Utthan Yojana (Bihar)',
    nativeNames: {
      hindi: 'मुख्यमंत्री कन्या उत्थान योजना (बिहार)'
    },
    ministry: 'Education & Social Welfare Department',
    department: 'Education Department, Government of Bihar',
    governmentLevel: 'State',
    state: 'Bihar',
    category: 'Education',
    targetBeneficiary: 'Girl students passing Class 12 (Intermediate) and Graduation from recognized colleges in Bihar',
    shortDescription: 'Incentive grant of ₹25,000 upon passing Class 12 and ₹50,000 upon passing Graduation for female students in Bihar.',
    detailedDescription: 'Flagship education and female empowerment initiative by the Government of Bihar under the "Saat Nishchay" program. Unmarried girls passing 12th receive ₹25,000, and all female graduates (married or unmarried) receive ₹50,000 directly into their bank accounts to encourage higher education and delay early marriage.',
    plainSummary: 'If you are a female student who completed your 12th Intermediate or Graduation (Degree) in Bihar, the Bihar government deposits ₹25,000 (for 12th pass) and ₹50,000 (for Graduates) directly into your bank account under Medhasoft.',
    mainBenefit: '₹25,000 for Class 12 Pass | ₹50,000 for Graduation Pass (Direct Bank Transfer)',
    benefitType: 'Direct Cash Transfer',
    fees: 'Free of Cost (₹0)',
    processingTime: '30 to 60 days after university roll number verification',
    applicationMode: 'Online',
    eligibilityRules: {
      minAge: 16,
      maxAge: 30,
      gender: 'Female',
      occupations: ['Student'],
      states: ['Bihar'],
      customConditions: [
        'Must be a permanent resident of Bihar',
        'For 12th Incentive: Must have passed Intermediate examination from BSEB (Bihar School Examination Board) and be unmarried at the time of result',
        'For Graduation Incentive: Must have passed Graduation (BA, BSc, BCom, BTech, etc.) from a state university / college recognized in Bihar'
      ]
    },
    requiredDocuments: [
      {
        id: 'bihar-doc-marksheet',
        name: 'Graduation / 12th Marksheet and Registration Card',
        whyNeeded: 'Validates degree completion, roll number, and marks.',
        howToObtain: 'College / University examination branch.',
        officialLink: 'https://medhasoft.bih.nic.in',
        isMandatory: true
      },
      {
        id: 'bihar-doc-aadhaar',
        name: 'Aadhaar Card of Female Student',
        whyNeeded: 'DBT bank verification and resident proof.',
        howToObtain: 'UIDAI.',
        isMandatory: true
      },
      {
        id: 'bihar-doc-bank',
        name: 'Student\'s Own Bank Account Passbook (In Bihar)',
        whyNeeded: 'Bank account must be in applicant\'s own name in a bank branch located in Bihar.',
        howToObtain: 'Any commercial bank or Grameen bank.',
        isMandatory: true
      }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Visit Medhasoft Portal', description: 'Open https://medhasoft.bih.nic.in and click "Mukhyamantri Kanya Utthan Yojana (Snathak / Inter)".', portalUrl: 'https://medhasoft.bih.nic.in' },
      { stepNumber: 2, title: 'Verify University Registration', description: 'Enter University Name, College Roll Number, Registration Number, and Date of Birth.' },
      { stepNumber: 3, title: 'Aadhaar & Bank Account Authentication', description: 'Enter Aadhaar number and bank details for automated PFMS verification.' },
      { stepNumber: 4, title: 'DBT Credit of ₹50,000', description: 'Upon university nodal officer approval, ₹50,000 is credited directly to the student\'s account.' }
    ],
    deadline: 'Application windows announced per graduating batch',
    openingDate: 'Post university exam results',
    officialUrl: 'https://medhasoft.bih.nic.in',
    officialPortal: 'https://medhasoft.bih.nic.in',
    officialSource: 'Education Department, Government of Bihar',
    sourceDocument: 'Bihar Government Saat Nishchay Guidelines',
    sourceType: 'State Direct Grant Scheme',
    sourceLastUpdated: 'September 2026',
    lastVerified: 'September 2026',
    isOfficialSourceVerified: true,
    verificationStatus: 'Verified',
    applicationStatus: 'Open',
    helpline: '0612-2215197 / Medhasoft Helpdesk 9534547098',
    keywords: ['kanya utthan bihar', 'bihar 50000 graduation', 'medhasoft bihar', 'bihar scholarship girl student', 'कन्या उत्थान योजना'],
    aliases: ['Kanya Utthan Bihar', 'Bihar 50000 Scheme', 'Medhasoft Snathak']
  },
  {
    id: 'kanyashree-prakalpa-wb',
    recordId: 'SCH-WB-016',
    recordType: 'SCHEME',
    name: 'Kanyashree Prakalpa (West Bengal)',
    nativeNames: {
      bengali: 'কন্যাশ্রী প্রকল্প (পশ্চিমবঙ্গ)',
      hindi: 'कन्याश्री प्रकल्प (पश्चिम बंगाल)'
    },
    ministry: 'Department of Women and Child Development & Social Welfare',
    department: 'Government of West Bengal',
    governmentLevel: 'State',
    state: 'West Bengal',
    category: 'Education',
    targetBeneficiary: 'Adolescent girls aged 13 to 19 years studying in West Bengal',
    shortDescription: 'United Nations award-winning initiative offering annual scholarship of ₹1,000 (K1) and one-time grant of ₹25,000 (K2) upon turning 18 for female students in West Bengal.',
    detailedDescription: 'Kanyashree Prakalpa aims to improve the status and well-being of adolescent girls in West Bengal by encouraging education and preventing child marriage. Tier K1 provides an annual scholarship of ₹1,000 for girls aged 13-18 in Classes 8-12, while Tier K2 provides a one-time unconditional grant of ₹25,000 upon reaching age 18 while continuing education unmarried.',
    plainSummary: 'If you are a school or college girl in West Bengal, Kanyashree gives you ₹1,000 every year from Class 8 to 12. When you turn 18 and continue studying unmarried, the West Bengal government deposits a one-time grant of ₹25,000 directly into your bank account.',
    mainBenefit: 'Annual ₹1,000 Scholarship (K1) + One-Time ₹25,000 Grant at Age 18 (K2)',
    benefitType: 'Direct Cash Transfer',
    fees: 'Free of Cost (₹0)',
    processingTime: '20 to 30 days via school/institution',
    applicationMode: 'Hybrid',
    eligibilityRules: {
      minAge: 13,
      maxAge: 19,
      gender: 'Female',
      occupations: ['Student'],
      states: ['West Bengal'],
      customConditions: [
        'Must be an unmarried girl student residing in West Bengal',
        'Must be regularly enrolled in an approved school, college, polytechnic, or vocational training institute',
        'For K2: Must have attained 18 years and remain unmarried while continuing education'
      ]
    },
    requiredDocuments: [
      {
        id: 'wb-doc-birth',
        name: 'Birth Certificate Issued by Municipal / Panchayat Registrar',
        whyNeeded: 'Verifies age milestone for K1 and K2 grants.',
        howToObtain: 'Local Registrar of Births.',
        officialLink: 'https://wbkanyashree.gov.in',
        isMandatory: true
      },
      {
        id: 'wb-doc-unmarried',
        name: 'Declaration of Unmarried Status Signed by Parent',
        whyNeeded: 'Ensures compliance with anti-child marriage objective.',
        howToObtain: 'Included in school Kanyashree application form.',
        isMandatory: true
      },
      {
        id: 'wb-doc-bank',
        name: 'Student\'s Own Savings Bank Account Passbook',
        whyNeeded: 'Direct payment to student\'s individual account.',
        howToObtain: 'Any commercial or rural bank.',
        isMandatory: true
      }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Obtain Form from School / College', description: 'Collect official pre-printed K1 or K2 form from your school or college headmaster.' },
      { stepNumber: 2, title: 'Fill & Submit with Enclosures', description: 'Attach birth certificate, bank passbook copy, Aadhaar, and passport photo.' },
      { stepNumber: 3, title: 'Institution Uploads to Kanyashree Portal', description: 'School/college uploads data to https://wbkanyashree.gov.in with institutional verification.' },
      { stepNumber: 4, title: 'Direct Bank Transfer', description: 'District Social Welfare Officer sanctions the grant directly to the student\'s bank account.' }
    ],
    deadline: 'Academic year rolling cycle',
    openingDate: 'Continuous through educational institutions',
    officialUrl: 'https://wbkanyashree.gov.in',
    officialPortal: 'https://wbkanyashree.gov.in',
    officialSource: 'Government of West Bengal WCD Notification No. 34-SW/3S-12/13',
    sourceDocument: 'West Bengal State Gazette & UN Public Service First Prize Citation',
    sourceType: 'State Flagship Initiative',
    sourceLastUpdated: 'September 2026',
    lastVerified: 'September 2026',
    isOfficialSourceVerified: true,
    verificationStatus: 'Verified',
    applicationStatus: 'Open',
    helpline: '1800-102-8014 (Toll-Free Kanyashree Helpline)',
    keywords: ['kanyashree', 'west bengal 25000', 'kanyashree prakalpa', 'k1 k2', 'wb scholarship', 'কন্যাশ্রী'],
    aliases: ['Kanyashree', 'Kanyashree K1 K2', 'West Bengal Girl Grant']
  },
  {
    id: 'delhi-ladli-scheme',
    recordId: 'SCH-DEL-017',
    recordType: 'SCHEME',
    name: 'Delhi Ladli Scheme (Government of NCT of Delhi)',
    nativeNames: {
      hindi: 'दिल्ली लाडली योजना (राष्ट्रीय राजधानी क्षेत्र दिल्ली सरकार)'
    },
    ministry: 'Department of Social Welfare & Women and Child Development',
    department: 'Government of NCT of Delhi',
    governmentLevel: 'Union Territory',
    state: 'Delhi',
    unionTerritory: 'Delhi',
    category: 'Women',
    targetBeneficiary: 'Girl children born in Delhi and studying in recognized schools in Delhi',
    shortDescription: 'Financial assistance milestone deposits up to ₹36,000 for girl children from birth to Class 12 in the National Capital Territory of Delhi.',
    detailedDescription: 'Implemented by the Department of Social Welfare, GNCTD. Financial aid of ₹11,000 is deposited upon hospital birth in Delhi (₹10,000 for home birth), followed by ₹5,000 deposits at Class 1, 6, 9, 10, and 12 milestones in the girl’s name via State Bank of India Life Insurance. The accumulated maturity amount (with interest) is paid directly to the girl upon reaching age 18 and passing Class 10/12.',
    plainSummary: 'If you have a daughter born and studying in Delhi with family income under ₹1 Lakh, the Delhi government deposits money at every major schooling stage (total up to ₹36,000 plus interest) which she receives when turning 18.',
    mainBenefit: 'Up to ₹36,000 Cumulative Milestone Financial Deposits + SBI Maturity Return upon age 18',
    benefitType: 'Direct Cash Transfer',
    fees: 'Free of Cost (₹0)',
    processingTime: '30 to 45 days',
    applicationMode: 'Hybrid',
    eligibilityRules: {
      minAge: 0,
      maxAge: 18,
      gender: 'Female',
      states: ['Delhi'],
      maxIncome: 100000,
      customConditions: [
        'Applicant girl child must be born in Delhi or family must be residing in Delhi for at least 3 years',
        'Annual household income from all sources must NOT exceed ₹1,00,000',
        'Girl child must be admitted to a recognized government or aided school in Delhi',
        'Benefit is limited to two girl children per family'
      ]
    },
    requiredDocuments: [
      {
        id: 'delhi-doc-residence',
        name: 'Proof of 3 Years Residence in Delhi',
        whyNeeded: 'Verifies Delhi residency status.',
        howToObtain: 'Ration card, electricity bill, or voter ID issued at least 3 years prior.',
        officialLink: 'https://edistrict.delhigovt.nic.in',
        isMandatory: true
      },
      {
        id: 'delhi-doc-income',
        name: 'Income Certificate / Self-Attested Income Affidavit (Under ₹1 Lakh)',
        whyNeeded: 'Validates economic tier.',
        howToObtain: 'Revenue Department / SDM Office / e-District Delhi.',
        isMandatory: true
      },
      {
        id: 'delhi-doc-birth',
        name: 'Birth Certificate of Girl Child Issued by MCD / NDMC',
        whyNeeded: 'Proof of birth in Delhi.',
        howToObtain: 'MCD / NDMC Civil Registration portal.',
        isMandatory: true
      }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Apply on Delhi e-District', description: 'Log in to https://edistrict.delhigovt.nic.in and select "Delhi Ladli Scheme".', portalUrl: 'https://edistrict.delhigovt.nic.in' },
      { stepNumber: 2, title: 'Submit Through School / Anganwadi', description: 'For school stages (Class 1, 6, 9, 10, 12), applications are endorsed and submitted through school principals.' },
      { stepNumber: 3, title: 'Deposit in SBI Life Fund', description: 'Government deposits amount into SBI Life Insurance fund under the child\'s registration number.' },
      { stepNumber: 4, title: 'Maturity Claim at 18', description: 'Upon turning 18 and passing 10th/12th, girl submits claim form to receive full matured sum.' }
    ],
    deadline: 'Submit within 1 year of birth or school admission milestone',
    openingDate: 'Continuous',
    officialUrl: 'https://edistrict.delhigovt.nic.in',
    officialPortal: 'https://wcd.delhi.gov.in',
    officialSource: 'Department of Women and Child Development, Government of NCT of Delhi',
    sourceDocument: 'Delhi Ladli Scheme Act & Executive Notification',
    sourceType: 'Union Territory Welfare Scheme',
    sourceLastUpdated: 'September 2026',
    lastVerified: 'September 2026',
    isOfficialSourceVerified: true,
    verificationStatus: 'Verified',
    applicationStatus: 'Open',
    helpline: '011-23381898 / 1031 (Delhi Govt Helpline)',
    keywords: ['delhi ladli', 'ladli scheme delhi', 'edistrict delhi ladli', 'delhi girl child scheme', 'दिल्ली लाडली'],
    aliases: ['Delhi Ladli', 'Ladli Scheme', 'Delhi Girl Child Scheme']
  },
  {
    id: 'jk-golden-health-card',
    recordId: 'SCH-JK-018',
    recordType: 'SCHEME',
    name: 'Ayushman Bharat PM-JAY SEHAT (Jammu & Kashmir Golden Health Card)',
    nativeNames: {
      hindi: 'आयुष्मान भारत पीएम-जय सेहत (जम्मू और कश्मीर गोल्डन हेल्थ कार्ड)',
      urdu: 'جموں و کشمیر گولڈن ہیلتھ کارڈ'
    },
    ministry: 'State Health Agency & National Health Authority',
    department: 'Health and Medical Education Department, Government of J&K',
    governmentLevel: 'Union Territory',
    state: 'Jammu and Kashmir',
    unionTerritory: 'Jammu and Kashmir',
    category: 'Healthcare',
    targetBeneficiary: 'All residents of Jammu and Kashmir without any income or employment restrictions',
    shortDescription: 'Universal 100% free cashless hospitalization assurance up to ₹5 Lakh per family per year for all residents of Jammu and Kashmir.',
    detailedDescription: 'Under the AB PM-JAY SEHAT scheme, the Union Territory of Jammu & Kashmir provides universal health insurance cover to all residents regardless of income, caste, or occupational status. Every family receives a Golden Card offering up to ₹5,00,000 per year for surgeries, treatments, and intensive care across all empaneled government and private hospitals in India.',
    plainSummary: 'Every resident of Jammu & Kashmir is entitled to a free Golden Health Card. It provides ₹5 Lakh per year completely free, cashless medical treatment for your entire family across thousands of top hospitals in J&K and across all of India.',
    mainBenefit: 'Universal ₹5,00,000 / year Cashless Hospitalization Coverage for ALL J&K Citizens',
    benefitType: 'Insurance',
    fees: 'Free of Cost (₹0 - Issued completely free)',
    processingTime: 'Instant on Aadhaar e-KYC verification',
    applicationMode: 'Hybrid',
    eligibilityRules: {
      minAge: 0,
      states: ['Jammu and Kashmir'],
      customConditions: [
        'Must be a permanent resident / domicile of the Union Territory of Jammu and Kashmir',
        'Universal coverage: No income ceiling, no ration card classification required'
      ]
    },
    requiredDocuments: [
      {
        id: 'jk-doc-aadhaar',
        name: 'Aadhaar Card of All Family Members',
        whyNeeded: 'Individual biometric identification and ABHA generation.',
        howToObtain: 'UIDAI.',
        officialLink: 'https://beneficiary.nha.gov.in',
        isMandatory: true
      },
      {
        id: 'jk-doc-ration',
        name: 'Ration Card / Family Register Proof',
        whyNeeded: 'Establishes family unit for linking members under one ₹5 Lakh entitlement.',
        howToObtain: 'Food, Civil Supplies and Consumer Affairs Department J&K.',
        isMandatory: true
      }
    ],
    applicationSteps: [
      { stepNumber: 1, title: 'Visit Nearest Hospital / CSC Center', description: 'Visit any government hospital, Ayushman Mitra helpdesk, or Common Service Center (CSC) in J&K.' },
      { stepNumber: 2, title: 'Provide Aadhaar & Ration Card', description: 'Operator searches your family record on the unified PM-JAY portal.' },
      { stepNumber: 3, title: 'Biometric Authentication', description: 'Authenticate using finger or iris scan.' },
      { stepNumber: 4, title: 'Instant Golden Card Printout', description: 'Receive your laminated Golden Health Card with QR code and take home immediately.' }
    ],
    deadline: 'Rolling (Universal coverage open all year)',
    openingDate: 'Continuous',
    officialUrl: 'https://beneficiary.nha.gov.in',
    officialPortal: 'https://sha.jk.gov.in',
    officialSource: 'State Health Agency, Health & Medical Education Dept, Government of Jammu and Kashmir',
    sourceDocument: 'AB PM-JAY SEHAT Operational Guidelines & Cabinet Decision',
    sourceType: 'Union Territory Universal Health Entitlement',
    sourceLastUpdated: 'September 2026',
    lastVerified: 'September 2026',
    isOfficialSourceVerified: true,
    verificationStatus: 'Verified',
    applicationStatus: 'Rolling',
    helpline: '14555 (Toll-Free National) / 1800-233-5555 (J&K SHA Helpdesk)',
    keywords: ['golden card', 'jk golden card', 'ayushman bharat sehat', 'jammu kashmir 5 lakh health', 'sehat card', 'گولڈن کارڈ'],
    aliases: ['Golden Health Card', 'SEHAT Card', 'J&K Ayushman Card', 'PM-JAY SEHAT']
  }
];
