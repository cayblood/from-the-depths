import { useSearchParams, type MetaFunction } from "react-router";
import blogPagesData from "~/generated/blog-pages.json";
import { BlogPostPreview } from "~/components/BlogPostPreview";
import { Pagination } from "~/components/Pagination";
import { Sidebar } from "~/components/Sidebar";
import { generateHomeMeta, generateWebsiteSchema } from "~/lib/seo";
import type { BlogPages } from "~/lib/blog";

const blogPages = blogPagesData as BlogPages;

export const meta: MetaFunction = ({ location }) => {
  const searchParams = new URLSearchParams(location.search || "");
  const tagFilter = searchParams.get("tag") || undefined;

  const metaTags = generateHomeMeta(tagFilter);
  const schema = generateWebsiteSchema();

  return [...metaTags, { "script:ld+json": schema }];
};

export default function Index() {
  const [searchParams] = useSearchParams();
  const tagFilter = searchParams.get("tag");

  // Get first page posts
  const posts = blogPages.pages[0] || [];

  // Filter by tag if specified
  const filteredPosts = tagFilter ? posts.filter((post) => post.tags?.includes(tagFilter)) : posts;

  return (
    <main className="bg-[rgb(96,61,65)] px-6 pt-4 md:px-12 lg:pt-8 pb-12">
      <div className="flex flex-col lg:flex-row">
        <div id="main-content" className="grow lg:mr-12">
          {tagFilter && (
            <>
              <h1 className="tag-filter-heading text-[#d8bbbe]">Posts tagged: {tagFilter}</h1>
              <div className="mb-8">
                <a href="/" className="text-[#d8bbbe] underline hover:text-white transition-colors">
                  ← Back to all posts
                </a>
              </div>
            </>
          )}

          {filteredPosts.length === 0 ? (
            <p className="text-[#d8bbbe]">No posts found.</p>
          ) : (
            <>
              {filteredPosts.map((post) => (
                <BlogPostPreview key={post.slug} post={post} />
              ))}
              {blogPages.totalPages > 1 && (
                <Pagination
                  currentPage={1}
                  totalPages={blogPages.totalPages}
                  basePath="/"
                  search={tagFilter ? `?tag=${encodeURIComponent(tagFilter)}` : undefined}
                />
              )}
            </>
          )}
        </div>
        <Sidebar />
      </div>
    </main>
  );
}
