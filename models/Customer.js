const mongoose = require('mongoose');
const validator = require('validator');

const Customer = new mongoose.Schema({ 
  name: {
    type: String,
    required: true
  },
  mobileOne: {
    type: Number,
    required: true,
    unique:true
  },
  mobileTwo: {
    type: Number, 
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, 'this is invalid email']
  },
  sellerNote: {
    type: [String], 
  }, 
}, {
  timestamps: true
});

module.exports = mongoose.model('Customer', Customer);