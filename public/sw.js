const urlsToCache = [
  '/',
  '/todos'
];
const cacheName = 'pages-cache-v2';

self.addEventListener('install', function(event) {
  event.waitUntil(async function() {
    const cache = await caches.open(cacheName);
    await cache.addAll(urlsToCache);
  });
});

self.addEventListener('activate', function(event) {
  //perform some task
  event.waitUntil(async function() {
    caches.delete('pages-cache-v1');
  }());
  console.log('Service worker is activated.');
  //do something
});

self.addEventListener('fetch', (event) => {
  event.respondWith(async function() {
    try {
      return await fetch(event.request)
        .then( function(response) {
          event.waitUntil(
            caches.open(cacheName)
            .then(cache => {
              return cache.addAll(urlsToCache);
            })
          )
          return response;
        });
    } catch (err) {
      console.log('cache loaded');
      return caches.match(event.request);
    }
  }());
});
