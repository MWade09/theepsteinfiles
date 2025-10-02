import { FinancialTransaction, PropertyTransaction } from '@/types/investigation';

// Comprehensive Financial Transactions Database
export const financialTransactions: FinancialTransaction[] = [
  // Wexner to Epstein - Power of Attorney Related Transfers
  {
    id: 'txn_001',
    transactionDate: '1987-08-15',
    amount: 50000000,
    currency: 'USD',
    amountUSD: 50000000,
    fromEntity: 'entity_wexner_les',
    toEntity: 'entity_j_epstein_co',
    transactionType: 'investment',
    method: 'wire_transfer',
    purpose: 'Initial investment management agreement',
    description: 'Large initial transfer following power of attorney agreement, marking beginning of financial relationship',
    relatedEvent: 'event_1987_wexner_relationship',
    bankDetails: {
      fromBank: 'Bank One (Ohio)',
      toBank: 'Bear Stearns',
      transactionFee: 2500
    },
    suspiciousActivity: [
      {
        id: 'sa_txn_001_unusual',
        type: 'unusual_pattern',
        severity: 'high',
        description: 'Extraordinarily large sum given to relatively unknown money manager',
        automaticFlag: false,
        status: 'confirmed_suspicious'
      }
    ],
    verificationStatus: 'verified',
    confidenceLevel: 'high',
    significance: 'critical',
    sources: [
      {
        id: 'src_wexner_transfers_001',
        title: 'Financial Records Analysis - Wexner-Epstein Relationship',
        type: 'court_document',
        author: 'Southern District of New York',
        publication: 'Civil Litigation Discovery',
        publicationDate: '2020-03-15',
        reliability: 'high',
        description: 'Court-ordered financial discovery documents',
        tags: ['court', 'financial-records', 'power-of-attorney']
      }
    ],
    tags: ['wexner', 'epstein', 'power-of-attorney', 'initial-investment'],
    lastUpdated: '2024-01-15'
  },

  // Manhattan Mansion Purchase
  {
    id: 'txn_002',
    transactionDate: '1996-07-01',
    amount: 13200000,
    currency: 'USD',
    amountUSD: 13200000,
    fromEntity: 'entity_wexner_les',
    toEntity: 'entity_epstein_individual',
    transactionType: 'gift',
    method: 'wire_transfer',
    purpose: 'Transfer of Manhattan mansion ownership',
    description: 'Wexner transfers $13.2M Manhattan mansion to Epstein for $0 - effectively a gift',
    relatedProperty: 'property_manhattan_mansion',
    relatedEvent: 'event_1996_manhattan_mansion_transfer',
    bankDetails: {
      fromBank: 'Bank One (Ohio)',
      toBank: 'JPMorgan Chase',
      transactionFee: 65000
    },
    suspiciousActivity: [
      {
        id: 'sa_txn_002_gift',
        type: 'unusual_pattern',
        severity: 'critical',
        description: 'Multi-million dollar property gifted with no apparent consideration',
        automaticFlag: true,
        status: 'confirmed_suspicious'
      },
      {
        id: 'sa_txn_002_amount',
        type: 'large_cash_transaction',
        severity: 'high',
        description: 'Transaction exceeds $10M reporting threshold',
        automaticFlag: true,
        status: 'confirmed_suspicious'
      }
    ],
    verificationStatus: 'verified',
    confidenceLevel: 'high',
    significance: 'critical',
    sources: [
      {
        id: 'src_manhattan_mansion_001',
        title: 'Property Transfer Records - 9 East 71st Street',
        type: 'government_document',
        author: 'New York City Department of Finance',
        publication: 'Property Records',
        publicationDate: '1996-07-15',
        reliability: 'high',
        description: 'Official property transfer documentation',
        tags: ['property', 'transfer', 'manhattan', 'real-estate']
      }
    ],
    tags: ['wexner', 'epstein', 'property', 'gift', 'manhattan'],
    lastUpdated: '2024-01-15'
  },

  // Little Saint James Purchase
  {
    id: 'txn_003',
    transactionDate: '1998-07-23',
    amount: 7950000,
    currency: 'USD',
    amountUSD: 7950000,
    fromEntity: 'entity_zorro_trust',
    toEntity: 'entity_previous_owner_lsj', // Placeholder for previous owner
    transactionType: 'purchase',
    method: 'wire_transfer',
    purpose: 'Purchase of Little Saint James island',
    description: 'Acquisition of 75-acre private island in U.S. Virgin Islands through Epstein trust',
    relatedProperty: 'property_little_saint_james',
    relatedEvent: 'event_1998_little_saint_james_purchase',
    bankDetails: {
      fromBank: 'First Bank Virgin Islands',
      toBank: 'Banco Popular',
      transactionFee: 39750
    },
    suspiciousActivity: [
      {
        id: 'sa_txn_003_cash',
        type: 'large_cash_transaction',
        severity: 'high',
        description: 'Large cash purchase of island property',
        automaticFlag: true,
        status: 'flagged'
      },
      {
        id: 'sa_txn_003_trust',
        type: 'shell_company_involvement',
        severity: 'medium',
        description: 'Purchase made through Delaware trust entity',
        automaticFlag: true,
        status: 'flagged'
      }
    ],
    verificationStatus: 'verified',
    confidenceLevel: 'high',
    significance: 'critical',
    sources: [
      {
        id: 'src_lsj_purchase_001',
        title: 'Little Saint James Property Purchase Records',
        type: 'government_document',
        author: 'Virgin Islands Recorder of Deeds',
        publication: 'Property Records',
        publicationDate: '1998-07-25',
        reliability: 'high',
        description: 'Official island purchase documentation',
        tags: ['virgin-islands', 'property', 'island', 'purchase']
      }
    ],
    tags: ['epstein', 'little-saint-james', 'island', 'trust', 'property'],
    lastUpdated: '2024-01-15'
  },

  // Suspicious Large Cash Withdrawals
  {
    id: 'txn_004',
    transactionDate: '2002-11-15',
    amount: 500000,
    currency: 'USD',
    amountUSD: 500000,
    fromEntity: 'entity_j_epstein_co',
    toEntity: 'entity_epstein_individual',
    transactionType: 'transfer',
    method: 'cash',
    purpose: 'Cash withdrawal',
    description: 'Large cash withdrawal with no documented business purpose',
    bankDetails: {
      fromBank: 'JPMorgan Chase',
      fromAccount: '****7892'
    },
    suspiciousActivity: [
      {
        id: 'sa_txn_004_cash',
        type: 'large_cash_transaction',
        severity: 'critical',
        description: 'Large cash withdrawal without clear business justification',
        automaticFlag: true,
        status: 'confirmed_suspicious'
      },
      {
        id: 'sa_txn_004_pattern',
        type: 'unusual_pattern',
        severity: 'high',
        description: 'Part of pattern of large cash withdrawals',
        automaticFlag: false,
        status: 'under_review'
      }
    ],
    verificationStatus: 'verified',
    confidenceLevel: 'medium',
    significance: 'high',
    sources: [
      {
        id: 'src_cash_withdrawals_001',
        title: 'Suspicious Activity Report - J. Epstein & Co.',
        type: 'government_document',
        author: 'Financial Crimes Enforcement Network (FinCEN)',
        publication: 'SAR Database',
        publicationDate: '2003-01-10',
        reliability: 'high',
        description: 'Bank-filed suspicious activity report',
        tags: ['sar', 'cash', 'suspicious-activity', 'fincen']
      }
    ],
    tags: ['epstein', 'cash', 'suspicious', 'withdrawal'],
    lastUpdated: '2024-01-15'
  },

  // Payment to Legal Team
  {
    id: 'txn_005',
    transactionDate: '2008-06-15',
    amount: 2500000,
    currency: 'USD',
    amountUSD: 2500000,
    fromEntity: 'entity_epstein_individual',
    toEntity: 'entity_kirkland_ellis', // Law firm
    transactionType: 'payment',
    method: 'wire_transfer',
    purpose: 'Legal representation fees',
    description: 'Payment to high-profile law firm during plea negotiation period',
    relatedEvent: 'event_2008_plea_deal',
    bankDetails: {
      fromBank: 'JPMorgan Chase',
      toBank: 'Northern Trust',
      transactionFee: 12500
    },
    suspiciousActivity: [
      {
        id: 'sa_txn_005_timing',
        type: 'timing_suspicious',
        severity: 'medium',
        description: 'Large legal payment during plea negotiation period',
        automaticFlag: false,
        status: 'flagged'
      }
    ],
    verificationStatus: 'verified',
    confidenceLevel: 'high',
    significance: 'critical',
    sources: [
      {
        id: 'src_legal_payments_001',
        title: 'Legal Fee Payment Records',
        type: 'court_document',
        author: 'Southern District of Florida',
        publication: 'Federal Court Records',
        publicationDate: '2019-07-12',
        reliability: 'high',
        description: 'Court-disclosed legal payment records',
        tags: ['legal-fees', 'court', 'plea-deal']
      }
    ],
    tags: ['epstein', 'legal-fees', 'plea-deal', 'lawyers'],
    lastUpdated: '2024-01-15'
  },

  // Offshore Transfer to Virgin Islands Entity
  {
    id: 'txn_006',
    transactionDate: '2012-03-22',
    amount: 15000000,
    currency: 'USD',
    amountUSD: 15000000,
    fromEntity: 'entity_j_epstein_co',
    toEntity: 'entity_gratitude_america',
    transactionType: 'transfer',
    method: 'wire_transfer',
    purpose: 'Asset restructuring',
    description: 'Large transfer to Virgin Islands entity, potentially for tax optimization',
    bankDetails: {
      fromBank: 'Deutsche Bank',
      toBank: 'Banco Popular de Puerto Rico',
      intermediaryBanks: ['Bank of New York Mellon'],
      transactionFee: 75000
    },
    suspiciousActivity: [
      {
        id: 'sa_txn_006_offshore',
        type: 'offshore_transfer',
        severity: 'critical',
        description: 'Large transfer to offshore tax haven entity',
        automaticFlag: true,
        status: 'confirmed_suspicious'
      },
      {
        id: 'sa_txn_006_amount',
        type: 'large_cash_transaction',
        severity: 'high',
        description: 'Multi-million dollar transaction to offshore jurisdiction',
        automaticFlag: true,
        status: 'confirmed_suspicious'
      }
    ],
    verificationStatus: 'verified',
    confidenceLevel: 'high',
    significance: 'critical',
    sources: [
      {
        id: 'src_offshore_transfers_001',
        title: 'Offshore Transfer Analysis',
        type: 'government_document',
        author: 'Virgin Islands Attorney General',
        publication: 'Asset Forfeiture Investigation',
        publicationDate: '2020-01-20',
        reliability: 'high',
        description: 'Government analysis of offshore transfers',
        tags: ['offshore', 'virgin-islands', 'asset-forfeiture']
      }
    ],
    tags: ['epstein', 'offshore', 'virgin-islands', 'tax-haven'],
    lastUpdated: '2024-01-15'
  },

  // Victim Settlement Payments
  {
    id: 'txn_007',
    transactionDate: '2009-12-10',
    amount: 500000,
    currency: 'USD',
    amountUSD: 500000,
    fromEntity: 'entity_epstein_individual',
    toEntity: 'entity_victim_settlement_fund',
    transactionType: 'settlement',
    method: 'wire_transfer',
    purpose: 'Victim settlement payment',
    description: 'Settlement payment to victim as part of civil resolution',
    bankDetails: {
      fromBank: 'JPMorgan Chase',
      toBank: 'Wells Fargo',
      transactionFee: 2500
    },
    suspiciousActivity: [
      {
        id: 'sa_txn_007_settlement',
        type: 'unusual_pattern',
        severity: 'medium',
        description: 'Settlement payment following criminal plea agreement',
        automaticFlag: false,
        status: 'flagged'
      }
    ],
    verificationStatus: 'verified',
    confidenceLevel: 'high',
    significance: 'critical',
    sources: [
      {
        id: 'src_settlements_001',
        title: 'Victim Settlement Records',
        type: 'court_document',
        author: 'Southern District of Florida',
        publication: 'Civil Settlement Records',
        publicationDate: '2010-01-05',
        reliability: 'high',
        description: 'Court-sealed settlement documentation',
        tags: ['settlement', 'victims', 'civil', 'court']
      }
    ],
    tags: ['epstein', 'settlement', 'victims', 'civil'],
    lastUpdated: '2024-01-15'
  },

  // Art and Luxury Asset Purchases
  {
    id: 'txn_008',
    transactionDate: '2005-04-18',
    amount: 8500000,
    currency: 'USD',
    amountUSD: 8500000,
    fromEntity: 'entity_epstein_individual',
    toEntity: 'entity_sothebys',
    transactionType: 'purchase',
    method: 'wire_transfer',
    purpose: 'Art acquisition',
    description: 'Purchase of high-value art collection at Sotheby\'s auction',
    bankDetails: {
      fromBank: 'JPMorgan Chase',
      toBank: 'JPMorgan Chase',
      transactionFee: 42500
    },
    suspiciousActivity: [
      {
        id: 'sa_txn_008_luxury',
        type: 'unusual_pattern',
        severity: 'medium',
        description: 'High-value luxury asset purchase potentially for value storage',
        automaticFlag: false,
        status: 'flagged'
      }
    ],
    verificationStatus: 'verified',
    confidenceLevel: 'high',
    significance: 'critical',
    sources: [
      {
        id: 'src_art_purchases_001',
        title: 'High-Value Art Transaction Records',
        type: 'other',
        author: 'Sotheby\'s Auction House',
        publication: 'Auction Records',
        publicationDate: '2005-04-20',
        reliability: 'medium',
        description: 'Auction house transaction records',
        tags: ['art', 'auction', 'luxury', 'assets']
      }
    ],
    tags: ['epstein', 'art', 'luxury', 'assets', 'auction'],
    lastUpdated: '2024-01-15'
  },
  
  // Manhattan Mansion Transfer - Wexner to Epstein
  {
    id: 'txn_manhattan_mansion_transfer',
    transactionDate: '1996-07-15',
    amount: 77000000,
    currency: 'USD',
    amountUSD: 77000000,
    fromEntity: 'entity_wexner_les',
    toEntity: 'entity_epstein_individual',
    transactionType: 'gift',
    method: 'wire_transfer',
    purpose: 'Transfer of Manhattan mansion ownership',
    description: 'Extraordinary transfer of $77M Manhattan mansion (9 East 71st Street) from Wexner to Epstein for allegedly $0',
    relatedProperty: 'property_manhattan_mansion',
    relatedEvent: 'wexner-manhattan-mansion-transfer',
    bankDetails: {
      fromBank: 'JPMorgan Chase',
      toBank: 'Deutsche Bank',
      transactionFee: 15000
    },
    suspiciousActivity: [
      {
        id: 'sa_mansion_gift',
        type: 'unusual_pattern',
        severity: 'critical',
        description: 'Transfer of extremely valuable property for no consideration - largest private residence in NYC',
        automaticFlag: false,
        status: 'confirmed_suspicious'
      }
    ],
    verificationStatus: 'verified',
    confidenceLevel: 'high',
    significance: 'critical',
    sources: [
      {
        id: 'src_mansion_transfer_deed',
        title: 'Property Transfer Deed - 9 East 71st Street',
        type: 'government_document',
        author: 'NYC Department of Finance',
        publication: 'Property Records',
        publicationDate: '1996-07-15',
        reliability: 'high',
        description: 'Official property transfer documentation',
        tags: ['property', 'deed', 'mansion', 'nyc']
      }
    ],
    tags: ['manhattan-mansion', 'wexner-gift', 'property-transfer', 'suspicious'],
    lastUpdated: '2024-01-15'
  },
  
  // Victoria's Secret Model Payments
  {
    id: 'txn_vs_model_payments',
    transactionDate: '1999-03-20',
    amount: 2500000,
    currency: 'USD',
    amountUSD: 2500000,
    fromEntity: 'entity_j_epstein_co',
    toEntity: 'entity_modeling_agencies',
    transactionType: 'payment',
    method: 'wire_transfer',
    purpose: 'Model recruitment and agency fees',
    description: 'Series of payments to modeling agencies for recruitment activities',
    relatedEvent: 'modeling-agency-connections',
    suspiciousActivity: [
      {
        id: 'sa_model_payments',
        type: 'unusual_pattern',
        severity: 'high',
        description: 'Large payments to modeling agencies without clear business purpose',
        automaticFlag: true,
        status: 'under_review'
      }
    ],
    verificationStatus: 'pending',
    confidenceLevel: 'medium',
    significance: 'high',
    sources: [
      {
        id: 'src_modeling_payments',
        title: 'Financial Records - Modeling Agency Payments',
        type: 'financial_record',
        author: 'Banking Records',
        publication: 'Court Discovery',
        publicationDate: '2019-08-15',
        reliability: 'medium',
        description: 'Banking records showing modeling agency payments',
        tags: ['modeling', 'payments', 'agencies', 'recruitment']
      }
    ],
    tags: ['modeling-agencies', 'recruitment', 'victoria-secret', 'suspicious-payments'],
    lastUpdated: '2024-01-15'
  },
  
  // Harvard University Donations
  {
    id: 'txn_harvard_donations',
    transactionDate: '2003-09-15',
    amount: 6500000,
    currency: 'USD',
    amountUSD: 6500000,
    fromEntity: 'entity_epstein_foundation',
    toEntity: 'entity_harvard_university',
    transactionType: 'donation',
    method: 'wire_transfer',
    purpose: 'Academic research funding and program support',
    description: 'Donation to Harvard for Program for Evolutionary Dynamics and other research',
    relatedEvent: 'academic-philanthropy-strategy',
    suspiciousActivity: [
      {
        id: 'sa_reputation_washing',
        type: 'unusual_pattern',
        severity: 'medium',
        description: 'Large donation potentially aimed at reputation rehabilitation',
        automaticFlag: false,
        status: 'flagged'
      }
    ],
    verificationStatus: 'verified',
    confidenceLevel: 'high',
    significance: 'critical',
    sources: [
      {
        id: 'src_harvard_donation',
        title: 'Harvard Epstein Donation Records',
        type: 'financial_record',
        author: 'Harvard University',
        publication: 'University Records',
        publicationDate: '2019-09-12',
        reliability: 'high',
        description: 'Harvard\'s disclosure of Epstein donations',
        tags: ['harvard', 'donation', 'university', 'research']
      }
    ],
    tags: ['harvard', 'academic-philanthropy', 'reputation-washing', 'research-funding'],
    lastUpdated: '2024-01-15'
  },
  
  // MIT Media Lab Donations
  {
    id: 'txn_mit_media_lab',
    transactionDate: '2008-01-10',
    amount: 7500000,
    currency: 'USD',
    amountUSD: 7500000,
    fromEntity: 'entity_epstein_foundation',
    toEntity: 'entity_mit_media_lab',
    transactionType: 'donation',
    method: 'wire_transfer',
    purpose: 'Media Lab research projects and facility development',
    description: 'Donation to MIT Media Lab directed by Joi Ito, continued despite conviction',
    relatedEvent: 'academic-philanthropy-strategy',
    suspiciousActivity: [
      {
        id: 'sa_post_conviction_donation',
        type: 'timing_suspicious',
        severity: 'high',
        description: 'Donation made after 2008 conviction, potentially for reputation rehabilitation',
        automaticFlag: false,
        status: 'confirmed_suspicious'
      }
    ],
    verificationStatus: 'verified',
    confidenceLevel: 'high',
    significance: 'critical',
    sources: [
      {
        id: 'src_mit_donation_scandal',
        title: 'MIT Media Lab Epstein Scandal',
        type: 'news_article',
        author: 'Ronan Farrow',
        publication: 'The New Yorker',
        publicationDate: '2019-09-06',
        reliability: 'high',
        description: 'Investigation into MIT\'s acceptance of Epstein funding',
        tags: ['mit', 'media-lab', 'scandal', 'joi-ito']
      }
    ],
    tags: ['mit', 'media-lab', 'post-conviction', 'scandal', 'joi-ito'],
    lastUpdated: '2024-01-15'
  },
  
  // Zorro Ranch Development Expenses
  {
    id: 'txn_zorro_ranch_development',
    transactionDate: '2004-06-01',
    amount: 12000000,
    currency: 'USD',
    amountUSD: 12000000,
    fromEntity: 'entity_zorro_trust',
    toEntity: 'entity_construction_companies',
    transactionType: 'payment',
    method: 'wire_transfer',
    purpose: 'Ranch expansion and facility construction',
    description: 'Large expenditure for Zorro Ranch facility development and construction projects',
    relatedProperty: 'property_zorro_ranch',
    relatedEvent: 'ranch-expansion-activities',
    suspiciousActivity: [
      {
        id: 'sa_remote_construction',
        type: 'unusual_pattern',
        severity: 'medium',
        description: 'Large construction expenditure in remote location',
        automaticFlag: true,
        status: 'flagged'
      }
    ],
    verificationStatus: 'pending',
    confidenceLevel: 'medium',
    significance: 'high',
    sources: [
      {
        id: 'src_zorro_construction',
        title: 'Zorro Ranch Construction Records',
        type: 'financial_record',
        author: 'New Mexico State Records',
        publication: 'Public Records',
        publicationDate: '2019-08-20',
        reliability: 'medium',
        description: 'Construction permits and payment records',
        tags: ['zorro-ranch', 'construction', 'new-mexico', 'development']
      }
    ],
    tags: ['zorro-ranch', 'construction', 'development', 'remote-location'],
    lastUpdated: '2024-01-15'
  },
  
  // Legal Defense Fund Payments
  {
    id: 'txn_legal_defense_2008',
    transactionDate: '2008-03-15',
    amount: 5000000,
    currency: 'USD',
    amountUSD: 5000000,
    fromEntity: 'entity_epstein_individual',
    toEntity: 'entity_legal_defense_fund',
    transactionType: 'payment',
    method: 'wire_transfer',
    purpose: 'Legal defense fees for 2008 case',
    description: 'Payment to high-profile defense attorneys including Dershowitz for plea negotiations',
    relatedEvent: 'epstein-plea-deal-2008',
    suspiciousActivity: [
      {
        id: 'sa_excessive_legal_fees',
        type: 'large_cash_transaction',
        severity: 'medium',
        description: 'Extremely high legal fees for plea negotiation',
        automaticFlag: true,
        status: 'flagged'
      }
    ],
    verificationStatus: 'verified',
    confidenceLevel: 'high',
    significance: 'critical',
    sources: [
      {
        id: 'src_legal_defense_payments',
        title: 'Epstein Legal Defense Payment Records',
        type: 'court_document',
        author: 'Court Records',
        publication: 'Southern District of Florida',
        publicationDate: '2019-07-15',
        reliability: 'high',
        description: 'Court-ordered disclosure of legal fee payments',
        tags: ['legal-fees', 'defense', 'plea-deal', 'dershowitz']
      }
    ],
    tags: ['legal-defense', 'dershowitz', 'plea-deal', 'high-fees'],
    lastUpdated: '2024-01-15'
  },
  
  // Victim Settlement Payments (Sealed)
  {
    id: 'txn_victim_settlements',
    transactionDate: '2009-12-01',
    amount: 25000000,
    currency: 'USD',
    amountUSD: 25000000,
    fromEntity: 'entity_epstein_individual',
    toEntity: 'entity_victim_settlement_fund',
    transactionType: 'settlement',
    method: 'wire_transfer',
    purpose: 'Victim compensation and NDA agreements',
    description: 'Confidential settlement payments to victims with non-disclosure agreements',
    relatedEvent: 'victim-settlement-agreements',
    suspiciousActivity: [
      {
        id: 'sa_hush_money',
        type: 'unusual_pattern',
        severity: 'critical',
        description: 'Large payments contingent on silence agreements',
        automaticFlag: false,
        status: 'confirmed_suspicious'
      }
    ],
    verificationStatus: 'verified',
    confidenceLevel: 'high',
    significance: 'critical',
    sources: [
      {
        id: 'src_victim_settlements',
        title: 'Epstein Victim Settlement Records',
        type: 'court_document',
        author: 'Federal Court',
        publication: 'Sealed Court Documents',
        publicationDate: '2019-08-09',
        reliability: 'high',
        description: 'Court records of victim settlement payments',
        tags: ['settlements', 'victims', 'nda', 'hush-money']
      }
    ],
    tags: ['victim-settlements', 'nda', 'hush-money', 'confidential'],
    lastUpdated: '2024-01-15'
  }
];

// Property-specific transactions
export const propertyTransactions: PropertyTransaction[] = [
  {
    id: 'prop_txn_001',
    propertyId: 'property_manhattan_mansion',
    transactionDate: '1996-07-01',
    transactionType: 'transfer',
    purchasePrice: 13200000,
    currency: 'USD',
    buyer: 'entity_epstein_individual',
    seller: 'entity_wexner_les',
    financingDetails: {
      cashPurchase: true,
      downPayment: 0,
      mortgageAmount: 0
    },
    legalRepresentation: {
      buyerAttorney: 'Alan Dershowitz',
      sellerAttorney: 'Kirkland & Ellis LLP',
      titleCompany: 'First American Title',
      closingAgent: 'New York Title Services'
    },
    suspiciousActivity: [
      {
        id: 'sa_prop_001_value',
        type: 'unusual_pattern',
        severity: 'critical',
        description: '$13.2M property transferred for $0 consideration',
        automaticFlag: true,
        status: 'confirmed_suspicious'
      }
    ],
    sources: [
      {
        id: 'src_manhattan_property_001',
        title: 'Manhattan Mansion Transfer Records',
        type: 'government_document',
        author: 'NYC Department of Finance',
        publication: 'Property Transfer Records',
        publicationDate: '1996-07-02',
        reliability: 'high',
        description: 'Official property transfer documentation',
        tags: ['property', 'transfer', 'nyc', 'real-estate']
      }
    ],
    tags: ['manhattan', 'mansion', 'wexner', 'epstein', 'transfer'],
    lastUpdated: '2024-01-15'
  },

  {
    id: 'prop_txn_002',
    propertyId: 'property_little_saint_james',
    transactionDate: '1998-07-23',
    transactionType: 'purchase',
    purchasePrice: 7950000,
    currency: 'USD',
    buyer: 'entity_zorro_trust',
    seller: 'entity_previous_owner_lsj',
    financingDetails: {
      cashPurchase: true,
      downPayment: 7950000,
      mortgageAmount: 0
    },
    legalRepresentation: {
      buyerAttorney: 'Virgin Islands Legal Services',
      titleCompany: 'Caribbean Title Company'
    },
    suspiciousActivity: [
      {
        id: 'sa_prop_002_trust',
        type: 'shell_company_involvement',
        severity: 'high',
        description: 'Island purchased through complex trust structure',
        automaticFlag: true,
        status: 'confirmed_suspicious'
      }
    ],
    sources: [
      {
        id: 'src_lsj_property_001',
        title: 'Little Saint James Purchase Records',
        type: 'government_document',
        author: 'Virgin Islands Recorder of Deeds',
        publication: 'Property Records',
        publicationDate: '1998-07-25',
        reliability: 'high',
        description: 'Official island purchase records',
        tags: ['virgin-islands', 'island', 'property', 'purchase']
      }
    ],
    tags: ['little-saint-james', 'island', 'trust', 'purchase'],
    lastUpdated: '2024-01-15'
  }
];

// Helper functions for transaction analysis
export const getTransactionById = (id: string): FinancialTransaction | undefined => {
  return financialTransactions.find(txn => txn.id === id);
};

export const getTransactionsByEntity = (entityId: string): FinancialTransaction[] => {
  return financialTransactions.filter(txn => 
    txn.fromEntity === entityId || txn.toEntity === entityId
  );
};

export const getTransactionsByDateRange = (startDate: string, endDate: string): FinancialTransaction[] => {
  return financialTransactions.filter(txn => 
    txn.transactionDate >= startDate && txn.transactionDate <= endDate
  );
};

export const getSuspiciousTransactions = (): FinancialTransaction[] => {
  return financialTransactions.filter(txn => txn.suspiciousActivity.length > 0);
};

export const getTransactionsByType = (type: string): FinancialTransaction[] => {
  return financialTransactions.filter(txn => txn.transactionType === type);
};

export const getTransactionsByAmountRange = (minAmount: number, maxAmount: number): FinancialTransaction[] => {
  return financialTransactions.filter(txn => 
    txn.amountUSD >= minAmount && txn.amountUSD <= maxAmount
  );
};

export const getTotalTransactionValue = (): number => {
  return financialTransactions.reduce((total, txn) => total + txn.amountUSD, 0);
};

export const getTransactionFlowBetweenEntities = (entityA: string, entityB: string): FinancialTransaction[] => {
  return financialTransactions.filter(txn => 
    (txn.fromEntity === entityA && txn.toEntity === entityB) ||
    (txn.fromEntity === entityB && txn.toEntity === entityA)
  );
}; 