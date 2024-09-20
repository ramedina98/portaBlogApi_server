/**
 * @module schooling
 *
 * This file contains all the needed schooling endpoint routes...
 */
import { Router } from "express";
import {
    getSchoolingDataResponse,
    insertNewSchoolingDataResponse
} from "../controllers/schoolingControllers";

const schoolingRouter = Router();

// GET...
schoolingRouter.get('/', getSchoolingDataResponse);
// PUT...
schoolingRouter.post('/new', insertNewSchoolingDataResponse);

export default schoolingRouter;