"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
/**
 * Here we have the model of the users instances...
 */
const sequelize_1 = require("sequelize");
const db_1 = require("../../config/db");
class User extends sequelize_1.Model {
}
exports.User = User;
User.init({
    id_user: {
        type: sequelize_1.DataTypes.CHAR(36),
        primaryKey: true,
    },
    name1: {
        type: sequelize_1.DataTypes.STRING(150),
        allowNull: false,
    },
    name2: {
        type: sequelize_1.DataTypes.STRING(150),
        allowNull: true,
    },
    surname: {
        type: sequelize_1.DataTypes.STRING(200),
        allowNull: false,
    },
    phone: {
        type: sequelize_1.DataTypes.STRING(12),
        allowNull: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING(150),
        allowNull: false,
        unique: true,
    },
    passwrd: {
        type: sequelize_1.DataTypes.STRING(250),
        allowNull: false,
    },
    photo: {
        type: sequelize_1.DataTypes.BLOB,
        allowNull: true,
    },
}, {
    sequelize: db_1.sequelizeMysql,
    tableName: 'users',
    modelName: 'User',
    timestamps: false
});
