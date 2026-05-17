import "./App.css";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Home />
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <Login />
      </>
    ),
  },
  {
    path: "/signUp",
    element: (
      <>
        <SignUp />
      </>
    ),
  },
  {
    path: "*",
    element: (
      <>
        <PageNotFound/>
      </>
    )
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
