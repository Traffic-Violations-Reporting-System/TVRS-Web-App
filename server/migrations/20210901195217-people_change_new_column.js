'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.renameColumn('people', 'specialNotes', 'address');
  },

  
};
