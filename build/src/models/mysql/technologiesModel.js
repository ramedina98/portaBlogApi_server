"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tech = void 0;
/**
 * @TechModel
 * Here I have the technologies model...
 */
const sequelize_1 = require("sequelize");
const db_1 = require("../../config/db");
class Tech extends sequelize_1.Model {
}
exports.Tech = Tech;
Tech.init({
    id_tech: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name_tech: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    icon_tech: {
        type: sequelize_1.DataTypes.STRING(250),
        allowNull: false
    },
    delet_tech: {
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
    tableName: 'technologies',
    modelName: 'Tech',
    timestamps: false
});
