// import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router";

const Sidebar = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["chatsList"],
    queryFn: () => fetch(`${import.meta.env.VITE_API_URL}/api/v1/chats/conversations`,{credentials: "include"}).then((res) => res.json()),
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <aside
      id="top-bar-sidebar"
      className="flex flex-col h-full"
      aria-label="Sidebar"
    >
      <div className="flex flex-col w-full justify-center items-start gap-1 ">
        <span className="text-[10px] font-semibold mb-2.5">DASHBOARD</span>

        <NavLink
          className={"p-2.5 rounded-xl w-full  hover:bg-[#2c2937]"}
          to={"/dashboard"}
        >
          Create New Chat
        </NavLink>
        <NavLink
          className={"p-2.5 rounded-xl  w-full  hover:bg-[#2c2937]"}
          to={"/"}
        >
          Explore
        </NavLink>
        <NavLink
          className={"p-2.5 rounded-xl w-full  hover:bg-[#2c2937]"}
          to={"/"}
        >
          Contact
        </NavLink>

        <hr className="border-none h-0.5 w-full bg-[#ddd] opacity-10 rounded-2xl my-5 mx-0" />
        <span className="text-[10px] font-semibold mb-2.5">RECENT CHATS</span>
        <div className="flex flex-col w-full overflow-auto">
          {data[0]?.chats?.map((chat,i) => {
            return (
              <NavLink
              key={i}
                className={"p-2.5 rounded-xl hover:bg-[#2c2937]"}
                to={`/dashboard/chats/${chat.chatId}`}
              >
                {chat.title}
              </NavLink>
            );
          })}
        </div>
        <hr className="border-none h-0.5 w-full bg-white opacity-10 rounded-2xl mt-2" />
      </div>
      <div className="flex justify-center items-center gap-2.5 text-sm p-1 mt-auto">
        <img className="w-6 h-6" src="src/assets/logo.png" alt="" />
        <div className="flex flex-col">
          <span className="font-semibold">Upgrade to Pro</span>
          <span className="text-[#888]">
            Get unlimited access to all features
          </span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
