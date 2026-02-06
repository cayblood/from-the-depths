import { useEffect } from "react";

export default function RSSFeed() {
  useEffect(() => {
    // Redirect to the static RSS file
    window.location.href = "/rss.xml";
  }, []);

  return null;
}
