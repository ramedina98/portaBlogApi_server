/**
 * @module schooling
 *
 * This file contains all the needed schooling endpoint routes...
 */
import { Router } from "express";
import {
    getSchoolingDataResponse,
    insertNewSchoolingDataResponse,
    updateASchoolingRecordResponse,
    toggleDeleteSchoolingStatusResponse
} from "../controllers/schoolingControllers";

const schoolingRouter = Router();

// GET...
schoolingRouter.get('/', getSchoolingDataResponse);
// POT...
schoolingRouter.post('/new', insertNewSchoolingDataResponse);
// PUT...
schoolingRouter.put('/update', updateASchoolingRecordResponse);
// PATCH...
schoolingRouter.patch('/:id/deletetech-status', toggleDeleteSchoolingStatusResponse);

export default schoolingRouter;