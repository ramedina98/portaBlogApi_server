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
    insertNewSchRecords,
    updateASchoolingRecord,
    toggleSeveralDeleteSchRecords
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
        const { id }: { id: string }= req.body;

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
        const { id, schooling_data }: {id: string, schooling_data: ISchoolingNoIdResume[]} = req.body;

        if(schooling_data.length === 0){
            res.status(400).json({ message: 'No data was provided' });
        }

        const schooling: string | number  = await insertNewSchRecords(id, schooling_data);

        if(typeof schooling === 'number'){
            let message: string = '';

            if(schooling === 1){
                message = 'User does not exist';
            } else if(schooling === 2){
                message = 'User does not have a resume attached jet';
            } else if(schooling === 3){
                message = 'Some records could not be entered into the schooling table';
            }

            res.status(404).json({ message });
        }

        res.status(200).json({ message: schooling });
    } catch (error:any) {
        res.status(500).json({ message: `Internal server error ${error.message}` });
    }
}

/**
 * @method PUT
 *
 * This controller helps me to handle the update a schooling record service, which update the info of a
 * rercord in the schooling table...
 *
 * @param id_sch
 * @param data_sch
 */
const updateASchoolingRecordResponse = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id_sch, data_sch }: { id_sch: number, data_sch: ISchoolingNoIdResume }= req.body;

        const sch: string | number = await updateASchoolingRecord(id_sch, data_sch);

        if(typeof sch === 'number'){
            const message = sch === 1 ? `Schooling record does not exists with id: ${id_sch}` :
            sch === 2 ? 'Any schooling record was not update!' : 'Unknow error!';

            res.status(404).json({ message });
        }

        res.status(200).json({ message: sch });
    } catch (error: any) {
        res.status(500).json({ message: 'Internal server error: ' + error.message })
    }
}

/**
 * @method PATCH
 *
 * This controller helps me to handle the toggle several delete sch status records, receiveing an array
 * with the ids of the records to be toggled...
 *
 * @param sch_ids --> an array
 */
const toggleSeveralDeleteSchRecordsResponse = async (req: Request, res: Response): Promise<void> => {
    try {
        const { sch_ids }: { sch_ids: number[] } = req.body;

        if(!sch_ids || sch_ids.length === 0){
            res.status(400).json({ message: 'No schooling IDs provided' });
        }

        // call the function...
        const sch: string[] = await toggleSeveralDeleteSchRecords(sch_ids);

        // if evrything is ok, returns a success response...
        res.status(200).json({ message: 'Schooling records updated successfully.', details: sch });

    } catch (error: any) {
        res.status(500).json({ message: 'Internal server error: ' + error.message });
    }
}

export { getSchoolingDataResponse, insertNewSchoolingDataResponse, updateASchoolingRecordResponse, toggleSeveralDeleteSchRecordsResponse };