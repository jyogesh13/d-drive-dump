import {
  Menu,
  Search,
  Mic,
  Add,
  NotificationsNone,
  MoreVertSharp,
  AccountCircleOutlined,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router";
import { logout } from "../redux/user/userSlice";
import { useState } from "react";

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSignOut = () => {
    dispatch(logout());
  };

  return (
    <>
      <div className="flex justify-between items-center py-2 px-7 sticky top-0 z-50 bg-[#0f0f0f] w-[98.9vw]">
        <div className="flex gap-6 items-center">
          {/* logo */}
          <div>
            <Menu style={{ cursor: "pointer" }} />
          </div>
          <NavLink
            to={"/"}
            style={{ "text-decoration": "none", color: "inherit" }}
          >
            <div className="relative">
              <button className="flex items-center gap-1 cursor-pointer border-0">
                <span>
                  <svg
                    fill="#ff0033"
                    width="30px"
                    height="30px"
                    viewBox="0 0 32 32"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#ff0033"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <title>youtube</title>{" "}
                      <path d="M12.932 20.459v-8.917l7.839 4.459zM30.368 8.735c-0.354-1.301-1.354-2.307-2.625-2.663l-0.027-0.006c-3.193-0.406-6.886-0.638-10.634-0.638-0.381 0-0.761 0.002-1.14 0.007l0.058-0.001c-0.322-0.004-0.701-0.007-1.082-0.007-3.748 0-7.443 0.232-11.070 0.681l0.434-0.044c-1.297 0.363-2.297 1.368-2.644 2.643l-0.006 0.026c-0.4 2.109-0.628 4.536-0.628 7.016 0 0.088 0 0.176 0.001 0.263l-0-0.014c-0 0.074-0.001 0.162-0.001 0.25 0 2.48 0.229 4.906 0.666 7.259l-0.038-0.244c0.354 1.301 1.354 2.307 2.625 2.663l0.027 0.006c3.193 0.406 6.886 0.638 10.634 0.638 0.38 0 0.76-0.002 1.14-0.007l-0.058 0.001c0.322 0.004 0.702 0.007 1.082 0.007 3.749 0 7.443-0.232 11.070-0.681l-0.434 0.044c1.298-0.362 2.298-1.368 2.646-2.643l0.006-0.026c0.399-2.109 0.627-4.536 0.627-7.015 0-0.088-0-0.176-0.001-0.263l0 0.013c0-0.074 0.001-0.162 0.001-0.25 0-2.48-0.229-4.906-0.666-7.259l0.038 0.244z"></path>{" "}
                    </g>
                  </svg>
                </span>
                <span className="font-(Roboto) font-[400] text-xl">
                  Youtube
                </span>
                <span className="absolute top-0 left-[116px] text-[10px]">
                  IN
                </span>
              </button>
            </div>
          </NavLink>
        </div>
        <div className="flex gap-3 h-10 ml-20">
          {/* search bar */}
          <div className="w-[44vw] flex items-center border border-[#222222] bg-[#121212] rounded-3xl pl-5 overflow-hidden">
            <input
              className="w-full h-full outline-0 "
              type="text"
              placeholder="Search"
            />
            <div className="w-[5vw] h-full border-l border-[#222222]  flex justify-center items-center bg-[#222222]">
              <Search />
            </div>
          </div>
          <div className=" flex justify-center">
            <button>
              <Mic
                sx={{
                  backgroundColor: "#272727",
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  padding: "9px",
                }}
              />
            </button>
          </div>
        </div>
        <div>
          {currentUser ? (
            <div className="w-[15vw] flex gap-5 justify-center items-center mr-5">
              {/* right buttons */}
              <div>
                <NavLink to={"/create"}>
                  <div className="rounded-3xl px-3 py-1 flex justify-center items-center  bg-[#272727] border border-[#222222] cursor-pointer">
                    {/* create button */}
                    <div>
                      <Add style={{ fontSize: "34px" }} />
                    </div>
                    <div className="font-bold">Create</div>
                  </div>
                </NavLink>
              </div>
              <div>
                <NotificationsNone />
              </div>
              <div className="flex rounded-full overflow-hidden">
                <button
                  id="dropdownUserAvatarButton"
                  data-dropdown-toggle="dropdownAvatar"
                  className="flex justify-center items-center text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  type="button"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <img
                    className="w-9 h-9 rounded-full "
                    src={currentUser?.user.profileImg}
                    alt=""
                  />
                </button>

                {/* <!-- Dropdown menu --> */}
                <div
                  id="dropdownAvatar"
                  className={`z-10 absolute top-13 right-14 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600 ${
                    !showDropdown && "hidden"
                  }`}
                >
                  <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                    <div>{currentUser?.user.username}</div>
                    <div className="font-medium truncate">
                      {currentUser?.user.email}
                    </div>
                  </div>
                  <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownUserAvatarButton"
                  >
                    <li>
                      <NavLink to={"/"}>
                        <button className="block px-4 py-2 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                          Home
                        </button>
                      </NavLink>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Settings
                      </a>
                    </li>
                  </ul>
                  <div className="py-2">
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      onClick={handleSignOut}
                    >
                      Sign out
                    </button>
                  </div>
                </div>

                <button>
                  <img src={currentUser.user.profileImg} alt="" />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center gap-5 ml-25 mr-3">
              {/* right sign in button */}
              <div>
                <MoreVertSharp />
              </div>
              <NavLink to="/signin" style={{ textDecoration: "none" }}>
                <div className="w-full border py-1.5 px-2 rounded-3xl border-[#222222] hover:bg-[#272727] cursor-pointer gap-2 text-[14px] flex justify-center items-center ">
                  <span>
                    <AccountCircleOutlined />
                  </span>
                  <span className="font-bold">Sign in</span>
                </div>
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
