// This is the whats app client...
import { Client, LocalAuth } from "whatsapp-web.js";
import qrcode from 'qrcode-terminal';

// Initilize whats app client...
const client = new Client({
    authStrategy: new LocalAuth(),
});

// Event to generate QR code for authentication...
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true});
});

// event once whats app client is ready...
client.on('ready', () => {
    logging.info('WhatsApp client is ready!');
});

// Event for handling disconnects
client.on('disconnected', (reason) => {
    logging.warn(`WhatsApp client disconnected: ${reason}`);
});

export { client };