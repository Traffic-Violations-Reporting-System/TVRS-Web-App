'use strict';
const {
    Model, STRING
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Complaint extends Model {
        
        static associate(models) {
            // define association here
        }
    };
    Complaint.init({
        description: DataTypes.STRING,
        location: DataTypes.STRING,
        complaint_status: DataTypes.STRING,
        user_id: DataTypes.INTEGER,
        complainant_id: DataTypes.STRING,
        complainantType: DataTypes.STRING,
        mobile_user_id: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Complaint',
    });
    return Complaint;
};