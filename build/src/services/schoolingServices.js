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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSchoolingData = void 0;
const resumeModulesUtilF_1 = require("../utils/resumeModulesUtilF");
const schoolingModel_1 = require("../models/mysql/schoolingModel");
const resumeModulesUtilF_2 = require("../utils/resumeModulesUtilF");
const sequelize_1 = require("sequelize");
const logging_1 = __importDefault(require("../config/logging"));
/**
 * @method GET
 *
 * This service helps me to reach all the record realted to a specific user resume in the schooling table...
 *
 * @param id --> this is the user id...
 *
 * @async --> it returns a ISchooling array object...
 */
const getSchoolingData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // first I have to check if the user exisits...
        const verification = yield (0, resumeModulesUtilF_2.userResumeVerifier)(id);
        /**
         * If the id resume field is undefine, then it only returns the response number,
         * which the controller will already know how to handle it...
         */
        if (verification.id_resume === undefined) {
            return verification.num_response;
        }
        /**
         * if everything is correct, I have to search all the records with that have the
         * same value in the id_resume field...
         * */
        const schooling = yield schoolingModel_1.Schooling.findAll({
            where: {
                id_resume: {
                    [sequelize_1.Op.eq]: verification.id_resume
                }
            },
            attributes: {
                exclude: ['id_resume']
            }
        });
        if (schooling.length === 0) {
            logging_1.default.warning(':::::::::::::::::::::::');
            logging_1.default.warning(`Schooling data not found with resume id: ${verification.id_resume}`);
            logging_1.default.warning(':::::::::::::::::::::::');
            return 3;
        }
        (0, resumeModulesUtilF_1.loggingInfo)(`Schooling data found! ${schooling.length}`);
        return schooling;
    }
    catch (error) {
        logging_1.default.warn('::::::::::::::::::::::::::::::::');
        logging_1.default.error('Error: ' + error.message);
        logging_1.default.warn('::::::::::::::::::::::::::::::::');
        throw error;
    }
});
exports.getSchoolingData = getSchoolingData;
