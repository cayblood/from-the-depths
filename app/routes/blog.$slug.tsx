import { useEffect, useMemo, useState, type ComponentType } from "react";
import { useParams, Link, Navigate } from "react-router";
import blogIndexData from "~/generated/blog-index.json";
import slugMappingData from "~/generated/blog-slugs.json";
import { formatDate } from "~/lib/blog";
import { Sidebar } from "~/components/Sidebar";
import { mdxComponents } from "~/lib/mdx-components";
import type { BlogIndex } from "~/lib/blog";

const blogIndex = blogIndexData as BlogIndex;
const slugMapping = slugMappingData as Record<string, string>;

// Import all MDX files from content/posts using Vite's glob import
// The eager: false makes this a lazy import for code splitting
const mdxModules = import.meta.glob<{
  default: ComponentType<{ components?: Record<string, ComponentType> }>;
  frontmatter?: Record<string, unknown>;
}>("/content/posts/*.mdx");

function setOrUpdateMetaTag(
  selector: string,
  attribute: string,
  value: string,
  contentAttribute = "content"
) {
  const element = document.querySelector(selector);
  if (element) {
    element.setAttribute(contentAttribute, value);
  } else {
    const meta = document.createElement("meta");
    if (attribute.includes(":")) {
      // Open Graph or Twitter Card
      meta.setAttribute("property", attribute);
    } else {
      meta.setAttribute(attribute, contentAttribute === "content" ? "" : contentAttribute);
    }
    meta.setAttribute(contentAttribute, value);
    document.head.appendChild(meta);
  }
}

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

  useEffect(() => {
    if (post) {
      const baseUrl = "https://youngbloods.org";
      const postUrl = `${baseUrl}/${post.slug}`;

      // Basic meta tags
      document.title = `${post.title} - From the Depths`;
      setOrUpdateMetaTag('meta[name="description"]', "name", post.description || post.title);

      // Keywords
      if (post.keywords && post.keywords.length > 0) {
        setOrUpdateMetaTag(
          'meta[name="keywords"]',
          "name",
          Array.isArray(post.keywords) ? post.keywords.join(", ") : post.keywords
        );
      }

      // Open Graph tags
      setOrUpdateMetaTag('meta[property="og:title"]', "og:title", post.title);
      setOrUpdateMetaTag(
        'meta[property="og:description"]',
        "og:description",
        post.description || ""
      );
      setOrUpdateMetaTag('meta[property="og:type"]', "og:type", "article");
      setOrUpdateMetaTag('meta[property="og:url"]', "og:url", postUrl);
      if (post.defaultImage) {
        setOrUpdateMetaTag(
          'meta[property="og:image"]',
          "og:image",
          `${baseUrl}${post.defaultImage}`
        );
      }

      // Twitter Card tags
      setOrUpdateMetaTag('meta[name="twitter:card"]', "twitter:card", "summary_large_image");
      setOrUpdateMetaTag('meta[name="twitter:title"]', "twitter:title", post.title);
      setOrUpdateMetaTag(
        'meta[name="twitter:description"]',
        "twitter:description",
        post.description || ""
      );
      if (post.defaultImage) {
        setOrUpdateMetaTag(
          'meta[name="twitter:image"]',
          "twitter:image",
          `${baseUrl}${post.defaultImage}`
        );
      }

      // Article-specific meta tags
      setOrUpdateMetaTag(
        'meta[property="article:published_time"]',
        "article:published_time",
        post.datePublished
      );
      if (post.tags && post.tags.length > 0) {
        // Remove existing article:tag tags
        for (const el of document.querySelectorAll('meta[property^="article:tag"]')) {
          el.remove();
        }
        // Add new tags
        post.tags.forEach((tag) => {
          const meta = document.createElement("meta");
          meta.setAttribute("property", "article:tag");
          meta.setAttribute("content", tag);
          document.head.appendChild(meta);
        });
      }

      // Structured data (JSON-LD)
      let structuredDataScript = document.querySelector(
        'script[type="application/ld+json"][data-blog-post]'
      ) as HTMLScriptElement | null;
      if (structuredDataScript) {
        structuredDataScript.remove();
      }

      const structuredData = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.description || "",
        datePublished: post.datePublished,
        author: {
          "@type": "Person",
          name: "Carl Youngblood",
        },
        publisher: {
          "@type": "Organization",
          name: "From the Depths",
        },
        url: postUrl,
        ...(post.defaultImage && {
          image: `${baseUrl}${post.defaultImage}`,
        }),
        ...(post.keywords && {
          keywords: Array.isArray(post.keywords) ? post.keywords.join(", ") : post.keywords,
        }),
      };

      structuredDataScript = document.createElement("script");
      structuredDataScript.type = "application/ld+json";
      structuredDataScript.setAttribute("data-blog-post", "true");
      structuredDataScript.textContent = JSON.stringify(structuredData);
      document.head.appendChild(structuredDataScript);
    }

    // Cleanup function
    return () => {
      // Remove blog-specific meta tags on unmount
      document
        .querySelectorAll(
          'meta[property^="og:"], meta[name^="twitter:"], meta[property^="article:"], script[data-blog-post]'
        )
        .forEach((el) => {
          const element = el as HTMLElement;
          if (
            element.getAttribute("data-blog-post") ||
            element.getAttribute("property")?.startsWith("og:") ||
            element.getAttribute("property")?.startsWith("article:") ||
            element.getAttribute("name")?.startsWith("twitter:")
          ) {
            element.remove();
          }
        });
    };
  }, [post]);

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
