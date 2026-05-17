import { useState } from 'react'
import { createBrowserRouter, RouterProvider, } from "react-router";
import './App.css'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Login from './components/Login';
import About from './components/About';
import Services from './components/Services';
import User from './components/User';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <><Navbar/><Home/></>,
    },
    {
      path: "/login",
      element: <><Navbar/><Login/></>
    },
    {
      path: "/about",
      element: <><Navbar/><About/></>
    },
    {
      path: "/services",
      element: <><Navbar/><Services/></>
    },
    {
      path: "/user/:username",
      element: <><Navbar/><User/></>
    }
    
  ])

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
