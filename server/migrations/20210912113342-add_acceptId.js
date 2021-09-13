'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'people',
        'acceptId',
        {
          type: Sequelize.INTEGER
        }
      ),
      queryInterface.addColumn(
        'vehicles',
        'acceptId',
        {
          type: Sequelize.INTEGER
        }
      ),
    ]); 
  }

};
