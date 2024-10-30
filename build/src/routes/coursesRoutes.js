"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// in this file we can find all the needed courses module routes...
const express_1 = require("express");
const coursesControllers_1 = require("../controllers/coursesControllers");
const courseRouter = (0, express_1.Router)();
// GET...
courseRouter.get('/', coursesControllers_1.getCoursesResponse);
exports.default = courseRouter;
