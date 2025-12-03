import { useEffect } from "react";
import { Link } from "react-router-dom";

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

export default function Index() {
  useEffect(() => {
    document.title = "New Remix App";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Welcome to Remix!");
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = "Welcome to Remix!";
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <div className="bg-black">
      <Header />
      <main className="bg-[rgb(96,61,65)] px-6 pt-4 md:px-12 lg:pt-8 pb-12">
        <div className="flex flex-col lg:flex-row">
          <div id="main-content" className="grow lg:mr-12">
            <h1>H1 Title</h1>
            <p className="text-[#d8bbbe] text-shadow-md">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Fusce sodales ligula sed
              urna. Aliquam posuere arcu viverra erat. Pellentesque et enim dapibus ante facilisis
              bibendum. Nam congue dapibus urna. Vestibulum consequat arcu at magna. Nunc faucibus
              mollis lacus. Nulla tempor luctus tellus. Donec blandit lobortis pede. Vestibulum vel
              pede ut urna eleifend lacinia. Maecenas ligula nibh, imperdiet at, interdum eget,
              sagittis eu, enim. Vivamus vel urna. Donec fringilla ullamcorper sem. In risus arcu,
              pellentesque cursus, faucibus cursus, consequat quis, est. Aliquam id erat. Aliquam
              arcu. Phasellus vulputate. Integer sem diam, mattis vel, viverra ullamcorper,
              ultricies quis, nisl. Sed sollicitudin quam ut nisi. Vivamus velit sapien, volutpat
              eu, faucibus id, nonummy id, urna.
            </p>

            <p>
              Nunc tincidunt vehicula pede. Integer consequat quam sed nisl. Aenean elit massa,
              porta at, lacinia ut, elementum vel, metus. Integer eget mauris a quam rutrum
              ullamcorper. Morbi tempus nunc id mi. Pellentesque habitant morbi tristique senectus
              et netus et malesuada fames ac turpis egestas. Mauris ut nunc. Maecenas euismod
              accumsan diam. Ut quam nunc, eleifend at, dignissim a, tincidunt sed, leo. Ut non
              ligula. Etiam pretium. Proin vulputate. Sed volutpat dui vitae elit. In nec sapien
              eget elit suscipit scelerisque. Aenean egestas dictum odio. Proin scelerisque turpis.
            </p>

            <h2>H2 Title</h2>

            <p>
              Praesent iaculis pellentesque est. Nulla facilisi. Etiam fringilla vehicula orci.
              Aliquam fermentum ipsum id nulla. Aliquam interdum laoreet leo. Cras accumsan. Nam
              pharetra diam id nunc. Integer blandit tellus vulputate felis. Cras aliquam, eros in
              euismod aliquam, enim nisl mollis metus, quis fringilla ipsum diam ut pede. Mauris a
              libero ac velit interdum pulvinar. Nunc ipsum mauris, semper rhoncus, feugiat ut,
              egestas id, diam. Nullam porttitor condimentum risus. Vivamus nec enim eget nisi
              commodo euismod. Ut turpis. Nullam malesuada rutrum neque. Nam sodales porta elit.
              Mauris mollis nisl vel augue.
            </p>

            <h3>Unordered lists</h3>

            <ul>
              <li>Lorem ipsum dolor sit amet</li>
              <li>Consectetur adipisicing elit</li>
              <li>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</li>
              <li>Ut enim ad minim veniam</li>
            </ul>

            <h3>Ordered lists</h3>
            <ol>
              <li>Consectetur adipisicing elit</li>
              <li>Sed do eiusmod tempor incididunt ut labore</li>
              <li>Et dolore magna aliqua</li>
            </ol>
            <h3>Blockquotes</h3>
            <blockquote>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
              </p>
            </blockquote>

            <p>
              Mauris porttitor augue ut ante. Nullam blandit ipsum vel pede. Nunc commodo arcu id
              pede. Phasellus interdum urna nec ante. Class aptent taciti sociosqu ad litora
              torquent per conubia nostra, per inceptos hymenaeos. Mauris nec felis eu massa
              facilisis vehicula. Pellentesque odio eros, congue non, dapibus eget, hendrerit sed,
              nulla. Curabitur sed pede ultricies lacus tristique tempor. Vivamus eget tellus nec
              justo sagittis porta. Donec ipsum nulla, hendrerit id, cursus sed, dictum non, lectus.
              In euismod feugiat nibh. Nam pretium, massa eget bibendum consectetuer, magna mauris
              tincidunt tellus, quis faucibus risus quam bibendum arcu.
            </p>

            <p>
              <a href="https://google.com/">This is a link</a>.<strong>This is strong</strong>.
              <s>This is strikethrough</s>.<em>This is italicized</em>.
            </p>

            <h3>Tables</h3>
            <table>
              <caption>Jimi Hendrix Albums</caption>
              <thead>
                <tr>
                  <th>Album</th>
                  <th>Year</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Are You Experienced</td>
                  <td>1967</td>
                  <td>$10.00</td>
                </tr>
                <tr>
                  <td>Axis: Bold as Love</td>
                  <td>1967</td>
                  <td>$12.00</td>
                </tr>
                <tr>
                  <td>Electric Ladyland</td>
                  <td>1968</td>
                  <td>$10.00</td>
                </tr>
                <tr>
                  <td>Band of Gypsys</td>
                  <td>1970</td>
                  <td>$10.00</td>
                </tr>
              </tbody>
            </table>

            <p>
              Pellentesque tempor, dui ut ultrices viverra, neque urna blandit nisi, id accumsan
              dolor est vitae risus. Aliquam erat volutpat. Sed aliquet, quam quis aliquet lacinia,
              leo urna mollis tortor, sed nonummy libero leo eget nunc. Fusce at nibh sit amet sem
              aliquet convallis. Proin non massa. Phasellus ultricies, purus semper malesuada
              pellentesque, felis sapien euismod nunc, eget lobortis ipsum magna ac dolor. Aliquam
              erat volutpat. Donec ultrices nibh a massa. Integer tincidunt ultrices nibh. Nulla
              vehicula sem sit amet nisi. Vestibulum nisi. Donec turpis diam, sodales eu, tristique
              nec, consequat sit amet, tortor. Quisque velit tellus, volutpat nec, accumsan quis,
              elementum ut, libero. Cras pretium mauris ultricies risus. Nulla id nunc. Lorem ipsum
              dolor sit amet, consectetuer adipiscing elit. Integer pharetra est in
            </p>
          </div>
          <div id="sidebar" className="flex-none w-72">
            <h3>Sidebar</h3>
            <p className="pt-8 text text-sm">
              Copyright ©️ 2010-2024 Carl Youngblood
              <br />
              Shared under the{" "}
              <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/">
                Creative Commons BY-NC-ND 4.0
              </a>{" "}
              license.
              <br />
              <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/">
                <img
                  alt="Creative Commons logo BY-NC-ND 4.0"
                  src="https://mirrors.creativecommons.org/presskit/buttons/88x31/svg/by-nc-nd.svg"
                  width="88"
                  height="31"
                  decoding="async"
                  data-nimg="1"
                  className="w-24"
                  loading="lazy"
                />
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
