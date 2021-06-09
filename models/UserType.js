// Local variables to call on packages
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class UserType extends Model {}

UserType.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isAlpha: true,
                notNull: true,
                notEmpty: true,
                len: [3]
            }
        }
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true
    }
);

module.exports = UserType;