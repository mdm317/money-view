import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { fileURLToPath, URL } from "url";
import { pwaPlugin } from "./pwaPlugin/myPlugin";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr(), pwaPlugin()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
