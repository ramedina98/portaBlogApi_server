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
exports.encryptedElemen = void 0;
/**
 * This function create here helps us to encrypt any element that we want with bcrypt...
 */
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("../config/config");
const encryptedElemen = (str) => __awaiter(void 0, void 0, void 0, function* () {
    const saltRounds = config_1.SERVER.SET_ROUNDS;
    // generate the salt property using the saltRounds...
    const salt = yield bcrypt_1.default.genSalt(saltRounds);
    const encryptElement = yield bcrypt_1.default.hash(str, salt);
    return encryptElement;
});
exports.encryptedElemen = encryptedElemen;
