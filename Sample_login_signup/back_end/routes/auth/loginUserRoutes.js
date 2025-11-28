import express from "express";
import { loginUserControler } from "../../controller/loginUserControler.js";
import checkAuth from "../../middlewares/authMiddleware.js";


const router = express.Router()


router.route("/get").get(checkAuth,loginUserControler)






export default router;