'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    queryInterface.changeColumn(
      'accepts',
      'policeRegion',
      {
        type: Sequelize.INTEGER
      }
    )
  },

};
