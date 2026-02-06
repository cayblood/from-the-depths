import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import type { Plugin } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { blogPlugin } from "./vite-plugins/blog-plugin";
import { mdxPlugin } from "./vite-plugins/mdx-plugin";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { copyFileSync, existsSync } from "node:fs";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Plugin to ensure index.html is copied to build output
function ensureIndexHtml(): Plugin {
  return {
    name: "ensure-index-html",
    closeBundle() {
      const indexPath = resolve(__dirname, "index.html");
      const outputPath = resolve(__dirname, "dist/client/index.html");
      
      if (existsSync(indexPath) && !existsSync(outputPath)) {
        copyFileSync(indexPath, outputPath);
        console.log("✓ Copied index.html to dist/client");
      }
    },
  };
}

export default defineConfig({
  build: { outDir: "dist/client" },
  plugins: [
    reactRouter(),
    blogPlugin(),
    mdxPlugin(),
    tsconfigPaths(),
    ensureIndexHtml(),
  ] as import("vite").PluginOption[],
  resolve: {
    alias: {
      "~": resolve(__dirname, "./app"),
    },
  },
});
