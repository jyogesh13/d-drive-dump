import {createBrowserRouter, RouterProvider} from "react-router"
import Home from './pages/Home.jsx'
import SignIn from './pages/SignIn.jsx'
import IndividualVideo from "./pages/IndividualVideo.jsx"
import Navbar from "./components/Navbar.jsx"
import Create from "./pages/Create.jsx"
import WatchHistoryPage from "./pages/WatchHistoryPage.jsx"


const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <><Navbar/><Home type="random"/></>
    },
    {
      path: "/trends",
      element: <><Navbar/><Home type="trends"/></>
    },
    {
      path: "/subscriptions",
      element: <><Navbar/><Home type="sub"/></>
    },
    {
      path: "/signin",
      element: <><Navbar/><SignIn/></>
    },
    {
      path: "/video/:id",
      element: <><Navbar/><IndividualVideo/></>
    },
    {
      path: "/create",
      element: <><Navbar/><Create/></>
    },
    {
      path: "/history",
      element: <><Navbar/><WatchHistoryPage/></>
    }
  ])
  return (
    <>
      <RouterProvider router={router}/>
      {/* */}
    </>
  )
}

export default App
