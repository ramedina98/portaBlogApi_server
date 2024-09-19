/**
 * @TechRoutes
 * This file has all the needed routes to handle the technologies endpoint...
 */
import { Router } from "express";
import {
    getTechnologiesResponse,
    insertNewTechnologieResponse,
    updateATechRecordResponse
} from "../controllers/technologiesControllers";

const techRoutes = Router();

// GET...
techRoutes.get('/', getTechnologiesResponse);
//POST...
techRoutes.post('/newtech', insertNewTechnologieResponse);
// PUT...
techRoutes.put('/update', updateATechRecordResponse);

export default techRoutes;