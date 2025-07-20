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
  },
  {
    id: 'robert-maxwell',
    name: 'Ian Robert Maxwell',
    aliases: ['Robert Maxwell', 'Bob Maxwell', 'Ján Ludvík Hyman Binyamin Hoch'],
    dateOfBirth: '1923-06-10',
    dateOfDeath: '1991-11-05',
    nationality: ['United Kingdom', 'Czechoslovakia'],
    occupations: [
      'Media Proprietor',
      'Member of Parliament',
      'Publisher',
      'Businessman'
    ],
    organizations: [
      'Maxwell Communications Corporation',
      'Mirror Group Newspapers',
      'Pergamon Press',
      'Labour Party'
    ],
    biography: `Robert Maxwell was a Czechoslovak-born British media proprietor and politician. He was the father of Ghislaine Maxwell and built a media empire before his mysterious death in 1991 when he fell from his yacht. His death left his business empire in ruins and his family financially devastated, which may have influenced Ghislaine's later association with Jeffrey Epstein.`,
    significance: 'medium',
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
        description: 'Investigation into Maxwell\'s mysterious death',
        tags: ['death', 'investigation', 'media']
      },
      {
        id: 'robert-maxwell-biography',
        title: 'Maxwell: The Rise and Fall of Robert Maxwell and his Empire',
        type: 'book',
        author: 'Tom Bower',
        publication: 'HarperCollins',
        publicationDate: '1992-01-01',
        reliability: 'high',
        description: 'Comprehensive biography of Robert Maxwell',
        tags: ['biography', 'business', 'empire']
      }
    ],
    tags: ['media-mogul', 'maxwell-family', 'deceased', 'controversial', 'british'],
    profileImage: '/images/people/robert-maxwell.jpg',
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'jean-luc-brunel',
    name: 'Jean-Luc Brunel',
    aliases: ['Jean Luc Brunel'],
    dateOfBirth: '1946-12-25',
    dateOfDeath: '2022-02-19',
    nationality: ['France'],
    occupations: [
      'Modeling Agent',
      'Businessman'
    ],
    organizations: [
      'MC2 Model Management',
      'Karin Models',
      'Next Model Management'
    ],
    biography: `Jean-Luc Brunel was a French modeling agent who was closely associated with Jeffrey Epstein. He founded MC2 Model Management with Epstein's financial backing and was accused of sexual abuse and trafficking. He was found dead in his prison cell in 2022 while awaiting trial on charges of rape and sexual assault of minors.`,
    significance: 'high',
    verificationStatus: 'verified',
    sources: [
      {
        id: 'brunel-death-prison',
        title: 'Jean-Luc Brunel Found Dead in Prison Cell',
        type: 'news_article',
        author: 'Reuters',
        publication: 'Reuters',
        publicationDate: '2022-02-19',
        reliability: 'high',
        description: 'Report on Brunel\'s death in custody',
        tags: ['death', 'prison', 'suicide']
      },
      {
        id: 'brunel-mc2-connection',
        title: 'The Epstein-Brunel Modeling Connection',
        type: 'news_article',
        author: 'Vanessa Grigoriadis',
        publication: 'Vanity Fair',
        publicationDate: '2019-07-16',
        reliability: 'high',
        description: 'Investigation into Brunel\'s modeling agency and Epstein ties',
        tags: ['modeling', 'trafficking', 'investigation']
      }
    ],
    tags: ['modeling-agent', 'epstein-associate', 'deceased', 'accused', 'mc2'],
    profileImage: '/images/people/jean-luc-brunel.jpg',
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'maria-farmer',
    name: 'Maria Farmer',
    aliases: ['Maria K. Farmer'],
    dateOfBirth: '1969-01-01', // Approximate
    nationality: ['United States'],
    occupations: [
      'Artist',
      'Victim Advocate',
      'Whistleblower'
    ],
    organizations: [
      'Survivors of Jeffrey Epstein'
    ],
    biography: `Maria Farmer is an American artist who was one of the first known victims to report Jeffrey Epstein and Ghislaine Maxwell to authorities in 1996. She worked for Epstein as an artist and alleged that both Epstein and Maxwell sexually abused her and her younger sister. Her early reports to the FBI went largely ignored for years.`,
    significance: 'high',
    verificationStatus: 'verified',
    sources: [
      {
        id: 'maria-farmer-fbi-report-1996',
        title: 'Maria Farmer FBI Report 1996',
        type: 'government_document',
        author: 'FBI',
        publication: 'Federal Bureau of Investigation',
        publicationDate: '1996-07-01',
        reliability: 'high',
        description: 'Early FBI report filed by Maria Farmer',
        tags: ['fbi', 'report', 'early-victim']
      },
      {
        id: 'maria-farmer-whitney-webb-interview',
        title: 'Maria Farmer Interview',
        type: 'interview',
        author: 'Whitney Webb',
        publication: 'The Last American Vagabond',
        publicationDate: '2019-06-18',
        reliability: 'high',
        description: 'Detailed interview about Epstein experiences',
        tags: ['interview', 'victim-testimony', 'investigation']
      }
    ],
    tags: ['victim', 'artist', 'early-whistleblower', 'fbi-report', 'survivor'],
    profileImage: '/images/people/maria-farmer.jpg',
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'whitney-webb',
    name: 'Whitney Alyse Webb',
    aliases: ['Whitney Webb'],
    dateOfBirth: '1993-01-01', // Approximate
    nationality: ['United States'],
    occupations: [
      'Investigative Journalist',
      'Author',
      'Researcher'
    ],
    organizations: [
      'The Last American Vagabond',
      'Unlimited Hangout',
      'MintPress News'
    ],
    biography: `Whitney Webb is an American investigative journalist and author known for her extensive research into the Jeffrey Epstein case and intelligence connections. She authored "One Nation Under Blackmail," a two-volume investigation into organized crime, intelligence agencies, and political blackmail networks. Her work has been instrumental in exposing deeper connections in the Epstein case.`,
    significance: 'high',
    verificationStatus: 'verified',
    sources: [
      {
        id: 'whitney-webb-one-nation-blackmail',
        title: 'One Nation Under Blackmail',
        type: 'book',
        author: 'Whitney Webb',
        publication: 'Trine Day',
        publicationDate: '2022-02-01',
        reliability: 'high',
        description: 'Comprehensive investigation into Epstein and intelligence connections',
        tags: ['book', 'investigation', 'intelligence', 'blackmail']
      },
      {
        id: 'whitney-webb-epstein-series',
        title: 'Government by Blackmail: Jeffrey Epstein Series',
        type: 'news_article',
        author: 'Whitney Webb',
        publication: 'MintPress News',
        publicationDate: '2019-06-01',
        reliability: 'high',
        description: 'Investigative series on Epstein intelligence connections',
        tags: ['investigation', 'intelligence', 'series', 'blackmail']
      }
    ],
    tags: ['investigative-journalist', 'researcher', 'author', 'intelligence-connections'],
    profileImage: '/images/people/whitney-webb.jpg',
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'detective-joseph-recarey',
    name: 'Joseph Recarey',
    aliases: ['Detective Recarey', 'Joe Recarey'],
    dateOfDeath: '2018-05-25',
    nationality: ['United States'],
    occupations: [
      'Police Detective',
      'Lead Investigator'
    ],
    organizations: [
      'Palm Beach Police Department'
    ],
    biography: `Detective Joseph Recarey was the lead investigator in the Palm Beach Police Department's investigation of Jeffrey Epstein starting in 2005. He conducted extensive interviews with victims and worked tirelessly to build a strong case against Epstein. Recarey was known for his dedication to the victims and his frustration with the lenient plea deal that ultimately resulted. He died unexpectedly in 2018.`,
    significance: 'high',
    verificationStatus: 'verified',
    sources: [
      {
        id: 'recarey-miami-herald',
        title: 'Meet the Cop Who Refused to Let Jeffrey Epstein Off Easy',
        type: 'news_article',
        author: 'Julie K. Brown',
        publication: 'Miami Herald',
        publicationDate: '2018-11-28',
        reliability: 'high',
        description: 'Profile of Detective Recarey and his investigation',
        tags: ['detective', 'investigation', 'palm-beach', 'victims']
      }
    ],
    tags: ['detective', 'investigator', 'palm-beach-police', 'victim-advocate', 'deceased'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'chief-michael-reiter',
    name: 'Michael Reiter',
    aliases: ['Chief Reiter', 'Mike Reiter'],
    nationality: ['United States'],
    occupations: [
      'Police Chief',
      'Law Enforcement Executive'
    ],
    organizations: [
      'Palm Beach Police Department'
    ],
    biography: `Michael Reiter served as Chief of the Palm Beach Police Department during the Jeffrey Epstein investigation. He supported Detective Recarey's investigation and was frustrated by federal prosecutors' decision to offer Epstein a lenient plea deal. Reiter has been vocal about the failures in the case and the need for justice for the victims.`,
    significance: 'high',
    verificationStatus: 'verified',
    sources: [
      {
        id: 'reiter-interview',
        title: 'Former Palm Beach Police Chief Speaks Out on Epstein Case',
        type: 'interview',
        author: 'CBS News',
        publication: 'CBS News',
        publicationDate: '2019-07-10',
        reliability: 'high',
        description: 'Interview with Chief Reiter about the Epstein investigation',
        tags: ['police-chief', 'interview', 'investigation', 'palm-beach']
      }
    ],
    tags: ['police-chief', 'law-enforcement', 'palm-beach-police', 'victim-advocate'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'alexander-acosta',
    name: 'René Alexander Acosta',
    aliases: ['Alex Acosta', 'Alexander Acosta'],
    dateOfBirth: '1969-01-16',
    nationality: ['United States'],
    occupations: [
      'Former U.S. Attorney',
      'Former Secretary of Labor',
      'Lawyer'
    ],
    organizations: [
      'U.S. Attorney\'s Office Southern District of Florida',
      'U.S. Department of Labor',
      'Trump Administration'
    ],
    biography: `Alexander Acosta served as U.S. Attorney for the Southern District of Florida from 2005 to 2009, during which time he negotiated the controversial non-prosecution agreement with Jeffrey Epstein. He later served as Secretary of Labor under President Trump from 2017 to 2019, resigning amid renewed scrutiny of his handling of the Epstein case.`,
    significance: 'critical',
    verificationStatus: 'verified',
    sources: [
      {
        id: 'acosta-resignation',
        title: 'Labor Secretary Alex Acosta Resigns Amid Jeffrey Epstein Scrutiny',
        type: 'news_article',
        author: 'Michael D. Shear',
        publication: 'The New York Times',
        publicationDate: '2019-07-12',
        reliability: 'high',
        description: 'Report on Acosta\'s resignation due to Epstein case scrutiny',
        tags: ['acosta', 'resignation', 'labor-secretary', 'controversy']
      }
    ],
    tags: ['prosecutor', 'trump-administration', 'controversial-plea-deal', 'resigned'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'alan-dershowitz',
    name: 'Alan Morton Dershowitz',
    aliases: ['Alan Dershowitz', 'Professor Dershowitz'],
    dateOfBirth: '1938-09-01',
    nationality: ['United States'],
    occupations: [
      'Lawyer',
      'Harvard Law Professor',
      'Legal Scholar',
      'Author'
    ],
    organizations: [
      'Harvard Law School',
      'Epstein Defense Team'
    ],
    biography: `Alan Dershowitz is a prominent criminal defense lawyer and Harvard Law School professor who served on Jeffrey Epstein's legal defense team during the 2008 plea negotiations. He has been accused by Virginia Giuffre of sexual misconduct, allegations he vehemently denies and has fought in court through defamation lawsuits.`,
    significance: 'high',
    verificationStatus: 'verified',
    sources: [
      {
        id: 'dershowitz-epstein-defense',
        title: 'Alan Dershowitz Helped Jeffrey Epstein Get Lenient Deal',
        type: 'news_article',
        author: 'Julie K. Brown',
        publication: 'Miami Herald',
        publicationDate: '2018-11-28',
        reliability: 'high',
        description: 'Report on Dershowitz\'s role in Epstein defense',
        tags: ['dershowitz', 'defense-attorney', 'plea-deal', 'harvard']
      }
    ],
    tags: ['defense-attorney', 'harvard-professor', 'legal-scholar', 'controversial'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'sarah-kellen',
    name: 'Sarah Kensington',
    aliases: ['Sarah Kellen', 'Sarah Kensington'],
    nationality: ['United States'],
    occupations: [
      'Former Epstein Assistant',
      'Alleged Recruiter'
    ],
    organizations: [
      'Epstein Organization'
    ],
    biography: `Sarah Kellen (now Kensington) was a longtime assistant to Jeffrey Epstein who has been accused by victims of helping to recruit and schedule young women for Epstein. She was granted immunity under Epstein's 2008 non-prosecution agreement. Victims have described her as playing a central role in Epstein's operations.`,
    significance: 'high',
    verificationStatus: 'verified',
    sources: [
      {
        id: 'kellen-victim-testimony',
        title: 'Jeffrey Epstein\'s Assistant Sarah Kellen and the Victims',
        type: 'court_document',
        author: 'Various Victims',
        publication: 'Federal Court Records',
        publicationDate: '2019-08-09',
        reliability: 'high',
        description: 'Victim testimony describing Kellen\'s role',
        tags: ['kellen', 'assistant', 'recruiter', 'victim-testimony']
      }
    ],
    tags: ['epstein-assistant', 'alleged-recruiter', 'immunity-recipient', 'controversial'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'nadia-marcinkova',
    name: 'Nadia Marcinkova',
    aliases: ['Nada Marcinkova', 'Global Girl'],
    nationality: ['Slovakia', 'United States'],
    occupations: [
      'Pilot',
      'Former Epstein Associate'
    ],
    organizations: [
      'Aviloop',
      'Epstein Organization'
    ],
    biography: `Nadia Marcinkova was brought from Slovakia at age 15 and became involved with Jeffrey Epstein's organization. Victims have described her as both a victim and someone who participated in recruiting other young women. She later became a pilot and founded an aviation company. She was granted immunity under Epstein's 2008 non-prosecution agreement.`,
    significance: 'medium',
    verificationStatus: 'verified',
    sources: [
      {
        id: 'marcinkova-victim-accounts',
        title: 'Epstein Victims Describe Nadia Marcinkova\'s Role',
        type: 'court_document',
        author: 'Court Records',
        publication: 'Federal Court',
        publicationDate: '2019-08-09',
        reliability: 'high',
        description: 'Court documents describing Marcinkova\'s involvement',
        tags: ['marcinkova', 'victim-recruiter', 'slovakia', 'pilot']
      }
    ],
    tags: ['epstein-associate', 'former-victim', 'alleged-recruiter', 'pilot', 'immunity-recipient'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'adriana-ross',
    name: 'Adriana Ross',
    aliases: ['Adriana Mucinska'],
    nationality: ['Poland', 'United States'],
    occupations: [
      'Former Epstein Assistant',
      'Massage Therapist'
    ],
    organizations: [
      'Epstein Organization'
    ],
    biography: `Adriana Ross was a Polish-born woman who worked as an assistant and massage therapist for Jeffrey Epstein. Victims have testified that she scheduled appointments and was involved in Epstein's daily operations. She was granted immunity under the 2008 non-prosecution agreement.`,
    significance: 'medium',
    verificationStatus: 'verified',
    sources: [
      {
        id: 'ross-court-documents',
        title: 'Court Documents Describe Adriana Ross Role',
        type: 'court_document',
        author: 'Federal Court',
        publication: 'Court Records',
        publicationDate: '2019-08-09',
        reliability: 'high',
        description: 'Legal documents describing Ross\'s involvement',
        tags: ['ross', 'assistant', 'massage-therapist', 'poland']
      }
    ],
    tags: ['epstein-assistant', 'massage-therapist', 'polish', 'immunity-recipient'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'lesley-groff',
    name: 'Lesley Groff',
    aliases: ['Leslie Groff'],
    nationality: ['United States'],
    occupations: [
      'Executive Assistant',
      'Epstein Organization Administrator'
    ],
    organizations: [
      'Epstein Organization',
      'Financial Trust Co.'
    ],
    biography: `Lesley Groff was Jeffrey Epstein's executive assistant and helped manage his various business entities and properties. She handled travel arrangements, scheduling, and administrative functions for Epstein's operations. She was granted immunity under the 2008 non-prosecution agreement.`,
    significance: 'medium',
    verificationStatus: 'verified',
    sources: [
      {
        id: 'groff-business-records',
        title: 'Epstein Business Records Show Groff\'s Administrative Role',
        type: 'financial_record',
        author: 'Business Records',
        publication: 'Corporate Filings',
        publicationDate: '2019-08-15',
        reliability: 'high',
        description: 'Business documents showing Groff\'s administrative responsibilities',
        tags: ['groff', 'executive-assistant', 'administrator', 'business']
      }
    ],
    tags: ['executive-assistant', 'administrator', 'business-operations', 'immunity-recipient'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'bill-clinton',
    name: 'William Jefferson Clinton',
    aliases: ['Bill Clinton', 'President Clinton', 'WJC'],
    dateOfBirth: '1946-08-19',
    nationality: ['United States'],
    occupations: [
      '42nd President of the United States',
      'Former Governor of Arkansas',
      'Clinton Foundation Co-Founder'
    ],
    organizations: [
      'Clinton Foundation',
      'Clinton Global Initiative',
      'Democratic Party'
    ],
    biography: `Bill Clinton served as the 42nd President of the United States from 1993 to 2001. Flight logs show he traveled on Jeffrey Epstein's private jet multiple times in the early 2000s, primarily for Clinton Foundation humanitarian work in Africa. Clinton has stated he was not aware of Epstein's crimes and ended their association when allegations became public.`,
    significance: 'high',
    verificationStatus: 'verified',
    sources: [
      {
        id: 'clinton-epstein-flights',
        title: 'Bill Clinton Flew with Jeffrey Epstein on Lolita Express',
        type: 'news_article',
        author: 'Fox News',
        publication: 'Fox News',
        publicationDate: '2016-05-13',
        reliability: 'medium',
        description: 'Report on Clinton\'s flights on Epstein\'s aircraft',
        tags: ['clinton', 'flight-logs', 'epstein-jet', 'president']
      },
      {
        id: 'clinton-statement-epstein',
        title: 'Statement from President Clinton on Jeffrey Epstein',
        type: 'other',
        author: 'Bill Clinton',
        publication: 'Clinton Office',
        publicationDate: '2019-07-08',
        reliability: 'high',
        description: 'Official statement from Clinton regarding Epstein association',
        tags: ['clinton', 'statement', 'response', 'official']
      }
    ],
    tags: ['former-president', 'political-figure', 'clinton-foundation', 'epstein-associate'],
    lastUpdated: '2024-01-15T00:00:00Z'
  },
  {
    id: 'ehud-barak',
    name: 'Ehud Barak',
    aliases: ['General Barak'],
    dateOfBirth: '1942-02-12',
    nationality: ['Israel'],
    occupations: [
      'Former Prime Minister of Israel',
      'Former Defense Minister',
      'Military General',
      'Businessman'
    ],
    organizations: [
      'Israeli Defense Forces',
      'Labor Party',
      'Carbyne911'
    ],
    biography: `Ehud Barak served as Prime Minister of Israel from 1999 to 2001 and as Defense Minister from 2007 to 2013. He had business dealings with Jeffrey Epstein and received investments for his ventures. Barak has acknowledged visiting Epstein's properties for business purposes but denied any knowledge of illegal activities.`,
    significance: 'medium',
    verificationStatus: 'verified',
    sources: [
      {
        id: 'barak-epstein-business',
        title: 'Ehud Barak and Jeffrey Epstein: The Business Connection',
        type: 'news_article',
        author: 'Haaretz',
        publication: 'Haaretz',
        publicationDate: '2019-07-17',
        reliability: 'high',
        description: 'Investigation into Barak-Epstein business relationship',
        tags: ['barak', 'business', 'israel', 'prime-minister']
      }
    ],
    tags: ['former-prime-minister', 'israeli-politician', 'military-general', 'business-associate'],
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