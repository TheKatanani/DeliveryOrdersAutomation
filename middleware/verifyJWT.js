const jwt = require('jsonwebtoken');
const appError = require('../utils/appError');
const httpText = require('../utils/httpText');
require('dotenv').config()
const verifyJWT = (req, res, next) => {
  const authHeader = req?.headers?.authorization || req?.headers?.Authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    const error = appError.create(`unauthorized`, 401, httpText.FAIL);
    return next(error);
  }
  const token = authHeader.split(' ')[1] // bearer token
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decoded) => { //decoded information from jwt 
      if (err) return res.status(403).json({
        message: err
      }) //invalid token  
      req.userInfo = decoded.userInfo, 
      next();
    }
  )
}
module.exports = verifyJWT
// add this controller for the route you want to protect