const express = require("express");
const router = express.Router();
const userController = require("./user.controller");
const authService = require("../auth/auth.service");
const { validator } = require("./validator");

router.get("/verify/token", authService.validateToken, (req, res) => {
  res.send({ message: "Token verified successfully." });
});

router.post("/mobile_auth", validator("mobile_auth"), userController.create);
router.post("/verify/otp", validator("verify_otp"), userController.verifyOtp);
router.put("/details", authService.validateToken, userController.details);

module.exports = router;
