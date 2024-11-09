/**
 * @module users
 * Here we have the model of the users instances...
 */
import { Model, DataTypes, Optional } from "sequelize";
import { sequelizeMysql } from "../../config/db";
import { IUser } from "../../interfaces/IUser";

interface UserCreationAttributes extends Optional<IUser, 'id_user'>{}

class User extends Model<IUser, UserCreationAttributes>{
    public id_user!: string;
    public name1!: string;
    public name2!: string;
    public surname!: string;
    public phone!: string;
    public email!: string;
    public passwrd!: string;
    public photo?: string;
}

User.init({
    id_user: {
        type: DataTypes.CHAR(36),
        primaryKey: true,
    },
    name1: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    name2: {
        type: DataTypes.STRING(150),
        allowNull: true,
    },
    surname: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING(12),
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
    },
    passwrd: {
        type: DataTypes.STRING(250),
        allowNull: false,
    },
    photo: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
},{
    sequelize: sequelizeMysql,
    tableName: 'users',
    modelName: 'User',
    timestamps: false
});

export { User };