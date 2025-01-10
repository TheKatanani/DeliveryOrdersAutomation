const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  totalStock: {
    type: Number,
    required: true
  },
  minStock: {
    type: Number
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Stock', stockSchema);