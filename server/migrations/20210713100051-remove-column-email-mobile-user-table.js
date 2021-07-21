'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('mobile_users', 'email');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('mobile_users');
  }
};
