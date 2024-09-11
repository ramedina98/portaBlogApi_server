/**
 * This utils helps me to handle the sending of error reports in my website, reports made by the users...
*/
import { client } from "../config/wahtsAppClien";
import logging from "../config/logging";

const sendWhatsAppMessage = async (recipientNumber: string, message: string): Promise<void> => {
    try {

        if (!client.info || !client.info.wid) {
            logging.error('WhatsApp client is not ready yet.');
            return;
        }

        // ensure the recipient number is in international format without '+'...
        const chatId: string = `${recipientNumber}@c.us`;

        // send message...
        await client.sendMessage(chatId, message);

        logging.info(':::::::::::::::::::::::::::::::::::::::::');
        logging.info('Whatsapp message sent successfully!');
        logging.info(':::::::::::::::::::::::::::::::::::::::::');
    } catch (error: any) {
        logging.error('Error sending WhatsApp message:', error.message);
    }
}

export { sendWhatsAppMessage }