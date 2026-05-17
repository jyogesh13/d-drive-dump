import { useCallback, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  const increment = useCallback(()=>{
    setCount(prevcount => prevcount + 1)
  },[]);

  return (
    <>
      <div>
        <Navbar onIncrement = {increment}/>
        <h1>Count: {count}</h1>
      </div>
    </>
  )
}

export default App
