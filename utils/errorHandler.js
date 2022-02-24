const responseSender = require("./responseSender");

module.exports = function errorHandler(req, res, errObj, statusCode) {
  var statusCode = statusCode || 500;
  res.status(statusCode).send({
    error: true,
    errObj: errObj,
    code: statusCode,
  });
};
