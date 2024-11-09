// express framewokr...
import express from 'express';
// cors middleware to handle cross-origin request...
import cors from 'cors';
//loggings...
import logging from './config/logging';
//middleware to handle the loggings...
import { loggingHandler } from './middleware/loggingMiddleware';
import { routeNotFound } from './middleware/routeNotFoundMiddleware';
import allRoutes from './index_routes';
//import { sendWhatsAppMessage } from './utils/whatsappSender';
//import { client } from './config/wahtsAppClien';

//create an instance of the express application...
const app = express();
// use cors...
app.use(cors());
//
app.use(express.urlencoded({ extended: true }));
// use middleware to parse JSON request bodies...
app.use(express.json());

//Logging handler here...
logging.info('Logging & configuration');
app.use(loggingHandler);

// TODO: descomentar cuando ya lo necesite...
// start the whats app web.js client...
//client.initialize();

// routes...
//NOTE: add a static file (HTML) to indicate that this PAI is a private one...
app.get('/', (_, res) => {
    res.send('this is the root.');
});

allRoutes(app);

//this middleware helps us to send an error messages if any route doesn't exist...
app.use(routeNotFound);

// global error handler...
app.use((err: any, _req: any, res: any, _next: any) => {
    logging.error(err.stack);
    res.status(500).json({ message: 'Internal server error.'});
});

export default app;