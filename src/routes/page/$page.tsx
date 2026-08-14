import { createFileRoute, redirect } from "@tanstack/react-router";
import { BlogPostPreview } from "~/components/BlogPostPreview";
import { Pagination } from "~/components/Pagination";
import { Sidebar } from "~/components/Sidebar";
import blogPagesData from "~/generated/blog-pages.json";
import type { BlogPages } from "~/lib/blog";
import { generatePaginatedHead } from "~/lib/seo";

const blogPages = blogPagesData as BlogPages;

export const Route = createFileRoute("/page/$page")({
  validateSearch: (search: Record<string, unknown>): { tag?: string } => ({
    tag: (search.tag as string) || undefined,
  }),
  loader: ({ params }) => {
    const rawPage = parseInt(params.page || "1", 10);
    const pageNumber = Number.isFinite(rawPage) && rawPage >= 1 ? rawPage : 1;
    const totalPages = blogPages.totalPages || 1;
    const currentPage = Math.max(1, Math.min(pageNumber, totalPages));

    if (currentPage === 1) {
      throw redirect({ to: "/" });
    }

    if (currentPage !== pageNumber || currentPage > totalPages) {
      throw redirect({ to: "/page/$page", params: { page: String(currentPage) } });
    }

    return { currentPage };
  },
  head: ({ params, match }) => {
    const rawPage = parseInt(params.page || "1", 10);
    const pageNumber = Number.isFinite(rawPage) && rawPage >= 1 ? rawPage : 1;
    const currentPage = Math.max(1, Math.min(pageNumber, blogPages.totalPages || 1));
    const headConfig = generatePaginatedHead(currentPage, match.search?.tag);
    return { meta: headConfig.meta };
  },
  component: BlogPage,
});

function BlogPage() {
  const { currentPage } = Route.useLoaderData();
  const { tag: tagFilter } = Route.useSearch();

  const posts = blogPages.pages[currentPage - 1] || [];
  const filteredPosts = tagFilter ? posts.filter((post) => post.tags?.includes(tagFilter)) : posts;

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
