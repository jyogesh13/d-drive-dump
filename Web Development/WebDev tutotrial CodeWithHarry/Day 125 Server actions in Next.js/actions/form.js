"use server"
import fs from "node:fs/promises";
export const SubmitAction = async (e)=>{
    console.log(e.get("name"), e.get("email"), e.get("password"));
    let a = await fs.writeFile(
      "server.txt",
      `Name: ${e.get("name")}\nEmail: ${e.get("email")}\nPassword: ${e.get("password")}`)
    console.log(a);
    
  }