'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import { sankey, sankeyLinkHorizontal, SankeyNode, SankeyLink, SankeyGraph } from 'd3-sankey';
import { FinancialTransaction } from '@/types/investigation';
import { Download, ZoomIn, ZoomOut, Maximize2, Info } from 'lucide-react';

interface SankeyFlowDiagramProps {
  transactions: FinancialTransaction[];
  width?: number;
  height?: number;
  className?: string;
  onNodeClick?: (nodeId: string) => void;
  onLinkClick?: (link: SankeyLink<SankeyNode<{}, {}>, {}>) => void;
}

interface SankeyNodeData {
  name: string;
  id: string;
  type: 'source' | 'intermediate' | 'target';
  entityType?: string;
  totalValue?: number;
  transactionCount?: number;
}

interface SankeyLinkData {
  source: string;
  target: string;
  value: number;
  transactions: FinancialTransaction[];
}

export default function SankeyFlowDiagram({
  transactions,
  width = 1200,
  height = 600,
  className = '',
  onNodeClick,
  onLinkClick
}: SankeyFlowDiagramProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [zoom, setZoom] = useState(1);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [selectedLink, setSelectedLink] = useState<SankeyLinkData | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Process transactions into Sankey data
  const sankeyData = useMemo(() => {
    const nodeMap = new Map<string, SankeyNodeData>();
    const linkMap = new Map<string, SankeyLinkData>();

    transactions.forEach(transaction => {
      // Add source node
      if (!nodeMap.has(transaction.fromEntity)) {
        nodeMap.set(transaction.fromEntity, {
          name: transaction.fromEntity,
          id: transaction.fromEntity,
          type: 'source',
          totalValue: 0,
          transactionCount: 0
        });
      }

      // Add target node
      if (!nodeMap.has(transaction.toEntity)) {
        nodeMap.set(transaction.toEntity, {
          name: transaction.toEntity,
          id: transaction.toEntity,
          type: 'target',
          totalValue: 0,
          transactionCount: 0
        });
      }

      // Update node values
      const sourceNode = nodeMap.get(transaction.fromEntity)!;
      const targetNode = nodeMap.get(transaction.toEntity)!;
      sourceNode.totalValue = (sourceNode.totalValue || 0) + transaction.amountUSD;
      targetNode.totalValue = (targetNode.totalValue || 0) + transaction.amountUSD;
      sourceNode.transactionCount = (sourceNode.transactionCount || 0) + 1;
      targetNode.transactionCount = (targetNode.transactionCount || 0) + 1;

      // Add/update link
      const linkKey = `${transaction.fromEntity}-${transaction.toEntity}`;
      if (!linkMap.has(linkKey)) {
        linkMap.set(linkKey, {
          source: transaction.fromEntity,
          target: transaction.toEntity,
          value: 0,
          transactions: []
        });
      }

      const link = linkMap.get(linkKey)!;
      link.value += transaction.amountUSD;
      link.transactions.push(transaction);
    });

    return {
      nodes: Array.from(nodeMap.values()),
      links: Array.from(linkMap.values())
    };
  }, [transactions]);

  // Render Sankey diagram
  useEffect(() => {
    if (!svgRef.current || sankeyData.nodes.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 20, right: 20, bottom: 20, left: 20 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top}) scale(${zoom})`);

    // Create Sankey generator
    const sankeyGenerator = sankey<SankeyNodeData, SankeyLinkData>()
      .nodeId((d: any) => d.id)
      .nodeWidth(20)
      .nodePadding(10)
      .extent([[0, 0], [innerWidth, innerHeight]]);

    // Generate the Sankey layout
    const graph: SankeyGraph<SankeyNodeData, SankeyLinkData> = sankeyGenerator({
      nodes: sankeyData.nodes.map(d => ({ ...d })),
      links: sankeyData.links.map(d => ({ ...d }))
    });

    // Color scale for nodes
    const colorScale = d3.scaleOrdinal<string>()
      .domain(['source', 'intermediate', 'target'])
      .range(['#3b82f6', '#8b5cf6', '#10b981']);

    // Draw links
    g.append('g')
      .attr('class', 'links')
      .selectAll('path')
      .data(graph.links)
      .join('path')
      .attr('d', sankeyLinkHorizontal())
      .attr('stroke', (d: any) => {
        const suspicious = d.transactions?.some((t: FinancialTransaction) => 
          t.suspiciousActivity && t.suspiciousActivity.length > 0
        );
        return suspicious ? '#ef4444' : '#94a3b8';
      })
      .attr('stroke-width', (d: any) => Math.max(1, d.width || 1))
      .attr('fill', 'none')
      .attr('opacity', 0.5)
      .style('cursor', 'pointer')
      .on('mouseover', function(event, d: any) {
        d3.select(this)
          .attr('opacity', 0.8)
          .attr('stroke-width', (d.width || 1) * 1.2);
      })
      .on('mouseout', function(event, d: any) {
        d3.select(this)
          .attr('opacity', 0.5)
          .attr('stroke-width', d.width || 1);
      })
      .on('click', (event, d: any) => {
        setSelectedLink(d);
        if (onLinkClick) onLinkClick(d);
      });

    // Add link labels for significant flows
    g.append('g')
      .attr('class', 'link-labels')
      .selectAll('text')
      .data(graph.links.filter((d: any) => d.value > 1000000))
      .join('text')
      .attr('x', (d: any) => (d.source.x1 + d.target.x0) / 2)
      .attr('y', (d: any) => (d.y0 + d.y1) / 2)
      .attr('dy', '0.35em')
      .attr('text-anchor', 'middle')
      .attr('font-size', '10px')
      .attr('fill', '#e2e8f0')
      .text((d: any) => `$${(d.value / 1000000).toFixed(1)}M`);

    // Draw nodes
    g.append('g')
      .attr('class', 'nodes')
      .selectAll('rect')
      .data(graph.nodes)
      .join('rect')
      .attr('x', (d: any) => d.x0)
      .attr('y', (d: any) => d.y0)
      .attr('height', (d: any) => d.y1 - d.y0)
      .attr('width', (d: any) => d.x1 - d.x0)
      .attr('fill', (d: any) => {
        if (selectedNode === d.id) return '#fbbf24';
        if (hoveredNode === d.id) return '#60a5fa';
        return colorScale(d.type);
      })
      .attr('stroke', '#1e293b')
      .attr('stroke-width', 2)
      .style('cursor', 'pointer')
      .on('mouseover', function(event, d: any) {
        setHoveredNode(d.id);
        d3.select(this)
          .attr('fill', '#60a5fa')
          .attr('stroke-width', 3);
      })
      .on('mouseout', function(event, d: any) {
        setHoveredNode(null);
        d3.select(this)
          .attr('fill', selectedNode === d.id ? '#fbbf24' : colorScale(d.type))
          .attr('stroke-width', 2);
      })
      .on('click', (event, d: any) => {
        setSelectedNode(d.id);
        if (onNodeClick) onNodeClick(d.id);
      });

    // Add node labels
    g.append('g')
      .attr('class', 'node-labels')
      .selectAll('text')
      .data(graph.nodes)
      .join('text')
      .attr('x', (d: any) => d.x0 < innerWidth / 2 ? d.x1 + 6 : d.x0 - 6)
      .attr('y', (d: any) => (d.y1 + d.y0) / 2)
      .attr('dy', '0.35em')
      .attr('text-anchor', (d: any) => d.x0 < innerWidth / 2 ? 'start' : 'end')
      .attr('font-size', '12px')
      .attr('font-weight', '500')
      .attr('fill', '#f1f5f9')
      .text((d: any) => {
        const name = d.name.replace('entity_', '').replace(/_/g, ' ');
        return name.length > 20 ? name.substring(0, 20) + '...' : name;
      });

    // Add node value labels
    g.append('g')
      .attr('class', 'node-value-labels')
      .selectAll('text')
      .data(graph.nodes)
      .join('text')
      .attr('x', (d: any) => d.x0 < innerWidth / 2 ? d.x1 + 6 : d.x0 - 6)
      .attr('y', (d: any) => (d.y1 + d.y0) / 2 + 15)
      .attr('dy', '0.35em')
      .attr('text-anchor', (d: any) => d.x0 < innerWidth / 2 ? 'start' : 'end')
      .attr('font-size', '10px')
      .attr('fill', '#94a3b8')
      .text((d: any) => `$${(d.value / 1000000).toFixed(1)}M`);

  }, [sankeyData, width, height, zoom, selectedNode, hoveredNode, onNodeClick, onLinkClick]);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.5));
  const handleResetZoom = () => setZoom(1);

  const handleExport = () => {
    if (!svgRef.current) return;

    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `financial-flow-sankey-${new Date().toISOString().split('T')[0]}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Controls */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
        <button
          onClick={handleZoomOut}
          className="p-2 bg-gray-800 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <span className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-sm">
          {Math.round(zoom * 100)}%
        </span>
        <button
          onClick={handleZoomIn}
          className="p-2 bg-gray-800 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={handleResetZoom}
          className="p-2 bg-gray-800 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
          title="Reset Zoom"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
        <button
          onClick={handleExport}
          className="p-2 bg-gray-800 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
          title="Export SVG"
        >
          <Download className="w-4 h-4" />
        </button>
      </div>

      {/* Legend */}
      <div className="absolute top-4 left-4 z-10 bg-gray-800/90 border border-gray-600 rounded-lg p-4 backdrop-blur-sm">
        <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <Info className="w-4 h-4" />
          Flow Legend
        </h3>
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span className="text-gray-300">Source Entities</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-purple-500 rounded"></div>
            <span className="text-gray-300">Intermediate</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span className="text-gray-300">Target Entities</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-2 bg-red-500 rounded"></div>
            <span className="text-gray-300">Suspicious Flow</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-2 bg-slate-400 rounded"></div>
            <span className="text-gray-300">Normal Flow</span>
          </div>
        </div>
      </div>

      {/* SVG Container */}
      <div className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
        <svg
          ref={svgRef}
          width={width}
          height={height}
          className="w-full h-auto"
        />
      </div>

      {/* Selected Link Details */}
      {selectedLink && (
        <div className="mt-4 p-4 bg-gray-800 border border-gray-600 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-3">Flow Details</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">From:</span>
              <p className="text-white font-medium">{selectedLink.source}</p>
            </div>
            <div>
              <span className="text-gray-400">To:</span>
              <p className="text-white font-medium">{selectedLink.target}</p>
            </div>
            <div>
              <span className="text-gray-400">Total Value:</span>
              <p className="text-white font-medium">${(selectedLink.value / 1000000).toFixed(2)}M</p>
            </div>
            <div>
              <span className="text-gray-400">Transactions:</span>
              <p className="text-white font-medium">{selectedLink.transactions.length}</p>
            </div>
          </div>
          <button
            onClick={() => setSelectedLink(null)}
            className="mt-3 text-sm text-cyan-400 hover:text-cyan-300"
          >
            Clear Selection
          </button>
        </div>
      )}

      {/* Statistics */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-gray-800 border border-gray-600 rounded-lg">
          <p className="text-sm text-gray-400">Total Nodes</p>
          <p className="text-2xl font-bold text-white">{sankeyData.nodes.length}</p>
        </div>
        <div className="p-4 bg-gray-800 border border-gray-600 rounded-lg">
          <p className="text-sm text-gray-400">Total Flows</p>
          <p className="text-2xl font-bold text-white">{sankeyData.links.length}</p>
        </div>
        <div className="p-4 bg-gray-800 border border-gray-600 rounded-lg">
          <p className="text-sm text-gray-400">Total Value</p>
          <p className="text-2xl font-bold text-white">
            ${(sankeyData.links.reduce((sum, link) => sum + link.value, 0) / 1000000).toFixed(1)}M
          </p>
        </div>
        <div className="p-4 bg-gray-800 border border-gray-600 rounded-lg">
          <p className="text-sm text-gray-400">Transactions</p>
          <p className="text-2xl font-bold text-white">{transactions.length}</p>
        </div>
      </div>
    </div>
  );
}

