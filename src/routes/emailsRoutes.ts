// here we have all the emails routes...
import { Router } from "express";
import { AllEmailsResponse, AllEmailsSentResponse, AnEmailResponse } from "../controllers/emailsControllers";

const emailRoutes = Router();

emailRoutes.get('/received', AllEmailsResponse);
emailRoutes.get('/sent', AllEmailsSentResponse);
emailRoutes.get('/:id_email', AnEmailResponse);

export default emailRoutes;