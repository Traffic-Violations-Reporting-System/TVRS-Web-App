const express = require("express");
const router = express.Router();

const { forgotController} = require('../../controllers/web/forgot.controller');
const {setController} = require('../../controllers/web/set.controller');

router.post("/forgot", forgotController);
router.post("/set", setController);

module.exports = router;