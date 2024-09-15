/**
 * @TechnologiesServices ...
 */
import { ITech, ITechNoResumeId } from "../interfaces/ITechnologies";
import { Tech } from "../models/mysql/technologiesModel";
import { Op } from "sequelize";
import logging from "../config/logging";

/**
 * @MethodGET -->
 * This service helps me to reach all the information of the tecnologies table,
 * searching with a resume id...
 */
const getTechnologies = async (id_resume: number): Promise<ITechNoResumeId[] | null> => {
    try {
        const technologies: ITech[] = await Tech.findAll({
            where: {
                id_resume: {
                    [Op.eq]: id_resume
                }
            },
            attributes: {
                exclude: ['id_resume']
            }
        });

        if(technologies.length === 0){
            logging.warning(':::::::::::::::::::::::');
            logging.warning(`No technologies found with resume id: ${id_resume}`);
            logging.warning(':::::::::::::::::::::::');
            return null;
        }

        return technologies;

    } catch (error: any) {
        logging.warn('::::::::::::::::::::::::::::::::');
        logging.error('Error: ' + error.message);
        logging.warn('::::::::::::::::::::::::::::::::');
        throw error;
    }
}

export { getTechnologies };