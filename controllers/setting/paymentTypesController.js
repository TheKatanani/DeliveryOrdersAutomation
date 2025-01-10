const asyncWrapper = require('../../middleware/asyncWrapper');
const PaymentType = require('../../models/Setting/PaymentType');
const httpText = require('../../utils/httpText');
const appError = require('../../utils/appError');

const getPaymentTypes = asyncWrapper(async (req, res, next) => {
  const paymentTypes = await PaymentType.find({}, '-__v -createdAt -updatedAt');
  if (!paymentTypes.length) {
    const error = appError.create('No Payment Types found!', 404, httpText.FAIL);
    return next(error);
  }
  res.status(200).json({
    status: httpText.SUCCESS,
    data: paymentTypes,
  });
});

const getPaymentType = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const paymentType = await PaymentType.findById(id, '-__v -createdAt -updatedAt');
  if (!paymentType) {
    const error = appError.create(`Payment Type ID ${id} not found!`, 404, httpText.FAIL);
    return next(error);
  }
  res.status(200).json({
    status: httpText.SUCCESS,
    data: paymentType,
  });
});

const createPaymentType = asyncWrapper(async (req, res, next) => {
  const name = req.body?.name;
  const isExist = await PaymentType.findOne({
    name
  });
  if (isExist) {
    const error = appError.create(`The PaymentTypes '${name}' already exists.`, 409, httpText.FAIL);
    return next(error);
  }
  const createdPaymentTypes = await PaymentType.create({
    name
  });
  res.status(201).json({
    status: httpText.SUCCESS,
    data: createdPaymentTypes,
  });
});

const updatePaymentType = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const updatedData = req.body;
  const PaymentTypes = await PaymentTypes.findById(id);
  if (!PaymentTypes) {
    const error = appError.create(`PaymentTypes ID ${id} not found!`, 404, httpText.FAIL);
    return next(error);
  }
  Object.assign(PaymentTypes, updatedData);
  await PaymentTypes.save();
  res.status(200).json({
    status: httpText.SUCCESS,
    data: PaymentTypes,
  });
});

const deletePaymentType = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const paymentType = await PaymentType.findById(id);
  if (!paymentType) {
    const error = appError.create(`PaymentTypes ID ${id} not found!`, 404, httpText.FAIL);
    return next(error);
  }
  await paymentType.deleteOne();
  res.status(200).json({
    status: httpText.SUCCESS,
    message: `The PaymentTypes with ID ${id} was deleted!`,
  });
});

module.exports = {
  getPaymentTypes,
  getPaymentType,
  createPaymentType,
  updatePaymentType,
  deletePaymentType,
};