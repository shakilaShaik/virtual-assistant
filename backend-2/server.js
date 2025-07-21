import express from "express";
import mongoConnect from "./config/db.js";
import userRouter from "./routes/user.route.js";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

const corsOptions = {
  origin: "http://localhost:5173", // Your frontend origin
  credentials: true, // Allow cookies/auth headers
};

app.use(cors(corsOptions));

app.use("/get", (req, res) => {
  res.send("server started");
});
app.use(express.json());
app.use(cookieParser);

const port = 3000;
app.use("/api/auth", userRouter);
app.listen(port, () => {
  mongoConnect();
  console.log(`app is running, ${port}`);
});
