import { Router } from "express";
import { deleteComment, getComments, postComment } from "../controllers/comment.controller.js";
import {jwtAuth} from "../middlewares/auth.middleware.js"

const router = Router();

router.route("/").post(jwtAuth, postComment);
router.route("/:commentId").delete(jwtAuth, deleteComment);
router.route("/:videoId").get(getComments);

export default router;