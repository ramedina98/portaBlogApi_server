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
    toggleSeveralDeleteSchRecordsResponse
} from "../controllers/schoolingControllers";

const schoolingRouter = Router();

// GET...
schoolingRouter.get('/', getSchoolingDataResponse);
// POT...
schoolingRouter.post('/new', insertNewSchoolingDataResponse);
// PUT...
schoolingRouter.put('/update', updateASchoolingRecordResponse);
// PATCH...
schoolingRouter.patch('/delete-status', toggleSeveralDeleteSchRecordsResponse);

export default schoolingRouter;