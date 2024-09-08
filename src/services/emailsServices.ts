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
import { Emails, IEFactory } from "../interfaces/IEmails";
import { wss } from "../webSocketServer";
import { EmailFactory } from "../classes/EmailFactory";

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
const AllEmailsSent = async (): Promise<Emails[] | null> => {
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

/**
 * (POST) This service helps me to create a new email record in the table, also helps me to
 * notify that a new email has arrrived...
 * */
interface IEmailInserted extends Omit<Emails, 'id_emails'>{}; // Emails interface without id_emails
const insertEmail = async (emailData: IEmailInserted, tzClient: string): Promise<string | null> => {
    try {
        const newEmail: any = await Email.create(emailData);

        // notify connected clients to the websocket...
        wss.clients.forEach((client) => {
            if(client.readyState === 1){// cliente conectado...
                client.send(JSON.stringify({
                    message: 'New emails received.',
                    email: newEmail,
                }));
            }
        });

        // create an object of type IEFactory to store the information and then pass it as the second argument...
        const options: IEFactory = {
            id_email: emailData.id_email,
            name: emailData.name_sender,
            email: emailData.email_sender,
            tz: tzClient
        };

        // set up the email factory... 2 arguments (type, options)
        const eamilCreator: any = EmailFactory.CreateEmail(emailData.email_type, options);
        // put the send method into action...
        eamilCreator.send();

        // return a message of success...
        return 'Sent successfully';
    } catch (error: any) {
        logging.error('Error: ' + error.message);
        throw error;
    }
}

export { AllEmails, AllEmailsSent, AnEmail, insertEmail};