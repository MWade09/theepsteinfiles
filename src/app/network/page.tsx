'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Network, 
  ArrowLeft,
  Filter,
  Search,
  Users,
  Building,
  Zap,
  Settings,
  Download,
  Play,
  Pause,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  CheckCircle,
  Globe,
  Briefcase,
  Heart,
  DollarSign,
  Scale,
  MapPin,
  Activity
} from 'lucide-react';
import NetworkAnalysis from '@/components/NetworkAnalysis';

interface NetworkFilter {
  entityTypes: string[];
  relationshipTypes: string[];
  significanceLevels: string[];
  timeRanges: string[];
  industries: string[];
}

interface NetworkView {
  layout: 'force' | 'circular' | 'hierarchical' | 'geographic';
  clustering: boolean;
  physics: boolean;
  nodeSize: 'connections' | 'significance' | 'uniform';
  edgeWeight: 'strength' | 'frequency' | 'uniform';
}

export default function NetworkPage() {
  const [filters, setFilters] = useState<NetworkFilter>({
    entityTypes: ['individual', 'organization', 'company', 'government', 'location'],
    relationshipTypes: ['business', 'personal', 'financial', 'legal', 'travel'],
    significanceLevels: ['critical', 'high', 'medium', 'low'],
    timeRanges: ['1970-1980', '1980-1990', '1990-2000', '2000-2010', '2010-2024'],
    industries: ['finance', 'tech', 'politics', 'media', 'education', 'entertainment']
  });
  
  const [view, setView] = useState<NetworkView>({
    layout: 'force',
    clustering: true,
    physics: true,
    nodeSize: 'connections',
    edgeWeight: 'strength'
  });
  
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterPanel, setShowFilterPanel] = useState(true);
  const [isSimulating, setIsSimulating] = useState(true);

  // Network statistics
  const networkStats = {
    totalEntities: 567,
    totalConnections: 1892,
    clusters: 23,
    criticalNodes: 45,
    orphanedNodes: 12,
    averageConnections: 3.3,
    maxDegree: 89,
    lastUpdated: new Date().toLocaleDateString()
  };

  const entityTypes = [
    { id: 'individual', label: 'Individuals', icon: <Users className="w-4 h-4" />, color: 'text-blue-400', count: 234 },
    { id: 'organization', label: 'Organizations', icon: <Building className="w-4 h-4" />, color: 'text-purple-400', count: 89 },
    { id: 'company', label: 'Companies', icon: <Briefcase className="w-4 h-4" />, color: 'text-green-400', count: 156 },
    { id: 'government', label: 'Government', icon: <Globe className="w-4 h-4" />, color: 'text-red-400', count: 34 },
    { id: 'location', label: 'Locations', icon: <MapPin className="w-4 h-4" />, color: 'text-cyan-400', count: 54 }
  ];

  const relationshipTypes = [
    { id: 'business', label: 'Business', icon: <Briefcase className="w-4 h-4" />, color: 'text-green-400', count: 456 },
    { id: 'personal', label: 'Personal', icon: <Heart className="w-4 h-4" />, color: 'text-pink-400', count: 234 },
    { id: 'financial', label: 'Financial', icon: <DollarSign className="w-4 h-4" />, color: 'text-yellow-400', count: 345 },
    { id: 'legal', label: 'Legal', icon: <Scale className="w-4 h-4" />, color: 'text-red-400', count: 123 },
    { id: 'travel', label: 'Travel', icon: <MapPin className="w-4 h-4" />, color: 'text-cyan-400', count: 234 }
  ];

  const layoutOptions = [
    { id: 'force', label: 'Force-Directed', description: 'Dynamic physics simulation' },
    { id: 'circular', label: 'Circular', description: 'Circular arrangement' },
    { id: 'hierarchical', label: 'Hierarchical', description: 'Tree-like structure' },
    { id: 'geographic', label: 'Geographic', description: 'Location-based layout' }
  ];

  const toggleEntityType = (typeId: string) => {
    setFilters(prev => ({
      ...prev,
      entityTypes: prev.entityTypes.includes(typeId)
        ? prev.entityTypes.filter(id => id !== typeId)
        : [...prev.entityTypes, typeId]
    }));
  };

  const toggleRelationshipType = (typeId: string) => {
    setFilters(prev => ({
      ...prev,
      relationshipTypes: prev.relationshipTypes.includes(typeId)
        ? prev.relationshipTypes.filter(id => id !== typeId)
        : [...prev.relationshipTypes, typeId]
    }));
  };

  const resetNetwork = () => {
    setView(prev => ({ ...prev, physics: false }));
    setTimeout(() => setView(prev => ({ ...prev, physics: true })), 100);
  };

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
                <Network className="w-6 h-6 text-green-400" />
                <div className="flex-1 lg:flex-none">
                  <h1 className="text-lg sm:text-xl font-bold text-white">Network Analysis</h1>
                  <p className="text-xs sm:text-sm text-gray-400 hidden sm:block">Relationship Mapping & Connection Intelligence</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full lg:w-auto">
              {/* Search */}
              <div className="relative flex-1 sm:flex-none">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search entities, relationships..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-gray-800/50 border border-gray-600 rounded-lg pl-10 pr-4 py-3 sm:py-2 text-sm focus:outline-none focus:border-green-400 w-full sm:w-64"
                />
              </div>

              <div className="flex items-center gap-2 sm:gap-4">
                {/* Network Controls */}
                <div className="flex items-center gap-1 bg-gray-700/50 border border-gray-600 rounded-lg p-1">
                  <button
                    onClick={() => setIsSimulating(!isSimulating)}
                    className="p-2 hover:bg-gray-600 rounded transition-colors touch-target"
                    title={isSimulating ? 'Pause simulation' : 'Start simulation'}
                  >
                    {isSimulating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  
                <button
                  onClick={resetNetwork}
                  className="p-2 hover:bg-gray-600 rounded transition-colors touch-target"
                  title="Reset layout"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                
                <button
                  className="p-2 hover:bg-gray-600 rounded transition-colors touch-target"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                
                <button
                  className="p-2 hover:bg-gray-600 rounded transition-colors touch-target"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
              </div>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilterPanel(!showFilterPanel)}
                className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg hover:border-gray-500 transition-colors touch-target"
              >
                <Filter className="w-4 h-4" />
                <span className="text-sm hidden sm:inline">Filters</span>
              </button>

              {/* Export */}
              <button className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg hover:border-gray-500 transition-colors touch-target">
                <Download className="w-4 h-4" />
                <span className="text-sm hidden sm:inline">Export</span>
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
                <Activity className="w-5 h-5 text-green-400" />
                Network Overview
              </h3>
              
              <div className="grid grid-cols-2 lg:grid-cols-2 gap-3 lg:gap-4 mb-4 lg:mb-6">
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3">
                  <p className="text-xl lg:text-2xl font-bold text-green-400">{networkStats.totalEntities}</p>
                  <p className="text-xs text-gray-400">Total Entities</p>
                </div>
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3">
                  <p className="text-xl lg:text-2xl font-bold text-blue-400">{networkStats.totalConnections}</p>
                  <p className="text-xs text-gray-400">Connections</p>
                </div>
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3">
                  <p className="text-xl lg:text-2xl font-bold text-purple-400">{networkStats.clusters}</p>
                  <p className="text-xs text-gray-400">Clusters</p>
                </div>
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3">
                  <p className="text-xl lg:text-2xl font-bold text-red-400">{networkStats.criticalNodes}</p>
                  <p className="text-xs text-gray-400">Critical Nodes</p>
                </div>
              </div>

              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3">
                <p className="text-sm font-semibold text-white mb-1">Network Density</p>
                <p className="text-lg font-bold text-green-400">{networkStats.averageConnections}</p>
                <p className="text-xs text-gray-400">Average connections per entity</p>
              </div>
            </div>

            {/* Layout Controls */}
            <div className="p-6 border-b border-gray-700/50">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5 text-green-400" />
                Layout & View
              </h3>
              
              <div className="space-y-2 mb-6">
                {layoutOptions.map((layout) => (
                  <button
                    key={layout.id}
                    onClick={() => setView(prev => ({ ...prev, layout: layout.id as 'force' | 'circular' | 'hierarchical' | 'geographic' }))}
                    className={`w-full text-left p-3 rounded-lg border transition-all ${
                      view.layout === layout.id
                        ? 'bg-green-500/20 border-green-500 text-green-400'
                        : 'bg-gray-800/30 border-gray-700 hover:border-gray-600 text-gray-300'
                    }`}
                  >
                    <div className="font-semibold">{layout.label}</div>
                    <div className="text-sm opacity-75">{layout.description}</div>
                  </button>
                ))}
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={view.clustering}
                    onChange={(e) => setView(prev => ({ ...prev, clustering: e.target.checked }))}
                    className="hidden"
                  />
                  <div className={`w-4 h-4 border-2 rounded transition-all ${
                    view.clustering ? 'bg-green-500 border-green-500' : 'border-gray-500'
                  }`}>
                    {view.clustering && <CheckCircle className="w-full h-full text-black" />}
                  </div>
                  <span className="text-sm text-white">Enable Clustering</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={view.physics}
                    onChange={(e) => setView(prev => ({ ...prev, physics: e.target.checked }))}
                    className="hidden"
                  />
                  <div className={`w-4 h-4 border-2 rounded transition-all ${
                    view.physics ? 'bg-green-500 border-green-500' : 'border-gray-500'
                  }`}>
                    {view.physics && <CheckCircle className="w-full h-full text-black" />}
                  </div>
                  <span className="text-sm text-white">Physics Simulation</span>
                </label>
              </div>
            </div>

            {/* Entity Type Filters */}
            <div className="p-6 border-b border-gray-700/50">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-green-400" />
                Entity Types
              </h3>
              
              <div className="space-y-3">
                {entityTypes.map((type) => (
                  <label
                    key={type.id}
                    className="flex items-center gap-3 p-3 bg-gray-800/30 border border-gray-700 rounded-lg hover:border-gray-600 cursor-pointer transition-all"
                  >
                    <div className={`w-4 h-4 border-2 rounded transition-all ${
                      filters.entityTypes.includes(type.id)
                        ? 'bg-green-500 border-green-500'
                        : 'border-gray-500'
                    }`}>
                      {filters.entityTypes.includes(type.id) && (
                        <CheckCircle className="w-full h-full text-black" />
                      )}
                    </div>
                    
                    <input
                      type="checkbox"
                      checked={filters.entityTypes.includes(type.id)}
                      onChange={() => toggleEntityType(type.id)}
                      className="hidden"
                    />
                    
                    <div className={type.color}>
                      {type.icon}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-white">{type.label}</span>
                        <span className="text-xs text-gray-400">({type.count})</span>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Relationship Type Filters */}
            <div className="p-6 border-b border-gray-700/50 flex-1">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-green-400" />
                Relationship Types
              </h3>
              
              <div className="space-y-3">
                {relationshipTypes.map((type) => (
                  <label
                    key={type.id}
                    className="flex items-center gap-3 p-3 bg-gray-800/30 border border-gray-700 rounded-lg hover:border-gray-600 cursor-pointer transition-all"
                  >
                    <div className={`w-4 h-4 border-2 rounded transition-all ${
                      filters.relationshipTypes.includes(type.id)
                        ? 'bg-green-500 border-green-500'
                        : 'border-gray-500'
                    }`}>
                      {filters.relationshipTypes.includes(type.id) && (
                        <CheckCircle className="w-full h-full text-black" />
                      )}
                    </div>
                    
                    <input
                      type="checkbox"
                      checked={filters.relationshipTypes.includes(type.id)}
                      onChange={() => toggleRelationshipType(type.id)}
                      className="hidden"
                    />
                    
                    <div className={type.color}>
                      {type.icon}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-white">{type.label}</span>
                        <span className="text-xs text-gray-400">({type.count})</span>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Status */}
            <div className="p-6 border-t border-gray-700/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${isSimulating ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
                  <span className="text-sm text-gray-400">
                    {isSimulating ? 'Simulation Active' : 'Simulation Paused'}
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  Updated: {networkStats.lastUpdated}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Main Network Area - Mobile Responsive */}
        <div className="flex-1 relative min-h-[60vh] lg:min-h-0">
          <div className="h-full bg-gradient-to-br from-gray-900 to-black p-2 sm:p-4 lg:p-0">
            <NetworkAnalysis />
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

          {/* Network Status - Mobile Responsive */}
          <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 z-30 bg-gray-900/90 border border-gray-600 rounded-lg px-2 sm:px-3 py-2 backdrop-blur-sm">
            <p className="text-xs text-gray-400 flex items-center gap-2">
              <Network className="w-3 h-3" />
              <span className="hidden sm:inline">Network Analysis Engine v2.1</span>
              <span className="sm:hidden">Network v2.1</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 