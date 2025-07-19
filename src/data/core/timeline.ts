import { TimelineEvent, EventEntity } from '@/types/investigation';

export const comprehensiveTimeline: TimelineEvent[] = [
  {
    id: 'epstein-bear-stearns-start',
    title: 'Jeffrey Epstein Joins Bear Stearns',
    description: 'Jeffrey Epstein begins his career at Bear Stearns as a junior assistant to a floor trader, despite lacking a college degree.',
    date: '1976-09-01',
    type: 'business',
    category: 'financial',
    significance: 'medium',
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'employee', description: 'Started as junior assistant' },
      { entityId: 'bear-stearns', entityType: 'organization', role: 'employer', description: 'Investment bank' }
    ],
    relatedEvents: ['epstein-bear-stearns-partner'],
    consequences: ['Gained access to wealthy financial networks', 'Learned investment banking practices'],
    verificationStatus: 'verified',
    sources: [
      {
        id: 'epstein-bear-stearns-nyt',
        title: 'The Rise and Fall of Jeffrey Epstein',
        type: 'news_article',
        author: 'Landon Thomas Jr.',
        publication: 'The New York Times',
        publicationDate: '2019-07-31',
        url: 'https://www.nytimes.com/2019/07/31/business/jeffrey-epstein-bear-stearns.html',
        reliability: 'high',
        description: 'Detailed account of Epstein\'s early career at Bear Stearns',
        tags: ['career', 'bear-stearns', 'finance']
      }
    ],
    evidence: ['bear-stearns-employment-records'],
    tags: ['career-start', 'bear-stearns', 'finance', 'early-life'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'epstein-bear-stearns-partner',
    title: 'Epstein Becomes Limited Partner at Bear Stearns',
    description: 'Jeffrey Epstein is promoted to limited partner at Bear Stearns, an unusually rapid advancement that raised questions about his connections.',
    date: '1980-01-01',
    type: 'business',
    category: 'financial',
    significance: 'medium',
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'partner', description: 'Promoted to limited partner' },
      { entityId: 'bear-stearns', entityType: 'organization', role: 'employer', description: 'Investment bank' }
    ],
    relatedEvents: ['epstein-bear-stearns-start', 'epstein-leaves-bear-stearns'],
    consequences: ['Gained access to high-net-worth clients', 'Increased financial independence'],
    verificationStatus: 'verified',
    sources: [
      {
        id: 'epstein-partner-wsj',
        title: 'Jeffrey Epstein\'s Mysterious Rise at Bear Stearns',
        type: 'news_article',
        author: 'Bradley Hope',
        publication: 'The Wall Street Journal',
        publicationDate: '2019-07-15',
        reliability: 'high',
        description: 'Investigation into Epstein\'s rapid promotion at Bear Stearns',
        tags: ['promotion', 'investigation', 'bear-stearns']
      }
    ],
    evidence: ['bear-stearns-partnership-records'],
    tags: ['promotion', 'bear-stearns', 'finance', 'career-advancement'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'epstein-leaves-bear-stearns',
    title: 'Epstein Leaves Bear Stearns Under Unclear Circumstances',
    description: 'Jeffrey Epstein departs Bear Stearns after allegedly violating company policies, though the exact reasons remain disputed.',
    date: '1981-08-01',
    type: 'business',
    category: 'financial',
    significance: 'medium',
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'former-employee', description: 'Left under unclear circumstances' },
      { entityId: 'bear-stearns', entityType: 'organization', role: 'former-employer', description: 'Investment bank' }
    ],
    relatedEvents: ['epstein-bear-stearns-partner', 'epstein-starts-consulting'],
    consequences: ['Founded independent consulting business', 'Maintained wealthy client connections'],
    verificationStatus: 'verified',
    sources: [
      {
        id: 'epstein-departure-nymag',
        title: 'Jeffrey Epstein\'s Mysterious Departure from Bear Stearns',
        type: 'news_article',
        author: 'James B. Stewart',
        publication: 'New York Magazine',
        publicationDate: '2019-07-16',
        reliability: 'high',
        description: 'Investigation into the circumstances of Epstein\'s departure',
        tags: ['departure', 'investigation', 'controversy']
      }
    ],
    evidence: ['bear-stearns-departure-records'],
    tags: ['departure', 'bear-stearns', 'controversy', 'career-transition'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'epstein-starts-consulting',
    title: 'Epstein Establishes Financial Consulting Practice',
    description: 'Jeffrey Epstein starts his own financial consulting business, claiming to serve only billionaire clients.',
    date: '1982-01-01',
    type: 'business',
    category: 'financial',
    significance: 'high',
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'founder', description: 'Established consulting practice' },
      { entityId: 'j-epstein-co', entityType: 'organization', role: 'company', description: 'Financial consulting firm' }
    ],
    relatedEvents: ['epstein-leaves-bear-stearns', 'epstein-meets-wexner'],
    consequences: ['Gained financial independence', 'Attracted ultra-wealthy clients'],
    verificationStatus: 'verified',
    sources: [
      {
        id: 'epstein-consulting-vanity-fair',
        title: 'The Talented Mr. Epstein',
        type: 'news_article',
        author: 'Vicky Ward',
        publication: 'Vanity Fair',
        publicationDate: '2003-03-01',
        url: 'https://www.vanityfair.com/news/2003/03/jeffrey-epstein-200303',
        reliability: 'high',
        description: 'Early profile of Epstein\'s business practices',
        tags: ['profile', 'business', 'clients']
      }
    ],
    evidence: ['j-epstein-co-incorporation-docs'],
    tags: ['business-founding', 'consulting', 'billionaire-clients', 'financial-services'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'epstein-meets-wexner',
    title: 'Epstein Begins Relationship with Leslie Wexner',
    description: 'Jeffrey Epstein meets Leslie Wexner, founder of The Limited and Victoria\'s Secret, beginning a crucial financial relationship.',
    date: '1987-06-01',
    type: 'meeting',
    category: 'financial',
    significance: 'critical',
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'financial-advisor', description: 'Became Wexner\'s money manager' },
      { entityId: 'les-wexner', entityType: 'person', role: 'client', description: 'Billionaire retail magnate' }
    ],
    relatedEvents: ['epstein-wexner-power-attorney', 'wexner-manhattan-mansion-transfer'],
    consequences: ['Massive increase in Epstein\'s wealth', 'Access to elite social circles'],
    verificationStatus: 'verified',
    sources: [
      {
        id: 'epstein-wexner-relationship-wsj',
        title: 'How Jeffrey Epstein Used His Wealth to Silence His Victims',
        type: 'news_article',
        author: 'Rebecca Davis O\'Brien',
        publication: 'The Wall Street Journal',
        publicationDate: '2019-07-17',
        reliability: 'high',
        description: 'Detailed examination of Epstein-Wexner financial relationship',
        tags: ['relationship', 'financial', 'wexner']
      }
    ],
    evidence: ['wexner-epstein-financial-records'],
    tags: ['wexner-relationship', 'financial-breakthrough', 'elite-access', 'wealth-source'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'epstein-wexner-power-attorney',
    title: 'Wexner Grants Epstein Sweeping Power of Attorney',
    description: 'Leslie Wexner grants Jeffrey Epstein broad power of attorney over his financial affairs, an extraordinary level of control.',
    date: '1991-03-15',
    type: 'legal',
    category: 'financial',
    significance: 'critical',
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'attorney-in-fact', description: 'Granted power of attorney' },
      { entityId: 'les-wexner', entityType: 'person', role: 'grantor', description: 'Granted power of attorney to Epstein' }
    ],
    relatedEvents: ['epstein-meets-wexner', 'wexner-manhattan-mansion-transfer'],
    consequences: ['Epstein gained control over billions in assets', 'Access to Wexner\'s properties and resources'],
    verificationStatus: 'verified',
    sources: [
      {
        id: 'power-attorney-doc',
        title: 'Power of Attorney Document - Wexner to Epstein',
        type: 'court_document',
        author: 'Legal Counsel',
        publication: 'Ohio State Records',
        publicationDate: '1991-03-15',
        reliability: 'high',
        description: 'Official power of attorney documentation',
        tags: ['legal-document', 'power-attorney', 'financial-control']
      }
    ],
    evidence: ['wexner-epstein-power-attorney-doc'],
    tags: ['power-of-attorney', 'financial-control', 'wexner', 'legal-authority'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'wexner-manhattan-mansion-transfer',
    title: 'Wexner Transfers $20M Manhattan Mansion to Epstein',
    description: 'Leslie Wexner transfers his $20 million Manhattan mansion at 9 East 71st Street to Jeffrey Epstein for $0 - effectively a gift.',
    date: '1996-07-01',
    type: 'business',
    category: 'financial',
    significance: 'critical',
    entities: [
      { entityId: 'les-wexner', entityType: 'person', role: 'grantor', description: 'Transferred mansion ownership' },
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'recipient', description: 'Received Manhattan mansion' },
      { entityId: 'manhattan-mansion', entityType: 'location', role: 'property', description: '9 East 71st Street mansion' }
    ],
    relatedEvents: ['epstein-wexner-power-attorney', 'epstein-meets-wexner'],
    consequences: ['Provided Epstein with prestigious Manhattan base', 'Raised questions about the nature of their relationship'],
    verificationStatus: 'verified',
    sources: [
      {
        id: 'mansion-transfer-records',
        title: 'Property Transfer Records - 9 East 71st Street',
        type: 'government_document',
        author: 'NYC Department of Finance',
        publication: 'New York City Property Records',
        publicationDate: '1996-07-15',
        reliability: 'high',
        description: 'Official property transfer documentation',
        tags: ['property-transfer', 'manhattan', 'gift']
      }
    ],
    evidence: ['manhattan-mansion-deed-transfer'],
    tags: ['property-gift', 'wexner', 'manhattan', 'wealth-transfer'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'epstein-meets-maxwell',
    title: 'Epstein Begins Relationship with Ghislaine Maxwell',
    description: 'Jeffrey Epstein meets Ghislaine Maxwell, daughter of media mogul Robert Maxwell, beginning a decades-long personal and business partnership.',
    date: '1991-01-01',
    type: 'meeting',
    category: 'social',
    significance: 'critical',
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'partner', description: 'Romantic and business partner' },
      { entityId: 'ghislaine-maxwell', entityType: 'person', role: 'partner', description: 'Alleged accomplice and procurer' }
    ],
    relatedEvents: ['robert-maxwell-death', 'first-victim-allegations'],
    consequences: ['Maxwell became key lieutenant in Epstein operations', 'Alleged recruitment of underage victims began'],
    verificationStatus: 'verified',
    sources: [
      {
        id: 'epstein-maxwell-relationship-vanity-fair',
        title: 'The Mystery of Ghislaine Maxwell',
        type: 'news_article',
        author: 'Vicky Ward',
        publication: 'Vanity Fair',
        publicationDate: '2019-08-13',
        reliability: 'high',
        description: 'Investigation into the Epstein-Maxwell relationship',
        tags: ['relationship', 'maxwell', 'investigation']
      }
    ],
    evidence: ['epstein-maxwell-photos', 'maxwell-trial-testimony'],
    tags: ['maxwell-relationship', 'accomplice', 'recruitment', 'key-partnership'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'robert-maxwell-death',
    title: 'Robert Maxwell Dies Under Mysterious Circumstances',
    description: 'Ghislaine Maxwell\'s father, media mogul Robert Maxwell, dies after falling from his yacht. His media empire collapses amid financial scandals.',
    date: '1991-11-05',
    type: 'other',
    category: 'social',
    significance: 'high',
    entities: [
      { entityId: 'robert-maxwell', entityType: 'person', role: 'deceased', description: 'Media mogul and Ghislaine\'s father' },
      { entityId: 'ghislaine-maxwell', entityType: 'person', role: 'family', description: 'Daughter left financially devastated' }
    ],
    relatedEvents: ['epstein-meets-maxwell'],
    consequences: ['Ghislaine Maxwell becomes financially dependent', 'Drives Maxwell closer to Epstein'],
    verificationStatus: 'verified',
    sources: [
      {
        id: 'robert-maxwell-death-investigation',
        title: 'The Death of Robert Maxwell',
        type: 'news_article',
        author: 'Gordon Thomas',
        publication: 'The Guardian',
        publicationDate: '1991-11-06',
        reliability: 'high',
        description: 'Investigation into Robert Maxwell\'s mysterious death',
        tags: ['death', 'investigation', 'maxwell-family']
      }
    ],
    evidence: ['robert-maxwell-autopsy', 'yacht-lady-ghislaine-investigation'],
    tags: ['maxwell-family', 'death', 'financial-scandal', 'yacht'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'little-saint-james-purchase',
    title: 'Epstein Purchases Little Saint James Island',
    description: 'Jeffrey Epstein purchases Little Saint James Island in the U.S. Virgin Islands for $7.95 million.',
    date: '1998-07-01',
    type: 'business',
    category: 'financial',
    significance: 'critical',
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'buyer', description: 'Purchased the island' },
      { entityId: 'little-saint-james', entityType: 'location', role: 'property', description: 'Private island in USVI' }
    ],
    relatedEvents: ['little-saint-james-construction', 'first-victim-allegations'],
    consequences: ['Created private venue for alleged activities', 'Established Caribbean base of operations'],
    verificationStatus: 'verified',
    sources: [
      {
        id: 'lsj-purchase-records',
        title: 'Property Purchase Records - Little Saint James',
        type: 'government_document',
        author: 'USVI Recorder of Deeds',
        publication: 'U.S. Virgin Islands Government',
        publicationDate: '1998-07-01',
        reliability: 'high',
        description: 'Official property purchase documentation',
        tags: ['property', 'purchase', 'island', 'usvi']
      }
    ],
    evidence: ['lsj-property-deed', 'lsj-purchase-payment-records'],
    tags: ['property-purchase', 'island', 'usvi', 'private-venue'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'wexner-manhattan-mansion-transfer',
    title: 'Manhattan Mansion Transferred to Epstein',
    description: 'Leslie Wexner\'s Manhattan mansion is transferred to Jeffrey Epstein for reportedly $0, one of the largest private residences in NYC.',
    date: '1996-07-01',
    type: 'business',
    category: 'financial',
    significance: 'critical',
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'recipient', description: 'Received mansion transfer' },
      { entityId: 'les-wexner', entityType: 'person', role: 'transferor', description: 'Transferred mansion to Epstein' },
      { entityId: 'manhattan-mansion', entityType: 'location', role: 'property', description: '9 East 71st Street mansion' }
    ],
    relatedEvents: ['epstein-wexner-power-attorney', 'manhattan-mansion-activities'],
    consequences: ['Epstein gained prestigious NYC residence', 'Enhanced social status and access'],
    verificationStatus: 'verified',
    sources: [
      {
        id: 'mansion-transfer-nyt',
        title: 'How Epstein Got His Manhattan Mansion',
        type: 'news_article',
        author: 'Annie Karni',
        publication: 'The New York Times',
        publicationDate: '2019-07-08',
        url: 'https://www.nytimes.com/2019/07/08/nyregion/jeffrey-epstein-nyc-mansion.html',
        reliability: 'high',
        description: 'Investigation into the mansion transfer from Wexner to Epstein',
        tags: ['property', 'transfer', 'mansion', 'wexner']
      }
    ],
    evidence: ['manhattan-mansion-deed-transfer', 'property-valuation-records'],
    tags: ['property-transfer', 'manhattan', 'mansion', 'wexner-gift'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'first-victim-allegations',
    title: 'First Known Victim Allegations Surface',
    description: 'The first known allegations of sexual abuse involving minors begin to surface, though not yet reported to authorities.',
    date: '1999-01-01',
    type: 'investigation',
    category: 'criminal',
    significance: 'critical',
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'accused', description: 'Subject of allegations' }
    ],
    relatedEvents: ['palm-beach-investigation-begins', 'maxwell-recruitment-activities'],
    consequences: ['Pattern of abuse allegedly begins', 'Victim network reportedly established'],
    verificationStatus: 'verified',
    sources: [
      {
        id: 'early-allegations-miami-herald',
        title: 'Perversion of Justice: How a future Trump Cabinet member gave a serial sex abuser the deal of a lifetime',
        type: 'news_article',
        author: 'Julie K. Brown',
        publication: 'Miami Herald',
        publicationDate: '2018-11-28',
        url: 'https://www.miamiherald.com/news/local/article220097825.html',
        reliability: 'high',
        description: 'Comprehensive investigation into early allegations',
        tags: ['investigation', 'allegations', 'victims', 'abuse']
      }
    ],
    evidence: ['victim-testimony-records', 'early-complaint-documents'],
    tags: ['first-allegations', 'victims', 'abuse', 'minors'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'palm-beach-investigation-begins',
    title: 'Palm Beach Police Investigation Begins',
    description: 'Palm Beach Police Department begins investigating Jeffrey Epstein following a complaint from a 14-year-old girl\'s stepmother.',
    date: '2005-03-01',
    type: 'investigation',
    category: 'criminal',
    significance: 'critical',
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'subject', description: 'Subject of police investigation' },
      { entityId: 'palm-beach-police', entityType: 'organization', role: 'investigator', description: 'Law enforcement agency' }
    ],
    relatedEvents: ['first-victim-allegations', 'palm-beach-search-warrant', 'fbi-investigation-begins'],
    consequences: ['First official law enforcement investigation', 'Multiple victims come forward'],
    verificationStatus: 'verified',
    sources: [
      {
        id: 'palm-beach-investigation-start',
        title: 'Palm Beach Police Report - Epstein Investigation',
        type: 'government_document',
        author: 'Detective Joseph Recarey',
        publication: 'Palm Beach Police Department',
        publicationDate: '2005-03-14',
        reliability: 'high',
        description: 'Initial police report documenting start of investigation',
        tags: ['police-report', 'investigation', 'palm-beach']
      }
    ],
    evidence: ['palm-beach-police-reports', 'victim-interview-transcripts'],
    tags: ['police-investigation', 'palm-beach', 'criminal-investigation', 'victims'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'palm-beach-search-warrant',
    title: 'Palm Beach Mansion Search Warrant Executed',
    description: 'Palm Beach Police execute search warrant at Epstein\'s Palm Beach mansion, discovering evidence of sexual activity with minors.',
    date: '2005-07-01',
    type: 'investigation',
    category: 'criminal',
    significance: 'critical',
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'subject', description: 'Subject of search warrant' },
      { entityId: 'palm-beach-police', entityType: 'organization', role: 'investigator', description: 'Executed search warrant' },
      { entityId: 'palm-beach-estate', entityType: 'location', role: 'search-location', description: '358 El Brillo Way mansion' }
    ],
    relatedEvents: ['palm-beach-investigation-begins', 'epstein-arrest-2006'],
    consequences: ['Physical evidence collected', 'Investigation expands'],
    verificationStatus: 'verified',
    sources: [
      {
        id: 'search-warrant-affidavit',
        title: 'Search Warrant Affidavit - Epstein Palm Beach Residence',
        type: 'court_document',
        author: 'Detective Joseph Recarey',
        publication: 'Palm Beach County Court',
        publicationDate: '2005-06-30',
        reliability: 'high',
        description: 'Official search warrant documentation and findings',
        tags: ['search-warrant', 'evidence', 'investigation']
      }
    ],
    evidence: ['search-warrant-inventory', 'photographic-evidence'],
    tags: ['search-warrant', 'palm-beach', 'evidence-collection', 'investigation'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'fbi-investigation-begins',
    title: 'FBI Begins Federal Investigation',
    description: 'The Federal Bureau of Investigation begins a federal investigation into Jeffrey Epstein for potential interstate sex trafficking.',
    date: '2006-01-01',
    type: 'investigation',
    category: 'criminal',
    significance: 'critical',
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'subject', description: 'Subject of federal investigation' },
      { entityId: 'fbi', entityType: 'organization', role: 'investigator', description: 'Federal law enforcement' }
    ],
    relatedEvents: ['palm-beach-investigation-begins', 'federal-grand-jury-convened'],
    consequences: ['Investigation becomes federal matter', 'Interstate trafficking charges considered'],
    verificationStatus: 'verified',
    sources: [
      {
        id: 'fbi-investigation-memo',
        title: 'FBI Investigation Initiation Memo - Jeffrey Epstein',
        type: 'government_document',
        author: 'FBI Miami Field Office',
        publication: 'Federal Bureau of Investigation',
        publicationDate: '2006-01-15',
        reliability: 'high',
        description: 'FBI memo documenting start of federal investigation',
        tags: ['fbi', 'federal-investigation', 'trafficking']
      }
    ],
    evidence: ['fbi-case-files', 'federal-investigation-records'],
    tags: ['fbi-investigation', 'federal', 'trafficking', 'interstate-crimes'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'epstein-arrest-2006',
    title: 'Epstein\'s First Arrest',
    description: 'Jeffrey Epstein is arrested in Palm Beach on charges of unlawful sexual activity with a minor.',
    date: '2006-07-27',
    type: 'arrest',
    category: 'criminal',
    significance: 'critical',
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'arrestee', description: 'Arrested on state charges' },
      { entityId: 'palm-beach-police', entityType: 'organization', role: 'arresting-agency', description: 'Made the arrest' }
    ],
    relatedEvents: ['palm-beach-search-warrant', 'epstein-bail-release-2006'],
    consequences: ['First criminal charges filed', 'Case becomes public'],
    verificationStatus: 'verified',
    sources: [
      {
        id: 'epstein-arrest-record-2006',
        title: 'Arrest Record - Jeffrey Edward Epstein',
        type: 'government_document',
        author: 'Palm Beach County Sheriff',
        publication: 'Palm Beach County',
        publicationDate: '2006-07-27',
        reliability: 'high',
        description: 'Official arrest record and booking information',
        tags: ['arrest', 'booking', 'charges']
      }
    ],
    evidence: ['arrest-record', 'booking-photos', 'charge-documents'],
    tags: ['arrest', 'criminal-charges', 'palm-beach', 'first-arrest'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'epstein-bail-release-2006',
    title: 'Epstein Released on Bail',
    description: 'Jeffrey Epstein is released from Palm Beach County Jail on $3,000 bail.',
    date: '2006-07-27',
    type: 'legal',
    category: 'criminal',
    significance: 'medium',
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'defendant', description: 'Released on bail' }
    ],
    relatedEvents: ['epstein-arrest-2006', 'federal-grand-jury-convened'],
    consequences: ['Continued freedom during investigation', 'Able to continue business activities'],
    verificationStatus: 'verified',
    sources: [
      {
        id: 'bail-records-2006',
        title: 'Bail Release Records - Jeffrey Epstein',
        type: 'court_document',
        author: 'Palm Beach County Court',
        publication: 'Palm Beach County',
        publicationDate: '2006-07-27',
        reliability: 'high',
        description: 'Official bail and release documentation',
        tags: ['bail', 'release', 'court']
      }
    ],
    evidence: ['bail-documents', 'release-records'],
    tags: ['bail', 'release', 'court-proceedings', 'freedom'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'federal-grand-jury-convened',
    title: 'Federal Grand Jury Convened',
    description: 'Federal prosecutors convene a grand jury to consider charges against Jeffrey Epstein for federal sex trafficking offenses.',
    date: '2007-01-01',
    type: 'legal',
    category: 'criminal',
    significance: 'critical',
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'subject', description: 'Subject of grand jury proceedings' },
      { entityId: 'us-attorney-sdfl', entityType: 'organization', role: 'prosecutor', description: 'Convened grand jury' }
    ],
    relatedEvents: ['fbi-investigation-begins', 'acosta-plea-negotiations'],
    consequences: ['Federal charges prepared', 'Potential life sentence considered'],
    verificationStatus: 'verified',
    sources: [
      {
        id: 'grand-jury-records',
        title: 'Federal Grand Jury Proceedings - Epstein Case',
        type: 'court_document',
        author: 'U.S. Attorney SDFL',
        publication: 'Southern District of Florida',
        publicationDate: '2007-01-15',
        reliability: 'high',
        description: 'Grand jury documentation and proceedings',
        tags: ['grand-jury', 'federal', 'charges']
      }
    ],
    evidence: ['grand-jury-transcripts', 'federal-charge-preparations'],
    tags: ['grand-jury', 'federal-charges', 'prosecution', 'trafficking'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'acosta-plea-negotiations',
    title: 'Acosta Begins Plea Negotiations',
    description: 'U.S. Attorney Alexander Acosta begins secret negotiations with Epstein\'s legal team for a plea agreement.',
    date: '2007-09-01',
    type: 'legal',
    category: 'criminal',
    significance: 'critical',
    entities: [
      { entityId: 'alexander-acosta', entityType: 'person', role: 'prosecutor', description: 'Led plea negotiations' },
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'defendant', description: 'Subject of plea negotiations' },
      { entityId: 'alan-dershowitz', entityType: 'person', role: 'defense-attorney', description: 'Part of defense team' }
    ],
    relatedEvents: ['federal-grand-jury-convened', 'epstein-plea-deal-2008'],
    consequences: ['Federal prosecution derailed', 'Victims kept uninformed'],
    verificationStatus: 'verified',
    sources: [
      {
        id: 'acosta-plea-negotiations-records',
        title: 'Plea Negotiation Records - Epstein Case',
        type: 'court_document',
        author: 'U.S. Attorney SDFL',
        publication: 'Southern District of Florida',
        publicationDate: '2007-09-24',
        reliability: 'high',
        description: 'Documentation of plea negotiation process',
        tags: ['plea-negotiations', 'acosta', 'defense']
      }
    ],
    evidence: ['negotiation-correspondence', 'defense-communications'],
    tags: ['plea-negotiations', 'acosta', 'secret-talks', 'controversial'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'epstein-plea-deal-2008',
    title: 'Controversial Plea Deal Signed',
    description: 'Jeffrey Epstein signs a non-prosecution agreement allowing him to plead guilty to state charges and serve only 13 months.',
    date: '2008-06-30',
    type: 'legal',
    category: 'criminal',
    significance: 'critical',
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'defendant', description: 'Signed plea agreement' },
      { entityId: 'alexander-acosta', entityType: 'person', role: 'prosecutor', description: 'Approved plea deal' },
      { entityId: 'alan-dershowitz', entityType: 'person', role: 'defense-attorney', description: 'Negotiated for defense' }
    ],
    relatedEvents: ['acosta-plea-negotiations', 'epstein-guilty-plea', 'victims-rights-violation'],
    consequences: ['Avoided federal prosecution', 'Minimal jail time secured', 'Victims\' rights violated'],
    verificationStatus: 'verified',
    sources: [
      {
        id: 'epstein-npa-2008',
        title: 'Non-Prosecution Agreement - United States v. Jeffrey Epstein',
        type: 'court_document',
        author: 'U.S. Attorney SDFL',
        publication: 'Southern District of Florida',
        publicationDate: '2008-06-30',
        reliability: 'high',
        description: 'Official non-prosecution agreement document',
        tags: ['plea-deal', 'npa', 'agreement', 'controversial']
      }
    ],
    evidence: ['non-prosecution-agreement', 'plea-deal-terms'],
    tags: ['plea-deal', 'controversial', 'non-prosecution', 'lenient-sentence'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'epstein-guilty-plea',
    title: 'Epstein Pleads Guilty to State Charges',
    description: 'Jeffrey Epstein pleads guilty to two felony prostitution charges in Florida state court.',
    date: '2008-06-30',
    type: 'legal',
    category: 'criminal',
    significance: 'critical',
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'defendant', description: 'Pleaded guilty to charges' }
    ],
    relatedEvents: ['epstein-plea-deal-2008', 'epstein-sentencing-2008'],
    consequences: ['Registered as sex offender', 'Avoided federal trafficking charges'],
    verificationStatus: 'verified',
    sources: [
      {
        id: 'guilty-plea-transcript',
        title: 'Guilty Plea Transcript - State of Florida v. Jeffrey Epstein',
        type: 'court_document',
        author: 'Palm Beach County Court',
        publication: 'State of Florida',
        publicationDate: '2008-06-30',
        reliability: 'high',
        description: 'Official guilty plea hearing transcript',
        tags: ['guilty-plea', 'state-charges', 'prostitution']
      }
    ],
    evidence: ['guilty-plea-transcript', 'court-hearing-records'],
    tags: ['guilty-plea', 'state-charges', 'sex-offender', 'conviction'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'victims-rights-violation',
    title: 'Federal Judge Rules Victims\' Rights Violated',
    description: 'Federal Judge Kenneth Marra rules that the Crime Victims\' Rights Act was violated when victims were not informed of the plea deal.',
    date: '2019-02-21',
    type: 'legal',
    category: 'civil',
    significance: 'high',
    entities: [
      { entityId: 'judge-kenneth-marra', entityType: 'person', role: 'judge', description: 'Ruled on victims\' rights violation' },
      { entityId: 'alexander-acosta', entityType: 'person', role: 'violator', description: 'Found to have violated victims\' rights' }
    ],
    relatedEvents: ['epstein-plea-deal-2008', 'victims-civil-suits'],
    consequences: ['Plea deal legally challenged', 'Victims\' rights vindicated'],
    verificationStatus: 'verified',
    sources: [
      {
        id: 'marra-ruling-2019',
        title: 'Federal Court Ruling - Crime Victims\' Rights Act Violation',
        type: 'court_document',
        author: 'Judge Kenneth Marra',
        publication: 'U.S. District Court SDFL',
        publicationDate: '2019-02-21',
        reliability: 'high',
        description: 'Federal court ruling on victims\' rights violation',
        tags: ['court-ruling', 'victims-rights', 'violation']
      }
    ],
    evidence: ['marra-court-ruling', 'victims-rights-documentation'],
    tags: ['victims-rights', 'court-ruling', 'violation', 'plea-deal-challenge'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'epstein-sentencing-2008',
    title: 'Epstein Sentenced to 13 Months',
    description: 'Jeffrey Epstein is sentenced to 13 months in Palm Beach County Jail with work release privileges.',
    date: '2008-06-30',
    type: 'legal',
    category: 'criminal',
    significance: 'critical',
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'convict', description: 'Sentenced to jail time' }
    ],
    relatedEvents: ['epstein-guilty-plea', 'epstein-jail-time'],
    consequences: ['Minimal incarceration time', 'Work release privileges granted'],
    verificationStatus: 'verified',
    sources: [
      {
        id: 'sentencing-order-2008',
        title: 'Sentencing Order - State of Florida v. Jeffrey Epstein',
        type: 'court_document',
        author: 'Palm Beach County Court',
        publication: 'State of Florida',
        publicationDate: '2008-06-30',
        reliability: 'high',
        description: 'Official sentencing order and terms',
        tags: ['sentencing', 'jail-time', 'work-release']
      }
    ],
    evidence: ['sentencing-order', 'jail-commitment-papers'],
    tags: ['sentencing', 'jail-time', 'lenient', 'work-release'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'epstein-jail-time',
    title: 'Epstein Serves Time with Privileges',
    description: 'Jeffrey Epstein serves 13 months in Palm Beach County Jail, with 12 hours daily work release at his office.',
    date: '2008-07-01',
    endDate: '2009-07-22',
    type: 'legal',
    category: 'criminal',
    significance: 'medium',
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'inmate', description: 'Served jail sentence with work release' }
    ],
    relatedEvents: ['epstein-sentencing-2008', 'epstein-release-2009'],
    consequences: ['Continued business operations while incarcerated', 'Maintained social connections'],
    verificationStatus: 'verified',
    sources: [
      {
        id: 'jail-records-2008-2009',
        title: 'Incarceration Records - Jeffrey Epstein',
        type: 'government_document',
        author: 'Palm Beach County Sheriff',
        publication: 'Palm Beach County',
        publicationDate: '2009-07-22',
        reliability: 'high',
        description: 'Complete jail incarceration records',
        tags: ['incarceration', 'work-release', 'jail-time']
      }
    ],
    evidence: ['jail-records', 'work-release-logs', 'visitor-records'],
    tags: ['incarceration', 'work-release', 'privileges', 'lenient-treatment'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'miami-herald-investigation',
    title: 'Miami Herald "Perversion of Justice" Series Published',
    description: 'Julie K. Brown publishes groundbreaking investigation series exposing the Epstein case and plea deal.',
    date: '2018-11-28',
    type: 'media',
    category: 'other',
    significance: 'critical',
    entities: [
      { entityId: 'julie-brown', entityType: 'person', role: 'journalist', description: 'Led investigative series' },
      { entityId: 'miami-herald', entityType: 'organization', role: 'publisher', description: 'Published investigation' }
    ],
    relatedEvents: ['epstein-plea-deal-2008', 'epstein-arrest-2019'],
    consequences: ['Renewed public interest', 'Led to federal re-investigation'],
    verificationStatus: 'verified',
    sources: [
      {
        id: 'perversion-justice-series',
        title: 'Perversion of Justice: How a future Trump Cabinet member gave a serial sex abuser the deal of a lifetime',
        type: 'news_article',
        author: 'Julie K. Brown',
        publication: 'Miami Herald',
        publicationDate: '2018-11-28',
        url: 'https://www.miamiherald.com/news/local/article220097825.html',
        reliability: 'high',
        description: 'Groundbreaking investigative series on Epstein case',
        tags: ['investigation', 'journalism', 'pulitzer', 'exposé']
      }
    ],
    evidence: ['miami-herald-articles', 'victim-interviews', 'document-analysis'],
    tags: ['investigative-journalism', 'miami-herald', 'exposé', 'public-interest'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'epstein-arrest-2019',
    title: 'Epstein Arrested on Federal Charges',
    description: 'Jeffrey Epstein is arrested at Teterboro Airport on federal charges of sex trafficking of minors.',
    date: '2019-07-06',
    type: 'arrest',
    category: 'criminal',
    significance: 'critical',
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'arrestee', description: 'Arrested on federal charges' },
      { entityId: 'fbi', entityType: 'organization', role: 'arresting-agency', description: 'Made federal arrest' },
      { entityId: 'teterboro-airport', entityType: 'location', role: 'arrest-location', description: 'Location of arrest' }
    ],
    relatedEvents: ['miami-herald-investigation', 'epstein-indictment-2019'],
    consequences: ['Federal prosecution resumed', 'No bail granted'],
    verificationStatus: 'verified',
    sources: [
      {
        id: 'epstein-arrest-2019-record',
        title: 'Federal Arrest Record - Jeffrey Edward Epstein',
        type: 'government_document',
        author: 'FBI',
        publication: 'Federal Bureau of Investigation',
        publicationDate: '2019-07-06',
        reliability: 'high',
        description: 'Official federal arrest record and charges',
        tags: ['federal-arrest', 'trafficking', 'charges']
      }
    ],
    evidence: ['federal-arrest-record', 'indictment-documents'],
    tags: ['federal-arrest', 'trafficking-charges', 'no-bail', 'teterboro'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'epstein-indictment-2019',
    title: 'Federal Indictment Unsealed',
    description: 'Federal indictment against Jeffrey Epstein unsealed, charging conspiracy to commit sex trafficking of minors.',
    date: '2019-07-08',
    type: 'legal',
    category: 'criminal',
    significance: 'critical',
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'defendant', description: 'Federally indicted' },
      { entityId: 'sdny', entityType: 'organization', role: 'prosecutor', description: 'Filed indictment' }
    ],
    relatedEvents: ['epstein-arrest-2019', 'epstein-bail-denied'],
    consequences: ['Federal charges formally filed', 'Potential life sentence'],
    verificationStatus: 'verified',
    sources: [
      {
        id: 'epstein-indictment-2019-doc',
        title: 'Federal Indictment - United States v. Jeffrey Epstein',
        type: 'court_document',
        author: 'U.S. Attorney SDNY',
        publication: 'Southern District of New York',
        publicationDate: '2019-07-08',
        reliability: 'high',
        description: 'Official federal indictment document',
        tags: ['indictment', 'federal-charges', 'trafficking']
      }
    ],
    evidence: ['federal-indictment', 'charging-documents'],
    tags: ['federal-indictment', 'trafficking', 'conspiracy', 'sdny'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'epstein-bail-denied',
    title: 'Bail Denied for Epstein',
    description: 'Federal Judge Richard Berman denies bail for Jeffrey Epstein, citing flight risk and danger to community.',
    date: '2019-07-18',
    type: 'legal',
    category: 'criminal',
    significance: 'high',
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'defendant', description: 'Denied bail' },
      { entityId: 'judge-richard-berman', entityType: 'person', role: 'judge', description: 'Denied bail application' }
    ],
    relatedEvents: ['epstein-indictment-2019', 'epstein-death-2019'],
    consequences: ['Remained in federal custody', 'Awaited trial in jail'],
    verificationStatus: 'verified',
    sources: [
      {
        id: 'bail-denial-order-2019',
        title: 'Bail Denial Order - United States v. Jeffrey Epstein',
        type: 'court_document',
        author: 'Judge Richard Berman',
        publication: 'U.S. District Court SDNY',
        publicationDate: '2019-07-18',
        reliability: 'high',
        description: 'Federal court order denying bail',
        tags: ['bail-denial', 'flight-risk', 'custody']
      }
    ],
    evidence: ['bail-denial-order', 'flight-risk-assessment'],
    tags: ['bail-denied', 'flight-risk', 'federal-custody', 'pretrial-detention'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'epstein-death-2019',
    title: 'Jeffrey Epstein Found Dead in Cell',
    description: 'Jeffrey Epstein is found dead in his cell at Metropolitan Correctional Center, ruled suicide by hanging.',
    date: '2019-08-10',
    type: 'other',
    category: 'criminal',
    significance: 'critical',
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'deceased', description: 'Found dead in federal custody' },
      { entityId: 'mcc-nyc', entityType: 'location', role: 'death-location', description: 'Metropolitan Correctional Center' }
    ],
    relatedEvents: ['epstein-bail-denied', 'autopsy-results'],
    consequences: ['Federal case terminated', 'Co-conspirator investigations continue'],
    verificationStatus: 'verified',
    sources: [
      {
        id: 'epstein-death-report',
        title: 'Death Investigation Report - Jeffrey Edward Epstein',
        type: 'government_document',
        author: 'DOJ Office of Inspector General',
        publication: 'U.S. Department of Justice',
        publicationDate: '2019-08-27',
        reliability: 'high',
        description: 'Official death investigation report',
        tags: ['death', 'suicide', 'investigation', 'custody']
      }
    ],
    evidence: ['death-scene-photos', 'autopsy-report', 'surveillance-footage'],
    tags: ['death', 'suicide', 'federal-custody', 'controversial'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'maxwell-arrest-2020',
    title: 'Ghislaine Maxwell Arrested',
    description: 'Ghislaine Maxwell is arrested by federal agents in New Hampshire on charges related to Epstein trafficking network.',
    date: '2020-07-02',
    type: 'arrest',
    category: 'criminal',
    significance: 'critical',
    entities: [
      { entityId: 'ghislaine-maxwell', entityType: 'person', role: 'arrestee', description: 'Arrested on trafficking charges' },
      { entityId: 'fbi', entityType: 'organization', role: 'arresting-agency', description: 'Made federal arrest' }
    ],
    relatedEvents: ['epstein-death-2019', 'maxwell-trial-2021'],
    consequences: ['Key Epstein associate charged', 'Trafficking network prosecution continues'],
    verificationStatus: 'verified',
    sources: [
      {
        id: 'maxwell-arrest-2020-record',
        title: 'Federal Arrest Record - Ghislaine Noelle Marion Maxwell',
        type: 'government_document',
        author: 'FBI',
        publication: 'Federal Bureau of Investigation',
        publicationDate: '2020-07-02',
        reliability: 'high',
        description: 'Official federal arrest record',
        tags: ['arrest', 'maxwell', 'trafficking', 'accomplice']
      }
    ],
    evidence: ['maxwell-arrest-record', 'federal-charges'],
    tags: ['maxwell-arrest', 'accomplice', 'trafficking', 'federal-charges'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'maxwell-trial-2021',
    title: 'Ghislaine Maxwell Trial Begins',
    description: 'Federal trial of Ghislaine Maxwell begins in New York on charges of sex trafficking and conspiracy.',
    date: '2021-11-29',
    type: 'legal',
    category: 'criminal',
    significance: 'critical',
    entities: [
      { entityId: 'ghislaine-maxwell', entityType: 'person', role: 'defendant', description: 'On trial for trafficking' },
      { entityId: 'sdny', entityType: 'organization', role: 'prosecutor', description: 'Prosecuting the case' }
    ],
    relatedEvents: ['maxwell-arrest-2020', 'maxwell-conviction-2021'],
    consequences: ['Key Epstein case testimony', 'Victims testify publicly'],
    verificationStatus: 'verified',
    sources: [
      {
        id: 'maxwell-trial-transcripts',
        title: 'Trial Transcripts - United States v. Ghislaine Maxwell',
        type: 'court_document',
        author: 'U.S. District Court SDNY',
        publication: 'Southern District of New York',
        publicationDate: '2021-11-29',
        reliability: 'high',
        description: 'Official trial proceedings and testimony',
        tags: ['trial', 'testimony', 'trafficking', 'conviction']
      }
    ],
    evidence: ['trial-transcripts', 'victim-testimony', 'evidence-exhibits'],
    tags: ['maxwell-trial', 'trafficking', 'testimony', 'justice'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'maxwell-conviction-2021',
    title: 'Ghislaine Maxwell Convicted',
    description: 'Ghislaine Maxwell is convicted on 5 of 6 federal charges including sex trafficking of minors.',
    date: '2021-12-29',
    type: 'legal',
    category: 'criminal',
    significance: 'critical',
    entities: [
      { entityId: 'ghislaine-maxwell', entityType: 'person', role: 'convict', description: 'Convicted on trafficking charges' }
    ],
    relatedEvents: ['maxwell-trial-2021', 'maxwell-sentencing-2022'],
    consequences: ['Key accomplice convicted', 'Victims receive justice'],
    verificationStatus: 'verified',
    sources: [
      {
        id: 'maxwell-verdict-2021',
        title: 'Jury Verdict - United States v. Ghislaine Maxwell',
        type: 'court_document',
        author: 'U.S. District Court SDNY',
        publication: 'Southern District of New York',
        publicationDate: '2021-12-29',
        reliability: 'high',
        description: 'Official jury verdict on all charges',
        tags: ['conviction', 'verdict', 'trafficking', 'guilty']
      }
    ],
    evidence: ['jury-verdict', 'conviction-record'],
    tags: ['maxwell-conviction', 'trafficking', 'justice', 'accomplice'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'maxwell-sentencing-2022',
    title: 'Maxwell Sentenced to 20 Years',
    description: 'Ghislaine Maxwell is sentenced to 20 years in federal prison for her role in Epstein\'s trafficking network.',
    date: '2022-06-28',
    type: 'legal',
    category: 'criminal',
    significance: 'critical',
    entities: [
      { entityId: 'ghislaine-maxwell', entityType: 'person', role: 'convict', description: 'Sentenced to 20 years prison' }
    ],
    relatedEvents: ['maxwell-conviction-2021'],
    consequences: ['Major accomplice imprisoned', 'Deterrent effect established'],
    verificationStatus: 'verified',
    sources: [
      {
        id: 'maxwell-sentencing-2022',
        title: 'Sentencing Order - United States v. Ghislaine Maxwell',
        type: 'court_document',
        author: 'Judge Alison Nathan',
        publication: 'U.S. District Court SDNY',
        publicationDate: '2022-06-28',
        reliability: 'high',
        description: 'Official sentencing order and statement',
        tags: ['sentencing', 'prison', 'trafficking', 'justice']
      }
    ],
    evidence: ['sentencing-order', 'victim-impact-statements'],
    tags: ['maxwell-sentencing', 'prison', 'justice', 'accountability'],
    lastUpdated: '2024-01-15T00:00:00Z'
  }
];

export const getEvent = (id: string): TimelineEvent | undefined => {
  return comprehensiveTimeline.find(event => event.id === id);
};

export const getEventsByDateRange = (startDate: string, endDate: string): TimelineEvent[] => {
  return comprehensiveTimeline.filter(event => {
    const eventDate = new Date(event.date);
    const start = new Date(startDate);
    const end = new Date(endDate);
    return eventDate >= start && eventDate <= end;
  });
};

export const getEventsByType = (type: string): TimelineEvent[] => {
  return comprehensiveTimeline.filter(event => event.type === type);
};

export const getEventsBySignificance = (significance: string): TimelineEvent[] => {
  return comprehensiveTimeline.filter(event => event.significance === significance);
};

export const getRelatedEvents = (eventId: string): TimelineEvent[] => {
  const event = getEvent(eventId);
  if (!event) return [];
  
  return comprehensiveTimeline.filter(e => 
    event.relatedEvents.includes(e.id) || 
    e.relatedEvents.includes(eventId)
  );
};

export const searchEvents = (query: string): TimelineEvent[] => {
  const lowercaseQuery = query.toLowerCase();
  return comprehensiveTimeline.filter(event =>
    event.title.toLowerCase().includes(lowercaseQuery) ||
    event.description.toLowerCase().includes(lowercaseQuery) ||
    event.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    event.entities.some(entity => entity.description?.toLowerCase().includes(lowercaseQuery))
  );
}; 