import type { ReactNode } from "react";

interface TwoColumnProps {
  children: ReactNode;
  /**
   * Optional content for the right column. When provided, the layout becomes
   * left column = children (main content), right column = this content,
   * instead of flowing children into two text columns.
   */
  right?: ReactNode;
  /**
   * When true, direct children (typically two <div>s) are laid out as equal-width
   * side-by-side columns. Useful for parallel content like bilingual poems.
   *
   * Usage in MDX:
   * <TwoColumn sideBySide>
   * <div>
   *
   * Left column markdown content...
   *
   * </div>
   * <div>
   *
   * Right column markdown content...
   *
   * </div>
   * </TwoColumn>
   */
  sideBySide?: boolean;
}

export function TwoColumn({ children, right, sideBySide }: TwoColumnProps) {
  if (sideBySide) {
    return <div className="two-column-side-by-side">{children}</div>;
  }
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
