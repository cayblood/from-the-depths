import { useEffect } from "react";
import { useSearchParams } from "react-router";
import blogPagesData from "~/generated/blog-pages.json";
import { BlogPostPreview } from "~/components/BlogPostPreview";
import { Pagination } from "~/components/Pagination";
import { Sidebar } from "~/components/Sidebar";
import type { BlogPages } from "~/lib/blog";

const blogPages = blogPagesData as BlogPages;

export default function Index() {
  const [searchParams] = useSearchParams();
  const tagFilter = searchParams.get("tag");

  useEffect(() => {
    document.title = tagFilter ? `From the Depths - Tag: ${tagFilter}` : "From the Depths";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "From the Depths - Blog and personal website");
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = "From the Depths - Blog and personal website";
      document.head.appendChild(meta);
    }
  }, [tagFilter]);

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
              <h1 className="text-4xl font-bold mb-4 text-[#d8bbbe]">Posts tagged: {tagFilter}</h1>
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
                <Pagination currentPage={1} totalPages={blogPages.totalPages} basePath="/" />
              )}
            </>
          )}
        </div>
        <Sidebar />
      </div>
    </main>
  );
}
