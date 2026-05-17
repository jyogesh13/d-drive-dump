import { useState } from "react";
import { NavLink } from "react-router";
import { TypeAnimation } from "react-type-animation";

const Home = () => {
  const [typingStatus, setTypingStatus] = useState("human1");
  const typingImg = {
    human1: "src/assets/human1.jpeg",
    human2: "src/assets/human2.jpeg",
    bot: "src/assets/bot.png",
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-5 md:gap-18 h-full relative overflow-hidden">
      <img
        className="absolute bottom-0 left-0 opacity-5 animate-rotate-orbital-100s z-[-1]  "
        src="src\assets\orbital.png"
        alt=""
      />
      <div className="flex-1 mt-10 md:mt-0 flex flex-col items-center justify-center gap-2">
        {/* left */}
        <h1 className=" text-6xl  md:text-9xl font-bold bg-linear-to-r from-[#217bfe] to-[#e55571] bg-clip-text text-transparent  ">
          LAMA AI
        </h1>
        <h2 className="text-[10px] md:text-[22px] font-bold">
          Supercharge your creativity and productivity
        </h2>
        <h3 className="text-[10px] md:text-sm text-center max-w-[70%] font-bold">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa
          distinctio delectus modi sunt debitis autem magnam quis similique
          incidunt placeat.
        </h3>
        <NavLink
          className={`px-2 py-1 md:py-3 md:px-6 md:mt-5 bg-[#217bfe] text-white rounded-2xl md:rounded-4xl text-[14px] hover:shadow hover:shadow-amber-50 cursor-pointer`}
          to={"/dashboard"}
        >
          Get Started
        </NavLink>
        
      </div>
      <div className="flex-1 flex flex-col md:justify-center items-center h-full w-full">
        {/* right */}
        <div className="w-[90%] h-[60%] md:w-[80%] md:h-[50%] flex justify-center items-center bg-[#140e2d] rounded-2xl md:rounded-[50px] relative">
          <div className="w-full h-full overflow-hidden absolute top-0 left-0 rounded-[50px] ">
            <div
              className={`bg-[url(src/assets/bg.png)] w-[200%] h-full opacity-[0.2] bg-size-[auto_150%] animate-slide-bg`}
            ></div>
          </div>
          <img
            className="w-full h-full object-contain animate-bot-animate"
            src="src\assets\bot.png"
            alt=""
          />
          <div className="absolute -bottom-8 -right-12  items-center gap-2 p-3  rounded-xl bg-[#2c2937] hidden md:flex">
            <img
              className="w-8 h-8 rounded-full object-cover  "
              src={typingImg[typingStatus]}
              alt=""
            />
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed out once, initially
                "Human1: We produce food for Mice",
                2000,
                () => {
                  setTypingStatus("bot");
                },
                "Bot: We produce food for Hamsters",
                2000,
                () => {
                  setTypingStatus("human2");
                },
                "Human2: We produce food for Guinea Pigs",
                2000,
                () => {
                  setTypingStatus("bot");
                },
                "Bot: We produce food for Chinchillas",
                2000,
                () => {
                  setTypingStatus("human1");
                },
              ]}
              wrapper="span"
              repeat={Infinity}
              cursor={true}
              omitDeletionAnimation={true}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 absolute bottom-0 left-[50%] transform-[translateX(-50%)]">
        <img className="w-4 h-4" src="src/assets/logo.png" alt="" />
        <div className="flex gap-1 md:gap-3 text-[#888] text-[8px] md:text-[10px]">
          <NavLink to={"/"}>Terms of Service</NavLink>
          <NavLink to={"/"}>Privacy Policy</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Home;
