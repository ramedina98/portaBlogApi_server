"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
// This is the whats app client...
const whatsapp_web_js_1 = require("whatsapp-web.js");
const qrcode_terminal_1 = __importDefault(require("qrcode-terminal"));
// Initilize whats app client...
const client = new whatsapp_web_js_1.Client({
    authStrategy: new whatsapp_web_js_1.LocalAuth(),
});
exports.client = client;
// Event to generate QR code for authentication...
client.on('qr', (qr) => {
    qrcode_terminal_1.default.generate(qr, { small: true });
});
// event once whats app client is ready...
client.on('ready', () => {
    logging.info('WhatsApp client is ready!');
});
// Event for handling disconnects
client.on('disconnected', (reason) => {
    logging.warn(`WhatsApp client disconnected: ${reason}`);
});
