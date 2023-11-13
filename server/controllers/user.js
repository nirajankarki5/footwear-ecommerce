const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const CustomAPIError = require("../errors/custom-error");

const createUser = async (req, res) => {
  // Check if email already exists in database
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) {
    return res.status(422).json({ msg: "Email already exists" });
  }

  const user = await User.create({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  res.status(200).json(user);
};

const getUser = async (req, res) => {
  console.log(req.user);
  const user = await User.findOne({ _id: req.user.id });
  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }

  res.status(200).json(user);
};

const login = async (req, res) => {
  //   const { email, password } = req.body;

  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ msg: "You must provide email and password" });
  }

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }

  const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
  if (!passwordIsValid) {
    return res.status(401).json({ msg: "Invalid password" });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );

  //   req.session.token = token;

  return res.status(200).json({
    id: user.id,
    email: user.email,
    token: token,
  });
};

const logout = async (req, res) => {
  req.session = null;
  res.status(200).json({ msg: "You have been signed out" });
};

module.exports = { createUser, getUser, login, logout };
