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
exports.insertEmailResponse = exports.AnEmailResponse = exports.AllEmailsSentResponse = exports.AllEmailsResponse = void 0;
const emailsServices_1 = require("../services/emailsServices");
// All emails that its type is diferent to 'response' controller...
const AllEmailsResponse = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const emails = yield (0, emailsServices_1.AllEmails)();
        res.status(200).json({ message: 'Successfully obtained', emails });
    }
    catch (error) {
        res.status(401).json({ message: 'Internal server error: ' + error.message });
    }
});
exports.AllEmailsResponse = AllEmailsResponse;
// All the emails that its type is 'response' controller...
const AllEmailsSentResponse = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const emailSend = yield (0, emailsServices_1.AllEmailsSent)();
        res.status(200).json({ message: 'Successfully obtained', emailSend });
    }
    catch (error) {
        res.status(401).json({ message: 'Internal server error: ' + error.message });
    }
});
exports.AllEmailsSentResponse = AllEmailsSentResponse;
// An specific email by its id...
const AnEmailResponse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_email } = req.params;
        const email = yield (0, emailsServices_1.AnEmail)(id_email);
        res.status(200).json({ message: 'Successfully obtained', email });
    }
    catch (error) {
        res.status(401).json({ message: 'Internal server error: ' + error.message });
    }
});
exports.AnEmailResponse = AnEmailResponse;
// this is the controller that hepls me to insert new emails into the email's table...
const insertEmailResponse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email_data, tzClient } = req.body;
        const email = yield (0, emailsServices_1.insertEmail)(email_data, tzClient);
        res.status(200).json({ message: email });
    }
    catch (error) {
        res.status(401).json({ message: 'Internal server error: ' + error.message });
    }
});
exports.insertEmailResponse = insertEmailResponse;
