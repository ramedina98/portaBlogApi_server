/**
 * @module resume
 * @Controller --> In this file can find all the controllers of the endpoint resume
 * and all the elements related to it...
 */
import { Request, Response } from "express";
import { ICreateResume, IResumeService } from "../interfaces/IResume";
import { getResume, createResume, updateAResumeRecord } from "../services/resumeServices";

/**
 * @ResumeControllers ...
 */

/**
 * this controller helps me to handle the getResume service and return
 * information related to a specific resume
 * */
const getResumeResponse = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id_user } = req.body;

        const resumeData: IResumeService | number = await getResume( id_user);

        if(typeof resumeData === 'number'){
            let message: string = '';

            if(resumeData === 1){
                message = 'User does not exist';
            } else if(resumeData === 2){
                message = 'User does not have a resume attached jet';
            } else if(resumeData === 3){
                message = 'Data not found';
            }

            res.status(404).json({ message });
        }

        res.status(200).json({ message: 'Successfully obtained!', resumeData });
    } catch (error: any) {
        res.status(500).json({ message: 'Internal server error' + error.message });
    }
}

/**
 * This controller helps me to handle the createResume service, this to
 * create a resume record for a specific user...
 */
const createResumeResponse = async (req: Request, res: Response): Promise<void> => {
    try {
        const { resumeData } = req.body;
        const data: ICreateResume = resumeData;

        const resume: string | null = await createResume(data.user_id, data);

        if(resume === null){
            res.status(404).json({ message: 'Record not made!'});
        }

        res.status(200).json({ message: resume });
    } catch (error: any) {
        res.status(500).json({ message: 'Internal server error' + error.message });
    }
}

/**
 * This controller helps me to hadle all the process to update an specesific record in the resume table...
 */
const updateAResumeRecordResponse = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id_resume, resumeData } = req.body;
        const data: ICreateResume = resumeData;

        const updateResume: string | null = await updateAResumeRecord(id_resume, data);

        if(updateResume === null){
            res.status(404).json({ message: 'Record not found!' });
        }

        res.status(200).json({ message: updateResume });
    } catch (error: any) {
        res.status(500).json({ message: 'Internal server error' + error.message });
    }
}

export { getResumeResponse, createResumeResponse, updateAResumeRecordResponse };
