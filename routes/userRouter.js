const router = require('express').Router();

const User = require('../controller/userController');

router.post('/', User.createUser);

module.exports = router;
