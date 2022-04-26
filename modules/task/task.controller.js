"use strict"
const taskService = require("./task.service");
async function createTask(req, res) {
    // const errors = await validationResult(req);
    // if (!errors.isEmpty()) {
    //   return errorHandler(req, res, errors.errors[0], 422);
    // }
    await taskService.createTask(req, res);
}
async function getTasks(req, res) {
    // const errors = await validationResult(req);
    // if (!errors.isEmpty()) {
    //   return errorHandler(req, res, errors.errors[0], 422);
    // }
    await taskService.getTasks(req, res);
}
async function updateTaskUserStatus(req, res) {
    // const errors = await validationResult(req);
    // if (!errors.isEmpty()) {
    //   return errorHandler(req, res, errors.errors[0], 422);
    // }
    await taskService.updateTaskUserStatus(req, res);
}
module.exports = {createTask, getTasks, updateTaskUserStatus}