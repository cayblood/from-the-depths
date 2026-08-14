import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import RSS from "rss";
import type { Plugin } from "vite";
import { parse } from "yaml";
import {
  type BlogIndex,
  type BlogPages,
  type BlogPost,
  type BlogTags,
  extractDateFromFilename,
  extractPreview,
  extractSlugFromFilename,
  generateTagFrequency,
  parseKeywords,
  stripMdxTags,
} from "../src/lib/blog.js";
import { contentToHtml } from "../src/lib/content-to-html.js";

export interface SlugMapping {
  [slug: string]: string; // slug -> filename (without extension)
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const POSTS_DIR = join(__dirname, "../content/posts");
const GENERATED_DIR = join(__dirname, "../src/generated");
const PUBLIC_DIR = join(__dirname, "../public");
const RSS_OUTPUT = join(PUBLIC_DIR, "rss.xml");
const SITEMAP_OUTPUT = join(PUBLIC_DIR, "sitemap.xml");
const LLMS_OUTPUT = join(PUBLIC_DIR, "llms.txt");
const LLMS_FULL_OUTPUT = join(PUBLIC_DIR, "llms-full.txt");
const POSTS_PER_PAGE = 10;
const SITE_URL = "https://blog.youngbloods.org";

interface Frontmatter {
  datePublished?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  defaultImage?: string;
  keywords?: string | string[];
  tags?: string[];
}

function parseFrontmatter(source: string): { data: Frontmatter; content: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(source);
  if (!match) return { data: {}, content: source };

  return {
    data: parse(match[1], { schema: "yaml-1.1" }) as Frontmatter,
    content: source.slice(match[0].length),
  };
}

async function processBlogPosts(): Promise<void> {
  try {
    // Ensure generated directory exists
    await mkdir(GENERATED_DIR, { recursive: true });

    // Read all MDX files from posts directory
    const files = await readdir(POSTS_DIR);
    const mdxFiles = files.filter((file) => file.endsWith(".mdx"));

    if (mdxFiles.length === 0) {
      console.warn("No MDX files found in content/posts/");
      // Create empty index files
      await writeFile(
        join(GENERATED_DIR, "blog-index.json"),
        JSON.stringify({ posts: [] }, null, 2)
      );
      await writeFile(
        join(GENERATED_DIR, "blog-pages.json"),
        JSON.stringify({ pages: [], totalPages: 0, postsPerPage: POSTS_PER_PAGE }, null, 2)
      );
      await writeFile(
        join(GENERATED_DIR, "blog-tags.json"),
        JSON.stringify({ tags: {}, sortedTags: [] }, null, 2)
      );
      await writeFile(
        RSS_OUTPUT,
        '<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"></rss>'
      );
      return;
    }

    // Process each MDX file
    const posts: BlogPost[] = [];

    for (const filename of mdxFiles) {
      const filePath = join(POSTS_DIR, filename);
      const fileContent = await readFile(filePath, "utf-8");
      const { data, content } = parseFrontmatter(fileContent);

      // Extract slug from filename
      const slug = extractSlugFromFilename(filename);

      // Extract date from filename (fallback to front matter)
      const dateFromFilename = extractDateFromFilename(filename);
      const datePublished =
        data.datePublished || dateFromFilename || new Date().toISOString().split("T")[0];

      // Extract preview
      const { preview, full } = extractPreview(content);

      // Build post object
      const post: BlogPost = {
        slug,
        filename,
        datePublished,
        title: data.title || slug,
        subtitle: data.subtitle,
        description: data.description || "",
        defaultImage: data.defaultImage,
        keywords: parseKeywords(data.keywords),
        tags: Array.isArray(data.tags) ? data.tags : [],
        content: full,
        preview: preview !== full ? preview : undefined,
      };

      posts.push(post);
    }

    // Sort posts by date (newest first)
    posts.sort((a, b) => {
      const dateA = new Date(a.datePublished).getTime();
      const dateB = new Date(b.datePublished).getTime();
      return dateB - dateA;
    });

    // Generate blog index
    const blogIndex: BlogIndex = { posts };
    await writeFile(join(GENERATED_DIR, "blog-index.json"), JSON.stringify(blogIndex, null, 2));

    // Generate pagination data
    const pages: BlogPost[][] = [];
    for (let i = 0; i < posts.length; i += POSTS_PER_PAGE) {
      pages.push(posts.slice(i, i + POSTS_PER_PAGE));
    }
    const blogPages: BlogPages = {
      pages,
      totalPages: pages.length,
      postsPerPage: POSTS_PER_PAGE,
    };
    await writeFile(join(GENERATED_DIR, "blog-pages.json"), JSON.stringify(blogPages, null, 2));

    // Generate tag frequency data
    const tagFrequency = generateTagFrequency(posts);
    const sortedTags = Object.entries(tagFrequency)
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count);
    const blogTags: BlogTags = {
      tags: tagFrequency,
      sortedTags,
    };
    await writeFile(join(GENERATED_DIR, "blog-tags.json"), JSON.stringify(blogTags, null, 2));

    // Generate slug to filename mapping for MDX imports
    const slugMapping: SlugMapping = {};
    for (const post of posts) {
      // Store filename without .mdx extension
      slugMapping[post.slug] = post.filename.replace(/\.mdx$/, "");
    }
    await writeFile(join(GENERATED_DIR, "blog-slugs.json"), JSON.stringify(slugMapping, null, 2));

    // Generate RSS feed
    await mkdir(dirname(RSS_OUTPUT), { recursive: true });
    const feed = new RSS({
      title: "From the Depths Blog",
      description: "Blog posts from From the Depths",
      feed_url: `${SITE_URL}/rss.xml`,
      site_url: SITE_URL,
      language: "en",
      pubDate: new Date().toUTCString(),
      custom_namespaces: {
        media: "http://search.yahoo.com/mrss/",
      },
    });

    for (const post of posts) {
      const fullHtml = contentToHtml(post.content);
      const customElements: Array<Record<string, unknown>> = [
        { "content:encoded": [{ _cdata: fullHtml }] },
      ];
      if (post.defaultImage) {
        customElements.push({
          "media:content": [
            {
              _attr: {
                url: `${SITE_URL}${post.defaultImage}`,
                type: "image/jpeg",
              },
            },
          ],
        });
      }
      feed.item({
        title: post.title,
        description: post.description || post.preview || "",
        url: `${SITE_URL}/${post.slug}`,
        guid: post.slug,
        date: new Date(post.datePublished),
        categories: post.tags,
        custom_elements: customElements,
      });
    }

    await writeFile(RSS_OUTPUT, feed.xml({ indent: true }));

    // Generate llms.txt (structured index for AI crawlers)
    const llmsLines = [
      "# From the Depths",
      "",
      "> Blog and personal website of Carl Youngblood - software engineer, tech entrepreneur, philosopher and amateur musician.",
      "",
      `## Blog Posts`,
      "",
      ...posts.map(
        (post) => `- [${post.title}](${SITE_URL}/${post.slug}): ${post.description || post.title}`
      ),
      "",
      "## Links",
      "",
      `- [RSS Feed](${SITE_URL}/rss.xml)`,
      `- [All Tags](${SITE_URL}/tags)`,
      `- [Full Content for LLMs](${SITE_URL}/llms-full.txt)`,
      "",
    ];
    await writeFile(LLMS_OUTPUT, llmsLines.join("\n"));

    // Generate llms-full.txt (full content of every post for bulk AI ingestion)
    const llmsFullLines = [
      "# From the Depths - Full Content",
      "",
      "> Complete content of all blog posts for AI indexing.",
      "",
    ];
    for (const post of posts) {
      llmsFullLines.push(`---`);
      llmsFullLines.push("");
      llmsFullLines.push(`## ${post.title}`);
      if (post.subtitle) llmsFullLines.push(`### ${post.subtitle}`);
      llmsFullLines.push("");
      llmsFullLines.push(`**Date:** ${post.datePublished}`);
      if (post.tags && post.tags.length > 0) {
        llmsFullLines.push(`**Tags:** ${post.tags.join(", ")}`);
      }
      llmsFullLines.push(`**URL:** ${SITE_URL}/${post.slug}`);
      llmsFullLines.push("");
      llmsFullLines.push(stripMdxTags(post.content));
      llmsFullLines.push("");
    }
    await writeFile(LLMS_FULL_OUTPUT, llmsFullLines.join("\n"));

    // Generate sitemap.xml
    const sitemapUrls = [
      { loc: SITE_URL, changefreq: "weekly", priority: "1.0" },
      { loc: `${SITE_URL}/tags`, changefreq: "weekly", priority: "0.5" },
      ...posts.map((post) => ({
        loc: `${SITE_URL}/${post.slug}`,
        lastmod: new Date(post.datePublished).toISOString().split("T")[0],
        changefreq: "monthly" as const,
        priority: "0.8",
      })),
      ...Array.from({ length: pages.length - 1 }, (_, i) => ({
        loc: `${SITE_URL}/page/${i + 2}`,
        changefreq: "weekly" as const,
        priority: "0.4",
      })),
    ];
    const sitemapXml = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      ...sitemapUrls.map(
        (url) =>
          `  <url>\n    <loc>${url.loc}</loc>${
            "lastmod" in url ? `\n    <lastmod>${url.lastmod}</lastmod>` : ""
          }\n    <changefreq>${url.changefreq}</changefreq>\n    <priority>${url.priority}</priority>\n  </url>`
      ),
      "</urlset>",
    ];
    await writeFile(SITEMAP_OUTPUT, sitemapXml.join("\n"));

    console.log(`✓ Processed ${posts.length} blog posts`);
  } catch (error) {
    console.error("Error processing blog posts:", error);
    throw error;
  }
}

export function blogPlugin(): Plugin {
  let isServerStarted = false;
  let serverRef: {
    watcher: { add: (path: string) => void };
    ws: { send: (payload: { type: string; path?: string }) => void };
  } | null = null;

  return {
    name: "blog-plugin",
    buildStart: async () => {
      await processBlogPosts();
    },
    configureServer: async (server) => {
      server.watcher.add(POSTS_DIR);
      serverRef = server;
      if (!isServerStarted) {
        isServerStarted = true;
        await processBlogPosts();
      }
    },
    handleHotUpdate: async ({ file }: { file: string }) => {
      if (file.includes("content/posts") && file.endsWith(".mdx")) {
        await processBlogPosts();
        serverRef?.ws.send({ type: "full-reload", path: "*" });
      }
    },
  };
}
