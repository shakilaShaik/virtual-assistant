import express from "express";
import mongoConnect from "./config/db.js";
// import userRouter from "./routes/user.route.js";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";
import { authRouter } from "./routes/user.route.js";
import geminiResponse from "./gemini.js";

const app = express();

const corsOptions = {
  origin: "http://localhost:5173", // Your frontend origin
  credentials: true, // Allow cookies/auth headers
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("server started");
});

const port = 3000;
// app.use("/api/auth", userRouter);

app.use("/api/auth", authRouter);
app.get("/gemini", async(req, res) => {
  let prompt = req.query.prompt;
  let data = geminiResponse(prompt);
  res.json(data)
  
});
app.listen(port, () => {
  mongoConnect();
  console.log(`app is running,${port}`);
});
