const express = require("express");
const router = express.Router();
const userController = require("./user.controller");
const authService = require("../../auth/auth.service");
const { validator } = require("./validator");

router.get("/verify/token", authService.validateToken, (req, res) => {
  res.send({ message: "Token verified successfully." });
});

// router.post("/mobile_auth", validator("mobile_auth"), userController.create);
// router.post("/verify/otp", validator("verify_otp"), userController.verifyOtp);
// router.put("/details", authService.validateToken, userController.details);

//
router.post("/register", validator("user_register"), userController.userRegister);
router.post("/confirmation/email", userController.verifyEmail);
router.post("/login", userController.login);
router.post("/forget_password", userController.forgetPassword);
router.get("/profileInfo", authService.validateToken, userController.profileInfo);
router.put("/profileInfo", authService.validateToken, userController.updateProfileInfo);
router.put("/change_password", authService.validateToken, userController.updatePassword);
router.post("/contact_feedback", authService.validateToken, userController.contactFeedback);
module.exports = router;
