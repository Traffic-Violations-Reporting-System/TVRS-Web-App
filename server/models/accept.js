'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Accept extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Accept.init({
    policeRegion:{
      type:DataTypes.STRING,
      allowNull:false
    },
    violationType: {
      type:DataTypes.STRING,
      allowNull:false
    },
    ComplaintAccuracy: {
      type:DataTypes.STRING,
      allowNull:false
    },
    description: {
      type:DataTypes.STRING,
      allowNull:false
    },
    ComplaintId: {
      type:DataTypes.INTEGER,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Accept',
  });
  return Accept;
};