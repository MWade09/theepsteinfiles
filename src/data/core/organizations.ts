export interface Organization {
  id: string;
  name: string;
  type: 'government' | 'media' | 'educational' | 'financial' | 'other' | 'corporation' | 'foundation';
  description: string;
  established?: string;
  currentStatus: 'active' | 'disbanded' | 'unknown';
  keyPersonnel?: string[];
  relatedPeople?: string[];
  significance: 'low' | 'medium' | 'high' | 'critical';
  tags: string[];
  lastUpdated: string;
}

export const coreOrganizations: Organization[] = [
  {
    id: 'great-saint-james',
    name: 'Great Saint James Island',
    type: 'other',
    description: 'Second island purchased by Jeffrey Epstein in the US Virgin Islands',
    established: '2016',
    currentStatus: 'unknown',
    relatedPeople: ['jeffrey-epstein'],
    significance: 'high',
    tags: ['property', 'island', 'virgin-islands', 'epstein-property'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'paris-apartment',
    name: 'Epstein Paris Apartment',
    type: 'other',
    description: 'Luxury apartment owned by Jeffrey Epstein in Paris, France',
    currentStatus: 'unknown',
    relatedPeople: ['jeffrey-epstein'],
    significance: 'medium',
    tags: ['property', 'apartment', 'paris', 'epstein-property'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'harvard-university',
    name: 'Harvard University',
    type: 'educational',
    description: 'Prestigious university that received donations from Jeffrey Epstein',
    established: '1636',
    currentStatus: 'active',
    relatedPeople: ['jeffrey-epstein'],
    significance: 'medium',
    tags: ['university', 'education', 'donations', 'cambridge'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'mit',
    name: 'Massachusetts Institute of Technology',
    type: 'educational',
    description: 'Prestigious technical university that received funding from Jeffrey Epstein',
    established: '1861',
    currentStatus: 'active',
    relatedPeople: ['jeffrey-epstein', 'ito_joi'],
    significance: 'medium',
    tags: ['university', 'technology', 'research', 'funding'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'zorro-ranch',
    name: 'Zorro Ranch',
    type: 'other',
    description: 'Large ranch property owned by Jeffrey Epstein in New Mexico',
    currentStatus: 'unknown',
    relatedPeople: ['jeffrey-epstein'],
    significance: 'high',
    tags: ['property', 'ranch', 'new-mexico', 'epstein-property'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'fbi',
    name: 'Federal Bureau of Investigation',
    type: 'government',
    description: 'Primary federal law enforcement agency investigating Jeffrey Epstein',
    established: '1908',
    currentStatus: 'active',
    relatedPeople: ['jeffrey-epstein'],
    significance: 'critical',
    tags: ['law-enforcement', 'federal', 'investigation'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'palm-beach-police',
    name: 'Palm Beach Police Department',
    type: 'government',
    description: 'Local police department that first investigated Jeffrey Epstein',
    currentStatus: 'active',
    relatedPeople: ['jeffrey-epstein'],
    significance: 'high',
    tags: ['law-enforcement', 'local', 'florida', 'investigation'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'us-attorney-sdfl',
    name: 'US Attorney Southern District of Florida',
    type: 'government',
    description: 'Federal prosecutor office that handled Epstein\'s 2008 plea deal',
    currentStatus: 'active',
    keyPersonnel: ['alexander-acosta'],
    relatedPeople: ['jeffrey-epstein', 'acosta_alexander'],
    significance: 'critical',
    tags: ['prosecutor', 'federal', 'plea-deal', 'florida'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'judge-kenneth-marra',
    name: 'Judge Kenneth Marra',
    type: 'government',
    description: 'Federal judge who ruled on Epstein plea deal violations',
    currentStatus: 'active',
    relatedPeople: ['jeffrey-epstein'],
    significance: 'high',
    tags: ['judge', 'federal', 'plea-deal', 'ruling'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'miami-herald',
    name: 'Miami Herald',
    type: 'media',
    description: 'Newspaper that broke the story exposing Epstein\'s plea deal',
    established: '1903',
    currentStatus: 'active',
    keyPersonnel: ['julie-brown'],
    relatedPeople: ['jeffrey-epstein'],
    significance: 'critical',
    tags: ['media', 'newspaper', 'investigation', 'reporting'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'teterboro-airport',
    name: 'Teterboro Airport',
    type: 'other',
    description: 'Private airport frequently used by Jeffrey Epstein for private flights',
    currentStatus: 'active',
    relatedPeople: ['jeffrey-epstein'],
    significance: 'medium',
    tags: ['airport', 'private-aviation', 'travel', 'new-jersey'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'sdny',
    name: 'Southern District of New York',
    type: 'government',
    description: 'Federal prosecutor office that brought 2019 charges against Epstein',
    currentStatus: 'active',
    relatedPeople: ['jeffrey-epstein'],
    significance: 'critical',
    tags: ['prosecutor', 'federal', 'charges', 'new-york'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'judge-richard-berman',
    name: 'Judge Richard Berman',
    type: 'government',
    description: 'Federal judge overseeing Epstein\'s 2019 criminal case',
    currentStatus: 'active',
    relatedPeople: ['jeffrey-epstein'],
    significance: 'high',
    tags: ['judge', 'federal', 'criminal-case', 'new-york'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'mcc-nyc',
    name: 'Metropolitan Correctional Center New York',
    type: 'government',
    description: 'Federal prison where Jeffrey Epstein died in custody',
    currentStatus: 'active',
    relatedPeople: ['jeffrey-epstein'],
    significance: 'critical',
    tags: ['prison', 'federal', 'custody', 'death'],
    lastUpdated: '2024-01-15T00:00:00Z'
  }
];

export const getOrganization = (id: string): Organization | undefined => {
  return coreOrganizations.find(org => org.id === id);
};

export const getOrganizationsByType = (type: Organization['type']): Organization[] => {
  return coreOrganizations.filter(org => org.type === type);
};

export const getOrganizationsBySignificance = (significance: Organization['significance']): Organization[] => {
  return coreOrganizations.filter(org => org.significance === significance);
};
