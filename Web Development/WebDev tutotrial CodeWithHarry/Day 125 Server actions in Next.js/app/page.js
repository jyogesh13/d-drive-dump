"use client"
import { useRef } from "react";
import { SubmitAction } from "@/actions/form";
// import fs from "fs/promises"

export default function Home() {
  // const SubmitAction = async (e)=>{
  //   "use server"
  //     console.log(e.get("name"), e.get("email"), e.get("password"));
  //     let a = await fs.writeFile(
  //       "server.txt",
  //       `Name: ${e.get("name")}\nEmail: ${e.get("email")}\nPassword: ${e.get("password")}`)
  //     console.log(a);
      
  //   }
  const  ref = useRef();
  return (
    <div className="bg-red-500 w-1/4 mx-auto my-2 py-2">
      <form ref={ref} action={(e)=>{ SubmitAction(e); ref.current.reset()}} className=" flex flex-col gap-1.5 items-center justify-center">
        <div>
          <label htmlFor="name">Username:</label>
          <input name="name" id="name" type="text" placeholder="johnDoe" className="text-black mx-2 border-2" />
        </div>
        <div className="w-70">
          <label htmlFor="email">Email:</label>
          <input name="email" id="email" type="email" placeholder="johnDoe@example.com" className="text-black mx-2" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input name="password" id="password" type="password" className="text-black mx-2 bg-blue-100"/>
        </div>
        <div>
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
}
