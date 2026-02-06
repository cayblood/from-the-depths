import { Link } from "react-router";
import type { BlogPost } from "~/lib/blog";
import { formatDate } from "~/lib/blog";
import { contentToHtml } from "~/lib/content-to-html";

interface BlogPostPreviewProps {
  post: BlogPost;
}

export function BlogPostPreview({ post }: BlogPostPreviewProps) {
  return (
    <article className="mb-10 pb-10 border-b border-[#603d41]">
      <header className="mb-4">
        <h2 className="post-title text-4xl mb-1 text-[#f5e6e7]">
          <Link to={`/${post.slug}`} className="post-title-link hover:text-white transition-colors">
            {post.title}
          </Link>
        </h2>
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
      {post.preview && (
        <div
          className="text-[#d8bbbe] mb-4 prose prose-invert max-w-none"
          style={{
            fontFamily: 'Georgia, "Times New Roman", serif',
          }}
          // biome-ignore lint/security/noDangerouslySetInnerHtml: preview HTML is from our MDX via contentToHtml, not user input
          dangerouslySetInnerHTML={{
            __html: contentToHtml(post.preview),
          }}
        />
      )}
      <Link
        to={`/${post.slug}`}
        className="text-[#d8bbbe] underline hover:text-white transition-colors"
      >
        Read more →
      </Link>
    </article>
  );
}
