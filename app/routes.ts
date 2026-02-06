import type { RouteConfig } from "@react-router/dev/routes";
import { index, route } from "@react-router/dev/routes";

export default [
  index("./routes/_index.tsx"),
  route("blog", "./routes/blog.tsx"),
  route("page/:page", "./routes/blog.page.$page.tsx"),
  route("blog/tags", "./routes/blog.tags.tsx"),
  route("blog/:slug", "./routes/blog.$slug.tsx"),
  route("rss.xml", "./routes/rss.xml.tsx"),
] satisfies RouteConfig;
