"use strict";

const CACHE_NAME = "saintjo-map-static-v1";
const BASE = new URL("./", self.location.href);
const STATIC_FILES = [
  "./",
  "index.html",
  "site.webmanifest",
  "vendor/leaflet/leaflet.css",
  "vendor/leaflet/leaflet.js",
  "assets/local-commerce.webp",
  "assets/local-food.webp",
  "assets/local-services.webp",
  "assets/saint-joseph-cote.webp",
  "assets/saint-joseph-identite.webp",
  "assets/saint-joseph-panorama.webp",
  "data/site-data.json",
  "data/tourism-places.json",
  "data/verified-places.json",
  "data/reunion-land.geojson",
  "data/saint-joseph-roads.geojson"
].map(path => new URL(path, BASE).href);

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_FILES)));
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  const requestUrl = new URL(event.request.url);
  if (requestUrl.origin !== self.location.origin) return;

  const isData = /\.(json|geojson)$/.test(requestUrl.pathname);
  if (isData) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request)));
});
