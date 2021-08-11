'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class webuserrole extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  };
  webuserrole.init({
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'webuserrole',
  });
  return webuserrole;
};