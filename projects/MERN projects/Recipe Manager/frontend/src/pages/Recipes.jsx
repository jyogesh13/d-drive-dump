import { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);

  useEffect(() => {
    function fetchRecipes() {
      const data = [
        {
          id: 1,
          title: "Pasta",
          image: "/img1.jpg",

          category: "Dinner",
          rating: 4.5,
        },
        {
          id: 2,
          title: "Salad",
          image: "/img2.jpg",

          category: "Lunch",
          rating: 4.2,
        },
        {
          id: 2,
          title: "Salad",
          image: "/img2.jpg",

          category: "Lunch",
          rating: 4.2,
        },
      ];

      setRecipes(data);
    }
    fetchRecipes();
  }, [query, category, sort, page]);

  return (
    <div className="p-6 space-y-6 relative top-20">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <input
          type="text"
          placeholder="Search recipes"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 rounded w-full md:w-1/3"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded w-full md:w-1/6"
        >
          <option value="">All Categories</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border p-2 rounded w-full md:w-1/6"
        >
          <option value="newest">Newest</option>
          <option value="rating">Favorites</option>
        </select>
      </div>

      <div className="grid gap-2 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
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
}
