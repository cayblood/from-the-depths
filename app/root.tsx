import { useEffect } from "react";
import { Outlet, Link, Links, Meta, Scripts, ScrollRestoration } from "react-router";
import "./tailwind.css";

type LinkDescriptor =
  | { rel: string; href: string; crossOrigin?: string }
  | { rel: string; href: string };

function Header() {
  return (
    <>
      <header className="flex flex-row w-full h-36 bg-black">
        <div className="ml-4 flex-none w-20 lg:w-32">
          <video src="/candle360p.mp4" autoPlay loop muted className="h-32 object-cover" />
        </div>
        <div className="grow bg-linear-to-r from-black to-[#382023]">
          <div className="grow flex flex-col h-36 lg:flex-row justify-center mr-8">
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

export const links = (): LinkDescriptor[] => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <title>From the Depths</title>
        <Links />
        <Meta />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function HydrateFallback() {
  return (
    <div className="bg-[rgb(96,61,65)] min-h-screen flex items-center justify-center">
      <p className="text-[#d8bbbe]">Loading...</p>
    </div>
  );
}

export default function Root() {
  useEffect(() => {
    // Fallback for fonts if links didn't run (e.g. in some preview modes)
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
    <div className="bg-[rgb(96,61,65)]">
      <Header />
      <Outlet />
    </div>
  );
}
