const express = require("express");
const router = express.Router();

const {userRoleController} =require('../../../controllers/web/user/userRole.controller');


router.get('/roles',userRoleController);


module.exports =router;