import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";

const uploadOnCloudinary = async (localFilePath) => {
  console.log("inside cloudinary: ", localFilePath);
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  try {
    if (!localFilePath) return null;
    const ext = path.extname(localFilePath).toLowerCase();
    const isVideo = [".mp4", ".mov", ".avi", ".mkv", ".webm"].includes(ext);
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: isVideo ? "video" : "image",
    });
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    console.log("File upload error: ", error);
    fs.unlinkSync(localFilePath);
    return null;
  }
};



export { uploadOnCloudinary };



























