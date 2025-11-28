import axios from "axios";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/userModels.js";
import { google } from "googleapis";

dotenv.config();

// Step 1: Google OAuth2 client banana
const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

// "new" ka matlab hota hai ek naya object banana
const oauth2Client = new google.auth.OAuth2(
  clientId, // Google app ka client ID
  clientSecret, // Google app ka secret key
  "postmessage" // redirect URL (for backend use)
);

/* GET Google Authentication API. */
const googleAuth = async (req, res, next) => {
  console.log(req.query.code);
  
  const code = req.query.code;
  try {
    const googleRes = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(googleRes.tokens);
    const userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
    );
    const { email, name, picture } = userRes.data;
    // console.log(userRes);
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        image: picture,
      });
    }
    const { _id } = user;
    const token = jwt.sign({ _id, email }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_TIMEOUT,
    });
    res.status(200).json({
      message: "success",
      token,
      user,
    });
  } catch (err) {
    console.error("Google Auth Error:", err.message);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export default googleAuth;
