import express from "express";
import mongoConnect from "./config/db.js";
import userRouter from "./routes/user.route.js";
import dotenv from "dotenv"
dotenv.config()


const app = express();
app.use("/get", (req, res) => {
  res.send("server started");
});
app.use(express.json());
app.use(cookieParser)

const port = 3000;
app.use("/api/auth", userRouter);
app.listen(port, () => {
  mongoConnect();
  console.log(`app is running, ${port}`);
});
