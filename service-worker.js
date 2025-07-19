const CACHE_NAME = 'glowhorn-pwa-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/JournalComponent.html',
  '/HabitTracker.html',
  '/UnicornJournalWithGlow.html',
  '/UnicornJournalStoic.html',
  '/HabitTrackerWithStardust.html',
  '/UnicornGlowEncourage.html',
  '/unicorn.svg',
  '/manifest.json'
  // Add other files here, e.g. CSS/JS if split out
];

// Install SW and cache files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Activate SW and clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
});

// Serve cached files when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
