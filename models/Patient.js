const { Schema, model } = require("mongoose");

const PatientSchema = new Schema(
  {
    city: { type: String, required: true, default: "NY" },
  },
  { timestamps: true }
);

const Patient = model("Patient", PatientSchema);

module.exports = Patient;
