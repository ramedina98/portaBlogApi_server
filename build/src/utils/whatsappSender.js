"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendWhatsAppMessage = void 0;
/**
 * This utils helps me to handle the sending of error reports in my website, reports made by the users...
*/
const wahtsAppClien_1 = require("../config/wahtsAppClien");
const logging_1 = __importDefault(require("../config/logging"));
const sendWhatsAppMessage = (recipientNumber, message) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!wahtsAppClien_1.client.info || !wahtsAppClien_1.client.info.wid) {
            logging_1.default.error('WhatsApp client is not ready yet.');
            return;
        }
        // ensure the recipient number is in international format without '+'...
        const chatId = `${recipientNumber}@c.us`;
        // send message...
        yield wahtsAppClien_1.client.sendMessage(chatId, message);
        logging_1.default.info(':::::::::::::::::::::::::::::::::::::::::');
        logging_1.default.info('Whatsapp message sent successfully!');
        logging_1.default.info(':::::::::::::::::::::::::::::::::::::::::');
    }
    catch (error) {
        logging_1.default.error('Error sending WhatsApp message:', error.message);
    }
});
exports.sendWhatsAppMessage = sendWhatsAppMessage;
