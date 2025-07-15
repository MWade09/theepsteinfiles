import { Relationship } from '@/types/investigation';

export const coreRelationships: Relationship[] = [
  {
    id: 'epstein-maxwell-association',
    type: 'personal',
    subtype: 'romantic-business-partner',
    entity1Id: 'jeffrey-epstein',
    entity1Type: 'person',
    entity2Id: 'ghislaine-maxwell',
    entity2Type: 'person',
    startDate: '1990-01-01',
    endDate: '2019-08-10',
    description: 'Long-term personal and business association. Maxwell allegedly recruited victims and managed Epstein\'s properties and staff.',
    strength: 'strong',
    significance: 'critical',
    verificationStatus: 'verified',
    sources: [
      {
        id: 'maxwell-trial-testimony',
        title: 'Testimony at Maxwell Trial',
        type: 'court_document',
        author: 'Multiple witnesses',
        publication: 'U.S. District Court SDNY',
        publicationDate: '2021-12-01',
        reliability: 'high',
        description: 'Court testimony detailing Epstein-Maxwell relationship',
        tags: ['testimony', 'relationship', 'trial']
      }
    ],
    tags: ['key-relationship', 'accomplice', 'long-term', 'criminal-conspiracy'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'epstein-wexner-financial',
    type: 'financial',
    subtype: 'money-manager-client',
    entity1Id: 'jeffrey-epstein',
    entity1Type: 'person',
    entity2Id: 'les-wexner',
    entity2Type: 'person',
    startDate: '1987-06-01',
    endDate: '2007-01-01',
    description: 'Epstein served as Wexner\'s exclusive money manager and held power of attorney over his financial affairs.',
    strength: 'strong',
    significance: 'critical',
    verificationStatus: 'verified',
    sources: [
      {
        id: 'wexner-financial-records',
        title: 'Financial Transaction Records - Wexner/Epstein',
        type: 'financial_record',
        author: 'Banking institutions',
        publication: 'Court filings',
        publicationDate: '2019-08-01',
        reliability: 'high',
        description: 'Banking records showing extensive financial relationship',
        tags: ['financial', 'banking', 'power-attorney']
      }
    ],
    tags: ['financial-relationship', 'power-attorney', 'wealth-source', 'billionaire-client'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'epstein-giuffre-victim',
    type: 'legal',
    subtype: 'perpetrator-victim',
    entity1Id: 'jeffrey-epstein',
    entity1Type: 'person',
    entity2Id: 'virginia-giuffre',
    entity2Type: 'person',
    startDate: '2000-01-01',
    endDate: '2002-01-01',
    description: 'Giuffre alleges she was recruited by Maxwell and trafficked by Epstein as a minor.',
    strength: 'strong',
    significance: 'critical',
    verificationStatus: 'verified',
    sources: [
      {
        id: 'giuffre-civil-complaint',
        title: 'Civil Complaint - Virginia Giuffre v. Jeffrey Epstein',
        type: 'court_document',
        author: 'Virginia Giuffre',
        publication: 'Federal Court',
        publicationDate: '2015-12-30',
        reliability: 'high',
        description: 'Detailed civil complaint alleging trafficking',
        tags: ['civil-complaint', 'trafficking', 'allegations']
      }
    ],
    tags: ['victim-relationship', 'trafficking', 'abuse', 'minor'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'maxwell-giuffre-recruitment',
    type: 'legal',
    subtype: 'recruiter-victim',
    entity1Id: 'ghislaine-maxwell',
    entity1Type: 'person',
    entity2Id: 'virginia-giuffre',
    entity2Type: 'person',
    startDate: '2000-01-01',
    endDate: '2002-01-01',
    description: 'Maxwell allegedly recruited Giuffre at Mar-a-Lago when she was 16 years old.',
    strength: 'strong',
    significance: 'critical',
    verificationStatus: 'verified',
    sources: [
      {
        id: 'giuffre-maxwell-testimony',
        title: 'Virginia Giuffre Deposition Testimony',
        type: 'court_document',
        author: 'Virginia Giuffre',
        publication: 'Federal Court',
        publicationDate: '2016-05-03',
        reliability: 'high',
        description: 'Sworn testimony detailing recruitment by Maxwell',
        tags: ['deposition', 'recruitment', 'testimony']
      }
    ],
    tags: ['recruitment', 'trafficking', 'accomplice', 'mar-a-lago'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'epstein-prince-andrew-association',
    type: 'personal',
    subtype: 'social-associate',
    entity1Id: 'jeffrey-epstein',
    entity1Type: 'person',
    entity2Id: 'prince-andrew',
    entity2Type: 'person',
    startDate: '1999-01-01',
    endDate: '2019-08-10',
    description: 'Long-term social relationship. Prince Andrew was a frequent guest at Epstein properties.',
    strength: 'moderate',
    significance: 'high',
    verificationStatus: 'verified',
    sources: [
      {
        id: 'flight-logs-prince-andrew',
        title: 'Flight Logs - Epstein Private Jet',
        type: 'financial_record',
        author: 'Flight crew',
        publication: 'Court evidence',
        publicationDate: '2019-08-01',
        reliability: 'high',
        description: 'Flight manifests showing Prince Andrew as passenger',
        tags: ['flight-logs', 'travel', 'association']
      }
    ],
    tags: ['royal-connection', 'social-associate', 'controversial', 'frequent-guest'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'giuffre-prince-andrew-allegations',
    type: 'legal',
    subtype: 'accuser-accused',
    entity1Id: 'virginia-giuffre',
    entity1Type: 'person',
    entity2Id: 'prince-andrew',
    entity2Type: 'person',
    startDate: '2001-03-01',
    endDate: '2001-03-01',
    description: 'Giuffre alleges Prince Andrew sexually abused her when she was 17 at Maxwell\'s London home.',
    strength: 'strong',
    significance: 'high',
    verificationStatus: 'disputed',
    sources: [
      {
        id: 'giuffre-prince-andrew-complaint',
        title: 'Civil Complaint - Virginia Giuffre v. Prince Andrew',
        type: 'court_document',
        author: 'Virginia Giuffre',
        publication: 'U.S. District Court SDNY',
        publicationDate: '2021-08-09',
        reliability: 'high',
        description: 'Civil complaint alleging sexual abuse by Prince Andrew',
        tags: ['civil-complaint', 'sexual-abuse', 'allegations']
      }
    ],
    tags: ['sexual-abuse-allegations', 'royal', 'civil-case', 'settlement'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'epstein-dershowitz-legal',
    type: 'professional',
    subtype: 'client-attorney',
    entity1Id: 'jeffrey-epstein',
    entity1Type: 'person',
    entity2Id: 'alan-dershowitz',
    entity2Type: 'person',
    startDate: '2007-01-01',
    endDate: '2008-12-31',
    description: 'Dershowitz served on Epstein\'s legal defense team during the 2008 plea negotiations.',
    strength: 'strong',
    significance: 'high',
    verificationStatus: 'verified',
    sources: [
      {
        id: 'dershowitz-legal-representation',
        title: 'Legal Representation Records - Epstein Defense Team',
        type: 'court_document',
        author: 'Federal Court',
        publication: 'Southern District of Florida',
        publicationDate: '2008-06-30',
        reliability: 'high',
        description: 'Court records showing Dershowitz as defense counsel',
        tags: ['legal-representation', 'defense-team', 'plea-deal']
      }
    ],
    tags: ['legal-representation', 'defense-attorney', 'plea-deal', 'harvard'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'giuffre-dershowitz-allegations',
    type: 'legal',
    subtype: 'accuser-accused',
    entity1Id: 'virginia-giuffre',
    entity1Type: 'person',
    entity2Id: 'alan-dershowitz',
    entity2Type: 'person',
    startDate: '2014-12-30',
    endDate: '2014-12-30',
    description: 'Giuffre alleges Dershowitz sexually abused her as part of Epstein\'s trafficking network.',
    strength: 'moderate',
    significance: 'high',
    verificationStatus: 'disputed',
    sources: [
      {
        id: 'giuffre-dershowitz-allegations-doc',
        title: 'Allegations Against Alan Dershowitz',
        type: 'court_document',
        author: 'Virginia Giuffre',
        publication: 'Federal Court',
        publicationDate: '2014-12-30',
        reliability: 'medium',
        description: 'Court filing containing allegations against Dershowitz',
        tags: ['allegations', 'sexual-abuse', 'disputed']
      }
    ],
    tags: ['sexual-abuse-allegations', 'disputed', 'defamation-suits', 'controversial'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'epstein-acosta-prosecution',
    type: 'legal',
    subtype: 'defendant-prosecutor',
    entity1Id: 'jeffrey-epstein',
    entity1Type: 'person',
    entity2Id: 'alexander-acosta',
    entity2Type: 'person',
    startDate: '2007-01-01',
    endDate: '2008-06-30',
    description: 'Acosta, as U.S. Attorney, negotiated the controversial non-prosecution agreement with Epstein.',
    strength: 'strong',
    significance: 'critical',
    verificationStatus: 'verified',
    sources: [
      {
        id: 'acosta-npa-document',
        title: 'Non-Prosecution Agreement - Acosta/Epstein',
        type: 'court_document',
        author: 'Alexander Acosta',
        publication: 'U.S. Attorney SDFL',
        publicationDate: '2008-06-30',
        reliability: 'high',
        description: 'Official non-prosecution agreement signed by Acosta',
        tags: ['npa', 'plea-deal', 'prosecution']
      }
    ],
    tags: ['prosecution', 'plea-deal', 'controversial', 'non-prosecution-agreement'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'epstein-little-saint-james-ownership',
    type: 'financial',
    subtype: 'owner-property',
    entity1Id: 'jeffrey-epstein',
    entity1Type: 'person',
    entity2Id: 'little-saint-james',
    entity2Type: 'location',
    startDate: '1998-07-01',
    endDate: '2019-08-10',
    description: 'Epstein owned Little Saint James Island, allegedly used for trafficking activities.',
    strength: 'strong',
    significance: 'critical',
    verificationStatus: 'verified',
    sources: [
      {
        id: 'lsj-property-deed',
        title: 'Property Deed - Little Saint James Island',
        type: 'government_document',
        author: 'USVI Recorder of Deeds',
        publication: 'U.S. Virgin Islands',
        publicationDate: '1998-07-01',
        reliability: 'high',
        description: 'Official property ownership documentation',
        tags: ['property-deed', 'ownership', 'island']
      }
    ],
    tags: ['property-ownership', 'island', 'usvi', 'trafficking-location'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'epstein-manhattan-mansion-ownership',
    type: 'financial',
    subtype: 'owner-property',
    entity1Id: 'jeffrey-epstein',
    entity1Type: 'person',
    entity2Id: 'manhattan-mansion',
    entity2Type: 'location',
    startDate: '1996-07-01',
    endDate: '2019-08-10',
    description: 'Epstein owned the 9 East 71st Street mansion, transferred from Wexner.',
    strength: 'strong',
    significance: 'critical',
    verificationStatus: 'verified',
    sources: [
      {
        id: 'manhattan-mansion-deed',
        title: 'Property Deed - 9 East 71st Street',
        type: 'government_document',
        author: 'NYC Department of Finance',
        publication: 'New York City',
        publicationDate: '1996-07-01',
        reliability: 'high',
        description: 'Property transfer documentation from Wexner to Epstein',
        tags: ['property-deed', 'transfer', 'mansion']
      }
    ],
    tags: ['property-ownership', 'manhattan', 'mansion', 'wexner-transfer'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'maxwell-terramar-leadership',
    type: 'professional',
    subtype: 'founder-organization',
    entity1Id: 'ghislaine-maxwell',
    entity1Type: 'person',
    entity2Id: 'terramar-project',
    entity2Type: 'organization',
    startDate: '2012-01-01',
    endDate: '2019-12-31',
    description: 'Maxwell founded and led the TerraMar Project, an ocean conservation nonprofit.',
    strength: 'strong',
    significance: 'medium',
    verificationStatus: 'verified',
    sources: [
      {
        id: 'terramar-incorporation-docs',
        title: 'TerraMar Project Incorporation Documents',
        type: 'government_document',
        author: 'State of Delaware',
        publication: 'Delaware Secretary of State',
        publicationDate: '2012-01-15',
        reliability: 'high',
        description: 'Corporate filing showing Maxwell as founder',
        tags: ['incorporation', 'nonprofit', 'leadership']
      }
    ],
    tags: ['organization-leadership', 'nonprofit', 'ocean-conservation', 'terramar'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'epstein-bear-stearns-employment',
    type: 'professional',
    subtype: 'employee-employer',
    entity1Id: 'jeffrey-epstein',
    entity1Type: 'person',
    entity2Id: 'bear-stearns',
    entity2Type: 'organization',
    startDate: '1976-09-01',
    endDate: '1981-08-01',
    description: 'Epstein worked at Bear Stearns, rising from junior assistant to limited partner.',
    strength: 'strong',
    significance: 'medium',
    verificationStatus: 'verified',
    sources: [
      {
        id: 'bear-stearns-employment-records',
        title: 'Employment Records - Jeffrey Epstein',
        type: 'financial_record',
        author: 'Bear Stearns',
        publication: 'Corporate records',
        publicationDate: '1981-08-01',
        reliability: 'high',
        description: 'Employment history and departure documentation',
        tags: ['employment', 'bear-stearns', 'finance']
      }
    ],
    tags: ['employment', 'bear-stearns', 'finance', 'career-start'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'wexner-l-brands-ownership',
    type: 'professional',
    subtype: 'founder-owner',
    entity1Id: 'les-wexner',
    entity1Type: 'person',
    entity2Id: 'l-brands',
    entity2Type: 'organization',
    startDate: '1963-01-01',
    endDate: '2020-05-01',
    description: 'Wexner founded and built L Brands (The Limited) into a retail empire.',
    strength: 'strong',
    significance: 'medium',
    verificationStatus: 'verified',
    sources: [
      {
        id: 'l-brands-corporate-history',
        title: 'L Brands Corporate History and Leadership',
        type: 'financial_record',
        author: 'L Brands',
        publication: 'SEC filings',
        publicationDate: '2020-05-01',
        reliability: 'high',
        description: 'Corporate records showing Wexner\'s leadership role',
        tags: ['corporate-leadership', 'founder', 'retail']
      }
    ],
    tags: ['corporate-leadership', 'founder', 'retail-empire', 'billionaire'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'brown-miami-herald-employment',
    type: 'professional',
    subtype: 'employee-employer',
    entity1Id: 'julie-brown',
    entity1Type: 'person',
    entity2Id: 'miami-herald',
    entity2Type: 'organization',
    startDate: '2017-01-01',
    endDate: '2024-01-15',
    description: 'Brown worked as investigative journalist at Miami Herald, leading Epstein investigation.',
    strength: 'strong',
    significance: 'high',
    verificationStatus: 'verified',
    sources: [
      {
        id: 'brown-employment-miami-herald',
        title: 'Julie K. Brown Employment Record',
        type: 'other',
        author: 'Miami Herald',
        publication: 'Miami Herald',
        publicationDate: '2019-01-01',
        reliability: 'high',
        description: 'Employment verification and investigative work record',
        tags: ['employment', 'journalism', 'investigation']
      }
    ],
    tags: ['journalism', 'investigation', 'pulitzer', 'whistleblowing'],
    lastUpdated: '2024-01-15T00:00:00Z'
  }
];

export const getRelationship = (id: string): Relationship | undefined => {
  return coreRelationships.find(rel => rel.id === id);
};

export const getRelationshipsByEntity = (entityId: string): Relationship[] => {
  return coreRelationships.filter(rel => 
    rel.entity1Id === entityId || rel.entity2Id === entityId
  );
};

export const getRelationshipsByType = (type: string): Relationship[] => {
  return coreRelationships.filter(rel => rel.type === type);
};

export const getRelationshipsBySignificance = (significance: string): Relationship[] => {
  return coreRelationships.filter(rel => rel.significance === significance);
};

export const getStrongRelationships = (): Relationship[] => {
  return coreRelationships.filter(rel => rel.strength === 'strong');
};

export const searchRelationships = (query: string): Relationship[] => {
  const lowercaseQuery = query.toLowerCase();
  return coreRelationships.filter(rel =>
    rel.description.toLowerCase().includes(lowercaseQuery) ||
    rel.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    rel.subtype?.toLowerCase().includes(lowercaseQuery)
  );
}; 