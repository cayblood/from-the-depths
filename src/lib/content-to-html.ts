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
    // When content starts with I', style only "I" as drop cap (preview/RSS match DropCap.tsx)
    const iApostrophe = /^I([\u2019'])(.*)/s.exec(trimmed);
    if (iApostrophe) {
      const [, apostrophe, rest] = iApostrophe;
      const restHtmlRaw = md.render(rest).trim();
      const restHtml =
        restHtmlRaw.startsWith("<p>") && restHtmlRaw.endsWith("</p>")
          ? restHtmlRaw.slice(3, -4)
          : restHtmlRaw;
      return `<p class="drop-cap-quoted"><span class="drop-cap-letter">I</span>${apostrophe}${restHtml}</p>`;
    }
    let html = md.render(trimmed).trim();
    if (html.startsWith("<p>") && html.endsWith("</p>")) {
      html = html.slice(3, -4);
    }
    return `<p class="drop-cap">${html}</p>`;
  });
}

/** Strip TwoColumn right={...} prop so convertTwoColumn can match and preview/RSS don't show stray chars */
function stripTwoColumnRightProp(content: string): string {
  // Match right={<Anything />} so the rest of the pipeline sees <TwoColumn>...</TwoColumn>
  return content.replace(/\s*right=\{[^}]*\/>\s*\}/g, "");
}

function convertTwoColumn(content: string): string {
  const normalized = stripTwoColumnRightProp(content);
  const re = /<TwoColumn>([\s\S]*?)<\/TwoColumn>/g;
  return normalized.replace(re, (_match, inner) => {
    const trimmed = inner.trim();
    if (!trimmed) return "";
    const rawHtml = md.render(trimmed).trim();
    const html = rawHtml.replace(/\n\n/g, "\n");
    return `<div class="two-column">${html}</div>`;
  });
}

/** Parse attributes from a tag string, e.g. src="/x" caption="..." float="right" alignTop */
function parseAttrs(attrStr: string): Record<string, string | boolean> {
  const attrs: Record<string, string | boolean> = {};
  const re = /(\w+)=(?:"([^"]*)"|'([^']*)')|(\w+)(?=[\s>])/g;
  for (const m of attrStr.matchAll(re)) {
    if (m[1]) attrs[m[1]] = m[2] ?? m[3] ?? "";
    else if (m[4]) attrs[m[4]] = true;
  }
  return attrs;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Convert <ImageWithCaption ... /> to figure HTML so preview (and RSS) include floated images. */
function convertImageWithCaption(content: string): string {
  const re = /<ImageWithCaption\s+([^>]+?)\s*\/>/gs;
  return content.replace(re, (_match, attrStr) => {
    const attrs = parseAttrs(attrStr);
    const src = (attrs.src as string) ?? "";
    const caption = (attrs.caption as string) ?? "";
    const alt = (attrs.alt as string) ?? caption;
    const float = attrs.float as "left" | "right" | undefined;
    const alignTop = attrs.alignTop === true;
    const floatClasses =
      float === "left"
        ? "float-left clear-left mr-4 mb-4 max-w-[14rem] lg:max-w-[21rem]"
        : float === "right"
          ? "float-right clear-right ml-4 mb-4 max-w-[14rem] lg:max-w-[21rem]"
          : "";
    const marginClasses = float ? (alignTop ? "mb-4 align-top" : "my-4") : "my-6";
    const figureClass = float ? `w-max ${marginClasses} ${floatClasses}` : "my-6";
    const imgClass = `max-w-full h-auto rounded-lg ${float ? "block" : "w-full"}`;
    return `<figure class="${figureClass}"><img src="${src}" alt="${escapeHtml(alt)}" class="${imgClass}"><figcaption class="mt-2 text-sm text-[#d8bbbe] opacity-85 italic text-center font-[Inter] w-full max-w-full text-balance">${escapeHtml(caption)}</figcaption></figure>`;
  });
}

/** Convert <FloatWithParagraph>...</FloatWithParagraph> to div so preview keeps float alignment. */
function convertFloatWithParagraph(content: string): string {
  return content
    .replace(/<FloatWithParagraph\s*>/g, '<div class="float-with-paragraph">')
    .replace(/<\/FloatWithParagraph\s*>/g, "</div>");
}

function stripMdxTags(content: string): string {
  let result = content.replace(/<[A-Z][A-Za-z]*\s*\/>/g, "");
  result = result.replace(/<[A-Z][A-Za-z]*(?:\s+[^>]*)?\s*>/g, "");
  result = result.replace(/<\/[A-Z][A-Za-z]*>/g, "");
  result = result.replace(/\n{3,}/g, "\n\n");
  return result.trim();
}

/** Strip footnote refs [^1], [^2], etc. so they are not rendered (e.g. in preview). */
function stripFootnotes(content: string): string {
  return content.replace(/\[\^[^\]]+\]/g, "");
}

export interface ContentToHtmlOptions {
  /** When true, footnote refs and definitions are removed so no footnotes appear (e.g. for preview). */
  suppressFootnotes?: boolean;
}

/**
 * Convert raw post content (MDX + markdown with DropCap/TwoColumn) to HTML.
 * Used for RSS full content and for blog preview rendering.
 */
export function contentToHtml(content: string, options?: ContentToHtmlOptions): string {
  let result = options?.suppressFootnotes ? stripFootnotes(content) : content;
  result = convertDropCap(result);
  result = convertTwoColumn(result);
  result = convertImageWithCaption(result);
  result = convertFloatWithParagraph(result);
  result = stripMdxTags(result);
  // Always process through markdown-it to ensure all paragraphs are wrapped
  // even if the content already contains some HTML
  return md.render(result);
}
