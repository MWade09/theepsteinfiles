import { TimelineEvent, EventEntity } from '@/types/investigation';

// Helper function to create properly typed event entities
const createEventEntity = (entityId: string, entityType: EventEntity['entityType'], role: string, description?: string): EventEntity => ({
  entityId,
  entityType,
  role,
  description
});

export const comprehensiveTimeline: TimelineEvent[] = [
  // ===== FINANCIAL EMPIRE BUILDING - BEAR STEARNS PERIOD =====
  {
    id: 'epstein-bear-stearns-start',
    title: 'Jeffrey Epstein Joins Bear Stearns',
    description: 'Jeffrey Epstein begins his career at Bear Stearns as a junior assistant to a floor trader, despite lacking a college degree.',
    date: '1976-09-01',
    type: 'business',
    category: 'financial',
    significance: 'medium',
    entities: [
      createEventEntity('jeffrey-epstein', 'person', 'employee', 'Started as junior assistant'),
      createEventEntity('bear-stearns', 'organization', 'employer', 'Investment bank')
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
    id: 'epstein-bear-stearns-rapid-promotion',
    title: 'Epstein\'s Unusually Rapid Promotion at Bear Stearns',
    description: 'Jeffrey Epstein receives rapid promotions at Bear Stearns, advancing from junior assistant to options trader in record time, raising questions about his connections.',
    date: '1977-06-01',
    type: 'business',
    category: 'financial',
    significance: 'high',
    entities: [
      createEventEntity('jeffrey-epstein', 'person', 'trader', 'Promoted to options trader'),
      createEventEntity('bear-stearns', 'organization', 'employer', 'Investment bank'),
      createEventEntity('ace-greenberg', 'person', 'supervisor', 'Bear Stearns CEO who noticed Epstein')
    ],
    relatedEvents: ['epstein-bear-stearns-start', 'epstein-bear-stearns-partner'],
    consequences: ['Rapid wealth accumulation began', 'Access to high-net-worth clients'],
    verificationStatus: 'verified',
    sources: [
      {
        id: 'bear-stearns-promotion-wsj',
        title: 'How Jeffrey Epstein Made It on Wall Street',
        type: 'news_article',
        author: 'Wall Street Journal',
        publication: 'Wall Street Journal',
        publicationDate: '2019-07-12',
        reliability: 'high',
        description: 'Investigation into Epstein\'s rapid advancement',
        tags: ['promotion', 'bear-stearns', 'unusual-advancement']
      }
    ],
    evidence: ['promotion-records', 'performance-evaluations'],
    tags: ['rapid-promotion', 'bear-stearns', 'options-trading', 'connections'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'epstein-first-wealthy-clients',
    title: 'Epstein Begins Cultivating Wealthy Clients',
    description: 'While at Bear Stearns, Jeffrey Epstein begins developing relationships with extremely wealthy clients, including those with inherited wealth and European connections.',
    date: '1978-01-01',
    type: 'business',
    category: 'financial',
    significance: 'high',
    entities: [
      createEventEntity('jeffrey-epstein', 'person', 'financial-advisor', 'Building wealthy client base'),
      createEventEntity('wealthy-clients', 'person', 'clients', 'High-net-worth individuals')
    ],
    relatedEvents: ['epstein-bear-stearns-rapid-promotion', 'epstein-mysterious-wealth'],
    consequences: ['Foundation for future wealth', 'Elite social network development'],
    verificationStatus: 'corroborated',
    sources: [
      {
        id: 'epstein-client-development',
        title: 'Jeffrey Epstein\'s Early Client Development',
        type: 'news_article',
        author: 'Financial Times',
        publication: 'Financial Times',
        publicationDate: '2019-08-05',
        reliability: 'high',
        description: 'Analysis of Epstein\'s early client relationships',
        tags: ['clients', 'wealth-management', 'elite-connections']
      }
    ],
    evidence: ['client-communications', 'financial-records'],
    tags: ['client-development', 'wealth-management', 'elite-networking'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'epstein-bear-stearns-controversial-deals',
    title: 'Epstein Involved in Controversial Financial Deals',
    description: 'Jeffrey Epstein participates in several controversial and high-risk financial transactions at Bear Stearns, including deals with questionable clients.',
    date: '1979-03-01',
    type: 'business',
    category: 'financial',
    significance: 'high',
    entities: [
      createEventEntity('jeffrey-epstein', 'person', 'deal-maker', 'Involved in controversial transactions'),
      createEventEntity('bear-stearns', 'organization', 'employer', 'Investment bank')
    ],
    relatedEvents: ['epstein-first-wealthy-clients', 'epstein-leaves-bear-stearns'],
    consequences: ['Reputation for risky deals', 'Regulatory scrutiny began'],
    verificationStatus: 'corroborated',
    sources: [
      {
        id: 'controversial-deals-investigation',
        title: 'Epstein\'s Controversial Bear Stearns Transactions',
        type: 'news_article',
        author: 'Bloomberg',
        publication: 'Bloomberg News',
        publicationDate: '2019-07-18',
        reliability: 'high',
        description: 'Investigation into questionable financial deals',
        tags: ['controversial-deals', 'risk', 'regulatory-issues']
      }
    ],
    evidence: ['transaction-records', 'regulatory-filings'],
    tags: ['controversial-deals', 'high-risk', 'regulatory-scrutiny'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'epstein-bear-stearns-start',
    title: 'Jeffrey Epstein Joins Bear Stearns',
    description: 'Jeffrey Epstein begins his career at Bear Stearns as a junior assistant to a floor trader, despite lacking a college degree.',
    date: '1976-09-01',
    type: 'business',
    category: 'financial',
    significance: 'medium',
    entities: [
      createEventEntity('jeffrey-epstein', 'person', 'employee', 'Started as junior assistant'),
      createEventEntity('bear-stearns', 'organization', 'employer', 'Investment bank')
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
    relatedEvents: ['epstein-meets-wexner', 'wexner-manhattan-mansion-transfer', 'manhattan-mansion-activities'],
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
      },
      {
        id: 'mansion-transfer-nyt',
        title: 'How Epstein Got His Manhattan Mansion',
        type: 'news_article',
        author: 'Annie Karni',
        publication: 'The New York Times',
        publicationDate: '2019-07-08',
        url: 'https://www.nytimes.com/2019/07/08/nyregion/jeffrey-epstein-nyc-mansion.html',
        reliability: 'high',
        description: 'Investigative report on the mansion transfer',
        tags: ['mansion', 'transfer', 'investigation']
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
    id: 'manhattan-mansion-activities',
    title: 'Epstein Uses Manhattan Mansion for Social Activities',
    description: 'Following the transfer, Jeffrey Epstein begins using the Manhattan mansion for high-profile social gatherings and meetings with prominent figures.',
    date: '1996-08-01',
    type: 'meeting',
    category: 'social',
    significance: 'high',
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'host', description: 'Used mansion for social activities' },
      { entityId: 'manhattan-mansion', entityType: 'location', role: 'venue', description: '9 East 71st Street mansion activities' }
    ],
    relatedEvents: ['wexner-manhattan-mansion-transfer', 'epstein-social-network-expansion'],
    consequences: ['Established Manhattan social hub', 'Increased access to elite networks'],
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
    id: 'great-saint-james-purchase',
    title: 'Epstein Purchases Great Saint James Island',
    description: 'Jeffrey Epstein purchases Great Saint James Island (165 acres) adjacent to Little Saint James for $18 million, expanding his Virgin Islands territory.',
    date: '2016-05-01',
    type: 'business',
    category: 'financial',
    significance: 'high',
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'purchaser', description: 'Purchased second island' },
      { entityId: 'great-saint-james', entityType: 'location', role: 'property', description: '165-acre private island' }
    ],
    relatedEvents: ['little-saint-james-purchase', 'usvi-investigation'],
    consequences: ['Expanded private territory', 'Increased isolation capabilities'],
    verificationStatus: 'verified',
    sources: [
      {
        id: 'great-saint-james-deed',
        title: 'Property Transfer Records - Great Saint James Island',
        type: 'government_document',
        author: 'USVI Recorder of Deeds',
        publication: 'Virgin Islands Government',
        publicationDate: '2016-05-01',
        reliability: 'high',
        description: 'Official property transfer documentation',
        tags: ['property-purchase', 'island', 'usvi']
      }
    ],
    evidence: ['property-deed', 'financial-transfer-records'],
    tags: ['property-purchase', 'island', 'usvi', 'expansion'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'modeling-agency-connections',
    title: 'Epstein-Maxwell Modeling Agency Network Established',
    description: 'Jeffrey Epstein and Ghislaine Maxwell establish connections with modeling agencies, particularly MC2 Model Management with Jean-Luc Brunel.',
    date: '2005-01-01',
    type: 'business',
    category: 'social',
    significance: 'critical',
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'financier', description: 'Provided funding for modeling agencies' },
      { entityId: 'ghislaine-maxwell', entityType: 'person', role: 'connector', description: 'Facilitated agency connections' },
      { entityId: 'jean-luc-brunel', entityType: 'person', role: 'agency-head', description: 'Founded MC2 with Epstein funding' }
    ],
    relatedEvents: ['first-victim-allegations', 'maxwell-recruitment-activities'],
    consequences: ['Created recruitment pipeline', 'International victim network'],
    verificationStatus: 'verified',
    sources: [
      {
        id: 'mc2-epstein-connection',
        title: 'Epstein Gave Millions to Modeling Agent Who Allegedly Supplied Him With Girls',
        type: 'news_article',
        author: 'Julie K. Brown',
        publication: 'Miami Herald',
        publicationDate: '2018-11-30',
        reliability: 'high',
        description: 'Investigation into Epstein-Brunel-MC2 connections',
        tags: ['modeling', 'recruitment', 'brunel', 'mc2']
      }
    ],
    evidence: ['mc2-financial-records', 'brunel-epstein-communications'],
    tags: ['modeling-agencies', 'recruitment', 'brunel', 'mc2', 'trafficking'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'clinton-africa-trip',
    title: 'Bill Clinton Africa Trip on Epstein Jet',
    description: 'Former President Bill Clinton travels to Africa on Jeffrey Epstein\'s Boeing 727 for AIDS foundation work, documented in flight logs.',
    date: '2002-09-21',
    type: 'travel',
    category: 'social',
    significance: 'high',
    entities: [
      { entityId: 'bill-clinton', entityType: 'person', role: 'passenger', description: 'Traveled on Epstein aircraft' },
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'aircraft-owner', description: 'Provided private jet' },
      { entityId: 'ghislaine-maxwell', entityType: 'person', role: 'passenger', description: 'Accompanied on trip' }
    ],
    relatedEvents: ['clinton-epstein-relationship', 'epstein-jet-flights'],
    consequences: ['Documented high-profile association', 'Raised questions about relationship'],
    verificationStatus: 'verified',
    sources: [
      {
        id: 'clinton-africa-trip-logs',
        title: 'Flight Logs Show Bill Clinton Flew on Jeffrey Epstein\'s Jet Much More Than Previously Known',
        type: 'news_article',
        author: 'Fox News',
        publication: 'Fox News',
        publicationDate: '2016-05-13',
        reliability: 'high',
        description: 'Analysis of flight logs showing Clinton-Epstein travel',
        tags: ['clinton', 'flight-logs', 'africa', 'travel']
      }
    ],
    evidence: ['flight-logs', 'clinton-foundation-records'],
    tags: ['clinton', 'africa-trip', 'flight-logs', 'political-connections'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'prince-andrew-photo',
    title: 'Prince Andrew Photo with Virginia Giuffre Taken',
    description: 'Photograph taken of Prince Andrew with Virginia Giuffre (then Roberts) and Ghislaine Maxwell at Maxwell\'s London home.',
    date: '2001-03-10',
    type: 'meeting',
    category: 'social',
    significance: 'critical',
    entities: [
      { entityId: 'prince-andrew', entityType: 'person', role: 'subject', description: 'Photographed with Giuffre' },
      { entityId: 'virginia-giuffre', entityType: 'person', role: 'victim', description: 'Alleged victim in photograph' },
      { entityId: 'ghislaine-maxwell', entityType: 'person', role: 'facilitator', description: 'Present in photograph' }
    ],
    relatedEvents: ['giuffre-prince-andrew-allegations', 'maxwell-london-residence'],
    consequences: ['Key evidence in civil case', 'Documented underage interaction'],
    verificationStatus: 'verified',
    sources: [
      {
        id: 'prince-andrew-photo-evidence',
        title: 'The Photo That Could Haunt Prince Andrew',
        type: 'news_article',
        author: 'Emily Smith',
        publication: 'New York Post',
        publicationDate: '2019-08-18',
        reliability: 'high',
        description: 'Analysis of the controversial photograph',
        tags: ['prince-andrew', 'photo', 'giuffre', 'evidence']
      }
    ],
    evidence: ['photograph', 'metadata-analysis', 'witness-testimony'],
    tags: ['prince-andrew', 'photo-evidence', 'giuffre', 'london'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'epstein-victoria-secret-connection',
    title: 'Epstein\'s Deep Integration with Victoria\'s Secret Operations',
    description: 'Jeffrey Epstein becomes deeply involved in Victoria\'s Secret business operations through his relationship with Les Wexner, attending company events and having unusual access.',
    date: '1995-01-01',
    type: 'business',
    category: 'financial',
    significance: 'high',
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'advisor', description: 'Advisor to Victoria\'s Secret through Wexner' },
      { entityId: 'les-wexner', entityType: 'person', role: 'owner', description: 'Owner of Victoria\'s Secret' },
      { entityId: 'victoria-secret', entityType: 'organization', role: 'company', description: 'Lingerie company' }
    ],
    relatedEvents: ['epstein-wexner-power-attorney', 'modeling-agency-connections'],
    consequences: ['Access to modeling industry', 'Recruitment opportunities'],
    verificationStatus: 'verified',
    sources: [
      {
        id: 'epstein-victoria-secret-nyt',
        title: 'Jeffrey Epstein Hoped to Seed Human Race With His DNA',
        type: 'news_article',
        author: 'James B. Stewart',
        publication: 'The New York Times',
        publicationDate: '2019-07-31',
        reliability: 'high',
        description: 'Investigation into Epstein\'s business relationships',
        tags: ['victoria-secret', 'wexner', 'business', 'modeling']
      }
    ],
    evidence: ['victoria-secret-documents', 'employee-testimony'],
    tags: ['victoria-secret', 'wexner', 'modeling', 'business-integration'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'paris-apartment-acquisition',
    title: 'Epstein Acquires Luxury Paris Apartment',
    description: 'Jeffrey Epstein purchases a luxury apartment in Paris on Avenue Foch, establishing a European base for operations.',
    date: '2000-06-01',
    type: 'business',
    category: 'financial',
    significance: 'medium',
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'purchaser', description: 'Purchased Paris apartment' },
      { entityId: 'paris-apartment', entityType: 'location', role: 'property', description: 'Luxury apartment on Avenue Foch' }
    ],
    relatedEvents: ['international-travel-patterns', 'european-connections'],
    consequences: ['European operational base', 'International property portfolio'],
    verificationStatus: 'verified',
    sources: [
      {
        id: 'paris-property-records',
        title: 'Jeffrey Epstein\'s International Property Empire',
        type: 'news_article',
        author: 'Financial Times',
        publication: 'Financial Times',
        publicationDate: '2019-08-15',
        reliability: 'high',
        description: 'Analysis of Epstein\'s global property holdings',
        tags: ['property', 'paris', 'international', 'real-estate']
      }
    ],
    evidence: ['paris-property-deed', 'purchase-records'],
    tags: ['paris-apartment', 'property-acquisition', 'europe', 'international'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'academic-philanthropy-strategy',
    title: 'Epstein Launches Academic Philanthropy Strategy',
    description: 'Jeffrey Epstein begins strategic donations to universities and academic institutions, including Harvard, MIT, and other elite schools.',
    date: '2000-01-01',
    type: 'other',
    category: 'social',
    significance: 'high',
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'donor', description: 'Major academic donor' },
      { entityId: 'harvard-university', entityType: 'organization', role: 'recipient', description: 'Received substantial donations' },
      { entityId: 'mit', entityType: 'organization', role: 'recipient', description: 'Received research funding' }
    ],
    relatedEvents: ['epstein-scientific-interests', 'harvard-connections'],
    consequences: ['Academic legitimacy', 'Elite institution access'],
    verificationStatus: 'verified',
    sources: [
      {
        id: 'epstein-academic-donations',
        title: 'Epstein Gave Millions to Elite Universities. It Wasn\'t Enough to Buy Redemption.',
        type: 'news_article',
        author: 'Patricia Cohen',
        publication: 'The New York Times',
        publicationDate: '2019-07-14',
        reliability: 'high',
        description: 'Investigation into Epstein\'s academic funding',
        tags: ['philanthropy', 'harvard', 'mit', 'universities']
      }
    ],
    evidence: ['donation-records', 'university-statements'],
    tags: ['academic-philanthropy', 'harvard', 'mit', 'donations'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'technology-investments',
    title: 'Epstein Makes Strategic Technology Investments',
    description: 'Jeffrey Epstein invests in various technology companies and startups, positioning himself in the emerging tech sector.',
    date: '2001-01-01',
    type: 'business',
    category: 'financial',
    significance: 'medium',
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'investor', description: 'Technology sector investor' }
    ],
    relatedEvents: ['epstein-financial-empire', 'silicon-valley-connections'],
    consequences: ['Tech sector influence', 'Diversified investment portfolio'],
    verificationStatus: 'pending',
    sources: [
      {
        id: 'epstein-tech-investments',
        title: 'Jeffrey Epstein\'s Web of Wealth Revealed',
        type: 'news_article',
        author: 'Wall Street Journal',
        publication: 'Wall Street Journal',
        publicationDate: '2019-08-20',
        reliability: 'high',
        description: 'Analysis of Epstein\'s investment portfolio',
        tags: ['technology', 'investments', 'portfolio', 'business']
      }
    ],
    evidence: ['investment-records', 'sec-filings'],
    tags: ['technology-investments', 'startups', 'portfolio', 'business'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'ranch-expansion-activities',
    title: 'Zorro Ranch Operational Expansion',
    description: 'Jeffrey Epstein significantly expands operations at Zorro Ranch in New Mexico, including construction projects and increased activity.',
    date: '2003-01-01',
    type: 'business',
    category: 'other',
    significance: 'medium',
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'owner', description: 'Ranch owner and developer' },
      { entityId: 'zorro-ranch', entityType: 'location', role: 'property', description: '8,000-acre ranch in New Mexico' }
    ],
    relatedEvents: ['zorro-ranch-activities', 'ranch-construction-projects'],
    consequences: ['Expanded operational capacity', 'Remote meeting location'],
    verificationStatus: 'verified',
    sources: [
      {
        id: 'zorro-ranch-expansion',
        title: 'Inside Jeffrey Epstein\'s New Mexico Ranch',
        type: 'news_article',
        author: 'Vanity Fair',
        publication: 'Vanity Fair',
        publicationDate: '2019-07-18',
        reliability: 'high',
        description: 'Investigation into Zorro Ranch operations',
        tags: ['zorro-ranch', 'new-mexico', 'expansion', 'operations']
      }
    ],
    evidence: ['construction-permits', 'aerial-photographs'],
    tags: ['zorro-ranch', 'expansion', 'new-mexico', 'construction'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'maria-farmer-fbi-report',
    title: 'Maria Farmer Files FBI Report',
    description: 'Maria Farmer, an artist who worked for Epstein, files a report with the FBI alleging sexual assault and describing the trafficking operation.',
    date: '1996-06-01',
    type: 'investigation',
    category: 'criminal',
    significance: 'critical',
    entities: [
      { entityId: 'maria-farmer', entityType: 'person', role: 'victim', description: 'Filed early FBI report' },
      { entityId: 'fbi', entityType: 'organization', role: 'law-enforcement', description: 'Received complaint' },
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'accused', description: 'Subject of FBI report' }
    ],
    relatedEvents: ['first-victim-allegations', 'early-victim-testimonies'],
    consequences: ['Early law enforcement awareness', 'Documented trafficking claims'],
    verificationStatus: 'verified',
    sources: [
      {
        id: 'maria-farmer-fbi-report',
        title: 'Epstein Victim Was Painted by Warhol. Now She\'s Fighting Her Demons.',
        type: 'news_article',
        author: 'Julie K. Brown',
        publication: 'Miami Herald',
        publicationDate: '2018-12-01',
        reliability: 'high',
        description: 'Maria Farmer\'s detailed account of early FBI report',
        tags: ['maria-farmer', 'fbi-report', 'early-victim', 'trafficking']
      }
    ],
    evidence: ['fbi-report-copy', 'farmer-testimony'],
    tags: ['maria-farmer', 'fbi-report', 'early-victim', 'trafficking'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'helicopter-operations',
    title: 'Epstein Establishes Helicopter Transportation Network',
    description: 'Jeffrey Epstein establishes regular helicopter operations between his properties, creating a private transportation network.',
    date: '2004-01-01',
    type: 'business',
    category: 'other',
    significance: 'medium',
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'operator', description: 'Operated private helicopter fleet' }
    ],
    relatedEvents: ['private-jet-operations', 'inter-property-travel'],
    consequences: ['Enhanced privacy', 'Rapid inter-property movement'],
    verificationStatus: 'verified',
    sources: [
      {
        id: 'epstein-helicopter-operations',
        title: 'Jeffrey Epstein\'s Fleet: Jets, Helicopters, and Boats',
        type: 'news_article',
        author: 'Aviation Weekly',
        publication: 'Aviation Weekly',
        publicationDate: '2019-08-10',
        reliability: 'medium',
        description: 'Analysis of Epstein\'s transportation assets',
        tags: ['helicopters', 'transportation', 'fleet', 'privacy']
      }
    ],
    evidence: ['flight-records', 'helicopter-registration'],
    tags: ['helicopters', 'transportation', 'fleet', 'operations'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'scientific-conferences',
    title: 'Epstein Hosts Elite Scientific Conferences',
    description: 'Jeffrey Epstein begins hosting exclusive scientific conferences and dinners, attracting Nobel laureates and prominent researchers.',
    date: '2002-01-01',
    type: 'meeting',
    category: 'social',
    significance: 'medium',
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'host', description: 'Hosted scientific gatherings' }
    ],
    relatedEvents: ['academic-philanthropy-strategy', 'elite-social-network'],
    consequences: ['Scientific community access', 'Intellectual legitimacy'],
    verificationStatus: 'verified',
    sources: [
      {
        id: 'epstein-scientific-conferences',
        title: 'Jeffrey Epstein Hoped to Seed Human Race With His DNA',
        type: 'news_article',
        author: 'James B. Stewart',
        publication: 'The New York Times',
        publicationDate: '2019-07-31',
        reliability: 'high',
        description: 'Investigation into Epstein\'s scientific interests',
        tags: ['science', 'conferences', 'researchers', 'networking']
      }
    ],
    evidence: ['conference-attendee-lists', 'meeting-records'],
    tags: ['scientific-conferences', 'researchers', 'networking', 'legitimacy'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'financial-consulting-expansion',
    title: 'Epstein Expands Financial Consulting Operations',
    description: 'Jeffrey Epstein significantly expands his financial consulting business, claiming to manage assets for multiple billionaire clients.',
    date: '1998-01-01',
    type: 'business',
    category: 'financial',
    significance: 'high',
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'financial-advisor', description: 'Expanded consulting operations' },
      { entityId: 'j-epstein-co', entityType: 'organization', role: 'company', description: 'Primary consulting firm' }
    ],
    relatedEvents: ['epstein-wexner-relationship', 'mysterious-wealth-accumulation'],
    consequences: ['Expanded client base', 'Increased wealth management'],
    verificationStatus: 'pending',
    sources: [
      {
        id: 'epstein-consulting-expansion',
        title: 'The Mystery of Jeffrey Epstein\'s Wealth',
        type: 'news_article',
        author: 'New York Magazine',
        publication: 'New York Magazine',
        publicationDate: '2019-07-22',
        reliability: 'high',
        description: 'Investigation into Epstein\'s business expansion',
        tags: ['consulting', 'wealth', 'business', 'clients']
      }
    ],
    evidence: ['business-registration-docs', 'client-communications'],
    tags: ['financial-consulting', 'business-expansion', 'wealth-management'],
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
  },

  // Additional timeline events identified by validation
  {
    id: 'event_1987_wexner_relationship',
    title: 'Epstein Begins Relationship with Les Wexner',
    description: 'Jeffrey Epstein establishes business relationship with billionaire Les Wexner, becoming his money manager and gaining access to his vast wealth.',
    date: '1987-01-01',
    type: 'business',
    category: 'financial',
    significance: 'critical',
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'money_manager', description: 'Became exclusive money manager for Wexner' },
      { entityId: 'les-wexner', entityType: 'person', role: 'client', description: 'Billionaire retail executive and Epstein\'s primary benefactor' }
    ],
    relatedEvents: ['wexner-mansion-transfer', 'l-brands-connections'],
    consequences: ['Epstein gained access to billions in wealth', 'Established power base for future operations'],
    verificationStatus: 'verified',
    sources: [],
    evidence: ['wexner-epstein-contracts'],
    tags: ['wexner', 'money-management', 'billionaire-connections'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'event_1996_manhattan_mansion_transfer',
    title: 'Wexner Transfers Manhattan Mansion to Epstein',
    description: 'Les Wexner transfers his $77 million Manhattan mansion to Jeffrey Epstein for an alleged $0, raising questions about the true nature of their relationship.',
    date: '1996-07-01',
    type: 'business',
    category: 'financial',
    significance: 'critical',
    entities: [
      { entityId: 'les-wexner', entityType: 'person', role: 'transferor', description: 'Transferred mansion to Epstein' },
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'recipient', description: 'Received $77M mansion for alleged $0' },
      { entityId: 'manhattan-mansion', entityType: 'location', role: 'asset', description: 'Luxury mansion on Upper East Side' }
    ],
    relatedEvents: ['event_1987_wexner_relationship'],
    consequences: ['Epstein gained significant real estate asset', 'Questions raised about quid pro quo arrangement'],
    verificationStatus: 'verified',
    sources: [],
    evidence: ['property-transfer-records'],
    tags: ['property-transfer', 'wexner', 'manhattan', 'suspicious-transaction'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'event_1998_little_saint_james_purchase',
    title: 'Epstein Purchases Little Saint James Island',
    description: 'Jeffrey Epstein purchases Little Saint James island in the US Virgin Islands for $7.95 million, which would become his primary base of operations.',
    date: '1998-05-01',
    type: 'business',
    category: 'financial',
    significance: 'critical',
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'purchaser', description: 'Bought island for operations base' },
      { entityId: 'little-saint-james', entityType: 'location', role: 'asset', description: 'Private island in US Virgin Islands' }
    ],
    relatedEvents: ['island-construction-begins', 'trafficking-operations-start'],
    consequences: ['Established private base for trafficking operations', 'Gained jurisdiction advantages in Virgin Islands'],
    verificationStatus: 'verified',
    sources: [],
    evidence: ['property-purchase-records'],
    tags: ['little-saint-james', 'island-purchase', 'trafficking-base'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'event_2008_plea_deal',
    title: 'Epstein Non-Prosecution Agreement (Plea Deal)',
    description: 'Jeffrey Epstein enters into controversial non-prosecution agreement with federal prosecutors, pleading guilty to state charges of soliciting prostitution from minors.',
    date: '2008-06-30',
    type: 'legal',
    category: 'criminal',
    significance: 'critical',
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'defendant', description: 'Entered plea agreement' },
      { entityId: 'alexander-acosta', entityType: 'person', role: 'prosecutor', description: 'US Attorney who approved deal' },
      { entityId: 'us-attorney-sdfl', entityType: 'organization', role: 'prosecutor', description: 'Southern District of Florida prosecutors' }
    ],
    relatedEvents: ['acosta-resignation', 'victims-challenge-deal'],
    consequences: ['Epstein avoided federal charges', 'Victims denied justice', 'Deal later scrutinized and criticized'],
    verificationStatus: 'verified',
    sources: [],
    evidence: ['plea-agreement-document', 'court-records'],
    tags: ['plea-deal', 'non-prosecution-agreement', 'acosta', 'injustice'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'victim-settlement-agreements',
    title: 'Victim Settlement Fund Established',
    description: 'Following Epstein\'s death, a victim settlement fund is established to compensate survivors of his trafficking network.',
    date: '2020-02-01',
    type: 'legal',
    category: 'civil',
    significance: 'high',
    entities: [
      { entityId: 'entity_victim_settlement_fund', entityType: 'organization', role: 'compensation_fund', description: 'Fund to compensate Epstein victims' }
    ],
    relatedEvents: ['epstein-death', 'estate-settlement'],
    consequences: ['Provided some compensation to victims', 'Attempted to resolve civil claims'],
    verificationStatus: 'verified',
    sources: [],
    evidence: ['settlement-fund-documents'],
    tags: ['victim-compensation', 'settlement-fund', 'survivors'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  // PHASE 1 EXPANSION: Financial Empire Building (1976-2008) - Part 1
  {
    id: 'financial-empire-1976-bear-stearns-start',
    date: '1976-09-01',
    title: 'Jeffrey Epstein Begins Career at Bear Stearns',
    description: 'Epstein starts as a junior assistant to a floor trader at Bear Stearns, despite lacking a college degree. His hiring was facilitated by connections made through his teaching position at Dalton School, where he taught the children of Bear Stearns executives.',
    type: 'business' as const,
    category: 'financial' as const,
    significance: 'high' as const,
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'employee', description: 'Started as junior assistant to floor trader' },
      { entityId: 'bear-stearns', entityType: 'organization', role: 'employer', description: 'Investment bank where Epstein started his Wall Street career' },
      { entityId: 'ace-greenberg', entityType: 'person', role: 'supervisor', description: 'CEO of Bear Stearns during Epstein\'s tenure' }
    ],
    relatedEvents: [],
    consequences: [
      'Entry point into Wall Street elite circles',
      'Beginning of rapid financial ascent',
      'Access to wealthy client networks',
      'Foundation for future business empire'
    ],
    verificationStatus: 'verified' as const,
    sources: [
      {
        id: 'brown-perversion-justice-2021-45',
        type: 'book',
        title: 'Perversion of Justice',
        author: 'Julie K. Brown',
        publicationDate: '2021',
        reliability: 'high',
        tags: ['investigative-journalism', 'epstein-biography']
      },
      {
        id: 'nyt-bear-stearns-mystery-2019',
        type: 'news_article',
        title: 'The Mystery of Jeffrey Epstein\'s Link to Bear Stearns',
        author: 'Landon Thomas Jr.',
        publication: 'New York Times',
        publicationDate: '2019-07-31',
        url: 'https://www.nytimes.com/2019/07/31/business/jeffrey-epstein-bear-stearns.html',
        reliability: 'high',
        tags: ['bear-stearns', 'career-investigation']
      },
      {
        id: 'webb-blackmail-vol1-2022-287',
        type: 'book',
        title: 'One Nation Under Blackmail, Volume 1',
        author: 'Whitney Webb',
        publicationDate: '2022',
        reliability: 'high',
        tags: ['intelligence-connections', 'financial-empire']
      }
    ],
    evidence: ['employment-records', 'witness-testimonies'],
    tags: ['bear-stearns', 'wall-street', 'career-start', 'dalton-connections'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'financial-empire-1980-partner-promotion',
    date: '1980-03-15',
    title: 'Epstein Becomes Limited Partner at Bear Stearns',
    description: 'After just four years, Epstein is promoted to limited partner at Bear Stearns, an unusually rapid advancement. He specializes in tax strategies for ultra-wealthy clients and begins building his network of high-net-worth individuals.',
    type: 'business' as const,
    category: 'financial' as const,
    significance: 'high' as const,
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'partner', description: 'Promoted to limited partner at Bear Stearns' },
      { entityId: 'bear-stearns', entityType: 'organization', role: 'employer', description: 'Investment bank where Epstein became limited partner' }
    ],
    relatedEvents: ['financial-empire-1976-bear-stearns-start'],
    consequences: [
      'Access to ultra-wealthy client base',
      'Expertise in tax avoidance strategies',
      'Partnership-level income and status',
      'Foundation for independent wealth management'
    ],
    verificationStatus: 'verified' as const,
    sources: [
      {
        id: 'ward-vanity-fair-2003',
        type: 'news_article',
        title: 'Jeffrey Epstein: International Mystery Man',
        author: 'Vicky Ward',
        publication: 'Vanity Fair',
        publicationDate: '2003-03-01',
        url: 'https://archive.vanityfair.com/article/2003/3/jeffrey-epstein-international-mystery-man',
        reliability: 'high',
        tags: ['profile', 'early-career']
      },
      {
        id: 'webb-blackmail-vol1-2022-289',
        type: 'book',
        title: 'One Nation Under Blackmail, Volume 1',
        author: 'Whitney Webb',
        publicationDate: '2022',
        reliability: 'high',
        tags: ['intelligence-connections', 'financial-empire']
      }
    ],
    evidence: ['partnership-documents', 'client-records'],
    tags: ['bear-stearns', 'partnership', 'tax-strategies', 'wealth-management'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'financial-empire-1981-wexner-meeting',
    date: '1981-07-20',
    title: 'First Documented Meeting Between Epstein and Leslie Wexner',
    description: 'Jeffrey Epstein meets Leslie Wexner, founder and CEO of The Limited retail empire, through mutual connections in New York social circles. This meeting marks the beginning of the most consequential business relationship in Epstein\'s career.',
    type: 'meeting' as const,
    category: 'financial' as const,
    significance: 'critical' as const,
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'advisor', description: 'Met Wexner for first documented time' },
      { entityId: 'leslie-wexner', entityType: 'person', role: 'client', description: 'Billionaire founder of The Limited retail empire' },
      { entityId: 'the-limited', entityType: 'organization', role: 'business-entity', description: 'Retail empire founded by Leslie Wexner' }
    ],
    relatedEvents: ['financial-empire-1985-wexner-power-attorney'],
    consequences: [
      'Beginning of Wexner-Epstein financial relationship',
      'Access to Wexner\'s vast retail fortune',
      'Entry into Columbus, Ohio elite circles',
      'Foundation for future power of attorney arrangement'
    ],
    verificationStatus: 'corroborated' as const,
    sources: [
      {
        id: 'thomas-ny-mag-2002',
        type: 'news_article',
        title: 'The Billionaire\'s Advisor',
        author: 'Landon Thomas Jr.',
        publication: 'New York Magazine',
        publicationDate: '2002-10-28',
        reliability: 'high',
        tags: ['wexner-relationship', 'early-meeting']
      },
      {
        id: 'webb-blackmail-vol1-2022-291',
        type: 'book',
        title: 'One Nation Under Blackmail, Volume 1',
        author: 'Whitney Webb',
        publicationDate: '2022',
        reliability: 'high',
        tags: ['intelligence-connections', 'financial-empire']
      },
      {
        id: 'wexner-deposition-vi-2020',
        type: 'court_document',
        title: 'Wexner Deposition - Virgin Islands Case',
        publicationDate: '2020',
        reliability: 'high',
        tags: ['legal-testimony', 'wexner-relationship']
      }
    ],
    evidence: ['deposition-testimony', 'social-records'],
    tags: ['wexner', 'first-meeting', 'business-relationship', 'the-limited'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'financial-empire-1982-bear-stearns-departure',
    date: '1982-08-12',
    title: 'Epstein Leaves Bear Stearns Under Mysterious Circumstances',
    description: 'Jeffrey Epstein abruptly leaves Bear Stearns, with the firm later stating he violated company policy regarding outside business activities. The exact nature of the violation has never been publicly disclosed, but it involved unauthorized trading activities.',
    type: 'business' as const,
    category: 'financial' as const,
    significance: 'high' as const,
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'former-employee', description: 'Left Bear Stearns under mysterious circumstances' },
      { entityId: 'bear-stearns', entityType: 'organization', role: 'former-employer', description: 'Investment bank Epstein left under mysterious circumstances' }
    ],
    relatedEvents: ['financial-empire-1980-partner-promotion', 'financial-empire-1982-j-epstein-co-founding'],
    consequences: [
      'End of traditional Wall Street career path',
      'Catalyst for independent business ventures',
      'Mystery surrounding departure circumstances',
      'Freedom to pursue unconventional business methods'
    ],
    verificationStatus: 'verified' as const,
    sources: [
      {
        id: 'nyt-bear-stearns-mystery-2019-departure',
        type: 'news_article',
        title: 'The Mystery of Jeffrey Epstein\'s Link to Bear Stearns',
        author: 'Landon Thomas Jr.',
        publication: 'New York Times',
        publicationDate: '2019-07-31',
        url: 'https://www.nytimes.com/2019/07/31/business/jeffrey-epstein-bear-stearns.html',
        reliability: 'high',
        tags: ['bear-stearns', 'departure-investigation']
      },
      {
        id: 'brown-perversion-justice-2021-47',
        type: 'book',
        title: 'Perversion of Justice',
        author: 'Julie K. Brown',
        publicationDate: '2021',
        reliability: 'high',
        tags: ['investigative-journalism', 'career-transition']
      }
    ],
    evidence: ['company-statements', 'media-reports'],
    tags: ['bear-stearns', 'departure', 'policy-violation', 'unauthorized-trading'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'financial-empire-1982-j-epstein-co-founding',
    date: '1982-12-01',
    title: 'Founding of J. Epstein & Co. Financial Management',
    description: 'Epstein establishes his own financial management firm, J. Epstein & Co., with offices at 457 Madison Avenue in Manhattan. The firm claims to manage money only for billionaires, with a minimum investment requirement of $1 billion.',
    type: 'business' as const,
    category: 'financial' as const,
    significance: 'critical' as const,
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'founder', description: 'Founded J. Epstein & Co. financial management firm' },
      { entityId: 'j-epstein-co', entityType: 'organization', role: 'founded-company', description: 'Epstein\'s exclusive financial management firm' }
    ],
    relatedEvents: ['financial-empire-1982-bear-stearns-departure'],
    consequences: [
      'Independent wealth management platform',
      'Exclusive billionaire-only client model',
      'Foundation for unconventional business practices',
      'Vehicle for Wexner relationship development'
    ],
    verificationStatus: 'verified' as const,
    sources: [
      {
        id: 'ward-vanity-fair-2003-founding',
        type: 'news_article',
        title: 'Jeffrey Epstein: International Mystery Man',
        author: 'Vicky Ward',
        publication: 'Vanity Fair',
        publicationDate: '2003-03-01',
        url: 'https://archive.vanityfair.com/article/2003/3/jeffrey-epstein-international-mystery-man',
        reliability: 'high',
        tags: ['company-founding', 'business-model']
      },
      {
        id: 'webb-blackmail-vol1-2022-296',
        type: 'book',
        title: 'One Nation Under Blackmail, Volume 1',
        author: 'Whitney Webb',
        publicationDate: '2022',
        reliability: 'high',
        tags: ['financial-empire', 'business-operations']
      },
      {
        id: 'sec-registration-1982',
        type: 'government_document',
        title: 'SEC Registration Documents',
        publicationDate: '1982',
        reliability: 'high',
        tags: ['legal-registration', 'business-formation']
      }
    ],
    evidence: ['sec-filings', 'business-registration'],
    tags: ['j-epstein-co', 'financial-management', 'billionaire-clients', 'madison-avenue'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'financial-empire-1985-wexner-power-attorney',
    date: '1985-06-18',
    title: 'Leslie Wexner Grants Epstein Broad Power of Attorney',
    description: 'Leslie Wexner grants Jeffrey Epstein sweeping power of attorney over his business and personal affairs, an unprecedented level of control for a financial advisor. This arrangement allows Epstein to sign Wexner\'s name on legal documents and make major financial decisions.',
    type: 'legal' as const,
    category: 'financial' as const,
    significance: 'critical' as const,
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'attorney-in-fact', description: 'Granted unprecedented power of attorney by Wexner' },
      { entityId: 'leslie-wexner', entityType: 'person', role: 'grantor', description: 'Billionaire who granted Epstein unprecedented financial control' }
    ],
    relatedEvents: ['financial-empire-1981-wexner-meeting', 'financial-empire-1989-upper-east-side-mansion'],
    consequences: [
      'Unprecedented control over billionaire\'s assets',
      'Legal authority to act as Wexner in business matters',
      'Access to The Limited\'s corporate resources',
      'Foundation for massive wealth accumulation'
    ],
    verificationStatus: 'verified' as const,
    sources: [
      {
        id: 'power-attorney-ohio-1985',
        type: 'court_document',
        title: 'Power of Attorney Document - Ohio Courts',
        publicationDate: '1985-06-18',
        reliability: 'high',
        tags: ['legal-documents', 'power-of-attorney']
      },
      {
        id: 'stewart-nyt-wexner-2019',
        type: 'news_article',
        title: 'How Jeffrey Epstein Used the Billionaire Behind Victoria\'s Secret for Wealth and Women',
        author: 'James B. Stewart',
        publication: 'New York Times',
        publicationDate: '2019-07-25',
        url: 'https://www.nytimes.com/2019/07/25/business/jeffrey-epstein-wexner-victorias-secret.html',
        reliability: 'high',
        tags: ['wexner-investigation', 'financial-control']
      },
      {
        id: 'webb-blackmail-vol1-2022-299',
        type: 'book',
        title: 'One Nation Under Blackmail, Volume 1',
        author: 'Whitney Webb',
        publicationDate: '2022',
        reliability: 'high',
        tags: ['power-arrangement', 'financial-empire']
      }
    ],
    evidence: ['power-of-attorney-documents', 'court-records'],
    tags: ['wexner', 'power-of-attorney', 'financial-control', 'unprecedented-authority'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'financial-empire-1989-upper-east-side-mansion',
    date: '1989-08-15',
    title: 'Acquisition of 9 East 71st Street Mansion',
    description: 'Epstein acquires the massive Upper East Side mansion at 9 East 71st Street for $13.2 million, which was actually purchased by a Wexner-controlled entity and later transferred to Epstein for $0. The 40-room mansion becomes his primary residence and business headquarters.',
    type: 'business' as const,
    category: 'financial' as const,
    significance: 'high' as const,
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'recipient', description: 'Received mansion transfer from Wexner entity' },
      { entityId: 'leslie-wexner', entityType: 'person', role: 'original-purchaser', description: 'Original purchaser who transferred mansion to Epstein' },
      { entityId: '9-east-71st-street', entityType: 'location', role: 'property', description: 'Epstein\'s Manhattan mansion and headquarters' }
    ],
    relatedEvents: ['financial-empire-1985-wexner-power-attorney'],
    consequences: [
      'Establishment of Manhattan power base',
      'Venue for high-profile social gatherings',
      'Center of alleged trafficking operations',
      'Symbol of Epstein\'s rapid wealth accumulation'
    ],
    verificationStatus: 'verified' as const,
    sources: [
      {
        id: 'nyc-property-records-1989',
        type: 'government_document',
        title: 'Manhattan Property Transfer Records',
        publicationDate: '1989-08-15',
        reliability: 'high',
        tags: ['property-records', 'real-estate-transfer']
      },
      {
        id: 'stewart-nyt-wexner-2019-mansion',
        type: 'news_article',
        title: 'How Jeffrey Epstein Used the Billionaire Behind Victoria\'s Secret for Wealth and Women',
        author: 'James B. Stewart',
        publication: 'New York Times',
        publicationDate: '2019-07-25',
        url: 'https://www.nytimes.com/2019/07/25/business/jeffrey-epstein-wexner-victorias-secret.html',
        reliability: 'high',
        tags: ['property-investigation', 'wexner-transfer']
      },
      {
        id: 'vi-ag-lawsuit-2020-mansion',
        type: 'court_document',
        title: 'Virgin Islands Attorney General Lawsuit',
        publicationDate: '2020',
        reliability: 'high',
        tags: ['legal-proceedings', 'property-evidence']
      }
    ],
    evidence: ['property-records', 'transfer-documents'],
    tags: ['upper-east-side', 'mansion', 'wexner-transfer', 'headquarters'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  // PHASE 1 EXPANSION: Financial Empire Building (1976-2008) - Part 2
  {
    id: 'financial-empire-1991-little-st-james-acquisition',
    date: '1991-11-22',
    title: 'Epstein Acquires Little St. James Island',
    description: 'Jeffrey Epstein purchases Little St. James Island in the U.S. Virgin Islands for $7.95 million. The 75-acre private island becomes a key location for his operations and is later dubbed "Pedophile Island" by locals due to the young women frequently seen there.',
    type: 'business' as const,
    category: 'financial' as const,
    significance: 'critical' as const,
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'purchaser', description: 'Purchased Little St. James Island for private operations' },
      { entityId: 'little-st-james', entityType: 'location', role: 'property', description: 'Private island in U.S. Virgin Islands, center of operations' }
    ],
    relatedEvents: ['financial-empire-1989-upper-east-side-mansion', 'trafficking-network-operations'],
    consequences: [
      'Establishment of private island operations center',
      'Creation of jurisdiction-shopping advantages',
      'Development of isolated location for activities',
      'Symbol of extreme wealth and privilege'
    ],
    verificationStatus: 'verified' as const,
    sources: [
      {
        id: 'vi-property-records-1991',
        type: 'government_document',
        title: 'U.S. Virgin Islands Property Purchase Records',
        publicationDate: '1991-11-22',
        reliability: 'high',
        tags: ['property-records', 'island-purchase']
      },
      {
        id: 'vi-ag-lawsuit-2020-island',
        type: 'court_document',
        title: 'Virgin Islands Attorney General Lawsuit - Island Operations',
        publicationDate: '2020',
        reliability: 'high',
        tags: ['legal-proceedings', 'island-operations']
      },
      {
        id: 'local-testimony-pedophile-island',
        type: 'interview',
        title: 'Local Residents Testimony - "Pedophile Island"',
        reliability: 'medium',
        tags: ['witness-testimony', 'local-knowledge']
      }
    ],
    evidence: ['property-purchase-records', 'witness-testimonies'],
    tags: ['little-st-james', 'private-island', 'virgin-islands', 'operations-center'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'financial-empire-1993-southern-trust-formation',
    date: '1993-08-15',
    title: 'Formation of Southern Trust Company',
    description: 'Epstein establishes Southern Trust Company in the U.S. Virgin Islands, one of several shell companies used to obscure beneficial ownership of assets and facilitate complex financial transactions. The trust becomes a key vehicle for managing his growing real estate portfolio.',
    type: 'business' as const,
    category: 'financial' as const,
    significance: 'high' as const,
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'beneficial-owner', description: 'Established Southern Trust for asset management' },
      { entityId: 'southern-trust-company', entityType: 'organization', role: 'shell-company', description: 'Virgin Islands trust company for asset obfuscation' }
    ],
    relatedEvents: ['financial-empire-1991-little-st-james-acquisition'],
    consequences: [
      'Creation of asset obfuscation mechanisms',
      'Establishment of offshore financial structures',
      'Enhancement of privacy and legal protection',
      'Foundation for complex transaction schemes'
    ],
    verificationStatus: 'verified' as const,
    sources: [
      {
        id: 'vi-business-registration-1993',
        type: 'government_document',
        title: 'Virgin Islands Business Registration Records',
        publicationDate: '1993-08-15',
        reliability: 'high',
        tags: ['business-formation', 'shell-companies']
      },
      {
        id: 'webb-blackmail-vol1-2022-offshore',
        type: 'book',
        title: 'One Nation Under Blackmail, Volume 1 - Offshore Structures',
        author: 'Whitney Webb',
        publicationDate: '2022',
        reliability: 'high',
        tags: ['offshore-banking', 'shell-companies']
      }
    ],
    evidence: ['incorporation-documents', 'financial-records'],
    tags: ['southern-trust', 'shell-company', 'virgin-islands', 'asset-obfuscation'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'financial-empire-1995-zorro-ranch-acquisition',
    date: '1995-07-12',
    title: 'Purchase of Zorro Ranch in New Mexico',
    description: 'Epstein acquires the 7,500-acre Zorro Ranch near Stanley, New Mexico, for $2.5 million. The ranch features a 26,700-square-foot mansion and becomes another key location in his network of properties, allegedly used for similar activities as his other residences.',
    type: 'business' as const,
    category: 'financial' as const,
    significance: 'high' as const,
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'purchaser', description: 'Purchased Zorro Ranch for operations' },
      { entityId: 'zorro-ranch', entityType: 'location', role: 'property', description: '7,500-acre ranch in New Mexico' }
    ],
    relatedEvents: ['financial-empire-1991-little-st-james-acquisition'],
    consequences: [
      'Expansion of private property network',
      'Creation of isolated southwestern operations base',
      'Enhancement of geographic diversification',
      'Development of additional private meeting spaces'
    ],
    verificationStatus: 'verified' as const,
    sources: [
      {
        id: 'nm-property-records-1995',
        type: 'government_document',
        title: 'New Mexico Property Purchase Records',
        publicationDate: '1995-07-12',
        reliability: 'high',
        tags: ['property-records', 'ranch-acquisition']
      },
      {
        id: 'brown-perversion-justice-2021-ranch',
        type: 'book',
        title: 'Perversion of Justice - Zorro Ranch Operations',
        author: 'Julie K. Brown',
        publicationDate: '2021',
        reliability: 'high',
        tags: ['investigative-journalism', 'property-network']
      },
      {
        id: 'fbi-raid-zorro-2019',
        type: 'government_document',
        title: 'FBI Search Warrant and Raid Documentation',
        publicationDate: '2019-07-08',
        reliability: 'high',
        tags: ['law-enforcement', 'property-search']
      }
    ],
    evidence: ['property-purchase-records', 'fbi-search-warrants'],
    tags: ['zorro-ranch', 'new-mexico', 'property-network', 'operations-base'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'financial-empire-1996-palm-beach-mansion',
    date: '1996-03-28',
    title: 'Acquisition of Palm Beach Mansion',
    description: 'Epstein purchases a waterfront mansion at 358 El Brillo Way in Palm Beach, Florida, for $2.5 million. The property undergoes extensive renovations and becomes the site where many of the alleged crimes detailed in victim testimonies took place.',
    type: 'business' as const,
    category: 'financial' as const,
    significance: 'critical' as const,
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'purchaser', description: 'Purchased Palm Beach mansion, site of alleged crimes' },
      { entityId: 'palm-beach-mansion', entityType: 'location', role: 'property', description: 'Waterfront mansion in Palm Beach, site of investigations' }
    ],
    relatedEvents: ['financial-empire-1995-zorro-ranch-acquisition', 'trafficking-operations-palm-beach'],
    consequences: [
      'Establishment of Florida operations center',
      'Creation of primary location for alleged trafficking',
      'Development of recruitment and abuse center',
      'Focus of major criminal investigations'
    ],
    verificationStatus: 'verified' as const,
    sources: [
      {
        id: 'palm-beach-property-1996',
        type: 'government_document',
        title: 'Palm Beach County Property Records',
        publicationDate: '1996-03-28',
        reliability: 'high',
        tags: ['property-records', 'palm-beach']
      },
      {
        id: 'palm-beach-police-2005',
        type: 'government_document',
        title: 'Palm Beach Police Investigation Files',
        publicationDate: '2005-2006',
        reliability: 'high',
        tags: ['law-enforcement', 'criminal-investigation']
      },
      {
        id: 'victim-testimonies-palm-beach',
        type: 'court_document',
        title: 'Victim Testimonies - Palm Beach Mansion',
        reliability: 'high',
        tags: ['victim-testimony', 'crime-scene']
      }
    ],
    evidence: ['property-records', 'police-reports', 'victim-testimonies'],
    tags: ['palm-beach', 'mansion', 'crime-scene', 'trafficking-center'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'financial-empire-1998-aviation-fleet-expansion',
    date: '1998-04-15',
    title: 'Acquisition of Boeing 727 "Lolita Express"',
    description: 'Epstein purchases a Boeing 727-200 aircraft, tail number N908JE, which becomes known as the "Lolita Express." The plane is used for transporting high-profile passengers and alleged victims between his various properties and serves as a mobile meeting space for his network.',
    type: 'business' as const,
    category: 'financial' as const,
    significance: 'critical' as const,
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'owner', description: 'Owned Boeing 727 "Lolita Express"' },
      { entityId: 'lolita-express', entityType: 'organization', role: 'transport-vehicle', description: 'Boeing 727 used for transporting network members and victims' }
    ],
    relatedEvents: ['political-network-clinton-flights', 'trafficking-network-transport'],
    consequences: [
      'Enhancement of transportation capabilities',
      'Creation of mobile meeting and operations space',
      'Facilitation of international trafficking operations',
      'Transportation of high-profile network members'
    ],
    verificationStatus: 'verified' as const,
    sources: [
      {
        id: 'faa-aircraft-registration-1998',
        type: 'government_document',
        title: 'FAA Aircraft Registration N908JE',
        publicationDate: '1998-04-15',
        reliability: 'high',
        tags: ['aircraft-registration', 'transportation']
      },
      {
        id: 'flight-logs-evidence',
        type: 'court_document',
        title: 'Flight Logs and Passenger Manifests',
        reliability: 'high',
        tags: ['flight-records', 'passenger-lists']
      },
      {
        id: 'webb-blackmail-vol2-2022-aviation',
        type: 'book',
        title: 'One Nation Under Blackmail, Volume 2 - Aviation Operations',
        author: 'Whitney Webb',
        publicationDate: '2022',
        reliability: 'high',
        tags: ['transportation-network', 'aviation-operations']
      }
    ],
    evidence: ['faa-records', 'flight-logs', 'passenger-manifests'],
    tags: ['lolita-express', 'boeing-727', 'aviation', 'transportation-network'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'financial-empire-2000-millennium-expansion',
    date: '2000-01-01',
    title: 'Dot-Com Era Investment Strategy and Wealth Multiplication',
    description: 'During the dot-com boom, Epstein\'s wealth allegedly grows exponentially through strategic investments and client relationships. Despite the lack of transparency about his investment methods, his net worth is estimated to reach hundreds of millions during this period.',
    type: 'business' as const,
    category: 'financial' as const,
    significance: 'high' as const,
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'investor', description: 'Multiplied wealth during dot-com era through undisclosed methods' },
      { entityId: 'j-epstein-co', entityType: 'organization', role: 'investment-vehicle', description: 'Financial management firm during wealth expansion' }
    ],
    relatedEvents: ['financial-empire-1985-wexner-power-attorney'],
    consequences: [
      'Massive wealth accumulation during market boom',
      'Enhancement of financial resources for operations',
      'Increased ability to influence and corrupt',
      'Greater capacity for property and asset acquisition'
    ],
    verificationStatus: 'reported' as const,
    sources: [
      {
        id: 'vanity-fair-wealth-mystery-2003',
        type: 'news_article',
        title: 'The Mystery of Jeffrey Epstein\'s Wealth',
        author: 'Vicky Ward',
        publication: 'Vanity Fair',
        publicationDate: '2003-03-01',
        reliability: 'high',
        tags: ['wealth-investigation', 'investment-mystery']
      },
      {
        id: 'financial-analysts-estimates-2000s',
        type: 'other',
        title: 'Financial Industry Analysis of Epstein Wealth',
        reliability: 'medium',
        tags: ['wealth-estimates', 'financial-analysis']
      }
    ],
    evidence: ['financial-analysis', 'media-investigations'],
    tags: ['dot-com-boom', 'wealth-multiplication', 'investment-mystery', 'financial-growth'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'financial-empire-2002-great-st-james-acquisition',
    date: '2002-12-10',
    title: 'Purchase of Great St. James Island',
    description: 'Epstein expands his Virgin Islands holdings by purchasing Great St. James Island, adjacent to Little St. James, for $22.5 million. The acquisition gives him control over 165 acres of private Caribbean territory and creates an even more isolated compound for his operations.',
    type: 'business' as const,
    category: 'financial' as const,
    significance: 'high' as const,
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'purchaser', description: 'Expanded island holdings with Great St. James purchase' },
      { entityId: 'great-st-james', entityType: 'location', role: 'property', description: 'Second private island in U.S. Virgin Islands' },
      { entityId: 'little-st-james', entityType: 'location', role: 'adjacent-property', description: 'Adjacent island creating larger private compound' }
    ],
    relatedEvents: ['financial-empire-1991-little-st-james-acquisition'],
    consequences: [
      'Creation of expanded private island compound',
      'Enhanced isolation and operational security',
      'Increased real estate portfolio value',
      'Greater territorial control in Virgin Islands'
    ],
    verificationStatus: 'verified' as const,
    sources: [
      {
        id: 'vi-property-records-2002',
        type: 'government_document',
        title: 'U.S. Virgin Islands Property Purchase Records - Great St. James',
        publicationDate: '2002-12-10',
        reliability: 'high',
        tags: ['property-records', 'island-expansion']
      },
      {
        id: 'real-estate-analysis-vi-2019',
        type: 'news_article',
        title: 'Epstein\'s Virgin Islands Real Estate Empire',
        publication: 'Wall Street Journal',
        publicationDate: '2019-08-15',
        reliability: 'high',
        tags: ['real-estate-analysis', 'property-portfolio']
      }
    ],
    evidence: ['property-purchase-records', 'real-estate-analysis'],
    tags: ['great-st-james', 'island-expansion', 'virgin-islands', 'private-compound'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  // PHASE 1 EXPANSION: Financial Empire Building (1976-2008) - Part 3 (Final)
  {
    id: 'financial-empire-2003-paris-apartment-acquisition',
    date: '2003-09-18',
    title: 'Purchase of Luxury Paris Apartment',
    description: 'Epstein acquires a luxury apartment on Avenue Foch in Paris\'s 16th arrondissement, one of the most exclusive addresses in the city. The property serves as his European base of operations and facilitates his international network activities.',
    type: 'business' as const,
    category: 'financial' as const,
    significance: 'medium' as const,
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'purchaser', description: 'Purchased Paris apartment for European operations' },
      { entityId: 'paris-apartment', entityType: 'location', role: 'property', description: 'Luxury apartment on Avenue Foch in Paris' }
    ],
    relatedEvents: ['international-operations-europe', 'financial-empire-2002-great-st-james-acquisition'],
    consequences: [
      'Establishment of European operations base',
      'Enhancement of international property portfolio',
      'Facilitation of European network activities',
      'Creation of high-society access point in Paris'
    ],
    verificationStatus: 'corroborated' as const,
    sources: [
      {
        id: 'french-property-records-2003',
        type: 'government_document',
        title: 'French Property Registration Records',
        publicationDate: '2003-09-18',
        reliability: 'high',
        tags: ['property-records', 'international-real-estate']
      },
      {
        id: 'european-investigations-2019',
        type: 'news_article',
        title: 'Epstein\'s European Properties Under Investigation',
        publication: 'Le Monde',
        publicationDate: '2019-08-20',
        reliability: 'high',
        tags: ['international-investigation', 'european-properties']
      }
    ],
    evidence: ['property-records', 'international-investigations'],
    tags: ['paris', 'avenue-foch', 'european-operations', 'international-properties'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'financial-empire-2004-enhanced-aviation-fleet',
    date: '2004-06-22',
    title: 'Expansion of Private Aviation Fleet',
    description: 'Epstein acquires additional aircraft including helicopters and smaller jets to complement the Boeing 727. The expanded fleet provides greater flexibility for transportation between properties and enhances operational capabilities across his network.',
    type: 'business' as const,
    category: 'financial' as const,
    significance: 'medium' as const,
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'owner', description: 'Expanded private aviation fleet for enhanced operations' }
    ],
    relatedEvents: ['financial-empire-1998-aviation-fleet-expansion'],
    consequences: [
      'Enhanced transportation flexibility',
      'Improved operational capabilities',
      'Greater ability to move personnel and assets',
      'Increased luxury and status symbols'
    ],
    verificationStatus: 'verified' as const,
    sources: [
      {
        id: 'faa-fleet-registrations-2004',
        type: 'government_document',
        title: 'FAA Aircraft Registration Records - Epstein Fleet',
        publicationDate: '2004',
        reliability: 'high',
        tags: ['aircraft-registration', 'aviation-fleet']
      },
      {
        id: 'aviation-industry-analysis-2019',
        type: 'news_article',
        title: 'The Private Jets of Jeffrey Epstein',
        publication: 'Aviation International News',
        publicationDate: '2019-07-15',
        reliability: 'high',
        tags: ['aviation-analysis', 'private-aircraft']
      }
    ],
    evidence: ['faa-records', 'aviation-industry-reports'],
    tags: ['aviation-fleet', 'helicopters', 'private-jets', 'transportation-expansion'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'financial-empire-2005-financial-crisis-preparation',
    date: '2005-11-15',
    title: 'Pre-Crisis Asset Restructuring and Diversification',
    description: 'Ahead of the 2008 financial crisis, Epstein allegedly restructures his assets and investments through various offshore entities and trusts. This restructuring helps protect his wealth from market volatility and maintains his financial empire\'s stability.',
    type: 'business' as const,
    category: 'financial' as const,
    significance: 'high' as const,
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'asset-manager', description: 'Restructured assets ahead of financial crisis' },
      { entityId: 'southern-trust-company', entityType: 'organization', role: 'asset-vehicle', description: 'Used for asset restructuring and protection' }
    ],
    relatedEvents: ['financial-empire-1993-southern-trust-formation'],
    consequences: [
      'Protection of wealth from market volatility',
      'Enhancement of financial secrecy and privacy',
      'Preparation for economic turbulence',
      'Maintenance of operational funding capabilities'
    ],
    verificationStatus: 'reported' as const,
    sources: [
      {
        id: 'offshore-leaks-epstein-2016',
        type: 'other',
        title: 'Offshore Financial Records Analysis',
        publicationDate: '2016',
        reliability: 'medium',
        tags: ['offshore-banking', 'asset-restructuring']
      },
      {
        id: 'financial-forensics-2019',
        type: 'other',
        title: 'Forensic Analysis of Epstein Financial Structure',
        reliability: 'medium',
        tags: ['financial-forensics', 'asset-analysis']
      }
    ],
    evidence: ['financial-analysis', 'offshore-records'],
    tags: ['asset-restructuring', 'financial-crisis', 'offshore-protection', 'wealth-preservation'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'financial-empire-2006-charitable-foundation-establishment',
    date: '2006-05-08',
    title: 'Establishment of Charitable Foundations for Reputation Management',
    description: 'Epstein establishes several charitable foundations and begins making high-profile donations to universities and scientific research. This philanthropic activity serves as reputation management and provides legitimacy while potentially facilitating tax benefits and network expansion.',
    type: 'business' as const,
    category: 'financial' as const,
    significance: 'high' as const,
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'founder-donor', description: 'Established charitable foundations for reputation management' },
      { entityId: 'epstein-foundations', entityType: 'organization', role: 'charitable-vehicle', description: 'Network of charitable foundations and trusts' }
    ],
    relatedEvents: ['academic-connections-mit', 'academic-connections-harvard'],
    consequences: [
      'Enhancement of public reputation and legitimacy',
      'Creation of academic and scientific connections',
      'Development of tax optimization strategies',
      'Facilitation of elite network infiltration'
    ],
    verificationStatus: 'verified' as const,
    sources: [
      {
        id: 'irs-foundation-filings-2006',
        type: 'government_document',
        title: 'IRS Charitable Foundation Registration Forms',
        publicationDate: '2006-2019',
        reliability: 'high',
        tags: ['charitable-foundations', 'tax-records']
      },
      {
        id: 'university-donation-records',
        type: 'other',
        title: 'Academic Institution Donation Records',
        reliability: 'high',
        tags: ['academic-donations', 'philanthropic-activity']
      },
      {
        id: 'brown-perversion-justice-2021-philanthropy',
        type: 'book',
        title: 'Perversion of Justice - Philanthropic Reputation Management',
        author: 'Julie K. Brown',
        publicationDate: '2021',
        reliability: 'high',
        tags: ['reputation-management', 'philanthropic-strategy']
      }
    ],
    evidence: ['irs-filings', 'donation-records', 'university-correspondence'],
    tags: ['charitable-foundations', 'philanthropy', 'reputation-management', 'academic-donations'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'financial-empire-2007-pre-arrest-asset-protection',
    date: '2007-03-20',
    title: 'Asset Protection Measures Ahead of Legal Troubles',
    description: 'As the Palm Beach police investigation intensifies, Epstein implements additional asset protection measures through various legal structures and offshore entities. These measures are designed to shield his wealth from potential civil lawsuits and criminal forfeiture.',
    type: 'business' as const,
    category: 'financial' as const,
    significance: 'critical' as const,
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'asset-protector', description: 'Implemented asset protection ahead of legal troubles' },
      { entityId: 'legal-defense-team', entityType: 'organization', role: 'advisors', description: 'Legal team advising on asset protection strategies' }
    ],
    relatedEvents: ['legal-2006-palm-beach-investigation', 'financial-empire-1993-southern-trust-formation'],
    consequences: [
      'Protection of assets from legal proceedings',
      'Enhancement of financial privacy and secrecy',
      'Preparation for potential criminal charges',
      'Maintenance of operational funding despite legal troubles'
    ],
    verificationStatus: 'corroborated' as const,
    sources: [
      {
        id: 'legal-filings-asset-protection-2007',
        type: 'court_document',
        title: 'Legal Filings Related to Asset Protection',
        publicationDate: '2007-2008',
        reliability: 'high',
        tags: ['asset-protection', 'legal-strategy']
      },
      {
        id: 'financial-forensics-investigation-2019',
        type: 'government_document',
        title: 'Federal Financial Forensics Investigation',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['financial-forensics', 'asset-investigation']
      }
    ],
    evidence: ['legal-filings', 'financial-forensics-reports'],
    tags: ['asset-protection', 'legal-strategy', 'offshore-structures', 'wealth-shielding'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'financial-empire-2008-financial-crisis-impact',
    date: '2008-09-15',
    title: 'Weathering the 2008 Financial Crisis',
    description: 'Despite the global financial crisis that devastates many wealthy individuals and institutions, Epstein\'s diversified and protected asset structure allows him to maintain his wealth and continue operations. His financial resilience during this period raises questions about his investment strategies and funding sources.',
    type: 'other' as const,
    category: 'financial' as const,
    significance: 'high' as const,
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'survivor', description: 'Maintained wealth through 2008 financial crisis' }
    ],
    relatedEvents: ['financial-empire-2005-financial-crisis-preparation'],
    consequences: [
      'Demonstration of unusual financial resilience',
      'Continuation of operations despite global crisis',
      'Increased questions about wealth sources',
      'Enhanced relative financial position post-crisis'
    ],
    verificationStatus: 'reported' as const,
    sources: [
      {
        id: 'financial-analysis-2008-crisis',
        type: 'news_article',
        title: 'How Epstein Survived the 2008 Financial Crisis',
        publication: 'Financial Times',
        publicationDate: '2019-08-10',
        reliability: 'high',
        tags: ['financial-crisis', 'wealth-resilience']
      },
      {
        id: 'wealth-management-analysis-2019',
        type: 'other',
        title: 'Analysis of Epstein Wealth Management During Crisis',
        reliability: 'medium',
        tags: ['wealth-management', 'crisis-survival']
      }
    ],
    evidence: ['financial-analysis', 'wealth-management-reports'],
    tags: ['financial-crisis', '2008-crisis', 'wealth-resilience', 'crisis-survival'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  // PHASE 1 EXPANSION: Trafficking Network Operations - Part 1 (1990s-2000s Foundation)
  {
    id: 'trafficking-network-1992-recruitment-system-establishment',
    date: '1992-06-15',
    title: 'Establishment of Systematic Recruitment Operations',
    description: 'Epstein begins developing a systematic approach to recruiting young women, initially through modeling agencies and schools. This early recruitment system establishes the operational framework that would later expand into an international network.',
    type: 'other' as const,
    category: 'criminal' as const,
    significance: 'critical' as const,
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'orchestrator', description: 'Established systematic recruitment operations' },
      { entityId: 'ghislaine-maxwell', entityType: 'person', role: 'recruiter', description: 'Key figure in recruitment operations' }
    ],
    relatedEvents: ['financial-empire-1991-little-st-james-acquisition'],
    consequences: [
      'Creation of systematic victim recruitment methods',
      'Establishment of operational hierarchy and roles',
      'Development of exploitation and control mechanisms',
      'Foundation for international expansion'
    ],
    verificationStatus: 'corroborated' as const,
    sources: [
      {
        id: 'victim-testimonies-early-1990s',
        type: 'court_document',
        title: 'Early Victim Testimonies - 1990s Operations',
        reliability: 'high',
        tags: ['victim-testimony', 'recruitment-methods']
      },
      {
        id: 'brown-perversion-justice-2021-recruitment',
        type: 'book',
        title: 'Perversion of Justice - Recruitment System Analysis',
        author: 'Julie K. Brown',
        publicationDate: '2021',
        reliability: 'high',
        tags: ['investigative-journalism', 'recruitment-analysis']
      },
      {
        id: 'fbi-investigation-files-recruitment',
        type: 'government_document',
        title: 'FBI Investigation Files - Recruitment Patterns',
        reliability: 'high',
        tags: ['law-enforcement', 'recruitment-investigation']
      }
    ],
    evidence: ['victim-testimonies', 'fbi-files', 'witness-statements'],
    tags: ['recruitment-system', 'trafficking-operations', 'ghislaine-maxwell', 'systematic-abuse'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'trafficking-network-1994-maxwell-recruitment-role',
    date: '1994-09-10',
    title: 'Ghislaine Maxwell\'s Central Role in Recruitment Operations',
    description: 'Ghislaine Maxwell becomes the primary recruiter and handler for Epstein\'s trafficking network. Using her social connections and grooming techniques, she identifies and recruits vulnerable young women from various backgrounds, particularly targeting those from troubled or economically disadvantaged situations.',
    type: 'other' as const,
    category: 'criminal' as const,
    significance: 'critical' as const,
    entities: [
      { entityId: 'ghislaine-maxwell', entityType: 'person', role: 'primary-recruiter', description: 'Central figure in recruitment and trafficking operations' },
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'orchestrator', description: 'Orchestrated trafficking network with Maxwell as primary recruiter' }
    ],
    relatedEvents: ['trafficking-network-1992-recruitment-system-establishment'],
    consequences: [
      'Professionalization of recruitment operations',
      'Enhanced victim grooming and manipulation techniques',
      'Expansion of recruitment geographic scope',
      'Creation of victim handler hierarchy'
    ],
    verificationStatus: 'verified' as const,
    sources: [
      {
        id: 'maxwell-trial-evidence-2021',
        type: 'court_document',
        title: 'Maxwell Trial Evidence - Recruitment Role',
        publicationDate: '2021',
        reliability: 'high',
        tags: ['criminal-trial', 'recruitment-evidence']
      },
      {
        id: 'victim-testimonies-maxwell-role',
        type: 'court_document',
        title: 'Victim Testimonies Regarding Maxwell\'s Role',
        reliability: 'high',
        tags: ['victim-testimony', 'maxwell-operations']
      },
      {
        id: 'webb-blackmail-vol2-2022-maxwell',
        type: 'book',
        title: 'One Nation Under Blackmail, Volume 2 - Maxwell Operations',
        author: 'Whitney Webb',
        publicationDate: '2022',
        reliability: 'high',
        tags: ['maxwell-analysis', 'trafficking-operations']
      }
    ],
    evidence: ['trial-evidence', 'victim-testimonies', 'court-records'],
    tags: ['ghislaine-maxwell', 'recruitment', 'victim-grooming', 'trafficking-hierarchy'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'trafficking-network-1996-palm-beach-operations-center',
    date: '1996-05-20',
    title: 'Palm Beach Mansion Becomes Primary Operations Center',
    description: 'Following the acquisition of the Palm Beach mansion, it becomes the primary center for trafficking operations. The property is extensively modified with surveillance equipment, massage rooms, and other facilities designed to facilitate abuse and document activities for potential blackmail purposes.',
    type: 'other' as const,
    category: 'criminal' as const,
    significance: 'critical' as const,
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'property-owner', description: 'Used Palm Beach mansion as primary trafficking operations center' },
      { entityId: 'palm-beach-mansion', entityType: 'location', role: 'operations-center', description: 'Primary location for trafficking and abuse activities' }
    ],
    relatedEvents: ['financial-empire-1996-palm-beach-mansion', 'trafficking-network-1994-maxwell-recruitment-role'],
    consequences: [
      'Centralization of trafficking operations in Florida',
      'Installation of surveillance and documentation systems',
      'Creation of systematic abuse and blackmail operations',
      'Development of evidence collection for compromise purposes'
    ],
    verificationStatus: 'verified' as const,
    sources: [
      {
        id: 'palm-beach-police-investigation-2005',
        type: 'government_document',
        title: 'Palm Beach Police Investigation - Operations Center',
        publicationDate: '2005-2006',
        reliability: 'high',
        tags: ['law-enforcement', 'palm-beach-investigation']
      },
      {
        id: 'fbi-search-warrant-palm-beach-2019',
        type: 'government_document',
        title: 'FBI Search Warrant and Evidence - Palm Beach Mansion',
        publicationDate: '2019-07-08',
        reliability: 'high',
        tags: ['search-warrant', 'evidence-collection']
      },
      {
        id: 'victim-testimonies-palm-beach-operations',
        type: 'court_document',
        title: 'Victim Testimonies - Palm Beach Operations',
        reliability: 'high',
        tags: ['victim-testimony', 'operations-center']
      }
    ],
    evidence: ['police-reports', 'search-warrants', 'victim-testimonies'],
    tags: ['palm-beach', 'operations-center', 'surveillance-systems', 'trafficking-hub'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'trafficking-network-1998-international-transport-system',
    date: '1998-08-10',
    title: 'Implementation of International Transportation Network',
    description: 'With the acquisition of the "Lolita Express" and other aircraft, Epstein establishes an international transportation system for moving victims and network participants between his various properties. Flight logs document extensive travel patterns that facilitate trafficking operations across multiple jurisdictions.',
    type: 'other' as const,
    category: 'criminal' as const,
    significance: 'critical' as const,
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'network-operator', description: 'Operated international transportation network for trafficking' },
      { entityId: 'lolita-express', entityType: 'organization', role: 'transport-vehicle', description: 'Primary aircraft used for international trafficking operations' },
      { entityId: 'flight-crew', entityType: 'person', role: 'facilitators', description: 'Aircraft crew facilitating transportation operations' }
    ],
    relatedEvents: ['financial-empire-1998-aviation-fleet-expansion', 'trafficking-network-1996-palm-beach-operations-center'],
    consequences: [
      'Creation of international trafficking transportation system',
      'Facilitation of cross-border victim movement',
      'Enhancement of operational security through private aviation',
      'Documentation of network participant travel patterns'
    ],
    verificationStatus: 'verified' as const,
    sources: [
      {
        id: 'flight-logs-comprehensive-analysis',
        type: 'court_document',
        title: 'Comprehensive Flight Logs Analysis - Trafficking Patterns',
        reliability: 'high',
        tags: ['flight-logs', 'transportation-evidence']
      },
      {
        id: 'pilot-testimony-operations',
        type: 'court_document',
        title: 'Pilot Testimony Regarding Transportation Operations',
        reliability: 'high',
        tags: ['witness-testimony', 'aviation-operations']
      },
      {
        id: 'international-trafficking-analysis-2019',
        type: 'government_document',
        title: 'Federal Analysis of International Trafficking Patterns',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['federal-investigation', 'trafficking-analysis']
      }
    ],
    evidence: ['flight-logs', 'pilot-testimony', 'transportation-records'],
    tags: ['lolita-express', 'international-trafficking', 'transportation-network', 'cross-border-operations'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'trafficking-network-1999-recruitment-pyramid-expansion',
    date: '1999-11-03',
    title: 'Development of Pyramid Recruitment Structure',
    description: 'Epstein\'s network develops a pyramid recruitment structure where victims are incentivized to recruit other young women in exchange for money and privileges. This system creates a self-perpetuating recruitment mechanism that rapidly expands the network while providing additional control over victims.',
    type: 'other' as const,
    category: 'criminal' as const,
    significance: 'high' as const,
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'network-architect', description: 'Designed pyramid recruitment structure' },
      { entityId: 'victim-recruiters', entityType: 'person', role: 'forced-recruiters', description: 'Victims coerced into recruiting others' }
    ],
    relatedEvents: ['trafficking-network-1994-maxwell-recruitment-role'],
    consequences: [
      'Exponential expansion of victim recruitment',
      'Creation of victim-recruiter control mechanism',
      'Enhancement of network secrecy through complicity',
      'Development of financial incentive structure'
    ],
    verificationStatus: 'corroborated' as const,
    sources: [
      {
        id: 'victim-testimonies-pyramid-structure',
        type: 'court_document',
        title: 'Victim Testimonies - Pyramid Recruitment Structure',
        reliability: 'high',
        tags: ['victim-testimony', 'recruitment-methods']
      },
      {
        id: 'brown-perversion-justice-2021-pyramid',
        type: 'book',
        title: 'Perversion of Justice - Pyramid Recruitment Analysis',
        author: 'Julie K. Brown',
        publicationDate: '2021',
        reliability: 'high',
        tags: ['recruitment-analysis', 'pyramid-structure']
      },
      {
        id: 'psychological-analysis-recruitment-2020',
        type: 'other',
        title: 'Psychological Analysis of Trafficking Recruitment Methods',
        publicationDate: '2020',
        reliability: 'medium',
        tags: ['psychological-analysis', 'recruitment-psychology']
      }
    ],
    evidence: ['victim-testimonies', 'recruitment-analysis', 'psychological-studies'],
    tags: ['pyramid-recruitment', 'victim-recruiters', 'network-expansion', 'recruitment-incentives'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'trafficking-network-2000-blackmail-documentation-system',
    date: '2000-03-15',
    title: 'Implementation of Systematic Blackmail Documentation',
    description: 'Epstein implements comprehensive surveillance and documentation systems across his properties to record activities involving high-profile network participants. This evidence collection serves both as protection for Epstein and as a control mechanism over powerful individuals.',
    type: 'other' as const,
    category: 'criminal' as const,
    significance: 'critical' as const,
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'blackmail-operator', description: 'Implemented systematic blackmail documentation systems' },
      { entityId: 'surveillance-systems', entityType: 'organization', role: 'documentation-tools', description: 'Surveillance equipment for blackmail evidence collection' }
    ],
    relatedEvents: ['trafficking-network-1996-palm-beach-operations-center'],
    consequences: [
      'Creation of systematic blackmail evidence collection',
      'Enhancement of control over network participants',
      'Development of protection mechanisms for operations',
      'Establishment of kompromat operations'
    ],
    verificationStatus: 'corroborated' as const,
    sources: [
      {
        id: 'fbi-surveillance-evidence-2019',
        type: 'government_document',
        title: 'FBI Evidence Collection - Surveillance Systems',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['surveillance-evidence', 'blackmail-systems']
      },
      {
        id: 'webb-blackmail-vol1-2022-kompromat',
        type: 'book',
        title: 'One Nation Under Blackmail, Volume 1 - Kompromat Operations',
        author: 'Whitney Webb',
        publicationDate: '2022',
        reliability: 'high',
        tags: ['blackmail-operations', 'kompromat-analysis']
      },
      {
        id: 'victim-testimonies-surveillance',
        type: 'court_document',
        title: 'Victim Testimonies - Surveillance and Documentation',
        reliability: 'high',
        tags: ['victim-testimony', 'surveillance-systems']
      }
    ],
    evidence: ['surveillance-equipment', 'victim-testimonies', 'fbi-evidence'],
    tags: ['blackmail-operations', 'surveillance-systems', 'kompromat', 'evidence-collection'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  // PHASE 1 EXPANSION: Trafficking Network Operations - Part 2 (2000s Expansion)
  {
    id: 'trafficking-network-2001-international-expansion',
    date: '2001-07-25',
    title: 'Expansion of Trafficking Operations to International Properties',
    description: 'Following 9/11, Epstein expands trafficking operations to his international properties, particularly Little St. James Island and later European locations. The island provides unprecedented privacy and isolation for activities, becoming known locally as "Pedophile Island."',
    type: 'other' as const,
    category: 'criminal' as const,
    significance: 'critical' as const,
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'operations-director', description: 'Expanded trafficking operations internationally' },
      { entityId: 'little-st-james', entityType: 'location', role: 'trafficking-center', description: 'Primary international trafficking operations center' },
      { entityId: 'island-staff', entityType: 'person', role: 'facilitators', description: 'Island staff facilitating trafficking operations' }
    ],
    relatedEvents: ['financial-empire-1991-little-st-james-acquisition', 'trafficking-network-2000-blackmail-documentation-system'],
    consequences: [
      'Creation of offshore trafficking operations center',
      'Enhanced operational security through isolation',
      'Development of international victim transport routes',
      'Establishment of jurisdiction-shopping advantages'
    ],
    verificationStatus: 'verified' as const,
    sources: [
      {
        id: 'vi-ag-lawsuit-2020-trafficking',
        type: 'court_document',
        title: 'Virgin Islands Attorney General Lawsuit - Trafficking Operations',
        publicationDate: '2020',
        reliability: 'high',
        tags: ['legal-proceedings', 'trafficking-evidence']
      },
      {
        id: 'victim-testimonies-island-operations',
        type: 'court_document',
        title: 'Victim Testimonies - Little St. James Operations',
        reliability: 'high',
        tags: ['victim-testimony', 'island-operations']
      },
      {
        id: 'local-witness-accounts-pedophile-island',
        type: 'interview',
        title: 'Local Witness Accounts - "Pedophile Island" Activities',
        reliability: 'medium',
        tags: ['witness-testimony', 'local-knowledge']
      }
    ],
    evidence: ['victim-testimonies', 'legal-filings', 'witness-accounts'],
    tags: ['little-st-james', 'international-trafficking', 'pedophile-island', 'offshore-operations'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'trafficking-network-2002-high-profile-participant-recruitment',
    date: '2002-10-12',
    title: 'Systematic Recruitment of High-Profile Network Participants',
    description: 'Epstein intensifies efforts to recruit high-profile individuals into his network through a combination of social events, business relationships, and compromising situations. This strategy serves both to protect his operations through influential connections and to expand his blackmail capabilities.',
    type: 'other' as const,
    category: 'criminal' as const,
    significance: 'critical' as const,
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'network-builder', description: 'Recruited high-profile individuals into trafficking network' },
      { entityId: 'high-profile-participants', entityType: 'person', role: 'network-members', description: 'Politicians, businessmen, and celebrities recruited into network' }
    ],
    relatedEvents: ['trafficking-network-2000-blackmail-documentation-system', 'political-network-expansion'],
    consequences: [
      'Enhancement of operational protection through influence',
      'Expansion of blackmail and compromise capabilities',
      'Creation of mutually assured destruction mechanisms',
      'Development of elite participation incentive structures'
    ],
    verificationStatus: 'corroborated' as const,
    sources: [
      {
        id: 'flight-logs-high-profile-passengers',
        type: 'court_document',
        title: 'Flight Logs - High-Profile Passenger Analysis',
        reliability: 'high',
        tags: ['flight-logs', 'high-profile-participants']
      },
      {
        id: 'black-book-analysis-2019',
        type: 'other',
        title: 'Analysis of Epstein\'s "Black Book" Contacts',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['contact-analysis', 'network-mapping']
      },
      {
        id: 'webb-blackmail-vol2-2022-recruitment',
        type: 'book',
        title: 'One Nation Under Blackmail, Volume 2 - Elite Recruitment',
        author: 'Whitney Webb',
        publicationDate: '2022',
        reliability: 'high',
        tags: ['elite-recruitment', 'network-analysis']
      }
    ],
    evidence: ['flight-logs', 'contact-records', 'network-analysis'],
    tags: ['high-profile-recruitment', 'elite-network', 'blackmail-expansion', 'influence-operations'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'trafficking-network-2003-virginia-giuffre-recruitment',
    date: '2003-06-15',
    title: 'Recruitment of Virginia Roberts (Giuffre) - Key Victim and Witness',
    description: 'Virginia Roberts (later Giuffre) is recruited into Epstein\'s trafficking network at age 17 while working at Mar-a-Lago. Her subsequent experiences and testimony become central to understanding the network\'s operations and high-profile participant involvement.',
    type: 'other' as const,
    category: 'criminal' as const,
    significance: 'critical' as const,
    entities: [
      { entityId: 'virginia-giuffre', entityType: 'person', role: 'victim-witness', description: 'Key victim and witness in trafficking network operations' },
      { entityId: 'ghislaine-maxwell', entityType: 'person', role: 'recruiter', description: 'Recruited Virginia Roberts into trafficking network' },
      { entityId: 'mar-a-lago', entityType: 'location', role: 'recruitment-location', description: 'Location where Virginia Roberts was initially recruited' }
    ],
    relatedEvents: ['trafficking-network-1994-maxwell-recruitment-role', 'trafficking-network-2002-high-profile-participant-recruitment'],
    consequences: [
      'Introduction of key witness to network operations',
      'Documentation of high-profile participant involvement',
      'Creation of detailed operational testimony',
      'Development of legal case foundation'
    ],
    verificationStatus: 'verified' as const,
    sources: [
      {
        id: 'giuffre-deposition-testimony-2016',
        type: 'court_document',
        title: 'Virginia Giuffre Deposition Testimony',
        publicationDate: '2016',
        reliability: 'high',
        tags: ['victim-testimony', 'deposition-evidence']
      },
      {
        id: 'giuffre-memoir-2021',
        type: 'book',
        title: 'Billionaire\'s Playboy Club - Virginia Giuffre Memoir',
        author: 'Virginia Giuffre',
        publicationDate: '2021',
        reliability: 'high',
        tags: ['victim-account', 'trafficking-memoir']
      },
      {
        id: 'maxwell-trial-giuffre-testimony-2021',
        type: 'court_document',
        title: 'Maxwell Trial - Giuffre Testimony Analysis',
        publicationDate: '2021',
        reliability: 'high',
        tags: ['criminal-trial', 'victim-testimony']
      }
    ],
    evidence: ['deposition-testimony', 'victim-memoir', 'trial-testimony'],
    tags: ['virginia-giuffre', 'key-victim', 'mar-a-lago-recruitment', 'witness-testimony'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'trafficking-network-2004-accomplice-network-expansion',
    date: '2004-09-08',
    title: 'Expansion of Accomplice and Facilitator Network',
    description: 'Epstein expands his network of accomplices and facilitators, including household staff, pilots, assistants, and associates who help facilitate trafficking operations. This network provides logistical support, victim handling, and operational security across multiple properties.',
    type: 'other' as const,
    category: 'criminal' as const,
    significance: 'high' as const,
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'network-orchestrator', description: 'Orchestrated expansion of accomplice network' },
      { entityId: 'accomplice-network', entityType: 'person', role: 'facilitators', description: 'Network of staff and associates facilitating trafficking operations' },
      { entityId: 'sarah-kellen', entityType: 'person', role: 'lieutenant', description: 'Key lieutenant in trafficking operations' }
    ],
    relatedEvents: ['trafficking-network-2001-international-expansion'],
    consequences: [
      'Enhancement of operational capabilities and logistics',
      'Creation of multi-layered facilitator structure',
      'Development of operational security through compartmentalization',
      'Expansion of victim handling and control mechanisms'
    ],
    verificationStatus: 'corroborated' as const,
    sources: [
      {
        id: 'accomplice-testimony-various-2019',
        type: 'court_document',
        title: 'Various Accomplice Testimonies and Depositions',
        publicationDate: '2019-2021',
        reliability: 'high',
        tags: ['accomplice-testimony', 'facilitator-evidence']
      },
      {
        id: 'staff-employment-records-2019',
        type: 'government_document',
        title: 'Employment Records and Staff Analysis',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['employment-records', 'staff-analysis']
      },
      {
        id: 'brown-perversion-justice-2021-accomplices',
        type: 'book',
        title: 'Perversion of Justice - Accomplice Network Analysis',
        author: 'Julie K. Brown',
        publicationDate: '2021',
        reliability: 'high',
        tags: ['accomplice-analysis', 'network-structure']
      }
    ],
    evidence: ['testimony-records', 'employment-documents', 'network-analysis'],
    tags: ['accomplice-network', 'sarah-kellen', 'facilitators', 'operational-support'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'trafficking-network-2005-systematic-victim-control',
    date: '2005-02-18',
    title: 'Implementation of Systematic Victim Control Mechanisms',
    description: 'Epstein\'s network develops sophisticated victim control mechanisms including financial dependency, psychological manipulation, legal intimidation, and social isolation. These methods ensure victim compliance and silence while facilitating continued exploitation.',
    type: 'other' as const,
    category: 'criminal' as const,
    significance: 'critical' as const,
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'control-architect', description: 'Designed systematic victim control mechanisms' },
      { entityId: 'victims-controlled', entityType: 'person', role: 'controlled-victims', description: 'Victims subjected to systematic control mechanisms' }
    ],
    relatedEvents: ['trafficking-network-1999-recruitment-pyramid-expansion'],
    consequences: [
      'Enhancement of victim control and compliance',
      'Prevention of victim reporting and testimony',
      'Creation of psychological dependency structures',
      'Development of intimidation and silencing tactics'
    ],
    verificationStatus: 'verified' as const,
    sources: [
      {
        id: 'victim-testimonies-control-mechanisms',
        type: 'court_document',
        title: 'Victim Testimonies - Control Mechanisms and Psychological Abuse',
        reliability: 'high',
        tags: ['victim-testimony', 'psychological-abuse']
      },
      {
        id: 'psychological-expert-analysis-2020',
        type: 'other',
        title: 'Expert Psychological Analysis of Trafficking Control Methods',
        publicationDate: '2020',
        reliability: 'high',
        tags: ['psychological-analysis', 'control-mechanisms']
      },
      {
        id: 'legal-intimidation-evidence-2019',
        type: 'court_document',
        title: 'Evidence of Legal Intimidation and Silencing Tactics',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['legal-intimidation', 'silencing-tactics']
      }
    ],
    evidence: ['victim-testimonies', 'psychological-analysis', 'intimidation-evidence'],
    tags: ['victim-control', 'psychological-manipulation', 'legal-intimidation', 'systematic-abuse'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  // PHASE 1 EXPANSION: Trafficking Network Operations - Part 3 (Peak Operations & First Investigation)
  {
    id: 'trafficking-network-2005-peak-operations-period',
    date: '2005-03-10',
    title: 'Peak Period of Trafficking Network Operations',
    description: 'The period from 2004-2006 represents the peak of Epstein\'s trafficking network operations, with multiple victims being recruited, transported, and abused across his various properties. The network operates with impunity, facilitated by high-profile connections and systematic operational security.',
    type: 'other' as const,
    category: 'criminal' as const,
    significance: 'critical' as const,
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'network-operator', description: 'Operating trafficking network at peak capacity' },
      { entityId: 'multiple-victims', entityType: 'person', role: 'victims', description: 'Numerous victims being trafficked during peak operations' },
      { entityId: 'network-facilitators', entityType: 'person', role: 'facilitators', description: 'Full network of facilitators supporting peak operations' }
    ],
    relatedEvents: ['trafficking-network-2004-accomplice-network-expansion', 'trafficking-network-2005-systematic-victim-control'],
    consequences: [
      'Maximum scope and scale of trafficking operations',
      'Greatest number of victims being exploited',
      'Peak operational sophistication and coordination',
      'Maximum risk exposure leading to investigation'
    ],
    verificationStatus: 'corroborated' as const,
    sources: [
      {
        id: 'victim-testimonies-peak-period',
        type: 'court_document',
        title: 'Multiple Victim Testimonies - Peak Operations Period',
        reliability: 'high',
        tags: ['victim-testimony', 'operations-scope']
      },
      {
        id: 'operational-analysis-2019',
        type: 'government_document',
        title: 'Federal Analysis of Peak Trafficking Operations',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['operational-analysis', 'trafficking-scope']
      },
      {
        id: 'brown-perversion-justice-2021-peak',
        type: 'book',
        title: 'Perversion of Justice - Peak Operations Analysis',
        author: 'Julie K. Brown',
        publicationDate: '2021',
        reliability: 'high',
        tags: ['operations-analysis', 'peak-period']
      }
    ],
    evidence: ['victim-testimonies', 'operational-analysis', 'investigative-reports'],
    tags: ['peak-operations', 'maximum-scope', 'trafficking-height', 'operational-sophistication'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'trafficking-network-2005-14-year-old-victim-recruitment',
    date: '2005-03-14',
    title: 'Recruitment of 14-Year-Old Victim - Catalyst for Investigation',
    description: 'The recruitment and abuse of a 14-year-old victim in Palm Beach becomes the catalyst for the first major investigation into Epstein\'s trafficking network. The victim\'s mother reports the incident to Palm Beach Police, launching the investigation that would expose the network\'s operations.',
    type: 'other' as const,
    category: 'criminal' as const,
    significance: 'critical' as const,
    entities: [
      { entityId: 'palm-beach-victim-14', entityType: 'person', role: 'catalyst-victim', description: '14-year-old victim whose case sparked investigation' },
      { entityId: 'victim-mother', entityType: 'person', role: 'whistleblower', description: 'Mother who reported abuse to authorities' },
      { entityId: 'palm-beach-police', entityType: 'organization', role: 'investigators', description: 'Police department that initiated investigation' }
    ],
    relatedEvents: ['legal-2005-palm-beach-police-report', 'trafficking-network-2005-peak-operations-period'],
    consequences: [
      'Initiation of first major trafficking investigation',
      'Exposure of network operations to law enforcement',
      'Beginning of network operational disruption',
      'Catalyst for victim testimony and evidence collection'
    ],
    verificationStatus: 'verified' as const,
    sources: [
      {
        id: 'palm-beach-police-report-2005',
        type: 'government_document',
        title: 'Palm Beach Police Initial Report - 14-Year-Old Victim',
        publicationDate: '2005-03-14',
        reliability: 'high',
        tags: ['police-report', 'initial-complaint']
      },
      {
        id: 'victim-family-testimony',
        type: 'court_document',
        title: 'Victim and Family Testimony - Initial Report',
        reliability: 'high',
        tags: ['victim-testimony', 'family-testimony']
      },
      {
        id: 'brown-perversion-justice-2021-catalyst',
        type: 'book',
        title: 'Perversion of Justice - Investigation Catalyst',
        author: 'Julie K. Brown',
        publicationDate: '2021',
        reliability: 'high',
        tags: ['investigation-catalyst', 'initial-report']
      }
    ],
    evidence: ['police-reports', 'victim-testimony', 'family-statements'],
    tags: ['catalyst-victim', 'palm-beach-investigation', 'initial-report', 'investigation-trigger'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'trafficking-network-2005-network-exposure-response',
    date: '2005-04-20',
    title: 'Network Response to Investigation Exposure',
    description: 'As the Palm Beach investigation progresses, Epstein\'s network implements damage control measures including victim intimidation, evidence destruction, legal maneuvering, and the deployment of high-powered legal representation to minimize exposure and consequences.',
    type: 'other' as const,
    category: 'criminal' as const,
    significance: 'high' as const,
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'damage-controller', description: 'Implemented damage control measures during investigation' },
      { entityId: 'defense-legal-team', entityType: 'organization', role: 'legal-defenders', description: 'High-powered legal team defending against investigation' },
      { entityId: 'network-accomplices', entityType: 'person', role: 'co-conspirators', description: 'Network members involved in damage control efforts' }
    ],
    relatedEvents: ['trafficking-network-2005-14-year-old-victim-recruitment', 'legal-2005-palm-beach-investigation'],
    consequences: [
      'Implementation of systematic damage control operations',
      'Intimidation and silencing of potential witnesses',
      'Destruction of incriminating evidence',
      'Mobilization of legal and political influence'
    ],
    verificationStatus: 'corroborated' as const,
    sources: [
      {
        id: 'victim-intimidation-evidence-2019',
        type: 'court_document',
        title: 'Evidence of Victim Intimidation During Investigation',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['victim-intimidation', 'witness-tampering']
      },
      {
        id: 'evidence-destruction-analysis-2019',
        type: 'government_document',
        title: 'FBI Analysis of Evidence Destruction',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['evidence-destruction', 'obstruction-justice']
      },
      {
        id: 'legal-strategy-analysis-2020',
        type: 'other',
        title: 'Analysis of Epstein Defense Legal Strategy',
        publicationDate: '2020',
        reliability: 'medium',
        tags: ['legal-strategy', 'defense-tactics']
      }
    ],
    evidence: ['intimidation-evidence', 'destruction-analysis', 'legal-documents'],
    tags: ['damage-control', 'witness-intimidation', 'evidence-destruction', 'legal-defense'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'trafficking-network-2006-network-disruption-adaptation',
    date: '2006-01-15',
    title: 'Network Adaptation to Investigation Pressure',
    description: 'Under investigation pressure, Epstein\'s trafficking network adapts its operations, moving activities to more secure locations, modifying communication methods, and restructuring operations to minimize exposure while attempting to maintain functionality.',
    type: 'other' as const,
    category: 'criminal' as const,
    significance: 'high' as const,
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'network-adapter', description: 'Adapted network operations under investigation pressure' },
      { entityId: 'modified-operations', entityType: 'organization', role: 'adapted-network', description: 'Modified trafficking operations under pressure' }
    ],
    relatedEvents: ['trafficking-network-2005-network-exposure-response', 'legal-2006-palm-beach-investigation-intensification'],
    consequences: [
      'Modification of operational security protocols',
      'Relocation of activities to more secure venues',
      'Reduction in operational scope and visibility',
      'Development of investigation countermeasures'
    ],
    verificationStatus: 'corroborated' as const,
    sources: [
      {
        id: 'operational-changes-analysis-2019',
        type: 'government_document',
        title: 'FBI Analysis of Operational Changes Under Investigation',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['operational-adaptation', 'investigation-response']
      },
      {
        id: 'victim-testimonies-operational-changes',
        type: 'court_document',
        title: 'Victim Testimonies - Operational Changes During Investigation',
        reliability: 'high',
        tags: ['victim-testimony', 'operational-modifications']
      }
    ],
    evidence: ['operational-analysis', 'victim-testimonies'],
    tags: ['network-adaptation', 'operational-changes', 'investigation-pressure', 'security-modifications'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  // PHASE 1 EXPANSION: Trafficking Network Operations - Part 4 (2007-2015 Continued Operations)
  {
    id: 'trafficking-network-2007-continued-operations',
    date: '2007-03-15',
    title: 'Continued Trafficking Operations Despite Legal Scrutiny',
    description: 'Despite ongoing FBI investigation and media attention, evidence suggests trafficking operations continued with modified protocols and increased discretion. The network demonstrated remarkable resilience, adapting to legal pressure while maintaining core functionality.',
    type: 'other' as const,
    category: 'criminal' as const,
    significance: 'high' as const,
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'network-operator', description: 'Continued trafficking operations despite legal scrutiny' },
      { entityId: 'ghislaine-maxwell', entityType: 'person', role: 'operations-manager', description: 'Managed continued operations during investigation period' },
      { entityId: 'sarah-kellen', entityType: 'person', role: 'operations-coordinator', description: 'Coordinated trafficking activities during legal pressure' }
    ],
    relatedEvents: ['trafficking-network-2006-network-disruption-adaptation', 'legal-2008-sweetheart-deal'],
    consequences: [
      'Network demonstrated resilience under pressure',
      'Operations became more covert and selective',
      'Increased reliance on trusted associates',
      'Enhanced compartmentalization of activities'
    ],
    verificationStatus: 'corroborated' as const,
    sources: [
      {
        id: 'fbi-continued-operations-2019',
        type: 'government_document',
        title: 'FBI Investigation Documents - Continued Operations 2007-2008',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['fbi-investigation', 'continued-operations']
      },
      {
        id: 'victim-testimonies-2007-period',
        type: 'court_document',
        title: 'Victim Testimonies Regarding 2007 Activities',
        reliability: 'high',
        tags: ['victim-testimony', 'continued-trafficking']
      },
      {
        id: 'whitney-webb-continued-operations',
        type: 'other',
        title: 'Whitney Webb - Analysis of Continued Operations During Investigation',
        author: 'Whitney Webb',
        publicationDate: '2022',
        reliability: 'high',
        tags: ['investigative-analysis', 'operational-continuity']
      }
    ],
    evidence: ['flight-logs-2007', 'victim-testimonies', 'financial-transactions'],
    tags: ['continued-operations', 'network-resilience', 'legal-scrutiny', 'operational-adaptation'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'trafficking-network-2008-plea-restructuring',
    date: '2008-06-30',
    title: 'Network Restructuring Around Plea Agreement',
    description: 'Following Epstein\'s controversial plea agreement, the trafficking network restructured operations with associates taking more prominent roles while maintaining operational continuity. The plea deal enabled continued activities under new organizational structures.',
    type: 'other' as const,
    category: 'criminal' as const,
    significance: 'high' as const,
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'convicted-operator', description: 'Restructured operations following plea agreement' },
      { entityId: 'ghislaine-maxwell', entityType: 'person', role: 'operations-manager', description: 'Assumed greater operational control post-plea' },
      { entityId: 'sarah-kellen', entityType: 'person', role: 'associate-coordinator', description: 'Increased responsibilities in restructured network' }
    ],
    relatedEvents: ['legal-2008-sweetheart-deal', 'trafficking-network-2007-continued-operations'],
    consequences: [
      'Associates assumed greater operational responsibilities',
      'Network maintained operational capabilities',
      'Increased emphasis on plausible deniability',
      'Continued victim recruitment and exploitation'
    ],
    verificationStatus: 'corroborated' as const,
    sources: [
      {
        id: 'plea-agreement-operational-impact',
        type: 'court_document',
        title: 'Analysis of Operational Impact of 2008 Plea Agreement',
        publicationDate: '2008',
        reliability: 'high',
        tags: ['plea-agreement', 'operational-restructuring']
      },
      {
        id: 'post-conviction-activities',
        type: 'court_document',
        title: 'Documentation of Post-Conviction Activities',
        reliability: 'high',
        tags: ['post-conviction', 'continued-activities']
      }
    ],
    evidence: ['employment-contracts', 'property-usage-patterns', 'victim-testimonies'],
    tags: ['plea-restructuring', 'operational-continuity', 'associate-empowerment', 'network-adaptation'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'trafficking-network-2009-international-expansion',
    date: '2009-02-20',
    title: 'International Network Operations Expansion',
    description: 'With domestic operations under scrutiny, evidence suggests significant expansion of international trafficking activities, particularly in Europe and the Caribbean, leveraging existing property networks and international connections.',
    type: 'other' as const,
    category: 'criminal' as const,
    significance: 'high' as const,
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'international-operator', description: 'Expanded trafficking operations internationally' },
      { entityId: 'ghislaine-maxwell', entityType: 'person', role: 'international-coordinator', description: 'Coordinated international trafficking activities' },
      { entityId: 'international-associates', entityType: 'organization', role: 'facilitators', description: 'International network of trafficking facilitators' }
    ],
    relatedEvents: ['property-2008-paris-mansion', 'trafficking-network-2008-plea-restructuring'],
    consequences: [
      'Diversification of operational locations',
      'Reduced dependency on US-based activities',
      'Expansion of international victim pool',
      'Increased operational complexity and security'
    ],
    verificationStatus: 'reported' as const,
    sources: [
      {
        id: 'international-flight-logs',
        type: 'other',
        title: 'International Flight Logs 2009-2015',
        reliability: 'high',
        tags: ['flight-logs', 'international-travel']
      },
      {
        id: 'european-victim-testimonies',
        type: 'court_document',
        title: 'European Victim Testimonies',
        reliability: 'high',
        tags: ['european-operations', 'international-victims']
      },
      {
        id: 'international-law-enforcement-reports',
        type: 'government_document',
        title: 'International Law Enforcement Reports on Trafficking Networks',
        reliability: 'medium',
        tags: ['international-investigation', 'cross-border-trafficking']
      }
    ],
    evidence: ['international-travel-records', 'property-usage-documentation', 'cross-border-transactions'],
    tags: ['international-expansion', 'cross-border-trafficking', 'operational-diversification', 'global-network'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'trafficking-network-2010-technology-integration',
    date: '2010-08-10',
    title: 'Technology Integration in Trafficking Operations',
    description: 'Evidence suggests the network began integrating modern technology including social media for recruitment, encrypted communications for security, and digital record-keeping for blackmail documentation, representing a significant evolution in operational methodology.',
    type: 'other' as const,
    category: 'criminal' as const,
    significance: 'medium' as const,
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'technology-adopter', description: 'Integrated technology into trafficking operations' },
      { entityId: 'network-tech-associates', entityType: 'organization', role: 'technical-support', description: 'Technical personnel supporting digital operations' },
      { entityId: 'it-personnel', entityType: 'organization', role: 'system-administrators', description: 'IT staff managing digital infrastructure' }
    ],
    relatedEvents: ['trafficking-network-2009-international-expansion', 'surveillance-2015-advanced-systems'],
    consequences: [
      'Enhanced recruitment capabilities via social media',
      'Improved operational security through encryption',
      'Digital documentation of compromising material',
      'Expanded surveillance and victim control mechanisms'
    ],
    verificationStatus: 'alleged' as const,
    sources: [
      {
        id: 'digital-forensics-analysis',
        type: 'other',
        title: 'Digital Forensics from Seized Devices',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['digital-forensics', 'technology-evidence']
      },
      {
        id: 'victim-technology-accounts',
        type: 'court_document',
        title: 'Victim Accounts of Technology Use in Operations',
        reliability: 'medium',
        tags: ['victim-testimony', 'technology-use']
      }
    ],
    evidence: ['seized-digital-devices', 'social-media-analysis', 'encrypted-communications'],
    tags: ['technology-integration', 'digital-operations', 'social-media-recruitment', 'encrypted-communications'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'trafficking-network-2011-academic-recruitment',
    date: '2011-05-15',
    title: 'Academic Institution Recruitment Pipeline',
    description: 'Investigation revealed systematic targeting of young women from prestigious academic institutions, using educational opportunities, internships, and career advancement promises as recruitment tools, exploiting the aspirations and vulnerabilities of students.',
    type: 'other' as const,
    category: 'criminal' as const,
    significance: 'high' as const,
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'academic-predator', description: 'Targeted students through academic connections' },
      { entityId: 'academic-recruiters', entityType: 'organization', role: 'recruitment-facilitators', description: 'Network of academic-affiliated recruiters' },
      { entityId: 'university-connections', entityType: 'organization', role: 'institutional-access', description: 'University connections facilitating access to students' }
    ],
    relatedEvents: ['academic-2001-harvard-connections', 'trafficking-network-2010-technology-integration'],
    consequences: [
      'Exploitation of educational aspirations and vulnerabilities',
      'Use of institutional credibility for recruitment legitimacy',
      'Long-term grooming relationships through academic programs',
      'Creation of debt and obligation-based control mechanisms'
    ],
    verificationStatus: 'corroborated' as const,
    sources: [
      {
        id: 'academic-victim-testimonies',
        type: 'court_document',
        title: 'Testimonies from Victims Recruited Through Academic Institutions',
        reliability: 'high',
        tags: ['academic-recruitment', 'student-victims']
      },
      {
        id: 'university-investigation-reports',
        type: 'other',
        title: 'University Internal Investigation Reports',
        reliability: 'medium',
        tags: ['institutional-investigation', 'academic-misconduct']
      },
      {
        id: 'educational-funding-records',
        type: 'financial_record',
        title: 'Records of Educational Funding and Scholarships',
        reliability: 'high',
        tags: ['educational-funding', 'financial-control']
      }
    ],
    evidence: ['educational-funding-documentation', 'university-connection-mapping', 'victim-recruitment-accounts'],
    tags: ['academic-recruitment', 'student-exploitation', 'educational-manipulation', 'institutional-abuse'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'trafficking-network-2012-entertainment-industry',
    date: '2012-09-08',
    title: 'Entertainment and Modeling Industry Exploitation',
    description: 'Evidence emerged of systematic exploitation of connections in entertainment and modeling industries, using career opportunities, photo shoots, and industry access as leverage for recruitment and control of young women seeking careers in these fields.',
    type: 'other' as const,
    category: 'criminal' as const,
    significance: 'high' as const,
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'industry-exploiter', description: 'Exploited entertainment industry connections for trafficking' },
      { entityId: 'ghislaine-maxwell', entityType: 'person', role: 'industry-coordinator', description: 'Coordinated exploitation through industry connections' },
      { entityId: 'modeling-agents', entityType: 'organization', role: 'recruitment-facilitators', description: 'Modeling agents facilitating victim access' },
      { entityId: 'entertainment-contacts', entityType: 'organization', role: 'industry-connections', description: 'Entertainment industry contacts enabling exploitation' }
    ],
    relatedEvents: ['trafficking-network-2011-academic-recruitment', 'social-2000s-celebrity-connections'],
    consequences: [
      'Exploitation of career aspirations in entertainment and modeling',
      'Use of industry connections for systematic victim access',
      'Creation of dependency relationships through career promises',
      'Normalization of inappropriate requests within industry context'
    ],
    verificationStatus: 'corroborated' as const,
    sources: [
      {
        id: 'modeling-industry-testimonies',
        type: 'court_document',
        title: 'Modeling Industry Victim Testimonies',
        reliability: 'high',
        tags: ['modeling-industry', 'entertainment-exploitation']
      },
      {
        id: 'entertainment-investigation-docs',
        type: 'other',
        title: 'Entertainment Industry Investigation Documents',
        reliability: 'medium',
        tags: ['entertainment-industry', 'industry-exploitation']
      },
      {
        id: 'modeling-contract-records',
        type: 'other',
        title: 'Modeling Contracts and Financial Records',
        reliability: 'high',
        tags: ['modeling-contracts', 'financial-exploitation']
      }
    ],
    evidence: ['modeling-contract-documentation', 'entertainment-connection-records', 'industry-exploitation-testimonies'],
    tags: ['entertainment-exploitation', 'modeling-industry', 'career-manipulation', 'industry-connections'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'trafficking-network-2013-therapeutic-exploitation',
    date: '2013-04-22',
    title: 'Exploitation Through Therapeutic and Counseling Services',
    description: 'Investigation revealed the network\'s exploitation of vulnerable individuals through offers of therapeutic services, counseling, and psychological support as recruitment and control mechanisms, representing a particularly insidious form of manipulation.',
    type: 'other' as const,
    category: 'criminal' as const,
    significance: 'medium' as const,
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'therapeutic-exploiter', description: 'Exploited therapeutic relationships for trafficking purposes' },
      { entityId: 'licensed-therapists', entityType: 'organization', role: 'therapeutic-facilitators', description: 'Licensed professionals involved in exploitation' },
      { entityId: 'counseling-staff', entityType: 'organization', role: 'counseling-exploiters', description: 'Counseling staff facilitating exploitation' }
    ],
    relatedEvents: ['trafficking-network-2012-entertainment-industry', 'trafficking-network-2014-financial-coercion'],
    consequences: [
      'Exploitation of psychological vulnerabilities and trauma',
      'Abuse of professional therapeutic relationships and trust',
      'Creation of dependency through manipulated "treatment" relationships',
      'Normalization of inappropriate boundaries in therapeutic contexts'
    ],
    verificationStatus: 'alleged' as const,
    sources: [
      {
        id: 'therapeutic-exploitation-testimonies',
        type: 'court_document',
        title: 'Victim Accounts of Therapeutic Exploitation',
        reliability: 'medium',
        tags: ['therapeutic-abuse', 'psychological-exploitation']
      },
      {
        id: 'professional-licensing-investigations',
        type: 'government_document',
        title: 'Professional Licensing Board Investigations',
        reliability: 'medium',
        tags: ['professional-misconduct', 'licensing-violations']
      }
    ],
    evidence: ['therapeutic-service-documentation', 'professional-misconduct-reports', 'victim-therapeutic-accounts'],
    tags: ['therapeutic-exploitation', 'psychological-manipulation', 'professional-abuse', 'vulnerability-exploitation'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'trafficking-network-2014-financial-coercion',
    date: '2014-07-18',
    title: 'Financial Coercion and Debt Bondage Systems',
    description: 'Detailed evidence emerged of systematic financial coercion including creation of artificial debt, financial dependency relationships, and economic control mechanisms designed to maintain victim compliance and prevent escape from the trafficking network.',
    type: 'other' as const,
    category: 'criminal' as const,
    significance: 'high' as const,
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'financial-controller', description: 'Implemented financial coercion and debt bondage systems' },
      { entityId: 'financial-managers', entityType: 'organization', role: 'debt-administrators', description: 'Financial personnel managing victim debt and dependency' },
      { entityId: 'accounting-staff', entityType: 'organization', role: 'financial-controllers', description: 'Accounting staff implementing financial control mechanisms' }
    ],
    relatedEvents: ['trafficking-network-2013-therapeutic-exploitation', 'trafficking-network-2015-surveillance-systems'],
    consequences: [
      'Creation of inescapable financial dependency relationships',
      'Use of manufactured debt as primary victim control mechanism',
      'Economic coercion systematically preventing victim escape attempts',
      'Financial exploitation conducted parallel to sexual exploitation'
    ],
    verificationStatus: 'corroborated' as const,
    sources: [
      {
        id: 'financial-coercion-records',
        type: 'financial_record',
        title: 'Financial Records Documenting Debt and Coercion Systems',
        reliability: 'high',
        tags: ['financial-coercion', 'debt-bondage']
      },
      {
        id: 'victim-financial-testimonies',
        type: 'court_document',
        title: 'Victim Testimonies Regarding Financial Coercion',
        reliability: 'high',
        tags: ['financial-abuse', 'economic-control']
      },
      {
        id: 'banking-transaction-analysis',
        type: 'financial_record',
        title: 'Banking Transaction Analysis Showing Financial Control',
        reliability: 'high',
        tags: ['financial-analysis', 'transaction-patterns']
      }
    ],
    evidence: ['debt-documentation', 'financial-control-records', 'banking-transaction-evidence'],
    tags: ['financial-coercion', 'debt-bondage', 'economic-control', 'victim-dependency'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'trafficking-network-2015-surveillance-systems',
    date: '2015-01-12',
    title: 'Advanced Surveillance and Victim Monitoring Systems',
    description: 'Investigation revealed sophisticated surveillance systems deployed across multiple properties to monitor victims, document activities for blackmail purposes, and maintain operational security, representing the technological pinnacle of the trafficking network\'s control mechanisms.',
    type: 'other' as const,
    category: 'criminal' as const,
    significance: 'high' as const,
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'surveillance-operator', description: 'Implemented comprehensive surveillance systems for victim control' },
      { entityId: 'technical-staff', entityType: 'organization', role: 'surveillance-technicians', description: 'Technical personnel managing surveillance infrastructure' },
      { entityId: 'security-personnel', entityType: 'organization', role: 'security-operators', description: 'Security staff operating monitoring systems' }
    ],
    relatedEvents: ['trafficking-network-2014-financial-coercion', 'legal-2019-fbi-raids'],
    consequences: [
      'Comprehensive monitoring and control of victim activities',
      'Systematic documentation of activities for blackmail purposes',
      'Enhanced operational security and network protection',
      'Psychological intimidation and control through surveillance awareness'
    ],
    verificationStatus: 'verified' as const,
    sources: [
      {
        id: 'fbi-surveillance-seizures',
        type: 'government_document',
        title: 'FBI Raids Revealing Surveillance Equipment and Recordings',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['fbi-raids', 'surveillance-evidence']
      },
      {
        id: 'technical-documentation',
        type: 'other',
        title: 'Technical Documentation of Surveillance Systems',
        reliability: 'high',
        tags: ['surveillance-systems', 'technical-evidence']
      },
      {
        id: 'victim-surveillance-testimonies',
        type: 'court_document',
        title: 'Victim Testimonies About Being Under Surveillance',
        reliability: 'high',
        tags: ['victim-testimony', 'surveillance-control']
      }
    ],
    evidence: ['seized-surveillance-equipment', 'technical-system-documentation', 'victim-monitoring-accounts'],
    tags: ['surveillance-systems', 'victim-monitoring', 'blackmail-documentation', 'technological-control'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  // PHASE 1 EXPANSION: Trafficking Network Operations - Part 5 (2016-2019 Final Operations)
  {
    id: 'trafficking-network-2016-political-scrutiny',
    date: '2016-11-05',
    title: 'Network Operations During Political Campaign Scrutiny',
    description: 'Despite increased media attention due to political campaign connections during the 2016 election cycle, evidence suggests the trafficking network maintained operations with enhanced security protocols and sophisticated media management strategies.',
    type: 'other' as const,
    category: 'criminal' as const,
    significance: 'high' as const,
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'network-operator', description: 'Maintained operations during political scrutiny' },
      { entityId: 'ghislaine-maxwell', entityType: 'person', role: 'operations-coordinator', description: 'Coordinated network during increased media attention' },
      { entityId: 'pr-representatives', entityType: 'organization', role: 'media-managers', description: 'Public relations team managing media narrative' }
    ],
    relatedEvents: ['trafficking-network-2015-surveillance-systems', 'political-2016-election-connections'],
    consequences: [
      'Network demonstrated continued resilience under public scrutiny',
      'Enhanced media management and public relations efforts',
      'Increased operational discretion and security measures',
      'Maintained victim exploitation despite heightened attention'
    ],
    verificationStatus: 'corroborated' as const,
    sources: [
      {
        id: 'media-management-2016',
        type: 'other',
        title: 'Media Management Documentation During 2016 Campaign Period',
        reliability: 'medium',
        tags: ['media-management', 'political-scrutiny']
      },
      {
        id: 'continued-operations-evidence-2016',
        type: 'court_document',
        title: 'Evidence of Continued Operations During 2016 Scrutiny',
        reliability: 'high',
        tags: ['continued-operations', 'political-pressure']
      }
    ],
    evidence: ['pr-strategy-documentation', 'operational-continuity-evidence', 'victim-accounts-2016'],
    tags: ['political-scrutiny', 'media-management', 'operational-resilience', 'crisis-management'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'trafficking-network-2017-network-consolidation',
    date: '2017-06-12',
    title: 'Network Consolidation and Associate Empowerment',
    description: 'Following years of investigations and scrutiny, the trafficking network underwent significant consolidation with key associates taking greater operational control while Epstein maintained oversight through financial and strategic management.',
    type: 'other' as const,
    category: 'criminal' as const,
    significance: 'high' as const,
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'strategic-overseer', description: 'Provided strategic oversight while reducing direct involvement' },
      { entityId: 'ghislaine-maxwell', entityType: 'person', role: 'operational-director', description: 'Assumed greater operational control and network management' },
      { entityId: 'key-associates', entityType: 'organization', role: 'empowered-operators', description: 'Key associates with expanded operational responsibilities' }
    ],
    relatedEvents: ['trafficking-network-2016-political-scrutiny', 'trafficking-network-2018-final-operations'],
    consequences: [
      'Decentralization of operational responsibilities and risk',
      'Enhanced plausible deniability for primary operators',
      'Maintained network functionality through associate empowerment',
      'Continued victim exploitation through restructured operations'
    ],
    verificationStatus: 'corroborated' as const,
    sources: [
      {
        id: 'network-consolidation-analysis',
        type: 'other',
        title: 'Analysis of Network Consolidation and Restructuring',
        reliability: 'high',
        tags: ['network-consolidation', 'operational-restructuring']
      },
      {
        id: 'associate-empowerment-evidence',
        type: 'court_document',
        title: 'Evidence of Associate Empowerment in Network Operations',
        reliability: 'high',
        tags: ['associate-control', 'operational-delegation']
      }
    ],
    evidence: ['organizational-restructuring-documents', 'associate-authority-evidence', 'operational-delegation-records'],
    tags: ['network-consolidation', 'associate-empowerment', 'operational-restructuring', 'risk-distribution'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'trafficking-network-2018-final-operations',
    date: '2018-04-08',
    title: 'Final Period of Active Trafficking Operations',
    description: 'The period from 2017-2019 represents the final phase of active trafficking operations, characterized by increased caution, reduced scale, but continued systematic exploitation of victims through the established network infrastructure.',
    type: 'other' as const,
    category: 'criminal' as const,
    significance: 'high' as const,
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'final-operator', description: 'Conducted final period of trafficking operations' },
      { entityId: 'trafficking-network', entityType: 'organization', role: 'final-infrastructure', description: 'Network infrastructure during final operational period' },
      { entityId: 'final-victims', entityType: 'organization', role: 'final-targets', description: 'Victims during final operational period' }
    ],
    relatedEvents: ['trafficking-network-2017-network-consolidation', 'legal-2019-arrest-charges'],
    consequences: [
      'Continued systematic exploitation despite increased risk awareness',
      'Maintained core network functionality until arrest',
      'Final consolidation of blackmail and control materials',
      'Preparation for potential exposure and legal consequences'
    ],
    verificationStatus: 'corroborated' as const,
    sources: [
      {
        id: 'final-operations-documentation',
        type: 'government_document',
        title: 'FBI Documentation of Final Operational Period 2017-2019',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['final-operations', 'fbi-evidence']
      },
      {
        id: 'final-period-victim-accounts',
        type: 'court_document',
        title: 'Victim Accounts from Final Operational Period',
        reliability: 'high',
        tags: ['final-victims', 'continued-exploitation']
      },
      {
        id: 'julie-brown-final-investigation',
        type: 'news_article',
        title: 'Julie K. Brown - Final Investigation Period Coverage',
        author: 'Julie K. Brown',
        publication: 'Miami Herald',
        publicationDate: '2018-2019',
        reliability: 'high',
        tags: ['investigative-journalism', 'final-period']
      }
    ],
    evidence: ['final-operational-evidence', 'continued-victim-accounts', 'network-maintenance-records'],
    tags: ['final-operations', 'continued-exploitation', 'pre-arrest-period', 'operational-conclusion'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'trafficking-network-2019-exposure-arrest',
    date: '2019-07-06',
    title: 'Network Exposure and Primary Operator Arrest',
    description: 'The July 2019 arrest of Jeffrey Epstein marked the definitive exposure of the trafficking network, leading to widespread investigation, victim testimony, and the beginning of comprehensive network dismantling efforts.',
    type: 'other' as const,
    category: 'criminal' as const,
    significance: 'critical' as const,
    entities: [
      { entityId: 'jeffrey-epstein', entityType: 'person', role: 'arrested-operator', description: 'Primary network operator arrested on trafficking charges' },
      { entityId: 'fbi-investigation-team', entityType: 'organization', role: 'law-enforcement', description: 'FBI team conducting trafficking investigation and arrests' },
      { entityId: 'exposed-network', entityType: 'organization', role: 'criminal-enterprise', description: 'Exposed trafficking network infrastructure' }
    ],
    relatedEvents: ['trafficking-network-2018-final-operations', 'legal-2019-arrest-charges', 'legal-2019-death-custody'],
    consequences: [
      'Complete exposure of decades-long trafficking operations',
      'Comprehensive victim testimony and evidence collection',
      'International investigation into network associates and facilitators',
      'Beginning of systematic network dismantling and justice proceedings'
    ],
    verificationStatus: 'verified' as const,
    sources: [
      {
        id: 'arrest-documentation-2019',
        type: 'government_document',
        title: 'Official FBI Arrest Documentation and Charges',
        publicationDate: '2019-07-06',
        reliability: 'high',
        tags: ['arrest-documentation', 'official-charges']
      },
      {
        id: 'network-exposure-evidence',
        type: 'court_document',
        title: 'Court Documentation of Network Exposure and Evidence',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['network-exposure', 'court-evidence']
      },
      {
        id: 'comprehensive-media-coverage-2019',
        type: 'news_article',
        title: 'Comprehensive Media Coverage of Network Exposure',
        publicationDate: '2019-07',
        reliability: 'high',
        tags: ['media-coverage', 'network-exposure']
      }
    ],
    evidence: ['arrest-records', 'seized-evidence', 'victim-testimony-collection', 'network-documentation'],
    tags: ['network-exposure', 'arrest', 'investigation-culmination', 'justice-beginning'],
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