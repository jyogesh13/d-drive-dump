export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center items-center text-white min-h-[44vh] gap-4">
        <div className="font-bold text-5xl flex justify-center items-center gap-2 ">
          Buy Me a Chai{" "}
          <span>
            <img src="/tea.gif" alt="" width={88} />
          </span>{" "}
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi
          officia accusamus repellendus quos labore totam mollitia dicta sint
          veniam assumenda?
        </p>
        <div>
          <button
            type="button"
            className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer"
          >
            Start now
          </button>
          <button
            type="button"
            className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer"
          >
            Read more
          </button>
        </div>
      </div>

      <div className="h-1 bg-white opacity-10"></div>

      <div className="text-white w-3/4 mx-auto pb-32 pt-14">
        <h1 className="text-3xl text-center font-bold mb-12">
          Your Fans can buy you a chai
        </h1>
        <div className="flex gap-5 justify-around">
          <div className="item space-y-3 flex flex-col justify-center items-center">
            <img
              className="bg-slate-700 p-2 rounded-full text-black"
              width={88}
              src="/man.gif"
              alt=""
            />
            <p className="font-bold s">Fans want to help</p>
            <p className="text-center">Your fans are available for you to help you</p>
          </div>
          <div className="item space-y-3 flex flex-col justify-center items-center">
            <img
              className="bg-slate-700 p-2 rounded-full text-black"
              width={88}
              src="/coin.gif"
              alt=""
            />
            <p className="font-bold s">Fans want to help</p>
            <p className="text-center">Your fans are available for you to help you</p>
          </div>
          <div className="item space-y-3 flex flex-col justify-center items-center ">
            <img
              className="bg-slate-700 p-2 rounded-full text-black"
              width={88}
              src="/group.gif"
              alt=""
            />
            <p className="font-bold s">Fans want to help</p>
            <p className="text-center">Your fans are available for you to help you</p>
          </div>
        </div>
      </div>

      <div className="h-1 bg-white opacity-10"></div>

      <div className="text-white w-3/4 mx-auto pb-32 pt-14 flex flex-col justify-center items-center">
        <h1 className="text-3xl text-center font-bold mb-14">
          Learn more about us
        </h1>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/QtaorVNAwbI?si=CdUXmfe34JV2oJP1" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
      </div>
    </>
  );
}
