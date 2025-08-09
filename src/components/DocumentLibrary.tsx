'use client';

import { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  Download, 
  Eye, 
  Calendar, 
  FileText, 
  User, 
  Tag, 
  SortAsc, 
  SortDesc,
  Folder,
  Star,
  BookOpen,
  Verified,
  Clock,
  AlertTriangle,
  ExternalLink,
  Link as LinkIcon,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { Evidence, DocumentCollection } from '@/types/investigation';
import { coreDocuments, documentCollections, searchDocuments } from '@/data/core/documents';
import DocumentViewer from './DocumentViewer';

interface DocumentFilters {
  type: string[];
  significance: string[];
  verificationStatus: string[];
  dateRange: {
    start: string;
    end: string;
  };
  collections: string[];
  accessLevel: string[];
}

export default function DocumentLibrary() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'date' | 'title' | 'significance' | 'relevance'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [expandedCollections, setExpandedCollections] = useState<Set<string>>(new Set());
  
  const [filters, setFilters] = useState<DocumentFilters>({
    type: [],
    significance: [],
    verificationStatus: [],
    dateRange: { start: '', end: '' },
    collections: [],
    accessLevel: []
  });

  // Filter and sort documents
  const filteredDocuments = useMemo((): Evidence[] => {
    let docs: Evidence[] = searchQuery ? searchDocuments(searchQuery) : [...coreDocuments];

    // Apply collection filter
    if (selectedCollection) {
      const collection: DocumentCollection | undefined = documentCollections.find(c => c.id === selectedCollection);
      if (collection) {
        docs = docs.filter(doc => collection.documents.includes(doc.id));
      }
    }

    // Apply filters
    if (filters.type.length > 0) {
      docs = docs.filter(doc => filters.type.includes(doc.subtype || doc.type));
    }

    if (filters.significance.length > 0) {
      docs = docs.filter(doc => filters.significance.includes(doc.significance));
    }

    if (filters.verificationStatus.length > 0) {
      docs = docs.filter(doc => filters.verificationStatus.includes(doc.verificationStatus));
    }

    if (filters.accessLevel.length > 0) {
      docs = docs.filter(doc => filters.accessLevel.includes(doc.accessLevel));
    }

    if (filters.dateRange.start) {
      docs = docs.filter(doc => new Date(doc.date) >= new Date(filters.dateRange.start));
    }

    if (filters.dateRange.end) {
      docs = docs.filter(doc => new Date(doc.date) <= new Date(filters.dateRange.end));
    }

    // Sort documents
    docs.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'date':
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'significance':
          const sigOrder = { critical: 4, high: 3, medium: 2, low: 1 };
          comparison = (sigOrder[a.significance as keyof typeof sigOrder] || 0) - 
                      (sigOrder[b.significance as keyof typeof sigOrder] || 0);
          break;
        case 'relevance':
          // Simple relevance based on how many times search term appears
          if (searchQuery) {
            const aMatches = (a.title.toLowerCase().match(new RegExp(searchQuery.toLowerCase(), 'g')) || []).length;
            const bMatches = (b.title.toLowerCase().match(new RegExp(searchQuery.toLowerCase(), 'g')) || []).length;
            comparison = aMatches - bMatches;
          }
          break;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return docs;
  }, [searchQuery, filters, sortBy, sortOrder, selectedCollection]);

  const toggleFilter = (category: keyof DocumentFilters, value: string) => {
    setFilters(prev => {
      const currentValues = prev[category] as string[];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      
      return { ...prev, [category]: newValues };
    });
  };

  const toggleCollection = (collectionId: string) => {
    setExpandedCollections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(collectionId)) {
        newSet.delete(collectionId);
      } else {
        newSet.add(collectionId);
      }
      return newSet;
    });
  };

  const getDocumentIcon = (type: string, subtype?: string) => {
    if (subtype === 'court filing' || subtype === 'deposition') return '⚖️';
    if (subtype === 'government document') return '🏛️';
    if (subtype === 'financial record') return '💰';
    if (subtype === 'interview') return '🎤';
    if (subtype === 'investigative report') return '🔍';
    return '📄';
  };

  const getVerificationBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <Verified className="w-3 h-3 text-green-600" />;
      case 'pending':
        return <Clock className="w-3 h-3 text-yellow-600" />;
      case 'disputed':
        return <AlertTriangle className="w-3 h-3 text-red-600" />;
      default:
        return null;
    }
  };

  const getSignificanceColor = (significance: string) => {
    const colors = {
      critical: 'text-red-600 bg-red-50 border-red-200',
      high: 'text-orange-600 bg-orange-50 border-orange-200',
      medium: 'text-yellow-600 bg-yellow-50 border-yellow-200',
      low: 'text-gray-600 bg-gray-50 border-gray-200'
    };
    return colors[significance as keyof typeof colors] || colors.low;
  };

  if (selectedDocument) {
    return (
      <div className="min-h-screen">
        <div className="bg-white dark:bg-dark-800 border-b border-gray-200 dark:border-dark-700 px-6 py-3">
          <button
            onClick={() => setSelectedDocument(null)}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            <span>Back to Library</span>
          </button>
        </div>
        <DocumentViewer documentId={selectedDocument} isEmbedded />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-80 bg-white dark:bg-dark-800 border-r border-gray-200 dark:border-dark-700 flex flex-col">
          <div className="p-6 border-b border-gray-200 dark:border-dark-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Document Library</h2>
            
            {/* Search */}
            <div className="relative mb-4">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-dark-700 dark:text-gray-100"
              />
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                <div className="text-lg font-bold text-blue-600">{filteredDocuments.length}</div>
                <div className="text-xs text-blue-800 dark:text-blue-400">Documents</div>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
                <div className="text-lg font-bold text-green-600">{documentCollections.length}</div>
                <div className="text-xs text-green-800 dark:text-green-400">Collections</div>
              </div>
            </div>
          </div>

          {/* Collections */}
          <div className="flex-1 overflow-auto p-6">
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Collections</h3>
              
              <button
                onClick={() => setSelectedCollection(null)}
                className={`w-full flex items-center space-x-2 p-2 rounded-lg text-left ${
                  !selectedCollection 
                    ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400' 
                    : 'hover:bg-gray-100 dark:hover:bg-dark-700'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span className="text-sm font-medium">All Documents</span>
                <span className="text-xs text-gray-500 ml-auto">{coreDocuments.length}</span>
              </button>

              <div className="mt-2 space-y-1">
                {documentCollections.map((collection) => {
                  const isExpanded = expandedCollections.has(collection.id);
                  const isSelected = selectedCollection === collection.id;
                  
                  return (
                    <div key={collection.id}>
                      <button
                        onClick={() => {
                          setSelectedCollection(collection.id);
                          toggleCollection(collection.id);
                        }}
                        className={`w-full flex items-center space-x-2 p-2 rounded-lg text-left ${
                          isSelected 
                            ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400' 
                            : 'hover:bg-gray-100 dark:hover:bg-dark-700'
                        }`}
                      >
                        {isExpanded ? 
                          <ChevronDown className="w-3 h-3" /> : 
                          <ChevronRight className="w-3 h-3" />
                        }
                        <Folder className="w-4 h-4" />
                        <span className="text-sm font-medium flex-1">{collection.name}</span>
                        <span className="text-xs text-gray-500">{collection.documents.length}</span>
                      </button>
                      
                      {isExpanded && (
                        <div className="ml-6 mt-1 space-y-1">
                          {collection.documents.map((docId) => {
                            const doc = coreDocuments.find(d => d.id === docId);
                            if (!doc) return null;
                            
                            return (
                              <button
                                key={docId}
                                onClick={() => setSelectedDocument(docId)}
                                className="w-full flex items-center space-x-2 p-2 rounded text-left hover:bg-gray-100 dark:hover:bg-dark-700"
                              >
                                <span className="text-sm">{getDocumentIcon(doc.type, doc.subtype)}</span>
                                <span className="text-xs text-gray-700 dark:text-gray-300 truncate flex-1">
                                  {doc.title}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Advanced Filters */}
            <div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 w-full p-2 text-left hover:bg-gray-100 dark:hover:bg-dark-700 rounded"
              >
                <Filter className="w-4 h-4" />
                <span className="text-sm font-medium">Advanced Filters</span>
                {showFilters ? <ChevronDown className="w-3 h-3 ml-auto" /> : <ChevronRight className="w-3 h-3 ml-auto" />}
              </button>

              {showFilters && (
                <div className="mt-3 space-y-4">
                  {/* Document Type Filter */}
                  <div>
                    <h4 className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
                      Document Type
                    </h4>
                    <div className="space-y-1">
                      {['court filing', 'deposition', 'government document', 'financial record', 'interview', 'investigative report'].map((type) => (
                        <label key={type} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={filters.type.includes(type)}
                            onChange={() => toggleFilter('type', type)}
                            className="rounded"
                          />
                          <span className="text-xs text-gray-700 dark:text-gray-300 capitalize">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Significance Filter */}
                  <div>
                    <h4 className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
                      Significance
                    </h4>
                    <div className="space-y-1">
                      {['critical', 'high', 'medium', 'low'].map((significance) => (
                        <label key={significance} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={filters.significance.includes(significance)}
                            onChange={() => toggleFilter('significance', significance)}
                            className="rounded"
                          />
                          <span className="text-xs text-gray-700 dark:text-gray-300 capitalize">{significance}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Verification Status Filter */}
                  <div>
                    <h4 className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
                      Verification
                    </h4>
                    <div className="space-y-1">
                      {['verified', 'pending', 'disputed'].map((status) => (
                        <label key={status} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={filters.verificationStatus.includes(status)}
                            onChange={() => toggleFilter('verificationStatus', status)}
                            className="rounded"
                          />
                          <span className="text-xs text-gray-700 dark:text-gray-300 capitalize">{status}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Date Range Filter */}
                  <div>
                    <h4 className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
                      Date Range
                    </h4>
                    <div className="space-y-2">
                      <input
                        type="date"
                        value={filters.dateRange.start}
                        onChange={(e) => setFilters(prev => ({
                          ...prev,
                          dateRange: { ...prev.dateRange, start: e.target.value }
                        }))}
                        className="w-full text-xs p-2 border border-gray-300 dark:border-dark-600 rounded dark:bg-dark-700"
                      />
                      <input
                        type="date"
                        value={filters.dateRange.end}
                        onChange={(e) => setFilters(prev => ({
                          ...prev,
                          dateRange: { ...prev.dateRange, end: e.target.value }
                        }))}
                        className="w-full text-xs p-2 border border-gray-300 dark:border-dark-600 rounded dark:bg-dark-700"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="bg-white dark:bg-dark-800 border-b border-gray-200 dark:border-dark-700 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {selectedCollection 
                    ? documentCollections.find(c => c.id === selectedCollection)?.name 
                    : 'All Documents'
                  }
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {filteredDocuments.length} document{filteredDocuments.length !== 1 ? 's' : ''} found
                </p>
              </div>

              <div className="flex items-center space-x-4">
                {/* Sort Controls */}
                <div className="flex items-center space-x-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'date' | 'title' | 'significance' | 'relevance')}
                    className="text-sm border border-gray-300 dark:border-dark-600 rounded px-3 py-1 dark:bg-dark-700"
                  >
                    <option value="date">Date</option>
                    <option value="title">Title</option>
                    <option value="significance">Significance</option>
                    {searchQuery && <option value="relevance">Relevance</option>}
                  </select>
                  
                  <button
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-dark-700 rounded"
                  >
                    {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
                  </button>
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center border border-gray-300 dark:border-dark-600 rounded">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600' : 'hover:bg-gray-100 dark:hover:bg-dark-700'}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-600' : 'hover:bg-gray-100 dark:hover:bg-dark-700'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Document Grid/List */}
          <div className="flex-1 overflow-auto p-6">
            {filteredDocuments.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No documents found</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Try adjusting your search terms or filters.
                </p>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    onClick={() => setSelectedDocument(doc.id)}
                    className="bg-white dark:bg-dark-800 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer border border-gray-200 dark:border-dark-700"
                  >
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <span className="text-2xl">{getDocumentIcon(doc.type, doc.subtype)}</span>
                        <div className="flex items-center space-x-1">
                          {getVerificationBadge(doc.verificationStatus)}
                          <span className={`px-2 py-1 text-xs rounded border ${getSignificanceColor(doc.significance)}`}>
                            {doc.significance.toUpperCase()}
                          </span>
                        </div>
                      </div>
                      
                      <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">
                        {doc.title}
                      </h3>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                        {doc.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(doc.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="w-3 h-3" />
                          <span>{doc.content?.pageCount || 1} pages</span>
                        </div>
                      </div>

                      {/* Document Actions */}
                      <div className="mt-3 pt-3 border-t border-gray-200 dark:border-dark-700 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {/* Tags */}
                          <div className="flex items-center space-x-1">
                            <Tag className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-500">
                              {doc.tags.slice(0, 2).join(', ')}
                              {doc.tags.length > 2 && `+${doc.tags.length - 2}`}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          {/* Star/Bookmark */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              // Toggle bookmark functionality would go here
                            }}
                            className="p-1 text-gray-400 hover:text-yellow-500 transition-colors"
                            title="Bookmark document"
                          >
                            <Star className="w-3 h-3" />
                          </button>

                          {/* Download */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              // Download functionality would go here
                              const downloadUrl = doc.sources?.[0]?.url || '#';
                              if (downloadUrl !== '#') {
                                window.open(downloadUrl, '_blank');
                              }
                            }}
                            className="p-1 text-gray-400 hover:text-blue-500 transition-colors"
                            title="Download document"
                          >
                            <Download className="w-3 h-3" />
                          </button>

                          {/* External Link */}
                          {doc.sources?.[0]?.url && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open(doc.sources[0].url, '_blank');
                              }}
                              className="p-1 text-gray-400 hover:text-green-500 transition-colors"
                              title="Open external source"
                            >
                              <ExternalLink className="w-3 h-3" />
                            </button>
                          )}

                          {/* Copy link to preview */}
                          {(() => {
                            const previewUrl = doc.preferredUrl || doc.content?.url || doc.sources.find(s => !!s.url)?.url;
                            return previewUrl ? (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigator.clipboard.writeText(previewUrl);
                                }}
                                className="p-1 text-gray-400 hover:text-cyan-500 transition-colors"
                                title="Copy preview link"
                              >
                                <LinkIcon className="w-3 h-3" />
                              </button>
                            ) : null;
                          })()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {filteredDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    onClick={() => setSelectedDocument(doc.id)}
                    className="bg-white dark:bg-dark-800 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer border border-gray-200 dark:border-dark-700 p-4"
                  >
                    <div className="flex items-start space-x-4">
                      <span className="text-xl flex-shrink-0">{getDocumentIcon(doc.type, doc.subtype)}</span>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                            {doc.title}
                          </h3>
                          <div className="flex items-center space-x-2 ml-4">
                            {getVerificationBadge(doc.verificationStatus)}
                            <span className={`px-2 py-1 text-xs rounded border ${getSignificanceColor(doc.significance)}`}>
                              {doc.significance.toUpperCase()}
                            </span>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                          {doc.description}
                        </p>
                        
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>{new Date(doc.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <FileText className="w-3 h-3" />
                            <span>{doc.subtype}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Eye className="w-3 h-3" />
                            <span>{doc.content?.pageCount || 1} pages</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <User className="w-3 h-3" />
                            <span>{doc.relatedEntities.length} entities</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 