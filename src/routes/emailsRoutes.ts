// here we have all the emails routes...
import { Router } from "express";
import { AllEmailsResponse } from "../controllers/emailsControllers";

const emailRoutes = Router();

emailRoutes.get('/allemails', AllEmailsResponse);

export default emailRoutes;