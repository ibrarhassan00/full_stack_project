import { cloudinaryUploader } from "../config/cloudnary.js";
import UserModel from "../models/userModel.js";
import fs from "fs";




export const profileImageControler = async (req, res) => {
  try {
    // image save on cloudinary
    const imageRes = await cloudinaryUploader.upload(req.file.path);
    await UserModel.findByIdAndUpdate(req.userId, {
      imageUrl: imageRes.secure_url,
    });
    res.status(201).json({
      message: "image uploaded",
      url: imageRes.secure_url,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: `${error.message} `,
    });
  } finally {
    console.log("finally");
    fs.unlinkSync(req.file.path);
  }
};
