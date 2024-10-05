const express = require("express");
const {
  getAllUser,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const userRouter = express.Router();

// Get
userRouter.get("/", protect, getAllUser);
userRouter.get("/:id", getUserById);
userRouter.post("/email", getUserByEmail);

// Post - create
userRouter.post("/", protect, createUser);

// update
userRouter.patch("/:id", protect, updateUser);

// delete
userRouter.delete("/:id", protect, deleteUser);

module.exports = userRouter;
