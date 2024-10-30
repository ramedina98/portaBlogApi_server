// in this file we can find all the needed courses module routes...
import { Router } from "express";
import {
    getCoursesResponse,
    insertNewCourseRecordResponse
} from "../controllers/coursesControllers";

const courseRouter = Router();

// GET...
courseRouter.get('/', getCoursesResponse);
// POST...
courseRouter.post('/newcourse', insertNewCourseRecordResponse);
export default courseRouter;