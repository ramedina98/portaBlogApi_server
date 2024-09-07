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

// (GET) This service helps me to get all the records from the emails table...
const AllEmails = async (): Promise<Emails[] | null> => {
    try {
        const emails: any[] = await Email.findAll();

        if(!emails){
            logging.error('No emails found');
            return null;
        }

        return emails;

    } catch (error: any) {
        logging.error('Error: ' + error.message);
        throw error;
    }
}

export { AllEmails };