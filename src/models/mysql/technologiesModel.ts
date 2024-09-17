/**
 * @TechModel
 * Here I have the technologies model...
 */
import { Model, DataTypes, Optional } from "sequelize";
import { sequelizeMysql } from "../../config/db";
import { ITech } from "../../interfaces/ITechnologies";

interface TechAtributtes extends Optional<ITech, 'id_tech'>{}

class Tech extends Model <ITech, TechAtributtes>{
    id_tech!: number;
    name_tech!: string;
    icon_tech!: string;
    id_resume!: number;
}

Tech.init({
    id_tech: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name_tech: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    icon_tech: {
        type: DataTypes.STRING(250),
        allowNull: false
    },
    id_resume: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize: sequelizeMysql,
    tableName: 'technologies',
    modelName: 'Tech',
    timestamps: false
});

export { Tech };