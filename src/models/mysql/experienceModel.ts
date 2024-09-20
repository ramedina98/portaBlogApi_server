/**
 * Here we have the experience model...
 */
import { Model, DataTypes, Optional } from "sequelize";
import { sequelizeMysql } from "../../config/db";
import { Position, TypeExpe} from "../../interfaces/IResume";
import { IExperience } from "../../interfaces/IExperience";

interface ExperienceAtributtes extends Optional<IExperience, 'id_expe'>{}

class Expe extends Model <IExperience, ExperienceAtributtes>{
    id_expe!: number;
    title_expe!: string;
    text_expe!: string;
    position!: Position;
    list_techs!: string;
    type_expe!: TypeExpe;
    start_date!: Date;
    end_date!: Date;
    id_resume!: number;
}

Expe.init({
    id_expe: {
        type: DataTypes.INTEGER,
        defaultValue: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title_expe: {
        type: DataTypes.STRING(250),
        allowNull: false
    },
    text_expe: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    position: {
        type: DataTypes.ENUM(...Object.values(Position)),
        allowNull: false
    },
    list_techs: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    type_expe: {
        type: DataTypes.ENUM(...Object.values(TypeExpe)),
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
    tableName: 'experience',
    modelName: 'Expe',
    timestamps: false
});

export { Expe };