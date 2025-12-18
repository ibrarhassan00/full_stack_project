const logout = (req, res, next) => {
try {
  res.clearCookie("connect.sid");
  res.clearCookie("accessToken");
  res.status(200).json({
    status: true,
    message: "logout Successfully",
  });
} catch (error) {
      res.status(500).json({
      status: false,
      message: error.message,
    });
}
};


export default logout;