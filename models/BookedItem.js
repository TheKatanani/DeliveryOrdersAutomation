const mongoose = require('mongoose');

const bookedItemSchema = new mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  soldPrice: {
    type: Number,
    required: true
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('SoldItem', bookedItemSchema);