/**
 * Here we load all the enviroment variables that we have,
 * and we do some required configurations...
 */
import dotenv from 'dotenv';

dotenv.config();

export const DEVELOPMENT = process.env.NODE_ENV === 'development';
export const TEST = process.env.NODE_ENV === 'test';
export const PRODUCTION = process.env.NODE_ENV === 'production';

export const SERVER = {
    NAME: process.env.DB_NAME,
    USER: process.env.DB_USER,
    PASWORD: process.env.DB_PASSWORD,
    PORT: process.env.DB_PORT,
    HOST: process.env.DB_HOST,
    MONGO_URI: process.env.MONGO_URI,
    SERVER_PORT: process.env.PORT_TS_SERVER
}