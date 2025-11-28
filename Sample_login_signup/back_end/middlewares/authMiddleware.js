import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const checkAuth = (request, res, next) => {
  try {
    const authHeader = request?.headers?.authorization;

    if (!authHeader) {
      return res.status(401).json({
        status: false,
        message: "Auth Failed: Authorization header is missing.",
      });
    }

    const token = authHeader.split(" ")[1];

    const privateKey = process.env.JWT_PRIVATE_KEY;

    const decode = jwt.verify(token, privateKey);

    console.log(decode);

    if (decode) {
      request.userId = decode._id
      next();
    } else {
      res.status(401).json({
        status: false,
        message: `Auth Failed JWT not valid`,
      });
    }
  } catch (error) {
    res.status(401).json({
      status: false,
      message: `Auth Failed yes ${error.message}`,
    });
  }
};

export default checkAuth;
