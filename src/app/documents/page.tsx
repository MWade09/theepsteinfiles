'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  FileText, 
  ArrowLeft,
  Filter,
  Search,
  Download,
  Eye,
  Calendar,
  Tag,
  Shield,
  AlertTriangle,
  CheckCircle,
  Archive,
  Star,
  Clock,
  SortAsc,
  SortDesc,
  Grid,
  List,
  Activity
} from 'lucide-react';
import { coreDocuments } from '@/data/core/documents';
import DocumentViewer from '@/components/DocumentViewer';

interface DocumentFilter {
  types: string[];
  subtypes: string[];
  significance: string[];
  verificationStatus: string[];
  confidenceLevel: string[];
  dateRange: {
    start: string;
    end: string;
  };
  tags: string[];
}

type SortField = 'date' | 'title' | 'significance' | 'lastUpdated';
type SortDirection = 'asc' | 'desc';
type ViewMode = 'grid' | 'list';

export default function DocumentsPage() {
  const [filters, setFilters] = useState<DocumentFilter>({
    types: ['document', 'image', 'video', 'audio'],
    subtypes: [],
    significance: ['critical', 'high', 'medium', 'low'],
    verificationStatus: ['verified', 'pending', 'disputed'],
    confidenceLevel: ['high', 'medium', 'low'],
    dateRange: {
      start: '1990',
      end: '2024'
    },
    tags: []
  });
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  const [showFilterPanel, setShowFilterPanel] = useState(true);
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  // Document statistics
  const documentStats = {
    totalDocuments: coreDocuments.length,
    verified: coreDocuments.filter(doc => doc.verificationStatus === 'verified').length,
    critical: coreDocuments.filter(doc => doc.significance === 'critical').length,
    recent: coreDocuments.filter(doc => {
      const docDate = new Date(doc.lastUpdated);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return docDate > thirtyDaysAgo;
    }).length,
    totalPages: coreDocuments.reduce((acc, doc) => acc + (doc.content?.pageCount || 1), 0),
    lastUpdated: new Date().toLocaleDateString()
  };

  // Get unique values for filters
  const availableTypes = Array.from(new Set(coreDocuments.map(doc => doc.type)));

  // Filter and sort documents
  const filteredDocuments = useMemo(() => {
    const filtered = coreDocuments.filter(doc => {
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          doc.title.toLowerCase().includes(query) ||
          doc.description.toLowerCase().includes(query) ||
          doc.tags.some(tag => tag.toLowerCase().includes(query)) ||
          doc.relatedEntities.some(entity => entity.toLowerCase().includes(query));
        
        if (!matchesSearch) return false;
      }

      // Type filters
      if (filters.types.length > 0 && !filters.types.includes(doc.type)) return false;
      if (filters.subtypes.length > 0 && doc.subtype && !filters.subtypes.includes(doc.subtype)) return false;
      if (filters.significance.length > 0 && !filters.significance.includes(doc.significance)) return false;
      if (filters.verificationStatus.length > 0 && !filters.verificationStatus.includes(doc.verificationStatus)) return false;
      if (filters.confidenceLevel.length > 0 && !filters.confidenceLevel.includes(doc.confidenceLevel)) return false;

      // Date range filter
      const docYear = new Date(doc.date).getFullYear();
      const startYear = parseInt(filters.dateRange.start);
      const endYear = parseInt(filters.dateRange.end);
      if (docYear < startYear || docYear > endYear) return false;

      // Tags filter
      if (filters.tags.length > 0) {
        const hasMatchingTag = filters.tags.some(tag => doc.tags.includes(tag));
        if (!hasMatchingTag) return false;
      }

      return true;
    });

    // Sort documents
    filtered.sort((a, b) => {
      let aValue: string | number | Date;
      let bValue: string | number | Date;

      switch (sortField) {
        case 'date':
          aValue = new Date(a.date);
          bValue = new Date(b.date);
          break;
        case 'title':
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case 'significance':
          const sigOrder = { critical: 4, high: 3, medium: 2, low: 1 };
          aValue = sigOrder[a.significance as keyof typeof sigOrder];
          bValue = sigOrder[b.significance as keyof typeof sigOrder];
          break;
        case 'lastUpdated':
          aValue = new Date(a.lastUpdated);
          bValue = new Date(b.lastUpdated);
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [filters, searchQuery, sortField, sortDirection]);

  const toggleFilter = (category: keyof DocumentFilter, value: string) => {
    setFilters(prev => {
      const currentValues = prev[category] as string[];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      
      return {
        ...prev,
        [category]: newValues
      };
    });
  };

  const getSignificanceColor = (significance: string) => {
    switch (significance) {
      case 'critical': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'high': return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'low': return 'text-green-400 bg-green-500/20 border-green-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getVerificationIcon = (status: string) => {
    switch (status) {
      case 'verified': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'disputed': return <AlertTriangle className="w-4 h-4 text-red-400" />;
      default: return <Shield className="w-4 h-4 text-gray-400" />;
    }
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
                <FileText className="w-6 h-6 text-orange-400" />
                <div className="flex-1 lg:flex-none">
                  <h1 className="text-lg sm:text-xl font-bold text-white">Document Management</h1>
                  <p className="text-xs sm:text-sm text-gray-400 hidden sm:block">Evidence Archive & Document Intelligence</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full lg:w-auto">
              {/* Search - Mobile First */}
              <div className="relative flex-1 sm:flex-none">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search documents, tags, entities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-gray-800/50 border border-gray-600 rounded-lg pl-10 pr-4 py-3 sm:py-2 text-sm focus:outline-none focus:border-orange-400 w-full sm:w-64"
                />
              </div>

              <div className="flex items-center gap-2 sm:gap-4">
                {/* Sort Controls */}
                <div className="flex items-center gap-1 bg-gray-700/50 border border-gray-600 rounded-lg p-1">
                  <select
                    value={sortField}
                    onChange={(e) => setSortField(e.target.value as SortField)}
                    className="bg-transparent text-sm px-2 py-1 text-white focus:outline-none"
                  >
                    <option value="date" className="bg-gray-800">Date</option>
                    <option value="title" className="bg-gray-800">Title</option>
                    <option value="significance" className="bg-gray-800">Significance</option>
                    <option value="lastUpdated" className="bg-gray-800">Updated</option>
                  </select>
                  
                  <button
                    onClick={() => setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')}
                    className="p-1 hover:bg-gray-600 rounded transition-colors touch-target"
                  >
                    {sortDirection === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
                  </button>
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center gap-1 bg-gray-700/50 border border-gray-600 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded transition-colors touch-target ${viewMode === 'grid' ? 'bg-orange-600 text-white' : 'hover:bg-gray-600'}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded transition-colors touch-target ${viewMode === 'list' ? 'bg-orange-600 text-white' : 'hover:bg-gray-600'}`}
                  >
                    <List className="w-4 h-4" />
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
                <Activity className="w-5 h-5 text-orange-400" />
                Document Overview
              </h3>
              
              <div className="grid grid-cols-2 lg:grid-cols-2 gap-3 lg:gap-4 mb-4 lg:mb-6">
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3">
                  <p className="text-xl lg:text-2xl font-bold text-orange-400">{documentStats.totalDocuments}</p>
                  <p className="text-xs text-gray-400">Total Docs</p>
                </div>
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3">
                  <p className="text-xl lg:text-2xl font-bold text-green-400">{documentStats.verified}</p>
                  <p className="text-xs text-gray-400">Verified</p>
                </div>
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3">
                  <p className="text-xl lg:text-2xl font-bold text-red-400">{documentStats.critical}</p>
                  <p className="text-xs text-gray-400">Critical</p>
                </div>
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3">
                  <p className="text-xl lg:text-2xl font-bold text-cyan-400">{documentStats.totalPages}</p>
                  <p className="text-xs text-gray-400">Total Pages</p>
                </div>
              </div>

              <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-3">
                <p className="text-sm font-semibold text-white mb-1">Recent Updates</p>
                <p className="text-lg font-bold text-orange-400">{documentStats.recent}</p>
                <p className="text-xs text-gray-400">Documents updated in last 30 days</p>
              </div>
            </div>

            {/* Document Type Filters */}
            <div className="p-4 lg:p-6 border-b border-gray-700/50">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Archive className="w-5 h-5 text-orange-400" />
                Document Types
              </h3>
              
              <div className="space-y-3">
                {availableTypes.map((type) => (
                  <label
                    key={type}
                    className="flex items-center gap-3 p-3 bg-gray-800/30 border border-gray-700 rounded-lg hover:border-gray-600 cursor-pointer transition-all"
                  >
                    <input
                      type="checkbox"
                      checked={filters.types.includes(type)}
                      onChange={() => toggleFilter('types', type)}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 border-2 rounded transition-all ${
                      filters.types.includes(type)
                        ? 'bg-orange-500 border-orange-500'
                        : 'border-gray-500'
                    }`}>
                      {filters.types.includes(type) && (
                        <CheckCircle className="w-full h-full text-black" />
                      )}
                    </div>
                    
                    <FileText className="w-4 h-4 text-orange-400" />
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-white capitalize">{type}</span>
                        <span className="text-xs text-gray-400">
                          ({coreDocuments.filter(doc => doc.type === type).length})
                        </span>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Significance Filters */}
            <div className="p-4 lg:p-6 border-b border-gray-700/50">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-orange-400" />
                Significance Level
              </h3>
              
              <div className="space-y-3">
                {['critical', 'high', 'medium', 'low'].map((level) => (
                  <label
                    key={level}
                    className="flex items-center gap-3 p-3 bg-gray-800/30 border border-gray-700 rounded-lg hover:border-gray-600 cursor-pointer transition-all"
                  >
                    <input
                      type="checkbox"
                      checked={filters.significance.includes(level)}
                      onChange={() => toggleFilter('significance', level)}
                      className="sr-only"
                    />
                    <div className={`w-4 h-4 border-2 rounded transition-all ${
                      filters.significance.includes(level)
                        ? 'bg-orange-500 border-orange-500'
                        : 'border-gray-500'
                    }`}>
                      {filters.significance.includes(level) && (
                        <CheckCircle className="w-full h-full text-black" />
                      )}
                    </div>
                    
                    <div className={`px-2 py-1 rounded-lg border text-xs font-semibold uppercase ${getSignificanceColor(level)}`}>
                      {level}
                    </div>
                    
                    <div className="flex-1">
                      <span className="text-xs text-gray-400">
                        ({coreDocuments.filter(doc => doc.significance === level).length})
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Status */}
            <div className="p-4 lg:p-6 border-t border-gray-700/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-400">Archive Active</span>
                </div>
                <span className="text-xs text-gray-500">
                  Updated: {documentStats.lastUpdated}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Main Documents Area - Mobile Responsive */}
        <div className="flex-1 relative min-h-[60vh] lg:min-h-0">
          <div className="h-full bg-gradient-to-br from-gray-900 to-black p-2 sm:p-4 lg:p-6 overflow-y-auto">
            {/* Results Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-white">
                  {filteredDocuments.length} Documents Found
                </h2>
                <div className="text-sm text-gray-400">
                  Sorted by {sortField} ({sortDirection})
                </div>
              </div>
              {searchQuery && (
                <p className="text-sm text-gray-400">
                  Showing results for: <span className="text-orange-400 font-semibold">&ldquo;{searchQuery}&rdquo;</span>
                </p>
              )}
            </div>

            {/* Documents Grid/List */}
            <div className={`${viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6' 
              : 'space-y-4'
            }`}>
              {filteredDocuments.map((document) => (
                <div
                  key={document.id}
                  className={`bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden hover:border-orange-400/60 transition-all duration-300 hover:shadow-lg hover:shadow-orange-400/20 cursor-pointer ${
                    viewMode === 'list' ? 'flex items-center gap-4 p-4' : 'flex flex-col'
                  }`}
                  onClick={() => setSelectedDocument(document.id)}
                >
                  {viewMode === 'grid' && (
                    <div className="p-4 lg:p-6">
                      {/* Document Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <FileText className="w-5 h-5 text-orange-400" />
                          {getVerificationIcon(document.verificationStatus)}
                        </div>
                        <div className={`px-2 py-1 rounded-lg border text-xs font-semibold uppercase ${getSignificanceColor(document.significance)}`}>
                          {document.significance}
                        </div>
                      </div>

                      {/* Document Title */}
                      <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
                        {document.title}
                      </h3>

                      {/* Document Description */}
                      <p className="text-sm text-gray-400 mb-4 line-clamp-3">
                        {document.description}
                      </p>

                      {/* Document Meta */}
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Calendar className="w-3 h-3" />
                          {new Date(document.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Tag className="w-3 h-3" />
                          {document.tags.slice(0, 2).join(', ')}
                          {document.tags.length > 2 && ` +${document.tags.length - 2}`}
                        </div>
                        {document.content && (
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <FileText className="w-3 h-3" />
                            {document.content.pageCount} pages
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 capitalize">
                          {document.type}
                        </span>
                        <button className="flex items-center gap-1 text-orange-400 hover:text-orange-300 transition-colors">
                          <Eye className="w-4 h-4" />
                          <span className="text-xs">View</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {viewMode === 'list' && (
                    <>
                      <div className="flex items-center gap-3">
                        <FileText className="w-8 h-8 text-orange-400" />
                        {getVerificationIcon(document.verificationStatus)}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <h3 className="text-lg font-bold text-white">
                            {document.title}
                          </h3>
                          <div className={`px-2 py-1 rounded-lg border text-xs font-semibold uppercase ${getSignificanceColor(document.significance)}`}>
                            {document.significance}
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-400 mb-2 line-clamp-2">
                          {document.description}
                        </p>
                        
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(document.date).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Tag className="w-3 h-3" />
                            {document.tags.slice(0, 2).join(', ')}
                          </span>
                          {document.content && (
                            <span className="flex items-center gap-1">
                              <FileText className="w-3 h-3" />
                              {document.content.pageCount} pages
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <button className="flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors">
                        <Eye className="w-4 h-4" />
                        <span className="text-sm">View</span>
                      </button>
                    </>
                  )}
                </div>
              ))}
            </div>

            {filteredDocuments.length === 0 && (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-400 mb-2">No Documents Found</h3>
                <p className="text-gray-500">
                  {searchQuery 
                    ? `No documents match your search for "${searchQuery}"`
                    : "No documents match your current filters"
                  }
                </p>
              </div>
            )}
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

          {/* Document Status - Mobile Responsive */}
          <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 z-30 bg-gray-900/90 border border-gray-600 rounded-lg px-2 sm:px-3 py-2 backdrop-blur-sm">
            <p className="text-xs text-gray-400 flex items-center gap-2">
              <Archive className="w-3 h-3" />
              <span className="hidden sm:inline">Document Archive System v2.1</span>
              <span className="sm:hidden">Archive v2.1</span>
            </p>
          </div>
        </div>
      </div>

      {/* Document Viewer Modal */}
      {selectedDocument && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-xl w-full h-full max-w-7xl max-h-[90vh] overflow-hidden relative">
            <div className="absolute top-4 right-4 z-60">
              <button
                onClick={() => setSelectedDocument(null)}
                className="bg-gray-800 border border-gray-600 text-white rounded-lg p-2 hover:bg-gray-700 transition-colors"
              >
                ✕
              </button>
            </div>
            <DocumentViewer
              documentId={selectedDocument}
              isEmbedded={true}
            />
          </div>
        </div>
      )}
    </div>
  );
}
