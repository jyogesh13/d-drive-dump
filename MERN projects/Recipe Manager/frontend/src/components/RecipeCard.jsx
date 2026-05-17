import PropTypes from "prop-types";

const RecipeCard = ({ recipe }) => {
  return (
    <div
      key={recipe.id}
      className="bg-white w-[25vw] rounded-xl shadow hover:shadow-lg transition overflow-hidden"
    >
      <img
        src={recipe.img}
        alt={recipe.title}
        className="h-58 w-full object-cover"
      />

      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">{recipe.title}</h2>
        <p className="text-sm text-gray-500 mt-1">Author: {recipe.user?.username}</p>

        <button className="mt-4 w-full bg-orange-500 text-white py-2 rounded-lg text-sm hover:bg-orange-600">
          View Recipe
        </button>
      </div>
    </div>
  );
};

RecipeCard.propTypes = {
  recipe: PropTypes.object,
};
export default RecipeCard;
