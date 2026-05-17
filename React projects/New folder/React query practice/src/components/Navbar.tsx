import { NavLink } from "react-router"


const Navbar = () => {
  return (
    <div className="w-full h-15 bg-amber-100 py-1 px-3 flex justify-between items-center">
      {/* left */}
      <div>Logo</div>
      {/* right */}
      <div className="">
        <ul className="flex items-center justify-center gap-5">
          <li>
            <NavLink to={"/"}>Home</NavLink>
          </li>
          <li>
            <NavLink to={"/about"}>About</NavLink>
            
          </li>
          <li>
            <NavLink to={"/trad"}>Traditional</NavLink>
            
          </li>
          <li>
            <NavLink to={"/rq"}>React Query</NavLink>
            
          </li>
          <li>Login</li>
          <li>SignUp</li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar
