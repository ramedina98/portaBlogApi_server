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
exports.updateATechRecordResponse = exports.insertNewTechnologieResponse = exports.getTechnologiesResponse = void 0;
const technologiesServices_1 = require("../services/technologiesServices");
/**
 * @GetTechsController --> This controller helps me to manage the
 * geTechnologiesService and get data from the table, data related to a specific user.
 */
const getTechnologiesResponse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_user } = req.body;
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
        const { id_user, tech_data } = req.body;
        const tech = yield (0, technologiesServices_1.insertNewTechnologie)(id_user, tech_data);
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
        const { id_tec, tech_data } = req.body;
        const tech = yield (0, technologiesServices_1.updateATechRecord)(id_tec, tech_data);
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
