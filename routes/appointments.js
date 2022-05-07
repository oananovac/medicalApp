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
      service: req.body.service,
      date: req.body.datePick,
      completed: false,
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

// @route   PUT/api/appointments/:appointmentId/complete
// @desc    Create a new appointment
// @access  Private
router.put("/:appointmentId/complete", requiresAuth, async (req, res) => {
  try {
    const appointment = await Appointment.findOne({
      user: req.user._id,
      _id: req.params.appointmentId,
    });
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    if (appointment.completed) {
      return res.status(404).json({ error: "Appointment already completed" });
    }

    const updatedAppointment = await Appointment.findOneAndUpdate(
      {
        user: req.user._id,
        _id: req.params.appointmentId,
      },
      { completed: true, completedAt: new Date() },
      { new: true }
    );

    return res.json(updatedAppointment);
  } catch (error) {
    console.log("[*] Error " + error);

    return res.status(500).send(error.message);
  }
});

// @route   PUT/api/appointments/:appointmentId
// @desc    Update an appointment
// @access  Private
router.put("/:appointmentId", requiresAuth, async (req, res) => {
  try {
    const appointment = await Appointment.findOne({
      user: req.user._id,
      _id: req.params.appointmentId,
    });

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    const { isValid, errors } = validateAppointment(req.body);

    if (!isValid) {
      return res.status(404).json(errors);
    }

    const updatedAppointment = await Appointment.findOneAndUpdate(
      {
        user: req.user._id,
        _id: req.params.appointmentId,
      },
      {
        content: req.body.content,
        service: req.body.service,
        date: req.body.date,
      },
      { new: true }
    );

    return res.json(updatedAppointment);
  } catch (error) {
    console.log("[*] Error " + error);

    return res.status(500).send(error.message);
  }
});

// @route   DELETE/api/appointments/:appointmentId
// @desc    Cancel an appointment
// @access  Private
router.delete("/:appointmentId", requiresAuth, async (req, res) => {
  try {
    const appointment = await Appointment.findOne({
      user: req.user._id,
      _id: req.params.appointmentId,
    });

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    await Appointment.findOneAndRemove({
      user: req.user._id,
      _id: req.params.appointmentId,
    });

    return res.json({ success: true });
  } catch (error) {
    console.log("[*] Error " + error);

    return res.status(500).send(error.message);
  }
});

module.exports = router;
