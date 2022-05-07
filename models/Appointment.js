const { Schema, model } = require("mongoose");

const AppointmentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    content: { type: String, required: true },
    service: { type: String, required: true },
    date: { type: String },
    completed: { type: Boolean, default: false },
    completedAt: { type: Date },
  },
  { timestamps: true }
);

const Appointment = new model("Appointment", AppointmentSchema);
module.exports = Appointment;
