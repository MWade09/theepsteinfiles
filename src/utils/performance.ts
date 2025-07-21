'use client';

import { useState, useEffect, useCallback } from 'react';

// Performance monitoring and optimization utilities
export class PerformanceOptimizer {
  private static instance: PerformanceOptimizer;
  private observers: Map<string, IntersectionObserver> = new Map();
  private loadedComponents: Set<string> = new Set();

  static getInstance(): PerformanceOptimizer {
    if (!PerformanceOptimizer.instance) {
      PerformanceOptimizer.instance = new PerformanceOptimizer();
    }
    return PerformanceOptimizer.instance;
  }

  // Lazy loading utility for components
  observeLazyLoad(element: HTMLElement, callback: () => void, threshold = 0.1): void {
    const observerId = `lazy-${Date.now()}`;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callback();
            observer.disconnect();
            this.observers.delete(observerId);
          }
        });
      },
      { threshold }
    );

    observer.observe(element);
    this.observers.set(observerId, observer);
  }

  // Preload critical resources
  preloadCriticalData(): Promise<void> {
    return new Promise((resolve) => {
      // Simulate critical data preloading
      const criticalData = [
        'people',
        'timeline-critical',
        'financial-major'
      ];

      let loaded = 0;
      criticalData.forEach((dataType) => {
        // Simulate async loading
        setTimeout(() => {
          this.loadedComponents.add(dataType);
          loaded++;
          if (loaded === criticalData.length) {
            resolve();
          }
        }, 100);
      });
    });
  }

  // Performance metrics collection
  measurePerformance(componentName: string, startTime: number): void {
    const endTime = performance.now();
    const duration = endTime - startTime;
    
    if (duration > 100) { // Log slow components
      // Performance warning for development
    }

    // Store performance data in localStorage for analysis
    const perfData = JSON.parse(localStorage.getItem('perf-metrics') || '{}');
    if (!perfData[componentName]) {
      perfData[componentName] = [];
    }
    perfData[componentName].push(duration);
    
    // Keep only last 10 measurements
    if (perfData[componentName].length > 10) {
      perfData[componentName] = perfData[componentName].slice(-10);
    }
    
    localStorage.setItem('perf-metrics', JSON.stringify(perfData));
  }

  // Memory optimization
  cleanup(): void {
    this.observers.forEach((observer) => observer.disconnect());
    this.observers.clear();
  }

  // Check if component is already loaded
  isComponentLoaded(componentName: string): boolean {
    return this.loadedComponents.has(componentName);
  }
}

// Mobile detection and optimization hooks
export function useMobileOptimization() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [touchSupport, setTouchSupport] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setScreenSize({ width, height });
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
      setOrientation(width > height ? 'landscape' : 'portrait');
      setTouchSupport('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    window.addEventListener('orientationchange', checkDevice);

    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('orientationchange', checkDevice);
    };
  }, []);

  return {
    isMobile,
    isTablet,
    isDesktop: !isMobile && !isTablet,
    screenSize,
    orientation,
    touchSupport
  };
}

// Performance monitoring hook
export function usePerformanceMonitor(componentName: string) {
  const [loadTime, setLoadTime] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const startTime = performance.now();
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          const endTime = performance.now();
          const duration = endTime - startTime;
          setLoadTime(duration);
          
          PerformanceOptimizer.getInstance().measurePerformance(componentName, startTime);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById(componentName);
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [componentName, isVisible]);

  return { loadTime, isVisible };
}

// Data pagination for large datasets
export function usePagination<T>(data: T[], itemsPerPage: number = 20) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(itemsPerPage);

  const totalPages = Math.ceil(data.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = data.slice(startIndex, endIndex);

  const goToPage = useCallback((page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  }, [totalPages]);

  const nextPage = useCallback(() => {
    goToPage(currentPage + 1);
  }, [currentPage, goToPage]);

  const prevPage = useCallback(() => {
    goToPage(currentPage - 1);
  }, [currentPage, goToPage]);

  return {
    currentPage,
    totalPages,
    pageSize,
    paginatedData,
    goToPage,
    nextPage,
    prevPage,
    setPageSize,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1
  };
}

// Touch gesture detection
export function useTouchGestures(elementRef: React.RefObject<HTMLElement>) {
  const [gesture, setGesture] = useState<{
    type: 'tap' | 'swipe' | 'pinch' | 'pan' | null;
    direction?: 'left' | 'right' | 'up' | 'down';
    distance?: number;
    scale?: number;
  }>({ type: null });

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let startTouch: Touch | null = null;
    let startTime = 0;
    let startDistance = 0;

    const handleTouchStart = (e: TouchEvent) => {
      startTouch = e.touches[0];
      startTime = Date.now();
      
      if (e.touches.length === 2) {
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        startDistance = Math.sqrt(
          Math.pow(touch2.clientX - touch1.clientX, 2) +
          Math.pow(touch2.clientY - touch1.clientY, 2)
        );
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!startTouch) return;

      const endTouch = e.changedTouches[0];
      const endTime = Date.now();
      const duration = endTime - startTime;

      const deltaX = endTouch.clientX - startTouch.clientX;
      const deltaY = endTouch.clientY - startTouch.clientY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      // Tap detection
      if (duration < 300 && distance < 10) {
        setGesture({ type: 'tap' });
      }
      // Swipe detection
      else if (distance > 50) {
        const direction = Math.abs(deltaX) > Math.abs(deltaY)
          ? (deltaX > 0 ? 'right' : 'left')
          : (deltaY > 0 ? 'down' : 'up');
        
        setGesture({ type: 'swipe', direction, distance });
      }

      // Reset after 1 second
      setTimeout(() => setGesture({ type: null }), 1000);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        const touch1 = e.touches[0];
        const touch2 = e.touches[1];
        const currentDistance = Math.sqrt(
          Math.pow(touch2.clientX - touch1.clientX, 2) +
          Math.pow(touch2.clientY - touch1.clientY, 2)
        );
        
        if (startDistance > 0) {
          const scale = currentDistance / startDistance;
          setGesture({ type: 'pinch', scale });
        }
      }
    };

    element.addEventListener('touchstart', handleTouchStart);
    element.addEventListener('touchend', handleTouchEnd);
    element.addEventListener('touchmove', handleTouchMove);

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchend', handleTouchEnd);
      element.removeEventListener('touchmove', handleTouchMove);
    };
  }, [elementRef]);

  return gesture;
}

// Offline detection and caching
export function useOfflineSupport() {
  const [isOnline, setIsOnline] = useState(true);
  const [cacheSize, setCacheSize] = useState(0);

  useEffect(() => {
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  const cacheData = useCallback((key: string, data: unknown) => {
    try {
      localStorage.setItem(`cache-${key}`, JSON.stringify({
        data,
        timestamp: Date.now(),
        version: '1.0'
      }));
      
      // Update cache size
      const newSize = JSON.stringify(localStorage).length;
      setCacheSize(newSize);
    } catch {
      // Failed to cache data
    }
  }, []);

  const getCachedData = useCallback((key: string, maxAge = 3600000) => { // 1 hour default
    try {
      const cached = localStorage.getItem(`cache-${key}`);
      if (!cached) return null;

      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp > maxAge) {
        localStorage.removeItem(`cache-${key}`);
        return null;
      }

      return data;
    } catch {
      // Failed to retrieve cached data
      return null;
    }
  }, []);

  const clearCache = useCallback(() => {
    const keys = Object.keys(localStorage).filter(key => key.startsWith('cache-'));
    keys.forEach(key => localStorage.removeItem(key));
    setCacheSize(0);
  }, []);

  return {
    isOnline,
    cacheSize,
    cacheData,
    getCachedData,
    clearCache
  };
}
