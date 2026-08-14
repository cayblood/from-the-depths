import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { blogPlugin } from "./vite-plugins/blog-plugin.ts";
import { mdxPlugin } from "./vite-plugins/mdx-plugin.ts";

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
    tailwindcss(),
    blogPlugin(),
    mdxPlugin(),
  ] as import("vite").PluginOption[],
  resolve: {
    tsconfigPaths: true,
    alias: {
      "~": resolve(__dirname, "./src"),
    },
  },
});
