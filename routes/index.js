var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');
var authService = require("../auth/auth.service");

router.get('/verify_token', authService.isAuthenticated(), (req,res)=>{
  res.send({message:"Token verified successfully."})
});

router.post('/mobile_auth', userController.create);
router.post('/verify_code', userController.verifyCode);



module.exports = router;
