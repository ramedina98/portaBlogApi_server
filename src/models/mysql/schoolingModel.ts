/**
 * Here we have the schooling model...
 */
import { Model, DataTypes, Optional } from "sequelize";
import { sequelizeMysql } from "../../config/db";
import { ISchooling } from "../../interfaces/IResume";

interface SchoolingAtributtes extends Optional<ISchooling, 'id_sch'>{}

class Schooling extends Model <ISchooling, SchoolingAtributtes>{
    id_sch!: number;
    career_name!: string;
    university_nam!: string;
    start_date!: Date;
    end_date!: Date;
    id_resume!: number;
}

Schooling.init({
    id_sch: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    career_name: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    university_nam: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    start_date: {
        type: DataTypes.STRING,
        allowNull: false
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    id_resume: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    sequelize: sequelizeMysql,
    tableName: 'schooling',
    modelName: 'Schooling',
    timestamps: false
});

export { Schooling };