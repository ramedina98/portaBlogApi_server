// here I have all the routes of the endpoint resume...
import { Router } from "express";
import {
    getResumeResponse,
    getIdResumeResponse,
    createResumeResponse,
    updateAResumeRecordResponse,
} from "../controllers/resumeControllers";

const resumeRoutes = Router();

// GET
resumeRoutes.get('/:id', getResumeResponse);
resumeRoutes.get('/resume-by-user', getIdResumeResponse);
// POST
resumeRoutes.post('/create', createResumeResponse);
// PUT
resumeRoutes.put('/update', updateAResumeRecordResponse);

export default resumeRoutes;