import { SignIn } from "@clerk/clerk-react";

const Login = () => {
  return (
    <div className="h-full flex justify-center items-center">
      <SignIn path="/sign-in" signUpUrl="sign-up" forceRedirectUrl={"/dashboard"}/>
    </div>
  );
};

export default Login;
