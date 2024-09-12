"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Expe = void 0;
/**
 * Here we have the experience model...
 */
const sequelize_1 = require("sequelize");
const db_1 = require("../../config/db");
const IResume_1 = require("../../interfaces/IResume");
class Expe extends sequelize_1.Model {
}
exports.Expe = Expe;
Expe.init({
    id_expe: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title_expe: {
        type: sequelize_1.DataTypes.STRING(250),
        allowNull: false
    },
    text_expe: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    position: {
        type: sequelize_1.DataTypes.ENUM(...Object.values(IResume_1.Position)),
        allowNull: false
    },
    list_techs: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    type_expe: {
        type: sequelize_1.DataTypes.ENUM(...Object.values(IResume_1.TypeExpe)),
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
    id_resume: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize: db_1.sequelizeMysql,
    tableName: 'experience',
    modelName: 'Expe',
    timestamps: false
});
