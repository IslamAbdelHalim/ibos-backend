// routes/settings.js
const express = require('express');
const bcrypt = require('bcryptjs');
const { User, validateUpdate } = require('../models/User');
const router = express.Router();
const { verifyToken } = require('../middlewares/verifyToken');

/**
 * @des setting user
 * @route /
 * @method GET
 * @access private
 */
router.get('/', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(userId);
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/**
 * @des update user
 * @route /update-info
 * @method POST
 * @access private
 */
router.put('/update-info', verifyToken, async (req, res) => {
  const { error } = validateUpdate(req.body);
  if (error) return res.status(400).json({message: error.details[0].message});

  if(req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }

  try {
    await User.findByIdAndUpdate(req.user.id, req.body);
    res.status(200).json({message: "Update Successfully"});
  } catch(error) {
    console.log(error);
    res.status(500).json({message: "Server Error"});
  }

})

/**
 * @des update user
 * @route /
 * @method DELETE
 * @access private
 */
router.put('/update-info', verifyToken, async (req, res) => {
  const userId = req.user.id;
  const user = await User.findById(userId).select('-password');
  if(user) {
    await User.findByIdAndDelete(userId);
    res.status(200).json({message: "User Has been Deleted successfully"});
  } else {
    res.status(404).json({message: "User not Found"});
  }
})

module.exports = router;