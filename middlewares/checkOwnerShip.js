const ApiError = require('../utils/apiError');

const checkOwnerShip = (role) => {
  return async (req, res, next) => {
    try {
      if (req.user.role !== role) {
        next(
          new ApiError(
            `You are not the owner`,
            401
          )
        );
      } else {
        return res.status(200).json;
      }

      next();
    } catch (err) {
      next(new ApiError(err.message, 500));
    }
  };
};

module.exports = checkOwnerShip;
