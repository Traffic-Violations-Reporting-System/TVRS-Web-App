'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Complaint extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Complaint.init({
        description: DataTypes.STRING,
        location: DataTypes.STRING,
        status: DataTypes.STRING,
        user_id: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Complaint',
    });
    return Complaint;
};