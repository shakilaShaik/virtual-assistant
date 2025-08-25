import express from "express";
import mongoConnect from "./config/db.js";
// import userRouter from "./routes/user.route.js";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";
import { authRouter, gemRouter } from "./routes/user.route.js";
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
app.use("/ask", gemRouter);

app.get("/gemini", async (req, res) => {
  try {
    const prompt = req.query.prompt;

    if (!prompt || prompt.trim() === "") {
      return res.status(400).json({ error: "Prompt is required." });
    }

    const data = await geminiResponse(prompt); // ✅ Await the async call

    res.json(data); // Send actual response data
  } catch (error) {
    console.error("Error in /gemini route:", error.message);
    res.status(500).json({ error: "Failed to get response from Gemini API." });
  }
});

app.listen(port, () => {
  mongoConnect();
  console.log(`app is running,${port}`);
});
