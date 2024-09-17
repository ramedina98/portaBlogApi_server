/**
 * @EmailsServices -> Here I have all the required services for handle the emails...
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
import { Emails, IEFactory, INotificationTitle, EmailType } from "../interfaces/IEmails";
import { wss } from "../webSocketServer";
import { EmailFactory } from "../classes/EmailFactory";
import { notificationTitle } from "../utils/typeOfNotification";
import logging from "../config/logging";

/**
 * @MethodGET
 * This service helps me to get all the records from the emails table that I recived...
 *
 * If no email was found, a null is returned...
 * */
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
            logging.warning(':::::::::::::::::::::::::::::::::::::::::::::::::::::::::');
            logging.error('No emails found that do not have type_email = response');
            logging.warning(':::::::::::::::::::::::::::::::::::::::::::::::::::::::::');
            return null;
        }

        return emails;

    } catch (error: any) {
        logging.warn('::::::::::::::::::::::::::::::::');
        logging.error('Error: ' + error.message);
        logging.warn('::::::::::::::::::::::::::::::::');
        throw error;
    }
}

/**
 * @MethodGET
 * This service helps me to retrive all the emails that I send as a response of other emails...
 *
 * If no email was found, a null is returned...
 * */
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
            logging.warning(':::::::::::::::::::::::::::::::::::::::::::::::::::::::::');
            logging.error('No emails found that do not have type_email = response');
            logging.warning(':::::::::::::::::::::::::::::::::::::::::::::::::::::::::');
            return null;
        }

        return emails;
    } catch (error: any) {
        logging.warn('::::::::::::::::::::::::::::::::');
        logging.error('Error: ' + error.message);
        logging.warn('::::::::::::::::::::::::::::::::');
        throw error;
    }
}

/**
 * @MethodGET
 * This service helps me to get an specific record from the table emails...
 * @param id_email
 * If no email was found, a null is returned...
 * */
const AnEmail = async (id_email: string): Promise<Emails | null> => {
    try{
        const email: any = await Email.findOne({ where: { id_email }});

        if(!email){
            logging.warning(':::::::::::::::::::::::::::::::::::::');
            logging.error('Invalid id, no email found');
            logging.warning(':::::::::::::::::::::::::::::::::::::');
            return null;
        }

        return email;
    } catch(error: any){
        logging.warn('::::::::::::::::::::::::::::::::');
        logging.error('Error: ' + error.message);
        logging.warn('::::::::::::::::::::::::::::::::');
        throw error;
    }
}

/**
 * @MethodPOST --> This service helps me to create a new email record in the table, also helps me to
 * notify that a new email has arrrived...
 *
 * @EmailTypeResponse --> If the type of the email is response, a message is returned that
 * was sent successfully...
 *
 * */
interface IEmailInserted extends Omit<Emails, 'id_emails'>{}; // Emails interface without id_emails
const insertEmail = async (emailData: IEmailInserted, tzClient: string): Promise<string | null> => {
    try {
        const newEmail: any = await Email.create(emailData);

        // verify if the new Email record was done correctly...
        if(!newEmail){
            logging.warning('::::::::::::::::::::::::::::::::::::::::::::');
            logging.error('Error when trying to create the record in the database');
            logging.warning('::::::::::::::::::::::::::::::::::::::::::::');
            return null;
        }

        //if email type === response, then just sent a message notifying that the data was registered whitout any problemas...
        if(newEmail.email_type === EmailType.Response){
            // log...
            logging.warning('::::::::::::::::::::::::::::::::::::::::::::');
            logging.info('Email of type response sent successfully');
            logging.warning('::::::::::::::::::::::::::::::::::::::::::::');
            // return a message of success...
            return `Email successfully sent to ${newEmail.email_recipient}`;
        }

        // this functon generate a specific title to notify of the new incoming email...
        const title: INotificationTitle | null = notificationTitle(newEmail.email_type);

        // notify connected clients to the websocket...
        /**
         * @message -> this object property contain the title of the notification...
         * @typeNumber -> this property contains a number that indicates the type of email
         * it is, in order to optimize the graphical interface...
         * @email -> this property contains the response of the server when sending the data to be registered in the db...
         */
        wss.clients.forEach((client) => {
            if(client.readyState === 1){
                client.send(JSON.stringify({
                    message: title?.title,
                    typeNumber: title?.num,
                    email: newEmail,
                }));
            }
        });

        // create an object of type IEFactory to store the information and then pass it as the second argument...
        const options: IEFactory = {
            id_email: newEmail.id_email,
            name: emailData.name_sender,
            email: emailData.email_sender,
            tz: tzClient,
            message: newEmail.message,
        };

        // set up the email factory... 2 arguments (type, options)
        const eamilCreator: any = EmailFactory.CreateEmail(emailData.email_type, options);
        // put the send method into action...
        eamilCreator.send();

        // return a message of success...
        return 'Email sent successfully';
    } catch (error: any) {
        logging.warn('::::::::::::::::::::::::::::::::');
        logging.error('Error: ' + error.message);
        logging.warn('::::::::::::::::::::::::::::::::');
        throw error;
    }
}

/**
 * @MethodPATCH
 * This service helps me to modify a specific email, its only functionality is to change
 * from false to true, or true to false, the "is read" field...
 * @is_read -> From false to true, or true to false...
 */
const updateIsReadField = async (id: string): Promise<string | null> => {
    try {
        const email: any = await Email.findByPk(id);

        if(!email){
            // log...
            logging.warning('::::::::::::::::::::::::::');
            logging.error('Email not found!');
            logging.warning('::::::::::::::::::::::::::');
            // return null the email doesn't exist...
            return null;
        }

        // toggle the "is_read" field (if it's true, set it to false and vice versa)...
        const newIsReadStatus = !email.is_read;
        // update the is_read field to true...
        await email.update({ is_read: newIsReadStatus });

        logging.info('::::::::::::::::::::::::::');
        logging.info(`Email ${id} has been updated.`);
        logging.info('::::::::::::::::::::::::::');

        return `Email ${id} has been updated.`;
    } catch (error: any) {
        logging.warn('::::::::::::::::::::::::::::::::');
        logging.error('Error: ' + error.message);
        logging.warn('::::::::::::::::::::::::::::::::');
        throw error;
    }
}

/**
 * @MethodPATCH --> This service helps me to change the status of is read, from true to false. This to
 * set all emails as unread again...
 */
const updateAllEmailsTrueToFalse = async (): Promise<string | null> => {
    try{
        // find all the emails where is_read equals to true
        const emailsToUpdate = await Email.findAll({
            where: { is_read: true }
        });

        if(emailsToUpdate.length === 0){
            logging.warning('::::::::::::::::::::::::::::::::::::::::::');
            logging.warning('No emails with is_read = true found.');
            logging.warning('::::::::::::::::::::::::::::::::::::::::::');
            return null;
        }

        // update the status of all found emails...
        await Email.update(
            { is_read: false },
            { where: { is_read: true }}
        )

        logging.info('::::::::::::::::::::::::::');
        logging.info(`${emailsToUpdate.length} emails have been updated to unread.`);
        logging.info('::::::::::::::::::::::::::');

        return `${emailsToUpdate.length} emails have been updated to unread.`;
    } catch(error: any){
        logging.warn('::::::::::::::::::::::::::::::::');
        logging.error('Error: ' + error.message);
        logging.warn('::::::::::::::::::::::::::::::::');
        throw error;
    }
}

/**
 * @methodDELETE
 * This service helps me to delete and specific email by its id...
 */
const deleteAnEmail = async (id: string): Promise<string | null> => {
    try {
        // find email by its id...
        const email: any = await Email.findByPk(id);

        if(!email){
            logging.warning('::::::::::::::::::::::::::');
            logging.warning('Email not found!');
            logging.warning('::::::::::::::::::::::::::');
            return null;
        }

        // delete email...
        await Email.destroy( { where: { id_email: id }});

        logging.info('::::::::::::::::::::::::::');
        logging.info(`Email with ID ${id} has been deleted.`);
        logging.info('::::::::::::::::::::::::::');

        return 'The email has been deleted.';
    } catch (error: any) {
        logging.warn('::::::::::::::::::::::::::::::::');
        logging.error('Error: ' + error.message);
        logging.warn('::::::::::::::::::::::::::::::::');
        throw error;
    }
}

/**
 * @methodDELETE
 * This service helps me to delete several emails at the same time with their ids...
 * @param ids - an array of email IDs to delete...
 *
 * 1 = No IDs provided for deletion.
 * 2 = No emails found to delete.
 */
const deleteSeveralEmails = async (ids: string[]): Promise<string| number> => {
    try {
        if(ids.length === 0){
            logging.warning('::::::::::::::::::::::::::');
            logging.error('No IDs provided for deletion!');
            logging.warning('::::::::::::::::::::::::::');
            //return 'No IDs provided for deletion.';
            return 1;
        }

        // Delete the emails which ids are in the array...
        const deletedCount: number = await Email.destroy({ where: {id_email: ids} });

        if(deletedCount === 0){
            logging.warning('::::::::::::::::::::::::::');
            logging.error('No emails found to delete!');
            logging.warning('::::::::::::::::::::::::::');
            // return 'No emails found to delete.';
            return 2;
        }

        logging.info('::::::::::::::::::::::::::');
        logging.info(`${deletedCount} emails have been deleted.`);
        logging.info('::::::::::::::::::::::::::');

        return `${deletedCount} emails have been deleted.`;
    } catch (error: any) {
        logging.warn('::::::::::::::::::::::::::::::::');
        logging.error('Error: ' + error.message);
        logging.warn('::::::::::::::::::::::::::::::::');
        throw error;
    }
}

export { AllEmails, AllEmailsSent, AnEmail, insertEmail, updateIsReadField, updateAllEmailsTrueToFalse, deleteAnEmail, deleteSeveralEmails };