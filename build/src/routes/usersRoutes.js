"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// here we have all the users routes...
const express_1 = require("express");
const usersControllers_1 = require("../controllers/usersControllers");
const userRoutes = (0, express_1.Router)();
// GET
userRoutes.get('/login', usersControllers_1.loginSession);
userRoutes.get('/:id', usersControllers_1.getUser);
//PUT
userRoutes.put('/updateuser', usersControllers_1.putUpdatedUserInfo);
exports.default = userRoutes;
