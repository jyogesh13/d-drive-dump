
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import SignInCard from "../components/SignInCard";


const SignIn = () => {
  const [darkMode, setDarkMode] = useState(true);
  return (
    <div className="flex">
      <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="flex-7 ">
        <SignInCard />
      </div>
    </div>
  );
};

export default SignIn;
