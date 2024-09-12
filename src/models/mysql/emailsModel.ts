/**
 * Here we have the emails model...
 */
import { Model, DataTypes, Optional } from "sequelize";
import { sequelizeMysql } from "../../config/db";
import { Emails, EmailType } from "../../interfaces/IEmails";

interface EmailsAtributtes extends Optional<Emails, 'id_email'>{}

class Email extends Model <Emails, EmailsAtributtes>{
    id_emails!: string;
    email_sender!: string;
    name_sender!: string;
    email_recipient!: string;
    message!: string;
    date_message!: Date;
    email_type!: EmailType;
}

Email.init({
    id_email: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    email_sender: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    name_sender: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    email_recipient: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    date_message: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    email_type: {
        type: DataTypes.ENUM(...Object.values(EmailType)),
        allowNull: false
    },
    is_read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    }
},{
    sequelize: sequelizeMysql,
    tableName: 'emails',
    modelName: 'Email',
    timestamps: false
});

export { Email }