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
exports.createResume = exports.getResume = exports.getIdResume = void 0;
/**
 * @service ->
 * Here we have all the require services to handle the resume endpoints...
 */
const technologiesModel_1 = require("../models/mysql/technologiesModel");
const experienceModel_1 = require("../models/mysql/experienceModel");
const coursesModel_1 = require("../models/mysql/coursesModel");
const schoolingModel_1 = require("../models/mysql/schoolingModel");
const resumeModel_1 = require("../models/mysql/resumeModel");
const sequelize_1 = require("sequelize");
const checkEmptyResults_1 = require("../utils/checkEmptyResults");
const logging_1 = __importDefault(require("../config/logging"));
/**
 * @MethodGET ->
 * This service helps me to get the ID of a resume by seraching with the id of a user...
 */
const getIdResume = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resume = yield resumeModel_1.Resume.findOne({ where: { user_id: id } });
        if (!resume) {
            logging_1.default.warning(':::::::::::::::::::::::');
            logging_1.default.warning('Resume not found!');
            logging_1.default.warning(':::::::::::::::::::::::');
            return null;
        }
        const resume_id = resume.id_resume;
        return resume_id;
    }
    catch (error) {
        logging_1.default.warn('::::::::::::::::::::::::::::::::');
        logging_1.default.error('Error: ' + error.message);
        logging_1.default.warn('::::::::::::::::::::::::::::::::');
        throw error;
    }
});
exports.getIdResume = getIdResume;
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
const getResume = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resume = yield resumeModel_1.Resume.findByPk(id);
        if (!resume) {
            logging_1.default.warning('Resume not found!');
            return null;
        }
        const [technologies, experience, courses, schooling] = yield Promise.all([
            technologiesModel_1.Tech.findAll({
                where: {
                    id_resume: {
                        [sequelize_1.Op.eq]: id
                    }
                }
            }),
            experienceModel_1.Expe.findAll({
                where: {
                    id_expe: {
                        [sequelize_1.Op.eq]: id
                    }
                }
            }),
            coursesModel_1.Course.findAll({
                where: {
                    id_course: {
                        [sequelize_1.Op.eq]: id
                    }
                }
            }),
            schoolingModel_1.Schooling.findAll({
                where: {
                    id_sch: {
                        [sequelize_1.Op.eq]: id
                    }
                }
            })
        ]);
        const check = (0, checkEmptyResults_1.checkEmptyResults)([technologies, experience, courses, schooling]);
        if (check) {
            logging_1.default.warning('Data not found!');
            return null;
        }
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
 */
const createResume = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resume = yield resumeModel_1.Resume.create(data);
        if (!resume) {
            logging_1.default.warning(':::::::::::::::::::::::');
            logging_1.default.warning('Record not made!');
            logging_1.default.warning(':::::::::::::::::::::::');
            return null;
        }
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
