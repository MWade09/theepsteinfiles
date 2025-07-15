'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { TimelineEvent, EventEntity } from '@/types/investigation';
import { comprehensiveTimeline } from '@/data/core/timeline';
import { corePeople } from '@/data/core/people';
import { 
  Calendar, 
  Filter, 
  Search, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  List,
  BarChart3,
  Network,
  ExternalLink,
  Clock,
  Users,
  FileText,
  ChevronLeft,
  ChevronRight,
  Info,
  Eye,
  Download
} from 'lucide-react';

interface TimelineFilter {
  types: string[];
  categories: string[];
  significance: string[];
  verificationStatus: string[];
  dateRange: {
    start: string;
    end: string;
  };
  entities: string[];
}

interface TimelineViewMode {
  mode: 'chronological' | 'thematic' | 'network' | 'statistical';
  groupBy: 'year' | 'month' | 'category' | 'significance';
  layout: 'vertical' | 'horizontal' | 'grid';
}

export default function AdvancedTimeline() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [hoveredEvent, setHoveredEvent] = useState<TimelineEvent | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [currentDecade, setCurrentDecade] = useState(2000);

  const [viewMode, setViewMode] = useState<TimelineViewMode>({
    mode: 'chronological',
    groupBy: 'year',
    layout: 'vertical'
  });

  const [filters, setFilters] = useState<TimelineFilter>({
    types: ['all'],
    categories: ['all'],
    significance: ['critical', 'high', 'medium', 'low'],
    verificationStatus: ['verified', 'pending'],
    dateRange: {
      start: '1970-01-01',
      end: '2025-01-01'
    },
    entities: []
  });

  // Filter and process events
  const filteredEvents = useMemo(() => {
    return comprehensiveTimeline.filter(event => {
      // Search filter
      if (searchTerm && !event.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !event.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !event.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))) {
        return false;
      }

      // Type filter
      if (!filters.types.includes('all') && !filters.types.includes(event.type)) {
        return false;
      }

      // Category filter  
      if (!filters.categories.includes('all') && !filters.categories.includes(event.category)) {
        return false;
      }

      // Significance filter
      if (!filters.significance.includes(event.significance)) {
        return false;
      }

      // Verification status filter
      if (!filters.verificationStatus.includes(event.verificationStatus)) {
        return false;
      }

      // Date range filter
      const eventDate = new Date(event.date);
      const startDate = new Date(filters.dateRange.start);
      const endDate = new Date(filters.dateRange.end);
      if (eventDate < startDate || eventDate > endDate) {
        return false;
      }

      // Entity filter
      if (filters.entities.length > 0) {
        const hasEntity = event.entities.some(entity => 
          filters.entities.includes(entity.entityId)
        );
        if (!hasEntity) return false;
      }

      return true;
    }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [searchTerm, filters]);

  // Group events based on view mode
  const groupedEvents = useMemo(() => {
    const groups = new Map<string, TimelineEvent[]>();

    filteredEvents.forEach(event => {
      let groupKey: string;
      const eventDate = new Date(event.date);

      switch (viewMode.groupBy) {
        case 'year':
          groupKey = eventDate.getFullYear().toString();
          break;
        case 'month':
          groupKey = `${eventDate.getFullYear()}-${String(eventDate.getMonth() + 1).padStart(2, '0')}`;
          break;
        case 'category':
          groupKey = event.category;
          break;
        case 'significance':
          groupKey = event.significance;
          break;
        default:
          groupKey = eventDate.getFullYear().toString();
      }

      if (!groups.has(groupKey)) {
        groups.set(groupKey, []);
      }
      groups.get(groupKey)!.push(event);
    });

    return Array.from(groups.entries()).sort((a, b) => {
      if (viewMode.groupBy === 'year' || viewMode.groupBy === 'month') {
        return a[0].localeCompare(b[0]);
      }
      return a[1].length - b[1].length; // Sort by count for other groupings
    });
  }, [filteredEvents, viewMode.groupBy]);

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'arrest': return '🚔';
      case 'legal': return '⚖️';
      case 'investigation': return '🔍';
      case 'media': return '📰';
      case 'business': return '💼';
      case 'death': return '⚰️';
      case 'meeting': return '🤝';
      case 'travel': return '✈️';
      default: return '📅';
    }
  };

  const getSignificanceColor = (significance: string) => {
    switch (significance) {
      case 'critical': return 'bg-red-500 border-red-600';
      case 'high': return 'bg-orange-500 border-orange-600';
      case 'medium': return 'bg-yellow-500 border-yellow-600';
      case 'low': return 'bg-blue-500 border-blue-600';
      default: return 'bg-gray-500 border-gray-600';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getRelatedEvents = (eventId: string): TimelineEvent[] => {
    const event = comprehensiveTimeline.find(e => e.id === eventId);
    if (!event) return [];

    return comprehensiveTimeline.filter(e => 
      event.relatedEvents.includes(e.id) || 
      e.relatedEvents.includes(eventId)
    );
  };

  const navigateToDecade = (decade: number) => {
    setCurrentDecade(decade);
    setFilters(prev => ({
      ...prev,
      dateRange: {
        start: `${decade}-01-01`,
        end: `${decade + 10}-01-01`
      }
    }));
  };

  const resetFilters = () => {
    setFilters({
      types: ['all'],
      categories: ['all'],
      significance: ['critical', 'high', 'medium', 'low'],
      verificationStatus: ['verified', 'pending'],
      dateRange: {
        start: '1970-01-01',
        end: '2025-01-01'
      },
      entities: []
    });
    setSearchTerm('');
  };

  const exportTimeline = () => {
    const data = {
      events: filteredEvents,
      filters,
      viewMode,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { 
      type: 'application/json' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'epstein-timeline-export.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full bg-white dark:bg-dark-900 rounded-lg overflow-hidden">
      {/* Header Controls */}
      <div className="sticky top-0 z-20 bg-white dark:bg-dark-900 border-b border-gray-200 dark:border-dark-700 p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Title and Stats */}
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-2">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Investigation Timeline
              </h2>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {filteredEvents.length} events
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <span>Span: {filteredEvents.length > 0 ? 
                `${formatDate(filteredEvents[0].date)} - ${formatDate(filteredEvents[filteredEvents.length - 1].date)}` : 
                'No events'
              }</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-64 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center border border-gray-300 dark:border-dark-600 rounded-lg">
              <button
                onClick={() => setViewMode(prev => ({...prev, mode: 'chronological'}))}
                className={`p-2 ${viewMode.mode === 'chronological' ? 'bg-primary-100 dark:bg-primary-900' : ''} hover:bg-gray-100 dark:hover:bg-dark-700 rounded-l-lg`}
                title="Chronological View"
              >
                <Clock className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode(prev => ({...prev, mode: 'thematic'}))}
                className={`p-2 ${viewMode.mode === 'thematic' ? 'bg-primary-100 dark:bg-primary-900' : ''} hover:bg-gray-100 dark:hover:bg-dark-700 border-x border-gray-300 dark:border-dark-600`}
                title="Thematic View"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode(prev => ({...prev, mode: 'statistical'}))}
                className={`p-2 ${viewMode.mode === 'statistical' ? 'bg-primary-100 dark:bg-primary-900' : ''} hover:bg-gray-100 dark:hover:bg-dark-700 rounded-r-lg`}
                title="Statistical View"
              >
                <BarChart3 className="w-4 h-4" />
              </button>
            </div>

            {/* Group By */}
            <select
              value={viewMode.groupBy}
              onChange={(e) => setViewMode(prev => ({...prev, groupBy: e.target.value as any}))}
              className="px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500"
            >
              <option value="year">Group by Year</option>
              <option value="month">Group by Month</option>
              <option value="category">Group by Category</option>
              <option value="significance">Group by Significance</option>
            </select>

            {/* Action Buttons */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`p-2 border border-gray-300 dark:border-dark-600 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 ${showFilters ? 'bg-primary-100 dark:bg-primary-900' : ''}`}
              title="Toggle Filters"
            >
              <Filter className="w-4 h-4" />
            </button>

            <button
              onClick={resetFilters}
              className="p-2 border border-gray-300 dark:border-dark-600 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700"
              title="Reset Filters"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={exportTimeline}
              className="p-2 border border-gray-300 dark:border-dark-600 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700"
              title="Export Timeline"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Decade Navigation */}
        <div className="flex items-center justify-center gap-2 mt-4">
          <button
            onClick={() => navigateToDecade(currentDecade - 10)}
            className="p-1 hover:bg-gray-100 dark:hover:bg-dark-700 rounded"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          {[1970, 1980, 1990, 2000, 2010, 2020].map(decade => (
            <button
              key={decade}
              onClick={() => navigateToDecade(decade)}
              className={`px-3 py-1 rounded text-sm font-medium ${
                currentDecade === decade 
                  ? 'bg-primary-600 text-white' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-700'
              }`}
            >
              {decade}s
            </button>
          ))}
          
          <button
            onClick={() => navigateToDecade(currentDecade + 10)}
            className="p-1 hover:bg-gray-100 dark:hover:bg-dark-700 rounded"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Timeline Content */}
        <div className="flex-1 overflow-y-auto" style={{ maxHeight: '80vh' }}>
          {viewMode.mode === 'chronological' && (
            <div className="p-6">
              {groupedEvents.map(([groupKey, events]) => (
                <div key={groupKey} className="mb-12">
                  <div className="sticky top-0 bg-white dark:bg-dark-900 py-2 mb-6 border-b border-gray-200 dark:border-dark-700">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                      {viewMode.groupBy === 'year' ? groupKey : 
                       viewMode.groupBy === 'month' ? new Date(groupKey + '-01').toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) :
                       groupKey.charAt(0).toUpperCase() + groupKey.slice(1)}
                    </h3>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {events.length} event{events.length !== 1 ? 's' : ''}
                    </div>
                  </div>

                  <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-6 top-0 bottom-0 w-px bg-gray-300 dark:bg-dark-600"></div>

                    {events.map((event, index) => (
                      <div key={event.id} className="relative flex items-start mb-8">
                        {/* Timeline node */}
                        <div className={`relative z-10 w-12 h-12 rounded-full border-4 border-white dark:border-dark-900 ${getSignificanceColor(event.significance)} flex items-center justify-center text-white font-bold shadow-lg`}>
                          <span className="text-lg">{getEventIcon(event.type)}</span>
                        </div>

                        {/* Event card */}
                        <div className="ml-6 flex-1">
                          <div 
                            className="evidence-card p-6 cursor-pointer transform hover:scale-[1.02] transition-all duration-200"
                            onClick={() => setSelectedEvent(event)}
                            onMouseEnter={() => setHoveredEvent(event)}
                            onMouseLeave={() => setHoveredEvent(null)}
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <span className={`px-2 py-1 rounded text-xs font-medium uppercase ${
                                  event.significance === 'critical' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                                  event.significance === 'high' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
                                  event.significance === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                                  'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                }`}>
                                  {event.significance}
                                </span>
                                <span className="text-sm text-gray-500 dark:text-gray-500 uppercase tracking-wide">
                                  {event.type}
                                </span>
                                {event.verificationStatus === 'verified' && (
                                  <span className="text-green-600 font-bold">✓</span>
                                )}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-500">
                                {formatDate(event.date)}
                              </div>
                            </div>

                            <h4 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100">
                              {event.title}
                            </h4>

                            <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                              {event.description}
                            </p>

                            {/* Entities involved */}
                            {event.entities.length > 0 && (
                              <div className="mb-4">
                                <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                                  People involved:
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  {event.entities.slice(0, 3).map(entity => {
                                    const person = corePeople.find(p => p.id === entity.entityId);
                                    return person ? (
                                      <span
                                        key={entity.entityId}
                                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                                        title={entity.role}
                                      >
                                        {person.name}
                                      </span>
                                    ) : null;
                                  })}
                                  {event.entities.length > 3 && (
                                    <span className="px-3 py-1 bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                                      +{event.entities.length - 3} more
                                    </span>
                                  )}
                                </div>
                              </div>
                            )}

                            {/* Related events preview */}
                            {event.relatedEvents.length > 0 && (
                              <div className="text-sm text-gray-500 dark:text-gray-500">
                                <strong>Related events:</strong> {event.relatedEvents.length}
                              </div>
                            )}

                            {/* Tags */}
                            <div className="flex flex-wrap gap-1 mt-3">
                              {event.tags.slice(0, 4).map(tag => (
                                <span
                                  key={tag}
                                  className="px-2 py-1 bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 rounded text-xs"
                                >
                                  {tag}
                                </span>
                              ))}
                              {event.tags.length > 4 && (
                                <span className="px-2 py-1 bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 rounded text-xs">
                                  +{event.tags.length - 4}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {filteredEvents.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <Calendar className="w-16 h-16 mx-auto" />
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-lg">
                    No events found matching your criteria.
                  </p>
                  <button 
                    onClick={resetFilters}
                    className="mt-4 text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Reset filters
                  </button>
                </div>
              )}
            </div>
          )}

          {viewMode.mode === 'statistical' && (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Events by Type */}
                <div className="evidence-card p-6">
                  <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">
                    Events by Type
                  </h3>
                  {Object.entries(
                    filteredEvents.reduce((acc, event) => {
                      acc[event.type] = (acc[event.type] || 0) + 1;
                      return acc;
                    }, {} as Record<string, number>)
                  ).map(([type, count]) => (
                    <div key={type} className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-2">
                        <span>{getEventIcon(type)}</span>
                        <span className="capitalize">{type}</span>
                      </div>
                      <span className="font-semibold">{count}</span>
                    </div>
                  ))}
                </div>

                {/* Events by Significance */}
                <div className="evidence-card p-6">
                  <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">
                    Events by Significance
                  </h3>
                  {['critical', 'high', 'medium', 'low'].map(significance => {
                    const count = filteredEvents.filter(e => e.significance === significance).length;
                    return (
                      <div key={significance} className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${getSignificanceColor(significance)}`}></div>
                          <span className="capitalize">{significance}</span>
                        </div>
                        <span className="font-semibold">{count}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Timeline Statistics */}
                <div className="evidence-card p-6">
                  <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">
                    Timeline Statistics
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Total Events:</span>
                      <span className="font-semibold">{filteredEvents.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Verified Events:</span>
                      <span className="font-semibold">
                        {filteredEvents.filter(e => e.verificationStatus === 'verified').length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Years Covered:</span>
                      <span className="font-semibold">
                        {filteredEvents.length > 0 ? 
                          new Date(filteredEvents[filteredEvents.length - 1].date).getFullYear() - 
                          new Date(filteredEvents[0].date).getFullYear() + 1 : 0
                        }
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>People Involved:</span>
                      <span className="font-semibold">
                        {new Set(filteredEvents.flatMap(e => e.entities.map(ent => ent.entityId))).size}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="w-80 bg-white dark:bg-dark-800 border-l border-gray-200 dark:border-dark-700 p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Filters</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              {/* Event Types */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Event Types
                </label>
                <div className="space-y-2">
                  {['all', 'arrest', 'legal', 'investigation', 'media', 'business', 'death', 'meeting', 'travel'].map(type => (
                    <label key={type} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.types.includes(type)}
                        onChange={(e) => {
                          if (type === 'all') {
                            setFilters(prev => ({
                              ...prev,
                              types: e.target.checked ? ['all'] : []
                            }));
                          } else {
                            setFilters(prev => ({
                              ...prev,
                              types: prev.types.includes('all') 
                                ? [type] 
                                : e.target.checked 
                                  ? [...prev.types, type]
                                  : prev.types.filter(t => t !== type)
                            }));
                          }
                        }}
                        className="mr-3"
                      />
                      <span className="text-sm flex items-center gap-2">
                        {type !== 'all' && <span>{getEventIcon(type)}</span>}
                        <span className="capitalize">{type}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Significance Levels */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Significance Level
                </label>
                <div className="space-y-2">
                  {['critical', 'high', 'medium', 'low'].map(level => (
                    <label key={level} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.significance.includes(level)}
                        onChange={(e) => {
                          setFilters(prev => ({
                            ...prev,
                            significance: e.target.checked 
                              ? [...prev.significance, level]
                              : prev.significance.filter(l => l !== level)
                          }));
                        }}
                        className="mr-3"
                      />
                      <span className="text-sm flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${getSignificanceColor(level)}`}></div>
                        <span className="capitalize">{level}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Date Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Date Range
                </label>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">From</label>
                    <input
                      type="date"
                      value={filters.dateRange.start}
                      onChange={(e) => setFilters(prev => ({
                        ...prev,
                        dateRange: { ...prev.dateRange, start: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">To</label>
                    <input
                      type="date"
                      value={filters.dateRange.end}
                      onChange={(e) => setFilters(prev => ({
                        ...prev,
                        dateRange: { ...prev.dateRange, end: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Event Detail Panel */}
        {selectedEvent && (
          <div className="w-96 bg-white dark:bg-dark-800 border-l border-gray-200 dark:border-dark-700 p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                Event Details
              </h3>
              <button
                onClick={() => setSelectedEvent(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {selectedEvent.title}
                </h4>
                <div className="flex items-center gap-2 mb-4">
                  <span className={`px-3 py-1 rounded text-sm font-medium ${
                    selectedEvent.significance === 'critical' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                    selectedEvent.significance === 'high' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
                    selectedEvent.significance === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                    'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  }`}>
                    {selectedEvent.significance.toUpperCase()}
                  </span>
                  {selectedEvent.verificationStatus === 'verified' && (
                    <span className="text-green-600 font-bold">✓ Verified</span>
                  )}
                </div>
              </div>

              <div>
                <h5 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Date & Type</h5>
                <div className="space-y-2 text-sm">
                  <div><strong>Date:</strong> {formatDate(selectedEvent.date)}</div>
                  <div><strong>Type:</strong> {selectedEvent.type}</div>
                  <div><strong>Category:</strong> {selectedEvent.category}</div>
                </div>
              </div>

              <div>
                <h5 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Description</h5>
                <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                  {selectedEvent.description}
                </p>
              </div>

              {selectedEvent.entities.length > 0 && (
                <div>
                  <h5 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">People Involved</h5>
                  <div className="space-y-2">
                    {selectedEvent.entities.map(entity => {
                      const person = corePeople.find(p => p.id === entity.entityId);
                      return person ? (
                        <div key={entity.entityId} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-dark-700 rounded">
                          <div>
                            <div className="font-medium text-sm">{person.name}</div>
                            <div className="text-xs text-gray-600 dark:text-gray-400">{entity.role}</div>
                          </div>
                        </div>
                      ) : null;
                    })}
                  </div>
                </div>
              )}

              {selectedEvent.consequences.length > 0 && (
                <div>
                  <h5 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Consequences</h5>
                  <ul className="space-y-1 text-sm">
                    {selectedEvent.consequences.map((consequence, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary-600 mt-1">•</span>
                        {consequence}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedEvent.relatedEvents.length > 0 && (
                <div>
                  <h5 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Related Events</h5>
                  <div className="space-y-2">
                    {getRelatedEvents(selectedEvent.id).slice(0, 3).map(relatedEvent => (
                      <button
                        key={relatedEvent.id}
                        onClick={() => setSelectedEvent(relatedEvent)}
                        className="w-full text-left p-2 bg-gray-50 dark:bg-dark-700 rounded hover:bg-gray-100 dark:hover:bg-dark-600 transition-colors"
                      >
                        <div className="font-medium text-sm">{relatedEvent.title}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          {formatDate(relatedEvent.date)}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {selectedEvent.sources.length > 0 && (
                <div>
                  <h5 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Sources</h5>
                  <div className="space-y-2">
                    {selectedEvent.sources.map((source, index) => (
                      <div key={index} className="p-2 bg-gray-50 dark:bg-dark-700 rounded">
                        <div className="font-medium text-sm">{source.title}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          {source.author} - {source.publication}
                        </div>
                        {source.url && (
                          <a 
                            href={source.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-xs text-primary-600 hover:text-primary-700 flex items-center gap-1 mt-1"
                          >
                            View Source <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h5 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Tags</h5>
                <div className="flex flex-wrap gap-1">
                  {selectedEvent.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 