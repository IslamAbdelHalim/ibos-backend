// routes/register.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {User, validateRegister, personalInfoValidate, validateFinancialInfo, validateLoginUser} = require('../models/User');

/**
 * @des Register new user
 * @route /register
 * @method POST
 * @access public
 */
router.post('/register', async (req, res) => {
  const { error } = validateRegister(req.body);
  if(error) return res.status(400).json({message: error.details[0].message});

  try {
    // check if email is registered before
    const email = await User.findOne({email: req.body.email});
    if (email) return res.status(400).json({message: "This email is already registered"});

    // make hashed password
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    //create a new user
    const newUser = new User(req.body);
    await newUser.save();
    const userId = newUser._id;
    //Generate Token
    const token = jwt.sign({id: newUser._id, email: newUser.email}, process.env.SECRET_KEY, {expiresIn: "1d"});
    res.status(201).json({ 
      token,
      userId,
      message: "User registered successfully, please proceed to /register/personal-info" });
    // res.redirect('/personal-info');
  } catch (error) {
    console.log(error);
    res.status(500).json({message: 'Server Error......'});
  }
});

/**
 * @des Take info from user
 * @route /register/personal-info
 * @method POST
 * @access public
 */
router.post('/register/personal-info', async (req, res) => {
  const { error } = personalInfoValidate(req.body);
  if(error) return res.status(400).json({message: error.details[0].message});

  try {
    console.log(req.body)
    const userId = req.body.userId;
    console.log(userId)
    const birthdayString = `${req.body.year}-${req.body.month}-${req.body.day}`;
    await User.findByIdAndUpdate(userId, {
      fullName: req.body.fullName,
      gender: req.body.gender,
      country: req.body.country,
      birthday: new Date(birthdayString)
    });
    res.redirect('/financial-info');

  } catch (error) {
    console.log(error);
    res.status(500).json({message: 'Server Error......'});
  }
});


/**
 * @des take Financial information
 * @route /financial-info
 * @method POST
 * @access public
 */
router.post('/register/personal-info/financial-info', async (req, res) => {
  const { error } = validateFinancialInfo(req.body);
  if(error) return res.status(400).json({message: error.details[0].message});

  try {
    const userId = req.body._id;
    await User.findByIdAndUpdate(userId, {
      salary: req.body.salary,
      saving: req.body.saving,
      expenses:req.body.expenses,
      investments:req.body.investments,
      debtsToPay:req.body.debtsToPay,
      debtsOwed:req.body.debtsOwed,
    });

    res.status(200).json({message: "User update"});
  } catch(error) {
    console.log(error);
    res.status(500).json({message: "Server Error..."});
  }
})

/**
 * @des Login user
 * @route /login
 * @method POST
 * @access public
 */
router.post('/login', async (req, res) => {
  const { error } = validateLoginUser(req.body);
  if(error) return res.status(400).json({message: error.details[0].message});

  try {
    // check if email is registered before
    const user = await User.findOne({username: req.body.username});
    console.log(user);
    if(!user) return res.status(404).json({message: "Invalid email or password"});
    // check if password is correct
    const isPassCorrect = await bcrypt.compare(req.body.password, user.password);
    if(!isPassCorrect)
      res.status(400).json({message: "Invalid email or password"});

    const token = jwt.sign({id: user._id, email: user.email}, process.env.SECRET_KEY, {expiresIn: "1d"});
    const {password, ...other} = user._doc;
    res.status(200).json({
      message: "Logging successfully",
      user: {...other},
      token
    });
  
  } catch (error) {
    console.log(error);
    res.status(500).json({message: 'Server Error......'});
  }
}); 


module.exports = router;