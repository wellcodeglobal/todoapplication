const urlsToCache = [
  '/',
  '/todos'
];

self.addEventListener('install', function(event) {
  //perform some task
  console.log('Service worker installing...');
  // I'm a new service worker
  //
  event.waitUntil(
    caches.open('pages-cache-v1')
    .then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('activate', function(event) {
  //perform some task
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
            caches.open('pages-cache-v1')
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
