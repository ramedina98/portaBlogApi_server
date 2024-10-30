// in this file we can find all the needed courses module routes...
import { Router } from "express";
import {
    getCoursesResponse
} from "../controllers/coursesControllers";

const courseRouter = Router();

// GET...
courseRouter.get('/', getCoursesResponse);

export default courseRouter;