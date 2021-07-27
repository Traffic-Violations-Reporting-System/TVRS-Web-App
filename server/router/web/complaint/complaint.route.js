const express = require("express");
const router = express.Router();

const {createComplainController} =require('../../../controllers/web/complaint/complaine.controller');
const {rejectComplainController} =require('../../../controllers/web/complaint/complaine.reject.controller');
const {reviewComplainController} =require('../../../controllers/web/complaint/complaine.review.controller');
const {getComplainController} =require('../../../controllers/web/complaint/mobile.complain.get.details.controller');
const {findAllComplainController} =require('../../../controllers/web/complaint/mobile.complain.findAll.details.controller');
const {findNewAllComplainController} =require('../../../controllers/web/complaint/mobile.new.complain.findAll.details.controller');


router.post("/create", createComplainController);
router.post("/reject", rejectComplainController);
router.post("/review", reviewComplainController);
router.post("/get", getComplainController);
router.post("/all", findAllComplainController);
router.post("/newAll", findNewAllComplainController);

module.exports =router;