const ProductSpecification = require('../../models/ProductSpecification');
const asyncWrapper = require('../../middleware/asyncWrapper');
const appError = require('../../utils/appError');
const httpText = require('../../utils/httpText');

// Get all product specifications
const getProductSpecifications = asyncWrapper(async (req, res, next) => {
  const specs = await ProductSpecification.find({}, '-__v -createdAt -updatedAt').populate('productId', 'name price');
  if (!specs.length) {
    return next(appError.create('No product specifications found!', 404, httpText.FAIL));
  }
  res.status(200).json({
    status: httpText.SUCCESS,
    data: specs,
  });
});

// Get a single product specification
const getProductSpecification = asyncWrapper(async (req, res, next) => {
  const spec = await ProductSpecification.findById(req.params.id, '-__v -createdAt -updatedAt').populate('productId', 'name price');
  if (!spec) {
    return next(appError.create('Product specification not found!', 404, httpText.FAIL));
  }
  res.status(200).json({
    status: httpText.SUCCESS,
    data: spec,
  });
});

// Create a new product specification
const createProductSpecification = asyncWrapper(async (req, res, next) => {
  const spec = await ProductSpecification.create(req.body);
  res.status(201).json({
    status: httpText.SUCCESS,
    data: spec,
  });
});

// Update a product specification
const updateProductSpecification = asyncWrapper(async (req, res, next) => {
  const spec = await ProductSpecification.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!spec) {
    return next(appError.create('Product specification not found!', 404, httpText.FAIL));
  }
  res.status(200).json({
    status: httpText.SUCCESS,
    data: spec,
  });
});

// Delete a product specification
const deleteProductSpecification = asyncWrapper(async (req, res, next) => {
  const spec = await ProductSpecification.findByIdAndDelete(req.params.id);
  if (!spec) {
    return next(appError.create('Product specification not found!', 404, httpText.FAIL));
  }
  res.status(204).json({
    status: httpText.SUCCESS,
    data: null,
  });
});

module.exports = {
  getProductSpecifications,
  getProductSpecification,
  createProductSpecification,
  updateProductSpecification,
  deleteProductSpecification,
};
