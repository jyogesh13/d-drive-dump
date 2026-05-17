import { useEffect } from "react";
import Navbar from "../components/Navbar";
import FavoritesSection from "../components/FavoritesSection";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/weatherCard";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWeatherError,
  fetchWeatherStart,
  fetchWeatherSuccess,
  setCoordinates,
} from "../redux/weatherSlice";

const Home = () => {
  const dispatch = useDispatch();
  const {
    latitude,
    longitude,
    units = "standard",
  } = useSelector((state) => state.weather);



  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          dispatch(
            setCoordinates({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            }),
          );
        },
        (error) => {
          console.log("Error Code: ", error.code, "Message: ", error.message);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 },
      );
    } else {
      console.log("Geolocation is not supported");
    }
  }, [dispatch]);

  useEffect(() => {
    const handleClick = async () => {
      dispatch(fetchWeatherStart());
      try {
        const res = await axios.get("/api/v1/weather/current-weather", {
          params: {
            latitude,
            longitude,
            units,
          },
        });
        dispatch(fetchWeatherSuccess(res.data.data));
      } catch (error) {
        dispatch(fetchWeatherError(error));
      }
    };
    handleClick();
  }, [latitude, longitude, units, dispatch]);

  return (
    <div className="min-h-screen bg-[#EAE0CF]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        <SearchBar />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <WeatherCard />
          <FavoritesSection />
        </div>
      </main>
    </div>
  );
};

export default Home;
