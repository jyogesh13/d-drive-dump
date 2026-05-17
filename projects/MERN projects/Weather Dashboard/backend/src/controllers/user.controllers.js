import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";

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
        "Something went wrong while generating Acess and Refresh tokens",
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const existedUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existedUser) {
    throw new ApiError(409, "User already exists");
  }

  const user = await User.create({
    username: username.toLowerCase(),
    email,
    password,
    avatar: " ",
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  if (!createdUser) {
    throw new ApiError(
      500,
      "Something went wrong while registering the user!!",
    );
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User Registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { loginInput, password } = req.body;

  if (!loginInput) {
    throw new ApiError(400, "Username or email is required");
  }

  const user = await User.findOne({
    $or: [
      { username: loginInput.toLowerCase() },
      { email: loginInput.toLowerCase() },
    ],
  });

  if (!user) {
    throw new ApiError(400, "User doesnot exists");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user Credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id,
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken",
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
        "User logged in successfully",
      ),
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    { $set: { refreshToken: undefined } },
    { new: true },
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

const googleLogin = asyncHandler(async (req, res) => {
  const { username, email, avatar } = req.body;

  let existedUser = await User.findOne({ $or: [{ username }, { email }] });

  if (!existedUser) {
    existedUser = await User.create({
      username: username.toLowerCase(),
      email,
      avatar,
    });
  }

  if (existedUser.avatar === "") {
    existedUser.avatar = avatar;
    await existedUser.save({ validateBeforeSave: false });
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    existedUser._id,
  );

  const loggedInUser = await User.findById(existedUser._id).select(
    "-password -refreshToken",
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
        "User logged in successfully",
      ),
    );
});

const addToFavorites = asyncHandler(async (req, res) => {
  const { city, country, latitude, longitude } = req.body;

  if (!city || !country || latitude === undefined || longitude === undefined) {
    throw new ApiError(400, "Some input fields are missing");
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: {
        favorites: { city, country, latitude, longitude },
      },
    },
    { new: true },
  ).select("-refreshToken");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  res.status(200).json(new ApiResponse(200, user, "Successfully added"));
});

const removeFromFavorites = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(400, "Some input fields are missing");
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { favorites: { _id: id } },
    },
    { new: true },
  ).select("-refreshToken");

  if (!user) {
    throw new ApiError(404, "Error while removing from favorites..Try Again!!");
  }

  res.status(200).json(new ApiResponse(200, user, "Successfully removed!!"));
});

export {
  registerUser,
  loginUser,
  logoutUser,
  googleLogin,
  addToFavorites,
  removeFromFavorites,
};
