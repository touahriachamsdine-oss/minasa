const CACHE_NAME = 'moubadara-v1';
const ASSETS = [
    './',
    './index.html',
    './dashboard.html',
    './styles.css',
    './app.js',
    './particles.js',
    './supabase.js',
    './auth.js',
    './db.js',
    'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
    );
});

self.addEventListener('fetch', event => {
    // Strategy: Network First, Fallback to Cache
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});
