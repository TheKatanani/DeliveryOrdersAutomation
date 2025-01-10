const asyncWrapper = require('../../middleware/asyncWrapper');
const OrderStatus = require('../../models/Setting/OrderStatus');
const httpText = require('../../utils/httpText');
const appError = require('../../utils/appError');

// Get all OrderStatuses
const getOrderStatuses = asyncWrapper(async (req, res, next) => {
  const orderStatuses = await OrderStatus.find({}, '-__v -createdAt -updatedAt');
  if (!orderStatuses.length) {
    return next(appError.create('No OrderStatuses found!', 404, httpText.FAIL));
  }
  res.status(200).json({
    status: httpText.SUCCESS,
    data: orderStatuses,
  });
});

// Get a single OrderStatus by ID
const getOrderStatus = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const orderStatus = await OrderStatus.findById(id, '-__v -createdAt -updatedAt');
  if (!orderStatus) {
    return next(appError.create(`OrderStatus ID ${id} not found!`, 404, httpText.FAIL));
  }
  res.status(200).json({
    status: httpText.SUCCESS,
    data: orderStatus,
  });
});

// Create a new OrderStatus
const createOrderStatus = asyncWrapper(async (req, res, next) => {
  const { name } = req.body;
  const isExist = await OrderStatus.findOne({ name });
  if (isExist) {
    return next(appError.create(`The OrderStatus '${name}' already exists.`, 409, httpText.FAIL));
  }
  const createdOrderStatus = await OrderStatus.create({ name });
  res.status(201).json({
    status: httpText.SUCCESS,
    data: createdOrderStatus,
  });
});

// Update an existing OrderStatus
const updateOrderStatus = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const { name } = req.body;
  const orderStatus = await OrderStatus.findById(id);
  if (!orderStatus) {
    return next(appError.create(`OrderStatus ID ${id} not found!`, 404, httpText.FAIL));
  }
  if (name) orderStatus.name = name; // Only update provided fields
  await orderStatus.save();
  res.status(200).json({
    status: httpText.SUCCESS,
    data: orderStatus,
  });
});

// Delete an OrderStatus
const deleteOrderStatus = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const orderStatus = await OrderStatus.findById(id);
  if (!orderStatus) {
    return next(appError.create(`OrderStatus ID ${id} not found!`, 404, httpText.FAIL));
  }
  await orderStatus.deleteOne();
  res.status(200).json({
    status: httpText.SUCCESS,
    message: `The OrderStatus with ID ${id} was deleted!`,
  });
});

module.exports = {
  getOrderStatuses,
  getOrderStatus,
  createOrderStatus,
  updateOrderStatus,
  deleteOrderStatus,
};
