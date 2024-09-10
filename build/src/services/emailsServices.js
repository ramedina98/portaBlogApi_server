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
exports.insertEmail = exports.AnEmail = exports.AllEmailsSent = exports.AllEmails = void 0;
/**
 * Here we have all the required services for handle the emails...
 * 1. Get on by its id...
 * 2. Get all the emails...
 * 3. Post (this is when somebody answer an email..)
 * 4. Patach (The only field that this service has to change is the "is_read")...
 * 5. Delete...
 *
 *  The only service that the users will be able to use is Post, the rest is for use in the admin app...
 */
const sequelize_1 = require("sequelize");
const emailsModel_1 = require("../models/mysql/emailsModel");
const IEmails_1 = require("../interfaces/IEmails");
const webSocketServer_1 = require("../webSocketServer");
const EmailFactory_1 = require("../classes/EmailFactory");
const typeOfNotification_1 = require("../utils/typeOfNotification");
const logging_1 = __importDefault(require("../config/logging"));
// (GET) This service helps me to get all the records from the emails table that I recived...
const AllEmails = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // I need all the emails that its types !== response...
        const emails = yield emailsModel_1.Email.findAll({
            where: {
                email_type: {
                    [sequelize_1.Op.ne]: 'response'
                }
            }
        });
        if (!emails || emails.length === 0) {
            logging_1.default.error('No emails found that do not have type_email = response');
            return null;
        }
        return emails;
    }
    catch (error) {
        logging_1.default.error('Error: ' + error.message);
        throw error;
    }
});
exports.AllEmails = AllEmails;
// (GET) This service helps me to retrive all the emails that I send as a response of other emails...
const AllEmailsSent = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // the only emails that I need to retrive are the emails that its type is 'response'...
        const emails = yield emailsModel_1.Email.findAll({
            where: {
                email_type: {
                    [sequelize_1.Op.eq]: 'response'
                }
            }
        });
        if (!emails || emails.length === 0) {
            logging_1.default.error('No emails found that do not have type_email = response');
            return null;
        }
        return emails;
    }
    catch (error) {
        logging_1.default.error('Error: ' + error.message);
        throw error;
    }
});
exports.AllEmailsSent = AllEmailsSent;
// (GET) This service helps me to get an specific record from the table emails...
const AnEmail = (id_email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = yield emailsModel_1.Email.findOne({ where: { id_email } });
        if (!email) {
            logging_1.default.error('Invalid id, no email found');
            return null;
        }
        return email;
    }
    catch (error) {
        logging_1.default.error('Error: ' + error.message);
        throw error;
    }
});
exports.AnEmail = AnEmail;
; // Emails interface without id_emails
const insertEmail = (emailData, tzClient) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newEmail = yield emailsModel_1.Email.create(emailData);
        //if email type === response, then just sent a message notifying that the data was registered whitout any problemas...
        if (newEmail.email_type === IEmails_1.EmailType.Response) {
            // log...
            logging_1.default.info('Email of type response sent successfully');
            // return a message of success...
            return 'Sent successfully';
        }
        // this functon generate a specific title to notify of the new incoming email...
        const title = (0, typeOfNotification_1.notificationTitle)(newEmail.email_type);
        // notify connected clients to the websocket...
        /**
         * @message -> this object property contain the title of the notification...
         * @typeNumber -> this property contains a number that indicates the type of email
         * it is, in order to optimize the graphical interface...
         * @email -> this property contains the response of the server when sending the data to be registered in the db...
         */
        webSocketServer_1.wss.clients.forEach((client) => {
            if (client.readyState === 1) {
                client.send(JSON.stringify({
                    message: title === null || title === void 0 ? void 0 : title.title,
                    typeNumber: title === null || title === void 0 ? void 0 : title.num,
                    email: newEmail,
                }));
            }
        });
        // create an object of type IEFactory to store the information and then pass it as the second argument...
        const options = {
            id_email: newEmail.id_email,
            name: emailData.name_sender,
            email: emailData.email_sender,
            tz: tzClient,
            message: newEmail.message,
        };
        // set up the email factory... 2 arguments (type, options)
        const eamilCreator = EmailFactory_1.EmailFactory.CreateEmail(emailData.email_type, options);
        // put the send method into action...
        eamilCreator.send();
        // return a message of success...
        return 'Sent successfully';
    }
    catch (error) {
        logging_1.default.warn('::::::::::::::::::::::::::::::::');
        logging_1.default.error('Error: ' + error.message);
        logging_1.default.warn('::::::::::::::::::::::::::::::::');
        throw error;
    }
});
exports.insertEmail = insertEmail;
