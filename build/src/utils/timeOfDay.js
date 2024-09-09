"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.determineTimeTimeOfDay = void 0;
/**
 * This function in utils hepls me to determine the time of the day,
 * the only parameter that it receive is the time zone o f the client, to be precise...
 */
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const determineTimeTimeOfDay = (timeZone) => {
    const currentHour = moment_timezone_1.default.tz(timeZone).hour(); // returns the client's current Hour...
    // determine if is morning, afternoon or evening
    if (currentHour >= 6 && currentHour < 12) {
        return 'morning';
    }
    else if (currentHour >= 12 && currentHour < 18) {
        return 'afternoom';
    }
    else {
        return 'evening';
    }
};
exports.determineTimeTimeOfDay = determineTimeTimeOfDay;
