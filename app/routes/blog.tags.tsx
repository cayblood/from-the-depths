import { useEffect } from "react";
import blogTagsData from "~/generated/blog-tags.json";
import { TagCloud } from "~/components/TagCloud";
import { Sidebar } from "~/components/Sidebar";
import type { BlogTags } from "~/lib/blog";

const blogTags = blogTagsData as BlogTags;

export default function BlogTagsPage() {
  useEffect(() => {
    document.title = "Blog Tags - From the Depths";
  }, []);

  return (
    <main className="bg-[rgb(96,61,65)] px-6 pt-4 md:px-12 lg:pt-8 pb-12">
      <div className="flex flex-col lg:flex-row">
        <div id="main-content" className="grow lg:mr-12">
          <h1 className="text-4xl font-bold mb-8 text-[#d8bbbe]">Tag Cloud</h1>
          <p className="text-[#d8bbbe] mb-6">Click on any tag to filter blog posts by that tag.</p>
          <TagCloud tags={blogTags} />
        </div>
        <Sidebar />
      </div>
    </main>
  );
}
