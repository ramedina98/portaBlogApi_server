"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wss = void 0;
// This is the webSeocket server which will hepl us with the new email notification...
const ws_1 = require("ws");
const logging_1 = __importDefault(require("./config/logging"));
// create websocket server...
const wss = new ws_1.WebSocketServer({ port: 8081 });
exports.wss = wss;
wss.on('connection', (ws) => {
    logging_1.default.info('New client connected to websocket...');
    ws.on('message', (message) => {
        logging_1.default.info(`Message received from customer: ${message}`);
    });
    ws.on('close', () => {
        logging_1.default.info('Client disconnected');
    });
});
