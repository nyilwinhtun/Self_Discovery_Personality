const CACHE_NAME = 'self-discovery-shell-v1'
const SCOPE_URL = new URL('./', self.location.href)
const SHELL_URLS = [
  SCOPE_URL.href,
  new URL('index.html', SCOPE_URL).href,
  new URL('manifest.webmanifest', SCOPE_URL).href,
  new URL('icon.svg', SCOPE_URL).href,
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(SHELL_URLS))
      .catch(() => undefined)
      .then(() => self.skipWaiting()),
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  if (request.method !== 'GET') return

  const url = new URL(request.url)
  if (url.origin !== self.location.origin) return
  if (!url.href.startsWith(SCOPE_URL.href)) return
  if (url.pathname.includes('/@vite') || url.pathname.includes('/@react-refresh') || url.pathname.includes('/src/')) return

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const copy = response.clone()
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy)).catch(() => {})
          }
          return response
        })
        .catch(async () => {
          const cached = await caches.match(request)
          return cached || (await caches.match(new URL('index.html', SCOPE_URL).href)) || (await caches.match(SCOPE_URL.href))
        }),
    )
    return
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      const networkFetch = fetch(request)
        .then((response) => {
          if (response.ok) {
            const copy = response.clone()
            caches.open(CACHE_NAME).then((cache) => cache.put(request, copy)).catch(() => {})
          }
          return response
        })
        .catch(() => cached)

      return cached || networkFetch
    }),
  )
})
