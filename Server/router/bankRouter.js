const express = require("express");
const bankController = require('../controller/bankController');
const { uploadSingle } = require('../middleware/multer');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');

const router = express.Router();

router.post('/create', auth, checkRole("admin"), uploadSingle, bankController.addBank);
router.patch('/update/:id', auth, checkRole("admin"), uploadSingle, bankController.updateBank);
router.get('/read', auth, bankController.viewBank);
router.delete('/delete/:id', auth, checkRole("admin"), bankController.deleteBank);

module.exports = router;