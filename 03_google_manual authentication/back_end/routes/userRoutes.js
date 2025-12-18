import express from "express";
import userRegister from "../controllers/userResgister.js";
import userLogin from "../controllers/userLogin.js"
import getUser from "../controllers/getuser.js";
import auth from "../middlewares/auth.js";
import logout from "../controllers/logout.js"
import getAccess from "../controllers/getAccess.js";
import forgotPassword from "../controllers/forgotPassword.js";
import verifyOtp from "../controllers/varifyOtp.js";
import getTime from "../controllers/getTime.js";
import updatePasseord from "../controllers/updatePassword.js"

const router = express.Router();

router.post("/register",userRegister);
router.post("/login",userLogin)
router.get('/profile',auth,getUser)
router.get('/logout',logout)
router.get('/access',auth,getAccess)
router.post('/password/forgot',forgotPassword)
router.post('/otp/verify', verifyOtp)
router.post('/otp/time', getTime)
router.post('/password/update',auth, updatePasseord)

export default router;