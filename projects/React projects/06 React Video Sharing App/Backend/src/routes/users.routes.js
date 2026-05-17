import { Router } from "express";
import {
  dislikeVideo,
  likeVideo,
  subscribeUser,
  unsubscribeUser,
  updatePassword,
  updateUsername,
  userDelete,
  userGet,
  userLogin,
  userLogout,
  userRegister,
  googleLogin
} from "../controllers/users.controller.js";
import { jwtAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(userRegister);
router.route("/login").post(userLogin);
router.route("/google").post(googleLogin)
router.route("/:id").get(userGet);

//secure routes
router.route("/logout").post(jwtAuth, userLogout);
router.route("/").delete(jwtAuth, userDelete);
router.route("/updatePassword").put(jwtAuth, updatePassword);
router.route("/updateUsername").put(jwtAuth, updateUsername)
router.route("/subscribe/:id").post(jwtAuth, subscribeUser)
router.route("/unsubscribe/:id").post(jwtAuth, unsubscribeUser)
router.route("/like/:videoId").put(jwtAuth, likeVideo )
router.route("/dislike/:videoId").put(jwtAuth, dislikeVideo )

export default router;
