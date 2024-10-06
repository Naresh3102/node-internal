const mongoose = require("mongoose");

// Creating Schema
const authSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be atleast 8 characters long"],
    },
    role: {
      type: String,
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

// Creating model
const Auth = mongoose.model("auth", authSchema);

module.exports = Auth;
