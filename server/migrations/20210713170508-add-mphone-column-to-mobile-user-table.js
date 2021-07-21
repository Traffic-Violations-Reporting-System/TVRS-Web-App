'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      // logic for transforming into the new state
      return queryInterface.addColumn(
          'mobile-users',
          'mphone',
          Sequelize.string
      );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
        'mobile-users',
        'mphone'
    );
  }
};

module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
          'mobile_users', // table name
          'mphone', // new field name
          {
            type: Sequelize.STRING,
            allowNull: true,
          },
      ),
    ]);
  },

  down(queryInterface, Sequelize) {
    // logic for reverting the changes
    return Promise.all([
      queryInterface.removeColumn('mobile_users', 'mphone'),

    ]);
  },
};