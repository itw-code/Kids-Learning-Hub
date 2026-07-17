const CACHE_NAME = 'kids-hub-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/index.css',
  '/manifest.json',
  '/hub-nav.js',
  '/hub-nav.css',
  '/assets/icon-192.png',
  '/assets/icon-512.png',
  // Cache sub-apps index pages for immediate launch
  '/apps/alphabet/index.html',
  '/apps/numbers/index.html',
  '/apps/spelling/index.html',
  '/apps/shapes/index.html',
  '/apps/puzzles/index.html',
  '/apps/coloring/index.html'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching app shell and static resources');
      return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[Service Worker] Removing old cache', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(e.request).then((networkResponse) => {
        // Only cache local requests successfully fetched (excluding chrome extensions, external APIs, etc.)
        if (
          networkResponse &&
          networkResponse.status === 200 &&
          e.request.url.startsWith(self.location.origin)
        ) {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, networkResponse.clone());
            return networkResponse;
          });
        }
        return networkResponse;
      }).catch(() => {
        // Fallback for document navigation when offline
        if (e.request.mode === 'navigate') {
          return caches.match('/index.html');
        }
      });
    })
  );
});
