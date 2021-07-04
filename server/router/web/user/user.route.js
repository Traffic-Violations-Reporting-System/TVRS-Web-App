const express = require("express");
const router = express.Router();

const {registerController} =require('../../../controllers/web/user/user.controller');


router.post('/register',registerController);


module.exports =router;