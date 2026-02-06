export interface BlogPostMetadata {
  datePublished: string;
  title: string;
  subtitle?: string;
  description: string;
  defaultImage?: string;
  keywords?: string | string[];
  tags?: string[];
  slug: string;
  filename: string;
}

export interface BlogPost extends BlogPostMetadata {
  content: string;
  preview?: string;
}

export interface BlogIndex {
  posts: BlogPost[];
}

export interface BlogPages {
  pages: BlogPost[][];
  totalPages: number;
  postsPerPage: number;
}

export interface TagFrequency {
  [tag: string]: number;
}

export interface BlogTags {
  tags: TagFrequency;
  sortedTags: Array<{ tag: string; count: number }>;
}

/**
 * Extract slug from filename format: YYYY-MM-DD-title-goes-here.mdx
 */
export function extractSlugFromFilename(filename: string): string {
  // Remove .mdx extension
  const withoutExt = filename.replace(/\.mdx$/, "");
  // Remove date prefix (YYYY-MM-DD-)
  const datePattern = /^\d{4}-\d{2}-\d{2}-/;
  const slug = withoutExt.replace(datePattern, "");
  return slug;
}

/**
 * Extract date from filename format: YYYY-MM-DD-title-goes-here.mdx
 */
export function extractDateFromFilename(filename: string): string | null {
  const match = filename.match(/^(\d{4}-\d{2}-\d{2})-/);
  return match ? match[1] : null;
}

/**
 * Split content at preview end comment.
 * Looks for the JSX comment pattern: preview ends
 */
export function extractPreview(content: string): { preview: string; full: string } {
  const previewEndPattern = /\{\/\*\s*preview\s+ends\s*\*\/\}/i;
  const match = content.search(previewEndPattern);

  if (match === -1) {
    // No preview marker, return full content as preview
    return { preview: content, full: content };
  }

  // Remove the marker from the full content
  const fullContent = content.replace(previewEndPattern, "").trim();

  return {
    preview: content.substring(0, match).trim(),
    full: fullContent,
  };
}

/**
 * Parse keywords from string or array
 */
export function parseKeywords(keywords?: string | string[]): string[] {
  if (!keywords) return [];
  if (Array.isArray(keywords)) return keywords;
  return keywords
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean);
}

/**
 * Format date for display
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Generate tag frequency map from posts
 */
export function generateTagFrequency(posts: BlogPost[]): TagFrequency {
  const frequency: TagFrequency = {};

  for (const post of posts) {
    if (post.tags && Array.isArray(post.tags)) {
      for (const tag of post.tags) {
        frequency[tag] = (frequency[tag] || 0) + 1;
      }
    }
  }

  return frequency;
}
