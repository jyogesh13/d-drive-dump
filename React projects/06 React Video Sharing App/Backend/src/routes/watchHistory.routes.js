import { Router } from "express";
import { jwtAuth } from "../middlewares/auth.middleware.js";
import {
  clearUserWatchHistory,
  deleteHistoryEntry,
  getSingleHistoryEntry,
  getUserWatchHistory,
  updateHistoryEntry,
  upsertWatchHistory,
} from "../controllers/watchHistoryController.js";

const router = Router();

router.use(jwtAuth);

router
  .route("/")
  .get(getUserWatchHistory)
  .post(upsertWatchHistory)
  .delete(clearUserWatchHistory);

router
  .route("/:videoId")
  .get(getSingleHistoryEntry)
  .patch(updateHistoryEntry)
  .delete(deleteHistoryEntry);

export default router;
