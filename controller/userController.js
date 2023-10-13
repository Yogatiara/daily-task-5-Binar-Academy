const ApiError = require('../utils/apiError');
const { User } = require('../models');

const createUser = async (req, res, next) => {
  try {
    const { name, age, address, role } = req.body;
    const newDataCar = await User.create({
      name: name,
      age: age,
      address: address,
      role: role,
    });

    res.status(200).json({
      status: 'Success',
      data: {
        newDataCar,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const getUser = async (req, res, next) => {
  try {
    const { name } = req.query;
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
    } else {
      const userData = await User.findAll();
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
  try {
    const { name } = req.query;
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
    const { name, age, address, role } = req.body;
    const userData = await User.update(
      {
        name: name,
        age: age,
        address: address,
        role: role,
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
