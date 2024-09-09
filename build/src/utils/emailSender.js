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
exports.sendEmail = void 0;
/**
 * This functios (utils) helsp me to send emails...
 * */
const nodemailer_1 = __importDefault(require("nodemailer"));
const logging_1 = __importDefault(require("../config/logging"));
const config_1 = require("../config/config");
// This arrow function helps me to send the necessary emails...
const sendEmail = (recipient, subject, message) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transport = nodemailer_1.default.createTransport({
            host: config_1.SERVER.EHOST,
            port: config_1.SERVER.EPORT,
            secure: true,
            auth: {
                user: config_1.SERVER.EUSER,
                pass: config_1.SERVER.EPASS
            },
        });
        // email's body...
        const mailOptions = {
            from: config_1.SERVER.EUSER,
            to: recipient,
            subject: subject,
            html: message
        };
        // send the email...
        const response = yield transport.sendMail(mailOptions);
        logging_1.default.info(`Email sent to ${recipient}`);
        return response;
    }
    catch (error) {
        logging_1.default.error(`Error sending email: ${error}`);
        throw new Error('Error sending email');
    }
});
exports.sendEmail = sendEmail;
