const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const signUp = async (req, res, next) => {
  const { userName, name, url, email, password } = req.body;
  let existingUser;

  try {
    existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10); // Increase rounds for stronger hashing
    const user = new User({
      userName,
      name,
      email,
      password: hashedPassword,
      playlists: [],
    });

    await user.save(); // Wait for user to be saved

    console.log("user registered");
    const accesstoken = jwt.sign(
      {
        id: user._id,
      },
      process.env.ACCESS_TOKEN_SECRET
    );

    return res.status(200).json({ accesstoken });
  } catch (error) {
    console.log(error); // Log the error for debugging
    return res.status(500).json({ message: "Error signing up user" }); // Respond with an error message
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const user = await User.find({});

    if (user) {
      return res.status(200).json({ user });
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const logIn = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email });
  } catch (e) {
    console.log(err);
  }
  if (!existingUser) {
    return res.status(404).json({ message: "User is not found" });
  }

  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect Password!" });
  }

  const user = {
    id: existingUser._id,
  };
  const accesstoken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

  return res.status(200).json({ accesstoken });
};

module.exports = { signUp, getAllUsers, logIn }; // Export the signUp function
