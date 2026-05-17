import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PageNotFound from "./pages/PageNotFound";
import Navbar from "./components/Navbar";
import CreateRecipe from "./pages/CreateRecipe";
import RecipeDetails from "./pages/RecipeDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Home />
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <Login />,
      </>
    ),
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/create",
    element: (
      <>
        <Navbar />
        <CreateRecipe />
      </>
    ),
  },
  {
    path: "/recipe/:id",
    element: (
      <>
        <Navbar />
        <RecipeDetails />
      </>
    ),
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
