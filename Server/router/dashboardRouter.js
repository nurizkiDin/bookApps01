const express = require("express");
const dashboardController = require('../controller/dashboardController');
const auth = require('../middleware/auth');
// const checkRole = require('../middleware/checkRole');
const router = express.Router();

router.get('/read', auth, dashboardController.viewDashboard);

module.exports = router;
