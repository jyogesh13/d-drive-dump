import { useState, createContext, useContext } from "react";
import "./App.css"

const userContext = createContext();

function App() {
  const [user, setuser] = useState(0)
  return (
    <>
    <userContext.Provider value={{user, setuser}}>
      <h1>The Index Page</h1>
      <h2><span><User/></span>Current user are: {user}</h2>
    </userContext.Provider>
    </>
  )
}

function User(){
  const user_obj = useContext(userContext)
  return (
    <div>
      <button onClick={()=>user_obj.setuser(user_obj.user+1)}>Update User</button>
    </div>
  )
}

export default App;