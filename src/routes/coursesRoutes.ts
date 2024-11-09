/**
 * @module courses
 *
 * in this file we can find all the needed courses module routes...
 */
import { Router } from "express";
import {
    getCoursesResponse,
    insertNewCourseRecordResponse,
    updateACourseRecordResponse,
    toggleDeleteCourseResponse
} from "../controllers/coursesControllers";

const courseRouter = Router();

// GET...
courseRouter.get('/', getCoursesResponse);
// POST...
courseRouter.post('/newcourse', insertNewCourseRecordResponse);
//PUT...
courseRouter.put('/update-course', updateACourseRecordResponse);
//PATCH...
courseRouter.patch('/delete-status', toggleDeleteCourseResponse);

export default courseRouter;