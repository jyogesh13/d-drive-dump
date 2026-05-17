import './login.css'
import { useRef, useState } from 'react';
import { LocationOn, Close } from '@mui/icons-material';
import axios from 'axios';

const Login = ({setShowLogIn, myStorage, setCurrentUser}) => {
    const [error, setError] = useState(false)
    const nameRef = useRef();
    const passwordRef = useRef();
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const existingUser = {
            username: nameRef.current.value,
            password: passwordRef.current.value,
        }
        try{
            const res = await axios.post("/api/users/login",existingUser)
            myStorage.setItem("user",res.data.username);
            setCurrentUser(res.data.username);
            setShowLogIn(null)
            setError(false)
        }catch(err){
            setError(true)
        }
    }
  return (
    <div className='loginContainer'>
        <div className="logo">
            <LocationOn />
            TravelPin
        </div>
        <div>
            <form className='loginform' onSubmit={handleSubmit}>
                <input type="text" placeholder='username' ref={nameRef} />
                <input type="password" placeholder='password' ref={passwordRef}/>
                <button className='loginBtn'>Log in</button>
                {error && (<span className='failure'>Something went wrong</span>) }
            </form>
            <Close className='formClose' onClick={()=>setShowLogIn(false)} />
        </div>
    </div>
  )
}

export default Login
