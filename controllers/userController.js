'use strict'
const userService = require('../services/userService');

async function create(req, res) {
  await userService.create(req, res);
}
async function verifyOTP(req, res, next) {
    await userService.verifyOTP(req, res,next);
}
module.exports = { create, verifyOTP };
