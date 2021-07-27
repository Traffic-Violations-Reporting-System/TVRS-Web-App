const express = require("express");
const router = express.Router();

const {createComplainController} =require('../../../controllers/web/complaint/complaine.controller');
const {rejectComplainController} =require('../../../controllers/web/complaint/complaine.reject.controller');
router.post("/create", createComplainController);
router.post("/reject", rejectComplainController);

module.exports =router;