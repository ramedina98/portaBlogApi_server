/**
 * @TechnologiesCotrollers ...
*/
import { Request, Response } from "express";
import { ITechNoIdNoresumeId, ITechNoResumeId } from "../interfaces/ITechnologies";
import {
    getTechnologies,
    insertNewTchRecords,
    updateATechRecord,
    toggleDeleteTech
} from "../services/technologiesServices";

/**
 * @GetTechsController --> This controller helps me to manage the
 * geTechnologiesService and get data from the table, data related to a specific user.
 */
const getTechnologiesResponse = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id_user }: { id_user: string } = req.body;

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
        const { id_user, tech_data }: { id_user: string, tech_data: ITechNoIdNoresumeId[] }= req.body;

        // the tech_data object array is empty, let the user knows...
        if(tech_data.length === 0){
            res.status(400).json({ message: 'No new technology has been received for storage!' })
        }

        const tech: string | number = await insertNewTchRecords(id_user, tech_data);

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

/**
 * @UpdateATechController --> this controller helps me handle the UpdateATech service, to update a specific
 * record in the technologies table...
 * @param id_tec
 * @param tech_data --> this has the name and icon...
 */
const updateATechRecordResponse = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id_tech, tech_data }: { id_tech: number, tech_data: ITechNoIdNoresumeId } = req.body;

        // the tech_data object array is empty, let the user knows...
        if(!tech_data){
            res.status(400).json({ message: 'No new technology has been received for update!' })
        }

        const tech: string | number = await updateATechRecord(id_tech, tech_data);

        if(typeof tech === 'number'){

            let message: string = tech === 1 ? 'Tech does not exists' : tech === 2 ? 'Registration not updated, an error occurred' : 'Unknow error';

            res.status(404).json({ message });
        }

        res.status(200).json({ message: tech });
    } catch (error: any) {
        res.status(500).json({ message: 'Internal server error: ' + error.message });
    }
}

/**
 * @UpdateDeleteStatusController -> this controller helps me to handle the change of the delete_tech
 * status field, to change from false to true, or veseversa...
 *
 * @param id_tech
 */
const toggleDeleteTechStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const id_tech: number = parseInt(id);
        const techResponse: string | number = await toggleDeleteTech(id_tech);

        if(typeof techResponse === 'number'){
            res.status(404).json({ message: 'Technology does not exists!' });
        }

        res.status(200).json({ message: techResponse });
    } catch (error: any) {
        res.status(500).json({ message: 'Internal server error: ' + error.message });
    }
}

export { getTechnologiesResponse, insertNewTechnologieResponse, updateATechRecordResponse, toggleDeleteTechStatus };