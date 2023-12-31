const ApiError = require('../utils/apiError');
const { User, Shop } = require('../models');

const createUser = async (req, res, next) => {
  try {
    const { name, age, address, role, shopId } =
      req.body;
    const newDataUser = await User.create({
      shopId: shopId,
      name: name,
      age: age,
      address: address,
      role: role,
    });

    res.status(200).json({
      status: 'Success',
      data: {
        newDataUser,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const getUser = async (req, res, next) => {
  try {
    const { name, shopId } = req.query;
    if (name) {
      const userData = await User.findOne({
        where: {
          name: name,
        },

        returning: true,
      });
      res.status(200).json({
        status: 'Success',
        data: {
          userData,
        },
      });
    } else if (shopId) {
      const userData = await User.findOne({
        where: {
          shopId: shopId,
        },
        returning: true,
      });
      res.status(200).json({
        status: 'Success',
        data: {
          userData,
        },
      });
    } else {
      const userData = await User.findAll({
        include: Shop,
      });
      res.status(200).json({
        status: 'Success',
        data: {
          userData,
        },
      });
    }
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const deleteUser = async (req, res, next) => {
  const { name } = req.query;

  try {
    const user = await User.findOne({
      where: {
        name: name,
      },
    });

    if (!user) {
      return next(
        new ApiError(
          `Data user with this ${name} does not exist`,
          400
        )
      );
    }
    const userData = await User.destroy({
      where: {
        name: name,
      },
    });

    res.status(200).json({
      status: 'Success',
      data: {
        userData,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { name, age, address, role, shopId } =
      req.body;
    const userData = await User.update(
      {
        name: name,
        age: age,
        address: address,
        role: role,
        shopId: shopId,
      },
      {
        where: {
          name: req.query.name,
        },

        returning: true,
      }
    );
    res.status(200).json({
      status: 'Success',
      data: {
        userData,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

module.exports = {
  createUser,
  getUser,
  deleteUser,
  updateUser,
};
