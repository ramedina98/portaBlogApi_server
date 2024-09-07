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
import { Op } from "sequelize";
import { Email } from "../models/mysql/emailsModel";
import logging from "../config/logging";
import { Emails } from "../interfaces/IEmails";

// (GET) This service helps me to get all the records from the emails table that I recived...
const AllEmails = async (): Promise<Emails[] | null> => {
    try {
        // I need all the emails that its types !== response...
        const emails: any[] = await Email.findAll({
            where: {
                email_type: {
                    [Op.ne]: 'response'
                }
            }
        });

        if(!emails || emails.length === 0){
            logging.error('No emails found that do not have type_email = response');
            return null;
        }

        return emails;

    } catch (error: any) {
        logging.error('Error: ' + error.message);
        throw error;
    }
}

// (GET) This service helps me to retrive all the emails that I send as a response of other emails...
const AllEmailsSent = async ():Promise<Emails[] | null> => {
    try {
        // the only emails that I need to retrive are the emails that its type is 'response'...
        const emails: any = await Email.findAll({
            where: {
                email_type: {
                    [Op.eq]: 'response'
                }
            }
        });

        if(!emails || emails.length === 0){
            logging.error('No emails found that do not have type_email = response');
            return null;
        }

        return emails;
    } catch (error: any) {
        logging.error('Error: ' + error.message);
        throw error;
    }
}

// (GET) This service helps me to get an specific record from the table emails...
const AnEmail = async (id_email: string): Promise<Emails | null> => {
    try{
        const email: any = await Email.findOne({ where: { id_email }});

        if(!email){
            logging.error('Invalid id, no email found');
            return null;
        }

        return email;
    } catch(error: any){
        logging.error('Error: ' + error.message);
        throw error;
    }
}

export { AllEmails, AllEmailsSent , AnEmail };