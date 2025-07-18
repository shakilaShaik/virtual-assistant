import express from "express";
import { SignUp, Login, Logout } from "../controllers/auth.controllers.js";

const userRouter = express.Router();

userRouter.post("/signup", SignUp);
userRouter.post("/login", Login);
userRouter.get("/logout", Logout);
export default userRouter;
