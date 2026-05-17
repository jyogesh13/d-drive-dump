import './App.css'
import { useForm } from "react-hook-form"

function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm()

  const delay = (d)=>{
    return new Promise((res, rej)=>{
      setTimeout(()=>{
        res()
      }, d* 1000)
    })
  }

  const onSubmit = async (data) => {
    // await delay(2)
    // if(data.username !== "shubham"){
    //   setError("myform", {message: "Your form is not in good order because credentials are invalid"})
    // }
    // if(data.username === "rohan"){
    //   setError("blocked", {message: "Sorry this user is blocked"})
    // }

    console.log(data);
    let response = await fetch("http://localhost:3000/", {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data)})
    let res = await response.text();
    console.log(res);
  }

  return (
    <>
    {isSubmitting && <div>Loading...</div>}
      <div className="form">
        {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <input placeholder='username' {...register("username", { required: { value: true, message: "This field cannot be empty" } })} />
          <br />
          {errors.username && <span>{errors.username.message}</span>}
          <br />
          <input placeholder='password' {...register("password", { required: { value: true, message: "This field cannot be empty" } })} />
          <br />
          {errors.password && <span>{errors.password.message}</span>}
          <br />
          <input disabled={isSubmitting} type="submit" value="Submit" />
          {errors.myform && <div className='red'>{errors.myform.message}</div>}
          {errors.blocked && <div className='red'>{errors.blocked.message}</div>}
        </form>
      </div>
    </>
  )
}

export default App
