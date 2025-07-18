import express from "express";
import mongoConnect from "./config/db.js";

const app = express();
app.use("/get", (req, res) => {
  res.send("server started");
});

const port = 3000;

app.listen(port, () => {
  mongoConnect();
  console.log(`app is running, ${port}`);
});
