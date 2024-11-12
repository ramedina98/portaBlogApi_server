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
exports.updateAResumeRecordResponse = exports.createResumeResponse = exports.getResumeResponse = void 0;
const resumeServices_1 = require("../services/resumeServices");
const jwtUtils_1 = require("../utils/jwtUtils");
const IJwtPayload_1 = require("../interfaces/IJwtPayload");
/**
 * @ResumeControllers ...
 */
/**
 * this controller helps me to handle the getResume service and return
 * information related to a specific resume
 * */
const getResumeResponse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.body;
        //decode the token...
        const decodedToken = (0, jwtUtils_1.extractJwtInfo)(token, IJwtPayload_1.JwtFields.ID);
        if (decodedToken === null) {
            res.status(404).json({
                error: 'Received token is invalid or expired',
            });
            return;
        }
        const id_user = decodedToken;
        const resumeData = yield (0, resumeServices_1.getResume)(id_user);
        if (typeof resumeData === 'number') {
            let message = '';
            if (resumeData === 1) {
                message = 'User does not exist';
            }
            else if (resumeData === 2) {
                message = 'User does not have a resume attached jet';
            }
            else if (resumeData === 3) {
                message = 'Data not found';
            }
            res.status(404).json({ message });
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
        const { token, resumeData } = req.body;
        const decodedToken = (0, jwtUtils_1.extractJwtInfo)(token, IJwtPayload_1.JwtFields.ID);
        if (decodedToken === null) {
            res.status(404).json({
                error: 'Received token is invalid or expired',
            });
            return;
        }
        const id_user = decodedToken;
        const resume = yield (0, resumeServices_1.createResume)(id_user, resumeData);
        if (resume === null) {
            res.status(404).json({ message: 'Record not made!' });
        }
        res.status(200).json({ message: resume });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' + error.message });
    }
});
exports.createResumeResponse = createResumeResponse;
/**
 * This controller helps me to hadle all the process to update an specesific record in the resume table...
 */
const updateAResumeRecordResponse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_resume, resumeData } = req.body;
        const updateResume = yield (0, resumeServices_1.updateAResumeRecord)(id_resume, resumeData);
        if (updateResume === null) {
            res.status(404).json({ message: 'Record not found!' });
        }
        res.status(200).json({ message: updateResume });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' + error.message });
    }
});
exports.updateAResumeRecordResponse = updateAResumeRecordResponse;
