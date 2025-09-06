import { Router } from "express";
import {
  signUp,
  login,
  logout,
  getCurrentUser,
  updateAssistant,
  askToAssistant,
} from "../controllers/user.controller.js";
import auth from "../middleware/auth.js";
import uploadingToMulter from "../middleware/multer.js";
export const authRouter = Router();




// function logRouterRoutes(prefix, router) {
//   if (!router.stack) return;
//   console.log(`\n📌 Routes registered under: "${prefix}"`);
//   router.stack.forEach((layer) => {
//     if (layer.route) {
//       const path = layer.route.path;
//       const methods = Object.keys(layer.route.methods)
//         .map((m) => m.toUpperCase())
//         .join(", ");
//       console.log(`   [${methods}] ${prefix}${path}`);
//     }
//   });
// }
// logRouterRoutes("/api/auth", authRouter);


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
export const gemRouter = Router();
gemRouter.post('/ask-gemini', auth, askToAssistant)
// logRouterRoutes("/ask", gemRouter);