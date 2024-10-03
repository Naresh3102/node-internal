const express = require("express");
const { getAllUser, getUserById, getUserByEmail, createUser, updateUser, deleteUser } = require("../controllers/userController");

const userRouter = express.Router();

// Get
userRouter.get("/", getAllUser);
userRouter.post('/email', getUserByEmail)
userRouter.get('/:id', getUserById)

// Post - create
userRouter.post('/', createUser)

// update
userRouter.patch('/:id', updateUser)

// delete
userRouter.delete('/:id', deleteUser)

module.exports = userRouter;
