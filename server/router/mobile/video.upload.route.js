const express = require('express');
const videoUploadController = require('../../controllers/mobile/video.upload.controller');
const router = express.Router();

router.get('/get-signed-url', videoUploadController.getUploadUrl);
module.exports = router;