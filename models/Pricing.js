const mongoose = require('mongoose');

const pricingSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  costWithoutVAT: {
    type: Number,
    required: true
  },
  priceWithVAT: {
    type: Number,
    required: true
  },
  proftRotio: {
    type: Number
  },
  factoryCost: {
    type: Number
  },
  startCost: {
    type: Number
  },
  showRomeCost: {
    type: Number
  },
  startCost: {
    type: Number
  },
  totalCost: {
    type: Number
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Pricing', pricingSchema);