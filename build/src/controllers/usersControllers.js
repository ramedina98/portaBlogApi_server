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
const jwtUtils_1 = require("../utils/jwtUtils");
const IJwtPayload_1 = require("../interfaces/IJwtPayload");
const usersServices_1 = require("../services/usersServices");
/**
 * @LoginSessionController --> To log in
 * 1 = invalid email
 * 2 = invaild password
 */
const loginSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const login = yield (0, usersServices_1.loginUser)(email, password);
        // Here is the correct answer...
        if (typeof login === 'number') {
            const message = login === 1 ? 'Invalid email' : login === 2 ? 'Invalid password' : 'Unknow error';
            res.status(404).json({ message });
            return;
        }
        res.status(200).json({ message: 'Successful login', login });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error: ' + error.message });
    }
});
exports.loginSession = loginSession;
/**
 * @GetUserController --> This controller helps to search a specific user...
 * If nothing was found the service returns a null...
 */
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.body;
        const decodedToken = (0, jwtUtils_1.extractJwtInfo)(token, IJwtPayload_1.JwtFields.ID);
        if (decodedToken === null) {
            res.status(404).json({
                error: 'Received token is invalid or expired',
            });
            return;
        }
        const id_user = decodedToken;
        const user = yield (0, usersServices_1.getUserData)(id_user);
        if (user === null) {
            res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User successfully found', user });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error: ' + error.message });
    }
});
exports.getUser = getUser;
/**
 *  @UpdateUserInfoController
 * This controller helps me to update the data of a specific user
 */
const putUpdatedUserInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token, userData } = req.body;
        const decodedToken = (0, jwtUtils_1.extractJwtInfo)(token, IJwtPayload_1.JwtFields.ID);
        if (decodedToken === null) {
            res.status(404).json({
                error: 'Received token is invalid or expired',
            });
            return;
        }
        const id_user = decodedToken;
        const response = yield (0, usersServices_1.EditUserInfo)(id_user, userData);
        if (response === null) {
            res.status(404).json({ message: 'Non-existent user' });
        }
        res.status(200).json({ message: response });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error: ' + error.message });
    }
});
exports.putUpdatedUserInfo = putUpdatedUserInfo;
