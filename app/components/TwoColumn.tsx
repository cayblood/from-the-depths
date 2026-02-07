import type { ReactNode } from "react";

interface TwoColumnProps {
  children: ReactNode;
  /**
   * Optional content for the right column. When provided, the layout becomes
   * left column = children (main content), right column = this content,
   * instead of flowing children into two text columns.
   */
  right?: ReactNode;
}

/**
 * TwoColumn component that displays its content in two columns on wide viewports.
 * Useful for breaking up long sections of text to improve readability without
 * forcing the reader to scroll back to the top of the page.
 *
 * With right prop: left column = children, right column = right content (e.g. an embed).
 *
 * Usage in MDX:
 * <TwoColumn>
 * Your content here. This will display in two columns on screens 1024px and wider.
 * </TwoColumn>
 *
 * <TwoColumn right={<SubstackEmbed url="..." />}>
 * Main content here; embed appears in the right column on wide viewports.
 * </TwoColumn>
 */
export function TwoColumn({ children, right }: TwoColumnProps) {
  if (right != null) {
    return (
      <div className="two-column-with-aside">
        <div className="two-column-main">{children}</div>
        <div className="two-column-aside">{right}</div>
      </div>
    );
  }
  return <div className="two-column">{children}</div>;
}
