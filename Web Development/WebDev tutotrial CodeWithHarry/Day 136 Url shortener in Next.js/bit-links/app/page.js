import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-purple-100">
      <section className="grid grid-cols-2 h-[50vh]">
        <div className=" flex flex-col gap-4 items-center justify-center text-center">
          <p className="font-bold text-3xl">
            The best url shortener in the market
          </p>
          <p className="px-20 text-wrap text-center">
            {/*write somethting about this website */}
            Bit Links is a powerful URL shortener that allows you to create
            short, memorable links for your website or application. With Bit
            Links, you can easily share links on social media, in emails, or
            anywhere else you need to share a link. Plus, you can track the
            performance of your links with detailed analytics.
          </p>
          <div className="flex gap-3">
            <Link href="/shorten">
              <button className="hover:bg-gray-950 hover:text-white bg-purple-500 p-1 px-2 rounded-xl cursor-pointer">
                Try now
              </button>
            </Link>
            <Link target="_blank" href="/github">
              <button className="hover:bg-slate-900 hover:text-white bg-amber-600 p-1 px-2 rounded-xl cursor-pointer">
                Github
              </button>
            </Link>
          </div>
        </div>
        <div className=" flex justify-start relative">
          <Image
            className="mix-blend-darken"
            alt="a vector image"
            src={"/vector.jpg"}
            fill={true}
          />
        </div>
      </section>
    </main>
  );
}
