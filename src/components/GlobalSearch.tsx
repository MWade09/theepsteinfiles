'use client';

import { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { cache, cacheKeys } from '@/utils/cache';
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
  Tag,
  Building,
  Plane,
  MapPin
} from 'lucide-react';

interface SearchResult {
  id: string;
  type: 'person' | 'event' | 'relationship' | 'transaction' | 'document' | 'organization' | 'property' | 'flight';
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

// API Response types
interface ApiSearchResult {
  id: string;
  type: string;
  title: string;
  description: string;
  relevance: number;
  significance?: string;
  date?: string;
  url: string;
}

interface ApiSearchResponse {
  success: boolean;
  data: ApiSearchResult[];
  query: string;
  total: number;
  returned: number;
  timestamp: string;
  version: string;
  source: string;
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
  const [searchResults, setSearchResults] = useState<ApiSearchResult[]>([]);
  const [searchError, setSearchError] = useState<string | null>(null);
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

  // API search function with caching
  const searchWithAPI = useCallback(async (query: string, types: string[] = []): Promise<ApiSearchResult[]> => {
    if (!query.trim()) return [];

    // Generate cache key
    const cacheKey = cacheKeys.search(query, types.sort());

    // Check cache first
    const cachedResult = cache.get<ApiSearchResult[]>(cacheKey);
    if (cachedResult) {
      console.log('🔄 Cache hit for search:', query);
      return cachedResult;
    }

    try {
      const typesParam = types.length > 0 ? types.join(',') : 'person,event,organization,transaction,document,property,flight';
      const response = await fetch(`/api/search?query=${encodeURIComponent(query)}&types=${typesParam}&limit=50`);

      if (!response.ok) {
        throw new Error(`Search failed: ${response.statusText}`);
      }

      const data: ApiSearchResponse = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Search failed');
      }

      // Cache the result for 2 minutes (search results change frequently but caching helps with repeated queries)
      cache.set(cacheKey, data.data, 2 * 60 * 1000);

      return data.data;
    } catch (error) {
      console.error('API search error:', error);
      setSearchError(error instanceof Error ? error.message : 'Search failed');
      return [];
    }
  }, []);

  // Enhanced search with API integration
  useEffect(() => {
    const performSearch = async () => {
      if (!searchQuery.trim()) {
        setSearchResults([]);
        setSearchError(null);
        return;
      }

      setIsSearching(true);
      setSearchError(null);

      try {
        // Determine search types based on filters
        let searchTypes: string[] = [];
        if (filters.types.length > 0) {
          searchTypes = filters.types;
        } else {
          // Default to all types if no filter
          searchTypes = ['person', 'event', 'organization', 'transaction', 'document', 'property', 'flight'];
        }

        const results = await searchWithAPI(searchQuery, searchTypes);
        setSearchResults(results);
      } catch (error) {
        console.error('Search error:', error);
        setSearchError(error instanceof Error ? error.message : 'Search failed');
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    // Debounce search to avoid too many API calls
    const debounceTimer = setTimeout(performSearch, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery, filters.types, searchWithAPI]);

  // Transform API results to component format
  const transformApiResults = (apiResults: ApiSearchResult[]): SearchResult[] => {
    return apiResults.map(result => ({
      id: result.id,
      type: result.type as SearchResult['type'],
      title: result.title,
      description: result.description,
      relevance: result.relevance,
      tags: [], // API doesn't return tags, could be enhanced later
      date: result.date,
      significance: result.significance,
      url: result.url,
      highlight: '' // API doesn't return highlights, could be enhanced later
    }));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'person': return <User className="w-4 h-4" />;
      case 'event': return <Calendar className="w-4 h-4" />;
      case 'relationship': return <User className="w-4 h-4" />;
      case 'transaction': return <DollarSign className="w-4 h-4" />;
      case 'document': return <FileText className="w-4 h-4" />;
      case 'organization': return <Building className="w-4 h-4" />;
      case 'property': return <MapPin className="w-4 h-4" />;
      case 'flight': return <Plane className="w-4 h-4" />;
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
      case 'property': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'flight': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200';
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

  // Smart search suggestions based on common terms and recent searches
  const getSearchSuggestions = useMemo((): SearchSuggestion[] => {
    if (!searchQuery.trim() || searchQuery.length < 2) return [];

    const suggestions: SearchSuggestion[] = [];
    const query = searchQuery.toLowerCase();

    // Smart term suggestions for investigation topics
    const commonTerms = [
      'financial', 'property', 'relationship', 'testimony', 'investigation',
      'epstein', 'maxwell', 'clinton', 'andrew', 'flight', 'island',
      'manhattan', 'palm beach', 'new mexico', 'virgin islands'
    ];

    commonTerms.forEach(term => {
      if (term.toLowerCase().includes(query) && term !== query) {
        suggestions.push({
          text: term,
          type: 'smart',
          category: 'Investigation Terms'
        });
      }
    });

    // Recent searches suggestions
    recentSearches.forEach(recentSearch => {
      if (recentSearch.toLowerCase().includes(query) && recentSearch !== searchQuery) {
        suggestions.push({
          text: recentSearch,
          type: 'recent',
          category: 'Recent Searches'
        });
      }
    });

    return suggestions.slice(0, 8);
  }, [searchQuery, recentSearches]);


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
  const addToHistory = useCallback((query: string) => {
    if (!query.trim()) return;

    const updated = [query, ...recentSearches.filter(q => q !== query)].slice(0, 10);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  }, [recentSearches]);

  // Add to search history when query changes
  useEffect(() => {
    if (searchQuery.trim()) {
      addToHistory(searchQuery);
    }
  }, [searchQuery, addToHistory]);

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
            placeholder="Search across people, events, organizations, financial records, properties, and flight logs..."
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
                  Searching database...
                </span>
              ) : searchError ? (
                <span className="text-red-600 dark:text-red-400">
                  Error: {searchError}
                </span>
              ) : (
                `${searchResults.length} results found${searchResults.length > 0 ? ` (powered by Supabase full-text search)` : ''}`
              )}
            </div>

            {/* Enhanced Tips */}
            <div className="text-xs text-gray-500 dark:text-gray-400">
              💾 Database-powered • ⚡ Full-text search • 🎯 Smart relevance ranking
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
                  { type: 'organization', label: 'Organizations', icon: Building, color: 'orange' },
                  { type: 'document', label: 'Documents', icon: FileText, color: 'gray' },
                  { type: 'property', label: 'Properties', icon: MapPin, color: 'red' },
                  { type: 'flight', label: 'Flight Logs', icon: Plane, color: 'indigo' }
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
          {transformApiResults(searchResults).map((result) => (
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
      {searchQuery && searchResults.length === 0 && !isSearching && !searchError && (
        <div className="mt-6 text-center py-8">
          <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
            No results found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Try adjusting your search terms or filters. The search is powered by our database and supports full-text search across all content types.
          </p>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            💡 Tips: Use broader terms, check spelling, or try different content types in the filters
          </div>
        </div>
      )}

      {/* Error State */}
      {searchError && (
        <div className="mt-6 text-center py-8">
          <X className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
            Search Error
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {searchError}
          </p>
          <button
            onClick={() => {
              setSearchError(null);
              // Trigger search again
              if (searchQuery.trim()) {
                // This will trigger the useEffect to search again
              }
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default GlobalSearch;
