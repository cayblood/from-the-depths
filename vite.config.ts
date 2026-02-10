import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { blogPlugin } from "./vite-plugins/blog-plugin";
import { mdxPlugin } from "./vite-plugins/mdx-plugin";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    tanstackStart({
      prerender: {
        enabled: true,
        crawlLinks: true,
        autoSubfolderIndex: true,
        failOnError: true,
        filter: (page: { path: string }) => !page.path.includes("?"),
      },
    }),
    react(),
    blogPlugin(),
    mdxPlugin(),
    tsconfigPaths(),
  ] as import("vite").PluginOption[],
  resolve: {
    alias: {
      "~": resolve(__dirname, "./src"),
    },
  },
});
