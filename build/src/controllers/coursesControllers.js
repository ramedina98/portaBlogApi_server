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
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleDeleteCourseResponse = exports.updateACourseRecordResponse = exports.insertNewCourseRecordResponse = exports.getCoursesResponse = void 0;
const IJwtPayload_1 = require("../interfaces/IJwtPayload");
const jwtUtils_1 = require("../utils/jwtUtils");
const coursesServices_1 = require("../services/coursesServices");
/**
 * @method get
 * This controller helps me to manage the get Courses Service and get data from the
 * table, data related to a specific user...
 */
const getCoursesResponse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // extract the token...
        const { token } = req.body;
        // decoded the token...
        const decodedToken = (0, jwtUtils_1.extractJwtInfo)(token, IJwtPayload_1.JwtFields.ID);
        if (decodedToken === null) {
            res.status(404).json({
                error: 'Received token is invalid or expired',
            });
            return;
        }
        const id_user = decodedToken;
        const courses = yield (0, coursesServices_1.getCourses)(id_user);
        if (typeof courses === 'number') {
            let message = '';
            if (courses === 1) {
                message = 'User does not exist';
            }
            else if (courses === 2) {
                message = 'User does not have a resume attached jet';
            }
            else if (courses === 3) {
                message = 'Technologies not found';
            }
            res.status(400).json({ message });
        }
        res.status(200).json({ message: 'Successfully', courses });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' + error.message });
    }
});
exports.getCoursesResponse = getCoursesResponse;
/**
 * @method post
 * This controller helps me to handle the creation of new records in the courses table...
 *
 * The frontend onle needs to send the next:
 * @reqBody courses_data
 * @reqBody id_user
 */
const insertNewCourseRecordResponse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token, courses_data } = req.body;
        // decode the token...
        const decodedToken = (0, jwtUtils_1.extractJwtInfo)(token, IJwtPayload_1.JwtFields.ID);
        if (decodedToken === null) {
            res.status(404).json({
                error: 'Received token is invalid or expired',
            });
            return;
        }
        const id_user = decodedToken;
        // the course data object array is empty, let the user knows...
        if (courses_data.length === 0) {
            res.status(400).json({ message: 'No new courses has been received for storage!' });
        }
        const course = yield (0, coursesServices_1.insertNewCourseRecord)(id_user, courses_data);
        if (typeof course === 'number') {
            let message = '';
            if (course === 1) {
                message = 'User does not exist';
            }
            else if (course === 2) {
                message = 'User does not have a resume attached jet';
            }
            else if (course === 3) {
                message = 'No registration was made';
            }
            res.status(404).json({ message });
        }
        res.status(200).json({ message: course });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' + error.message });
    }
});
exports.insertNewCourseRecordResponse = insertNewCourseRecordResponse;
/**
 * @method PUT
 *
 * this controller helps me with the process of update a register of a cuourse...
 *
 * @reqBody courses_data
 * @reqBody id_course
 */
const updateACourseRecordResponse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_course, course_data } = req.body;
        // if the course data object array is empty, let the client knows...
        if (!course_data) {
            res.status(400).json({
                message: 'No new course has been received for update!'
            });
        }
        const course = yield (0, coursesServices_1.updateACourseRecord)(id_course, course_data);
        if (typeof course === 'number') {
            let message = course === 1 ? 'Course does not exists' : course === 2 ? 'Registration not updated, an error occurred' : 'Unknow error';
            res.status(404).json({ message });
        }
        res.status(200).json({ message: course });
    }
    catch (error) {
        res.status(500).json({ message: `Internal server error: ${error.message}` });
    }
});
exports.updateACourseRecordResponse = updateACourseRecordResponse;
/**
 * @method PATCH
 *
 * this controller helps me with the process of change the status of the deleted courses...
 *
 * @param id_course []
 */
const toggleDeleteCourseResponse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { courses_ids } = req.body;
        if (!courses_ids || courses_ids.length === 0) {
            res.status(400).json({ message: "No courses IDs provided!" });
        }
        // call the function...
        const courses = yield (0, coursesServices_1.toggleDeleteCourse)(courses_ids);
        // if everything went well, returns a success message...
        res.status(200).json({
            message: 'Courses records updated successfully.',
            details: courses
        });
    }
    catch (error) {
        res.status(500).json({ error: `Internal server error: ${error.message}` });
    }
});
exports.toggleDeleteCourseResponse = toggleDeleteCourseResponse;
