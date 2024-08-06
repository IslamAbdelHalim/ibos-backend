const express = require('express');
const { User } = require('../models/User');
const router = express.Router();

const getUserData =  async (req, res) => {
  try {
    const user = await User.findOne({ email: "h@gmail.com" });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = getUserData;
