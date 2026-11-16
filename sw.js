const CACHE_NAME = 'meow-code-app-v3';
const PRECACHE = [
  './',
  './index.html',
  './manifest.json',

  // CodeMirror
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.13/codemirror.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.13/theme/abbott.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.13/codemirror.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.13/mode/xml/xml.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.13/mode/javascript/javascript.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.13/mode/css/css.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.13/mode/htmlmixed/htmlmixed.min.js',

  // Beautify
  'https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.14.9/beautify.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/js-beautify/1.14.9/beautify-html.min.js',

  // PDF
  'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js',

  // Google Fonts (hoja de estilos; las woff2 se cachean en runtime)
  'https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;900&display=swap'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache =>
        // addAll falla entero si UNA falla → usamos add individual con catch
        Promise.all(PRECACHE.map(url =>
          cache.add(url).catch(err => console.warn('No precacheado:', url, err))
        ))
      )
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('message', (e) => {
  if (e.data === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', (e) => {
  const req = e.request;

  if (req.method !== 'GET') return;
  if (req.url.startsWith('blob:') || req.url.startsWith('data:')) return;
  if (req.url.startsWith('chrome-extension://')) return;
  if (req.url.startsWith('moz-extension://')) return;
  if (req.url.startsWith('safari-extension://')) return;
  if (req.headers.get('range')) return;

  // 🔁 Estrategia:
  //  - Navegación → network-first con fallback a index.html cacheado
  //  - Assets → cache-first con actualización en background
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then(res => {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(c => c.put('./index.html', clone)).catch(() => {});
          return res;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  e.respondWith(
    caches.match(req).then(cached => {
      if (cached) return cached;
      return fetch(req).then(res => {
        // Aceptamos respuestas básicas, CORS y opacas (fuentes, imágenes sin CORS)
        const cacheable =
          res && (
            res.status === 200 ||
            res.type === 'opaque' ||
            res.type === 'cors'
          );
        if (cacheable) {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(req, clone)).catch(() => {});
        }
        return res;
      }).catch(() => {
        // ⚠️ NO devolver index.html para scripts/img → solo fallback a index si navegación
        return caches.match('./index.html');
      });
    })
  );
});
