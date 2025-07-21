'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { NetworkNode, NetworkEdge, Person, Relationship } from '@/types/investigation';
import { corePeople } from '@/data/core/people';
import { coreRelationships } from '@/data/core/relationships';
import { coreOrganizations } from '@/data/core/organizations';
import { comprehensiveTimeline } from '@/data/core/timeline';
import { financialTransactions } from '@/data/financial/transactions';
import { 
  Filter, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Info, 
  Settings,
  Eye,
  EyeOff,
  Search,
  Download,
  Share
} from 'lucide-react';

interface NetworkAnalysisProps {
  focusEntityId?: string;
  maxConnections?: number;
}

interface NetworkFilter {
  relationshipTypes: string[];
  significanceLevel: string[];
  verificationStatus: string[];
  entityTypes: string[];
  minConnectionStrength: number;
}

interface NodePosition {
  x: number;
  y: number;
}

interface LayoutSettings {
  nodeSize: number;
  linkDistance: number;
  charge: number;
  centerForce: number;
}

export default function NetworkAnalysis({ 
  focusEntityId, 
  maxConnections = 50 
}: NetworkAnalysisProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedNode, setSelectedNode] = useState<NetworkNode | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<NetworkEdge | null>(null);
  const [hoveredNode, setHoveredNode] = useState<NetworkNode | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  
  const [filters, setFilters] = useState<NetworkFilter>({
    relationshipTypes: ['all'],
    significanceLevel: ['critical', 'high', 'medium'],
    verificationStatus: ['verified', 'pending'],
    entityTypes: ['person', 'organization', 'location'],
    minConnectionStrength: 0
  });

  const [showAnalysisPanel, setShowAnalysisPanel] = useState(false);
  const [showFinancialConnections, setShowFinancialConnections] = useState(false);
  const [focusEntity, setFocusEntity] = useState<string | null>(focusEntityId || null);

  const [layoutSettings, setLayoutSettings] = useState<LayoutSettings>({
    nodeSize: 8,
    linkDistance: 100,
    charge: -300,
    centerForce: 0.1
  });

  // Helper function for node colors
  const getNodeColor = (significance: string, type: string): string => {
    const baseColors = {
      person: '#3b82f6',
      organization: '#10b981', 
      location: '#f59e0b',
      financial: '#8b5cf6',
      event: '#ef4444'
    };
    
    const significanceMultiplier = {
      critical: 1.0,
      high: 0.8,
      medium: 0.6,
      low: 0.4
    };

    // Apply significance multiplier to color intensity
    const baseColor = baseColors[type as keyof typeof baseColors] || baseColors.person;
    const opacity = significanceMultiplier[significance as keyof typeof significanceMultiplier] || 0.6;
    
    // Return color with adjusted opacity based on significance
    return `${baseColor}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`;
  };

  // Deterministic positioning based on person ID to avoid hydration mismatch
  const getNodePosition = (personId: string, maxX: number = 800, maxY: number = 600): NodePosition => {
    // Simple hash function to generate consistent positions
    let hash = 0;
    for (let i = 0; i < personId.length; i++) {
      const char = personId.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    
    // Ensure positive values and map to desired range
    const x = Math.abs(hash % maxX);
    const y = Math.abs((hash >> 16) % maxY);
    
    return { x, y };
  };

  // Generate network data from relationships
  const networkData = useMemo(() => {
    const nodes = new Map<string, NetworkNode>();
    const edges: NetworkEdge[] = [];
    
    // Filter relationships based on current filters
    const filteredRelationships = coreRelationships.filter(rel => {
      if (!filters.relationshipTypes.includes('all') && 
          !filters.relationshipTypes.includes(rel.type)) return false;
      if (!filters.significanceLevel.includes(rel.significance)) return false;
      if (!filters.verificationStatus.includes(rel.verificationStatus)) return false;
      
      const strengthValue = rel.strength === 'strong' ? 3 : 
                           rel.strength === 'moderate' ? 2 : 1;
      if (strengthValue < filters.minConnectionStrength) return false;
      
      return true;
    });

    // Build nodes from people and relationships
    corePeople.forEach(person => {
      if (searchTerm && !person.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !person.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))) {
        return;
      }

      const connectionCount = filteredRelationships.filter(rel => 
        rel.entity1Id === person.id || rel.entity2Id === person.id
      ).length;

      if (connectionCount === 0 && !focusEntity) return;

      const position = getNodePosition(person.id);

      nodes.set(person.id, {
        id: person.id,
        type: 'person',
        name: person.name,
        significance: person.significance,
        size: Math.max(
          layoutSettings.nodeSize, 
          layoutSettings.nodeSize + (connectionCount * 2)
        ),
        color: getNodeColor(person.significance, 'person'),
        x: position.x,
        y: position.y
      });
    });

    // Build nodes from organizations
    coreOrganizations.forEach(org => {
      if (searchTerm && !org.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !org.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))) {
        return;
      }

      const connectionCount = filteredRelationships.filter(rel => 
        rel.entity1Id === org.id || rel.entity2Id === org.id
      ).length;

      if (connectionCount === 0 && !focusEntity) return;

      const position = getNodePosition(org.id);

      nodes.set(org.id, {
        id: org.id,
        type: 'organization',
        name: org.name,
        significance: org.significance,
        size: Math.max(
          layoutSettings.nodeSize, 
          layoutSettings.nodeSize + (connectionCount * 2)
        ),
        color: getNodeColor(org.significance, 'organization'),
        x: position.x,
        y: position.y
      });
    });

    // Build nodes from timeline events (major events only)
    comprehensiveTimeline
      .filter(event => event.significance === 'high' || event.significance === 'critical')
      .forEach(event => {
        if (searchTerm && !event.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            !event.description.toLowerCase().includes(searchTerm.toLowerCase())) {
          return;
        }

        // Check if this event has connections to people/organizations already in the network
        const hasConnections = event.entities.some(entity => 
          nodes.has(entity.entityId) || 
          (entity.entityType === 'person' && corePeople.some(p => p.id === entity.entityId)) ||
          (entity.entityType === 'organization' && coreOrganizations.some(o => o.id === entity.entityId))
        );

        if (!hasConnections && !focusEntity) return;

        const position = getNodePosition(event.id);

        nodes.set(event.id, {
          id: event.id,
          type: 'event',
          name: event.title,
          significance: event.significance,
          size: Math.max(
            layoutSettings.nodeSize, 
            layoutSettings.nodeSize * 1.2 // Events slightly larger
          ),
          color: getNodeColor(event.significance, 'event'),
          x: position.x,
          y: position.y
        });
      });

    // Create edges from relationships
    filteredRelationships.forEach(rel => {
      if (nodes.has(rel.entity1Id) && nodes.has(rel.entity2Id)) {
        const strengthValue = rel.strength === 'strong' ? 0.9 : 
                             rel.strength === 'moderate' ? 0.6 : 0.3;
        
        edges.push({
          id: rel.id,
          source: rel.entity1Id,
          target: rel.entity2Id,
          relationshipType: rel.type,
          strength: strengthValue,
          significance: rel.significance,
          verified: rel.verificationStatus === 'verified'
        });
      }
    });

    // Create edges from timeline events to their entities
    comprehensiveTimeline
      .filter(event => nodes.has(event.id))
      .forEach(event => {
        event.entities.forEach(entity => {
          if (nodes.has(entity.entityId)) {
            edges.push({
              id: `${event.id}-${entity.entityId}`,
              source: event.id,
              target: entity.entityId,
              relationshipType: entity.role || 'involved',
              strength: event.significance === 'critical' ? 0.9 :
                       event.significance === 'high' ? 0.7 : 0.5,
              significance: event.significance,
              verified: event.verificationStatus === 'verified'
            });
          }
        });
      });

    // If focusing on specific entity, filter to connections
    if (focusEntity) {
      const connectedNodes = new Set([focusEntity]);
      edges.forEach(edge => {
        if (edge.source === focusEntity) connectedNodes.add(edge.target);
        if (edge.target === focusEntity) connectedNodes.add(edge.source);
      });

      // Add second-degree connections for key nodes
      const keyNodes = Array.from(connectedNodes).filter(nodeId => {
        const node = nodes.get(nodeId);
        return node && (node.significance === 'critical' || node.significance === 'high');
      });

      keyNodes.forEach(nodeId => {
        edges.forEach(edge => {
          if ((edge.source === nodeId || edge.target === nodeId) && 
              connectedNodes.size < maxConnections) {
            connectedNodes.add(edge.source);
            connectedNodes.add(edge.target);
          }
        });
      });

      // Filter nodes to only connected ones
      const filteredNodes = new Map();
      connectedNodes.forEach(nodeId => {
        if (nodes.has(nodeId)) {
          filteredNodes.set(nodeId, nodes.get(nodeId)!);
        }
      });

      return {
        nodes: Array.from(filteredNodes.values()),
        edges: edges.filter(edge => 
          connectedNodes.has(edge.source) && connectedNodes.has(edge.target)
        )
      };
    }

    return {
      nodes: Array.from(nodes.values()).slice(0, maxConnections),
      edges
    };
  }, [filters, searchTerm, focusEntity, maxConnections, layoutSettings]);

  const getEdgeColor = (significance: string, verified: boolean): string => {
    const alpha = verified ? '0.8' : '0.4';
    const colors = {
      critical: `rgba(220, 38, 38, ${alpha})`,
      high: `rgba(249, 115, 22, ${alpha})`,
      medium: `rgba(202, 138, 4, ${alpha})`,
      low: `rgba(107, 114, 128, ${alpha})`
    };
    return colors[significance as keyof typeof colors] || colors.medium;
  };

  const handleNodeClick = (node: NetworkNode) => {
    setSelectedNode(node);
    setSelectedEdge(null);
  };

  const handleEdgeClick = (edge: NetworkEdge) => {
    setSelectedEdge(edge);
    setSelectedNode(null);
  };

  const resetView = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
    setSelectedNode(null);
    setSelectedEdge(null);
  };

  const zoomIn = () => setZoomLevel(prev => Math.min(prev * 1.2, 3));
  const zoomOut = () => setZoomLevel(prev => Math.max(prev / 1.2, 0.3));

  // Force-directed layout simulation (simplified)
  useEffect(() => {
    if (!networkData.nodes.length) return;

    const simulation = () => {
      const alpha = 0.1;
      const centerX = 400;
      const centerY = 300;

      // Apply forces
      networkData.nodes.forEach(node => {
        // Center force
        const dx = centerX - (node.x || 0);
        const dy = centerY - (node.y || 0);
        node.x = (node.x || 0) + dx * layoutSettings.centerForce * alpha;
        node.y = (node.y || 0) + dy * layoutSettings.centerForce * alpha;

        // Repulsion between nodes
        networkData.nodes.forEach(other => {
          if (node.id === other.id) return;
          const dx = (node.x || 0) - (other.x || 0);
          const dy = (node.y || 0) - (other.y || 0);
          const distance = Math.sqrt(dx * dx + dy * dy) || 1;
          const force = layoutSettings.charge / (distance * distance);
          
          node.x = (node.x || 0) + (dx / distance) * force * alpha;
          node.y = (node.y || 0) + (dy / distance) * force * alpha;
        });
      });

      // Link forces
      networkData.edges.forEach(edge => {
        const source = networkData.nodes.find(n => n.id === edge.source);
        const target = networkData.nodes.find(n => n.id === edge.target);
        if (!source || !target) return;

        const dx = (target.x || 0) - (source.x || 0);
        const dy = (target.y || 0) - (source.y || 0);
        const distance = Math.sqrt(dx * dx + dy * dy) || 1;
        const targetDistance = layoutSettings.linkDistance * edge.strength;
        const force = (distance - targetDistance) * 0.1 * alpha;

        const fx = (dx / distance) * force;
        const fy = (dy / distance) * force;

        source.x = (source.x || 0) + fx;
        source.y = (source.y || 0) + fy;
        target.x = (target.x || 0) - fx;
        target.y = (target.y || 0) - fy;
      });
    };

    const interval = setInterval(simulation, 50);
    setTimeout(() => clearInterval(interval), 5000); // Run for 5 seconds

    return () => clearInterval(interval);
  }, [networkData, layoutSettings]);

  return (
    <div className="w-full h-full bg-white dark:bg-dark-900 rounded-lg overflow-hidden">
      {/* Header Controls */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-dark-700">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Network Analysis
          </h2>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {networkData.nodes.length} nodes, {networkData.edges.length} connections
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search entities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-64 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Zoom Controls */}
          <div className="flex items-center gap-1 border border-gray-300 dark:border-dark-600 rounded-lg">
            <button
              onClick={zoomOut}
              className="p-2 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-l-lg"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <div className="px-3 py-2 text-sm border-x border-gray-300 dark:border-dark-600">
              {Math.round(zoomLevel * 100)}%
            </div>
            <button
              onClick={zoomIn}
              className="p-2 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-r-lg"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          {/* Control Buttons */}
          <button
            onClick={resetView}
            className="p-2 border border-gray-300 dark:border-dark-600 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2 border border-gray-300 dark:border-dark-600 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 ${showFilters ? 'bg-primary-100 dark:bg-primary-900' : ''}`}
          >
            <Filter className="w-4 h-4" />
          </button>

          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`p-2 border border-gray-300 dark:border-dark-600 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 ${showSettings ? 'bg-primary-100 dark:bg-primary-900' : ''}`}
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Additional Analysis Controls */}
          <button
            onClick={() => setShowAnalysisPanel(!showAnalysisPanel)}
            className={`p-2 border border-gray-300 dark:border-dark-600 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 ${showAnalysisPanel ? 'bg-blue-100 dark:bg-blue-900' : ''}`}
            title="Toggle Analysis Panel"
          >
            <Info className="w-4 h-4" />
          </button>

          <button
            onClick={() => setShowFinancialConnections(!showFinancialConnections)}
            className={`p-2 border border-gray-300 dark:border-dark-600 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 ${showFinancialConnections ? 'bg-green-100 dark:bg-green-900' : ''}`}
            title="Toggle Financial Connections"
          >
            {showFinancialConnections ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </button>

          <button
            onClick={() => {
              const data = {
                nodes: networkData.nodes,
                edges: networkData.edges,
                financialConnections: financialTransactions.filter(t => 
                  networkData.nodes.some(n => n.id === t.fromEntity || n.id === t.toEntity)
                ),
                timestamp: new Date().toISOString()
              };
              const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `network-analysis-${new Date().toISOString().slice(0, 10)}.json`;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
            }}
            className="p-2 border border-gray-300 dark:border-dark-600 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700"
            title="Download Network Data"
          >
            <Download className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'Network Analysis',
                  text: `Network analysis showing ${networkData.nodes.length} entities and ${networkData.edges.length} connections`,
                  url: window.location.href
                });
              }
            }}
            className="p-2 border border-gray-300 dark:border-dark-600 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700"
            title="Share Network Analysis"
          >
            <Share className="w-4 h-4" />
          </button>

          {/* Search for specific entities */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search entities..."
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg text-sm w-48"
              onChange={(e) => {
                const newSearchTerm = e.target.value.toLowerCase();
                setSearchTerm(newSearchTerm);
                
                if (newSearchTerm) {
                  // Find matching entities and highlight them
                  const matchingPeople = corePeople.filter((person: Person) => 
                    person.name.toLowerCase().includes(newSearchTerm)
                  );
                  const matchingOrgs = coreOrganizations.filter((org: { id: string; name: string }) => 
                    org.name.toLowerCase().includes(newSearchTerm)
                  );
                  
                  // Focus on first matching entity if found
                  if (matchingPeople.length > 0) {
                    setFocusEntity(matchingPeople[0].id);
                  } else if (matchingOrgs.length > 0) {
                    setFocusEntity(matchingOrgs[0].id);
                  }
                } else {
                  setFocusEntity(null);
                }
              }}
            />
          </div>
        </div>
      </div>

      <div className="flex h-full">
        {/* Network Visualization */}
        <div className="flex-1 relative">
          <svg
            ref={svgRef}
            width="100%"
            height="600"
            className="bg-gray-50 dark:bg-dark-800"
            style={{
              transform: `scale(${zoomLevel}) translate(${panOffset.x}px, ${panOffset.y}px)`
            }}
          >
            {/* Define arrow markers for directed edges */}
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="9"
                refY="3.5"
                orient="auto"
              >
                <polygon
                  points="0 0, 10 3.5, 0 7"
                  fill="#666"
                />
              </marker>
            </defs>

            {/* Edges */}
            {networkData.edges.map(edge => {
              const source = networkData.nodes.find(n => n.id === edge.source);
              const target = networkData.nodes.find(n => n.id === edge.target);
              if (!source || !target) return null;

              return (
                <line
                  key={edge.id}
                  x1={source.x}
                  y1={source.y}
                  x2={target.x}
                  y2={target.y}
                  stroke={getEdgeColor(edge.significance, edge.verified)}
                  strokeWidth={edge.strength * 3}
                  strokeDasharray={edge.verified ? 'none' : '5,5'}
                  className="cursor-pointer hover:opacity-80"
                  onClick={() => handleEdgeClick(edge)}
                  markerEnd="url(#arrowhead)"
                />
              );
            })}

            {/* Nodes */}
            {networkData.nodes.map(node => (
              <g key={node.id}>
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={node.size}
                  fill={node.color}
                  stroke={selectedNode?.id === node.id ? '#dc2626' : '#fff'}
                  strokeWidth={selectedNode?.id === node.id ? 3 : 2}
                  className="cursor-pointer hover:opacity-80"
                  onClick={() => handleNodeClick(node)}
                  onMouseEnter={() => setHoveredNode(node)}
                  onMouseLeave={() => setHoveredNode(null)}
                />
                <text
                  x={node.x}
                  y={node.y + node.size + 15}
                  textAnchor="middle"
                  className="text-xs font-medium fill-gray-700 dark:fill-gray-300 pointer-events-none"
                >
                  {node.name}
                </text>
              </g>
            ))}

            {/* Hover tooltip */}
            {hoveredNode && hoveredNode.x !== undefined && hoveredNode.y !== undefined && (
              <g>
                <rect
                  x={hoveredNode.x + 15}
                  y={hoveredNode.y - 25}
                  width="200"
                  height="40"
                  fill="rgba(0,0,0,0.8)"
                  rx="4"
                />
                <text
                  x={hoveredNode.x + 25}
                  y={hoveredNode.y - 10}
                  className="text-sm font-medium fill-white"
                >
                  {hoveredNode.name}
                </text>
                <text
                  x={hoveredNode.x + 25}
                  y={hoveredNode.y + 5}
                  className="text-xs fill-gray-300"
                >
                  {hoveredNode.significance} significance
                </text>
              </g>
            )}
          </svg>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-white dark:bg-dark-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-dark-700">
            <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Legend</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <span>Person</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span>Organization</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                <span>Location</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-1 bg-red-500"></div>
                <span>Critical relationship</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-1 bg-gray-400" style={{strokeDasharray: '2,2'}}></div>
                <span>Unverified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Side Panel */}
        {(selectedNode || selectedEdge) && (
          <div className="w-80 bg-white dark:bg-dark-800 border-l border-gray-200 dark:border-dark-700 p-6 overflow-y-auto">
            {selectedNode && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    {selectedNode.name}
                  </h3>
                  <button
                    onClick={() => setSelectedNode(null)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Type:</span>
                    <div className="capitalize">{selectedNode.type}</div>
                  </div>
                  
                  <div>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Significance:</span>
                    <div className="capitalize">{selectedNode.significance}</div>
                  </div>

                  <div>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Connections:</span>
                    <div>{networkData.edges.filter(e => e.source === selectedNode.id || e.target === selectedNode.id).length}</div>
                  </div>

                  {/* Show related person details if available */}
                  {selectedNode.type === 'person' && (
                    <div>
                      {(() => {
                        const person = corePeople.find(p => p.id === selectedNode.id);
                        if (!person) return null;
                        
                        return (
                          <div className="space-y-3">
                            <div>
                              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Occupations:</span>
                              <div className="text-sm">{person.occupations.join(', ')}</div>
                            </div>
                            
                            <div>
                              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Tags:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {person.tags.map(tag => (
                                  <span
                                    key={tag}
                                    className="px-2 py-1 bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 rounded text-xs"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div>
                              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Biography:</span>
                              <div className="text-sm mt-1 leading-relaxed">{person.biography}</div>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  )}

                  {/* Show related organization details if available */}
                  {selectedNode.type === 'organization' && (
                    <div>
                      {(() => {
                        const organization = coreOrganizations.find(o => o.id === selectedNode.id);
                        if (!organization) return null;
                        
                        return (
                          <div className="space-y-3">
                            <div>
                              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Type:</span>
                              <div className="text-sm capitalize">{organization.type}</div>
                            </div>
                            
                            {organization.established && (
                              <div>
                                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Established:</span>
                                <div className="text-sm">{organization.established}</div>
                              </div>
                            )}

                            <div>
                              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Status:</span>
                              <div className="text-sm capitalize">{organization.currentStatus}</div>
                            </div>
                            
                            <div>
                              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Tags:</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {organization.tags.map(tag => (
                                  <span
                                    key={tag}
                                    className="px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded text-xs"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div>
                              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Description:</span>
                              <div className="text-sm mt-1 leading-relaxed">{organization.description}</div>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  )}

                  {/* Show related event details if available */}
                  {selectedNode.type === 'event' && (
                    <div>
                      {(() => {
                        const event = comprehensiveTimeline.find(e => e.id === selectedNode.id);
                        if (!event) return null;
                        
                        return (
                          <div className="space-y-3">
                            <div>
                              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Date:</span>
                              <div className="text-sm">{new Date(event.date).toLocaleDateString()}</div>
                            </div>

                            <div>
                              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Type:</span>
                              <div className="text-sm capitalize">{event.type}</div>
                            </div>

                            <div>
                              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Category:</span>
                              <div className="text-sm capitalize">{event.category}</div>
                            </div>
                            
                            <div>
                              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Involved Entities:</span>
                              <div className="text-sm space-y-1 mt-1">
                                {event.entities.slice(0, 3).map(entity => (
                                  <div key={entity.entityId} className="flex justify-between">
                                    <span className="font-medium">{entity.role}</span>
                                    <span className="text-gray-500">{entity.entityType}</span>
                                  </div>
                                ))}
                                {event.entities.length > 3 && (
                                  <div className="text-xs text-gray-500">
                                    +{event.entities.length - 3} more entities
                                  </div>
                                )}
                              </div>
                            </div>

                            <div>
                              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Description:</span>
                              <div className="text-sm mt-1 leading-relaxed">{event.description}</div>
                            </div>

                            <div>
                              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Status:</span>
                              <div className="flex items-center gap-2 mt-1">
                                <span className={`px-2 py-1 rounded text-xs font-medium ${
                                  event.verificationStatus === 'verified' 
                                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                                    : event.verificationStatus === 'pending'
                                    ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
                                    : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                                }`}>
                                  {event.verificationStatus}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  )}
                </div>
              </div>
            )}

            {selectedEdge && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    Relationship
                  </h3>
                  <button
                    onClick={() => setSelectedEdge(null)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    ✕
                  </button>
                </div>

                {(() => {
                  const relationship: Relationship | undefined = coreRelationships.find(r => r.id === selectedEdge.id);
                  if (!relationship) return null;

                  return (
                    <div className="space-y-4">
                      <div>
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Type:</span>
                        <div className="capitalize">{relationship.type} - {relationship.subtype}</div>
                      </div>
                      
                      <div>
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Strength:</span>
                        <div className="capitalize">{relationship.strength}</div>
                      </div>

                      <div>
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Significance:</span>
                        <div className="capitalize">{relationship.significance}</div>
                      </div>

                      <div>
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Status:</span>
                        <div className="capitalize">{relationship.verificationStatus}</div>
                      </div>

                      <div>
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Period:</span>
                        <div>{relationship.startDate} - {relationship.endDate || 'Present'}</div>
                      </div>

                      <div>
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Description:</span>
                        <div className="text-sm mt-1 leading-relaxed">{relationship.description}</div>
                      </div>

                      <div>
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Tags:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {relationship.tags.map(tag => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 rounded text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        )}

        {/* Filters Panel */}
        {showFilters && (
          <div className="w-80 bg-white dark:bg-dark-800 border-l border-gray-200 dark:border-dark-700 p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Filters</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              {/* Relationship Types */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Relationship Types
                </label>
                <div className="space-y-2">
                  {['all', 'personal', 'professional', 'financial', 'legal'].map(type => (
                    <label key={type} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.relationshipTypes.includes(type)}
                        onChange={(e) => {
                          if (type === 'all') {
                            setFilters(prev => ({
                              ...prev,
                              relationshipTypes: e.target.checked ? ['all'] : []
                            }));
                          } else {
                            setFilters(prev => ({
                              ...prev,
                              relationshipTypes: prev.relationshipTypes.includes('all') 
                                ? [type] 
                                : e.target.checked 
                                  ? [...prev.relationshipTypes, type]
                                  : prev.relationshipTypes.filter(t => t !== type)
                            }));
                          }
                        }}
                        className="mr-2"
                      />
                      <span className="text-sm capitalize">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Significance Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Significance Level
                </label>
                <div className="space-y-2">
                  {['critical', 'high', 'medium', 'low'].map(level => (
                    <label key={level} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.significanceLevel.includes(level)}
                        onChange={(e) => {
                          setFilters(prev => ({
                            ...prev,
                            significanceLevel: e.target.checked 
                              ? [...prev.significanceLevel, level]
                              : prev.significanceLevel.filter(l => l !== level)
                          }));
                        }}
                        className="mr-2"
                      />
                      <span className="text-sm capitalize">{level}</span>
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
                  {['verified', 'pending', 'disputed'].map(status => (
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
                        className="mr-2"
                      />
                      <span className="text-sm capitalize">{status}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Settings Panel */}
        {showSettings && (
          <div className="w-80 bg-white dark:bg-dark-800 border-l border-gray-200 dark:border-dark-700 p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Layout Settings</h3>
              <button
                onClick={() => setShowSettings(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Node Size: {layoutSettings.nodeSize}
                </label>
                <input
                  type="range"
                  min="4"
                  max="20"
                  value={layoutSettings.nodeSize}
                  onChange={(e) => setLayoutSettings(prev => ({
                    ...prev,
                    nodeSize: parseInt(e.target.value)
                  }))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Link Distance: {layoutSettings.linkDistance}
                </label>
                <input
                  type="range"
                  min="50"
                  max="200"
                  value={layoutSettings.linkDistance}
                  onChange={(e) => setLayoutSettings(prev => ({
                    ...prev,
                    linkDistance: parseInt(e.target.value)
                  }))}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Repulsion Force: {Math.abs(layoutSettings.charge)}
                </label>
                <input
                  type="range"
                  min="100"
                  max="500"
                  value={Math.abs(layoutSettings.charge)}
                  onChange={(e) => setLayoutSettings(prev => ({
                    ...prev,
                    charge: -parseInt(e.target.value)
                  }))}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 