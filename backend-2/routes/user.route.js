import { Router } from "express";
const userRouter = Router();
import { signUp, login, logout } from "../controllers/user.controller.js";

userRouter.post("/signup", signUp);
userRouter.post("/login", login);
userRouter.get("/logout", logout);
export default userRouter;
