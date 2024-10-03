const User = require("../models/User");

exports.getAllUser = async (req, res, next) => {
  try {
    const users = await User.fin();
    res.status(200).json({
      message: "Success",
      users,
    });
  } catch (err) {
    next(err);
  }
};

exports.getUserById = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    res.status(200).json({
      message: "Success",
      user,
    });
  } catch (err) {
    next(err)
  }
};

exports.getUserByEmail = async (req, res, next) => {
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
    next(err)
  }
};

exports.createUser = async (req, res, next) => {
  try {
    // const existinguser = await User.findOne({ email: req.body.email });

    // if (existinguser) {
    //   return res.status(400).json({
    //     message: "Email already exist",
    //   });
    // }

    const newUser = await User.create(req.body);
    // const newUser = new User(req.body)
    // await newUser.save()
    res.status(201).json({
      message: "Created",
      newUser,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        password,
      },
      { new: true, runValidators: true }
    );
    res.status(200).json({
      message: "updated",
      user: updatedUser,
    });
  } catch (err) {
    next(err)
  }
};

exports.deleteUser = async (req, res, next) => {
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
    next(err)
  }
};
