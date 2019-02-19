const urlsToCache = [
  '/',
  '/todos'
];
const cacheName = 'pages-cache-v2';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName)
    .then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('activate', function(event) {
  //perform some task
  event.waitUntil(async function() {
    caches.delete('pages-cache-v1');
  }());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(caches.match(event.request))
});
