const mongoose = require('mongoose');


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



const User = mongoose.model('User', userSchema);

module.exports = User;