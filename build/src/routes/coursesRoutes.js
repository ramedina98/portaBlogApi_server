"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @module courses
 *
 * in this file we can find all the needed courses module routes...
 */
const express_1 = require("express");
const coursesControllers_1 = require("../controllers/coursesControllers");
const courseRouter = (0, express_1.Router)();
// GET...
courseRouter.get('/', coursesControllers_1.getCoursesResponse);
// POST...
courseRouter.post('/newcourse', coursesControllers_1.insertNewCourseRecordResponse);
//PUT...
courseRouter.put('/update-course', coursesControllers_1.updateACourseRecordResponse);
//PATCH...
courseRouter.patch('/delete-status', coursesControllers_1.toggleDeleteCourseResponse);
exports.default = courseRouter;
