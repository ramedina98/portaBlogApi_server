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
exports.deleteEmailsResponse = exports.updateAllEmailsTrueToFalseResponse = exports.updateAnEmailResponse = exports.insertEmailResponse = exports.AnEmailResponse = exports.AllEmailsSentResponse = exports.AllEmailsResponse = void 0;
const emailsServices_1 = require("../services/emailsServices");
/**
 * @allEmailsController -> All emails that its type is diferent to "response" controller...
 *
 * @status404 If the service returns null, the controller has to returne the following: Emails not found!...
 */
const AllEmailsResponse = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const emails = yield (0, emailsServices_1.AllEmails)();
        if (emails === null) {
            res.status(404).json({ message: 'Emails not found!' });
        }
        res.status(200).json({ message: 'Successfully obtained emails', emails });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error: ' + error.message });
    }
});
exports.AllEmailsResponse = AllEmailsResponse;
/**
 * @EmailsResponseTypes --> Al the emails that their types are "response" controller...
 *
 * @status404 --> if there are eny email that their type are response...
 */
const AllEmailsSentResponse = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const emailSend = yield (0, emailsServices_1.AllEmailsSent)();
        if (emailSend === null) {
            res.status(404).json({ message: 'Emails not found!' });
        }
        res.status(200).json({ message: 'Successfully obtained emails', emailSend });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error: ' + error.message });
    }
});
exports.AllEmailsSentResponse = AllEmailsSentResponse;
// An specific email by its id...
/**
 * @AnEmailController --> this controller helps me to handle the search for a specific email...
 *
 * @status404 --> if the response is null...
 */
const AnEmailResponse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_email } = req.params;
        const email = yield (0, emailsServices_1.AnEmail)(id_email);
        if (email === null) {
            res.status(404).json({ message: 'Email successfully obtained' });
        }
        res.status(200).json({ message: 'Successfully obtained', email });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error: ' + error.message });
    }
});
exports.AnEmailResponse = AnEmailResponse;
// this is the controller that hepls me to insert new emails into the email's table...
const insertEmailResponse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email_data, tzClient } = req.body;
        const email = yield (0, emailsServices_1.insertEmail)(email_data, tzClient);
        if (email === null) {
            res.status(404).json({ message: 'Error sending email!' });
        }
        res.status(200).json({ message: email });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error: ' + error.message });
    }
});
exports.insertEmailResponse = insertEmailResponse;
/**
 * @UpdateReadEmail --> this is the controller that helps me to update the is read field of a specific email...
 *
 * @status404 --> if there is no email with the provided id, null is received from the service...
 */
const updateAnEmailResponse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const email = yield (0, emailsServices_1.updateIsReadField)(id);
        if (email === null) {
            res.status(404).json({ message: 'Email not updated!' });
        }
        res.status(200).json({ message: email });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error: ' + error.message });
    }
});
exports.updateAnEmailResponse = updateAnEmailResponse;
/**
 * @UnreadController
 * this controller helps me to update the status of is_read from true to false, of all those
 * that have that condition...
 *
 * @status404 -> if there is any email with is_read = true, return a 404 status...
 */
const updateAllEmailsTrueToFalseResponse = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = yield (0, emailsServices_1.updateAllEmailsTrueToFalse)();
        if (email === null) {
            res.status(404).json({ message: 'No read email found' });
        }
        res.status(200).json({ message: email });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error: ' + error.message });
    }
});
exports.updateAllEmailsTrueToFalseResponse = updateAllEmailsTrueToFalseResponse;
/**
 * @deleteSeveralEmailsController --> this controller helps me to delete several emails at the same time with their ids...
 *
 * @status404 --> the service will return 2 numbers, which are:
 * 1 = No IDs provided for deletion!
 * 2 = No emails found to delete!
 */
const deleteEmailsResponse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ids } = req.body;
        const email = yield (0, emailsServices_1.deleteEmails)(ids);
        if (typeof email === 'number') {
            const message = email === 1 ? 'No IDs provided for deletion' : email === 2 ? 'No emails found to delete' : 'Unknow error';
            res.status(404).json({ message });
        }
        res.status(200).json({ message: email });
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error: ' + error.message });
    }
});
exports.deleteEmailsResponse = deleteEmailsResponse;
