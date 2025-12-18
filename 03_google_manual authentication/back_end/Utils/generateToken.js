import jwt from "jsonwebtoken";


const generateToken = (user) => {
  console.log(user);
  
  const accessToken = jwt.sign({email:user}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_TIMEOUT,
  });
 
  
  return accessToken;
};

export default generateToken;