/**
 * @TechRoutes
 * This file has all the needed routes to handle the technologies endpoint...
 */
import { Router } from "express";
import {
    getTechnologiesResponse,
    insertNewTechnologieResponse
} from "../controllers/technologiesControllers";

const techRoutes = Router();

// GET...
techRoutes.get('/', getTechnologiesResponse);
//POST...
techRoutes.post('/newtech', insertNewTechnologieResponse);

export default techRoutes;