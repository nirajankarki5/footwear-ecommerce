const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const CustomAPIError = require("../errors/custom-error");

const createUser = async (req, res) => {
  const user = await User.create({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  res.status(200).json(user);
};

const login = async (req, res) => {
  //   const { email, password } = req.body;

  if (!req.body.email || !req.body.password) {
    throw new CustomAPIError("Must provide email or password", 400);
  }

  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    throw new CustomAPIError("User not found", 404);
  }

  const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
  if (!passwordIsValid) {
    throw new CustomAPIError("Invalid password", 401);
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

module.exports = { createUser, login, logout };
