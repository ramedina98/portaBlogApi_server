// This is the webSeocket server which will hepl us with the new email notification...
import { WebSocketServer } from "ws";
import logging from "./config/logging";

// create websocket server...
const wss = new WebSocketServer({ port: 8081 });

wss.on('connection', (ws) => {
    logging.info('New client connected to websocket...');

    ws.on('message', (message) => {
        logging.info(`Message received from customer: ${message}`);
    });

    ws.on('close', () => {
        logging.info('Client disconnected');
    })
});

export { wss };