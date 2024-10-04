const Auth = require("../models/auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const existinguser = await Auth.findOne({ email });

    if (existinguser) {
      return res.status(400).json({
        message: "Email already exist",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await Auth.create({ email, password: hashedPassword });

    res.status(201).json({
      message: "Registered",
      user,
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await Auth.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email }, // payload/data
      process.env.JWT_SECRET, // secret key
      { expiresIn: process.env.JWT_EXPIRE } // options
    );

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    res.status(200).json({
      message: "Success",
      token,
      decodedData,
    });
  } catch (err) {
    next(err);
  }
};
