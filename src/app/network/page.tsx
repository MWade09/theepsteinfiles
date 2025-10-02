'use client';

import { useRef, useState, useEffect } from 'react';
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
  Activity,
  BarChart3
} from 'lucide-react';
import NetworkVisualization, { NetworkVisualizationHandle } from '@/components/NetworkVisualization';
import { comprehensiveTimeline } from '@/data/core/timeline';
import { corePeople } from '@/data/core/people';
import { coreOrganizations } from '@/data/core/organizations';
import { enhancedProperties } from '@/data/geographic/properties';
import { useMemo } from 'react';
import type { TimelineEvent, EventEntity } from '@/types/investigation';


type VisNode = {
  id: string;
  name: string;
  type: 'person' | 'event' | 'organization' | 'location';
  significance?: 'critical' | 'high' | 'medium' | 'low';
};

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
  edgeWeight: 'strength' | 'uniform';
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
  const [showLegend, setShowLegend] = useState(true);
  const vizRef = useRef<NetworkVisualizationHandle | null>(null);
  const [selectedNode, setSelectedNode] = useState<VisNode | null>(null);
  const [focusEntityId, setFocusEntityId] = useState<string | null>(null);
  const [transitionDurationMs, setTransitionDurationMs] = useState<number>(600);
  const [transitionEasing, setTransitionEasing] = useState<'linear' | 'quadInOut' | 'cubicInOut'>('cubicInOut');
  const [showLabels, setShowLabels] = useState(true);
  const [labelFontSize, setLabelFontSize] = useState(12);
  const [labelMaxLength, setLabelMaxLength] = useState(20);
  const [layoutPadding, setLayoutPadding] = useState(60);
  const [pinnedNodeIds, setPinnedNodeIds] = useState<string[]>([]);
  const [labelCollisionAvoidance, setLabelCollisionAvoidance] = useState(true);
  const [labelShowTypes, setLabelShowTypes] = useState<Array<'person' | 'event' | 'organization' | 'location'>>(['person', 'event', 'organization', 'location']);
  const [labelMinSignificance, setLabelMinSignificance] = useState<'low' | 'medium' | 'high' | 'critical'>('low');
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);
  const [showPath, setShowPath] = useState(false);

  // Persist UI preferences
  useEffect(() => {
    try {
      const saved = localStorage.getItem('network_ui_prefs');
      if (saved) {
        const prefs = JSON.parse(saved);
        if (typeof prefs.transitionDurationMs === 'number') setTransitionDurationMs(prefs.transitionDurationMs);
        if (prefs.transitionEasing) setTransitionEasing(prefs.transitionEasing);
        if (typeof prefs.showLabels === 'boolean') setShowLabels(prefs.showLabels);
        if (typeof prefs.labelFontSize === 'number') setLabelFontSize(prefs.labelFontSize);
        if (typeof prefs.labelMaxLength === 'number') setLabelMaxLength(prefs.labelMaxLength);
        if (typeof prefs.layoutPadding === 'number') setLayoutPadding(prefs.layoutPadding);
        if (typeof prefs.labelCollisionAvoidance === 'boolean') setLabelCollisionAvoidance(prefs.labelCollisionAvoidance);
        if (Array.isArray(prefs.labelShowTypes)) setLabelShowTypes(prefs.labelShowTypes);
        if (prefs.labelMinSignificance) setLabelMinSignificance(prefs.labelMinSignificance);
      }
    } catch {}
  }, []);
  useEffect(() => {
    const prefs = {
      transitionDurationMs,
      transitionEasing,
      showLabels,
      labelFontSize,
      labelMaxLength,
      layoutPadding,
      labelCollisionAvoidance,
      labelShowTypes,
      labelMinSignificance
    };
    try { localStorage.setItem('network_ui_prefs', JSON.stringify(prefs)); } catch {}
  }, [transitionDurationMs, transitionEasing, showLabels, labelFontSize, labelMaxLength, layoutPadding, labelCollisionAvoidance, labelShowTypes, labelMinSignificance]);

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

  // Map sidebar filters to visualization filters
  const minSignificance = (() => {
    const order = ['low', 'medium', 'high', 'critical'];
    if (!filters.significanceLevels || filters.significanceLevels.length === 0) return 'low';
    const indices = filters.significanceLevels
      .map(level => order.indexOf(level))
      .filter(i => i >= 0);
    const minIndex = Math.min(...indices);
    return order[minIndex] as 'low' | 'medium' | 'high' | 'critical';
  })();

  const externalFilters = {
    showPeople: filters.entityTypes.includes('individual'),
    showOrganizations: filters.entityTypes.includes('organization') || filters.entityTypes.includes('company') || filters.entityTypes.includes('government'),
    showLocations: filters.entityTypes.includes('location'),
    showEvents: true,
    minSignificance
  } as const;

  // Optimized filtered events computation with better performance
  const filteredEvents = useMemo(() => {

    const selectedSigs = new Set(filters.significanceLevels);
    const selectedRel = new Set(filters.relationshipTypes);
    const search = searchQuery.trim().toLowerCase();

    // Early returns for common cases
    if (selectedSigs.size === 0 && selectedRel.size === 0 && !search && (!filters.timeRanges || filters.timeRanges.length === 0)) {
      return comprehensiveTimeline;
    }

    const matchesTimeRange = (dateStr: string) => {
      if (!filters.timeRanges || filters.timeRanges.length === 0) return true;
      const year = parseInt(dateStr.slice(0, 4), 10);
      return filters.timeRanges.some(range => {
        const [startStr, endStr] = range.split('-');
        const start = parseInt(startStr, 10);
        const end = parseInt(endStr, 10);
        return year >= start && year <= end;
      });
    };

    const matchesRelationshipType = (event: TimelineEvent) => {
      if (selectedRel.size === 0) return true;
      const coversAll = ['business', 'personal', 'financial', 'legal', 'travel'].every(t => selectedRel.has(t));
      if (coversAll) return true;

      const eventType = event.type;
      const eventCategory = event.category;
      const roles = (event.entities || []).map((e: EventEntity) => (e.role || '').toLowerCase());

      const typeMatches: Record<string, boolean> = {
        business: eventType === 'business' || eventCategory === 'financial' || roles.some(r => r.includes('board') || r.includes('employer') || r.includes('client')),
        financial: eventCategory === 'financial' || roles.some(r => r.includes('owner') || r.includes('investor') || r.includes('donor') || r.includes('payment')),
        legal: eventType === 'legal' || eventCategory === 'criminal' || eventCategory === 'civil' || roles.some(r => r.includes('defendant') || r.includes('prosecutor') || r.includes('witness')),
        travel: eventType === 'travel' || roles.some(r => r.includes('pilot') || r.includes('passenger')),
        personal: eventCategory === 'social' || eventType === 'meeting' || roles.some(r => r.includes('associate') || r.includes('partner') || r.includes('friend') || r.includes('romantic'))
      };

      return Array.from(selectedRel).some(key => typeMatches[key as keyof typeof typeMatches]);
    };

    const matchesSearch = (event: TimelineEvent) => {
      if (!search) return true;
      const inText = (event.title + ' ' + event.description).toLowerCase().includes(search);
      if (inText) return true;

      // Optimized entity search
      return (event.entities || []).some((ent: EventEntity) => {
        if (ent.entityType === 'person') {
          const p = corePeople.find(pp => pp.id === ent.entityId);
          return p && (p.name.toLowerCase().includes(search) || p.tags.some(t => t.toLowerCase().includes(search)));
        }
        if (ent.entityType === 'organization') {
          const o = coreOrganizations.find(oo => oo.id === ent.entityId);
          return o && (o.name.toLowerCase().includes(search) || o.tags.some(t => t.toLowerCase().includes(search)));
        }
        return String(ent.entityId).toLowerCase().includes(search);
      });
    };

    const result = comprehensiveTimeline.filter(event => {
      const sigOk = selectedSigs.size === 0 ? true : selectedSigs.has(event.significance);
      return sigOk && matchesTimeRange(event.date) && matchesRelationshipType(event) && matchesSearch(event);
    });

    return result;
  }, [filters.significanceLevels, filters.timeRanges, filters.relationshipTypes, searchQuery]);

  // Network analytics calculation (now after filteredEvents)
  const networkAnalytics = useMemo(() => {
    const entityConnections = new Map<string, Set<string>>();
    const entityTypes = new Map<string, string>();
    const eventCategories = new Map<string, number>();

    // Build connection graph
    filteredEvents.forEach(event => {
      const entities = event.entities || [];
      entities.forEach(entity => {
        if (!entityConnections.has(entity.entityId)) {
          entityConnections.set(entity.entityId, new Set());
          entityTypes.set(entity.entityId, entity.entityType);
        }

        entities.forEach(otherEntity => {
          if (entity.entityId !== otherEntity.entityId) {
            entityConnections.get(entity.entityId)!.add(otherEntity.entityId);
          }
        });
      });

      // Count event categories
      const category = event.category || 'other';
      eventCategories.set(category, (eventCategories.get(category) || 0) + 1);
    });

    // Calculate centrality metrics
    const centrality = Array.from(entityConnections.entries()).map(([id, connections]) => ({
      id,
      degree: connections.size,
      type: entityTypes.get(id) || 'unknown'
    })).sort((a, b) => b.degree - a.degree);

    // Find communities (simple clustering by connection density)
    const communities = new Map<number, Set<string>>();
    let communityId = 0;

    centrality.forEach(node => {
      const connections = entityConnections.get(node.id) || new Set();
      let foundCommunity = false;

      for (const [, members] of Array.from(communities.entries())) {
        const overlap = Array.from(connections).filter(conn => members.has(conn)).length;
        if (overlap > 0) {
          members.add(node.id);
          foundCommunity = true;
          break;
        }
      }

      if (!foundCommunity) {
        communities.set(communityId++, new Set([node.id]));
      }
    });

    return {
      totalEntities: entityConnections.size,
      totalConnections: Array.from(entityConnections.values()).reduce((sum, conn) => sum + conn.size, 0) / 2,
      centrality,
      communities: Array.from(communities.entries()).map(([id, members]) => ({
        id,
        size: members.size,
        members: Array.from(members)
      })).sort((a, b) => b.size - a.size),
      eventCategories: Array.from(eventCategories.entries()).map(([category, count]) => ({
        category,
        count
      })).sort((a, b) => b.count - a.count)
    };
  }, [filteredEvents]);

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
                  onClick={() => { resetNetwork(); vizRef.current?.resetZoom(); }}
                  className="p-2 hover:bg-gray-600 rounded transition-colors touch-target"
                  title="Reset layout"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                
                <button
                  className="p-2 hover:bg-gray-600 rounded transition-colors touch-target"
                  title="Zoom In"
                  onClick={() => vizRef.current?.zoomIn()}
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                
                <button
                  className="p-2 hover:bg-gray-600 rounded transition-colors touch-target"
                  title="Zoom Out"
                  onClick={() => vizRef.current?.zoomOut()}
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
              <div className="flex items-center gap-2">
                <button
                  onClick={() => vizRef.current?.exportPNG()}
                  className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg hover:border-gray-500 transition-colors touch-target"
                  title="Export PNG"
                >
                  <Download className="w-4 h-4" />
                  <span className="text-sm hidden sm:inline">PNG</span>
                </button>
                <button
                  onClick={() => vizRef.current?.exportSVG()}
                  className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg hover:border-gray-500 transition-colors touch-target"
                  title="Export SVG"
                >
                  <Download className="w-4 h-4" />
                  <span className="text-sm hidden sm:inline">SVG</span>
                </button>
              </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row h-auto lg:h-screen">
        {/* Filter & Control Panel - Enhanced Mobile Responsive */}
        {showFilterPanel && (
          <div className="w-full lg:w-80 xl:w-96 bg-gradient-to-br from-gray-900/98 to-gray-800/95 border-b lg:border-r lg:border-b-0 border-gray-700/50 backdrop-blur-md relative z-40 flex flex-col max-h-screen lg:h-auto overflow-y-auto shadow-2xl">
            {/* Statistics - Enhanced Mobile Layout */}
            <div className="p-4 lg:p-6 border-b border-gray-700/50">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-green-400 animate-pulse" />
                Network Intelligence Dashboard
              </h3>

              <div className="grid grid-cols-2 lg:grid-cols-2 gap-3 lg:gap-4 mb-4 lg:mb-6">
                <div className="bg-gradient-to-br from-gray-800/60 to-gray-700/40 border border-gray-600/50 rounded-xl p-4 hover:border-green-400/50 transition-all group">
                  <div className="flex items-center justify-between mb-2">
                    <Users className="w-4 h-4 text-blue-400" />
                    <span className="text-xs font-medium text-gray-400">Entities</span>
                  </div>
                  <p className="text-2xl lg:text-3xl font-bold text-blue-400 group-hover:text-blue-300 transition-colors">{networkStats.totalEntities.toLocaleString()}</p>
                  <p className="text-xs text-gray-500 mt-1">People, organizations & locations</p>
                </div>
                <div className="bg-gradient-to-br from-gray-800/60 to-gray-700/40 border border-gray-600/50 rounded-xl p-4 hover:border-purple-400/50 transition-all group">
                  <div className="flex items-center justify-between mb-2">
                    <Zap className="w-4 h-4 text-purple-400" />
                    <span className="text-xs font-medium text-gray-400">Connections</span>
                  </div>
                  <p className="text-2xl lg:text-3xl font-bold text-purple-400 group-hover:text-purple-300 transition-colors">{networkStats.totalConnections.toLocaleString()}</p>
                  <p className="text-xs text-gray-500 mt-1">Active relationships</p>
                </div>
                <div className="bg-gradient-to-br from-gray-800/60 to-gray-700/40 border border-gray-600/50 rounded-xl p-4 hover:border-cyan-400/50 transition-all group">
                  <div className="flex items-center justify-between mb-2">
                    <Network className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-medium text-gray-400">Clusters</span>
                  </div>
                  <p className="text-2xl lg:text-3xl font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors">{networkStats.clusters}</p>
                  <p className="text-xs text-gray-500 mt-1">Network communities</p>
                </div>
                <div className="bg-gradient-to-br from-gray-800/60 to-gray-700/40 border border-gray-600/50 rounded-xl p-4 hover:border-red-400/50 transition-all group">
                  <div className="flex items-center justify-between mb-2">
                    <CheckCircle className="w-4 h-4 text-red-400" />
                    <span className="text-xs font-medium text-gray-400">Critical</span>
                  </div>
                  <p className="text-2xl lg:text-3xl font-bold text-red-400 group-hover:text-red-300 transition-colors">{networkStats.criticalNodes}</p>
                  <p className="text-xs text-gray-500 mt-1">High-priority nodes</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-800/60 to-gray-700/40 border border-gray-600/50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-green-400" />
                    <span className="text-sm font-semibold text-white">Network Health</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-400">Live</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-gray-400">Connectivity</span>
                      <span className="text-sm font-medium text-green-400">{networkStats.averageConnections}/10</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full" style={{ width: `${(networkStats.averageConnections / 10) * 100}%` }}></div>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Max Degree:</span>
                    <span className="text-white font-medium">{networkStats.maxDegree}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Last Updated:</span>
                    <span className="text-white font-medium">{networkStats.lastUpdated}</span>
                  </div>
                </div>
              </div>

              {/* Network Analytics Section */}
              <div className="p-6 border-b border-gray-700/50">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-green-400" />
                  Network Intelligence
                </h3>

                <div className="grid grid-cols-1 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/10 border border-blue-700/30 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Network className="w-4 h-4 text-blue-400" />
                        <span className="text-sm font-semibold text-white">Top Influencers</span>
                      </div>
                      <span className="text-xs text-blue-400">{networkAnalytics.centrality.slice(0, 3).length} shown</span>
                    </div>
                    <div className="space-y-2">
                      {networkAnalytics.centrality.slice(0, 3).map((node, idx) => (
                        <div key={node.id} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${idx === 0 ? 'bg-yellow-400' : idx === 1 ? 'bg-gray-400' : 'bg-orange-400'}`}></div>
                            <span className="text-gray-300 capitalize">{node.type}</span>
                          </div>
                          <span className="text-white font-medium">{node.degree} connections</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-900/20 to-purple-800/10 border border-purple-700/30 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-purple-400" />
                        <span className="text-sm font-semibold text-white">Community Structure</span>
                      </div>
                      <span className="text-xs text-purple-400">{networkAnalytics.communities.length} clusters</span>
                    </div>
                    <div className="space-y-2">
                      {networkAnalytics.communities.slice(0, 3).map((community, idx) => (
                        <div key={community.id} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${idx === 0 ? 'bg-purple-400' : idx === 1 ? 'bg-indigo-400' : 'bg-pink-400'}`}></div>
                            <span className="text-gray-300">Cluster {community.id + 1}</span>
                          </div>
                          <span className="text-white font-medium">{community.size} members</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-gray-800/60 to-gray-700/40 border border-gray-600/50 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Activity className="w-4 h-4 text-green-400" />
                    <span className="text-sm font-semibold text-white">Live Analytics</span>
                    <div className="ml-auto flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-green-400">Real-time</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Entities</span>
                      <p className="text-lg font-bold text-blue-400">{networkAnalytics.totalEntities}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Connections</span>
                      <p className="text-lg font-bold text-purple-400">{Math.round(networkAnalytics.totalConnections)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Layout Controls - Enhanced */}
            <div className="p-6 border-b border-gray-700/50">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5 text-green-400" />
                Network Layout & Visualization
              </h3>

              <div className="space-y-3 mb-6">
                {layoutOptions.map((layout) => (
                  <button
                    key={layout.id}
                    onClick={() => setView(prev => ({ ...prev, layout: layout.id as 'force' | 'circular' | 'hierarchical' | 'geographic' }))}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                      view.layout === layout.id
                        ? 'bg-gradient-to-r from-green-500/20 to-green-400/10 border-green-400/50 text-green-300 shadow-lg'
                        : 'bg-gradient-to-r from-gray-800/40 to-gray-700/20 border-gray-600/50 hover:border-gray-500/70 text-gray-300 hover:bg-gray-700/30'
                    }`}
                  >
                    <div className="font-semibold text-white mb-1">{layout.label}</div>
                    <div className="text-sm opacity-80 text-gray-400">{layout.description}</div>
                    <div className="mt-2 flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${view.layout === layout.id ? 'bg-green-400' : 'bg-gray-500'}`}></div>
                      <span className="text-xs text-gray-500">Click to select</span>
                    </div>
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

                <div>
                  <label className="block text-sm text-gray-300 mb-2">Transition Duration: {transitionDurationMs}ms</label>
                  <input
                    type="range"
                    min={200}
                    max={2000}
                    step={50}
                    value={transitionDurationMs}
                    onChange={(e) => setTransitionDurationMs(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-2">Transition Easing</label>
                  <select
                    value={transitionEasing}
                    onChange={(e) => setTransitionEasing(e.target.value as 'linear' | 'quadInOut' | 'cubicInOut')}
                    className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-400"
                  >
                    <option value="linear">Linear</option>
                    <option value="quadInOut">Quad InOut</option>
                    <option value="cubicInOut">Cubic InOut</option>
                  </select>
                </div>

              <div className="pt-2 border-t border-gray-700 space-y-3">
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={showLabels} onChange={(e) => setShowLabels(e.target.checked)} />
                  <span className="text-sm text-gray-300">Show Labels</span>
                </label>
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Label Font Size: {labelFontSize}px</label>
                  <input type="range" min={8} max={18} value={labelFontSize} onChange={(e) => setLabelFontSize(parseInt(e.target.value))} className="w-full" />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Label Max Length: {labelMaxLength}</label>
                  <input type="range" min={10} max={40} value={labelMaxLength} onChange={(e) => setLabelMaxLength(parseInt(e.target.value))} className="w-full" />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Layout Padding: {layoutPadding}px</label>
                  <input type="range" min={20} max={120} step={5} value={layoutPadding} onChange={(e) => setLayoutPadding(parseInt(e.target.value))} className="w-full" />
                </div>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={labelCollisionAvoidance} onChange={(e) => setLabelCollisionAvoidance(e.target.checked)} />
                  <span className="text-sm text-gray-300">Label Collision Avoidance</span>
                </label>
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Show Labels For Types</label>
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-300">
                    {(['person','event','organization','location'] as const).map(t => (
                      <label key={t} className="flex items-center gap-2">
                        <input type="checkbox" checked={labelShowTypes.includes(t)} onChange={(e) => setLabelShowTypes(prev => e.target.checked ? [...prev, t] : prev.filter(x => x !== t))} />
                        <span className="capitalize">{t}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Minimum Label Significance</label>
                  <select value={labelMinSignificance} onChange={(e) => setLabelMinSignificance(e.target.value as 'low' | 'medium' | 'high' | 'critical')} className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-400">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
              </div>
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

        {/* Main Network Area - Enhanced Mobile Responsive */}
        <div className="flex-1 relative min-h-[60vh] lg:min-h-0">
          <div className="h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black p-2 sm:p-4 lg:p-0 relative overflow-hidden">
            {/* Network Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
                                  radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                                  radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)`
              }}></div>
            </div>

            {/* Network Visualization with Enhanced Container */}
            <div className="relative w-full h-full rounded-xl border border-gray-700/30 bg-gray-900/20 backdrop-blur-sm overflow-hidden shadow-2xl">
              <NetworkVisualization
                ref={vizRef}
                events={filteredEvents}
                externalFilters={externalFilters}
                showUI={false}
                layout={view.layout}
                clustering={view.clustering}
                physics={view.physics}
                nodeSizeMode={view.nodeSize}
                edgeWeightMode={view.edgeWeight}
                className="w-full h-full"
                showLegend={showLegend}
                focusEntityId={focusEntityId}
                onNodeSelect={(n) => setSelectedNode(n)}
                transitionDurationMs={transitionDurationMs}
                transitionEasing={transitionEasing}
                showLabels={showLabels}
                labelFontSize={labelFontSize}
                labelMaxLength={labelMaxLength}
                layoutPadding={layoutPadding}
                pinnedNodeIds={pinnedNodeIds}
                labelCollisionAvoidance={labelCollisionAvoidance}
                labelShowTypes={labelShowTypes}
                labelMinSignificance={labelMinSignificance}
              />

              {/* Performance Overlay */}
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-2 text-xs text-gray-300 border border-gray-600/50">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${filteredEvents.length > 100 ? 'bg-yellow-400' : 'bg-green-400'}`}></div>
                  <span>{filteredEvents.length} events</span>
                  <span>•</span>
                  <span>{Math.round(filteredEvents.length / comprehensiveTimeline.length * 100)}% filtered</span>
                </div>
              </div>
            </div>
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

              {/* Network Status & Controls - Enhanced Mobile Responsive */}
              <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 z-30 bg-gray-900/90 border border-gray-600 rounded-lg px-2 sm:px-3 py-2 backdrop-blur-sm">
                <p className="text-xs text-gray-400 flex items-center gap-2">
                  <Network className="w-3 h-3" />
                  <span className="hidden sm:inline">Network Analysis Engine v2.1</span>
                  <span className="sm:hidden">Network v2.1</span>
                </p>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setShowLegend(v => !v)}
                    className="px-2 py-1 text-xs bg-gray-800 border border-gray-700 rounded hover:border-gray-500 transition-colors"
                  >
                    {showLegend ? 'Hide Legend' : 'Show Legend'}
                  </button>

                  <button
                    onClick={() => {
                      if (selectedNodes.length === 2) {
                        setShowPath(!showPath);
                      }
                    }}
                    className={`px-2 py-1 text-xs rounded transition-colors ${
                      selectedNodes.length === 2
                        ? 'bg-blue-600 border border-blue-500 hover:bg-blue-700'
                        : 'bg-gray-800 border border-gray-700 opacity-50 cursor-not-allowed'
                    }`}
                    disabled={selectedNodes.length !== 2}
                    title={selectedNodes.length === 2 ? 'Find connection path' : 'Select 2 nodes to find path'}
                  >
                    {showPath ? 'Hide Path' : 'Find Path'}
                  </button>

                  {selectedNode && (
                    <>
                      <button
                        onClick={() => setFocusEntityId(prev => prev === selectedNode.id ? null : selectedNode.id)}
                        className="px-2 py-1 text-xs bg-purple-600 border border-purple-500 rounded hover:bg-purple-700 transition-colors"
                      >
                        {focusEntityId === selectedNode.id ? 'Unfocus' : 'Focus'}
                      </button>

                      {selectedNodes.length < 2 && (
                        <button
                          onClick={() => {
                            if (!selectedNodes.includes(selectedNode.id)) {
                              setSelectedNodes(prev => [...prev, selectedNode.id]);
                            }
                          }}
                          className={`px-2 py-1 text-xs rounded transition-colors ${
                            selectedNodes.includes(selectedNode.id)
                              ? 'bg-gray-700 border border-gray-600'
                              : 'bg-green-600 border border-green-500 hover:bg-green-700'
                          }`}
                        >
                          {selectedNodes.includes(selectedNode.id) ? 'Selected' : 'Select'}
                        </button>
                      )}
                    </>
                  )}

                  {selectedNodes.length > 0 && (
                    <button
                      onClick={() => {
                        setSelectedNodes([]);
                        setShowPath(false);
                      }}
                      className="px-2 py-1 text-xs bg-red-600 border border-red-500 rounded hover:bg-red-700 transition-colors"
                    >
                      Clear ({selectedNodes.length})
                    </button>
                  )}
                </div>

                {selectedNodes.length > 0 && (
                  <div className="mt-2 text-xs text-gray-300">
                    {selectedNodes.length}/2 nodes selected for path analysis
                  </div>
                )}
              </div>

          {/* Right-side Detail Panel */}
          {selectedNode && (
            <div className="absolute top-0 right-0 h-full w-80 bg-gray-900/95 border-l border-gray-700/50 backdrop-blur-sm z-40 p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">{selectedNode.name}</h3>
                <button onClick={() => setSelectedNode(null)} className="text-gray-400 hover:text-white">✕</button>
              </div>

              <div className="space-y-4 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Type</span>
                  <span className="capitalize">{selectedNode.type}</span>
                </div>
                {selectedNode.significance && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Significance</span>
                    <span className="capitalize">{selectedNode.significance}</span>
                  </div>
                )}

                {(() => {
                  const id: string = selectedNode.id;
                  if (selectedNode.type === 'person') {
                    const person = corePeople.find(p => p.id === id);
                    if (!person) return null;
                    const involvedEvents = filteredEvents.filter(e => e.entities.some(ent => ent.entityId === id));
                    return (
                      <div className="space-y-3">
                        <div>
                          <span className="text-gray-400">Occupations</span>
                          <div className="mt-1">{person.occupations.join(', ')}</div>
                        </div>
                        <div>
                          <span className="text-gray-400">Tags</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {person.tags.map(tag => (
                              <span key={tag} className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs">{tag}</span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-400">Events Involved</span>
                          <div className="mt-1 text-gray-300">{involvedEvents.length}</div>
                        </div>
                        <div>
                          <span className="text-gray-400">Biography</span>
                          <div className="mt-1 text-gray-300 leading-relaxed">{person.biography}</div>
                        </div>
                      </div>
                    );
                  }
                  if (selectedNode.type === 'organization') {
                    const org = coreOrganizations.find(o => o.id === id);
                    if (!org) return null;
                    return (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Type</span>
                          <span className="capitalize">{org.type}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Status</span>
                          <span className="capitalize">{org.currentStatus}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Tags</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {org.tags.map(tag => (
                              <span key={tag} className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs">{tag}</span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-400">Description</span>
                          <div className="mt-1 text-gray-300 leading-relaxed">{org.description}</div>
                        </div>
                      </div>
                    );
                  }
                  if (selectedNode.type === 'event') {
                    const event = filteredEvents.find(e => e.id === id);
                    if (!event) return null;
                    return (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Date</span>
                          <span>{new Date(event.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Category</span>
                          <span className="capitalize">{event.category}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Involved Entities</span>
                          <div className="mt-1 space-y-1 text-gray-300">
                            {event.entities.slice(0, 5).map(ent => (
                              <div key={ent.entityId} className="flex justify-between">
                                <span className="font-medium">{ent.role}</span>
                                <span className="text-gray-400">{ent.entityType}</span>
                              </div>
                            ))}
                            {event.entities.length > 5 && (
                              <div className="text-xs text-gray-500">+{event.entities.length - 5} more</div>
                            )}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-400">Description</span>
                          <div className="mt-1 text-gray-300 leading-relaxed">{event.description}</div>
                        </div>
                      </div>
                    );
                  }
                  if (selectedNode.type === 'location') {
                    const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
                    const prop = enhancedProperties.find(p => normalize(p.id.replace(/^property_/, '')) === normalize(id) || normalize(p.name) === normalize(selectedNode.name));
                    if (!prop) return null;
                    return (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Type</span>
                          <span className="capitalize">{prop.type}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Status</span>
                          <span className="capitalize">{prop.currentStatus}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Description</span>
                          <div className="mt-1 text-gray-300 leading-relaxed">{prop.description}</div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400">Coordinates</span>
                          <span>{prop.coordinates[0].toFixed(3)}, {prop.coordinates[1].toFixed(3)}</span>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })()}

                <div className="pt-2 border-t border-gray-700 flex items-center gap-2">
                  <button
                    onClick={() => setFocusEntityId(prev => prev === selectedNode.id ? null : selectedNode.id)}
                    className="px-3 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-xs"
                  >
                    {focusEntityId === selectedNode.id ? 'Unfocus' : 'Focus on Node'}
                  </button>
                <button
                  onClick={() => setPinnedNodeIds(prev => prev.includes(selectedNode.id) ? prev.filter(id => id !== selectedNode.id) : [...prev, selectedNode.id])}
                  className="px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-xs"
                >
                  {pinnedNodeIds.includes(selectedNode.id) ? 'Unpin' : 'Pin Node'}
                </button>
                  <button
                    onClick={() => setSelectedNode(null)}
                    className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-xs"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 