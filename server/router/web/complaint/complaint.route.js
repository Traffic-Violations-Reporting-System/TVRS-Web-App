const express = require("express");
const router = express.Router();

const {createComplainController} =require('../../../controllers/web/complaint/complaine.controller');
const {rejectComplainController} =require('../../../controllers/web/complaint/complaine.reject.controller');
const {reviewComplainController} =require('../../../controllers/web/complaint/complaine.review.controller');

router.post("/create", createComplainController);
router.post("/reject", rejectComplainController);
router.post("/review", reviewComplainController);

module.exports =router;