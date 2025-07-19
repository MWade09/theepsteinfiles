'use client';

import { useState, useMemo, useEffect } from 'react';
import { Search, Filter, X, Calendar, User, FileText, MapPin, DollarSign } from 'lucide-react';
import { corePeople } from '@/data/core/people';
import { comprehensiveTimeline } from '@/data/core/timeline';
import { coreRelationships } from '@/data/core/relationships';
import { financialTransactions } from '@/data/financial/transactions';

interface SearchResult {
  id: string;
  type: 'person' | 'event' | 'relationship' | 'transaction' | 'document';
  title: string;
  description: string;
  relevance: number;
  tags: string[];
  date?: string;
  significance?: string;
  url?: string;
}

interface SearchFilters {
  types: string[];
  dateRange: { start: string; end: string };
  significance: string[];
  tags: string[];
  verificationStatus: string[];
}

const GlobalSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    types: [],
    dateRange: { start: '1970-01-01', end: '2024-12-31' },
    significance: [],
    tags: [],
    verificationStatus: []
  });

  // Comprehensive search across all data types
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    setIsSearching(true);
    const query = searchQuery.toLowerCase();
    const results: SearchResult[] = [];

    // Search People
    corePeople.forEach(person => {
      let relevance = 0;
      const nameMatch = person.name.toLowerCase().includes(query);
      const aliasMatch = person.aliases.some(alias => alias.toLowerCase().includes(query));
      const bioMatch = person.biography.toLowerCase().includes(query);
      const tagMatch = person.tags.some(tag => tag.toLowerCase().includes(query));

      if (nameMatch) relevance += 100;
      if (aliasMatch) relevance += 80;
      if (bioMatch) relevance += 40;
      if (tagMatch) relevance += 60;

      if (relevance > 0) {
        results.push({
          id: person.id,
          type: 'person',
          title: person.name,
          description: person.biography.substring(0, 200) + '...',
          relevance,
          tags: person.tags,
          significance: person.significance,
          url: `/people/${person.id}`
        });
      }
    });

    // Search Timeline Events
    comprehensiveTimeline.forEach(event => {
      let relevance = 0;
      const titleMatch = event.title.toLowerCase().includes(query);
      const descMatch = event.description.toLowerCase().includes(query);
      const tagMatch = event.tags?.some(tag => tag.toLowerCase().includes(query));

      if (titleMatch) relevance += 90;
      if (descMatch) relevance += 50;
      if (tagMatch) relevance += 40;

      if (relevance > 0) {
        results.push({
          id: event.id,
          type: 'event',
          title: event.title,
          description: event.description.substring(0, 200) + '...',
          relevance,
          tags: event.tags || [],
          date: event.date,
          significance: event.significance,
          url: `/timeline#${event.id}`
        });
      }
    });

    // Search Relationships
    coreRelationships.forEach(relationship => {
      let relevance = 0;
      const descMatch = relationship.description.toLowerCase().includes(query);
      const tagMatch = relationship.tags.some(tag => tag.toLowerCase().includes(query));

      if (descMatch) relevance += 60;
      if (tagMatch) relevance += 40;

      if (relevance > 0) {
        results.push({
          id: relationship.id,
          type: 'relationship',
          title: `${relationship.entity1Id} - ${relationship.entity2Id}`,
          description: relationship.description.substring(0, 200) + '...',
          relevance,
          tags: relationship.tags,
          significance: relationship.significance,
          url: `/network#${relationship.id}`
        });
      }
    });

    // Search Financial Transactions
    financialTransactions.forEach(transaction => {
      let relevance = 0;
      const descMatch = transaction.description.toLowerCase().includes(query);
      const purposeMatch = transaction.purpose?.toLowerCase().includes(query);
      const tagMatch = transaction.tags.some(tag => tag.toLowerCase().includes(query));

      if (descMatch) relevance += 70;
      if (purposeMatch) relevance += 60;
      if (tagMatch) relevance += 40;

      if (relevance > 0) {
        results.push({
          id: transaction.id,
          type: 'transaction',
          title: `$${transaction.amountUSD.toLocaleString()} Transaction`,
          description: transaction.description.substring(0, 200) + '...',
          relevance,
          tags: transaction.tags,
          date: transaction.transactionDate,
          url: `/financial#${transaction.id}`
        });
      }
    });

    // Apply filters
    let filteredResults = results;

    if (filters.types.length > 0) {
      filteredResults = filteredResults.filter(result => 
        filters.types.includes(result.type)
      );
    }

    if (filters.significance.length > 0) {
      filteredResults = filteredResults.filter(result => 
        result.significance && filters.significance.includes(result.significance)
      );
    }

    if (filters.tags.length > 0) {
      filteredResults = filteredResults.filter(result =>
        filters.tags.some(tag => result.tags.includes(tag))
      );
    }

    // Sort by relevance
    filteredResults.sort((a, b) => b.relevance - a.relevance);

    setTimeout(() => setIsSearching(false), 300);
    return filteredResults.slice(0, 50); // Limit to top 50 results
  }, [searchQuery, filters]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'person': return <User className="w-4 h-4" />;
      case 'event': return <Calendar className="w-4 h-4" />;
      case 'relationship': return <User className="w-4 h-4" />;
      case 'transaction': return <DollarSign className="w-4 h-4" />;
      case 'document': return <FileText className="w-4 h-4" />;
      default: return <Search className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'person': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'event': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'relationship': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'transaction': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'document': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const clearFilters = () => {
    setFilters({
      types: [],
      dateRange: { start: '1970-01-01', end: '2024-12-31' },
      significance: [],
      tags: [],
      verificationStatus: []
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Search Input */}
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search people, events, relationships, documents..."
            className="w-full pl-10 pr-20 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     text-lg placeholder-gray-500 dark:placeholder-gray-400"
          />
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1.5 
                     text-gray-400 hover:text-gray-600 dark:hover:text-gray-300
                     hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            <Filter className="w-5 h-5" />
          </button>
        </div>

        {/* Search Statistics */}
        {searchQuery && (
          <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {isSearching ? 'Searching...' : `${searchResults.length} results found`}
          </div>
        )}
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="mt-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg 
                       bg-gray-50 dark:bg-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Search Filters</h3>
            <button
              onClick={clearFilters}
              className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              Clear All
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Content Types */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Content Types
              </label>
              <div className="space-y-2">
                {['person', 'event', 'relationship', 'transaction', 'document'].map(type => (
                  <label key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.types.includes(type)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFilters(prev => ({ ...prev, types: [...prev.types, type] }));
                        } else {
                          setFilters(prev => ({ ...prev, types: prev.types.filter(t => t !== type) }));
                        }
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300 capitalize">
                      {type}s
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Significance Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Significance
              </label>
              <div className="space-y-2">
                {['critical', 'high', 'medium', 'low'].map(significance => (
                  <label key={significance} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.significance.includes(significance)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFilters(prev => ({ ...prev, significance: [...prev.significance, significance] }));
                        } else {
                          setFilters(prev => ({ ...prev, significance: prev.significance.filter(s => s !== significance) }));
                        }
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300 capitalize">
                      {significance}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Date Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Date Range
              </label>
              <div className="space-y-2">
                <input
                  type="date"
                  value={filters.dateRange.start}
                  onChange={(e) => setFilters(prev => ({ 
                    ...prev, 
                    dateRange: { ...prev.dateRange, start: e.target.value }
                  }))}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded 
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
                <input
                  type="date"
                  value={filters.dateRange.end}
                  onChange={(e) => setFilters(prev => ({ 
                    ...prev, 
                    dateRange: { ...prev.dateRange, end: e.target.value }
                  }))}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded 
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search Results */}
      {searchQuery && searchResults.length > 0 && (
        <div className="mt-6 space-y-3">
          {searchResults.map((result) => (
            <div
              key={`${result.type}-${result.id}`}
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg 
                       bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750
                       transition-colors cursor-pointer"
              onClick={() => window.location.href = result.url || '#'}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(result.type)}`}>
                      {getTypeIcon(result.type)}
                      <span className="ml-1 capitalize">{result.type}</span>
                    </span>
                    {result.significance && (
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        result.significance === 'critical' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                        result.significance === 'high' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' :
                        result.significance === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                        'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                      }`}>
                        {result.significance}
                      </span>
                    )}
                    {result.date && (
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(result.date).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                    {result.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-2">
                    {result.description}
                  </p>
                  {result.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {result.tags.slice(0, 5).map(tag => (
                        <span
                          key={tag}
                          className="inline-block px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 
                                   text-gray-700 dark:text-gray-300 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                      {result.tags.length > 5 && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          +{result.tags.length - 5} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
                <div className="ml-4 text-right">
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Relevance: {Math.round(result.relevance)}%
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Results */}
      {searchQuery && searchResults.length === 0 && !isSearching && (
        <div className="mt-6 text-center py-8">
          <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
            No results found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search terms or filters
          </p>
        </div>
      )}
    </div>
  );
};

export default GlobalSearch;
