const ApiError = require('../utils/apiError');
const { User } = require('../models');

const createUser = async (req, res) => {
  try {
    const { nama, umur, alamat, peran } =
      req.body;
    const newDataCar = await User.create({
      name: nama,
      umur: umur,
      alamat: alamat,
      peran: peran,
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

module.exports = {
  createUser,
};
