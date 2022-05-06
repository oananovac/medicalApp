require("dotenv").config();
const express = require("express");
const app = express();

const mongoose = require("mongoose");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("React App");
});

/**
 * Connects to MongoDB Atlas
 * Then starts the server
 */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("[*] Connected to database");

    app.listen(process.env.PORT, (req, res) => {
      console.log("[*] Server started on port: " + process.env.PORT);
    });
  })
  .catch((err) => {
    console.log("[*] Error: " + err);
  });
