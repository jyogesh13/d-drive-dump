import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/userSlice.js";
import Login from "../pages/Login.jsx";
import SignUp from "../pages/SignUp.jsx";
import { NavLink } from "react-router";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <nav className="bg-[#213448] text-[#EAE0CF]">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-lg font-semibold">Skyboard</h1>
          <div className=" flex justify-end items-center gap-10 pr-2 ">
            {currentUser ? (
              <div className="flex bg-[#547792] rounded-full justify-center items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse relative">
                <button
                  type="button"
                  className="flex text-sm bg-neutral-primary rounded-full md:me-0 focus:ring-4 focus:ring-neutral-tertiary"
                  id="user-menu-button"
                  aria-expanded="false"
                  data-dropdown-toggle="user-dropdown"
                  data-dropdown-placement="bottom"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-8 h-8 rounded-full"
                    src="/docs/images/people/profile-picture-5.jpg"
                    alt="user photo"
                  />
                </button>
                {/* <!-- Dropdown menu --> */}
                <div
                  className={`z-50 ${menuOpen ? " " : "hidden"} bg-neutral-primary-medium border border-default-medium rounded-lg shadow-lg w-44 absolute top-10 right-1 bg-[#213448] text-[#EAE0CF]`}
                  id="user-dropdown"
                >
                  <div className="px-4 py-3 text-sm border-b border-default">
                    <span className="block text-heading font-medium">
                      {currentUser?.user?.username}
                    </span>
                    <span className="block text-body truncate">
                      {currentUser?.user?.email}
                    </span>
                  </div>
                  <ul
                    className="p-2 text-sm text-body font-medium"
                    aria-labelledby="user-menu-button"
                  >
                    <li>
                      <a
                        href="#"
                        className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
                      >
                        Dashboard
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
                      >
                        Settings
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
                      >
                        Earnings
                      </a>
                    </li>
                    <li>
                      <button
                        className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
                        onClick={handleLogout}
                      >
                        Sign out
                      </button>
                    </li>
                  </ul>
                </div>
                <button
                  data-collapse-toggle="navbar-user"
                  type="button"
                  className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary"
                  aria-controls="navbar-user"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-width="2"
                      d="M5 7h14M5 12h14M5 17h14"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="flex gap-2 justify-center items-center">
                <NavLink to={"/login"}>
                  <div className="bg-[#547792] py-1 px-3 rounded-xl hover:bg-[#EAE0CF] hover:text-[#213448] cursor-pointer">
                    Login
                  </div>
                </NavLink>
                <NavLink to={"/signUp"}>
                  <div className="bg-[#547792] py-1 px-3 rounded-xl hover:bg-[#EAE0CF] hover:text-[#213448] cursor-pointer">
                    Sign up
                  </div>
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
