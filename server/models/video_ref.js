'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class video_ref extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  video_ref.init({
    reference: DataTypes.STRING,
    complaint_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'video_ref',
  });
  return video_ref;
};