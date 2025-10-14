// Simple in-memory cache with TTL support
interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

class Cache {
  private cache: Map<string, CacheEntry<any>> = new Map();
  private maxSize: number = 100;

  set<T>(key: string, data: T, ttl: number = 5 * 60 * 1000): void {
    // TTL in milliseconds, default 5 minutes
    if (this.cache.size >= this.maxSize) {
      // Remove oldest entry
      const firstKey = this.cache.keys().next().value;
      if (firstKey) {
        this.cache.delete(firstKey);
      }
    }

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return null;
    }

    // Check if entry has expired
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  has(key: string): boolean {
    const entry = this.cache.get(key);
    if (!entry) return false;

    // Check if expired
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return false;
    }

    return true;
  }

  clear(): void {
    this.cache.clear();
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  size(): number {
    return this.cache.size;
  }

  // Clean up expired entries
  cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of Array.from(this.cache.entries())) {
      if (now - entry.timestamp > entry.ttl) {
        this.cache.delete(key);
      }
    }
  }
}

// Singleton instance
export const cache = new Cache();

// Cleanup expired entries every 5 minutes
if (typeof window !== 'undefined') {
  setInterval(() => {
    cache.cleanup();
  }, 5 * 60 * 1000);
}

// Memoization decorator for expensive computations
export function memoize<T extends (...args: any[]) => any>(
  fn: T,
  keyGenerator?: (...args: Parameters<T>) => string
): T {
  const cache = new Map<string, ReturnType<T>>();

  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = keyGenerator ? keyGenerator(...args) : JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key)!;
    }

    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
}

// Local storage cache with expiration
export class LocalStorageCache {
  private prefix: string;

  constructor(prefix: string = 'app_cache_') {
    this.prefix = prefix;
  }

  set<T>(key: string, data: T, ttl: number = 24 * 60 * 60 * 1000): void {
    if (typeof window === 'undefined') return;

    const entry = {
      data,
      timestamp: Date.now(),
      ttl
    };

      try {
        localStorage.setItem(
          `${this.prefix}${key}`,
          JSON.stringify(entry)
        );
      } catch {
        // Handle quota exceeded error - cleanup old entries
        this.cleanup();
      }
  }

  get<T>(key: string): T | null {
    if (typeof window === 'undefined') return null;

    try {
      const item = localStorage.getItem(`${this.prefix}${key}`);
      if (!item) return null;

      const entry = JSON.parse(item);
      
      // Check if expired
      if (Date.now() - entry.timestamp > entry.ttl) {
        localStorage.removeItem(`${this.prefix}${key}`);
        return null;
      }

      return entry.data as T;
    } catch {
      return null;
    }
  }

  delete(key: string): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(`${this.prefix}${key}`);
  }

  clear(): void {
    if (typeof window === 'undefined') return;
    
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith(this.prefix)) {
        localStorage.removeItem(key);
      }
    });
  }

  cleanup(): void {
    if (typeof window === 'undefined') return;

    const now = Date.now();
    const keys = Object.keys(localStorage);
    
    keys.forEach(key => {
      if (!key.startsWith(this.prefix)) return;

      try {
        const item = localStorage.getItem(key);
        if (!item) return;

        const entry = JSON.parse(item);
        if (now - entry.timestamp > entry.ttl) {
          localStorage.removeItem(key);
        }
      } catch {
        // Remove corrupted entries
        localStorage.removeItem(key);
      }
    });
  }
}

export const localCache = new LocalStorageCache();

