const router = require('express').Router();

const User = require('../controller/userController');

// router.post('/', User.createUser);

router
  .route('/')
  .post(User.createUser)
  .get(User.getUser)
  .delete(User.deleteUser)
  .put(User.updateUser);

module.exports = router;
