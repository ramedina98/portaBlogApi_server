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
exports.toggleSeveralDeleteSchRecords = exports.toggleDeleteSchoolingStatus = exports.updateASchoolingRecord = exports.insertNewSchRecords = exports.getSchoolingData = void 0;
const resumeModulesUtilF_1 = require("../utils/resumeModulesUtilF");
const schoolingModel_1 = require("../models/mysql/schoolingModel");
const resumeModulesUtilF_2 = require("../utils/resumeModulesUtilF");
const sequelize_1 = require("sequelize");
const logging_1 = __importDefault(require("../config/logging"));
/**
 * @method GET
 *
 * This service helps me to reach all the record realted to a specific user resume in the schooling table...
 *
 * @param id --> this is the user id...
 *
 * @async --> it returns a ISchooling array object...
 */
const getSchoolingData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // first I have to check if the user exisits...
        const verification = yield (0, resumeModulesUtilF_2.userResumeVerifier)(id);
        /**
         * If the id resume field is undefine, then it only returns the response number,
         * which the controller will already know how to handle it...
         */
        if (verification.id_resume === undefined) {
            return verification.num_response;
        }
        /**
         * if everything is correct, I have to search all the records with that have the
         * same value in the id_resume field...
         * */
        const schooling = yield schoolingModel_1.Schooling.findAll({
            where: {
                id_resume: {
                    [sequelize_1.Op.eq]: verification.id_resume
                }
            },
            attributes: {
                exclude: ['id_resume']
            }
        });
        if (schooling.length === 0) {
            logging_1.default.warning(':::::::::::::::::::::::');
            logging_1.default.warning(`Schooling data not found with resume id: ${verification.id_resume}`);
            logging_1.default.warning(':::::::::::::::::::::::');
            return 3;
        }
        (0, resumeModulesUtilF_1.loggingInfo)(`Schooling data found! ${schooling.length}`);
        return schooling;
    }
    catch (error) {
        logging_1.default.warn('::::::::::::::::::::::::::::::::');
        logging_1.default.error('Error: ' + error.message);
        logging_1.default.warn('::::::::::::::::::::::::::::::::');
        throw error;
    }
});
exports.getSchoolingData = getSchoolingData;
/**
 * @method POST
 * @type service
 *
 * This service helps me to insert new data in the schooling table, creating new records in it...
 *
 * @param sch_data --> this is an object array... (type = ISchoolingNoIdNoResumeId[])...
 * @returns --> if everything was created successfully it returns a message of success, and if something
 * went wrong, it returns a number, that the controllers knows how to handle and which message of error has to send to
 * the client...
 */
const insertNewSchRecords = (id_user, sch_data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        /**
         * Check if the user exists, and if the user already exists check if they have an
         * attached resume, and then obtain the id_resume...
         * If they do not exists or they do not have an attached resume, returns an error number,
         * which the controller already knows how to handle...
         *
         * 1 = user does not exists
         * 2 = the user does not have an attached resume
         */
        const verification = yield (0, resumeModulesUtilF_2.userResumeVerifier)(id_user);
        // if the id_resume is undefine, returns the corresponding error number...
        if (verification.id_resume === undefined) {
            return verification.num_response;
        }
        // transfer the value of the id resume to a variable with that name...
        const id_resume = verification.id_resume;
        // insert new records into the schooling table...
        const sch_result = yield Promise.all(sch_data.map((data) => __awaiter(void 0, void 0, void 0, function* () {
            const sch = yield schoolingModel_1.Schooling.create(Object.assign(Object.assign({}, data), { id_resume }));
            return sch;
        })));
        // If there is a record that was not made...
        if (sch_result.length < sch_data.length) {
            logging_1.default.warning('::::::::::::::::::::::::::::::');
            logging_1.default.warning(`There were ${sch_result.length - sch_data.length} records missing`);
            logging_1.default.warning('::::::::::::::::::::::::::::::');
            return 3;
        }
        (0, resumeModulesUtilF_1.loggingInfo)('All registrations were successful');
        return `All registrations were successful: ${sch_result.length}`;
    }
    catch (error) {
        logging_1.default.warn('::::::::::::::::::::::::::::::::');
        logging_1.default.error('Error: ' + error.message);
        logging_1.default.warn('::::::::::::::::::::::::::::::::');
        throw error;
    }
});
exports.insertNewSchRecords = insertNewSchRecords;
/**
 * @method PUT
 *
 * This service helps me to update an specific record in the schooling table...
 *
 * @param id_shcooling
 * @param data_sch
 *
 * @async
 * @returns It returns a message of succssess or a number, that the controller knows what it means (warning message)
 */
const updateASchoolingRecord = (id_sch, data_sch) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // check if the schooling record exists...
        const sch = yield schoolingModel_1.Schooling.findByPk(id_sch);
        if (!sch) {
            logging_1.default.warning('::::::::::::::::::::::::::::::::::::');
            logging_1.default.warning(`Schooling record does not exists with id: ${id_sch}`);
            logging_1.default.warning('::::::::::::::::::::::::::::::::::::');
            return 1;
        }
        // if everything is ok, update the record...
        const schooling = yield schoolingModel_1.Schooling.update({
            career_name: data_sch.career_name,
            university_nam: data_sch.university_nam,
            start_date: data_sch.start_date,
            end_date: data_sch.end_date,
            delete_schooling: data_sch.delete_schooling,
            id_resume: sch.id_resume
        }, {
            where: {
                id_sch
            }
        });
        if (schooling.length === 0) {
            logging_1.default.warning('::::::::::::::::::::::::::::::::::::');
            logging_1.default.warning(`Any schooling record was not update!`);
            logging_1.default.warning('::::::::::::::::::::::::::::::::::::');
            return 2;
        }
        (0, resumeModulesUtilF_1.loggingInfo)(`The "${data_sch.career_name}" record was update successfuly!`);
        return `The "${data_sch.career_name}" record was update successfuly!`;
    }
    catch (error) {
        logging_1.default.warn('::::::::::::::::::::::::::::::::');
        logging_1.default.error('Error: ' + error.message);
        logging_1.default.warn('::::::::::::::::::::::::::::::::');
        throw error;
    }
});
exports.updateASchoolingRecord = updateASchoolingRecord;
/**
 * @method PATCH
 *
 * This service helps me to toggle the "delete_schooling" filed, from false to true and veseversa...
 *
 * @param id_sch
 */
const toggleDeleteSchoolingStatus = (id_sch) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // check if the schooling data record exists...
        const sch = yield schoolingModel_1.Schooling.findByPk(id_sch);
        if (!sch) {
            logging_1.default.warning('::::::::::::::::::::::::::::::::::::');
            logging_1.default.warning(`Schooling record does not exists with id: ${id_sch}`);
            logging_1.default.warning('::::::::::::::::::::::::::::::::::::');
            return 1;
        }
        // change the status...
        const newStatus = !sch.delete_schooling;
        // update the delete_schooling status...
        yield sch.update({ delete_schooling: newStatus });
        (0, resumeModulesUtilF_1.loggingInfo)(`Delete status updated successfuly: ${sch.career_name}`);
        return `Delete status updated successfuly: ${sch.career_name}`;
    }
    catch (error) {
        logging_1.default.warn('::::::::::::::::::::::::::::::::');
        logging_1.default.error('Error: ' + error.message);
        logging_1.default.warn('::::::::::::::::::::::::::::::::');
        throw error;
    }
});
exports.toggleDeleteSchoolingStatus = toggleDeleteSchoolingStatus;
/**
 * @method PATCH
 *
 * This service helps me to toggle the status of the delete_schooling, of several records...
 *
 * @param sch_ids --> this is an array which contains all the ids of the records that have to be toggled
 */
const toggleSeveralDeleteSchRecords = (sch_ids) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // check if the schooling records exists and update them...
        const checkSchRecords = yield Promise.all(sch_ids.map((id) => __awaiter(void 0, void 0, void 0, function* () {
            const record = yield schoolingModel_1.Schooling.findByPk(id); // search each record by its id...
            if (!record) {
                logging_1.default.warning('::::::::::::::::::::::::::::::::::::::::::::::::::::');
                logging_1.default.warning(`Schooling record with id ${id} does not exists.`);
                logging_1.default.warning('::::::::::::::::::::::::::::::::::::::::::::::::::::');
                throw new Error(`Schooling record with id ${id} does not exists.`);
            }
            //toggle the delete status...
            const newStatus = !record.delete_schooling;
            yield record.update({ delete_schooling: newStatus });
            (0, resumeModulesUtilF_1.loggingInfo)(`Record with id ${id} updated successfully!`);
            return `Education in ${record.career_name} updated successfully!`;
        })));
        (0, resumeModulesUtilF_1.loggingInfo)(`All records updated successfully: ${checkSchRecords.join(',')}`);
        return checkSchRecords;
    }
    catch (error) {
        logging_1.default.warn('::::::::::::::::::::::::::::::::');
        logging_1.default.error('Error: ' + error.message);
        logging_1.default.warn('::::::::::::::::::::::::::::::::');
        throw error;
    }
});
exports.toggleSeveralDeleteSchRecords = toggleSeveralDeleteSchRecords;
