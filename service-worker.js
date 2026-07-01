const CACHE_NAME = 'indonesia-travel-v13';
const PRECACHE = [
  ".nojekyll",
  "SPRINT3_1_REPORT.txt",
  "V11_SPRINT1_REPORT.json",
  "amsterdam-jakarta.html",
  "berastagi.html",
  "bukit-lawang.html",
  "bukittinggi.html",
  "bunaken.html",
  "danau-poso.html",
  "gorontalo.html",
  "harau-valley.html",
  "index.html",
  "jakarta.html",
  "kerinci.html",
  "ketambe.html",
  "lake-toba.html",
  "lembeh.html",
  "manado.html",
  "map.html",
  "photo-01.jpg",
  "photo-02.jpg",
  "photo-03.jpg",
  "photo-04.jpg",
  "photo-05.jpg",
  "photo-06.jpg",
  "photo-07.jpg",
  "photo-08.jpg",
  "photo-09.jpg",
  "photo-10.jpg",
  "photo-11.jpg",
  "photo-12.jpg",
  "photo-13.jpg",
  "photo-14.jpg",
  "photo-15.jpg",
  "photo-16.jpg",
  "photo-17.jpg",
  "photo-18.jpg",
  "photo-19.jpg",
  "rammang-rammang.html",
  "sipirok.html",
  "styles.css",
  "tana-toraja.html",
  "tangkoko.html",
  "terugreis.html",
  "togian.html",
  "tomohon.html",
  "verblijf.html",
  "vluchten.html",
  "weer.html",
  "icon.svg",
  "maskable-icon.svg",
  "manifest.json",
  "offline.html"
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  if (url.hostname.includes('open-meteo.com') || url.hostname.includes('tile.openstreetmap.org') || url.hostname.includes('opentopomap.org') || url.hostname.includes('arcgisonline.com') || url.hostname.includes('unpkg.com')) {
    event.respondWith(fetch(req).catch(() => caches.match(req)));
    return;
  }

  event.respondWith(
    caches.match(req).then(cached => cached || fetch(req).then(res => {
      const copy = res.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
      return res;
    }).catch(() => caches.match('offline.html')))
  );
});
