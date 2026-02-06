import type { Plugin } from "vite";
import { compile } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import remarkSmartypants from "remark-smartypants";
import rehypeHighlight from "rehype-highlight";
import type { Root } from "mdast";
import { visit } from "unist-util-visit";

/**
 * Remark plugin that collapses line breaks within paragraphs.
 * Single line breaks in paragraphs are converted to spaces.
 */
function remarkCollapseParagraphBreaks() {
  return (tree: Root) => {
    visit(tree, "paragraph", (node) => {
      if (node.children) {
        const newChildren: typeof node.children = [];
        for (let i = 0; i < node.children.length; i++) {
          const child = node.children[i];

          // If we encounter a break (line break), convert it to a space
          if (child.type === "break") {
            // Check if the previous child is text - if so, append a space to it
            // Otherwise, create a new text node with a space
            if (newChildren.length > 0 && newChildren[newChildren.length - 1].type === "text") {
              const lastText = newChildren[newChildren.length - 1] as {
                type: "text";
                value: string;
              };
              lastText.value += " ";
            } else {
              newChildren.push({ type: "text", value: " " });
            }
          } else if (child.type === "text") {
            // Replace newlines within text nodes with spaces
            const textChild = child as { type: "text"; value: string };
            const normalizedValue = textChild.value.replace(/\n/g, " ");

            // Merge with previous text node if it exists
            if (newChildren.length > 0 && newChildren[newChildren.length - 1].type === "text") {
              const lastText = newChildren[newChildren.length - 1] as {
                type: "text";
                value: string;
              };
              lastText.value += normalizedValue;
            } else {
              newChildren.push({ type: "text", value: normalizedValue });
            }
          } else {
            newChildren.push(child);
          }
        }
        node.children = newChildren;
      }
    });
  };
}

/**
 * Remark plugin that removes preview end comments from the AST.
 * These are used for excerpt generation but shouldn't appear in rendered output.
 */
function remarkRemovePreviewComments() {
  return (tree: Root) => {
    visit(tree, "mdxFlowExpression", (node, index, parent) => {
      if (node.value && /^\s*\/\*\s*preview\s+ends\s*\*\/\s*$/i.test(node.value)) {
        if (parent && typeof index === "number") {
          parent.children.splice(index, 1);
          return index; // Re-visit the same index since we removed a node
        }
      }
    });
  };
}

export function mdxPlugin(): Plugin {
  return {
    name: "mdx-plugin",
    enforce: "pre",
    async transform(code, id) {
      if (id.endsWith(".mdx")) {
        try {
          const result = await compile(code, {
            remarkPlugins: [
              remarkFrontmatter,
              remarkMdxFrontmatter,
              remarkCollapseParagraphBreaks,
              remarkRemovePreviewComments,
              remarkGfm,
              remarkSmartypants,
            ],
            rehypePlugins: [rehypeHighlight],
            outputFormat: "program",
            jsxImportSource: "react",
          });

          return {
            code: String(result),
            map: null,
          };
        } catch (error) {
          console.error(`Error processing MDX file ${id}:`, error);
          throw error;
        }
      }
    },
  };
}
