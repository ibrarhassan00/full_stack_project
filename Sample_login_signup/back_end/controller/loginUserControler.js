import UserModel from "../models/userModel.js";

export const loginUserControler = async (req, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.userId });
    res.status(200).json({
      // 200 OK
      status: true,
      message: "User Online",
      data: user
    });
  } catch (error) {
    res.status(500).json({
      // 500 Internal Server Error
      status: false,
      message: error.message,
    });
  }
};
