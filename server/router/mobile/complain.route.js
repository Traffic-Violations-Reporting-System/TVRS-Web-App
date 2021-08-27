const express = require('express');
const complainController = require('../../controllers/mobile/complain.controller');

const router = express.Router();
router.post('/complain', complainController.createComplain);
router.post('/viewMyComplaints', complainController.viewMyComplaints);
router.post('/viewSelectedComplaint', complainController.viewSelectedComplaint);
router.post('/complaintStatus', complainController.viewComplaintStatus);
module.exports = router;
