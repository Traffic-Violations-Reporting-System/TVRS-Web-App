const express = require('express');
const userController = require('../../controllers/mobile/user.controller');

const router = express.Router();


router.post('/register', userController.register);
router.post('/login', userController.login);
// router.post('/verifyotp', userController.verifyOTP);
// router.post('/sendotp', userController.sendOTP);
// router.post('/resendotp', userController.resendOTP);
module.exports = router;