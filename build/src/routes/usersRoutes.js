"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// here we have all the users routes...
const express_1 = require("express");
const usersControllers_1 = require("../controllers/usersControllers");
const userRoutes = (0, express_1.Router)();
userRoutes.get('/userinfo', usersControllers_1.getUser);
exports.default = userRoutes;
