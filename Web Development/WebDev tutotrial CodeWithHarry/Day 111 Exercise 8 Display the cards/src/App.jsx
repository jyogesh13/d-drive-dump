import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [apidata, setApidata] = useState([])

  useEffect( () => {
    // Fetch data from the API
    (async ()=>{
      try{
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if(!response.status === 200){
          throw new Error('Failed to fetch data');
        }else{
          const data = await response.json();
          setApidata(data);
        }
      }
      catch(error){
        console.log(error);
      }
    })();
  }, [])
  

  return (
    <>
    <div className="container flex flex-wrap ">
      {apidata.map((data)=>{
        return(
          <div className="cards p-[10px] m-4 border-[2px] w-[30vw] flex flex-col justify-center items-center " key={data.id}>
            <h2 className='text-[20px] italic font-black text-center'>{data.title}</h2>
            <p className='text-[15px] text-center'>{data.body}</p>
            <p>Post ID: {data.id}</p>
            <p>User ID: {data.userId}</p>
          </div>
        )
      })}
    </div>
    </>
  )
}

export default App
