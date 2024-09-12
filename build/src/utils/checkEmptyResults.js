"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkEmptyResults = void 0;
// This utils helps me to check if there is any empty result...
const logging_1 = __importDefault(require("../config/logging"));
const checkEmptyResults = (results) => {
    const [technologies, experience, courses, schooling] = results;
    if (!technologies || technologies.length === 0) {
        logging_1.default.warning('No technologies were found.');
        return true;
    }
    if (!experience || experience.length === 0) {
        logging_1.default.warning('No experience was found.');
        return true;
    }
    if (!courses || courses.length === 0) {
        logging_1.default.warning('No courses were found.');
        return true;
    }
    if (!schooling || schooling.length === 0) {
        logging_1.default.warning('No schooling was found.');
        return true;
    }
    return false;
};
exports.checkEmptyResults = checkEmptyResults;
