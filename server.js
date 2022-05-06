require("dotenv").config();
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const express = require("express");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/** Routes imports */
const authRoute = require("./routes/auth");

app.use("/api/auth", authRoute);

app.get("/api", (req, res) => {
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
