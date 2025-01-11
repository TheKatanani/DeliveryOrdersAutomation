const SoldItem = require("../models/SoldItem");
const asyncWrapper = require("../middleware/asyncWrapper");
const appError = require("../utils/appError");
const httpText = require("../utils/httpText");

// Get all sold items
const getSoldItems = asyncWrapper(async (req, res, next) => {
  const soldItems = await SoldItem.find()
    .populate("orderId", "customerId totalAmount")
    .populate("productId", "name price")
    .populate("statusId", "status")
    .select("-__v");
  if (!soldItems.length) {
    const error = appError.create('No sold Items found!', 404, httpText.FAIL);
    return next(error);
  }
  res.status(200).json({
    success: httpText.SUCCESS,
    data: soldItems
  });
});

// Get a sold item by ID
const getSoldItemById = asyncWrapper(async (req, res, next) => {
  const soldItem = await SoldItem.findById(req.params.id)
    .populate("orderId", "customerId totalAmount")
    .populate("productId", "name price")
    .populate("statusId", "status")
    .select("-__v");

  if (!soldItem) {
    return next(appError.create(`Sold item with ID ${req.params.id} not found.`, 404, httpText.FAIL));
  }

  res.status(200).json({
    success: httpText.SUCCESS,
    data: soldItem
  });
});

// Create a new sold item
const createSoldItem = asyncWrapper(async (req, res, next) => {
  const {
    orderId,
    productId,
    quantity,
    price,
    totalPrice,
    statusId,
    requireDeliveryDate,
    sellerNote
  } = req.body;

  const soldItem = new SoldItem({
    orderId,
    productId,
    quantity,
    price,
    totalPrice,
    statusId,
    requireDeliveryDate,
    sellerNote,
  });

  const savedSoldItem = await soldItem.save();
  res.status(201).json({
    success: httpText.SUCCESS,
    data: savedSoldItem
  });
});

// Update a sold item
const updateSoldItem = asyncWrapper(async (req, res, next) => {
  const {
    id
  } = req.params;
  const updates = req.body;

  const soldItem = await SoldItem.findById(id);
  if (!soldItem) {
    return next(appError.create(`Sold item with ID ${id} not found.`, 404, httpText.FAIL));
  }

  Object.assign(soldItem, updates);
  const updatedSoldItem = await soldItem.save();

  res.status(200).json({
    success: httpText.SUCCESS,
    data: updatedSoldItem
  });
});

// Delete a sold item
const deleteSoldItem = asyncWrapper(async (req, res, next) => {
  const {
    id
  } = req.params;

  const soldItem = await SoldItem.findById(id);
  if (!soldItem) {
    return next(appError.create(`Sold item with ID ${id} not found.`, 404, httpText.FAIL));
  }

  await soldItem.deleteOne();
  res.status(200).json({
    success: httpText.SUCCESS,
    message: "Sold item deleted successfully."
  });
});

module.exports = {
  getSoldItems,
  getSoldItemById,
  createSoldItem,
  updateSoldItem,
  deleteSoldItem,
};