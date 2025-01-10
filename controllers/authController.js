const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); 
const appError = require('../utils/appError');
const httpText = require('../utils/httpText');
const asyncWrapper = require('../middleware/asyncWrapper');
require('dotenv').config();

// Login Handler
const loginHandler = asyncWrapper(async (req, res, next) => {
  const {
    email,
    password
  } = req.body;

  if (!email || !password) {
    const error = appError.create('Email and password are required!', 400, httpText.FAIL);
    return next(error);
  }
  const foundUser = await User.findOne({
    email
  }).populate('roles');
  if (!foundUser) {
    const error = appError.create('User does not exist!', 401, httpText.FAIL);
    return next(error);
  }

  const match = await bcrypt.compare(password, foundUser.password);
  if (!match) {
    const error = appError.create('Incorrect password!', 400, httpText.FAIL);
    return next(error);
  }

  const accessToken = jwt.sign({
      userInfo: {
        name: foundUser.name,
        roles: foundUser.roles,
        id: foundUser._id,
      },
    },
    process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '30m'
    }
  );

  const refreshToken = jwt.sign({
      name: foundUser.name
    },
    process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: '10d'
    }
  );

  foundUser.refreshToken = refreshToken;
  await foundUser.save();

  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    status: httpText.SUCCESS,
    data: {
      accessToken,
      user: {
        id: foundUser._id,
        name: foundUser.name,
        email: foundUser.email,
        roles: foundUser.roles, 
      },
    }
  });
}); 
module.exports = {
  loginHandler, 
};