"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @module schooling
 *
 * This file contains all the needed schooling endpoint routes...
 */
const express_1 = require("express");
const schoolingControllers_1 = require("../controllers/schoolingControllers");
const schoolingRouter = (0, express_1.Router)();
// GET...
schoolingRouter.get('/', schoolingControllers_1.getSchoolingDataResponse);
exports.default = schoolingRouter;
