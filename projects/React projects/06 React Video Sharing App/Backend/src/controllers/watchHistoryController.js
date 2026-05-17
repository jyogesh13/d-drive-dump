import { WatchHistory } from "../models/WatchHistory.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getUserWatchHistory = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const history = await WatchHistory.find({ user: userId })
    .sort({
      lastWatchedAt: -1,
    })
    .populate("video");

  const historyCount = history.length;

  if (!history) {
    throw new ApiError(500, "Failed to fetch watch history");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { history, totalVideos: historyCount },
        "Successfully fetched the user watch history",
      ),
    );
});

const upsertWatchHistory = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { videoId, lastWatchedAtSeconds } = req.body;

  if (!videoId) {
    throw new ApiError(400, "VideoId is required");
  }

  const update = {
    $set: {
      lastWatchedAt: new Date(),
    },
    $inc: { watchCount: 1 },
  };

  if (typeof lastWatchedAtSeconds === "number") {
    update.$set.lastWatchedAtSeconds = lastWatchedAtSeconds;
  }

  const historyEntry = await WatchHistory.findOneAndUpdate(
    { user: userId, video: videoId },
    update,
    { new: true, upsert: true },
  );

  if (!historyEntry) {
    throw new ApiError(500, "Unable to update watch history");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, historyEntry, "Successfully updated watch history"),
    );
});

const getSingleHistoryEntry = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { videoId } = req.params;

  if (!videoId) {
    throw new ApiError(400, "VideoId is required");
  }

  const entry = await WatchHistory.findOne({
    user: userId,
    video: videoId,
  }).populate("video");

  if (!entry) {
    throw new ApiError(404, "Watch history entry not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        entry,
        "Successfully retrieved the watch history entry",
      ),
    );
});

const updateHistoryEntry = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { videoId } = req.params;
  const { lastWatchedAtSeconds, watchCount } = req.body;

  if (!videoId) {
    throw new ApiError(400, "VideoId is required");
  }

  const history = await WatchHistory.findOne({ user: userId, video: videoId });
  if (!history) {
    throw new ApiError(404, "watch history entry not found");
  }

  const update = {};

  if (typeof lastWatchedAtSeconds === "number") {
    update.lastWatchedAtSeconds = lastWatchedAtSeconds;
  }

  if (typeof watchCount === "number") {
    update.watchCount = watchCount;
  }

  update.lastWatchedAt = new Date();

  const updated = await WatchHistory.findOneAndUpdate(
    { user: userId, video: videoId },
    update,
    { new: true },
  ).populate("video");

  if (!updated) {
    throw new ApiError(500, "Failed to update Watch history entry");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updated, "Updated Successfully"));
});

const deleteHistoryEntry = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { videoId } = req.params;

  if (!videoId) {
    throw new ApiError(400, "VideoId is required");
  }

  const history = await WatchHistory.findOne({ user: userId, video: videoId });
  if (!history) {
    throw new ApiError(404, "watch history entry not found");
  }

  const deleted = await WatchHistory.findOneAndDelete({
    user: userId,
    video: videoId,
  });

  if (!deleted) {
    throw new ApiError(500, "Failed to delete watch history entry");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Watch history entry deleted"));
});

const clearUserWatchHistory = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  await WatchHistory.deleteMany({ user: userId });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Watch history cleared"));
});

export {
  getUserWatchHistory,
  upsertWatchHistory,
  getSingleHistoryEntry,
  updateHistoryEntry,
  deleteHistoryEntry,
  clearUserWatchHistory,
};
