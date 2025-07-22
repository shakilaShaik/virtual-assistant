// import { Router } from "express";
// const userRouter = Router();
// import { signUp, login, logout } from "../controllers/user.controller.js";

// userRouter.post("/signup", signUp);
// userRouter.post("/login", login);
// userRouter.get("/logout", logout);
// userRouter.post("/test", async (req, res) => {
//   console.log("req.body", req.body);
// });
// export default userRouter;
import { Router } from "express";
import { signUp, login, logout } from "../controllers/user.controller.js";

export const authRouter = Router();
authRouter.post("/signup", signUp);
authRouter.post("/login", login);
authRouter.get("/logout", logout);
