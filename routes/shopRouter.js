const router = require('express').Router();

const Shop = require('../controller/shopController');
const upload = require('../middlewares/uploader');
const checkRole = require('../middlewares/checkRole');
const autentikasi = require('../middlewares/authenticate');

router
  .route('/')
  .get(Shop.getShop)
  .post(
    autentikasi,
    checkRole('Owner'),
    Shop.createshop
  )
  .put(
    autentikasi,
    checkRole('Owner'),
    Shop.updateShop
  )
  .delete(
    autentikasi,
    checkRole('Owner'),
    Shop.deleteShop
  );

module.exports = router;
