const express = require("express");
const router = express.Router();
const Appointment = require("..//models/Appointment");
const requiresAuth = require("../middleware/permission");
const validateAppointment = require("../validation/appointmentValidation");

// @route   GET/api/appointments/test
// @desc    Return the appointments route
// @access  Public
router.get("/test", (req, res) => {
  return res.send("Appointments route");
});

// @route   POST/api/appointments/new
// @desc    Create a new appointment
// @access  Private
router.post("/new", requiresAuth, async (req, res) => {
  try {
    const { isValid, errors } = validateAppointment(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    //   Create a new appointment
    const newAppointment = new Appointment({
      user: req.user._id,
      content: req.body.content,
      complete: false,
    });

    await newAppointment.save();

    return res.json(newAppointment);
  } catch (error) {
    console.log("[*] Error " + error);

    return res.status(500).send(error.message);
  }
});

// @route   GET/api/appointments/myAppointments
// @desc    Return user appointments
// @access  Private
router.get("/myAppointments", requiresAuth, async (req, res) => {
  try {
    const completedAppointments = await Appointment.find({
      user: req.user._id,
      completed: true,
    }).sort({ completedAt: -1 });

    const incompletedAppointments = await Appointment.find({
      user: req.user._id,
      completed: false,
    }).sort({ createdAt: -1 });

    return res.json({
      completedAppointments: completedAppointments,
      incompletedAppointments: incompletedAppointments,
    });
  } catch (error) {
    console.log("[*] Error " + error);

    return res.status(500).send(error.message);
  }
});

module.exports = router;
