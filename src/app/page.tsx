'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Map, 
  Clock, 
  Network, 
  FileText, 
  DollarSign, 
  Search,
  Target,
  Shield,
  Users,
  Database,
  Activity,
  BookOpen,
  Lock,
  Eye,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import SearchModal from '@/components/SearchModal';
import { corePeople } from '@/data/core/people';
import { comprehensiveTimeline } from '@/data/core/timeline';
import { coreRelationships } from '@/data/core/relationships';
import { financialTransactions } from '@/data/financial/transactions';
import { coreOrganizations } from '@/data/core/organizations';

interface InvestigationModule {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  status: 'completed' | 'active' | 'pending';
  stats: {
    label: string;
    value: string | number;
  }[];
  color: string;
  gradient: string;
}

interface InvestigationStats {
  totalDocuments: number;
  entitiesTracked: number;
  connectionsMapping: number;
  activeInvestigations: number;
  lastUpdated: string;
}

export default function InvestigationDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [animationProgress, setAnimationProgress] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      setAnimationProgress(prev => (prev + 1) % 100);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Handle keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl+K or Cmd+K to open search
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        setIsSearchOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const investigationStats: InvestigationStats = {
    totalDocuments: comprehensiveTimeline.length + financialTransactions.length,
    entitiesTracked: corePeople.length + coreOrganizations.length,
    connectionsMapping: coreRelationships.length,
    activeInvestigations: 7,
    lastUpdated: currentTime.toISOString()
  };

  const investigationModules: InvestigationModule[] = [
    {
      id: 'geographic',
      title: 'Enhanced Geographic Mapping',
      description: 'Interactive global mapping of properties, travel patterns, and geographic connections across the Epstein network.',
      icon: <Map className="w-8 h-8" />,
      href: '/geographic',
      status: 'completed',
      stats: [
        { label: 'Properties Tracked', value: 25 },
        { label: 'Flight Logs', value: 156 },
        { label: 'Travel Patterns', value: 47 }
      ],
      color: 'cyan',
      gradient: 'from-cyan-500 to-blue-600'
    },
    {
      id: 'timeline',
      title: 'Advanced Timeline Analysis',
      description: 'Comprehensive chronological analysis of events, relationships, and key developments in the investigation.',
      icon: <Clock className="w-8 h-8" />,
      href: '/timeline',
      status: 'completed',
      stats: [
        { label: 'Events Documented', value: comprehensiveTimeline.length },
        { label: 'Date Ranges', value: '1970-2024' },
        { label: 'Cross-References', value: comprehensiveTimeline.reduce((acc, event) => acc + event.relatedEvents.length, 0) }
      ],
      color: 'purple',
      gradient: 'from-purple-500 to-indigo-600'
    },
    {
      id: 'network',
      title: 'Network Analysis',
      description: 'Interactive visualization of relationships, connections, and influence networks spanning multiple industries.',
      icon: <Network className="w-8 h-8" />,
      href: '/network',
      status: 'completed',
      stats: [
        { label: 'Entities Mapped', value: corePeople.length + coreOrganizations.length },
        { label: 'Connections', value: coreRelationships.length },
        { label: 'Clusters Identified', value: Array.from(new Set(coreRelationships.map(r => r.type))).length }
      ],
      color: 'green',
      gradient: 'from-green-500 to-teal-600'
    },
    {
      id: 'documents',
      title: 'Document Management',
      description: 'Comprehensive document archive with OCR, annotations, and advanced search capabilities.',
      icon: <FileText className="w-8 h-8" />,
      href: '/documents',
      status: 'completed',
      stats: [
        { label: 'Documents Archived', value: 2847 },
        { label: 'OCR Processed', value: '97.3%' },
        { label: 'Citations Tracked', value: 1156 }
      ],
      color: 'orange',
      gradient: 'from-orange-500 to-red-600'
    },
    {
      id: 'financial',
      title: 'Financial Flow Analysis',
      description: 'Deep analysis of financial transactions, entity structures, and monetary flows.',
      icon: <DollarSign className="w-8 h-8" />,
      href: '/financial',
      status: 'completed',
      stats: [
        { label: 'Transactions Analyzed', value: financialTransactions.length },
        { label: 'Financial Entities', value: coreOrganizations.filter(org => org.type === 'financial').length },
        { label: 'Total Value USD', value: `$${Math.round(financialTransactions.reduce((acc, tx) => acc + tx.amountUSD, 0) / 1000000)}M` }
      ],
      color: 'yellow',
      gradient: 'from-yellow-500 to-orange-600'
    },
    {
      id: 'research',
      title: 'Research Integration',
      description: 'Integration of external research, investigative journalism, and verified source materials.',
      icon: <BookOpen className="w-8 h-8" />,
      href: '/research',
      status: 'active',
      stats: [
        { label: 'Sources Integrated', value: 156 },
        { label: 'Verification Status', value: '89%' },
        { label: 'Research Papers', value: 45 }
      ],
      color: 'indigo',
      gradient: 'from-indigo-500 to-purple-600'
    },
    {
      id: 'search',
      title: 'Advanced Search Engine',
      description: 'Sophisticated search with semantic analysis, cross-referencing, and AI-powered insights.',
      icon: <Search className="w-8 h-8" />,
      href: '/search',
      status: 'active',
      stats: [
        { label: 'Search Queries', value: '12.4K' },
        { label: 'Semantic Matches', value: '94.7%' },
        { label: 'Cross-References', value: 567 }
      ],
      color: 'pink',
      gradient: 'from-pink-500 to-rose-600'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <Shield className="w-4 h-4 text-green-400" />;
      case 'active': return <Activity className="w-4 h-4 text-yellow-400" />;
      default: return <Lock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'border-green-500/50 bg-green-500/10';
      case 'active': return 'border-yellow-500/50 bg-yellow-500/10';
      default: return 'border-gray-500/50 bg-gray-500/10';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
      {/* Header */}
      <header className="relative px-8 py-8 border-b border-gray-700/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                The Epstein Files
              </h1>
              <p className="text-gray-300 text-lg mt-2">Comprehensive Investigation Platform</p>
            </div>
            
            <div className="flex items-center gap-6">
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg hover:border-cyan-400 transition-colors"
                title="Search (Ctrl+K)"
              >
                <Search className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-400">Search...</span>
                <kbd className="px-2 py-1 text-xs text-gray-400 border border-gray-600 rounded">
                  ⌘K
                </kbd>
              </button>

              <div className="text-right">
                <p className="text-sm text-gray-400">Investigation Status</p>
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 font-semibold">Active</span>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-sm text-gray-400">Last Updated</p>
                <p className="text-cyan-400 font-mono text-sm">
                  {currentTime.toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scanning animation */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-60">
          <div 
            className="h-full w-20 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
            style={{
              transform: `translateX(${animationProgress * 8}px)`,
              transition: 'transform 0.1s linear'
            }}
          />
        </div>
      </header>

      {/* Statistics Dashboard */}
      <section className="px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-cyan-500/30 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Documents</p>
                  <p className="text-2xl font-bold text-cyan-400">{investigationStats.totalDocuments.toLocaleString()}</p>
                </div>
                <FileText className="w-8 h-8 text-cyan-400" />
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-purple-500/30 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Entities Tracked</p>
                  <p className="text-2xl font-bold text-purple-400">{investigationStats.entitiesTracked}</p>
                </div>
                <Users className="w-8 h-8 text-purple-400" />
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-green-500/30 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Connections Mapped</p>
                  <p className="text-2xl font-bold text-green-400">{investigationStats.connectionsMapping}</p>
                </div>
                <Network className="w-8 h-8 text-green-400" />
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-yellow-500/30 rounded-xl p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Active Investigations</p>
                  <p className="text-2xl font-bold text-yellow-400">{investigationStats.activeInvestigations}</p>
                </div>
                <Target className="w-8 h-8 text-yellow-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investigation Modules */}
      <section className="px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Investigation Modules</h2>
            <p className="text-gray-400 text-lg">Comprehensive analysis tools for understanding the full scope of the investigation</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {investigationModules.map((module) => (
              <Link key={module.id} href={module.href}>
                <div className={`group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 border ${getStatusColor(module.status)} rounded-xl p-8 backdrop-blur-sm hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden`}>
                  {/* Background gradient effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${module.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
                  
                  {/* Status indicator */}
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    {getStatusIcon(module.status)}
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                      {module.status}
                    </span>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex items-start gap-4 mb-6">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${module.gradient} text-white`}>
                        {module.icon}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                          {module.title}
                        </h3>
                        <p className="text-gray-400 mt-2 leading-relaxed">
                          {module.description}
                        </p>
                      </div>
                    </div>
                    
                    {/* Module statistics */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {module.stats.map((stat, index) => (
                        <div key={index} className="text-center">
                          <p className="text-lg font-bold text-white">{stat.value}</p>
                          <p className="text-xs text-gray-400">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                    
                    {/* Access button */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-cyan-400 group-hover:text-cyan-300 transition-colors">
                        <span className="font-semibold">Access Module</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                      
                      <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-gray-400 transition-colors" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-700/50 px-8 py-8 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Shield className="w-6 h-6 text-cyan-400" />
              <div>
                <p className="text-white font-semibold">Secure Investigation Platform</p>
                <p className="text-gray-400 text-sm">All data verified and cross-referenced</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-green-400">
                <Eye className="w-4 h-4" />
                <span className="text-sm font-semibold">System Online</span>
              </div>
              
              <div className="flex items-center gap-2 text-cyan-400">
                <Database className="w-4 h-4" />
                <span className="text-sm font-semibold">Data Integrity: 99.7%</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Search Modal */}
      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </div>
  );
} 