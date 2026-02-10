import type { BlogPost } from "./blog";

const BASE_URL = "https://blog.youngbloods.org";
const SITE_NAME = "From the Depths";
const SITE_DESCRIPTION =
  "Blog and personal website of Carl Youngblood - software engineer, tech entrepreneur, philosopher and amateur musician.";
const DEFAULT_IMAGE = `${BASE_URL}/carl-hedcut.webp`;

interface HeadConfig {
  meta: Array<Record<string, string>>;
  scripts?: Array<{ type: string; children: string }>;
}

/**
 * Generate full URL from a path
 */
export function getFullUrl(path: string): string {
  return `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Generate head config for a blog post
 */
export function generateBlogPostHead(post: BlogPost): HeadConfig {
  const url = getFullUrl(`/${post.slug}`);
  const image = post.defaultImage ? getFullUrl(post.defaultImage) : DEFAULT_IMAGE;
  const keywords = Array.isArray(post.keywords) ? post.keywords.join(", ") : post.keywords || "";

  const meta: Array<Record<string, string>> = [
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

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description || "",
    datePublished: post.datePublished,
    ...(post.preview ? { articleBody: post.preview.slice(0, 5000) } : {}),
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

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: SITE_NAME,
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: post.title,
        item: url,
      },
    ],
  };

  return {
    meta,
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(blogPostingSchema) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbSchema) },
    ],
  };
}

/**
 * Generate head config for the home page
 */
export function generateHomeHead(tagFilter?: string): HeadConfig {
  const title = tagFilter ? `${SITE_NAME} - Tag: ${tagFilter}` : SITE_NAME;
  const description = tagFilter
    ? `Blog posts tagged "${tagFilter}" on ${SITE_NAME}`
    : SITE_DESCRIPTION;

  const websiteSchema = {
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

  return {
    meta: [
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
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(websiteSchema) }],
  };
}

/**
 * Generate head config for paginated blog pages
 */
export function generatePaginatedHead(page: number, tagFilter?: string): HeadConfig {
  const title = tagFilter
    ? `${SITE_NAME} - Page ${page} - Tag: ${tagFilter}`
    : `${SITE_NAME} - Page ${page}`;
  const description = tagFilter
    ? `Blog posts tagged "${tagFilter}" - Page ${page} on ${SITE_NAME}`
    : `Blog posts - Page ${page} on ${SITE_NAME}`;

  return {
    meta: [
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
    ],
  };
}

/**
 * Generate head config for the tags page
 */
export function generateTagsHead(): HeadConfig {
  const title = `Blog Tags - ${SITE_NAME}`;
  const description = `Browse all blog post tags on ${SITE_NAME}`;

  return {
    meta: [
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
    ],
  };
}
