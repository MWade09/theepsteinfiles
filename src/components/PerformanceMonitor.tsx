'use client';

import { useState, useEffect } from 'react';
import { useMobileOptimization } from '@/utils/performance';

interface PerformanceMonitorProps {
  children: React.ReactNode;
  pageName: string;
  enableInDevelopment?: boolean;
}

export default function PerformanceMonitor({ 
  children, 
  pageName,
  enableInDevelopment = false 
}: PerformanceMonitorProps) {
  const { isMobile } = useMobileOptimization();
  const [performanceData, setPerformanceData] = useState({
    loadTime: 0,
    memoryUsage: 0,
    renderTime: 0
  });
  const [showMetrics, setShowMetrics] = useState(false);

  useEffect(() => {
    const startTime = performance.now();
    
    // Monitor page load performance
    const measurePerformance = () => {
      const loadTime = performance.now() - startTime;
      
      // Get memory usage if available (Chrome only)
      const performanceWithMemory = performance as Performance & {
        memory?: {
          usedJSHeapSize: number;
          totalJSHeapSize: number;
          jsHeapSizeLimit: number;
        };
      };
      
      const memoryUsage = performanceWithMemory.memory 
        ? Math.round(performanceWithMemory.memory.usedJSHeapSize / 1024 / 1024) 
        : 0;

      setPerformanceData({
        loadTime: Math.round(loadTime),
        memoryUsage,
        renderTime: Math.round(performance.now() - startTime)
      });

      // Log performance in development
      if (process.env.NODE_ENV === 'development' || enableInDevelopment) {
        // eslint-disable-next-line no-console
        console.log(`Performance [${pageName}]:`, {
          loadTime: `${Math.round(loadTime)}ms`,
          memoryUsage: `${memoryUsage}MB`,
          isMobile,
          userAgent: navigator.userAgent
        });
      }
    };

    // Measure after component mount
    const timer = setTimeout(measurePerformance, 100);
    
    // Measure on window load
    if (document.readyState === 'loading') {
      window.addEventListener('load', measurePerformance);
    } else {
      measurePerformance();
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener('load', measurePerformance);
    };
  }, [pageName, isMobile, enableInDevelopment]);

  // Monitor memory leaks in development
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development' && !enableInDevelopment) return;

    const interval = setInterval(() => {
      const performanceWithMemory = performance as Performance & {
        memory?: {
          usedJSHeapSize: number;
          totalJSHeapSize: number;
          jsHeapSizeLimit: number;
        };
      };
      
      if (performanceWithMemory.memory) {
        const currentMemory = Math.round(performanceWithMemory.memory.usedJSHeapSize / 1024 / 1024);
        if (currentMemory > performanceData.memoryUsage + 50) {
          // eslint-disable-next-line no-console
          console.warn(`Memory usage increased significantly on ${pageName}: ${currentMemory}MB`);
        }
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [pageName, performanceData.memoryUsage, enableInDevelopment]);

  // Show performance metrics in development
  const shouldShowMetrics = (process.env.NODE_ENV === 'development' || enableInDevelopment) && showMetrics;

  return (
    <>
      {children}
      
      {/* Performance Debug Panel */}
      {(process.env.NODE_ENV === 'development' || enableInDevelopment) && (
        <div className="fixed bottom-4 left-4 z-50">
          <button
            onClick={() => setShowMetrics(!showMetrics)}
            className="bg-gray-800/90 text-white text-xs px-2 py-1 rounded backdrop-blur-sm border border-gray-600"
          >
            📊 {performanceData.loadTime}ms
          </button>
          
          {shouldShowMetrics && (
            <div className="absolute bottom-8 left-0 bg-black/90 text-white text-xs p-3 rounded border border-gray-600 backdrop-blur-sm min-w-48">
              <div className="font-semibold mb-2">Performance - {pageName}</div>
              <div className="space-y-1">
                <div>Load Time: {performanceData.loadTime}ms</div>
                <div>Render Time: {performanceData.renderTime}ms</div>
                {performanceData.memoryUsage > 0 && (
                  <div>Memory: {performanceData.memoryUsage}MB</div>
                )}
                <div>Device: {isMobile ? 'Mobile' : 'Desktop'}</div>
                <div className="text-xs text-gray-400 mt-2">
                  Connection: {(navigator as Navigator & { connection?: { effectiveType: string } }).connection?.effectiveType || 'Unknown'}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

// Hook for measuring component performance
export function useComponentPerformance(componentName: string) {
  const [renderCount, setRenderCount] = useState(0);
  const [averageRenderTime, setAverageRenderTime] = useState(0);

  useEffect(() => {
    const startTime = performance.now();
    const currentCount = renderCount + 1;
    setRenderCount(currentCount);

    return () => {
      const renderTime = performance.now() - startTime;
      setAverageRenderTime(prev => (prev * (currentCount - 1) + renderTime) / currentCount);
      
      if (process.env.NODE_ENV === 'development' && renderTime > 16.67) {
        // eslint-disable-next-line no-console
        console.warn(`Slow render detected in ${componentName}: ${renderTime.toFixed(2)}ms`);
      }
    };
  }, [componentName, renderCount]);

  return {
    renderCount,
    averageRenderTime: Math.round(averageRenderTime * 100) / 100
  };
}

// Hook for optimizing expensive operations
export function useOptimizedCallback<T extends unknown[]>(
  callback: (...args: T) => void,
  debounceMs = 0
) {
  const [debouncedCallback, setDebouncedCallback] = useState<(...args: T) => void>();

  useEffect(() => {
    if (debounceMs > 0) {
      let timeoutId: NodeJS.Timeout;
      const debounced = (...args: T) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => callback(...args), debounceMs);
      };
      setDebouncedCallback(() => debounced);
      
      return () => clearTimeout(timeoutId);
    } else {
      setDebouncedCallback(() => callback);
    }
  }, [callback, debounceMs]);

  return debouncedCallback || callback;
}
