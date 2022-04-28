const express = require('express');
const router = express.Router();
const imageController = require('../../controllers/imageController')

router.route('/').get(imageController.getImage)

router.route('/save').post(imageController.saveImage)

module.exports = router