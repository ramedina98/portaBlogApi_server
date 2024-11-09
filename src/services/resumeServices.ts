/**
 * @module resume
 *
 * @Services -> All the services that can be found here are for managing updates, creating records and
 * obtaining information about the resume and all the elements related to it...
 */
import { Tech } from "../models/mysql/technologiesModel";
import { Expe } from "../models/mysql/experienceModel";
import { Course } from "../models/mysql/coursesModel";
import { Schooling } from "../models/mysql/schoolingModel";
import { Resume } from "../models/mysql/resumeModel";
import { User }  from "../models/mysql/usersModel";
import { Op } from "sequelize";
import { checkEmptyResults } from "../utils/checkEmptyResults";
import { IResume, ICreateResume, IResumeService } from "../interfaces/IResume";
import { Iverifier, loggingInfo, userResumeVerifier } from "../utils/resumeModulesUtilF";
import logging from "../config/logging";

/**
 * @ResumeServices ...
 */

/**
 * @MethodGET
 * This service helps to take the data from the tables:
 * 1. Tecnologies.
 * 2. Experience.
 * 3. Course.
 * 4. Schooling.
 *  where the main table is "Resume" and the records obtained from the other tables
 *  must be obtained with the ID of the resume to which they correspond.
 */
const getResume = async (id_user: string): Promise<IResumeService | number> => {
    try {

        const verification: Iverifier = await userResumeVerifier(id_user);

        if(verification.id_resume === undefined){
            return verification.num_response;
        }

        const [resume, technologies, experience, courses, schooling]: any = await Promise.all([
            Resume.findByPk(verification.id_resume),
            Tech.findAll({
                where: {
                    id_resume: {
                        [Op.eq]: verification.id_resume
                    }
                },
                attributes: {
                    exclude: ['id_resume']
                }
            }),
            Expe.findAll({
                where: {
                    id_resume: {
                        [Op.eq]: verification.id_resume
                    }
                },
                attributes: {
                    exclude: ['id_resume']
                }
            }),
            Course.findAll({
                where: {
                    id_resume: {
                        [Op.eq]: verification.id_resume
                    }
                },
                attributes: {
                    exclude: ['id_resume']
                }
            }),
            Schooling.findAll({
                where: {
                    id_resume: {
                        [Op.eq]: verification.id_resume
                    }
                },
                attributes: {
                    exclude: ['id_resume']
                }
            })
        ]);

        const check: boolean = checkEmptyResults([technologies, experience, courses, schooling]);

        if(check){
            logging.warning(':::::::::::::::::::');
            logging.warning('Data not found!');
            logging.warning(':::::::::::::::::::');
            return 3;
        }

        loggingInfo('Resume found!');

        return {
            resume: resume,
            technologies: technologies,
            experience: experience,
            courses: courses,
            schooling: schooling,
        }

    } catch (error: any) {
        logging.warn('::::::::::::::::::::::::::::::::');
        logging.error('Error: ' + error.message);
        logging.warn('::::::::::::::::::::::::::::::::');
        throw error;
    }
}

/**
 * @MethoPOST -->
 * this service helps me to create a new register in the resume table...
 *
 *  It is necessary to validate that the user id is valid (exists) and
 * that it does not already have a resume created, since in that case it could
 * only be edited, it cannot have more than one...
 * @CheckForUser --> verify if the user exists...
 * @checkForResume --> verify if the user have already a resume
 */
const createResume = async (id_user: string, data: ICreateResume): Promise<string | null> => {
    try {
        // check if the id_user exists...
        const checkForUser: any = await User.findByPk(id_user);

        if(!checkForUser){
            logging.warning(':::::::::::::::::::::::::::');
            logging.warning(`User deosn't exists, id: ${id_user} is wrong!`);
            logging.warning(':::::::::::::::::::::::::::');
            return `User deosn't exists, id: ${id_user} is wrong!`;
        }

        // then I verify if there is already a resume associated with the user...
        const checkForResume: any = await Resume.findOne({
            where: {
                user_id: {
                    [Op.eq]: id_user
                }
            }
        });

        if(checkForResume){
            logging.warning(':::::::::::::::::::::::::::');
            logging.warning('The user already has a resume!')
            logging.warning(':::::::::::::::::::::::::::');
            return 'There is already a resume associated with the user';
        }

        const resume: IResume = await Resume.create(data);

        if(!resume){
            logging.warning(':::::::::::::::::::::::');
            logging.warning('Record not made!');
            logging.warning(':::::::::::::::::::::::');
            return null;
        }

        loggingInfo('Successfully registered the resume');

        return 'Successfully registration';
    } catch (error: any) {
        logging.warn('::::::::::::::::::::::::::::::::');
        logging.error('Error: ' + error.message);
        logging.warn('::::::::::::::::::::::::::::::::');
        throw error;
    }
}

/**
 * This service helps me to handle the update the data of a specific record in the
 * resume table...
 */
const updateAResumeRecord = async (id: number, data: ICreateResume): Promise<string | null> => {
    try {
        const updateResume: any = await Resume.update(data, {
            where: { id_resume: {
                [Op.eq]: id
            }}
        });

        if(updateResume === 0){
            logging.warning(':::::::::::::::::::::::');
            logging.warning(`No resume found with id: ${id}`);
            logging.warning(':::::::::::::::::::::::');
            return null;
        }

        loggingInfo('Resume successfully updated!');

        return 'Resume successfully updated!';

    } catch (error: any) {
        logging.warn('::::::::::::::::::::::::::::::::');
        logging.error('Error: ' + error.message);
        logging.warn('::::::::::::::::::::::::::::::::');
        throw error;
    }
}

export { getResume, createResume, updateAResumeRecord };