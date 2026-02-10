import type { Config } from "@react-router/dev/config";
import { readFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  ssr: false,
  buildDirectory: "dist",
  async prerender() {
    // Read generated blog data to get all routes
    const blogIndexPath = join(__dirname, "./app/generated/blog-index.json");
    const blogPagesPath = join(__dirname, "./app/generated/blog-pages.json");

    try {
      const blogIndexData = await readFile(blogIndexPath, "utf-8");
      const blogPagesData = await readFile(blogPagesPath, "utf-8");

      const blogIndex = JSON.parse(blogIndexData) as { posts: Array<{ slug: string }> };
      const blogPages = JSON.parse(blogPagesData) as { totalPages: number };

      // Generate all static paths
      // Note: /rss.xml is excluded because it's a static file in public/, not a route to prerender
      const paths: string[] = [
        "/", // Home page
        "/tags", // Tags page
      ];

      // Add all blog post paths
      for (const post of blogIndex.posts) {
        paths.push(`/${post.slug}`);
      }

      // Add paginated page paths
      for (let page = 2; page <= blogPages.totalPages; page++) {
        paths.push(`/page/${page}`);
      }

      return paths;
    } catch (error) {
      console.warn("Could not read blog data for prerendering, using default paths:", error);
      // Fallback to basic paths if blog data isn't available yet
      return ["/", "/tags", "/rss.xml"];
    }
  },
} satisfies Config;
