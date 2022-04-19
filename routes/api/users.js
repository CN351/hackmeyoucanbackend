const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');

router.route('/')
    .get(userController.getUserData)

router.route('/data')
    .get(userController.getAllUserData)



module.exports = router;