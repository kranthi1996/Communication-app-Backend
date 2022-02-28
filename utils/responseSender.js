function responseSender(req, res, data, statusCode, message) {
  // update the response or send with appropriate header
  let status_code = statusCode || 200;
  res.status(statusCode).send({
    error: false,
    data: data,
    message: message,
    statusCode: status_code,
  });
}

module.exports = responseSender;
