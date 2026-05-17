import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/User.model.js";
import { Video } from "../models/Video.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      error?.message ||
        "Something went wrong while generating Acess and Refresh Tokens"
    );
  }
};

const userRegister = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(400, "User already exist");
  }

  const user = await User.create({
    username: username.toLowerCase(),
    email,
    password,
    img: "",
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Unable to create user");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User created successfully"));
});

const userLogin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const userAvailable = await User.findOne({ username });

  if (!userAvailable) {
    throw new ApiError(404, "No user with this username");
  }

  const isPasswordCorrect = await userAvailable.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid Credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    userAvailable._id
  );

  const loggedInUser = await User.findById(userAvailable._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "User logged in successfully"
      )
    );
});

const googleLogin = asyncHandler(async (req, res) => {
  const { username, email, profilePic } = req.body;

  let userAvailable = await User.findOne({ $or: [{ username }, { email }] });

  if (!userAvailable) {
    userAvailable = await User.create({
      username: username.toLowerCase(),
      email,
      profileImg: profilePic,
    });
  } 
  
  if(userAvailable.profileImg === "") {
    userAvailable.profileImg = profilePic;
    await userAvailable.save({ validateBeforeSave: false });
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    userAvailable._id
  );

  const loggedInUser = await User.findById(userAvailable._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "User logged in successfully"
      )
    );
});

const userLogout = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: { refreshToken: undefined },
    },
    { new: true }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out"));
});

const userDelete = asyncHandler(async (req, res) => {
  await User.findByIdAndDelete(req.user._id);

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User Deleted successfully"));
});

const userGet = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId).select("-password -refreshToken");
  if (!user) {
    throw new ApiError(404, "No such user exists");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, user, "User retrieved successfully"));
});

const updateUsername = asyncHandler(async (req, res) => {
  const { username } = req.body;
  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: { username: username.toLowerCase() },
    },
    { new: true }
  ).select("-password -refreshToken");

  return res
    .status(200)
    .json(new ApiResponse(200, updatedUser, "Username updated successfully"));
});

const updatePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user._id);

  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid old Password");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "password updated successfully"));
});

const subscribeUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "No such user exists");
  }

  await User.findByIdAndUpdate(req.user._id, {
    $push: { subscribedUsers: req.params.id },
  });
  await User.findByIdAndUpdate(userId, { $inc: { subscribers: 1 } });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Subscribed successfully"));
});

const unsubscribeUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  await User.findByIdAndUpdate(req.user._id, {
    $pull: { subscribedUsers: userId },
  });
  await User.findByIdAndUpdate(userId, {
    $inc: { subscribers: -1 },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "UnSubscription successful"));
});

const likeVideo = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const videoId = req.params.videoId;
  const video = await Video.findById(videoId);
  if (!video) {
    throw new ApiError(404, "No Video found");
  }
  const liked = await Video.findByIdAndUpdate(
    videoId,
    {
      $addToSet: { likes: userId },
      $pull: { dislikes: userId },
    },
    { new: true }
  );

  const totalLikes = liked.likes.length;

  return res
    .status(200)
    .json(new ApiResponse(200, { totalLikes }, "Video liked"));
});

const dislikeVideo = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const videoId = req.params.videoId;
  const video = await Video.findById(videoId);
  if (!video) {
    throw new ApiError(404, "No Video found");
  }
  const disliked = await Video.findByIdAndUpdate(
    videoId,
    {
      $addToSet: { dislikes: userId },
      $pull: { likes: userId },
    },
    { new: true }
  );

  const totalDisLikes = disliked.dislikes.length;

  return res
    .status(200)
    .json(new ApiResponse(200, { totalDisLikes }, "Video disliked"));
});

export {
  userRegister,
  userLogin,
  userLogout,
  userDelete,
  userGet,
  updateUsername,
  updatePassword,
  subscribeUser,
  unsubscribeUser,
  likeVideo,
  dislikeVideo,
  googleLogin,
};
