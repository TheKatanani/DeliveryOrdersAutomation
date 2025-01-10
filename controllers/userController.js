const bcrypt = require('bcrypt');
const User = require('../models/User');
const httpText = require('../utils/httpText');
const appError = require('../utils/appError');
const asyncWrapper = require('../middleware/asyncWrapper');

const getAllUsers = asyncWrapper(async (req, res, next) => {
  const page = parseInt(req.query.page, 10) || 1; // Default to page 1
  const limit = parseInt(req.query.limit, 10) || 10; // Default to 10 users per page
  const skip = (page - 1) * limit;

  const users = await User.find({}, '-refreshToken -__v') // Exclude refreshToken
    .skip(skip)
    .limit(limit);

  const totalUsers = await User.countDocuments(); // Get total number of users
  const totalPages = Math.ceil(totalUsers / limit);

  if (!users.length) {
    const error = appError.create('No users found!', 404, httpText.FAIL);
    return next(error);
  }

  res.status(200).json({
    status: httpText.SUCCESS,
    data: users,
    pagination: {
      totalUsers,
      totalPages,
      currentPage: page,
      usersPerPage: limit,
    },
  });
});

const getUser = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findById(id);
  if (!user) {
    const error = appError.create(`User ID ${id} not found!`, 404, httpText.FAIL);
    return next(error);
  }
  res.status(200).json({
    status: httpText.SUCCESS,
    data: user,
  });
});

const createUser = asyncWrapper(async (req, res, next) => {
  const {
    name,
    email,
    phone,
    password,
    role
  } = req.body;
  if (!name || !email || !phone || !password || !role) {
    const error = appError.create('All fields are required!', 400, 'fail');
    return next(error);
  }
  const existingUser = await User.findOne({
    email
  });
  if (existingUser) {
    const error = appError.create(`User with eamil ${email} already exists.`, 409, httpText.FAIL);
    return next(error);
  }
  const foundRole = await Role.findById(role);
  if (!foundRole) {
    const error = appError.create(`Role ID ${role} not found!`, 404, httpText.FAIL);
    return next(error);
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    name,
    email,
    phone,
    password: hashedPassword,
    role,
  });
  res.status(201).json({
    status: httpText.SUCCESS,
    data: newUser,
  });
});

const updateUser = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const updates = req.body;
  const user = await User.findById(id, '-__v -refreshToken');
  if (!user) {
    const error = appError.create(`User ID ${id} not found!`, 404, httpText.FAIL);
    return next(error);
  }
  if (updates.password) {
    updates.password = await bcrypt.hash(updates.password, 10);
  }
  Object.assign(user, updates);
  await user.save();
  res.status(200).json({
    status: httpText.SUCCESS,
    data: user,
  });
});

// const updateUserInfo = asyncWrapper(async (req, res, next) => {
//   const id = req.id;
//   const {
//     user: updates,
//     password
//   } = req.body;
//   const role = req.roles;
//   const user = await User.findById(id);
//   if (!user) {
//     const error = appError.create(`User ID ${id} not found!`, 404, httpText.FAIL);
//     return next(error);
//   }
//   if (role !== 'ADMIN') {
//     delete updates.roles;
//   }
//   const passwordMatch = await bcrypt.compare(password, user.password);
//   if (!passwordMatch) {
//     const error = appError.create('Wrong password!', 400, httpText.FAIL);
//     return next(error);
//   }
//   if (updates.password && updates.password.length >= 6) {
//     updates.password = await bcrypt.hash(updates.password, 10);
//   } else if (updates.password) {
//     const error = appError.create('Password must be at least 6 characters long.', 400, httpText.FAIL);
//     return next(error);
//   }
//   Object.assign(user, updates);
//   await user.save();
//   res.status(200).json({
//     status: httpText.SUCCESS,
//     data: user,
//   });
// });

const deleteUser = asyncWrapper(async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findById(id);
  if (!user) {
    const error = appError.create(`User ID ${id} not found!`, 404, httpText.FAIL);
    return next(error);
  }
  await user.deleteOne();
  res.status(200).json({
    status: httpText.SUCCESS,
    message: `User ID ${id} has been deleted!`,
  });
});

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  // updateUserInfo,
  deleteUser,
};