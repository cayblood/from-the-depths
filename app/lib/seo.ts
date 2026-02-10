import type { MetaDescriptor } from "react-router";
import type { BlogPost } from "./blog";

const BASE_URL = "https://youngbloods.org";
const SITE_NAME = "From the Depths";
const SITE_DESCRIPTION =
  "Blog and personal website of Carl Youngblood - software engineer, tech entrepreneur, philosopher and amateur musician.";
const DEFAULT_IMAGE = `${BASE_URL}/carl-hedcut.webp`;

/**
 * Generate full URL from a path
 */
export function getFullUrl(path: string): string {
  return `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Generate meta tags for a blog post
 */
export function generateBlogPostMeta(post: BlogPost): MetaDescriptor[] {
  const url = getFullUrl(`/${post.slug}`);
  const image = post.defaultImage ? getFullUrl(post.defaultImage) : DEFAULT_IMAGE;
  const keywords = Array.isArray(post.keywords) ? post.keywords.join(", ") : post.keywords || "";

  const meta: MetaDescriptor[] = [
    { title: `${post.title} - ${SITE_NAME}` },
    { name: "description", content: post.description || post.title },
    { name: "author", content: "Carl Youngblood" },
    ...(keywords ? [{ name: "keywords", content: keywords }] : []),

    // Open Graph tags
    { property: "og:title", content: post.title },
    { property: "og:description", content: post.description || "" },
    { property: "og:type", content: "article" },
    { property: "og:url", content: url },
    { property: "og:image", content: image },
    { property: "og:image:alt", content: post.title },
    { property: "og:site_name", content: SITE_NAME },

    // Twitter Card tags
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: post.title },
    { name: "twitter:description", content: post.description || "" },
    { name: "twitter:image", content: image },

    // Article-specific tags
    { property: "article:published_time", content: post.datePublished },
    { property: "article:author", content: "Carl Youngblood" },
    ...(post.tags?.map((tag) => ({ property: "article:tag", content: tag })) || []),
  ];

  return meta;
}

/**
 * Generate schema.org JSON-LD for a blog post
 */
export function generateBlogPostSchema(post: BlogPost): object {
  const url = getFullUrl(`/${post.slug}`);
  const image = post.defaultImage ? getFullUrl(post.defaultImage) : DEFAULT_IMAGE;
  const keywords = Array.isArray(post.keywords) ? post.keywords.join(", ") : post.keywords || "";

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description || "",
    datePublished: post.datePublished,
    author: {
      "@type": "Person",
      name: "Carl Youngblood",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: getFullUrl("/from-the-depths-logo.png"),
      },
    },
    url,
    image: {
      "@type": "ImageObject",
      url: image,
    },
    ...(keywords ? { keywords } : {}),
    ...(post.tags && post.tags.length > 0 ? { articleSection: post.tags.join(", ") } : {}),
  };
}

/**
 * Generate meta tags for the home page
 */
export function generateHomeMeta(tagFilter?: string): MetaDescriptor[] {
  const title = tagFilter ? `${SITE_NAME} - Tag: ${tagFilter}` : SITE_NAME;
  const description = tagFilter
    ? `Blog posts tagged "${tagFilter}" on ${SITE_NAME}`
    : SITE_DESCRIPTION;

  return [
    { title },
    { name: "description", content: description },
    { name: "author", content: "Carl Youngblood" },

    // Open Graph tags
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: BASE_URL },
    { property: "og:image", content: DEFAULT_IMAGE },
    { property: "og:image:alt", content: "Carl Youngblood" },
    { property: "og:site_name", content: SITE_NAME },

    // Twitter Card tags
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: DEFAULT_IMAGE },
  ];
}

/**
 * Generate schema.org JSON-LD for the website
 */
export function generateWebsiteSchema(): object {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: BASE_URL,
    description: SITE_DESCRIPTION,
    author: {
      "@type": "Person",
      name: "Carl Youngblood",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: getFullUrl("/from-the-depths-logo.png"),
      },
    },
  };
}

/**
 * Generate meta tags for paginated blog pages
 */
export function generatePaginatedMeta(page: number, tagFilter?: string): MetaDescriptor[] {
  const title = tagFilter
    ? `${SITE_NAME} - Page ${page} - Tag: ${tagFilter}`
    : `${SITE_NAME} - Page ${page}`;
  const description = tagFilter
    ? `Blog posts tagged "${tagFilter}" - Page ${page} on ${SITE_NAME}`
    : `Blog posts - Page ${page} on ${SITE_NAME}`;

  return [
    { title },
    { name: "description", content: description },

    // Open Graph tags
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    {
      property: "og:url",
      content: getFullUrl(
        `/page/${page}${tagFilter ? `?tag=${encodeURIComponent(tagFilter)}` : ""}`
      ),
    },
    { property: "og:image", content: DEFAULT_IMAGE },
    { property: "og:site_name", content: SITE_NAME },

    // Twitter Card tags
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: DEFAULT_IMAGE },
  ];
}

/**
 * Generate meta tags for the tags page
 */
export function generateTagsMeta(): MetaDescriptor[] {
  const title = `Blog Tags - ${SITE_NAME}`;
  const description = `Browse all blog post tags on ${SITE_NAME}`;

  return [
    { title },
    { name: "description", content: description },

    // Open Graph tags
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: getFullUrl("/tags") },
    { property: "og:image", content: DEFAULT_IMAGE },
    { property: "og:site_name", content: SITE_NAME },

    // Twitter Card tags
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: DEFAULT_IMAGE },
  ];
}
