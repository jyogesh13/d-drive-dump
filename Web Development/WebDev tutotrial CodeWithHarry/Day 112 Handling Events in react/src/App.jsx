import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [color, setcolor] = useState("black")
  // const [name, setname] = useState('')
  const [form, setform] = useState({})

  const handleClick = ()=>{
    console.log('Button CLicked')
  }

  const handleHover = ()=>{
    console.log('Button Hovered')
    setcolor("red")
  }

  const handleName = (e)=>{
    console.log(e.target.value)
    setname(e.target.value)
  }

  const handleForm = (e)=>{
    setform({...form, [e.target.name]: e.target.value})
    console.log("Inside handleForm", form)
  }

  console.log(form)

  return (
    <>
      <div className="button">
        <button onClick={handleClick} onMouseOver={handleHover} style={{background:color}}>Click me</button>
      </div>
      <div className="form-container">
        <form action="#">
          <label htmlFor="name">Name:</label>
          <input value={form.Name?form.Name:""} type="text" name='Name' id='name' onChange={handleForm}/>

          <label htmlFor="mail">Email:</label>
          <input value={form.Email?form.Email:""} type="email" name='Email' id='mail' onChange={handleForm} />
        </form>
      </div>
      {/* {name != "" && <h2>Your name is {name}</h2>} */}
    </>
  )
}

export default App
