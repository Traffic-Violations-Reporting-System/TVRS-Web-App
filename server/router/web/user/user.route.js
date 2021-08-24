const express = require("express");
const router = express.Router();

const {registerController} =require('../../../controllers/web/user/user.controller');
const {ViewController} =require('../../../controllers/web/user/userView.controller');
const {EditController} =require('../../../controllers/web/user/userEdit.controller');
const {getSelectedUserController} =require('../../../controllers/web/user/getUser.controller');

router.post('/register',registerController);
router.post('/view',ViewController);
router.put('/update/:id',EditController);
router.get('/select/:id',getSelectedUserController);

module.exports = router;