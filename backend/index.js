// import express from "express";
// import dotenv from "dotenv";
// import connectDb from "./config/db.js";
// import userRouter from "./routes/user.route.js";
// import cookieParser from "cookie-parser";
// dotenv.config();

// const app = express();
// app.use(express.json());

// const port = process.env.PORT || 8000;
// app.use(express.json());
// app.use(cookieParser());

// app.get("/", (req, res) => {
//   res.send("Hello World iam from backend");
// });

// app.use("/api/auth", userRouter);
// app.listen(port, () => {
//   connectDb();
//   console.log("server started");
// });
