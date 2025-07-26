'use client';

import { useState, useMemo, useRef } from 'react';
import { TimelineEvent, Evidence } from '@/types/investigation';
import { comprehensiveTimeline } from '@/data/core/timeline';
import { corePeople } from '@/data/core/people';
import { coreDocuments } from '@/data/core/documents';
import { enhancedProperties } from '@/data/geographic/properties';
import NetworkVisualization from './NetworkVisualization';

// Define NetworkNode interface to match the one in NetworkVisualization
interface NetworkNode {
  id: string;
  name: string;
  type: 'person' | 'event';
  group: number;
  significance?: string;
  eventType?: string;
  size: number;
  color: string;
}
import { 
  Calendar, 
  Search, 
  ZoomIn, 
  ZoomOut, 
  List,
  BarChart3,
  ExternalLink,
  Clock,
  FileText,
  ChevronLeft,
  ChevronRight,
  Eye,
  Download,
  MapPin,
  Image as ImageIcon,
  Video,
  Play,
  Volume2,
  Link2,
  Star,
  Bookmark,
  Share,
  X,
  Mic,
  Globe,
  User,
  Users
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
  multimedia: string[]; // Added for multimedia filtering
  hasDocuments: boolean; // Filter events with linked documents
  hasGeographic: boolean; // Filter events with geographic data
}

interface TimelineViewMode {
  mode: 'chronological' | 'thematic' | 'network' | 'statistical' | 'multimedia' | 'geographic'; // Added geographic mode
  groupBy: 'year' | 'month' | 'category' | 'significance';
  layout: 'vertical' | 'horizontal' | 'grid';
}

interface MultimediaAttachment {
  id: string;
  type: 'image' | 'video' | 'audio' | 'document';
  url: string;
  title: string;
  description?: string;
  thumbnail?: string;
  duration?: number; // For video/audio
  source?: string;
  verified: boolean;
}

interface EnhancedTimelineEvent extends TimelineEvent {
  multimedia?: MultimediaAttachment[];
  linkedDocuments?: Evidence[];
  geographicData?: {
    propertyId?: string;
    coordinates?: [number, number];
    address?: string;
  };
  sourceDetails?: {
    primarySource: string;
    reliability: 'high' | 'medium' | 'low';
    verificationLevel: 'verified' | 'corroborated' | 'reported' | 'alleged';
  };
}

interface TimelineView {
  mode: 'chronological' | 'thematic' | 'network' | 'geographic' | 'multimedia' | 'statistical';
  zoom: 'decade' | 'year' | 'month' | 'day';
  animation: boolean;
}

interface AdvancedTimelineProps {
  view?: TimelineView;
  externalFilters?: Partial<TimelineFilter>;
  onEventSelect?: (event: TimelineEvent) => void;
  onViewChange?: (view: Partial<TimelineView>) => void;
}

export default function AdvancedTimeline({ 
  view: externalView, 
  externalFilters,
  onEventSelect,
  onViewChange 
}: AdvancedTimelineProps = {}) {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [selectedNetworkNode, setSelectedNetworkNode] = useState<NetworkNode | null>(null);
  const [hoveredEvent, setHoveredEvent] = useState<TimelineEvent | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [currentDecade, setCurrentDecade] = useState(2000);
  
  // Multimedia states
  const [selectedMediaItem, setSelectedMediaItem] = useState<MultimediaAttachment | null>(null);
  const [showMediaViewer, setShowMediaViewer] = useState(false);
  const [showDocumentPanel, setShowDocumentPanel] = useState(false);
  const [showGeographicInfo, setShowGeographicInfo] = useState(false);

  const [internalViewMode, setInternalViewMode] = useState<TimelineViewMode>({
    mode: 'chronological',
    groupBy: 'year',
    layout: 'vertical'
  });

  // Use external view mode if provided, otherwise use internal state
  const viewMode = externalView ? {
    mode: externalView.mode as TimelineViewMode['mode'], 
    groupBy: 'year' as const,
    layout: 'vertical' as const
  } : internalViewMode;

  // Create a combined setViewMode that works for both internal and external
  const setViewMode = (updater: (prev: TimelineViewMode) => TimelineViewMode) => {
    if (externalView && onViewChange) {
      // If external view is provided, call the callback to update parent
      const newViewMode = updater(viewMode);
      onViewChange({ mode: newViewMode.mode });
    } else {
      // Otherwise update internal state
      setInternalViewMode(updater);
    }
  };

  const [internalFilters, setInternalFilters] = useState<TimelineFilter>({
    types: ['all'],
    categories: ['all'],
    significance: ['critical', 'high', 'medium', 'low'],
    verificationStatus: ['verified', 'pending', 'corroborated', 'reported', 'alleged'],
    dateRange: {
      start: '1950-01-01',
      end: '2030-01-01'
    },
    entities: [],
    multimedia: ['all'],
    hasDocuments: false,
    hasGeographic: false
  });

  // Merge external filters with internal filters
  const filters = useMemo(() => {
    return externalFilters ? { ...internalFilters, ...externalFilters } : internalFilters;
  }, [externalFilters, internalFilters]);
  
  const setFilters = externalFilters ? () => {} : setInternalFilters;

  // Helper function to generate multimedia attachments for events
  const generateMultimediaForEvent = (event: TimelineEvent): MultimediaAttachment[] => {
    const attachments: MultimediaAttachment[] = [];
    
    // Add document attachments based on evidence
    if (event.evidence && event.evidence.length > 0) {
      event.evidence.forEach((evidenceId, index) => {
        const doc = coreDocuments.find(d => d.id === evidenceId);
        if (doc) {
          attachments.push({
            id: `${event.id}-doc-${index}`,
            type: 'document',
            url: doc.content?.fileName || '#',
            title: doc.title,
            description: doc.description,
            source: doc.sources?.[0]?.title || 'Unknown source',
            verified: doc.verificationStatus === 'verified'
          });
        }
      });
    }

    // Add mock media for high-significance events
    if (event.significance === 'critical' || event.significance === 'high') {
      // Mock photo for property-related events
      if (event.tags.includes('property') || event.tags.includes('real-estate')) {
        attachments.push({
          id: `${event.id}-img-property`,
          type: 'image',
          url: '/images/timeline/property-placeholder.jpg',
          title: `Property documentation for ${event.title}`,
          description: 'Property records and documentation',
          thumbnail: '/images/timeline/property-thumb.jpg',
          verified: true
        });
      }

      // Mock court documents for legal events
      if (event.type === 'legal' || event.tags.includes('court')) {
        attachments.push({
          id: `${event.id}-doc-court`,
          type: 'document',
          url: '/documents/court-records.pdf',
          title: `Court records for ${event.title}`,
          description: 'Official court documentation',
          verified: event.verificationStatus === 'verified'
        });
      }

      // Mock news footage for major events
      if (event.significance === 'critical') {
        attachments.push({
          id: `${event.id}-video-news`,
          type: 'video',
          url: '/videos/news-coverage.mp4',
          title: `News coverage of ${event.title}`,
          description: 'Contemporary news coverage',
          thumbnail: '/images/timeline/news-thumb.jpg',
          duration: 180,
          verified: true
        });
      }
    }

    return attachments;
  };

  // Helper function to get geographic data for events
  const getGeographicDataForEvent = (event: TimelineEvent): EnhancedTimelineEvent['geographicData'] => {
    // Look for location references in event entities
    const locationEntity = event.entities?.find(e => e.entityType === 'location');
    if (locationEntity) {
      const property = enhancedProperties.find(p => 
        p.name.toLowerCase().includes(locationEntity.entityId.toLowerCase()) ||
        locationEntity.entityId.includes(p.id)
      );
      if (property) {
        return {
          propertyId: property.id,
          coordinates: property.coordinates,
          address: property.address
        };
      }
    }

    // Default coordinates for key locations mentioned in events
    const locationMapping: Record<string, [number, number]> = {
      'palm-beach': [26.7056, -80.0364],
      'new-york': [40.7128, -74.0060],
      'little-st-james': [18.3001, -64.8251],
      manhattan: [40.7831, -73.9712],
      paris: [48.8566, 2.3522],
      london: [51.5074, -0.1278]
    };

    // Check event description and tags for location references
    const eventText = `${event.title} ${event.description} ${event.tags.join(' ')}`.toLowerCase();
    for (const [location, coords] of Object.entries(locationMapping)) {
      if (eventText.includes(location.replace('-', ' '))) {
        return {
          coordinates: coords,
          address: location.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())
        };
      }
    }

    return undefined;
  };

  // Enhanced event processing with multimedia integration
  const enhancedEvents = useMemo(() => {
    const enhanced = comprehensiveTimeline.map(event => {
      const enhancedEvent: EnhancedTimelineEvent = {
        ...event,
        // Mock multimedia attachments based on event characteristics
        multimedia: generateMultimediaForEvent(event),
        // Link to related documents
        linkedDocuments: coreDocuments.filter(doc => 
          doc.tags.some(tag => event.tags.includes(tag)) ||
          event.evidence?.includes(doc.id)
        ),
        // Geographic correlation
        geographicData: getGeographicDataForEvent(event),
        // Enhanced source attribution
        sourceDetails: {
          primarySource: event.sources?.[0]?.title || 'Multiple Sources',
          reliability: event.sources?.[0]?.reliability as 'high' | 'medium' | 'low' || 'medium',
          verificationLevel: event.verificationStatus as 'verified' | 'corroborated' | 'reported' | 'alleged'
        }
      };
      return enhancedEvent;
    });
    return enhanced;
  }, []);

  // Filter and process events
  const filteredEvents = useMemo(() => {
    const filtered = enhancedEvents.filter(event => {
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

      // Multimedia filter
      if (filters.multimedia.length && !filters.multimedia.includes('all')) {
        const hasRequestedMedia = event.multimedia?.some(media => 
          filters.multimedia.includes(media.type)
        );
        if (!hasRequestedMedia) return false;
      }

      // Document filter
      if (filters.hasDocuments && (!event.linkedDocuments || event.linkedDocuments.length === 0)) {
        return false;
      }

      // Geographic filter
      if (filters.hasGeographic && !event.geographicData) {
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
    });
    
    return filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [enhancedEvents, searchTerm, filters]);

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
      entities: [],
      multimedia: ['all'], // Added multimedia filter reset
      hasDocuments: false, // Added document filter reset
      hasGeographic: false // Added geographic filter reset
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

  // Zoom functions
  const zoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.1, 2.0));
  };

  const zoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.1, 0.5));
  };

  const resetZoom = () => {
    setZoomLevel(1);
  };

  // Navigation function (already exists - remove duplicate)
  // const navigateToDecade = (decade: number) => {
  //   setCurrentDecade(decade);
  // };

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
                onClick={() => setViewMode(prev => ({...prev, mode: 'network'}))}
                className={`p-2 ${viewMode.mode === 'network' ? 'bg-primary-100 dark:bg-primary-900' : ''} hover:bg-gray-100 dark:hover:bg-dark-700 border-x border-gray-300 dark:border-dark-600`}
                title="Network View"
              >
                <Link2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode(prev => ({...prev, mode: 'geographic'}))}
                className={`p-2 ${viewMode.mode === 'geographic' ? 'bg-primary-100 dark:bg-primary-900' : ''} hover:bg-gray-100 dark:hover:bg-dark-700 border-x border-gray-300 dark:border-dark-600`}
                title="Geographic View"
              >
                <MapPin className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode(prev => ({...prev, mode: 'multimedia'}))}
                className={`p-2 ${viewMode.mode === 'multimedia' ? 'bg-primary-100 dark:bg-primary-900' : ''} hover:bg-gray-100 dark:hover:bg-dark-700 border-x border-gray-300 dark:border-dark-600`}
                title="Multimedia View"
              >
                <ImageIcon className="w-4 h-4" />
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
              onChange={(e) => setViewMode(prev => ({...prev, groupBy: e.target.value as 'year' | 'month' | 'category' | 'significance'}))}
              className="px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500"
            >
              <option value="year">Group by Year</option>
              <option value="month">Group by Month</option>
              <option value="category">Group by Category</option>
              <option value="significance">Group by Significance</option>
            </select>

            {/* Zoom Controls */}
            <div className="flex items-center gap-1 border border-gray-300 dark:border-dark-600 rounded-lg">
              <button
                onClick={zoomOut}
                className="p-2 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-l-lg"
                title="Zoom Out"
                disabled={zoomLevel <= 0.5}
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="px-2 text-sm text-gray-600 dark:text-gray-400 border-x border-gray-300 dark:border-dark-600">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={zoomIn}
                className="p-2 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-r-lg"
                title="Zoom In"
                disabled={zoomLevel >= 2.0}
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>

            {/* Reset Zoom */}
            <button
              onClick={resetZoom}
              className="p-2 border border-gray-300 dark:border-dark-600 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700"
              title="Reset Zoom to 100%"
            >
              <Search className="w-4 h-4" />
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

      {/* Quick Filters Bar - Streamlined horizontal filter controls */}
      <div className="border-b border-gray-200 dark:border-dark-700 px-4 py-3 bg-gray-50 dark:bg-dark-800">
        <div className="flex flex-wrap items-center gap-4">
          {/* Search Filter */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-1 text-sm border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent w-64"
            />
          </div>

          {/* Quick Category Filters */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Categories:</span>
            {['all', 'financial', 'political', 'criminal', 'social', 'other'].map(category => (
              <button
                key={category}
                onClick={() => {
                  if (category === 'all') {
                    setFilters(prev => ({ ...prev, categories: ['all'] }));
                  } else {
                    setFilters(prev => ({
                      ...prev,
                      categories: prev.categories.includes('all') 
                        ? [category] 
                        : prev.categories.includes(category)
                          ? prev.categories.filter(c => c !== category)
                          : [...prev.categories.filter(c => c !== 'all'), category]
                    }));
                  }
                }}
                className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                  filters.categories.includes(category) || (category === 'all' && filters.categories.includes('all'))
                    ? 'bg-primary-100 dark:bg-primary-900 border-primary-300 dark:border-primary-700 text-primary-700 dark:text-primary-300'
                    : 'bg-white dark:bg-dark-700 border-gray-300 dark:border-dark-600 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-600'
                }`}
              >
                {category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {/* Quick Significance Filters */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Significance:</span>
            {['critical', 'high', 'medium', 'low'].map(significance => (
              <button
                key={significance}
                onClick={() => {
                  setFilters(prev => ({
                    ...prev,
                    significance: prev.significance.includes(significance)
                      ? prev.significance.filter(s => s !== significance)
                      : [...prev.significance, significance]
                  }));
                }}
                className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                  filters.significance.includes(significance)
                    ? 'bg-primary-100 dark:bg-primary-900 border-primary-300 dark:border-primary-700 text-primary-700 dark:text-primary-300'
                    : 'bg-white dark:bg-dark-700 border-gray-300 dark:border-dark-600 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-600'
                }`}
              >
                {significance.charAt(0).toUpperCase() + significance.slice(1)}
              </button>
            ))}
          </div>

          {/* Active Filter Count and Reset */}
          <div className="ml-auto flex items-center gap-3">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {filteredEvents.length} of {enhancedEvents.length} events
            </span>
            <button
              onClick={resetFilters}
              className="px-3 py-1 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 border border-gray-300 dark:border-dark-600 rounded-full hover:bg-gray-100 dark:hover:bg-dark-600 transition-colors"
              title="Reset All Filters"
            >
              Clear Filters
            </button>
            <button
              onClick={() => setShowFilterPanel(!showFilterPanel)}
              className={`px-3 py-1 text-xs border rounded-full transition-colors ${
                showFilterPanel 
                  ? 'bg-primary-100 dark:bg-primary-900 border-primary-300 dark:border-primary-700 text-primary-700 dark:text-primary-300'
                  : 'bg-white dark:bg-dark-700 border-gray-300 dark:border-dark-600 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-600'
              }`}
            >
              Advanced Filters
            </button>
          </div>
        </div>
      </div>

      {/* Advanced Filters Panel - Detailed filter controls */}
      {showFilterPanel && (
        <div className="border-b border-gray-200 dark:border-dark-700 p-4 bg-gray-50 dark:bg-dark-800">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Event Types */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Event Types
              </label>
              <div className="space-y-2">
                {['all', 'legal', 'business', 'media', 'meeting', 'investigation'].map(type => (
                  <label key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.types.includes(type)}
                      onChange={(e) => {
                        if (type === 'all') {
                          setFilters(prev => ({ ...prev, types: e.target.checked ? ['all'] : [] }));
                        } else {
                          setFilters(prev => ({
                            ...prev,
                            types: e.target.checked
                              ? [...prev.types.filter(t => t !== 'all'), type]
                              : prev.types.filter(t => t !== type)
                          }));
                        }
                      }}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300 capitalize">
                      {type === 'all' ? 'All Types' : type}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Verification Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Verification Status
              </label>
              <div className="space-y-2">
                {['verified', 'corroborated', 'reported', 'alleged'].map(status => (
                  <label key={status} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.verificationStatus.includes(status)}
                      onChange={(e) => {
                        setFilters(prev => ({
                          ...prev,
                          verificationStatus: e.target.checked
                            ? [...prev.verificationStatus, status]
                            : prev.verificationStatus.filter(s => s !== status)
                        }));
                      }}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300 capitalize">
                      {status}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Content Features */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Content Features
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.hasDocuments}
                    onChange={(e) => setFilters(prev => ({ ...prev, hasDocuments: e.target.checked }))}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    Has Documents
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.hasGeographic}
                    onChange={(e) => setFilters(prev => ({ ...prev, hasGeographic: e.target.checked }))}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    Has Geographic Data
                  </span>
                </label>
              </div>
            </div>

            {/* Date Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Date Range
              </label>
              <div className="space-y-2">
                <input
                  type="date"
                  value={filters.dateRange.start}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    dateRange: { ...prev.dateRange, start: e.target.value }
                  }))}
                  className="w-full px-3 py-1 border border-gray-300 dark:border-dark-600 rounded text-sm bg-white dark:bg-dark-800 text-gray-900 dark:text-gray-100"
                />
                <input
                  type="date"
                  value={filters.dateRange.end}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    dateRange: { ...prev.dateRange, end: e.target.value }
                  }))}
                  className="w-full px-3 py-1 border border-gray-300 dark:border-dark-600 rounded text-sm bg-white dark:bg-dark-800 text-gray-900 dark:text-gray-100"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex">
        {/* Timeline Content */}
        <div 
          ref={timelineRef}
          className="flex-1 overflow-y-auto" 
          style={{ 
            maxHeight: '80vh',
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'top left'
          }}
        >
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

                    {events.map((event, _index) => {
                      const enhancedEvent = enhancedEvents.find(e => e.id === event.id) as EnhancedTimelineEvent;
                      return (
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
                                
                                {/* Multimedia indicators */}
                                <div className="flex items-center gap-1">
                                  {enhancedEvent?.multimedia?.some(m => m.type === 'image') && (
                                    <div title="Contains images">
                                      <ImageIcon className="w-4 h-4 text-purple-600" />
                                    </div>
                                  )}
                                  {enhancedEvent?.multimedia?.some(m => m.type === 'video') && (
                                    <div title="Contains video">
                                      <Video className="w-4 h-4 text-red-600" />
                                    </div>
                                  )}
                                  {enhancedEvent?.multimedia?.some(m => m.type === 'document') && (
                                    <div title="Contains documents">
                                      <FileText className="w-4 h-4 text-blue-600" />
                                    </div>
                                  )}
                                  {enhancedEvent?.geographicData && (
                                    <div title="Has geographic data">
                                      <MapPin className="w-4 h-4 text-green-600" />
                                    </div>
                                  )}
                                  {enhancedEvent?.linkedDocuments && enhancedEvent.linkedDocuments.length > 0 && (
                                    <div title={`${enhancedEvent.linkedDocuments.length} linked documents`}>
                                      <Link2 className="w-4 h-4 text-orange-600" />
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="text-sm text-gray-500 dark:text-gray-500">
                                  {formatDate(event.date)}
                                </div>
                                
                                {/* Source reliability indicator */}
                                {enhancedEvent?.sourceDetails && (
                                  <div className={`w-3 h-3 rounded-full ${
                                    enhancedEvent.sourceDetails.reliability === 'high' ? 'bg-green-500' :
                                    enhancedEvent.sourceDetails.reliability === 'medium' ? 'bg-yellow-500' :
                                    'bg-red-500'
                                  }`} title={`Source reliability: ${enhancedEvent.sourceDetails.reliability}`} />
                                )}
                              </div>
                            </div>

                            <h4 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100">
                              {event.title}
                            </h4>

                            <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                              {event.description}
                            </p>

                            {/* Enhanced multimedia preview */}
                            {enhancedEvent?.multimedia && enhancedEvent.multimedia.length > 0 && (
                              <div className="mb-4">
                                <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                                  Media ({enhancedEvent.multimedia.length}):
                                </div>
                                <div className="flex gap-2 overflow-x-auto">
                                  {enhancedEvent.multimedia.slice(0, 3).map(media => (
                                    <div
                                      key={media.id}
                                      className="flex-shrink-0 w-16 h-16 bg-gray-100 dark:bg-dark-700 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedMediaItem(media);
                                        setShowMediaViewer(true);
                                      }}
                                      title={media.title}
                                    >
                                      {media.type === 'image' && <ImageIcon className="w-6 h-6 text-purple-600" />}
                                      {media.type === 'video' && <Video className="w-6 h-6 text-red-600" />}
                                      {media.type === 'document' && <FileText className="w-6 h-6 text-blue-600" />}
                                      {media.type === 'audio' && <Mic className="w-6 h-6 text-green-600" />}
                                    </div>
                                  ))}
                                  {enhancedEvent.multimedia.length > 3 && (
                                    <div className="flex-shrink-0 w-16 h-16 bg-gray-100 dark:bg-dark-700 rounded-lg flex items-center justify-center text-xs font-medium text-gray-600 dark:text-gray-400">
                                      +{enhancedEvent.multimedia.length - 3}
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}

                            {/* Geographic information */}
                            {enhancedEvent?.geographicData && (
                              <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                                <div className="flex items-center gap-2 mb-1">
                                  <MapPin className="w-4 h-4 text-green-600" />
                                  <span className="text-sm font-medium text-green-800 dark:text-green-300">
                                    Location Data
                                  </span>
                                </div>
                                <div className="text-sm text-green-700 dark:text-green-400">
                                  {enhancedEvent.geographicData.address}
                                  {enhancedEvent.geographicData.coordinates && (
                                    <span className="ml-2 text-xs opacity-70">
                                      ({enhancedEvent.geographicData.coordinates.join(', ')})
                                    </span>
                                  )}
                                </div>
                                <button 
                                  className="text-xs text-green-600 hover:text-green-800 mt-1 flex items-center gap-1"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setShowGeographicInfo(true);
                                  }}
                                >
                                  <Globe className="w-3 h-3" />
                                  View on map
                                </button>
                              </div>
                            )}

                            {/* Enhanced source attribution */}
                            {enhancedEvent?.sourceDetails && (
                              <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                                <div className="flex items-center gap-2 mb-1">
                                  <ExternalLink className="w-4 h-4 text-blue-600" />
                                  <span className="text-sm font-medium text-blue-800 dark:text-blue-300">
                                    Primary Source
                                  </span>
                                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                                    enhancedEvent.sourceDetails.reliability === 'high' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                                    enhancedEvent.sourceDetails.reliability === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                                    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                  }`}>
                                    {enhancedEvent.sourceDetails.reliability}
                                  </span>
                                </div>
                                <div className="text-sm text-blue-700 dark:text-blue-400">
                                  {enhancedEvent.sourceDetails.primarySource}
                                </div>
                                <div className="text-xs text-blue-600 dark:text-blue-500 mt-1">
                                  Verification: {enhancedEvent.sourceDetails.verificationLevel}
                                </div>
                              </div>
                            )}

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

                            {/* Linked documents */}
                            {enhancedEvent?.linkedDocuments && enhancedEvent.linkedDocuments.length > 0 && (
                              <div className="mb-4">
                                <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                                  Linked Documents ({enhancedEvent.linkedDocuments.length}):
                                </div>
                                <div className="space-y-1">
                                  {enhancedEvent.linkedDocuments.slice(0, 2).map(doc => (
                                    <div 
                                      key={doc.id} 
                                      className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 cursor-pointer"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setShowDocumentPanel(true);
                                      }}
                                    >
                                      <FileText className="w-4 h-4" />
                                      <span className="truncate">{doc.title}</span>
                                      {doc.verificationStatus === 'verified' && (
                                        <span className="text-green-600 text-xs">✓</span>
                                      )}
                                    </div>
                                  ))}
                                  {enhancedEvent.linkedDocuments.length > 2 && (
                                    <div className="text-sm text-gray-500">
                                      +{enhancedEvent.linkedDocuments.length - 2} more documents
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}

                            {/* Related events preview */}
                            {event.relatedEvents.length > 0 && (
                              <div className="text-sm text-gray-500 dark:text-gray-500 mb-3">
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

                            {/* Action buttons */}
                            <div className="flex items-center gap-2 mt-4 pt-3 border-t border-gray-200 dark:border-dark-700">
                              <button 
                                className="flex items-center gap-1 px-3 py-1 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedEvent(event);
                                }}
                              >
                                <Eye className="w-4 h-4" />
                                Details
                              </button>
                              {enhancedEvent?.multimedia && enhancedEvent.multimedia.length > 0 && (
                                <button 
                                  className="flex items-center gap-1 px-3 py-1 text-sm text-purple-600 hover:text-purple-800 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded transition-colors"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedMediaItem(enhancedEvent.multimedia![0]);
                                    setShowMediaViewer(true);
                                  }}
                                >
                                  <ImageIcon className="w-4 h-4" />
                                  Media
                                </button>
                              )}
                              {enhancedEvent?.geographicData && (
                                <button 
                                  className="flex items-center gap-1 px-3 py-1 text-sm text-green-600 hover:text-green-800 hover:bg-green-50 dark:hover:bg-green-900/20 rounded transition-colors"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setShowGeographicInfo(true);
                                  }}
                                >
                                  <MapPin className="w-4 h-4" />
                                  Map
                                </button>
                              )}
                              <button 
                                className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 rounded transition-colors"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  // Copy event link to clipboard
                                  navigator.clipboard.writeText(`${window.location.origin}/timeline#${event.id}`);
                                }}
                              >
                                <Share className="w-4 h-4" />
                                Share
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )})}
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

          {viewMode.mode === 'multimedia' && (
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  Multimedia Timeline View
                </h3>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Focus on events with multimedia evidence, documents, and geographic data
                </div>
              </div>

              {/* Multimedia statistics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <ImageIcon className="w-5 h-5 text-purple-600" />
                    <span className="text-sm font-medium text-purple-800 dark:text-purple-300">Images</span>
                  </div>
                  <div className="text-2xl font-bold text-purple-900 dark:text-purple-200">
                    {enhancedEvents.reduce((acc, event) => acc + (event.multimedia?.filter(m => m.type === 'image').length || 0), 0)}
                  </div>
                </div>
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Video className="w-5 h-5 text-red-600" />
                    <span className="text-sm font-medium text-red-800 dark:text-red-300">Videos</span>
                  </div>
                  <div className="text-2xl font-bold text-red-900 dark:text-red-200">
                    {enhancedEvents.reduce((acc, event) => acc + (event.multimedia?.filter(m => m.type === 'video').length || 0), 0)}
                  </div>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800 dark:text-blue-300">Documents</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-900 dark:text-blue-200">
                    {enhancedEvents.reduce((acc, event) => acc + (event.linkedDocuments?.length || 0), 0)}
                  </div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-green-800 dark:text-green-300">Locations</span>
                  </div>
                  <div className="text-2xl font-bold text-green-900 dark:text-green-200">
                    {enhancedEvents.filter(event => event.geographicData).length}
                  </div>
                </div>
              </div>

              {/* Rich media events */}
              <div className="space-y-6">
                {filteredEvents
                  .map(event => enhancedEvents.find(e => e.id === event.id))
                  .filter(event => event && (
                    (event.multimedia && event.multimedia.length > 0) ||
                    (event.linkedDocuments && event.linkedDocuments.length > 0) ||
                    event.geographicData
                  ))
                  .map(event => {
                    if (!event) return null;
                    return (
                      <div key={event.id} className="evidence-card p-6">
                        <div className="flex items-start gap-6">
                          {/* Media preview column */}
                          <div className="w-48 flex-shrink-0">
                            {event.multimedia && event.multimedia.length > 0 && (
                              <div className="space-y-3">
                                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                  Media ({event.multimedia.length})
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                  {event.multimedia.slice(0, 4).map(media => (
                                    <div
                                      key={media.id}
                                      className="aspect-square bg-gray-100 dark:bg-dark-700 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors"
                                      onClick={() => {
                                        setSelectedMediaItem(media);
                                        setShowMediaViewer(true);
                                      }}
                                      title={media.title}
                                    >
                                      {media.type === 'image' && <ImageIcon className="w-6 h-6 text-purple-600" />}
                                      {media.type === 'video' && <Video className="w-6 h-6 text-red-600" />}
                                      {media.type === 'document' && <FileText className="w-6 h-6 text-blue-600" />}
                                      {media.type === 'audio' && <Mic className="w-6 h-6 text-green-600" />}
                                    </div>
                                  ))}
                                </div>
                                {event.multimedia.length > 4 && (
                                  <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                                    +{event.multimedia.length - 4} more
                                  </div>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Event details column */}
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1">
                                  {event.title}
                                </h4>
                                <div className="flex items-center gap-3 text-sm">
                                  <span className="text-gray-500 dark:text-gray-400">
                                    {formatDate(event.date)}
                                  </span>
                                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                                    event.significance === 'critical' ? 'bg-red-100 text-red-800' :
                                    event.significance === 'high' ? 'bg-orange-100 text-orange-800' :
                                    event.significance === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-blue-100 text-blue-800'
                                  }`}>
                                    {event.significance}
                                  </span>
                                </div>
                              </div>
                              
                              {/* Enhanced indicators */}
                              <div className="flex items-center gap-2">
                                {event.linkedDocuments && event.linkedDocuments.length > 0 && (
                                  <div className="flex items-center gap-1 px-2 py-1 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                                    <FileText className="w-3 h-3 text-blue-600" />
                                    <span className="text-xs text-blue-800 dark:text-blue-300">
                                      {event.linkedDocuments.length} docs
                                    </span>
                                  </div>
                                )}
                                {event.geographicData && (
                                  <div className="flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/20 rounded-full">
                                    <MapPin className="w-3 h-3 text-green-600" />
                                    <span className="text-xs text-green-800 dark:text-green-300">
                                      Location
                                    </span>
                                  </div>
                                )}
                                {event.sourceDetails && (
                                  <div className={`w-3 h-3 rounded-full ${
                                    event.sourceDetails.reliability === 'high' ? 'bg-green-500' :
                                    event.sourceDetails.reliability === 'medium' ? 'bg-yellow-500' :
                                    'bg-red-500'
                                  }`} title={`Source reliability: ${event.sourceDetails.reliability}`} />
                                )}
                              </div>
                            </div>

                            <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                              {event.description}
                            </p>

                            {/* Action buttons */}
                            <div className="flex items-center gap-3">
                              <button 
                                className="flex items-center gap-1 px-3 py-1 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors"
                                onClick={() => setSelectedEvent(event)}
                              >
                                <Eye className="w-4 h-4" />
                                View Details
                              </button>
                              {event.multimedia && event.multimedia.length > 0 && (
                                <button 
                                  className="flex items-center gap-1 px-3 py-1 text-sm text-purple-600 hover:text-purple-800 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded transition-colors"
                                  onClick={() => {
                                    setSelectedMediaItem(event.multimedia![0]);
                                    setShowMediaViewer(true);
                                  }}
                                >
                                  <ImageIcon className="w-4 h-4" />
                                  View Media
                                </button>
                              )}
                              {event.geographicData && (
                                <button 
                                  className="flex items-center gap-1 px-3 py-1 text-sm text-green-600 hover:text-green-800 hover:bg-green-50 dark:hover:bg-green-900/20 rounded transition-colors"
                                  onClick={() => {
                                    setSelectedEvent(event);
                                    setShowGeographicInfo(true);
                                  }}
                                >
                                  <MapPin className="w-4 h-4" />
                                  Location
                                </button>
                              )}
                              {event.linkedDocuments && event.linkedDocuments.length > 0 && (
                                <button 
                                  className="flex items-center gap-1 px-3 py-1 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors"
                                  onClick={() => {
                                    setSelectedEvent(event);
                                    setShowDocumentPanel(true);
                                  }}
                                >
                                  <FileText className="w-4 h-4" />
                                  Documents
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>

              {/* If no multimedia events */}
              {filteredEvents
                .map(event => enhancedEvents.find(e => e.id === event.id))
                .filter(event => event && (
                  (event.multimedia && event.multimedia.length > 0) ||
                  (event.linkedDocuments && event.linkedDocuments.length > 0) ||
                  event.geographicData
                )).length === 0 && (
                <div className="text-center py-12">
                  <ImageIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">
                    No Multimedia Events Found
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    Try adjusting your filters to see events with multimedia attachments, documents, or geographic data.
                  </p>
                </div>
              )}
            </div>
          )}

          {viewMode.mode === 'thematic' && (
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  Thematic Timeline View
                </h3>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Events organized by themes and categories
                </div>
              </div>

              {/* Group events by categories and themes */}
              {(() => {
                const thematicGroups: Record<string, TimelineEvent[]> = {};
                
                filteredEvents.forEach((event) => {
                  // Group by type as primary theme
                  const theme = event.type.charAt(0).toUpperCase() + event.type.slice(1);
                  if (!thematicGroups[theme]) {
                    thematicGroups[theme] = [];
                  }
                  thematicGroups[theme].push(event);
                });

                // Sort themes by event count
                const sortedThemes = Object.entries(thematicGroups)
                  .sort(([,a], [,b]) => b.length - a.length);

                return sortedThemes.map(([theme, themeEvents]) => (
                  <div key={theme} className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {theme}
                      </h4>
                      <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300">
                        {themeEvents.length} events
                      </span>
                    </div>
                    
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {themeEvents
                        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                        .map((event) => (
                        <div
                          key={event.id}
                          className="evidence-card p-4 cursor-pointer hover:shadow-lg transition-shadow"
                          onClick={() => {
                            setSelectedEvent(event);
                            onEventSelect?.(event);
                          }}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-1 line-clamp-2">
                                {event.title}
                              </h5>
                              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                {new Date(event.date).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </div>
                            </div>
                            <div className="ml-2 flex flex-col items-end gap-1">
                              {event.significance && (
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  event.significance === 'critical' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                                  event.significance === 'high' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
                                  event.significance === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                                  'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                }`}>
                                  {event.significance}
                                </span>
                              )}
                              {event.verificationStatus === 'verified' && (
                                <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-xs font-medium">
                                  Verified
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 mb-3">
                            {event.description}
                          </p>
                          
                          {/* Event indicators */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
                              {event.entities.length > 0 && (
                                <span className="flex items-center gap-1">
                                  <User className="w-3 h-3" />
                                  {event.entities.length}
                                </span>
                              )}
                              {event.evidence?.length > 0 && (
                                <span className="flex items-center gap-1">
                                  <FileText className="w-3 h-3" />
                                  {event.evidence.length}
                                </span>
                              )}
                              {event.sources?.length > 0 && (
                                <span className="flex items-center gap-1">
                                  <ExternalLink className="w-3 h-3" />
                                  {event.sources.length}
                                </span>
                              )}
                            </div>
                            
                            <div className="flex items-center gap-1">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                event.category === 'criminal' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                                event.category === 'civil' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                                event.category === 'financial' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                                event.category === 'political' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
                                'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                              }`}>
                                {event.category}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ));
              })()}

              {filteredEvents.length === 0 && (
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">
                    No Events Found
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    Try adjusting your filters to see more events organized by themes.
                  </p>
                </div>
              )}
            </div>
          )}

          {viewMode.mode === 'network' && (
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  Network Analysis View
                </h3>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Visualizing connections between people, events, and entities
                </div>
              </div>

              {/* Network Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800 dark:text-blue-300">Total People</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-900 dark:text-blue-200">
                    {new Set(filteredEvents.flatMap(e => e.entities.map(ent => ent.entityId))).size}
                  </div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Link2 className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-green-800 dark:text-green-300">Connections</span>
                  </div>
                  <div className="text-2xl font-bold text-green-900 dark:text-green-200">
                    {filteredEvents.reduce((acc, event) => acc + event.entities.length, 0)}
                  </div>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-5 h-5 text-purple-600" />
                    <span className="text-sm font-medium text-purple-800 dark:text-purple-300">Events</span>
                  </div>
                  <div className="text-2xl font-bold text-purple-900 dark:text-purple-200">
                    {filteredEvents.length}
                  </div>
                </div>
              </div>

              {/* Network Visualization Area */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden h-[700px]">
                <NetworkVisualization 
                  events={filteredEvents} 
                  width={1000} 
                  height={700} 
                  onNodeSelect={setSelectedNetworkNode}
                />
              </div>

              {/* Key Players */}
              <div className="mt-8">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Key Players in Network
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {(() => {
                    const entityCount: Record<string, number> = {};
                    filteredEvents.forEach(event => {
                      event.entities.forEach(entity => {
                        entityCount[entity.entityId] = (entityCount[entity.entityId] || 0) + 1;
                      });
                    });
                    
                    return Object.entries(entityCount)
                      .sort(([,a], [,b]) => b - a)
                      .slice(0, 6)
                      .map(([entityId, count]) => {
                        const person = corePeople.find(p => p.id === entityId);
                        return person ? (
                          <div key={entityId} className="evidence-card p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h5 className="font-medium text-gray-900 dark:text-gray-100">
                                {person.name}
                              </h5>
                              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 text-xs rounded-full font-medium">
                                {count} events
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                              {person.biography}
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {person.aliases.map(alias => (
                                <span key={alias} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded">
                                  {alias}
                                </span>
                              ))}
                            </div>
                          </div>
                        ) : null;
                      });
                  })()}
                </div>
              </div>
            </div>
          )}

          {viewMode.mode === 'geographic' && (
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  Geographic Timeline View
                </h3>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Events plotted by location and geographic significance
                </div>
              </div>

              {/* Geographic Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-green-800 dark:text-green-300">Locations</span>
                  </div>
                  <div className="text-2xl font-bold text-green-900 dark:text-green-200">
                    {enhancedEvents.filter(event => event.geographicData).length}
                  </div>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Globe className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800 dark:text-blue-300">Countries</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-900 dark:text-blue-200">
                    {new Set(
                      enhancedEvents
                        .filter(event => event.geographicData?.address)
                        .map(event => {
                          const address = event.geographicData?.address;
                          return address ? address.split(',').pop()?.trim() : null;
                        })
                        .filter(Boolean)
                    ).size}
                  </div>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-5 h-5 text-purple-600" />
                    <span className="text-sm font-medium text-purple-800 dark:text-purple-300">Geo Events</span>
                  </div>
                  <div className="text-2xl font-bold text-purple-900 dark:text-purple-200">
                    {filteredEvents.filter(event => 
                      enhancedEvents.find(e => e.id === event.id)?.geographicData
                    ).length}
                  </div>
                </div>
                <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-5 h-5 text-orange-600" />
                    <span className="text-sm font-medium text-orange-800 dark:text-orange-300">Properties</span>
                  </div>
                  <div className="text-2xl font-bold text-orange-900 dark:text-orange-200">
                    {enhancedEvents.filter(event => event.geographicData?.propertyId).length}
                  </div>
                </div>
              </div>

              {/* Map Area */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 min-h-[400px] flex items-center justify-center mb-8">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                    <MapPin className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">
                    Interactive Geographic Map
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-500 max-w-md">
                    Interactive map showing timeline events plotted by location with clustering,
                    timeline scrubbing, and detailed property information.
                  </p>
                </div>
              </div>

              {/* Geographic Events List */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  Events with Geographic Data
                </h4>
                <div className="space-y-4">
                  {filteredEvents
                    .map(event => enhancedEvents.find(e => e.id === event.id))
                    .filter(event => event?.geographicData)
                    .map(event => {
                      if (!event) return null;
                      return (
                        <div key={event.id} className="evidence-card p-4">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                              <MapPin className="w-6 h-6 text-green-600" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h5 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                                    {event.title}
                                  </h5>
                                  <div className="text-sm text-gray-600 dark:text-gray-400">
                                    {formatDate(event.date)}
                                  </div>
                                </div>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  event.significance === 'critical' ? 'bg-red-100 text-red-800' :
                                  event.significance === 'high' ? 'bg-orange-100 text-orange-800' :
                                  event.significance === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-green-100 text-green-800'
                                }`}>
                                  {event.significance}
                                </span>
                              </div>
                              
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                {event.description}
                              </p>
                              
                              {event.geographicData && (
                                <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg mb-3">
                                  <div className="flex items-center gap-2 mb-2">
                                    <MapPin className="w-4 h-4 text-green-600" />
                                    <span className="text-sm font-medium text-green-800 dark:text-green-300">
                                      Location Details
                                    </span>
                                  </div>
                                  <div className="text-sm text-green-700 dark:text-green-400">
                                    <div><strong>Address:</strong> {event.geographicData.address}</div>
                                    {event.geographicData.coordinates && (
                                      <div><strong>Coordinates:</strong> {event.geographicData.coordinates.join(', ')}</div>
                                    )}
                                    {event.geographicData.propertyId && (
                                      <div><strong>Property ID:</strong> {event.geographicData.propertyId}</div>
                                    )}
                                  </div>
                                </div>
                              )}
                              
                              <div className="flex items-center gap-3">
                                <button 
                                  className="flex items-center gap-1 px-3 py-1 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors"
                                  onClick={() => setSelectedEvent(event)}
                                >
                                  <Eye className="w-4 h-4" />
                                  View Details
                                </button>
                                <button 
                                  className="flex items-center gap-1 px-3 py-1 text-sm text-green-600 hover:text-green-800 hover:bg-green-50 dark:hover:bg-green-900/20 rounded transition-colors"
                                  onClick={() => {
                                    setSelectedEvent(event);
                                    setShowGeographicInfo(true);
                                  }}
                                >
                                  <Globe className="w-4 h-4" />
                                  Open in Maps
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>

                {filteredEvents
                  .map(event => enhancedEvents.find(e => e.id === event.id))
                  .filter(event => event?.geographicData).length === 0 && (
                  <div className="text-center py-12">
                    <MapPin className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">
                      No Geographic Events Found
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                      Try adjusting your filters to see events with location data.
                    </p>
                  </div>
                )}
              </div>
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
        {showFilterPanel && (
          <div className="w-80 bg-white dark:bg-dark-800 border-l border-gray-200 dark:border-dark-700 p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Filters</h3>
              <button
                onClick={() => setShowFilterPanel(false)}
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

        {/* Network Node Detail Panel */}
        {selectedNetworkNode && (
          <div className="w-96 bg-white dark:bg-dark-800 border-l border-gray-200 dark:border-dark-700 p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                {selectedNetworkNode.type === 'person' ? 'Person Details' : 'Event Details'}
              </h3>
              <button
                onClick={() => setSelectedNetworkNode(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {selectedNetworkNode.name}
                </h4>
                <div className="flex items-center gap-2 mb-4">
                  <span className={`px-3 py-1 rounded text-sm font-medium ${
                    selectedNetworkNode.significance === 'critical' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                    selectedNetworkNode.significance === 'high' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
                    selectedNetworkNode.significance === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                    'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                  }`}>
                    {selectedNetworkNode.significance?.toUpperCase() || 'UNKNOWN'}
                  </span>
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded-full capitalize">
                    {selectedNetworkNode.type}
                  </span>
                  {selectedNetworkNode.eventType && (
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs rounded-full capitalize">
                      {selectedNetworkNode.eventType}
                    </span>
                  )}
                </div>
              </div>

              {/* Person-specific details */}
              {selectedNetworkNode.type === 'person' && (() => {
                const person = corePeople.find(p => p.id === selectedNetworkNode.id);
                if (!person) return (
                  <div className="text-center text-gray-500 dark:text-gray-400">
                    <p>Person data not found.</p>
                  </div>
                );
                
                const connectedEvents = filteredEvents.filter(e => e.entities.some(ent => ent.entityId === selectedNetworkNode.id));
                
                return (
                  <>
                    <div>
                      <h5 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Personal Information</h5>
                      <div className="space-y-2 text-sm">
                        <div><strong>Name:</strong> {person.name}</div>
                        <div><strong>Significance:</strong> {person.significance}</div>
                        <div><strong>Connected Events:</strong> {connectedEvents.length}</div>
                        <div><strong>Network Influence:</strong> {selectedNetworkNode.size}px</div>
                      </div>
                    </div>

                    <div>
                      <h5 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Biography</h5>
                      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                        {person.biography || 'No biography available.'}
                      </p>
                    </div>

                    {person.aliases && person.aliases.length > 0 && (
                      <div>
                        <h5 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Known Aliases</h5>
                        <div className="flex flex-wrap gap-1">
                          {person.aliases.map(alias => (
                            <span key={alias} className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded text-xs">
                              {alias}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {connectedEvents.length > 0 && (
                      <div>
                        <h5 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Connected Events</h5>
                        <div className="space-y-2">
                          {connectedEvents.slice(0, 5).map(event => {
                            const entity = event.entities.find(e => e.entityId === selectedNetworkNode.id);
                            return (
                              <button
                                key={event.id}
                                onClick={() => setSelectedEvent(event)}
                                className="w-full text-left p-2 bg-gray-50 dark:bg-dark-700 rounded hover:bg-gray-100 dark:hover:bg-dark-600 transition-colors"
                              >
                                <div className="font-medium text-sm">{event.title}</div>
                                <div className="text-xs text-gray-600 dark:text-gray-400 flex items-center justify-between">
                                  <span>{formatDate(event.date)}</span>
                                  <span className="capitalize">{entity?.role || 'Unknown role'}</span>
                                </div>
                              </button>
                            );
                          })}
                          {connectedEvents.length > 5 && (
                            <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                              +{connectedEvents.length - 5} more events
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    <div>
                      <h5 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Event Categories</h5>
                      <div className="flex flex-wrap gap-1">
                        {Array.from(new Set(connectedEvents.map(e => e.category))).map(category => (
                          <span
                            key={category}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs capitalize"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    </div>
                  </>
                );
              })()}

              {/* Event-specific details */}
              {selectedNetworkNode.type === 'event' && (() => {
                const event = filteredEvents.find(e => e.id === selectedNetworkNode.id);
                if (!event) return (
                  <div className="text-center text-gray-500 dark:text-gray-400">
                    <p>Event data not found.</p>
                  </div>
                );
                
                return (
                  <>
                    <div>
                      <h5 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Date & Type</h5>
                      <div className="space-y-2 text-sm">
                        <div><strong>Date:</strong> {formatDate(event.date)}</div>
                        <div><strong>Type:</strong> {event.type}</div>
                        <div><strong>Category:</strong> {event.category}</div>
                        <div><strong>Verification:</strong> {event.verificationStatus}</div>
                      </div>
                    </div>

                    <div>
                      <h5 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Description</h5>
                      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                        {event.description}
                      </p>
                    </div>

                    {event.entities.length > 0 && (
                      <div>
                        <h5 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">People Involved</h5>
                        <div className="space-y-2">
                          {event.entities.map(entity => {
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

                    {event.consequences.length > 0 && (
                      <div>
                        <h5 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Consequences</h5>
                        <ul className="space-y-1 text-sm">
                          {event.consequences.map((consequence, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-primary-600 mt-1">•</span>
                              {consequence}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {event.relatedEvents.length > 0 && (
                      <div>
                        <h5 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Related Events</h5>
                        <div className="space-y-2">
                          {getRelatedEvents(event.id).slice(0, 3).map(relatedEvent => (
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

                    {event.sources.length > 0 && (
                      <div>
                        <h5 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Sources</h5>
                        <div className="space-y-2">
                          {event.sources.map((source, index) => (
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
                        {event.tags.map(tag => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        )}
      </div>

      {/* Multimedia Viewer Modal */}
      {showMediaViewer && selectedMediaItem && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-dark-800 rounded-lg max-w-4xl max-h-[90vh] w-full overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-dark-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                {selectedMediaItem.title}
              </h3>
              <button
                onClick={() => setShowMediaViewer(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              {selectedMediaItem.type === 'image' && (
                <div className="text-center">
                  <div className="w-full h-96 bg-gray-100 dark:bg-dark-700 rounded-lg flex items-center justify-center mb-4">
                    <ImageIcon className="w-24 h-24 text-gray-400" />
                    <div className="ml-4 text-gray-600 dark:text-gray-400">
                      <div className="font-medium">Image Preview</div>
                      <div className="text-sm">{selectedMediaItem.description}</div>
                    </div>
                  </div>
                  {selectedMediaItem.verified && (
                    <div className="flex items-center justify-center gap-2 text-green-600">
                      <Star className="w-4 h-4" />
                      <span className="text-sm">Verified Source</span>
                    </div>
                  )}
                </div>
              )}
              
              {selectedMediaItem.type === 'video' && (
                <div className="text-center">
                  <div className="w-full h-96 bg-gray-100 dark:bg-dark-700 rounded-lg flex items-center justify-center mb-4">
                    <Video className="w-24 h-24 text-gray-400" />
                    <div className="ml-4 text-gray-600 dark:text-gray-400">
                      <div className="font-medium">Video Content</div>
                      <div className="text-sm">{selectedMediaItem.description}</div>
                      {selectedMediaItem.duration && (
                        <div className="text-xs mt-1">Duration: {Math.floor(selectedMediaItem.duration / 60)}:{(selectedMediaItem.duration % 60).toString().padStart(2, '0')}</div>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-center gap-4">
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      <Play className="w-4 h-4" />
                      Play Video
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
                      <Volume2 className="w-4 h-4" />
                      Audio
                    </button>
                  </div>
                </div>
              )}
              
              {selectedMediaItem.type === 'document' && (
                <div className="text-center">
                  <div className="w-full h-96 bg-gray-100 dark:bg-dark-700 rounded-lg flex items-center justify-center mb-4">
                    <FileText className="w-24 h-24 text-gray-400" />
                    <div className="ml-4 text-gray-600 dark:text-gray-400">
                      <div className="font-medium">Document</div>
                      <div className="text-sm">{selectedMediaItem.description}</div>
                    </div>
                  </div>
                  <div className="flex justify-center gap-4">
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      <Eye className="w-4 h-4" />
                      View Document
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </div>
                </div>
              )}
              
              {selectedMediaItem.source && (
                <div className="mt-4 p-3 bg-gray-50 dark:bg-dark-700 rounded-lg">
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Source</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{selectedMediaItem.source}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Document Panel Modal */}
      {showDocumentPanel && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-dark-800 rounded-lg max-w-4xl max-h-[90vh] w-full overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-dark-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                Linked Documents
              </h3>
              <button
                onClick={() => setShowDocumentPanel(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6 max-h-96 overflow-y-auto">
              <div className="space-y-4">
                {selectedEvent && enhancedEvents.find(e => e.id === selectedEvent.id)?.linkedDocuments?.map(doc => (
                  <div key={doc.id} className="border border-gray-200 dark:border-dark-700 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">{doc.title}</h4>
                      {doc.verificationStatus === 'verified' && (
                        <span className="flex items-center gap-1 text-green-600 text-sm">
                          <Star className="w-3 h-3" />
                          Verified
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{doc.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>Type: {doc.type}</span>
                      <span>Date: {formatDate(doc.date)}</span>
                      <span>Significance: {doc.significance}</span>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button className="flex items-center gap-1 px-3 py-1 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded">
                        <Eye className="w-3 h-3" />
                        View
                      </button>
                      <button className="flex items-center gap-1 px-3 py-1 text-sm text-green-600 hover:text-green-800 hover:bg-green-50 dark:hover:bg-green-900/20 rounded">
                        <Download className="w-3 h-3" />
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Geographic Info Modal */}
      {showGeographicInfo && selectedEvent && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-dark-800 rounded-lg max-w-2xl w-full overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-dark-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                Geographic Information
              </h3>
              <button
                onClick={() => setShowGeographicInfo(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              {(() => {
                const enhancedEvent = enhancedEvents.find(e => e.id === selectedEvent.id);
                return enhancedEvent?.geographicData ? (
                  <div className="space-y-4">
                    <div className="w-full h-64 bg-gray-100 dark:bg-dark-700 rounded-lg flex items-center justify-center">
                      <MapPin className="w-16 h-16 text-gray-400" />
                      <div className="ml-4 text-gray-600 dark:text-gray-400">
                        <div className="font-medium">Interactive Map</div>
                        <div className="text-sm">Location: {enhancedEvent.geographicData.address}</div>
                        {enhancedEvent.geographicData.coordinates && (
                          <div className="text-xs mt-1">
                            Coordinates: {enhancedEvent.geographicData.coordinates.join(', ')}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        <Globe className="w-4 h-4" />
                        Open in Maps
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                        <Bookmark className="w-4 h-4" />
                        Save Location
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                        <Share className="w-4 h-4" />
                        Share
                      </button>
                    </div>
                    
                    {enhancedEvent.geographicData.propertyId && (
                      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <div className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-1">
                          Associated Property
                        </div>
                        <div className="text-sm text-blue-700 dark:text-blue-400">
                          Property ID: {enhancedEvent.geographicData.propertyId}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center text-gray-500 dark:text-gray-400">
                    <MapPin className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <p>No geographic data available for this event.</p>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}

      {/* Hover Event Tooltip */}
      {hoveredEvent && (
        <div className="fixed z-50 bg-gray-900 text-white p-3 rounded-lg shadow-lg pointer-events-none border border-gray-600">
          <div className="text-sm font-semibold">{hoveredEvent.title}</div>
          <div className="text-xs text-gray-300">
            {new Date(hoveredEvent.date).toLocaleDateString()}
          </div>
          <div className="text-xs text-gray-400 mt-1">
            {hoveredEvent.type} • {hoveredEvent.significance}
          </div>
        </div>
      )}
    </div>
  );
} 