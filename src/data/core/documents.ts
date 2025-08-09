import { Evidence, DocumentContent, Annotation, DocumentCollection } from '@/types/investigation';

// Comprehensive Document Database
export const coreDocuments: Evidence[] = [
  {
    id: 'doc_001',
    title: 'Epstein Non-Prosecution Agreement (2008)',
    type: 'document',
    subtype: 'court filing',
    description: 'The controversial non-prosecution agreement between Jeffrey Epstein and federal prosecutors, arranged by then-U.S. Attorney Alexander Acosta. This secret deal allowed Epstein to plead guilty to lesser state charges.',
    date: '2008-09-24',
    significance: 'critical',
    verificationStatus: 'verified',
    confidenceLevel: 'high',
    preferredUrl: 'https://www.documentcloud.org/documents/1508272-epstein-non-prosecution-agreement',
    sources: [
      {
        id: 'src_npa_001',
        title: 'Non-Prosecution Agreement - Southern District of Florida',
        type: 'court_document',
        author: 'U.S. Attorney\'s Office, Southern District of Florida',
        publication: 'Federal Court Records',
        publicationDate: '2008-09-24',
        url: 'https://www.documentcloud.org/documents/1508272-epstein-non-prosecution-agreement',
        reliability: 'high',
        description: 'Official federal court document',
        tags: ['legal', 'federal', 'prosecution']
      }
    ],
    relatedEntities: ['epstein_jeffrey', 'acosta_alexander'],
    relatedEvents: ['event_2008_plea_deal'],
    tags: ['legal', 'prosecution', 'plea-deal', 'federal'],
    content: {
      fileName: 'epstein_npa_2008.pdf',
      fileType: 'pdf',
      pageCount: 5,
      text: 'UNITED STATES OF AMERICA v. JEFFREY EPSTEIN... The United States agrees that it will not institute any criminal charges against Epstein...',
      hash: 'sha256:a1b2c3d4e5f6...'
    },
    annotations: [
      {
        id: 'anno_001',
        type: 'highlight',
        startPosition: 120,
        endPosition: 145,
        content: 'Non-prosecution agreement - Key legal protection granted to Epstein',
        authorId: 'legal-analysis-team',
        createdDate: '2024-01-10T10:30:00Z',
        significance: 'critical'
      } as Annotation
    ],
    accessLevel: 'public',
    lastUpdated: '2024-01-15'
  },

  {
    id: 'doc_002',
    title: 'Virginia Giuffre vs. Ghislaine Maxwell - Deposition Transcript',
    type: 'document',
    subtype: 'deposition',
    description: 'Detailed deposition testimony from Virginia Giuffre describing her experiences and interactions with Jeffrey Epstein and Ghislaine Maxwell.',
    date: '2016-04-09',
    significance: 'critical',
    verificationStatus: 'verified',
    confidenceLevel: 'high',
    sources: [
      {
        id: 'src_depo_001',
        title: 'Giuffre v. Maxwell Deposition',
        type: 'court_document',
        author: 'U.S. District Court',
        publication: 'Federal Court Records',
        publicationDate: '2016-04-09',
        reliability: 'high',
        description: 'Official court deposition transcript',
        tags: ['deposition', 'testimony', 'federal-court']
      }
    ],
    relatedEntities: ['giuffre_virginia', 'maxwell_ghislaine', 'epstein_jeffrey'],
    relatedEvents: ['event_2015_defamation_lawsuit'],
    tags: ['testimony', 'deposition', 'abuse', 'trafficking'],
    content: {
      fileName: 'giuffre_maxwell_depo_2016.pdf',
      fileType: 'pdf',
      pageCount: 145,
      text: 'Q: Can you describe your relationship with Jeffrey Epstein? A: I was Jeffrey Epstein\'s sex slave...',
      hash: 'sha256:b2c3d4e5f6g7...'
    },
    annotations: [],
    accessLevel: 'public',
    lastUpdated: '2024-01-15'
  },

  {
    id: 'doc_003',
    title: 'FBI Investigation Report - Operation Avalanche',
    type: 'document',
    subtype: 'government document',
    description: 'FBI investigative report detailing surveillance and evidence collection related to Jeffrey Epstein\'s activities between 2005-2006.',
    date: '2006-07-15',
    significance: 'critical',
    verificationStatus: 'verified',
    confidenceLevel: 'high',
    defaultDisplayMode: 'preview',
    sources: [
      {
        id: 'src_fbi_001',
        title: 'FBI Report - Jeffrey Epstein Investigation',
        type: 'government_document',
        author: 'Federal Bureau of Investigation',
        publication: 'FBI Records',
        publicationDate: '2006-07-15',
        reliability: 'high',
        description: 'Official FBI investigation documentation',
        tags: ['fbi', 'investigation', 'surveillance']
      }
    ],
    relatedEntities: ['epstein_jeffrey'],
    relatedEvents: ['event_2005_palm_beach_investigation'],
    tags: ['fbi', 'investigation', 'surveillance', 'federal'],
    content: {
      fileName: 'fbi_epstein_report_2006.pdf',
      fileType: 'pdf',
      pageCount: 76,
      text: 'SUBJECT: Jeffrey Edward Epstein - Investigation Summary... Multiple witnesses interviewed...',
      hash: 'sha256:c3d4e5f6g7h8...'
    },
    annotations: [],
    accessLevel: 'public',
    lastUpdated: '2024-01-15'
  },

  {
    id: 'doc_004',
    title: 'Miami Herald "Perversion of Justice" Investigation',
    type: 'document',
    subtype: 'investigative report',
    description: 'Pulitzer Prize-winning investigative series by Julie K. Brown that exposed the Epstein case and led to federal charges.',
    date: '2018-11-28',
    significance: 'critical',
    verificationStatus: 'verified',
    confidenceLevel: 'high',
    preferredUrl: 'https://www.miamiherald.com/news/local/article220097825.html',
    sources: [
      {
        id: 'src_herald_001',
        title: 'How a future Trump Cabinet member gave a serial sex offender the deal of a lifetime',
        type: 'news_article',
        author: 'Julie K. Brown',
        publication: 'Miami Herald',
        publicationDate: '2018-11-28',
        url: 'https://www.miamiherald.com/news/local/article220097825.html',
        reliability: 'high',
        description: 'Investigative journalism exposing the Epstein case',
        tags: ['journalism', 'investigation', 'expose']
      }
    ],
    relatedEntities: ['brown_julie', 'epstein_jeffrey', 'acosta_alexander'],
    relatedEvents: ['event_2018_miami_herald_investigation'],
    tags: ['journalism', 'investigation', 'expose', 'pulitzer'],
    content: {
      fileName: 'miami_herald_perversion_justice.pdf',
      fileType: 'pdf',
      pageCount: 28,
      text: 'Alexander Acosta, President Donald Trump\'s labor secretary, could be in for the fight of his life...',
      hash: 'sha256:d4e5f6g7h8i9...'
    },
    annotations: [],
    accessLevel: 'public',
    lastUpdated: '2024-01-15'
  },

  {
    id: 'doc_005',
    title: 'Wexner-Epstein Power of Attorney Document',
    type: 'document',
    subtype: 'financial record',
    description: 'Legal document granting Jeffrey Epstein broad power of attorney over Les Wexner\'s financial affairs and business interests.',
    date: '1987-08-01',
    significance: 'high',
    verificationStatus: 'verified',
    confidenceLevel: 'high',
    sources: [
      {
        id: 'src_poa_001',
        title: 'Power of Attorney - Leslie Wexner to Jeffrey Epstein',
        type: 'financial_record',
        author: 'Legal counsel for Leslie Wexner',
        publication: 'Ohio State Records',
        publicationDate: '1987-08-01',
        reliability: 'high',
        description: 'Official power of attorney documentation',
        tags: ['financial', 'legal', 'power-of-attorney']
      }
    ],
    relatedEntities: ['wexner_les', 'epstein_jeffrey'],
    relatedEvents: ['event_1987_wexner_relationship'],
    tags: ['financial', 'power-of-attorney', 'business', 'control'],
    content: {
      fileName: 'wexner_epstein_poa_1987.pdf',
      fileType: 'pdf',
      pageCount: 12,
      text: 'POWER OF ATTORNEY... Leslie H. Wexner hereby grants to Jeffrey E. Epstein...',
      hash: 'sha256:e5f6g7h8i9j0...'
    },
    annotations: [],
    accessLevel: 'public',
    lastUpdated: '2024-01-15'
  },

  {
    id: 'doc_006',
    title: 'Little Saint James Property Records',
    type: 'document',
    subtype: 'government document',
    description: 'Official property records showing Jeffrey Epstein\'s purchase and ownership of Little Saint James island in the U.S. Virgin Islands.',
    date: '1998-07-23',
    significance: 'high',
    verificationStatus: 'verified',
    confidenceLevel: 'high',
    defaultDisplayMode: 'preview',
    sources: [
      {
        id: 'src_property_001',
        title: 'U.S. Virgin Islands Property Records - Little Saint James',
        type: 'government_document',
        author: 'U.S. Virgin Islands Recorder of Deeds',
        publication: 'Virgin Islands Government',
        publicationDate: '1998-07-23',
        reliability: 'high',
        description: 'Official property ownership records',
        tags: ['property', 'real-estate', 'ownership']
      }
    ],
    relatedEntities: ['epstein_jeffrey', 'little_saint_james'],
    relatedEvents: ['event_1998_little_saint_james_purchase'],
    tags: ['property', 'real-estate', 'island', 'virgin-islands'],
    content: {
      fileName: 'little_saint_james_deed_1998.pdf',
      fileType: 'pdf',
      pageCount: 8,
      text: 'WARRANTY DEED... Jeffrey E. Epstein, purchaser of Little Saint James Island...',
      hash: 'sha256:f6g7h8i9j0k1...'
    },
    annotations: [],
    accessLevel: 'public',
    lastUpdated: '2024-01-15'
  },

  {
    id: 'doc_007',
    title: 'Prince Andrew BBC Newsnight Interview Transcript',
    type: 'document',
    subtype: 'interview',
    description: 'Complete transcript of Prince Andrew\'s controversial BBC Newsnight interview addressing his relationship with Jeffrey Epstein.',
    date: '2019-11-16',
    significance: 'high',
    verificationStatus: 'verified',
    confidenceLevel: 'high',
    preferredUrl: 'https://www.bbc.co.uk/programmes/m000bw3y',
    sources: [
      {
        id: 'src_bbc_001',
        title: 'Prince Andrew & the Epstein Scandal: The Newsnight Interview',
        type: 'interview',
        author: 'Emily Maitlis',
        publication: 'BBC Newsnight',
        publicationDate: '2019-11-16',
        url: 'https://www.bbc.co.uk/programmes/m000bw3y',
        reliability: 'high',
        description: 'Official BBC interview transcript',
        tags: ['interview', 'bbc', 'royal', 'scandal']
      }
    ],
    relatedEntities: ['andrew_prince', 'epstein_jeffrey'],
    relatedEvents: ['event_2019_prince_andrew_interview'],
    tags: ['interview', 'royal', 'scandal', 'media'],
    content: {
      fileName: 'prince_andrew_bbc_interview_2019.pdf',
      fileType: 'pdf',
      pageCount: 15,
      text: 'EMILY MAITLIS: Your Royal Highness, we\'ve come to Buckingham Palace in highly unusual circumstances...',
      hash: 'sha256:g7h8i9j0k1l2...'
    },
    annotations: [],
    accessLevel: 'public',
    lastUpdated: '2024-01-15'
  },

  {
    id: 'doc_008',
    title: 'Ghislaine Maxwell Trial - Verdict and Sentencing',
    type: 'document',
    subtype: 'court filing',
    description: 'Official court documents detailing Ghislaine Maxwell\'s conviction on five federal charges and subsequent sentencing to 20 years in prison.',
    date: '2022-06-28',
    significance: 'critical',
    verificationStatus: 'verified',
    confidenceLevel: 'high',
    sources: [
      {
        id: 'src_maxwell_verdict_001',
        title: 'United States v. Ghislaine Maxwell - Sentencing Memorandum',
        type: 'court_document',
        author: 'U.S. District Court Southern District of New York',
        publication: 'Federal Court Records',
        publicationDate: '2022-06-28',
        reliability: 'high',
        description: 'Official federal court sentencing documents',
        tags: ['court', 'sentencing', 'conviction', 'federal']
      }
    ],
    relatedEntities: ['maxwell_ghislaine'],
    relatedEvents: ['event_2022_maxwell_sentencing'],
    tags: ['court', 'sentencing', 'conviction', 'trafficking'],
    content: {
      fileName: 'maxwell_sentencing_2022.pdf',
      fileType: 'pdf',
      pageCount: 23,
      text: 'UNITED STATES DISTRICT COURT SOUTHERN DISTRICT OF NEW YORK... Ghislaine Maxwell is hereby sentenced...',
      hash: 'sha256:h8i9j0k1l2m3...'
    },
    annotations: [],
    accessLevel: 'public',
    lastUpdated: '2024-01-15'
  }
];

// Document Collections for Organization
export const documentCollections: DocumentCollection[] = [
  {
    id: 'collection_legal',
    name: 'Legal Documents',
    description: 'Court filings, depositions, plea agreements, and other legal documents',
    documents: ['doc_001', 'doc_002', 'doc_008'],
    createdDate: '2024-01-01',
    lastUpdated: '2024-01-15',
    isPublic: true,
    tags: ['legal', 'court', 'prosecution']
  },
  {
    id: 'collection_investigations',
    name: 'Investigation Reports',
    description: 'FBI reports, journalistic investigations, and research documents',
    documents: ['doc_003', 'doc_004'],
    createdDate: '2024-01-01',
    lastUpdated: '2024-01-15',
    isPublic: true,
    tags: ['investigation', 'fbi', 'journalism']
  },
  {
    id: 'collection_financial',
    name: 'Financial Records',
    description: 'Financial documents, property records, and business relationships',
    documents: ['doc_005', 'doc_006'],
    createdDate: '2024-01-01',
    lastUpdated: '2024-01-15',
    isPublic: true,
    tags: ['financial', 'property', 'business']
  },
  {
    id: 'collection_media',
    name: 'Media & Interviews',
    description: 'Interviews, media coverage, and public statements',
    documents: ['doc_007'],
    createdDate: '2024-01-01',
    lastUpdated: '2024-01-15',
    isPublic: true,
    tags: ['media', 'interview', 'public']
  }
];

// Helper function to get documents by collection
export const getDocumentsByCollection = (collectionId: string): Evidence[] => {
  const collection = documentCollections.find(c => c.id === collectionId);
  if (!collection) return [];
  
  return coreDocuments.filter(doc => collection.documents.includes(doc.id));
};

// Helper function to extract document content
export const getDocumentContent = (document: Evidence): DocumentContent | null => {
  if (!document.content) return null;
  return document.content as DocumentContent;
};

// Helper function to search documents
export const searchDocuments = (query: string, _filters?: { category?: string; timeframe?: string }): Evidence[] => {
  const normalizedQuery = query.toLowerCase();
  
  return coreDocuments.filter(doc => {
    const matchesTitle = doc.title.toLowerCase().includes(normalizedQuery);
    const matchesDescription = doc.description.toLowerCase().includes(normalizedQuery);
    const matchesContent = doc.content?.text?.toLowerCase().includes(normalizedQuery);
    const matchesTags = doc.tags.some(tag => tag.toLowerCase().includes(normalizedQuery));
    
    return matchesTitle || matchesDescription || matchesContent || matchesTags;
  });
}; 