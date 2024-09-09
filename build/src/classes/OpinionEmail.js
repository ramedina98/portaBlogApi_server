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
exports.OpinionEmails = void 0;
const randomenizer_1 = require("../utils/randomenizer");
const emailSender_1 = require("../utils/emailSender");
const config_1 = require("../config/config");
const logging_1 = __importDefault(require("../config/logging"));
class OpinionEmails {
    constructor(name, email, id_email) {
        this.name = name;
        this.email = email;
        this.id_email = id_email;
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
        //
        const answers = [
            `Hello ${this.name}, thank you so much for sharing your opinion. Your feedback is incredibly valuable and helps me improve continuously.`,
            `Hi ${this.name}, I appreciate you taking the time to provide your thoughts. Every piece of feedback contributes to my growth as a writer and engineer.`,
            `Greetings ${this.name}, your insights are greatly appreciated. They allow me to reflect and improve both my writing and programming skills. Thank you!`,
            `Hello ${this.name}, I truly value your feedback. It’s through opinions like yours that I can continue to evolve and deliver better content and solutions.`,
            `Hi ${this.name}, thank you for your thoughtful input. I’m always striving to improve, and your feedback plays a key role in helping me become a better developer and creator.`
        ];
        return answers[option];
    }
    messageForMe() {
        return `
            <h2>El usuario ${this.name} ha dejado un comentario en tu sitio web.</h2>
            <p>
                Deberías hecharle un vistazo, y si gustas ponerte en contacto con el para
                agradecerle personalmente su feedback.
                <br>
                Este es su correo: ${this.email}
                Link al comentario: ${config_1.SERVER.WEB}/inbox/${this.id_email}
            </p>
        `;
    }
    send() {
        return __awaiter(this, void 0, void 0, function* () {
            logging_1.default.info('Sending greeting message...');
            // randomly choose a message for the client...
            const message = this.correctMessage();
            // message for me...
            const messageForMe = this.messageForMe();
            // the subject of the email for the client...
            const subject = `Your Feedback Matters, ${this.name} – Thanks for Helping Me Grow!`;
            // this subject will be forme...
            const subjectForMe = `You have received an opinion from ${this.name} - Take a looka!`;
            // send email message through sendEmail function...
            try {
                //make a double call to the sendEmail function...
                const [response1, response2] = yield Promise.all([
                    (0, emailSender_1.sendEmail)(this.email, subject, message),
                    (0, emailSender_1.sendEmail)(config_1.SERVER.EMAIL, subjectForMe, messageForMe)
                ]);
                // Log relevant information about the sent email to the user...
                this.logsInfo(response1);
                // Log relevant information about the sent email to me...
                this.logsInfo(response2);
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
exports.OpinionEmails = OpinionEmails;
