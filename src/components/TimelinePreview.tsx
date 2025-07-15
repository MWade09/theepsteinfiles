'use client';

import { useState } from 'react';
import { Calendar, ArrowRight, ExternalLink } from 'lucide-react';

interface TimelineEvent {
  id: string;
  date: string;
  year: number;
  title: string;
  description: string;
  category: 'arrest' | 'legal' | 'investigation' | 'connection' | 'death';
  significance: 'high' | 'medium' | 'low';
  sources?: string[];
}

const timelineEvents: TimelineEvent[] = [
  {
    id: '1',
    date: 'July 2006',
    year: 2006,
    title: 'First Arrest in Florida',
    description: 'Jeffrey Epstein arrested on charges of soliciting prostitution from minors in Palm Beach, Florida.',
    category: 'arrest',
    significance: 'high',
    sources: ['Miami Herald', 'Court Records']
  },
  {
    id: '2',
    date: 'June 2008',
    year: 2008,
    title: 'Controversial Plea Deal',
    description: 'Epstein pleads guilty to state charges, receives lenient 13-month sentence despite federal investigation.',
    category: 'legal',
    significance: 'high',
    sources: ['DOJ Records', 'Miami Herald Investigation']
  },
  {
    id: '3',
    date: 'December 2014',
    year: 2014,
    title: 'Virginia Giuffre Lawsuit',
    description: 'Virginia Roberts Giuffre files civil lawsuit alleging she was trafficked by Epstein.',
    category: 'legal',
    significance: 'high',
    sources: ['Court Filings', 'Legal Documents']
  },
  {
    id: '4',
    date: 'November 2018',
    year: 2018,
    title: 'Miami Herald Investigation',
    description: 'Julie K. Brown\'s "Perversion of Justice" series reignites public interest in the case.',
    category: 'investigation',
    significance: 'high',
    sources: ['Miami Herald']
  },
  {
    id: '5',
    date: 'July 2019',
    year: 2019,
    title: 'Federal Arrest in New York',
    description: 'Epstein arrested on federal charges of sex trafficking of minors in Manhattan.',
    category: 'arrest',
    significance: 'high',
    sources: ['SDNY', 'FBI']
  },
  {
    id: '6',
    date: 'August 10, 2019',
    year: 2019,
    title: 'Death in Custody',
    description: 'Jeffrey Epstein found dead in his cell at Metropolitan Correctional Center, ruled suicide.',
    category: 'death',
    significance: 'high',
    sources: ['DOJ', 'Medical Examiner', 'FBI']
  }
];

export default function TimelinePreview() {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'arrest': return 'bg-red-500';
      case 'legal': return 'bg-blue-500';
      case 'investigation': return 'bg-yellow-500';
      case 'connection': return 'bg-purple-500';
      case 'death': return 'bg-black';
      default: return 'bg-gray-500';
    }
  };

  const getSignificanceIcon = (significance: string) => {
    switch (significance) {
      case 'high': return '🔥';
      case 'medium': return '⚠️';
      case 'low': return 'ℹ️';
      default: return '';
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Timeline of Events
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Key moments in the Jeffrey Epstein case, from initial allegations to federal prosecution
        </p>
      </div>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-red-500 via-blue-500 to-gray-500"></div>

        {/* Timeline Events */}
        <div className="space-y-12">
          {timelineEvents.map((event, index) => (
            <div key={event.id} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
              {/* Content Card */}
              <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                <div 
                  className="evidence-card p-6 cursor-pointer transform hover:scale-105 transition-all duration-300"
                  onClick={() => setSelectedEvent(event)}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`w-3 h-3 rounded-full ${getCategoryColor(event.category)}`}></div>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                      {event.category}
                    </span>
                    <span className="text-lg">{getSignificanceIcon(event.significance)}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">
                    {event.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    {event.description}
                  </p>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-500">
                    <Calendar className="w-4 h-4" />
                    {event.date}
                  </div>
                </div>
              </div>

              {/* Timeline Node */}
              <div className="relative z-10 w-8 h-8 bg-white dark:bg-dark-800 border-4 border-primary-500 rounded-full flex items-center justify-center">
                <div className={`w-3 h-3 rounded-full ${getCategoryColor(event.category)}`}></div>
              </div>

              {/* Year Label */}
              <div className={`w-5/12 ${index % 2 === 0 ? 'pl-8' : 'pr-8 text-right'}`}>
                <div className="text-3xl font-bold text-gray-300 dark:text-gray-600">
                  {event.year}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-16">
        <button className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 mx-auto transition-colors">
          Explore Full Timeline
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-dark-800 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full ${getCategoryColor(selectedEvent.category)}`}></div>
                  <span className="text-lg font-bold">{selectedEvent.title}</span>
                </div>
                <button 
                  onClick={() => setSelectedEvent(null)}
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  ✕
                </button>
              </div>
              
              <div className="flex items-center gap-2 mb-4 text-gray-600 dark:text-gray-400">
                <Calendar className="w-4 h-4" />
                {selectedEvent.date}
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                {selectedEvent.description}
              </p>
              
              {selectedEvent.sources && (
                <div>
                  <h4 className="font-semibold mb-2">Sources:</h4>
                  <ul className="space-y-1">
                    {selectedEvent.sources.map((source, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <ExternalLink className="w-3 h-3" />
                        {source}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 