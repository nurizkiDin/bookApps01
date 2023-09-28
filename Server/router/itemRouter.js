const express = require("express");
const { uploadMultiple, uploadSingle } = require('../middleware/multer');
const itemController = require("../controller/itemController");
const imageController = require("../controller/imageController");
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');

const router = express.Router();

router.post('/create', auth, checkRole("admin"), uploadMultiple, itemController.addItem);
router.patch('/update/:id', auth, checkRole("admin"), itemController.updateItem);
router.get('/read', auth, itemController.viewItem);
router.delete('/delete/:id', auth, checkRole("admin"), itemController.deleteItem);

// add image item._id
router.post('/add-image/:id', auth, checkRole("admin"), uploadSingle, imageController.addImageItem);
// delete image
router.delete('/delete-image/:itemId/:imageId', auth, checkRole("admin"), imageController.deleteImageItem);

module.exports = router;