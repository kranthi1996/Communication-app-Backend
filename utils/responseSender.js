function responseSender(req, res, data, statusCode, message) {
  // update the response or send with appropriate header
  var statusCode = statusCode || 200;
  res.status(statusCode).send({
    error: false,
    data: data,
    message: message,
    statusCode: statusCode,
  });
}

module.exports = responseSender;
