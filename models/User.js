const mongoose = require('mongoose');
const validator = require('validator');
const ROLES_LIST = require('../config/roles_list');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, 'this is invalid email']
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  refreshToken: String,
  roles: {
    type: [String],
    enum: ROLES_LIST
  }, 
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);