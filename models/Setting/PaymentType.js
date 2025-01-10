const mongoose = require('mongoose');

const PaymentTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('PaymentType', PaymentTypeSchema);