import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { WeatherCache } from "../models/weatherCache.model.js";

const getCurrentWeather = asyncHandler(async (req, res) => {
  let { latitude, longitude, units } = req.query;

  if (latitude === undefined || longitude === undefined) {
    throw new ApiError(400, "latitude or longitude missing");
  }

  latitude = Number(latitude);
  longitude = Number(longitude);

  if (Number.isNaN(latitude) || Number.isNaN(longitude)) {
    throw new ApiError(400, "Latitude and Longitude must be numbers");
  }

  const cacheResponse = await WeatherCache.findOne({
    latitude,
    longitude,
    units,
    expiresAt: { $gt: new Date() },
  });

  if (cacheResponse) {
    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          cacheResponse.weatherData,
          "Current weather data retrieved successfully"
        )
      );
    return;
  }

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.OPEN_WEATHER_API_KEY}&units=${units}`
  );

  if (!response.ok) {
    throw new ApiError(
      response.status || 500,
      "Unable to fetch data for this location. Try Again!!"
    );
  }
  const weatherResponse = await response.json();

  const normalisedWeatherData = {
    temperature: weatherResponse.main.temp,
    humidity: weatherResponse.main.humidity,
    windSpeed: weatherResponse.wind.speed,
    condition: weatherResponse.weather[0].main,
    description: weatherResponse.weather[0].description,
    city: weatherResponse.name,
    country: weatherResponse.sys.country,
  };

  await WeatherCache.findOneAndUpdate(
    { latitude, longitude },
    {
      weatherData: normalisedWeatherData,
      expiresAt: new Date(Date.now() + 1 * 60 * 1000),
    },
    { upsert: true, new: true }
  );
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        normalisedWeatherData,
        "Current weather data retrieved successfully"
      )
    );
});

export { getCurrentWeather };
