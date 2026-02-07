import type { ComponentType } from "react";
import { DropCap } from "~/components/DropCap";
import { FloatWithParagraph } from "~/components/FloatWithParagraph";
import { ImageWithCaption } from "~/components/ImageWithCaption";
import { TwoColumn } from "~/components/TwoColumn";

type MDXComponents = {
  [key: string]: ComponentType<Record<string, unknown>>;
};

export const mdxComponents: MDXComponents = {
  h1: ({ children, ...props }) => (
    <h1 className="text-4xl font-bold mb-4 mt-8 text-[#d8bbbe]" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2 className="text-3xl font-bold mb-3 mt-6 text-[#d8bbbe]" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 className="text-2xl font-bold mb-2 mt-4 text-[#d8bbbe]" {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, ...props }) => (
    <h4 className="text-xl font-bold mb-2 mt-4 text-[#d8bbbe]" {...props}>
      {children}
    </h4>
  ),
  h5: ({ children, ...props }) => (
    <h5 className="text-lg font-bold mb-2 mt-4 text-[#d8bbbe]" {...props}>
      {children}
    </h5>
  ),
  h6: ({ children, ...props }) => (
    <h6 className="text-base font-bold mb-2 mt-4 text-[#d8bbbe]" {...props}>
      {children}
    </h6>
  ),
  p: ({ children, ...props }) => (
    <p className="mb-4 text-[#d8bbbe] leading-relaxed" {...props}>
      {children}
    </p>
  ),
  a: ({ children, href, ...props }) => (
    <a
      href={href}
      className="text-[#d8bbbe] underline hover:text-white transition-colors"
      {...props}
    >
      {children}
    </a>
  ),
  ul: ({ children, ...props }) => (
    <ul className="list-disc list-inside mb-4 text-[#d8bbbe] space-y-2 ml-4" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="list-decimal list-inside mb-4 text-[#d8bbbe] space-y-2 ml-4" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="mb-1" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }) => (
    <blockquote className="border-l-4 border-[#603d41] pl-4 italic my-4 text-[#d8bbbe]" {...props}>
      {children}
    </blockquote>
  ),
  code: ({ children, className, ...props }) => {
    const isInline = !className;
    if (isInline) {
      return (
        <code
          className="bg-[#3e2427] text-[#d8bbbe] px-1 py-0.5 rounded text-sm font-mono"
          {...props}
        >
          {children}
        </code>
      );
    }
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
  pre: ({ children, ...props }) => (
    <pre className="bg-[#3e2427] p-4 rounded-lg overflow-x-auto mb-4 text-sm" {...props}>
      {children}
    </pre>
  ),
  table: ({ children, ...props }) => (
    <div className="overflow-x-auto mb-4">
      <table className="min-w-full border-collapse border border-[#603d41]" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }) => (
    <thead className="bg-[#3e2427]" {...props}>
      {children}
    </thead>
  ),
  tbody: ({ children, ...props }) => (
    <tbody className="text-[#d8bbbe]" {...props}>
      {children}
    </tbody>
  ),
  tr: ({ children, ...props }) => (
    <tr className="border-b border-[#603d41]" {...props}>
      {children}
    </tr>
  ),
  th: ({ children, ...props }) => (
    <th className="border border-[#603d41] px-4 py-2 text-left font-bold text-[#d8bbbe]" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td className="border border-[#603d41] px-4 py-2" {...props}>
      {children}
    </td>
  ),
  hr: () => <div className="decorative-spacer">✦ ✦ ✦</div>,
  img: ({ src, alt, ...props }) => (
    <img src={src} alt={alt} className="max-w-full h-auto rounded-lg my-4" {...props} />
  ),
  strong: ({ children, ...props }) => (
    <strong className="font-bold text-white" {...props}>
      {children}
    </strong>
  ),
  em: ({ children, ...props }) => (
    <em className="italic" {...props}>
      {children}
    </em>
  ),
  DropCap,
  FloatWithParagraph,
  ImageWithCaption,
  TwoColumn,
};

// Re-export components for direct import in MDX files
export { DropCap, FloatWithParagraph, ImageWithCaption, TwoColumn };
