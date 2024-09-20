/**
 * Here we have the course model...
 */
import { Model, DataTypes, Optional } from "sequelize";
import { sequelizeMysql } from "../../config/db";
import { ICourse } from "../../interfaces/ICourses";

interface CoursesAtributtes extends Optional<ICourse, 'id_course'>{};

class Course extends Model <ICourse, CoursesAtributtes>{
    id_course!: number;
    course_title!: string;
    text_course!: string;
    provider!: string;
    start_date!: Date;
    end_date!: Date;
    id_resume!: number;
}

Course.init({
    id_course: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    course_title: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    text_course: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    provider: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    id_resume: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize: sequelizeMysql,
    tableName: 'courses',
    modelName: 'Course',
    timestamps: false
});

export { Course };