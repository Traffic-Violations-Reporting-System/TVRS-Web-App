'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'webusers',
      'region',
      Sequelize.INTEGER
    )
  },

  
};
