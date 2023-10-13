const ApiError = require('../utils/apiError');
const { Shop, Product } = require('../models');

const createshop = async (req, res, next) => {
  try {
    const { name } = req.body;

    const newDataShop = await Shop.create({
      name,
    });

    await res.status(200).json({
      status: 'Success',
      data: {
        newDataShop,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const getShop = async (req, res, next) => {
  try {
    const { name } = req.query;
    if (name) {
      const shopData = await Shop.findOne({
        where: {
          name: name,
        },
        returning: true,
      });
      res.status(200).json({
        status: 'Success',
        data: {
          shopData,
        },
      });
    } else {
      const shopdata = await Shop.findAll({
        include: Product,
      });
      res.status(200).json({
        status: 'Success',
        data: {
          shopdata,
        },
      });
    }
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const deleteShop = async (req, res, next) => {
  const { name } = req.query;

  try {
    const product = await Shop.findOne({
      where: {
        name: name,
      },
    });

    if (!product) {
      return next(
        new ApiError(
          `Shop with this ${name} does not exist`,
          400
        )
      );
    }

    const shopData = await Shop.destroy({
      where: {
        name: name,
      },
    });

    res.status(200).json({
      status: 'Success',
      data: {
        shopData,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const updateShop = async (req, res, next) => {
  try {
    const { name, age, address, role } = req.body;
    const ShopData = await Shop.update(
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
        ShopData,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

module.exports = {
  createshop,
  getShop,
  deleteShop,
  updateShop,
};
