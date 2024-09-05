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
exports.getUserData = void 0;
/**
 * Here we have all the required services for users
 * 1. Get all the data.
 * 2. Login.
 * 3. Update data.
 */
const usersModel_1 = __importDefault(require("../models/mysql/usersModel"));
const logging_1 = __importDefault(require("../config/logging"));
// this service helps us to get the data of a user...
const getUserData = (id_user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // search for the user...
        const user = yield usersModel_1.default.findOne({ where: { id_user } });
        if (!user) {
            logging_1.default.error('Invalid credential');
            return null;
        }
        return user;
    }
    catch (error) {
        logging_1.default.error('Error fetching de user data: ' + error.message);
        throw error;
    }
});
exports.getUserData = getUserData;
