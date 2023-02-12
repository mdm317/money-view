export const generateSw = ({
  cacheName,
  contentToCache,
}: {
  cacheName: string;
  contentToCache: string[];
}) => {
  const contentToCacheStr = `[${contentToCache
    .map((content) => `"${content}"`)
    .join(",")}]`;
  return `
    self.addEventListener("install", (e) => {
        console.log("[Service Worker] Install");
        e.waitUntil(
          (async () => {
            const cache = await caches.open("${cacheName}");
            console.log("[Service Worker] Caching all: app shell and content");
            await cache.addAll(${contentToCacheStr});
          })()
        );
      });
      self.addEventListener('fetch', function(event) {
        event.respondWith(async function() {
           try{
             var res = await fetch(event.request);
             var cache = await caches.open("${cacheName}");
             cache.put(event.request.url, res.clone());
             return res;
           }
           catch(error){
             return caches.match(event.request);
            }
          }());
      });
    `;
};
