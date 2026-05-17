//​The useEffect Hook in React is a powerful tool that allows you to perform side effects in function components. Side effects can include data fetching, subscriptions, or manually changing the DOM. Understanding and mastering useEffect is crucial for creating dynamic and efficient React applications.

import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'

function App() {
  const [count, setCount] = useState(0)
  const [color, setColor] = useState(0)

  //case 1: run on every render
  useEffect(() => {
    alert("Hey this runs everytime")
  })
  
  //case 2: run only on first render
  useEffect(() => {
    alert("Hey welcome to the app")
  }, [])
  
  //case 3: run on every render when count changes
  useEffect(() => {
    alert("button clicked")
    setColor(color+1)
  }, [count])
  

  return (
    <>
      <Navbar color={"red" + count}/>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
