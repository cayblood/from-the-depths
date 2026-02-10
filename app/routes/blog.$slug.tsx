import { useMemo, type ComponentType } from "react";
import { renderToString } from "react-dom/server";
import {
  useParams,
  Link,
  Navigate,
  useLoaderData,
  type MetaFunction,
  type LoaderFunctionArgs,
} from "react-router";
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
// Using eager: true so MDX content is available during prerendering for SSG
const mdxModules = import.meta.glob<{
  default: ComponentType<{ components?: Record<string, ComponentType> }>;
  frontmatter?: Record<string, unknown>;
}>("/content/posts/*.mdx", { eager: true });

// Use loader (not clientLoader) so it executes during prerendering for SSG
// Render MDX component to HTML string so it's included in static HTML for crawlers
export const loader = ({ params }: LoaderFunctionArgs) => {
  const { slug } = params;
  const post = blogIndex.posts.find((p) => p.slug === slug);

  if (!post) {
    return { mdxHtml: null, error: null };
  }

  if (!slug) {
    return { mdxHtml: null, error: "No slug provided" };
  }

  const filename = slugMapping[slug];
  if (!filename) {
    return { mdxHtml: null, error: `No MDX file found for slug: ${slug}` };
  }

  const modulePath = `/content/posts/${filename}.mdx`;
  const module = mdxModules[modulePath];

  if (!module) {
    return { mdxHtml: null, error: `MDX module not found: ${modulePath}` };
  }

  try {
    // Render MDX component to HTML string for SSG
    // This ensures content is in the static HTML for crawlers
    const MDXComponent = module.default;
    const mdxHtml = renderToString(<MDXComponent components={mdxComponents} />);
    return { mdxHtml, error: null };
  } catch (err) {
    console.error("Failed to render MDX:", err);
    return {
      mdxHtml: null,
      error: `Failed to load content: ${err instanceof Error ? err.message : String(err)}`,
    };
  }
};

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
  const loaderData = useLoaderData<typeof loader>();
  const mdxHtml = loaderData?.mdxHtml ?? null;
  const error = loaderData?.error ?? null;

  const post = useMemo(() => {
    return blogIndex.posts.find((p) => p.slug === slug);
  }, [slug]);

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
              {error && <p className="text-red-400">Error: {error}</p>}
              {mdxHtml && !error && (
                // biome-ignore lint/security/noDangerouslySetInnerHtml: MDX HTML is from our own content files, rendered server-side
                <div dangerouslySetInnerHTML={{ __html: mdxHtml }} />
              )}
            </div>
          </article>
        </div>
        <Sidebar />
      </div>
    </main>
  );
}
