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
  }
];

export const getFlightsByProperty = (propertyId: string): FlightLog[] => {
  return flightLogs.filter(flight => 
    flight.departure.propertyId === propertyId || 
    flight.arrival.propertyId === propertyId
  );
};

export const getFlightsByDateRange = (startDate: string, endDate: string): FlightLog[] => {
  return flightLogs.filter(flight => 
    flight.date >= startDate && flight.date <= endDate
  );
};

export const getFlightsByPassenger = (personId: string): FlightLog[] => {
  return flightLogs.filter(flight =>
    flight.passengers.some(passenger => passenger.personId === personId)
  );
};

export const getTravelPatternsByTimeframe = (startDate: string, endDate: string): TravelPattern[] => {
  return travelPatterns.filter(pattern =>
    pattern.timeframe.start <= endDate && pattern.timeframe.end >= startDate
  );
}; 