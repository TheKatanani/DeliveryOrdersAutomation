const asyncWrapper = require('../middleware/asyncWrapper');
const Category = require('../models/Category');
const httpText = require('../utils/httpText');
const appError = require('../utils/appError');

const getCategories = asyncWrapper(async (req, res, next) => {
  const category = await Category.find({},'-__v -createdAt -updatedAt');
  if (!category.length) {
    const error = appError.create('No Categorys found!', 404, httpText.FAIL);
    return next(error);
  }
  res.status(200).json({
    status: httpText.SUCCESS,
    data: category,
  });
});

const getCategory = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const category = await Category.findById(id,'-__v -createdAt -updatedAt');
  if (!category) {
    const error = appError.create(`Category ID ${id} not found!`, 404, httpText.FAIL);
    return next(error);
  }
  res.status(200).json({
    status: httpText.SUCCESS,
    data: category,
  });
});

const createCategory = asyncWrapper(async (req, res, next) => {
  const categoryName = req.body?.name;
  const isExist = await Category.findOne({ name: categoryName });
  if (isExist) {
    const error = appError.create(`The Category '${categoryName}' already exists.`, 409, httpText.FAIL);
    return next(error);
  }
  const createdCategory = await Category.create({ name: categoryName });
  res.status(201).json({
    status: httpText.SUCCESS,
    data: createdCategory,
  });
});

const updateCategory = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const updatedData = req.body;
  const category = await Category.findById(id);
  if (!category) {
    const error = appError.create(`Category ID ${id} not found!`, 404, httpText.FAIL);
    return next(error);
  }
  Object.assign(category, updatedData);
  await category.save();
  res.status(200).json({
    status: httpText.SUCCESS,
    data: category,
  });
});

const deleteCategory = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const category = await Category.findById(id);
  if (!category) {
    const error = appError.create(`Category ID ${id} not found!`, 404, httpText.FAIL);
    return next(error);
  }
  await category.deleteOne();
  res.status(200).json({
    status: httpText.SUCCESS,
    message: `The Category with ID ${id} was deleted!`,
  });
});

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
