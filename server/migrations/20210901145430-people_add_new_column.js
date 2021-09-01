'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn(
      'people',
      'nic',
      Sequelize.STRING
    ),
    queryInterface.addColumn(
      'people',
      'specialNotes',
      Sequelize.STRING
    ),
    queryInterface.addColumn(
      'vehicles',
      'ownerNic',
      Sequelize.STRING
    )
  },
};
