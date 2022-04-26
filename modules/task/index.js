const express = require("express");
const router = express.Router();
const taskController = require("./task.controller");
const authService = require("../../auth/auth.service");
//const { validator } = require("./validator");

router.post("/create",authService.validateToken, taskController.createTask);
router.get("/", authService.validateToken, taskController.getTasks);
router.put("/task_user_status", authService.validateToken, taskController.updateTaskUserStatus);

module.exports = router;
