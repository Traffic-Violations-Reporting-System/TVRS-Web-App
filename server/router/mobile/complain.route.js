const express = require('express');
const complainController = require('../../controllers/mobile/complain.controller');

const router = express.Router();
router.post('/complain', complainController.createComplain);

module.exports = router;
