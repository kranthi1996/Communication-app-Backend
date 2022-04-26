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
async function profileInfo(req, res) {
  await userService.profileInfo(req, res);
}
async function updateProfileInfo(req, res) {
  await userService.updateProfileInfo(req, res);
}
async function forgetPassword(req, res) {
  await userService.forgetPassword(req, res);
}
async function updatePassword(req, res) {
  await userService.updatePassword(req, res);
}
async function contactFeedback(req, res) {
  await userService.contactFeedback(req, res);
}
module.exports = { create, verifyOtp, details, userRegister, verifyEmail, login, profileInfo,updateProfileInfo, forgetPassword, updatePassword, contactFeedback};
