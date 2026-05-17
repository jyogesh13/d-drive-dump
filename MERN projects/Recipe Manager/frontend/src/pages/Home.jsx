import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import axios from "axios";
import { NavLink } from "react-router";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/v1/recipes/");
        console.log(res.data.data);
        setRecipes(res.data.data.recipes);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [page]);

  return (
    <div className="mt-50 mx-10 flex flex-col gap-5 flex-wrap ">
      <header className="max-w-7xl mx-auto mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Recipes</h1>
        <p className="text-gray-600 text-sm">Find something to cook today</p>
      </header>
      <div className="bg-gray-50 p-4 mx-auto grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <NavLink key={recipe._id} to={`/recipe/${recipe?._id}`}>
            <RecipeCard recipe={recipe} />
          </NavLink>
        ))}
      </div>
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="border px-3 py-1 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span>{page}</span>

        <button
          onClick={() => setPage(page + 1)}
          className="border px-3 py-1 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
