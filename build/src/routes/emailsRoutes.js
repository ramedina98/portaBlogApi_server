"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// here we have all the emails routes...
const express_1 = require("express");
const emailsControllers_1 = require("../controllers/emailsControllers");
const emailRoutes = (0, express_1.Router)();
emailRoutes.get('/allemails', emailsControllers_1.AllEmailsResponse);
exports.default = emailRoutes;
