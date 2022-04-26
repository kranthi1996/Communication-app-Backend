"use strict";
const eventService = require("./event.service");


async function createEvent(req, res) {
  // const errors = await validationResult(req);
  // if (!errors.isEmpty()) {
  //   return errorHandler(req, res, errors.errors[0], 422);
  // }
  await eventService.createEvent(req, res);
}
async function getPublicEvents(req, res) {
  // const errors = await validationResult(req);
  // if (!errors.isEmpty()) {
  //   return errorHandler(req, res, errors.errors[0], 422);
  // }
  await eventService.getPublicEvents(req, res);
}
async function getPrivateEvents(req, res) {
  await eventService.getPrivateEvents(req, res);
}
async function updateEvent(req, res) {
    await eventService.updateEvent(req, res);
  }
async function deleteEvent(req, res) {
    await eventService.deleteEvent(req, res);
}
module.exports = { createEvent, getPublicEvents, getPrivateEvents, updateEvent, deleteEvent};
