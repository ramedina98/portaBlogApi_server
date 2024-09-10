"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Email = void 0;
/**
 * Here we have the model of the emails model...
 */
const sequelize_1 = require("sequelize");
const db_1 = require("../../config/db");
const IEmails_1 = require("../../interfaces/IEmails");
class Email extends sequelize_1.Model {
}
exports.Email = Email;
Email.init({
    id_email: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true
    },
    email_sender: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    name_sender: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email_recipient: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    message: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    date_message: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    email_type: {
        type: sequelize_1.DataTypes.ENUM(...Object.values(IEmails_1.EmailType)),
        allowNull: false
    },
    is_read: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    }
}, {
    sequelize: db_1.sequelizeMysql,
    tableName: 'emails',
    modelName: 'Email',
    timestamps: false
});
