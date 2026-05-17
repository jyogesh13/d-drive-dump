import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { useSelector } from "react-redux";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { CurrentUser } = useSelector((state) => state.user);
  const navigate = useNavigate()

  const handleDelete = async()=>{
    
  }
  const toggleFavorite = async()=>{

  }

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(`/api/v1/recipes/${id}`);
        setRecipe(res.data.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  
  if (isLoading) {
    return <p className="text-center mt-8">Loading...</p>;
  }

  const ingredientsList = recipe.ingredients.split("\n\n")
  const stepsList = recipe.steps.split("\n")
  const isOwner = recipe.user?._id == CurrentUser?.user?._id

  if(stepsList){
    console.log(recipe)
    console.log(stepsList)
  }
  return (
    <div className="max-w-3xl mx-auto p-4">
      <img
        src={recipe.img}
        alt={recipe.title}
        className="w-full h-64 object-cover rounded-lg"
      />

      <h1 className="text-3xl font-semibold mt-4">{recipe.title}</h1>
      <p className="text-gray-600 mt-2">{recipe.description}</p>

      <div className="flex items-center gap-2 mt-2">
        <span className="text-sm text-gray-500">
          By {recipe.user?.username || "Unknown"}
        </span>
      </div>

      <h3 className="text-xl font-medium mt-6">Ingredients</h3>
      <ul className="list-disc ml-6 mt-2">
        {ingredientsList.map((item, i) => (
          <li key={i} className="mb-1">
            {item}
          </li>
        ))}
      </ul>

      <h3 className="text-xl font-medium mt-6">Steps</h3>
      <ol className="list-decimal ml-6 mt-2">
        {stepsList.map((item, i) => (
          <li key={i} className="mb-1">
            {item}
          </li>
        ))}
      </ol>

      <h3 className="text-xl font-medium mt-6">Tags</h3>
      <div className="flex gap-2 flex-wrap mt-2">
        {recipe.tags.length > 0 ? (
          recipe.tags.map((t, i) => (
            <span
              key={i}
              className="bg-gray-200 px-3 py-1 rounded-full text-sm"
            >
              {t}
            </span>
          ))
        ) : (
          <span className="text-gray-500">No tags</span>
        )}
      </div>

      <p className="mt-6">
        Favorites: <strong>{recipe.favoritesCount}</strong>
      </p>

      <button
        onClick={toggleFavorite}
        className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
      >
        Favorite
      </button>

      {isOwner && (
        <div className="flex gap-4 mt-6">
          <button
            onClick={() => navigate(`/edit/${id}`)}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Edit
          </button>

          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default RecipeDetails;
