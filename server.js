require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("React App");
});

app.listen(process.env.PORT, (req, res) => {
  console.log("[*] Server started on port: " + process.env.PORT);
});
