const OrderType = require('../../models/Setting/OrderType');
const asyncWrapper = require('../../middleware/asyncWrapper');
const httpText = require('../../utils/httpText');
const appError = require('../../utils/appError');

const getOrderTypes = asyncWrapper(async (req, res, next) => {
  const orderTypes = await OrderType.find({}, '-__v -createdAt -updatedAt');
  if (!orderTypes.length) {
    const error = appError.create('No order types found!', 404, httpText.FAIL);
    return next(error);
  }
  res.status(200).json({
    status: httpText.SUCCESS,
    data: orderTypes,
  });
});

const getOrderType = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const orderType = await OrderType.findById(id, '-__v -createdAt -updatedAt');
  if (!orderType) {
    const error = appError.create(`Order type with ID ${id} not found!`, 404, httpText.FAIL);
    return next(error);
  }
  res.status(200).json({
    status: httpText.SUCCESS,
    data: orderType,
  });
});

const createOrderType = asyncWrapper(async (req, res, next) => {
  const name = req.body?.name;
  if (!name) {
    const error = appError.create('Order type name is required.', 400, httpText.FAIL);
    return next(error);
  }
  const isExist = await OrderType.findOne({
    name
  });
  if (isExist) {
    const error = appError.create(`The order type '${name}' already exists.`, 409, httpText.FAIL);
    return next(error);
  }
  const createdOrderType = await OrderType.create({
    name
  });
  res.status(201).json({
    status: httpText.SUCCESS,
    data: createdOrderType,
  });
});

const updateOrderType = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const updatedData = req.body;
  const orderType = await OrderType.findById(id);
  if (!orderType) {
    const error = appError.create(`Order type with ID ${id} not found!`, 404, httpText.FAIL);
    return next(error);
  }
  Object.assign(orderType, updatedData);
  await orderType.save();
  res.status(200).json({
    status: httpText.SUCCESS,
    data: orderType,
  });
});

const deleteOrderType = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const orderType = await OrderType.findById(id);
  if (!orderType) {
    const error = appError.create(`Order type with ID ${id} not found!`, 404, httpText.FAIL);
    return next(error);
  }
  await orderType.deleteOne();
  res.status(200).json({
    status: httpText.SUCCESS,
    message: `The order type with ID ${id} was deleted!`,
  });
});

module.exports = {
  getOrderTypes,
  getOrderType,
  createOrderType,
  updateOrderType,
  deleteOrderType,
};