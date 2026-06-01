import express from "express";
import {
   login,
   register,
   sendOtp,    verifyOtp,saveFcmToken
} from "../controllers/authController.js";


const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/send-otp", sendOtp);
authRouter.post("/verify-otp", verifyOtp);
authRouter.post(
    "/fcm-token",
  saveFcmToken
);


export default authRouter;
