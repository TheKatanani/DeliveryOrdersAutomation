const jwt = require('jsonwebtoken')
const User = require('../models/User')
const asyncWrapper = require('../middleware/asyncWrapper')
require('dotenv').config()
const handleRefreshToken = asyncWrapper(async (req, res) => {
  const cookies = req.cookies
  if (!cookies?.jwt) {
    const error = appError.create(`unauthorized`, 401, httpText.FAIL);
    return next(error);
  } // unauthorized
  const refreshToken = cookies.jwt
  const foundUser = await User.find({
    refreshToken
  })
  if (!foundUser) {
    const error = appError.create(`forbidden`, 403, httpText.FAIL);
    return next(error);
  }
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
      if (err) return res.sendStatus(403)
      const role = JSON.parse(foundUser?.role)
      const accessToken = jwt.sign({
          userInfo: {
            name: foundUser.name, // || decoded.userInfo.name
            role,
            id: foundUser._id
          }
        },
        process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: '30m'
        }
      )
      res.status(200).json({
        status: httpText.SUCCESS,
        data: {
          accessToken,
          user: {
            id: foundUser._id,
            name: foundUser.name,
            email: foundUser.email,
            role: role,
          },
        }
      });
    }
  )
})

module.exports = {
  handleRefreshToken
}