/**
 * This class is for handle the opinions emails type...
 */
import { EmailBaseMethods } from "../interfaces/IEmails";
import { generateRandomNumber } from "../utils/randomenizer";
import { sendEmail } from "../utils/emailSender";
import { SERVER } from "../config/config";
import { SentMessageInfo } from "nodemailer";
import logging from "../config/logging";

class OpinionEmails implements EmailBaseMethods{
    private name: string;
    private email: string;
    private id_email: string;

    constructor(name: string, email: string, id_email: string){
        this.name = name;
        this.email = email;
        this.id_email = id_email;
    }

    private logsInfo(response: SentMessageInfo): void{
        logging.info('::::::::::::::::::::::::::::::::::::::::::::::::::::::::::');
        logging.info('Email sent successfully.');
        logging.info(`Message ID: ${response.messageId}`);
        logging.info(`Accepted addresses: ${response.accepted.join(', ')}`);
        logging.info(`Rejected addresses: ${response.rejected.join(', ')}`);
        logging.info('::::::::::::::::::::::::::::::::::::::::::::::::::::::::::');
    }

    private correctMessage(): string {
        // a randome number is generated between 0 - 4...
        const option: number = generateRandomNumber(0, 4);

        // this array contains the answers...
        const answers: string[] = [
            `Hello ${this.name}, thank you so much for sharing your opinion. Your feedback is incredibly valuable and helps me improve continuously.`,
            `Hi ${this.name}, I appreciate you taking the time to provide your thoughts. Every piece of feedback contributes to my growth as a writer and engineer.`,
            `Greetings ${this.name}, your insights are greatly appreciated. They allow me to reflect and improve both my writing and programming skills. Thank you!`,
            `Hello ${this.name}, I truly value your feedback. It’s through opinions like yours that I can continue to evolve and deliver better content and solutions.`,
            `Hi ${this.name}, thank you for your thoughtful input. I’m always striving to improve, and your feedback plays a key role in helping me become a better developer and creator.`
        ];

        return answers[option];
    }

    private messageForMe(): string{

        return `
            <h2>El usuario ${this.name} ha dejado un comentario en tu sitio web.</h2>
            <p>
                Deberías hecharle un vistazo, y si gustas ponerte en contacto con el para
                agradecerle personalmente su feedback.
                <br>
                Este es su correo: ${this.email}
                Link al comentario: ${SERVER.WEB}/inbox/${this.id_email}
            </p>
        `;
    }

    async send(): Promise<void> {
        logging.info('Sending greeting message...');

        // randomly choose a message for the client...
        const message = this.correctMessage();
        // message for me...
        const messageForMe = this.messageForMe();

        // the subject of the email for the client...
        const subject: string = `Your Feedback Matters, ${this.name} – Thanks for Helping Me Grow!`;
        // this subject will be forme...
        const subjectForMe: string = `You have received an opinion from ${this.name} - Take a looka!`;

        // send email message through sendEmail function...
        try {
            //make a double call to the sendEmail function...
            const [response1, response2]: SentMessageInfo = await Promise.all([
                sendEmail(this.email, subject, message),
                sendEmail(SERVER.EMAIL, subjectForMe, messageForMe)
            ]);

            // Log relevant information about the sent email to the user...
            this.logsInfo(response1);
            // Log relevant information about the sent email to me...
            this.logsInfo(response2);
        } catch (error: any) {
            // Log the error
            logging.error('::::::::::::::::::::::::::::::::::::::::::::::::::::::::::');
            logging.error('Error sending email:', error instanceof Error ? error.message : 'Unknown error');
            logging.error('::::::::::::::::::::::::::::::::::::::::::::::::::::::::::');
            throw error; // Re-throw the error after logging
        }
    }
}

export { OpinionEmails };