const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true },
    name: { type: String, required: true },
    roles: {
      type: [
        {
          type: String,
          enum: ["patient", "admin", "doctor"],
        },
      ],
      default: "admin",
    },
  },
  { timestamps: true }
);

// export model
const User = model("User", UserSchema);
module.exports = User;
