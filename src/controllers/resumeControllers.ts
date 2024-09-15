/**
 * @Controller --> In this file can find all the controllers of the endpoint resume
 * and all the elements related to it...
 * 1. Resume
 * 2. technologies
 */
import { Request, Response } from "express";
import { ICreateResume, IResumeService } from "../interfaces/IResume";
import { getIdResume, getResume, createResume, updateAResumeRecord } from "../services/resumeServices";

/**
 * @ResumeControllers ...
 */

/**
 * This controller helps me to get the id of a resume searching by user_id...
 */
const getIdResumeResponse = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.body;

        const resumeId: string | null = await getIdResume(id);

        if(resumeId === null){
            res.status(404).json({ message: 'Id not found' });
        }

        res.status(200).json({ message: 'Successfully obtained!', resumeId });
    } catch (error: any) {
        res.status(500).json({ message: 'Internal server error' + error.message });
    }
}

/**
 * this controller helps me to handle the getResume service and return
 * information related to a specific resume
 * */
const getResumeResponse = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const resumeData: IResumeService | null = await getResume(id);

        // if the response is null...
        if(resumeData === null){
            res.status(404).json({ message: 'Resume not found'});
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

        const resume: string | null = await createResume(data);

        if(resume === null){
            res.status(404).json({ message: 'Record not made!'});
        }

        res.status(200).json({ message: 'Successfully registration'});
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

export { getIdResumeResponse, getResumeResponse, createResumeResponse, updateAResumeRecordResponse };
