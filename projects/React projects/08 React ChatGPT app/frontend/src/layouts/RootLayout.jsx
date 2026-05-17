import { ClerkProvider, SignedIn, UserButton } from "@clerk/clerk-react";
import { NavLink, Outlet } from "react-router";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const queryClient = new QueryClient();

const RootLayout = () => {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <QueryClientProvider client={queryClient}>
        <div className="py-2 px-10 md:px-16 h-screen flex flex-col ">
          <header className="">
            <nav className="w-full h-15 px-5 flex justify-between items-center border-b rounded-b-2xl">
              <NavLink to={"/"}>
                <div className="flex justify-center items-center">
                  <img
                    className="w-10 h-10 rounded-full overflow-hidden bg-white"
                    src="src\assets\bot-assistant.png"
                    alt=""
                  />

                  <span>AI Chat</span>
                </div>
              </NavLink>
              <div className="relative">
                {/* <SignedOut>
                <div className="flex justify-center items-center gap-4">
                  <SignInButton className="cursor-pointer"/>
                  <SignUpButton className="cursor-pointer" />
                </div>
              </SignedOut> */}
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </div>
            </nav>
          </header>
          <main className="flex-1 overflow-hidden ">
            <Outlet />
          </main>
        </div>
      </QueryClientProvider>
    </ClerkProvider>
  );
};

export default RootLayout;
