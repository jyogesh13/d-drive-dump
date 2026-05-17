import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../redux/user/userSlice";
import axios from "axios";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const SignInCard = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const userDetails = {
      username: name,
      password,
    };
    dispatch(loginStart());
    try {
      const res = await axios.post("/api/v1/users/login", userDetails);
      dispatch(loginSuccess(res.data.data));
    } catch (error) {
      console.log(error);
      dispatch(loginFailure());
    }
    setName("");
    setPassword("");
    navigate("/");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const userDetails = {
      username: registerName,
      password: registerPassword,
      email: registerEmail,
    };
    try {
      const res = await axios.post("/api/v1/users/register", userDetails);
    } catch (error) {
      console.log(error);
    }
    setRegisterName("");
    setRegisterEmail("");
    setRegisterPassword("");
  };

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const userDetails = {
          username: result.user.displayName,
          email: result.user.email,
          profilePic: result.user.photoURL,
        };
        dispatch(loginStart());
        const res = await axios.post("/api/v1/users/google", userDetails);
        dispatch(loginSuccess(res.data.data));
        navigate("/");
      })
      .catch((error) => {
        dispatch(loginFailure());
        console.log(error);
      });
  };

  return (
    <div
      className={`flex flex-col items-center justify-center gap-[5px] h-[calc(100vh-56px)] text-[${({
        theme,
      }) => theme.text}]`}
    >
      <div
        className={`w-[30vw] flex flex-col items-center justify-center gap-[10px] py-[20px] px-[50px] bg-[${({
          theme,
        }) => theme.bgLighter}] border-[${({ theme }) =>
          theme.soft}] border-[1px] rounded-2xl `}
      >
        <h1 className="text-[24px]">Sign in</h1>
        <h2 className="text-[20px] font-light">to continue to videoTube</h2>
        <input
          className={`w-full border-b-[1px] border-[${({ theme }) =>
            theme.soft}] text-[${({ theme }) =>
            theme.text}] p-[10px] bg-transparent outline-0`}
          type="text"
          name="username"
          id="username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="username"
        />
        <input
          className={`w-full border-b-[1px] border-[${({ theme }) =>
            theme.soft}] text-[${({ theme }) =>
            theme.text}] p-[10px] bg-transparent outline-0`}
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <button
          className={`rounded-3xl border-none py-[10px] px-[20px] font-medium cursor-pointer bg-[${({
            theme,
          }) => theme.soft}] text-[${({ theme }) =>
            theme.textSoft}] hover:bg-[#222222]`}
          onClick={handleLogin}
        >
          Sign in
        </button>
        <div>
          <button
            className="rounded-md flex items-center border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-200 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            onClick={signInWithGoogle}
          >
            <img
              src="https://docs.material-tailwind.com/icons/google.svg"
              alt="metamask"
              className="h-5 w-5 mr-2"
            />
            Continue with Google
          </button>
        </div>
        <h1 className="text-[24px]">or</h1>
        <input
          className={`w-full border-b-[1px] border-[${({ theme }) =>
            theme.soft}] text-[${({ theme }) =>
            theme.text}] p-[10px] bg-transparent outline-0`}
          type="text"
          name="name"
          id="name"
          value={registerName}
          onChange={(e) => setRegisterName(e.target.value)}
          placeholder="username"
        />
        <input
          className={`w-full border-b-[1px] border-[${({ theme }) =>
            theme.soft}] text-[${({ theme }) =>
            theme.text}] p-[10px] bg-transparent outline-0`}
          type="email"
          name="email"
          id="email"
          value={registerEmail}
          onChange={(e) => setRegisterEmail(e.target.value)}
          placeholder="email"
        />
        <input
          className={`w-full border-b-[1px] border-[${({ theme }) =>
            theme.soft}] text-[${({ theme }) =>
            theme.text}] p-[10px] bg-transparent outline-0`}
          type="password"
          name="passwrd"
          id="passwrd"
          value={registerPassword}
          onChange={(e) => setRegisterPassword(e.target.value)}
          placeholder="password"
        />
        <button
          className={`rounded-3xl border-none py-[10px] px-[20px] font-medium cursor-pointer bg-[${({
            theme,
          }) => theme.soft}] text-[${({ theme }) =>
            theme.textSoft}] hover:bg-[#222222]`}
          onClick={handleRegister}
        >
          Sign up
        </button>
      </div>
      <div
        className={`w-[30vw] px-5 flex gap-40 text-[12px] text-[${({ theme }) =>
          theme.textSoft}] `}
      >
        <div>English(USA)</div>
        <div className=" flex gap-10 justify-around  w-full">
          <span className="">Help</span>
          <span className="">Privacy</span>
          <span className="">Terms</span>
        </div>
      </div>
    </div>
  );
};

export default SignInCard;
