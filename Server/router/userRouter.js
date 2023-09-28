const express = require("express");
const userController = require('../controller/userController');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');

const router = express.Router();

router.post('/create', auth, checkRole("admin"), userController.addUser);
router.patch('/update/:id', auth, checkRole("admin"), userController.updateUser);
router.get('/read', auth, userController.viewUser);
router.delete('/delete/:id', auth, checkRole("admin"), userController.deleteUser);

router.post('/login', userController.login);
router.post('/logout', auth, userController.logout);
router.post('/logout2', auth, userController.logoutAll);
router.get('/info', auth, userController.viewMe);

module.exports = router;