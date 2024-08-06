const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 10,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 10,
    trim: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female'],
  },
  birthday: {
    type: Date,
    required: true
  },
  country: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 10,
    trim: true,
  },
  profileImage: {
    type: String,
    default: 'avatar.png'
  },
  email: {
    type: String,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
}, {timestamps: true});

const validateUser = (user) => {
  const schema = Joi.object({
    firstName: Joi.string().min(3).max(10).trim().required(),
    lastName: Joi.string().min(3).max(10).trim().required(),
    gender: Joi.string().valid('male', 'female').required(),
    birthday: Joi.date().required(),
    country: Joi.string().min(2).max(10).trim().required(),
    profileImage: Joi.string().default('avatar.png'),
    email: Joi.string().email().required(),
    password: Joi.string().required()
  });

  return schema.validate(user);
};

const User = mongoose.model('User', userSchema);

module.exports = {
  User,
  validateUser
};
