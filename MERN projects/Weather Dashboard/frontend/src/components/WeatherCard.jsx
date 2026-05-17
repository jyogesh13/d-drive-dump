import { Favorite, FavoriteBorder } from "@mui/icons-material";
import Stat from "./Stat";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { additionToFavorites } from "../redux/userSlice";

const WeatherCard = () => {
  const { weatherData, units, latitude, longitude } = useSelector(
    (state) => state.weather,
  );
  const { currentUser } = useSelector((state) => state.user);
  const [favorite, setFavorite] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addToFavorites = async () => {
    try {
      const res = await axios.put("/api/v1/users/add-to-favorites", {
        city: weatherData.city,
        country: weatherData.country,
        latitude: latitude,
        longitude: longitude,
      });
      console.log(res.data.data.favorites)
      dispatch(additionToFavorites(res.data.data.favorites))
      setFavorite(true)
    } catch (error) {
      console.log(error)
    }
  };
  const removeFromFavorites = async () => {
    const favoritesArray = currentUser?.user.favorites;
    const match = favoritesArray.find(item => item.city === weatherData.city);
    console.log(match);
    const res = await axios.put("/api/v1/users/remove-from-favorites",{
      params:{
        id: match._id
      }
    });
    console.log("remove fav: ", res.data);
  };

  const handleFavorite = () => {
    if (!weatherData || latitude == null || longitude == null) return;
    if (currentUser?.user) {
      if (!favorite) {
        addToFavorites();
      } else {
        removeFromFavorites();

      }
    } else {
      navigate("/login");
    }
  };

  const unitMap = {
    imperial: "F",
    metric: "C",
  };

  return (
    <section className="lg:col-span-2 bg-white rounded-xl p-5 shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-semibold text-[#213448]">
            {weatherData?.temperature}
            {units == "imperial" || units == "metric"
              ? `\u00B0${unitMap[units]}`
              : " K"}
          </h2>
          <p className="text-[#547792]">{weatherData?.condition}</p>
          <p className="text-sm text-[#94B4C1]">{weatherData?.description}</p>
        </div>
        <div className="text-right">
          <p className="font-medium text-[#213448]">
            {weatherData?.city}, {weatherData?.country}
          </p>
          <button
            className="mt-2 flex items-center gap-1 text-sm text-[#547792] cursor-pointer"
            onClick={handleFavorite}
          >
            {favorite ? <Favorite /> : <FavoriteBorder />}
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
        <Stat label="Humidity" value={weatherData?.humidity + " %"} />
        <Stat label="Wind" value={weatherData?.windSpeed + " Km/h"} />
        <Stat label="Condition" value={weatherData?.condition} />
      </div>
    </section>
  );
};

export default WeatherCard;
