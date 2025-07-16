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

interface FinancialFlowProps {
  className?: string;
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

export default function FinancialFlowAnalysis({ className = '' }: FinancialFlowProps) {
  const [viewMode, setViewMode] = useState<'network' | 'timeline' | 'analytics'>('network');
  const [selectedTransaction, setSelectedTransaction] = useState<string | null>(null);
  const [selectedEntity, setSelectedEntity] = useState<string | null>(null);
  const [showSuspiciousOnly, setShowSuspiciousOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [hoveredNode, setHoveredNode] = useState<FinancialNetworkNode | null>(null);
  
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
    
    if (searchTerm) {
      txns = txns.filter(txn => 
        txn.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        txn.purpose?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        getEntityById(txn.fromEntity)?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        getEntityById(txn.toEntity)?.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
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
  }, [showSuspiciousOnly, searchTerm, filters]);

  // Generate network data for visualization
  const networkData = useMemo(() => {
    const nodes = new Map<string, FinancialNetworkNode>();
    const edges: FinancialNetworkEdge[] = [];

    // Create nodes from entities involved in filtered transactions
    const involvedEntities = new Set<string>();
    filteredTransactions.forEach(txn => {
      involvedEntities.add(txn.fromEntity);
      involvedEntities.add(txn.toEntity);
    });

    Array.from(involvedEntities).forEach(entityId => {
      const entity = getEntityById(entityId);
      if (!entity) return;

      const entityTransactions = getTransactionsByEntity(entityId);
      const totalValue = entityTransactions.reduce((sum, txn) => {
        return sum + (txn.fromEntity === entityId ? -txn.amountUSD : txn.amountUSD);
      }, 0);

      const suspiciousActivity = entity.suspiciousActivity.length > 0 || 
                               entityTransactions.some(txn => txn.suspiciousActivity.length > 0);

      const position = getNodePosition(entityId);

      nodes.set(entityId, {
        id: entityId,
        name: entity.name,
        type: entity.type,
        totalTransactions: entityTransactions.length,
        totalValue: Math.abs(totalValue),
        riskScore: suspiciousActivity ? 75 : 25,
        size: Math.max(20, Math.min(80, Math.log(Math.abs(totalValue) + 1) * 8)),
        color: getNodeColor(entity.type, suspiciousActivity),
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
    });

    return {
      nodes: Array.from(nodes.values()),
      edges: Array.from(transactionMap.values())
    };
  }, [filteredTransactions]);

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
    <div className="relative w-full h-[600px] bg-white dark:bg-dark-800 rounded-lg border border-gray-200 dark:border-dark-700">
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox="0 0 1000 600"
        className="overflow-visible"
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
            className="cursor-pointer transition-transform hover:scale-110"
            onClick={() => setSelectedEntity(node.id)}
            onMouseEnter={() => setHoveredNode(node)}
            onMouseLeave={() => setHoveredNode(null)}
          >
            <circle
              cx={node.x}
              cy={node.y}
              r={node.size}
              fill={node.color}
              stroke={node.suspicious ? '#dc2626' : '#ffffff'}
              strokeWidth={node.suspicious ? 3 : 2}
              opacity={0.9}
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
              y={node.y! + node.size + 15}
              textAnchor="middle"
              fontSize="12"
              fill="#374151"
              fontWeight="500"
              className="pointer-events-none"
            >
              {node.name.length > 20 ? `${node.name.substring(0, 20)}...` : node.name}
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
        </div>
      </div>

      {/* Search and Controls */}
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
            onClick={() => setViewMode('network')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              viewMode === 'network'
                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                : 'text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100'
            }`}
          >
            Network
          </button>
          <button
            onClick={() => setViewMode('analytics')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              viewMode === 'analytics'
                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                : 'text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100'
            }`}
          >
            Analytics
          </button>
        </div>
      </div>

      {/* Main Content */}
      {viewMode === 'network' && renderNetworkView()}
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