// here we have all the emails routes...
import { Router } from "express";
import {
    AllEmailsResponse,
    AllEmailsSentResponse,
    AnEmailResponse,
    insertEmailResponse,
    updateAnEmailResponse,
    updateAllEmailsFalseToTrueResponse,
    deleteAnEmailResponse
} from "../controllers/emailsControllers";

const emailRoutes = Router();

// GET
emailRoutes.get('/received', AllEmailsResponse);
emailRoutes.get('/sent', AllEmailsSentResponse);
emailRoutes.get('/:id_email', AnEmailResponse);
// POST
emailRoutes.post('/newemail', insertEmailResponse);
// PATCH
emailRoutes.patch('/:id/toggle-read', updateAnEmailResponse);
emailRoutes.patch('/mark-unread', updateAllEmailsFalseToTrueResponse);
//DELETE
emailRoutes.delete('/delete', deleteAnEmailResponse);

export default emailRoutes;