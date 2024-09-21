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
exports.updateASchoolingRecordResponse = exports.insertNewSchoolingDataResponse = exports.getSchoolingDataResponse = void 0;
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
        const schooling = yield (0, schoolingServices_1.insertNewSchoolingData)(id, schooling_data);
        if (typeof schooling === 'number') {
            let message = '';
            if (schooling === 1) {
                message = 'User does not exist';
            }
            else if (schooling === 2) {
                message = 'User does not have a resume attached jet';
            }
            else if (schooling === 3) {
                message = 'Unable to register';
            }
            res.status(404).json({ message });
        }
        res.status(200).json({ message: 'Successfuly registration of schooling data' });
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
