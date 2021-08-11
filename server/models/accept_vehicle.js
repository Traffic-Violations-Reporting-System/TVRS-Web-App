'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Accept_Vehicle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Accept_Vehicle.init({
    acceptId:{
      type: DataTypes.INTEGER(11),
      allowNull:false
    },
    vehicleId: {
      type: DataTypes.INTEGER(11),
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Accept_Vehicle',
  });
  return Accept_Vehicle;
};