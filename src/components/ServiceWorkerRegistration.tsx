'use client';

import { useEffect } from 'react';

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      process.env.NODE_ENV === 'production'
    ) {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          // Service worker registered successfully
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New version available, show update notification
                  if (window.confirm('A new version is available. Reload to update?')) {
                    window.location.reload();
                  }
                }
              });
            }
          });
        })
        .catch((error) => {
          // Registration failed
          if (process.env.NODE_ENV === 'development') {
            // eslint-disable-next-line no-console
            console.log('Service Worker registration failed:', error);
          }
        });

      // Listen for messages from service worker
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data?.type === 'CACHE_UPDATED') {
          // Handle cache update notifications
          const notification = document.createElement('div');
          notification.className = 'fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg z-50';
          notification.innerHTML = `
            <div class="flex items-center space-x-2">
              <div>Content updated and cached</div>
              <button onclick="this.parentElement.parentElement.remove()" class="ml-2 text-white/80 hover:text-white">×</button>
            </div>
          `;
          document.body.appendChild(notification);
          
          // Auto remove after 5 seconds
          setTimeout(() => {
            if (notification.parentNode) {
              notification.parentNode.removeChild(notification);
            }
          }, 5000);
        }
      });
    }
  }, []);

  return null;
}
