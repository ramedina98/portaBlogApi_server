"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoConnect = exports.sequelizeMysql = void 0;
/**
 * In this file we have the connection to the dbs (MySQL / Mongodb)...
 */
const sequelize_1 = require("sequelize");
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config");
require("./config/logging");
// MySQL db connection configuration using sequelize...
const sequelizeMysql = new sequelize_1.Sequelize(config_1.SERVER.NAME, config_1.SERVER.USER, config_1.SERVER.PASWORD, {
    host: config_1.SERVER.HOST,
    dialect: 'mysql',
    port: Number(config_1.SERVER.PORT),
    logging: false,
});
exports.sequelizeMysql = sequelizeMysql;
// Mongodb connection configuration...
const mongoConnect = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(config_1.SERVER.MONGO_URI);
        logging.info('----------------------------------------------');
        logging.info('Connect to Mongodb');
        logging.info('----------------------------------------------');
    }
    catch (error) {
        logging.error('Mongodb connection error: ' + error.message);
        process.exit(1);
    }
});
exports.mongoConnect = mongoConnect;
