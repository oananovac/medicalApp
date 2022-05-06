const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Patient = require("../models/Patient");
const bcrypt = require("bcryptjs");

// @route   GET/api/auth/test
// @desc    Test the auth rout
// @access  Public
router.get("/test", (req, res) => {
  res.send("Auth route works");
});

// @route   POST/api/auth/register
// @desc    Create a new user
// @access  Public
router.post("/register", async (req, res) => {
  try {
    // Hash PASSWORD
    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    // Create a new user
    const newUser = new User({
      email: req.body.email,
      password: hashedPassword,
      confirmPassword: hashedPassword,
      name: req.body.name,
    });

    // Save user to database
    const savedUser = await newUser.save();

    //Add user to patients database
    const newPatient = new Patient({
      _id: savedUser._id,
    });

    const savedPatient = await newPatient.save();

    return res.json(savedUser);
  } catch (error) {
    console.log("[*] Error: " + error);

    res.status(500).send(error.message);
  }
});

module.exports = router;
