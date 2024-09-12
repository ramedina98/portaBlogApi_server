// here I have all the routes of the endpoint resume...
import { Router } from "express";
import { getResumeResponse, getIdResumeResponse, createResumeResponse } from "../controllers/resumeControllers";

const resumeRoutes = Router();

// GET
resumeRoutes.get('/resume-by-user', getIdResumeResponse)
resumeRoutes.get('/:id', getResumeResponse);
// POST
resumeRoutes.post('/create', createResumeResponse);

export default resumeRoutes;