import { generateSw } from "./generageSw";
import * as fs from "fs";
import * as path from "path";

let assetFiles = [];
const getFilesRecursively = async (directory) => {
  const filesInDirectory = await fs.readdirSync(directory);
  for (const file of filesInDirectory) {
    const absolute = path.join(directory, file);
    if (fs.statSync(absolute).isDirectory()) {
      getFilesRecursively(absolute);
    } else {
      assetFiles.push(absolute);
    }
  }
};

export const pwaPlugin = () => {
  return {
    name: "vite-pwa-build",
    apply: "build" as any,
    transformIndexHtml(html) {
      return html.replace(
        "</head>",
        `
    <script type="module" crossorigin src="/registerSW.js"></script>
      <link rel="manifest" href="/manifest.webmanifest" />
      </head>`
      );
    },
    async generateBundle(_, bundle) {
      // const res = await fs.readdirSync(path.resolve(__dirname, "../public"));
      // console.log(res);
      await getFilesRecursively(path.resolve(__dirname, "../public"));
      console.log(assetFiles);

      const cacheList = assetFiles.map((absolutePath) =>
        absolutePath.slice(absolutePath.indexOf("public") + 7)
      );
      cacheList.push("index.html");

      bundle["sw.js"] = {
        isAsset: true,
        type: "asset",
        name: undefined,
        source: generateSw({
          cacheName: "mv-pwa",
          contentToCache: Object.keys(bundle).concat(cacheList),
        }).replace(/\n/g, ""),
        fileName: "sw.js",
      };
    },
  };
};
