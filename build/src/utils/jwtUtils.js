"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJwToken = generateJwToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
// define the secret key to sign the tokens...
const SECRET_KEY = config_1.SERVER.KEY;
// Function for generate a token...
function generateJwToken(payload) {
    // token configuration...
    const options = {
        expiresIn: config_1.SERVER.TIME,
    };
    /// generate a token...
    const token = jsonwebtoken_1.default.sign(payload, SECRET_KEY, options);
    return token;
}
