/**
 * @TechnologiesServices -> This file has all the services needed to handle the
 * to handle data retrieval, update and creation for the technologies table...
 *
 * @GET
 * @POST
 * @PUT
 */
import { ITech, ITechNoResumeId, ITechNoIdNoresumeId, ITechNoId } from "../interfaces/ITechnologies";
import { Tech } from "../models/mysql/technologiesModel";
import { Op } from "sequelize";
import { loggingInfo, userResumeVerifier, Iverifier} from "../utils/resumeModulesUtilF";
import logging from "../config/logging";

/**
 * @MethodGET -->
 * This service helps me to reach all the information of the tecnologies table,
 * searching with a resume id...
 *
 * @param id_resume
 *
 * There are 3 types of message of warning, as it checks if the user exists, if the
 * user has a resume attached and if any techs have already been added to that resume.
 *
 * 1 = The user does not exists...
 * 2 = The user does not have any resume attached jet...
 * 3 = Technologies not foud (No tech has been added to the user's resume yet).
 */
const getTechnologies = async (id: string): Promise<ITechNoResumeId[] | number> => {
    try {
        const verification: Iverifier = await userResumeVerifier(id);

        /**
         * If the id resume field is undefine, then it only returns the response number,
         * which the controller will already know how to handle...
         */
        if(verification.id_resume === undefined){
            return verification.num_response;
        }

        const technologies: ITech[] = await Tech.findAll({
            where: {
                id_resume: {
                    [Op.eq]: verification.id_resume
                }
            },
            attributes: {
                exclude: ['id_resume']
            }
        });

        if(technologies.length === 0){
            logging.warning(':::::::::::::::::::::::');
            logging.warning(`Technologies not found with resume id: ${verification.id_resume}`);
            logging.warning(':::::::::::::::::::::::');
            return 3;
        }

        loggingInfo('Technologies found!');

        return technologies;

    } catch (error: any) {
        logging.warn('::::::::::::::::::::::::::::::::');
        logging.error('Error: ' + error.message);
        logging.warn('::::::::::::::::::::::::::::::::');
        throw error;
    }
}

/**
 * @MethodPOST -> insertNewTechnologie
 * This service helps me to create a new record in the technologies table...
 *
 * @param tech_data
 *
 * @messages -> to handle error or warnings...
 */
const insertNewTechnologie = async (id_user: string , data: ITechNoIdNoresumeId): Promise<string | number> => {
    try {
        const verification: Iverifier = await userResumeVerifier(id_user);

        /**
         * If the id resume field is undefine, then it only returns the response number,
         * which the controller will already know how to handle...
         */
        if(verification.id_resume === undefined){
            return verification.num_response;
        }

        const newData: ITechNoId = {
            name_tech: data.name_tech,
            icon_tech: data.icon_tech,
            id_resume: verification.id_resume
        }

        // make the new register...
        const tech: ITech | null = await Tech.create(newData);

        if(!tech){
            logging.warning(':::::::::::::::::::::::::');
            logging.warning('No registration was made');
            logging.warning(':::::::::::::::::::::::::');
            return 3;
        }

        loggingInfo('Successfully registration!');

        return 'Successfully registration';
    } catch (error: any) {
        logging.warn('::::::::::::::::::::::::::::::::');
        logging.error('Error: ' + error.message);
        logging.warn('::::::::::::::::::::::::::::::::');
        throw error;
    }
}

export { getTechnologies, insertNewTechnologie};