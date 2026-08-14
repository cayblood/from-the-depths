import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { type ComponentType, useMemo } from "react";
import { Sidebar } from "~/components/Sidebar";
import blogIndexData from "~/generated/blog-index.json";
import slugMappingData from "~/generated/blog-slugs.json";
import type { BlogIndex } from "~/lib/blog";
import { formatDate } from "~/lib/blog";
import { mdxComponents } from "~/lib/mdx-components";
import { generateBlogPostHead } from "~/lib/seo";

const blogIndex = blogIndexData as BlogIndex;
const slugMapping = slugMappingData as Record<string, string>;

// Import all MDX files from content/posts using Vite's glob import
// Using eager: true so MDX content is available during prerendering for SSG
const mdxModules = import.meta.glob<{
  default: ComponentType<{ components?: Record<string, ComponentType> }>;
  frontmatter?: Record<string, unknown>;
}>("/content/posts/*.mdx", { eager: true });

export const Route = createFileRoute("/$slug")({
  loader: ({ params }) => {
    const { slug } = params;
    const post = blogIndex.posts.find((p) => p.slug === slug);

    if (!post) {
      throw redirect({ to: "/" });
    }

    const filename = slugMapping[slug];
    if (!filename) {
      throw redirect({ to: "/" });
    }

    const modulePath = `/content/posts/${filename}.mdx`;
    const module = mdxModules[modulePath];

    if (!module) {
      return { filename: null, error: `MDX module not found: ${modulePath}` };
    }

    return { filename, error: null };
  },
  head: ({ params }) => {
    const post = blogIndex.posts.find((p) => p.slug === params.slug);
    if (!post) {
      return {
        meta: [
          { title: "Post Not Found - From the Depths" },
          { name: "description", content: "The requested blog post could not be found." },
        ],
      };
    }
    const headConfig = generateBlogPostHead(post);
    return {
      meta: headConfig.meta,
      scripts: headConfig.scripts,
    };
  },
  component: BlogPostPage,
});

function BlogPostPage() {
  const { slug } = Route.useParams();
  const { filename, error } = Route.useLoaderData();

  const post = useMemo(() => {
    return blogIndex.posts.find((p) => p.slug === slug);
  }, [slug]);

  const MDXContent = useMemo(() => {
    if (!filename) return null;
    const modulePath = `/content/posts/${filename}.mdx`;
    const module = mdxModules[modulePath];
    return module?.default ?? null;
  }, [filename]);

  if (!post) {
    return null;
  }

  return (
    <main className="bg-[rgb(96,61,65)] px-6 pt-4 md:px-12 lg:pt-8 pb-12">
      <div className="flex flex-col lg:flex-row">
        <div id="main-content" className="grow lg:mr-12">
          <Link
            to="/"
            className="text-[#d8bbbe] underline hover:text-white transition-colors mb-10 inline-block"
          >
            ← Back to home
          </Link>

          <article>
            <header className="mb-8">
              <h1 className="post-title text-4xl mb-1 text-[#f5e6e7]">{post.title}</h1>
              {post.subtitle && <p className="subtitle">{post.subtitle}</p>}
              <div className="text-sm text-[#d8bbbe] opacity-75 mb-4">
                <time dateTime={post.datePublished}>{formatDate(post.datePublished)}</time>
              </div>
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      to="/"
                      search={{ tag }}
                      className="px-2 py-0.5 bg-[#3e2427] text-[#d8bbbe] rounded text-xs hover:bg-[#603d41] transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              )}
            </header>

            <div className="prose prose-invert max-w-none text-[#d8bbbe]">
              {error && <p className="text-red-400">Error: {error}</p>}
              {MDXContent && !error && <MDXContent components={mdxComponents} />}
            </div>
          </article>
        </div>
        <Sidebar />
      </div>
    </main>
  );
}
