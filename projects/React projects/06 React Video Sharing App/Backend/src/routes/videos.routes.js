import { Router } from "express";
import {
  addView,
  deleteVideo,
  getVideo,
  getVideosByTags,
  getVideosByTitle,
  postVideo,
  randomVideos,
  subscribedVideos,
  trendingVideos,
  updateVideoDesc,
  updateVideoTitle,
} from "../controllers/videos.controller.js";
import { jwtAuth } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/find/:id").get(getVideo);
router.route("/view/:id").put(addView);
router.route("/trends").get(trendingVideos);
router.route("/random").get(randomVideos);
router.route("/tags").get(getVideosByTags);
router.route("/search").get(getVideosByTitle);

//secure routes
router.route("/").post(
  jwtAuth,
  upload.fields([
    {
      name: "thumbnail",
      maxCount: 1,
    },
    {
      name: "video",
      maxCount: 1,
    },
  ]),
  postVideo
);
router.route("/updateTitle/:id").put(jwtAuth, updateVideoTitle);
router.route("/updateDesc/:id").put(jwtAuth, updateVideoDesc);
router.route("/:id").delete(jwtAuth, deleteVideo);
router.route("/sub").get(jwtAuth, subscribedVideos);

export default router;
