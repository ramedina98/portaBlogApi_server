"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @module resume
 * here I have all the routes of the endpoint resume...
 */
const express_1 = require("express");
const resumeControllers_1 = require("../controllers/resumeControllers");
const resumeRoutes = (0, express_1.Router)();
// GET
resumeRoutes.get('/', resumeControllers_1.getResumeResponse);
// POST
resumeRoutes.post('/create', resumeControllers_1.createResumeResponse);
// PUT
resumeRoutes.put('/update', resumeControllers_1.updateAResumeRecordResponse);
exports.default = resumeRoutes;
