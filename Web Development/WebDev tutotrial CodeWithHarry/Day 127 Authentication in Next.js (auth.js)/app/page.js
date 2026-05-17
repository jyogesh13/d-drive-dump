"use client"
import { useSession, signIn, signOut } from "next-auth/react";

export default function Page(){
  const {data: session} = useSession();
  console.log(session);
  
  if(session){
    return <>
      Signed in as {session.user.email} <br/>
      <button onClick={()=>signOut()}>Sign out</button>
    </>
  }
    return <>
      Not Signed in <br/>
      <button onClick={()=>signIn()}>Sign in</button>
      <button onClick={()=>signIn("github")}>Sign in using github</button> {/*direct sign in on same page */}
    </>
}
