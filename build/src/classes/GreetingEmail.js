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
exports.GreetingEmail = void 0;
const logging_1 = __importDefault(require("../config/logging"));
const randomenizer_1 = require("../utils/randomenizer");
const timeOfDay_1 = require("../utils/timeOfDay");
const emailSender_1 = require("../utils/emailSender");
class GreetingEmail {
    constructor(name, email, tzClient) {
        this.name = name;
        this.email = email;
        this.tzClient = tzClient;
    }
    logsInfo(response) {
        logging_1.default.info('::::::::::::::::::::::::::::::::::::::::::::::::::::::::::');
        logging_1.default.info('Email sent successfully.');
        logging_1.default.info(`Message ID: ${response.messageId}`);
        logging_1.default.info(`Accepted addresses: ${response.accepted.join(', ')}`);
        logging_1.default.info(`Rejected addresses: ${response.rejected.join(', ')}`);
        logging_1.default.info('::::::::::::::::::::::::::::::::::::::::::::::::::::::::::');
    }
    correctMessage() {
        // a randome number is generated between 0 - 4...
        const option = (0, randomenizer_1.generateRandomNumber)(0, 4);
        // this array contains several answers...
        const answers = [
            `Hello ${this.name}, thank you for your message. I hope all is well on your end.`,
            `Hi ${this.name}, I appreciate your greetings. Looking forward to hearing more from you.`,
            `Greetings ${this.name}! Thank you for reaching out. I hope you're doing well`,
            `Hello ${this.name}, it's great to hear from you. Wishing you a pleasant ${(0, timeOfDay_1.determineTimeTimeOfDay)(this.tzClient)}`,
            `Hi ${this.name}, thank you for gretting in touch. Feel free to let me know if there's anything I can help with.`
        ];
        // a response is extracted and returned...
        return answers[option];
    }
    // Method to send the message...
    send() {
        return __awaiter(this, void 0, void 0, function* () {
            logging_1.default.info('Sending greeting message...');
            // randomly choose a message...
            const message = this.correctMessage();
            // the subject of the email...
            const subject = `Grateful for your Message, ${this.name} let's explore more together!`;
            // send email message through sendEmail function...
            try {
                const response = yield (0, emailSender_1.sendEmail)(this.email, subject, message);
                // Log revelant information about the sent email...
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
exports.GreetingEmail = GreetingEmail;
