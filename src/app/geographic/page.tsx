'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import {
  Map,
  ArrowLeft,
  Layers,
  Target,
  Plane,
  Building,
  Activity,
  Eye,
  Settings,
  Maximize,
  Minimize,
  Search,
  Info,
  BarChart3,
  TrendingUp
} from 'lucide-react';
import PropertyDetailPanel from '@/components/PropertyDetailPanel';
import GeographicAnalytics from '@/components/GeographicAnalytics';
import PropertyComparison from '@/components/PropertyComparison';
import GeographicHeatMap from '@/components/GeographicHeatMap';
import { enhancedProperties } from '@/data/geographic/properties';
import { comprehensiveTimeline } from '@/data/core/timeline';

interface LayerState {
  flightPaths: boolean;
  travelPatterns: boolean;
  financialConnections: boolean;
  propertyConnections: boolean;
}

const InteractiveMap = dynamic(() => import('@/components/InteractiveMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
      <div className="text-center text-cyan-400">
        <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-lg font-bold">Loading Geographic Analysis</p>
        <p className="text-sm opacity-60">Initializing global mapping system...</p>
      </div>
    </div>
  )
});

// Error boundary component for map initialization issues
const MapErrorFallback = ({ error, resetError }: { error: Error; resetError: () => void }) => (
  <div className="w-full h-full bg-gradient-to-br from-red-900 via-gray-800 to-black flex items-center justify-center rounded-xl border border-red-500/30">
    <div className="text-center text-red-400 p-6">
      <div className="text-6xl mb-4">🗺️</div>
      <p className="text-lg font-bold mb-2">Map Loading Error</p>
      <p className="text-sm opacity-60 mb-4">
        {error.message.includes('Map container is already initialized') 
          ? 'Map is reinitializing. This will resolve automatically.'
          : error.message
        }
      </p>
      <button 
        onClick={resetError}
        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
      >
        Retry Map Loading
      </button>
    </div>
  </div>
);

export default function GeographicMappingPage() {
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  const [selectedTimelineEvent, setSelectedTimelineEvent] = useState<string | null>(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [activeLayers, setActiveLayers] = useState<LayerState>({
    flightPaths: true,
    travelPatterns: true,
    financialConnections: true,
    propertyConnections: true
  });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControlPanel, setShowControlPanel] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics' | 'search' | 'visualization'>('overview');
  const [mapError, setMapError] = useState<Error | null>(null);
  const [mapKey, setMapKey] = useState(0);
  const [comparisonMode, setComparisonMode] = useState(false);
  const [comparisonProperties, setComparisonProperties] = useState<string[]>([]);

  // Function to reset map on error
  const resetMap = () => {
    setMapError(null);
    setMapKey(prev => prev + 1);
  };

  // Handle property selection
  const handlePropertySelect = (propertyId: string) => {
    setSelectedProperty(propertyId);
    setShowDetailPanel(true);
  };

  // Handle detail panel close
  const handleDetailPanelClose = () => {
    setShowDetailPanel(false);
    setSelectedProperty(null);
  };

  // Handle property comparison
  const handlePropertyCompare = (propertyId: string) => {
    if (comparisonProperties.includes(propertyId)) {
      setComparisonProperties(prev => prev.filter(id => id !== propertyId));
    } else if (comparisonProperties.length < 4) {
      setComparisonProperties(prev => [...prev, propertyId]);
    }
  };

  const handleComparisonClose = () => {
    setComparisonMode(false);
    setComparisonProperties([]);
  };


  // Handle window errors from map initialization
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      if (event.message.includes('Map container is already initialized')) {
        setMapError(new Error('Map container is already initialized'));
        // Auto-recover after a short delay
        setTimeout(() => {
          resetMap();
        }, 1000);
      }
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  // Statistics for the mapping system
  const geographicStats = {
    propertiesTracked: 12,
    flightLogsAnalyzed: 14,
    travelPatternsIdentified: 5,
    countriesInvolved: 8,
    financialConnectionsMapped: 12,
    lastUpdated: new Date().toLocaleDateString()
  };

  const layerControls = [
    {
      key: 'flightPaths',
      label: 'Flight Paths',
      icon: <Plane className="w-4 h-4" />,
      description: 'Documented flight routes and travel logs',
      color: 'text-blue-400',
      count: 14
    },
    {
      key: 'travelPatterns',
      label: 'Travel Patterns',
      description: 'Recurring movement patterns and frequencies',
      icon: <Activity className="w-4 h-4" />,
      color: 'text-purple-400',
      count: 5
    },
    {
      key: 'financialConnections',
      label: 'Financial Connections',
      description: 'Property ownership and financial relationships',
      icon: <Target className="w-4 h-4" />,
      color: 'text-orange-400',
      count: 12
    },
    {
      key: 'propertyConnections',
      label: 'Property Networks',
      description: 'Ownership timelines and property relationships',
      icon: <Building className="w-4 h-4" />,
      color: 'text-green-400',
      count: 12
    }
  ];

  const toggleLayer = (layerKey: keyof LayerState) => {
    setActiveLayers(prev => ({
      ...prev,
      [layerKey]: !prev[layerKey]
    }));
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
      {/* Header - Enhanced Mobile Layout */}
      <header className="border-b border-gray-700/50 bg-gray-900/50 backdrop-blur-sm relative z-50">
        <div className="px-4 sm:px-6 py-4">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
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
                <Map className="w-6 h-6 text-cyan-400" />
                <div className="flex-1 lg:flex-none">
                  <h1 className="text-lg sm:text-xl font-bold text-white">Enhanced Geographic Mapping</h1>
                  <p className="text-xs sm:text-sm text-gray-400 hidden sm:block">Global Analysis & Property Intelligence</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full lg:w-auto">
              {/* Search - Mobile First */}
              <div className="relative flex-1 sm:flex-none">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search properties, locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-gray-800/50 border border-gray-600 rounded-lg pl-10 pr-4 py-3 sm:py-2 text-sm focus:outline-none focus:border-cyan-400 w-full sm:w-64"
                />
              </div>

              <div className="flex items-center gap-2 sm:gap-4">
                {/* Controls - Mobile Optimized */}
                <button
                  onClick={() => setShowControlPanel(!showControlPanel)}
                  className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg hover:border-gray-500 transition-colors touch-target"
                >
                  <Settings className="w-4 h-4" />
                  <span className="text-sm hidden sm:inline">Controls</span>
                </button>

                <button
                  onClick={toggleFullscreen}
                  className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg hover:border-gray-500 transition-colors touch-target"
                >
                  {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                  <span className="text-sm hidden sm:inline">
                    {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="relative flex flex-col lg:flex-row h-auto lg:h-screen">
        {/* Control Panel Sidebar - Mobile Responsive */}
        {showControlPanel && (
          <div className="w-full lg:w-80 bg-gray-900/95 border-b lg:border-r lg:border-b-0 border-gray-700/50 backdrop-blur-sm relative z-40 flex flex-col max-h-screen lg:h-auto overflow-y-auto">
            {/* Tab Navigation */}
            <div className="border-b border-gray-700/50">
              <nav className="flex px-4">
                {[
                  { id: 'overview', label: 'Overview', icon: Activity },
                  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
                  { id: 'search', label: 'Search', icon: Search },
                  { id: 'visualization', label: 'Heat Maps', icon: TrendingUp }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-3 py-3 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-cyan-500 text-cyan-400'
                        : 'border-transparent text-gray-400 hover:text-gray-300'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <>
                {/* Statistics - Mobile Layout */}
                <div className="p-4 lg:p-6 border-b border-gray-700/50">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-cyan-400" />
                System Overview
              </h3>
              
              <div className="grid grid-cols-2 lg:grid-cols-2 gap-3 lg:gap-4 mb-4 lg:mb-6">
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3">
                  <p className="text-xl lg:text-2xl font-bold text-cyan-400">{geographicStats.propertiesTracked}</p>
                  <p className="text-xs text-gray-400">Properties Tracked</p>
                </div>
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3">
                  <p className="text-2xl font-bold text-purple-400">{geographicStats.flightLogsAnalyzed}</p>
                  <p className="text-xs text-gray-400">Flight Logs</p>
                </div>
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3">
                  <p className="text-2xl font-bold text-green-400">{geographicStats.countriesInvolved}</p>
                  <p className="text-xs text-gray-400">Countries</p>
                </div>
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3">
                  <p className="text-2xl font-bold text-orange-400">{geographicStats.financialConnectionsMapped}</p>
                  <p className="text-xs text-gray-400">Financial Links</p>
                </div>
              </div>
            </div>

            {/* Layer Controls */}
            <div className="p-6 border-b border-gray-700/50">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Layers className="w-5 h-5 text-cyan-400" />
                Map Layers
              </h3>
              
              <div className="space-y-3">
                {layerControls.map((layer) => (
                  <div key={layer.key} className="group">
                    <label className="flex items-center gap-3 p-3 bg-gray-800/30 border border-gray-700 rounded-lg hover:border-gray-600 cursor-pointer transition-all">
                      <div className={`w-4 h-4 border-2 rounded transition-all ${
                        activeLayers[layer.key as keyof LayerState]
                          ? 'bg-cyan-500 border-cyan-500'
                          : 'border-gray-500 group-hover:border-gray-400'
                      }`}>
                        {activeLayers[layer.key as keyof LayerState] && (
                          <div className="w-full h-full flex items-center justify-center">
                            <Eye className="w-2 h-2 text-black" />
                          </div>
                        )}
                      </div>
                      
                      <input
                        type="checkbox"
                        checked={activeLayers[layer.key as keyof LayerState]}
                        onChange={() => toggleLayer(layer.key as keyof LayerState)}
                        className="hidden"
                      />
                      
                      <div className={`${layer.color}`}>
                        {layer.icon}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-white">{layer.label}</span>
                          <span className="text-xs text-gray-400">({layer.count})</span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">{layer.description}</p>
                      </div>
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Property Information */}
            <div className="p-6 flex-1">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-cyan-400" />
                Property Intel
              </h3>
              
              {selectedProperty ? (
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
                  <h4 className="font-semibold text-white mb-2">Property Selected</h4>
                  <p className="text-sm text-gray-400">
                    Detailed analysis available in map popup
                  </p>
                </div>
              ) : (
                <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-4">
                  <p className="text-sm text-gray-400 text-center">
                    Click on a property marker to view detailed intelligence
                  </p>
                </div>
              )}
            </div>

              </>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div className="flex-1 p-6">
                <GeographicAnalytics />
              </div>
            )}

            {/* Visualization Tab */}
            {activeTab === 'visualization' && (
              <div className="flex-1 p-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-cyan-400" />
                    Geographic Visualizations
                  </h3>

                  {/* Heat Map Component */}
                  <GeographicHeatMap className="mb-6" />

                  {/* Quick Actions */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setComparisonMode(true)}
                      className="flex items-center gap-2 px-3 py-3 bg-purple-600/20 border border-purple-500/30 rounded-lg hover:bg-purple-600/30 transition-colors"
                    >
                      <BarChart3 className="w-4 h-4 text-purple-400" />
                      <div className="text-left">
                        <p className="text-sm font-medium text-white">Property Comparison</p>
                        <p className="text-xs text-purple-300">Compare up to 4 properties</p>
                      </div>
                    </button>

                    <button
                      className="flex items-center gap-2 px-3 py-3 bg-blue-600/20 border border-blue-500/30 rounded-lg hover:bg-blue-600/30 transition-colors"
                    >
                      <Activity className="w-4 h-4 text-blue-400" />
                      <div className="text-left">
                        <p className="text-sm font-medium text-white">Timeline Sync</p>
                        <p className="text-xs text-blue-300">Sync with timeline events</p>
                      </div>
                    </button>
                  </div>

                  {/* Active Comparison Indicator */}
                  {comparisonProperties.length > 0 && (
                    <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-white">Active Comparison</h4>
                        <span className="text-sm text-purple-300">
                          {comparisonProperties.length}/4 properties
                        </span>
                      </div>
                      <div className="flex gap-2">
                        {comparisonProperties.map((id) => {
                          const property = enhancedProperties.find(p => p.id === id);
                          return property ? (
                            <div key={id} className="flex items-center gap-1 px-2 py-1 bg-purple-600/30 rounded text-xs">
                              <div className={`w-2 h-2 rounded-full ${
                                property.significance === 'critical' ? 'bg-red-400' :
                                property.significance === 'high' ? 'bg-orange-400' : 'bg-blue-400'
                              }`} />
                              <span className="text-purple-200 truncate max-w-16">
                                {property.name}
                              </span>
                              <button
                                onClick={() => handlePropertyCompare(id)}
                                className="ml-1 hover:bg-purple-500/50 rounded"
                              >
                                ×
                              </button>
                            </div>
                          ) : null;
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Search Tab */}
            {activeTab === 'search' && (
              <div className="flex-1 p-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Search className="w-5 h-5 text-cyan-400" />
                    Advanced Search & Filters
                  </h3>

                  {/* Search Input */}
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search properties, locations, entities..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-gray-800/50 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  {/* Quick Filters */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-gray-300">Quick Filters</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { label: 'Critical Only', value: 'critical', color: 'red' },
                        { label: 'Seized Properties', value: 'seized', color: 'orange' },
                        { label: 'Verified Data', value: 'verified', color: 'green' },
                        { label: 'US Properties', value: 'us', color: 'blue' }
                      ].map((filter) => (
                        <button
                          key={filter.value}
                          className="px-3 py-2 text-sm bg-gray-800/50 border border-gray-700 rounded-lg hover:border-gray-600 text-gray-300 hover:text-white transition-colors"
                        >
                          {filter.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Search Results */}
                  {searchQuery && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-300">Search Results</h4>
                      <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-4">
                        <p className="text-sm text-gray-400">
                          Searching for &quot;{searchQuery}&quot;...
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {enhancedProperties.filter(p =>
                            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p.description.toLowerCase().includes(searchQuery.toLowerCase())
                          ).length} properties found
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Status */}
            <div className="p-6 border-t border-gray-700/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-400">System Online</span>
                </div>
                <span className="text-xs text-gray-500">
                  Updated: {geographicStats.lastUpdated}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Main Map Area - Mobile Responsive */}
        <div className="flex-1 relative min-h-[60vh] lg:min-h-0">
          {mapError ? (
            <MapErrorFallback error={mapError} resetError={resetMap} />
          ) : (
            <InteractiveMap
              key={`map-${mapKey}`}
              selectedProperty={selectedProperty}
              selectedTimelineEvent={selectedTimelineEvent}
              onPropertySelect={handlePropertySelect}
              onTimelineEventSelect={setSelectedTimelineEvent}
              activeLayers={activeLayers}
              className="w-full h-full"
            />
          )}
          
          {/* Toggle Control Panel Button (when hidden) - Mobile Optimized */}
          {!showControlPanel && (
            <button
              onClick={() => setShowControlPanel(true)}
              className="absolute top-2 sm:top-4 left-2 sm:left-4 z-30 flex items-center gap-2 px-3 py-2 bg-gray-900/90 border border-gray-600 rounded-lg backdrop-blur-sm hover:border-gray-500 transition-colors touch-target"
            >
              <Layers className="w-4 h-4" />
              <span className="text-sm hidden sm:inline">Show Controls</span>
              <span className="text-sm sm:hidden">Controls</span>
            </button>
          )}

          {/* Map Attribution - Mobile Responsive */}
          <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 z-30 bg-gray-900/90 border border-gray-600 rounded-lg px-2 sm:px-3 py-2 backdrop-blur-sm">
            <p className="text-xs text-gray-400">
              <span className="hidden sm:inline">Enhanced Geographic Intelligence System v2.1</span>
              <span className="sm:hidden">Geo Intel v2.1</span>
            </p>
          </div>
        </div>
      </div>

      {/* Property Detail Panel */}
      <PropertyDetailPanel
        property={selectedProperty ? enhancedProperties.find(p => p.id === selectedProperty) || null : null}
        isOpen={showDetailPanel}
        onClose={handleDetailPanelClose}
        onTimelineEventClick={(_eventId: string) => {
          // TODO: Navigate to timeline page with specific event
          // Navigate to timeline event: eventId
        }}
        onCompare={handlePropertyCompare}
        isInComparison={selectedProperty ? comparisonProperties.includes(selectedProperty) : false}
        relatedTimelineEvents={selectedProperty ?
          comprehensiveTimeline
            .filter(event => event.entities.some(entity => entity.entityId === selectedProperty))
            .map(event => event.id)
          : []
        }
        onClearSync={() => setSelectedTimelineEvent(null)}
      />

      {/* Property Comparison */}
      <PropertyComparison
        properties={comparisonProperties.map(id =>
          enhancedProperties.find(p => p.id === id)!
        ).filter(Boolean)}
        isOpen={comparisonMode}
        onClose={handleComparisonClose}
        onPropertyRemove={handlePropertyCompare}
        onAddProperty={() => {
          // TODO: Open property selector
        }}
      />
    </div>
  );
} 