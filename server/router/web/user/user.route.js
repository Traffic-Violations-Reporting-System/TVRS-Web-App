const express = require("express");
const router = express.Router();

const {registerController} =require('../../../controllers/web/user/user.controller');
const {ViewController} =require('../../../controllers/web/user/userView.controller');

router.post('/register',registerController);
router.post('/view',ViewController);

module.exports =router;