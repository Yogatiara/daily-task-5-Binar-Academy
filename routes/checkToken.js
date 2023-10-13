const router = require('express').Router();

const CheckToken = require('../controller/checkTokenController');

// router.post('/', User.createUser);

router.route('/').get(CheckToken.checkToken);

module.exports = router;
