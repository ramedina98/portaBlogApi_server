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
import { Email } from "../models/mysql/emailsModel";
import logging from "../config/logging";
import { Emails } from "../interfaces/IEmails";
import { encryptedElemen } from "../utils/encryptedIDs";

// I Create a new type where the `id_emails` field is a string instead of a number...
type EmailsWithEncryptedId = Omit<Emails, 'id_email'> & { id_email: string};
// (GET) This service helps me to get all the records from the emails table...
const AllEmails = async (): Promise<EmailsWithEncryptedId[] | null> => {
    try {
        const emails: any[] = await Email.findAll();

        if(!emails){
            logging.error('No emails found');
            return null;
        }

        // Use map to iterate over the array of emails...
        const newEmailsArray: EmailsWithEncryptedId[] = await Promise.all(emails.map(async (email) => {
            // encrypt the id_emails by converting it to a string and using this function...
            const encryptedId = await encryptedElemen(email.id_email.toString());

            // return a new object with the encrypted id and keep the rest unchanged...
            return {
                id_email:encryptedId,
                email_sender: email.email_sender,
                name_sender: email.name_sender,
                email_recipient: email.email_recipient,
                message: email.message,
                date_message: email.date_message,
                email_type: email.email_type
            };
        }))

        return newEmailsArray;

    } catch (error: any) {
        logging.error('Error: ' + error.message);
        throw error;
    }
}

export { AllEmails };