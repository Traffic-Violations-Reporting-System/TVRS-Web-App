const express = require("express");
const router = express.Router();

const {createComplainController} =require('../../../controllers/web/complaint/complaine.controller');
const {rejectComplainController} =require('../../../controllers/web/complaint/complaine.reject.controller');
const {reviewComplainController} =require('../../../controllers/web/complaint/complaine.review.controller');
const {getComplainController} =require('../../../controllers/web/complaint/mobile.complain.get.details.controller');
const {findAllComplainController} =require('../../../controllers/web/complaint/mobile.complain.findAll.details.controller');
const {findNewAllComplainController} =require('../../../controllers/web/complaint/mobile.new.complain.findAll.details.controller');
const {getComplainActionDetailsController} =require('../../../controllers/web/complaint/complaine.get.action.details.controller');
const {findAllIncompleteComplainController} =require('../../../controllers/web/complaint/get.incomplete.complaineList.controller');


const auth =require('../../../middleware/web/auth');
const level1 =require('../../../middleware/web/level1');
router.post("/create", createComplainController);
router.post("/reject", rejectComplainController);
router.post("/review", reviewComplainController);
router.put("/get/:id", getComplainController);
router.post("/all", findAllComplainController);
router.post("/newAll", findNewAllComplainController);
router.get("/action/:id",[auth,level1], getComplainActionDetailsController);
router.post("/incompleteComplain", findAllIncompleteComplainController);

module.exports =router;