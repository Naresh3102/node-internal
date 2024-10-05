const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const userRouter = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorHandler");
const { errorResponse } = require("./middleware/errorController");
const authRouter = require("./routes/authRoutes");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(morgan("dev"));

// mongoose
//   .connect(process.env.MONGODB_URL)
//   .then(() => {
//     console.log("Connected to DB");
//   })
//   .catch((err) => {
//     console.log("Error", err.message);
//   });

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to DB");
  } catch (err) {
    console.log("Error:", err.message);
  }
};

connectToDB();

// app.get("/", (req, res) => {
//   res.status(200).json({
//     message: "Successfull",
//     data: [1, 2, 3, 4, 5, 6],
//   });
// });

app.use("/users", userRouter);
app.use("/auth", authRouter);

app.use(errorHandler);
app.use("*", errorResponse);

app.listen(process.env.PORT, () => {
  console.log("Server is running in 3000");
});
