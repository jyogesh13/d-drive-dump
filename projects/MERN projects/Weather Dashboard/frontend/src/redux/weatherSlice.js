import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  latitude: "",
  longitude: "",
  units: "standard",
  weatherData: null,
  loading: false,
  error: null,
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setCoordinates: (state, action) => {
      const { latitude, longitude } = action.payload;
      state.latitude = latitude;
      state.longitude = longitude;
    },
    fetchWeatherStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchWeatherSuccess: (state, action) => {
      state.loading = false;
      state.weatherData = action.payload;
      state.error = null;
    },
    fetchWeatherError: (state, action) => {
      state.loading = false;
      state.error = action.payload || "Failed to fetch weather data";
    },
    setUnits: (state, action) => {
      state.units = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setCoordinates,
  fetchWeatherStart,
  fetchWeatherSuccess,
  fetchWeatherError,
  setUnits,
} = weatherSlice.actions;

export default weatherSlice.reducer;
