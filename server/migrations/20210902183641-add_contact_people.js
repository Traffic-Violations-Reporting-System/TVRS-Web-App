'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'people',
      'contactNo',
      Sequelize.STRING(12)
    )
  },

};
