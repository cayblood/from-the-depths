import Image from 'next/image'

export function SideBar() {
  return <div id="sidebar" className="flex-none w-72">
    <h3>Sidebar</h3>
    <p className="pt-8 text text-sm">
      Copyright ©️ 2010-{new Date().getFullYear()} Carl Youngblood<br />
      Shared under the <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/">Creative Commons BY-NC-ND 4.0</a> license.<br />
      <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/">
        <Image
          className="w-24" src="https://mirrors.creativecommons.org/presskit/buttons/88x31/svg/by-nc-nd.svg"
          width="88" height="31"
          alt="Creative Commons logo BY-NC-ND 4.0" />
      </a>
    </p>
  </div>;
}
