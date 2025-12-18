import User from "../models/User.js";
import bcrypt, { compare } from "bcrypt";
import UserModel from "../models/User.js";

const userRegister = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const isUserExist = await User.findOne({ email: email });

    if (!name || !email || !password) {
      return res.status(400).json({
        status: false,
        message: "Required Field Are Missing",
        data: null,
      });
    }

    if (isUserExist) {
      return res.status(409).json({
        status: false,
        message: "User Already Register",
        data: null,
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const response = await UserModel.create({
      ...req.body,
      password: hashPassword,
    });

    res.status(200).json({
      status: true,
      message: "User Created",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};


export default userRegister;