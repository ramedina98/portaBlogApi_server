"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @module technologies
 * @TechRoutes
 * This file has all the needed routes to handle the technologies endpoint...
 */
const express_1 = require("express");
const technologiesControllers_1 = require("../controllers/technologiesControllers");
const techRoutes = (0, express_1.Router)();
// GET...
techRoutes.get('/', technologiesControllers_1.getTechnologiesResponse);
// POST...
techRoutes.post('/newtech', technologiesControllers_1.insertNewTechnologieResponse);
// PUT...
techRoutes.put('/update', technologiesControllers_1.updateATechRecordResponse);
// PATCH
techRoutes.patch('/:id/deletetech-status', technologiesControllers_1.toggleDeleteTechStatus);
techRoutes.patch('/delete-status', technologiesControllers_1.toggleSeveralDeleteTechRecordsResponse);
exports.default = techRoutes;
