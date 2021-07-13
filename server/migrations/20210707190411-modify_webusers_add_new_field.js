'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    queryInterface.addColumn(
      'webusers', // table name
      'salt', // new field name
      {
        type: Sequelize.STRING,
        allowNull: true,
      },
    );
  },

};
