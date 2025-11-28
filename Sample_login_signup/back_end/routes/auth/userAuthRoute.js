import express from "express";
import {changePasswordController, forgetPasswordController, restOtpController, userLogin, userRegister, verifyOtpController} from "../../controller/userController.js"
const router = express.Router();


router.route('/usersignup').post(userRegister)
router.route('/usersignin').post(userLogin)
router.route('/verify-otp').post(verifyOtpController)
router.route('/reset-otp').post(restOtpController)
router.route('/forgetPassword').post(forgetPasswordController)
router.route('/changePassword').post(changePasswordController)

export default router;