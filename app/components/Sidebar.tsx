export function Sidebar() {
  return (
    <div id="sidebar" className="flex-none w-72">
      <div className="mt-4 w-48 aspect-square overflow-hidden rounded-sm shrink-0 mx-auto">
        <img
          src="/carl-hedcut.webp"
          alt="Carl Youngblood"
          className="w-full h-full object-cover"
          width={192}
          height={192}
          loading="lazy"
        />
      </div>
      <p className="mt-4 text text-sm leading-relaxed">
        Carl Youngblood is a software engineer, tech entrepreneur, philosopher and amateur musician.
        He co-founded the{" "}
        <a href="https://www.transfigurism.org">Mormon Transhumanist Association</a>, a non-profit
        dedicated to exploring the ethical and theological ramifications of science and technology
        from a Mormon perspective.
      </p>
      <p className="mt-4 text text-sm leading-relaxed">
        This is where he shares his personal thoughts and writings.
      </p>
      <p className="mt-6 text text-sm">
        <a
          href="/rss.xml"
          className="text-[#d8bbbe] hover:text-white transition-colors hover:underline"
        >
          Subscribe via RSS
        </a>
      </p>
      <p className="mt-8 text text-sm">
        Copyright &copy; 2010-{new Date().getFullYear()} Carl Youngblood
        <br />
        Shared under the{" "}
        <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/">
          Creative Commons BY-NC-ND 4.0
        </a>{" "}
        license.
      </p>
    </div>
  );
}
