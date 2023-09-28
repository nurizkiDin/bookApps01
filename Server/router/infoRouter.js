const express = require("express");
const infoController = require('../controller/infoController');
const { uploadSingle } = require('../middleware/multer');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');

const router = express.Router();

router.post('/create', auth, checkRole("admin"), uploadSingle, infoController.addInfo);
router.patch('/update/:id', auth, checkRole("admin"), uploadSingle, infoController.updateInfo);
router.get('/read', infoController.viewInfo);
router.delete('/delete/:id', auth, checkRole("admin"), infoController.deleteInfo);

module.exports = router;