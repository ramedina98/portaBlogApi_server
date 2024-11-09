"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schooling = void 0;
/**
 * @module Schooling
 * Here we have the schooling model...
 */
const sequelize_1 = require("sequelize");
const db_1 = require("../../config/db");
class Schooling extends sequelize_1.Model {
}
exports.Schooling = Schooling;
Schooling.init({
    id_sch: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    career_name: {
        type: sequelize_1.DataTypes.STRING(150),
        allowNull: false
    },
    university_nam: {
        type: sequelize_1.DataTypes.STRING(150),
        allowNull: false
    },
    start_date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    end_date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    delete_schooling: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    id_resume: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize: db_1.sequelizeMysql,
    tableName: 'schooling',
    modelName: 'Schooling',
    timestamps: false
});
