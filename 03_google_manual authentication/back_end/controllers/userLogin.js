import UserModel from "../models/User.js";
import generateToken from "../Utils/generateToken.js";
import bcrypt from "bcrypt";

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: false,
        message: "Required Field Are Missing",
      });
    }
    const isUserExist = await UserModel.findOne({ email: email });

    if (!isUserExist) {
      return res.status(401).json({
        status: false,
        message: "Email ID & Password Does Not Match",
      });
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      isUserExist.password
    );

    if (!isPasswordMatch) {
      return res.status(401).json({
        status: false,
        message: "Email ID & Password Does Not Match",
      });
    }

    // const accessToken = generateToken({_id:isUserExist._id , email:isUserExist.email});
    const accessToken = generateToken(isUserExist.email);
    res.cookie("accessToken", accessToken, {
      sameSite: "none",
      httpOnly: true,
      secure: true,
    });

    res.status(200).json({
      status: true,
      message: "Successfully Login",
      data: {
        name: isUserExist.name,
        email: isUserExist.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export default login;
