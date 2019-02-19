const urlsToCache = [
  '/'
];
const urlsToCacheLater = [
  '/todos'
];
const cacheName = 'pages-cache-v2'

self.addEventListener('install', function(event) {
  event.waitUntil(async function() {
    const cache = await caches.open(cacheName);
    cache.addAll(urlsToCacheLater);
    await cache.addAll(urlsToCache);
  });
});

self.addEventListener('activate', function(event) {
  //perform some task
  event.waitUntil(async function() {
    const cacheNames = await caches.keys();
    await Promise.all(
      cacheNames.filter((cacheName) => {
        // Return true if you want to remove this cache,
        // but remember that caches are shared across
        // the whole origin
        console.log('cache deleted');
      }).map(cacheName => caches.delete('pages-cache-v1'))
    );
  }());
  console.log('Service worker is activated.');
  //do something
});

self.addEventListener('fetch', (event) => {
  event.respondWith(async function() {
    try {
      return await fetch(event.request)
        .then( function(response) {
          console.log('event.request', event.request.url)
          event.waitUntil(
            caches.open(cacheName)
            .then(cache => {
              console.log('cache saved');
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
