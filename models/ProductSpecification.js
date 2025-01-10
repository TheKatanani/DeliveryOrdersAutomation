const mongoose = require('mongoose');

const productSpecificationSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  key: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('ProductSpecification', productSpecificationSchema);