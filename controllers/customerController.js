const asyncWrapper = require('../middleware/asyncWrapper');
const Customer = require('../models/Customer');
const httpText = require('../utils/httpText');
const appError = require('../utils/appError');
const validateAndFormatMobile = require('../utils/validateAndFormatMobile');

const getCustomers = asyncWrapper(async (req, res, next) => {
  const customers = await Customer.find({}, '-__v -createdAt -updatedAt');
  if (!customers.length) {
    return next(appError.create('No Customers found!', 404, httpText.FAIL));
  }
  res.status(200).json({
    status: httpText.SUCCESS,
    data: customers,
  });
});

const getCustomer = asyncWrapper(async (req, res, next) => {
  const {
    id
  } = req.params;
  const customer = await Customer.findById(id, '-__v -createdAt -updatedAt');
  if (!customer) {
    return next(appError.create(`Customer ID ${id} not found!`, 404, httpText.FAIL));
  }
  res.status(200).json({
    status: httpText.SUCCESS,
    data: customer,
  });
});

const createCustomer = asyncWrapper(async (req, res, next) => {
  let { mobileOne, mobileTwo, name, email, date, sellerNote } = req.body;

  try {
    // Validate and reformat mobile numbers
    mobileOne = validateAndFormatMobile(mobileOne, "mobileOne");
    if (mobileTwo) {
      mobileTwo = validateAndFormatMobile(mobileTwo, "mobileTwo");
    }
  } catch (err) {
    return next(err); // Pass validation errors to the error handler
  }

  // Check if the primary mobile number already exists
  const existingCustomer = await Customer.findOne({ mobileOne });
  if (existingCustomer) {
    return next(
      appError.create(`The Customer with mobile number '${mobileOne}' already exists.`, 409, httpText.FAIL)
    );
  }

  // Create the new customer
  const newCustomer = await Customer.create({ name, mobileOne, mobileTwo, email, date, sellerNote });
  res.status(201).json({
    status: httpText.SUCCESS,
    data: newCustomer,
  });
});


const updateCustomer = asyncWrapper(async (req, res, next) => {
  const {
    id
  } = req.params;
  const updatedData = req.body;

  const customer = await Customer.findById(id);
  if (!customer) {
    return next(appError.create(`Customer ID ${id} not found!`, 404, httpText.FAIL));
  }

  Object.assign(customer, updatedData);
  await customer.save();

  res.status(200).json({
    status: httpText.SUCCESS,
    data: customer,
  });
});

const deleteCustomer = asyncWrapper(async (req, res, next) => {
  const {
    id
  } = req.params;

  const customer = await Customer.findById(id);
  if (!customer) {
    return next(appError.create(`Customer ID ${id} not found!`, 404, httpText.FAIL));
  }

  await customer.deleteOne();
  res.status(200).json({
    status: httpText.SUCCESS,
    message: `The Customer with ID ${id} was deleted!`,
  });
});

module.exports = {
  getCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};