const urlsToCache = [
  'manifest.json'
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
  console.log("requesting :",event.request.url);
  event.respondWith( async function() {
    const response = await caches.match(event.request);
    console.log("loading from cache :", response);
    return response || fetch(event.request);
  }());
});
