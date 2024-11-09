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
exports.updateAResumeRecord = exports.createResume = exports.getResume = void 0;
/**
 * @module resume
 *
 * @Services -> All the services that can be found here are for managing updates, creating records and
 * obtaining information about the resume and all the elements related to it...
 */
const technologiesModel_1 = require("../models/mysql/technologiesModel");
const experienceModel_1 = require("../models/mysql/experienceModel");
const coursesModel_1 = require("../models/mysql/coursesModel");
const schoolingModel_1 = require("../models/mysql/schoolingModel");
const resumeModel_1 = require("../models/mysql/resumeModel");
const usersModel_1 = require("../models/mysql/usersModel");
const sequelize_1 = require("sequelize");
const checkEmptyResults_1 = require("../utils/checkEmptyResults");
const resumeModulesUtilF_1 = require("../utils/resumeModulesUtilF");
const logging_1 = __importDefault(require("../config/logging"));
/**
 * @ResumeServices ...
 */
/**
 * @MethodGET
 * This service helps to take the data from the tables:
 * 1. Tecnologies.
 * 2. Experience.
 * 3. Course.
 * 4. Schooling.
 *  where the main table is "Resume" and the records obtained from the other tables
 *  must be obtained with the ID of the resume to which they correspond.
 */
const getResume = (id_user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const verification = yield (0, resumeModulesUtilF_1.userResumeVerifier)(id_user);
        if (verification.id_resume === undefined) {
            return verification.num_response;
        }
        const [resume, technologies, experience, courses, schooling] = yield Promise.all([
            resumeModel_1.Resume.findByPk(verification.id_resume),
            technologiesModel_1.Tech.findAll({
                where: {
                    id_resume: {
                        [sequelize_1.Op.eq]: verification.id_resume
                    }
                },
                attributes: {
                    exclude: ['id_resume']
                }
            }),
            experienceModel_1.Expe.findAll({
                where: {
                    id_resume: {
                        [sequelize_1.Op.eq]: verification.id_resume
                    }
                },
                attributes: {
                    exclude: ['id_resume']
                }
            }),
            coursesModel_1.Course.findAll({
                where: {
                    id_resume: {
                        [sequelize_1.Op.eq]: verification.id_resume
                    }
                },
                attributes: {
                    exclude: ['id_resume']
                }
            }),
            schoolingModel_1.Schooling.findAll({
                where: {
                    id_resume: {
                        [sequelize_1.Op.eq]: verification.id_resume
                    }
                },
                attributes: {
                    exclude: ['id_resume']
                }
            })
        ]);
        const check = (0, checkEmptyResults_1.checkEmptyResults)([technologies, experience, courses, schooling]);
        if (check) {
            logging_1.default.warning(':::::::::::::::::::');
            logging_1.default.warning('Data not found!');
            logging_1.default.warning(':::::::::::::::::::');
            return 3;
        }
        (0, resumeModulesUtilF_1.loggingInfo)('Resume found!');
        return {
            resume: resume,
            technologies: technologies,
            experience: experience,
            courses: courses,
            schooling: schooling,
        };
    }
    catch (error) {
        logging_1.default.warn('::::::::::::::::::::::::::::::::');
        logging_1.default.error('Error: ' + error.message);
        logging_1.default.warn('::::::::::::::::::::::::::::::::');
        throw error;
    }
});
exports.getResume = getResume;
/**
 * @MethoPOST -->
 * this service helps me to create a new register in the resume table...
 *
 *  It is necessary to validate that the user id is valid (exists) and
 * that it does not already have a resume created, since in that case it could
 * only be edited, it cannot have more than one...
 * @CheckForUser --> verify if the user exists...
 * @checkForResume --> verify if the user have already a resume
 */
const createResume = (id_user, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // check if the id_user exists...
        const checkForUser = yield usersModel_1.User.findByPk(id_user);
        if (!checkForUser) {
            logging_1.default.warning(':::::::::::::::::::::::::::');
            logging_1.default.warning(`User deosn't exists, id: ${id_user} is wrong!`);
            logging_1.default.warning(':::::::::::::::::::::::::::');
            return `User deosn't exists, id: ${id_user} is wrong!`;
        }
        // then I verify if there is already a resume associated with the user...
        const checkForResume = yield resumeModel_1.Resume.findOne({
            where: {
                user_id: {
                    [sequelize_1.Op.eq]: id_user
                }
            }
        });
        if (checkForResume) {
            logging_1.default.warning(':::::::::::::::::::::::::::');
            logging_1.default.warning('The user already has a resume!');
            logging_1.default.warning(':::::::::::::::::::::::::::');
            return 'There is already a resume associated with the user';
        }
        const resume = yield resumeModel_1.Resume.create(data);
        if (!resume) {
            logging_1.default.warning(':::::::::::::::::::::::');
            logging_1.default.warning('Record not made!');
            logging_1.default.warning(':::::::::::::::::::::::');
            return null;
        }
        (0, resumeModulesUtilF_1.loggingInfo)('Successfully registered the resume');
        return 'Successfully registration';
    }
    catch (error) {
        logging_1.default.warn('::::::::::::::::::::::::::::::::');
        logging_1.default.error('Error: ' + error.message);
        logging_1.default.warn('::::::::::::::::::::::::::::::::');
        throw error;
    }
});
exports.createResume = createResume;
/**
 * This service helps me to handle the update the data of a specific record in the
 * resume table...
 */
const updateAResumeRecord = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updateResume = yield resumeModel_1.Resume.update(data, {
            where: { id_resume: {
                    [sequelize_1.Op.eq]: id
                } }
        });
        if (updateResume === 0) {
            logging_1.default.warning(':::::::::::::::::::::::');
            logging_1.default.warning(`No resume found with id: ${id}`);
            logging_1.default.warning(':::::::::::::::::::::::');
            return null;
        }
        (0, resumeModulesUtilF_1.loggingInfo)('Resume successfully updated!');
        return 'Resume successfully updated!';
    }
    catch (error) {
        logging_1.default.warn('::::::::::::::::::::::::::::::::');
        logging_1.default.error('Error: ' + error.message);
        logging_1.default.warn('::::::::::::::::::::::::::::::::');
        throw error;
    }
});
exports.updateAResumeRecord = updateAResumeRecord;
