import { useState, useMemo, useEffect } from "react";
import "./App.css"

const App = ()=>{
  const [count, setcount] = useState(0);
  const [todos, settodos] = useState([]);
  const magical = useMemo(()=>expensiveCalculation(count), [count]);

  const increment = ()=>{
    setcount(count + 1);
  }

  const addTodo = () => {
    settodos([...todos, { id: todos.length, title: "Todo " + todos.length}]);
  }



  return (
    <>
      <section>
        <h1>My Todos</h1>
        {todos.map((todo)=>{
          return <p key={todo.id}>{todo.title}</p>
        })}
        <button onClick={addTodo}>Add task</button>
      </section>
      <section>
        <h1>UseMemo</h1>
        <h2>Count: {count}</h2>
        <button onClick={increment}>Update count</button>
        <h2>Magical number</h2>
        {magical.isMagical}
      </section>
    </>
  )
}

const expensiveCalculation = (num) =>{
  let sum = 0
  let arr = new Array(num*1000000).fill(1);
  arr.forEach(element => {
    sum += element;
  });
  return {isMagical: sum};
}
export default App;