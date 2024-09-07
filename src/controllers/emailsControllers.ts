// we have all the emails controllers here...
import { Request, Response } from "express";
import { AllEmails } from "../services/emailsServices";
import { Emails } from "../interfaces/IEmails";

// All emails controller...
const AllEmailsResponse = async (_req: Request, res: Response) => {
    try {
        const emails: Emails[] | null = await AllEmails();
        res.status(200).json({ message: 'Successfully obtained', emails });
    } catch (error: any) {
        res.status(401).json({ message: error.message });
    }
}

export { AllEmailsResponse };