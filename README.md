# The Epstein Files - Investigation Website

A comprehensive, interactive website documenting the Jeffrey Epstein scandal through evidence-based storytelling, timeline visualization, and geographic mapping.

## Overview

This website presents publicly available information, court documents, and research findings related to the Jeffrey Epstein case in an accessible, narrative-driven format. The site features:

- **Interactive Timeline**: Chronological exploration of key events
- **Evidence Database**: Searchable collection of documents and testimony  
- **Geographic Mapping**: Interactive map of locations and connections
- **Responsive Design**: Optimized for all devices and screen sizes
- **Dark/Light Mode**: User preference-based theming

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Mapping**: Leaflet (React Leaflet)
- **Deployment**: Optimized for Vercel, Netlify, or similar platforms

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm, yarn, or pnpm package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd JeffreyEpsteinSite
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
JeffreyEpsteinSite/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── globals.css      # Global styles and Tailwind
│   │   ├── layout.tsx       # Root layout component
│   │   └── page.tsx         # Home page
│   ├── components/          # React components
│   │   ├── Navigation.tsx   # Main navigation with theme toggle
│   │   ├── HeroSection.tsx  # Landing page hero
│   │   ├── TimelinePreview.tsx    # Interactive timeline
│   │   ├── EvidenceGrid.tsx       # Evidence database
│   │   └── InteractiveMap.tsx     # Geographic mapping
│   └── data/                # Data structures and content
├── public/                  # Static assets
├── package.json            # Dependencies and scripts
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── next.config.js         # Next.js configuration
```

## Key Features

### 1. Interactive Timeline
- Chronological visualization of events from 1990s to present
- Clickable events with detailed information
- Category filtering (arrests, legal proceedings, investigations)
- Source attribution for all events

### 2. Evidence Database
- Searchable collection of court documents, testimony, and records
- Filtering by type, category, and significance level
- Verification status indicators
- Source and date metadata

### 3. Geographic Mapping
- Interactive map showing Epstein-related locations worldwide
- Property details, ownership timelines, and significance ratings
- Filtering by location type (residences, islands, airports)
- Detailed location profiles with key facts

### 4. Research Attribution
- Proper citation of sources including Whitney Webb's work
- Links to original documents and investigations
- Clear distinction between verified facts and allegations
- Transparent methodology and sourcing

## Data Sources and Attribution

This investigation compiles information from:

- **Court Records**: Federal and state court filings, depositions, evidence
- **Government Documents**: FBI files, DOJ records (via FOIA)
- **Investigative Journalism**: Miami Herald, Whitney Webb research, and others
- **Public Records**: Property transactions, business filings, travel logs
- **Victim Testimony**: Sworn depositions and court testimony

All sources are clearly attributed and linked where possible.

## Development Guidelines

### Adding New Evidence
1. Create entries in the evidence data structure
2. Include source attribution and verification status
3. Add relevant tags for searchability
4. Ensure proper categorization

### Timeline Events
1. Add events to the timeline data structure
2. Include accurate dates and source information
3. Categorize by event type
4. Assign significance levels based on impact

### Map Locations
1. Add coordinates and location details
2. Include ownership timeline and key facts
3. Verify information against public records
4. Add significance ratings

## Building for Production

```bash
npm run build
npm start
```

## Deployment

The site is optimized for deployment on:

- **Vercel**: Zero-config deployment with automatic CI/CD
- **Netlify**: Build and deploy with form handling capabilities  
- **Traditional hosting**: Static export support available

### Environment Variables

No API keys required for basic functionality. Map features may require:

```env
NEXT_PUBLIC_MAPBOX_TOKEN=your_token_here  # Optional for enhanced mapping
```

## Contributing

This is an ongoing investigation. Contributions are welcome for:

- **Fact verification**: Cross-referencing sources and documents
- **New evidence**: Adding court filings, documents, and verified information
- **Technical improvements**: UI/UX enhancements, performance optimizations
- **Accessibility**: Ensuring the site is accessible to all users

### Guidelines for Contributions

1. **Accuracy**: All information must be sourced and verifiable
2. **Attribution**: Proper credit to original sources and researchers
3. **Objectivity**: Present facts without speculation or bias
4. **Legal compliance**: Only use publicly available information

## Disclaimer

This website presents publicly available information for educational and journalistic purposes. All allegations are clearly marked as such, and the site maintains a clear distinction between verified facts and unproven claims. The goal is to provide a comprehensive resource for understanding this complex case based on available evidence.

## License

MIT License - See LICENSE file for details

## Acknowledgments

- **Whitney Webb**: Extensive investigative research and "One Nation Under Blackmail"
- **Julie K. Brown**: Miami Herald investigation that brought renewed attention
- **Victims and survivors**: Whose courage brought these issues to light
- **Court system**: For providing transparency through public records
- **Open source community**: For the tools and libraries that made this possible

---

For questions, corrections, or additional information, please open an issue or submit a pull request. 