import { Eye, EyeOff, X } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
import { NavLink, useNavigate } from "react-router";

const Login = ({setLogin}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginInput, setLoginInput] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleLogin = async () => {
    dispatch(loginStart);
    try {
      const res = await axios.post("/api/v1/users/login", {
        loginInput,
        password,
      });
      dispatch(loginSuccess(res.data.data));
    } catch (error) {
      dispatch(loginFailure(error.response.data));
    }
    setLoginInput(" ");
    setPassword(" ");
    navigate("/")
  };

  const handleLoginWithGoogle =  () => {
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
        setLogin(false)
      })
      .catch((error) => {
        dispatch(loginFailure());
        console.log(error);
      });
    
  };

  return (
    <div className="bg-[#000000af] w-full absolute top-0 min-h-screen z-10">
      <div className=" min-h-screen flex items-center justify-center px-4">
        <div className="w-full h-[60vh] max-w-md backdrop-blur-xl bg-white/20 border border-white/30 rounded-2xl shadow-xl shadow-amber-100 p-6 sm:p-8">
          <h1 className="text-2xl font-semibold text-white text-center">
            Sign in
          </h1>
          <p className="text-sm text-white/80 text-center mt-1">Welcome back</p>

          <form className="mt-6 space-y-8">
            <div className="relative">
              <input
                type="text"
                name="text"
                id="text"
                placeholder="you@example.com"
                className="peer w-full px-2 py-2 rounded-lg bg-white/30 text-black placeholder-transparent outline-none focus:ring-2 focus:ring-white/50"
                value={loginInput}
                onChange={(e) => setLoginInput(e.target.value)}
              />
              <label
                htmlFor="text"
                className="absolute -top-3.5 left-2 block text-white mb-1 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown: text-base peer-focus:-top-3.5 "
              >
                Username or Email
              </label>
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="••••••••"
                className="peer w-full px-2 py-2 rounded-lg bg-white/30 text-white placeholder-transparent outline-none focus:ring-2 focus:ring-white/50"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className="absolute -top-3.5 left-2 block  text-white mb-1 peer-placeholder-shown:top-2 peer-placeholder-shown: text-base peer-focus:-top-3.5">
                Password
              </label>
              <div className="absolute top-2 right-2">
                <button
                  type="button"
                  className=""
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            <button
              type="button"
              className="w-full mt-2 py-2 rounded-lg bg-white text-indigo-600 font-medium hover:bg-white/90 transition cursor-pointer"
              onClick={handleLogin}
            >
              Sign in
            </button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="h-px flex-1 bg-white/40" />
            <span className="text-sm text-white/80">Or continue with</span>
            <div className="h-px flex-1 bg-white/40" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              className="flex items-center justify-center gap-2 py-2 rounded-lg bg-white/30 text-white hover:bg-white/40 transition cursor-pointer"
              onClick={handleLoginWithGoogle}
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Google
            </button>

            <button
              type="button"
              className="flex items-center justify-center gap-2 py-2 rounded-lg bg-white/30 text-white hover:bg-white/40 transition cursor-pointer"
            >
              <img
                src="https://www.svgrepo.com/show/512317/github-142.svg"
                alt="GitHub"
                className="w-5 h-5 invert"
              />
              GitHub
            </button>
          </div>
          <NavLink to={"/"}>
            <div className="absolute top-4 right-3 cursor-pointer"><X className="text-white"/></div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Login;
