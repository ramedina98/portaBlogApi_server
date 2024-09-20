/**
 * @module schooling
 *
 * This file contains all the needed schooling endpoint routes...
 */
import { Router } from "express";
import { getSchoolingDataResponse } from "../controllers/schoolingControllers";

const schoolingRouter = Router();

// GET...
schoolingRouter.get('/', getSchoolingDataResponse);

export default schoolingRouter;