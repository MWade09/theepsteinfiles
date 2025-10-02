'use client';

import React, { useEffect, useMemo, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import * as d3 from 'd3';
import { TimelineEvent } from '@/types/investigation';
import { corePeople } from '@/data/core/people';
import { coreOrganizations } from '@/data/core/organizations';
import { enhancedProperties } from '@/data/geographic/properties';
import { ZoomIn, ZoomOut, RotateCcw, Filter } from 'lucide-react';

export interface NetworkNode extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  type: 'person' | 'event' | 'organization' | 'location';
  group: number;
  significance?: 'critical' | 'high' | 'medium' | 'low';
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

interface ExternalFilters {
  showPeople?: boolean;
  showOrganizations?: boolean;
  showLocations?: boolean;
  showEvents?: boolean;
  minSignificance?: 'low' | 'medium' | 'high' | 'critical';
}

interface NetworkVisualizationProps {
  events: TimelineEvent[];
  width?: number;
  height?: number;
  onNodeSelect?: (node: NetworkNode | null) => void;
  className?: string;
  externalFilters?: ExternalFilters;
  showUI?: boolean;
  layout?: 'force' | 'circular' | 'hierarchical' | 'geographic';
  clustering?: boolean;
  physics?: boolean;
  nodeSizeMode?: 'connections' | 'significance' | 'uniform';
  edgeWeightMode?: 'strength' | 'uniform';
  focusEntityId?: string | null;
  showLegend?: boolean;
  transitionDurationMs?: number;
  transitionEasing?: 'linear' | 'quadInOut' | 'cubicInOut';
  showLabels?: boolean;
  labelMaxLength?: number;
  labelFontSize?: number;
  layoutPadding?: number;
  pinnedNodeIds?: string[];
  labelCollisionAvoidance?: boolean;
  labelShowTypes?: Array<'person' | 'event' | 'organization' | 'location'>;
  labelMinSignificance?: 'low' | 'medium' | 'high' | 'critical';
}

export interface NetworkVisualizationHandle {
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
  getGraphData: () => { nodes: NetworkNode[]; links: Array<{ source: string; target: string; strength: number; type: string }>; };
  exportPNG: (filename?: string) => Promise<void>;
  exportSVG: (filename?: string) => void;
}

const NetworkVisualization = forwardRef<NetworkVisualizationHandle, NetworkVisualizationProps>(function NetworkVisualization({ 
  events, 
  width = 800, 
  height = 600,
  onNodeSelect,
  className = "",
  externalFilters,
  showUI = true,
  layout = 'force',
  clustering = false,
  physics = true,
  nodeSizeMode = 'connections',
  edgeWeightMode = 'strength',
  focusEntityId = null,
  showLegend = false,
  transitionDurationMs = 600,
  transitionEasing = 'cubicInOut',
  showLabels = true,
  labelMaxLength = 20,
  labelFontSize = 12,
  layoutPadding = 40,
  pinnedNodeIds = [],
  labelCollisionAvoidance = true,
  labelShowTypes = ['person', 'event', 'organization', 'location'],
  labelMinSignificance = 'low'
}, ref) {
  const svgRef = useRef<SVGSVGElement>(null);
  const prevNodePositionsRef = useRef<Map<string, { x: number; y: number }>>(new Map());
  const simulationRef = useRef<d3.Simulation<NetworkNode, undefined> | null>(null);
  const nodeSelRef = useRef<d3.Selection<SVGCircleElement, NetworkNode, SVGGElement, unknown> | null>(null);
  const linkSelRef = useRef<d3.Selection<SVGLineElement, NetworkLink, SVGGElement, unknown> | null>(null);
  const labelSelRef = useRef<d3.Selection<SVGTextElement, NetworkNode, SVGGElement, unknown> | null>(null);
  const nodesByIdRef = useRef<Map<string, NetworkNode>>(new Map());
  const [zoomLevel, setZoomLevel] = useState(1);
  const [filters, setFilters] = useState({
    showPeople: true,
    showEvents: true,
    minSignificance: 'low',
    nodeTypes: ['all']
  });

  const effectiveFilters = {
    showPeople: externalFilters?.showPeople ?? filters.showPeople,
    showOrganizations: externalFilters?.showOrganizations ?? true,
    showLocations: externalFilters?.showLocations ?? false,
    showEvents: externalFilters?.showEvents ?? filters.showEvents,
    minSignificance: externalFilters?.minSignificance ?? (filters.minSignificance as 'low' | 'medium' | 'high' | 'critical')
  };

  const graphData = useMemo(() => {
    // compute nodes/links based on events and filters
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
    const getOrgColor = (): string => '#10b981';
    const getLocationColor = (): string => '#f59e0b';
    const getEventSize = (significance: 'critical' | 'high' | 'medium' | 'low'): number => {
      switch (significance) {
        case 'critical': return 12;
        case 'high': return 10;
        case 'medium': return 8;
        case 'low': return 6;
        default: return 6;
      }
    };
    const getConnectionStrength = (significance: 'critical' | 'high' | 'medium' | 'low', role: string): number => {
      let baseStrength = 0.5;
      switch (significance) {
        case 'critical': baseStrength = 1.0; break;
        case 'high': baseStrength = 0.8; break;
        case 'medium': baseStrength = 0.6; break;
        case 'low': baseStrength = 0.4; break;
      }
      if (role.includes('defendant') || role.includes('accused')) baseStrength *= 1.2;
      if (role.includes('witness')) baseStrength *= 0.8;
      if (role.includes('associate')) baseStrength *= 0.9;
      return baseStrength;
    };
    const passesSignificanceFilter = (significance: 'critical' | 'high' | 'medium' | 'low'): boolean => {
      const levels = ['low', 'medium', 'high', 'critical'];
      const minIndex = levels.indexOf(effectiveFilters.minSignificance);
      const sigIndex = levels.indexOf(significance);
      return sigIndex >= minIndex;
    };
    const generateNetworkData = (): { nodes: NetworkNode[], links: NetworkLink[] } => {
      const nodes: NetworkNode[] = [];
      const links: NetworkLink[] = [];
      const nodeMap = new Map<string, NetworkNode>();
      const entityConnections = new Map<string, Set<string>>();
      const entityTypes = new Map<string, string>();

      // Enhanced data processing for better network relationships
      events.forEach(event => {
        const eventEntities = event.entities || [];

        // Track entity connections for better relationship mapping
        eventEntities.forEach(entity => {
          if (!entityConnections.has(entity.entityId)) {
            entityConnections.set(entity.entityId, new Set());
            entityTypes.set(entity.entityId, entity.entityType);
          }

          // Connect all entities in the same event
          eventEntities.forEach(otherEntity => {
            if (entity.entityId !== otherEntity.entityId) {
              entityConnections.get(entity.entityId)!.add(otherEntity.entityId);
            }
          });
        });
      });

      // Create person nodes with enhanced data
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
        if (person && effectiveFilters.showPeople) {
          const eventCount = events.filter(e =>
            e.entities.some(ent => ent.entityId === personId)
          ).length;

          // Calculate centrality based on connections
          const connections = entityConnections.get(personId)?.size || 0;
          const baseSize = Math.max(8, Math.min(20, eventCount * 2));
          const centralitySize = Math.max(0, Math.min(8, connections / 2));

          const node: NetworkNode = {
            id: personId,
            name: person.name,
            type: 'person',
            group: 1,
            significance: person.significance,
            size: baseSize + centralitySize,
            color: getPersonColor(person.significance)
          };
          nodes.push(node);
          nodeMap.set(personId, node);
        }
      });
      events.forEach(event => {
        if (effectiveFilters.showEvents && passesSignificanceFilter(event.significance)) {
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
          event.entities.forEach(entity => {
            if (entity.entityType === 'person' && effectiveFilters.showPeople && nodeMap.has(entity.entityId)) {
              const strength = getConnectionStrength(event.significance, entity.role);
              links.push({
                source: entity.entityId,
                target: event.id,
                strength,
                type: entity.role
              });

              // Also create direct connections between people in the same event (co-occurrence)
              event.entities.forEach(otherEntity => {
                if (entity.entityId !== otherEntity.entityId &&
                    otherEntity.entityType === 'person' &&
                    nodeMap.has(otherEntity.entityId)) {
                  links.push({
                    source: entity.entityId,
                    target: otherEntity.entityId,
                    strength: strength * 0.3, // Weaker co-occurrence links
                    type: 'co-occurrence'
                  });
                }
              });
            } else if (entity.entityType === 'organization' && effectiveFilters.showOrganizations) {
              if (!nodeMap.has(entity.entityId)) {
                const org = coreOrganizations.find(o => o.id === entity.entityId);
                const orgNode: NetworkNode = {
                  id: entity.entityId,
                  name: org?.name || entity.entityId,
                  type: 'organization',
                  group: 3,
                  significance: org?.significance ?? 'medium',
                  size: 10,
                  color: getOrgColor()
                };
                nodes.push(orgNode);
                nodeMap.set(entity.entityId, orgNode);
              }
              links.push({
                source: entity.entityId,
                target: event.id,
                strength: 0.7,
                type: entity.role || 'involved'
              });
            } else if (entity.entityType === 'location' && effectiveFilters.showLocations) {
              if (!nodeMap.has(entity.entityId)) {
                const locNode: NetworkNode = {
                  id: entity.entityId,
                  name: entity.entityId,
                  type: 'location',
                  group: 4,
                  significance: 'medium',
                  size: 8,
                  color: getLocationColor()
                };
                nodes.push(locNode);
                nodeMap.set(entity.entityId, locNode);
              }
              links.push({
                source: entity.entityId,
                target: event.id,
                strength: 0.5,
                type: entity.role || 'location'
              });
            }
          });
        }
      });
      const degreeMap = new Map<string, number>();
      links.forEach(l => {
        const s = typeof l.source === 'string' ? l.source : l.source.id;
        const t = typeof l.target === 'string' ? l.target : l.target.id;
        degreeMap.set(s, (degreeMap.get(s) || 0) + 1);
        degreeMap.set(t, (degreeMap.get(t) || 0) + 1);
      });
      nodes.forEach(n => {
        if (nodeSizeMode === 'uniform') {
          n.size = 8;
        } else if (nodeSizeMode === 'connections') {
          const deg = degreeMap.get(n.id) || 1;
          n.size = Math.max(6, Math.min(24, 4 + Math.sqrt(deg) * 4));
        } else if (nodeSizeMode === 'significance' && n.significance) {
          const map: Record<string, number> = { low: 6, medium: 8, high: 10, critical: 12 };
          n.size = map[n.significance] || 8;
        }
      });
      return { nodes, links };
    };
    const raw = generateNetworkData();
    // Focus mode: if a focus entity is provided, filter to neighbors
    if (focusEntityId) {
      const connected = new Set<string>();
      raw.links.forEach(l => {
        const s = typeof l.source === 'string' ? l.source : l.source.id;
        const t = typeof l.target === 'string' ? l.target : l.target.id;
        if (s === focusEntityId || t === focusEntityId) {
          connected.add(String(s));
          connected.add(String(t));
        }
      });
      const nodes = raw.nodes.filter(n => connected.has(n.id));
      const links = raw.links.filter(l => {
        const s = typeof l.source === 'string' ? l.source : l.source.id;
        const t = typeof l.target === 'string' ? l.target : l.target.id;
        return connected.has(String(s)) && connected.has(String(t));
      });
      return { nodes, links };
    }
    return raw;
  }, [events, effectiveFilters.minSignificance, effectiveFilters.showEvents, effectiveFilters.showPeople, effectiveFilters.showOrganizations, effectiveFilters.showLocations, nodeSizeMode, focusEntityId]);

  useEffect(() => {
    if (!svgRef.current) return;


    const svg = d3.select<SVGSVGElement, unknown>(svgRef.current);
    svg.selectAll("*").remove();

    const { nodes, links } = graphData;
    
    if (nodes.length === 0) return;

    // Set up dimensions
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create main group with zoom behavior
    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Geographic background grid (optional) to give map-like context
    if (layout === 'geographic') {
      const bg = g.append('g').attr('class', 'geo-background');
      const lats = enhancedProperties.map(p => p.coordinates[0]);
      const lngs = enhancedProperties.map(p => p.coordinates[1]);
      if (lats.length && lngs.length) {
        const minLat = Math.floor(Math.min(...lats));
        const maxLat = Math.ceil(Math.max(...lats));
        const minLng = Math.floor(Math.min(...lngs));
        const maxLng = Math.ceil(Math.max(...lngs));

        const projectGeo = (lat: number, lng: number) => {
          const x = ((lng - minLng) / Math.max(1e-6, (maxLng - minLng))) * innerWidth;
          const y = ((maxLat - lat) / Math.max(1e-6, (maxLat - minLat))) * innerHeight;
          return { x, y };
        };

        // Longitude lines
        for (let lon = minLng; lon <= maxLng; lon += 2) {
          const p1 = projectGeo(minLat, lon);
          const p2 = projectGeo(maxLat, lon);
          bg.append('line')
            .attr('x1', p1.x)
            .attr('y1', p1.y)
            .attr('x2', p2.x)
            .attr('y2', p2.y)
            .attr('stroke', '#1f2937')
            .attr('stroke-opacity', 0.4)
            .attr('stroke-width', 1);
        }
        // Latitude lines
        for (let lat = minLat; lat <= maxLat; lat += 2) {
          const p1 = projectGeo(lat, minLng);
          const p2 = projectGeo(lat, maxLng);
          bg.append('line')
            .attr('x1', p1.x)
            .attr('y1', p1.y)
            .attr('x2', p2.x)
            .attr('y2', p2.y)
            .attr('stroke', '#111827')
            .attr('stroke-opacity', 0.5)
            .attr('stroke-width', 1);
        }
      }
    }

    // Set up zoom
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 4])
      .on("zoom", (event) => {
        g.attr("transform", `translate(${margin.left},${margin.top}) ${event.transform}`);
        setZoomLevel(event.transform.k);
      });

    svg.call(zoom);

    // Create simulation
    let simulation: d3.Simulation<NetworkNode, undefined> | null = null;
    if (layout === 'force') {
      simulation = d3.forceSimulation<NetworkNode>(nodes)
        .force("link", d3.forceLink<NetworkNode, NetworkLink>(links)
          .id(d => d.id)
          .strength(d => (edgeWeightMode === 'strength' ? d.strength : 0.6))
          .distance(d => d.type === 'co-occurrence' ? 60 : 90))
        .force("charge", d3.forceManyBody().strength(-300))
        .force("center", d3.forceCenter(innerWidth / 2, innerHeight / 2))
        .force("collision", d3.forceCollide().radius((d) => (d as NetworkNode).size + 2));

      // Set initial clustering forces; can be updated by separate effect
      const typeToX: Record<string, number> = {
        person: innerWidth * 0.25,
        event: innerWidth * 0.5,
        organization: innerWidth * 0.75,
        location: innerWidth * 0.85
      } as Record<string, number>;
      if (clustering) {
        simulation.force('x', d3.forceX<NetworkNode>().strength(0.05).x((d: NetworkNode) => typeToX[d.type] || innerWidth / 2));
        simulation.force('y', d3.forceY<NetworkNode>().strength(0.02).y(innerHeight / 2));
      }
      if (!physics) {
        // Cool down smoothly
        simulation.alphaTarget(0).alpha(0.1);
      }
      // Apply pinning
      const pinned = new Set(pinnedNodeIds);
      nodes.forEach(n => {
        if (pinned.has(n.id)) {
          if (typeof n.x === 'number' && typeof n.y === 'number') {
            n.fx = n.x;
            n.fy = n.y;
          }
        } else {
          n.fx = null;
          n.fy = null;
        }
      });
    } else if (layout === 'circular') {
      // Circular layout: place nodes on a circle
      const radius = Math.min(innerWidth, innerHeight) / 2 - layoutPadding;
      nodes.forEach((n, i) => {
        const angle = (i / nodes.length) * 2 * Math.PI;
        n.x = innerWidth / 2 + radius * Math.cos(angle);
        n.y = innerHeight / 2 + radius * Math.sin(angle);
      });
      // Relax to avoid overlap
      const relax = d3.forceSimulation<NetworkNode>(nodes)
        .alpha(0.6)
        .force('x', d3.forceX<NetworkNode>().x((d: NetworkNode) => d.x as number).strength(0.2))
        .force('y', d3.forceY<NetworkNode>().y((d: NetworkNode) => d.y as number).strength(0.2))
        .force('collide', d3.forceCollide().radius((d) => (d as NetworkNode).size + 6).iterations(2));
      for (let i = 0; i < 80; i++) relax.tick();
      relax.stop();
    } else if (layout === 'hierarchical') {
      // Three-tier hierarchical layout by type
      const padding = layoutPadding;
      const persons = nodes.filter(n => n.type === 'person');
      const eventsNodes = nodes.filter(n => n.type === 'event');
      const others = nodes.filter(n => n.type !== 'person' && n.type !== 'event');

      const layers: Array<{ arr: NetworkNode[]; y: number }> = [
        { arr: persons, y: padding + (innerHeight - 2 * padding) * 0.2 },
        { arr: eventsNodes, y: padding + (innerHeight - 2 * padding) * 0.5 },
        { arr: others, y: padding + (innerHeight - 2 * padding) * 0.8 },
      ];

      layers.forEach(({ arr, y }) => {
        const step = arr.length > 1 ? (innerWidth - 2 * padding) / (arr.length - 1) : 0;
        arr.forEach((n, idx) => {
          n.x = padding + step * idx;
          n.y = y;
        });
      });
      // Relax within layers
      const relax = d3.forceSimulation<NetworkNode>(nodes)
        .alpha(0.6)
        .force('x', d3.forceX<NetworkNode>().x((d: NetworkNode) => d.x as number).strength(0.3))
        .force('y', d3.forceY<NetworkNode>().y((d: NetworkNode) => d.y as number).strength(0.3))
        .force('collide', d3.forceCollide().radius((d) => (d as NetworkNode).size + 6).iterations(2));
      for (let i = 0; i < 80; i++) relax.tick();
      relax.stop();
    } else if (layout === 'geographic') {
      // Geographic layout using property coordinates where possible
      const padding = layoutPadding;
      const coordMap = new Map<string, [number, number]>();
      const normalize = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
      enhancedProperties.forEach(p => {
        coordMap.set(normalize(p.id.replace(/^property_/, '')), p.coordinates);
        coordMap.set(normalize(p.name), p.coordinates);
      });

      // Determine bounds from all known property coordinates
      const lats = enhancedProperties.map(p => p.coordinates[0]);
      const lngs = enhancedProperties.map(p => p.coordinates[1]);
      const minLat = Math.min(...lats), maxLat = Math.max(...lats);
      const minLng = Math.min(...lngs), maxLng = Math.max(...lngs);

      const project = (lat: number, lng: number) => {
        const x = padding + ((lng - minLng) / Math.max(1e-6, (maxLng - minLng))) * (innerWidth - 2 * padding);
        const y = padding + ((maxLat - lat) / Math.max(1e-6, (maxLat - minLat))) * (innerHeight - 2 * padding);
        return { x, y };
      };

      const center = { x: innerWidth / 2, y: innerHeight / 2 };
      let jitter = 0;
      nodes.forEach(n => {
        const keyId = normalize(n.id);
        const keyName = normalize(n.name);
        const coords = coordMap.get(keyId) || coordMap.get(keyName);
        if (coords) {
          const { x, y } = project(coords[0], coords[1]);
          n.x = x;
          n.y = y;
        } else {
          // fallback: small radial jitter around center
          const angle = (jitter++ / nodes.length) * 2 * Math.PI;
          const r = Math.min(innerWidth, innerHeight) * 0.15;
          n.x = center.x + r * Math.cos(angle);
          n.y = center.y + r * Math.sin(angle);
        }
      });
      // Relax with strong anchoring to positions
      const relax = d3.forceSimulation<NetworkNode>(nodes)
        .alpha(0.7)
        .force('x', d3.forceX<NetworkNode>().x((d: NetworkNode) => d.x as number).strength(0.5))
        .force('y', d3.forceY<NetworkNode>().y((d: NetworkNode) => d.y as number).strength(0.5))
        .force('collide', d3.forceCollide().radius((d) => (d as NetworkNode).size + 6).iterations(2));
      for (let i = 0; i < 120; i++) relax.tick();
      relax.stop();
    }

    // Create links
    const linkKey = (d: NetworkLink) => {
      const s = typeof d.source === 'string' ? d.source : d.source.id;
      const t = typeof d.target === 'string' ? d.target : d.target.id;
      return `${s}__${t}`;
    };
    const link = g.append("g")
      .attr('class', 'links')
      .selectAll<SVGLineElement, NetworkLink>("line")
      .data(links, linkKey)
      .enter().append<SVGLineElement>("line")
      .attr("stroke", d => {
        // Color links based on relationship type and strength
        const sourceType = (d.source as NetworkNode).type;
        const targetType = (d.target as NetworkNode).type;
        const strength = d.strength;

        if (sourceType === 'person' && targetType === 'event') {
          return `rgba(59, 130, 246, ${0.3 + strength * 0.4})`; // Blue for person-event
        } else if (sourceType === 'event' && targetType === 'person') {
          return `rgba(59, 130, 246, ${0.3 + strength * 0.4})`; // Blue for event-person
        } else if (sourceType === 'organization' || targetType === 'organization') {
          return `rgba(16, 185, 129, ${0.3 + strength * 0.4})`; // Green for organizations
        } else if (sourceType === 'location' || targetType === 'location') {
          return `rgba(245, 158, 11, ${0.3 + strength * 0.4})`; // Amber for locations
        } else {
          return `rgba(107, 114, 128, ${0.3 + strength * 0.4})`; // Gray for others
        }
      })
      .attr("stroke-opacity", d => 0.4 + d.strength * 0.3)
      .attr("stroke-width", d => Math.max(1, d.strength * 3))
      .attr("stroke-linecap", "round");

    // Create nodes with transition from previous positions
    const node = g.append("g")
      .attr('class', 'nodes')
      .selectAll<SVGCircleElement, NetworkNode>("circle")
      .data(nodes, (d: any) => (d as NetworkNode).id)
      .enter().append<SVGCircleElement>("circle")
      .attr("r", d => d.size)
      .attr("fill", d => d.color)
      .attr("stroke", d => {
        switch (d.significance) {
          case 'critical': return '#fbbf24'; // Amber for critical
          case 'high': return '#f3f4f6'; // Light gray for high
          case 'medium': return '#d1d5db'; // Medium gray for medium
          case 'low': return '#9ca3af'; // Dark gray for low
          default: return '#6b7280'; // Default gray
        }
      })
      .attr("stroke-width", d => d.significance === 'critical' ? 4 : d.significance === 'high' ? 3 : 2)
      .style("cursor", "pointer")
      .style("filter", d => d.significance === 'critical' ? 'drop-shadow(0 0 8px rgba(251, 191, 36, 0.5))' : d.significance === 'high' ? 'drop-shadow(0 0 4px rgba(243, 244, 246, 0.3))' : 'none')
      .call(d3.drag<SVGCircleElement, NetworkNode>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended))
      .on("click", (event, d) => {
        onNodeSelect?.(d);
        event.stopPropagation();
      })
      .on("mouseover", function(event, d) {
        d3.select<SVGCircleElement, NetworkNode>(this)
          .transition()
          .duration(200)
          .attr("r", d.size * 1.2)
          .attr("stroke-width", 3);
      })
      .on("mouseout", function(event, d) {
        d3.select<SVGCircleElement, NetworkNode>(this)
          .transition()
          .duration(200)
          .attr("r", d.size)
          .attr("stroke-width", 2);
      });

    // Add labels
    // Labels
    const labelGroup = g.append("g")
      .attr('class', 'labels')
      .style('display', showLabels ? 'block' : 'none');

    const significanceOrder = ['low', 'medium', 'high', 'critical'];
    const minSigIndex = significanceOrder.indexOf(labelMinSignificance);

    const labelData = nodes.filter(n => {
      const typeOk = labelShowTypes.includes(n.type);
      const sigIdx = significanceOrder.indexOf(n.significance || 'low');
      const sigOk = sigIdx >= minSigIndex;
      return typeOk && sigOk;
    });

    const label = labelGroup
      .selectAll('text')
      .data(labelData, (d: any) => (d as NetworkNode).id)
      .enter()
      .append<SVGTextElement>('text')
      .text(d => d.name.length > labelMaxLength ? d.name.substring(0, labelMaxLength - 3) + '...' : d.name)
      .attr('font-size', `${labelFontSize}px`)
      .attr('font-family', 'Inter, system-ui, -apple-system, sans-serif')
      .attr('font-weight', d => d.significance === 'critical' ? '600' : d.significance === 'high' ? '500' : '400')
      .attr('dx', d => d.size + 5)
      .attr('dy', '0.35em')
      .attr('fill', d => {
        switch (d.significance) {
          case 'critical': return '#fbbf24'; // Amber for critical
          case 'high': return '#f3f4f6'; // Light gray for high
          case 'medium': return '#d1d5db'; // Medium gray for medium
          case 'low': return '#9ca3af'; // Dark gray for low
          default: return '#6b7280'; // Default gray
        }
      })
      .style('pointer-events', 'none')
      .style('text-shadow', '0 1px 2px rgba(0, 0, 0, 0.5)')
      .style('opacity', d => d.significance === 'critical' ? 0.9 : d.significance === 'high' ? 0.8 : 0.7);

    // Update positions on tick
    if (simulation) {
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
      simulationRef.current = simulation;

      // Run label collision avoidance shortly after warm-up
      if (labelCollisionAvoidance) {
        setTimeout(() => {
          try {
            applyLabelCollisionAvoidance(label, labelFontSize);
          } catch {}
        }, 700);
      }
    } else {
      // Static positions (circular/hierarchical/geographic) with transitions
      // Initialize from previous positions if available
      const ease = transitionEasing === 'linear' ? d3.easeLinear
        : transitionEasing === 'quadInOut' ? d3.easeQuadInOut
        : d3.easeCubicInOut;

      node
        .attr('cx', d => prevNodePositionsRef.current.get(d.id)?.x ?? d.x!)
        .attr('cy', d => prevNodePositionsRef.current.get(d.id)?.y ?? d.y!)
        .transition().duration(transitionDurationMs).ease(ease)
        .attr("cx", d => d.x!)
        .attr("cy", d => d.y!);

      link
        .attr('x1', (d) => {
          const sId = typeof d.source === 'string' ? d.source : d.source.id;
          return prevNodePositionsRef.current.get(String(sId))?.x ?? (d.source as NetworkNode).x!;
        })
        .attr('y1', (d) => {
          const sId = typeof d.source === 'string' ? d.source : d.source.id;
          return prevNodePositionsRef.current.get(String(sId))?.y ?? (d.source as NetworkNode).y!;
        })
        .attr('x2', (d) => {
          const tId = typeof d.target === 'string' ? d.target : d.target.id;
          return prevNodePositionsRef.current.get(String(tId))?.x ?? (d.target as NetworkNode).x!;
        })
        .attr('y2', (d) => {
          const tId = typeof d.target === 'string' ? d.target : d.target.id;
          return prevNodePositionsRef.current.get(String(tId))?.y ?? (d.target as NetworkNode).y!;
        })
        .transition().duration(transitionDurationMs).ease(ease)
        .attr("x1", (d) => (d.source as NetworkNode).x!)
        .attr("y1", (d) => (d.source as NetworkNode).y!)
        .attr("x2", (d) => (d.target as NetworkNode).x!)
        .attr("y2", (d) => (d.target as NetworkNode).y!);

      label
        .attr('x', d => prevNodePositionsRef.current.get(d.id)?.x ?? d.x!)
        .attr('y', d => prevNodePositionsRef.current.get(d.id)?.y ?? d.y!)
        .transition().duration(transitionDurationMs).ease(ease)
        .attr("x", d => d.x!)
        .attr("y", d => d.y!);

      if (labelCollisionAvoidance) {
        setTimeout(() => {
          try {
            applyLabelCollisionAvoidance(label, labelFontSize);
          } catch {}
        }, transitionDurationMs + 50);
      }
    }

    // Drag functions
    function dragstarted(event: d3.D3DragEvent<SVGCircleElement, NetworkNode, NetworkNode>, d: NetworkNode) {
      const sim = simulationRef.current;
      if (sim) {
        if (!event.active) sim.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }
    }

    function dragged(event: d3.D3DragEvent<SVGCircleElement, NetworkNode, NetworkNode>, d: NetworkNode) {
      const sim = simulationRef.current;
      if (sim) {
        d.fx = event.x;
        d.fy = event.y;
      } else {
        // Static layouts: update element positions directly
        d.x = event.x;
        d.y = event.y;
        d3.select<SVGCircleElement, NetworkNode>(event.sourceEvent.target as SVGCircleElement)
          .attr('cx', event.x)
          .attr('cy', event.y);
        labelSelRef.current?.filter((n) => n.id === d.id)
          .attr('x', event.x)
          .attr('y', event.y);
        if (linkSelRef.current) {
          const nodesMap = nodesByIdRef.current;
          linkSelRef.current
            .attr('x1', (lnk) => {
              const sId = (lnk.source && (typeof lnk.source === 'string' ? lnk.source : lnk.source.id)) as string;
              const n = nodesMap.get(String(sId));
              return n?.x ?? 0;
            })
            .attr('y1', (lnk) => {
              const sId = (lnk.source && (typeof lnk.source === 'string' ? lnk.source : lnk.source.id)) as string;
              const n = nodesMap.get(String(sId));
              return n?.y ?? 0;
            })
            .attr('x2', (lnk) => {
              const tId = (lnk.target && (typeof lnk.target === 'string' ? lnk.target : lnk.target.id)) as string;
              const n = nodesMap.get(String(tId));
              return n?.x ?? 0;
            })
            .attr('y2', (lnk) => {
              const tId = (lnk.target && (typeof lnk.target === 'string' ? lnk.target : lnk.target.id)) as string;
              const n = nodesMap.get(String(tId));
              return n?.y ?? 0;
            });
        }
      }
    }

    function dragended(event: d3.D3DragEvent<SVGCircleElement, NetworkNode, NetworkNode>, d: NetworkNode) {
      const sim = simulationRef.current;
      if (sim) {
        if (!event.active) sim.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }
    }

    // Clear selection on background click
    svg.on("click", () => {
      onNodeSelect?.(null);
    });

    // Save positions for transitions on next render
    prevNodePositionsRef.current.clear();
    nodes.forEach(n => {
      if (typeof n.x === 'number' && typeof n.y === 'number') {
        prevNodePositionsRef.current.set(n.id, { x: n.x, y: n.y });
      }
    });

    // Save selections for dynamic updates
    nodeSelRef.current = node as unknown as d3.Selection<SVGCircleElement, NetworkNode, SVGGElement, unknown>;
    linkSelRef.current = link as unknown as d3.Selection<SVGLineElement, NetworkLink, SVGGElement, unknown>;
    labelSelRef.current = label as unknown as d3.Selection<SVGTextElement, NetworkNode, SVGGElement, unknown>;
    // Map nodes by id for quick link updates
    nodesByIdRef.current = new Map(nodes.map(n => [n.id, n] as [string, NetworkNode]));

    return () => {
      if (simulation) simulation.stop();
      simulationRef.current = null;
      nodeSelRef.current = null;
      linkSelRef.current = null;
      labelSelRef.current = null;
    };
  }, [graphData, width, height, onNodeSelect, layout, clustering, physics, effectiveFilters.minSignificance, edgeWeightMode, showLabels, labelMaxLength, labelFontSize, layoutPadding, pinnedNodeIds, labelCollisionAvoidance, labelShowTypes, labelMinSignificance, transitionDurationMs, transitionEasing]);

  // Smoothly update simulation when clustering/physics toggled
  useEffect(() => {
    const sim = simulationRef.current;
    if (!sim) return;
    // Update clustering forces
    const innerWidth = (svgRef.current?.clientWidth || width) - 40;
    const innerHeight = (svgRef.current?.clientHeight || height) - 40;
    const typeToX: Record<'person' | 'event' | 'organization' | 'location', number> = {
      person: innerWidth * 0.25,
      event: innerWidth * 0.5,
      organization: innerWidth * 0.75,
      location: innerWidth * 0.85
    };

    if (clustering) {
      sim.force('x', d3.forceX<NetworkNode>().strength(0.06).x((d) => typeToX[d.type] ?? innerWidth / 2));
      sim.force('y', d3.forceY<NetworkNode>().strength(0.03).y(innerHeight / 2));
    } else {
      sim.force('x', null as unknown as d3.ForceX<NetworkNode>);
      sim.force('y', null as unknown as d3.ForceY<NetworkNode>);
    }

    // Update physics (cooling/heating)
    if (physics) {
      sim.alphaTarget(0.6).restart();
      // Gently cool after warmup
      setTimeout(() => sim.alphaTarget(0), 600);
    } else {
      sim.alphaTarget(0);
    }
  }, [clustering, physics, width, height]);

  // Update pinning dynamically in force layout
  useEffect(() => {
    const sim = simulationRef.current;
    if (!sim) return;
    const pinned = new Set(pinnedNodeIds);
    sim.nodes().forEach((n) => {
      if (pinned.has(n.id)) {
        if (typeof n.x === 'number' && typeof n.y === 'number') {
          n.fx = n.x;
          n.fy = n.y;
        }
      } else {
        n.fx = null;
        n.fy = null;
      }
    });
    sim.alphaTarget(0.3).restart();
    setTimeout(() => sim.alphaTarget(0), 400);
  }, [pinnedNodeIds]);

  function applyLabelCollisionAvoidance(labelSel: d3.Selection<SVGTextElement, NetworkNode, SVGGElement, unknown>, fontSize: number) {
    const placed: Array<{ x: number; y: number; w: number; h: number; imp: number }> = [];
    const importance = (n: NetworkNode) => {
      const order: Record<string, number> = { critical: 4, high: 3, medium: 2, low: 1 };
      return order[n.significance as string] || 1;
    };
    const padding = 2;
    labelSel
      .attr('display', function(d) {
        const x = parseFloat((this as SVGTextElement).getAttribute('x') || '0');
        const y = parseFloat((this as SVGTextElement).getAttribute('y') || '0');
        const text = (this as SVGTextElement).textContent || '';
        const w = text.length * (fontSize * 0.6);
        const h = fontSize + 2;
        const imp = importance(d);
        for (const b of placed) {
          const overlap = !(x + w + padding < b.x || x > b.x + b.w + padding || y + h + padding < b.y || y > b.y + b.h + padding);
          if (overlap && imp <= b.imp) {
            return 'none';
          }
        }
        placed.push({ x, y, w, h, imp });
        return null;
      });
  }

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

  // Export helpers
  const exportSVG = (filename = 'network.svg') => {
    if (!svgRef.current) return;
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svgRef.current);
    const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportPNG = async (filename = 'network.png') => {
    if (!svgRef.current) return;
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svgRef.current);
    const svgBlob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    const img = new Image();
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    await new Promise<void>((resolve) => {
      img.onload = () => {
        ctx.fillStyle = '#111827';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        URL.revokeObjectURL(url);
        resolve();
      };
      img.src = url;
    });
    canvas.toBlob((blob) => {
      if (!blob) return;
      const pngUrl = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = pngUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(pngUrl);
    }, 'image/png');
  };

  useImperativeHandle(ref, () => ({
    zoomIn,
    zoomOut,
    resetZoom,
    exportPNG,
    exportSVG,
    getGraphData: () => ({
      nodes: graphData.nodes.map(n => ({ ...n })),
      links: graphData.links.map(l => ({
        source: typeof l.source === 'string' ? l.source : l.source.id,
        target: typeof l.target === 'string' ? l.target : l.target.id,
        strength: l.strength,
        type: l.type
      }))
    })
  }));

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
    if (effectiveFilters.showPeople) {
      nodeCount += peopleInEvents.size;
    }
    if (effectiveFilters.showEvents) {
      nodeCount += events.length;
    }
    // rough add for orgs/locations when enabled
    if (effectiveFilters.showOrganizations || effectiveFilters.showLocations) {
      nodeCount += Math.round(events.length * 0.5);
    }

    return { nodes: nodeCount };
  };

  const stats = displayStats();

  return (
    <div className={`relative ${className}`}>
      {/* Controls */}
      {showUI && (
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
      )}

      {/* Filters */}
      {showUI && (
      <div className="absolute top-4 right-4 z-10 bg-white dark:bg-gray-800 rounded-lg p-3 shadow-lg min-w-48">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="w-4 h-4" />
          <h3 className="font-medium">Filters</h3>
        </div>
        
        <div className="space-y-3">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={effectiveFilters.showPeople}
              onChange={(e) => setFilters(prev => ({ ...prev, showPeople: e.target.checked }))}
              className="rounded"
            />
            <span className="text-sm">Show People</span>
          </label>
          
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={effectiveFilters.showEvents}
              onChange={(e) => setFilters(prev => ({ ...prev, showEvents: e.target.checked }))}
              className="rounded"
            />
            <span className="text-sm">Show Events</span>
          </label>

          <div>
            <label className="block text-sm mb-1">Min Significance</label>
            <select
              value={effectiveFilters.minSignificance}
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
      )}

      {/* Legend */}
      {(showUI || showLegend) && (
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
      )}

      {/* Stats */}
      {showUI && (
      <div className="absolute bottom-4 right-4 z-10 bg-white dark:bg-gray-800 rounded-lg p-3 shadow-lg text-sm">
        <div>Nodes: {stats.nodes}</div>
        <div>Zoom: {Math.round(zoomLevel * 100)}%</div>
      </div>
      )}

      {/* Network SVG */}
      <svg
        ref={svgRef}
        width={width}
        height={height}
        className="bg-white dark:bg-gray-900 w-full h-full"
      />
    </div>
  );
});

export default NetworkVisualization;
