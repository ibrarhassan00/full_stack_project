import { response } from "express";
import UserModel from "../models/User.js";
import generateToken from "../Utils/generateToken.js";

const googleAuth = async (req, res, next) => {
  try {
    const email = req.user?._json?.email?.trim() ;

    if (!email) {
      return res
        .status(400)
        .json({ message: "Email not found in Google response" });
    }


    const findUser = await UserModel.findOne({ email });

   let userEmail = ''

    if (!findUser) {

      const userObject = {
        name: req.user?._json?.name,
        email: req.user?._json?.email,
      };
      const userCreatedResponse = await UserModel.create(userObject);
       userEmail = userCreatedResponse.email
 
     }
const accessToken = generateToken(findUser ? findUser.email : userEmail )

res.cookie('accessToken',accessToken,{httpOnly:true,secure:true,sameSite:'none'})

    next();
  } catch (error) {
    console.error("Google Auth Error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default googleAuth;
