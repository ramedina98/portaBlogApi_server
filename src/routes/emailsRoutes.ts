// here we have all the emails routes...
import { Router } from "express";
import { AllEmailsResponse,
    AllEmailsSentResponse,
    AnEmailResponse,
    insertEmailResponse }
    from "../controllers/emailsControllers";

const emailRoutes = Router();

// GET
emailRoutes.get('/received', AllEmailsResponse);
emailRoutes.get('/sent', AllEmailsSentResponse);
emailRoutes.get('/:id_email', AnEmailResponse);
// POST
emailRoutes.post('/newemail', insertEmailResponse);

export default emailRoutes;