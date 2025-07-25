'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Calendar, 
  User, 
  FileText, 
  DollarSign, 
  Star,
  BookOpen,
  ChevronUp,
  X,
  Zap,
  Brain,
  History,
  Tag
} from 'lucide-react';
import { corePeople } from '@/data/core/people';
import { comprehensiveTimeline } from '@/data/core/timeline';
import { coreRelationships } from '@/data/core/relationships';
import { financialTransactions } from '@/data/financial/transactions';
import { coreOrganizations } from '@/data/core/organizations';

interface SearchResult {
  id: string;
  type: 'person' | 'event' | 'relationship' | 'transaction' | 'document' | 'organization';
  title: string;
  description: string;
  relevance: number;
  tags: string[];
  date?: string;
  significance?: string;
  url?: string;
  highlight?: string;
}

interface SearchFilters {
  types: string[];
  dateRange: { start: string; end: string };
  significance: string[];
  tags: string[];
  verificationStatus: string[];
  operators: {
    useAnd: boolean;
    exact: boolean;
    caseSensitive: boolean;
  };
}

interface SavedSearch {
  id: string;
  name: string;
  query: string;
  filters: SearchFilters;
  createdAt: string;
  lastUsed: string;
  useCount: number;
}

interface SearchSuggestion {
  text: string;
  type: 'term' | 'filter' | 'recent' | 'smart';
  count?: number;
  category?: string;
}

const GlobalSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [showSavedSearches, setShowSavedSearches] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  const [filters, setFilters] = useState<SearchFilters>({
    types: [],
    dateRange: { start: '1970-01-01', end: '2024-12-31' },
    significance: [],
    tags: [],
    verificationStatus: [],
    operators: {
      useAnd: false,
      exact: false,
      caseSensitive: false
    }
  });

  // Load saved searches from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem('investigationSearches');
    if (saved) {
      setSavedSearches(JSON.parse(saved));
    }
    
    const recent = localStorage.getItem('recentSearches');
    if (recent) {
      setRecentSearches(JSON.parse(recent));
    }
  }, []);

  // Enhanced comprehensive search across all data types
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    setIsSearching(true);
    addToHistory(searchQuery);
    const results: SearchResult[] = [];

    // Search People with enhanced logic
    corePeople.forEach(person => {
      let totalRelevance = 0;
      const highlights: string[] = [];
      
      const nameSearch = enhancedSearch(searchQuery, person.name);
      const aliasSearch = person.aliases.some(alias => enhancedSearch(searchQuery, alias).match);
      const bioSearch = enhancedSearch(searchQuery, person.biography);
      const tagSearch = person.tags.some(tag => enhancedSearch(searchQuery, tag).match);

      if (nameSearch.match) {
        totalRelevance += nameSearch.relevance;
        highlights.push('name');
      }
      if (aliasSearch) totalRelevance += 80;
      if (bioSearch.match) {
        totalRelevance += bioSearch.relevance;
        highlights.push('biography');
      }
      if (tagSearch) {
        totalRelevance += 60;
        highlights.push('tags');
      }

      if (totalRelevance > 0) {
        results.push({
          id: person.id,
          type: 'person',
          title: person.name,
          description: person.biography.substring(0, 200) + '...',
          relevance: totalRelevance,
          tags: person.tags,
          significance: person.significance,
          url: `/people/${person.id}`,
          highlight: highlights.join(', ')
        });
      }
    });

    // Search Timeline Events with enhanced logic
    comprehensiveTimeline.forEach(event => {
      let totalRelevance = 0;
      const highlights: string[] = [];
      
      const titleSearch = enhancedSearch(searchQuery, event.title);
      const descSearch = enhancedSearch(searchQuery, event.description);
      const tagSearch = event.tags?.some(tag => enhancedSearch(searchQuery, tag).match);

      if (titleSearch.match) {
        totalRelevance += titleSearch.relevance;
        highlights.push('title');
      }
      if (descSearch.match) {
        totalRelevance += descSearch.relevance;
        highlights.push('description');
      }
      if (tagSearch) {
        totalRelevance += 40;
        highlights.push('tags');
      }

      if (totalRelevance > 0) {
        results.push({
          id: event.id,
          type: 'event',
          title: event.title,
          description: event.description.substring(0, 200) + '...',
          relevance: totalRelevance,
          tags: event.tags || [],
          date: event.date,
          significance: event.significance,
          url: `/timeline#${event.id}`,
          highlight: highlights.join(', ')
        });
      }
    });

    // Search Relationships with enhanced logic
    coreRelationships.forEach(relationship => {
      let totalRelevance = 0;
      const highlights: string[] = [];
      
      const descSearch = enhancedSearch(searchQuery, relationship.description);
      const tagSearch = relationship.tags.some(tag => enhancedSearch(searchQuery, tag).match);

      if (descSearch.match) {
        totalRelevance += descSearch.relevance;
        highlights.push('description');
      }
      if (tagSearch) {
        totalRelevance += 40;
        highlights.push('tags');
      }

      if (totalRelevance > 0) {
        results.push({
          id: relationship.id,
          type: 'relationship',
          title: `${relationship.entity1Id} - ${relationship.entity2Id}`,
          description: relationship.description.substring(0, 200) + '...',
          relevance: totalRelevance,
          tags: relationship.tags,
          significance: relationship.significance,
          url: `/network#${relationship.id}`,
          highlight: highlights.join(', ')
        });
      }
    });

    // Search Financial Transactions with enhanced logic
    financialTransactions.forEach(transaction => {
      let totalRelevance = 0;
      const highlights: string[] = [];
      
      const descSearch = enhancedSearch(searchQuery, transaction.description);
      const purposeSearch = transaction.purpose ? enhancedSearch(searchQuery, transaction.purpose) : { match: false, relevance: 0 };
      const tagSearch = transaction.tags.some(tag => enhancedSearch(searchQuery, tag).match);

      if (descSearch.match) {
        totalRelevance += descSearch.relevance;
        highlights.push('description');
      }
      if (purposeSearch.match) {
        totalRelevance += purposeSearch.relevance;
        highlights.push('purpose');
      }
      if (tagSearch) {
        totalRelevance += 40;
        highlights.push('tags');
      }

      if (totalRelevance > 0) {
        results.push({
          id: transaction.id,
          type: 'transaction',
          title: `$${transaction.amountUSD.toLocaleString()} Transaction`,
          description: transaction.description.substring(0, 200) + '...',
          relevance: totalRelevance,
          tags: transaction.tags,
          date: transaction.transactionDate,
          url: `/financial#${transaction.id}`,
          highlight: highlights.join(', ')
        });
      }
    });

    // Search Organizations with enhanced logic
    coreOrganizations.forEach(organization => {
      let totalRelevance = 0;
      const highlights: string[] = [];
      
      const nameSearch = enhancedSearch(searchQuery, organization.name);
      const descSearch = enhancedSearch(searchQuery, organization.description);
      const tagSearch = organization.tags.some(tag => enhancedSearch(searchQuery, tag).match);

      if (nameSearch.match) {
        totalRelevance += nameSearch.relevance;
        highlights.push('name');
      }
      if (descSearch.match) {
        totalRelevance += descSearch.relevance;
        highlights.push('description');
      }
      if (tagSearch) {
        totalRelevance += 40;
        highlights.push('tags');
      }

      if (totalRelevance > 0) {
        results.push({
          id: organization.id,
          type: 'organization',
          title: organization.name,
          description: organization.description.substring(0, 200) + '...',
          relevance: totalRelevance,
          tags: organization.tags,
          significance: organization.significance,
          url: `/organizations#${organization.id}`,
          highlight: highlights.join(', ')
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, filters]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'person': return <User className="w-4 h-4" />;
      case 'event': return <Calendar className="w-4 h-4" />;
      case 'relationship': return <User className="w-4 h-4" />;
      case 'transaction': return <DollarSign className="w-4 h-4" />;
      case 'document': return <FileText className="w-4 h-4" />;
      case 'organization': return <Filter className="w-4 h-4" />;
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
      case 'organization': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const clearFilters = () => {
    setFilters({
      types: [],
      dateRange: { start: '1970-01-01', end: '2024-12-31' },
      significance: [],
      tags: [],
      verificationStatus: [],
      operators: {
        useAnd: false,
        exact: false,
        caseSensitive: false
      }
    });
  };

  // Smart search suggestions based on query
  const getSearchSuggestions = useMemo((): SearchSuggestion[] => {
    if (!searchQuery.trim() || searchQuery.length < 2) return [];
    
    const suggestions: SearchSuggestion[] = [];
    const query = searchQuery.toLowerCase();
    
    // Smart term suggestions
    const commonTerms = ['financial', 'property', 'relationship', 'testimony', 'investigation'];
    commonTerms.forEach(term => {
      if (term.includes(query) && term !== query) {
        suggestions.push({
          text: term,
          type: 'smart',
          category: 'Common Terms'
        });
      }
    });
    
    // People name suggestions
    corePeople.forEach(person => {
      if (person.name.toLowerCase().includes(query)) {
        suggestions.push({
          text: person.name,
          type: 'term',
          category: 'People'
        });
      }
    });
    
    // Organization suggestions
    coreOrganizations.forEach(org => {
      if (org.name.toLowerCase().includes(query)) {
        suggestions.push({
          text: org.name,
          type: 'term',
          category: 'Organizations'
        });
      }
    });
    
    return suggestions.slice(0, 8);
  }, [searchQuery]);

  // Enhanced search with Boolean operators
  const enhancedSearch = (query: string, text: string): { match: boolean; relevance: number } => {
    const caseSensitiveText = filters.operators.caseSensitive ? text : text.toLowerCase();
    const searchTerm = filters.operators.caseSensitive ? query : query.toLowerCase();
    
    if (filters.operators.exact) {
      return {
        match: caseSensitiveText.includes(`"${searchTerm}"`),
        relevance: caseSensitiveText === searchTerm ? 100 : 80
      };
    }
    
    // Boolean operators
    if (query.includes(' AND ') || query.includes(' OR ') || query.includes(' NOT ')) {
      const terms = query.split(/\s+(AND|OR|NOT)\s+/i);
      let match = false;
      let relevance = 0;
      
      for (let i = 0; i < terms.length; i += 2) {
        const term = terms[i].trim();
        const operator = terms[i - 1];
        const termMatch = caseSensitiveText.includes(term);
        
        if (i === 0) {
          match = termMatch;
          relevance = termMatch ? 50 : 0;
        } else {
          switch (operator?.toUpperCase()) {
            case 'AND':
              match = match && termMatch;
              relevance = match ? relevance + 30 : 0;
              break;
            case 'OR':
              match = match || termMatch;
              relevance = termMatch ? Math.max(relevance, 50) : relevance;
              break;
            case 'NOT':
              match = match && !termMatch;
              relevance = match ? relevance : 0;
              break;
          }
        }
      }
      
      return { match, relevance };
    }
    
    // Simple search
    const match = caseSensitiveText.includes(searchTerm);
    const relevance = match ? (caseSensitiveText.indexOf(searchTerm) === 0 ? 100 : 70) : 0;
    
    return { match, relevance };
  };

  // Save search function
  const saveSearch = (name: string) => {
    const newSearch: SavedSearch = {
      id: Date.now().toString(),
      name,
      query: searchQuery,
      filters: { ...filters },
      createdAt: new Date().toISOString(),
      lastUsed: new Date().toISOString(),
      useCount: 1
    };
    
    const updated = [...savedSearches, newSearch];
    setSavedSearches(updated);
    localStorage.setItem('investigationSearches', JSON.stringify(updated));
  };

  // Add to search history
  const addToHistory = (query: string) => {
    if (!query.trim()) return;
    
    const updated = [query, ...recentSearches.filter(q => q !== query)].slice(0, 10);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Enhanced Search Input with Smart Features */}
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Search with Boolean operators (AND, OR, NOT) or exact phrases..."
            className="w-full pl-10 pr-32 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                     focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     text-lg placeholder-gray-500 dark:placeholder-gray-400"
          />
          
          {/* Advanced Controls */}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
            <button
              onClick={() => setShowSavedSearches(!showSavedSearches)}
              className="p-1.5 text-gray-400 hover:text-blue-600 rounded transition-colors"
              title="Saved Searches"
            >
              <BookOpen className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                const name = prompt('Save search as:');
                if (name) saveSearch(name);
              }}
              className="p-1.5 text-gray-400 hover:text-green-600 rounded transition-colors"
              title="Save Search"
            >
              <Star className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`p-1.5 rounded transition-colors ${
                showFilters 
                  ? 'text-blue-600 bg-blue-100 dark:bg-blue-900' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
              title="Advanced Filters"
            >
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Smart Suggestions Dropdown */}
        {showSuggestions && searchQuery.length > 1 && getSearchSuggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
            <div className="p-2">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-2 flex items-center gap-1">
                <Brain className="w-3 h-3" />
                Smart Suggestions
              </div>
              {getSearchSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSearchQuery(suggestion.text);
                    setShowSuggestions(false);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-sm flex items-center justify-between"
                >
                  <span className="text-gray-900 dark:text-gray-100">{suggestion.text}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{suggestion.category}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Statistics with Enhanced Info */}
        {searchQuery && (
          <div className="mt-2 flex items-center justify-between text-sm">
            <div className="text-gray-600 dark:text-gray-400">
              {isSearching ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  Searching...
                </span>
              ) : (
                `${searchResults.length} results found${searchResults.length > 0 ? ` (avg relevance: ${Math.round(searchResults.reduce((sum, r) => sum + r.relevance, 0) / searchResults.length)})` : ''}`
              )}
            </div>
            
            {/* Boolean Operator Hints */}
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Tips: Use &quot;AND&quot;, &quot;OR&quot;, &quot;NOT&quot; • Use quotes for exact phrases
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Filters Panel */}
      {showFilters && (
        <div className="mt-4 p-6 border border-gray-200 dark:border-gray-700 rounded-lg 
                       bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-500" />
              Advanced Search Filters
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={clearFilters}
                className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 px-3 py-1 rounded border border-blue-200 dark:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900"
              >
                Clear All
              </button>
              <button
                onClick={() => setShowFilters(false)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Content Types */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Tag className="w-4 h-4" />
                Content Types
              </label>
              <div className="space-y-2">
                {[
                  { type: 'person', label: 'People', icon: User, color: 'blue' },
                  { type: 'event', label: 'Timeline Events', icon: Calendar, color: 'green' },
                  { type: 'relationship', label: 'Relationships', icon: User, color: 'purple' },
                  { type: 'transaction', label: 'Financial', icon: DollarSign, color: 'yellow' },
                  { type: 'organization', label: 'Organizations', icon: Filter, color: 'orange' }
                ].map(({ type, label, icon: Icon, color }) => (
                  <label key={type} className="flex items-center space-x-3 cursor-pointer group">
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
                    <Icon className={`w-4 h-4 text-${color}-500`} />
                    <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100">
                      {label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Search Operators */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Brain className="w-4 h-4" />
                Search Options
              </label>
              <div className="space-y-3">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.operators.useAnd}
                    onChange={(e) => setFilters(prev => ({ 
                      ...prev, 
                      operators: { ...prev.operators, useAnd: e.target.checked }
                    }))}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Require ALL terms (AND logic)
                  </span>
                </label>
                
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.operators.exact}
                    onChange={(e) => setFilters(prev => ({ 
                      ...prev, 
                      operators: { ...prev.operators, exact: e.target.checked }
                    }))}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Exact phrase matching
                  </span>
                </label>
                
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.operators.caseSensitive}
                    onChange={(e) => setFilters(prev => ({ 
                      ...prev, 
                      operators: { ...prev.operators, caseSensitive: e.target.checked }
                    }))}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Case sensitive search
                  </span>
                </label>
              </div>
            </div>

            {/* Significance & Date Range */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Significance Level
                </label>
                <div className="space-y-2">
                  {['critical', 'high', 'medium', 'low'].map(sig => (
                    <label key={sig} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.significance.includes(sig)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFilters(prev => ({ ...prev, significance: [...prev.significance, sig] }));
                          } else {
                            setFilters(prev => ({ ...prev, significance: prev.significance.filter(s => s !== sig) }));
                          }
                        }}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className={`text-sm capitalize ${
                        sig === 'critical' ? 'text-red-600' :
                        sig === 'high' ? 'text-orange-600' :
                        sig === 'medium' ? 'text-yellow-600' :
                        'text-gray-600'
                      }`}>
                        {sig}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              
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
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm
                             bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                  <input
                    type="date"
                    value={filters.dateRange.end}
                    onChange={(e) => setFilters(prev => ({ 
                      ...prev, 
                      dateRange: { ...prev.dateRange, end: e.target.value }
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm
                             bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Saved Searches Panel */}
      {showSavedSearches && (
        <div className="mt-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <History className="w-5 h-5" />
              Saved & Recent Searches
            </h3>
            <button
              onClick={() => setShowSavedSearches(false)}
              className="p-1 text-gray-400 hover:text-gray-600 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Saved Searches */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Saved Searches</h4>
              {savedSearches.length === 0 ? (
                <p className="text-sm text-gray-500 dark:text-gray-400">No saved searches yet</p>
              ) : (
                <div className="space-y-2">
                  {savedSearches.map(search => (
                    <button
                      key={search.id}
                      onClick={() => {
                        setSearchQuery(search.query);
                        setFilters(search.filters);
                        setShowSavedSearches(false);
                      }}
                      className="w-full text-left p-2 border border-gray-200 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <div className="font-medium text-sm text-gray-900 dark:text-gray-100">{search.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 truncate">{search.query}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Recent Searches */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Recent Searches</h4>
              {recentSearches.length === 0 ? (
                <p className="text-sm text-gray-500 dark:text-gray-400">No recent searches</p>
              ) : (
                <div className="space-y-1">
                  {recentSearches.slice(0, 5).map((search, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSearchQuery(search);
                        setShowSavedSearches(false);
                      }}
                      className="w-full text-left p-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded truncate"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              )}
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
