import { useEffect, useMemo, useState, type ComponentType } from "react";
import { useParams, Link, Navigate, type MetaFunction } from "react-router";
import blogIndexData from "~/generated/blog-index.json";
import slugMappingData from "~/generated/blog-slugs.json";
import { formatDate } from "~/lib/blog";
import { Sidebar } from "~/components/Sidebar";
import { mdxComponents } from "~/lib/mdx-components";
import { generateBlogPostMeta, generateBlogPostSchema } from "~/lib/seo";
import type { BlogIndex } from "~/lib/blog";

const blogIndex = blogIndexData as BlogIndex;
const slugMapping = slugMappingData as Record<string, string>;

// Import all MDX files from content/posts using Vite's glob import
// The eager: false makes this a lazy import for code splitting
const mdxModules = import.meta.glob<{
  default: ComponentType<{ components?: Record<string, ComponentType> }>;
  frontmatter?: Record<string, unknown>;
}>("/content/posts/*.mdx");

export const meta: MetaFunction = ({ params }) => {
  const { slug } = params;
  const post = blogIndex.posts.find((p) => p.slug === slug);

  if (!post) {
    return [
      { title: "Post Not Found - From the Depths" },
      { name: "description", content: "The requested blog post could not be found." },
    ];
  }

  const metaTags = generateBlogPostMeta(post);
  const schema = generateBlogPostSchema(post);

  return [...metaTags, { "script:ld+json": schema }];
};

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [MDXContent, setMDXContent] = useState<ComponentType<{
    components?: Record<string, ComponentType>;
  }> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const post = useMemo(() => {
    return blogIndex.posts.find((p) => p.slug === slug);
  }, [slug]);

  // Load the MDX content dynamically
  useEffect(() => {
    if (!slug || !post) return;

    const filename = slugMapping[slug];
    if (!filename) {
      setError(`No MDX file found for slug: ${slug}`);
      setIsLoading(false);
      return;
    }

    const modulePath = `/content/posts/${filename}.mdx`;
    const loader = mdxModules[modulePath];

    if (!loader) {
      setError(`MDX module not found: ${modulePath}`);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    loader()
      .then((module) => {
        setMDXContent(() => module.default);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load MDX:", err);
        setError(`Failed to load content: ${err.message}`);
        setIsLoading(false);
      });
  }, [slug, post]);

  if (!post) {
    return <Navigate to="/" replace />;
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
                      to={`/?tag=${encodeURIComponent(tag)}`}
                      className="px-2 py-0.5 bg-[#3e2427] text-[#d8bbbe] rounded text-xs hover:bg-[#603d41] transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              )}
            </header>

            <div className="prose prose-invert max-w-none text-[#d8bbbe]">
              {isLoading && <p className="text-[#d8bbbe] opacity-75">Loading content...</p>}
              {error && <p className="text-red-400">Error: {error}</p>}
              {MDXContent && !isLoading && !error && <MDXContent components={mdxComponents} />}
            </div>
          </article>
        </div>
        <Sidebar />
      </div>
    </main>
  );
}
