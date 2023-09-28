const express = require("express");
const customerController = require('../controller/customerController');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');

const router = express.Router();

router.post('/create', auth, checkRole("admin"), customerController.addCustomer);
router.get('/read', auth, customerController.viewCustomer);
router.patch('/update/:id', auth, checkRole("admin"), customerController.updateCustomer);
router.delete('/delete/:id', auth, checkRole("admin"), customerController.deleteCustomer);

module.exports = router;