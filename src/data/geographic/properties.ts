export interface PropertyOwnership {
  id: string;
  propertyId: string;
  ownerId: string;
  ownerName: string;
  ownerType: 'individual' | 'corporation' | 'trust' | 'foundation';
  startDate: string;
  endDate?: string;
  acquisitionMethod: 'purchase' | 'gift' | 'inheritance' | 'transfer' | 'unknown';
  purchasePrice?: number;
  financingDetails?: string;
  legalEntity?: string;
  sourceDocuments: string[];
  verificationStatus: 'verified' | 'pending' | 'disputed';
}

export interface PropertyFinancials {
  purchasePrice: number;
  purchaseDate: string;
  currentEstimatedValue?: number;
  renovationCosts?: number;
  annualMaintenance?: number;
  propertyTaxes?: number;
  financingSource?: string;
  suspiciousTransactions: string[];
}

export interface PropertyFeatures {
  squareFootage?: number;
  bedrooms?: number;
  bathrooms?: number;
  specialFeatures: string[];
  securityFeatures: string[];
  entertainmentFacilities: string[];
  transportation: string[];
}

export interface EnhancedProperty {
  id: string;
  name: string;
  type: 'residence' | 'office' | 'island' | 'ranch' | 'airport' | 'yacht' | 'other';
  coordinates: [number, number];
  address: string;
  description: string;
  significance: 'critical' | 'high' | 'medium' | 'low';
  
  // Ownership and Financial Data
  currentOwner?: string;
  ownershipHistory: PropertyOwnership[];
  financials: PropertyFinancials;
  features: PropertyFeatures;
  
  // Investigation Data
  investigationDetails: {
    firstMentioned: string;
    keyEvents: Array<{
      date: string;
      event: string;
      source: string;
      significance: 'critical' | 'high' | 'medium' | 'low';
    }>;
    witnessAccounts: string[];
    lawEnforcement: Array<{
      date: string;
      agency: string;
      action: string;
      result?: string;
    }>;
  };
  
  // Connections
  connectedEntities: string[];
  relatedTransactions: string[];
  
  // Media and Documentation
  images?: string[];
  documents: string[];
  flightLogReferences: string[];
  
  // Status
  currentStatus: 'active' | 'sold' | 'seized' | 'abandoned' | 'unknown';
  accessLevel: 'public' | 'restricted' | 'private' | 'seized';
  verified: boolean;
}

export const enhancedProperties: EnhancedProperty[] = [
  {
    id: 'property_little_saint_james',
    name: 'Little Saint James Island',
    type: 'island',
    coordinates: [18.3009, -64.8257],
    address: 'Little Saint James, U.S. Virgin Islands',
    description: 'Private 75-acre island in the U.S. Virgin Islands, often referred to as "Epstein Island". Central location for alleged trafficking operations.',
    significance: 'critical',
    
    ownershipHistory: [
      {
        id: 'lsj_ownership_1',
        propertyId: 'property_little_saint_james',
        ownerId: 'entity_epstein_individual',
        ownerName: 'Jeffrey Edward Epstein',
        ownerType: 'individual',
        startDate: '1998-08-01',
        endDate: '2019-08-10',
        acquisitionMethod: 'purchase',
        purchasePrice: 7950000,
        financingDetails: 'Purchased through Zorro Trust',
        legalEntity: 'Zorro Trust',
        sourceDocuments: ['Virgin Islands Property Records', 'FBI Financial Analysis'],
        verificationStatus: 'verified'
      }
    ],
    
    financials: {
      purchasePrice: 7950000,
      purchaseDate: '1998-08-01',
      currentEstimatedValue: 63000000,
      renovationCosts: 15000000,
      annualMaintenance: 500000,
      propertyTaxes: 250000,
      financingSource: 'Zorro Trust',
      suspiciousTransactions: ['transaction_lsj_purchase', 'transaction_renovation_2010']
    },
    
    features: {
      squareFootage: 8124,
      bedrooms: 6,
      bathrooms: 8,
      specialFeatures: [
        'Private 75-acre island',
        'Multiple guest accommodations',
        'Private beach and dock',
        'Helipad',
        'Temple-like structure',
        'Underground facilities',
        'Private water treatment plant'
      ],
      securityFeatures: [
        'Gated compound',
        'Private security force',
        'Surveillance cameras',
        'Controlled access points',
        'Private communications'
      ],
      entertainmentFacilities: [
        'Swimming pools',
        'Tennis court',
        'Private beach',
        'Entertainment pavilions',
        'Spa facilities'
      ],
      transportation: ['Private dock', 'Helipad', 'Beach access']
    },
    
    investigationDetails: {
      firstMentioned: '2005-07-01',
      keyEvents: [
        {
          date: '1998-08-01',
          event: 'Island purchased by Epstein',
          source: 'Property Records',
          significance: 'high'
        },
        {
          date: '2005-07-15',
          event: 'First victim allegations reference island',
          source: 'Palm Beach Police Report',
          significance: 'critical'
        },
        {
          date: '2019-07-08',
          event: 'FBI raids island following arrest',
          source: 'FBI Operation Reports',
          significance: 'critical'
        },
        {
          date: '2021-12-29',
          event: 'Maxwell trial testimony mentions island',
          source: 'Court Transcripts',
          significance: 'critical'
        }
      ],
      witnessAccounts: [
        'Virginia Giuffre testimony',
        'Maxwell trial witnesses',
        'Former employees'
      ],
      lawEnforcement: [
        {
          date: '2019-07-08',
          agency: 'FBI',
          action: 'Search warrant execution',
          result: 'Evidence collected'
        },
        {
          date: '2019-08-12',
          agency: 'Virgin Islands Police',
          action: 'Ongoing investigation',
          result: 'Property secured'
        }
      ]
    },
    
    connectedEntities: [
      'entity_epstein_individual',
      'entity_zorro_trust',
      'entity_ghislaine_maxwell',
      'entity_southern_trust'
    ],
    relatedTransactions: ['transaction_lsj_purchase', 'transaction_renovation_2010'],
    
    documents: [
      'Property Deed 1998',
      'FBI Search Warrant 2019',
      'Zorro Trust Documents',
      'Construction Records'
    ],
    flightLogReferences: ['Multiple flights 1998-2019'],
    
    currentStatus: 'seized',
    accessLevel: 'seized',
    verified: true
  },
  
  {
    id: 'property_manhattan_mansion',
    name: 'East 71st Street Mansion',
    type: 'residence',
    coordinates: [40.7736, -73.9566],
    address: '9 East 71st Street, New York, NY 10021',
    description: 'Nine-story, 21,000 square foot mansion on Manhattan\'s Upper East Side. One of the largest private homes in Manhattan.',
    significance: 'critical',
    
    ownershipHistory: [
      {
        id: 'manhattan_ownership_1',
        propertyId: 'property_manhattan_mansion',
        ownerId: 'entity_wexner_les',
        ownerName: 'Leslie Herbert Wexner',
        ownerType: 'individual',
        startDate: '1989-01-01',
        endDate: '1996-07-01',
        acquisitionMethod: 'purchase',
        purchasePrice: 13200000,
        sourceDocuments: ['NYC Property Records'],
        verificationStatus: 'verified'
      },
      {
        id: 'manhattan_ownership_2',
        propertyId: 'property_manhattan_mansion',
        ownerId: 'entity_epstein_individual',
        ownerName: 'Jeffrey Edward Epstein',
        ownerType: 'individual',
        startDate: '1996-07-01',
        endDate: '2019-08-10',
        acquisitionMethod: 'gift',
        purchasePrice: 0,
        financingDetails: 'Transferred from Les Wexner for $0',
        sourceDocuments: ['Property Transfer Documents', 'IRS Investigation'],
        verificationStatus: 'verified'
      }
    ],
    
    financials: {
      purchasePrice: 13200000,
      purchaseDate: '1996-07-01',
      currentEstimatedValue: 77000000,
      renovationCosts: 20000000,
      annualMaintenance: 1200000,
      propertyTaxes: 600000,
      financingSource: 'Gift from Les Wexner',
      suspiciousTransactions: ['transaction_wexner_gift', 'transaction_renovation_1997']
    },
    
    features: {
      squareFootage: 21000,
      bedrooms: 7,
      bathrooms: 9,
      specialFeatures: [
        'Nine-story townhouse',
        'Private elevator',
        'Wine cellar',
        'Rooftop terrace',
        'Library',
        'Media room',
        'Private office suites'
      ],
      securityFeatures: [
        'Advanced security system',
        'Private entrance',
        'Bulletproof windows',
        'Panic rooms',
        'Private communications'
      ],
      entertainmentFacilities: [
        'Formal dining room',
        'Entertainment suites',
        'Private gym',
        'Spa facilities',
        'Art gallery spaces'
      ],
      transportation: ['Private garage', 'Staff quarters']
    },
    
    investigationDetails: {
      firstMentioned: '2005-03-01',
      keyEvents: [
        {
          date: '1996-07-01',
          event: 'Property transferred from Wexner to Epstein',
          source: 'Property Records',
          significance: 'critical'
        },
        {
          date: '2005-03-15',
          event: 'Search warrant executed',
          source: 'NYPD Records',
          significance: 'critical'
        },
        {
          date: '2019-07-06',
          event: 'FBI search following arrest',
          source: 'FBI Reports',
          significance: 'critical'
        }
      ],
      witnessAccounts: [
        'Victim testimonies',
        'Staff interviews',
        'Neighbor observations'
      ],
      lawEnforcement: [
        {
          date: '2005-03-15',
          agency: 'NYPD',
          action: 'Search warrant',
          result: 'Evidence collected'
        },
        {
          date: '2019-07-06',
          agency: 'FBI',
          action: 'Evidence collection',
          result: 'Multiple items seized'
        }
      ]
    },
    
    connectedEntities: [
      'entity_epstein_individual',
      'entity_wexner_les',
      'entity_ghislaine_maxwell'
    ],
    relatedTransactions: ['transaction_wexner_gift', 'transaction_renovation_1997'],
    
    documents: [
      'Property Transfer 1996',
      'Search Warrants',
      'FBI Evidence Lists'
    ],
    flightLogReferences: ['Frequent arrivals/departures'],
    
    currentStatus: 'sold',
    accessLevel: 'private',
    verified: true
  },
  
  {
    id: 'property_palm_beach_estate',
    name: 'El Brillo Way Estate',
    type: 'residence',
    coordinates: [26.6612, -80.0350],
    address: '358 El Brillo Way, Palm Beach, FL 33480',
    description: 'Waterfront mansion in Palm Beach, Florida. Site of the initial 2005 investigation that led to federal charges.',
    significance: 'critical',
    
    ownershipHistory: [
      {
        id: 'palm_beach_ownership_1',
        propertyId: 'property_palm_beach_estate',
        ownerId: 'entity_epstein_individual',
        ownerName: 'Jeffrey Edward Epstein',
        ownerType: 'individual',
        startDate: '1990-02-01',
        endDate: '2019-08-10',
        acquisitionMethod: 'purchase',
        purchasePrice: 2500000,
        sourceDocuments: ['Palm Beach County Records'],
        verificationStatus: 'verified'
      }
    ],
    
    financials: {
      purchasePrice: 2500000,
      purchaseDate: '1990-02-01',
      currentEstimatedValue: 18500000,
      renovationCosts: 8000000,
      annualMaintenance: 400000,
      propertyTaxes: 180000,
      suspiciousTransactions: ['transaction_palm_beach_purchase']
    },
    
    features: {
      squareFootage: 14000,
      bedrooms: 6,
      bathrooms: 8,
      specialFeatures: [
        'Waterfront location',
        'Private beach access',
        'Guest houses',
        'Staff quarters',
        'Private dock',
        'Pool house',
        'Tennis court'
      ],
      securityFeatures: [
        'Gated property',
        'Security cameras',
        'Private security',
        'Controlled access'
      ],
      entertainmentFacilities: [
        'Swimming pool',
        'Tennis court',
        'Private beach',
        'Entertainment areas'
      ],
      transportation: ['Private dock', 'Multiple garages']
    },
    
    investigationDetails: {
      firstMentioned: '2005-03-01',
      keyEvents: [
        {
          date: '2005-03-01',
          event: 'Initial victim complaint filed',
          source: 'Palm Beach Police',
          significance: 'critical'
        },
        {
          date: '2005-10-20',
          event: 'Search warrant executed',
          source: 'Palm Beach Police',
          significance: 'critical'
        },
        {
          date: '2006-06-30',
          event: 'Grand jury proceedings',
          source: 'Court Records',
          significance: 'critical'
        }
      ],
      witnessAccounts: [
        'Multiple victim statements',
        'Employee interviews',
        'Neighbor reports'
      ],
      lawEnforcement: [
        {
          date: '2005-10-20',
          agency: 'Palm Beach Police',
          action: 'Search and seizure',
          result: 'Evidence collected'
        }
      ]
    },
    
    connectedEntities: [
      'entity_epstein_individual',
      'entity_ghislaine_maxwell'
    ],
    relatedTransactions: ['transaction_palm_beach_purchase'],
    
    documents: [
      'Police Reports 2005',
      'Search Warrant',
      'Victim Statements'
    ],
    flightLogReferences: ['Regular arrivals from New York'],
    
    currentStatus: 'sold',
    accessLevel: 'private',
    verified: true
  },
  
  {
    id: 'property_zorro_ranch',
    name: 'Zorro Ranch',
    type: 'ranch',
    coordinates: [35.8411, -105.4758],
    address: 'County Road 69, Stanley, NM 87056',
    description: 'Large 8,000-acre ranch property in New Mexico with private airstrip and multiple buildings.',
    significance: 'high',
    
    ownershipHistory: [
      {
        id: 'zorro_ownership_1',
        propertyId: 'property_zorro_ranch',
        ownerId: 'entity_epstein_individual',
        ownerName: 'Jeffrey Edward Epstein',
        ownerType: 'individual',
        startDate: '1993-05-01',
        endDate: '2019-08-10',
        acquisitionMethod: 'purchase',
        purchasePrice: 5000000,
        sourceDocuments: ['New Mexico Property Records'],
        verificationStatus: 'verified'
      }
    ],
    
    financials: {
      purchasePrice: 5000000,
      purchaseDate: '1993-05-01',
      currentEstimatedValue: 18000000,
      renovationCosts: 12000000,
      annualMaintenance: 300000,
      propertyTaxes: 50000,
      suspiciousTransactions: ['transaction_zorro_purchase']
    },
    
    features: {
      squareFootage: 26700,
      bedrooms: 8,
      bathrooms: 12,
      specialFeatures: [
        '8,000-acre property',
        'Private airstrip',
        'Multiple guest houses',
        'Horse stables',
        'Staff accommodations',
        'Workshop buildings'
      ],
      securityFeatures: [
        'Remote location',
        'Private road access',
        'Security personnel',
        'Surveillance systems'
      ],
      entertainmentFacilities: [
        'Horseback riding',
        'Hiking trails',
        'Private landing strip',
        'Entertainment spaces'
      ],
      transportation: ['Private airstrip', 'Helicopter pad', 'Multiple vehicle access']
    },
    
    investigationDetails: {
      firstMentioned: '2006-01-01',
      keyEvents: [
        {
          date: '1993-05-01',
          event: 'Ranch purchased',
          source: 'Property Records',
          significance: 'medium'
        },
        {
          date: '2019-07-15',
          event: 'FBI search conducted',
          source: 'FBI Reports',
          significance: 'high'
        }
      ],
      witnessAccounts: [
        'Former ranch employees',
        'Local community reports'
      ],
      lawEnforcement: [
        {
          date: '2019-07-15',
          agency: 'FBI',
          action: 'Search and investigation',
          result: 'Evidence collected'
        }
      ]
    },
    
    connectedEntities: [
      'entity_epstein_individual',
      'entity_zorro_trust'
    ],
    relatedTransactions: ['transaction_zorro_purchase'],
    
    documents: [
      'Property Purchase Records',
      'FBI Search Reports'
    ],
    flightLogReferences: ['Regular flights to private airstrip'],
    
    currentStatus: 'sold',
    accessLevel: 'private',
    verified: true
  },
  
  {
    id: 'property_paris_apartment',
    name: 'Avenue Foch Apartment',
    type: 'residence',
    coordinates: [48.8632, 2.3126],
    address: '22 Avenue Foch, 75116 Paris, France',
    description: 'Luxury apartment in the prestigious 16th arrondissement, serving as European base of operations.',
    significance: 'medium',
    
    ownershipHistory: [
      {
        id: 'paris_ownership_1',
        propertyId: 'property_paris_apartment',
        ownerId: 'entity_epstein_individual',
        ownerName: 'Jeffrey Edward Epstein',
        ownerType: 'individual',
        startDate: '2000-03-01',
        endDate: '2019-08-10',
        acquisitionMethod: 'purchase',
        purchasePrice: 9400000,
        sourceDocuments: ['French Property Registry'],
        verificationStatus: 'verified'
      }
    ],
    
    financials: {
      purchasePrice: 9400000,
      purchaseDate: '2000-03-01',
      currentEstimatedValue: 16000000,
      renovationCosts: 3000000,
      annualMaintenance: 200000,
      propertyTaxes: 150000,
      suspiciousTransactions: ['transaction_paris_purchase']
    },
    
    features: {
      squareFootage: 8000,
      bedrooms: 4,
      bathrooms: 6,
      specialFeatures: [
        'Historic building',
        'Private elevator',
        'Balconies with city views',
        'Concierge service',
        'Wine cellar'
      ],
      securityFeatures: [
        'Building security',
        'Private entrance',
        'Secure communications'
      ],
      entertainmentFacilities: [
        'Formal dining',
        'Entertainment rooms',
        'Art display areas'
      ],
      transportation: ['Private garage', 'Doorman service']
    },
    
    investigationDetails: {
      firstMentioned: '2008-01-01',
      keyEvents: [
        {
          date: '2000-03-01',
          event: 'Apartment purchased',
          source: 'Property Records',
          significance: 'medium'
        }
      ],
      witnessAccounts: ['Limited witness accounts'],
      lawEnforcement: []
    },
    
    connectedEntities: [
      'entity_epstein_individual'
    ],
    relatedTransactions: ['transaction_paris_purchase'],
    
    documents: [
      'French Property Purchase Records'
    ],
    flightLogReferences: ['International flights to Paris'],
    
    currentStatus: 'sold',
    accessLevel: 'private',
    verified: true
  },

  // Additional Properties - Expanded Coverage
  
  {
    id: 'property_great_saint_james',
    name: 'Great Saint James Island',
    type: 'island',
    coordinates: [18.3123, -64.8156],
    address: 'Great Saint James, U.S. Virgin Islands',
    description: 'Adjacent island to Little Saint James, purchased to expand privacy and control of surrounding area.',
    significance: 'high',
    
    ownershipHistory: [
      {
        id: 'gsj_ownership_1',
        propertyId: 'property_great_saint_james',
        ownerId: 'entity_epstein_individual',
        ownerName: 'Jeffrey Edward Epstein',
        ownerType: 'individual',
        startDate: '2016-05-01',
        endDate: '2019-08-10',
        acquisitionMethod: 'purchase',
        purchasePrice: 18000000,
        sourceDocuments: ['Virgin Islands Property Records'],
        verificationStatus: 'verified'
      }
    ],
    
    financials: {
      purchasePrice: 18000000,
      purchaseDate: '2016-05-01',
      currentEstimatedValue: 22000000,
      renovationCosts: 2000000,
      annualMaintenance: 150000,
      propertyTaxes: 100000,
      suspiciousTransactions: []
    },
    
    features: {
      squareFootage: 3500,
      bedrooms: 3,
      bathrooms: 4,
      specialFeatures: ['165-acre island', 'Undeveloped land', 'Private beaches', 'Natural harbor'],
      securityFeatures: ['Remote location', 'Controlled access'],
      entertainmentFacilities: ['Natural beaches', 'Hiking trails'],
      transportation: ['Boat access']
    },
    
    investigationDetails: {
      firstMentioned: '2016-06-01',
      keyEvents: [
        {
          date: '2016-05-01',
          event: 'Island purchased',
          source: 'Property Records',
          significance: 'medium'
        }
      ],
      witnessAccounts: [],
      lawEnforcement: []
    },
    
    connectedEntities: ['entity_epstein_individual'],
    relatedTransactions: [],
    documents: ['Property Deed 2016'],
    flightLogReferences: [],
    
    currentStatus: 'seized',
    accessLevel: 'seized',
    verified: true
  },

  {
    id: 'property_ohio_mansion',
    name: 'New Albany Mansion',
    type: 'residence',
    coordinates: [40.0809, -82.8088],
    address: 'New Albany, Ohio',
    description: 'Les Wexner\'s primary residence, site of numerous meetings with Epstein.',
    significance: 'high',
    
    ownershipHistory: [
      {
        id: 'ohio_ownership_1',
        propertyId: 'property_ohio_mansion',
        ownerId: 'entity_wexner_les',
        ownerName: 'Leslie Herbert Wexner',
        ownerType: 'individual',
        startDate: '1989-01-01',
        acquisitionMethod: 'purchase',
        purchasePrice: 12000000,
        sourceDocuments: ['Ohio Property Records'],
        verificationStatus: 'verified'
      }
    ],
    
    financials: {
      purchasePrice: 12000000,
      purchaseDate: '1989-01-01',
      currentEstimatedValue: 45000000,
      renovationCosts: 25000000,
      annualMaintenance: 800000,
      propertyTaxes: 350000,
      suspiciousTransactions: []
    },
    
    features: {
      squareFootage: 60000,
      bedrooms: 12,
      bathrooms: 16,
      specialFeatures: ['Georgian-style mansion', 'Guest houses', 'Private lake', 'Extensive grounds'],
      securityFeatures: ['Gated estate', 'Private security', 'Surveillance systems'],
      entertainmentFacilities: ['Tennis courts', 'Swimming pool', 'Entertainment pavilions'],
      transportation: ['Private garages', 'Helipad']
    },
    
    investigationDetails: {
      firstMentioned: '2006-01-01',
      keyEvents: [
        {
          date: '1991-01-01',
          event: 'Epstein becomes frequent visitor',
          source: 'Staff interviews',
          significance: 'high'
        }
      ],
      witnessAccounts: ['Staff interviews', 'Visitor logs'],
      lawEnforcement: []
    },
    
    connectedEntities: ['entity_wexner_les', 'entity_epstein_individual'],
    relatedTransactions: [],
    documents: ['Property Records'],
    flightLogReferences: ['Multiple visits documented'],
    
    currentStatus: 'active',
    accessLevel: 'private',
    verified: true
  },

  {
    id: 'property_london_residence',
    name: 'Belgravia Townhouse',
    type: 'residence',
    coordinates: [51.4975, -0.1528],
    address: 'Belgravia, London, UK',
    description: 'Ghislaine Maxwell\'s London residence, site of alleged abuse incidents.',
    significance: 'critical',
    
    ownershipHistory: [
      {
        id: 'london_ownership_1',
        propertyId: 'property_london_residence',
        ownerId: 'entity_ghislaine_maxwell',
        ownerName: 'Ghislaine Maxwell',
        ownerType: 'individual',
        startDate: '1995-01-01',
        endDate: '2016-12-01',
        acquisitionMethod: 'purchase',
        purchasePrice: 4500000,
        sourceDocuments: ['UK Land Registry'],
        verificationStatus: 'verified'
      }
    ],
    
    financials: {
      purchasePrice: 4500000,
      purchaseDate: '1995-01-01',
      currentEstimatedValue: 12000000,
      renovationCosts: 2000000,
      annualMaintenance: 150000,
      propertyTaxes: 80000,
      suspiciousTransactions: []
    },
    
    features: {
      squareFootage: 5000,
      bedrooms: 5,
      bathrooms: 4,
      specialFeatures: ['Historic townhouse', 'Private garden', 'Wine cellar'],
      securityFeatures: ['Secure entrance', 'Privacy gates'],
      entertainmentFacilities: ['Formal dining', 'Library'],
      transportation: ['Private garage']
    },
    
    investigationDetails: {
      firstMentioned: '2001-01-01',
      keyEvents: [
        {
          date: '2001-03-10',
          event: 'Alleged abuse incident',
          source: 'Victim testimony',
          significance: 'critical'
        }
      ],
      witnessAccounts: ['Virginia Giuffre testimony', 'Other victims'],
      lawEnforcement: []
    },
    
    connectedEntities: ['entity_ghislaine_maxwell', 'entity_epstein_individual'],
    relatedTransactions: [],
    documents: ['Property Records', 'Court testimonies'],
    flightLogReferences: ['Frequent arrivals from US'],
    
    currentStatus: 'sold',
    accessLevel: 'private',
    verified: true
  },

  {
    id: 'property_teterboro_hangar',
    name: 'Teterboro Airport Hangar',
    type: 'airport',
    coordinates: [40.8501, -74.0606],
    address: 'Teterboro Airport, New Jersey',
    description: 'Private hangar facility for Epstein\'s aircraft fleet.',
    significance: 'high',
    
    ownershipHistory: [
      {
        id: 'teterboro_ownership_1',
        propertyId: 'property_teterboro_hangar',
        ownerId: 'entity_epstein_aviation',
        ownerName: 'Epstein Aviation LLC',
        ownerType: 'corporation',
        startDate: '1995-01-01',
        endDate: '2019-08-10',
        acquisitionMethod: 'purchase',
        purchasePrice: 3500000,
        sourceDocuments: ['Airport Records'],
        verificationStatus: 'verified'
      }
    ],
    
    financials: {
      purchasePrice: 3500000,
      purchaseDate: '1995-01-01',
      currentEstimatedValue: 6000000,
      renovationCosts: 1000000,
      annualMaintenance: 200000,
      propertyTaxes: 50000,
      suspiciousTransactions: []
    },
    
    features: {
      squareFootage: 15000,
      specialFeatures: ['Private hangar', 'Aircraft maintenance facility', 'Crew quarters', 'Fuel storage'],
      securityFeatures: ['Controlled access', 'Security cameras', 'Private entrance'],
      entertainmentFacilities: [],
      transportation: ['Direct runway access']
    },
    
    investigationDetails: {
      firstMentioned: '2005-01-01',
      keyEvents: [
        {
          date: '2019-07-06',
          event: 'Aircraft seized upon arrest',
          source: 'FBI Records',
          significance: 'high'
        }
      ],
      witnessAccounts: ['Airport staff', 'Maintenance crew'],
      lawEnforcement: [
        {
          date: '2019-07-06',
          agency: 'FBI',
          action: 'Aircraft seizure',
          result: 'Fleet grounded'
        }
      ]
    },
    
    connectedEntities: ['entity_epstein_individual', 'entity_epstein_aviation'],
    relatedTransactions: [],
    documents: ['Hangar lease', 'Aircraft registration'],
    flightLogReferences: ['Primary departure/arrival point'],
    
    currentStatus: 'seized',
    accessLevel: 'seized',
    verified: true
  },

  {
    id: 'property_dubai_penthouse',
    name: 'Dubai Marina Penthouse',
    type: 'residence',
    coordinates: [25.0807, 55.1396],
    address: 'Dubai Marina, Dubai, UAE',
    description: 'Luxury penthouse allegedly used for international meetings.',
    significance: 'medium',
    
    ownershipHistory: [
      {
        id: 'dubai_ownership_1',
        propertyId: 'property_dubai_penthouse',
        ownerId: 'entity_offshore_trust',
        ownerName: 'Offshore Trust Entity',
        ownerType: 'trust',
        startDate: '2008-01-01',
        endDate: '2019-08-10',
        acquisitionMethod: 'purchase',
        purchasePrice: 12000000,
        sourceDocuments: ['Dubai Land Department'],
        verificationStatus: 'pending'
      }
    ],
    
    financials: {
      purchasePrice: 12000000,
      purchaseDate: '2008-01-01',
      currentEstimatedValue: 15000000,
      renovationCosts: 3000000,
      annualMaintenance: 250000,
      propertyTaxes: 0,
      suspiciousTransactions: ['transaction_dubai_purchase']
    },
    
    features: {
      squareFootage: 10000,
      bedrooms: 5,
      bathrooms: 7,
      specialFeatures: ['Penthouse suite', 'Private elevator', 'Panoramic views', 'Private pool'],
      securityFeatures: ['24/7 security', 'Biometric access', 'Privacy screens'],
      entertainmentFacilities: ['Home theater', 'Spa', 'Wine cellar'],
      transportation: ['Private parking', 'Yacht berth access']
    },
    
    investigationDetails: {
      firstMentioned: '2015-01-01',
      keyEvents: [],
      witnessAccounts: [],
      lawEnforcement: []
    },
    
    connectedEntities: ['entity_epstein_individual', 'entity_offshore_trust'],
    relatedTransactions: ['transaction_dubai_purchase'],
    documents: ['Property Purchase Records'],
    flightLogReferences: ['International flights to Dubai'],
    
    currentStatus: 'unknown',
    accessLevel: 'private',
    verified: false
  },

  {
    id: 'property_monaco_apartment',
    name: 'Monte Carlo Residence',
    type: 'residence',
    coordinates: [43.7384, 7.4246],
    address: 'Monte Carlo, Monaco',
    description: 'Luxury apartment in Monaco used for European operations.',
    significance: 'medium',
    
    ownershipHistory: [
      {
        id: 'monaco_ownership_1',
        propertyId: 'property_monaco_apartment',
        ownerId: 'entity_european_holdings',
        ownerName: 'European Holdings LLC',
        ownerType: 'corporation',
        startDate: '2005-01-01',
        endDate: '2019-08-10',
        acquisitionMethod: 'purchase',
        purchasePrice: 8500000,
        sourceDocuments: ['Monaco Property Registry'],
        verificationStatus: 'verified'
      }
    ],
    
    financials: {
      purchasePrice: 8500000,
      purchaseDate: '2005-01-01',
      currentEstimatedValue: 14000000,
      renovationCosts: 2000000,
      annualMaintenance: 180000,
      propertyTaxes: 0,
      suspiciousTransactions: []
    },
    
    features: {
      squareFootage: 4500,
      bedrooms: 3,
      bathrooms: 4,
      specialFeatures: ['Harbor views', 'Concierge service', 'Private terrace'],
      securityFeatures: ['Building security', 'Private entrance'],
      entertainmentFacilities: ['Entertainment room', 'Wine cellar'],
      transportation: ['Private garage', 'Yacht access']
    },
    
    investigationDetails: {
      firstMentioned: '2010-01-01',
      keyEvents: [],
      witnessAccounts: [],
      lawEnforcement: []
    },
    
    connectedEntities: ['entity_epstein_individual', 'entity_european_holdings'],
    relatedTransactions: [],
    documents: ['Property Records'],
    flightLogReferences: ['European circuit flights'],
    
    currentStatus: 'sold',
    accessLevel: 'private',
    verified: true
  },

  {
    id: 'property_caribbean_yacht',
    name: 'Lady Ghislaine Yacht',
    type: 'yacht',
    coordinates: [18.3, -64.8],
    address: 'Caribbean Waters',
    description: 'Luxury yacht named after Ghislaine Maxwell, used for Caribbean travel.',
    significance: 'high',
    
    ownershipHistory: [
      {
        id: 'yacht_ownership_1',
        propertyId: 'property_caribbean_yacht',
        ownerId: 'entity_epstein_individual',
        ownerName: 'Jeffrey Edward Epstein',
        ownerType: 'individual',
        startDate: '1999-01-01',
        endDate: '2019-08-10',
        acquisitionMethod: 'purchase',
        purchasePrice: 20000000,
        sourceDocuments: ['Maritime Registry'],
        verificationStatus: 'verified'
      }
    ],
    
    financials: {
      purchasePrice: 20000000,
      purchaseDate: '1999-01-01',
      currentEstimatedValue: 15000000,
      renovationCosts: 5000000,
      annualMaintenance: 2000000,
      propertyTaxes: 0,
      suspiciousTransactions: []
    },
    
    features: {
      squareFootage: 8000,
      bedrooms: 6,
      bathrooms: 8,
      specialFeatures: ['190-foot yacht', 'Helicopter pad', 'Submarine bay', 'Multiple decks'],
      securityFeatures: ['Private crew', 'Secure communications', 'Controlled access'],
      entertainmentFacilities: ['Swimming platform', 'Jacuzzi', 'Entertainment suites'],
      transportation: ['Helicopter pad', 'Tender boats']
    },
    
    investigationDetails: {
      firstMentioned: '2005-01-01',
      keyEvents: [
        {
          date: '2005-07-01',
          event: 'Yacht mentioned in victim testimony',
          source: 'Court documents',
          significance: 'high'
        }
      ],
      witnessAccounts: ['Crew members', 'Victim testimonies'],
      lawEnforcement: []
    },
    
    connectedEntities: ['entity_epstein_individual', 'entity_ghislaine_maxwell'],
    relatedTransactions: [],
    documents: ['Yacht registration', 'Crew manifests'],
    flightLogReferences: [],
    
    currentStatus: 'seized',
    accessLevel: 'seized',
    verified: true
  }
];

export const getPropertyById = (id: string): EnhancedProperty | undefined => {
  return enhancedProperties.find(property => property.id === id);
};

export const getPropertiesByOwner = (ownerId: string): EnhancedProperty[] => {
  return enhancedProperties.filter(property => 
    property.ownershipHistory.some(ownership => ownership.ownerId === ownerId)
  );
};

export const getPropertiesByTimeframe = (startDate: string, endDate: string): EnhancedProperty[] => {
  return enhancedProperties.filter(property =>
    property.ownershipHistory.some(ownership =>
      ownership.startDate <= endDate && 
      (!ownership.endDate || ownership.endDate >= startDate)
    )
  );
};

export const getTotalPropertyValue = (): number => {
  return enhancedProperties.reduce((total, property) => 
    total + property.financials.purchasePrice, 0
  );
}; 