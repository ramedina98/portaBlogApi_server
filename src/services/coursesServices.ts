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

/**
 * @method post
 *
 * This service helps me to create new records in the courses table...
 *
 * @param id_user
 * @param course_data --> this is an object array, that contains all the records...
 *
 * @return --> a message of success or a number indicating if an specific error, controller knows
 * how to handle the number returned...
 */
const insertNewCourseRecord = async (id_user: string, course_data: ICourseNoResumeId[]): Promise<string | number> => {
    try {
        /**
         * Check if the user exists, if the user does not exists retunr a number (1 = user does not exists), then if the user exists check if
         * they have an attached resume, if they don't have one, return an error (2 = user does not have an attached resume)...
         */
        const verification: Iverifier = await userResumeVerifier(id_user);

        // if user does not exists or the user does not have an attached resum, return an error number...
        // controller knows how to handle with the number...
        if(verification.id_resume === undefined){
            return verification.num_response;
        }

        // transfer the value of the id_resume to a number varible...
        const id_resume: number = verification.id_resume;
        // make the registers...
        const courses_results: ICourse[] | null = await Promise.all(
            course_data.map(async (data) => {
                const course: ICourse = await Course.create({
                    ...data,
                    id_resume
                });
                return course;
            })
        );

        // if there is a record that was not made...
        if(courses_results.length < course_data.length){
            logging.warning('::::::::::::::::::::::::::::::');
            logging.warning(`There were ${courses_results.length - course_data.length} records missing`);
            logging.warning('::::::::::::::::::::::::::::::');
            return 3;
        }

        loggingInfo('All registrations were successful');

        return `All registrations were successfully: ${courses_results.length}`;

    } catch (error: any) {
        logging.warn('::::::::::::::::::::::::::::::::');
        logging.error('Error: ' + error.message);
        logging.warn('::::::::::::::::::::::::::::::::');
        throw error;

    }
}

export { getCourses, insertNewCourseRecord };