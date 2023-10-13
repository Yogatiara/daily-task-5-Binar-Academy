const jwt = require('jsonwebtoken');

const ApiError = require('../utils/apiError');

const checkToken = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;

    if (!bearerToken) {
      next(
        new ApiError('token nya gak ada', 401)
      );
    }
    const token = bearerToken.split('Bearer ')[1];

    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    delete payload.iat;

    res.status(200).json({
      data: {
        payload,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};
module.exports = {
  checkToken,
};
