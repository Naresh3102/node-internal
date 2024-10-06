const express = require("express");
const {
  getAllUser,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { protect, authorize } = require("../middleware/authMiddleware");

const userRouter = express.Router();

// Get
userRouter.get("/", protect, authorize("user", "admin"), getAllUser);
userRouter.get("/:id", getUserById);
userRouter.post("/email", getUserByEmail);

// Post - create
userRouter.post("/", protect, authorize("admin"), createUser);

// update
userRouter.patch("/:id", protect, authorize("admin"), updateUser);

// delete
userRouter.delete("/:id", protect, authorize("admin"), deleteUser);

module.exports = userRouter;
