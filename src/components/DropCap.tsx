import type { ReactNode } from "react";
import { isValidElement } from "react";

interface DropCapProps {
  children: ReactNode;
}

/**
 * DropCap component that wraps a paragraph and applies drop cap styling
 * to the first letter. Uses the Volume TC Rustic font for the initial letter
 * and any leading quote.
 *
 * Leading quotes: we always render the opening smart quote (U+201C) so the
 * font displays correctly. The root cause of the original bug was source using
 * the closing curly quote (U+201D) instead of the opening one; we still treat
 * U+201D as a leading quote so mistyped source works.
 *
 * Usage in MDX:
 * <DropCap>
 * Your paragraph text here. The first letter will be styled as a drop cap.
 * </DropCap>
 */
export function DropCap({ children }: DropCapProps) {
  // Extract text content to check for leading quotes
  const extractText = (node: ReactNode): string => {
    if (typeof node === "string") return node;
    if (typeof node === "number") return String(node);
    if (isValidElement(node) && node.props.children) {
      return extractText(node.props.children);
    }
    if (Array.isArray(node)) {
      return node.map(extractText).join("");
    }
    return "";
  };

  const text = extractText(children);

  // When text starts with I + apostrophe (e.g. "I'm"), style only "I" as the drop cap
  // so the apostrophe is not included (::first-letter would include it).
  const iApostropheMatch = text.match(/^(I)([\u2019'])(.*)/s);
  if (iApostropheMatch) {
    const [, letterI, apostrophe, rest] = iApostropheMatch;
    return (
      <p className="drop-cap-quoted">
        <span className="drop-cap-letter">{letterI}</span>
        {apostrophe}
        {rest}
      </p>
    );
  }

  // Check if text starts with a quote (curly or straight).
  // Include U+201D (closing curly ") so mistyped source still shows the quote span.
  const leadingQuoteMatch = text.match(/^([""\u201C\u201D''\u2018„‚«‹])/);

  if (leadingQuoteMatch) {
    const quoteLength = leadingQuoteMatch[1].length;
    const firstLetter = text.charAt(quoteLength);
    const rest = text.slice(quoteLength + 1);
    const displayQuote = "\u201C";

    return (
      <p className="drop-cap-quoted">
        <span className="drop-cap-quote">{displayQuote}</span>
        <span className="drop-cap-letter">{firstLetter}</span>
        {rest}
      </p>
    );
  }

  // No leading quote, use the standard ::first-letter approach
  return <p className="drop-cap">{children}</p>;
}
