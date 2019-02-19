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
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(event.request);
    const networkResponsePromise = fetch(event.request);

    event.waitUntil(async function() {
      const networkResponse = await networkResponsePromise;
      await cache.put(event.request, networkResponse.clone());
    }());

    // Returned the cached response if we have one, otherwise return the network response.
    return cachedResponse || networkResponsePromise;
  }());
});
