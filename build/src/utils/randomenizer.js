"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomNumber = void 0;
//this function is a randomizer...
const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
exports.generateRandomNumber = generateRandomNumber;
