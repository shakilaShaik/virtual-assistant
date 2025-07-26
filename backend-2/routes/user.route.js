
import { Router } from "express";
import {
  signUp,
  login,
  logout,
  getCurrentUser,
} from "../controllers/user.controller.js";
import auth from "../middleware/auth.js";


export const authRouter = Router();
authRouter.post("/signup", signUp);
authRouter.post("/login", login);
authRouter.get("/logout", logout);
authRouter.get("/get-user", auth, getCurrentUser);
