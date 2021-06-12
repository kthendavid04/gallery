// Local variables to call on packages
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Painting = require('./Painting');
const Tag = require('./Tag');

class PaintingTag extends Model {}

PaintingTag.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        painting_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        tag_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: "painting_tag"
    }
);

module.exports = PaintingTag;