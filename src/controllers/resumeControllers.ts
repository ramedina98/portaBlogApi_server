// here I have all the resume controllers...
import { Request, Response } from "express";
import { IResumeService } from "../interfaces/IResume";
import { getResume } from "../services/resumeServices";

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

export { getResumeResponse };
