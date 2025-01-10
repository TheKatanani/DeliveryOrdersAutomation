const asyncWrapper = require('../middleware/asyncWrapper');
const Payment = require('../models/Payment');
const httpText = require('../utils/httpText');
const appError = require('../utils/appError');

const getPayments = asyncWrapper(async (req, res, next) => {
  const payments = await Payment.find({}, '-__v -createdAt -updatedAt');
  if (!payments.length) {
    const error = appError.create('No payments found!', 404, httpText.FAIL);
    return next(error);
  }
  res.status(200).json({
    status: httpText.SUCCESS,
    data: payments,
  });
});

const getPayment = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const payment = await payment.findById(id, '-__v -createdAt -updatedAt');
  if (!payment) {
    const error = appError.create(`payment ID ${id} not found!`, 404, httpText.FAIL);
    return next(error);
  }
  res.status(200).json({
    status: httpText.SUCCESS,
    data: payment,
  });
});

const createPayment = asyncWrapper(async (req, res, next) => {
  const {
    orderId,
    paymentTypeId,
    amountPaid,
    remainingBalance
  } = req.body;
  const paymentData = {
    orderId,
    paymentTypeId,
    amountPaid,
    remainingBalance
  }
  const isExist = await Payment.findOne({
    orderId,
    paymentTypeId,
  });
  if (isExist) {
    const error = appError.create(`The payment '${paymentTypeId}' for order ${orderId} already exists.`, 409, httpText.FAIL);
    return next(error);
  }
  const createdPayment = await Payment.create(paymentData);
  res.status(201).json({
    status: httpText.SUCCESS,
    data: createdPayment,
  });
});

const updatePayment = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const updatedData = req.body;
  const payment = await Payment.findById(id);
  if (!payment) {
    const error = appError.create(`payment ID ${id} not found!`, 404, httpText.FAIL);
    return next(error);
  }
  if (payment.confirm) {
    const error = appError.create(`you cann't update confirmed payment`, 400, httpText.FAIL);
    return next(error);
  }
  Object.assign(payment, updatedData);
  await Payment.save();
  res.status(200).json({
    status: httpText.SUCCESS,
    data: payment,
  });
});

const deletePayment = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const payment = await payment.findById(id);
  if (!payment) {
    const error = appError.create(`payment ID ${id} not found!`, 404, httpText.FAIL);
    return next(error);
  }
  if (payment.confirm) {
    const error = appError.create(`you cann't delete confirmed payment`, 400, httpText.FAIL);
    return next(error);
  }
  await payment.deleteOne();
  res.status(200).json({
    status: httpText.SUCCESS,
    message: `The payment with ID ${id} was deleted!`,
  });
});
const confirmPayment = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const payment = await Payment.findById(id);
  if (!payment) {
    const error = appError.create(`Payment ID ${id} not found!`, 404, httpText.FAIL);
    return next(error);
  }
  payment.confirm = true;
  await payment.save();
  res.status(200).json({
    status: httpText.SUCCESS,
    data: payment,
  });
});

module.exports = {
  getPayments,
  getPayment,
  createPayment,
  updatePayment,
  deletePayment,
  confirmPayment
};