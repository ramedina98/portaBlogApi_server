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
exports.toggleSeveralDeleteTechRecordsResponse = exports.updateATechRecordResponse = exports.insertNewTechnologieResponse = exports.getTechnologiesResponse = void 0;
const jwtUtils_1 = require("../utils/jwtUtils");
const IJwtPayload_1 = require("../interfaces/IJwtPayload");
const technologiesServices_1 = require("../services/technologiesServices");
/**
 * @GetTechsController --> This controller helps me to manage the
 * geTechnologiesService and get data from the table, data related to a specific user.
 */
const getTechnologiesResponse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.body;
        const decodedToken = (0, jwtUtils_1.extractJwtInfo)(token, IJwtPayload_1.JwtFields.ID);
        if (decodedToken === null) {
            res.status(404).json({
                error: 'Received token is invalid or expired',
            });
            return;
        }
        const id_user = decodedToken;
        const technologies = yield (0, technologiesServices_1.getTechnologies)(id_user);
        if (typeof technologies === 'number') {
            let message = '';
            if (technologies === 1) {
                message = 'User does not exist';
            }
            else if (technologies === 2) {
                message = 'User does not have a resume attached jet';
            }
            else if (technologies === 3) {
                message = 'Technologies not found';
            }
            res.status(404).json({ message });
        }
        res.status(200).json({ message: 'Successfully', technologies });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' + error.message });
    }
});
exports.getTechnologiesResponse = getTechnologiesResponse;
/**
 * @MethodGET --> This controller helps me to handle the creation of new records in the technologies table...
 *
 * The frontend only needs to send the next:
 * @reqBody tech_data --> "name_tech / icon_tech"
 * @reqBody id_user
 */
const insertNewTechnologieResponse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token, tech_data } = req.body;
        const decodedToken = (0, jwtUtils_1.extractJwtInfo)(token, IJwtPayload_1.JwtFields.ID);
        if (decodedToken === null) {
            res.status(404).json({
                error: 'Received token is invalid or expired',
            });
            return;
        }
        const id_user = decodedToken;
        // the tech_data object array is empty, let the user knows...
        if (tech_data.length === 0) {
            res.status(400).json({ message: 'No new technology has been received for storage!' });
        }
        const tech = yield (0, technologiesServices_1.insertNewTchRecords)(id_user, tech_data);
        if (typeof tech === 'number') {
            let message = '';
            if (tech === 1) {
                message = 'User does not exist';
            }
            else if (tech === 2) {
                message = 'User does not have a resume attached jet';
            }
            else if (tech === 3) {
                message = 'No registration was made';
            }
            res.status(404).json({ message });
        }
        res.status(200).json({ message: tech });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' + error.message });
    }
});
exports.insertNewTechnologieResponse = insertNewTechnologieResponse;
/**
 * @UpdateATechController --> this controller helps me handle the UpdateATech service, to update a specific
 * record in the technologies table...
 * @param id_tec
 * @param tech_data --> this has the name and icon...
 */
const updateATechRecordResponse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_tech, tech_data } = req.body;
        // the tech_data object array is empty, let the user knows...
        if (!tech_data) {
            res.status(400).json({ message: 'No new technology has been received for update!' });
        }
        const tech = yield (0, technologiesServices_1.updateATechRecord)(id_tech, tech_data);
        if (typeof tech === 'number') {
            let message = tech === 1 ? 'Tech does not exists' : tech === 2 ? 'Registration not updated, an error occurred' : 'Unknow error';
            res.status(404).json({ message });
        }
        res.status(200).json({ message: tech });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error: ' + error.message });
    }
});
exports.updateATechRecordResponse = updateATechRecordResponse;
/**
 * @method patch
 *
 * This controller helps me to handle the toggle several delete Tech status records, receiveing an array
 * with the ids of the records to be toggle...
 *
 * @param tech_id --> an array...
 */
const toggleSeveralDeleteTechRecordsResponse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tech_ids } = req.body;
        if (!tech_ids || tech_ids.length === 0) {
            res.status(400).json({ message: "No tecnologies IDs provided!" });
        }
        // call the function...
        const tech = yield (0, technologiesServices_1.toggleSeveralDeleteTechRecords)(tech_ids);
        // if everything is ok, returns a success response
        res.status(200).json({ message: 'Technologies records updated successfully', details: tech });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error: ' + error.message });
    }
});
exports.toggleSeveralDeleteTechRecordsResponse = toggleSeveralDeleteTechRecordsResponse;
