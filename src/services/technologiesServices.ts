/**
 * @TechnologiesServices -> This file has all the services needed to handle the
 * to handle data retrieval, update and creation for the technologies table...
 *
 * @GET
 * @POST
 * @PUT
 */
import { ITech, ITechNoResumeId } from "../interfaces/ITechnologies";
import { IUser } from "../interfaces/IUser";
import { Tech } from "../models/mysql/technologiesModel";
import { Resume } from "../models/mysql/resumeModel";
import { User } from "../models/mysql/usersModel";
import { Op } from "sequelize";
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
const getTechnologies = async (id: number): Promise<ITechNoResumeId[] | number> => {
    try {
        // I search for the user to verify that he/she exists
        const user: IUser | null = await User.findByPk(id);

        if(user === null){
            logging.warning(':::::::::::::::::::::::::');
            logging.warning('The user does not exists');
            logging.warning(':::::::::::::::::::::::::');
            return 1;
        }

        const id_resume: any = await Resume.findOne({
            where: {
                user_id: id
            },
            attributes: {
                exclude: ['user_id', 'pdf_resume', 'profile_resume', 'logo_id', 'email']
            } // I don't need all the attributes, just the id...
        });

        if(!id_resume){
            logging.warning(':::::::::::::::::::::::::');
            logging.warning(`The user ${user.name1} does not have a resume attached`);
            logging.warning(':::::::::::::::::::::::::');
            return 2;
        }

        const technologies: ITech[] = await Tech.findAll({
            where: {
                id_resume: {
                    [Op.eq]: id_resume.id_resume
                }
            },
            attributes: {
                exclude: ['id_resume']
            }
        });

        if(technologies.length === 0){
            logging.warning(':::::::::::::::::::::::');
            logging.warning(`Technologies not found with resume id: ${id_resume}`);
            logging.warning(':::::::::::::::::::::::');
            return 3;
        }

        logging.info(':::::::::::::::::::::::::::::::');
        logging.info('Technologies found!');
        logging.info(':::::::::::::::::::::::::::::::');

        return technologies;

    } catch (error: any) {
        logging.warn('::::::::::::::::::::::::::::::::');
        logging.error('Error: ' + error.message);
        logging.warn('::::::::::::::::::::::::::::::::');
        throw error;
    }
}

export { getTechnologies };