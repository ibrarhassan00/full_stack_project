import express from "express";
import googleAuth from "../controllers/authController.js"

const Router = express.Router();

Router.get("/google", googleAuth);

export default Router;