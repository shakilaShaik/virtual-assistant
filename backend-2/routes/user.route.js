import { Router } from "express";
const userRouter = Router();
import signUp from "../controllers/user.controller.js";

userRouter.post("/signup", signUp);
export default userRouter;
