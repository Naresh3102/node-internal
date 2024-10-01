const mongoose = require("mongoose");

// Creating Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

// Creating model
const User = mongoose.model("User", userSchema);

module.exports = User;
