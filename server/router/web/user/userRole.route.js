const express = require("express");
const router = express.Router();

const {userRoleController,userRoleAddController} =require('../../../controllers/web/user/userRole.controller');


router.get('/roles',userRoleController);
router.post('/rolesadd',userRoleAddController);

module.exports =router;