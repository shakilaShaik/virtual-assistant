import express from "express";
import { signUp, Login ,Logout} from "../controllers/auth.controllers.js;


const userRouter = express.Router();




userRouter.post('/signUp', signUp)
userRouter.post('/login', Login)
userRouter.get('/logout',Logout)
export default userRouter;
