/**
 * @module schooling
 *
 * This file contains all the needed controllers to handle all the functions of the schooling's module...
 *
 * @get
 * @post
 * @put
 * @patch --> this method helps me to simulate the action of delete a record of the schooling
 * table, but it gonna be inactive...
 */
import { Request, Response } from "express";
import { ISchoolingNoIdResume } from "../interfaces/ISchooling";
import {
    getSchoolingData,
    insertNewSchoolingData
} from "../services/schoolingServices";

/**
 * @method GET
 * This controller helps me to handle the getSchoolingData service, to reach all the records related to a specific
 * user resume id...
 *
 * @param id --> id_user...
 */
const getSchoolingDataResponse = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.body;

        const schooling: ISchoolingNoIdResume[] | number = await getSchoolingData(id);

        if(typeof schooling === 'number'){
            let message: string = '';

            if(schooling === 1){
                message = 'User does not exist';
            } else if(schooling === 2){
                message = 'User does not have a resume attached jet';
            } else if(schooling === 3){
                message = 'Schooling data not found';
            }

            res.status(404).json({ message });
        }

        res.status(200).json({ message: 'Schooling data obtained successfuly', schooling });
    } catch (error:any) {
        res.status(500).json({ message: `Internal server error ${error.message}` });
    }
}

/**
 * @method POST
 *
 * this controller helps me to handle the insert new record service, and create a new record in the
 * schooling table...
 *
 * @param id --> id user...
 * @param schooling_data -->
 */
const insertNewSchoolingDataResponse = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id, schooling_data } = req.body;

        const schooling: string | number = await insertNewSchoolingData(id, schooling_data);

        if(typeof schooling === 'number'){
            let message: string = '';

            if(schooling === 1){
                message = 'User does not exist';
            } else if(schooling === 2){
                message = 'User does not have a resume attached jet';
            } else if(schooling === 3){
                message = 'Unable to register';
            }

            res.status(404).json({ message });
        }

        res.status(200).json({ message: 'Successfuly registration of schooling data' });
    } catch (error:any) {
        res.status(500).json({ message: `Internal server error ${error.message}` });
    }
}

export { getSchoolingDataResponse, insertNewSchoolingDataResponse };