import { Router } from "express";
import {
  signUp,
  login,
  logout,
  getCurrentUser,
  updateAssistant,
} from "../controllers/user.controller.js";
import auth from "../middleware/auth.js";
import uploadingToMulter from "../middleware/multer.js";
export const authRouter = Router();
authRouter.post("/signup", signUp);
authRouter.post("/login", login);
authRouter.get("/logout", logout);
authRouter.get("/get-user", auth, getCurrentUser);
authRouter.put(
  "/update-user",
  auth,
  uploadingToMulter.single("assistantImage"),
  updateAssistant
);
