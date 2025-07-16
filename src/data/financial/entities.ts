import { FinancialEntity, Address, SuspiciousActivityFlag } from '@/types/investigation';

// Comprehensive Financial Entities Database
export const financialEntities: FinancialEntity[] = [
  // Jeffrey Epstein's Primary Entities
  {
    id: 'entity_epstein_individual',
    name: 'Jeffrey Edward Epstein',
    type: 'individual',
    registrationCountry: 'United States',
    registrationState: 'New York',
    parentCompany: undefined,
    subsidiaries: ['entity_j_epstein_co', 'entity_zorro_trust', 'entity_gratitude_america'],
    controllers: [],
    legalStructure: 'sole_proprietorship',
    taxHaven: false,
    publiclyTraded: false,
    industry: 'Investment Management',
    description: 'Convicted financier and sex offender who managed funds for ultra-wealthy clients through various entities.',
    establishedDate: '1976-01-01',
    dissolutionDate: '2019-08-10',
    currentStatus: 'dissolved',
    addresses: [
      {
        id: 'addr_epstein_manhattan',
        type: 'residential',
        streetAddress: '9 East 71st Street',
        city: 'New York',
        state: 'NY',
        postalCode: '10021',
        country: 'United States',
        coordinates: { lat: 40.7714, lng: -73.9658 },
        dateFrom: '1996-01-01',
        dateTo: '2019-08-10',
        current: false
      }
    ],
    relatedPersons: ['wexner_les', 'maxwell_ghislaine'],
    suspiciousActivity: [
      {
        id: 'sa_epstein_large_cash',
        type: 'large_cash_transaction',
        severity: 'critical',
        description: 'Multiple large cash transactions without clear business purpose',
        automaticFlag: true,
        status: 'confirmed_suspicious'
      }
    ],
    sources: [
      {
        id: 'src_epstein_financials_001',
        title: 'Jeffrey Epstein Financial Records Analysis',
        type: 'government_document',
        author: 'FBI Financial Crimes Division',
        publication: 'Federal Investigation Records',
        publicationDate: '2019-08-15',
        reliability: 'high',
        description: 'FBI analysis of Epstein financial empire',
        tags: ['fbi', 'financial-analysis', 'investigation']
      }
    ],
    tags: ['epstein', 'individual', 'deceased', 'convicted'],
    lastUpdated: '2024-01-15'
  },

  {
    id: 'entity_j_epstein_co',
    name: 'J. Epstein & Co.',
    type: 'corporation',
    subtype: 'investment_management',
    registrationCountry: 'United States',
    registrationState: 'New York',
    parentCompany: undefined,
    subsidiaries: [],
    controllers: ['entity_epstein_individual'],
    legalStructure: 'corporation',
    taxHaven: false,
    publiclyTraded: false,
    industry: 'Investment Management',
    description: 'Jeffrey Epstein\'s primary investment management company, claimed to only serve billionaire clients.',
    establishedDate: '1982-01-01',
    dissolutionDate: '2019-08-10',
    currentStatus: 'dissolved',
    addresses: [
      {
        id: 'addr_j_epstein_co',
        type: 'headquarters',
        streetAddress: '301 East 66th Street',
        city: 'New York',
        state: 'NY',
        postalCode: '10065',
        country: 'United States',
        coordinates: { lat: 40.7648, lng: -73.9626 },
        dateFrom: '1982-01-01',
        dateTo: '2019-08-10',
        current: false
      }
    ],
    relatedPersons: ['epstein_jeffrey'],
    suspiciousActivity: [
      {
        id: 'sa_j_epstein_co_clients',
        type: 'lack_of_documentation',
        severity: 'high',
        description: 'Claimed to manage billions but client list largely secret and undocumented',
        automaticFlag: false,
        status: 'confirmed_suspicious'
      }
    ],
    sources: [
      {
        id: 'src_j_epstein_co_001',
        title: 'The Mystery of Jeffrey Epstein\'s Wealth',
        type: 'news_article',
        author: 'Various Financial Journalists',
        publication: 'Wall Street Journal',
        publicationDate: '2019-08-15',
        reliability: 'high',
        description: 'Investigation into Epstein\'s investment firm',
        tags: ['financial-investigation', 'wealth', 'investment']
      }
    ],
    tags: ['epstein', 'investment-management', 'dissolved'],
    lastUpdated: '2024-01-15'
  },

  // Leslie Wexner's Empire
  {
    id: 'entity_wexner_les',
    name: 'Leslie Herbert Wexner',
    type: 'individual',
    registrationCountry: 'United States',
    registrationState: 'Ohio',
    parentCompany: undefined,
    subsidiaries: ['entity_limited_brands', 'entity_abercrombie_fitch'],
    controllers: [],
    legalStructure: 'sole_proprietorship',
    taxHaven: false,
    publiclyTraded: false,
    industry: 'Retail/Fashion',
    description: 'Billionaire founder of L Brands (Victoria\'s Secret, Bath & Body Works), former Epstein client and associate.',
    establishedDate: '1937-09-08',
    currentStatus: 'active',
    addresses: [
      {
        id: 'addr_wexner_ohio',
        type: 'residential',
        streetAddress: 'New Albany',
        city: 'New Albany',
        state: 'OH',
        country: 'United States',
        current: true
      }
    ],
    relatedPersons: ['epstein_jeffrey'],
    suspiciousActivity: [
      {
        id: 'sa_wexner_power_attorney',
        type: 'unusual_pattern',
        severity: 'high',
        description: 'Granted sweeping power of attorney to Jeffrey Epstein over vast business empire',
        automaticFlag: false,
        status: 'confirmed_suspicious'
      }
    ],
    sources: [
      {
        id: 'src_wexner_001',
        title: 'The Wexner-Epstein Financial Relationship',
        type: 'news_article',
        author: 'Julie K. Brown',
        publication: 'Miami Herald',
        publicationDate: '2019-07-25',
        reliability: 'high',
        description: 'Investigation into Wexner\'s relationship with Epstein',
        tags: ['wexner', 'power-of-attorney', 'investigation']
      }
    ],
    tags: ['wexner', 'billionaire', 'retail', 'epstein-associate'],
    lastUpdated: '2024-01-15'
  },

  {
    id: 'entity_limited_brands',
    name: 'L Brands Inc.',
    type: 'corporation',
    subtype: 'public_company',
    registrationCountry: 'United States',
    registrationState: 'Delaware',
    parentCompany: undefined,
    subsidiaries: ['entity_victorias_secret', 'entity_bath_body_works'],
    controllers: ['entity_wexner_les'],
    legalStructure: 'corporation',
    taxHaven: false,
    publiclyTraded: true,
    ticker: 'LB',
    industry: 'Retail/Fashion',
    description: 'Major retail corporation founded by Leslie Wexner, parent company of Victoria\'s Secret and Bath & Body Works.',
    establishedDate: '1963-01-01',
    currentStatus: 'active',
    addresses: [
      {
        id: 'addr_limited_brands',
        type: 'headquarters',
        streetAddress: '3 Limited Parkway',
        city: 'Columbus',
        state: 'OH',
        postalCode: '43230',
        country: 'United States',
        coordinates: { lat: 40.0417, lng: -82.9988 },
        current: true
      }
    ],
    relatedPersons: ['wexner_les'],
    suspiciousActivity: [],
    sources: [
      {
        id: 'src_limited_brands_001',
        title: 'L Brands SEC Filings',
        type: 'government_document',
        author: 'Securities and Exchange Commission',
        publication: 'SEC EDGAR Database',
        reliability: 'high',
        description: 'Public company filings',
        tags: ['sec', 'public-filings', 'corporate']
      }
    ],
    tags: ['wexner', 'public-company', 'retail', 'fashion'],
    lastUpdated: '2024-01-15'
  },

  // Epstein's Offshore and Trust Entities
  {
    id: 'entity_zorro_trust',
    name: 'Zorro Trust',
    type: 'trust',
    subtype: 'family_trust',
    registrationCountry: 'United States',
    registrationState: 'Delaware',
    parentCompany: undefined,
    subsidiaries: [],
    controllers: ['entity_epstein_individual'],
    legalStructure: 'trust',
    taxHaven: true,
    publiclyTraded: false,
    description: 'Trust entity used by Jeffrey Epstein for property holdings and asset management, including Little Saint James island.',
    establishedDate: '1996-01-01',
    currentStatus: 'inactive',
    addresses: [
      {
        id: 'addr_zorro_trust',
        type: 'registered',
        streetAddress: 'Corporation Service Company',
        city: 'Wilmington',
        state: 'DE',
        country: 'United States',
        current: false
      }
    ],
    relatedPersons: ['epstein_jeffrey'],
    suspiciousActivity: [
      {
        id: 'sa_zorro_trust_structure',
        type: 'shell_company_involvement',
        severity: 'high',
        description: 'Complex trust structure used to obscure beneficial ownership of assets',
        automaticFlag: true,
        status: 'confirmed_suspicious'
      }
    ],
    sources: [
      {
        id: 'src_zorro_trust_001',
        title: 'Epstein Trust Structure Analysis',
        type: 'court_document',
        author: 'Virgin Islands Attorney General',
        publication: 'Civil Forfeiture Proceedings',
        publicationDate: '2020-01-15',
        reliability: 'high',
        description: 'Legal analysis of Epstein trust entities',
        tags: ['trust', 'asset-forfeiture', 'legal']
      }
    ],
    tags: ['epstein', 'trust', 'delaware', 'asset-holding'],
    lastUpdated: '2024-01-15'
  },

  {
    id: 'entity_gratitude_america',
    name: 'Gratitude America Ltd.',
    type: 'corporation',
    subtype: 'shell_company',
    registrationCountry: 'United States Virgin Islands',
    parentCompany: undefined,
    subsidiaries: [],
    controllers: ['entity_epstein_individual'],
    legalStructure: 'llc',
    taxHaven: true,
    publiclyTraded: false,
    description: 'Virgin Islands corporation used by Epstein for various financial transactions and property holdings.',
    establishedDate: '2012-01-01',
    currentStatus: 'dissolved',
    addresses: [
      {
        id: 'addr_gratitude_america',
        type: 'registered',
        streetAddress: 'Mafolie Hotel',
        city: 'Charlotte Amalie',
        country: 'United States Virgin Islands',
        current: false
      }
    ],
    relatedPersons: ['epstein_jeffrey'],
    suspiciousActivity: [
      {
        id: 'sa_gratitude_america_offshore',
        type: 'offshore_transfer',
        severity: 'critical',
        description: 'Offshore entity in tax haven jurisdiction with minimal business operations',
        automaticFlag: true,
        status: 'confirmed_suspicious'
      }
    ],
    sources: [
      {
        id: 'src_gratitude_america_001',
        title: 'Virgin Islands Corporate Records',
        type: 'government_document',
        author: 'Virgin Islands Lieutenant Governor',
        publication: 'Corporate Registry',
        reliability: 'high',
        description: 'Official corporate registration documents',
        tags: ['virgin-islands', 'corporate-registry', 'offshore']
      }
    ],
    tags: ['epstein', 'virgin-islands', 'offshore', 'shell-company'],
    lastUpdated: '2024-01-15'
  },

  // Major Banks Involved
  {
    id: 'entity_jpmorgan_chase',
    name: 'JPMorgan Chase & Co.',
    type: 'bank',
    subtype: 'major_bank',
    registrationCountry: 'United States',
    registrationState: 'Delaware',
    parentCompany: undefined,
    subsidiaries: [],
    controllers: [],
    legalStructure: 'corporation',
    taxHaven: false,
    publiclyTraded: true,
    ticker: 'JPM',
    industry: 'Banking/Financial Services',
    description: 'Major U.S. bank that maintained accounts for Jeffrey Epstein and processed transactions despite suspicious activity.',
    establishedDate: '1799-01-01',
    currentStatus: 'active',
    addresses: [
      {
        id: 'addr_jpmorgan_hq',
        type: 'headquarters',
        streetAddress: '383 Madison Avenue',
        city: 'New York',
        state: 'NY',
        postalCode: '10017',
        country: 'United States',
        coordinates: { lat: 40.7589, lng: -73.9759 },
        current: true
      }
    ],
    relatedPersons: ['epstein_jeffrey'],
    suspiciousActivity: [
      {
        id: 'sa_jpmorgan_epstein_monitoring',
        type: 'lack_of_documentation',
        severity: 'high',
        description: 'Failed to properly monitor and report suspicious transactions despite red flags',
        automaticFlag: false,
        status: 'under_review'
      }
    ],
    sources: [
      {
        id: 'src_jpmorgan_001',
        title: 'JPMorgan-Epstein Banking Relationship Lawsuits',
        type: 'court_document',
        author: 'U.S. District Court Southern District of New York',
        publication: 'Federal Court Records',
        publicationDate: '2023-05-15',
        reliability: 'high',
        description: 'Legal proceedings regarding JPMorgan\'s relationship with Epstein',
        tags: ['jpmorgan', 'banking', 'lawsuit', 'compliance']
      }
    ],
    tags: ['bank', 'jpmorgan', 'epstein-associate', 'compliance-issues'],
    lastUpdated: '2024-01-15'
  },

  {
    id: 'entity_deutsche_bank',
    name: 'Deutsche Bank AG',
    type: 'bank',
    subtype: 'international_bank',
    registrationCountry: 'Germany',
    parentCompany: undefined,
    subsidiaries: [],
    controllers: [],
    legalStructure: 'corporation',
    taxHaven: false,
    publiclyTraded: true,
    ticker: 'DB',
    industry: 'Banking/Financial Services',
    description: 'German multinational bank that also maintained accounts for Jeffrey Epstein and faces similar scrutiny.',
    establishedDate: '1870-01-01',
    currentStatus: 'active',
    addresses: [
      {
        id: 'addr_deutsche_bank_ny',
        type: 'operational',
        streetAddress: '60 Wall Street',
        city: 'New York',
        state: 'NY',
        postalCode: '10005',
        country: 'United States',
        coordinates: { lat: 40.7074, lng: -74.0113 },
        current: true
      }
    ],
    relatedPersons: ['epstein_jeffrey'],
    suspiciousActivity: [
      {
        id: 'sa_deutsche_bank_epstein',
        type: 'unusual_pattern',
        severity: 'high',
        description: 'Continued banking relationship despite reputational and compliance concerns',
        automaticFlag: false,
        status: 'confirmed_suspicious'
      }
    ],
    sources: [
      {
        id: 'src_deutsche_bank_001',
        title: 'Deutsche Bank Epstein Investigation',
        type: 'news_article',
        author: 'Financial Times',
        publication: 'Financial Times',
        publicationDate: '2021-07-08',
        reliability: 'high',
        description: 'Investigation into Deutsche Bank\'s Epstein connections',
        tags: ['deutsche-bank', 'banking', 'investigation']
      }
    ],
    tags: ['bank', 'deutsche-bank', 'international', 'epstein-associate'],
    lastUpdated: '2024-01-15'
  }
];

// Helper functions for entity management
export const getEntityById = (id: string): FinancialEntity | undefined => {
  return financialEntities.find(entity => entity.id === id);
};

export const getEntitiesByType = (type: string): FinancialEntity[] => {
  return financialEntities.filter(entity => entity.type === type);
};

export const getEntitiesByCountry = (country: string): FinancialEntity[] => {
  return financialEntities.filter(entity => entity.registrationCountry === country);
};

export const getSuspiciousEntities = (): FinancialEntity[] => {
  return financialEntities.filter(entity => entity.suspiciousActivity.length > 0);
};

export const getEntityControllers = (entityId: string): FinancialEntity[] => {
  const entity = getEntityById(entityId);
  if (!entity) return [];
  
  return entity.controllers.map(controllerId => getEntityById(controllerId)).filter(Boolean) as FinancialEntity[];
};

export const getEntitySubsidiaries = (entityId: string): FinancialEntity[] => {
  const entity = getEntityById(entityId);
  if (!entity) return [];
  
  return entity.subsidiaries.map(subsidiaryId => getEntityById(subsidiaryId)).filter(Boolean) as FinancialEntity[];
}; 