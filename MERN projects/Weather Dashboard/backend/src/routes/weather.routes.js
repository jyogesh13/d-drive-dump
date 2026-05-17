import Router from "express";
import { jwtAuth } from "../middlewares/auth.middleware.js";
import { getCurrentWeather } from "../controllers/weather.controllers.js";

const router = Router();

// router.route("/current-weather").get(jwtAuth, getCurrentWeather);
router.route("/current-weather").get(getCurrentWeather);
// router.route("/five-day-forecast").get(jwtAuth, getFiveDayForecast);

export default router;
