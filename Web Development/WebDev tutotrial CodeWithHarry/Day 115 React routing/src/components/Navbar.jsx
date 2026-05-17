import React from 'react'
import { NavLink } from 'react-router'
import "../components/Navbar.css"

const Navbar = () => {
  return (
    <nav>
        <ul>
            <NavLink className={(e)=>{return e.isActive?"active-bg-color":""}} to="/">Home</NavLink>
            <NavLink className={(e)=>{return e.isActive?"active-bg-color":""}} to="/about">About</NavLink>
            <NavLink className={(e)=>{return e.isActive?"active-bg-color":""}} to="/services">Services</NavLink>
            <NavLink className={(e)=>{return e.isActive?"active-bg-color":""}} to="/login">Login</NavLink>
        </ul>
    </nav>
  )
}

export default Navbar
