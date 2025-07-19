'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Clock, 
  ArrowLeft,
  Filter,
  Search,
  Calendar,
  List,
  BarChart3,
  ZoomIn,
  ZoomOut,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Settings,
  Download,
  Eye,
  AlertTriangle,
  CheckCircle,
  Users,
  Building,
  DollarSign,
  FileText,
  MapPin
} from 'lucide-react';
import AdvancedTimeline from '@/components/AdvancedTimeline';

interface TimelineFilter {
  dateRange: {
    start: string;
    end: string;
  };
  categories: string[];
  significance: string[];
  entities: string[];
  locations: string[];
}

interface TimelineView {
  mode: 'chronological' | 'thematic' | 'network' | 'geographic';
  zoom: 'decade' | 'year' | 'month' | 'day';
  animation: boolean;
}

export default function TimelinePage() {
  const [filters, setFilters] = useState<TimelineFilter>({
    dateRange: {
      start: '1970',
      end: '2024'
    },
    categories: ['legal', 'financial', 'personal', 'business', 'government'],
    significance: ['critical', 'high', 'medium', 'low'],
    entities: [],
    locations: []
  });
  
  const [view, setView] = useState<TimelineView>({
    mode: 'chronological',
    zoom: 'year',
    animation: false
  });
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [showFilterPanel, setShowFilterPanel] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  // Timeline statistics
  const timelineStats = {
    totalEvents: 1247,
    timespan: '1970-2024',
    criticalEvents: 89,
    entitiesTracked: 156,
    crossReferences: 435,
    verifiedSources: 234,
    lastUpdated: new Date().toLocaleDateString()
  };

  const categories = [
    { id: 'legal', label: 'Legal Proceedings', icon: <FileText className="w-4 h-4" />, color: 'text-red-400', count: 234 },
    { id: 'financial', label: 'Financial Activity', icon: <DollarSign className="w-4 h-4" />, color: 'text-green-400', count: 189 },
    { id: 'personal', label: 'Personal Events', icon: <Users className="w-4 h-4" />, color: 'text-blue-400', count: 156 },
    { id: 'business', label: 'Business Operations', icon: <Building className="w-4 h-4" />, color: 'text-purple-400', count: 298 },
    { id: 'government', label: 'Government Relations', icon: <AlertTriangle className="w-4 h-4" />, color: 'text-orange-400', count: 145 },
    { id: 'geographic', label: 'Geographic Events', icon: <MapPin className="w-4 h-4" />, color: 'text-cyan-400', count: 225 }
  ];

  const viewModes = [
    { id: 'chronological', label: 'Chronological', description: 'Events in time order' },
    { id: 'thematic', label: 'Thematic', description: 'Grouped by category' },
    { id: 'network', label: 'Network', description: 'Relationship-based' },
    { id: 'geographic', label: 'Geographic', description: 'Location-based timeline' }
  ];

  const zoomLevels = [
    { id: 'decade', label: 'Decades', description: '10-year periods' },
    { id: 'year', label: 'Years', description: 'Annual view' },
    { id: 'month', label: 'Months', description: 'Monthly detail' },
    { id: 'day', label: 'Days', description: 'Daily precision' }
  ];

  const toggleCategory = (categoryId: string) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter(id => id !== categoryId)
        : [...prev.categories, categoryId]
    }));
  };

  const playAnimation = () => {
    setIsPlaying(true);
    setView(prev => ({ ...prev, animation: true }));
  };

  const pauseAnimation = () => {
    setIsPlaying(false);
    setView(prev => ({ ...prev, animation: false }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
      {/* Header */}
      <header className="border-b border-gray-700/50 bg-gray-900/50 backdrop-blur-sm relative z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                href="/"
                className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Investigation Dashboard</span>
              </Link>
              
              <div className="w-px h-6 bg-gray-600" />
              
              <div className="flex items-center gap-3">
                <Clock className="w-6 h-6 text-purple-400" />
                <div>
                  <h1 className="text-xl font-bold text-white">Advanced Timeline Analysis</h1>
                  <p className="text-sm text-gray-400">Chronological Investigation & Pattern Detection</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search events, dates, entities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-gray-800/50 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-purple-400 w-64"
                />
              </div>

              {/* Timeline Controls */}
              <div className="flex items-center gap-2 bg-gray-700/50 border border-gray-600 rounded-lg p-1">
                <button
                  onClick={() => pauseAnimation()}
                  className="p-2 hover:bg-gray-600 rounded transition-colors"
                >
                  <SkipBack className="w-4 h-4" />
                </button>
                
                <button
                  onClick={isPlaying ? pauseAnimation : playAnimation}
                  className="p-2 hover:bg-gray-600 rounded transition-colors"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                
                <button
                  onClick={() => playAnimation()}
                  className="p-2 hover:bg-gray-600 rounded transition-colors"
                >
                  <SkipForward className="w-4 h-4" />
                </button>
              </div>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilterPanel(!showFilterPanel)}
                className="flex items-center gap-2 px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg hover:border-gray-500 transition-colors"
              >
                <Filter className="w-4 h-4" />
                <span className="text-sm">Filters</span>
              </button>

              {/* Export */}
              <button className="flex items-center gap-2 px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg hover:border-gray-500 transition-colors">
                <Download className="w-4 h-4" />
                <span className="text-sm">Export</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-screen">
        {/* Filter & Control Panel */}
        {showFilterPanel && (
          <div className="w-80 bg-gray-900/95 border-r border-gray-700/50 backdrop-blur-sm relative z-40 flex flex-col">
            {/* Statistics */}
            <div className="p-6 border-b border-gray-700/50">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-purple-400" />
                Timeline Overview
              </h3>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3">
                  <p className="text-2xl font-bold text-purple-400">{timelineStats.totalEvents}</p>
                  <p className="text-xs text-gray-400">Total Events</p>
                </div>
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3">
                  <p className="text-2xl font-bold text-red-400">{timelineStats.criticalEvents}</p>
                  <p className="text-xs text-gray-400">Critical Events</p>
                </div>
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3">
                  <p className="text-2xl font-bold text-cyan-400">{timelineStats.entitiesTracked}</p>
                  <p className="text-xs text-gray-400">Entities</p>
                </div>
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3">
                  <p className="text-2xl font-bold text-green-400">{timelineStats.crossReferences}</p>
                  <p className="text-xs text-gray-400">Cross-Refs</p>
                </div>
              </div>

              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3">
                <p className="text-sm font-semibold text-white mb-1">Timespan Coverage</p>
                <p className="text-lg font-bold text-purple-400">{timelineStats.timespan}</p>
                <p className="text-xs text-gray-400">54 years of documentation</p>
              </div>
            </div>

            {/* View Mode Controls */}
            <div className="p-6 border-b border-gray-700/50">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <List className="w-5 h-5 text-purple-400" />
                View Mode
              </h3>
              
              <div className="space-y-2 mb-6">
                {viewModes.map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setView(prev => ({ ...prev, mode: mode.id as any }))}
                    className={`w-full text-left p-3 rounded-lg border transition-all ${
                      view.mode === mode.id
                        ? 'bg-purple-500/20 border-purple-500 text-purple-400'
                        : 'bg-gray-800/30 border-gray-700 hover:border-gray-600 text-gray-300'
                    }`}
                  >
                    <div className="font-semibold">{mode.label}</div>
                    <div className="text-sm opacity-75">{mode.description}</div>
                  </button>
                ))}
              </div>

              <h4 className="text-md font-bold text-white mb-3">Zoom Level</h4>
              <div className="grid grid-cols-2 gap-2">
                {zoomLevels.map((zoom) => (
                  <button
                    key={zoom.id}
                    onClick={() => setView(prev => ({ ...prev, zoom: zoom.id as any }))}
                    className={`p-2 text-xs rounded-lg border transition-all ${
                      view.zoom === zoom.id
                        ? 'bg-purple-500/20 border-purple-500 text-purple-400'
                        : 'bg-gray-800/30 border-gray-700 hover:border-gray-600 text-gray-300'
                    }`}
                  >
                    {zoom.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filters */}
            <div className="p-6 border-b border-gray-700/50 flex-1">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Filter className="w-5 h-5 text-purple-400" />
                Event Categories
              </h3>
              
              <div className="space-y-3">
                {categories.map((category) => (
                  <label
                    key={category.id}
                    className="flex items-center gap-3 p-3 bg-gray-800/30 border border-gray-700 rounded-lg hover:border-gray-600 cursor-pointer transition-all"
                  >
                    <div className={`w-4 h-4 border-2 rounded transition-all ${
                      filters.categories.includes(category.id)
                        ? 'bg-purple-500 border-purple-500'
                        : 'border-gray-500'
                    }`}>
                      {filters.categories.includes(category.id) && (
                        <CheckCircle className="w-full h-full text-black" />
                      )}
                    </div>
                    
                    <input
                      type="checkbox"
                      checked={filters.categories.includes(category.id)}
                      onChange={() => toggleCategory(category.id)}
                      className="hidden"
                    />
                    
                    <div className={category.color}>
                      {category.icon}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-white">{category.label}</span>
                        <span className="text-xs text-gray-400">({category.count})</span>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Date Range Filter */}
            <div className="p-6 border-t border-gray-700/50">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-purple-400" />
                Date Range
              </h3>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Start Year</label>
                  <input
                    type="number"
                    min="1970"
                    max="2024"
                    value={filters.dateRange.start}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      dateRange: { ...prev.dateRange, start: e.target.value }
                    }))}
                    className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-400"
                  />
                </div>
                
                <div>
                  <label className="block text-sm text-gray-400 mb-1">End Year</label>
                  <input
                    type="number"
                    min="1970"
                    max="2024"
                    value={filters.dateRange.end}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      dateRange: { ...prev.dateRange, end: e.target.value }
                    }))}
                    className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-400"
                  />
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="p-6 border-t border-gray-700/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-400">Timeline Active</span>
                </div>
                <span className="text-xs text-gray-500">
                  Updated: {timelineStats.lastUpdated}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Main Timeline Area */}
        <div className="flex-1 relative">
          <div className="h-full bg-gradient-to-br from-gray-900 to-black">
            <AdvancedTimeline />
          </div>
          
          {/* Toggle Filter Panel Button (when hidden) */}
          {!showFilterPanel && (
            <button
              onClick={() => setShowFilterPanel(true)}
              className="absolute top-4 left-4 z-30 flex items-center gap-2 px-3 py-2 bg-gray-900/90 border border-gray-600 rounded-lg backdrop-blur-sm hover:border-gray-500 transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span className="text-sm">Show Filters</span>
            </button>
          )}

          {/* Timeline Status */}
          <div className="absolute bottom-4 right-4 z-30 bg-gray-900/90 border border-gray-600 rounded-lg px-3 py-2 backdrop-blur-sm">
            <p className="text-xs text-gray-400 flex items-center gap-2">
              <Eye className="w-3 h-3" />
              Advanced Timeline Analysis System v2.1
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 