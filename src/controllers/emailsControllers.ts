// we have all the emails controllers here...
import { Request, Response } from "express";
import {
    AllEmails,
    AllEmailsSent,
    AnEmail, insertEmail,
    updateAllEmailsTrueToFalse,
    updateIsReadField,
    deleteAnEmail,
    deleteSeveralEmails
} from "../services/emailsServices";
import { Emails } from "../interfaces/IEmails";

/**
 * @allEmailsController -> All emails that its type is diferent to "response" controller...
 *
 * @status404 If the service returns null, the controller has to returne the following: Emails not found!...
 */
const AllEmailsResponse = async (_req: Request, res: Response): Promise<void> => {
    try {
        const emails: Emails[] | null = await AllEmails();

        if(emails === null){
            res.status(404).json({ message: 'Emails not found!' });
        }

        res.status(200).json({ message: 'Successfully obtained emails', emails });
    } catch (error: any) {
        res.status(500).json({ message: 'Internal server error: ' + error.message });
    }
}

/**
 * @EmailsResponseTypes --> Al the emails that their types are "response" controller...
 *
 * @status404 --> if there are eny email that their type are response...
 */
const AllEmailsSentResponse = async (_req:Request, res: Response): Promise<void> => {
    try {
        const emailSend: Emails[] | null = await AllEmailsSent();

        if(emailSend === null){
            res.status(404).json({ message: 'Emails not found!' });
        }

        res.status(200).json({ message: 'Successfully obtained emails', emailSend });
    } catch (error: any) {
        res.status(500).json({ message: 'Internal server error: ' + error.message });
    }
}

// An specific email by its id...
/**
 * @AnEmailController --> this controller helps me to handle the search for a specific email...
 *
 * @status404 --> if the response is null...
 */
const AnEmailResponse = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id_email } = req.params;

        const email: Emails | null = await AnEmail(id_email);

        if(email === null){
            res.status(404).json({ message: 'Email successfully obtained' });
        }

        res.status(200).json({ message: 'Successfully obtained', email});
    } catch (error: any) {
        res.status(500).json({ message: 'Internal server error: ' + error.message});
    }
}

// this is the controller that hepls me to insert new emails into the email's table...
const insertEmailResponse = async (req:Request, res:Response): Promise<void> => {
    try {
        const { email_data, tzClient } = req.body;

        const email: string | null = await insertEmail(email_data, tzClient);

        if(email === null){
            res.status(404).json({ message: 'Error sending email!' });
        }

        res.status(200).json({ message: email });
    } catch (error: any) {
        res.status(500).json({ message: 'Internal server error: ' + error.message});
    }
}

/**
 * @UpdateReadEmail --> this is the controller that helps me to update the is read field of a specific email...
 *
 * @status404 --> if there is no email with the provided id, null is received from the service...
 */
const updateAnEmailResponse = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const email: string | null = await updateIsReadField(id);

        if(email === null){
            res.status(404).json({ message: 'Email not updated!' });
        }

        res.status(200).json({ message: email });
    } catch (error: any) {
        res.status(500).json({ message: 'Internal server error: ' + error.message });
    }
}

/**
 * @UnreadController
 * this controller helps me to update the status of is_read from true to false, of all those
 * that have that condition...
 *
 * @status404 -> if there is any email with is_read = true, return a 404 status...
 */
const updateAllEmailsTrueToFalseResponse = async (_req: Request, res: Response): Promise<void> => {
    try {
        const email: string | null = await updateAllEmailsTrueToFalse();

        if(email === null){
            res.status(404).json({ message: 'No read email found' });
        }

        res.status(200).json({ message: email });
    } catch (error: any) {
        res.status(500).json({ message: 'Internal server error: ' + error.message });
    }
}

/**
 * @DeleteAnEmailController --> This controller helps me to delete an specific email by its id...
 *
 * @status404 --> if no email is found with the provided id...
 */
const deleteAnEmailResponse = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.body;

        const email: string | null = await deleteAnEmail(id);

        if(email === null){
            res.status(404).json({ message: 'Email not deleted!' });
        }

        res.status(200).json({ message: email });
    } catch (error: any) {
        res.status(500).json({ message: 'Internal server error: ' + error.message });
    }
}

/**
 * @deleteSeveralEmailsController --> this controller helps me to delete several emails at the same time with their ids...
 *
 * @status404 --> the service will return 2 numbers, which are:
 * 1 = No IDs provided for deletion!
 * 2 = No emails found to delete!
 */
const deleteSeveralEmailsResponse = async (req: Request, res: Response): Promise<void> => {
    try {
        const { ids } = req.body;

        const email: string | number = await deleteSeveralEmails(ids);

        if(typeof email === 'number'){
            const message = email === 1 ? 'No IDs provided for deletion' : email === 2 ? 'No emails found to delete' : 'Unknow error';
            res.status(404).json({ message });
        }

        res.status(200).json({ message: email });
    } catch (error: any) {
        res.status(500).json({ message: 'Internal server error: ' + error.message });
    }
}

export { AllEmailsResponse, AllEmailsSentResponse, AnEmailResponse, insertEmailResponse, updateAnEmailResponse, updateAllEmailsTrueToFalseResponse, deleteAnEmailResponse, deleteSeveralEmailsResponse };