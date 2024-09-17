/**
 * @TechRoutes
 * This file has all the needed routes to handle the technologies endpoint...
 */
import { Router } from "express";
import { getTechnologiesResponse } from "../controllers/technologiesControllers";

const techRoutes = Router();

// GET...
techRoutes.get('/', getTechnologiesResponse);

export default techRoutes;