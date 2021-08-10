'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Accept_People extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  };
  Accept_People.init({
    acceptId: {
      type: DataTypes.INTEGER(11),
      allowNull:false
    },
    peopleId:{
      type: DataTypes.INTEGER(11),
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Accept_People',
  });
  return Accept_People;
};