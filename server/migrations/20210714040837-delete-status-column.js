'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('mobile_users', 'status');
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('mobile_users', 'status');
  }
};
