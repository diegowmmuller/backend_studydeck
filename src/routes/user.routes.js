const express = require('express');
const router = express.Router();

const UserController = require('../controllers/user.controller');
const controller = new UserController();

router.post('/register', controller.register.bind(controller));
router.post('/login', controller.login.bind(controller));
router.put('/update/:id', controller.update.bind(controller));

module.exports = router;
