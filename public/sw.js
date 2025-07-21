// Service Worker for The Epstein Files Investigation Platform
// Provides offline functionality and caching for critical investigation data

const CACHE_NAME = 'epstein-investigation-v1.0';
const STATIC_CACHE = 'epstein-static-v1.0';
const DYNAMIC_CACHE = 'epstein-dynamic-v1.0';

// Critical resources to cache immediately
const STATIC_ASSETS = [
  '/',
  '/timeline',
  '/network',
  '/geographic',
  '/financial',
  '/research',
  '/manifest.json',
  // Critical CSS and JS will be added by Next.js build process
];

// Data that should be cached for offline access
const CRITICAL_DATA_ROUTES = [
  '/api/people',
  '/api/timeline',
  '/api/relationships',
  '/api/financial',
  '/api/organizations'
];

// Install event - cache critical resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then((cache) => {
        return cache.addAll(STATIC_ASSETS);
      }),
      // Skip waiting to activate immediately
      self.skipWaiting()
    ])
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && 
                cacheName !== DYNAMIC_CACHE && 
                cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Take control of all clients
      self.clients.claim()
    ])
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle different types of requests
  if (request.method === 'GET') {
    // Static assets - cache first strategy
    if (isStaticAsset(url.pathname)) {
      event.respondWith(cacheFirstStrategy(request));
    }
    // API routes - network first with cache fallback
    else if (isAPIRoute(url.pathname)) {
      event.respondWith(networkFirstStrategy(request));
    }
    // Navigation requests - network first with offline page fallback
    else if (isNavigationRequest(request)) {
      event.respondWith(navigationStrategy(request));
    }
    // Everything else - network first
    else {
      event.respondWith(networkFirstStrategy(request));
    }
  }
});

// Strategy: Cache first (for static assets)
async function cacheFirstStrategy(request) {
  try {
    const cached = await caches.match(request);
    if (cached) {
      return cached;
    }
    
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    // Log network failure for debugging in development
    if (self.location.hostname === 'localhost') {
      // eslint-disable-next-line no-console
      console.warn('Network request failed, falling back to cache:', error);
    }
    // Return cached version if network fails
    return caches.match(request);
  }
}

// Strategy: Network first (for API and dynamic content)
async function networkFirstStrategy(request) {
  try {
    const response = await fetch(request);
    
    if (response.ok) {
      // Cache successful responses
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, response.clone());
    }
    
    return response;
  } catch {
    // Fallback to cache if network fails
    const cached = await caches.match(request);
    if (cached) {
      return cached;
    }
    
    // If it's a critical data route, return offline data
    if (isCriticalDataRoute(request.url)) {
      return createOfflineDataResponse(request);
    }
    
    throw error;
  }
}

// Strategy: Navigation (for page requests)
async function navigationStrategy(request) {
  try {
    const response = await fetch(request);
    return response;
  } catch {
    // Try to serve cached page
    const cached = await caches.match(request);
    if (cached) {
      return cached;
    }
    
    // Fallback to offline page
    return caches.match('/');
  }
}

// Helper functions
function isStaticAsset(pathname) {
  return pathname.match(/\.(css|js|png|jpg|jpeg|gif|svg|ico|woff|woff2)$/);
}

function isAPIRoute(pathname) {
  return pathname.startsWith('/api/');
}

function isNavigationRequest(request) {
  return request.mode === 'navigate' || 
         (request.method === 'GET' && 
          request.headers.get('accept') && 
          request.headers.get('accept').includes('text/html'));
}

function isCriticalDataRoute(url) {
  return CRITICAL_DATA_ROUTES.some(route => url.includes(route));
}

function createOfflineDataResponse(_request) {
  // Create minimal offline data structure
  const offlineData = {
    error: 'offline',
    message: 'This data is not available offline',
    timestamp: Date.now(),
    cachedData: null
  };
  
  return new Response(JSON.stringify(offlineData), {
    status: 503,
    statusText: 'Service Unavailable',
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache'
    }
  });
}

// Background sync for when connection is restored
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(syncData());
  }
});

async function syncData() {
  try {
    // Sync any pending data when connection is restored
    const cache = await caches.open(DYNAMIC_CACHE);
    const requests = await cache.keys();
    
    // Re-validate cached API responses
    for (const request of requests) {
      if (isAPIRoute(new URL(request.url).pathname)) {
        try {
          const response = await fetch(request);
          if (response.ok) {
            cache.put(request, response.clone());
          }
        } catch {
          // Skip failed requests
          continue;
        }
      }
    }
  } catch {
    // Sync failed, will retry later
  }
}

// Handle push notifications (for future use)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    
    const options = {
      body: data.body || 'New investigation update available',
      icon: '/icons/icon-192x192.png',
      badge: '/icons/badge-72x72.png',
      vibrate: [200, 100, 200],
      tag: 'investigation-update',
      actions: [
        {
          action: 'view',
          title: 'View Update',
          icon: '/icons/view-action.png'
        },
        {
          action: 'dismiss',
          title: 'Dismiss',
          icon: '/icons/dismiss-action.png'
        }
      ]
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title || 'Investigation Update', options)
    );
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Periodic background sync (when supported)
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'data-sync') {
    event.waitUntil(syncData());
  }
});

// Error handling
self.addEventListener('error', (event) => {
  // Silently handle errors in production
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.error('Service Worker Error:', event.error);
  }
});

// Unhandled promise rejections
self.addEventListener('unhandledrejection', (event) => {
  // Silently handle rejections in production
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.error('Service Worker Unhandled Rejection:', event.reason);
  }
});
