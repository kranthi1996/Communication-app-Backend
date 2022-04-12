const express = require("express");
const router = express.Router();
const taskController = require("./task.controller");
const authService = require("../../auth/auth.service");
//const { validator } = require("./validator");

router.post("/create", taskController.createTask);

module.exports = router;
