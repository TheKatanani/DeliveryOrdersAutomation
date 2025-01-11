const Product = require('../../models/product/index.js');
const asyncWrapper = require('../../middleware/asyncWrapper');
const appError = require('../../utils/appError');
const httpText = require('../../utils/httpText');

// Get all products
const getProducts = asyncWrapper(async (req, res, next) => {
  const products = await Product.find({}, '-__v -createdAt -updatedAt')
    .populate('category_id', 'name')
    .populate('supplier_id', 'name');
  if (!products.length) {
    return next(appError.create('No products found!', 404, httpText.FAIL));
  }
  res.status(200).json({
    status: httpText.SUCCESS,
    data: products,
  });
});

// Get a single product
const getProduct = asyncWrapper(async (req, res, next) => {
  const product = await Product.findById(req.params.id, '-__v -createdAt -updatedAt')
    .populate('category_id', 'name')
    .populate('supplier_id', 'name');
  if (!product) {
    return next(appError.create('Product not found!', 404, httpText.FAIL));
  }
  res.status(200).json({
    status: httpText.SUCCESS,
    data: product,
  });
});

// Create a new product
const createProduct = asyncWrapper(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    status: httpText.SUCCESS,
    data: product,
  });
});

// Update a product
const updateProduct = asyncWrapper(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    return next(appError.create('Product not found!', 404, httpText.FAIL));
  }
  res.status(200).json({
    status: httpText.SUCCESS,
    data: product,
  });
});

// Delete a product
const deleteProduct = asyncWrapper(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    return next(appError.create('Product not found!', 404, httpText.FAIL));
  }
  res.status(204).json({
    status: httpText.SUCCESS,
    data: null,
  });
});

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
