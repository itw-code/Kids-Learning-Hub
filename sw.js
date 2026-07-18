const CACHE_NAME = 'kids-hub-v7';

// Standalone variable to hold manifest list for injected assets
const injectManifestList = self.__WB_MANIFEST;

// Extract precache asset URLs compiled by Vite
const precachedAssets = (injectManifestList || []).map((entry) => {
  return typeof entry === 'string' ? entry : entry.url;
});

// Manual entry points for legacy sub-apps
const MANUAL_ASSETS = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/apps/coloring/'
];

// Combine all unique assets to populate the offline cache
const ALL_ASSETS = [...new Set([...precachedAssets, ...MANUAL_ASSETS])];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching all assets offline (Vanilla)');
      return Promise.allSettled(
        ALL_ASSETS.map((asset) =>
          cache.add(asset).catch((err) =>
            console.warn(`[Service Worker] Failed to cache asset: ${asset}`, err)
          )
        )
      );
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[Service Worker] Removing old cache:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  // Safari Range requests bypass (critical for HTML5 audio/video elements playback)
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
        // Cache successful local requests dynamically
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
        // Client side routing navigation fallback for clean URLs
        if (e.request.mode === 'navigate') {
          return caches.match('/index.html');
        }
      });
    })
  );
});
