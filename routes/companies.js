const express = require('express');
const router = express.Router();
const { User, Company, validateCompany} = require('../models/User');
const dotenv = require('dotenv');
const { verifyToken } = require('../middlewares/verifyToken');
dotenv.config();

router.post('/', verifyToken, async (req, res) => {
  const { error } = validateCompany(req.body);
  if (error) return res.status(400).json({ status: "error", message: error.details[0].message });
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select('-password');
    if (!user) return res.status(404).json({ status: "error", message: 'User not found' });

    user.companies.push(req.body);
    await user.save();

    res.status(201).json({
      status: "success",
      message: "Company added successfully",
      companies: user.companies
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: 'Server error' });
  }
});


router.get('/', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select('-password');
    if (!user) return res.status(404).json({ status: "error", message: 'User not found' });

    res.status(201).json({
      status: "success",
      message: "Company added successfully",
      companies: user.companies
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: 'Server error' });
  }
});

module.exports = router;