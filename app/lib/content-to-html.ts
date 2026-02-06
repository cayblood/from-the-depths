import MarkdownIt from "markdown-it";
import footnote from "markdown-it-footnote";

const md = new MarkdownIt({
  html: true,
  breaks: false,
  linkify: true,
  typographer: true,
}).use(footnote);

md.renderer.rules.hr = () => {
  return '<div class="decorative-spacer">✦ ✦ ✦</div>';
};

function convertDropCap(content: string): string {
  const re = /<DropCap>([\s\S]*?)<\/DropCap>/g;
  return content.replace(re, (_match, inner) => {
    const trimmed = inner.trim();
    if (!trimmed) return "";
    let html = md.render(trimmed).trim();
    if (html.startsWith("<p>") && html.endsWith("</p>")) {
      html = html.slice(3, -4);
    }
    return `<p class="drop-cap">${html}</p>`;
  });
}

function convertTwoColumn(content: string): string {
  const re = /<TwoColumn>([\s\S]*?)<\/TwoColumn>/g;
  return content.replace(re, (_match, inner) => {
    const trimmed = inner.trim();
    if (!trimmed) return "";
    const rawHtml = md.render(trimmed).trim();
    const html = rawHtml.replace(/\n\n/g, "\n");
    return `<div class="two-column">${html}</div>`;
  });
}

function stripMdxTags(content: string): string {
  let result = content.replace(/<[A-Z][A-Za-z]*\s*\/>/g, "");
  result = result.replace(/<[A-Z][A-Za-z]*(?:\s+[^>]*)?\s*>/g, "");
  result = result.replace(/<\/[A-Z][A-Za-z]*>/g, "");
  result = result.replace(/\n{3,}/g, "\n\n");
  return result.trim();
}

/**
 * Convert raw post content (MDX + markdown with DropCap/TwoColumn) to HTML.
 * Used for RSS full content and for blog preview rendering.
 */
export function contentToHtml(content: string): string {
  let result = convertDropCap(content);
  result = convertTwoColumn(result);
  result = stripMdxTags(result);
  const trimmed = result.trim();
  if (trimmed.startsWith("<") && !/^\s*#+\s|^\s*[-*+]\s|^\s*\d+\.\s/m.test(trimmed)) {
    return trimmed;
  }
  return md.render(result);
}
