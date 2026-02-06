import type { ReactNode } from "react";

interface TwoColumnProps {
  children: ReactNode;
}

/**
 * TwoColumn component that displays its content in two columns on wide viewports.
 * Useful for breaking up long sections of text to improve readability without
 * forcing the reader to scroll back to the top of the page.
 *
 * Usage in MDX:
 * <TwoColumn>
 *
 * Your content here. This will display in two columns on screens 1024px and wider.
 *
 * Multiple paragraphs work well here.
 *
 * </TwoColumn>
 */
export function TwoColumn({ children }: TwoColumnProps) {
  return <div className="two-column">{children}</div>;
}
