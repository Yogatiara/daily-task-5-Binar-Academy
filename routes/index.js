const router = require('express').Router();

const Product = require('./productRouter');
const Admin = require('./adminRouter');
const Auth = require('./authRouter');
const User = require('./userRouter');
const Shop = require('./shopRouter');
const checkToken = require('./checkToken');

router.use('/api/v1/products', Product);
router.use('/api/v1/auth', Auth);
router.use('/api/v1/user', User);
router.use('/api/v1/shop', Shop);
router.use('/api/v1/check-token', checkToken);
router.use('/', Admin);

module.exports = router;
