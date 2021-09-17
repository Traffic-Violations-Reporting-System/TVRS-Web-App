'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'accepts',
      'progress',
      Sequelize.STRING(1024)
    )
  },

};
