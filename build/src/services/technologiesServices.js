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
exports.toggleSeveralDeleteTechRecords = exports.updateATechRecord = exports.insertNewTchRecords = exports.getTechnologies = void 0;
const technologiesModel_1 = require("../models/mysql/technologiesModel");
const sequelize_1 = require("sequelize");
const resumeModulesUtilF_1 = require("../utils/resumeModulesUtilF");
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
        const verification = yield (0, resumeModulesUtilF_1.userResumeVerifier)(id);
        /**
         * If the id resume field is undefine, then it only returns the response number,
         * which the controller will already know how to handle...
         */
        if (verification.id_resume === undefined) {
            return verification.num_response;
        }
        const technologies = yield technologiesModel_1.Tech.findAll({
            where: {
                id_resume: {
                    [sequelize_1.Op.eq]: verification.id_resume
                }
            },
            attributes: {
                exclude: ['id_resume']
            }
        });
        if (technologies.length === 0) {
            logging_1.default.warning(':::::::::::::::::::::::');
            logging_1.default.warning(`Technologies not found with resume id: ${verification.id_resume}`);
            logging_1.default.warning(':::::::::::::::::::::::');
            return 3;
        }
        (0, resumeModulesUtilF_1.loggingInfo)('Technologies found!');
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
/**
 * @method POST
 *
 * This service helps me to create new records in the technologies table...
 *
 * @param id_user
 * @param tech_data --> this is an object array, that contains all the records to save in the
 * technologies table...
 *
 * @returns --> a message of success or a number indicating if an specific error, controller knows
 * how to handle the number returned...
 */
const insertNewTchRecords = (id_user, tech_data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        /**
         * Check if the user exists, if the do not exists return an number (1 = user does not exisit), then if the user exists check if
         * they have an attached resume, if they do not have one, return an error (2 = user does not have an attached resume)...
         */
        const verification = yield (0, resumeModulesUtilF_1.userResumeVerifier)(id_user);
        // if user does not exists or the user does not have an attached resume, return an error number
        // controller knows how to handle with the returned number...
        if (verification.id_resume === undefined) {
            return verification.num_response;
        }
        // transfer the value of the id_resume to a number variable...
        const id_resume = verification.id_resume;
        // make the registers...
        const tech_results = yield Promise.all(tech_data.map((data) => __awaiter(void 0, void 0, void 0, function* () {
            const tech = yield technologiesModel_1.Tech.create(Object.assign(Object.assign({}, data), { id_resume }));
            return tech;
        })));
        // if there is a record that was not made...
        if (tech_results.length < tech_data.length) {
            logging_1.default.warning('::::::::::::::::::::::::::::::');
            logging_1.default.warning(`There were ${tech_results.length - tech_data.length} records missing`);
            logging_1.default.warning('::::::::::::::::::::::::::::::');
            return 3;
        }
        (0, resumeModulesUtilF_1.loggingInfo)('All registrations were successful');
        return `All registrations were successful: ${tech_results.length}`;
    }
    catch (error) {
        logging_1.default.warn('::::::::::::::::::::::::::::::::');
        logging_1.default.error('Error: ' + error.message);
        logging_1.default.warn('::::::::::::::::::::::::::::::::');
        throw error;
    }
});
exports.insertNewTchRecords = insertNewTchRecords;
/**
 * @methodPUT --> This service helps me to update a record in the technologies table...
 *
 * @param id_tec
 * @param tech_data
 */
const updateATechRecord = (id_tec, tech_data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkTechExists = yield technologiesModel_1.Tech.findByPk(id_tec);
        if (!checkTechExists) {
            logging_1.default.warning(':::::::::::::::::::::::::');
            logging_1.default.warning(`Tech with the id ${id_tec} does not exists!`);
            logging_1.default.warning(':::::::::::::::::::::::::');
            return 1;
        }
        const tech = yield technologiesModel_1.Tech.update({
            name_tech: tech_data.name_tech,
            icon_tech: tech_data.icon_tech,
            id_resume: checkTechExists.id_resume
        }, {
            where: {
                id_tech: id_tec
            }
        });
        if (tech.length === 0) {
            logging_1.default.warning(':::::::::::::::::::::::::');
            logging_1.default.warning('Registration not updated, an error occurred');
            logging_1.default.warning(':::::::::::::::::::::::::');
            return 2;
        }
        (0, resumeModulesUtilF_1.loggingInfo)(`Successfuly technology update: ${tech_data.name_tech}`);
        return `Successfuly technology update: ${tech_data.name_tech}`;
    }
    catch (error) {
        logging_1.default.warn('::::::::::::::::::::::::::::::::');
        logging_1.default.error('Error: ' + error.message);
        logging_1.default.warn('::::::::::::::::::::::::::::::::');
        throw error;
    }
});
exports.updateATechRecord = updateATechRecord;
/**
 *  @method patch
 *
 * This service helps me to toggle the status of the delete_tech, of several records...
 *
 * @param id_tec --> this is an array which contains all the ids of the records that have to be toggle...
 */
const toggleSeveralDeleteTechRecords = (tech_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // check if the tech records exists and update them...
        const checkTechRecords = yield Promise.all(tech_id.map((id) => __awaiter(void 0, void 0, void 0, function* () {
            const record = yield technologiesModel_1.Tech.findByPk(id); // search each record by its id...
            if (!record) {
                logging_1.default.warning('::::::::::::::::::::::::::::::::::::::::::::::::::::');
                logging_1.default.warning(`Schooling record with id ${id} does not exists.`);
                logging_1.default.warning('::::::::::::::::::::::::::::::::::::::::::::::::::::');
                throw new Error(`Tech record with id ${id} does not exists.`);
            }
            // toggle the delete status...
            const newStatus = !record.delete_tech;
            yield record.update({ delete_tech: newStatus });
            (0, resumeModulesUtilF_1.loggingInfo)(`Record with id ${id} update successfully!`);
            return `Technologie delete status "${record.delete_tech}" updated successfully!`;
        })));
        (0, resumeModulesUtilF_1.loggingInfo)(`All records update successfully: ${checkTechRecords.join(',')}`);
        return checkTechRecords;
    }
    catch (error) {
        logging_1.default.warn('::::::::::::::::::::::::::::::::');
        logging_1.default.error('Error: ' + error.message);
        logging_1.default.warn('::::::::::::::::::::::::::::::::');
        throw error;
    }
});
exports.toggleSeveralDeleteTechRecords = toggleSeveralDeleteTechRecords;
