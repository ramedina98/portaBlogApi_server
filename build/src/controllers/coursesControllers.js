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
exports.insertNewCourseRecordResponse = exports.getCoursesResponse = void 0;
const coursesServices_1 = require("../services/coursesServices");
/**
 * @method get
 * This controller helps me to manage the get Courses Service and get data from the
 * table, data related to a specific user...
 */
const getCoursesResponse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_user } = req.body;
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
        const { id_user, courses_data } = req.body;
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
