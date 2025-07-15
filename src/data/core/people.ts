import { Person } from '@/types/investigation';

export const corePeople: Person[] = [
  {
    id: 'jeffrey-epstein',
    name: 'Jeffrey Edward Epstein',
    aliases: ['Jeff Epstein', 'J.E.'],
    dateOfBirth: '1953-01-20',
    dateOfDeath: '2019-08-10',
    nationality: ['United States'],
    occupations: [
      'Financier',
      'Convicted Sex Offender',
      'Investment Manager',
      'Philanthropist (claimed)'
    ],
    organizations: [
      'Bear Stearns',
      'J. Epstein & Co.',
      'Financial Trust Co.',
      'Epstein Foundation',
      'Gratitude America',
      'Enhanced Education'
    ],
    biography: `Jeffrey Edward Epstein was an American financier and convicted sex offender who operated an extensive network of powerful associates. Starting his career at Bear Stearns in the 1970s, Epstein later established his own investment firm, J. Epstein & Co., though the source of his wealth remained largely mysterious. He was arrested in 2006 and 2019 on charges related to sex trafficking of minors, dying in federal custody while awaiting trial.`,
    significance: 'critical',
    verificationStatus: 'verified',
    sources: [
      {
        id: 'epstein-bio-1',
        title: 'Jeffrey Epstein Biography',
        type: 'government_document',
        author: 'FBI',
        publication: 'Federal Bureau of Investigation',
        publicationDate: '2019-07-08',
        reliability: 'high',
        description: 'Official FBI biography compiled during investigation',
        tags: ['biography', 'official', 'investigation']
      },
      {
        id: 'epstein-nyt-obit',
        title: 'Jeffrey Epstein, Financier Who Faced Sex Trafficking Charges, Dies in Jail',
        type: 'news_article',
        author: 'Benjamin Weiser',
        publication: 'The New York Times',
        publicationDate: '2019-08-10',
        url: 'https://www.nytimes.com/2019/08/10/nyregion/jeffrey-epstein-death.html',
        reliability: 'high',
        description: 'Comprehensive obituary and biographical overview',
        tags: ['obituary', 'biography', 'mainstream-media']
      }
    ],
    tags: ['central-figure', 'convicted-felon', 'financier', 'deceased'],
    profileImage: '/images/people/jeffrey-epstein.jpg',
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'ghislaine-maxwell',
    name: 'Ghislaine Noelle Marion Maxwell',
    aliases: ['Ghislaine Maxwell', 'G. Maxwell'],
    dateOfBirth: '1961-12-25',
    nationality: ['United Kingdom', 'France', 'United States'],
    occupations: [
      'Socialite',
      'Convicted Sex Trafficker',
      'Former Associate of Jeffrey Epstein'
    ],
    organizations: [
      'TerraMar Project',
      'Clinton Global Initiative'
    ],
    biography: `Ghislaine Maxwell is a British socialite and daughter of media proprietor Robert Maxwell. She became closely associated with Jeffrey Epstein in the 1990s and was accused of facilitating his abuse of minor girls. In 2021, she was convicted on federal charges including sex trafficking of minors and conspiracy, and sentenced to 20 years in prison.`,
    significance: 'critical',
    verificationStatus: 'verified',
    sources: [
      {
        id: 'maxwell-conviction',
        title: 'Ghislaine Maxwell Convicted of Sex Trafficking',
        type: 'court_document',
        author: 'U.S. District Court',
        publication: 'Southern District of New York',
        publicationDate: '2021-12-29',
        reliability: 'high',
        description: 'Official court verdict and sentencing documents',
        tags: ['conviction', 'legal', 'trafficking']
      },
      {
        id: 'maxwell-guardian-profile',
        title: 'Ghislaine Maxwell: the making of a monster',
        type: 'news_article',
        author: 'Alexander Nazaryan',
        publication: 'The Guardian',
        publicationDate: '2021-07-02',
        url: 'https://www.theguardian.com/us-news/2021/jul/02/ghislaine-maxwell-jeffrey-epstein-profile',
        reliability: 'high',
        description: 'In-depth biographical profile and background analysis',
        tags: ['profile', 'background', 'analysis']
      }
    ],
    tags: ['key-accomplice', 'convicted-felon', 'socialite', 'british', 'incarcerated'],
    profileImage: '/images/people/ghislaine-maxwell.jpg',
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'virginia-giuffre',
    name: 'Virginia Louise Giuffre',
    aliases: ['Virginia Roberts', 'Virginia Roberts Giuffre'],
    dateOfBirth: '1983-08-09',
    nationality: ['United States'],
    occupations: [
      'Victim Advocate',
      'Author',
      'Survivor'
    ],
    organizations: [
      'Victims Refuse Silence'
    ],
    biography: `Virginia Giuffre is an American advocate for victims of sex trafficking. She has alleged that she was recruited by Ghislaine Maxwell and trafficked by Jeffrey Epstein when she was a minor. Her civil lawsuits and public testimony have been instrumental in bringing attention to the case and holding perpetrators accountable.`,
    significance: 'critical',
    verificationStatus: 'verified',
    sources: [
      {
        id: 'giuffre-deposition-2016',
        title: 'Virginia Giuffre Deposition',
        type: 'court_document',
        author: 'U.S. District Court',
        publication: 'Southern District of New York',
        publicationDate: '2016-05-03',
        reliability: 'high',
        description: 'Sworn deposition testimony in civil case',
        tags: ['deposition', 'testimony', 'legal']
      },
      {
        id: 'giuffre-interview-bbc',
        title: 'Virginia Giuffre: I was trafficked to Prince Andrew',
        type: 'interview',
        author: 'BBC Panorama',
        publication: 'BBC',
        publicationDate: '2019-12-02',
        url: 'https://www.bbc.com/news/uk-50633792',
        reliability: 'high',
        description: 'Televised interview detailing allegations',
        tags: ['interview', 'allegations', 'prince-andrew']
      }
    ],
    tags: ['victim', 'advocate', 'key-witness', 'survivor'],
    profileImage: '/images/people/virginia-giuffre.jpg',
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'les-wexner',
    name: 'Leslie Herbert Wexner',
    aliases: ['Les Wexner', 'L.H. Wexner'],
    dateOfBirth: '1937-09-08',
    nationality: ['United States'],
    occupations: [
      'Businessman',
      'Founder and CEO of L Brands',
      'Philanthropist'
    ],
    organizations: [
      'L Brands',
      'Victoria\'s Secret',
      'Abercrombie & Fitch',
      'The Limited',
      'Wexner Foundation',
      'Mega Group'
    ],
    biography: `Leslie Wexner is an American businessman and philanthropist, founder and former CEO of L Brands (formerly The Limited, Inc.). He had a close financial relationship with Jeffrey Epstein for over a decade, granting him extensive power of attorney over his affairs and assets. Wexner has stated he severed ties with Epstein in 2007 and was unaware of his criminal activities.`,
    significance: 'high',
    verificationStatus: 'verified',
    sources: [
      {
        id: 'wexner-statement-2019',
        title: 'Leslie Wexner Statement on Jeffrey Epstein',
        type: 'other',
        author: 'Leslie Wexner',
        publication: 'L Brands',
        publicationDate: '2019-08-07',
        reliability: 'medium',
        description: 'Official statement distancing from Epstein',
        tags: ['statement', 'response', 'distancing']
      },
      {
        id: 'wexner-wsj-profile',
        title: 'Leslie Wexner Couldn\'t Have Avoided Epstein Red Flags',
        type: 'news_article',
        author: 'Khadeeja Safdar',
        publication: 'The Wall Street Journal',
        publicationDate: '2019-07-25',
        url: 'https://www.wsj.com/articles/leslie-wexner-couldnt-have-avoided-epstein-red-flags-11564057200',
        reliability: 'high',
        description: 'Analysis of Wexner-Epstein financial relationship',
        tags: ['analysis', 'financial', 'relationship']
      }
    ],
    tags: ['financial-associate', 'businessman', 'billionaire', 'l-brands'],
    profileImage: '/images/people/les-wexner.jpg',
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'prince-andrew',
    name: 'Prince Andrew Albert Christian Edward',
    aliases: ['Prince Andrew', 'Duke of York', 'Andrew Windsor'],
    dateOfBirth: '1960-02-19',
    nationality: ['United Kingdom'],
    occupations: [
      'Member of British Royal Family',
      'Former Royal Navy Officer',
      'Former Trade Envoy'
    ],
    organizations: [
      'British Royal Family',
      'Royal Navy',
      'Pitch@Palace'
    ],
    biography: `Prince Andrew is a member of the British royal family, the third child and second son of Queen Elizabeth II. He served in the Royal Navy for 22 years and later served as the UK's Special Representative for International Trade and Investment. He has been accused by Virginia Giuffre of sexual assault when she was a minor, allegations he has denied.`,
    significance: 'high',
    verificationStatus: 'verified',
    sources: [
      {
        id: 'prince-andrew-bbc-interview',
        title: 'Prince Andrew speaks to BBC\'s Emily Maitlis',
        type: 'interview',
        author: 'Emily Maitlis',
        publication: 'BBC Newsnight',
        publicationDate: '2019-11-16',
        url: 'https://www.bbc.com/news/uk-50449339',
        reliability: 'high',
        description: 'Televised interview addressing Epstein connections',
        tags: ['interview', 'royal', 'response']
      },
      {
        id: 'prince-andrew-settlement',
        title: 'Prince Andrew settles sex abuse case with Virginia Giuffre',
        type: 'news_article',
        author: 'Various',
        publication: 'BBC News',
        publicationDate: '2022-02-15',
        url: 'https://www.bbc.com/news/uk-60402622',
        reliability: 'high',
        description: 'Report on civil case settlement',
        tags: ['settlement', 'legal', 'civil-case']
      }
    ],
    tags: ['royal', 'accused', 'settlement', 'british', 'controversial'],
    profileImage: '/images/people/prince-andrew.jpg',
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'alexander-acosta',
    name: 'René Alexander Acosta',
    aliases: ['Alex Acosta', 'Alexander Acosta'],
    dateOfBirth: '1969-01-16',
    nationality: ['United States'],
    occupations: [
      'Former U.S. Secretary of Labor',
      'Former U.S. Attorney',
      'Lawyer',
      'Academic'
    ],
    organizations: [
      'U.S. Department of Labor',
      'U.S. Attorney\'s Office (Southern District of Florida)',
      'Florida International University'
    ],
    biography: `Alexander Acosta served as the 27th U.S. Secretary of Labor under President Donald Trump. As U.S. Attorney for the Southern District of Florida (2005-2009), he negotiated the controversial non-prosecution agreement with Jeffrey Epstein in 2008 that allowed Epstein to plead guilty to state charges and serve only 13 months in county jail, despite federal prosecutors preparing charges that could have resulted in a life sentence.`,
    significance: 'high',
    verificationStatus: 'verified',
    sources: [
      {
        id: 'acosta-npa-2008',
        title: 'Non-Prosecution Agreement - Jeffrey Epstein',
        type: 'court_document',
        author: 'U.S. Attorney\'s Office SDFL',
        publication: 'Southern District of Florida',
        publicationDate: '2008-09-24',
        reliability: 'high',
        description: 'Official non-prosecution agreement document',
        tags: ['legal', 'agreement', 'controversial']
      },
      {
        id: 'acosta-resignation',
        title: 'Labor Secretary Alexander Acosta resigns amid Jeffrey Epstein case scrutiny',
        type: 'news_article',
        author: 'Kevin Breuninger',
        publication: 'CNBC',
        publicationDate: '2019-07-12',
        url: 'https://www.cnbc.com/2019/07/12/labor-secretary-alexander-acosta-resigns-amid-jeffrey-epstein-case-scrutiny.html',
        reliability: 'high',
        description: 'Report on Acosta\'s resignation amid controversy',
        tags: ['resignation', 'controversy', 'political']
      }
    ],
    tags: ['government-official', 'controversial-deal', 'former-prosecutor', 'resigned'],
    profileImage: '/images/people/alexander-acosta.jpg',
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'julie-brown',
    name: 'Julie Kay Brown',
    aliases: ['Julie K. Brown'],
    dateOfBirth: '1961-01-01', // Approximate
    nationality: ['United States'],
    occupations: [
      'Investigative Journalist',
      'Author'
    ],
    organizations: [
      'Miami Herald',
      'The Pulitzer Center'
    ],
    biography: `Julie K. Brown is an investigative journalist for the Miami Herald whose 2018 series "Perversion of Justice" brought renewed national attention to the Jeffrey Epstein case. Her reporting uncovered details about Epstein's victims, the controversial plea deal, and the broader scope of his alleged crimes. Her work was instrumental in leading to Epstein's 2019 federal indictment.`,
    significance: 'high',
    verificationStatus: 'verified',
    sources: [
      {
        id: 'brown-perversion-justice',
        title: 'How a future Trump Cabinet member gave a serial sex abuser the deal of a lifetime',
        type: 'news_article',
        author: 'Julie K. Brown',
        publication: 'Miami Herald',
        publicationDate: '2018-11-28',
        url: 'https://www.miamiherald.com/news/local/article220097825.html',
        reliability: 'high',
        description: 'Key article in the Perversion of Justice series',
        tags: ['investigation', 'journalism', 'pulitzer']
      },
      {
        id: 'brown-book-perversion',
        title: 'Perversion of Justice: The Jeffrey Epstein Story',
        type: 'book',
        author: 'Julie K. Brown',
        publication: 'Dey Street Books',
        publicationDate: '2021-06-15',
        reliability: 'high',
        description: 'Comprehensive book on the Epstein case',
        tags: ['book', 'investigation', 'comprehensive']
      }
    ],
    tags: ['journalist', 'investigator', 'pulitzer-winner', 'whistleblower'],
    profileImage: '/images/people/julie-brown.jpg',
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'whitney-webb',
    name: 'Whitney Alexandra Webb',
    aliases: ['Whitney Webb'],
    dateOfBirth: '1992-01-01', // Approximate
    nationality: ['United States'],
    occupations: [
      'Investigative Journalist',
      'Author',
      'Researcher'
    ],
    organizations: [
      'Unlimited Hangout',
      'The Last American Vagabond',
      'MintPress News'
    ],
    biography: `Whitney Webb is an independent investigative journalist and researcher who has extensively documented the Jeffrey Epstein case and its connections to intelligence agencies, organized crime, and political networks. Her work "One Nation Under Blackmail" provides comprehensive analysis of Epstein's role within broader criminal and intelligence networks spanning decades.`,
    significance: 'high',
    verificationStatus: 'verified',
    sources: [
      {
        id: 'webb-one-nation-blackmail',
        title: 'One Nation Under Blackmail: The Sordid Union Between Intelligence and Crime That Gave Rise to Jeffrey Epstein',
        type: 'book',
        author: 'Whitney Webb',
        publication: 'Trine Day',
        publicationDate: '2022-02-15',
        reliability: 'high',
        description: 'Comprehensive analysis of Epstein within broader criminal networks',
        tags: ['book', 'analysis', 'intelligence', 'networks']
      },
      {
        id: 'webb-mintpress-series',
        title: 'Government by Blackmail: Jeffrey Epstein, Trump\'s Mentor and the Dark Secret of the Reagan Era',
        type: 'news_article',
        author: 'Whitney Webb',
        publication: 'MintPress News',
        publicationDate: '2019-07-25',
        url: 'https://www.mintpressnews.com/government-by-blackmail-jeffrey-epstein-trump-mentor-and-the-dark-secret-of-the-reagan-era/260621/',
        reliability: 'high',
        description: 'Investigative series on Epstein\'s intelligence connections',
        tags: ['investigation', 'intelligence', 'blackmail', 'reagan-era']
      }
    ],
    tags: ['independent-journalist', 'researcher', 'intelligence-analysis', 'author'],
    profileImage: '/images/people/whitney-webb.jpg',
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'alan-dershowitz',
    name: 'Alan Morton Dershowitz',
    aliases: ['Alan Dershowitz'],
    dateOfBirth: '1938-09-01',
    nationality: ['United States'],
    occupations: [
      'Lawyer',
      'Professor Emeritus at Harvard Law School',
      'Author',
      'Legal Commentator'
    ],
    organizations: [
      'Harvard Law School',
      'Epstein Legal Defense Team'
    ],
    biography: `Alan Dershowitz is an American lawyer and professor emeritus at Harvard Law School. He was part of Jeffrey Epstein's legal defense team during the 2007-2008 case and has been accused by Virginia Giuffre of sexual abuse when she was a minor. Dershowitz has vehemently denied these allegations and has engaged in legal battles with his accusers.`,
    significance: 'high',
    verificationStatus: 'verified',
    sources: [
      {
        id: 'dershowitz-epstein-defense',
        title: 'The Dershowitz-Epstein Connection',
        type: 'court_document',
        author: 'Various',
        publication: 'Federal Court Records',
        publicationDate: '2008-06-30',
        reliability: 'high',
        description: 'Court records showing Dershowitz\'s role in Epstein defense',
        tags: ['legal', 'defense', 'court-records']
      },
      {
        id: 'dershowitz-denial',
        title: 'Alan Dershowitz Denies Epstein Allegations',
        type: 'news_article',
        author: 'Various',
        publication: 'Multiple outlets',
        publicationDate: '2019-07-12',
        reliability: 'medium',
        description: 'Dershowitz\'s public denials of allegations',
        tags: ['denial', 'allegations', 'response']
      }
    ],
    tags: ['lawyer', 'harvard', 'accused', 'defender', 'controversial'],
    profileImage: '/images/people/alan-dershowitz.jpg',
    lastUpdated: '2024-01-15T00:00:00Z'
  }
];

export const getPerson = (id: string): Person | undefined => {
  return corePeople.find(person => person.id === id);
};

export const getPersonsByTag = (tag: string): Person[] => {
  return corePeople.filter(person => person.tags.includes(tag));
};

export const getPersonsBySignificance = (significance: string): Person[] => {
  return corePeople.filter(person => person.significance === significance);
};

export const searchPeople = (query: string): Person[] => {
  const lowercaseQuery = query.toLowerCase();
  return corePeople.filter(person => 
    person.name.toLowerCase().includes(lowercaseQuery) ||
    person.aliases.some(alias => alias.toLowerCase().includes(lowercaseQuery)) ||
    person.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    person.biography.toLowerCase().includes(lowercaseQuery)
  );
}; 