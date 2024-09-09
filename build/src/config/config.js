"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SERVER = exports.PRODUCTION = exports.TEST = exports.DEVELOPMENT = void 0;
/**
 * Here we load all the enviroment variables that we have,
 * and we do some required configurations...
 */
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.DEVELOPMENT = process.env.NODE_ENV === 'development';
exports.TEST = process.env.NODE_ENV === 'test';
exports.PRODUCTION = process.env.NODE_ENV === 'production';
exports.SERVER = {
    NAME: process.env.DB_NAME,
    USER: process.env.DB_USER,
    PASWORD: process.env.DB_PASSWORD,
    PORT: process.env.DB_PORT,
    HOST: process.env.DB_HOST,
    MONGO_URI: process.env.MONGO_URI,
    SERVER_PORT: process.env.PORT_TS_SERVER,
    KEY: process.env.KEY_JWT,
    TIME: process.env.EXPIRES_TIME,
    SET_ROUNDS: Number(process.env.ENCRYPT_ROUNDS),
    EHOST: process.env.EMAIL_HOST,
    EPORT: Number(process.env.EMAIL_PORT),
    EUSER: process.env.EMAIL_USER,
    EPASS: process.env.EMAIL_PASS,
    WEB: process.env.WEB,
    EMAIL: process.env.EAMIL_BLOGPORT,
};
