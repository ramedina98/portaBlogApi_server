"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleSeveralDeleteSchRecordsResponse = exports.toggleDeleteSchoolingStatusResponse = exports.updateASchoolingRecordResponse = exports.insertNewSchoolingDataResponse = exports.getSchoolingDataResponse = void 0;
const schoolingServices_1 = require("../services/schoolingServices");
/**
 * @method GET
 * This controller helps me to handle the getSchoolingData service, to reach all the records related to a specific
 * user resume id...
 *
 * @param id --> id_user...
 */
const getSchoolingDataResponse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const schooling = yield (0, schoolingServices_1.getSchoolingData)(id);
        if (typeof schooling === 'number') {
            let message = '';
            if (schooling === 1) {
                message = 'User does not exist';
            }
            else if (schooling === 2) {
                message = 'User does not have a resume attached jet';
            }
            else if (schooling === 3) {
                message = 'Schooling data not found';
            }
            res.status(404).json({ message });
        }
        res.status(200).json({ message: 'Schooling data obtained successfuly', schooling });
    }
    catch (error) {
        res.status(500).json({ message: `Internal server error ${error.message}` });
    }
});
exports.getSchoolingDataResponse = getSchoolingDataResponse;
/**
 * @method POST
 *
 * this controller helps me to handle the insert new record service, and create a new record in the
 * schooling table...
 *
 * @param id --> id user...
 * @param schooling_data -->
 */
const insertNewSchoolingDataResponse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, schooling_data } = req.body;
        if (schooling_data.length === 0) {
            res.status(400).json({ message: 'No data was provided' });
        }
        const schooling = yield (0, schoolingServices_1.insertNewSchRecords)(id, schooling_data);
        if (typeof schooling === 'number') {
            let message = '';
            if (schooling === 1) {
                message = 'User does not exist';
            }
            else if (schooling === 2) {
                message = 'User does not have a resume attached jet';
            }
            else if (schooling === 3) {
                message = 'Some records could not be entered into the schooling table';
            }
            res.status(404).json({ message });
        }
        res.status(200).json({ message: schooling });
    }
    catch (error) {
        res.status(500).json({ message: `Internal server error ${error.message}` });
    }
});
exports.insertNewSchoolingDataResponse = insertNewSchoolingDataResponse;
/**
 * @method PUT
 *
 * This controller helps me to handle the update a schooling record service, which update the info of a
 * rercord in the schooling table...
 *
 * @param id_sch
 * @param data_sch
 */
const updateASchoolingRecordResponse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_sch, data_sch } = req.body;
        const sch = yield (0, schoolingServices_1.updateASchoolingRecord)(id_sch, data_sch);
        if (typeof sch === 'number') {
            const message = sch === 1 ? `Schooling record does not exists with id: ${id_sch}` :
                sch === 2 ? 'Any schooling record was not update!' : 'Unknow error!';
            res.status(404).json({ message });
        }
        res.status(200).json({ message: sch });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error: ' + error.message });
    }
});
exports.updateASchoolingRecordResponse = updateASchoolingRecordResponse;
/**
 * @method PATCH
 *
 * This controller helps me to handle the toggle delete schooling status service, which update the
 * field delete_schooling, this in a specific record...
 *
 * @param id_sch
 */
const toggleDeleteSchoolingStatusResponse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // parse the id from string to number...
        const id_sch = parseInt(id);
        const sch = yield (0, schoolingServices_1.toggleDeleteSchoolingStatus)(id_sch);
        if (sch === 1) {
            res.status(404).json({ message: `Schooling record does not exists with id: ${id_sch}` });
        }
        res.status(200).json({ message: sch });
    }
    catch (error) {
        res.status(500).json({ message: `Internal server error: ${error.message}` });
    }
});
exports.toggleDeleteSchoolingStatusResponse = toggleDeleteSchoolingStatusResponse;
/**
 * @method PATCH
 *
 * This controller helps me to handle the toggle several delete sch status records, receiveing an array
 * with the ids of the records to be toggled...
 *
 * @param sch_ids --> an array
 */
const toggleSeveralDeleteSchRecordsResponse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { sch_ids } = req.body;
        if (!sch_ids || sch_ids.length === 0) {
            res.status(400).json({ message: 'No schooling IDs provided' });
        }
        // call the function...
        const sch = yield (0, schoolingServices_1.toggleSeveralDeleteSchRecords)(sch_ids);
        // if evrything is ok, returns a success response...
        res.status(200).json({ message: 'Schooling records updated successfully.', details: sch });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error: ' + error.message });
    }
});
exports.toggleSeveralDeleteSchRecordsResponse = toggleSeveralDeleteSchRecordsResponse;
