'use client';

import { useState } from 'react';
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

  // Zoom controls implementation
  const handleZoomIn = () => {
    const zoomOrder = ['decade', 'year', 'month', 'day'];
    const currentIndex = zoomOrder.indexOf(view.zoom);
    if (currentIndex < zoomOrder.length - 1) {
      setView(prev => ({ ...prev, zoom: zoomOrder[currentIndex + 1] as TimelineView['zoom'] }));
    }
  };

  const handleZoomOut = () => {
    const zoomOrder = ['decade', 'year', 'month', 'day'];
    const currentIndex = zoomOrder.indexOf(view.zoom);
    if (currentIndex > 0) {
      setView(prev => ({ ...prev, zoom: zoomOrder[currentIndex - 1] as TimelineView['zoom'] }));
    }
  };

  // Animation controls
  const togglePlayback = () => {
    setIsPlaying(prev => !prev);
    setView(prev => ({ ...prev, animation: !prev.animation }));
  };

  // Event selection handler
  const handleEventSelect = (eventId: string) => {
    setSelectedEvent(eventId);
  };

  // Settings modal toggle
  const [showSettings, setShowSettings] = useState(false);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
      {/* Header - Enhanced Mobile Layout */}
      <header className="border-b border-gray-700/50 bg-gray-900/50 backdrop-blur-sm relative z-50">
        <div className="px-4 sm:px-6 py-4">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            {/* Navigation & Title */}
            <div className="flex items-center gap-4 w-full lg:w-auto">
              <Link 
                href="/"
                className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors touch-target"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="hidden sm:inline">Investigation Dashboard</span>
                <span className="sm:hidden">Back</span>
              </Link>
              
              <div className="w-px h-6 bg-gray-600 hidden sm:block" />
              
              <div className="flex items-center gap-3 flex-1 lg:flex-none">
                <Clock className="w-6 h-6 text-purple-400" />
                <div className="flex-1 lg:flex-none">
                  <h1 className="text-lg sm:text-xl font-bold text-white">Advanced Timeline Analysis</h1>
                  <p className="text-xs sm:text-sm text-gray-400 hidden sm:block">Chronological Investigation & Pattern Detection</p>
                </div>
              </div>
            </div>

            {/* Controls - Mobile Responsive */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full lg:w-auto">
              {/* Search - Mobile First */}
              <div className="relative flex-1 sm:flex-none">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search events, dates, entities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-gray-800/50 border border-gray-600 rounded-lg pl-10 pr-4 py-3 sm:py-2 text-sm focus:outline-none focus:border-purple-400 w-full sm:w-64"
                />
              </div>

              <div className="flex items-center gap-2 sm:gap-4">
                {/* Timeline Controls - Better Mobile Layout */}
                <div className="flex items-center gap-1 bg-gray-700/50 border border-gray-600 rounded-lg p-1">
                  <button
                    onClick={() => setIsPlaying(false)}
                    className="p-2 hover:bg-gray-600 rounded transition-colors touch-target"
                    aria-label="Previous"
                  >
                    <SkipBack className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={togglePlayback}
                    className="p-2 hover:bg-gray-600 rounded transition-colors touch-target"
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  
                  <button
                    onClick={() => setIsPlaying(true)}
                    className="p-2 hover:bg-gray-600 rounded transition-colors touch-target"
                    aria-label="Next"
                  >
                    <SkipForward className="w-4 h-4" />
                  </button>
                </div>

                {/* Zoom Controls */}
                <div className="flex items-center gap-1 bg-gray-700/50 border border-gray-600 rounded-lg p-1">
                  <button
                    onClick={handleZoomOut}
                    className="p-2 hover:bg-gray-600 rounded transition-colors touch-target"
                    aria-label="Zoom Out"
                    disabled={view.zoom === 'decade'}
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  
                  <span className="px-2 text-xs text-gray-400 capitalize hidden sm:inline">
                    {view.zoom}
                  </span>
                  
                  <button
                    onClick={handleZoomIn}
                    className="p-2 hover:bg-gray-600 rounded transition-colors touch-target"
                    aria-label="Zoom In"
                    disabled={view.zoom === 'day'}
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                </div>

                {/* Filter Toggle - Mobile Optimized */}
                <button
                  onClick={() => setShowFilterPanel(!showFilterPanel)}
                  className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg hover:border-gray-500 transition-colors touch-target"
                >
                  <Filter className="w-4 h-4" />
                  <span className="text-sm hidden sm:inline">Filters</span>
                </button>

                {/* Export - Mobile Optimized */}
                <button className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg hover:border-gray-500 transition-colors touch-target">
                  <Download className="w-4 h-4" />
                  <span className="text-sm hidden sm:inline">Export</span>
                </button>

                {/* Settings - Mobile Optimized */}
                <button 
                  onClick={() => setShowSettings(true)}
                  className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg hover:border-gray-500 transition-colors touch-target"
                >
                  <Settings className="w-4 h-4" />
                  <span className="text-sm hidden sm:inline">Settings</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row h-auto lg:h-screen">
        {/* Filter & Control Panel - Mobile Responsive */}
        {showFilterPanel && (
          <div className="w-full lg:w-80 bg-gray-900/95 border-b lg:border-r lg:border-b-0 border-gray-700/50 backdrop-blur-sm relative z-40 flex flex-col max-h-screen lg:h-auto overflow-y-auto">
            {/* Statistics - Mobile Layout */}
            <div className="p-4 lg:p-6 border-b border-gray-700/50">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-purple-400" />
                Timeline Overview
              </h3>
              
              <div className="grid grid-cols-2 lg:grid-cols-2 gap-3 lg:gap-4 mb-4 lg:mb-6">
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3">
                  <p className="text-xl lg:text-2xl font-bold text-purple-400">{timelineStats.totalEvents}</p>
                  <p className="text-xs text-gray-400">Total Events</p>
                </div>
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3">
                  <p className="text-xl lg:text-2xl font-bold text-red-400">{timelineStats.criticalEvents}</p>
                  <p className="text-xs text-gray-400">Critical Events</p>
                </div>
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3">
                  <p className="text-xl lg:text-2xl font-bold text-cyan-400">{timelineStats.entitiesTracked}</p>
                  <p className="text-xs text-gray-400">Entities</p>
                </div>
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3">
                  <p className="text-xl lg:text-2xl font-bold text-green-400">{timelineStats.crossReferences}</p>
                  <p className="text-xs text-gray-400">Cross-Refs</p>
                </div>
              </div>

              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3">
                <p className="text-sm font-semibold text-white mb-1">Timespan Coverage</p>
                <p className="text-lg font-bold text-purple-400">{timelineStats.timespan}</p>
                <p className="text-xs text-gray-400">54 years of documentation</p>
              </div>
            </div>

            {/* Selected Event Details */}
            {selectedEvent && (
              <div className="p-4 lg:p-6 border-b border-gray-700/50">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-400" />
                  Selected Event
                </h3>
                
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                  <p className="text-sm font-semibold text-white mb-2">Event ID: {selectedEvent}</p>
                  <p className="text-xs text-gray-400 mb-3">Click timeline events to view details</p>
                  
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    Clear Selection
                  </button>
                </div>
              </div>
            )}

            {/* Quick Event Selection */}
            <div className="p-4 lg:p-6 border-b border-gray-700/50">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5 text-purple-400" />
                Quick Select
              </h3>
              
              <div className="space-y-2">
                <button
                  onClick={() => handleEventSelect('epstein-arrest-2019')}
                  className="w-full text-left p-3 bg-gray-800/30 border border-gray-700 rounded-lg hover:border-purple-500 transition-colors"
                >
                  <div className="text-sm font-semibold text-white">Epstein Arrest 2019</div>
                  <div className="text-xs text-gray-400">July 6, 2019</div>
                </button>
                
                <button
                  onClick={() => handleEventSelect('plea-deal-2008')}
                  className="w-full text-left p-3 bg-gray-800/30 border border-gray-700 rounded-lg hover:border-purple-500 transition-colors"
                >
                  <div className="text-sm font-semibold text-white">Non-Prosecution Agreement</div>
                  <div className="text-xs text-gray-400">2008</div>
                </button>
              </div>
            </div>

            {/* View Mode Controls */}
            <div className="p-4 lg:p-6 border-b border-gray-700/50">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <List className="w-5 h-5 text-purple-400" />
                View Mode
              </h3>
              
              <div className="space-y-2 mb-6">
                {viewModes.map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setView(prev => ({ ...prev, mode: mode.id as 'chronological' | 'thematic' | 'network' | 'geographic' }))}
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
                    onClick={() => setView(prev => ({ ...prev, zoom: zoom.id as 'decade' | 'year' | 'month' | 'day' }))}
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

        {/* Main Timeline Area - Mobile Responsive */}
        <div className="flex-1 relative min-h-[60vh] lg:min-h-0">
          <div className="h-full bg-gradient-to-br from-gray-900 to-black p-2 sm:p-4 lg:p-0">
            <AdvancedTimeline />
          </div>
          
          {/* Toggle Filter Panel Button (when hidden) - Mobile Optimized */}
          {!showFilterPanel && (
            <button
              onClick={() => setShowFilterPanel(true)}
              className="absolute top-2 sm:top-4 left-2 sm:left-4 z-30 flex items-center gap-2 px-3 py-2 bg-gray-900/90 border border-gray-600 rounded-lg backdrop-blur-sm hover:border-gray-500 transition-colors touch-target"
            >
              <Filter className="w-4 h-4" />
              <span className="text-sm hidden sm:inline">Show Filters</span>
              <span className="text-sm sm:hidden">Filters</span>
            </button>
          )}

          {/* Timeline Status - Mobile Responsive */}
          <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 z-30 bg-gray-900/90 border border-gray-600 rounded-lg px-2 sm:px-3 py-2 backdrop-blur-sm">
            <p className="text-xs text-gray-400 flex items-center gap-2">
              <Eye className="w-3 h-3" />
              <span className="hidden sm:inline">Advanced Timeline Analysis System v2.1</span>
              <span className="sm:hidden">Timeline v2.1</span>
            </p>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Settings className="w-5 h-5 text-purple-400" />
                Timeline Settings
              </h3>
              <button
                onClick={() => setShowSettings(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <h4 className="text-md font-semibold text-white mb-3">Animation Settings</h4>
                <div className="space-y-3">
                  <label className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      checked={view.animation}
                      onChange={(e) => setView(prev => ({ ...prev, animation: e.target.checked }))}
                      className="rounded"
                    />
                    <span className="text-gray-300">Enable timeline animations</span>
                  </label>
                </div>
              </div>

              <div>
                <h4 className="text-md font-semibold text-white mb-3">Display Preferences</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Current Mode: {view.mode}</label>
                    <label className="block text-sm text-gray-400 mb-2">Current Zoom: {view.zoom}</label>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-md font-semibold text-white mb-3">Performance</h4>
                <div className="space-y-3">
                  <div className="text-sm text-gray-400">
                    <p>Events loaded: {timelineStats.totalEvents}</p>
                    <p>Time span: {timelineStats.timespan}</p>
                    <p>Last updated: {timelineStats.lastUpdated}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 p-4 border-t border-gray-700">
              <button
                onClick={() => setShowSettings(false)}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 