import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { NavLink, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "../redux/user/userSlice";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visibility, setVisibility] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post("/api/v1/users/login", {
        loginInput: email,
        password,
      });
      dispatch(loginSuccess(res.data.data));
    } catch (error) {
      console.log(error);
      dispatch(loginFailure());
    }
    setEmail(" ");
    setPassword(" ");
    navigate("/");
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
    <div className="relative">
      <div className="relative z-1">
        <img
          className="w-full h-screen "
          src="src/assets/loginPageBg.jpg"
          alt=""
        />
      </div>
      <div className="bg-gray-500/50 w-full h-screen absolute top-0 z-2"></div>
      <div className="h-screen w-screen flex justify-center items-center dark:bg-gray-900 absolute top-0 ">
        <div className="border-4 border-transparent rounded-[20px] dark:bg-black/60 bg-white shadow-lg shadow-gray-300 xl:p-10 2xl:p-10 lg:p-10 md:p-10 sm:p-2 m-2 relative z-3">
          <h1 className="pt-8 pb-6 font-bold font-serif dark:text-white text-5xl text-center cursor-default">
            Log in
          </h1>
          <form action="#" method="post" className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-2  dark:text-white text-lg">
                Email
              </label>
              <input
                id="email"
                className="border p-3 dark:bg-indigo-200 dark:text-gray-900  dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <label
                htmlFor="password"
                className="mb-2 dark:text-white text-lg"
              >
                Password
              </label>
              <input
                id="password"
                className="border p-3 shadow-md dark:bg-indigo-200 dark:text-gray-900  dark:border-gray-700 placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                type={visibility ? "text" : "password"}
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="absolute top-9 right-3 "
                onClick={() => setVisibility(!visibility)}
                type="button"
              >
                {visibility ? <VisibilityOff /> : <Visibility />}
              </button>
            </div>
            <a
              className="group text-blue-400 transition-all duration-100 ease-in-out"
              href="#"
            >
              <span className="bg-bottom-left bg-linear-to-r text-sm from-blue-400 to-blue-400 bg-size-[0%_2px] bg-no-repeat group-hover:bg-size-[100%_2px] transition-all duration-500 ease-out">
                Forget your password?
              </span>
            </a>
            <button
              className="bg-linear-to-r dark:text-gray-300 from-blue-500 to-purple-500 shadow-lg mt-6 p-2 text-white rounded-lg w-full hover:scale-105 hover:from-purple-500 hover:to-blue-500 transition duration-300 ease-in-out"
              onClick={handleLogin}
            >
              LOG IN
            </button>
          </form>
          <div className="flex flex-col mt-4 items-center justify-center text-sm">
            <h3 className="dark:text-gray-300 flex gap-2">
              Don't have an account?
              <NavLink to={"/signup"}>
                <div className="group text-blue-400 transition-all duration-100 ease-in-out">
                  <span className="bg-bottom-left bg-linear-to-r from-blue-400 to-blue-400 bg-size-[0%_2px] bg-no-repeat group-hover:bg-size-[100%_2px] transition-all duration-500 ease-out">
                    Sign Up
                  </span>
                </div>
              </NavLink>
            </h3>
          </div>
          <div
            id="third-party-auth"
            className="flex items-center justify-center mt-5 flex-wrap"
          >
            {/* Google authentication */}
            <button
              href="#"
              className="hover:scale-105 ease-in-out duration-300 shadow-lg p-2 rounded-lg m-1"
              type="button"
              onClick={signInWithGoogle}
            >
              <img
                className="max-w-[25px]"
                src="https://ucarecdn.com/8f25a2ba-bdcf-4ff1-b596-088f330416ef/"
                alt="Google"
              />
            </button>
            {/* LinkedIn Authentication */}
            <button
              href="#"
              className="hover:scale-105 ease-in-out duration-300 shadow-lg p-2 rounded-lg m-1"
              type="button"
            >
              <img
                className="max-w-[25px]"
                src="https://ucarecdn.com/95eebb9c-85cf-4d12-942f-3c40d7044dc6/"
                alt="Linkedin"
              />
            </button>
            {/* Github Authentication */}
            <button
              href="#"
              className="hover:scale-105 ease-in-out duration-300 shadow-lg p-2 rounded-lg m-1"
              type="button"
            >
              <img
                className="max-w-[25px] filter dark:invert"
                src="https://ucarecdn.com/be5b0ffd-85e8-4639-83a6-5162dfa15a16/"
                alt="Github"
              />
            </button>
            {/* Facebook Authentication */}
            <button
              href="#"
              className="hover:scale-105 ease-in-out duration-300 shadow-lg p-2 rounded-lg m-1"
              type="button"
            >
              <img
                className="max-w-[25px]"
                src="https://ucarecdn.com/6f56c0f1-c9c0-4d72-b44d-51a79ff38ea9/"
                alt="Facebook"
              />
            </button>
            {/* Twitter Authentication */}
            <button
              href="#"
              className="hover:scale-105 ease-in-out duration-300 shadow-lg p-2 rounded-lg m-1"
              type="button"
            >
              <img
                className="max-w-[25px] dark:gray-100"
                src="https://ucarecdn.com/82d7ca0a-c380-44c4-ba24-658723e2ab07/"
                alt="twitter"
              />
            </button>
          </div>

          <div className="text-gray-500 flex text-center flex-col mt-4 items-center text-sm">
            <p className="cursor-default">
              By signing in, you agree to our
              <a
                className="group text-blue-400 transition-all duration-100 ease-in-out mx-1"
                href="#"
              >
                <span className="cursor-pointer bg-left-bottom bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                  Terms
                </span>
              </a>
              and
              <a
                className="group text-blue-400 transition-all duration-100 ease-in-out mx-1"
                href="#"
              >
                <span className="cursor-pointer bg-left-bottom bg-gradient-to-r from-blue-400 to-blue-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                  Privacy Policy
                </span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
