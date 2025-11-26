// sw.js - Service Worker for offline auto-draw
const CACHE_NAME = 'desktop-app-v1';
const urlsToCache = [
  './',
  './测试.html'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// 定时抽卡功能
self.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'AUTO_DRAW') {
    performAutoDraw();
  }
});

async function performAutoDraw() {
  // 这里可以添加离线抽卡逻辑
  // 由于IndexedDB在Service Worker中访问受限，这里主要是保持定时器运行
  console.log('Auto-draw triggered in Service Worker');
}