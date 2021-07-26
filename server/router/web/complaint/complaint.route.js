const express = require("express");
const router = express.Router();

const {createComplainController} =require('../../../controllers/web/complaint/complaine.controller');

router.post("/create", createComplainController);

module.exports =router;