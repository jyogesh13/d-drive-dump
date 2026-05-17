import { asyncHandler } from "../utils/asyncHandler.js";
import { Comments } from "../models/Comments.model.js";
import { Video } from "../models/Video.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const postComment = asyncHandler(async (req, res) => {
  const { desc, videoId } = req.body;
  const video = await Video.findById(videoId);

  if (!video) {
    throw new ApiError(404, "No such video exists");
  }
  if(!desc){
    throw new ApiError(401, "Please provide required fields!!")
  }
  const userId = req.user._id;

  const comment = await Comments.create({ userId, videoId, desc });

  const commentCreated = await Comments.findById(comment._id).populate(
    "userId",
    "username"
  );

  if (!commentCreated) {
    throw new ApiError(500, "Unable to post the comment");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, commentCreated, "Comment posted successfully"));
});

const deleteComment = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const commentId = req.params.commentId;
  const comment = await Comments.findById(commentId);
  if (!comment) {
    throw new ApiError(404, "No such comment posted");
  }
  const video = await Video.findById(comment.videoId);
  
  if (!(userId.equals(comment.userId) || userId.equals(video.userId))) {
    throw new ApiError(401, "Unable to delete Comment");
  }
  const commentDeleted = await Comments.findByIdAndDelete(comment._id);

  if (!commentDeleted) {
    throw new ApiError(501, "Error while deleting the comment, Try again!!");
  }

  return res.status(200).json(new ApiResponse(200, {}, "Comment deleted"));
});

const getComments = asyncHandler(async (req, res) => {
  const videoId = req.params.videoId;
  const video = await Video.findById({ _id: videoId });

  if (!video) {
    throw new ApiError(404, "No such video exists");
  }
  const comments = await Comments.find({ videoId }).populate(
    "userId",
    "username"
  );
  if (!comments) {
    throw new ApiError(404, "No comments available");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, comments, "All comments retrieved"));
});

export { postComment, deleteComment, getComments };
