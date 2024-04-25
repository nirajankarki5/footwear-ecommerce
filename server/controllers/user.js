const bcrypt = require("bcrypt");
const User = require("../models/User");
const CustomAPIError = require("../errors/custom-error");

const createUser = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    throw new CustomAPIError("You must provide email and password", 400);
  }

  // Check if email already exists in database
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) {
    throw new CustomAPIError("Email already exists", 422);
  }

  const user = await User.create({
    email: req.body.email,
    password: req.body.password, // password is hashed in User.js using mongoose pre middleware function
    userType: req.body.userType,
  });

  res.status(201).json(user);
};

const getUser = async (req, res) => {
  console.log(req.user);
  const user = await User.findOne({ _id: req.user.id });
  if (!user) {
    throw new CustomAPIError("User not found", 404);
  }

  res.status(200).json(user);
};

const login = async (req, res) => {
  //   const { email, password } = req.body;

  if (!req.body.email || !req.body.password) {
    throw new CustomAPIError("You must provide email and password", 400);
  }

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    throw new CustomAPIError("User not found", 404);
  }

  const passwordIsValid = user.comparePassword(req.body.password);
  if (!passwordIsValid) {
    throw new CustomAPIError("Invalid password", 401);
  }

  // JWT is generated in User.js model
  const token = user.createJWT();

  return res.status(200).json({
    id: user.id,
    email: user.email,
    userType: user.userType,
    token: token,
  });
};

const logout = async (req, res) => {
  req.session = null;
  res.status(200).json({ msg: "You have been signed out" });
};

module.exports = { createUser, getUser, login, logout };
