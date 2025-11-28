import express from "express";
import  {profileImageControler}  from "../../controller/profileImageControler.js";
import checkAuth from "../../middlewares/authMiddleware.js";
import multer from "multer";
import upload from "../../middlewares/multerMiddleware.js";


const router = express.Router();



router.route('/upload').post([checkAuth,upload.single("profileImage")],profileImageControler)











export default router;