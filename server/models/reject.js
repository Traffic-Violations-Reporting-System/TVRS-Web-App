'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Reject.init({
    description:{
      type:DataTypes.STRING,
      allowNull:false
    },
    reason: {
      type:DataTypes.STRING,
      allowNull:false
    },
    userRating: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    ComplaintId:{
      type:DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Reject',
  });
  return Reject;
};