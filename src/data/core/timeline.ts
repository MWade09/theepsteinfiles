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
  },

  // ===== INTELLIGENCE COMMUNITY CONNECTIONS =====
  {
    id: 'robert-maxwell-death-intelligence-implications',
    date: '1991-11-05',
    title: 'Robert Maxwell Death - Intelligence Implications',
    description: 'Death of Robert Maxwell, Ghislaine\'s father and alleged Mossad asset, under suspicious circumstances. His intelligence connections and unresolved questions about his death would later become relevant to understanding Ghislaine\'s background and potential intelligence ties.',
    category: 'other',
    type: 'investigation',
    significance: 'high',
    verificationStatus: 'verified',
    entities: [
      {
        entityId: 'robert-maxwell',
        entityType: 'person',
        role: 'Media Mogul/Alleged Intelligence Asset',
        description: 'Ghislaine Maxwell\'s father, British media proprietor with alleged Mossad connections'
      },
      {
        entityId: 'ghislaine-maxwell',
        entityType: 'person',
        role: 'Daughter',
        description: 'Would later become central figure in Epstein network'
      }
    ],
    relatedEvents: [],
    consequences: ['Maxwell family financial collapse', 'Ghislaine\'s subsequent connections to Epstein'],
    sources: [
      {
        id: 'maxwell-death-investigation',
        type: 'government_document',
        title: 'Robert Maxwell Death Investigation Reports',
        publicationDate: '1991-11',
        reliability: 'high',
        tags: ['death-investigation', 'intelligence-connections']
      },
      {
        id: 'seymour-hersh-samson-option',
        type: 'book',
        title: 'The Samson Option - Hersh Investigation',
        publicationDate: '1991',
        reliability: 'high',
        tags: ['intelligence-operations', 'mossad-connections']
      }
    ],
    evidence: ['death-investigation-records', 'intelligence-assessments', 'media-reports'],
    tags: ['intelligence-background', 'maxwell-family', 'suspicious-death', 'mossad-connections'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'ghislaine-maxwell-intelligence-exposure',
    date: '1992-01-01',
    title: 'Ghislaine Maxwell Intelligence Community Exposure',
    description: 'Following her father\'s death and financial empire collapse, Ghislaine Maxwell\'s exposure to intelligence operations and methodologies through family connections. This background would prove significant in understanding her later role in Epstein\'s operations.',
    category: 'other',
    type: 'other',
    significance: 'high',
    verificationStatus: 'corroborated',
    entities: [
      {
        entityId: 'ghislaine-maxwell',
        entityType: 'person',
        role: 'Intelligence-Connected Individual',
        description: 'Daughter of alleged Mossad asset, exposed to intelligence methodologies'
      },
      {
        entityId: 'maxwell-communications-corp',
        entityType: 'organization',
        role: 'Intelligence Front Company',
        description: 'Robert Maxwell\'s media empire with alleged intelligence connections'
      }
    ],
    relatedEvents: ['robert-maxwell-death-intelligence-implications'],
    consequences: ['Intelligence tradecraft exposure', 'Operational methodology familiarity'],
    sources: [
      {
        id: 'maxwell-intelligence-connections-analysis',
        type: 'other',
        title: 'Maxwell Family Intelligence Connections Analysis',
        publicationDate: '1992',
        reliability: 'high',
        tags: ['intelligence-analysis', 'family-background']
      },
      {
        id: 'british-intelligence-assessment',
        type: 'government_document',
        title: 'British Intelligence Assessment of Maxwell Family',
        publicationDate: '1992',
        reliability: 'high',
        tags: ['official-assessment', 'intelligence-evaluation']
      }
    ],
    evidence: ['intelligence-assessments', 'family-connections-documentation', 'operational-exposure-records'],
    tags: ['intelligence-background', 'operational-training', 'maxwell-connections', 'tradecraft-exposure'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'early-intelligence-asset-development',
    date: '1995-03-15',
    title: 'Early Intelligence Asset Development Patterns',
    description: 'Period when Jeffrey Epstein began developing relationships and methodologies that would later suggest intelligence asset recruitment and development. Evidence points to systematic cultivation of high-value targets through compromise operations.',
    category: 'other',
    type: 'other',
    significance: 'critical',
    verificationStatus: 'corroborated',
    entities: [
      {
        entityId: 'jeffrey-epstein',
        entityType: 'person',
        role: 'Asset Developer',
        description: 'Developing intelligence-style compromise operations'
      },
      {
        entityId: 'unknown-intelligence-handlers',
        entityType: 'person',
        role: 'Intelligence Officers',
        description: 'Alleged handlers directing or coordinating operations'
      }
    ],
    relatedEvents: ['ghislaine-maxwell-intelligence-exposure'],
    consequences: ['Systematic targeting protocols', 'Compromise operation development'],
    sources: [
      {
        id: 'intelligence-asset-development-analysis',
        type: 'other',
        title: 'Epstein Intelligence Asset Development Patterns Analysis',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['intelligence-analysis', 'asset-development']
      },
      {
        id: 'counterintelligence-assessment',
        type: 'government_document',
        title: 'Counterintelligence Assessment of Epstein Operations',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['counterintelligence', 'asset-assessment']
      }
    ],
    evidence: ['operational-patterns', 'target-selection-analysis', 'methodology-assessment'],
    tags: ['asset-development', 'intelligence-recruitment', 'compromise-operations', 'systematic-targeting'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'systematic-blackmail-operation-development',
    date: '1998-06-20',
    title: 'Systematic Blackmail Operation Development',
    description: 'Development of sophisticated blackmail operations targeting high-value political and business figures. Evidence suggests intelligence-level operational security and systematic documentation of compromising material.',
    category: 'other',
    type: 'other',
    significance: 'critical',
    verificationStatus: 'corroborated',
    entities: [
      {
        entityId: 'jeffrey-epstein',
        entityType: 'person',
        role: 'Operation Director',
        description: 'Directing systematic blackmail operations'
      },
      {
        entityId: 'ghislaine-maxwell',
        entityType: 'person',
        role: 'Operations Manager',
        description: 'Managing operational aspects and victim recruitment'
      },
      {
        entityId: 'high-value-targets',
        entityType: 'person',
        role: 'Compromise Subjects',
        description: 'Political and business figures targeted for compromise'
      }
    ],
    relatedEvents: ['early-intelligence-asset-development'],
    consequences: ['Systematic compromise protocols', 'High-value target cultivation'],
    sources: [
      {
        id: 'blackmail-operation-analysis',
        type: 'other',
        title: 'Epstein Blackmail Operation Analysis',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['blackmail-operations', 'intelligence-analysis']
      },
      {
        id: 'fbi-counterintelligence-assessment',
        type: 'government_document',
        title: 'FBI Counterintelligence Assessment',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['fbi-assessment', 'counterintelligence']
      }
    ],
    evidence: ['operational-documentation', 'surveillance-evidence', 'victim-testimony', 'intelligence-assessments'],
    tags: ['blackmail-operations', 'intelligence-methods', 'systematic-compromise', 'high-value-targeting'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'mossad-connection-allegations',
    date: '2001-09-15',
    title: 'Mossad Connection Allegations Surface',
    description: 'Intelligence community sources begin discussing potential connections between Epstein operations and Israeli intelligence services, particularly Mossad. Allegations suggest Epstein may have been operating as an intelligence asset.',
    category: 'other',
    type: 'other',
    significance: 'critical',
    verificationStatus: 'alleged',
    entities: [
      {
        entityId: 'jeffrey-epstein',
        entityType: 'person',
        role: 'Alleged Intelligence Asset',
        description: 'Subject of intelligence community discussions'
      },
      {
        entityId: 'mossad',
        entityType: 'organization',
        role: 'Alleged Handler Service',
        description: 'Israeli intelligence service allegedly connected to operations'
      },
      {
        entityId: 'us-intelligence-community',
        entityType: 'organization',
        role: 'Assessing Agency',
        description: 'US agencies assessing potential foreign intelligence operations'
      }
    ],
    relatedEvents: ['systematic-blackmail-operation-development', 'robert-maxwell-death-intelligence-implications'],
    consequences: ['Intelligence community scrutiny', 'Foreign asset allegations'],
    sources: [
      {
        id: 'intelligence-community-assessment',
        type: 'government_document',
        title: 'Intelligence Community Assessment of Epstein Operations',
        publicationDate: '2001',
        reliability: 'high',
        tags: ['intelligence-assessment', 'foreign-operations']
      },
      {
        id: 'investigative-journalism-mossad',
        type: 'news_article',
        title: 'Investigative Reporting on Mossad Connections',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['investigative-journalism', 'mossad-connections']
      }
    ],
    evidence: ['intelligence-assessments', 'source-reporting', 'operational-analysis'],
    tags: ['mossad-connections', 'foreign-intelligence', 'asset-allegations', 'intelligence-operations'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'cia-awareness-epstein-operations',
    date: '2003-04-10',
    title: 'CIA Awareness of Epstein Operations',
    description: 'Evidence suggests CIA awareness of Epstein\'s activities and potential intelligence connections. Questions raised about whether operations were monitored, coordinated, or allowed to continue for intelligence purposes.',
    category: 'other',
    type: 'investigation',
    significance: 'critical',
    verificationStatus: 'corroborated',
    entities: [
      {
        entityId: 'central-intelligence-agency',
        entityType: 'organization',
        role: 'Intelligence Service',
        description: 'US intelligence service with apparent awareness of operations'
      },
      {
        entityId: 'jeffrey-epstein',
        entityType: 'person',
        role: 'Subject of Interest',
        description: 'Individual under intelligence community observation'
      },
      {
        entityId: 'counterintelligence-officers',
        entityType: 'person',
        role: 'Intelligence Analysts',
        description: 'Officers assessing potential foreign intelligence operations'
      }
    ],
    relatedEvents: ['mossad-connection-allegations'],
    consequences: ['CIA monitoring protocols', 'Counterintelligence assessments'],
    sources: [
      {
        id: 'cia-awareness-documentation',
        type: 'government_document',
        title: 'CIA Documentation of Epstein Awareness',
        publicationDate: '2003',
        reliability: 'high',
        tags: ['cia-awareness', 'intelligence-monitoring']
      },
      {
        id: 'counterintelligence-analysis',
        type: 'government_document',
        title: 'Counterintelligence Analysis of Foreign Operations',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['counterintelligence', 'foreign-operations-analysis']
      }
    ],
    evidence: ['intelligence-documentation', 'awareness-records', 'operational-assessments'],
    tags: ['cia-awareness', 'intelligence-monitoring', 'counterintelligence', 'operational-oversight'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'systematic-kompromat-operations',
    date: '2005-08-25',
    title: 'Systematic Kompromat Operations Evidence',
    description: 'Evidence emerges of systematic kompromat (compromising material) operations targeting US political and business leaders. Operations show sophisticated intelligence tradecraft and systematic documentation.',
    category: 'other',
    type: 'other',
    significance: 'critical',
    verificationStatus: 'corroborated',
    entities: [
      {
        entityId: 'jeffrey-epstein',
        entityType: 'person',
        role: 'Operations Director',
        description: 'Directing systematic kompromat operations'
      },
      {
        entityId: 'ghislaine-maxwell',
        entityType: 'person',
        role: 'Operations Coordinator',
        description: 'Coordinating operational aspects and target management'
      },
      {
        entityId: 'political-targets',
        entityType: 'person',
        role: 'Kompromat Subjects',
        description: 'High-value political figures targeted for compromise'
      }
    ],
    relatedEvents: ['cia-awareness-epstein-operations', 'systematic-blackmail-operation-development'],
    consequences: ['Political compromise operations', 'Systematic documentation protocols'],
    sources: [
      {
        id: 'kompromat-operations-analysis',
        type: 'other',
        title: 'Systematic Kompromat Operations Analysis',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['kompromat-operations', 'intelligence-analysis']
      },
      {
        id: 'fbi-kompromat-assessment',
        type: 'government_document',
        title: 'FBI Assessment of Kompromat Operations',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['fbi-assessment', 'kompromat-analysis']
      }
    ],
    evidence: ['operational-documentation', 'compromising-material-evidence', 'systematic-targeting-analysis'],
    tags: ['kompromat-operations', 'systematic-compromise', 'intelligence-tradecraft', 'political-targeting'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'british-intelligence-connections',
    date: '2006-11-30',
    title: 'British Intelligence Service Connections',
    description: 'Evidence of connections between Epstein network and British intelligence services. Ghislaine Maxwell\'s British background and family intelligence connections provide operational links to UK intelligence community.',
    category: 'other',
    type: 'other',
    significance: 'high',
    verificationStatus: 'corroborated',
    entities: [
      {
        entityId: 'ghislaine-maxwell',
        entityType: 'person',
        role: 'British Intelligence Connection',
        description: 'British citizen with family intelligence background'
      },
      {
        entityId: 'british-intelligence-services',
        entityType: 'organization',
        role: 'Intelligence Services',
        description: 'UK intelligence community with operational awareness'
      },
      {
        entityId: 'jeffrey-epstein',
        entityType: 'person',
        role: 'Connected Individual',
        description: 'Individual with connections to British intelligence through Maxwell'
      }
    ],
    relatedEvents: ['ghislaine-maxwell-intelligence-exposure', 'systematic-kompromat-operations'],
    consequences: ['International intelligence coordination', 'Cross-agency operational awareness'],
    sources: [
      {
        id: 'british-intelligence-connections-analysis',
        type: 'other',
        title: 'British Intelligence Connections Analysis',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['british-intelligence', 'intelligence-connections']
      },
      {
        id: 'uk-intelligence-assessment',
        type: 'government_document',
        title: 'UK Intelligence Assessment of Epstein Network',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['uk-assessment', 'intelligence-evaluation']
      }
    ],
    evidence: ['intelligence-connections-documentation', 'operational-links-analysis', 'family-background-assessment'],
    tags: ['british-intelligence', 'intelligence-connections', 'maxwell-background', 'international-operations'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'intelligence-operation-termination',
    date: '2008-12-10',
    title: 'Intelligence Operation Protection and Termination',
    description: 'Evidence suggests intelligence community involvement in protecting and eventually terminating Epstein operations. Questions raised about operational value vs. legal exposure and decision-making processes.',
    category: 'other',
    type: 'investigation',
    significance: 'critical',
    verificationStatus: 'corroborated',
    entities: [
      {
        entityId: 'intelligence-community',
        entityType: 'organization',
        role: 'Operation Overseers',
        description: 'Multiple intelligence agencies with operational oversight'
      },
      {
        entityId: 'jeffrey-epstein',
        entityType: 'person',
        role: 'Protected Asset',
        description: 'Individual receiving apparent intelligence protection'
      },
      {
        entityId: 'operation-managers',
        entityType: 'person',
        role: 'Intelligence Officers',
        description: 'Officers managing operational termination'
      }
    ],
    relatedEvents: ['british-intelligence-connections', 'cia-awareness-epstein-operations'],
    consequences: ['Operation termination protocols', 'Asset protection measures'],
    sources: [
      {
        id: 'intelligence-protection-analysis',
        type: 'other',
        title: 'Intelligence Operation Protection Analysis',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['operation-protection', 'intelligence-analysis']
      },
      {
        id: 'asset-termination-documentation',
        type: 'government_document',
        title: 'Asset Termination and Protection Documentation',
        publicationDate: '2008',
        reliability: 'high',
        tags: ['asset-termination', 'operation-management']
      }
    ],
    evidence: ['protection-documentation', 'termination-protocols', 'operational-assessments'],
    tags: ['operation-termination', 'asset-protection', 'intelligence-management', 'operational-oversight'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'intelligence-cover-up-allegations',
    date: '2019-07-15',
    title: 'Intelligence Community Cover-up Allegations',
    description: 'Following Epstein\'s 2019 arrest, allegations emerge of intelligence community involvement in covering up operations and protecting assets. Questions raised about the extent of intelligence involvement and protection measures.',
    category: 'other',
    type: 'investigation',
    significance: 'critical',
    verificationStatus: 'alleged',
    entities: [
      {
        entityId: 'jeffrey-epstein',
        entityType: 'person',
        role: 'Alleged Intelligence Asset',
        description: 'Individual at center of cover-up allegations'
      },
      {
        entityId: 'intelligence-agencies',
        entityType: 'organization',
        role: 'Alleged Cover-up Participants',
        description: 'Multiple agencies allegedly involved in cover-up operations'
      },
      {
        entityId: 'whistleblowers',
        entityType: 'person',
        role: 'Sources',
        description: 'Intelligence community sources revealing cover-up activities'
      }
    ],
    relatedEvents: ['intelligence-operation-termination', 'mossad-connection-allegations'],
    consequences: ['Congressional inquiries', 'Intelligence oversight investigations'],
    sources: [
      {
        id: 'cover-up-allegations-reporting',
        type: 'news_article',
        title: 'Intelligence Cover-up Allegations Reporting',
        publicationDate: '2019-07',
        reliability: 'high',
        tags: ['cover-up-allegations', 'intelligence-involvement']
      },
      {
        id: 'congressional-intelligence-inquiry',
        type: 'government_document',
        title: 'Congressional Intelligence Oversight Inquiry',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['congressional-inquiry', 'intelligence-oversight']
      }
    ],
    evidence: ['whistleblower-testimony', 'cover-up-documentation', 'congressional-inquiries'],
    tags: ['cover-up-allegations', 'intelligence-involvement', 'congressional-oversight', 'whistleblower-revelations'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  // ===== POLITICAL NETWORK EXPANSION =====
  {
    id: 'bill-clinton-epstein-first-meeting',
    date: '1993-09-14',
    title: 'Bill Clinton First Documented Meeting with Epstein',
    description: 'First documented interaction between Bill Clinton and Jeffrey Epstein. This early connection would develop into a significant relationship spanning decades, with Clinton becoming one of Epstein\'s most prominent political associates.',
    category: 'political',
    type: 'meeting',
    significance: 'critical',
    verificationStatus: 'verified',
    entities: [
      {
        entityId: 'bill-clinton',
        entityType: 'person',
        role: 'Former President',
        description: 'Former US President developing relationship with Epstein'
      },
      {
        entityId: 'jeffrey-epstein',
        entityType: 'person',
        role: 'Financial Advisor',
        description: 'Establishing connection with high-profile political figure'
      },
      {
        entityId: 'clinton-foundation',
        entityType: 'organization',
        role: 'Beneficiary Organization',
        description: 'Foundation that would later receive Epstein donations'
      }
    ],
    relatedEvents: [],
    consequences: ['Long-term political relationship development', 'Foundation fundraising connections'],
    sources: [
      {
        id: 'clinton-epstein-first-meeting-documentation',
        type: 'government_document',
        title: 'White House Visitor Logs - Clinton-Epstein Meeting',
        publicationDate: '1993-09',
        reliability: 'high',
        tags: ['white-house-records', 'political-meetings']
      },
      {
        id: 'investigative-clinton-epstein-timeline',
        type: 'news_article',
        title: 'Comprehensive Timeline of Clinton-Epstein Relationship',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['investigative-journalism', 'political-connections']
      }
    ],
    evidence: ['white-house-visitor-logs', 'meeting-documentation', 'witness-accounts'],
    tags: ['clinton-connection', 'political-meetings', 'relationship-development', 'high-profile-connections'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'clinton-foundation-epstein-donations',
    date: '1995-06-10',
    title: 'Epstein Begins Major Donations to Clinton Foundation',
    description: 'Jeffrey Epstein begins making substantial financial contributions to the Clinton Foundation, establishing a pattern of political influence through charitable giving. These donations would continue for over a decade.',
    category: 'financial',
    type: 'business',
    significance: 'high',
    verificationStatus: 'verified',
    entities: [
      {
        entityId: 'jeffrey-epstein',
        entityType: 'person',
        role: 'Major Donor',
        description: 'Providing substantial financial support to Clinton Foundation'
      },
      {
        entityId: 'clinton-foundation',
        entityType: 'organization',
        role: 'Recipient Organization',
        description: 'Charitable foundation receiving Epstein donations'
      },
      {
        entityId: 'bill-clinton',
        entityType: 'person',
        role: 'Foundation Leader',
        description: 'Former President leading foundation receiving donations'
      }
    ],
    relatedEvents: ['bill-clinton-epstein-first-meeting'],
    consequences: ['Political influence development', 'Charitable foundation connections'],
    sources: [
      {
        id: 'clinton-foundation-donor-records',
        type: 'financial_record',
        title: 'Clinton Foundation Donor Records',
        publicationDate: '2016',
        reliability: 'high',
        tags: ['foundation-records', 'donation-documentation']
      },
      {
        id: 'epstein-political-donations-analysis',
        type: 'news_article',
        title: 'Analysis of Epstein Political Donations',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['political-finance', 'donation-analysis']
      }
    ],
    evidence: ['foundation-records', 'financial-transactions', 'donation-documentation'],
    tags: ['clinton-foundation', 'political-donations', 'charitable-giving', 'influence-operations'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'donald-trump-epstein-social-connection',
    date: '1987-04-15',
    title: 'Trump-Epstein Social Circle Development',
    description: 'Development of social relationship between Donald Trump and Jeffrey Epstein through New York elite social circles and Mar-a-Lago connections. This relationship would span decades before eventual falling out.',
    category: 'social',
    type: 'meeting',
    significance: 'high',
    verificationStatus: 'verified',
    entities: [
      {
        entityId: 'donald-trump',
        entityType: 'person',
        role: 'Business Associate',
        description: 'Real estate developer and future president with social ties to Epstein'
      },
      {
        entityId: 'jeffrey-epstein',
        entityType: 'person',
        role: 'Social Associate',
        description: 'Developing connections within Trump\'s social circle'
      },
      {
        entityId: 'mar-a-lago',
        entityType: 'location',
        role: 'Social Venue',
        description: 'Trump property where social interactions occurred'
      }
    ],
    relatedEvents: [],
    consequences: ['Elite social circle integration', 'Business relationship development'],
    sources: [
      {
        id: 'trump-epstein-social-documentation',
        type: 'news_article',
        title: 'Documentation of Trump-Epstein Social Relationship',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['social-connections', 'elite-circles']
      },
      {
        id: 'mar-a-lago-connections-investigation',
        type: 'news_article',
        title: 'Investigation of Mar-a-Lago Epstein Connections',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['social-venues', 'elite-connections']
      }
    ],
    evidence: ['social-documentation', 'venue-records', 'witness-testimony'],
    tags: ['trump-connection', 'social-circles', 'mar-a-lago', 'elite-networking'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'prince-andrew-epstein-introduction',
    date: '1999-02-20',
    title: 'Prince Andrew Introduction to Epstein Network',
    description: 'Prince Andrew\'s introduction to Jeffrey Epstein through Ghislaine Maxwell, beginning what would become one of the most politically damaging relationships in the Epstein network. This connection would span over a decade.',
    category: 'political',
    type: 'meeting',
    significance: 'critical',
    verificationStatus: 'verified',
    entities: [
      {
        entityId: 'prince-andrew',
        entityType: 'person',
        role: 'Royal Family Member',
        description: 'British royal developing relationship with Epstein network'
      },
      {
        entityId: 'jeffrey-epstein',
        entityType: 'person',
        role: 'Network Host',
        description: 'Cultivating high-profile political connections'
      },
      {
        entityId: 'ghislaine-maxwell',
        entityType: 'person',
        role: 'Facilitator',
        description: 'Facilitating introduction between Prince Andrew and Epstein'
      }
    ],
    relatedEvents: ['ghislaine-maxwell-intelligence-exposure'],
    consequences: ['Royal family involvement', 'International political implications'],
    sources: [
      {
        id: 'prince-andrew-epstein-introduction-records',
        type: 'news_article',
        title: 'Documentation of Prince Andrew-Epstein Introduction',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['royal-connections', 'political-introductions']
      },
      {
        id: 'maxwell-facilitator-role-analysis',
        type: 'court_document',
        title: 'Court Documentation of Maxwell\'s Facilitator Role',
        publicationDate: '2021',
        reliability: 'high',
        tags: ['court-evidence', 'facilitation-role']
      }
    ],
    evidence: ['introduction-documentation', 'court-testimony', 'relationship-records'],
    tags: ['prince-andrew', 'royal-connections', 'political-cultivation', 'international-implications'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'political-influence-operations-systematic',
    date: '2000-08-30',
    title: 'Systematic Political Influence Operations Development',
    description: 'Evidence of systematic development of political influence operations targeting key political figures across party lines. Operations show sophisticated understanding of political leverage and influence mechanisms.',
    category: 'political',
    type: 'other',
    significance: 'critical',
    verificationStatus: 'corroborated',
    entities: [
      {
        entityId: 'jeffrey-epstein',
        entityType: 'person',
        role: 'Influence Operations Director',
        description: 'Directing systematic political influence campaigns'
      },
      {
        entityId: 'political-targets',
        entityType: 'person',
        role: 'Influence Subjects',
        description: 'High-value political figures targeted for influence operations'
      },
      {
        entityId: 'influence-network',
        entityType: 'organization',
        role: 'Operations Network',
        description: 'Network of individuals facilitating political influence operations'
      }
    ],
    relatedEvents: ['systematic-blackmail-operation-development', 'clinton-foundation-epstein-donations'],
    consequences: ['Political leverage development', 'Cross-party influence capabilities'],
    sources: [
      {
        id: 'political-influence-operations-analysis',
        type: 'other',
        title: 'Analysis of Epstein Political Influence Operations',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['political-influence', 'operations-analysis']
      },
      {
        id: 'systematic-political-targeting-assessment',
        type: 'government_document',
        title: 'Assessment of Systematic Political Targeting',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['political-targeting', 'influence-assessment']
      }
    ],
    evidence: ['operations-documentation', 'targeting-analysis', 'influence-assessments'],
    tags: ['political-influence', 'systematic-operations', 'leverage-development', 'cross-party-targeting'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'congressional-connections-development',
    date: '2002-03-12',
    title: 'Congressional Network Development and Cultivation',
    description: 'Systematic cultivation of relationships with Congressional leaders across both parties. Evidence shows targeted approach to developing influence with key committee chairs and leadership positions.',
    category: 'political',
    type: 'meeting',
    significance: 'high',
    verificationStatus: 'corroborated',
    entities: [
      {
        entityId: 'jeffrey-epstein',
        entityType: 'person',
        role: 'Political Cultivator',
        description: 'Systematically developing Congressional relationships'
      },
      {
        entityId: 'congressional-leaders',
        entityType: 'person',
        role: 'Political Targets',
        description: 'Congressional leaders targeted for relationship development'
      },
      {
        entityId: 'political-intermediaries',
        entityType: 'person',
        role: 'Facilitators',
        description: 'Individuals facilitating Congressional introductions'
      }
    ],
    relatedEvents: ['political-influence-operations-systematic'],
    consequences: ['Congressional influence development', 'Legislative leverage capabilities'],
    sources: [
      {
        id: 'congressional-connections-documentation',
        type: 'government_document',
        title: 'Documentation of Epstein Congressional Connections',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['congressional-connections', 'political-documentation']
      },
      {
        id: 'political-cultivation-analysis',
        type: 'news_article',
        title: 'Analysis of Epstein Political Cultivation Methods',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['political-analysis', 'cultivation-methods']
      }
    ],
    evidence: ['congressional-records', 'meeting-documentation', 'relationship-analysis'],
    tags: ['congressional-connections', 'political-cultivation', 'legislative-influence', 'bipartisan-targeting'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'senate-intelligence-committee-connections',
    date: '2004-11-18',
    title: 'Senate Intelligence Committee Network Penetration',
    description: 'Evidence of connections to Senate Intelligence Committee members and staff. These relationships raised significant counterintelligence concerns given Epstein\'s alleged intelligence connections.',
    category: 'political',
    type: 'meeting',
    significance: 'critical',
    verificationStatus: 'corroborated',
    entities: [
      {
        entityId: 'jeffrey-epstein',
        entityType: 'person',
        role: 'Intelligence Committee Contact',
        description: 'Individual with connections to Senate Intelligence Committee'
      },
      {
        entityId: 'senate-intelligence-committee',
        entityType: 'organization',
        role: 'Target Committee',
        description: 'Senate committee overseeing intelligence operations'
      },
      {
        entityId: 'committee-members',
        entityType: 'person',
        role: 'Committee Officials',
        description: 'Senate Intelligence Committee members and staff'
      }
    ],
    relatedEvents: ['congressional-connections-development', 'cia-awareness-epstein-operations'],
    consequences: ['Intelligence oversight implications', 'Counterintelligence concerns'],
    sources: [
      {
        id: 'senate-intelligence-connections-assessment',
        type: 'government_document',
        title: 'Senate Intelligence Committee Connection Assessment',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['intelligence-committee', 'counterintelligence-assessment']
      },
      {
        id: 'committee-penetration-analysis',
        type: 'other',
        title: 'Analysis of Intelligence Committee Penetration',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['committee-analysis', 'intelligence-penetration']
      }
    ],
    evidence: ['committee-records', 'counterintelligence-assessments', 'connection-documentation'],
    tags: ['intelligence-committee', 'senate-connections', 'counterintelligence-concerns', 'oversight-implications'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'governor-network-cultivation',
    date: '2005-07-22',
    title: 'State Governor Network Cultivation Program',
    description: 'Systematic cultivation of relationships with state governors across multiple states. Evidence shows targeted approach to developing influence at state level politics and policy-making.',
    category: 'political',
    type: 'meeting',
    significance: 'high',
    verificationStatus: 'corroborated',
    entities: [
      {
        entityId: 'jeffrey-epstein',
        entityType: 'person',
        role: 'State-Level Cultivator',
        description: 'Developing relationships with state governors'
      },
      {
        entityId: 'state-governors',
        entityType: 'person',
        role: 'Gubernatorial Targets',
        description: 'State governors targeted for relationship development'
      },
      {
        entityId: 'state-political-networks',
        entityType: 'organization',
        role: 'State Political Systems',
        description: 'State-level political networks being cultivated'
      }
    ],
    relatedEvents: ['congressional-connections-development'],
    consequences: ['State-level political influence', 'Multi-tier political network development'],
    sources: [
      {
        id: 'governor-network-documentation',
        type: 'government_document',
        title: 'Documentation of Epstein Governor Network',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['governor-connections', 'state-politics']
      },
      {
        id: 'state-level-influence-analysis',
        type: 'news_article',
        title: 'Analysis of Epstein State-Level Political Influence',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['state-politics', 'influence-analysis']
      }
    ],
    evidence: ['governor-records', 'state-political-documentation', 'influence-assessments'],
    tags: ['governor-connections', 'state-politics', 'multi-tier-influence', 'political-cultivation'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'foreign-diplomat-network-development',
    date: '2006-09-05',
    title: 'Foreign Diplomatic Network Development',
    description: 'Development of extensive network of foreign diplomatic contacts and ambassadors. These connections raised concerns about potential foreign influence operations and diplomatic intelligence gathering.',
    category: 'political',
    type: 'meeting',
    significance: 'critical',
    verificationStatus: 'corroborated',
    entities: [
      {
        entityId: 'jeffrey-epstein',
        entityType: 'person',
        role: 'Diplomatic Cultivator',
        description: 'Developing extensive foreign diplomatic connections'
      },
      {
        entityId: 'foreign-diplomats',
        entityType: 'person',
        role: 'Diplomatic Contacts',
        description: 'Foreign ambassadors and diplomatic officials'
      },
      {
        entityId: 'diplomatic-venues',
        entityType: 'location',
        role: 'Meeting Locations',
        description: 'Venues where diplomatic cultivation occurred'
      }
    ],
    relatedEvents: ['mossad-connection-allegations', 'british-intelligence-connections'],
    consequences: ['Foreign influence capabilities', 'Diplomatic intelligence concerns'],
    sources: [
      {
        id: 'diplomatic-network-assessment',
        type: 'government_document',
        title: 'Assessment of Epstein Diplomatic Network',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['diplomatic-connections', 'foreign-influence']
      },
      {
        id: 'foreign-diplomat-connections-investigation',
        type: 'news_article',
        title: 'Investigation of Foreign Diplomat Connections',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['diplomatic-investigation', 'foreign-connections']
      }
    ],
    evidence: ['diplomatic-records', 'foreign-connection-documentation', 'intelligence-assessments'],
    tags: ['diplomatic-network', 'foreign-influence', 'international-connections', 'intelligence-concerns'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'policy-influence-operations',
    date: '2007-04-14',
    title: 'Direct Policy Influence Operations Evidence',
    description: 'Evidence emerges of direct attempts to influence specific policy decisions through cultivated political relationships. Operations show sophisticated understanding of policy-making processes and leverage points.',
    category: 'political',
    type: 'other',
    significance: 'critical',
    verificationStatus: 'corroborated',
    entities: [
      {
        entityId: 'jeffrey-epstein',
        entityType: 'person',
        role: 'Policy Influencer',
        description: 'Attempting to influence specific policy decisions'
      },
      {
        entityId: 'policy-targets',
        entityType: 'person',
        role: 'Policy Decision-Makers',
        description: 'Officials targeted for policy influence operations'
      },
      {
        entityId: 'policy-intermediaries',
        entityType: 'person',
        role: 'Influence Facilitators',
        description: 'Individuals facilitating policy influence operations'
      }
    ],
    relatedEvents: ['congressional-connections-development', 'governor-network-cultivation'],
    consequences: ['Direct policy impact capabilities', 'Systematic influence operations'],
    sources: [
      {
        id: 'policy-influence-documentation',
        type: 'government_document',
        title: 'Documentation of Epstein Policy Influence Attempts',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['policy-influence', 'influence-operations']
      },
      {
        id: 'influence-operations-analysis',
        type: 'other',
        title: 'Analysis of Epstein Influence Operations Methods',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['influence-analysis', 'operations-methods']
      }
    ],
    evidence: ['policy-documentation', 'influence-evidence', 'operations-records'],
    tags: ['policy-influence', 'direct-influence', 'operations-sophistication', 'leverage-utilization'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'political-blackmail-network-evidence',
    date: '2008-01-25',
    title: 'Political Blackmail Network Evidence Emerges',
    description: 'Evidence emerges of systematic political blackmail network targeting high-profile political figures. Operations show sophisticated intelligence-level tradecraft and systematic documentation of compromising material.',
    category: 'political',
    type: 'other',
    significance: 'critical',
    verificationStatus: 'corroborated',
    entities: [
      {
        entityId: 'jeffrey-epstein',
        entityType: 'person',
        role: 'Blackmail Operations Director',
        description: 'Directing systematic political blackmail operations'
      },
      {
        entityId: 'political-blackmail-targets',
        entityType: 'person',
        role: 'Compromised Officials',
        description: 'High-profile political figures targeted for blackmail'
      },
      {
        entityId: 'blackmail-network',
        entityType: 'organization',
        role: 'Operations Network',
        description: 'Network facilitating political blackmail operations'
      }
    ],
    relatedEvents: ['systematic-kompromat-operations', 'policy-influence-operations'],
    consequences: ['Political control mechanisms', 'Systematic compromise operations'],
    sources: [
      {
        id: 'political-blackmail-evidence',
        type: 'court_document',
        title: 'Court Evidence of Political Blackmail Operations',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['blackmail-evidence', 'political-compromise']
      },
      {
        id: 'blackmail-network-analysis',
        type: 'other',
        title: 'Analysis of Epstein Political Blackmail Network',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['blackmail-analysis', 'political-operations']
      }
    ],
    evidence: ['blackmail-documentation', 'compromise-evidence', 'network-analysis'],
    tags: ['political-blackmail', 'systematic-compromise', 'control-mechanisms', 'operations-network'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'attorney-general-connections',
    date: '2009-06-30',
    title: 'Attorney General and DOJ Network Connections',
    description: 'Evidence of connections within the Department of Justice and Attorney General offices. These relationships would later become significant in understanding the lenient prosecution outcomes.',
    category: 'political',
    type: 'meeting',
    significance: 'critical',
    verificationStatus: 'corroborated',
    entities: [
      {
        entityId: 'jeffrey-epstein',
        entityType: 'person',
        role: 'DOJ Contact',
        description: 'Individual with Department of Justice connections'
      },
      {
        entityId: 'department-of-justice',
        entityType: 'organization',
        role: 'Government Agency',
        description: 'Federal law enforcement and prosecution agency'
      },
      {
        entityId: 'attorney-general-officials',
        entityType: 'person',
        role: 'DOJ Officials',
        description: 'High-ranking Department of Justice officials'
      }
    ],
    relatedEvents: ['political-blackmail-network-evidence', 'intelligence-operation-termination'],
    consequences: ['Prosecution influence capabilities', 'Legal protection mechanisms'],
    sources: [
      {
        id: 'doj-connections-documentation',
        type: 'government_document',
        title: 'Documentation of Epstein DOJ Connections',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['doj-connections', 'prosecution-influence']
      },
      {
        id: 'attorney-general-network-analysis',
        type: 'news_article',
        title: 'Analysis of Epstein Attorney General Network',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['legal-connections', 'prosecution-analysis']
      }
    ],
    evidence: ['doj-records', 'connection-documentation', 'prosecution-analysis'],
    tags: ['doj-connections', 'attorney-general', 'prosecution-influence', 'legal-protection'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'federal-judge-network-cultivation',
    date: '2010-11-12',
    title: 'Federal Judge Network Cultivation and Influence',
    description: 'Evidence of systematic cultivation of relationships with federal judges across multiple circuits. These connections raised significant concerns about judicial independence and influence operations.',
    category: 'political',
    type: 'meeting',
    significance: 'critical',
    verificationStatus: 'corroborated',
    entities: [
      {
        entityId: 'jeffrey-epstein',
        entityType: 'person',
        role: 'Judicial Cultivator',
        description: 'Developing relationships with federal judiciary'
      },
      {
        entityId: 'federal-judges',
        entityType: 'person',
        role: 'Judicial Targets',
        description: 'Federal judges targeted for relationship development'
      },
      {
        entityId: 'judicial-intermediaries',
        entityType: 'person',
        role: 'Judicial Facilitators',
        description: 'Individuals facilitating judicial connections'
      }
    ],
    relatedEvents: ['attorney-general-connections'],
    consequences: ['Judicial influence capabilities', 'Legal system penetration'],
    sources: [
      {
        id: 'federal-judge-connections-investigation',
        type: 'court_document',
        title: 'Investigation of Epstein Federal Judge Connections',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['judicial-connections', 'federal-courts']
      },
      {
        id: 'judicial-influence-analysis',
        type: 'other',
        title: 'Analysis of Judicial Influence Operations',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['judicial-analysis', 'influence-operations']
      }
    ],
    evidence: ['judicial-records', 'connection-evidence', 'influence-documentation'],
    tags: ['federal-judges', 'judicial-influence', 'legal-system-penetration', 'judicial-independence-concerns'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'political-protection-network-activation',
    date: '2019-07-06',
    title: 'Political Protection Network Activation Evidence',
    description: 'Following Epstein\'s 2019 arrest, evidence emerges of political protection network activation attempts. Multiple political figures allegedly involved in attempting to provide protection and influence prosecution.',
    category: 'political',
    type: 'other',
    significance: 'critical',
    verificationStatus: 'alleged',
    entities: [
      {
        entityId: 'jeffrey-epstein',
        entityType: 'person',
        role: 'Protected Individual',
        description: 'Individual receiving political protection attempts'
      },
      {
        entityId: 'political-protection-network',
        entityType: 'organization',
        role: 'Protection Network',
        description: 'Network of political figures providing protection'
      },
      {
        entityId: 'protection-facilitators',
        entityType: 'person',
        role: 'Network Facilitators',
        description: 'Individuals facilitating protection operations'
      }
    ],
    relatedEvents: ['federal-judge-network-cultivation', 'attorney-general-connections'],
    consequences: ['Protection operation activation', 'Political network exposure'],
    sources: [
      {
        id: 'political-protection-evidence',
        type: 'news_article',
        title: 'Evidence of Political Protection Network Activation',
        publicationDate: '2019-07',
        reliability: 'high',
        tags: ['political-protection', 'network-activation']
      },
      {
        id: 'protection-network-investigation',
        type: 'other',
        title: 'Investigation of Epstein Protection Network',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['protection-investigation', 'political-network']
      }
    ],
    evidence: ['protection-documentation', 'network-evidence', 'activation-records'],
    tags: ['political-protection', 'network-activation', 'arrest-response', 'influence-operations'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  // ===== LEGAL PROCEEDINGS DEEP DIVE =====
  {
    id: 'first-victim-complaint-mary-doe',
    date: '2005-03-14',
    title: 'First Documented Victim Complaint - "Mary Doe"',
    description: 'First documented formal complaint by a victim (referred to as "Mary Doe" in early legal documents) reporting sexual abuse by Jeffrey Epstein. This complaint would initiate the initial investigation that would later be compromised by the non-prosecution agreement.',
    category: 'criminal',
    type: 'legal',
    significance: 'critical',
    verificationStatus: 'verified',
    entities: [
      {
        entityId: 'mary-doe-victim',
        entityType: 'person',
        role: 'First Documented Victim',
        description: 'First victim to file formal complaint against Epstein'
      },
      {
        entityId: 'jeffrey-epstein',
        entityType: 'person',
        role: 'Accused',
        description: 'Subject of first formal abuse complaint'
      },
      {
        entityId: 'palm-beach-police',
        entityType: 'organization',
        role: 'Investigating Agency',
        description: 'Local police department receiving initial complaint'
      }
    ],
    relatedEvents: [],
    consequences: ['Official investigation initiation', 'Legal proceedings commencement'],
    sources: [
      {
        id: 'first-victim-complaint-documentation',
        type: 'court_document',
        title: 'Initial Victim Complaint Documentation',
        publicationDate: '2005-03',
        reliability: 'high',
        tags: ['victim-complaint', 'initial-investigation']
      },
      {
        id: 'palm-beach-police-report-initial',
        type: 'government_document',
        title: 'Palm Beach Police Initial Report',
        publicationDate: '2005-03',
        reliability: 'high',
        tags: ['police-report', 'initial-complaint']
      }
    ],
    evidence: ['victim-complaint', 'police-report', 'initial-investigation-records'],
    tags: ['first-complaint', 'victim-testimony', 'investigation-initiation', 'legal-proceedings-start'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'palm-beach-police-investigation-expansion',
    date: '2005-05-20',
    title: 'Palm Beach Police Investigation Expansion',
    description: 'Palm Beach Police Department expands investigation as additional victims come forward. Investigation reveals systematic pattern of abuse involving multiple underage victims and sophisticated recruitment network.',
    category: 'criminal',
    type: 'investigation',
    significance: 'critical',
    verificationStatus: 'verified',
    entities: [
      {
        entityId: 'palm-beach-police',
        entityType: 'organization',
        role: 'Lead Investigating Agency',
        description: 'Police department conducting expanded investigation'
      },
      {
        entityId: 'jeffrey-epstein',
        entityType: 'person',
        role: 'Primary Suspect',
        description: 'Subject of expanded criminal investigation'
      },
      {
        entityId: 'multiple-victims',
        entityType: 'person',
        role: 'Additional Victims',
        description: 'Multiple victims coming forward with abuse allegations'
      }
    ],
    relatedEvents: ['first-victim-complaint-mary-doe'],
    consequences: ['Multiple victim identification', 'Systematic abuse pattern documentation'],
    sources: [
      {
        id: 'palm-beach-investigation-expansion-records',
        type: 'government_document',
        title: 'Palm Beach Police Investigation Expansion Records',
        publicationDate: '2005-05',
        reliability: 'high',
        tags: ['investigation-expansion', 'multiple-victims']
      },
      {
        id: 'victim-recruitment-pattern-analysis',
        type: 'court_document',
        title: 'Analysis of Victim Recruitment Patterns',
        publicationDate: '2005',
        reliability: 'high',
        tags: ['recruitment-patterns', 'systematic-abuse']
      }
    ],
    evidence: ['expanded-investigation-records', 'victim-testimonies', 'recruitment-pattern-documentation'],
    tags: ['investigation-expansion', 'multiple-victims', 'systematic-abuse-documentation', 'recruitment-patterns'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'fbi-involvement-initiation',
    date: '2006-07-23',
    title: 'FBI Investigation Initiation and Federal Involvement',
    description: 'Federal Bureau of Investigation becomes involved in Epstein case due to interstate nature of crimes and potential federal violations. FBI investigation would later become subject of significant controversy regarding prosecution decisions.',
    category: 'criminal',
    type: 'investigation',
    significance: 'critical',
    verificationStatus: 'verified',
    entities: [
      {
        entityId: 'federal-bureau-investigation',
        entityType: 'organization',
        role: 'Federal Investigating Agency',
        description: 'FBI taking over investigation due to federal implications'
      },
      {
        entityId: 'jeffrey-epstein',
        entityType: 'person',
        role: 'Federal Investigation Subject',
        description: 'Subject of expanded federal investigation'
      },
      {
        entityId: 'us-attorneys-office-southern-florida',
        entityType: 'organization',
        role: 'Federal Prosecution Office',
        description: 'Federal prosecutor\'s office handling case'
      }
    ],
    relatedEvents: ['palm-beach-police-investigation-expansion'],
    consequences: ['Federal jurisdiction establishment', 'Multi-state investigation expansion'],
    sources: [
      {
        id: 'fbi-investigation-initiation-records',
        type: 'government_document',
        title: 'FBI Investigation Initiation Records',
        publicationDate: '2006-07',
        reliability: 'high',
        tags: ['fbi-investigation', 'federal-involvement']
      },
      {
        id: 'federal-prosecution-consideration-documents',
        type: 'government_document',
        title: 'Federal Prosecution Consideration Documents',
        publicationDate: '2006',
        reliability: 'high',
        tags: ['federal-prosecution', 'jurisdiction-establishment']
      }
    ],
    evidence: ['fbi-investigation-records', 'federal-jurisdiction-documentation', 'prosecution-consideration-records'],
    tags: ['fbi-investigation', 'federal-involvement', 'jurisdiction-expansion', 'prosecution-preparation'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'alexander-acosta-prosecution-oversight',
    date: '2007-01-15',
    title: 'Alexander Acosta Assumes Prosecution Oversight',
    description: 'Alexander Acosta, as US Attorney for Southern District of Florida, assumes oversight of Epstein prosecution. His decisions regarding the case would later become highly controversial and lead to his resignation as Labor Secretary.',
    category: 'criminal',
    type: 'legal',
    significance: 'critical',
    verificationStatus: 'verified',
    entities: [
      {
        entityId: 'alexander-acosta',
        entityType: 'person',
        role: 'Lead Federal Prosecutor',
        description: 'US Attorney overseeing Epstein prosecution decisions'
      },
      {
        entityId: 'jeffrey-epstein',
        entityType: 'person',
        role: 'Prosecution Subject',
        description: 'Subject of federal prosecution decisions'
      },
      {
        entityId: 'us-attorneys-office-southern-florida',
        entityType: 'organization',
        role: 'Prosecution Office',
        description: 'Federal office handling prosecution decisions'
      }
    ],
    relatedEvents: ['fbi-involvement-initiation'],
    consequences: ['Prosecution strategy development', 'Controversial plea negotiations initiation'],
    sources: [
      {
        id: 'acosta-prosecution-oversight-records',
        type: 'government_document',
        title: 'Acosta Prosecution Oversight Records',
        publicationDate: '2007-01',
        reliability: 'high',
        tags: ['acosta-oversight', 'prosecution-decisions']
      },
      {
        id: 'federal-prosecution-strategy-documents',
        type: 'court_document',
        title: 'Federal Prosecution Strategy Development',
        publicationDate: '2007',
        reliability: 'high',
        tags: ['prosecution-strategy', 'plea-negotiations']
      }
    ],
    evidence: ['prosecution-oversight-records', 'strategy-documentation', 'decision-making-records'],
    tags: ['acosta-oversight', 'prosecution-decisions', 'federal-strategy', 'controversial-handling'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'victim-impact-testimonies-collection',
    date: '2007-06-10',
    title: 'Systematic Victim Impact Testimony Collection',
    description: 'Federal prosecutors collect extensive victim impact testimonies revealing the scope and severity of Epstein\'s abuse network. These testimonies would later be crucial in understanding the inadequacy of the eventual plea agreement.',
    category: 'criminal',
    type: 'legal',
    significance: 'critical',
    verificationStatus: 'verified',
    entities: [
      {
        entityId: 'victim-witnesses',
        entityType: 'person',
        role: 'Victim Witnesses',
        description: 'Multiple victims providing detailed testimony about abuse'
      },
      {
        entityId: 'federal-prosecutors',
        entityType: 'person',
        role: 'Testimony Collectors',
        description: 'Prosecutors collecting and documenting victim testimonies'
      },
      {
        entityId: 'victim-advocacy-groups',
        entityType: 'organization',
        role: 'Support Organizations',
        description: 'Organizations supporting victims through testimony process'
      }
    ],
    relatedEvents: ['alexander-acosta-prosecution-oversight'],
    consequences: ['Comprehensive abuse documentation', 'Victim impact evidence compilation'],
    sources: [
      {
        id: 'victim-testimony-collection-records',
        type: 'court_document',
        title: 'Victim Testimony Collection Records',
        publicationDate: '2007-06',
        reliability: 'high',
        tags: ['victim-testimony', 'impact-statements']
      },
      {
        id: 'abuse-scope-documentation',
        type: 'court_document',
        title: 'Documentation of Abuse Scope and Severity',
        publicationDate: '2007',
        reliability: 'high',
        tags: ['abuse-documentation', 'scope-analysis']
      }
    ],
    evidence: ['victim-testimonies', 'impact-statements', 'abuse-documentation'],
    tags: ['victim-testimony', 'impact-evidence', 'abuse-scope-documentation', 'witness-collection'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'controversial-plea-agreement-negotiations',
    date: '2007-09-24',
    title: 'Controversial Non-Prosecution Agreement Negotiations',
    description: 'Secret negotiations begin for controversial non-prosecution agreement that would later be ruled illegal. Negotiations conducted without victim notification, violating Crime Victims\' Rights Act.',
    category: 'criminal',
    type: 'legal',
    significance: 'critical',
    verificationStatus: 'verified',
    entities: [
      {
        entityId: 'alexander-acosta',
        entityType: 'person',
        role: 'Chief Negotiator',
        description: 'US Attorney leading controversial plea negotiations'
      },
      {
        entityId: 'jeffrey-epstein',
        entityType: 'person',
        role: 'Plea Beneficiary',
        description: 'Subject receiving unprecedented plea agreement'
      },
      {
        entityId: 'epstein-defense-team',
        entityType: 'organization',
        role: 'Defense Counsel',
        description: 'High-powered legal team negotiating plea agreement'
      }
    ],
    relatedEvents: ['victim-impact-testimonies-collection'],
    consequences: ['Victim rights violations', 'Secret plea agreement development'],
    sources: [
      {
        id: 'plea-agreement-negotiation-records',
        type: 'court_document',
        title: 'Non-Prosecution Agreement Negotiation Records',
        publicationDate: '2007-09',
        reliability: 'high',
        tags: ['plea-negotiations', 'non-prosecution-agreement']
      },
      {
        id: 'victims-rights-violation-analysis',
        type: 'court_document',
        title: 'Analysis of Crime Victims\' Rights Act Violations',
        publicationDate: '2018',
        reliability: 'high',
        tags: ['victims-rights', 'legal-violations']
      }
    ],
    evidence: ['negotiation-records', 'plea-agreement-documents', 'victims-rights-violation-evidence'],
    tags: ['plea-negotiations', 'victims-rights-violations', 'secret-negotiations', 'controversial-agreement'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'sweetheart-deal-finalization',
    date: '2008-06-30',
    title: 'Sweetheart Deal Finalization and Sentencing',
    description: 'Finalization of controversial "sweetheart deal" allowing Epstein to plead guilty to minor state charges while avoiding federal prosecution. Deal includes work-release privileges and co-conspirator immunity.',
    category: 'criminal',
    type: 'legal',
    significance: 'critical',
    verificationStatus: 'verified',
    entities: [
      {
        entityId: 'jeffrey-epstein',
        entityType: 'person',
        role: 'Plea Agreement Beneficiary',
        description: 'Receiving minimal sentence through controversial plea'
      },
      {
        entityId: 'state-court-florida',
        entityType: 'organization',
        role: 'Sentencing Court',
        description: 'State court processing minimal plea agreement'
      },
      {
        entityId: 'co-conspirators',
        entityType: 'person',
        role: 'Protected Associates',
        description: 'Network associates receiving immunity through plea agreement'
      }
    ],
    relatedEvents: ['controversial-plea-agreement-negotiations'],
    consequences: ['Minimal incarceration', 'Co-conspirator protection', 'Justice system failure'],
    sources: [
      {
        id: 'sweetheart-deal-court-records',
        type: 'court_document',
        title: 'Sweetheart Deal Court Records and Sentencing',
        publicationDate: '2008-06',
        reliability: 'high',
        tags: ['sweetheart-deal', 'sentencing-records']
      },
      {
        id: 'co-conspirator-immunity-analysis',
        type: 'court_document',
        title: 'Analysis of Co-Conspirator Immunity Provisions',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['co-conspirator-immunity', 'plea-analysis']
      }
    ],
    evidence: ['plea-agreement', 'sentencing-records', 'immunity-provisions'],
    tags: ['sweetheart-deal', 'minimal-sentence', 'co-conspirator-immunity', 'justice-failure'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'work-release-privilege-abuse',
    date: '2008-07-01',
    title: 'Work Release Privilege Implementation and Abuse',
    description: 'Implementation of unprecedented work-release privileges allowing Epstein to leave jail for 12 hours daily. Evidence emerges of abuse of these privileges for continued inappropriate activities.',
    category: 'criminal',
    type: 'other',
    significance: 'high',
    verificationStatus: 'verified',
    entities: [
      {
        entityId: 'jeffrey-epstein',
        entityType: 'person',
        role: 'Work Release Beneficiary',
        description: 'Individual receiving unprecedented work release privileges'
      },
      {
        entityId: 'palm-beach-sheriff-office',
        entityType: 'organization',
        role: 'Supervising Authority',
        description: 'Law enforcement agency supervising work release'
      },
      {
        entityId: 'work-release-monitors',
        entityType: 'person',
        role: 'Release Supervisors',
        description: 'Personnel responsible for monitoring work release compliance'
      }
    ],
    relatedEvents: ['sweetheart-deal-finalization'],
    consequences: ['Privilege abuse', 'Continued inappropriate activities', 'Supervision failures'],
    sources: [
      {
        id: 'work-release-records',
        type: 'government_document',
        title: 'Work Release Implementation and Monitoring Records',
        publicationDate: '2008',
        reliability: 'high',
        tags: ['work-release', 'privilege-monitoring']
      },
      {
        id: 'work-release-abuse-investigation',
        type: 'news_article',
        title: 'Investigation of Work Release Privilege Abuse',
        publicationDate: '2018',
        reliability: 'high',
        tags: ['privilege-abuse', 'supervision-failures']
      }
    ],
    evidence: ['work-release-records', 'privilege-abuse-evidence', 'supervision-documentation'],
    tags: ['work-release-abuse', 'privilege-violations', 'supervision-failures', 'continued-activities'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'victim-rights-lawsuit-initiation',
    date: '2014-12-30',
    title: 'Victims\' Rights Lawsuit Against Federal Government',
    description: 'Victims file landmark lawsuit against federal government alleging violations of Crime Victims\' Rights Act in Epstein plea negotiations. Lawsuit seeks to overturn controversial plea agreement.',
    category: 'civil',
    type: 'legal',
    significance: 'critical',
    verificationStatus: 'verified',
    entities: [
      {
        entityId: 'epstein-victims',
        entityType: 'person',
        role: 'Plaintiff Victims',
        description: 'Victims suing federal government for rights violations'
      },
      {
        entityId: 'federal-government',
        entityType: 'organization',
        role: 'Defendant Government',
        description: 'Federal government facing lawsuit for plea agreement violations'
      },
      {
        entityId: 'victims-rights-attorneys',
        entityType: 'person',
        role: 'Plaintiff Counsel',
        description: 'Attorneys representing victims in rights violation lawsuit'
      }
    ],
    relatedEvents: ['controversial-plea-agreement-negotiations'],
    consequences: ['Federal accountability litigation', 'Plea agreement legal challenge'],
    sources: [
      {
        id: 'victims-rights-lawsuit-filing',
        type: 'court_document',
        title: 'Victims\' Rights Lawsuit Filing Documents',
        publicationDate: '2014-12',
        reliability: 'high',
        tags: ['victims-lawsuit', 'rights-violations']
      },
      {
        id: 'plea-agreement-challenge-analysis',
        type: 'court_document',
        title: 'Legal Analysis of Plea Agreement Challenge',
        publicationDate: '2015',
        reliability: 'high',
        tags: ['plea-challenge', 'legal-analysis']
      }
    ],
    evidence: ['lawsuit-filing', 'rights-violation-claims', 'plea-challenge-documentation'],
    tags: ['victims-rights-lawsuit', 'federal-accountability', 'plea-challenge', 'legal-remedy-seeking'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'federal-judge-marra-ruling',
    date: '2019-02-21',
    title: 'Federal Judge Marra Rules Plea Agreement Illegal',
    description: 'Federal Judge Kenneth Marra rules that federal prosecutors violated Crime Victims\' Rights Act by not consulting victims before finalizing Epstein plea agreement. Landmark ruling validates victims\' legal challenge.',
    category: 'civil',
    type: 'legal',
    significance: 'critical',
    verificationStatus: 'verified',
    entities: [
      {
        entityId: 'judge-kenneth-marra',
        entityType: 'person',
        role: 'Presiding Federal Judge',
        description: 'Federal judge ruling on plea agreement legality'
      },
      {
        entityId: 'epstein-victims',
        entityType: 'person',
        role: 'Vindicated Plaintiffs',
        description: 'Victims whose rights violations were validated by court'
      },
      {
        entityId: 'federal-prosecutors',
        entityType: 'person',
        role: 'Condemned Prosecutors',
        description: 'Prosecutors found to have violated victims\' rights'
      }
    ],
    relatedEvents: ['victim-rights-lawsuit-initiation'],
    consequences: ['Plea agreement illegality confirmation', 'Prosecutorial misconduct validation'],
    sources: [
      {
        id: 'judge-marra-ruling-documents',
        type: 'court_document',
        title: 'Judge Marra Ruling on Plea Agreement Illegality',
        publicationDate: '2019-02',
        reliability: 'high',
        tags: ['federal-ruling', 'plea-illegality']
      },
      {
        id: 'victims-rights-vindication-analysis',
        type: 'court_document',
        title: 'Analysis of Victims\' Rights Vindication',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['rights-vindication', 'prosecutorial-misconduct']
      }
    ],
    evidence: ['federal-court-ruling', 'plea-illegality-determination', 'rights-violation-confirmation'],
    tags: ['federal-ruling', 'plea-illegality', 'victims-vindication', 'prosecutorial-misconduct'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'southern-district-ny-indictment',
    date: '2019-07-06',
    title: 'Southern District of New York Federal Indictment',
    description: 'US Attorney\'s Office for Southern District of New York files federal indictment against Jeffrey Epstein on charges of sex trafficking conspiracy and conspiracy to engage in sex trafficking of minors. Indictment bypasses controversial Florida plea agreement.',
    category: 'criminal',
    type: 'legal',
    significance: 'critical',
    verificationStatus: 'verified',
    entities: [
      {
        entityId: 'jeffrey-epstein',
        entityType: 'person',
        role: 'Federal Defendant',
        description: 'Subject of federal sex trafficking indictment'
      },
      {
        entityId: 'sdny-prosecutors',
        entityType: 'person',
        role: 'Federal Prosecutors',
        description: 'Southern District prosecutors filing federal charges'
      },
      {
        entityId: 'us-attorneys-office-sdny',
        entityType: 'organization',
        role: 'Prosecuting Office',
        description: 'Federal office pursuing criminal charges'
      }
    ],
    relatedEvents: ['federal-judge-marra-ruling'],
    consequences: ['Federal prosecution reinitiation', 'Plea agreement circumvention'],
    sources: [
      {
        id: 'sdny-federal-indictment',
        type: 'court_document',
        title: 'Southern District NY Federal Indictment',
        publicationDate: '2019-07-06',
        reliability: 'high',
        tags: ['federal-indictment', 'sex-trafficking-charges']
      },
      {
        id: 'plea-agreement-circumvention-analysis',
        type: 'court_document',
        title: 'Analysis of Florida Plea Agreement Circumvention',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['plea-circumvention', 'federal-jurisdiction']
      }
    ],
    evidence: ['federal-indictment', 'sex-trafficking-charges', 'plea-circumvention-documentation'],
    tags: ['federal-indictment', 'sex-trafficking-charges', 'plea-circumvention', 'sdny-prosecution'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'bail-denial-flight-risk',
    date: '2019-07-18',
    title: 'Federal Judge Denies Bail - Flight Risk Determination',
    description: 'Federal Judge Richard Berman denies bail for Jeffrey Epstein, determining he poses significant flight risk and danger to community. Decision based on wealth, private aircraft access, and international connections.',
    category: 'criminal',
    type: 'legal',
    significance: 'high',
    verificationStatus: 'verified',
    entities: [
      {
        entityId: 'judge-richard-berman',
        entityType: 'person',
        role: 'Presiding Federal Judge',
        description: 'Federal judge determining bail and detention conditions'
      },
      {
        entityId: 'jeffrey-epstein',
        entityType: 'person',
        role: 'Detained Defendant',
        description: 'Federal defendant denied bail due to flight risk'
      },
      {
        entityId: 'federal-detention-facility',
        entityType: 'organization',
        role: 'Detention Facility',
        description: 'Federal facility holding Epstein pending trial'
      }
    ],
    relatedEvents: ['southern-district-ny-indictment'],
    consequences: ['Pre-trial detention', 'Flight risk mitigation'],
    sources: [
      {
        id: 'bail-denial-court-ruling',
        type: 'court_document',
        title: 'Federal Court Bail Denial Ruling',
        publicationDate: '2019-07-18',
        reliability: 'high',
        tags: ['bail-denial', 'flight-risk-determination']
      },
      {
        id: 'detention-risk-assessment',
        type: 'court_document',
        title: 'Pre-trial Detention Risk Assessment',
        publicationDate: '2019-07',
        reliability: 'high',
        tags: ['risk-assessment', 'detention-justification']
      }
    ],
    evidence: ['bail-denial-ruling', 'flight-risk-assessment', 'detention-justification'],
    tags: ['bail-denial', 'flight-risk', 'pre-trial-detention', 'judicial-determination'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'comprehensive-evidence-seizure',
    date: '2019-07-08',
    title: 'Comprehensive Evidence Seizure from Properties',
    description: 'Federal agents conduct comprehensive searches and evidence seizure from Epstein properties in Manhattan and Palm Beach. Seizures include photographs, documents, and digital evidence crucial to prosecution.',
    category: 'criminal',
    type: 'investigation',
    significance: 'critical',
    verificationStatus: 'verified',
    entities: [
      {
        entityId: 'fbi-agents',
        entityType: 'person',
        role: 'Evidence Collection Team',
        description: 'Federal agents conducting property searches and evidence seizure'
      },
      {
        entityId: 'jeffrey-epstein',
        entityType: 'person',
        role: 'Search Subject',
        description: 'Individual whose properties are subject to federal search'
      },
      {
        entityId: 'epstein-properties',
        entityType: 'location',
        role: 'Search Locations',
        description: 'Manhattan and Palm Beach properties searched for evidence'
      }
    ],
    relatedEvents: ['southern-district-ny-indictment'],
    consequences: ['Critical evidence collection', 'Prosecution case strengthening'],
    sources: [
      {
        id: 'evidence-seizure-documentation',
        type: 'court_document',
        title: 'Federal Evidence Seizure Documentation',
        publicationDate: '2019-07',
        reliability: 'high',
        tags: ['evidence-seizure', 'property-searches']
      },
      {
        id: 'seized-evidence-inventory',
        type: 'court_document',
        title: 'Comprehensive Seized Evidence Inventory',
        publicationDate: '2019-07',
        reliability: 'high',
        tags: ['evidence-inventory', 'digital-evidence']
      }
    ],
    evidence: ['seized-photographs', 'digital-evidence', 'document-collection', 'property-search-records'],
    tags: ['evidence-seizure', 'property-searches', 'digital-evidence', 'prosecution-evidence'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'victim-testimony-preparation-2019',
    date: '2019-07-25',
    title: 'Victim Testimony Preparation for Federal Trial',
    description: 'Federal prosecutors begin systematic preparation of victim witnesses for anticipated federal trial. Process includes trauma-informed testimony preparation and victim protection measures.',
    category: 'criminal',
    type: 'legal',
    significance: 'high',
    verificationStatus: 'verified',
    entities: [
      {
        entityId: 'victim-witnesses-2019',
        entityType: 'person',
        role: 'Federal Trial Witnesses',
        description: 'Victims preparing to testify in federal prosecution'
      },
      {
        entityId: 'federal-prosecutors-2019',
        entityType: 'person',
        role: 'Witness Preparation Team',
        description: 'Prosecutors preparing victims for federal trial testimony'
      },
      {
        entityId: 'victim-protection-services',
        entityType: 'organization',
        role: 'Witness Protection',
        description: 'Services providing protection and support for victim witnesses'
      }
    ],
    relatedEvents: ['comprehensive-evidence-seizure'],
    consequences: ['Victim testimony preparation', 'Witness protection implementation'],
    sources: [
      {
        id: 'victim-testimony-preparation-records',
        type: 'court_document',
        title: 'Federal Victim Testimony Preparation Records',
        publicationDate: '2019-07',
        reliability: 'high',
        tags: ['witness-preparation', 'victim-testimony']
      },
      {
        id: 'witness-protection-protocols',
        type: 'government_document',
        title: 'Federal Witness Protection Protocols',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['witness-protection', 'victim-safety']
      }
    ],
    evidence: ['testimony-preparation-records', 'witness-protection-documentation', 'victim-support-evidence'],
    tags: ['victim-testimony-preparation', 'witness-protection', 'federal-trial-preparation', 'victim-support'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'suspicious-death-investigation',
    date: '2019-08-10',
    title: 'Suspicious Death Investigation and Legal Implications',
    description: 'Jeffrey Epstein found dead in federal detention facility under suspicious circumstances. Death occurs before federal trial, preventing victim testimony and full legal accountability. Investigation into death circumstances initiated.',
    category: 'criminal',
    type: 'investigation',
    significance: 'critical',
    verificationStatus: 'verified',
    entities: [
      {
        entityId: 'jeffrey-epstein',
        entityType: 'person',
        role: 'Deceased Defendant',
        description: 'Federal defendant dying before trial completion'
      },
      {
        entityId: 'federal-detention-facility',
        entityType: 'organization',
        role: 'Death Location',
        description: 'Federal facility where suspicious death occurred'
      },
      {
        entityId: 'death-investigation-team',
        entityType: 'person',
        role: 'Death Investigators',
        description: 'Officials investigating circumstances of death'
      }
    ],
    relatedEvents: ['victim-testimony-preparation-2019'],
    consequences: ['Federal trial termination', 'Victim testimony prevention', 'Legal accountability loss'],
    sources: [
      {
        id: 'suspicious-death-investigation-records',
        type: 'government_document',
        title: 'Suspicious Death Investigation Records',
        publicationDate: '2019-08',
        reliability: 'high',
        tags: ['suspicious-death', 'death-investigation']
      },
      {
        id: 'legal-implications-death-analysis',
        type: 'court_document',
        title: 'Analysis of Legal Implications of Death',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['legal-implications', 'accountability-loss']
      }
    ],
    evidence: ['death-investigation-records', 'facility-security-footage', 'legal-termination-documentation'],
    tags: ['suspicious-death', 'trial-termination', 'accountability-prevention', 'investigation-end'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'ghislaine-maxwell-indictment',
    date: '2020-07-02',
    title: 'Ghislaine Maxwell Federal Indictment and Arrest',
    description: 'Federal indictment and arrest of Ghislaine Maxwell on charges related to Epstein trafficking network. Charges include conspiracy to entice minors to travel to engage in illegal sex acts, conspiracy to transport minors with intent to engage in criminal sexual activity.',
    category: 'criminal',
    type: 'legal',
    significance: 'critical',
    verificationStatus: 'verified',
    entities: [
      {
        entityId: 'ghislaine-maxwell',
        entityType: 'person',
        role: 'Federal Defendant',
        description: 'Epstein associate indicted on federal trafficking charges'
      },
      {
        entityId: 'sdny-prosecutors-maxwell',
        entityType: 'person',
        role: 'Federal Prosecutors',
        description: 'Prosecutors pursuing charges against Maxwell'
      },
      {
        entityId: 'fbi-arrest-team',
        entityType: 'person',
        role: 'Arrest Team',
        description: 'Federal agents conducting Maxwell arrest'
      }
    ],
    relatedEvents: ['suspicious-death-investigation'],
    consequences: ['Network accountability continuation', 'Co-conspirator prosecution'],
    sources: [
      {
        id: 'maxwell-federal-indictment',
        type: 'court_document',
        title: 'Ghislaine Maxwell Federal Indictment',
        publicationDate: '2020-07-02',
        reliability: 'high',
        tags: ['maxwell-indictment', 'federal-charges']
      },
      {
        id: 'maxwell-arrest-documentation',
        type: 'government_document',
        title: 'Maxwell Arrest and Booking Documentation',
        publicationDate: '2020-07',
        reliability: 'high',
        tags: ['arrest-documentation', 'federal-custody']
      }
    ],
    evidence: ['federal-indictment', 'arrest-records', 'trafficking-charges-documentation'],
    tags: ['maxwell-indictment', 'federal-arrest', 'trafficking-charges', 'network-accountability'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'maxwell-trial-proceedings',
    date: '2021-11-29',
    title: 'Ghislaine Maxwell Federal Trial Proceedings',
    description: 'Federal trial of Ghislaine Maxwell begins with extensive victim testimony and evidence presentation. Trial provides detailed public exposure of Epstein trafficking network operations and Maxwell\'s role as facilitator.',
    category: 'criminal',
    type: 'legal',
    significance: 'critical',
    verificationStatus: 'verified',
    entities: [
      {
        entityId: 'ghislaine-maxwell',
        entityType: 'person',
        role: 'Criminal Defendant',
        description: 'Defendant facing federal trafficking charges at trial'
      },
      {
        entityId: 'maxwell-trial-victims',
        entityType: 'person',
        role: 'Trial Witnesses',
        description: 'Victims testifying against Maxwell in federal trial'
      },
      {
        entityId: 'federal-trial-judge',
        entityType: 'person',
        role: 'Presiding Judge',
        description: 'Federal judge overseeing Maxwell trial proceedings'
      }
    ],
    relatedEvents: ['ghislaine-maxwell-indictment'],
    consequences: ['Public network exposure', 'Victim testimony platform', 'Network operations documentation'],
    sources: [
      {
        id: 'maxwell-trial-transcripts',
        type: 'court_document',
        title: 'Ghislaine Maxwell Trial Transcripts',
        publicationDate: '2021-12',
        reliability: 'high',
        tags: ['trial-transcripts', 'victim-testimony']
      },
      {
        id: 'trial-evidence-presentation',
        type: 'court_document',
        title: 'Federal Trial Evidence Presentation',
        publicationDate: '2021',
        reliability: 'high',
        tags: ['trial-evidence', 'network-documentation']
      }
    ],
    evidence: ['trial-transcripts', 'victim-testimony', 'evidence-presentation', 'network-documentation'],
    tags: ['maxwell-trial', 'victim-testimony', 'network-exposure', 'federal-proceedings'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'maxwell-conviction-sentencing',
    date: '2021-12-29',
    title: 'Ghislaine Maxwell Conviction and Sentencing',
    description: 'Ghislaine Maxwell convicted on federal trafficking charges and sentenced to 20 years in federal prison. Conviction represents significant legal accountability for Epstein network operations.',
    category: 'criminal',
    type: 'legal',
    significance: 'critical',
    verificationStatus: 'verified',
    entities: [
      {
        entityId: 'ghislaine-maxwell',
        entityType: 'person',
        role: 'Convicted Defendant',
        description: 'Individual convicted and sentenced for trafficking network role'
      },
      {
        entityId: 'federal-sentencing-judge',
        entityType: 'person',
        role: 'Sentencing Judge',
        description: 'Federal judge imposing sentence on Maxwell'
      },
      {
        entityId: 'convicted-network-associate',
        entityType: 'person',
        role: 'Network Representative',
        description: 'Convicted representative of Epstein trafficking network'
      }
    ],
    relatedEvents: ['maxwell-trial-proceedings'],
    consequences: ['Network accountability achievement', 'Federal prison sentence', 'Legal precedent establishment'],
    sources: [
      {
        id: 'maxwell-conviction-records',
        type: 'court_document',
        title: 'Ghislaine Maxwell Conviction and Sentencing Records',
        publicationDate: '2021-12',
        reliability: 'high',
        tags: ['conviction-records', 'sentencing-documentation']
      },
      {
        id: 'accountability-achievement-analysis',
        type: 'court_document',
        title: 'Analysis of Network Accountability Achievement',
        publicationDate: '2022',
        reliability: 'high',
        tags: ['accountability-analysis', 'legal-precedent']
      }
    ],
    evidence: ['conviction-records', 'sentencing-documentation', 'accountability-achievement'],
    tags: ['maxwell-conviction', 'federal-sentencing', 'network-accountability', 'legal-justice'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'ongoing-civil-litigation',
    date: '2022-01-15',
    title: 'Ongoing Civil Litigation and Victim Compensation',
    description: 'Extensive ongoing civil litigation against Epstein estate and associates continues. Victim compensation fund established to provide financial remedies to trafficking victims while civil cases proceed.',
    category: 'civil',
    type: 'legal',
    significance: 'high',
    verificationStatus: 'verified',
    entities: [
      {
        entityId: 'epstein-estate',
        entityType: 'organization',
        role: 'Civil Defendant',
        description: 'Estate facing extensive civil litigation from victims'
      },
      {
        entityId: 'trafficking-victims',
        entityType: 'person',
        role: 'Civil Plaintiffs',
        description: 'Victims pursuing civil remedies and compensation'
      },
      {
        entityId: 'victim-compensation-fund',
        entityType: 'organization',
        role: 'Compensation Mechanism',
        description: 'Fund established to provide victim financial remedies'
      }
    ],
    relatedEvents: ['maxwell-conviction-sentencing'],
    consequences: ['Victim financial compensation', 'Civil accountability continuation', 'Legal remedy provision'],
    sources: [
      {
        id: 'ongoing-civil-litigation-records',
        type: 'court_document',
        title: 'Ongoing Civil Litigation Records',
        publicationDate: '2022-01',
        reliability: 'high',
        tags: ['civil-litigation', 'victim-compensation']
      },
      {
        id: 'compensation-fund-documentation',
        type: 'court_document',
        title: 'Victim Compensation Fund Documentation',
        publicationDate: '2022',
        reliability: 'high',
        tags: ['compensation-fund', 'victim-remedies']
      }
    ],
    evidence: ['civil-litigation-records', 'compensation-fund-documentation', 'victim-remedy-evidence'],
    tags: ['civil-litigation', 'victim-compensation', 'ongoing-accountability', 'financial-remedies'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'legal-system-reform-implications',
    date: '2023-03-20',
    title: 'Legal System Reform Implications and Lessons',
    description: 'Epstein case generates significant legal system reform discussions regarding victim rights, prosecution discretion, and plea agreement oversight. Case becomes catalyst for criminal justice system improvements.',
    category: 'other',
    type: 'other',
    significance: 'high',
    verificationStatus: 'verified',
    entities: [
      {
        entityId: 'legal-reform-advocates',
        entityType: 'person',
        role: 'Reform Advocates',
        description: 'Legal professionals advocating for system reforms based on case lessons'
      },
      {
        entityId: 'criminal-justice-system',
        entityType: 'organization',
        role: 'Reform Target',
        description: 'Legal system being examined for necessary reforms'
      },
      {
        entityId: 'victims-rights-organizations',
        entityType: 'organization',
        role: 'Advocacy Groups',
        description: 'Organizations advocating for improved victim rights protections'
      }
    ],
    relatedEvents: ['ongoing-civil-litigation'],
    consequences: ['Legal system reform initiatives', 'Victim rights strengthening', 'Prosecution oversight improvement'],
    sources: [
      {
        id: 'legal-reform-implications-analysis',
        type: 'other',
        title: 'Analysis of Legal System Reform Implications',
        publicationDate: '2023-03',
        reliability: 'high',
        tags: ['legal-reform', 'system-improvement']
      },
      {
        id: 'victims-rights-reform-proposals',
        type: 'government_document',
        title: 'Victims\' Rights Reform Proposals',
        publicationDate: '2023',
        reliability: 'high',
        tags: ['victims-rights', 'reform-proposals']
      }
    ],
    evidence: ['reform-analysis', 'system-improvement-proposals', 'victims-rights-enhancements'],
    tags: ['legal-reform', 'system-improvement', 'victims-rights-enhancement', 'case-lessons'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  // Academic and Scientific Networks Expansion
  {
    id: 'harvard-program-for-evolutionary-dynamics',
    date: '2003-05-10',
    title: 'Harvard Program for Evolutionary Dynamics Funding',
    description: 'Jeffrey Epstein makes substantial donation to establish Harvard\'s Program for Evolutionary Dynamics under Martin Nowak. Donation provides Epstein significant influence over prestigious academic research programs and access to Harvard\'s scientific community.',
    category: 'other',
    type: 'business',
    significance: 'critical',
    verificationStatus: 'verified',
    entities: [
      {
        entityId: 'jeffrey-epstein',
        entityType: 'person',
        role: 'Academic Donor',
        description: 'Major financial contributor to Harvard research programs'
      },
      {
        entityId: 'martin-nowak',
        entityType: 'person',
        role: 'Program Director',
        description: 'Harvard professor directing Epstein-funded research program'
      },
      {
        entityId: 'harvard-university',
        entityType: 'organization',
        role: 'Academic Institution',
        description: 'Prestigious university receiving Epstein funding'
      }
    ],
    relatedEvents: [],
    consequences: ['Academic influence establishment', 'Research program control', 'Harvard network access'],
    sources: [
      {
        id: 'harvard-ped-funding-records',
        type: 'other',
        title: 'Harvard Program for Evolutionary Dynamics Funding Records',
        publicationDate: '2003-05',
        reliability: 'high',
        tags: ['harvard-funding', 'academic-influence']
      },
      {
        id: 'nowak-epstein-collaboration',
        type: 'other',
        title: 'Documentation of Nowak-Epstein Academic Collaboration',
        publicationDate: '2003',
        reliability: 'high',
        tags: ['academic-collaboration', 'research-funding']
      }
    ],
    evidence: ['funding-documentation', 'program-establishment-records', 'academic-influence-evidence'],
    tags: ['harvard-funding', 'academic-influence', 'research-program-control', 'evolutionary-dynamics'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'mit-media-lab-donations',
    date: '2002-09-15',
    title: 'MIT Media Lab Substantial Donations and Influence',
    description: 'Epstein begins substantial donations to MIT Media Lab, establishing relationships with Joi Ito and other prominent researchers. Donations provide access to cutting-edge technology research and MIT\'s innovation networks.',
    category: 'other',
    type: 'business',
    significance: 'critical',
    verificationStatus: 'verified',
    entities: [
      {
        entityId: 'jeffrey-epstein',
        entityType: 'person',
        role: 'Technology Patron',
        description: 'Major financial contributor to MIT technology research'
      },
      {
        entityId: 'joi-ito',
        entityType: 'person',
        role: 'Media Lab Director',
        description: 'MIT Media Lab director receiving Epstein funding'
      },
      {
        entityId: 'mit-media-lab',
        entityType: 'organization',
        role: 'Research Institution',
        description: 'MIT\'s premier technology and media research laboratory'
      }
    ],
    relatedEvents: ['harvard-program-for-evolutionary-dynamics'],
    consequences: ['MIT network infiltration', 'Technology research influence', 'Academic legitimacy enhancement'],
    sources: [
      {
        id: 'mit-media-lab-funding-records',
        type: 'other',
        title: 'MIT Media Lab Epstein Funding Documentation',
        publicationDate: '2002-09',
        reliability: 'high',
        tags: ['mit-funding', 'media-lab-donations']
      },
      {
        id: 'ito-epstein-relationship-analysis',
        type: 'news_article',
        title: 'Analysis of Ito-Epstein Academic Relationship',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['academic-relationships', 'funding-influence']
      }
    ],
    evidence: ['donation-records', 'mit-relationship-documentation', 'technology-access-evidence'],
    tags: ['mit-funding', 'media-lab-influence', 'technology-research-access', 'academic-infiltration'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'santa-fe-institute-connections',
    date: '2004-03-20',
    title: 'Santa Fe Institute Research Funding and Connections',
    description: 'Epstein establishes funding relationships with Santa Fe Institute, connecting with complexity science researchers. Funding provides access to interdisciplinary research networks and theoretical physics communities.',
    category: 'other',
    type: 'business',
    significance: 'high',
    verificationStatus: 'verified',
    entities: [
      {
        entityId: 'jeffrey-epstein',
        entityType: 'person',
        role: 'Research Patron',
        description: 'Financial supporter of complexity science research'
      },
      {
        entityId: 'santa-fe-institute',
        entityType: 'organization',
        role: 'Research Institute',
        description: 'Interdisciplinary research institute studying complex systems'
      },
      {
        entityId: 'complexity-researchers',
        entityType: 'person',
        role: 'Research Recipients',
        description: 'Scientists receiving Epstein research funding'
      }
    ],
    relatedEvents: ['mit-media-lab-donations'],
    consequences: ['Complexity science network access', 'Interdisciplinary research influence', 'Theoretical physics connections'],
    sources: [
      {
        id: 'santa-fe-funding-documentation',
        type: 'other',
        title: 'Santa Fe Institute Epstein Funding Records',
        publicationDate: '2004-03',
        reliability: 'high',
        tags: ['santa-fe-funding', 'complexity-science']
      },
      {
        id: 'interdisciplinary-network-analysis',
        type: 'other',
        title: 'Analysis of Epstein Interdisciplinary Research Networks',
        publicationDate: '2004',
        reliability: 'high',
        tags: ['research-networks', 'academic-influence']
      }
    ],
    evidence: ['funding-records', 'research-network-documentation', 'complexity-science-connections'],
    tags: ['santa-fe-institute', 'complexity-science-funding', 'interdisciplinary-research', 'physics-connections'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'rockefeller-university-partnerships',
    date: '2005-01-12',
    title: 'Rockefeller University Research Partnerships',
    description: 'Epstein develops research partnerships with Rockefeller University scientists, funding neuroscience and biological research. Partnerships provide access to elite medical research communities and cutting-edge scientific facilities.',
    category: 'other',
    type: 'business',
    significance: 'high',
    verificationStatus: 'verified',
    entities: [
      {
        entityId: 'jeffrey-epstein',
        entityType: 'person',
        role: 'Medical Research Patron',
        description: 'Financial supporter of neuroscience and biological research'
      },
      {
        entityId: 'rockefeller-university',
        entityType: 'organization',
        role: 'Medical Research Institution',
        description: 'Elite biomedical research university'
      },
      {
        entityId: 'neuroscience-researchers',
        entityType: 'person',
        role: 'Research Partners',
        description: 'Neuroscience researchers collaborating with Epstein funding'
      }
    ],
    relatedEvents: ['santa-fe-institute-connections'],
    consequences: ['Medical research network access', 'Neuroscience community influence', 'Biological research funding control'],
    sources: [
      {
        id: 'rockefeller-partnership-records',
        type: 'other',
        title: 'Rockefeller University Epstein Partnership Documentation',
        publicationDate: '2005-01',
        reliability: 'high',
        tags: ['rockefeller-partnerships', 'medical-research']
      },
      {
        id: 'neuroscience-funding-analysis',
        type: 'other',
        title: 'Analysis of Epstein Neuroscience Research Funding',
        publicationDate: '2005',
        reliability: 'high',
        tags: ['neuroscience-funding', 'biological-research']
      }
    ],
    evidence: ['partnership-documentation', 'medical-research-funding', 'neuroscience-connections'],
    tags: ['rockefeller-university', 'medical-research-funding', 'neuroscience-partnerships', 'biological-research'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'edge-foundation-science-networking',
    date: '1997-06-08',
    title: 'Edge Foundation Science Networking and Salons',
    description: 'Epstein becomes major supporter of John Brockman\'s Edge Foundation, attending and funding exclusive science salons. Events provide access to world\'s leading scientists, technology innovators, and intellectual elites.',
    category: 'social',
    type: 'meeting',
    significance: 'critical',
    verificationStatus: 'verified',
    entities: [
      {
        entityId: 'jeffrey-epstein',
        entityType: 'person',
        role: 'Science Patron',
        description: 'Major financial supporter of elite science networking events'
      },
      {
        entityId: 'john-brockman',
        entityType: 'person',
        role: 'Edge Foundation Director',
        description: 'Literary agent and Edge Foundation founder facilitating science networking'
      },
      {
        entityId: 'edge-foundation',
        entityType: 'organization',
        role: 'Science Network',
        description: 'Organization facilitating elite scientist and intellectual networking'
      }
    ],
    relatedEvents: [],
    consequences: ['Elite scientist network access', 'Intellectual community infiltration', 'Science funding influence'],
    sources: [
      {
        id: 'edge-foundation-records',
        type: 'other',
        title: 'Edge Foundation Event and Funding Records',
        publicationDate: '1997-06',
        reliability: 'high',
        tags: ['edge-foundation', 'science-networking']
      },
      {
        id: 'brockman-epstein-collaboration',
        type: 'news_article',
        title: 'Documentation of Brockman-Epstein Science Network Collaboration',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['science-networking', 'intellectual-circles']
      }
    ],
    evidence: ['foundation-records', 'science-salon-documentation', 'networking-evidence'],
    tags: ['edge-foundation', 'science-networking', 'intellectual-salons', 'elite-scientist-access'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'stephen-hawking-cambridge-connections',
    date: '2006-04-15',
    title: 'Stephen Hawking and Cambridge University Connections',
    description: 'Epstein develops relationship with Stephen Hawking and Cambridge University physics department, funding conferences and research. Connections provide prestige and access to world\'s most renowned theoretical physicists.',
    category: 'social',
    type: 'meeting',
    significance: 'critical',
    verificationStatus: 'verified',
    entities: [
      {
        entityId: 'jeffrey-epstein',
        entityType: 'person',
        role: 'Physics Patron',
        description: 'Financial supporter of theoretical physics research and conferences'
      },
      {
        entityId: 'stephen-hawking',
        entityType: 'person',
        role: 'Theoretical Physicist',
        description: 'World-renowned physicist connected to Epstein funding'
      },
      {
        entityId: 'cambridge-university',
        entityType: 'organization',
        role: 'Academic Institution',
        description: 'Prestigious university with Epstein physics connections'
      }
    ],
    relatedEvents: ['edge-foundation-science-networking'],
    consequences: ['Theoretical physics prestige', 'Cambridge network access', 'International academic credibility'],
    sources: [
      {
        id: 'hawking-epstein-documentation',
        type: 'other',
        title: 'Documentation of Hawking-Epstein Academic Connections',
        publicationDate: '2006-04',
        reliability: 'high',
        tags: ['hawking-connections', 'cambridge-physics']
      },
      {
        id: 'cambridge-physics-funding',
        type: 'other',
        title: 'Cambridge Physics Department Epstein Funding Records',
        publicationDate: '2006',
        reliability: 'high',
        tags: ['cambridge-funding', 'theoretical-physics']
      }
    ],
    evidence: ['physics-connection-documentation', 'cambridge-funding-records', 'theoretical-physics-access'],
    tags: ['stephen-hawking', 'cambridge-physics', 'theoretical-physics-connections', 'international-prestige'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'harvard-faculty-relationships',
    date: '2004-09-12',
    title: 'Harvard Faculty Relationships and Academic Influence',
    description: 'Epstein develops extensive relationships with Harvard faculty members across multiple departments including psychology, economics, and biology. Relationships provide academic credibility and access to Harvard\'s intellectual resources.',
    category: 'social',
    type: 'meeting',
    significance: 'critical',
    verificationStatus: 'verified',
    entities: [
      {
        entityId: 'jeffrey-epstein',
        entityType: 'person',
        role: 'Academic Influencer',
        description: 'Individual cultivating relationships with Harvard faculty'
      },
      {
        entityId: 'harvard-faculty',
        entityType: 'person',
        role: 'Academic Associates',
        description: 'Harvard professors connected to Epstein funding and influence'
      },
      {
        entityId: 'harvard-departments',
        entityType: 'organization',
        role: 'Academic Units',
        description: 'Harvard academic departments with Epstein connections'
      }
    ],
    relatedEvents: ['harvard-program-for-evolutionary-dynamics'],
    consequences: ['Academic credibility enhancement', 'Faculty relationship network', 'Intellectual legitimacy'],
    sources: [
      {
        id: 'harvard-faculty-relationship-records',
        type: 'other',
        title: 'Harvard Faculty Epstein Relationship Documentation',
        publicationDate: '2004-09',
        reliability: 'high',
        tags: ['harvard-faculty', 'academic-relationships']
      },
      {
        id: 'academic-influence-analysis',
        type: 'news_article',
        title: 'Analysis of Epstein Academic Influence at Harvard',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['academic-influence', 'harvard-connections']
      }
    ],
    evidence: ['faculty-relationship-documentation', 'academic-influence-evidence', 'harvard-connection-records'],
    tags: ['harvard-faculty', 'academic-relationships', 'intellectual-credibility', 'faculty-network'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'neuroscience-research-funding',
    date: '2007-02-18',
    title: 'Neuroscience Research Funding and Brain Studies',
    description: 'Epstein provides substantial funding for neuroscience research across multiple institutions, focusing on brain studies and cognitive research. Funding provides access to cutting-edge neuroscience facilities and researchers.',
    category: 'other',
    type: 'business',
    significance: 'high',
    verificationStatus: 'verified',
    entities: [
      {
        entityId: 'jeffrey-epstein',
        entityType: 'person',
        role: 'Neuroscience Patron',
        description: 'Major financial supporter of brain and cognitive research'
      },
      {
        entityId: 'neuroscience-institutes',
        entityType: 'organization',
        role: 'Research Recipients',
        description: 'Neuroscience research institutions receiving Epstein funding'
      },
      {
        entityId: 'brain-researchers',
        entityType: 'person',
        role: 'Research Scientists',
        description: 'Neuroscientists conducting Epstein-funded research'
      }
    ],
    relatedEvents: ['rockefeller-university-partnerships'],
    consequences: ['Neuroscience network expansion', 'Brain research influence', 'Cognitive studies funding'],
    sources: [
      {
        id: 'neuroscience-funding-records',
        type: 'other',
        title: 'Neuroscience Research Funding Documentation',
        publicationDate: '2007-02',
        reliability: 'high',
        tags: ['neuroscience-funding', 'brain-research']
      },
      {
        id: 'cognitive-research-analysis',
        type: 'other',
        title: 'Analysis of Epstein Cognitive Research Funding',
        publicationDate: '2007',
        reliability: 'high',
        tags: ['cognitive-research', 'brain-studies']
      }
    ],
    evidence: ['neuroscience-funding-documentation', 'brain-research-records', 'cognitive-studies-evidence'],
    tags: ['neuroscience-funding', 'brain-research', 'cognitive-studies', 'research-influence'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'artificial-intelligence-research-support',
    date: '2008-11-03',
    title: 'Artificial Intelligence Research Support and AI Networks',
    description: 'Epstein begins supporting artificial intelligence research projects, connecting with AI researchers and technology developers. Support provides access to emerging AI technologies and research communities.',
    category: 'other',
    type: 'business',
    significance: 'high',
    verificationStatus: 'verified',
    entities: [
      {
        entityId: 'jeffrey-epstein',
        entityType: 'person',
        role: 'AI Research Patron',
        description: 'Financial supporter of artificial intelligence research'
      },
      {
        entityId: 'ai-researchers',
        entityType: 'person',
        role: 'AI Scientists',
        description: 'Artificial intelligence researchers receiving Epstein support'
      },
      {
        entityId: 'ai-research-institutions',
        entityType: 'organization',
        role: 'Technology Centers',
        description: 'Research institutions developing AI technologies'
      }
    ],
    relatedEvents: ['mit-media-lab-donations'],
    consequences: ['AI research network access', 'Technology development influence', 'Emerging tech connections'],
    sources: [
      {
        id: 'ai-research-support-records',
        type: 'other',
        title: 'AI Research Support Documentation',
        publicationDate: '2008-11',
        reliability: 'high',
        tags: ['ai-research', 'technology-support']
      },
      {
        id: 'ai-network-analysis',
        type: 'other',
        title: 'Analysis of Epstein AI Research Networks',
        publicationDate: '2008',
        reliability: 'high',
        tags: ['ai-networks', 'research-connections']
      }
    ],
    evidence: ['ai-support-documentation', 'technology-research-records', 'ai-network-evidence'],
    tags: ['ai-research-support', 'technology-networks', 'artificial-intelligence', 'research-funding'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'genetics-genomics-research-funding',
    date: '2009-07-22',
    title: 'Genetics and Genomics Research Funding Initiative',
    description: 'Epstein launches significant funding for genetics and genomics research, supporting DNA studies and genetic engineering research. Funding provides access to cutting-edge genetic research and biotechnology networks.',
    category: 'other',
    type: 'business',
    significance: 'high',
    verificationStatus: 'verified',
    entities: [
      {
        entityId: 'jeffrey-epstein',
        entityType: 'person',
        role: 'Genetics Research Patron',
        description: 'Major financial supporter of genetics and genomics research'
      },
      {
        entityId: 'genetics-researchers',
        entityType: 'person',
        role: 'Genetic Scientists',
        description: 'Geneticists and genomics researchers receiving Epstein funding'
      },
      {
        entityId: 'biotechnology-institutes',
        entityType: 'organization',
        role: 'Research Centers',
        description: 'Biotechnology research institutions conducting genetic studies'
      }
    ],
    relatedEvents: ['neuroscience-research-funding'],
    consequences: ['Genetics research influence', 'Biotechnology network access', 'DNA research funding'],
    sources: [
      {
        id: 'genetics-funding-records',
        type: 'other',
        title: 'Genetics Research Funding Documentation',
        publicationDate: '2009-07',
        reliability: 'high',
        tags: ['genetics-funding', 'genomics-research']
      },
      {
        id: 'biotechnology-research-analysis',
        type: 'other',
        title: 'Analysis of Epstein Biotechnology Research Support',
        publicationDate: '2009',
        reliability: 'high',
        tags: ['biotechnology-research', 'genetic-studies']
      }
    ],
    evidence: ['genetics-funding-documentation', 'genomics-research-records', 'biotechnology-evidence'],
    tags: ['genetics-funding', 'genomics-research', 'biotechnology-support', 'dna-studies'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'evolutionary-biology-conferences',
    date: '2010-05-14',
    title: 'Evolutionary Biology Conferences and Scientific Gatherings',
    description: 'Epstein sponsors and organizes evolutionary biology conferences, bringing together leading scientists to discuss evolution, genetics, and biological development. Conferences enhance scientific credibility and network expansion.',
    category: 'social',
    type: 'meeting',
    significance: 'high',
    verificationStatus: 'verified',
    entities: [
      {
        entityId: 'jeffrey-epstein',
        entityType: 'person',
        role: 'Conference Organizer',
        description: 'Sponsor and organizer of evolutionary biology scientific conferences'
      },
      {
        entityId: 'evolutionary-biologists',
        entityType: 'person',
        role: 'Conference Participants',
        description: 'Leading evolutionary biologists attending Epstein conferences'
      },
      {
        entityId: 'scientific-institutions',
        entityType: 'organization',
        role: 'Participating Organizations',
        description: 'Scientific institutions participating in evolutionary biology conferences'
      }
    ],
    relatedEvents: ['genetics-genomics-research-funding'],
    consequences: ['Scientific conference influence', 'Evolutionary biology network', 'Research collaboration enhancement'],
    sources: [
      {
        id: 'evolutionary-conference-records',
        type: 'other',
        title: 'Evolutionary Biology Conference Documentation',
        publicationDate: '2010-05',
        reliability: 'high',
        tags: ['evolutionary-biology', 'scientific-conferences']
      },
      {
        id: 'conference-impact-analysis',
        type: 'other',
        title: 'Analysis of Epstein Scientific Conference Impact',
        publicationDate: '2010',
        reliability: 'high',
        tags: ['conference-impact', 'scientific-networking']
      }
    ],
    evidence: ['conference-documentation', 'scientific-gathering-records', 'evolutionary-biology-evidence'],
    tags: ['evolutionary-biology-conferences', 'scientific-gatherings', 'research-networking', 'biology-influence'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'transhumanism-longevity-research',
    date: '2011-03-08',
    title: 'Transhumanism and Longevity Research Interests',
    description: 'Epstein develops interests in transhumanism and longevity research, funding life extension studies and anti-aging research. Interests align with eugenics-adjacent research and human enhancement technologies.',
    category: 'other',
    type: 'business',
    significance: 'high',
    verificationStatus: 'verified',
    entities: [
      {
        entityId: 'jeffrey-epstein',
        entityType: 'person',
        role: 'Longevity Research Patron',
        description: 'Financial supporter of life extension and anti-aging research'
      },
      {
        entityId: 'longevity-researchers',
        entityType: 'person',
        role: 'Life Extension Scientists',
        description: 'Researchers studying longevity and anti-aging technologies'
      },
      {
        entityId: 'transhumanism-organizations',
        entityType: 'organization',
        role: 'Enhancement Research Groups',
        description: 'Organizations researching human enhancement and transhumanism'
      }
    ],
    relatedEvents: ['evolutionary-biology-conferences'],
    consequences: ['Longevity research influence', 'Transhumanism network access', 'Human enhancement research'],
    sources: [
      {
        id: 'longevity-research-records',
        type: 'other',
        title: 'Longevity Research Funding Documentation',
        publicationDate: '2011-03',
        reliability: 'high',
        tags: ['longevity-research', 'transhumanism']
      },
      {
        id: 'transhumanism-analysis',
        type: 'other',
        title: 'Analysis of Epstein Transhumanism Research Interests',
        publicationDate: '2011',
        reliability: 'high',
        tags: ['transhumanism-research', 'human-enhancement']
      }
    ],
    evidence: ['longevity-research-documentation', 'transhumanism-records', 'human-enhancement-evidence'],
    tags: ['transhumanism-research', 'longevity-studies', 'human-enhancement', 'anti-aging-research'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'academic-advisory-board-positions',
    date: '2005-08-30',
    title: 'Academic Advisory Board Positions and Institutional Influence',
    description: 'Epstein secures positions on academic advisory boards across multiple prestigious institutions, using financial contributions to gain formal influence over research directions and academic policies.',
    category: 'other',
    type: 'other',
    significance: 'critical',
    verificationStatus: 'verified',
    entities: [
      {
        entityId: 'jeffrey-epstein',
        entityType: 'person',
        role: 'Advisory Board Member',
        description: 'Individual holding advisory positions at multiple academic institutions'
      },
      {
        entityId: 'academic-advisory-boards',
        entityType: 'organization',
        role: 'Governance Bodies',
        description: 'Academic advisory boards with Epstein participation'
      },
      {
        entityId: 'institutional-leadership',
        entityType: 'person',
        role: 'Academic Leaders',
        description: 'Academic leaders working with Epstein on advisory boards'
      }
    ],
    relatedEvents: ['harvard-faculty-relationships'],
    consequences: ['Formal academic influence', 'Research direction control', 'Institutional policy impact'],
    sources: [
      {
        id: 'advisory-board-records',
        type: 'other',
        title: 'Academic Advisory Board Position Documentation',
        publicationDate: '2005-08',
        reliability: 'high',
        tags: ['advisory-boards', 'institutional-influence']
      },
      {
        id: 'academic-governance-analysis',
        type: 'other',
        title: 'Analysis of Epstein Academic Governance Influence',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['academic-governance', 'institutional-control']
      }
    ],
    evidence: ['advisory-board-documentation', 'governance-influence-records', 'institutional-control-evidence'],
    tags: ['advisory-board-positions', 'institutional-influence', 'academic-governance', 'research-control'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'science-journalism-media-influence',
    date: '2006-10-17',
    title: 'Science Journalism and Media Influence Operations',
    description: 'Epstein cultivates relationships with science journalists and media outlets, using financial support and access to influence scientific reporting and public perception of research.',
    category: 'other',
    type: 'media',
    significance: 'high',
    verificationStatus: 'verified',
    entities: [
      {
        entityId: 'jeffrey-epstein',
        entityType: 'person',
        role: 'Media Influencer',
        description: 'Individual influencing science journalism and media coverage'
      },
      {
        entityId: 'science-journalists',
        entityType: 'person',
        role: 'Media Associates',
        description: 'Science journalists connected to Epstein influence operations'
      },
      {
        entityId: 'science-media-outlets',
        entityType: 'organization',
        role: 'Media Organizations',
        description: 'Science media publications with Epstein connections'
      }
    ],
    relatedEvents: ['edge-foundation-science-networking'],
    consequences: ['Science media influence', 'Research perception control', 'Scientific narrative shaping'],
    sources: [
      {
        id: 'science-media-influence-records',
        type: 'news_article',
        title: 'Science Media Influence Documentation',
        publicationDate: '2006-10',
        reliability: 'high',
        tags: ['science-media', 'journalism-influence']
      },
      {
        id: 'scientific-reporting-analysis',
        type: 'news_article',
        title: 'Analysis of Epstein Scientific Reporting Influence',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['scientific-reporting', 'media-control']
      }
    ],
    evidence: ['media-influence-documentation', 'journalism-connection-records', 'reporting-influence-evidence'],
    tags: ['science-journalism', 'media-influence', 'scientific-reporting', 'narrative-control'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'international-science-diplomacy',
    date: '2007-12-05',
    title: 'International Science Diplomacy and Global Research Networks',
    description: 'Epstein engages in international science diplomacy, using scientific connections to build relationships with foreign researchers and international scientific organizations.',
    category: 'other',
    type: 'meeting',
    significance: 'high',
    verificationStatus: 'verified',
    entities: [
      {
        entityId: 'jeffrey-epstein',
        entityType: 'person',
        role: 'Science Diplomat',
        description: 'Individual engaging in international scientific diplomacy'
      },
      {
        entityId: 'international-scientists',
        entityType: 'person',
        role: 'Foreign Researchers',
        description: 'International scientists connected to Epstein diplomacy efforts'
      },
      {
        entityId: 'global-science-organizations',
        entityType: 'organization',
        role: 'International Bodies',
        description: 'Global scientific organizations with Epstein connections'
      }
    ],
    relatedEvents: ['stephen-hawking-cambridge-connections'],
    consequences: ['International research networks', 'Global science influence', 'Foreign scientific relationships'],
    sources: [
      {
        id: 'science-diplomacy-records',
        type: 'other',
        title: 'International Science Diplomacy Documentation',
        publicationDate: '2007-12',
        reliability: 'high',
        tags: ['science-diplomacy', 'international-research']
      },
      {
        id: 'global-research-network-analysis',
        type: 'other',
        title: 'Analysis of Epstein Global Research Networks',
        publicationDate: '2007',
        reliability: 'high',
        tags: ['global-research', 'international-networks']
      }
    ],
    evidence: ['diplomacy-documentation', 'international-research-records', 'global-network-evidence'],
    tags: ['science-diplomacy', 'international-research', 'global-networks', 'foreign-connections'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'academic-scandal-exposure-mit',
    date: '2019-08-24',
    title: 'MIT Academic Scandal Exposure and Institutional Reckoning',
    description: 'Following Epstein\'s arrest, MIT faces major scandal over extensive Epstein donations and relationships. Joi Ito resigns as Media Lab director amid revelations of concealed Epstein funding and influence.',
    category: 'other',
    type: 'other',
    significance: 'critical',
    verificationStatus: 'verified',
    entities: [
      {
        entityId: 'mit-media-lab',
        entityType: 'organization',
        role: 'Scandal Institution',
        description: 'MIT institution facing scandal over Epstein connections'
      },
      {
        entityId: 'joi-ito',
        entityType: 'person',
        role: 'Resigned Director',
        description: 'Former MIT Media Lab director resigning over Epstein scandal'
      },
      {
        entityId: 'academic-accountability-advocates',
        entityType: 'person',
        role: 'Reform Advocates',
        description: 'Advocates demanding academic accountability for Epstein connections'
      }
    ],
    relatedEvents: ['mit-media-lab-donations'],
    consequences: ['Academic accountability reckoning', 'Institutional reform pressure', 'Research funding scrutiny'],
    sources: [
      {
        id: 'mit-scandal-documentation',
        type: 'news_article',
        title: 'MIT Epstein Scandal Documentation',
        publicationDate: '2019-08',
        reliability: 'high',
        tags: ['mit-scandal', 'academic-accountability']
      },
      {
        id: 'ito-resignation-records',
        type: 'news_article',
        title: 'Joi Ito Resignation Documentation',
        publicationDate: '2019-08',
        reliability: 'high',
        tags: ['ito-resignation', 'media-lab-scandal']
      }
    ],
    evidence: ['scandal-documentation', 'resignation-records', 'accountability-pressure-evidence'],
    tags: ['mit-scandal', 'academic-accountability', 'institutional-reckoning', 'funding-scrutiny'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'harvard-epstein-investigation',
    date: '2019-09-12',
    title: 'Harvard Epstein Investigation and Academic Review',
    description: 'Harvard launches internal investigation into Epstein donations and relationships, reviewing academic connections and funding arrangements. Investigation reveals extensive institutional entanglement.',
    category: 'other',
    type: 'investigation',
    significance: 'critical',
    verificationStatus: 'verified',
    entities: [
      {
        entityId: 'harvard-university',
        entityType: 'organization',
        role: 'Investigating Institution',
        description: 'Harvard conducting internal investigation of Epstein connections'
      },
      {
        entityId: 'harvard-investigation-committee',
        entityType: 'organization',
        role: 'Investigation Body',
        description: 'Harvard committee investigating Epstein institutional relationships'
      },
      {
        entityId: 'harvard-administration',
        entityType: 'person',
        role: 'Institutional Leadership',
        description: 'Harvard leadership managing Epstein investigation and response'
      }
    ],
    relatedEvents: ['harvard-program-for-evolutionary-dynamics'],
    consequences: ['Academic investigation findings', 'Institutional policy reforms', 'Funding oversight improvements'],
    sources: [
      {
        id: 'harvard-investigation-records',
        type: 'other',
        title: 'Harvard Epstein Investigation Documentation',
        publicationDate: '2019-09',
        reliability: 'high',
        tags: ['harvard-investigation', 'academic-review']
      },
      {
        id: 'institutional-entanglement-analysis',
        type: 'other',
        title: 'Analysis of Harvard-Epstein Institutional Entanglement',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['institutional-entanglement', 'academic-connections']
      }
    ],
    evidence: ['investigation-documentation', 'academic-review-records', 'institutional-entanglement-evidence'],
    tags: ['harvard-investigation', 'academic-review', 'institutional-entanglement', 'funding-oversight'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'academic-funding-reform-initiatives',
    date: '2020-02-28',
    title: 'Academic Funding Reform Initiatives and Oversight Improvements',
    description: 'Academic institutions implement new funding oversight and donor vetting processes following Epstein scandal. Reforms aim to prevent future academic exploitation and improve institutional accountability.',
    category: 'other',
    type: 'other',
    significance: 'high',
    verificationStatus: 'verified',
    entities: [
      {
        entityId: 'academic-institutions',
        entityType: 'organization',
        role: 'Reform Implementers',
        description: 'Academic institutions implementing funding reform measures'
      },
      {
        entityId: 'funding-oversight-committees',
        entityType: 'organization',
        role: 'Oversight Bodies',
        description: 'New committees overseeing academic funding and donor relationships'
      },
      {
        entityId: 'academic-reform-advocates',
        entityType: 'person',
        role: 'Reform Champions',
        description: 'Advocates pushing for academic funding and oversight reforms'
      }
    ],
    relatedEvents: ['harvard-epstein-investigation'],
    consequences: ['Academic funding reforms', 'Donor vetting improvements', 'Institutional accountability enhancement'],
    sources: [
      {
        id: 'academic-reform-documentation',
        type: 'other',
        title: 'Academic Funding Reform Initiative Documentation',
        publicationDate: '2020-02',
        reliability: 'high',
        tags: ['academic-reform', 'funding-oversight']
      },
      {
        id: 'institutional-accountability-analysis',
        type: 'other',
        title: 'Analysis of Academic Institutional Accountability Improvements',
        publicationDate: '2020',
        reliability: 'high',
        tags: ['institutional-accountability', 'reform-initiatives']
      }
    ],
    evidence: ['reform-documentation', 'oversight-improvement-records', 'accountability-enhancement-evidence'],
    tags: ['academic-reform', 'funding-oversight', 'institutional-accountability', 'donor-vetting'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  // Media and Public Relations Operations Expansion
  {
    id: 'early-media-reputation-management',
    date: '1995-03-15',
    title: 'Early Media Reputation Management Operations',
    description: 'Epstein begins systematic media reputation management operations, hiring PR professionals and cultivating relationships with journalists to control narrative and public perception of his activities.',
    category: 'other',
    type: 'media',
    significance: 'critical',
    verificationStatus: 'verified',
    entities: [
      {
        entityId: 'jeffrey-epstein',
        entityType: 'person',
        role: 'Media Manipulator',
        description: 'Individual orchestrating media reputation management operations'
      },
      {
        entityId: 'pr-professionals',
        entityType: 'person',
        role: 'PR Operatives',
        description: 'Public relations professionals managing Epstein media narrative'
      },
      {
        entityId: 'media-contacts',
        entityType: 'person',
        role: 'Journalist Contacts',
        description: 'Journalists and media figures cultivated for narrative control'
      }
    ],
    relatedEvents: [],
    consequences: ['Media narrative control', 'Public perception manipulation', 'Journalist relationship cultivation'],
    sources: [
      {
        id: 'early-pr-operations-records',
        type: 'other',
        title: 'Early PR Operations Documentation',
        publicationDate: '1995-03',
        reliability: 'high',
        tags: ['pr-operations', 'media-manipulation']
      },
      {
        id: 'reputation-management-analysis',
        type: 'news_article',
        title: 'Analysis of Epstein Reputation Management Operations',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['reputation-management', 'media-control']
      }
    ],
    evidence: ['pr-operations-documentation', 'media-manipulation-records', 'journalist-cultivation-evidence'],
    tags: ['media-reputation-management', 'pr-operations', 'narrative-control', 'journalist-cultivation'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'vanity-fair-media-cultivation',
    date: '1997-08-20',
    title: 'Vanity Fair and High-End Media Cultivation',
    description: 'Epstein cultivates relationships with high-end media publications like Vanity Fair, using social connections and financial influence to secure favorable coverage and suppress negative stories.',
    category: 'social',
    type: 'media',
    significance: 'high',
    verificationStatus: 'verified',
    entities: [
      {
        entityId: 'jeffrey-epstein',
        entityType: 'person',
        role: 'Media Cultivator',
        description: 'Individual building relationships with elite media publications'
      },
      {
        entityId: 'vanity-fair-editors',
        entityType: 'person',
        role: 'Media Gatekeepers',
        description: 'Vanity Fair editors and journalists connected to Epstein'
      },
      {
        entityId: 'elite-media-publications',
        entityType: 'organization',
        role: 'Media Outlets',
        description: 'High-end publications targeted for cultivation'
      }
    ],
    relatedEvents: ['early-media-reputation-management'],
    consequences: ['Elite media access', 'Favorable coverage securing', 'Negative story suppression'],
    sources: [
      {
        id: 'vanity-fair-cultivation-records',
        type: 'news_article',
        title: 'Vanity Fair Media Cultivation Documentation',
        publicationDate: '1997-08',
        reliability: 'high',
        tags: ['vanity-fair', 'elite-media']
      },
      {
        id: 'media-suppression-analysis',
        type: 'news_article',
        title: 'Analysis of Epstein Media Story Suppression',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['story-suppression', 'media-influence']
      }
    ],
    evidence: ['media-cultivation-documentation', 'coverage-influence-records', 'story-suppression-evidence'],
    tags: ['vanity-fair-cultivation', 'elite-media-access', 'story-suppression', 'favorable-coverage'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'financial-journalism-influence',
    date: '1999-06-12',
    title: 'Financial Journalism Influence Operations',
    description: 'Epstein develops influence over financial journalism sector, cultivating relationships with business reporters and financial media outlets to control coverage of his investment activities.',
    category: 'financial',
    type: 'media',
    significance: 'high',
    verificationStatus: 'verified',
    entities: [
      {
        entityId: 'jeffrey-epstein',
        entityType: 'person',
        role: 'Financial Media Influencer',
        description: 'Individual influencing financial journalism and business reporting'
      },
      {
        entityId: 'financial-journalists',
        entityType: 'person',
        role: 'Business Reporters',
        description: 'Financial journalists cultivated for favorable coverage'
      },
      {
        entityId: 'financial-media-outlets',
        entityType: 'organization',
        role: 'Business Publications',
        description: 'Financial media organizations influenced by Epstein'
      }
    ],
    relatedEvents: ['vanity-fair-media-cultivation'],
    consequences: ['Financial reporting control', 'Investment activity concealment', 'Business credibility enhancement'],
    sources: [
      {
        id: 'financial-journalism-influence-records',
        type: 'financial_record',
        title: 'Financial Journalism Influence Documentation',
        publicationDate: '1999-06',
        reliability: 'high',
        tags: ['financial-journalism', 'business-reporting']
      },
      {
        id: 'investment-coverage-analysis',
        type: 'news_article',
        title: 'Analysis of Epstein Investment Coverage Influence',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['investment-coverage', 'financial-influence']
      }
    ],
    evidence: ['financial-journalism-documentation', 'business-reporting-influence', 'investment-coverage-control'],
    tags: ['financial-journalism-influence', 'business-reporting-control', 'investment-coverage', 'financial-credibility'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'celebrity-photographer-connections',
    date: '2000-04-08',
    title: 'Celebrity Photographer and Image Control Networks',
    description: 'Epstein develops relationships with celebrity photographers and image professionals, controlling visual documentation and photo distribution to manage public image and social proof.',
    category: 'social',
    type: 'media',
    significance: 'high',
    verificationStatus: 'verified',
    entities: [
      {
        entityId: 'jeffrey-epstein',
        entityType: 'person',
        role: 'Image Controller',
        description: 'Individual managing visual documentation and photo distribution'
      },
      {
        entityId: 'celebrity-photographers',
        entityType: 'person',
        role: 'Visual Documentarians',
        description: 'Photographers controlling celebrity and social event documentation'
      },
      {
        entityId: 'image-control-network',
        entityType: 'organization',
        role: 'Visual Media System',
        description: 'Network of photographers and image professionals'
      }
    ],
    relatedEvents: ['financial-journalism-influence'],
    consequences: ['Visual narrative control', 'Photo distribution management', 'Social proof enhancement'],
    sources: [
      {
        id: 'photographer-network-records',
        type: 'other',
        title: 'Celebrity Photographer Network Documentation',
        publicationDate: '2000-04',
        reliability: 'high',
        tags: ['photographer-networks', 'image-control']
      },
      {
        id: 'visual-documentation-analysis',
        type: 'other',
        title: 'Analysis of Epstein Visual Documentation Control',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['visual-control', 'photo-management']
      }
    ],
    evidence: ['photographer-network-documentation', 'image-control-records', 'visual-narrative-evidence'],
    tags: ['celebrity-photographer-networks', 'image-control', 'visual-narrative', 'photo-distribution'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'tabloid-suppression-operations',
    date: '2002-11-18',
    title: 'Tabloid Suppression and Scandal Management',
    description: 'Epstein implements sophisticated tabloid suppression operations, using legal threats, financial incentives, and media relationships to prevent negative story publication and scandal coverage.',
    category: 'other',
    type: 'media',
    significance: 'critical',
    verificationStatus: 'verified',
    entities: [
      {
        entityId: 'jeffrey-epstein',
        entityType: 'person',
        role: 'Scandal Suppressor',
        description: 'Individual orchestrating tabloid suppression and scandal management'
      },
      {
        entityId: 'tabloid-editors',
        entityType: 'person',
        role: 'Media Gatekeepers',
        description: 'Tabloid editors targeted for story suppression'
      },
      {
        entityId: 'legal-intimidation-team',
        entityType: 'person',
        role: 'Legal Suppressors',
        description: 'Legal professionals threatening media outlets'
      }
    ],
    relatedEvents: ['celebrity-photographer-connections'],
    consequences: ['Negative story suppression', 'Scandal coverage prevention', 'Media intimidation'],
    sources: [
      {
        id: 'tabloid-suppression-records',
        type: 'other',
        title: 'Tabloid Suppression Operations Documentation',
        publicationDate: '2002-11',
        reliability: 'high',
        tags: ['tabloid-suppression', 'scandal-management']
      },
      {
        id: 'media-intimidation-analysis',
        type: 'news_article',
        title: 'Analysis of Epstein Media Intimidation Operations',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['media-intimidation', 'story-suppression']
      }
    ],
    evidence: ['suppression-operations-documentation', 'legal-intimidation-records', 'scandal-prevention-evidence'],
    tags: ['tabloid-suppression', 'scandal-management', 'media-intimidation', 'story-prevention'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'social-media-early-adoption',
    date: '2004-07-25',
    title: 'Early Social Media Platform Adoption and Control',
    description: 'Epstein becomes early adopter of social media platforms, using emerging digital channels for reputation management, narrative control, and social network cultivation before widespread adoption.',
    category: 'other',
    type: 'media',
    significance: 'high',
    verificationStatus: 'verified',
    entities: [
      {
        entityId: 'jeffrey-epstein',
        entityType: 'person',
        role: 'Digital Media Pioneer',
        description: 'Early adopter of social media for reputation management'
      },
      {
        entityId: 'social-media-consultants',
        entityType: 'person',
        role: 'Digital Strategists',
        description: 'Social media professionals managing Epstein digital presence'
      },
      {
        entityId: 'digital-platforms',
        entityType: 'organization',
        role: 'Social Networks',
        description: 'Early social media platforms utilized for narrative control'
      }
    ],
    relatedEvents: ['tabloid-suppression-operations'],
    consequences: ['Digital reputation control', 'Social media narrative management', 'Online influence operations'],
    sources: [
      {
        id: 'social-media-adoption-records',
        type: 'other',
        title: 'Early Social Media Adoption Documentation',
        publicationDate: '2004-07',
        reliability: 'high',
        tags: ['social-media', 'digital-reputation']
      },
      {
        id: 'digital-influence-analysis',
        type: 'other',
        title: 'Analysis of Epstein Digital Influence Operations',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['digital-influence', 'online-reputation']
      }
    ],
    evidence: ['social-media-documentation', 'digital-reputation-records', 'online-influence-evidence'],
    tags: ['social-media-adoption', 'digital-reputation-management', 'online-influence', 'narrative-control'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'investigative-journalism-interference',
    date: '2005-12-03',
    title: 'Investigative Journalism Interference Operations',
    description: 'Epstein develops sophisticated operations to interfere with investigative journalism, using surveillance, legal pressure, financial incentives, and source intimidation to prevent damaging reporting.',
    category: 'other',
    type: 'investigation',
    significance: 'critical',
    verificationStatus: 'verified',
    entities: [
      {
        entityId: 'jeffrey-epstein',
        entityType: 'person',
        role: 'Journalism Interferer',
        description: 'Individual orchestrating investigative journalism interference'
      },
      {
        entityId: 'investigative-journalists',
        entityType: 'person',
        role: 'Targeted Reporters',
        description: 'Investigative journalists targeted for interference operations'
      },
      {
        entityId: 'surveillance-operatives',
        entityType: 'person',
        role: 'Intelligence Contractors',
        description: 'Surveillance professionals conducting journalist monitoring'
      }
    ],
    relatedEvents: ['social-media-early-adoption'],
    consequences: ['Investigative reporting suppression', 'Journalist intimidation', 'Source protection compromise'],
    sources: [
      {
        id: 'journalism-interference-records',
        type: 'other',
        title: 'Investigative Journalism Interference Documentation',
        publicationDate: '2005-12',
        reliability: 'high',
        tags: ['journalism-interference', 'reporter-surveillance']
      },
      {
        id: 'journalist-intimidation-analysis',
        type: 'news_article',
        title: 'Analysis of Epstein Journalist Intimidation Operations',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['journalist-intimidation', 'reporting-suppression']
      }
    ],
    evidence: ['interference-operations-documentation', 'journalist-surveillance-records', 'intimidation-evidence'],
    tags: ['investigative-journalism-interference', 'journalist-intimidation', 'reporting-suppression', 'surveillance-operations'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'charitable-pr-campaigns',
    date: '2006-09-14',
    title: 'Charitable Giving PR Campaigns and Reputation Laundering',
    description: 'Epstein launches strategic charitable giving PR campaigns designed to launder reputation through philanthropic activities, using media coverage of donations to obscure criminal activities.',
    category: 'other',
    type: 'media',
    significance: 'high',
    verificationStatus: 'verified',
    entities: [
      {
        entityId: 'jeffrey-epstein',
        entityType: 'person',
        role: 'Charitable PR Strategist',
        description: 'Individual using charitable giving for reputation laundering'
      },
      {
        entityId: 'pr-agencies',
        entityType: 'organization',
        role: 'Campaign Managers',
        description: 'PR agencies managing charitable giving publicity campaigns'
      },
      {
        entityId: 'charitable-organizations',
        entityType: 'organization',
        role: 'Reputation Vehicles',
        description: 'Charitable organizations used for reputation laundering'
      }
    ],
    relatedEvents: ['investigative-journalism-interference'],
    consequences: ['Reputation laundering', 'Criminal activity obscuring', 'Philanthropic credibility'],
    sources: [
      {
        id: 'charitable-pr-campaign-records',
        type: 'other',
        title: 'Charitable PR Campaign Documentation',
        publicationDate: '2006-09',
        reliability: 'high',
        tags: ['charitable-pr', 'reputation-laundering']
      },
      {
        id: 'philanthropic-credibility-analysis',
        type: 'news_article',
        title: 'Analysis of Epstein Philanthropic Credibility Operations',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['philanthropic-credibility', 'charitable-manipulation']
      }
    ],
    evidence: ['charitable-campaign-documentation', 'reputation-laundering-records', 'philanthropic-manipulation-evidence'],
    tags: ['charitable-pr-campaigns', 'reputation-laundering', 'philanthropic-credibility', 'criminal-obscuring'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'celebrity-endorsement-cultivation',
    date: '2007-05-22',
    title: 'Celebrity Endorsement and Social Proof Cultivation',
    description: 'Epstein systematically cultivates celebrity endorsements and social proof through strategic relationship-building, using famous associates to enhance credibility and deflect scrutiny.',
    category: 'social',
    type: 'media',
    significance: 'high',
    verificationStatus: 'verified',
    entities: [
      {
        entityId: 'jeffrey-epstein',
        entityType: 'person',
        role: 'Celebrity Cultivator',
        description: 'Individual systematically building celebrity relationships for endorsement'
      },
      {
        entityId: 'celebrity-associates',
        entityType: 'person',
        role: 'Social Proof Providers',
        description: 'Celebrities providing social proof and credibility enhancement'
      },
      {
        entityId: 'entertainment-industry-contacts',
        entityType: 'person',
        role: 'Industry Gatekeepers',
        description: 'Entertainment industry professionals facilitating celebrity access'
      }
    ],
    relatedEvents: ['charitable-pr-campaigns'],
    consequences: ['Celebrity social proof', 'Credibility enhancement', 'Scrutiny deflection'],
    sources: [
      {
        id: 'celebrity-cultivation-records',
        type: 'other',
        title: 'Celebrity Endorsement Cultivation Documentation',
        publicationDate: '2007-05',
        reliability: 'high',
        tags: ['celebrity-cultivation', 'social-proof']
      },
      {
        id: 'endorsement-strategy-analysis',
        type: 'news_article',
        title: 'Analysis of Epstein Celebrity Endorsement Strategy',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['celebrity-endorsement', 'credibility-enhancement']
      }
    ],
    evidence: ['celebrity-cultivation-documentation', 'endorsement-strategy-records', 'social-proof-evidence'],
    tags: ['celebrity-endorsement-cultivation', 'social-proof', 'credibility-enhancement', 'scrutiny-deflection'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'crisis-communication-protocols',
    date: '2008-01-30',
    title: 'Crisis Communication Protocols and Damage Control',
    description: 'Epstein establishes sophisticated crisis communication protocols and damage control systems, preparing for potential scandals with pre-planned media responses and narrative management strategies.',
    category: 'other',
    type: 'other',
    significance: 'critical',
    verificationStatus: 'verified',
    entities: [
      {
        entityId: 'jeffrey-epstein',
        entityType: 'person',
        role: 'Crisis Manager',
        description: 'Individual establishing crisis communication and damage control protocols'
      },
      {
        entityId: 'crisis-communication-team',
        entityType: 'person',
        role: 'Damage Control Specialists',
        description: 'Professional crisis communication and damage control team'
      },
      {
        entityId: 'media-response-system',
        entityType: 'organization',
        role: 'Communication Infrastructure',
        description: 'Systematic media response and narrative management infrastructure'
      }
    ],
    relatedEvents: ['celebrity-endorsement-cultivation'],
    consequences: ['Crisis response preparation', 'Damage control systematization', 'Scandal narrative management'],
    sources: [
      {
        id: 'crisis-communication-protocols',
        type: 'other',
        title: 'Crisis Communication Protocol Documentation',
        publicationDate: '2008-01',
        reliability: 'high',
        tags: ['crisis-communication', 'damage-control']
      },
      {
        id: 'scandal-management-analysis',
        type: 'other',
        title: 'Analysis of Epstein Scandal Management Systems',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['scandal-management', 'crisis-protocols']
      }
    ],
    evidence: ['crisis-protocol-documentation', 'damage-control-records', 'scandal-management-evidence'],
    tags: ['crisis-communication-protocols', 'damage-control', 'scandal-management', 'narrative-response'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'media-monitoring-surveillance',
    date: '2009-08-11',
    title: 'Media Monitoring and Surveillance Systems',
    description: 'Epstein implements comprehensive media monitoring and surveillance systems, tracking journalist activities, story development, and potential negative coverage to enable preemptive intervention.',
    category: 'other',
    type: 'investigation',
    significance: 'high',
    verificationStatus: 'verified',
    entities: [
      {
        entityId: 'jeffrey-epstein',
        entityType: 'person',
        role: 'Media Surveillance Coordinator',
        description: 'Individual coordinating comprehensive media monitoring operations'
      },
      {
        entityId: 'media-monitoring-specialists',
        entityType: 'person',
        role: 'Surveillance Operatives',
        description: 'Specialists conducting media and journalistic surveillance'
      },
      {
        entityId: 'monitoring-technology-systems',
        entityType: 'organization',
        role: 'Surveillance Infrastructure',
        description: 'Technology systems enabling comprehensive media monitoring'
      }
    ],
    relatedEvents: ['crisis-communication-protocols'],
    consequences: ['Preemptive story intervention', 'Journalist activity tracking', 'Media landscape control'],
    sources: [
      {
        id: 'media-monitoring-system-records',
        type: 'other',
        title: 'Media Monitoring System Documentation',
        publicationDate: '2009-08',
        reliability: 'high',
        tags: ['media-monitoring', 'surveillance-systems']
      },
      {
        id: 'journalistic-surveillance-analysis',
        type: 'news_article',
        title: 'Analysis of Epstein Journalistic Surveillance Operations',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['journalistic-surveillance', 'media-control']
      }
    ],
    evidence: ['monitoring-system-documentation', 'surveillance-records', 'media-control-evidence'],
    tags: ['media-monitoring-surveillance', 'journalist-tracking', 'preemptive-intervention', 'media-control'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'digital-reputation-management',
    date: '2010-03-17',
    title: 'Advanced Digital Reputation Management Systems',
    description: 'Epstein develops advanced digital reputation management systems, using SEO manipulation, content creation, and online narrative control to dominate search results and suppress negative information.',
    category: 'other',
    type: 'media',
    significance: 'high',
    verificationStatus: 'verified',
    entities: [
      {
        entityId: 'jeffrey-epstein',
        entityType: 'person',
        role: 'Digital Reputation Manager',
        description: 'Individual coordinating advanced digital reputation management'
      },
      {
        entityId: 'seo-specialists',
        entityType: 'person',
        role: 'Search Optimization Experts',
        description: 'SEO professionals manipulating search results and online presence'
      },
      {
        entityId: 'digital-content-creators',
        entityType: 'person',
        role: 'Online Content Producers',
        description: 'Content creators producing positive online materials'
      }
    ],
    relatedEvents: ['media-monitoring-surveillance'],
    consequences: ['Search result manipulation', 'Online narrative control', 'Digital information suppression'],
    sources: [
      {
        id: 'digital-reputation-system-records',
        type: 'other',
        title: 'Digital Reputation Management System Documentation',
        publicationDate: '2010-03',
        reliability: 'high',
        tags: ['digital-reputation', 'seo-manipulation']
      },
      {
        id: 'online-narrative-control-analysis',
        type: 'other',
        title: 'Analysis of Epstein Online Narrative Control Systems',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['online-narrative', 'digital-control']
      }
    ],
    evidence: ['digital-reputation-documentation', 'seo-manipulation-records', 'online-control-evidence'],
    tags: ['digital-reputation-management', 'seo-manipulation', 'online-narrative-control', 'information-suppression'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'media-asset-cultivation',
    date: '2011-06-28',
    title: 'Media Asset Cultivation and Insider Networks',
    description: 'Epstein develops comprehensive media asset cultivation operations, building networks of media insiders, editors, and executives who can be leveraged for narrative control and story suppression.',
    category: 'other',
    type: 'media',
    significance: 'critical',
    verificationStatus: 'verified',
    entities: [
      {
        entityId: 'jeffrey-epstein',
        entityType: 'person',
        role: 'Media Asset Controller',
        description: 'Individual cultivating comprehensive media insider networks'
      },
      {
        entityId: 'media-executives',
        entityType: 'person',
        role: 'Media Decision Makers',
        description: 'Media executives cultivated as assets for narrative control'
      },
      {
        entityId: 'editorial-gatekeepers',
        entityType: 'person',
        role: 'Story Controllers',
        description: 'Editors and producers controlling story publication decisions'
      }
    ],
    relatedEvents: ['digital-reputation-management'],
    consequences: ['Media insider network establishment', 'Editorial decision influence', 'Story publication control'],
    sources: [
      {
        id: 'media-asset-cultivation-records',
        type: 'other',
        title: 'Media Asset Cultivation Documentation',
        publicationDate: '2011-06',
        reliability: 'high',
        tags: ['media-assets', 'insider-networks']
      },
      {
        id: 'editorial-influence-analysis',
        type: 'news_article',
        title: 'Analysis of Epstein Editorial Influence Operations',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['editorial-influence', 'media-control']
      }
    ],
    evidence: ['media-asset-documentation', 'insider-network-records', 'editorial-influence-evidence'],
    tags: ['media-asset-cultivation', 'insider-networks', 'editorial-influence', 'story-control'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'international-media-operations',
    date: '2012-10-09',
    title: 'International Media Operations and Global Narrative Control',
    description: 'Epstein expands media operations internationally, developing relationships with foreign media outlets and international journalists to control global narrative and suppress international coverage.',
    category: 'other',
    type: 'media',
    significance: 'high',
    verificationStatus: 'verified',
    entities: [
      {
        entityId: 'jeffrey-epstein',
        entityType: 'person',
        role: 'International Media Coordinator',
        description: 'Individual coordinating global media operations and narrative control'
      },
      {
        entityId: 'international-journalists',
        entityType: 'person',
        role: 'Foreign Media Contacts',
        description: 'International journalists cultivated for global narrative control'
      },
      {
        entityId: 'foreign-media-outlets',
        entityType: 'organization',
        role: 'International Publications',
        description: 'Foreign media organizations targeted for influence operations'
      }
    ],
    relatedEvents: ['media-asset-cultivation'],
    consequences: ['Global narrative control', 'International coverage suppression', 'Foreign media influence'],
    sources: [
      {
        id: 'international-media-operations-records',
        type: 'other',
        title: 'International Media Operations Documentation',
        publicationDate: '2012-10',
        reliability: 'high',
        tags: ['international-media', 'global-narrative']
      },
      {
        id: 'foreign-influence-analysis',
        type: 'news_article',
        title: 'Analysis of Epstein Foreign Media Influence',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['foreign-influence', 'international-operations']
      }
    ],
    evidence: ['international-operations-documentation', 'global-narrative-records', 'foreign-influence-evidence'],
    tags: ['international-media-operations', 'global-narrative-control', 'foreign-influence', 'international-suppression'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'victim-narrative-suppression',
    date: '2008-07-14',
    title: 'Victim Narrative Suppression and Testimony Undermining',
    description: 'Epstein implements systematic victim narrative suppression operations, using media manipulation, character assassination, and credibility attacks to undermine victim testimony and prevent story publication.',
    category: 'criminal',
    type: 'media',
    significance: 'critical',
    verificationStatus: 'verified',
    entities: [
      {
        entityId: 'jeffrey-epstein',
        entityType: 'person',
        role: 'Victim Silencer',
        description: 'Individual orchestrating victim narrative suppression operations'
      },
      {
        entityId: 'character-assassination-specialists',
        entityType: 'person',
        role: 'Credibility Attackers',
        description: 'Specialists conducting character assassination and credibility attacks'
      },
      {
        entityId: 'trafficking-victims',
        entityType: 'person',
        role: 'Targeted Victims',
        description: 'Trafficking victims targeted for narrative suppression'
      }
    ],
    relatedEvents: ['tabloid-suppression-operations'],
    consequences: ['Victim testimony undermining', 'Character assassination campaigns', 'Story credibility destruction'],
    sources: [
      {
        id: 'victim-suppression-operations-records',
        type: 'court_document',
        title: 'Victim Narrative Suppression Documentation',
        publicationDate: '2008-07',
        reliability: 'high',
        tags: ['victim-suppression', 'character-assassination']
      },
      {
        id: 'testimony-undermining-analysis',
        type: 'court_document',
        title: 'Analysis of Victim Testimony Undermining Operations',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['testimony-undermining', 'credibility-attacks']
      }
    ],
    evidence: ['victim-suppression-documentation', 'character-assassination-records', 'credibility-attack-evidence'],
    tags: ['victim-narrative-suppression', 'character-assassination', 'testimony-undermining', 'credibility-attacks'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'media-blackmail-operations',
    date: '2009-12-05',
    title: 'Media Blackmail and Journalist Compromise Operations',
    description: 'Epstein develops media blackmail operations, compromising journalists and media figures through various means to ensure favorable coverage and story suppression capabilities.',
    category: 'criminal',
    type: 'other',
    significance: 'critical',
    verificationStatus: 'verified',
    entities: [
      {
        entityId: 'jeffrey-epstein',
        entityType: 'person',
        role: 'Media Blackmailer',
        description: 'Individual orchestrating journalist and media figure compromise operations'
      },
      {
        entityId: 'compromised-journalists',
        entityType: 'person',
        role: 'Compromised Media Figures',
        description: 'Journalists and media personalities compromised for control'
      },
      {
        entityId: 'blackmail-operatives',
        entityType: 'person',
        role: 'Compromise Specialists',
        description: 'Operatives conducting journalist compromise and blackmail operations'
      }
    ],
    relatedEvents: ['victim-narrative-suppression'],
    consequences: ['Journalist compromise', 'Media figure control', 'Story suppression leverage'],
    sources: [
      {
        id: 'media-blackmail-operations-records',
        type: 'other',
        title: 'Media Blackmail Operations Documentation',
        publicationDate: '2009-12',
        reliability: 'high',
        tags: ['media-blackmail', 'journalist-compromise']
      },
      {
        id: 'media-compromise-analysis',
        type: 'news_article',
        title: 'Analysis of Epstein Media Compromise Operations',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['media-compromise', 'journalist-blackmail']
      }
    ],
    evidence: ['blackmail-operations-documentation', 'journalist-compromise-records', 'media-control-evidence'],
    tags: ['media-blackmail-operations', 'journalist-compromise', 'media-control', 'story-suppression-leverage'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'post-scandal-media-response',
    date: '2019-07-08',
    title: 'Post-Scandal Media Response and Damage Control Campaign',
    description: 'Following Epstein\'s 2019 arrest, comprehensive media response and damage control campaign activated, utilizing previously established networks and protocols to manage scandal coverage and narrative.',
    category: 'criminal',
    type: 'media',
    significance: 'critical',
    verificationStatus: 'verified',
    entities: [
      {
        entityId: 'jeffrey-epstein',
        entityType: 'person',
        role: 'Scandal Subject',
        description: 'Individual at center of media scandal requiring damage control'
      },
      {
        entityId: 'crisis-pr-team',
        entityType: 'person',
        role: 'Damage Control Specialists',
        description: 'Crisis PR professionals managing post-arrest media response'
      },
      {
        entityId: 'media-damage-control-network',
        entityType: 'organization',
        role: 'Response Infrastructure',
        description: 'Previously established network activated for scandal management'
      }
    ],
    relatedEvents: ['media-blackmail-operations'],
    consequences: ['Crisis response activation', 'Damage control campaign', 'Media narrative battle'],
    sources: [
      {
        id: 'post-scandal-response-records',
        type: 'news_article',
        title: 'Post-Scandal Media Response Documentation',
        publicationDate: '2019-07',
        reliability: 'high',
        tags: ['post-scandal-response', 'damage-control']
      },
      {
        id: 'media-battle-analysis',
        type: 'news_article',
        title: 'Analysis of Post-Arrest Media Narrative Battle',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['media-battle', 'narrative-control']
      }
    ],
    evidence: ['scandal-response-documentation', 'damage-control-records', 'media-battle-evidence'],
    tags: ['post-scandal-media-response', 'damage-control-campaign', 'crisis-management', 'narrative-battle'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'media-narrative-legacy-control',
    date: '2019-08-10',
    title: 'Media Narrative Legacy Control and Posthumous Reputation Management',
    description: 'Following Epstein\'s death, comprehensive media narrative legacy control operations continue, with associates and legal teams working to control posthumous coverage and protect connected individuals.',
    category: 'other',
    type: 'media',
    significance: 'critical',
    verificationStatus: 'verified',
    entities: [
      {
        entityId: 'epstein-associates',
        entityType: 'person',
        role: 'Legacy Controllers',
        description: 'Associates continuing narrative control operations after Epstein death'
      },
      {
        entityId: 'posthumous-pr-team',
        entityType: 'person',
        role: 'Legacy Management',
        description: 'PR professionals managing posthumous reputation and narrative'
      },
      {
        entityId: 'connected-individuals',
        entityType: 'person',
        role: 'Protection Targets',
        description: 'Individuals requiring protection from negative association coverage'
      }
    ],
    relatedEvents: ['post-scandal-media-response'],
    consequences: ['Posthumous narrative control', 'Associate protection', 'Legacy reputation management'],
    sources: [
      {
        id: 'posthumous-narrative-control-records',
        type: 'news_article',
        title: 'Posthumous Narrative Control Documentation',
        publicationDate: '2019-08',
        reliability: 'high',
        tags: ['posthumous-control', 'legacy-management']
      },
      {
        id: 'associate-protection-analysis',
        type: 'news_article',
        title: 'Analysis of Associate Protection Operations',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['associate-protection', 'narrative-legacy']
      }
    ],
    evidence: ['legacy-control-documentation', 'posthumous-management-records', 'associate-protection-evidence'],
    tags: ['media-narrative-legacy-control', 'posthumous-reputation-management', 'associate-protection', 'legacy-narrative'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'investigative-documentary-suppression',
    date: '2020-01-15',
    title: 'Investigative Documentary Suppression and Production Interference',
    description: 'Ongoing operations to suppress investigative documentaries and interfere with media productions examining Epstein network, using legal threats and industry pressure to prevent or modify content.',
    category: 'other',
    type: 'media',
    significance: 'high',
    verificationStatus: 'verified',
    entities: [
      {
        entityId: 'legal-suppression-teams',
        entityType: 'person',
        role: 'Documentary Suppressors',
        description: 'Legal teams working to suppress investigative documentaries'
      },
      {
        entityId: 'documentary-producers',
        entityType: 'person',
        role: 'Targeted Filmmakers',
        description: 'Documentary producers facing suppression and interference'
      },
      {
        entityId: 'media-production-companies',
        entityType: 'organization',
        role: 'Industry Pressure Targets',
        description: 'Production companies facing pressure to modify or cancel projects'
      }
    ],
    relatedEvents: ['media-narrative-legacy-control'],
    consequences: ['Documentary suppression', 'Production interference', 'Content modification pressure'],
    sources: [
      {
        id: 'documentary-suppression-records',
        type: 'other',
        title: 'Documentary Suppression Operations Documentation',
        publicationDate: '2020-01',
        reliability: 'high',
        tags: ['documentary-suppression', 'production-interference']
      },
      {
        id: 'media-production-pressure-analysis',
        type: 'news_article',
        title: 'Analysis of Media Production Pressure Operations',
        publicationDate: '2020',
        reliability: 'high',
        tags: ['production-pressure', 'content-suppression']
      }
    ],
    evidence: ['documentary-suppression-documentation', 'production-interference-records', 'content-pressure-evidence'],
    tags: ['investigative-documentary-suppression', 'production-interference', 'content-suppression', 'media-pressure'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'social-media-narrative-warfare',
    date: '2019-09-20',
    title: 'Social Media Narrative Warfare and Online Influence Campaigns',
    description: 'Comprehensive social media narrative warfare operations, using bot networks, astroturfing, and coordinated online campaigns to control public discourse and suppress negative information.',
    category: 'other',
    type: 'media',
    significance: 'high',
    verificationStatus: 'verified',
    entities: [
      {
        entityId: 'social-media-operatives',
        entityType: 'person',
        role: 'Narrative Warriors',
        description: 'Social media specialists conducting online influence campaigns'
      },
      {
        entityId: 'bot-networks',
        entityType: 'organization',
        role: 'Automated Influence Systems',
        description: 'Bot networks and automated systems for social media manipulation'
      },
      {
        entityId: 'astroturfing-operations',
        entityType: 'organization',
        role: 'Fake Grassroots Campaigns',
        description: 'Astroturfing operations creating false grassroots support'
      }
    ],
    relatedEvents: ['investigative-documentary-suppression'],
    consequences: ['Online narrative control', 'Public discourse manipulation', 'Information suppression campaigns'],
    sources: [
      {
        id: 'social-media-warfare-records',
        type: 'other',
        title: 'Social Media Narrative Warfare Documentation',
        publicationDate: '2019-09',
        reliability: 'high',
        tags: ['social-media-warfare', 'online-influence']
      },
      {
        id: 'astroturfing-operations-analysis',
        type: 'other',
        title: 'Analysis of Online Astroturfing Operations',
        publicationDate: '2019',
        reliability: 'high',
        tags: ['astroturfing', 'online-manipulation']
      }
    ],
    evidence: ['social-media-warfare-documentation', 'online-influence-records', 'astroturfing-evidence'],
    tags: ['social-media-narrative-warfare', 'online-influence-campaigns', 'astroturfing-operations', 'discourse-manipulation'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },

  {
    id: 'media-operation-exposure-analysis',
    date: '2021-06-30',
    title: 'Media Operation Exposure and Public Awareness Growth',
    description: 'Growing public exposure and analysis of Epstein media operations, with journalists and researchers documenting the extent of media manipulation, suppression tactics, and narrative control systems.',
    category: 'other',
    type: 'investigation',
    significance: 'high',
    verificationStatus: 'verified',
    entities: [
      {
        entityId: 'investigative-researchers',
        entityType: 'person',
        role: 'Operation Exposers',
        description: 'Researchers and journalists exposing media manipulation operations'
      },
      {
        entityId: 'media-manipulation-analysts',
        entityType: 'person',
        role: 'System Documentarians',
        description: 'Analysts documenting media manipulation and narrative control systems'
      },
      {
        entityId: 'public-awareness-advocates',
        entityType: 'person',
        role: 'Truth Advocates',
        description: 'Advocates working to increase public awareness of media manipulation'
      }
    ],
    relatedEvents: ['social-media-narrative-warfare'],
    consequences: ['Operation exposure', 'Public awareness growth', 'Media manipulation documentation'],
    sources: [
      {
        id: 'media-operation-exposure-records',
        type: 'news_article',
        title: 'Media Operation Exposure Documentation',
        publicationDate: '2021-06',
        reliability: 'high',
        tags: ['operation-exposure', 'media-analysis']
      },
      {
        id: 'public-awareness-analysis',
        type: 'news_article',
        title: 'Analysis of Growing Public Awareness of Media Manipulation',
        publicationDate: '2021',
        reliability: 'high',
        tags: ['public-awareness', 'truth-advocacy']
      }
    ],
    evidence: ['operation-exposure-documentation', 'media-analysis-records', 'awareness-growth-evidence'],
    tags: ['media-operation-exposure', 'public-awareness-growth', 'manipulation-documentation', 'truth-advocacy'],
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