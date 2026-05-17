"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const TableSearch = () => {
  const router = useRouter();

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = (e.currentTarget[0] as HTMLInputElement).value;
    const params = new URLSearchParams(window.location.search);
    params.set("search", value);
    router.push(`${window.location.pathname}?${params}`);
  };
  return (
    <form
      className="w-full md:w-auto flex gap-1 border border-gray-300 shadow bg-white/30 rounded-4xl py-0.5 px-1"
      onSubmit={handleSubmit}
    >
      <div className="flex justify-center items-center w-7 h-7">
        <Image src={"/search.png"} alt="search" width={15} height={15} />
      </div>
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Search..."
        className="outline-0 w-40"
      />
    </form>
  );
};

export default TableSearch;
