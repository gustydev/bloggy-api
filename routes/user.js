const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController');

router.get('/', controller.userGet)

router.post('/register', controller.userRegisterPost)

router.post('/login', controller.userLoginPost)

module.exports = router;