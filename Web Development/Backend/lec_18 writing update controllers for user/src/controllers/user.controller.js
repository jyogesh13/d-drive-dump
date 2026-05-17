import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const generateAccessAndRefreshTokens = async (userId) => {
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
      error?.message || "Something went wrong while generating refresh and access token"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, fullName, password } = req.body;

  //   console.log(req.body);
  //   console.log("email: ", email);

  if (
    [username, email, fullName, password].some(
      (fields) => fields?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User already exist");
  }

  //   console.log("\nRequest.files :\n", req.files);

  const avatarLocalPath = req.files?.avatar[0]?.path;
  // const coverImageLocalPath = req.files?.coverImage[0]?.path;

  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }

  const user = await User.create({
    username: username.toLowerCase(),
    email,
    password,
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(
      500,
      "Something went wrong while registering the user!!"
    );
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User Registered successfully!!"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email) {
    throw new ApiError(400, "Username or email is required");
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(400, "User does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(" -password -refreshToken ");

  const options = {
    httpOnly : true,
    secure: true
  }

  return res
  .status(200)
  .cookie("accessToken", accessToken, options)
  .cookie("refreshToken", refreshToken, options)
  .json(
    new ApiResponse(
      200, {
        user: loggedInUser, 
        accessToken,
        refreshToken,
      },
      "User logged in successfully"
    )
  )
});

const logoutUser = asyncHandler( async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set:{
        refreshToken:undefined
      }
    },
    {
      new: true
    }
  )

  const options = {
    htmtonly: true,
    secure: true
  }

  return res.status(200)
  .clearCookie("accessToken",options)
  .clearCookie("refresToken",options)
  .json(
    new ApiResponse(200, {}, "User logged out")
  )
});

const refreshAccessToken = asyncHandler( async (req, res)=>{
  const incomingRefreshToken = req.cookies?.refreshToken || req.body.refreshToken;

  if(!incomingRefreshToken){
    throw new ApiError(401, "Unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
  
    const user = await User.findById(decodedToken?._id);
    if(!user){
      throw new ApiError(401, "Invalid refresh token")
    }
  
    if(incomingRefreshToken !== user?.refreshToken){
      throw new ApiError(401, "Refresh token either expired or used")
    }
  
    const { accessToken, newRefreshToken} = await generateAccessAndRefreshTokens(user._id);
  
    const options = {
      httpOnly: true,
      secure: true
    }
  
    return res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", newRefreshToken, options)
    .json(
      new ApiResponse(200, { accessToken, refreshToken : newRefreshToken }, "Access token refreshed successfully")
    )
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token")
  }
});

const changeUserPassword = asyncHandler( async ( req, res ) => {
  const {oldPassword, newPassword} = req.body;

  const user = await User.findById(req.user?._id);

  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

  if(!isPasswordCorrect){
    throw new ApiError(400, "Invalid old password")
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res.status(200).json( new ApiResponse(200, {}, "Password changed successfully") )
});

const getCurrentUser = asyncHandler( async ( req, res ) => {
  return res.status(200).json(200, req.user, "current user fetched succcessfully")
});

const updateAccountDetails = asyncHandler( async ( req, res ) => {
  const {fullName, email} = req.body;

  if(!fullName || !email){
    throw new ApiError(400, "All fields are required")
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        fullName, email
      }
    },
    {
      new: true
    }
  ).select("-password")

  return res.status(200).json(new ApiResponse(200, user, "Account details updated successfully"))
});

const updateUserAvatar = asyncHandler( async ( req, res ) => {
  const avatarLocalPath = req.file?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is missing")
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath)

  if (!avatar.url) {
    throw new ApiError(400, "Error while uploading avatar")
  }

  const user = await User.findByIdAndUpdate(req.user?._id,{$set:{ avatar : avatar.url}},{new:true}).select("-password")

  return res.status(200).json(new ApiResponse(200, user, "Avatar file updated succcessfully"))
});

const updateUserCoverImage = asyncHandler( async ( req, res ) => {
  const coverImageLocalPath = req.file?.path;

  if (!coverImageLocalPath) {
    throw new ApiError(400, "Cover Image file is missing")
  }

  const coverImage = await uploadOnCloudinary(coverImageLocalPath)

  if (!coverImage.url) {
    throw new ApiError(400, "Error while uploading cover image")
  }

  const user = await User.findByIdAndUpdate(req.user?._id,{$set:{ coverImage : coverImage.url}},{new:true}).select("-password")

  return res.status(200).json(new ApiResponse(200, user, "coverImage  updated succcessfully"))
});

export { 
  registerUser,
  loginUser, 
  logoutUser, 
  refreshAccessToken, 
  changeUserPassword, 
  getCurrentUser, 
  updateAccountDetails, 
  updateUserAvatar,
  updateUserCoverImage 
};

/*

user.routes.js
│
├── Defines Express routes for user actions:
│     ├─ POST /register  ──> registerUser (controller)
│     ├─ POST /login     ──> loginUser (controller)
│     └─ POST /logout    ──> [verifyJWT (middleware)] ──> logoutUser (controller)
│
│
├── Imports:
│     ├─ registerUser, loginUser, logoutUser from user.controller.js
│     └─ verifyJWT from auth.middleware.js
│
│
user.controller.js
│
├── Exports controller functions:
│     ├─ registerUser
│     ├─ loginUser
│     └─ logoutUser
│
├── Handles:
│     ├─ User registration (registerUser)
│     ├─ User login (loginUser)
│     └─ User logout (logoutUser)
│
│
auth.middleware.js
│
├── Exports verifyJWT middleware:
│     └─ Checks JWT in cookies or headers
│     └─ If valid, attaches user to req.user
│     └─ If invalid, throws error
│
│
Code Flow Example: POST /logout
│
1. Request hits /logout route in user.routes.js
2. verifyJWT middleware runs:
│     └─ Checks accessToken, verifies user
3. If verified, calls logoutUser controller:
│     └─ Removes refreshToken from DB
│     └─ Clears cookies
│     └─ Sends response

*/