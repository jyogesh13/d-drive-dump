import axios from "axios";
import { Search } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  setCoordinates,
  setUnits,
} from "../redux/weatherSlice";

const SearchBar = () => {
  const [city, setCity] = useState("");
  const dispatch = useDispatch();

  const findCoordinates = async () => {
    const res = await axios.get(
      "https://api.mapbox.com/search/geocode/v6/forward",
      {
        params: {
          q: city,
          access_token: import.meta.env.VITE_MAPBOX_APIKEY,
        },
      },
    );
    const { latitude, longitude } = res.data.features[0].properties.coordinates;
    dispatch(setCoordinates({ latitude, longitude }));
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      await findCoordinates();
    }
  };
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="flex items-center gap-2 flex-1 bg-white rounded-md px-3 py-2">
        <Search size={16} className="text-[#547792]" />
        <input
          type="text"
          placeholder="Search city"
          className="w-full outline-none text-sm"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      <select
        className="bg-white rounded-md px-3 py-2 text-sm"
        onChange={(e) => dispatch(setUnits(e.target.value))}
      >
        <option value="metric">°C</option>
        <option value="imperial">°F</option>
      </select>
    </div>
  );
};

export default SearchBar;
