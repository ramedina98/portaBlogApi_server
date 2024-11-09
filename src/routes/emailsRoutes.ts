/**
 * @module Emails
 * here we have all the emails routes...
 */
import { Router } from "express";
import {
    AllEmailsResponse,
    AllEmailsSentResponse,
    AnEmailResponse,
    insertEmailResponse,
    updateAnEmailResponse,
    updateAllEmailsTrueToFalseResponse,
    deleteAnEmailResponse,
    deleteSeveralEmailsResponse
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
emailRoutes.patch('/mark-unread', updateAllEmailsTrueToFalseResponse);
//DELETE
emailRoutes.delete('/delete', deleteAnEmailResponse);
emailRoutes.delete('/delete-multiple', deleteSeveralEmailsResponse);

export default emailRoutes;