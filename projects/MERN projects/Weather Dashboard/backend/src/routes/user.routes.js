import { Router } from "express";
import {
  addToFavorites,
  googleLogin,
  loginUser,
  logoutUser,
  registerUser,
  removeFromFavorites,
} from "../controllers/user.controllers.js";
import { jwtAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/google").post(googleLogin);

//secure routes
router.route("/logout").post(jwtAuth, logoutUser);
router.route("/add-to-favorites").put(jwtAuth, addToFavorites)
router.route("/remove-from-favorites").put(jwtAuth, removeFromFavorites)

export default router;
