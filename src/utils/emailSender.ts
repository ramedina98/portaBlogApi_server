/**
 * This functios (utils) helsp me to send emails...
 * */
import nodemailer, { SentMessageInfo, TransportOptions } from 'nodemailer';
import logging from '../config/logging';
import { SERVER } from '../config/config';
import { MailOptions } from '../interfaces/IEmails';

// This arrow function helps me to send the necessary emails...
const sendEmail = async (recipient: string, subject: string, message: string): Promise<SentMessageInfo> => {
    try {
        const transport = nodemailer.createTransport({
            host: SERVER.EHOST,
            port: SERVER.EPORT,
            secure: true,
            auth: {
                user: SERVER.EUSER,
                pass: SERVER.EPASS
            },
        } as TransportOptions);

        // email's body...
        const mailOptions: MailOptions = {
            from: SERVER.EUSER,
            to: recipient,
            subject: subject,
            html: message
        };

        // send the email...
        const response: SentMessageInfo = await transport.sendMail(mailOptions);
        logging.info(`Email sent to ${recipient}`);
        return response;
    } catch (error: any) {
        logging.error(`Error sending email: ${error}`);
        throw new Error('Error sending email');
    }
}

export { sendEmail };