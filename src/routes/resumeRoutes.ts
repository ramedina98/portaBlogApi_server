// here I have all the routes of the endpoint resume...
import { Router } from "express";
import { getResumeResponse } from "../controllers/resumeControllers";

const resumeRoutes = Router();

// GET
resumeRoutes.get('/:id', getResumeResponse);

export default resumeRoutes;