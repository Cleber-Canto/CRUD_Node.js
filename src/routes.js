const express = require('express');
const router = express.Router();
const UserController = require('./controller/UserController')

router.post('/user-create', UserController.createUser)
router.put('/user-update/:id', UserController.updateUser)
router.get('/user-list', UserController.listUsers)
router.delete('/user-delete/:id', UserController.deleteUser)

module.exports = router;

