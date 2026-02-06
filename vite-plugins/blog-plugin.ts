import type { Plugin } from "vite";
import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import RSS from "rss";
import {
  extractSlugFromFilename,
  extractDateFromFilename,
  extractPreview,
  parseKeywords,
  generateTagFrequency,
  type BlogPost,
  type BlogIndex,
  type BlogPages,
  type BlogTags,
} from "../app/lib/blog.js";
import { contentToHtml } from "../app/lib/content-to-html.js";

export interface SlugMapping {
  [slug: string]: string; // slug -> filename (without extension)
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const POSTS_DIR = join(__dirname, "../content/posts");
const GENERATED_DIR = join(__dirname, "../app/generated");
const RSS_OUTPUT = join(__dirname, "../public/rss.xml");
const POSTS_PER_PAGE = 10;

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
      const { data, content } = matter(fileContent);

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
      feed_url: "https://youngbloods.org/rss.xml",
      site_url: "https://youngbloods.org",
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
                url: `https://youngbloods.org${post.defaultImage}`,
                type: "image/jpeg",
              },
            },
          ],
        });
      }
      feed.item({
        title: post.title,
        description: post.description || post.preview || "",
        url: `https://youngbloods.org/blog/${post.slug}`,
        guid: post.slug,
        date: new Date(post.datePublished),
        categories: post.tags,
        custom_elements: customElements,
      });
    }

    await writeFile(RSS_OUTPUT, feed.xml({ indent: true }));

    console.log(`✓ Processed ${posts.length} blog posts`);
  } catch (error) {
    console.error("Error processing blog posts:", error);
    throw error;
  }
}

export function blogPlugin(): Plugin {
  let isServerStarted = false;

  return {
    name: "blog-plugin",
    buildStart: async () => {
      await processBlogPosts();
    },
    configureServer: async () => {
      if (!isServerStarted) {
        isServerStarted = true;
        await processBlogPosts();
      }
    },
    handleHotUpdate: async ({ file }: { file: string }) => {
      if (file.includes("content/posts/") && file.endsWith(".mdx")) {
        await processBlogPosts();
      }
    },
  };
}
