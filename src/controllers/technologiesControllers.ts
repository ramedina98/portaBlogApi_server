/**
 * @TechnologiesCotrollers ...
*/
import { Request, Response } from "express";
import { ITechNoResumeId } from "../interfaces/ITechnologies";
import { getTechnologies, insertNewTechnologie } from "../services/technologiesServices";

/**
 * @GetTechsController --> This controller helps me to manage the
 * geTechnologiesService and get data from the table, data related to a specific user.
 */
const getTechnologiesResponse = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id_user } = req.body;

        const technologies: ITechNoResumeId[] | number = await getTechnologies(id_user);

        if(typeof technologies === 'number'){
            let message: string = '';

            if(technologies === 1){
                message = 'User does not exist';
            } else if(technologies === 2){
                message = 'User does not have a resume attached jet';
            } else if(technologies === 3){
                message = 'Technologies not found';
            }

            res.status(404).json({ message });
        }

        res.status(200).json({ message: 'Successfully', technologies });
    } catch (error: any) {
        res.status(500).json({ message: 'Internal server error' + error.message });
    }
}

/**
 * @MethodGET --> This controller helps me to handle the creation of new records in the technologies table...
 *
 * The frontend only needs to send the next:
 * @reqBody tech_data --> "name_tech / icon_tech"
 * @reqBody id_user
 */
const insertNewTechnologieResponse = async (req:Request, res:Response): Promise<void> => {
    try {
        const { id_user, tech_data }  = req.body;

        const tech: string | number = await insertNewTechnologie(id_user, tech_data);

        if(typeof tech === 'number'){
            let message: string = '';

            if(tech === 1){
                message = 'User does not exist';
            } else if(tech === 2){
                message = 'User does not have a resume attached jet';
            } else if(tech === 3){
                message = 'No registration was made';
            }

            res.status(404).json({ message });
        }

        res.status(200).json({ message: tech });
    } catch (error: any) {
        res.status(500).json({ message: 'Internal server error' + error.message });
    }
}

export { getTechnologiesResponse, insertNewTechnologieResponse };