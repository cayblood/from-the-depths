import type { ReactNode } from "react";

/**
 * Wraps one or more floated figures and the paragraph(s) that follow.
 * Uses a block formatting context (flow-root) so the float is contained and
 * the paragraph starts at the top of the wrapper—keeping the float and
 * paragraph top-aligned.
 *
 * In MDX, wrap the float and the paragraph that should sit beside it:
 *
 *   <FloatWithParagraph>
 *     <ImageWithCaption src="..." float="right" />
 *     This paragraph will start at the same vertical position as the image.
 *   </FloatWithParagraph>
 */
export function FloatWithParagraph({ children }: { children: ReactNode }) {
  return <div className="float-with-paragraph">{children}</div>;
}
