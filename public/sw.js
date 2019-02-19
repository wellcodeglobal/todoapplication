const urlsToCache = [
  '/',
  '/todos'
];
const cacheName = 'pages-cache-v2';

self.addEventListener('install', function(event) {
  console.log('Installed hit');
  event.waitUntil(async function() {
    console.log('Installed hit inside event waituntil');
    const cache = await caches.open(cacheName);
    await cache.addAll(urlsToCache);
    // console.log('Service worker installed.');
  });
});

self.addEventListener('activate', function(event) {
  //perform some task
  event.waitUntil(async function() {
    caches.delete('pages-cache-v1');

    // const cache = await caches.open(cacheName);
    // await cache.addAll(urlsToCache);
    // console.log('Service worker installed.');
  }());
  console.log('Service worker is activated.');
  //do something
});


// Promise.race is no good to us because it rejects if
// // a promise rejects before fulfilling. Let's make a proper
// // race function:
// function promiseAny(promises) {
  // console.log("promis", promises);
  // return new Promise((resolve, reject) => {
    // promises.forEach(p => console.log('Output :' + p));
    // // make sure promises are all promises
    // promises = promises.map(p => Promise.resolve(p));
    // // resolve this promise as soon as one resolves
    // promises.forEach(p => p.then(resolve));
    // // reject if all promises reject

    // promises.reduce((a, b) => a.catch(() => b))
      // .catch(() => reject(Error("All failed")));
  // });
// };


self.addEventListener('fetchz', (event) => {
  // try {
    event.respondWith(
      promiseAny([
        caches.match(event.request),
        fetch(event.request)
      ])
    );
  // } catch(err) {
    // console.log('Error : ', err);
  // } finally {
    // console.log(event.request.url)
  // };
});

