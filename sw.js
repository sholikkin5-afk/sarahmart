const CACHE_NAME = 'sarahmart-v2'; // Ganti angka ne saben update. v1 -> v2 -> v3
const urlsToCache = [
  './',
  './index.html',
  './logo.jpg',
  './manifest.json',
  './icon-192.png'
];

// 1. INSTAL: Simpen file baru
self.addEventListener('install', event => {
  self.skipWaiting(); // Langsung aktif, gak usah nunggu
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// 2. AKTIF: Hapus cache lawas
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName); // Hapus v1 pas wes onok v2
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. FETCH: Ambil dari internet disek, lek gagal baru ambil dari cache
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
self.addEventListener('waiting', (event) => {
  // Ben gak auto kirim "update" tiap reload
  self.skipWaiting(); 
});