const mongoose = require('mongoose');
const Joi = require('joi');

// user schema
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 10,
    trim: true,
    unique: true
  },  email: {
    type: String,
    unique: true,
    trim: true,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  fullName: {
    type: String,
    minlength: 8,
    trim: true,
    default: null
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    default: null 
  },
  birthday: {
    type: Date,
    default: null
  },
  country: {
    type: String,
    trim: true,
    default: null,
  },
  profileImage: {
    type: String,
    default: 'avatar.png'
  },
  salary: {
    type: Number,
    default: 0
  },
  saving: {
    type: Number,
    default: 0
  },
  expenses: {
    type: Number,
    default: 0
  },
  investments: {
    type: Number,
    default: 0
  },
  debtsToPay: {
    type: Number,
    default: 0
  },
  debtsOwed: {
    type: Number,
    default: 0
  }
}, {timestamps: true});

// validate Register
const validateRegister = (user) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(10).trim().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
  });

  return schema.validate(user);
};

//validate personal info
const personalInfoValidate = (person) => {
  const schema = Joi.object({
    _id: Joi.string(),
    fullName: Joi.string().min(8).trim().required(),
    gender: Joi.string().valid('male', 'female', 'other').required(),
    country: Joi.string().required(),
    day: Joi.number().integer().min(1).max(31).required(),
    month: Joi.number().integer().min(1).max(12).required(),
    year: Joi.number().integer().min(1900).max(new Date().getFullYear()).required(),
  });

  return schema.validate(person);
}

const validateFinancialInfo = (info) => {
  const schema = Joi.object({
    _id: Joi.string(),
    salary: Joi.number().min(0).required(),
    saving: Joi.number().min(0).required(),
    expenses: Joi.number().min(0).required(),
    investments: Joi.number().min(0).required(),
    debtsToPay: Joi.number().min(0).required(),
    debtsOwed: Joi.number().min(0).required(),
  });

  return schema.validate(info);
}

const validateLoginUser = (user) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
  });

  return schema.validate(user);
}

const User = mongoose.model('User', userSchema);

module.exports = {
  User,
  validateRegister,
  personalInfoValidate,
  validateFinancialInfo,
  validateLoginUser
};