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
exports.getUserData = exports.loginUser = void 0;
/**
 * Here we have all the required services for users
 * 1. Get all the data.
 * 2. Login.
 * 3. Update data.
 */
const bcrypt_1 = __importDefault(require("bcrypt"));
const usersModel_1 = __importDefault(require("../models/mysql/usersModel"));
const logging_1 = __importDefault(require("../config/logging"));
const jwtUtils_1 = require("../utils/jwtUtils");
// this service helps us to login the users (or not)...
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield usersModel_1.default.findOne({ where: { email } });
        if (!user) {
            logging_1.default.error('Invalid email'); // user not found, email incorrect...
            return null;
        }
        // check if both are the same...
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.passwrd);
        if (!isPasswordValid) {
            logging_1.default.error('Invalid password');
            throw new Error('Invalid password');
        }
        // generar un JWT para re enviar los datos...
        const payload = {
            userId: user.id_user,
            name: user.name1,
            phone: user.phone
        };
        const token = (0, jwtUtils_1.generateJwToken)(payload);
        //create the object that we have to return...
        const response = {
            id_user: user.id_user,
            jwt: token,
        };
        // we return the object we the needed info...
        return response;
    }
    catch (error) {
        logging_1.default.error('Error: ' + error.message);
        throw error;
    }
});
exports.loginUser = loginUser;
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
