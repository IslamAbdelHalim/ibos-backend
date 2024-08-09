const express = require('express');
const router = express.Router();
const User = require('../models/User');


/**
 * @des Register new user
 * @route /register
 * @method POST
 * @access public
 */
router.post('/register', async (req, res) => {
  try {
    // check if email is registered before
    const email = await User.findOne({email: req.body.email});
    if (email) return res.status(400).json({message: "This email is already registered"});
    //create a new user
    const newUser = new User(req.body);
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({message: 'Server Error......'});
  }
});

/**
 * @des Login user
 * @route /login
 * @method POST
 * @access public
 */
router.post('/login', async (req, res) => {
  try {
    // check if email is registered before
    const email = await User.findOne({email: req.body.email});
    if(!email) return res.status(404).json({message: "Invalid email"});
    // check if password is correct
    if(email.password === req.body.password)
      res.status(200).json({message: "Login successful "});
    else
      res.status(400).json({message: "password incorrect"});
  } catch (error) {
    console.log(error);
    res.status(500).json({message: 'Server Error......'});
  }
}); 


module.exports = router;