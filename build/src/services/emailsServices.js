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
exports.deleteEmails = exports.updateAllEmailsTrueToFalse = exports.updateIsReadField = exports.insertEmail = exports.AnEmail = exports.AllEmailsSent = exports.AllEmails = void 0;
/**
 * @module Emails
 *
 * @EmailsServices -> Here I have all the required services for handle the emails...
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
const resumeModulesUtilF_1 = require("../utils/resumeModulesUtilF");
const logging_1 = __importDefault(require("../config/logging"));
/**
 * @MethodGET
 * This service helps me to get all the records from the emails table that I recived...
 *
 * If no email was found, a null is returned...
 * */
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
            logging_1.default.warning(':::::::::::::::::::::::::::::::::::::::::::::::::::::::::');
            logging_1.default.error('No emails found that do not have type_email = response');
            logging_1.default.warning(':::::::::::::::::::::::::::::::::::::::::::::::::::::::::');
            return null;
        }
        (0, resumeModulesUtilF_1.loggingInfo)('No emails found! (type_emails != response)');
        return emails;
    }
    catch (error) {
        logging_1.default.warn('::::::::::::::::::::::::::::::::');
        logging_1.default.error('Error: ' + error.message);
        logging_1.default.warn('::::::::::::::::::::::::::::::::');
        throw error;
    }
});
exports.AllEmails = AllEmails;
/**
 * @MethodGET
 * This service helps me to retrive all the emails that I send as a response of other emails...
 *
 * If no email was found, a null is returned...
 * */
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
            logging_1.default.warning(':::::::::::::::::::::::::::::::::::::::::::::::::::::::::');
            logging_1.default.error('No emails found that have type_email = response');
            logging_1.default.warning(':::::::::::::::::::::::::::::::::::::::::::::::::::::::::');
            return null;
        }
        (0, resumeModulesUtilF_1.loggingInfo)('No emails found! (type_emails = response)');
        return emails;
    }
    catch (error) {
        logging_1.default.warn('::::::::::::::::::::::::::::::::');
        logging_1.default.error('Error: ' + error.message);
        logging_1.default.warn('::::::::::::::::::::::::::::::::');
        throw error;
    }
});
exports.AllEmailsSent = AllEmailsSent;
/**
 * @MethodGET
 * This service helps me to get an specific record from the table emails...
 * @param id_email
 * If no email was found, a null is returned...
 * */
const AnEmail = (id_email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = yield emailsModel_1.Email.findOne({ where: { id_email } });
        if (!email) {
            logging_1.default.warning(':::::::::::::::::::::::::::::::::::::');
            logging_1.default.error('Invalid id, no email found');
            logging_1.default.warning(':::::::::::::::::::::::::::::::::::::');
            return null;
        }
        (0, resumeModulesUtilF_1.loggingInfo)(`Email found ${email.name_sender}`);
        return email;
    }
    catch (error) {
        logging_1.default.warn('::::::::::::::::::::::::::::::::');
        logging_1.default.error('Error: ' + error.message);
        logging_1.default.warn('::::::::::::::::::::::::::::::::');
        throw error;
    }
});
exports.AnEmail = AnEmail;
; // Emails interface without id_emails
const insertEmail = (emailData, tzClient) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newEmail = yield emailsModel_1.Email.create(emailData);
        // verify if the new Email record was done correctly...
        if (!newEmail) {
            logging_1.default.warning('::::::::::::::::::::::::::::::::::::::::::::');
            logging_1.default.error('Error when trying to create the record in the database');
            logging_1.default.warning('::::::::::::::::::::::::::::::::::::::::::::');
            return null;
        }
        //if email type === response, then just sent a message notifying that the data was registered whitout any problemas...
        if (newEmail.email_type === IEmails_1.EmailType.Response) {
            // log...
            logging_1.default.warning('::::::::::::::::::::::::::::::::::::::::::::');
            logging_1.default.info('Email of type response sent successfully');
            logging_1.default.warning('::::::::::::::::::::::::::::::::::::::::::::');
            // return a message of success...
            return `Email successfully sent to ${newEmail.email_recipient}`;
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
        (0, resumeModulesUtilF_1.loggingInfo)('Email sent successfully');
        // return a message of success...
        return 'Email sent successfully';
    }
    catch (error) {
        logging_1.default.warn('::::::::::::::::::::::::::::::::');
        logging_1.default.error('Error: ' + error.message);
        logging_1.default.warn('::::::::::::::::::::::::::::::::');
        throw error;
    }
});
exports.insertEmail = insertEmail;
/**
 * @MethodPATCH
 * This service helps me to modify a specific email, its only functionality is to change
 * from false to true, or true to false, the "is read" field...
 * @is_read -> From false to true, or true to false...
 */
const updateIsReadField = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = yield emailsModel_1.Email.findByPk(id);
        if (!email) {
            // log...
            logging_1.default.warning('::::::::::::::::::::::::::');
            logging_1.default.error('Email not found!');
            logging_1.default.warning('::::::::::::::::::::::::::');
            // return null the email doesn't exist...
            return null;
        }
        // toggle the "is_read" field (if it's true, set it to false and vice versa)...
        const newIsReadStatus = !email.is_read;
        // update the is_read field to true...
        yield email.update({ is_read: newIsReadStatus });
        (0, resumeModulesUtilF_1.loggingInfo)(`Email ${id} has been updated.`);
        return `Email ${id} has been updated.`;
    }
    catch (error) {
        logging_1.default.warn('::::::::::::::::::::::::::::::::');
        logging_1.default.error('Error: ' + error.message);
        logging_1.default.warn('::::::::::::::::::::::::::::::::');
        throw error;
    }
});
exports.updateIsReadField = updateIsReadField;
/**
 * @MethodPATCH --> This service helps me to change the status of is read, from true to false. This to
 * set all emails as unread again...
 */
const updateAllEmailsTrueToFalse = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // find all the emails where is_read equals to true
        const emailsToUpdate = yield emailsModel_1.Email.findAll({
            where: { is_read: true }
        });
        if (emailsToUpdate.length === 0) {
            logging_1.default.warning('::::::::::::::::::::::::::::::::::::::::::');
            logging_1.default.warning('No emails with is_read = true found.');
            logging_1.default.warning('::::::::::::::::::::::::::::::::::::::::::');
            return null;
        }
        // update the status of all found emails...
        yield emailsModel_1.Email.update({ is_read: false }, { where: { is_read: true } });
        (0, resumeModulesUtilF_1.loggingInfo)(`${emailsToUpdate.length} emails have been updated to unread.`);
        return `${emailsToUpdate.length} emails have been updated to unread.`;
    }
    catch (error) {
        logging_1.default.warn('::::::::::::::::::::::::::::::::');
        logging_1.default.error('Error: ' + error.message);
        logging_1.default.warn('::::::::::::::::::::::::::::::::');
        throw error;
    }
});
exports.updateAllEmailsTrueToFalse = updateAllEmailsTrueToFalse;
/**
 * @methodDELETE
 * This service helps me to delete several emails at the same time with their ids...
 * @param ids - an array of email IDs to delete...
 *
 * 1 = No IDs provided for deletion.
 * 2 = No emails found to delete.
 */
const deleteEmails = (ids) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (ids.length === 0) {
            logging_1.default.warning('::::::::::::::::::::::::::');
            logging_1.default.error('No IDs provided for deletion!');
            logging_1.default.warning('::::::::::::::::::::::::::');
            //return 'No IDs provided for deletion.';
            return 1;
        }
        // Delete the emails which ids are in the array...
        const deletedCount = yield emailsModel_1.Email.destroy({ where: { id_email: ids } });
        if (deletedCount === 0) {
            logging_1.default.warning('::::::::::::::::::::::::::');
            logging_1.default.error('No emails found to delete!');
            logging_1.default.warning('::::::::::::::::::::::::::');
            // return 'No emails found to delete.';
            return 2;
        }
        (0, resumeModulesUtilF_1.loggingInfo)(`${deletedCount} emails have been deleted.`);
        return `${deletedCount} emails have been deleted.`;
    }
    catch (error) {
        logging_1.default.warn('::::::::::::::::::::::::::::::::');
        logging_1.default.error('Error: ' + error.message);
        logging_1.default.warn('::::::::::::::::::::::::::::::::');
        throw error;
    }
});
exports.deleteEmails = deleteEmails;
