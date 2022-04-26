const express = require("express");
const router = express.Router();
const eventController = require("./event.controller");
const authService = require("../../auth/auth.service");
const multer = require("multer");
//const upload = multer({ dest: 'uploads/' });
let upload = multer({ dest: "uploads/" });
//const { validator } = require("./validator");

router.get(
  "/publicevents",
  authService.validateToken,
  eventController.getPublicEvents
);
router.get(
  "/privateevents",
  authService.validateToken,
  eventController.getPrivateEvents
);

router.post("/create", authService.validateToken, eventController.createEvent);
router.put("/update", authService.validateToken, eventController.updateEvent);
router.delete("/delete/:eventId", authService.validateToken, eventController.deleteEvent);
module.exports = router;
