"use client"
import { useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const { data: session } = useSession();
    const router = useRouter();
    useEffect(() => {
      console.log(session)
    
      if(!session){
        router.push('/login')
      }
    }, [])
    
  return (
    <div>
      Hello and welcome to your dashboard!
    </div>
  )
}

export default Dashboard
