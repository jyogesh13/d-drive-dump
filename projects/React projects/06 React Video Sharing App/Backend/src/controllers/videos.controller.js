import { asyncHandler } from "../utils/asyncHandler.js";
import { Video } from "../models/Video.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/User.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const postVideo = asyncHandler(async (req, res) => {
  console.log("req.body: ",req.body)
  console.log("req.files: ",req.files)

  const { title, desc } = req.body;
  const thumbnailLocalFilePath = req.files?.thumbnail[0]?.path;
  const videoLocalFilePath = req.files?.video[0]?.path;

  console.log("videoLocalFilePath: ",videoLocalFilePath)
  console.log("thumbnailLocalFilePath: ",thumbnailLocalFilePath)

  const imgUrl = await uploadOnCloudinary(thumbnailLocalFilePath);
  const videoUrl = await uploadOnCloudinary(videoLocalFilePath);

  console.log("imgUrl: ",imgUrl)
  console.log("videoUrl: ",videoUrl)

  if(!imgUrl && !videoUrl){
    throw new ApiError(400, "Thumbnail or video is required")
  }

  const video = await Video.create({
    userId: req.user._id,
    title,
    desc,
    imgUrl : imgUrl.url,
    videoUrl: videoUrl.url,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, video, "Video posted successfully"));
});

const updateVideoTitle = asyncHandler(async (req, res) => {
  const { title } = req.body;
  const videoId = req.params.id;

  const videoExist = await Video.findById(videoId);

  if (!videoExist) {
    throw new ApiError(404, "No such video exists");
  }

  const video = await Video.findByIdAndUpdate(
    videoId,
    { $set: { title } },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, video, "Title updated successfully"));
});

const updateVideoDesc = asyncHandler(async (req, res) => {
  const { desc } = req.body;
  const videoId = req.params.id;

  const videoExist = await Video.findById(videoId);

  if (!videoExist) {
    throw new ApiError(404, "No such video exists");
  }

  const video = await Video.findByIdAndUpdate(
    videoId,
    { $set: { desc } },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, video, "Description updated successfully"));
});

const deleteVideo = asyncHandler(async (req, res) => {
  const videoId = req.params.id;
  const videoExist = await Video.findById(videoId);

  if (!videoExist) {
    throw new ApiError(404, "No such video exists");
  }
  await Video.findByIdAndDelete(videoId);
  return res.status(200).json(new ApiResponse(200, {}, "Video deleted"));
});

const getVideo = asyncHandler(async (req, res) => {
  const videoId = req.params.id;
  const video = await Video.findById(videoId);
  if (!video) {
    throw new ApiError(404, "No such video exists");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, video, "Video retrieved successfully"));
});

const addView = asyncHandler(async (req, res) => {
  const videoId = req.params.id;
  const video = await Video.findById(videoId);
  if (!video) {
    throw new ApiError(404, "No video for this id exists");
  }
  await Video.findByIdAndUpdate(videoId, { $inc: { views: 1 } });
  return res.status(200).json(new ApiResponse(200, {}, "Views incremented"));
});

const trendingVideos = asyncHandler(async (_, res) => {
  const videos = await Video.find().sort({ views: -1 });
  return res
    .status(200)
    .json(new ApiResponse(200, videos, "Top trending videos retrieved"));
});

const randomVideos = asyncHandler(async (_, res) => {
  const videos = await Video.aggregate([{ $sample: { size: 40 } }]);
  return res
    .status(200)
    .json(new ApiResponse(200, videos, "40 random videos retrieved"));
});

const subscribedVideos = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const subscribedUsers = user.subscribedUsers;

  const list = await Promise.all(
    subscribedUsers.map((channelId) => {
      return Video.find({ userId: channelId });
    })
  );

  const videolist = list.flat().sort((a, b) => b.createdAt - a.createdAt);

  return res
    .status(200)
    .json(
      new ApiResponse(200, videolist, "Videos of subscribed user retrieved!!")
    );
});

const getVideosByTags = asyncHandler(async (req, res) => {
  const tags = req.query.tags.split(",");
  const videos = await Video.find({ tags: { $in: tags } }).limit(20);
  return res
    .status(200)
    .json(new ApiResponse(200, videos, "Videos by given tags receieved"));
});

const getVideosByTitle = asyncHandler(async (req, res) => {
  const titleQuery = req.query.titleQuery;
  const videos = await Video.find({
    title: { $regex: titleQuery, $options: "i" },
  }).limit(40);
  return res
    .status(200)
    .json(new ApiResponse(200, videos, "Top trending videos retrieved"));
});

export {
  postVideo,
  updateVideoTitle,
  updateVideoDesc,
  deleteVideo,
  getVideo,
  addView,
  trendingVideos,
  randomVideos,
  subscribedVideos,
  getVideosByTags,
  getVideosByTitle,
};
