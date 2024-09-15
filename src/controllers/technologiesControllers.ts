/**
 * @TechnologiesCotrollers ...
*/
import { Request, Response } from "express";
import { getTechnologies } from "../services/technologiesServices";
import { ITechNoResumeId } from "../interfaces/ITechnologies";

/**
 * This controller helps me to handle the service getTechnologies, and reach
 * to the technologies table data...
 */
const getTechnologiesResponse = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id_resume } = req.body;

        const technologies: ITechNoResumeId[] | null = await getTechnologies(id_resume);

        if(technologies?.length === 0){
            res.status(404).json({ message: 'Technologies not found!' });
        }

        res.status(200).json({ message: 'Successfully obteined!', technologies});
    } catch (error: any) {
        res.status(500).json({ message: 'Internal server error' + error.message });
    }
}

export { getTechnologiesResponse };