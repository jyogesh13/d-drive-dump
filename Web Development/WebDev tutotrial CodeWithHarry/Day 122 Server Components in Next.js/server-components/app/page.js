// By Default every component is Next.js is a server component, i.e. it will first run on server side then will be available on client side.
// to use a component as a client side component we have to add "use client" at the start of every component.
"use client"
import {useState,useEffect} from 'react'

const Home = () => {
  const [count,setCount] = useState(0)
  return (
    <div>
      <h1 className="text-xl">Count: {count}</h1>
      <button className=' border-2 border-amber-300' onClick={()=>setCount(count+1)}>Increase count</button>
    </div>
  )
}

export default Home

