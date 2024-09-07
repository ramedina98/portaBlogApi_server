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
Object.defineProperty(exports, "__esModule", { value: true });
exports.putUpdatedUserInfo = exports.getUser = exports.loginSession = void 0;
const usersServices_1 = require("../services/usersServices");
// login Controller...
const loginSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const login = yield (0, usersServices_1.loginUser)(email, password);
        res.status(200).json({ message: 'Successful login', login });
    }
    catch (error) {
        res.status(401).json({ message: 'Internal server error: ' + error.message });
    }
});
exports.loginSession = loginSession;
// this controller helps us to search a user...
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_user } = req.body;
    try {
        const user = yield (0, usersServices_1.getUserData)(id_user);
        res.status(200).json({ message: 'User found', user });
    }
    catch (error) {
        res.status(401).json({ message: 'Internal server error: ' + error.message });
    }
});
exports.getUser = getUser;
// this controller helps us to update the data of a specific user...
const putUpdatedUserInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // this is an object with all the required data...
    const { id_user, userData } = req.body;
    try {
        const response = yield (0, usersServices_1.EditUserInfo)(id_user, userData);
        // response has to be (User updated successfully.): string
        res.status(200).json({ message: response });
    }
    catch (error) {
        res.status(401).json({ message: 'Internal server error: ' + error.message });
    }
});
exports.putUpdatedUserInfo = putUpdatedUserInfo;
