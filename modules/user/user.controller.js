"use strict";
const userService = require("./user.service");
const { validationResult } = require("express-validator");
const errorHandler = require("../../utils/errorHandler");

async function create(req, res) {
  //Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = await validationResult(req);
  if (!errors.isEmpty()) {
    return errorHandler(req, res, errors.errors[0], 422);
  }
  await userService.create(req, res);
}
async function verifyOtp(req, res) {
  const errors = await validationResult(req);
  if (!errors.isEmpty()) {
    return errorHandler(req, res, errors.errors[0], 422);
  }
  await userService.verifyOtp(req, res);
}
async function details(req, res) {
  const errors = await validationResult(req);
  if (!errors.isEmpty()) {
    return errorHandler(req, res, errors.errors[0], 422);
  }
  await userService.details(req, res);
}
async function userRegister(req, res) {
  const errors = await validationResult(req);
  if (!errors.isEmpty()) {
    return errorHandler(req, res, errors.errors[0], 422);
  }
  await userService.userRegister(req, res);
}

async function verifyEmail(req, res) {
  // const errors = await validationResult(req);
  // if (!errors.isEmpty()) {
  //   return errorHandler(req, res, errors.errors[0], 422);
  // }
  await userService.verifyEmail(req, res);
}

async function login(req, res) {
  // const errors = await validationResult(req);
  // if (!errors.isEmpty()) {
  //   return errorHandler(req, res, errors.errors[0], 422);
  // }
  await userService.login(req, res);
}
module.exports = { create, verifyOtp, details, userRegister, verifyEmail, login };
