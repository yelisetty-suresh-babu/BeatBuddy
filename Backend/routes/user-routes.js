const express = require("express");
const userRouter = express.Router();
const {
  signUp,
  getAllUsers,
  logIn,
} = require("../controllers/user-controller");
const { authenticate } = require("../Middleware/User-Middleware");

userRouter.post("/signup", signUp);
userRouter.get("/all", authenticate, getAllUsers);
userRouter.post("/login", logIn);

module.exports = userRouter;
