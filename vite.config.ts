import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { blogPlugin } from "./vite-plugins/blog-plugin";
import { mdxPlugin } from "./vite-plugins/mdx-plugin";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: { outDir: "dist/client" },
  plugins: [
    reactRouter(),
    blogPlugin(),
    mdxPlugin(),
    tsconfigPaths(),
  ] as import("vite").PluginOption[],
  resolve: {
    alias: {
      "~": resolve(__dirname, "./app"),
    },
  },
});
