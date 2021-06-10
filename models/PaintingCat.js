// Local variables to call on packages
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class PaintingCategory extends Model {}

PaintingCategory.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        painting_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Painting",
                key: "id",
                unique: false
            }
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Category",
                key: "id",
                unique: false
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

module.exports = PaintingCategory;