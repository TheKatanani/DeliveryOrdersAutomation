const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  sku: {
    type: String,
    unique: true
  },
  description: {
    type: String
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand',
    required: true
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier',
    required: true
  },
  pricing: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pricing'
  },
  stock: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Stock'
  },
  specifications: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProductSpecification'
  }],
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);