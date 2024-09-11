"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// here we have all the emails routes...
const express_1 = require("express");
const emailsControllers_1 = require("../controllers/emailsControllers");
const emailRoutes = (0, express_1.Router)();
// GET
emailRoutes.get('/received', emailsControllers_1.AllEmailsResponse);
emailRoutes.get('/sent', emailsControllers_1.AllEmailsSentResponse);
emailRoutes.get('/:id_email', emailsControllers_1.AnEmailResponse);
// POST
emailRoutes.post('/newemail', emailsControllers_1.insertEmailResponse);
// PATCH
emailRoutes.patch('/:id/toggle-read', emailsControllers_1.updateAnEmailResponse);
emailRoutes.patch('/mark-unread', emailsControllers_1.updateAllEmailsFalseToTrueResponse);
//DELETE
emailRoutes.delete('/delete', emailsControllers_1.deleteAnEmailResponse);
exports.default = emailRoutes;
