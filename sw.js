const CACHE_NAME = 'kids-hub-v5';
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
  '/apps/alphabet/',
  '/apps/numbers/',
  '/apps/spelling/',
  '/apps/shapes/',
  '/apps/coloring/'
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
  // Bypass service worker for range requests or audio/video assets
  if (
    e.request.headers.get('range') ||
    e.request.url.includes('.mp3') ||
    e.request.url.includes('.wav') ||
    e.request.destination === 'audio' ||
    e.request.destination === 'video'
  ) {
    return;
  }

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
