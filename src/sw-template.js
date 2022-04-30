/* eslint-disable no-restricted-globals */
/* eslint-disable prefer-regex-literals */
/* eslint-disable no-undef */

importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js')
// This is import from the cdn line 5
workbox.loadModule('workbox-background-sync')
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST)

const { registerRoute } = workbox.routing
const { CacheFirst, NetworkFirst, NetworkOnly } = workbox.strategies
const { BackgroundSyncPlugin } = workbox.backgroundSync

const cacheNetworkFirst = [
  '/api/auth/renew',
  '/api/events'
]

// First look for the request in the network, then look in the cache
registerRoute(
  ({ request, url }) => {
    if (cacheNetworkFirst.includes(url.pathname)) return true
    return false
  },
  new NetworkFirst()
)

// First look for the request in the cache, then try the network
const cacheFirstLibrary = [
  'https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css'
]

registerRoute(
  ({ request, url }) => {
    if (cacheFirstLibrary.includes(url.href)) return true
    return false
  },
  new CacheFirst()
)

// Offline posts
const bgSyncPlugin = new BackgroundSyncPlugin('offline-posts', {
  maxRetentionTime: 24 * 60 // Retry for max of 24 Hours (specified in minutes)
})

registerRoute(
  new RegExp('http://localhost:4000/api/events'),
  new NetworkOnly({
    plugins: [bgSyncPlugin]
  }),
  'POST'
)

registerRoute(
  new RegExp('http://localhost:4000/api/events/'), // End with /
  new NetworkOnly({
    plugins: [bgSyncPlugin]
  }),
  'DELETE'
)

registerRoute(
  new RegExp('http://localhost:4000/api/events/'), // End with /
  new NetworkOnly({
    plugins: [bgSyncPlugin]
  }),
  'PUT'
)
