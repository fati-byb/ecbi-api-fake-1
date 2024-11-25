const express = require('express');
const router = express.Router();
const userController = require('../controllers/user/user.controller');


router.post('/signup', userController.createUser);
router.put('/:id', userController.updateUser);
router.get('/:id/activate', userController.activateUser);
router.get('/users', userController.getUsers);


module.exports = router;

