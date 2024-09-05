/**
 * In this file we have the connection to the dbs (MySQL / Mongodb)...
 */
import { Sequelize } from "sequelize";
import mongoose from 'mongoose';
import { SERVER } from "./config";
import './config/logging';

// MySQL db connection configuration using sequelize...
const sequelizeMysql = new Sequelize(
    SERVER.NAME,
    SERVER.USER,
    SERVER.PASWORD,
    {
        host: SERVER.HOST,
        dialect: 'mysql',
        port: Number(SERVER.PORT),
        logging: false,
    }
);

// Mongodb connection configuration...
const mongoConnect = async () => {
    try {
        await mongoose.connect(SERVER.MONGO_URI as string);
        logging.info('----------------------------------------------');
        logging.info('Connect to Mongodb');
        logging.info('----------------------------------------------');
    } catch (error: any) {
        logging.error('Mongodb connection error: ' + error.message);
        process.exit(1);
    }
};

export { sequelizeMysql, mongoConnect };