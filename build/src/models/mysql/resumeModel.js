"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Resume = void 0;
/**
 * Here we have the resume model...
 */
const sequelize_1 = require("sequelize");
const db_1 = require("../../config/db");
;
class Resume extends sequelize_1.Model {
}
exports.Resume = Resume;
Resume.init({
    id_resume: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    user_id: {
        type: sequelize_1.DataTypes.CHAR(36),
        allowNull: false
    },
    pdf_resume: {
        type: sequelize_1.DataTypes.BLOB,
        allowNull: false
    },
    profile_resume: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    logo_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING(150),
        allowNull: false
    }
}, {
    sequelize: db_1.sequelizeMysql,
    tableName: 'resume',
    modelName: 'Resume',
    timestamps: false
});
