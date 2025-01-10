const httpText = require("../utils/httpText");

exports.errorHandler = (err, req, res, next) => { 
  res.status(err.statusCode || 500).send({
    status: err.statusText || httpText.ERROR,
    message: err.message,
    code: err.statusCode || 500
  });
  next()
}