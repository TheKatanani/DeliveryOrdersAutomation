const Order = require("../models/Order");
const OrderDelivery = require("../models/orderDelivery");
const asyncWrapper = require("../middleware/asyncWrapper");
const appError = require("../utils/appError");
const httpText = require("../utils/httpText");

// Get all orders
const getOrders = asyncWrapper(async (req, res, next) => {
  const orders = await Order.find()
    .populate("customerId", "name email")
    .populate("soldItems")
    .populate("orderStatusId", "status")
    .populate("paymentId")
    .populate("regionId", "name")
    .populate("deliveryCoordinatorId", "name email")
    .populate({
      path: 'orderDeliveryId',
      populate: {
        path: 'deliveryStatus', // Populate delivery status details within orderDelivery 
      },
    })
    .select("-__v");
  if (!orders.length) {
    const error = appError.create('No orders found!', 404, httpText.FAIL);
    return next(error);
  }
  res.status(200).json({
    success: httpText.SUCCESS,
    data: orders
  });
});

// Get order by ID
const getOrderById = asyncWrapper(async (req, res, next) => {
  const order = await Order.findById(req.params.id)
    .populate("customerId", "name email")
    .populate("soldItems")
    .populate("orderStatusId", "status")
    .populate("paymentId")
    .populate("regionId", "name")
    .populate("deliveryCoordinatorId", "name email")
    .populate({
      path: 'orderDeliveryId',
      populate: {
        path: 'deliveryStatus', // Populate delivery status details within orderDelivery
      },
    });;

  if (!order) {
    return next(appError.create(`Order with ID ${req.params.id} not found.`, 404, httpText.FAIL));
  }

  res.status(200).json({
    success: httpText.SUCCESS,
    data: order
  });
});

// Create a new order
const createOrder = asyncWrapper(async (req, res, next) => {
  const {
    customerId,
    soldItems,
    orderStatusId,
    paymentId,
    regionId,
    deliveryCoordinatorId,
    totalAmount,
    orderDeliveryData
  } = req.body;
 
  // Create the Order document
  const order = await Order.create({
    customerId,
    soldItems,
    orderStatusId,
    paymentId,
    regionId,
    deliveryCoordinatorId,
    totalAmount,
    orderDelivery: orderDeliveryData,
  });

  res.status(201).json({
    success: httpText.SUCCESS,
    data: order
  });
});

// Update an order
const updateOrder = asyncWrapper(async (req, res, next) => {
  const {
    id
  } = req.params;
  const updates = req.body;

  const order = await Order.findById(id);
  if (!order) {
    return next(appError.create(`Order with ID ${id} not found.`, 404, httpText.FAIL));
  }

  Object.assign(order, updates);
  const updatedOrder = await order.save();

  res.status(200).json({
    success: httpText.SUCCESS,
    data: updatedOrder
  });
});

// Delete an order
const deleteOrder = asyncWrapper(async (req, res, next) => {
  const {
    id
  } = req.params;

  const order = await Order.findById(id);
  if (!order) {
    return next(appError.create(`Order with ID ${id} not found.`, 404, httpText.FAIL));
  }

  // Delete associated OrderDelivery document
  await OrderDelivery.findByIdAndDelete(order.orderDeliveryId);

  await order.deleteOne();
  res.status(200).json({
    success: httpText.SUCCESS,
    message: "Order deleted successfully."
  });
});

module.exports = {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};