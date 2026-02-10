/// <reference types="vite/client" />
import { useEffect, type ReactNode } from "react";
import { Outlet, Link, HeadContent, Scripts, createRootRoute } from "@tanstack/react-router";
import tailwindUrl from "~/tailwind.css?url";

function Header() {
  return (
    <>
      <header className="flex flex-row w-full h-36 bg-black">
        <div className="ml-4 flex-none w-20 lg:w-32">
          <video
            src="/candle360p.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="h-32 object-cover"
          />
        </div>
        <div className="grow bg-linear-to-r from-black to-[#382023]">
          <div className="grow flex flex-col h-36 lg:flex-row mt-4 lg:mt-0 justify-center mr-8">
            <div className="lg:grow lg:grid">
              <Link className="self-center" to="/">
                <img
                  src="/from-the-depths-logo.png"
                  alt="From the Depths logo"
                  width="384"
                  height="38"
                  decoding="async"
                  className="w-96 object-scale-down"
                  loading="lazy"
                />
              </Link>
            </div>
            <p className="mt-3 text-sm sm:text-base md:text-lg lg:text-xl font-serif italic text-umber lg:self-center">
              De profundis clamavi ad te Domine
            </p>
          </div>
        </div>
      </header>
      <div className="border-t-8 border-[#603d41] bg-linear-to-b from-[#3e2427] to-[#603d41] h-6" />
    </>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
      { title: "From the Depths" },
    ],
    links: [
      { rel: "stylesheet", href: tailwindUrl },
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
      },
      {
        rel: "alternate",
        type: "application/rss+xml",
        title: "From the Depths RSS",
        href: "/rss.xml",
      },
    ],
    scripts: [
      { src: "/gtag.js" },
      { src: "https://www.googletagmanager.com/gtag/js?id=G-GQ7WLCX63X", async: true },
      {
        children: `if (typeof window !== 'undefined' && typeof window.gtag === 'function') { window.gtag('js', new Date()); window.gtag('config', 'G-GQ7WLCX63X'); }`,
      },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  useEffect(() => {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("js", new Date());
      window.gtag("config", "G-GQ7WLCX63X");
    }
  }, []);

  useEffect(() => {
    if (document.querySelector('link[href*="fonts.googleapis.com"]')) return;
    const preconnect1 = document.createElement("link");
    preconnect1.rel = "preconnect";
    preconnect1.href = "https://fonts.googleapis.com";
    document.head.appendChild(preconnect1);
    const preconnect2 = document.createElement("link");
    preconnect2.rel = "preconnect";
    preconnect2.href = "https://fonts.gstatic.com";
    preconnect2.crossOrigin = "anonymous";
    document.head.appendChild(preconnect2);
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap";
    document.head.appendChild(link);
  }, []);

  return (
    <RootDocument>
      <div className="bg-[rgb(96,61,65)]">
        <Header />
        <Outlet />
      </div>
    </RootDocument>
  );
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
