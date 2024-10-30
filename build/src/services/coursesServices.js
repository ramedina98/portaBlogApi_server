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
exports.getCourses = void 0;
const coursesModel_1 = require("../models/mysql/coursesModel");
const sequelize_1 = require("sequelize");
const resumeModulesUtilF_1 = require("../utils/resumeModulesUtilF");
const logging_1 = __importDefault(require("../config/logging"));
/**
 * @method get
 * This service helps me to reach all the information of the courses table,
 * searching with a resume id...
 *
 * @param id_resume
 *
 * There are 3 types of message of warning, as it checks if the user exists, if the
 * user has a resume attached and if any courses have already been added to that resume...
 *
 * 1 = The user does not exists...
 * 2 = The user does not have any resume attached jet...
 * 3 = Courses not found (no course has ben added)...
 */
const getCourses = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const verification = yield (0, resumeModulesUtilF_1.userResumeVerifier)(id);
        /**
         * If the id resume field is undefine, then it only returns the response number,
         * which the controller wiull already know how to handle...
         */
        if (verification.id_resume === undefined) {
            return verification.num_response;
        }
        const courses = yield coursesModel_1.Course.findAll({
            where: {
                id_resume: {
                    [sequelize_1.Op.eq]: verification.id_resume
                }
            },
            attributes: {
                exclude: ['id_resume']
            }
        });
        if (courses.length === 0) {
            logging_1.default.warning(':::::::::::::::::::::::');
            logging_1.default.warning(`Courses not found with resume id: ${verification.id_resume}`);
            logging_1.default.warning(':::::::::::::::::::::::');
            return 3;
        }
        (0, resumeModulesUtilF_1.loggingInfo)('Courses found!');
        return courses;
    }
    catch (error) {
        logging_1.default.warn('::::::::::::::::::::::::::::::::');
        logging_1.default.error('Error: ' + error.message);
        logging_1.default.warn('::::::::::::::::::::::::::::::::');
        throw error;
    }
});
exports.getCourses = getCourses;
