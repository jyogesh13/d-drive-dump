import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [showbtn, setshowbtn] = useState(false)
  const [todos, settodos] = useState([
    { id: 1, title: 'Todo 1', description: 'Todo 1 description' },
    { id: 2, title: 'Todo 2', description: 'Todo 2 description' },
    { id: 3, title: 'Todo 3', description: 'Todo 3 description' }
  ]);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>

      {/* ternary operator: conditional rendering */}
      {showbtn? <button>Showbtn is True</button>: <button>Showbtn is False</button>} 

      {/* short circuit operator(&&): conditional rendering */}
      {/* {showbtn && <button>Showbtn is true</button> */}

      {/* map function: iterate over todos array */
      todos.map((todo)=>{
        return(
          <div className="card m-4 border-[2px] border-purple-400 rounded-[10px]" key={todo.id}>
            <h2 className=''>{todo.title}</h2>
            <p className=''>{todo.description}</p>
          </div>
        )
      })}

      <div className="card">
        <button onClick={() => {
          setCount((count) => count + 1)
          setshowbtn(!showbtn)
        }
        }>
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
