// we have all the emails controllers here...
import { Request, Response } from "express";
import { AllEmails, AllEmailsSent, AnEmail, insertEmail } from "../services/emailsServices";
import { Emails } from "../interfaces/IEmails";

// All emails that its type is diferent to 'response' controller...
const AllEmailsResponse = async (_req: Request, res: Response) => {
    try {
        const emails: Emails[] | null = await AllEmails();
        res.status(200).json({ message: 'Successfully obtained', emails });
    } catch (error: any) {
        res.status(401).json({ message: 'Internal server error: ' + error.message });
    }
}

// All the emails that its type is 'response' controller...
const AllEmailsSentResponse = async (_req:Request, res: Response) => {
    try {
        const emailSend: Emails[] | null = await AllEmailsSent();
        res.status(200).json({ message: 'Successfully obtained', emailSend });
    } catch (error: any) {
        res.status(401).json({ message: 'Internal server error: ' + error.message });
    }
}

// An specific email by its id...
const AnEmailResponse = async (req: Request, res: Response) => {
    try {
        const { id_email } = req.params;

        const email: Emails | null = await AnEmail(id_email);
        res.status(200).json({ message: 'Successfully obtained', email});
    } catch (error: any) {
        res.status(401).json({ message: 'Internal server error: ' + error.message});
    }
}

// this is the controller that hepls me to insert new emails into the email's table...
const insertEmailResponse = async (req:Request, res:Response) => {
    try {
        const { email_data, tzClient } = req.body;

        const email: string | null = await insertEmail(email_data, tzClient);
        res.status(200).json({ message: email });
    } catch (error: any) {
        res.status(401).json({ message: 'Internal server error: ' + error.message});
    }
}

export { AllEmailsResponse, AllEmailsSentResponse, AnEmailResponse, insertEmailResponse };