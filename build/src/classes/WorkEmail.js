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
exports.WorkEmail = void 0;
const randomenizer_1 = require("../utils/randomenizer");
const emailSender_1 = require("../utils/emailSender");
const timeOfDay_1 = require("../utils/timeOfDay");
const config_1 = require("../config/config");
const logging_1 = __importDefault(require("../config/logging"));
class WorkEmail {
    constructor(name, email, tz, id_email) {
        this.name = name;
        this.email = email;
        this.tz = tz;
        this.id_email = id_email;
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
    correctMessage() {
        // a randome number is generated between 0 - 5...
        const option = (0, randomenizer_1.generateRandomNumber)(0, 5);
        // this array contains the answers...
        const answers = [
            `Hi ${this.name}, thank you so much for considering me for your project. I'm confident that my skills and experience can contribute to making it a success. I’ll get back to you as soon as possible!`,
            `Hello ${this.name}, I greatly appreciate your message and your interest in working together. I’m excited about the opportunity and I’m confident that I can help achieve great results. I'll be in touch soon!`,
            `Hi ${this.name}, thanks for reaching out! Your proposal sounds interesting, and I’m eager to explore how we can work together to make your project successful. I’ll respond shortly with more details.`,
            `Hello ${this.name}, I’m thrilled by the opportunity you've presented. I truly believe I can add value to your project or team and am excited to discuss further. I'll reply soon with more information.`,
            `Hi ${this.name}, I appreciate your interest in my services! I’m confident I can be the right fit to help your project succeed. I’ll be reviewing your message and will respond shortly.`,
            `Good ${(0, timeOfDay_1.determineTimeTimeOfDay)(this.tz)}, ${this.name}! Thank you for considering me for this opportunity. I'm excited to explore how I can help make your project a success. I'll get back to you shortly!`
        ];
        return answers[option];
    }
    messageForMe() {
        return `
            <h2>${this.name} esta interesado en colaborar contigo.</h2>
            <p>
                Hay una oferta laboral que deberías revisar lo antes posible, ${this.name} tiene algo
                interesante entre manos, ponte en contacto lo antes posible.
                <br>
                Este es su correo: ${this.email}
                Propuesta laboral: ${config_1.SERVER.WEB}/inbox/${this.id_email}
            </p>
            <h3>¡Te deseo mucho exito!</h3>
        `;
    }
    send() {
        return __awaiter(this, void 0, void 0, function* () {
            logging_1.default.info('Sending the message...');
            // This is a message to the prospective customer
            const message = this.correctMessage();
            // And this is a message to me, to let me know that I have a possible job offer...
            const messageForMe = this.messageForMe();
            // this is the subject for the customer message...
            const subjectC = `Thank you for reaching out, ${this.name}! I'm excited to discuss your project.`;
            // and this is the subject of the email that notify me...
            const subjectM = `Nueva consulta de trabajo de ${this.name}: Oportunidad de colaboración potencial`;
            try {
                const [response1, response2] = yield Promise.all([
                    (0, emailSender_1.sendEmail)(this.email, subjectC, message),
                    (0, emailSender_1.sendEmail)(config_1.SERVER.EMAILW, subjectM, messageForMe)
                ]);
                // log of the respones one (customer)
                this.logsInfo(response1);
                // log of the response two (Email to me)
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
exports.WorkEmail = WorkEmail;
