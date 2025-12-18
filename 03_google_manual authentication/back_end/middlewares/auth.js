import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      const error = new Error("Un_Authorized");
      error.statusCode = 403;
      throw error;
    }
    jwt.verify(accessToken, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        res.status(403).json({
          status: false,
          message: "Unauthorized User",
        });
      } else {
        req.email = decoded.email;
      }
      next();
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export default auth;
