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
    `;
};
