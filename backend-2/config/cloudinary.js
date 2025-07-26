import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const upload = async (filePath) => {
  cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.cloudinary_api_key,

    api_secret: process.env.cloudinary_secret,
  });

  try {
    const uploadResult = cloudinary.uploader.upload(filePath);
    fs.unlinkSync(filePath);

    return uploadResult.secure_url;
  } catch (error) {
    return error;
  }
};
export default upload;
