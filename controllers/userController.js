const User = require("../models/User");

exports.getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      message: "Success",
      users,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    res.status(200).json({
      message: "Success",
      user,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.getUserByEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "Success",
      user,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    const existinguser = await User.findOne({ email: req.body.email });

    if (existinguser) {
      return res.status(400).json({
        message: "Email already exist",
      });
    }

    const newUser = await User.create(req.body);
    // const newUser = new User(req.body)
    // await newUser.save()
    res.status(201).json({
      message: "Created",
      newUser,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        password,
      },
      { new: true }
    );
    res.status(200).json({
      message: "updated",
      user: updatedUser,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "Deleted",
      deletedUser,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};
