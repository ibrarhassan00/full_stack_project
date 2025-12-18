import UserModel from "../models/User.js";
import generateToken from "../Utils/generateToken.js";

const verifyOtp = async (req, res, next) => {
  const { otp } = req.body;
  console.log(otp);
  
  try {
    const findedUser = await UserModel.findOne({ "password_otp.otp": otp });
    // console.log(findedUser);
    
    if (!findedUser) {
      return res.status(400).json({ status: false, message: "Incorrect Otp" });
    }

    const isExpireOtp = findedUser.password_otp.sent_time < new Date().getTime();

    if (isExpireOtp) {
      return res.status(400).json({ status: false, message: "Otp Expired" });
    }

    findedUser.password_otp.otp = null
    await findedUser.save()

    const accessToken = generateToken(findedUser.email);
    res.cookie('accessToken',accessToken)

    res.status(200).json({
      status: true,
      message: "Otp Verified",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message:error.message
    });
  }
};


export default verifyOtp;