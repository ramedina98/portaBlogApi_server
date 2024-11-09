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
exports.toggleDeleteCourse = exports.updateACourseRecord = exports.insertNewCourseRecord = exports.getCourses = void 0;
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
/**
 * @method post
 *
 * This service helps me to create new records in the courses table...
 *
 * @param id_user
 * @param course_data --> this is an object array, that contains all the records...
 *
 * @return --> a message of success or a number indicating if an specific error, controller knows
 * how to handle the number returned...
 */
const insertNewCourseRecord = (id_user, course_data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        /**
         * Check if the user exists, if the user does not exists retunr a number (1 = user does not exists), then if the user exists check if
         * they have an attached resume, if they don't have one, return an error (2 = user does not have an attached resume)...
         */
        const verification = yield (0, resumeModulesUtilF_1.userResumeVerifier)(id_user);
        // if user does not exists or the user does not have an attached resum, return an error number...
        // controller knows how to handle with the number...
        if (verification.id_resume === undefined) {
            return verification.num_response;
        }
        // transfer the value of the id_resume to a number varible...
        const id_resume = verification.id_resume;
        // make the registers...
        const courses_results = yield Promise.all(course_data.map((data) => __awaiter(void 0, void 0, void 0, function* () {
            const course = yield coursesModel_1.Course.create(Object.assign(Object.assign({}, data), { id_resume }));
            return course;
        })));
        // if there is a record that was not made...
        if (courses_results.length < course_data.length) {
            logging_1.default.warning('::::::::::::::::::::::::::::::');
            logging_1.default.warning(`There were ${courses_results.length - course_data.length} records missing`);
            logging_1.default.warning('::::::::::::::::::::::::::::::');
            return 3;
        }
        (0, resumeModulesUtilF_1.loggingInfo)('All registrations were successful');
        return `All registrations were successfully: ${courses_results.length}`;
    }
    catch (error) {
        logging_1.default.warn('::::::::::::::::::::::::::::::::');
        logging_1.default.error('Error: ' + error.message);
        logging_1.default.warn('::::::::::::::::::::::::::::::::');
        throw error;
    }
});
exports.insertNewCourseRecord = insertNewCourseRecord;
/**
 * @method put
 * This service helps me to update a record in the courses table...
 *
 * @param id_course
 * @param courses_data
 */
const updateACourseRecord = (id_course, course_data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkCourseExists = yield coursesModel_1.Course.findByPk(id_course);
        if (!checkCourseExists) {
            logging_1.default.warning(':::::::::::::::::::::::::');
            logging_1.default.warning(`Course with the id ${id_course} does not exists!`);
            logging_1.default.warning(':::::::::::::::::::::::::');
            return 1;
        }
        const course = yield coursesModel_1.Course.update({
            course_title: course_data.course_title,
            text_course: course_data.text_course,
            provider: course_data.provider,
            start_date: course_data.start_date,
            end_date: course_data.end_date
        }, {
            where: {
                id_course: id_course
            }
        });
        if (course.length === 0) {
            logging_1.default.warning(':::::::::::::::::::::::::');
            logging_1.default.warning('Registration not updated, an error occurred');
            logging_1.default.warning(':::::::::::::::::::::::::');
            return 2;
        }
        (0, resumeModulesUtilF_1.loggingInfo)(`Successfuly technology update: ${course_data.course_title}`);
        return `Successfuly technology update: ${course_data.course_title}`;
    }
    catch (error) {
        logging_1.default.warn('::::::::::::::::::::::::::::::::');
        logging_1.default.error('Error: ' + error.message);
        logging_1.default.warn('::::::::::::::::::::::::::::::::');
        throw error;
    }
});
exports.updateACourseRecord = updateACourseRecord;
/**
 * @method PATCH
 *
 * This service helps me to toggle the "delete_course" field, this to mark
 * and item as active or inactive...
 * @param id_course
 * @method patch
 */
const toggleDeleteCourse = (id_course) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // check if the courses recrods exists and update them all...
        const checkCoursesRecords = yield Promise.all(id_course.map((id) => __awaiter(void 0, void 0, void 0, function* () {
            const record = yield coursesModel_1.Course.findByPk(id); // search each record by its id...
            if (!record) {
                logging_1.default.warning('::::::::::::::::::::::::::::::::::::::::::::::::::::');
                logging_1.default.warning(`Course record with id ${id} does not exists.`);
                logging_1.default.warning('::::::::::::::::::::::::::::::::::::::::::::::::::::');
                throw new Error(`Course record with id ${id} does not exists.`);
            }
            // toggle the delete status...
            const newStatus = !record.course_deleted;
            yield record.update({ course_deleted: newStatus });
            (0, resumeModulesUtilF_1.loggingInfo)(`Record with id ${id} update successfully!`);
            return `Course delete status "${record.delete_tech}" updated successfully!`;
        })));
        (0, resumeModulesUtilF_1.loggingInfo)(`All records update successfully: ${checkCoursesRecords.join(',')}`);
        return checkCoursesRecords;
    }
    catch (error) {
        logging_1.default.warn('::::::::::::::::::::::::::::::::');
        logging_1.default.error('Error: ' + error.message);
        logging_1.default.warn('::::::::::::::::::::::::::::::::');
        throw error;
    }
});
exports.toggleDeleteCourse = toggleDeleteCourse;
