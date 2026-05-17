import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


function App() {

  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showfinished, setshowfinished] = useState(true)

  useEffect(() => {
    const todostrings = localStorage.getItem('todos');
    if (todostrings) {
      const storedTodos = (JSON.parse(todostrings))
      settodos(storedTodos)
    }
  }, [])


  const saveToLs = () => {
    console.log("saving to local storage", todos)
    localStorage.setItem('todos', JSON.stringify(todos))
  }

  const handleEdit = (e, id) => {
    const t = todos.filter(i => i.id === id)
    settodo(t[0].todo)
    const newTodos = todos.filter(item => item.id !== id)
    settodos(newTodos)
    saveToLs()
  }

  const handleDelete = (e, id) => {
    //add a functionality to confirm from user to delete the todo
    const newTodos = todos.filter(item => item.id !== id)
    settodos(newTodos)
    saveToLs()

  }

  const handleAdd = () => {
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    settodo("")
    saveToLs()

  }

  const handleChange = (e) => {
    settodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    console.log("the id is", id)
    const updatedTodos = todos.map(items => {
      if (items.id === id) {
        return { ...items, isCompleted: !items.isCompleted }
      }
      return items
    })
    settodos(updatedTodos)
    saveToLs()

  }

  const toggleFinished = (params) => {
    setshowfinished(!showfinished)
  }


  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:w-[35%] md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh]">
        <h1 className='text-center font-bold text-xl'>iTask - Manage your tasks in one place</h1>
        <section className="addTodo my-5 flex flex-col gap-3 ">
          <h2 className='text-lg font-bold'>Add a Todo</h2>
          <div className="flex">
          <input onChange={handleChange} value={todo} className='bg-white w-full rounded-xl px-5 py-1' type="text" name='task' id='task' placeholder='Add Task' />
          <button onClick={handleAdd} disabled={todo.length < 3} className='bg-violet-800 cursor-pointer hover:bg-violet-950 p-3 py-1 mx-2 text-sm font-bold text-white rounded-2xl disabled:bg-violet-700' >Save</button>
          </div>

          <div className='flex gap-2'>
            <input type='checkbox' name='completed' id='completed' checked={showfinished} onChange={toggleFinished} />
            <label htmlFor="completed">Show Completed</label>
          </div>
        </section>

        <section className='todos'>
          <h2 className='text-lg font-bold'>Your Todos</h2>
          {todos.length === 0 && <h2 className='m-5'>No Todos to display</h2>}
          {todos.map(item => {
            return (showfinished || !item.isCompleted) && (
              <div key={item.id} className="todo flex my-3 md:w-1/2 justify-between items-center">
                <div className='flex gap-4'>
                  <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} />
                  <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
                </div>
                <div className="buttons flex h-full">
                  <button onClick={(e) => handleEdit(e, item.id)} className='bg-violet-800 hover:bg-violet-950 p-3 py-1 text-sm font-bold text-white rounded-md mx-1'><FaRegEdit /></button>
                  <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 p-3 py-1 text-sm font-bold text-white rounded-md mx-1'><MdDelete /></button>
                </div>
              </div>
            )
          })}
        </section>

      </div>
    </>
  )
}

export default App
