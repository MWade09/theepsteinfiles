'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  AlertTriangle, 
  Filter, 
  Calendar,
  Eye,
  EyeOff,
  Search,
  Download,
  BarChart3,
  PieChart,
  ArrowRight,
  ArrowLeft,
  Building,
  User,
  Shield,
  Flag,
  Shuffle,
  Target,
  Clock,
  MapPin
} from 'lucide-react';
import { FinancialTransaction, FinancialEntity, FinancialNetworkNode, FinancialNetworkEdge } from '@/types/investigation';
import { financialTransactions, getTransactionsByEntity, getSuspiciousTransactions, getTotalTransactionValue } from '@/data/financial/transactions';
import { financialEntities, getEntityById } from '@/data/financial/entities';
import { corePeople } from '@/data/core/people';
import { coreOrganizations } from '@/data/core/organizations';
import { comprehensiveTimeline } from '@/data/core/timeline';
import { coreRelationships } from '@/data/core/relationships';

interface FinancialFlowProps {
  className?: string;
  externalSearch?: string;
  externalQuickFilter?: 'high_value' | 'offshore' | 'cash' | 'flagged' | null;
  onAppliedQuickFilter?: () => void;
}

interface FlowFilters {
  dateRange: {
    start: string;
    end: string;
  };
  amountRange: {
    min: number;
    max: number;
  };
  transactionTypes: string[];
  entities: string[];
  suspiciousOnly: boolean;
  verificationStatus: string[];
}

export default function FinancialFlowAnalysis({ className = '', externalSearch, externalQuickFilter, onAppliedQuickFilter }: FinancialFlowProps) {
  const [viewMode, setViewMode] = useState<'network' | 'flow' | 'timeline' | 'analytics'>('flow');
  const [selectedTransaction, setSelectedTransaction] = useState<string | null>(null);
  const [selectedEntity, setSelectedEntity] = useState<string | null>(null);
  const [showSuspiciousOnly, setShowSuspiciousOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState(externalSearch || '');
  const [showFilters, setShowFilters] = useState(false);
  const [hoveredNode, setHoveredNode] = useState<FinancialNetworkNode | null>(null);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [timelineDate, setTimelineDate] = useState<string>('2024-12-31');
  const [flowAnimation, setFlowAnimation] = useState(true);
  
  const [filters, setFilters] = useState<FlowFilters>({
    dateRange: { start: '1980-01-01', end: '2024-12-31' },
    amountRange: { min: 0, max: 100000000 },
    transactionTypes: ['all'],
    entities: [],
    suspiciousOnly: false,
    verificationStatus: ['verified', 'pending']
  });

  const svgRef = useRef<SVGSVGElement>(null);

  const getNodeColor = (type: string, suspicious: boolean): string => {
    if (suspicious) return '#ef4444'; // Red for suspicious
    
    const colors = {
      individual: '#3b82f6',
      corporation: '#10b981',
      bank: '#8b5cf6',
      trust: '#f59e0b',
      foundation: '#06b6d4',
      other: '#6b7280'
    };
    
    return colors[type as keyof typeof colors] || colors.other;
  };

  // Deterministic positioning based on entity ID to avoid hydration mismatch
  const getNodePosition = (entityId: string, maxX: number = 800, maxY: number = 500) => {
    // Simple hash function to generate consistent positions
    let hash = 0;
    for (let i = 0; i < entityId.length; i++) {
      const char = entityId.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    
    // Ensure positive values and map to desired range
    const x = Math.abs(hash % maxX) + 100;
    const y = Math.abs((hash >> 16) % maxY) + 100;
    
    return { x, y };
  };

  // Filter transactions based on current filters
  const filteredTransactions = useMemo(() => {
    let txns = showSuspiciousOnly ? getSuspiciousTransactions() : financialTransactions;
    
    const appliedSearch = (externalSearch ?? searchTerm).trim();
    if (appliedSearch) {
      txns = txns.filter(txn => 
        txn.description.toLowerCase().includes(appliedSearch.toLowerCase()) ||
        txn.purpose?.toLowerCase().includes(appliedSearch.toLowerCase()) ||
        getEntityById(txn.fromEntity)?.name.toLowerCase().includes(appliedSearch.toLowerCase()) ||
        getEntityById(txn.toEntity)?.name.toLowerCase().includes(appliedSearch.toLowerCase())
      );
    }

    // Apply quick filter
    if (externalQuickFilter) {
      if (externalQuickFilter === 'high_value') {
        txns = txns.filter(txn => txn.amountUSD >= 10_000_000);
      } else if (externalQuickFilter === 'offshore') {
        txns = txns.filter(txn => txn.suspiciousActivity.some(sa => sa.type === 'offshore_transfer'));
      } else if (externalQuickFilter === 'cash') {
        txns = txns.filter(txn => txn.method === 'cash');
      } else if (externalQuickFilter === 'flagged') {
        txns = txns.filter(txn => txn.suspiciousActivity.length > 0);
      }
    }

    return txns.filter(txn => {
      const inDateRange = txn.transactionDate >= filters.dateRange.start && 
                         txn.transactionDate <= filters.dateRange.end;
      const inAmountRange = txn.amountUSD >= filters.amountRange.min && 
                           txn.amountUSD <= filters.amountRange.max;
      const matchesType = filters.transactionTypes.includes('all') || 
                         filters.transactionTypes.includes(txn.transactionType);
      const matchesEntity = filters.entities.length === 0 ||
                           filters.entities.includes(txn.fromEntity) ||
                           filters.entities.includes(txn.toEntity);
      const matchesVerification = filters.verificationStatus.includes(txn.verificationStatus);
      
      return inDateRange && inAmountRange && matchesType && matchesEntity && matchesVerification;
    });
  }, [showSuspiciousOnly, searchTerm, filters, externalQuickFilter, externalSearch]);

  // Clear the external quick filter after it has been applied for one render
  useEffect(() => {
    if (externalQuickFilter) {
      onAppliedQuickFilter?.();
    }
  }, [externalQuickFilter, onAppliedQuickFilter]);

  // Generate network data for visualization
  const networkData = useMemo(() => {
    const nodes = new Map<string, FinancialNetworkNode>();
    const edges: FinancialNetworkEdge[] = [];

    // Create nodes from entities involved in filtered transactions
    const involvedEntities = new Set<string>();
    filteredTransactions.forEach((txn: FinancialTransaction) => {
      involvedEntities.add(txn.fromEntity);
      involvedEntities.add(txn.toEntity);
    });

    Array.from(involvedEntities).forEach(entityId => {
      const entity: FinancialEntity | undefined = getEntityById(entityId);
      if (!entity) return;

      const entityTransactions = getTransactionsByEntity(entityId);
      const totalValue = entityTransactions.reduce((sum, txn) => {
        return sum + (txn.fromEntity === entityId ? -txn.amountUSD : txn.amountUSD);
      }, 0);

      const suspiciousActivity = entity.suspiciousActivity.length > 0 || 
                               entityTransactions.some(txn => txn.suspiciousActivity.length > 0);

      const position = getNodePosition(entityId);

      // Map entity types to network node types
      const mapEntityTypeToNodeType = (entityType: string): 'individual' | 'corporation' | 'trust' | 'foundation' | 'bank' | 'other' => {
        switch (entityType) {
          case 'individual': return 'individual';
          case 'corporation': return 'corporation';
          case 'trust': return 'trust';
          case 'foundation': return 'foundation';
          case 'bank': return 'bank';
          case 'investment_fund':
          case 'shell_company':
          case 'government':
          case 'other':
          default:
            return 'other';
        }
      };

      const nodeType = mapEntityTypeToNodeType(entity.type);

      nodes.set(entityId, {
        id: entityId,
        name: entity.name,
        type: nodeType,
        totalTransactions: entityTransactions.length,
        totalValue: Math.abs(totalValue),
        riskScore: suspiciousActivity ? 75 : 25,
        size: Math.max(20, Math.min(80, Math.log(Math.abs(totalValue) + 1) * 8)),
        color: getNodeColor(nodeType, suspiciousActivity),
        x: position.x,
        y: position.y,
        suspicious: suspiciousActivity
      });
    });

    // Create edges from transactions
    const transactionMap = new Map<string, FinancialNetworkEdge>();
    
    filteredTransactions.forEach(txn => {
      const edgeKey = `${txn.fromEntity}-${txn.toEntity}`;
      const reverseKey = `${txn.toEntity}-${txn.fromEntity}`;
      
      if (transactionMap.has(edgeKey)) {
        const edge = transactionMap.get(edgeKey)!;
        edge.transactionCount++;
        edge.totalValue += txn.amountUSD;
      } else if (transactionMap.has(reverseKey)) {
        const edge = transactionMap.get(reverseKey)!;
        edge.transactionCount++;
        edge.totalValue += txn.amountUSD;
      } else {
        const suspicious = txn.suspiciousActivity.length > 0;
        transactionMap.set(edgeKey, {
          id: `edge_${txn.fromEntity}_${txn.toEntity}`,
          source: txn.fromEntity,
          target: txn.toEntity,
          transactionCount: 1,
          totalValue: txn.amountUSD,
          averageValue: txn.amountUSD,
          timespan: {
            start: txn.transactionDate,
            end: txn.transactionDate
          },
          suspicious,
          width: Math.max(2, Math.min(10, Math.log(txn.amountUSD) / 2)),
          color: suspicious ? '#ef4444' : '#3b82f6'
        });
      }
    });

    // Update average values
    transactionMap.forEach(edge => {
      edge.averageValue = edge.totalValue / edge.transactionCount;
      edges.push(edge);
    });

    return {
      nodes: Array.from(nodes.values()),
      edges
    };
  }, [filteredTransactions]);

  // Animation and interaction effects
  useEffect(() => {
    if (!svgRef.current || !flowAnimation) return;

    const interval = setInterval(() => {
      // Trigger flow animation updates
      const flows = svgRef.current?.querySelectorAll('.flow-animation');
      flows?.forEach((flow, index) => {
        const delay = (index * 100) / animationSpeed;
        setTimeout(() => {
          flow.classList.add('animate-pulse');
          setTimeout(() => flow.classList.remove('animate-pulse'), 1000);
        }, delay);
      });
    }, 3000 / animationSpeed);

    return () => clearInterval(interval);
  }, [flowAnimation, animationSpeed, networkData]);

  const formatCurrency = (amount: number): string => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`;
    } else {
      return `$${amount.toFixed(0)}`;
    }
  };

  const getSuspiciousActivitySummary = () => {
    const suspicious = getSuspiciousTransactions();
    const totalSuspiciousValue = suspicious.reduce((sum, txn) => sum + txn.amountUSD, 0);
    const suspiciousEntities = new Set(suspicious.flatMap(txn => [txn.fromEntity, txn.toEntity])).size;
    
    return {
      transactionCount: suspicious.length,
      totalValue: totalSuspiciousValue,
      entityCount: suspiciousEntities,
      averageValue: totalSuspiciousValue / suspicious.length
    };
  };

  const renderNetworkView = () => (
    <div className="relative w-full h-[600px] bg-white dark:bg-dark-800 rounded-lg border border-gray-200 dark:border-dark-700 overflow-hidden">
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox="0 0 1000 600"
        preserveAspectRatio="xMidYMid meet"
        className="block"
      >
        {/* Grid lines */}
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#f3f4f6" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Edges */}
        {networkData.edges.map(edge => {
          const sourceNode = networkData.nodes.find(n => n.id === edge.source);
          const targetNode = networkData.nodes.find(n => n.id === edge.target);
          if (!sourceNode || !targetNode) return null;

          return (
            <g key={edge.id}>
              <line
                x1={sourceNode.x}
                y1={sourceNode.y}
                x2={targetNode.x}
                y2={targetNode.y}
                stroke={edge.color}
                strokeWidth={edge.width}
                opacity={edge.suspicious ? 0.8 : 0.6}
                className="transition-opacity hover:opacity-100"
              />
              
              {/* Transaction value label */}
              <text
                x={(sourceNode.x! + targetNode.x!) / 2}
                y={(sourceNode.y! + targetNode.y!) / 2 - 5}
                textAnchor="middle"
                fontSize="10"
                fill="#6b7280"
                className="pointer-events-none"
              >
                {formatCurrency(edge.totalValue)}
              </text>

              {/* Arrow marker */}
              <defs>
                <marker
                  id={`arrow-${edge.id}`}
                  viewBox="0 0 10 10"
                  refX="5"
                  refY="3"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto"
                >
                  <path d="M0,0 L0,6 L9,3 z" fill={edge.color} />
                </marker>
              </defs>
              <line
                x1={sourceNode.x}
                y1={sourceNode.y}
                x2={targetNode.x}
                y2={targetNode.y}
                stroke="transparent"
                strokeWidth="1"
                markerEnd={`url(#arrow-${edge.id})`}
              />
            </g>
          );
        })}

        {/* Nodes */}
        {networkData.nodes.map(node => (
          <g
            key={node.id}
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => setSelectedEntity(node.id)}
            onMouseEnter={() => setHoveredNode(node)}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <circle
              cx={node.x}
              cy={node.y}
              r={Math.min(node.size, 40)}
              fill={node.color}
              stroke={node.suspicious ? '#dc2626' : '#111827'}
              strokeWidth={node.suspicious ? 2 : 1}
              opacity={0.95}
            />
            
            {/* Suspicious flag */}
            {node.suspicious && (
              <g>
                <circle
                  cx={node.x! + node.size - 5}
                  cy={node.y! - node.size + 5}
                  r="8"
                  fill="#dc2626"
                />
                <text
                  x={node.x! + node.size - 5}
                  y={node.y! - node.size + 9}
                  textAnchor="middle"
                  fontSize="10"
                  fill="white"
                  fontWeight="bold"
                >
                  !
                </text>
              </g>
            )}

            {/* Node label */}
            <text
              x={node.x}
              y={node.y! + Math.min(node.size, 40) + 14}
              textAnchor="middle"
              fontSize="12"
              fill="#374151"
              fontWeight="500"
              className="pointer-events-none"
            >
              {node.name.length > 18 ? `${node.name.substring(0, 18)}...` : node.name}
            </text>
          </g>
        ))}

        {/* Hover tooltip */}
        {hoveredNode && hoveredNode.x !== undefined && hoveredNode.y !== undefined && (
          <g>
            <rect
              x={hoveredNode.x + 20}
              y={hoveredNode.y - 40}
              width="200"
              height="60"
              fill="rgba(0,0,0,0.9)"
              rx="4"
            />
            <text
              x={hoveredNode.x + 30}
              y={hoveredNode.y - 25}
              fill="white"
              fontSize="12"
              fontWeight="bold"
            >
              {hoveredNode.name}
            </text>
            <text
              x={hoveredNode.x + 30}
              y={hoveredNode.y - 10}
              fill="white"
              fontSize="10"
            >
              {hoveredNode.totalTransactions} transactions
            </text>
            <text
              x={hoveredNode.x + 30}
              y={hoveredNode.y + 5}
              fill="white"
              fontSize="10"
            >
              Total: {formatCurrency(hoveredNode.totalValue)}
            </text>
          </g>
        )}
      </svg>
    </div>
  );

  const renderAnalyticsView = () => {
    const totalValue = getTotalTransactionValue();
    const suspiciousStats = getSuspiciousActivitySummary();
    
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Summary Stats */}
        <div className="bg-white dark:bg-dark-800 rounded-lg p-6 border border-gray-200 dark:border-dark-700">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Financial Overview</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <DollarSign className="w-8 h-8 mx-auto text-blue-600 mb-2" />
              <div className="text-2xl font-bold text-blue-600">{formatCurrency(totalValue)}</div>
              <div className="text-sm text-blue-800 dark:text-blue-400">Total Volume</div>
            </div>
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <BarChart3 className="w-8 h-8 mx-auto text-green-600 mb-2" />
              <div className="text-2xl font-bold text-green-600">{filteredTransactions.length}</div>
              <div className="text-sm text-green-800 dark:text-green-400">Transactions</div>
            </div>
            <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <AlertTriangle className="w-8 h-8 mx-auto text-red-600 mb-2" />
              <div className="text-2xl font-bold text-red-600">{suspiciousStats.transactionCount}</div>
              <div className="text-sm text-red-800 dark:text-red-400">Suspicious</div>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <Building className="w-8 h-8 mx-auto text-purple-600 mb-2" />
              <div className="text-2xl font-bold text-purple-600">{networkData.nodes.length}</div>
              <div className="text-sm text-purple-800 dark:text-purple-400">Entities</div>
            </div>
          </div>
        </div>

        {/* Suspicious Activity Breakdown */}
        <div className="bg-white dark:bg-dark-800 rounded-lg p-6 border border-gray-200 dark:border-dark-700">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Suspicious Activity Analysis</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-red-50 dark:bg-red-900/20 rounded">
              <span className="text-sm font-medium">Total Suspicious Value</span>
              <span className="text-lg font-bold text-red-600">{formatCurrency(suspiciousStats.totalValue)}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded">
              <span className="text-sm font-medium">Average Suspicious Amount</span>
              <span className="text-lg font-bold text-orange-600">{formatCurrency(suspiciousStats.averageValue)}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded">
              <span className="text-sm font-medium">Entities Involved</span>
              <span className="text-lg font-bold text-yellow-600">{suspiciousStats.entityCount}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded">
              <span className="text-sm font-medium">Risk Percentage</span>
              <span className="text-lg font-bold text-gray-600">
                {((suspiciousStats.transactionCount / filteredTransactions.length) * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        {/* Transaction List */}
        <div className="lg:col-span-2 bg-white dark:bg-dark-800 rounded-lg p-6 border border-gray-200 dark:border-dark-700">
          <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Recent Transactions</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredTransactions.slice(0, 10).map(txn => {
              const fromEntity = getEntityById(txn.fromEntity);
              const toEntity = getEntityById(txn.toEntity);
              const isSuspicious = txn.suspiciousActivity.length > 0;
              
              return (
                <div
                  key={txn.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-dark-700 ${
                    isSuspicious 
                      ? 'border-red-200 bg-red-50 dark:bg-red-900/10 dark:border-red-800' 
                      : 'border-gray-200 dark:border-dark-600'
                  }`}
                  onClick={() => setSelectedTransaction(txn.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {isSuspicious && <AlertTriangle className="w-4 h-4 text-red-600" />}
                      <div>
                        <div className="font-medium text-gray-900 dark:text-gray-100">
                          {formatCurrency(txn.amountUSD)} - {txn.transactionType}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {fromEntity?.name} → {toEntity?.name}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(txn.transactionDate).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-gray-500">
                        {txn.method}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // Interactive Flow Visualization
  const renderFlowView = () => {
    // Start from globally filtered transactions so quick filters and external search apply here too
    const flowFilteredTransactions = filteredTransactions.filter(txn => {
      const txnDate = new Date(txn.transactionDate);
      const filterStartDate = new Date(filters.dateRange.start);
      const filterEndDate = new Date(timelineDate);
      return (
        txnDate >= filterStartDate &&
        txnDate <= filterEndDate &&
        txn.amountUSD >= filters.amountRange.min &&
        txn.amountUSD <= filters.amountRange.max
      );
    });

    const entitiesMap = new Map();
    flowFilteredTransactions.forEach(txn => {
      if (!entitiesMap.has(txn.fromEntity)) {
        const entity = getEntityById(txn.fromEntity);
        if (entity) entitiesMap.set(txn.fromEntity, entity);
      }
      if (!entitiesMap.has(txn.toEntity)) {
        const entity = getEntityById(txn.toEntity);
        if (entity) entitiesMap.set(txn.toEntity, entity);
      }
    });

    const entities = Array.from(entitiesMap.values());
    const maxAmount = Math.max(...flowFilteredTransactions.map(t => t.amountUSD));

    const columns = 4;
    const rows = Math.max(1, Math.ceil(entities.length / columns));
    const maxRadius = 60;
    const topMargin = 100;
    const rowGap = 150;
    const bottomLabelSpace = 50; // space for labels under last row
    const containerHeight = topMargin + (rows - 1) * rowGap + maxRadius + bottomLabelSpace;

    return (
      <div className="bg-white dark:bg-dark-800 rounded-lg p-6 border border-gray-200 dark:border-dark-700">
        {/* Flow Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium">Timeline</span>
              <input
                type="date"
                value={timelineDate}
                onChange={(e) => setTimelineDate(e.target.value)}
                className="px-3 py-1 border border-gray-300 dark:border-dark-600 rounded text-sm dark:bg-dark-700"
              />
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm">Animation</span>
              <button
                onClick={() => setFlowAnimation(!flowAnimation)}
                className={`px-3 py-1 rounded text-xs font-medium ${
                  flowAnimation ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                }`}
              >
                {flowAnimation ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            {flowFilteredTransactions.length} transactions • ${(flowFilteredTransactions.reduce((sum, t) => sum + t.amountUSD, 0) / 1000000).toFixed(1)}M total
          </div>
        </div>

        {/* Flow Diagram */}
        <div className="relative border border-gray-200 dark:border-dark-600 rounded-lg" style={{ height: containerHeight }}>
          <svg width="100%" height="100%" className="bg-gray-50 dark:bg-dark-900">
            {/* Entity Nodes */}
            {entities.map((entity, index) => {
              const x = 100 + (index % columns) * 200;
              const y = topMargin + Math.floor(index / columns) * rowGap;
              const entityTransactions = filteredTransactions.filter(t => 
                t.fromEntity === entity.id || t.toEntity === entity.id
              );
              const totalValue = entityTransactions.reduce((sum, t) => sum + t.amountUSD, 0);
              const suspiciousCount = entityTransactions.filter(t => t.suspiciousActivity.length > 0).length;
              const nodeSize = Math.max(20, Math.min(maxRadius, Math.log(totalValue + 1) * 5));

              return (
                <g key={entity.id}>
                  <circle
                    cx={x}
                    cy={y}
                    r={nodeSize}
                    fill={getNodeColor(entity.type, suspiciousCount > 0)}
                    stroke={suspiciousCount > 0 ? '#ef4444' : '#e5e7eb'}
                    strokeWidth={suspiciousCount > 0 ? 3 : 1}
                    className="cursor-pointer hover:opacity-80"
                    onClick={() => setSelectedEntity(entity.id)}
                  />
                  {suspiciousCount > 0 && (
                    <circle
                      cx={x + nodeSize - 8}
                      cy={y - nodeSize + 8}
                      r="6"
                      fill="#ef4444"
                      className="animate-pulse"
                    />
                  )}
                  <text
                    x={x}
                    y={y + nodeSize + 20}
                    textAnchor="middle"
                    className="text-xs font-medium fill-gray-700 dark:fill-gray-300"
                  >
                    {entity.name.length > 15 ? entity.name.substring(0, 15) + '...' : entity.name}
                  </text>
                  <text
                    x={x}
                    y={y + nodeSize + 35}
                    textAnchor="middle"
                    className="text-xs fill-gray-500"
                  >
                    ${(totalValue / 1000000).toFixed(1)}M
                  </text>
                </g>
              );
            })}

            {/* Transaction Flows */}
            {flowFilteredTransactions.slice(0, 20).map((txn, index) => {
              const fromEntity = entities.find(e => e.id === txn.fromEntity);
              const toEntity = entities.find(e => e.id === txn.toEntity);
              if (!fromEntity || !toEntity) return null;

              const fromIndex = entities.indexOf(fromEntity);
              const toIndex = entities.indexOf(toEntity);
              const x1 = 100 + (fromIndex % columns) * 200;
              const y1 = topMargin + Math.floor(fromIndex / columns) * rowGap;
              const x2 = 100 + (toIndex % columns) * 200;
              const y2 = topMargin + Math.floor(toIndex / columns) * rowGap;

              const strokeWidth = Math.max(1, Math.min(8, (txn.amountUSD / maxAmount) * 8));
              const isSuspicious = txn.suspiciousActivity.length > 0;

              return (
                <g key={`flow-${txn.id}`}>
                  <defs>
                    <marker
                      id={`arrowhead-${index}`}
                      markerWidth="10"
                      markerHeight="7"
                      refX="9"
                      refY="3.5"
                      orient="auto"
                    >
                      <polygon
                        points="0 0, 10 3.5, 0 7"
                        fill={isSuspicious ? "#ef4444" : "#6b7280"}
                      />
                    </marker>
                  </defs>
                  <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={isSuspicious ? "#ef4444" : "#6b7280"}
                    strokeWidth={strokeWidth}
                    strokeDasharray={isSuspicious ? "5,5" : "none"}
                    markerEnd={`url(#arrowhead-${index})`}
                    className={`cursor-pointer hover:opacity-80 ${flowAnimation ? 'animate-pulse' : ''}`}
                    onClick={() => setSelectedTransaction(txn.id)}
                  >
                    {flowAnimation && (
                      <animate
                        attributeName="stroke-dashoffset"
                        values="10;0"
                        dur={`${2 / animationSpeed}s`}
                        repeatCount="indefinite"
                      />
                    )}
                  </line>
                  
                  {/* Amount Label */}
                  <text
                    x={(x1 + x2) / 2}
                    y={(y1 + y2) / 2 - 5}
                    textAnchor="middle"
                    className="text-xs font-medium fill-gray-700 dark:fill-gray-300 pointer-events-none"
                  >
                    ${(txn.amountUSD / 1000000).toFixed(1)}M
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Flow Legend */}
          <div className="absolute bottom-4 left-4 bg-white dark:bg-dark-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-dark-700">
            <div className="text-xs font-medium mb-2">Flow Thickness = Amount</div>
            <div className="flex items-center space-x-4 text-xs">
              <div className="flex items-center space-x-1">
                <div className="w-4 h-0.5 bg-gray-500"></div>
                <span>Normal</span>
              </div>
              <div className="flex items-center space-x-1">
                <svg width="16" height="2" className="overflow-visible">
                  <line 
                    x1="0" 
                    y1="1" 
                    x2="16" 
                    y2="1" 
                    stroke="#ef4444" 
                    strokeWidth="2"
                    strokeDasharray="3,2"
                  />
                </svg>
                <span>Suspicious</span>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction Details */}
        {selectedTransaction && (
          <div className="mt-6 p-4 bg-gray-50 dark:bg-dark-700 rounded-lg">
            {(() => {
              const txn = flowFilteredTransactions.find(t => t.id === selectedTransaction);
              if (!txn) return null;
              
              return (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">Transaction Details</h4>
                    <button 
                      onClick={() => setSelectedTransaction(null)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Amount:</span>
                      <div>${txn.amountUSD.toLocaleString()}</div>
                    </div>
                    <div>
                      <span className="font-medium">Date:</span>
                      <div>{new Date(txn.transactionDate).toLocaleDateString()}</div>
                    </div>
                    <div>
                      <span className="font-medium">Type:</span>
                      <div className="capitalize">{txn.transactionType}</div>
                    </div>
                    <div>
                      <span className="font-medium">Method:</span>
                      <div className="capitalize">{txn.method.replace('_', ' ')}</div>
                    </div>
                  </div>
                  <div>
                    <span className="font-medium">Purpose:</span>
                    <div className="text-sm">{txn.purpose}</div>
                  </div>
                  {txn.suspiciousActivity.length > 0 && (
                    <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded border border-red-200 dark:border-red-800">
                      <div className="font-medium text-red-800 dark:text-red-400 mb-1">Suspicious Activity</div>
                      {txn.suspiciousActivity.map(activity => (
                        <div key={activity.id} className="text-sm text-red-700 dark:text-red-300">
                          {activity.description}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        )}
      </div>
    );
  };

  // Timeline View
  const renderTimelineView = () => {
    // Base timeline on globally filtered transactions so quick filters/search apply
    const timelineTransactions = filteredTransactions
      .slice()
      .sort((a, b) => new Date(a.transactionDate).getTime() - new Date(b.transactionDate).getTime());

    return (
      <div className="bg-white dark:bg-dark-800 rounded-lg p-6 border border-gray-200 dark:border-dark-700">
        <div className="space-y-4">
          {timelineTransactions.slice(0, 20).map((txn) => (
            <div key={txn.id} className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-dark-700 rounded-lg">
              <div className="flex-shrink-0">
                <div className={`w-3 h-3 rounded-full ${
                  txn.suspiciousActivity.length > 0 ? 'bg-red-500' : 'bg-blue-500'
                }`}></div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="font-medium">${txn.amountUSD.toLocaleString()}</div>
                  <div className="text-sm text-gray-500">{new Date(txn.transactionDate).toLocaleDateString()}</div>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{txn.purpose}</div>
                <div className="text-xs text-gray-500">
                  {getEntityById(txn.fromEntity)?.name} → {getEntityById(txn.toEntity)?.name}
                </div>
              </div>
              {txn.suspiciousActivity.length > 0 && (
                <div className="flex-shrink-0">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={`w-full space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Financial Flow Analysis
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Interactive visualization of financial transactions and suspicious activity patterns
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowSuspiciousOnly(!showSuspiciousOnly)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              showSuspiciousOnly
                ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                : 'bg-gray-100 text-gray-700 dark:bg-dark-700 dark:text-gray-300'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Suspicious Only</span>
          </button>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors dark:bg-blue-900/20 dark:text-blue-400"
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>

          {/* Animation Controls */}
          <button
            onClick={() => setFlowAnimation(!flowAnimation)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              flowAnimation 
                ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                : 'bg-gray-100 text-gray-700 dark:bg-dark-700 dark:text-gray-300'
            }`}
          >
            {flowAnimation ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            <span>Animation</span>
          </button>

          {/* Download Button */}
          <button
            onClick={() => {
              const data = {
                transactions: filteredTransactions,
                summary: getSuspiciousActivitySummary(),
                timestamp: new Date().toISOString()
              };
              const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `financial-analysis-${new Date().toISOString().slice(0, 10)}.json`;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
            }}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-100 text-purple-800 rounded-lg hover:bg-purple-200 transition-colors dark:bg-purple-900/20 dark:text-purple-400"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Search and View Mode Controls */}
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search transactions, entities, purposes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-dark-700 dark:text-gray-100"
          />
        </div>

        <div className="flex items-center border border-gray-300 dark:border-dark-600 rounded-lg">
          <button
            onClick={() => setViewMode('flow')}
            className={`px-4 py-2 text-sm font-medium transition-colors rounded-l-lg ${
              viewMode === 'flow'
                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                : 'text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100'
            }`}
          >
            Flow
          </button>
          <button
            onClick={() => setViewMode('network')}
            className={`px-4 py-2 text-sm font-medium transition-colors border-x border-gray-300 dark:border-dark-600 ${
              viewMode === 'network'
                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                : 'text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100'
            }`}
          >
            Network
          </button>
          <button
            onClick={() => setViewMode('timeline')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              viewMode === 'timeline'
                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                : 'text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100'
            }`}
          >
            Timeline
          </button>
          <button
            onClick={() => setViewMode('analytics')}
            className={`px-4 py-2 text-sm font-medium transition-colors rounded-r-lg ${
              viewMode === 'analytics'
                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                : 'text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100'
            }`}
          >
            Analytics
          </button>
        </div>
      </div>

      {/* Advanced Filters Panel */}
      {showFilters && (
        <div className="bg-white dark:bg-dark-800 rounded-lg border border-gray-200 dark:border-dark-700 p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center space-x-2">
              <Filter className="w-5 h-5" />
              <span>Advanced Filters</span>
            </h3>
            
            {/* Animation Speed Control */}
            <div className="flex items-center space-x-3">
              <Clock className="w-4 h-4 text-gray-500" />
              <label className="text-sm text-gray-700 dark:text-gray-300">Speed:</label>
              <input
                type="range"
                min="0.5"
                max="3"
                step="0.5"
                value={animationSpeed}
                onChange={(e) => setAnimationSpeed(parseFloat(e.target.value))}
                className="w-20"
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">{animationSpeed}x</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Date Range Filter */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <Calendar className="w-4 h-4" />
                <span>Date Range</span>
              </label>
              <div className="space-y-2">
                <input
                  type="date"
                  value={filters.dateRange.start}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    dateRange: { ...prev.dateRange, start: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg dark:bg-dark-700"
                />
                <input
                  type="date"
                  value={filters.dateRange.end}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    dateRange: { ...prev.dateRange, end: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg dark:bg-dark-700"
                />
              </div>
            </div>

            {/* Amount Range Filter */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <DollarSign className="w-4 h-4" />
                <span>Amount Range (USD)</span>
              </label>
              <div className="space-y-2">
                <input
                  type="number"
                  placeholder="Min amount"
                  value={filters.amountRange.min}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    amountRange: { ...prev.amountRange, min: parseInt(e.target.value) || 0 }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg dark:bg-dark-700"
                />
                <input
                  type="number"
                  placeholder="Max amount"
                  value={filters.amountRange.max}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    amountRange: { ...prev.amountRange, max: parseInt(e.target.value) || 100000000 }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg dark:bg-dark-700"
                />
              </div>
            </div>

            {/* Entity Type Filters */}
            <div className="space-y-2">
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <Building className="w-4 h-4" />
                <span>Entity Types</span>
              </label>
              <div className="space-y-1">
                {['individual', 'corporation', 'bank', 'trust', 'foundation'].map(type => (
                  <label key={type} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={filters.entities.includes(type)}
                      onChange={() => {
                        setFilters(prev => ({
                          ...prev,
                          entities: prev.entities.includes(type)
                            ? prev.entities.filter(t => t !== type)
                            : [...prev.entities, type]
                        }));
                      }}
                      className="rounded border-gray-300 dark:border-dark-600"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">{type}</span>
                    {type === 'individual' && <User className="w-3 h-3 text-blue-500" />}
                    {type === 'bank' && <Shield className="w-3 h-3 text-purple-500" />}
                    {type === 'corporation' && <Building className="w-3 h-3 text-green-500" />}
                  </label>
                ))}
                
                {/* Entity Statistics */}
                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-dark-600">
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Total Entities: {financialEntities.length}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    People: {corePeople.length} | Organizations: {coreOrganizations.length}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Timeline Events: {comprehensiveTimeline.length}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Relationships: {coreRelationships.length}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Risk Assessment Tools */}
          <div className="border-t border-gray-200 dark:border-dark-700 pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-red-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Risk Assessment</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => {
                    // Shuffle network layout for new perspective
                    setSelectedEntity(null); // Reset selection to trigger re-render
                  }}
                  className="flex items-center space-x-2 px-3 py-1 bg-indigo-100 text-indigo-800 rounded-lg hover:bg-indigo-200 transition-colors dark:bg-indigo-900/20 dark:text-indigo-400"
                >
                  <Shuffle className="w-4 h-4" />
                  <span>Shuffle Layout</span>
                </button>
                
                <button
                  onClick={() => {
                    // Focus on flagged entities
                    setFilters(prev => ({ ...prev, suspiciousOnly: true }));
                    setShowSuspiciousOnly(true);
                  }}
                  className="flex items-center space-x-2 px-3 py-1 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors dark:bg-red-900/20 dark:text-red-400"
                >
                  <Flag className="w-4 h-4" />
                  <span>Focus Flagged</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Timeline Navigation */}
      {viewMode === 'timeline' && (
        <div className="bg-white dark:bg-dark-800 rounded-lg border border-gray-200 dark:border-dark-700 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  const currentDate = new Date(timelineDate);
                  currentDate.setMonth(currentDate.getMonth() - 1);
                  setTimelineDate(currentDate.toISOString().slice(0, 10));
                }}
                className="flex items-center space-x-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors dark:bg-dark-700 dark:text-gray-300"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>
              
              <input
                type="date"
                value={timelineDate}
                onChange={(e) => setTimelineDate(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg dark:bg-dark-700"
              />
              
              <button
                onClick={() => {
                  const currentDate = new Date(timelineDate);
                  currentDate.setMonth(currentDate.getMonth() + 1);
                  setTimelineDate(currentDate.toISOString().slice(0, 10));
                }}
                className="flex items-center space-x-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors dark:bg-dark-700 dark:text-gray-300"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Trends for {new Date(timelineDate).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Analytics Charts Navigation */}
      {viewMode === 'analytics' && (
        <div className="bg-white dark:bg-dark-800 rounded-lg border border-gray-200 dark:border-dark-700 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <BarChart3 className="w-5 h-5 text-blue-500" />
              <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">Analytics Dashboard</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {/* Toggle chart type */}}
                className="flex items-center space-x-2 px-3 py-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors dark:bg-blue-900/20 dark:text-blue-400"
              >
                <PieChart className="w-4 h-4" />
                <span>Chart Type</span>
              </button>
              
              <MapPin className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
      )}

      {/* Entity Details Panel */}
      {selectedEntity && (
        <div className="bg-white dark:bg-dark-800 rounded-lg border border-gray-200 dark:border-dark-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center space-x-2">
              <Building className="w-5 h-5" />
              <span>Entity Details</span>
            </h3>
            <button
              onClick={() => setSelectedEntity(null)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              ×
            </button>
          </div>
          {(() => {
            const entity = getEntityById(selectedEntity);
            if (!entity) return <div>Entity not found</div>;
            
            return (
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">{entity.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">{entity.type}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Registration:</span>
                    <span className="ml-2 text-gray-900 dark:text-gray-100">{entity.registrationCountry}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Status:</span>
                    <span className="ml-2 text-gray-900 dark:text-gray-100 capitalize">{entity.currentStatus}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Legal Structure:</span>
                    <span className="ml-2 text-gray-900 dark:text-gray-100 uppercase">{entity.legalStructure}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Tax Haven:</span>
                    <span className={`ml-2 ${entity.taxHaven ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                      {entity.taxHaven ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>
                
                {entity.suspiciousActivity.length > 0 && (
                  <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                    <div className="flex items-center space-x-2 text-red-800 dark:text-red-400 mb-2">
                      <Flag className="w-4 h-4" />
                      <span className="font-medium">Suspicious Activity ({entity.suspiciousActivity.length})</span>
                    </div>
                    <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
                      {entity.suspiciousActivity.map((activity, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            activity.severity === 'critical' ? 'bg-red-200 text-red-900 dark:bg-red-900/50 dark:text-red-200' :
                            activity.severity === 'high' ? 'bg-orange-200 text-orange-900 dark:bg-orange-900/50 dark:text-orange-200' :
                            activity.severity === 'medium' ? 'bg-yellow-200 text-yellow-900 dark:bg-yellow-900/50 dark:text-yellow-200' :
                            'bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-200'
                          }`}>
                            {activity.severity}
                          </span>
                          <span>• {activity.description}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      )}

      {/* Main Content */}
      {viewMode === 'flow' && renderFlowView()}
      {viewMode === 'network' && renderNetworkView()}
      {viewMode === 'timeline' && renderTimelineView()}
      {viewMode === 'analytics' && renderAnalyticsView()}

      {/* Legend */}
      <div className="bg-white dark:bg-dark-800 rounded-lg p-4 border border-gray-200 dark:border-dark-700">
        <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Legend</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-blue-500"></div>
            <span>Individual</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-green-500"></div>
            <span>Corporation</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-purple-500"></div>
            <span>Bank</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-orange-500"></div>
            <span>Trust/Foundation</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 rounded-full bg-red-500 border-2 border-red-700"></div>
            <span>Suspicious Activity</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-1 bg-red-500"></div>
            <span>High-risk Flow</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-1 bg-blue-500"></div>
            <span>Normal Flow</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-600 rounded-full text-white text-xs flex items-center justify-center font-bold">!</div>
            <span>Alert Flag</span>
          </div>
        </div>
      </div>
    </div>
  );
} 