import Link from 'next/link'
import Image from 'next/image'

export function Header() {
  return <>
    <header className="flex flex-row w-full h-36 bg-black">
      <div className="ml-4 flex-none w-20 lg:w-32">
        <video src="/candle360p.mp4" autoPlay muted loop className="h-32 object-cover" />
      </div>
      <div className="flex-grow bg-gradient-to-r from-black to-[#382023]">
        <div className="flex-grow flex flex-col h-36 lg:flex-row justify-center mr-8">
          <div className="lg:flex-grow lg:grid">
            <Link href="/" className="self-center">
              <Image
                src="/from-the-depths-logo.png"
                width="384"
                height="38"
                className="w-96 object-scale-down"
                alt="From the Depths logo" />
            </Link>
          </div>
          <div className="mt-3 text text-sm sm:text-base md:text-lg lg:text-xl font-serif italic text-umber lg:self-center">
            De profundis clamavi ad te Domine
          </div>
        </div>
      </div>
    </header>
    <div className="border-t-8 border-[#603d41] bg-gradient-to-b from-[#3e2427] to-[#603d41] h-6"></div>
  </>;
}