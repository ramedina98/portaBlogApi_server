/**
 * @module Courses --> In this file I have all the needed services of Courses module, which are:
 *
 * 1. @method GET --> getCourses...
 */
import { ICourse, ICourseNoResumeId } from "../interfaces/ICourses";
import { Course } from "../models/mysql/coursesModel";
import { Op } from "sequelize";
import { loggingInfo, userResumeVerifier, Iverifier } from "../utils/resumeModulesUtilF";
import logging from "../config/logging";

/**
 * @method get
 * This service helps me to reach all the information of the courses table,
 * searching with a resume id...
 *
 * @param id_resume
 *
 * There are 3 types of message of warning, as it checks if the user exists, if the
 * user has a resume attached and if any courses have already been added to that resume...
 *
 * 1 = The user does not exists...
 * 2 = The user does not have any resume attached jet...
 * 3 = Courses not found (no course has ben added)...
 */
const getCourses = async (id: string): Promise<ICourseNoResumeId[] | number> => {
    try {
        const verification: Iverifier = await userResumeVerifier(id);

        /**
         * If the id resume field is undefine, then it only returns the response number,
         * which the controller wiull already know how to handle...
         */
        if(verification.id_resume === undefined){
            return verification.num_response;
        }

        const courses: ICourse[] = await Course.findAll({
            where: {
                id_resume: {
                    [Op.eq]: verification.id_resume
                }
            },
            attributes: {
                exclude: ['id_resume']
            }
        });

        if(courses.length === 0){
            logging.warning(':::::::::::::::::::::::');
            logging.warning(`Courses not found with resume id: ${verification.id_resume}`);
            logging.warning(':::::::::::::::::::::::');
            return 3;
        }

        loggingInfo('Courses found!');

        return courses;

    } catch (error: any) {
        logging.warn('::::::::::::::::::::::::::::::::');
        logging.error('Error: ' + error.message);
        logging.warn('::::::::::::::::::::::::::::::::');
        throw error;
    }
}

export { getCourses };