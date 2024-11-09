/**
 * @module resume
 * here I have all the routes of the endpoint resume...
 */
import { Router } from "express";
import {
    getResumeResponse,
    createResumeResponse,
    updateAResumeRecordResponse,
} from "../controllers/resumeControllers";

const resumeRoutes = Router();

// GET
resumeRoutes.get('/', getResumeResponse);
// POST
resumeRoutes.post('/create', createResumeResponse);
// PUT
resumeRoutes.put('/update', updateAResumeRecordResponse);

export default resumeRoutes;