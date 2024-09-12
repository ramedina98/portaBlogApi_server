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
exports.createResumeResponse = exports.getResumeResponse = exports.getIdResumeResponse = void 0;
const resumeServices_1 = require("../services/resumeServices");
/**
 * This controller helps me to get the id of a resume searching by user_id...
 */
const getIdResumeResponse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const resumeId = yield (0, resumeServices_1.getIdResume)(id);
        if (resumeId === null) {
            res.status(404).json({ message: 'Id not found' });
        }
        res.status(200).json({ message: 'Successfully obtained!', resumeId });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' + error.message });
    }
});
exports.getIdResumeResponse = getIdResumeResponse;
/**
 * this controller helps me to handle the getResume service and return
 * information related to a specific resume
 * */
const getResumeResponse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const resumeData = yield (0, resumeServices_1.getResume)(id);
        // if the response is null...
        if (resumeData === null) {
            res.status(404).json({ message: 'Resume not found' });
        }
        res.status(200).json({ message: 'Successfully obtained!', resumeData });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' + error.message });
    }
});
exports.getResumeResponse = getResumeResponse;
/**
 * This controller helps me to handle the createResume service, this to
 * create a resume record for a specific user...
 */
const createResumeResponse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { resumeData } = req.body;
        const data = resumeData;
        const resume = yield (0, resumeServices_1.createResume)(data);
        if (resume === null) {
            res.status(404).json({ message: 'Record not made!' });
        }
        res.status(200).json({ message: 'Successfully registration' });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' + error.message });
    }
});
exports.createResumeResponse = createResumeResponse;
