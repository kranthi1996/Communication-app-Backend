function errorHandler(req, res, errObj, statusCode) {
  let status_code = statusCode || 500;
  res.status(statusCode).send({
    error: true,
    errObj: errObj,
    code: status_code,
  });
}
module.exports = errorHandler;
