'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  DollarSign, 
  ArrowLeft,
  Filter,
  Search,
  TrendingUp,
  Target,
  Activity,
  Download,
  BarChart3,
  PieChart,
  Eye
} from 'lucide-react';
import FinancialFlowAnalysis from '@/components/FinancialFlowAnalysis';

export default function FinancialPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterPanel, setShowFilterPanel] = useState(true);
  const [selectedView, setSelectedView] = useState<'flow' | 'network' | 'timeline'>('flow');

  // Financial statistics
  const financialStats = {
    totalTransactions: 2847,
    totalValue: '2.1B',
    suspiciousTransactions: 127,
    jurisdictions: 15,
    entities: 234,
    flaggedPatterns: 45,
    complianceScore: 73.2,
    lastUpdated: new Date().toLocaleDateString()
  };

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
                <DollarSign className="w-6 h-6 text-yellow-400" />
                <div className="flex-1 lg:flex-none">
                  <h1 className="text-lg sm:text-xl font-bold text-white">Financial Flow Analysis</h1>
                  <p className="text-xs sm:text-sm text-gray-400 hidden sm:block">Transaction Patterns & Monetary Intelligence</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full lg:w-auto">
              {/* Search - Mobile First */}
              <div className="relative flex-1 sm:flex-none">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search transactions, entities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-gray-800/50 border border-gray-600 rounded-lg pl-10 pr-4 py-3 sm:py-2 text-sm focus:outline-none focus:border-yellow-400 w-full sm:w-64"
                />
              </div>

              <div className="flex items-center gap-2 sm:gap-4">
                {/* View Controls */}
                <div className="flex items-center gap-1 bg-gray-700/50 border border-gray-600 rounded-lg p-1">
                  <button
                    onClick={() => setSelectedView('flow')}
                    className={`p-2 rounded transition-colors touch-target ${selectedView === 'flow' ? 'bg-yellow-600 text-white' : 'hover:bg-gray-600'}`}
                    title="Flow View"
                  >
                    <TrendingUp className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={() => setSelectedView('network')}
                    className={`p-2 rounded transition-colors touch-target ${selectedView === 'network' ? 'bg-yellow-600 text-white' : 'hover:bg-gray-600'}`}
                    title="Network View"
                  >
                    <BarChart3 className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={() => setSelectedView('timeline')}
                    className={`p-2 rounded transition-colors touch-target ${selectedView === 'timeline' ? 'bg-yellow-600 text-white' : 'hover:bg-gray-600'}`}
                    title="Timeline View"
                  >
                    <PieChart className="w-4 h-4" />
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
        {/* Filter & Control Panel - Mobile Responsive */}
        {showFilterPanel && (
          <div className="w-full lg:w-80 bg-gray-900/95 border-b lg:border-r lg:border-b-0 border-gray-700/50 backdrop-blur-sm relative z-40 flex flex-col max-h-screen lg:h-auto overflow-y-auto">
            {/* Statistics - Mobile Layout */}
            <div className="p-4 lg:p-6 border-b border-gray-700/50">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-yellow-400" />
                Financial Overview
              </h3>
              
              <div className="grid grid-cols-2 lg:grid-cols-2 gap-3 lg:gap-4 mb-4 lg:mb-6">
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3">
                  <p className="text-xl lg:text-2xl font-bold text-yellow-400">{financialStats.totalTransactions}</p>
                  <p className="text-xs text-gray-400">Transactions</p>
                </div>
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3">
                  <p className="text-xl lg:text-2xl font-bold text-green-400">${financialStats.totalValue}</p>
                  <p className="text-xs text-gray-400">Total Value</p>
                </div>
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3">
                  <p className="text-xl lg:text-2xl font-bold text-red-400">{financialStats.suspiciousTransactions}</p>
                  <p className="text-xs text-gray-400">Suspicious</p>
                </div>
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3">
                  <p className="text-xl lg:text-2xl font-bold text-purple-400">{financialStats.jurisdictions}</p>
                  <p className="text-xs text-gray-400">Jurisdictions</p>
                </div>
              </div>

              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3">
                <p className="text-sm font-semibold text-white mb-1">Compliance Score</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 h-2 rounded-full" 
                      style={{ width: `${financialStats.complianceScore}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-yellow-400">{financialStats.complianceScore}%</span>
                </div>
              </div>
            </div>

            {/* Quick Filters */}
            <div className="p-4 lg:p-6 border-b border-gray-700/50">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-yellow-400" />
                Quick Filters
              </h3>
              
              <div className="space-y-3">
                <button className="w-full text-left p-3 bg-gray-800/30 border border-gray-700 rounded-lg hover:border-gray-600 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-white">High Value (&gt;$10M)</span>
                    <span className="text-xs text-gray-400">(45)</span>
                  </div>
                </button>
                
                <button className="w-full text-left p-3 bg-gray-800/30 border border-gray-700 rounded-lg hover:border-gray-600 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-white">Offshore Transfers</span>
                    <span className="text-xs text-gray-400">(127)</span>
                  </div>
                </button>
                
                <button className="w-full text-left p-3 bg-gray-800/30 border border-gray-700 rounded-lg hover:border-gray-600 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-white">Cash Transactions</span>
                    <span className="text-xs text-gray-400">(89)</span>
                  </div>
                </button>
                
                <button className="w-full text-left p-3 bg-red-900/30 border border-red-700 rounded-lg hover:border-red-600 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-red-400">Flagged Patterns</span>
                    <span className="text-xs text-red-400">(23)</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Status */}
            <div className="p-4 lg:p-6 border-t border-gray-700/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-400">Analysis Active</span>
                </div>
                <span className="text-xs text-gray-500">
                  Updated: {financialStats.lastUpdated}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Main Financial Analysis Area - Mobile Responsive */}
        <div className="flex-1 relative min-h-[60vh] lg:min-h-0">
          <div className="h-full bg-gradient-to-br from-gray-900 to-black p-2 sm:p-4 lg:p-6">
            <FinancialFlowAnalysis />
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

          {/* Financial Status - Mobile Responsive */}
          <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 z-30 bg-gray-900/90 border border-gray-600 rounded-lg px-2 sm:px-3 py-2 backdrop-blur-sm">
            <p className="text-xs text-gray-400 flex items-center gap-2">
              <Eye className="w-3 h-3" />
              <span className="hidden sm:inline">Financial Analysis Engine v2.1</span>
              <span className="sm:hidden">Financial v2.1</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
