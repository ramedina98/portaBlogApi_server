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
exports.ErrorEmail = void 0;
const emailSender_1 = require("../utils/emailSender");
const whatsappSender_1 = require("../utils/whatsappSender");
const logging_1 = __importDefault(require("../config/logging"));
const config_1 = require("../config/config");
class ErrorEmail {
    constructor(name, email, tz, id_email, error_message) {
        this.name = name;
        this.email = email;
        this.tz = tz;
        this.id_email = id_email;
        this.error_message = error_message;
    }
    // function to handle the info log...
    logsInfo(response) {
        logging_1.default.info('::::::::::::::::::::::::::::::::::::::::::::::::::::::::::');
        logging_1.default.info('Email sent successfully.');
        logging_1.default.info(`Message ID: ${response.messageId}`);
        logging_1.default.info(`Accepted addresses: ${response.accepted.join(', ')}`);
        logging_1.default.info(`Rejected addresses: ${response.rejected.join(', ')}`);
        logging_1.default.info('::::::::::::::::::::::::::::::::::::::::::::::::::::::::::');
    }
    // Function to manage the server time...
    serverTime() {
        const now = new Date();
        let hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        // Turn the 24 hour format into a 12 hour format...
        hours = hours % 12;
        hours = hours ? hours : 12; // 0 in 12 hour format has to be 12...
        // format minutes and second to always have two digites...
        const minutesFormatted = minutes < 10 ? `0${minutes}` : minutes;
        const secondsFormatted = seconds < 10 ? `0${seconds}` : seconds;
        return `${hours}:${minutesFormatted}:${secondsFormatted} ${ampm}`;
    }
    correctMessage() {
        return `Hello ${this.name}, thank you for reporting the issue. I appreciate your feedback and will work to resolve the problem as soon as possible.`;
    }
    wtsAppMessageError() {
        return __awaiter(this, void 0, void 0, function* () {
            const message = `Hola Ricardo, se ha detectado un nuevo mensaje de error a las ${this.serverTime()}.
                        \nPor favor, revísalo lo antes posible para asegurarte de que todo esté funcionando correctamente.
                        \nEste es el link del reporte: ${config_1.SERVER.WEB}/inbox${this.id_email}
                        \nEl usuario ${this.name}, con zona horaria ${this.tz}, fue quien genero el reporte.
                        \nEste es el mensaje de error: ${this.error_message}`;
            try {
                yield (0, whatsappSender_1.sendWhatsAppMessage)(message);
                logging_1.default.info('Whats App successfully sent');
            }
            catch (error) {
                logging_1.default.error('There was an error while sending the Whats app message: ' + error.message);
                throw error;
            }
        });
    }
    send() {
        return __awaiter(this, void 0, void 0, function* () {
            // log to let know that the process start...
            logging_1.default.info('Sending the message...');
            // Message to the user...
            const message = this.correctMessage();
            // subject for the email repleying to the user...
            const subject = `Thank you for reporting the issue, ${this.name}.`;
            try {
                // email to thank the user for reporting the error...
                const response = yield (0, emailSender_1.sendEmail)(this.email, subject, message);
                // message sent to notify me about the error...
                yield this.wtsAppMessageError();
                // log of the sent email...
                this.logsInfo(response);
            }
            catch (error) {
                // Log the error
                logging_1.default.error('::::::::::::::::::::::::::::::::::::::::::::::::::::::::::');
                logging_1.default.error('Error sending email:', error instanceof Error ? error.message : 'Unknown error');
                logging_1.default.error('::::::::::::::::::::::::::::::::::::::::::::::::::::::::::');
                throw error; // Re-throw the error after logging
            }
        });
    }
}
exports.ErrorEmail = ErrorEmail;
