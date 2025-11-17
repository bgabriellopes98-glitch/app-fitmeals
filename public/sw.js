const CACHE_NAME = 'fitmeals-v1';
const urlsToCache = [
  '/',
];

// Instalação do Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

// Ativação do Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Estratégia de cache: Network First, mas IGNORA requisições do Next.js
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // IGNORA completamente requisições do Next.js e APIs
  if (
    url.pathname.startsWith('/_next/') ||           // Next.js internals
    url.pathname.startsWith('/api/') ||             // API routes
    url.pathname.includes('__nextjs') ||            // Next.js HMR
    url.pathname.includes('webpack-hmr') ||         // HMR
    url.search.includes('_rsc') ||                  // RSC payloads
    event.request.mode === 'navigate' ||            // Navegação (deixa Next.js lidar)
    url.pathname.startsWith('/lasy-bridge.js')      // Lasy bridge
  ) {
    return; // Deixa o navegador lidar normalmente
  }

  // Apenas cacheia assets estáticos (imagens, fontes, etc.)
  if (
    url.pathname.match(/\.(png|jpg|jpeg|svg|gif|webp|woff|woff2|ttf|css|js)$/)
  ) {
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          if (response) {
            return response;
          }
          return fetch(event.request).then((response) => {
            if (!response || response.status !== 200) {
              return response;
            }
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
            return response;
          });
        })
    );
  }
});
