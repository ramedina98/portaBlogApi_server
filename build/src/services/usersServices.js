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
exports.EditUserInfo = exports.getUserData = exports.loginUser = void 0;
/**
 * @UserServices --> Here I have all the required services to handle the users controllers...
 * 1. Get all the data.
 * 2. Login.
 * 3. Update data.
 */
const usersModel_1 = require("../models/mysql/usersModel");
const jwtUtils_1 = require("../utils/jwtUtils");
const resumeModulesUtilF_1 = require("../utils/resumeModulesUtilF");
const bcrypt_1 = __importDefault(require("bcrypt"));
const logging_1 = __importDefault(require("../config/logging"));
/**
 * @MethodGET -> This service helps me to login the users...
 * @param email
 * @param password
 *
 * If the email or password does not match, then a number is returned
 * indicating this...
 * 1 = Invalid email
 * 2 = Invalid password
 */
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield usersModel_1.User.findOne({ where: { email } });
        if (!user) {
            logging_1.default.warning('::::::::::::::::::::');
            logging_1.default.error('Invalid email'); // user not found, email incorrect...
            logging_1.default.warning('::::::::::::::::::::');
            return 1;
        }
        // check if both are the same...
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.passwrd);
        if (!isPasswordValid) {
            logging_1.default.warning('::::::::::::::::::::');
            logging_1.default.error('Invalid password'); // password not found, password incorrect...
            logging_1.default.warning('::::::::::::::::::::');
            return 2;
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
        (0, resumeModulesUtilF_1.loggingInfo)(`${user.name1} successfully logged in`);
        // we return the object we the needed info...
        return response;
    }
    catch (error) {
        logging_1.default.warning(':::::::::::::::::::::::::::');
        logging_1.default.error('Error: ' + error.message);
        logging_1.default.warning(':::::::::::::::::::::::::::');
        throw error;
    }
});
exports.loginUser = loginUser;
/**
 * @MethodGET -> This service helps me to reach the data of a specific user...
 * @param id_user
 *
 * If the user was not found it returns a null to indicate this and in the controller
 * I send the message and the corresponding status...
 */
const getUserData = (id_user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // search for the user...
        const user = yield usersModel_1.User.findOne({ where: { id_user } });
        if (!user) {
            logging_1.default.warning(':::::::::::::::::');
            logging_1.default.error('User not found');
            logging_1.default.warning(':::::::::::::::::');
            return null;
        }
        (0, resumeModulesUtilF_1.loggingInfo)('User found!');
        return user;
    }
    catch (error) {
        logging_1.default.warning('::::::::::::::::::::::::::::');
        logging_1.default.error('Error: ' + error.message);
        logging_1.default.warning('::::::::::::::::::::::::::::');
        throw error;
    }
});
exports.getUserData = getUserData;
/**
 * @MethodPUT --> This service helps me to edit the register of a specific user...
 * @param id_user
 * @param data
 *
 * If no record corresponds to the id_user, it returns a null to indicate this...
 */
const EditUserInfo = (id_user, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // search for the correct user and edit its info...
        const response = yield usersModel_1.User.update({
            name1: data.name1,
            name2: data.name2,
            surname: data.surname,
            phone: data.phone,
            email: data.email,
            passwrd: data.passwrd,
            photo: data.photo
        }, {
            where: { id_user }
        });
        if (response === 0) {
            logging_1.default.warning(':::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::');
            logging_1.default.error('No records were updated. User may not exist or no changes were made.');
            logging_1.default.warning(':::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::');
            return null;
        }
        (0, resumeModulesUtilF_1.loggingInfo)('User updated successfully');
        return 'User updated successfully';
    }
    catch (error) {
        logging_1.default.warning('::::::::::::::::::::::::::');
        logging_1.default.error('Error: ' + error.message);
        logging_1.default.warning('::::::::::::::::::::::::::');
        throw error;
    }
});
exports.EditUserInfo = EditUserInfo;
