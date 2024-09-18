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
exports.insertNewTechnologie = exports.getTechnologies = void 0;
const technologiesModel_1 = require("../models/mysql/technologiesModel");
const resumeModel_1 = require("../models/mysql/resumeModel");
const usersModel_1 = require("../models/mysql/usersModel");
const sequelize_1 = require("sequelize");
const logging_1 = __importDefault(require("../config/logging"));
/**
 * @MethodGET -->
 * This service helps me to reach all the information of the tecnologies table,
 * searching with a resume id...
 *
 * @param id_resume
 *
 * There are 3 types of message of warning, as it checks if the user exists, if the
 * user has a resume attached and if any techs have already been added to that resume.
 *
 * 1 = The user does not exists...
 * 2 = The user does not have any resume attached jet...
 * 3 = Technologies not foud (No tech has been added to the user's resume yet).
 */
const getTechnologies = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // I search for the user to verify that he/she exists
        const user = yield usersModel_1.User.findByPk(id);
        if (user === null) {
            logging_1.default.warning(':::::::::::::::::::::::::');
            logging_1.default.warning('The user does not exists');
            logging_1.default.warning(':::::::::::::::::::::::::');
            return 1;
        }
        const id_resume = yield resumeModel_1.Resume.findOne({
            where: {
                user_id: id
            },
            attributes: {
                exclude: ['user_id', 'pdf_resume', 'profile_resume', 'logo_id', 'email']
            } // I don't need all the attributes, just the id...
        });
        if (!id_resume) {
            logging_1.default.warning(':::::::::::::::::::::::::');
            logging_1.default.warning(`The user ${user.name1} does not have a resume attached`);
            logging_1.default.warning(':::::::::::::::::::::::::');
            return 2;
        }
        const technologies = yield technologiesModel_1.Tech.findAll({
            where: {
                id_resume: {
                    [sequelize_1.Op.eq]: id_resume.id_resume
                }
            },
            attributes: {
                exclude: ['id_resume']
            }
        });
        if (technologies.length === 0) {
            logging_1.default.warning(':::::::::::::::::::::::');
            logging_1.default.warning(`Technologies not found with resume id: ${id_resume}`);
            logging_1.default.warning(':::::::::::::::::::::::');
            return 3;
        }
        logging_1.default.info(':::::::::::::::::::::::::::::::');
        logging_1.default.info('Technologies found!');
        logging_1.default.info(':::::::::::::::::::::::::::::::');
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
// TODO: consultar una forma para poder hacer que los datos se actualicen en tiempo real cuando haga un nuevo registro...
// NOTE: ¿qué combiene más? -> en el frontend algo o un ws...
/**
 * @MethodPOST -> insertNewTechnologie
 * This service helps me to create a new record in the technologies table...
 *
 * @param tech_data
 *
 * @messages -> to handle error or warnings...
 */
const insertNewTechnologie = (id_user, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // verify if the user exists...
        const user = yield usersModel_1.User.findByPk(id_user);
        if (!user) {
            logging_1.default.warning(':::::::::::::::::::::::::');
            logging_1.default.warning('The user does not exists');
            logging_1.default.warning(':::::::::::::::::::::::::');
            return 1;
        }
        // resume id...
        const id_resume = yield resumeModel_1.Resume.findOne({
            where: {
                user_id: user.id_user
            },
            attributes: {
                exclude: ['user_id', 'pdf_resume', 'profile_resume', 'logo_id', 'email']
            } // I don't need all the attributes, just the id...
        });
        if (!id_resume) {
            logging_1.default.warning(':::::::::::::::::::::::::');
            logging_1.default.warning(`The user ${user.name1} does not have a resume attached`);
            logging_1.default.warning(':::::::::::::::::::::::::');
            return 2;
        }
        const newData = {
            name_tech: data.name_tech,
            icon_tech: data.icon_tech,
            id_resume: id_resume.id_resume
        };
        // make the new register...
        const tech = yield technologiesModel_1.Tech.create(newData);
        if (!tech) {
            logging_1.default.warning(':::::::::::::::::::::::::');
            logging_1.default.warning('No registration was made');
            logging_1.default.warning(':::::::::::::::::::::::::');
            return 3;
        }
        logging_1.default.info('::::::::::::::::::::::::::::::');
        logging_1.default.info('Successfully registration!');
        logging_1.default.info('::::::::::::::::::::::::::::::');
        return 'Successfully registration';
    }
    catch (error) {
        logging_1.default.warn('::::::::::::::::::::::::::::::::');
        logging_1.default.error('Error: ' + error.message);
        logging_1.default.warn('::::::::::::::::::::::::::::::::');
        throw error;
    }
});
exports.insertNewTechnologie = insertNewTechnologie;
