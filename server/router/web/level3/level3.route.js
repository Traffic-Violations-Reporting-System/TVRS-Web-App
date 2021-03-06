const express = require('express')
const router = express.Router();

const { getnewComplaintsController } = require('../../../controllers/web/level3/getnew.complaints.controller');
const { getallComplaintsController } = require('../../../controllers/web/level3/getall.complaints.controller');
const { getComplaintController } = require('../../../controllers/web/level3/get.complaint.controller');
const { updateComplaintController } = require('../../../controllers/web/level3/update.complaint.controller');

router.get('/getnew/:region', getnewComplaintsController);
router.get('/getall/:region', getallComplaintsController);
router.get('/get/:id', getComplaintController);
router.put('/update', updateComplaintController);

module.exports = router;