const Sale = require('../../models/product/sale');
const asyncWrapper = require('../../middleware/asyncWrapper');
const appError = require('../../utils/appError');
const httpText = require('../../utils/httpText');

// Get all sales
const getSales = asyncWrapper(async (req, res, next) => {
  const sales = await Sale.find({}, '-__v -createdAt -updatedAt').populate('productId', 'name price'); // Populating productId details
  if (!sales.length) {
    return next(appError.create('No sales found!', 404, httpText.FAIL));
  }
  res.status(200).json({
    status: httpText.SUCCESS,
    data: sales,
  });
});

// Get a single sale
const getSale = asyncWrapper(async (req, res, next) => {
  const sale = await Sale.findById(req.params.id, '-__v -createdAt -updatedAt').populate('productId', 'name price');
  if (!sale) {
    return next(appError.create('Sale not found!', 404, httpText.FAIL));
  }
  res.status(200).json({
    status: httpText.SUCCESS,
    data: sale,
  });
});

// Create a new sale
const createSale = asyncWrapper(async (req, res, next) => {
  const sale = await Sale.create(req.body);
  res.status(201).json({
    status: httpText.SUCCESS,
    data: sale,
  });
});

// Update a sale
const updateSale = asyncWrapper(async (req, res, next) => {
  const sale = await Sale.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!sale) {
    return next(appError.create('Sale not found!', 404, httpText.FAIL));
  }
  res.status(200).json({
    status: httpText.SUCCESS,
    data: sale,
  });
});

// Delete a sale
const deleteSale = asyncWrapper(async (req, res, next) => {
  const sale = await Sale.findByIdAndDelete(req.params.id);
  if (!sale) {
    return next(appError.create('Sale not found!', 404, httpText.FAIL));
  }
  res.status(204).json({
    status: httpText.SUCCESS,
    data: null,
  });
});

module.exports = {
  getSales,
  getSale,
  createSale,
  updateSale,
  deleteSale,
};
