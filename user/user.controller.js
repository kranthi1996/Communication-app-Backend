"use strict";
const userService = require("./user.service");
const { validationResult } = require("express-validator");
const errorHandler = require("../utils/errorHandler");

async function create(req, res) {
  //Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = await validationResult(req);
  if (!errors.isEmpty()) {
    return errorHandler(req, res, errors.errors[0], 422);
  }
  await userService.create(req, res);
}
async function verifyOTP(req, res, next) {
  const errors = await validationResult(req);
  if (!errors.isEmpty()) {
    return errorHandler(req, res, errors.errors[0], 422);
  }
  await userService.verifyOTP(req, res, next);
}
module.exports = { create, verifyOTP };
