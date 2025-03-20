require("dotenv").config();

const express = require("express");
const app = express();
const connectDB = require("./config/dbConnection");
const PORT = process.env.PORT;

connectDB();

app.get("/", (req, res) => {
  res.json({ message: "Hello from POS Server!" });
});

app.listen(PORT, () => {
  console.log(`POS Server is listening on port ${PORT}`);
});
