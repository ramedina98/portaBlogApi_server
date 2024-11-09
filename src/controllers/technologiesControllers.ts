/**
 * @module Technologies
 *
 * This file contains all the required controllers for the technologies module...
 * @TechnologiesCotrollers ...
*/
import { Request, Response } from "express";
import { ITechNoIdNoresumeId, ITechNoResumeId } from "../interfaces/ITechnologies";
import {
    getTechnologies,
    insertNewTchRecords,
    updateATechRecord,
    toggleSeveralDeleteTechRecords
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
 * @method patch
 *
 * This controller helps me to handle the toggle several delete Tech status records, receiveing an array
 * with the ids of the records to be toggle...
 *
 * @param tech_id --> an array...
 */
const toggleSeveralDeleteTechRecordsResponse = async (req: Request, res: Response): Promise<void> => {
    try {
        const { tech_ids }: { tech_ids: number[] } = req.body;

        if(!tech_ids || tech_ids.length === 0){
            res.status(400).json({ message: "No tecnologies IDs provided!"});
        }

        // call the function...
        const tech: string[] = await toggleSeveralDeleteTechRecords(tech_ids);

        // if everything is ok, returns a success response
        res.status(200).json({ message: 'Technologies records updated successfully', details: tech });
    } catch (error: any) {
        res.status(500).json({ message: 'Internal server error: ' + error.message });
    }
}

export { getTechnologiesResponse, insertNewTechnologieResponse, updateATechRecordResponse, toggleSeveralDeleteTechRecordsResponse};