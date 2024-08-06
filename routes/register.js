const express = require('express');
const { User, validateUser } = require('../models/User');
const router = express.Router();

const register = async (req, res) => {
  const { error } = validateUser(req.body);
  console.log('Request Body:', req.body);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send('User already exists. Please sign in');

  try {
    user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      gender: req.body.gender,
      birthday: req.body.birthday,
      country: req.body.country,
      email: req.body.email,
      password: req.body.password
    });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = register;