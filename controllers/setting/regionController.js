const asyncWrapper = require('../../middleware/asyncWrapper');
const Region = require('../../models/Setting/Region');
const httpText = require('../../utils/httpText');
const appError = require('../../utils/appError');

// Get all Regions
const getRegions = asyncWrapper(async (req, res, next) => {
  const Regions = await Region.find({}, '-__v -createdAt -updatedAt');
  if (!Regions.length) {
    return next(appError.create('No Regions found!', 404, httpText.FAIL));
  }
  res.status(200).json({
    status: httpText.SUCCESS,
    data: Regions,
  });
});

// Get a single Region by ID
const getRegion = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const Region = await Region.findById(id, '-__v -createdAt -updatedAt');
  if (!Region) {
    return next(appError.create(`Region ID ${id} not found!`, 404, httpText.FAIL));
  }
  res.status(200).json({
    status: httpText.SUCCESS,
    data: Region,
  });
});

// Create a new Region
const createRegion = asyncWrapper(async (req, res, next) => {
  const { name } = req.body;
  const isExist = await Region.findOne({ name });
  if (isExist) {
    return next(appError.create(`The Region '${name}' already exists.`, 409, httpText.FAIL));
  }
  const createdRegion = await Region.create({ name });
  res.status(201).json({
    status: httpText.SUCCESS,
    data: createdRegion,
  });
});

// Update an existing Region
const updateRegion = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const { name } = req.body;
  const Region = await Region.findById(id);
  if (!Region) {
    return next(appError.create(`Region ID ${id} not found!`, 404, httpText.FAIL));
  }
  if (name) Region.name = name; // Only update provided fields
  await Region.save();
  res.status(200).json({
    status: httpText.SUCCESS,
    data: Region,
  });
});

// Delete an Region
const deleteRegion = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const Region = await Region.findById(id);
  if (!Region) {
    return next(appError.create(`Region ID ${id} not found!`, 404, httpText.FAIL));
  }
  await Region.deleteOne();
  res.status(200).json({
    status: httpText.SUCCESS,
    message: `The Region with ID ${id} was deleted!`,
  });
});

module.exports = {
  getRegions,
  getRegion,
  createRegion,
  updateRegion,
  deleteRegion,
};
