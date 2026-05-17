import { useState } from "react";
import { NavLink } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/user/userSlice";
import { SearchOutlined } from "@mui/icons-material";
import axios from "axios";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { CurrentUser } = useSelector((state) => state.user);
  const [searchSuggestions, setSearchSuggestions] = useState(true);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState([]);
  const dispatch = useDispatch();

  const SearchByQuery = async () => {
    if (!query) {
      console.log("nothing");
    }
    try {
      const res = await axios.get("/api/v1/recipes/searchByTitle", {
        params: { title: query.toLowerCase() },
      });
      setResult(res.data.data);
      console.log("APi called for: ", query);
      console.log("Result: ", res.data);
    } catch (error) {
      console.log(error);
    }
  };

  if(result){
    console.log(result)
  }
  return (
    <nav className="fixed top-0 w-full bg-white border-b shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 ">
        <div className="h-16 flex items-center justify-between ">
          <NavLink to={"/"}>
            <div className="text-xl font-semibold">RecipeManager</div>
          </NavLink>

          <div className="border w-[30vw] rounded-3xl py-2 px-5 flex justify-around gap-2 relative">
            <input
              className="outline-0 w-full "
              type="text"
              placeholder="Search by Title..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  SearchByQuery();
                }
              }}
              onFocus={() => setSearchSuggestions(!searchSuggestions)}
            />
            <button
              className="cursor-pointer"
              onClick={() => setSearchSuggestions(!searchSuggestions)}
            >
              <SearchOutlined />
            </button>
            {searchSuggestions && (
              <div
                className={`bg-gray-50 absolute top-12 right-0 w-full rounded-b-2xl flex flex-col gap-2`}
              >
                {result.map((recipe) => (
                  <NavLink key={recipe._id} to={`/recipe/${recipe._id}`}>
                    <div className="flex gap-2 w-full bg-gray-100 p-2 hover:bg-gray-200">
                      <img className="w-10" src={recipe.img} alt="" />
                      <p>{recipe.title}</p>
                    </div>
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          <div>
            {!CurrentUser && (
              <div className="hidden md:flex items-center space-x-4">
                <NavLink to="/login" className="text-gray-700 hover:text-black">
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className="text-gray-700 hover:text-black"
                >
                  Register
                </NavLink>
              </div>
            )}

            {CurrentUser && (
              // dropdown profile menu
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="h-9 w-9 rounded-full bg-gray-300 flex items-center justify-center"
                >
                  <span className="text-sm font-semibold">U</span>
                </button>

                {dropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-40 bg-white border shadow-md"
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    <NavLink
                      to="/profile"
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Profile
                    </NavLink>
                    <NavLink
                      to="/create"
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Add Recipe
                    </NavLink>
                    <NavLink
                      to="/profile"
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Favorites
                    </NavLink>
                    <NavLink
                      to="/profile"
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      My Recipes
                    </NavLink>
                    <button
                      onClick={() => {
                        dispatch(logout());
                        setDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={
                  menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          {!CurrentUser && (
            <NavLink to="/login" className="block text-gray-700">
              Login
            </NavLink>
          )}

          {CurrentUser && (
            <button
              onClick={() => dispatch(logout())}
              className="block text-left text-gray-700"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
