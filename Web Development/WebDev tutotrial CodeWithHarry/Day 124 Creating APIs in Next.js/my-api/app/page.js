"use client"
import Image from "next/image";
import { POST } from "./api/add/route";

export default function Home() {
  let data = {
    id:1,
    title:"first",
    desc:"sample data",
  }
  const handleClick = async ()=>{
    let a = await fetch("/api/add",{
      method:"POST",
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
    let res = await a.json();
    console.log(res);
    
  }
  return (
    <div>
      <h1 className="">Next.js Api routes demo</h1>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}
