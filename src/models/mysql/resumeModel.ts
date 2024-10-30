/**
 * Here we have the resume model...
 */
import { Model, DataTypes, Optional } from "sequelize";
import { sequelizeMysql } from "../../config/db";
import { IResume } from "../../interfaces/IResume";

interface ResumeAtributtes extends Optional<IResume, 'id_resume'>{};

class Resume extends Model<IResume, ResumeAtributtes>{
    id_resume!: number;
    user_id!: string;
    pdf_resume!: string;
    profile_resume!: string;
    logo!: string;
    email!: string;
}

Resume.init({
    id_resume: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.CHAR(36),
        allowNull: false
    },
    pdf_resume: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    profile_resume: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    logo: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(150),
        allowNull: false
    }
}, {
    sequelize: sequelizeMysql,
    tableName: 'resume',
    modelName: 'Resume',
    timestamps: false
});

export { Resume }