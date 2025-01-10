const appError = require("../utils/appError");
const httpText = require("../utils/httpText");

const verifyRoles = (...allowdRoles) => {
  return (req, res, next) => {
    const roles = [].concat(req?.userInfo?.roles)
    if (!roles) {
      const error = appError.create(`unauthorized`, 401, httpText.FAIL);
      return next(error);
    }
    const result = roles?.some((role) => allowdRoles.includes(+role));


    if (!result) {
      const error = appError.create(`unauthorized`, 401, httpText.FAIL);
      return next(error);
    }
    next()
  }
}
module.exports = verifyRoles