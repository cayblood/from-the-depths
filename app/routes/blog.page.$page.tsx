import { useEffect } from "react";
import { useParams, useSearchParams, Navigate } from "react-router";
import blogPagesData from "~/generated/blog-pages.json";
import { BlogPostPreview } from "~/components/BlogPostPreview";
import { Pagination } from "~/components/Pagination";
import { Sidebar } from "~/components/Sidebar";
import type { BlogPages } from "~/lib/blog";

const blogPages = blogPagesData as BlogPages;

export default function BlogPage() {
  const { page } = useParams<{ page: string }>();
  const [searchParams] = useSearchParams();
  const tagFilter = searchParams.get("tag");

  const rawPage = parseInt(page || "1", 10);
  const pageNumber = Number.isFinite(rawPage) && rawPage >= 1 ? rawPage : 1;
  const currentPage = Math.max(1, Math.min(pageNumber, blogPages.totalPages || 1));

  useEffect(() => {
    document.title = tagFilter
      ? `Blog - Page ${currentPage} - Tag: ${tagFilter}`
      : `Blog - Page ${currentPage}`;
  }, [currentPage, tagFilter]);

  const posts = blogPages.pages[currentPage - 1] || [];

  // Filter by tag if specified
  const filteredPosts = tagFilter ? posts.filter((post) => post.tags?.includes(tagFilter)) : posts;

  if (currentPage === 1) {
    return <Navigate to="/" replace />;
  }

  const totalPages = blogPages.totalPages || 1;
  if (currentPage !== pageNumber || currentPage > totalPages) {
    return <Navigate to={`/page/${currentPage}`} replace />;
  }

  return (
    <main className="bg-[rgb(96,61,65)] px-6 pt-4 md:px-12 lg:pt-8 pb-12">
      <div className="flex flex-col lg:flex-row">
        <div id="main-content" className="grow lg:mr-12">
          {tagFilter && (
            <>
              <h1 className="tag-filter-heading text-[#d8bbbe] mb-8">Posts tagged: {tagFilter}</h1>
              <div className="mb-6">
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
              <Pagination
                currentPage={currentPage}
                totalPages={blogPages.totalPages}
                basePath="/"
                search={tagFilter ? `?tag=${encodeURIComponent(tagFilter)}` : undefined}
              />
            </>
          )}
        </div>
        <Sidebar />
      </div>
    </main>
  );
}
