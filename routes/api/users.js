const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');

router.route('/')
    .get(userController.getUserData)
    // .post(userController.createNewEmployee)
    // .put(userController.updateEmployee)
    // .delete(userController.deleteEmployee);

// router.route('/:id')
//     .get(employeesController.getEmployee);

module.exports = router;