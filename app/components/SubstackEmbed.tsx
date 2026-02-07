import { useEffect } from "react";

interface SubstackEmbedProps {
  /** Full URL of the Substack post to embed */
  url: string;
  /** Post title (e.g. "What Is Intelligence? Insights from Latter-day Saint Scripture by Zachary Davis") */
  title?: string;
  /** Author name (e.g. "Carl Youngblood") */
  author?: string;
  /** When set, the embed floats so text wraps around it */
  float?: "left" | "right";
}

const EMBED_SCRIPT_SRC = "https://substack.com/embedjs/embed.js";

export function SubstackEmbed({ url, title, author, float }: SubstackEmbedProps) {
  useEffect(() => {
    if (document.querySelector(`script[src="${EMBED_SCRIPT_SRC}"]`)) return;
    const script = document.createElement("script");
    script.src = EMBED_SCRIPT_SRC;
    script.async = true;
    script.setAttribute("charset", "utf-8");
    document.body.appendChild(script);
  }, []);

  const floatClasses =
    float === "left"
      ? "float-left clear-left mr-4 mb-4 max-w-md"
      : float === "right"
        ? "float-right clear-right ml-4 mb-4 max-w-md"
        : "";

  return (
    <div
      className={`substack-post-embed my-8 rounded-lg overflow-hidden bg-[#3e2427]/50 ${floatClasses}`.trim()}
    >
      {title && <p lang="en">{title}</p>}
      {author && <p>{author}</p>}
      <a data-post-link href={url}>
        Read on Substack
      </a>
    </div>
  );
}
