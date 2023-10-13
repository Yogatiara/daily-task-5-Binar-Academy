'use strict';
const userOwnerData = require('../dummyData/userOwner');

const userData = userOwnerData.map((obj) => {
  return obj;
});
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      'Users',
      userData
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete(
      'Users',
      null,
      {}
    );
  },
};
