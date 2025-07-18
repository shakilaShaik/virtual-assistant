import express from "express";

const app = express();
app.use("/get", (req, res) => {
  res.send("server started");
});

const port = 3000;

app.listen(port, () => {
  console.log(`app is running, ${port}`);
});
