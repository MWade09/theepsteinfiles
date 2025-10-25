'use client';

import { useState, useMemo } from 'react';
import {
  TrendingUp,
  DollarSign,
  Building,
  Plane,
  Target,
  Globe,
  Activity,
  BarChart3,
  PieChart,
  Download,
  Share2,
  Filter,
  Star,
  Shield,
  Maximize2,
  Eye
} from 'lucide-react';
import { enhancedProperties } from '@/data/geographic/properties';
import { allFlightLogs } from '@/data/geographic/travelPatterns';

interface AnalyticsMetric {
  label: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'stable';
  icon: any;
  color: string;
  description?: string;
}

interface GeographicInsight {
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  category: 'financial' | 'operational' | 'investigative' | 'network';
  data: any;
}

export default function GeographicAnalytics() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'financial' | 'operational' | 'investigative' | 'network'>('all');
  const [showDetailedView, setShowDetailedView] = useState(false);

  // Calculate comprehensive analytics
  const analytics = useMemo(() => {
    const totalProperties = enhancedProperties.length;
    const totalValue = enhancedProperties.reduce((sum, p) => sum + p.financials.purchasePrice, 0);
    const currentValue = enhancedProperties.reduce((sum, p) => sum + (p.financials.currentEstimatedValue || 0), 0);
    const renovationCosts = enhancedProperties.reduce((sum, p) => sum + (p.financials.renovationCosts || 0), 0);
    const annualMaintenance = enhancedProperties.reduce((sum, p) => sum + (p.financials.annualMaintenance || 0), 0);

    const significantProperties = enhancedProperties.filter(p => p.significance === 'critical' || p.significance === 'high');
    const seizedProperties = enhancedProperties.filter(p => p.currentStatus === 'seized');
    const verifiedProperties = enhancedProperties.filter(p => p.verified);

    const totalFlights = allFlightLogs.length;
    const criticalFlights = allFlightLogs.filter(f => f.significance === 'critical').length;
    const internationalFlights = allFlightLogs.filter(f =>
      f.departure.coordinates[0] !== f.arrival.coordinates[0] ||
      Math.abs(f.departure.coordinates[1] - f.arrival.coordinates[1]) > 10
    ).length;

    const countries = new Set(enhancedProperties.map(p => {
      if (p.coordinates[0] > 50) return 'Europe';
      if (p.coordinates[0] > 20 && p.coordinates[1] < -50) return 'Americas';
      if (p.coordinates[0] < 20 && p.coordinates[1] > 30) return 'Middle East';
      return 'Other';
    })).size;

    const ownershipChanges = enhancedProperties.reduce((sum, p) => sum + p.ownershipHistory.length, 0);
    const suspiciousTransactions = enhancedProperties.reduce((sum, p) =>
      sum + (p.financials.suspiciousTransactions?.length || 0), 0
    );

    return {
      totalProperties,
      totalValue,
      currentValue,
      renovationCosts,
      annualMaintenance,
      significantProperties: significantProperties.length,
      seizedProperties: seizedProperties.length,
      verifiedProperties: verifiedProperties.length,
      totalFlights,
      criticalFlights,
      internationalFlights,
      countries,
      ownershipChanges,
      suspiciousTransactions,
      valueAppreciation: ((currentValue - totalValue) / totalValue * 100).toFixed(1)
    };
  }, []);

  // Key metrics for dashboard
  const keyMetrics: AnalyticsMetric[] = [
    {
      label: 'Properties Tracked',
      value: analytics.totalProperties,
      change: '+140%',
      trend: 'up',
      icon: Building,
      color: 'text-blue-600',
      description: 'Total properties in investigation network'
    },
    {
      label: 'Total Investment',
      value: `$${(analytics.totalValue / 1000000).toFixed(1)}M`,
      change: `+${analytics.valueAppreciation}%`,
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600',
      description: 'Original purchase value of all properties'
    },
    {
      label: 'Current Value',
      value: `$${(analytics.currentValue / 1000000).toFixed(1)}M`,
      icon: TrendingUp,
      color: 'text-purple-600',
      description: 'Estimated current market value'
    },
    {
      label: 'Flight Operations',
      value: analytics.totalFlights,
      change: '+133%',
      trend: 'up',
      icon: Plane,
      color: 'text-cyan-600',
      description: 'Documented aircraft movements'
    },
    {
      label: 'Countries Involved',
      value: analytics.countries,
      icon: Globe,
      color: 'text-indigo-600',
      description: 'Global operational reach'
    },
    {
      label: 'Critical Properties',
      value: analytics.significantProperties,
      change: '67%',
      trend: 'stable',
      icon: Star,
      color: 'text-red-600',
      description: 'High-impact investigation targets'
    },
    {
      label: 'Seized Assets',
      value: analytics.seizedProperties,
      icon: Shield,
      color: 'text-orange-600',
      description: 'Properties under government control'
    },
    {
      label: 'Verified Intelligence',
      value: analytics.verifiedProperties,
      change: '92%',
      trend: 'up',
      icon: Eye,
      color: 'text-emerald-600',
      description: 'Confirmed and validated data'
    }
  ];

  // Geographic insights
  const insights: GeographicInsight[] = [
    {
      title: 'Caribbean Island Network',
      description: 'Two adjacent islands (Little & Great Saint James) create a 240-acre private archipelago, suggesting strategic territorial control and isolation from mainland oversight.',
      impact: 'high',
      category: 'operational',
      data: {
        islands: 2,
        totalAcres: 240,
        combinedValue: 85000000,
        firstPurchase: '1998-07-01',
        investigationLevel: 'critical'
      }
    },
    {
      title: 'Manhattan Power Base',
      description: 'The $20M Manhattan mansion was transferred from Les Wexner for $0, establishing Epstein\'s elite social hub in one of the world\'s most exclusive neighborhoods.',
      impact: 'high',
      category: 'network',
      data: {
        address: '9 East 71st Street',
        originalOwner: 'Leslie Wexner',
        transferMethod: 'Gift',
        currentValue: 77000000,
        socialSignificance: 'critical'
      }
    },
    {
      title: 'Palm Beach Operations Center',
      description: 'The Palm Beach estate served as the primary location for alleged activities, with extensive renovations and security features indicating long-term operational planning.',
      impact: 'high',
      category: 'investigative',
      data: {
        purchasePrice: 2500000,
        renovationCosts: 8000000,
        investigationStart: '2005-03-01',
        lawEnforcementActions: 3,
        witnessTestimonies: 25
      }
    },
    {
      title: 'International Flight Network',
      description: '14 documented flights show extensive international travel patterns, with high-profile passengers and strategic route planning between key properties.',
      impact: 'medium',
      category: 'operational',
      data: {
        totalFlights: 14,
        internationalRoutes: 8,
        highProfilePassengers: 8,
        criticalFlights: 5,
        totalDistance: 45000
      }
    },
    {
      title: 'Financial Asset Diversification',
      description: 'Property portfolio spans 8 countries with $118M in acquisitions, showing sophisticated asset protection and geographic risk distribution strategies.',
      impact: 'medium',
      category: 'financial',
      data: {
        countries: 8,
        totalInvestment: 118400000,
        currentValue: 307000000,
        appreciation: 159,
        suspiciousTransactions: 8
      }
    }
  ];

  const filteredMetrics = keyMetrics.filter(metric =>
    selectedCategory === 'all' || metric.description?.toLowerCase().includes(selectedCategory)
  );

  const filteredInsights = insights.filter(insight =>
    selectedCategory === 'all' || insight.category === selectedCategory
  );

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      default: return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-cyan-500" />
            Geographic Intelligence Analytics
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Advanced analysis of property networks, financial patterns, and investigation intelligence
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as any)}
              className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="all">All Categories</option>
              <option value="financial">Financial</option>
              <option value="operational">Operational</option>
              <option value="investigative">Investigative</option>
              <option value="network">Network</option>
            </select>
          </div>

          <button
            onClick={() => setShowDetailedView(!showDetailedView)}
            className="flex items-center gap-2 px-3 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
          >
            <Maximize2 className="w-4 h-4" />
            {showDetailedView ? 'Simple View' : 'Detailed View'}
          </button>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filteredMetrics.map((metric, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-cyan-300 dark:hover:border-cyan-600 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <metric.icon className={`w-8 h-8 ${metric.color}`} />
              {metric.trend && (
                <div className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
                  metric.trend === 'up' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                  metric.trend === 'down' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' :
                  'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
                }`}>
                  <TrendingUp className="w-3 h-3" />
                  {metric.change}
                </div>
              )}
            </div>

            <div className="mb-1">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {metric.value}
              </p>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400">
              {metric.label}
            </p>

            {showDetailedView && metric.description && (
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                {metric.description}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Geographic Insights */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-500" />
            Geographic Intelligence Insights
          </h3>

          <div className="flex items-center gap-2">
            <Download className="w-4 h-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer" />
            <Share2 className="w-4 h-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 cursor-pointer" />
          </div>
        </div>

        <div className="space-y-4">
          {filteredInsights.map((insight, index) => (
            <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-purple-300 dark:hover:border-purple-600 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {insight.title}
                    </h4>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getImpactColor(insight.impact)}`}>
                      {insight.impact.toUpperCase()} IMPACT
                    </span>
                    <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 rounded">
                      {insight.category}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                    {insight.description}
                  </p>
                </div>
              </div>

              {showDetailedView && insight.data && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {Object.entries(insight.data).map(([key, value]) => (
                      <div key={key} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                        <p className="text-xs text-gray-600 dark:text-gray-400 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </p>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          {typeof value === 'number' ? value.toLocaleString() : String(value)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Advanced Analysis Sections */}
      {showDetailedView && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Property Analysis */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <PieChart className="w-5 h-5 text-green-500" />
              Property Analysis
            </h3>

            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="text-sm text-gray-600 dark:text-gray-400">By Type</span>
                <div className="flex gap-2">
                  {['island', 'residence', 'ranch', 'airport', 'yacht'].map(type => {
                    const count = enhancedProperties.filter(p => p.type === type).length;
                    return count > 0 ? (
                      <span key={type} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 rounded">
                        {type} ({count})
                      </span>
                    ) : null;
                  })}
                </div>
              </div>

              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="text-sm text-gray-600 dark:text-gray-400">By Status</span>
                <div className="flex gap-2">
                  {['active', 'sold', 'seized', 'unknown'].map(status => {
                    const count = enhancedProperties.filter(p => p.currentStatus === status).length;
                    return count > 0 ? (
                      <span key={status} className="px-2 py-1 text-xs bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400 rounded">
                        {status} ({count})
                      </span>
                    ) : null;
                  })}
                </div>
              </div>

              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="text-sm text-gray-600 dark:text-gray-400">Financial Range</span>
                <div className="text-sm text-gray-900 dark:text-white">
                  <span className="text-green-600">${(analytics.totalValue / 1000000).toFixed(1)}M</span>
                  {' → '}
                  <span className="text-purple-600">${(analytics.currentValue / 1000000).toFixed(1)}M</span>
                </div>
              </div>
            </div>
          </div>

          {/* Investigation Progress */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-red-500" />
              Investigation Progress
            </h3>

            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-red-50 dark:bg-red-900/10 rounded-lg">
                <span className="text-sm text-red-800 dark:text-red-400">Critical Properties</span>
                <span className="text-lg font-bold text-red-600">
                  {enhancedProperties.filter(p => p.significance === 'critical').length}
                </span>
              </div>

              <div className="flex justify-between items-center p-3 bg-orange-50 dark:bg-orange-900/10 rounded-lg">
                <span className="text-sm text-orange-800 dark:text-orange-400">Law Enforcement Actions</span>
                <span className="text-lg font-bold text-orange-600">
                  {enhancedProperties.reduce((sum, p) =>
                    sum + (p.investigationDetails.lawEnforcement?.length || 0), 0
                  )}
                </span>
              </div>

              <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/10 rounded-lg">
                <span className="text-sm text-blue-800 dark:text-blue-400">Witness Accounts</span>
                <span className="text-lg font-bold text-blue-600">
                  {enhancedProperties.reduce((sum, p) =>
                    sum + (p.investigationDetails.witnessAccounts?.length || 0), 0
                  )}
                </span>
              </div>

              <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/10 rounded-lg">
                <span className="text-sm text-green-800 dark:text-green-400">Verification Level</span>
                <span className="text-lg font-bold text-green-600">
                  {Math.round((analytics.verifiedProperties / analytics.totalProperties) * 100)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <button className="flex items-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors">
          <Download className="w-4 h-4" />
          Export Analysis
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
          <Share2 className="w-4 h-4" />
          Share Report
        </button>
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:border-gray-400 dark:hover:border-gray-500 transition-colors">
          <Activity className="w-4 h-4" />
          View Timeline
        </button>
      </div>
    </div>
  );
}

