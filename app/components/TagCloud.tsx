import { Link } from "react-router";
import type { BlogTags } from "~/lib/blog";

interface TagCloudProps {
  tags: BlogTags;
}

export function TagCloud({ tags }: TagCloudProps) {
  if (tags.sortedTags.length === 0) {
    return <p className="text-[#d8bbbe]">No tags available.</p>;
  }

  // Calculate min and max counts for size scaling
  const counts = tags.sortedTags.map((t) => t.count);
  const minCount = Math.min(...counts);
  const maxCount = Math.max(...counts);
  const range = maxCount - minCount || 1;

  // Size range: 0.8rem to 2rem
  const minSize = 0.8;
  const maxSize = 2;

  return (
    <div className="flex flex-wrap gap-3 justify-center items-center py-8">
      {tags.sortedTags.map(({ tag, count }) => {
        // Calculate font size based on frequency
        const normalizedCount = (count - minCount) / range;
        const fontSize = minSize + normalizedCount * (maxSize - minSize);

        return (
          <Link
            key={tag}
            to={`/?tag=${encodeURIComponent(tag)}`}
            className="text-[#d8bbbe] hover:text-white transition-colors hover:underline"
            style={{ fontSize: `${fontSize}rem` }}
            title={`${count} post${count !== 1 ? "s" : ""}`}
          >
            #{tag} ({count})
          </Link>
        );
      })}
    </div>
  );
}
