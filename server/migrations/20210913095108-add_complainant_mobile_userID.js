'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'complaints',
      'mobile_user_id',
      {
        type: Sequelize.INTEGER
      }
    )
  }
};
