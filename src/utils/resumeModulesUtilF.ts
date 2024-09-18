/**
 * This util file has all the necessary functions to support small tasks...
 *
 * It will be very necessary in all the modules related to resume...
 * @technologies
 * @courses
 * @schooling
 * @experience
 */
import { User } from "../models/mysql/usersModel";
import { Resume } from "../models/mysql/resumeModel";
import { IUser } from "../interfaces/IUser";
import logging from "../config/logging";

/**
 * @LogginInfo --> this util function helps me to display in a better way information with loggin info type...
 *
 * @param text
 */
const loggingInfo = (text: string): void => {
    logging.info('::::::::::::::::::::::::::::::');
    logging.info(text);
    logging.info('::::::::::::::::::::::::::::::');
}

/**
 * @UserResumeVerifier --> this util function helps me to handle the verification of the id_user, to foind out
 * if the user exist, and to check if the user has an attached resume...
 *
 * @param id_user
 */
interface Iverifier {num_response: number, id_resume?: number};
const userResumeVerifier = async (id_user: string): Promise<Iverifier> => {
    try {
        // I search for the user to verify that he/she exists
        const user: IUser | null = await User.findByPk(id_user);

        if(user === null){
            logging.warning(':::::::::::::::::::::::::');
            logging.warning('The user does not exists');
            logging.warning(':::::::::::::::::::::::::');

            return {
                num_response: 1,
                id_resume: undefined
            }
        }

        const id_resume: any = await Resume.findOne({
            where: {
                user_id: id_user
            },
            attributes: {
                exclude: ['user_id', 'pdf_resume', 'profile_resume', 'logo_id', 'email']
            } // I don't need all the attributes, just the id...
        });

        if(!id_resume){
            logging.warning(':::::::::::::::::::::::::');
            logging.warning(`The user ${user?.name1} does not have a resume attached`);
            logging.warning(':::::::::::::::::::::::::');

            return {
                num_response: 2,
                id_resume: undefined
            }
        }

        return {
            num_response: 0,
            id_resume: id_resume.id_resume
        }
    } catch (error: any) {
        logging.warn('::::::::::::::::::::::::::::::::::::::::::::::::::::::::');
        logging.error('Error verifying (user or resume): ' + error.message);
        logging.warn('::::::::::::::::::::::::::::::::::::::::::::::::::::::::');
        throw error;
    }
}

export { loggingInfo, userResumeVerifier, Iverifier };