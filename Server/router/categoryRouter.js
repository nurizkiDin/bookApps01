const express = require("express");
const categoryController = require('../controller/categoryController');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');

const router = express.Router();

router.post('/create', auth, checkRole("admin"), categoryController.addCategory);
router.get('/read', auth, categoryController.viewCategory);
router.patch('/update/:id', auth, checkRole("admin"), categoryController.updateCategory);
router.delete('/delete/:id', auth, checkRole("admin"), categoryController.deleteCategory);

module.exports = router;