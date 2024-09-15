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
exports.getTechnologies = void 0;
const technologiesModel_1 = require("../models/mysql/technologiesModel");
const sequelize_1 = require("sequelize");
const logging_1 = __importDefault(require("../config/logging"));
/**
 * @MethodGET -->
 * This service helps me to reach all the information of the tecnologies table,
 * searching with a resume id...
 */
const getTechnologies = (id_resume) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const technologies = yield technologiesModel_1.Tech.findAll({
            where: {
                id_resume: {
                    [sequelize_1.Op.eq]: id_resume
                }
            },
            attributes: {
                exclude: ['id_resume']
            }
        });
        if (technologies.length === 0) {
            logging_1.default.warning(':::::::::::::::::::::::');
            logging_1.default.warning(`No technologies found with resume id: ${id_resume}`);
            logging_1.default.warning(':::::::::::::::::::::::');
            return null;
        }
        return technologies;
    }
    catch (error) {
        logging_1.default.warn('::::::::::::::::::::::::::::::::');
        logging_1.default.error('Error: ' + error.message);
        logging_1.default.warn('::::::::::::::::::::::::::::::::');
        throw error;
    }
});
exports.getTechnologies = getTechnologies;
