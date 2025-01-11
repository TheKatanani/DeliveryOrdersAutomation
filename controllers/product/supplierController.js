const Supplier = require('../../models/product/supplier');
const asyncWrapper = require('../../middleware/asyncWrapper');
const appError = require('../../utils/appError');
const httpText = require('../../utils/httpText');

// Get all suppliers
const getSuppliers = asyncWrapper(async (req, res, next) => {
  const suppliers = await Supplier.find({}, '-__v -createdAt -updatedAt');
  if (!suppliers.length) {
    return next(appError.create('No suppliers found!', 404, httpText.FAIL));
  }
  res.status(200).json({
    status: httpText.SUCCESS,
    data: suppliers,
  });
});

// Get a single supplier
const getSupplier = asyncWrapper(async (req, res, next) => {
  const supplier = await Supplier.findById(req.params.id, '-__v -createdAt -updatedAt');
  if (!supplier) {
    return next(appError.create('Supplier not found!', 404, httpText.FAIL));
  }
  res.status(200).json({
    status: httpText.SUCCESS,
    data: supplier,
  });
});

// Create a new supplier
const createSupplier = asyncWrapper(async (req, res, next) => {
  const supplier = await Supplier.create(req.body);
  res.status(201).json({
    status: httpText.SUCCESS,
    data: supplier,
  });
});

// Update a supplier
const updateSupplier = asyncWrapper(async (req, res, next) => {
  const supplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!supplier) {
    return next(appError.create('Supplier not found!', 404, httpText.FAIL));
  }
  res.status(200).json({
    status: httpText.SUCCESS,
    data: supplier,
  });
});

// Delete a supplier
const deleteSupplier = asyncWrapper(async (req, res, next) => {
  const supplier = await Supplier.findByIdAndDelete(req.params.id);
  if (!supplier) {
    return next(appError.create('Supplier not found!', 404, httpText.FAIL));
  }
  res.status(204).json({
    status: httpText.SUCCESS,
    data: null,
  });
});

module.exports = {
  getSuppliers,
  getSupplier,
  createSupplier,
  updateSupplier,
  deleteSupplier,
};
