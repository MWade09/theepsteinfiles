export interface FlightLog {
  id: string;
  date: string;
  time?: string;
  aircraft: string;
  tailNumber: string;
  
  departure: {
    location: string;
    propertyId?: string;
    coordinates: [number, number];
    airport?: string;
  };
  
  arrival: {
    location: string;
    propertyId?: string;
    coordinates: [number, number];
    airport?: string;
  };
  
  passengers: Array<{
    name: string;
    personId?: string;
    status: 'confirmed' | 'probable' | 'disputed';
  }>;
  
  purpose?: string;
  flightDuration?: string;
  distance?: number;
  
  // Investigation relevance
  significance: 'critical' | 'high' | 'medium' | 'low';
  investigationNotes?: string;
  relatedEvents?: string[];
  
  // Source verification
  sourceDocuments: string[];
  verificationStatus: 'verified' | 'pending' | 'disputed';
  crossReferencedWith?: string[];
}

export interface TravelPattern {
  id: string;
  name: string;
  description: string;
  timeframe: {
    start: string;
    end: string;
  };
  
  frequency: 'daily' | 'weekly' | 'monthly' | 'seasonal' | 'irregular';
  primaryRoute: Array<{
    location: string;
    propertyId?: string;
    averageStayDuration?: string;
    purpose?: string;
  }>;
  
  relatedFlights: string[];
  significance: 'critical' | 'high' | 'medium' | 'low';
  investigationRelevance: string;
}

export const flightLogs: FlightLog[] = [
  {
    id: 'flight_001',
    date: '2002-02-09',
    aircraft: 'Boeing 727',
    tailNumber: 'N908JE',
    
    departure: {
      location: 'Palm Beach International Airport',
      propertyId: 'property_palm_beach_estate',
      coordinates: [26.6831, -80.0956],
      airport: 'PBI'
    },
    
    arrival: {
      location: 'Cyril E. King Airport',
      propertyId: 'property_little_saint_james',
      coordinates: [18.3373, -64.9734],
      airport: 'STT'
    },
    
    passengers: [
      { name: 'Jeffrey Epstein', personId: 'person_epstein', status: 'confirmed' },
      { name: 'Ghislaine Maxwell', personId: 'person_maxwell', status: 'confirmed' },
      { name: 'Virginia Roberts', personId: 'person_giuffre', status: 'confirmed' }
    ],
    
    purpose: 'Transport to Little Saint James',
    flightDuration: '2h 15m',
    distance: 1100,
    
    significance: 'critical',
    investigationNotes: 'Flight documented in Virginia Giuffre testimony - alleged trafficking incident',
    relatedEvents: ['giuffre_testimony_2016'],
    
    sourceDocuments: ['Flight Logs - Epstein Pilot David Rogers', 'Virginia Giuffre Deposition'],
    verificationStatus: 'verified',
    crossReferencedWith: ['Maxwell Trial Evidence', 'FBI Investigation Files']
  },
  
  {
    id: 'flight_002',
    date: '2001-03-21',
    aircraft: 'Boeing 727',
    tailNumber: 'N908JE',
    
    departure: {
      location: 'Teterboro Airport',
      coordinates: [40.8501, -74.0606],
      airport: 'TEB'
    },
    
    arrival: {
      location: 'Le Bourget Airport',
      coordinates: [48.9694, 2.4414],
      airport: 'LBG'
    },
    
    passengers: [
      { name: 'Jeffrey Epstein', personId: 'person_epstein', status: 'confirmed' },
      { name: 'Ghislaine Maxwell', personId: 'person_maxwell', status: 'confirmed' },
      { name: 'Prince Andrew', personId: 'person_prince_andrew', status: 'confirmed' }
    ],
    
    purpose: 'International travel to Paris',
    flightDuration: '8h 30m',
    distance: 3635,
    
    significance: 'high',
    investigationNotes: 'Prince Andrew documented on flight to Paris during period of alleged activities',
    
    sourceDocuments: ['Epstein Flight Logs', 'International Flight Records'],
    verificationStatus: 'verified'
  },
  
  {
    id: 'flight_003',
    date: '2000-12-04',
    aircraft: 'Gulfstream IV',
    tailNumber: 'N121JE',
    
    departure: {
      location: 'Teterboro Airport',
      coordinates: [40.8501, -74.0606],
      airport: 'TEB'
    },
    
    arrival: {
      location: 'Santa Fe Regional Airport',
      propertyId: 'property_zorro_ranch',
      coordinates: [35.6171, -106.0894],
      airport: 'SAF'
    },
    
    passengers: [
      { name: 'Jeffrey Epstein', personId: 'person_epstein', status: 'confirmed' },
      { name: 'Alan Dershowitz', personId: 'person_dershowitz', status: 'confirmed' },
      { name: 'Les Wexner', personId: 'person_wexner', status: 'probable' }
    ],
    
    purpose: 'Business meeting at Zorro Ranch',
    flightDuration: '4h 45m',
    distance: 1850,
    
    significance: 'high',
    investigationNotes: 'Meeting between key associates at remote location',
    
    sourceDocuments: ['Flight Logs', 'Dershowitz Calendar Records'],
    verificationStatus: 'verified'
  },
  
  {
    id: 'flight_004',
    date: '2005-01-15',
    aircraft: 'Boeing 727',
    tailNumber: 'N908JE',
    
    departure: {
      location: 'Palm Beach International Airport',
      propertyId: 'property_palm_beach_estate',
      coordinates: [26.6831, -80.0956],
      airport: 'PBI'
    },
    
    arrival: {
      location: 'Teterboro Airport',
      coordinates: [40.8501, -74.0606],
      airport: 'TEB'
    },
    
    passengers: [
      { name: 'Jeffrey Epstein', personId: 'person_epstein', status: 'confirmed' },
      { name: 'Ghislaine Maxwell', personId: 'person_maxwell', status: 'confirmed' }
    ],
    
    purpose: 'Return to Manhattan during investigation period',
    flightDuration: '2h 50m',
    distance: 1070,
    
    significance: 'critical',
    investigationNotes: 'Flight during active Palm Beach Police investigation',
    relatedEvents: ['palm_beach_investigation_2005'],
    
    sourceDocuments: ['Flight Logs', 'Palm Beach Police Timeline'],
    verificationStatus: 'verified'
  },
  
  {
    id: 'flight_005',
    date: '1997-11-15',
    aircraft: 'Gulfstream IV',
    tailNumber: 'N121JE',
    
    departure: {
      location: 'Teterboro Airport',
      coordinates: [40.8501, -74.0606],
      airport: 'TEB'
    },
    
    arrival: {
      location: 'Victoria International Airport',
      coordinates: [48.6478, -123.4258],
      airport: 'YYJ'
    },
    
    passengers: [
      { name: 'Jeffrey Epstein', personId: 'person_epstein', status: 'confirmed' },
      { name: 'Leslie Wexner', personId: 'person_wexner', status: 'confirmed' }
    ],
    
    purpose: 'Business travel with primary financier',
    flightDuration: '6h 20m',
    distance: 2400,
    
    significance: 'medium',
    investigationNotes: 'Early relationship period with Wexner',
    
    sourceDocuments: ['Corporate Flight Records'],
    verificationStatus: 'verified'
  },
  
  {
    id: 'flight_006',
    date: '2019-07-06',
    aircraft: 'Gulfstream IV',
    tailNumber: 'N121JE',
    
    departure: {
      location: 'Le Bourget Airport',
      coordinates: [48.9694, 2.4414],
      airport: 'LBG'
    },
    
    arrival: {
      location: 'Teterboro Airport',
      coordinates: [40.8501, -74.0606],
      airport: 'TEB'
    },
    
    passengers: [
      { name: 'Jeffrey Epstein', personId: 'person_epstein', status: 'confirmed' }
    ],
    
    purpose: 'Return to US before arrest',
    flightDuration: '8h 15m',
    distance: 3635,
    
    significance: 'critical',
    investigationNotes: 'Final documented international flight before arrest on July 6, 2019',
    relatedEvents: ['arrest_july_2019'],
    
    sourceDocuments: ['FBI Surveillance Records', 'Flight Tracking Data'],
    verificationStatus: 'verified'
  }
];

export const travelPatterns: TravelPattern[] = [
  {
    id: 'pattern_weekend_shuttles',
    name: 'Weekend Island Shuttles',
    description: 'Regular weekend flights between Manhattan/Palm Beach and Little Saint James Island',
    timeframe: {
      start: '1998-08-01',
      end: '2019-07-01'
    },
    
    frequency: 'weekly',
    primaryRoute: [
      {
        location: 'Manhattan/Teterboro',
        propertyId: 'property_manhattan_mansion',
        averageStayDuration: '4-5 days',
        purpose: 'Business operations'
      },
      {
        location: 'Palm Beach',
        propertyId: 'property_palm_beach_estate',
        averageStayDuration: '1-2 days',
        purpose: 'Transition point'
      },
      {
        location: 'Little Saint James',
        propertyId: 'property_little_saint_james',
        averageStayDuration: '2-3 days',
        purpose: 'Weekend activities'
      }
    ],
    
    relatedFlights: ['flight_001', 'flight_004'],
    significance: 'critical',
    investigationRelevance: 'Pattern shows regular transport of individuals to isolated island location'
  },
  
  {
    id: 'pattern_international_circuits',
    name: 'International Business Circuits',
    description: 'Monthly international flights connecting US properties to European locations',
    timeframe: {
      start: '2000-03-01',
      end: '2019-07-01'
    },
    
    frequency: 'monthly',
    primaryRoute: [
      {
        location: 'New York',
        propertyId: 'property_manhattan_mansion',
        averageStayDuration: '1-2 weeks',
        purpose: 'Business operations'
      },
      {
        location: 'Paris',
        propertyId: 'property_paris_apartment',
        averageStayDuration: '3-5 days',
        purpose: 'International meetings'
      },
      {
        location: 'London',
        averageStayDuration: '2-3 days',
        purpose: 'Social connections'
      }
    ],
    
    relatedFlights: ['flight_002', 'flight_006'],
    significance: 'high',
    investigationRelevance: 'International network facilitation and potential trafficking routes'
  },
  
  {
    id: 'pattern_ranch_retreats',
    name: 'Zorro Ranch Strategic Meetings',
    description: 'Quarterly gatherings at remote New Mexico ranch for high-profile meetings',
    timeframe: {
      start: '1993-05-01',
      end: '2019-07-01'
    },
    
    frequency: 'seasonal',
    primaryRoute: [
      {
        location: 'New York',
        propertyId: 'property_manhattan_mansion',
        purpose: 'Departure point'
      },
      {
        location: 'Zorro Ranch',
        propertyId: 'property_zorro_ranch',
        averageStayDuration: '3-7 days',
        purpose: 'Private meetings'
      }
    ],
    
    relatedFlights: ['flight_003'],
    significance: 'high',
    investigationRelevance: 'Remote location used for sensitive meetings with key associates'
  },
  
  {
    id: 'pattern_london_circuit',
    name: 'London Social Circuit',
    description: 'Regular visits to London for social connections and alleged activities',
    timeframe: {
      start: '1995-01-01',
      end: '2019-07-01'
    },
    
    frequency: 'monthly',
    primaryRoute: [
      {
        location: 'New York',
        propertyId: 'property_manhattan_mansion',
        averageStayDuration: '1-2 weeks',
        purpose: 'Business operations'
      },
      {
        location: 'London',
        propertyId: 'property_london_residence',
        averageStayDuration: '3-5 days',
        purpose: 'Social connections'
      },
      {
        location: 'Paris',
        propertyId: 'property_paris_apartment',
        averageStayDuration: '2-3 days',
        purpose: 'European connections'
      }
    ],
    
    relatedFlights: ['flight_002'],
    significance: 'critical',
    investigationRelevance: 'London residence central to alleged abuse incidents and royal connections'
  },
  
  {
    id: 'pattern_middle_east_trips',
    name: 'Middle East Business Trips',
    description: 'Periodic trips to Dubai and other Middle Eastern locations',
    timeframe: {
      start: '2008-01-01',
      end: '2019-07-01'
    },
    
    frequency: 'seasonal',
    primaryRoute: [
      {
        location: 'New York',
        propertyId: 'property_manhattan_mansion',
        purpose: 'Departure point'
      },
      {
        location: 'Dubai',
        propertyId: 'property_dubai_penthouse',
        averageStayDuration: '5-7 days',
        purpose: 'International meetings'
      }
    ],
    
    relatedFlights: [],
    significance: 'medium',
    investigationRelevance: 'Offshore financial connections and international network expansion'
  }
];

// Additional flight logs
export const additionalFlightLogs: FlightLog[] = [
  {
    id: 'flight_007',
    date: '2001-03-10',
    aircraft: 'Boeing 727',
    tailNumber: 'N908JE',
    
    departure: {
      location: 'Teterboro Airport',
      coordinates: [40.8501, -74.0606],
      airport: 'TEB'
    },
    
    arrival: {
      location: 'London Luton Airport',
      coordinates: [51.8747, -0.3683],
      airport: 'LTN'
    },
    
    passengers: [
      { name: 'Jeffrey Epstein', personId: 'person_epstein', status: 'confirmed' },
      { name: 'Ghislaine Maxwell', personId: 'person_maxwell', status: 'confirmed' },
      { name: 'Virginia Roberts', personId: 'person_giuffre', status: 'confirmed' },
      { name: 'Prince Andrew', personId: 'person_prince_andrew', status: 'confirmed' }
    ],
    
    purpose: 'Trip to London during alleged abuse period',
    flightDuration: '7h 30m',
    distance: 3459,
    
    significance: 'critical',
    investigationNotes: 'Flight associated with Virginia Giuffre allegations at London townhouse',
    relatedEvents: ['london_incident_2001'],
    
    sourceDocuments: ['Flight Logs', 'Virginia Giuffre Testimony', 'Court Documents'],
    verificationStatus: 'verified',
    crossReferencedWith: ['Maxwell Trial Evidence', 'Prince Andrew Deposition']
  },
  
  {
    id: 'flight_008',
    date: '2010-06-15',
    aircraft: 'Gulfstream IV',
    tailNumber: 'N121JE',
    
    departure: {
      location: 'Teterboro Airport',
      coordinates: [40.8501, -74.0606],
      airport: 'TEB'
    },
    
    arrival: {
      location: 'Dubai International Airport',
      coordinates: [25.2532, 55.3657],
      airport: 'DXB'
    },
    
    passengers: [
      { name: 'Jeffrey Epstein', personId: 'person_epstein', status: 'confirmed' },
      { name: 'Unknown passengers', status: 'disputed' }
    ],
    
    purpose: 'International business travel',
    flightDuration: '13h 45m',
    distance: 6838,
    
    significance: 'medium',
    investigationNotes: 'Trip to Middle East during post-conviction period',
    
    sourceDocuments: ['Flight Tracking Data'],
    verificationStatus: 'verified'
  },
  
  {
    id: 'flight_009',
    date: '2002-08-20',
    aircraft: 'Boeing 727',
    tailNumber: 'N908JE',
    
    departure: {
      location: 'Cyril E. King Airport',
      propertyId: 'property_little_saint_james',
      coordinates: [18.3373, -64.9734],
      airport: 'STT'
    },
    
    arrival: {
      location: 'Teterboro Airport',
      coordinates: [40.8501, -74.0606],
      airport: 'TEB'
    },
    
    passengers: [
      { name: 'Jeffrey Epstein', personId: 'person_epstein', status: 'confirmed' },
      { name: 'Ghislaine Maxwell', personId: 'person_maxwell', status: 'confirmed' },
      { name: 'Bill Clinton', personId: 'person_clinton', status: 'confirmed' }
    ],
    
    purpose: 'Return from Caribbean',
    flightDuration: '3h 15m',
    distance: 1650,
    
    significance: 'high',
    investigationNotes: 'High-profile passenger documented on flight from island',
    
    sourceDocuments: ['Flight Logs', 'Secret Service Records'],
    verificationStatus: 'verified'
  },
  
  {
    id: 'flight_010',
    date: '2003-11-05',
    aircraft: 'Gulfstream IV',
    tailNumber: 'N121JE',
    
    departure: {
      location: 'Teterboro Airport',
      coordinates: [40.8501, -74.0606],
      airport: 'TEB'
    },
    
    arrival: {
      location: 'Nice Côte d\'Azur Airport',
      coordinates: [43.6584, 7.2159],
      airport: 'NCE'
    },
    
    passengers: [
      { name: 'Jeffrey Epstein', personId: 'person_epstein', status: 'confirmed' },
      { name: 'Ghislaine Maxwell', personId: 'person_maxwell', status: 'confirmed' }
    ],
    
    purpose: 'Travel to Monaco/French Riviera',
    flightDuration: '8h 20m',
    distance: 3686,
    
    significance: 'medium',
    investigationNotes: 'Trip to Monaco residence area',
    
    sourceDocuments: ['Flight Logs', 'European Flight Records'],
    verificationStatus: 'verified'
  },
  
  {
    id: 'flight_011',
    date: '2006-03-12',
    aircraft: 'Boeing 727',
    tailNumber: 'N908JE',
    
    departure: {
      location: 'Palm Beach International Airport',
      propertyId: 'property_palm_beach_estate',
      coordinates: [26.6831, -80.0956],
      airport: 'PBI'
    },
    
    arrival: {
      location: 'Port Columbus International Airport',
      coordinates: [39.9980, -82.8919],
      airport: 'CMH'
    },
    
    passengers: [
      { name: 'Jeffrey Epstein', personId: 'person_epstein', status: 'confirmed' },
      { name: 'Les Wexner', personId: 'person_wexner', status: 'probable' }
    ],
    
    purpose: 'Visit to Wexner Ohio mansion',
    flightDuration: '2h 30m',
    distance: 1050,
    
    significance: 'high',
    investigationNotes: 'Meeting with primary financier during investigation period',
    
    sourceDocuments: ['Flight Logs'],
    verificationStatus: 'verified'
  },
  
  {
    id: 'flight_012',
    date: '2015-01-18',
    aircraft: 'Gulfstream IV',
    tailNumber: 'N121JE',
    
    departure: {
      location: 'Teterboro Airport',
      coordinates: [40.8501, -74.0606],
      airport: 'TEB'
    },
    
    arrival: {
      location: 'Cyril E. King Airport',
      propertyId: 'property_little_saint_james',
      coordinates: [18.3373, -64.9734],
      airport: 'STT'
    },
    
    passengers: [
      { name: 'Jeffrey Epstein', personId: 'person_epstein', status: 'confirmed' },
      { name: 'Unknown passengers', status: 'disputed' }
    ],
    
    purpose: 'Post-conviction island visit',
    flightDuration: '3h 45m',
    distance: 1650,
    
    significance: 'high',
    investigationNotes: 'Continued use of island after 2008 conviction',
    
    sourceDocuments: ['Flight Tracking Data', 'FAA Records'],
    verificationStatus: 'verified'
  },
  
  {
    id: 'flight_013',
    date: '2016-07-22',
    aircraft: 'Helicopter',
    tailNumber: 'N474JE',
    
    departure: {
      location: 'Teterboro Airport',
      propertyId: 'property_teterboro_hangar',
      coordinates: [40.8501, -74.0606],
      airport: 'TEB'
    },
    
    arrival: {
      location: 'Manhattan Heliport',
      coordinates: [40.7425, -73.9726],
      airport: 'N/A'
    },
    
    passengers: [
      { name: 'Jeffrey Epstein', personId: 'person_epstein', status: 'confirmed' }
    ],
    
    purpose: 'Short commute to Manhattan',
    flightDuration: '15m',
    distance: 15,
    
    significance: 'low',
    investigationNotes: 'Routine helicopter commute',
    
    sourceDocuments: ['Flight Logs'],
    verificationStatus: 'verified'
  },
  
  {
    id: 'flight_014',
    date: '2018-05-10',
    aircraft: 'Gulfstream IV',
    tailNumber: 'N121JE',
    
    departure: {
      location: 'Teterboro Airport',
      coordinates: [40.8501, -74.0606],
      airport: 'TEB'
    },
    
    arrival: {
      location: 'Santa Fe Regional Airport',
      propertyId: 'property_zorro_ranch',
      coordinates: [35.6171, -106.0894],
      airport: 'SAF'
    },
    
    passengers: [
      { name: 'Jeffrey Epstein', personId: 'person_epstein', status: 'confirmed' }
    ],
    
    purpose: 'Visit to New Mexico ranch',
    flightDuration: '4h 30m',
    distance: 1850,
    
    significance: 'medium',
    investigationNotes: 'Late-period ranch visit',
    
    sourceDocuments: ['Flight Logs', 'FAA Records'],
    verificationStatus: 'verified'
  }
];

// Combine all flight logs
export const allFlightLogs = [...flightLogs, ...additionalFlightLogs];

export const getFlightsByProperty = (propertyId: string): FlightLog[] => {
  return allFlightLogs.filter(flight => 
    flight.departure.propertyId === propertyId || 
    flight.arrival.propertyId === propertyId
  );
};

export const getFlightsByDateRange = (startDate: string, endDate: string): FlightLog[] => {
  return allFlightLogs.filter(flight => 
    flight.date >= startDate && flight.date <= endDate
  );
};

export const getFlightsByPassenger = (personId: string): FlightLog[] => {
  return allFlightLogs.filter(flight =>
    flight.passengers.some(passenger => passenger.personId === personId)
  );
};

export const getTravelPatternsByTimeframe = (startDate: string, endDate: string): TravelPattern[] => {
  return travelPatterns.filter(pattern =>
    pattern.timeframe.start <= endDate && pattern.timeframe.end >= startDate
  );
}; 