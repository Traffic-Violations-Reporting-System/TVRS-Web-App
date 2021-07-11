const express = require('express');
const userController = require('../../controllers/mobile/user.controller');

const router = express.Router();


router.post('/register', userController.register);
router.post('/login', userController.login);
module.exports = router;