/**
 * @routes
 * This file contains all the necessary routes for the management of all
 * the api endpoints. This way I have a correct order of all of them...
 */
// routes...
import userRoutes from './routes/usersRoutes'; //users...
import emailRoutes from './routes/emailsRoutes'; // emails...
import resumeRoutes from './routes/resumeRoutes'; // resume...
import techRoutes from './routes/technologiesRoutes'; // technologies...
import schoolingRouter from './routes/schoolingRoutes'; // schooling...
import courseRouter from './routes/coursesRoutes'; // courses...

export default function allRoutes(app: any){
    // users routes...
    app.use('/users', userRoutes);
    // emails routes...
    app.use('/emails', emailRoutes);
    // resume routes...
    app.use('/resume', resumeRoutes);
    // technologies routes...
    app.use('/technologies', techRoutes);
    // schooling routes...
    app.use('/schooling', schoolingRouter);
    // courses routes...
    app.use('/courses', courseRouter);
}