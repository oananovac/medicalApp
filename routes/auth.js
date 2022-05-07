const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Patient = require("../models/Patient");
const bcrypt = require("bcryptjs");
const validateRegisterInput = require("../validation/registerValidation");
const jwt = require("jsonwebtoken");
const requiresAuth = require("../middleware/permission");

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
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    // Check for existing user
    const existingEmail = await User.findOne({
      email: new RegExp("^" + req.body.email + "$", "i"),
    });

    if (existingEmail) {
      return res
        .status(400)
        .json({ erros: "There is already a user with this email" });
    }

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

    const payload = { userId: savedUser._id };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("access-token", token, {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    });

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

// @route   POST/api/auth/login
// @desc    Login user and return an access token
// @access  Public
router.post("/login", async (req, res) => {
  try {
    //   check for the user
    const user = await User.findOne({
      email: new RegExp("^" + req.body.email + "$", "i"),
    });

    if (!user) {
      return res.status(400).json({ error: "Something went wrong" });
    }

    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(400).json({ error: "Something went wrong" });
    }

    const payload = { userId: user._id };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("access-token", token, {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    });

    return res.json({ token: token, user: user });
  } catch (error) {
    console.log("[*] Error: " + error);

    return res.status(500).send(error.message);
  }
});

// @route   GET/api/auth/current
// @desc    Return the currently authed user
// @access  Private
router.get("/current", requiresAuth, (req, res) => {
  if (!req.user) {
    return res.status(401).send("Unauthorized");
  }

  return res.json(req.user);
});

// @route   PUT/api/auth/logout
// @desc    Logout user and clear cookie
// @access  Private
router.put("/logout", requiresAuth, async (req, res) => {
  try {
    res.clearCookie("access-token");

    return res.json({ success: true });
  } catch (error) {
    console.log("[*] Error: " + error);

    return res.status(500).send(error.message);
  }
});

module.exports = router;
