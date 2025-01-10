const Stock = require('../../models/Stock');
const asyncWrapper = require('../../middleware/asyncWrapper');
const appError = require('../../utils/appError');
const httpText = require('../../utils/httpText');

// Get all stocks
const getStocks = asyncWrapper(async (req, res, next) => {
  const stocks = await Stock.find({}, '-__v -createdAt -updatedAt').populate('productId', 'name price');
  if (!stocks.length) {
    return next(appError.create('No stocks found!', 404, httpText.FAIL));
  }
  res.status(200).json({
    status: httpText.SUCCESS,
    data: stocks,
  });
});

// Get a single stock
const getStock = asyncWrapper(async (req, res, next) => {
  const stock = await Stock.findById(req.params.id, '-__v -createdAt -updatedAt').populate('productId', 'name price');
  if (!stock) {
    return next(appError.create('Stock not found!', 404, httpText.FAIL));
  }
  res.status(200).json({
    status: httpText.SUCCESS,
    data: stock,
  });
});

// Create a new stock
const createStock = asyncWrapper(async (req, res, next) => {
  const stock = await Stock.create(req.body);
  res.status(201).json({
    status: httpText.SUCCESS,
    data: stock,
  });
});

// Update a stock
const updateStock = asyncWrapper(async (req, res, next) => {
  const stock = await Stock.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!stock) {
    return next(appError.create('Stock not found!', 404, httpText.FAIL));
  }
  res.status(200).json({
    status: httpText.SUCCESS,
    data: stock,
  });
});

// Delete a stock
const deleteStock = asyncWrapper(async (req, res, next) => {
  const stock = await Stock.findByIdAndDelete(req.params.id);
  if (!stock) {
    return next(appError.create('Stock not found!', 404, httpText.FAIL));
  }
  res.status(204).json({
    status: httpText.SUCCESS,
    data: null,
  });
});

module.exports = {
  getStocks,
  getStock,
  createStock,
  updateStock,
  deleteStock,
};
