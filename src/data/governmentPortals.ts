import { GovernmentPortal, PortalSchemeMapping } from '../types';

export const GOVERNMENT_PORTALS: GovernmentPortal[] = [
  // ----------------------------------------------------
  // TELANGANA STATE PORTALS
  // ----------------------------------------------------
  {
    portal_id: 'telangana-epass',
    portal_name: 'Telangana ePASS (Electronic Payment and Application System of Scholarships)',
    portal_type: 'SCHOLARSHIP_PORTAL',
    government_level: 'STATE',
    state: 'Telangana',
    department: 'Centre for Good Governance (CGG) & Welfare Departments, Govt. of Telangana',
    official_url: 'https://telanganaepass.cgg.gov.in/',
    official_source: 'https://telanganaepass.cgg.gov.in/',
    description: 'The official digital service portal of Government of Telangana for processing Post-Matric scholarships (PMS), Pre-Matric scholarships, Overseas Vidya Nidhi scholarships, Corporate Skill training, and marriage incentives for SC, ST, BC, EBC, Minority, and PwD citizens.',
    aliases: [
      'ePASS',
      'EPASS',
      'e-pass',
      'e pass',
      'E Pass',
      'epass',
      'Telangana ePASS',
      'Telangana EPASS',
      'ePASS scholarship',
      'e pass scholarship',
      'epass scholarship',
      'Telangana scholarship portal',
      'Telangana scholarship',
      'scholarship for Telangana students',
      'epass.cgg.gov.in',
      'telanganaepass',
      'telangana epass scholarship',
      'telangana fees reimbursement'
    ],
    status: 'ACTIVE',
    last_verified: '10/09/2026',
    programs_hosted: [
      'telangana-epass-post-matric',
      'telangana-epass-pre-matric',
      'telangana-epass-mjpov-overseas',
      'telangana-epass-ambedkar-overseas',
      'telangana-epass-cm-minority-overseas',
      'telangana-epass-skill-upgradation',
      'kalyana-lakshmi-shaadi-mubarak'
    ]
  },
  {
    portal_id: 'meeseva-telangana',
    portal_name: 'MeeSeva Telangana Portal',
    portal_type: 'CITIZEN_SERVICES',
    government_level: 'STATE',
    state: 'Telangana',
    department: 'Information Technology, Electronics & Communications (ITE&C) Dept, Telangana',
    official_url: 'https://ts.meeseva.telangana.gov.in/',
    official_source: 'https://ts.meeseva.telangana.gov.in/',
    description: 'Unified online citizen services portal offering statutory certificates including Income, Caste, Residence, Birth/Death, and land records.',
    aliases: [
      'MeeSeva',
      'meeseva',
      'Mee Seva',
      'Meeseva Telangana',
      'ts meeseva',
      'meeseva.telangana.gov.in'
    ],
    status: 'ACTIVE',
    last_verified: '10/09/2026',
    programs_hosted: [
      'caste-certificate-service',
      'income-certificate-service',
      'birth-death-certificate'
    ]
  },
  {
    portal_id: 'telangana-rythu-bharosa-portal',
    portal_name: 'Rythu Bharosa / Rythu Bandhu Portal Telangana',
    portal_type: 'FARMER_PORTAL',
    government_level: 'STATE',
    state: 'Telangana',
    department: 'Department of Agriculture & Farmers Welfare, Telangana',
    official_url: 'https://rythubharosa.telangana.gov.in/',
    official_source: 'https://rythubharosa.telangana.gov.in/',
    description: 'Official direct investment support and crop assistance portal for Telangana farmers.',
    aliases: [
      'Rythu Bharosa',
      'Rythu Bandhu',
      'rythu bharosa portal',
      'rythu bandhu portal',
      'telangana farmer portal'
    ],
    status: 'ACTIVE',
    last_verified: '10/09/2026',
    programs_hosted: [
      'rythu-bharosa-telangana',
      'telangana-crop-loan-waiver'
    ]
  },

  // ----------------------------------------------------
  // ANDHRA PRADESH STATE PORTALS
  // ----------------------------------------------------
  {
    portal_id: 'ap-jnanabhumi',
    portal_name: 'Jnanabhumi AP Portal',
    portal_type: 'SCHOLARSHIP_PORTAL',
    government_level: 'STATE',
    state: 'Andhra Pradesh',
    department: 'Social Welfare & Higher Education Department, Andhra Pradesh',
    official_url: 'https://jnanabhumi.ap.gov.in/',
    official_source: 'https://jnanabhumi.ap.gov.in/',
    description: 'Official scholarship and education management portal of Andhra Pradesh powering Jagananna Vidya Deevena and Vasathi Deevena.',
    aliases: [
      'Jnanabhumi',
      'jnanabhumi',
      'Jnanabhumi portal',
      'AP ePASS',
      'AP scholarship portal',
      'jnanabhumi.ap.gov.in',
      'Jnanabhumi AP'
    ],
    status: 'ACTIVE',
    last_verified: '10/09/2026',
    programs_hosted: [
      'ap-jnanabhumi-vidya-deevena',
      'ap-jnanabhumi-vasathi-deevena'
    ]
  },
  {
    portal_id: 'ap-meeseva',
    portal_name: 'MeeSeva Andhra Pradesh',
    portal_type: 'CITIZEN_SERVICES',
    government_level: 'STATE',
    state: 'Andhra Pradesh',
    department: 'Real Time Governance Society (RTGS), Andhra Pradesh',
    official_url: 'https://ap.meeseva.gov.in/',
    official_source: 'https://ap.meeseva.gov.in/',
    description: 'Front-end citizen service delivery portal for revenue, municipal, and welfare certificates across Andhra Pradesh.',
    aliases: ['AP MeeSeva', 'MeeSeva AP', 'meeseva andhra'],
    status: 'ACTIVE',
    last_verified: '10/09/2026'
  },

  // ----------------------------------------------------
  // KARNATAKA STATE PORTALS
  // ----------------------------------------------------
  {
    portal_id: 'karnataka-ssp',
    portal_name: 'Karnataka State Scholarship Portal (SSP)',
    portal_type: 'SCHOLARSHIP_PORTAL',
    government_level: 'STATE',
    state: 'Karnataka',
    department: 'Centre for e-Governance & Social Welfare, Govt. of Karnataka',
    official_url: 'https://ssp.postmatric.karnataka.gov.in/',
    official_source: 'https://ssp.postmatric.karnataka.gov.in/',
    description: 'Karnataka’s unified State Scholarship Portal covering Post-Matric, Pre-Matric, Vidyasiri, and fee reimbursement schemes.',
    aliases: [
      'SSP',
      'SSP Karnataka',
      'ssp',
      'State Scholarship Portal',
      'SSP scholarship',
      'Karnataka SSP',
      'ssp.postmatric.karnataka.gov.in',
      'Karnataka scholarship portal'
    ],
    status: 'ACTIVE',
    last_verified: '10/09/2026',
    programs_hosted: ['karnataka-ssp-post-matric']
  },
  {
    portal_id: 'karnataka-sevasindhu',
    portal_name: 'Seva Sindhu Karnataka',
    portal_type: 'CITIZEN_SERVICES',
    government_level: 'STATE',
    state: 'Karnataka',
    department: 'Department of Personnel and Administrative Reforms (e-Governance), Karnataka',
    official_url: 'https://sevasindhu.karnataka.gov.in/',
    official_source: 'https://sevasindhu.karnataka.gov.in/',
    description: 'Integrated citizen service portal hosting Gruha Lakshmi, Gruha Jyothi, Yuva Nidhi, and over 800 government G2C services.',
    aliases: ['Seva Sindhu', 'sevasindhu', 'Seva Sindhu portal', 'Karnataka citizen services'],
    status: 'ACTIVE',
    last_verified: '10/09/2026',
    programs_hosted: ['gruha-lakshmi-karnataka']
  },

  // ----------------------------------------------------
  // MAHARASHTRA STATE PORTALS
  // ----------------------------------------------------
  {
    portal_id: 'mahadbt',
    portal_name: 'MahaDBT (Aaple Sarkar DBT)',
    portal_type: 'SCHOLARSHIP_PORTAL',
    government_level: 'STATE',
    state: 'Maharashtra',
    department: 'Directorate of Information Technology, Govt. of Maharashtra',
    official_url: 'https://mahadbt.maharashtra.gov.in/',
    official_source: 'https://mahadbt.maharashtra.gov.in/',
    description: 'Direct Benefit Transfer and scholarship portal of Maharashtra delivering education concessions, hostel stipends, and farmer subsidies.',
    aliases: [
      'MahaDBT',
      'mahadbt',
      'Maha DBT',
      'Aaple Sarkar DBT',
      'mahadbt.maharashtra.gov.in',
      'Maharashtra scholarship portal'
    ],
    status: 'ACTIVE',
    last_verified: '10/09/2026',
    programs_hosted: [
      'maharashtra-mahadbt-rajarshi-shahu',
      'majhi-ladki-bahin-maharashtra'
    ]
  },

  // ----------------------------------------------------
  // WEST BENGAL STATE PORTALS
  // ----------------------------------------------------
  {
    portal_id: 'wb-oasis',
    portal_name: 'West Bengal OASIS Scholarship Portal',
    portal_type: 'SCHOLARSHIP_PORTAL',
    government_level: 'STATE',
    state: 'West Bengal',
    department: 'Backward Classes Welfare & Tribal Development Dept, West Bengal',
    official_url: 'https://oasis.gov.in/',
    official_source: 'https://oasis.gov.in/',
    description: 'Online Application for Scholarships In Studies (OASIS) portal for SC, ST, and OBC students in West Bengal.',
    aliases: [
      'OASIS',
      'oasis',
      'Oasis portal',
      'WB Oasis',
      'oasis.gov.in',
      'West Bengal scholarship portal'
    ],
    status: 'ACTIVE',
    last_verified: '10/09/2026',
    programs_hosted: ['wb-oasis-post-matric', 'kanyashree-prakalpa-wb']
  },

  // ----------------------------------------------------
  // KERALA STATE PORTALS
  // ----------------------------------------------------
  {
    portal_id: 'kerala-dce',
    portal_name: 'Kerala DCE Scholarship Portal',
    portal_type: 'SCHOLARSHIP_PORTAL',
    government_level: 'STATE',
    state: 'Kerala',
    department: 'Directorate of Collegiate Education (DCE), Govt. of Kerala',
    official_url: 'https://dcescholarship.kerala.gov.in/',
    official_source: 'https://dcescholarship.kerala.gov.in/',
    description: 'State scholarship management system offering collegiate merit and BPL scholarships for students in Kerala.',
    aliases: [
      'DCE Kerala',
      'dcescholarship',
      'Kerala scholarship portal',
      'dcescholarship.kerala.gov.in'
    ],
    status: 'ACTIVE',
    last_verified: '10/09/2026',
    programs_hosted: ['kerala-dce-suvarna-jubilee']
  },

  // ----------------------------------------------------
  // TAMIL NADU STATE PORTALS
  // ----------------------------------------------------
  {
    portal_id: 'tn-scholarships',
    portal_name: 'Tamil Nadu e-District / e-Scholarship Portal',
    portal_type: 'SCHOLARSHIP_PORTAL',
    government_level: 'STATE',
    state: 'Tamil Nadu',
    department: 'Adi Dravidar and Tribal Welfare & BC/MBC Welfare Departments, Tamil Nadu',
    official_url: 'https://escholarship.tn.gov.in/',
    official_source: 'https://escholarship.tn.gov.in/',
    description: 'Tamil Nadu official portal for Post-Matric scholarships and Pudhumai Penn monthly financial support.',
    aliases: [
      'TN ePass',
      'TN scholarship',
      'escholarship.tn.gov.in',
      'Tamil Nadu scholarship portal',
      'TN e-District'
    ],
    status: 'ACTIVE',
    last_verified: '10/09/2026',
    programs_hosted: ['tamil-nadu-pudhumai-penn-scheme', 'kalaignar-magalir-urimai-tn']
  },

  // ----------------------------------------------------
  // UTTAR PRADESH STATE PORTALS
  // ----------------------------------------------------
  {
    portal_id: 'up-scholarship-portal',
    portal_name: 'Uttar Pradesh Scholarship & Fee Reimbursement Portal',
    portal_type: 'SCHOLARSHIP_PORTAL',
    government_level: 'STATE',
    state: 'Uttar Pradesh',
    department: 'Social Welfare & Backward Classes Welfare Department, Uttar Pradesh',
    official_url: 'https://scholarship.up.gov.in/',
    official_source: 'https://scholarship.up.gov.in/',
    description: 'UP government portal managing Pre-Matric, Post-Matric, and Dashmottar fee reimbursement.',
    aliases: ['UP Scholarship', 'scholarship.up.gov.in', 'UP Dashmottar', 'UP scholarship portal'],
    status: 'ACTIVE',
    last_verified: '10/09/2026'
  },

  // ----------------------------------------------------
  // BIHAR STATE PORTALS
  // ----------------------------------------------------
  {
    portal_id: 'bihar-pms-portal',
    portal_name: 'Bihar Post Matric Scholarship Portal (PMS Online)',
    portal_type: 'SCHOLARSHIP_PORTAL',
    government_level: 'STATE',
    state: 'Bihar',
    department: 'Education Department, Govt. of Bihar',
    official_url: 'https://pmsonline.bih.nic.in/',
    official_source: 'https://pmsonline.bih.nic.in/',
    description: 'Official Bihar Post-Matric scholarship portal for SC, ST, BC, and EBC students.',
    aliases: ['Bihar PMS', 'pmsonline', 'Bihar scholarship', 'Medhasoft Bihar'],
    status: 'ACTIVE',
    last_verified: '10/09/2026',
    programs_hosted: ['kanya-utthan-bihar']
  },

  // ----------------------------------------------------
  // GUJARAT STATE PORTALS
  // ----------------------------------------------------
  {
    portal_id: 'digital-gujarat',
    portal_name: 'Digital Gujarat Portal',
    portal_type: 'SCHOLARSHIP_PORTAL',
    government_level: 'STATE',
    state: 'Gujarat',
    department: 'Department of Social Justice and Empowerment, Gujarat',
    official_url: 'https://www.digitalgujarat.gov.in/',
    official_source: 'https://www.digitalgujarat.gov.in/',
    description: 'Unified citizen portal providing scholarships, welfare schemes, and citizen certificates in Gujarat.',
    aliases: ['Digital Gujarat', 'digitalgujarat', 'Gujarat scholarship portal', 'MYSY Gujarat'],
    status: 'ACTIVE',
    last_verified: '10/09/2026'
  },

  // ----------------------------------------------------
  // ODISHA STATE PORTALS
  // ----------------------------------------------------
  {
    portal_id: 'odisha-state-scholarship',
    portal_name: 'State Scholarship Portal Odisha (PRERANA)',
    portal_type: 'SCHOLARSHIP_PORTAL',
    government_level: 'STATE',
    state: 'Odisha',
    department: 'Higher Education Department & ST&SC Development, Odisha',
    official_url: 'https://scholarship.odisha.gov.in/',
    official_source: 'https://scholarship.odisha.gov.in/',
    description: 'Odisha’s single integrated platform providing 20+ department scholarships including PRERANA and e-Medhabruti.',
    aliases: ['PRERANA', 'Odisha scholarship', 'Odisha scholarship portal', 'scholarship.odisha.gov.in'],
    status: 'ACTIVE',
    last_verified: '10/09/2026'
  },

  // ----------------------------------------------------
  // CENTRAL GOVERNMENT NATIONAL PORTALS
  // ----------------------------------------------------
  {
    portal_id: 'national-scholarship-portal',
    portal_name: 'National Scholarship Portal (NSP)',
    portal_type: 'SCHOLARSHIP_PORTAL',
    government_level: 'CENTRAL',
    state: 'All-India',
    department: 'Ministry of Electronics & Information Technology (MeitY) / Ministry of Education',
    official_url: 'https://scholarships.gov.in/',
    official_source: 'https://scholarships.gov.in/',
    description: 'The Government of India’s flagship national platform for central sector, minority, disabled, UGC, and AICTE scholarships.',
    aliases: [
      'NSP',
      'nsp',
      'National Scholarship Portal',
      'NSP portal',
      'scholarships.gov.in',
      'National Scholarship',
      'central scholarship portal'
    ],
    status: 'ACTIVE',
    last_verified: '10/09/2026',
    programs_hosted: ['central-nsp-csss-scholarship', 'post-matric-scholarship']
  },
  {
    portal_id: 'myscheme-portal',
    portal_name: 'myScheme India Portal',
    portal_type: 'GENERAL_GOVERNMENT_PORTAL',
    government_level: 'CENTRAL',
    state: 'All-India',
    department: 'National e-Governance Division (NeGD) & Ministry of Electronics & IT (MeitY)',
    official_url: 'https://www.myscheme.gov.in/',
    official_source: 'https://www.myscheme.gov.in/',
    description: 'National e-governance service discovery platform consolidating over 1,500 Central and State government welfare schemes.',
    aliases: [
      'myScheme',
      'myscheme',
      'my scheme',
      'myscheme.gov.in',
      'national scheme portal',
      'government schemes portal'
    ],
    status: 'ACTIVE',
    last_verified: '10/09/2026'
  },
  {
    portal_id: 'pm-kisan-portal',
    portal_name: 'PM-KISAN Samman Nidhi Portal',
    portal_type: 'FARMER_PORTAL',
    government_level: 'CENTRAL',
    state: 'All-India',
    department: 'Ministry of Agriculture and Farmers Welfare, Govt. of India',
    official_url: 'https://pmkisan.gov.in/',
    official_source: 'https://pmkisan.gov.in/',
    description: 'Central portal managing the direct ₹6,000/year income support to landholding farmer families across India.',
    aliases: ['PM Kisan', 'pmkisan', 'PM-KISAN', 'PM Kisan Portal', 'pmkisan.gov.in'],
    status: 'ACTIVE',
    last_verified: '10/09/2026',
    programs_hosted: ['pm-kisan-samman-nidhi']
  },
  {
    portal_id: 'pmjay-portal',
    portal_name: 'Ayushman Bharat PM-JAY / BIS Portal',
    portal_type: 'HEALTH_PORTAL',
    government_level: 'CENTRAL',
    state: 'All-India',
    department: 'National Health Authority (NHA), Ministry of Health & Family Welfare',
    official_url: 'https://pmjay.gov.in/',
    official_source: 'https://pmjay.gov.in/',
    description: 'National Health Authority portal for Ayushman card generation, hospital empanelment, and ₹5 Lakh cashless health cover.',
    aliases: ['PMJAY', 'pmjay', 'Ayushman Portal', 'Ayushman Card portal', 'NHA', 'setu.pmjay.gov.in'],
    status: 'ACTIVE',
    last_verified: '10/09/2026',
    programs_hosted: ['ayushman-bharat']
  },
  {
    portal_id: 'pmayg-portal',
    portal_name: 'PMAY-G AwaasSoft Portal',
    portal_type: 'HOUSING_PORTAL',
    government_level: 'CENTRAL',
    state: 'All-India',
    department: 'Ministry of Rural Development, Govt. of India',
    official_url: 'https://pmayg.nic.in/',
    official_source: 'https://pmayg.nic.in/',
    description: 'Rural housing assistance portal managing pucca house construction subsidies and geotagged verification.',
    aliases: ['PMAY', 'pmay', 'PMAY-G', 'AwaasSoft', 'pmayg.nic.in'],
    status: 'ACTIVE',
    last_verified: '10/09/2026',
    programs_hosted: ['pm-awas-yojana']
  },
  {
    portal_id: 'sarathi-parivahan',
    portal_name: 'Sarathi Parivahan Portal',
    portal_type: 'CITIZEN_SERVICES',
    government_level: 'CENTRAL',
    state: 'All-India',
    department: 'Ministry of Road Transport and Highways (MoRTH)',
    official_url: 'https://sarathi.parivahan.gov.in/',
    official_source: 'https://sarathi.parivahan.gov.in/',
    description: 'Central portal for smart card Driving Licences, Learner Licences, and motor vehicle driving services across all states.',
    aliases: ['Parivahan', 'sarathi', 'Sarathi Parivahan', 'driving licence portal', 'sarathi.parivahan.gov.in'],
    status: 'ACTIVE',
    last_verified: '10/09/2026',
    programs_hosted: ['driving-licence-service']
  },
  {
    portal_id: 'nvsp-eci',
    portal_name: 'ECI Voters’ Services Portal',
    portal_type: 'CITIZEN_SERVICES',
    government_level: 'CENTRAL',
    state: 'All-India',
    department: 'Election Commission of India (ECI)',
    official_url: 'https://voters.eci.gov.in/',
    official_source: 'https://voters.eci.gov.in/',
    description: 'Official Election Commission of India portal for new voter card registration (Form 6), corrections, and digital e-EPIC download.',
    aliases: ['NVSP', 'Voter Portal', 'voters.eci.gov.in', 'voter id portal', 'election card portal'],
    status: 'ACTIVE',
    last_verified: '10/09/2026',
    programs_hosted: ['voter-id-card']
  },
  {
    portal_id: 'udyam-portal',
    portal_name: 'Udyam Registration Portal',
    portal_type: 'BUSINESS_PORTAL',
    government_level: 'CENTRAL',
    state: 'All-India',
    department: 'Ministry of Micro, Small and Medium Enterprises (MSME)',
    official_url: 'https://udyamregistration.gov.in/',
    official_source: 'https://udyamregistration.gov.in/',
    description: 'Zero-cost, paperless official MSME registration portal unlocking collateral-free bank loans and government subsidies.',
    aliases: ['Udyam', 'udyam', 'MSME registration portal', 'udyamregistration.gov.in', 'Udyog Aadhaar'],
    status: 'ACTIVE',
    last_verified: '10/09/2026',
    programs_hosted: ['udyam-msme-registration', 'mudra-yojana', 'pm-vishwakarma']
  },
  {
    portal_id: 'swavlamban-udid',
    portal_name: 'Swavlamban UDID Portal',
    portal_type: 'WELFARE_PORTAL',
    government_level: 'CENTRAL',
    state: 'All-India',
    department: 'Department of Empowerment of Persons with Disabilities (DEPwD)',
    official_url: 'https://www.swavlambancard.gov.in/',
    official_source: 'https://www.swavlambancard.gov.in/',
    description: 'Unique Disability ID (UDID) national portal for issuing uniform disability identity cards and concession certificates.',
    aliases: ['UDID', 'udid', 'Swavlamban', 'swavlambancard.gov.in', 'disability card portal'],
    status: 'ACTIVE',
    last_verified: '10/09/2026',
    programs_hosted: ['udid-disability-certificate', 'divyangjan-swavalamban']
  }
];

export const PORTAL_SCHEME_MAPPINGS: PortalSchemeMapping[] = [
  // Telangana ePASS mappings
  {
    portal_id: 'telangana-epass',
    scheme_id: 'telangana-epass-post-matric',
    relationship_type: 'HOSTS',
    official_source: 'https://telanganaepass.cgg.gov.in/',
    last_verified: '10/09/2026'
  },
  {
    portal_id: 'telangana-epass',
    scheme_id: 'telangana-epass-pre-matric',
    relationship_type: 'HOSTS',
    official_source: 'https://telanganaepass.cgg.gov.in/',
    last_verified: '10/09/2026'
  },
  {
    portal_id: 'telangana-epass',
    scheme_id: 'telangana-epass-mjpov-overseas',
    relationship_type: 'HOSTS',
    official_source: 'https://telanganaepass.cgg.gov.in/',
    last_verified: '10/09/2026'
  },
  {
    portal_id: 'telangana-epass',
    scheme_id: 'telangana-epass-ambedkar-overseas',
    relationship_type: 'HOSTS',
    official_source: 'https://telanganaepass.cgg.gov.in/',
    last_verified: '10/09/2026'
  },
  {
    portal_id: 'telangana-epass',
    scheme_id: 'telangana-epass-cm-minority-overseas',
    relationship_type: 'HOSTS',
    official_source: 'https://telanganaepass.cgg.gov.in/',
    last_verified: '10/09/2026'
  },
  {
    portal_id: 'telangana-epass',
    scheme_id: 'telangana-epass-skill-upgradation',
    relationship_type: 'HOSTS',
    official_source: 'https://telanganaepass.cgg.gov.in/',
    last_verified: '10/09/2026'
  },
  {
    portal_id: 'telangana-epass',
    scheme_id: 'kalyana-lakshmi-shaadi-mubarak',
    relationship_type: 'MANAGES',
    official_source: 'https://telanganaepass.cgg.gov.in/',
    last_verified: '10/09/2026'
  },

  // AP Jnanabhumi mappings
  {
    portal_id: 'ap-jnanabhumi',
    scheme_id: 'ap-jnanabhumi-vidya-deevena',
    relationship_type: 'HOSTS',
    official_source: 'https://jnanabhumi.ap.gov.in/',
    last_verified: '10/09/2026'
  },
  {
    portal_id: 'ap-jnanabhumi',
    scheme_id: 'ap-jnanabhumi-vasathi-deevena',
    relationship_type: 'HOSTS',
    official_source: 'https://jnanabhumi.ap.gov.in/',
    last_verified: '10/09/2026'
  },

  // Karnataka SSP mappings
  {
    portal_id: 'karnataka-ssp',
    scheme_id: 'karnataka-ssp-post-matric',
    relationship_type: 'HOSTS',
    official_source: 'https://ssp.postmatric.karnataka.gov.in/',
    last_verified: '10/09/2026'
  },

  // Maharashtra MahaDBT mappings
  {
    portal_id: 'mahadbt',
    scheme_id: 'maharashtra-mahadbt-rajarshi-shahu',
    relationship_type: 'HOSTS',
    official_source: 'https://mahadbt.maharashtra.gov.in/',
    last_verified: '10/09/2026'
  },
  {
    portal_id: 'mahadbt',
    scheme_id: 'majhi-ladki-bahin-maharashtra',
    relationship_type: 'PROVIDES_APPLICATION_FOR',
    official_source: 'https://mahadbt.maharashtra.gov.in/',
    last_verified: '10/09/2026'
  },

  // West Bengal OASIS mappings
  {
    portal_id: 'wb-oasis',
    scheme_id: 'wb-oasis-post-matric',
    relationship_type: 'HOSTS',
    official_source: 'https://oasis.gov.in/',
    last_verified: '10/09/2026'
  },

  // Kerala DCE mappings
  {
    portal_id: 'kerala-dce',
    scheme_id: 'kerala-dce-suvarna-jubilee',
    relationship_type: 'HOSTS',
    official_source: 'https://dcescholarship.kerala.gov.in/',
    last_verified: '10/09/2026'
  },

  // Tamil Nadu mappings
  {
    portal_id: 'tn-scholarships',
    scheme_id: 'tamil-nadu-pudhumai-penn-scheme',
    relationship_type: 'HOSTS',
    official_source: 'https://escholarship.tn.gov.in/',
    last_verified: '10/09/2026'
  },

  // Central NSP mappings
  {
    portal_id: 'national-scholarship-portal',
    scheme_id: 'central-nsp-csss-scholarship',
    relationship_type: 'HOSTS',
    official_source: 'https://scholarships.gov.in/',
    last_verified: '10/09/2026'
  },
  {
    portal_id: 'national-scholarship-portal',
    scheme_id: 'post-matric-scholarship',
    relationship_type: 'HOSTS',
    official_source: 'https://scholarships.gov.in/',
    last_verified: '10/09/2026'
  }
];
