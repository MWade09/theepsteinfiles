'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { TimelineEvent } from '@/types/investigation';
import { corePeople } from '@/data/core/people';
import { ZoomIn, ZoomOut, RotateCcw, Filter } from 'lucide-react';

interface NetworkNode extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  type: 'person' | 'event';
  group: number;
  significance?: string;
  eventType?: string;
  size: number;
  color: string;
}

interface NetworkLink extends d3.SimulationLinkDatum<NetworkNode> {
  source: string | NetworkNode;
  target: string | NetworkNode;
  strength: number;
  type: string;
}

interface NetworkVisualizationProps {
  events: TimelineEvent[];
  width?: number;
  height?: number;
  onNodeSelect?: (node: NetworkNode | null) => void;
  className?: string;
}

export default function NetworkVisualization({ 
  events, 
  width = 800, 
  height = 600,
  onNodeSelect,
  className = "" 
}: NetworkVisualizationProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [filters, setFilters] = useState({
    showPeople: true,
    showEvents: true,
    minSignificance: 'low',
    nodeTypes: ['all']
  });

  useEffect(() => {
    if (!svgRef.current) return;

    const getPersonColor = (significance: string): string => {
      switch (significance) {
        case 'critical': return '#ef4444';
        case 'high': return '#f97316';
        case 'medium': return '#eab308';
        case 'low': return '#22c55e';
        default: return '#6b7280';
      }
    };

    const getEventColor = (eventType: string): string => {
      switch (eventType) {
        case 'arrest': return '#dc2626';
        case 'legal': return '#2563eb';
        case 'business': return '#059669';
        case 'media': return '#7c3aed';
        case 'travel': return '#0891b2';
        default: return '#4b5563';
      }
    };

    const getEventSize = (significance: string): number => {
      switch (significance) {
        case 'critical': return 12;
        case 'high': return 10;
        case 'medium': return 8;
        case 'low': return 6;
        default: return 6;
      }
    };

    const getConnectionStrength = (significance: string, role: string): number => {
      let baseStrength = 0.5;
      
      // Adjust by significance
      switch (significance) {
        case 'critical': baseStrength = 1.0; break;
        case 'high': baseStrength = 0.8; break;
        case 'medium': baseStrength = 0.6; break;
        case 'low': baseStrength = 0.4; break;
      }

      // Adjust by role
      if (role.includes('defendant') || role.includes('accused')) baseStrength *= 1.2;
      if (role.includes('witness')) baseStrength *= 0.8;
      if (role.includes('associate')) baseStrength *= 0.9;

      return baseStrength;
    };

    const passesSignificanceFilter = (significance: string): boolean => {
      const levels = ['low', 'medium', 'high', 'critical'];
      const minIndex = levels.indexOf(filters.minSignificance);
      const sigIndex = levels.indexOf(significance);
      return sigIndex >= minIndex;
    };

    // Generate network data from events
    const generateNetworkData = (): { nodes: NetworkNode[], links: NetworkLink[] } => {
      const nodes: NetworkNode[] = [];
      const links: NetworkLink[] = [];
      const nodeMap = new Map<string, NetworkNode>();

      // Add people nodes
      const peopleInEvents = new Set<string>();
      events.forEach(event => {
        event.entities.forEach(entity => {
          if (entity.entityType === 'person') {
            peopleInEvents.add(entity.entityId);
          }
        });
      });

      Array.from(peopleInEvents).forEach(personId => {
        const person = corePeople.find(p => p.id === personId);
        if (person && filters.showPeople) {
          const eventCount = events.filter(e => 
            e.entities.some(ent => ent.entityId === personId)
          ).length;
          
          const node: NetworkNode = {
            id: personId,
            name: person.name,
            type: 'person',
            group: 1,
            significance: person.significance,
            size: Math.max(8, Math.min(20, eventCount * 2)),
            color: getPersonColor(person.significance)
          };
          nodes.push(node);
          nodeMap.set(personId, node);
        }
      });

      // Add event nodes and links
      events.forEach(event => {
        if (filters.showEvents && passesSignificanceFilter(event.significance)) {
          const eventNode: NetworkNode = {
            id: event.id,
            name: event.title,
            type: 'event',
            group: 2,
            significance: event.significance,
            eventType: event.type,
            size: getEventSize(event.significance),
            color: getEventColor(event.type)
          };
          nodes.push(eventNode);
          nodeMap.set(event.id, eventNode);

          // Create links between people and events
          event.entities.forEach(entity => {
            if (entity.entityType === 'person' && nodeMap.has(entity.entityId)) {
              links.push({
                source: entity.entityId,
                target: event.id,
                strength: getConnectionStrength(event.significance, entity.role),
                type: entity.role
              });
            }
          });

          // Create links between people in the same event
          const peopleInEvent = event.entities
            .filter(e => e.entityType === 'person')
            .map(e => e.entityId);
          
          for (let i = 0; i < peopleInEvent.length; i++) {
            for (let j = i + 1; j < peopleInEvent.length; j++) {
              if (nodeMap.has(peopleInEvent[i]) && nodeMap.has(peopleInEvent[j])) {
                links.push({
                  source: peopleInEvent[i],
                  target: peopleInEvent[j],
                  strength: 0.3,
                  type: 'co-occurrence'
                });
              }
            }
          }
        }
      });

      return { nodes, links };
    };

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const { nodes, links } = generateNetworkData();
    
    if (nodes.length === 0) return;

    // Set up dimensions
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create main group with zoom behavior
    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Set up zoom
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 4])
      .on("zoom", (event) => {
        g.attr("transform", `translate(${margin.left},${margin.top}) ${event.transform}`);
        setZoomLevel(event.transform.k);
      });

    svg.call(zoom);

    // Create simulation
    const simulation = d3.forceSimulation<NetworkNode>(nodes)
      .force("link", d3.forceLink<NetworkNode, NetworkLink>(links)
        .id(d => d.id)
        .strength(d => d.strength)
        .distance(d => d.type === 'co-occurrence' ? 50 : 80))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(innerWidth / 2, innerHeight / 2))
      .force("collision", d3.forceCollide().radius((d) => (d as NetworkNode).size + 2));

    // Create links
    const link = g.append("g")
      .selectAll("line")
      .data(links)
      .enter().append("line")
      .attr("stroke", d => d.type === 'co-occurrence' ? "#6b7280" : "#9ca3af")
      .attr("stroke-opacity", d => d.type === 'co-occurrence' ? 0.3 : 0.6)
      .attr("stroke-width", d => Math.sqrt(d.strength * 5));

    // Create nodes
    const node = g.append("g")
      .selectAll("circle")
      .data(nodes)
      .enter().append("circle")
      .attr("r", d => d.size)
      .attr("fill", d => d.color)
      .attr("stroke", "#fff")
      .attr("stroke-width", 2)
      .style("cursor", "pointer")
      .call(d3.drag<SVGCircleElement, NetworkNode>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended))
      .on("click", (event, d) => {
        onNodeSelect?.(d);
        event.stopPropagation();
      })
      .on("mouseover", function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("r", d.size * 1.2)
          .attr("stroke-width", 3);
      })
      .on("mouseout", function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("r", d.size)
          .attr("stroke-width", 2);
      });

    // Add labels
    const label = g.append("g")
      .selectAll("text")
      .data(nodes)
      .enter().append("text")
      .text(d => d.name.length > 20 ? d.name.substring(0, 17) + "..." : d.name)
      .attr("font-size", "12px")
      .attr("dx", d => d.size + 5)
      .attr("dy", "0.35em")
      .attr("fill", "#374151")
      .style("pointer-events", "none");

    // Update positions on tick
    simulation.on("tick", () => {
      link
        .attr("x1", (d) => (d.source as NetworkNode).x!)
        .attr("y1", (d) => (d.source as NetworkNode).y!)
        .attr("x2", (d) => (d.target as NetworkNode).x!)
        .attr("y2", (d) => (d.target as NetworkNode).y!);

      node
        .attr("cx", d => d.x!)
        .attr("cy", d => d.y!);

      label
        .attr("x", d => d.x!)
        .attr("y", d => d.y!);
    });

    // Drag functions
    function dragstarted(event: d3.D3DragEvent<SVGCircleElement, NetworkNode, NetworkNode>, d: NetworkNode) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: d3.D3DragEvent<SVGCircleElement, NetworkNode, NetworkNode>, d: NetworkNode) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event: d3.D3DragEvent<SVGCircleElement, NetworkNode, NetworkNode>, d: NetworkNode) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    // Clear selection on background click
    svg.on("click", () => {
      onNodeSelect?.(null);
    });

    return () => {
      simulation.stop();
    };
  }, [events, filters, width, height, onNodeSelect]);

  const resetZoom = () => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.transition().duration(750).call(
      d3.zoom<SVGSVGElement, unknown>().transform,
      d3.zoomIdentity
    );
  };

  const zoomIn = () => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.transition().duration(300).call(
      d3.zoom<SVGSVGElement, unknown>().scaleBy,
      1.5
    );
  };

  const zoomOut = () => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.transition().duration(300).call(
      d3.zoom<SVGSVGElement, unknown>().scaleBy,
      1 / 1.5
    );
  };

  // Calculate nodes for display outside of useEffect
  const displayStats = () => {
    const peopleInEvents = new Set<string>();
    events.forEach(event => {
      event.entities.forEach(entity => {
        if (entity.entityType === 'person') {
          peopleInEvents.add(entity.entityId);
        }
      });
    });

    let nodeCount = 0;
    if (filters.showPeople) {
      nodeCount += peopleInEvents.size;
    }
    if (filters.showEvents) {
      nodeCount += events.length;
    }

    return { nodes: nodeCount };
  };

  const stats = displayStats();

  return (
    <div className={`relative ${className}`}>
      {/* Controls */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        <div className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-lg p-2 shadow-lg">
          <button
            onClick={zoomIn}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={zoomOut}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={resetZoom}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
            title="Reset View"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Zoom indicator */}
        <div className="bg-white dark:bg-gray-800 rounded-lg px-3 py-1 shadow-lg text-sm">
          {Math.round(zoomLevel * 100)}%
        </div>
      </div>

      {/* Filters */}
      <div className="absolute top-4 right-4 z-10 bg-white dark:bg-gray-800 rounded-lg p-3 shadow-lg min-w-48">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="w-4 h-4" />
          <h3 className="font-medium">Filters</h3>
        </div>
        
        <div className="space-y-3">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters.showPeople}
              onChange={(e) => setFilters(prev => ({ ...prev, showPeople: e.target.checked }))}
              className="rounded"
            />
            <span className="text-sm">Show People</span>
          </label>
          
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={filters.showEvents}
              onChange={(e) => setFilters(prev => ({ ...prev, showEvents: e.target.checked }))}
              className="rounded"
            />
            <span className="text-sm">Show Events</span>
          </label>

          <div>
            <label className="block text-sm mb-1">Min Significance</label>
            <select
              value={filters.minSignificance}
              onChange={(e) => setFilters(prev => ({ ...prev, minSignificance: e.target.value }))}
              className="w-full px-2 py-1 border rounded text-sm bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="critical">Critical</option>
            </select>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 z-10 bg-white dark:bg-gray-800 rounded-lg p-3 shadow-lg">
        <h4 className="text-sm font-medium mb-2">Legend</h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span>Critical</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span>High</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span>Medium</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Low</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="absolute bottom-4 right-4 z-10 bg-white dark:bg-gray-800 rounded-lg p-3 shadow-lg text-sm">
        <div>Nodes: {stats.nodes}</div>
        <div>Zoom: {Math.round(zoomLevel * 100)}%</div>
      </div>

      {/* Network SVG */}
      <svg
        ref={svgRef}
        width={width}
        height={height}
        className="bg-white dark:bg-gray-900 w-full h-full"
      />
    </div>
  );
}
