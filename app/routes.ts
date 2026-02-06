import type { RouteConfig } from "@react-router/dev/routes";
import { index, route } from "@react-router/dev/routes";

export default [
  index("./routes/_index.tsx"),
  route("rss.xml", "./routes/rss.xml.tsx"),
  route("tags", "./routes/blog.tags.tsx"),
  route("page/:page", "./routes/blog.page.$page.tsx"),
  route(":slug", "./routes/blog.$slug.tsx"),
] satisfies RouteConfig;
