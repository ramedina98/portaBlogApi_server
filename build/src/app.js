"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// express framewokr...
const express_1 = __importDefault(require("express"));
// cors middleware to handle cross-origin request...
const cors_1 = __importDefault(require("cors"));
//loggings...
const logging_1 = __importDefault(require("./config/logging"));
//middleware to handle the loggings...
const loggingMiddleware_1 = require("./middleware/loggingMiddleware");
const routeNotFoundMiddleware_1 = require("./middleware/routeNotFoundMiddleware");
//import { sendWhatsAppMessage } from './utils/whatsappSender';
//import { client } from './config/wahtsAppClien';
// routes...
const usersRoutes_1 = __importDefault(require("./routes/usersRoutes")); //users...
const emailsRoutes_1 = __importDefault(require("./routes/emailsRoutes")); // emails...
const resumeRoutes_1 = __importDefault(require("./routes/resumeRoutes")); // resume...
const technologiesRoutes_1 = __importDefault(require("./routes/technologiesRoutes")); // technologies...
const schoolingRoutes_1 = __importDefault(require("./routes/schoolingRoutes")); // schooling...
//create an instance of the express application...
const app = (0, express_1.default)();
// use cors...
app.use((0, cors_1.default)());
//
app.use(express_1.default.urlencoded({ extended: true }));
// use middleware to parse JSON request bodies...
app.use(express_1.default.json());
//Logging handler here...
logging_1.default.info('Logging & configuration');
app.use(loggingMiddleware_1.loggingHandler);
// TODO: descomentar cuando ya lo necesite...
// start the whats app web.js client...
//client.initialize();
// routes...
//NOTE: add a static file (HTML) to indicate that this PAI is a private one...
app.get('/', (_, res) => {
    res.send('this is the root.');
});
// TODO: pensar en colocar esto en un archivo por separado, para mejor orden...
// users routes...
app.use('/users', usersRoutes_1.default);
// emails routes...
app.use('/emails', emailsRoutes_1.default);
// resume routes...
app.use('/resume', resumeRoutes_1.default);
// technologies routes...
app.use('/technologies', technologiesRoutes_1.default);
// schooling routes...
app.use('/schooling', schoolingRoutes_1.default);
//this middleware helps us to send an error messages if any route doesn't exist...
app.use(routeNotFoundMiddleware_1.routeNotFound);
exports.default = app;
