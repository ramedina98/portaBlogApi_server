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
exports.userResumeVerifier = exports.loggingInfo = void 0;
/**
 * This util file has all the necessary functions to support small tasks...
 *
 * It will be very necessary in all the modules related to resume...
 * @technologies
 * @courses
 * @schooling
 * @experience
 */
const usersModel_1 = require("../models/mysql/usersModel");
const resumeModel_1 = require("../models/mysql/resumeModel");
const logging_1 = __importDefault(require("../config/logging"));
/**
 * @LogginInfo --> this util function helps me to display in a better way information with loggin info type...
 *
 * @param text
 */
const loggingInfo = (text) => {
    logging_1.default.info('::::::::::::::::::::::::::::::');
    logging_1.default.info(text);
    logging_1.default.info('::::::::::::::::::::::::::::::');
};
exports.loggingInfo = loggingInfo;
;
const userResumeVerifier = (id_user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // I search for the user to verify that he/she exists
        const user = yield usersModel_1.User.findByPk(id_user);
        if (user === null) {
            logging_1.default.warning(':::::::::::::::::::::::::');
            logging_1.default.warning('The user does not exists');
            logging_1.default.warning(':::::::::::::::::::::::::');
            return {
                num_response: 1,
                id_resume: undefined
            };
        }
        const id_resume = yield resumeModel_1.Resume.findOne({
            where: {
                user_id: id_user
            },
            attributes: {
                exclude: ['user_id', 'pdf_resume', 'profile_resume', 'logo_id', 'email']
            } // I don't need all the attributes, just the id...
        });
        if (!id_resume) {
            logging_1.default.warning(':::::::::::::::::::::::::');
            logging_1.default.warning(`The user ${user === null || user === void 0 ? void 0 : user.name1} does not have a resume attached`);
            logging_1.default.warning(':::::::::::::::::::::::::');
            return {
                num_response: 2,
                id_resume: undefined
            };
        }
        return {
            num_response: 0,
            id_resume: id_resume.id_resume
        };
    }
    catch (error) {
        logging_1.default.warn('::::::::::::::::::::::::::::::::::::::::::::::::::::::::');
        logging_1.default.error('Error verifying (user or resume): ' + error.message);
        logging_1.default.warn('::::::::::::::::::::::::::::::::::::::::::::::::::::::::');
        throw error;
    }
});
exports.userResumeVerifier = userResumeVerifier;
