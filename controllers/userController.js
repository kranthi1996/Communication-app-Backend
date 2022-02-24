'use strict'
const userService = require('../services/userService');

async function create(req, res) {
  await userService.create(req, res);
}
async function verifyCode(req, res, next) {
    await userService.verifyCode(req, res,next);
}
module.exports = { create, verifyCode };
