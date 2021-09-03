'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Accept extends Model {
    
    static associate(models) {
      // define association here
    }
  };
  Accept.init({
    policeRegion:{
      type:DataTypes.INTEGER,
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
    },
    progress: {
      type:DataTypes.STRING(1024),
    }
  }, {
    sequelize,
    modelName: 'Accept',
  });
  return Accept;
};