import UserModel from "../models/User.js";

const getUser = async (req, res, next) => {
  try {
    const email = req.email;
    const findUser = await UserModel.findOne({ email: email });
    res.status(200).json({
      status: true,
      message: "User Get Successfully",
      status: true,
      data: { name: findUser.name, email: findUser.email },
    });
  } catch (error) {
     res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export default getUser;