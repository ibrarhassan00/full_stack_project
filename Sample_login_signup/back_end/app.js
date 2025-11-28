import express from "express";
import dotenv from "dotenv";
import connectMongoDatabase from "./config/db.js";
import user_signin_signup_route from "./routes/auth/userAuthRoute.js";
import product_route from "./routes/productRoute.js"
import profile_image_route from "./routes/auth/profileImageRoute.js"
import login_user_route from "./routes/auth/loginUserRoutes.js"
import cors from "cors";
import { cloudinaryConfig } from "./config/cloudnary.js";

dotenv.config();
connectMongoDatabase();
cloudinaryConfig();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));



app.use(`/api/auth`,user_signin_signup_route);
app.use(`/api/product`,product_route);
app.use(`/api/profileImage` , profile_image_route )
app.use(`/api/login-user` , login_user_route )






app.listen(PORT , ()=>{console.log(`server is on port ${PORT}`)})