'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Search, 
  ArrowLeft,
  Brain,
  Zap,
  History,
  Settings,
  Download,
  Save,
  BookOpen,
  Sparkles,
  Database,
  Activity
} from 'lucide-react';
import GlobalSearch from '@/components/GlobalSearch';

export default function SearchPage() {
  const [searchMode, setSearchMode] = useState<'standard' | 'semantic' | 'ai-insights'>('standard');
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

  // Search statistics
  const searchStats = {
    totalQueries: '12.4K',
    averageResponse: '0.34s',
    indexedDocuments: '2,847',
    searchAccuracy: '94.7%',
    semanticMatchRate: '87.2%',
    lastIndexUpdate: new Date().toLocaleDateString()
  };

  const searchModes = [
    {
      id: 'standard',
      title: 'Standard Search',
      description: 'Traditional keyword search with filters and sorting',
      icon: <Search className="w-5 h-5" />,
      features: ['Keyword matching', 'Boolean operators', 'Field-specific search', 'Advanced filters']
    },
    {
      id: 'semantic',
      title: 'Semantic Analysis',
      description: 'AI-powered contextual understanding and relationship mapping',
      icon: <Brain className="w-5 h-5" />,
      features: ['Concept matching', 'Intent understanding', 'Relationship inference', 'Context awareness']
    },
    {
      id: 'ai-insights',
      title: 'AI Insights Engine',
      description: 'Deep analysis with pattern recognition and predictive insights',
      icon: <Sparkles className="w-5 h-5" />,
      features: ['Pattern detection', 'Anomaly identification', 'Predictive analysis', 'Cross-reference generation']
    }
  ];

  const quickSearches = [
    { query: 'financial transactions 2019', results: 847, type: 'financial' },
    { query: 'private jet travel patterns', results: 234, type: 'travel' },
    { query: 'political connections network', results: 156, type: 'network' },
    { query: 'offshore entities Virgin Islands', results: 89, type: 'financial' },
    { query: 'court documents deposition', results: 123, type: 'legal' },
    { query: 'property acquisitions timeline', results: 67, type: 'property' }
  ];

  const recentSearches = [
    { query: 'Virginia Roberts testimony', timestamp: '2 hours ago', results: 23 },
    { query: 'Little St. James property records', timestamp: '5 hours ago', results: 45 },
    { query: 'flight logs 2002-2005', timestamp: '1 day ago', results: 178 },
    { query: 'banking records HSBC', timestamp: '2 days ago', results: 89 }
  ];

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
                <Search className="w-6 h-6 text-cyan-400" />
                <div className="flex-1 lg:flex-none">
                  <h1 className="text-lg sm:text-xl font-bold text-white">Advanced Search Engine</h1>
                  <p className="text-xs sm:text-sm text-gray-400 hidden sm:block">AI-Powered Investigation Search & Analysis</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full lg:w-auto">
              {/* Quick Actions */}
              <div className="flex items-center gap-2 sm:gap-4">
                <button
                  onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                  className={`flex items-center justify-center gap-2 px-3 py-2 border rounded-lg transition-colors touch-target ${
                    showAdvancedOptions 
                      ? 'bg-cyan-600 border-cyan-500 text-white' 
                      : 'bg-gray-700/50 border-gray-600 hover:border-gray-500'
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  <span className="text-sm hidden sm:inline">Advanced</span>
                </button>

                <button className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-700/50 border border-gray-600 rounded-lg hover:border-gray-500 transition-colors touch-target">
                  <Save className="w-4 h-4" />
                  <span className="text-sm hidden sm:inline">Save Query</span>
                </button>

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
        {/* Search Controls & Analytics Sidebar */}
        <div className="w-full lg:w-80 bg-gray-900/95 border-b lg:border-r lg:border-b-0 border-gray-700/50 backdrop-blur-sm relative z-40 flex flex-col max-h-screen lg:h-auto overflow-y-auto">
          
          {/* Search Statistics */}
          <div className="p-4 lg:p-6 border-b border-gray-700/50">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-cyan-400" />
              Search Analytics
            </h3>
            
            <div className="grid grid-cols-2 gap-3 lg:gap-4 mb-4 lg:mb-6">
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3">
                <p className="text-xl lg:text-2xl font-bold text-cyan-400">{searchStats.totalQueries}</p>
                <p className="text-xs text-gray-400">Total Queries</p>
              </div>
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3">
                <p className="text-xl lg:text-2xl font-bold text-green-400">{searchStats.averageResponse}</p>
                <p className="text-xs text-gray-400">Avg Response</p>
              </div>
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3">
                <p className="text-xl lg:text-2xl font-bold text-orange-400">{searchStats.indexedDocuments}</p>
                <p className="text-xs text-gray-400">Documents</p>
              </div>
              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3">
                <p className="text-xl lg:text-2xl font-bold text-purple-400">{searchStats.searchAccuracy}</p>
                <p className="text-xs text-gray-400">Accuracy</p>
              </div>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3">
              <p className="text-sm font-semibold text-white mb-1">Semantic Matching</p>
              <p className="text-lg font-bold text-cyan-400">{searchStats.semanticMatchRate}</p>
              <p className="text-xs text-gray-400">AI context understanding rate</p>
            </div>
          </div>

          {/* Search Mode Selection */}
          <div className="p-4 lg:p-6 border-b border-gray-700/50">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Brain className="w-5 h-5 text-cyan-400" />
              Search Mode
            </h3>
            
            <div className="space-y-3">
              {searchModes.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setSearchMode(mode.id as 'standard' | 'semantic' | 'ai-insights')}
                  className={`w-full text-left p-4 border rounded-lg transition-all ${
                    searchMode === mode.id
                      ? 'bg-cyan-600/20 border-cyan-500/50 text-white'
                      : 'bg-gray-800/30 border-gray-700 hover:border-gray-600 text-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg ${
                      searchMode === mode.id ? 'bg-cyan-500/30' : 'bg-gray-700'
                    }`}>
                      {mode.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold">{mode.title}</h4>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">{mode.description}</p>
                  <div className="space-y-1">
                    {mode.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-xs text-gray-500">
                        <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Searches */}
          <div className="p-4 lg:p-6 border-b border-gray-700/50">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-cyan-400" />
              Quick Searches
            </h3>
            
            <div className="space-y-2">
              {quickSearches.map((search, index) => (
                <button
                  key={index}
                  className="w-full text-left p-3 bg-gray-800/30 border border-gray-700 rounded-lg hover:border-gray-600 transition-all group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-white group-hover:text-cyan-400 transition-colors">
                      {search.query}
                    </span>
                    <span className="text-xs text-gray-500">
                      {search.results}
                    </span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded uppercase font-semibold ${
                    search.type === 'financial' ? 'bg-green-500/20 text-green-400' :
                    search.type === 'travel' ? 'bg-blue-500/20 text-blue-400' :
                    search.type === 'network' ? 'bg-purple-500/20 text-purple-400' :
                    search.type === 'legal' ? 'bg-red-500/20 text-red-400' :
                    'bg-orange-500/20 text-orange-400'
                  }`}>
                    {search.type}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Recent Searches */}
          <div className="p-4 lg:p-6 border-b border-gray-700/50">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <History className="w-5 h-5 text-cyan-400" />
              Recent Searches
            </h3>
            
            <div className="space-y-2">
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  className="w-full text-left p-3 bg-gray-800/30 border border-gray-700 rounded-lg hover:border-gray-600 transition-all group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-white group-hover:text-cyan-400 transition-colors line-clamp-1">
                      {search.query}
                    </span>
                    <span className="text-xs text-gray-500">
                      {search.results}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {search.timestamp}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* System Status */}
          <div className="p-4 lg:p-6 border-t border-gray-700/50 mt-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-400">Search Engine Active</span>
              </div>
              <span className="text-xs text-gray-500">
                Updated: {searchStats.lastIndexUpdate}
              </span>
            </div>
          </div>
        </div>

        {/* Main Search Area */}
        <div className="flex-1 relative min-h-[60vh] lg:min-h-0">
          <div className="h-full bg-gradient-to-br from-gray-900 to-black p-2 sm:p-4 lg:p-6 overflow-y-auto">
            
            {/* Search Mode Header */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                {searchModes.find(mode => mode.id === searchMode)?.icon}
                <h2 className="text-xl font-bold text-white">
                  {searchModes.find(mode => mode.id === searchMode)?.title}
                </h2>
                {searchMode === 'ai-insights' && (
                  <div className="px-2 py-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg">
                    <span className="text-xs font-semibold text-white">BETA</span>
                  </div>
                )}
              </div>
              <p className="text-gray-400 text-sm">
                {searchModes.find(mode => mode.id === searchMode)?.description}
              </p>
            </div>

            {/* Advanced Options */}
            {showAdvancedOptions && (
              <div className="mb-6 p-4 bg-gray-800/50 border border-gray-700 rounded-xl">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Advanced Search Options
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Search Operators
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded border-gray-600 bg-gray-700" />
                        <span className="text-sm text-gray-400">Boolean AND/OR</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded border-gray-600 bg-gray-700" />
                        <span className="text-sm text-gray-400">Exact phrases</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded border-gray-600 bg-gray-700" />
                        <span className="text-sm text-gray-400">Case sensitive</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Date Range
                    </label>
                    <div className="space-y-2">
                      <input 
                        type="date" 
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white"
                        placeholder="Start date"
                      />
                      <input 
                        type="date" 
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white"
                        placeholder="End date"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Content Types
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded border-gray-600 bg-gray-700" defaultChecked />
                        <span className="text-sm text-gray-400">Documents</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded border-gray-600 bg-gray-700" defaultChecked />
                        <span className="text-sm text-gray-400">People</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded border-gray-600 bg-gray-700" defaultChecked />
                        <span className="text-sm text-gray-400">Timeline Events</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Global Search Component */}
            <div className="bg-gray-800/30 border border-gray-700 rounded-xl overflow-hidden">
              <GlobalSearch />
            </div>

            {/* Search Tips */}
            <div className="mt-6 p-4 bg-gray-800/30 border border-gray-700 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-cyan-400" />
                Search Tips & Operators
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-medium text-gray-300 mb-2">Boolean Operators</h4>
                  <div className="space-y-1 text-gray-400">
                    <div><code className="bg-gray-700 px-2 py-1 rounded">AND</code> - Both terms must exist</div>
                    <div><code className="bg-gray-700 px-2 py-1 rounded">OR</code> - Either term can exist</div>
                    <div><code className="bg-gray-700 px-2 py-1 rounded">NOT</code> - Exclude specific terms</div>
                    <div><code className="bg-gray-700 px-2 py-1 rounded">&quot;exact phrase&quot;</code> - Exact phrase matching</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-300 mb-2">Field-Specific Search</h4>
                  <div className="space-y-1 text-gray-400">
                    <div><code className="bg-gray-700 px-2 py-1 rounded">title:</code> - Search in titles only</div>
                    <div><code className="bg-gray-700 px-2 py-1 rounded">date:</code> - Search by date range</div>
                    <div><code className="bg-gray-700 px-2 py-1 rounded">type:</code> - Filter by content type</div>
                    <div><code className="bg-gray-700 px-2 py-1 rounded">tag:</code> - Search by tags</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Search Engine Status */}
          <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 z-30 bg-gray-900/90 border border-gray-600 rounded-lg px-2 sm:px-3 py-2 backdrop-blur-sm">
            <p className="text-xs text-gray-400 flex items-center gap-2">
              <Database className="w-3 h-3" />
              <span className="hidden sm:inline">Search Engine v3.2 | AI-Enhanced</span>
              <span className="sm:hidden">Search v3.2</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
