import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [userdata, setUserdata] = useState([])

  useEffect(() => {
    axios.get('/api/posts')
      .then((response)=>{
        setUserdata(response.data)
      })
      .catch((err)=>{
        console.log(err)
      })
  }, [])
  
  return (
    <>
      <div>
        <h1>Home Page of Test full stack app</h1>
        <div>
          <h2>Totat posts: {userdata.length}</h2>
          {userdata.map((item)=>{
            return <div key={item.id}>
              <h2><span>{item.id}</span>. Title: {item.title}</h2>
              <h3>Description: {item.body}</h3>
            </div>
          })}
        </div>
      </div>
      { }
    </>
  )
}

export default App
