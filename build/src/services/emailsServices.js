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
exports.AllEmails = void 0;
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
const emailsModel_1 = require("../models/mysql/emailsModel");
const logging_1 = __importDefault(require("../config/logging"));
const encryptedIDs_1 = require("../utils/encryptedIDs");
// (GET) This service helps me to get all the records from the emails table...
const AllEmails = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const emails = yield emailsModel_1.Email.findAll();
        if (!emails) {
            logging_1.default.error('No emails found');
            return null;
        }
        // Use map to iterate over the array of emails...
        const newEmailsArray = yield Promise.all(emails.map((email) => __awaiter(void 0, void 0, void 0, function* () {
            // encrypt the id_emails by converting it to a string and using this function...
            const encryptedId = yield (0, encryptedIDs_1.encryptedElemen)(email.id_email.toString());
            // return a new object with the encrypted id and keep the rest unchanged...
            return {
                id_email: encryptedId,
                email_sender: email.email_sender,
                name_sender: email.name_sender,
                email_recipient: email.email_recipient,
                message: email.message,
                date_message: email.date_message,
                email_type: email.email_type
            };
        })));
        return newEmailsArray;
    }
    catch (error) {
        logging_1.default.error('Error: ' + error.message);
        throw error;
    }
});
exports.AllEmails = AllEmails;
