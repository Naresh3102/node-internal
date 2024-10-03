const mongoose = require("mongoose");

// Creating Schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      minlength: [5, "Username must be atleast 5 characters"],
      maxlength: [20, "Username must be atmost 20 characters"],
      match: [
        /^[a-zA-Z0-9]+$/,
        "Username should only contain alphanumeric characters",
      ],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      // match: []
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be atleast 8 characters long"],
    },
    age: {
      type: Number,
      required: true,
      min: [18, "Age must be atleast 18"],
      max: [100, "Age must be less than 100"],
      validate: {
        validator: Number.isInteger,
        message: "Age must be an integer",
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Creating model
const User = mongoose.model("User", userSchema);

module.exports = User;
