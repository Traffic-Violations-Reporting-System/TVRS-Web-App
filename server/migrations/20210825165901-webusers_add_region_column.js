'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
          queryInterface.addColumn('webusers', 'region', {
              type: Sequelize.INTEGER
          }, { transaction: t })
      ])
    })
  },

};
