"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractJwtInfo = exports.generateJwToken = void 0;
/**
 * In this file we can find util functions to handle some jwt process like: create them and
 * extract information  from them...
 */
const config_1 = require("../config/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logging_1 = __importDefault(require("../config/logging"));
// This function helps me to create a JWT...
const generateJwToken = (payload) => {
    return jsonwebtoken_1.default.sign({ payload }, config_1.SERVER.KEY, { expiresIn: config_1.SERVER.TIME });
};
exports.generateJwToken = generateJwToken;
// This other function helps me to extract information from the JWT generated...
const extractJwtInfo = (token, field) => {
    try {
        // verify and decodify the token...
        const decoded = jsonwebtoken_1.default.verify(token, config_1.SERVER.KEY);
        // return the required data...
        return decoded.payload[field] || null;
    }
    catch (error) {
        logging_1.default.error(`Error decoding token: ${error.message}`);
        return null;
    }
};
exports.extractJwtInfo = extractJwtInfo;
