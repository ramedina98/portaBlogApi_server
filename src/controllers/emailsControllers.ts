// we have all the emails controllers here...
import { Request, Response } from "express";
import { AllEmails } from "../services/emailsServices";
import { Emails } from "../interfaces/IEmails";

// I Create a new type where the `id_email` field is a string instead of a number...
type EmailsWithEncryptedId = Omit<Emails, 'id_email'> & { id_email: string};
// All emails controller...
const AllEmailsResponse = async (_req: Request, res: Response) => {
    try {
        const emails: EmailsWithEncryptedId[] | null = await AllEmails();
        res.status(200).json({ message: 'Successfully obtained', emails });
    } catch (error: any) {
        res.status(401).json({ message: error.message });
    }
}

export { AllEmailsResponse };