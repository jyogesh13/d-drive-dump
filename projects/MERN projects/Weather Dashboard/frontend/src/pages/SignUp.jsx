import {  Mail, User, X } from "lucide-react";
import { NavLink } from "react-router";

const SignUp = () => {
  return (
    <div className="bg-[#000000af] w-full absolute top-0 min-h-screen z-10 ">
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl bg-white/15 backdrop-blur-xl border border-white/20 shadow-xl p-6 sm:p-8">
          <h1 className="text-2xl font-semibold text-white text-center">
            Create your account
          </h1>
          <p className="text-sm text-white/70 text-center mt-1">
            Sign up to continue
          </p>

          <form className="mt-6 space-y-4">
            <div>
              <label className="block text-sm text-white/80 mb-1">
                Username
              </label>
              <div className="flex items-center gap-2 bg-white/20 rounded-lg px-3 py-2 border border-white/20">
                <User size={16} className="text-white/70" />
                <input
                  type="text"
                  placeholder="yourname"
                  className="w-full bg-transparent outline-none text-white placeholder-white/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-white/80 mb-1">Email</label>
              <div className="flex items-center gap-2 bg-white/20 rounded-lg px-3 py-2 border border-white/20">
                <Mail size={16} className="text-white/70" />
                <input
                  type="email"
                  placeholder="you@email.com"
                  className="w-full bg-transparent outline-none text-white placeholder-white/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-white/80 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-white/20 rounded-lg px-3 py-2 border border-white/20 outline-none text-white placeholder-white/50"
              />
            </div>

            <button className="w-full mt-2 bg-white text-indigo-600 font-medium py-2 rounded-lg hover:bg-white/90 transition">
              Sign up
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-white/30" />
            <span className="text-xs text-white/70">Or continue with</span>
            <div className="flex-1 h-px bg-white/30" />
          </div>

          <div className="space-y-3">
            <button className="w-full flex items-center justify-center gap-2 bg-white/20 text-white py-2 rounded-lg border border-white/20 hover:bg-white/30 transition">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-4 h-4"
              />
              Sign up with Google
            </button>

            <button className="w-full flex items-center justify-center gap-2 bg-white/20 text-white py-2 rounded-lg border border-white/20 hover:bg-white/30 transition">
              Sign up with GitHub
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

export default SignUp;
