'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  BarChart3,
  TrendingUp,
  Users,
  Calendar,
  FileText,
  DollarSign,
  MapPin,
  Plane,
  AlertTriangle,
  Eye,
  Clock,
  Activity,
  Database,
  Filter,
  Download,
  Share2,
  Star
} from 'lucide-react';

interface AnalyticsData {
  totalPeople: number;
  totalEvents: number;
  totalOrganizations: number;
  totalDocuments: number;
  totalTransactions: number;
  totalProperties: number;
  totalFlights: number;
  criticalEvents: number;
  highSignificanceItems: number;
  dateRange: {
    earliest: string;
    latest: string;
  };
  topEntities: Array<{
    id: string;
    name: string;
    type: string;
    significance: string;
    connections: number;
  }>;
  activityByYear: Array<{
    year: number;
    events: number;
    people: number;
    transactions: number;
  }>;
  significanceDistribution: Record<string, number>;
  geographicCoverage: Array<{
    location: string;
    count: number;
    type: string;
  }>;
}

export default function AnalyticsDashboard() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMetric, setSelectedMetric] = useState<string>('overview');

  // Fetch analytics data
  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch data from multiple API endpoints
      const [peopleRes, eventsRes, orgsRes, docsRes, transRes, propsRes, flightsRes] = await Promise.all([
        fetch('/api/people?limit=1000'),
        fetch('/api/timeline?limit=1000'),
        fetch('/api/organizations?limit=1000'),
        fetch('/api/documents?limit=1000'),
        fetch('/api/financial?limit=1000'),
        fetch('/api/properties?limit=1000'),
        fetch('/api/flights?limit=1000')
      ]);

      const [peopleData, eventsData, orgsData, docsData, transData, propsData, flightsData] = await Promise.all([
        peopleRes.json(),
        eventsRes.json(),
        orgsRes.json(),
        docsRes.json(),
        transRes.json(),
        propsRes.json(),
        flightsRes.json()
      ]);

      // Process and aggregate the data
      const processedData: AnalyticsData = {
        totalPeople: peopleData.success ? peopleData.data.length : 0,
        totalEvents: eventsData.success ? eventsData.data.length : 0,
        totalOrganizations: orgsData.success ? orgsData.data.length : 0,
        totalDocuments: docsData.success ? docsData.data.length : 0,
        totalTransactions: transData.success ? transData.data.length : 0,
        totalProperties: propsData.success ? propsData.data.length : 0,
        totalFlights: flightsData.success ? flightsData.data.length : 0,
        criticalEvents: eventsData.success ? eventsData.data.filter((e: any) => e.significance === 'critical').length : 0,
        highSignificanceItems: [
          ...(peopleData.success ? peopleData.data.filter((p: any) => p.significance === 'critical' || p.significance === 'high') : []),
          ...(eventsData.success ? eventsData.data.filter((e: any) => e.significance === 'critical' || e.significance === 'high') : []),
          ...(orgsData.success ? orgsData.data.filter((o: any) => o.significance === 'critical' || o.significance === 'high') : [])
        ].length,
        dateRange: {
          earliest: eventsData.success && eventsData.data.length > 0
            ? eventsData.data.reduce((earliest: any, event: any) => event.date < earliest.date ? event : earliest).date
            : 'Unknown',
          latest: eventsData.success && eventsData.data.length > 0
            ? eventsData.data.reduce((latest: any, event: any) => event.date > latest.date ? event : latest).date
            : 'Unknown'
        },
        topEntities: [], // TODO: Calculate based on connections
        activityByYear: [], // TODO: Calculate yearly activity
        significanceDistribution: {
          critical: (peopleData.success ? peopleData.data.filter((p: any) => p.significance === 'critical').length : 0) +
                   (eventsData.success ? eventsData.data.filter((e: any) => e.significance === 'critical').length : 0),
          high: (peopleData.success ? peopleData.data.filter((p: any) => p.significance === 'high').length : 0) +
                (eventsData.success ? eventsData.data.filter((e: any) => e.significance === 'high').length : 0),
          medium: (peopleData.success ? peopleData.data.filter((p: any) => p.significance === 'medium').length : 0) +
                  (eventsData.success ? eventsData.data.filter((e: any) => e.significance === 'medium').length : 0),
          low: (peopleData.success ? peopleData.data.filter((p: any) => p.significance === 'low').length : 0) +
               (eventsData.success ? eventsData.data.filter((e: any) => e.significance === 'low').length : 0)
        },
        geographicCoverage: [] // TODO: Calculate geographic distribution
      };

      setAnalyticsData(processedData);
    } catch (err) {
      console.error('Analytics fetch error:', err);
      setError(err instanceof Error ? err.message : 'Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const metrics = [
    {
      key: 'overview',
      title: 'Overview',
      icon: Activity,
      color: 'blue',
      data: analyticsData ? {
        totalRecords: analyticsData.totalPeople + analyticsData.totalEvents + analyticsData.totalOrganizations +
                     analyticsData.totalDocuments + analyticsData.totalTransactions + analyticsData.totalProperties + analyticsData.totalFlights,
        criticalItems: analyticsData.criticalEvents + analyticsData.highSignificanceItems,
        dateSpan: analyticsData.dateRange.earliest !== 'Unknown' ?
          `${new Date(analyticsData.dateRange.earliest).getFullYear()} - ${new Date(analyticsData.dateRange.latest).getFullYear()}` :
          'Unknown'
      } : null
    },
    {
      key: 'people',
      title: 'People & Organizations',
      icon: Users,
      color: 'green',
      data: analyticsData ? {
        people: analyticsData.totalPeople,
        organizations: analyticsData.totalOrganizations,
        connections: 'Calculating...',
        significance: analyticsData.significanceDistribution
      } : null
    },
    {
      key: 'timeline',
      title: 'Timeline Activity',
      icon: Calendar,
      color: 'purple',
      data: analyticsData ? {
        events: analyticsData.totalEvents,
        critical: analyticsData.criticalEvents,
        span: analyticsData.dateRange,
        trends: 'Calculating...'
      } : null
    },
    {
      key: 'financial',
      title: 'Financial Analysis',
      icon: DollarSign,
      color: 'yellow',
      data: analyticsData ? {
        transactions: analyticsData.totalTransactions,
        totalValue: 'Calculating...',
        suspicious: 'Calculating...',
        patterns: 'Calculating...'
      } : null
    },
    {
      key: 'geographic',
      title: 'Geographic Coverage',
      icon: MapPin,
      color: 'red',
      data: analyticsData ? {
        properties: analyticsData.totalProperties,
        flights: analyticsData.totalFlights,
        locations: 'Calculating...',
        travel: 'Calculating...'
      } : null
    },
    {
      key: 'documents',
      title: 'Document Analysis',
      icon: FileText,
      color: 'gray',
      data: analyticsData ? {
        documents: analyticsData.totalDocuments,
        types: 'Calculating...',
        reliability: 'Calculating...',
        sources: 'Calculating...'
      } : null
    }
  ];

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Generating analytics from database...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              Analytics Error
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
            <button
              onClick={fetchAnalytics}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-blue-500" />
            Investigation Analytics
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Database-powered insights and trends
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">
            💾 Database-Powered
          </span>
          <button
            onClick={fetchAnalytics}
            className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Metric Selection */}
      <div className="flex flex-wrap gap-2 mb-6">
        {metrics.map((metric) => (
          <button
            key={metric.key}
            onClick={() => setSelectedMetric(metric.key)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedMetric === metric.key
                ? `bg-${metric.color}-100 dark:bg-${metric.color}-900/20 text-${metric.color}-800 dark:text-${metric.color}-200`
                : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
            }`}
          >
            <metric.icon className="w-4 h-4" />
            {metric.title}
          </button>
        ))}
      </div>

      {/* Analytics Display */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {(() => {
          const metric = metrics.find(m => m.key === selectedMetric);
          if (!metric || !analyticsData) return null;

          return (
            <>
              {/* Overview Cards */}
              <div className="space-y-4">
                {metric.key === 'overview' && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Database className="w-5 h-5 text-blue-500" />
                          <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Total Records</span>
                        </div>
                        <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                          {metric.data?.totalRecords || 0}
                        </div>
                      </div>
                      <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="w-5 h-5 text-red-500" />
                          <span className="text-sm font-medium text-red-700 dark:text-red-300">Critical Items</span>
                        </div>
                        <div className="text-2xl font-bold text-red-900 dark:text-red-100">
                          {metric.data?.criticalItems || 0}
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-5 h-5 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Investigation Span</span>
                      </div>
                      <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {metric.data?.dateSpan || 'Calculating...'}
                      </div>
                    </div>
                  </>
                )}

                {metric.key === 'people' && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="w-5 h-5 text-green-500" />
                          <span className="text-sm font-medium text-green-700 dark:text-green-300">People</span>
                        </div>
                        <div className="text-2xl font-bold text-green-900 dark:text-green-100">
                          {metric.data?.people || 0}
                        </div>
                      </div>
                      <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Activity className="w-5 h-5 text-orange-500" />
                          <span className="text-sm font-medium text-orange-700 dark:text-orange-300">Organizations</span>
                        </div>
                        <div className="text-2xl font-bold text-orange-900 dark:text-orange-100">
                          {metric.data?.organizations || 0}
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="w-5 h-5 text-yellow-500" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Significance Distribution</span>
                      </div>
                      <div className="space-y-1">
                        {Object.entries(metric.data?.significance || {}).map(([level, count]) => (
                          <div key={level} className="flex justify-between items-center">
                            <span className="text-sm capitalize">{level}</span>
                            <span className="text-sm font-mono">{count}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {metric.key === 'timeline' && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="w-5 h-5 text-purple-500" />
                          <span className="text-sm font-medium text-purple-700 dark:text-purple-300">Events</span>
                        </div>
                        <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                          {metric.data?.events || 0}
                        </div>
                      </div>
                      <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="w-5 h-5 text-red-500" />
                          <span className="text-sm font-medium text-red-700 dark:text-red-300">Critical Events</span>
                        </div>
                        <div className="text-2xl font-bold text-red-900 dark:text-red-100">
                          {metric.data?.critical || 0}
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-5 h-5 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Timeline Span</span>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {metric.data?.span?.earliest !== 'Unknown' ?
                          `${new Date(metric.data.span.earliest).toLocaleDateString()} - ${new Date(metric.data.span.latest).toLocaleDateString()}` :
                          'Calculating...'
                        }
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Right Column - Insights */}
              <div className="space-y-4">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="w-5 h-5 text-blue-500" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Key Insights</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    {metric.key === 'overview' && (
                      <>
                        <div className="flex justify-between">
                          <span>Database Coverage:</span>
                          <span className="font-medium">{metric.data?.totalRecords || 0} records</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Critical Intelligence:</span>
                          <span className="font-medium text-red-600">{metric.data?.criticalItems || 0} items</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Investigation Period:</span>
                          <span className="font-medium">{metric.data?.dateSpan || 'Calculating...'}</span>
                        </div>
                      </>
                    )}

                    {metric.key === 'people' && (
                      <>
                        <div className="flex justify-between">
                          <span>Network Size:</span>
                          <span className="font-medium">{(metric.data?.people || 0) + (metric.data?.organizations || 0)} entities</span>
                        </div>
                        <div className="flex justify-between">
                          <span>High-Value Targets:</span>
                          <span className="font-medium text-orange-600">
                            {((metric.data?.significance as any)?.high || 0) + ((metric.data?.significance as any)?.critical || 0)}
                          </span>
                        </div>
                      </>
                    )}

                    {metric.key === 'timeline' && (
                      <>
                        <div className="flex justify-between">
                          <span>Activity Level:</span>
                          <span className="font-medium">{metric.data?.events || 0} events</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Critical Periods:</span>
                          <span className="font-medium text-red-600">{metric.data?.critical || 0} events</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Eye className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Data Quality</span>
                  </div>
                  <div className="text-xs text-blue-600 dark:text-blue-400">
                    All data sourced from Supabase database with full-text search capabilities
                  </div>
                </div>
              </div>
            </>
          );
        })()}
      </div>
    </div>
  );
}
