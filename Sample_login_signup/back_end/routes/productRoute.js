import express from "express";
import getAllProduct from "../controller/productController.js";
import checkAuth from "../middlewares/authMiddleware.js";

const router = express.Router();


router.route('/get').get(checkAuth,getAllProduct)



export default router;