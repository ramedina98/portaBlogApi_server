"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = void 0;
/**
 * Here we have the course model...
 */
const sequelize_1 = require("sequelize");
const db_1 = require("../../config/db");
;
class Course extends sequelize_1.Model {
}
exports.Course = Course;
Course.init({
    id_course: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    course_title: {
        type: sequelize_1.DataTypes.STRING(150),
        allowNull: false,
    },
    text_course: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false
    },
    provider: {
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
    id_resume: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize: db_1.sequelizeMysql,
    tableName: 'courses',
    modelName: 'Course',
    timestamps: false
});
