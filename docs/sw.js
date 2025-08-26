const CACHE_NAME = 'pmjr-v1';
const STATIC_CACHE = 'pmjr-static-v1';
const DYNAMIC_CACHE = 'pmjr-dynamic-v1';

// Resources to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/projects.html',
  '/twyne.html',
  '/src/assets/fonts/mona.woff2',
  '/src/assets/fonts/geist-mono.woff2',
  '/favicon.png',
  '/cover.jpg'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip external requests
  if (url.origin !== location.origin) return;

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      // Return cached version if available
      if (cachedResponse) {
        return cachedResponse;
      }

      // Fetch from network and cache the response
      return fetch(request)
        .then((response) => {
          // Don't cache error responses
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone the response as it can only be consumed once
          const responseToCache = response.clone();

          // Determine which cache to use
          const cacheName = isStaticAsset(request.url) ? STATIC_CACHE : DYNAMIC_CACHE;

          caches.open(cacheName).then((cache) => {
            cache.put(request, responseToCache);
          });

          return response;
        })
        .catch(() => {
          // Return offline fallback for HTML pages
          if (request.headers.get('accept').includes('text/html')) {
            return caches.match('/index.html');
          }
        });
    })
  );
});

// Helper function to determine if asset is static
function isStaticAsset(url) {
  return url.includes('/src/') || 
         url.includes('/assets/') || 
         url.includes('.woff2') || 
         url.includes('.png') || 
         url.includes('.jpg') || 
         url.includes('.webp') || 
         url.includes('.svg');
}

// Background sync for offline form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

function doBackgroundSync() {
  // Implement any background sync logic here
  return Promise.resolve();
}
