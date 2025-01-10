const Pricing = require('../../models/Pricing');
const asyncWrapper = require('../../middleware/asyncWrapper');
const appError = require('../../utils/appError');
const httpText = require('../../utils/httpText');

// Get all pricing records
const getPricings = asyncWrapper(async (req, res, next) => {
  const pricings = await Pricing.find({}, '-__v -createdAt -updatedAt').populate('productId', 'name price');
  if (!pricings.length) {
    return next(appError.create('No pricing records found!', 404, httpText.FAIL));
  }
  res.status(200).json({
    status: httpText.SUCCESS,
    data: pricings,
  });
});

// Get a single pricing record
const getPricing = asyncWrapper(async (req, res, next) => {
  const pricing = await Pricing.findById(req.params.id, '-__v -createdAt -updatedAt').populate('productId', 'name price');
  if (!pricing) {
    return next(appError.create('Pricing record not found!', 404, httpText.FAIL));
  }
  res.status(200).json({
    status: httpText.SUCCESS,
    data: pricing,
  });
});

// Create a new pricing record
const createPricing = asyncWrapper(async (req, res, next) => {
  const pricing = await Pricing.create(req.body);
  res.status(201).json({
    status: httpText.SUCCESS,
    data: pricing,
  });
});

// Update a pricing record
const updatePricing = asyncWrapper(async (req, res, next) => {
  const pricing = await Pricing.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!pricing) {
    return next(appError.create('Pricing record not found!', 404, httpText.FAIL));
  }
  res.status(200).json({
    status: httpText.SUCCESS,
    data: pricing,
  });
});

// Delete a pricing record
const deletePricing = asyncWrapper(async (req, res, next) => {
  const pricing = await Pricing.findByIdAndDelete(req.params.id);
  if (!pricing) {
    return next(appError.create('Pricing record not found!', 404, httpText.FAIL));
  }
  res.status(204).json({
    status: httpText.SUCCESS,
    data: null,
  });
});

module.exports = {
  getPricings,
  getPricing,
  createPricing,
  updatePricing,
  deletePricing,
};
