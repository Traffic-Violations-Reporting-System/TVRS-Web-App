const express = require("express");
const router = express.Router();
const auth=require('../../middleware/web/auth');
const level1 = require("../../middleware/web/level1");
const {loginController,currentUserController} =require('../../controllers/web/auth.controller');

router.post("/login", loginController);
router.get("/me",[auth,level1], currentUserController);

module.exports =router;