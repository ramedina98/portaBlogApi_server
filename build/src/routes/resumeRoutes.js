"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// here I have all the routes of the endpoint resume...
const express_1 = require("express");
const resumeControllers_1 = require("../controllers/resumeControllers");
const resumeRoutes = (0, express_1.Router)();
// GET
resumeRoutes.get('/resume-by-user', resumeControllers_1.getIdResumeResponse);
resumeRoutes.get('/:id', resumeControllers_1.getResumeResponse);
// POST
resumeRoutes.post('/create', resumeControllers_1.createResumeResponse);
exports.default = resumeRoutes;
