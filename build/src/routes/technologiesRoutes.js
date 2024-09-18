"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @TechRoutes
 * This file has all the needed routes to handle the technologies endpoint...
 */
const express_1 = require("express");
const technologiesControllers_1 = require("../controllers/technologiesControllers");
const techRoutes = (0, express_1.Router)();
// GET...
techRoutes.get('/', technologiesControllers_1.getTechnologiesResponse);
//POST...
techRoutes.post('/newtech', technologiesControllers_1.insertNewTechnologieResponse);
exports.default = techRoutes;
