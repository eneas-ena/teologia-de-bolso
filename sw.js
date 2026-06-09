// sw.js — service worker mínimo do Teólogo de Bolso PRO
// Mantém o app instalável na tela inicial. Não guarda respostas em cache
// (elas sempre vêm atualizadas do servidor), apenas os arquivos básicos.

const CACHE = "tbp-v1";
const BASICOS = ["./", "index.html", "manifest.json", "icon-192.png", "icon-512.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(BASICOS)).catch(() => {}));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  // Chamadas ao servidor (/api/...) nunca passam pelo cache.
  if (url.pathname.startsWith("/api/")) return;
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request).then((hit) => hit || fetch(e.request).catch(() => caches.match("index.html")))
  );
});
