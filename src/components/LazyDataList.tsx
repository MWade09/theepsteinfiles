import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import { useMobileOptimization } from '@/utils/performance';

interface LazyLoadProps<T> {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  itemHeight?: number;
  bufferSize?: number;
  threshold?: number;
  className?: string;
  onLoadMore?: () => void;
  hasMore?: boolean;
  loading?: boolean;
  error?: string | null;
  emptyMessage?: string;
  loadingComponent?: React.ReactNode;
  errorComponent?: React.ReactNode;
}

// Virtualized list component for handling large datasets efficiently
function LazyDataList<T>({
  data,
  renderItem,
  itemHeight = 100,
  bufferSize = 5,
  threshold = 0.8,
  className = '',
  onLoadMore,
  hasMore = false,
  loading = false,
  error = null,
  emptyMessage = 'No data available',
  loadingComponent,
  errorComponent
}: LazyLoadProps<T>) {
  const { isMobile } = useMobileOptimization();
  
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(400);
  const [scrollTop, setScrollTop] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();
  
  // Calculate visible range
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - bufferSize);
  const endIndex = Math.min(
    data.length,
    Math.ceil((scrollTop + containerHeight) / itemHeight) + bufferSize
  );
  
  const visibleItems = data.slice(startIndex, endIndex);
  const totalHeight = data.length * itemHeight;
  const offsetY = startIndex * itemHeight;
  
  // Handle scroll events with throttling
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const newScrollTop = target.scrollTop;
    
    setScrollTop(newScrollTop);
    setIsScrolling(true);
    
    // Clear existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    // Set scrolling to false after scroll stops
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 150);
    
    // Load more data when approaching the end
    if (onLoadMore && hasMore && !loading) {
      const scrollPercentage = (newScrollTop + containerHeight) / totalHeight;
      if (scrollPercentage >= threshold) {
        onLoadMore();
      }
    }
  }, [containerHeight, totalHeight, threshold, onLoadMore, hasMore, loading]);
  
  // Update container height on resize
  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerHeight(Math.max(400, rect.height));
      }
    };
    
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);
  
  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);
  
  // Error state
  if (error) {
    return (
      <div className={`lazy-data-list error ${className}`}>
        {errorComponent || (
          <div className="flex items-center justify-center h-64 text-red-600">
            <div className="text-center">
              <div className="text-xl mb-2">⚠️</div>
              <div className="font-semibold mb-1">Error Loading Data</div>
              <div className="text-sm opacity-75">{error}</div>
            </div>
          </div>
        )}
      </div>
    );
  }
  
  // Empty state
  if (data.length === 0 && !loading) {
    return (
      <div className={`lazy-data-list empty ${className}`}>
        <div className="flex items-center justify-center h-64 text-gray-500">
          <div className="text-center">
            <div className="text-xl mb-2">📋</div>
            <div className="font-semibold">{emptyMessage}</div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div 
      ref={containerRef}
      className={`lazy-data-list relative overflow-auto ${className}`}
      style={{ 
        height: isMobile ? '60vh' : '70vh',
        maxHeight: '800px'
      }}
      onScroll={handleScroll}
    >
      {/* Virtual spacer for total height */}
      <div style={{ height: totalHeight, position: 'relative' }}>
        {/* Visible items container */}
        <div 
          style={{ 
            transform: `translateY(${offsetY}px)`,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0
          }}
        >
          {visibleItems.map((item, index) => (
            <VirtualizedItem
              key={startIndex + index}
              item={item}
              index={startIndex + index}
              renderItem={renderItem as (item: unknown, index: number) => React.ReactNode}
              height={itemHeight}
              isScrolling={isScrolling}
            />
          ))}
        </div>
        
        {/* Loading indicator */}
        {loading && (
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-sm">
            {loadingComponent || (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                <span className="text-sm text-gray-600">Loading more data...</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Memoized item component to prevent unnecessary re-renders
interface VirtualizedItemProps<T> {
  item: T;
  index: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  height: number;
  isScrolling: boolean;
}

const VirtualizedItem = memo(<T,>({ 
  item, 
  index, 
  renderItem, 
  height, 
  isScrolling 
}: VirtualizedItemProps<T>) => {
  return (
    <div 
      style={{ 
        height: `${height}px`,
        opacity: isScrolling ? 0.8 : 1,
        transition: isScrolling ? 'none' : 'opacity 0.2s ease'
      }}
      className="border-b border-gray-100 last:border-b-0"
    >
      {renderItem(item, index)}
    </div>
  );
});

VirtualizedItem.displayName = 'VirtualizedItem';

// Hook for managing paginated data
export function usePaginatedData<T>(
  fetchFunction: (page: number, limit: number) => Promise<{ data: T[]; hasMore: boolean }>,
  initialLimit = 50
) {
  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  
  const loadData = useCallback(async (pageNum: number, reset = false) => {
    if (loading) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await fetchFunction(pageNum, initialLimit);
      
      setData(prev => reset ? result.data : [...prev, ...result.data]);
      setHasMore(result.hasMore);
      setPage(pageNum);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  }, [fetchFunction, initialLimit, loading]);
  
  const loadMore = useCallback(() => {
    if (hasMore && !loading) {
      loadData(page + 1);
    }
  }, [hasMore, loading, page, loadData]);
  
  const refresh = useCallback(() => {
    setData([]);
    setPage(1);
    setError(null);
    loadData(1, true);
  }, [loadData]);
  
  // Initial load
  useEffect(() => {
    loadData(1, true);
  }, [loadData]);
  
  return {
    data,
    loading,
    error,
    hasMore,
    loadMore,
    refresh,
    page
  };
}

// Search and filter hook for large datasets
export function useDataSearch<T>(
  data: T[],
  searchFields: (keyof T)[],
  filters: Record<string, unknown> = {}
) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState<T[]>(data);
  
  useEffect(() => {
    let result = data;
    
    // Apply search
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(item => 
        searchFields.some(field => {
          const value = item[field];
          return value && 
            String(value).toLowerCase().includes(searchLower);
        })
      );
    }
    
    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        result = result.filter(item => {
          const itemValue = item[key as keyof T];
          if (Array.isArray(value)) {
            return value.includes(itemValue);
          }
          return itemValue === value;
        });
      }
    });
    
    setFilteredData(result);
  }, [data, searchTerm, filters, searchFields]);
  
  return {
    searchTerm,
    setSearchTerm,
    filteredData,
    resultCount: filteredData.length
  };
}

export default LazyDataList;
