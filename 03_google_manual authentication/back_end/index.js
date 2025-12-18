import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import connectMongoDatabase from "./config/db.js";
import session from "express-session"
import cookieParser from "cookie-parser";
import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import googleAuth from "./middlewares/googleAuth.js";
import userRegister from "./routes/userRoutes.js"

dotenv.config();
const PORT = process.env.PORT || 8081;
const app = express()
connectMongoDatabase();

app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}));
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(session({
  secret:"ibrar",
  resave:false,
  saveUninitialized:true
}))
app.use(cookieParser())


//----------------------------------------Google_login_configratio-------------------------

app.use(passport.initialize());
app.use(passport.session());

passport.use(new Strategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:'http://localhost:5050/auth/google/callback'
  },
  (accessToken , refreshToken , profile , done)=>{
    return done(null,profile)
  }
))
//----------------------------------------End_Google_login_configratio-------------------------


//--------------------------------------session-maintain-keliye---------------------not_clear
passport.serializeUser((user,done)=>{
done(null,user)
})

passport.deserializeUser((user,done)=>{
done(null,user)
})
//--------------------------------------End_session-maintain----------------------------------

//---------------------------------------------------------Google_Login---------------------------------------
app.get('/auth/google', passport.authenticate("google",{
  scope:['email', "profile"],
  prompt:"select_account"

})) // 1st user is URL per aye ga http://localhost:5050/auth/google abhi user google ky pass chalagaia hai authenticate keliye.

app.get("/auth/google/callback", passport.authenticate("google",{
  failureRedirect:"http://localhost:5173/login"
}),
googleAuth,
(req,res,next)=>{
  res.redirect("http://localhost:5173/")
}) //user google sy wapis aye ga is URL per http://localhost:5050/auth/google/callback is API ky call ky response per condiction condiction check kare ga passport.authenicate mehthode ,,, agr google oky ka response dia to front-end profile per ,, warna fron-end ky login per

//---------------------------------------------------------End_Google_Login---------------------------------------

app.use("/user",userRegister)

app.use((req, res) => {
  res.status(404).send("Page not found");
})


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})