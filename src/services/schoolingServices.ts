/**
 * @module Schooling
 * This file contains all the necessary services to handle the module's business logic...
 *
 * @GET
 * @POST
 * @PUT
 * @PATCH
 */
import { ISchooling, ISchoolingNoIdResume } from "../interfaces/ISchooling";
import { Iverifier, loggingInfo } from "../utils/resumeModulesUtilF";
import { Schooling } from "../models/mysql/schoolingModel";
import { userResumeVerifier } from "../utils/resumeModulesUtilF";
import { Op } from "sequelize";
import logging from "../config/logging";

/**
 * @method GET
 *
 * This service helps me to reach all the record realted to a specific user resume in the schooling table...
 *
 * @param id --> this is the user id...
 *
 * @async --> it returns a ISchooling array object...
 */
const getSchoolingData = async (id: string): Promise<ISchoolingNoIdResume[] | number> => {
    try {
        // first I have to check if the user exisits...
        const verification: Iverifier = await userResumeVerifier(id);

        /**
         * If the id resume field is undefine, then it only returns the response number,
         * which the controller will already know how to handle it...
         */
        if(verification.id_resume === undefined){
            return verification.num_response;
        }

        /**
         * if everything is correct, I have to search all the records with that have the
         * same value in the id_resume field...
         * */
        const schooling: ISchooling[] = await Schooling.findAll({
            where: {
                id_resume: {
                    [Op.eq]: verification.id_resume
                }
            },
            attributes: {
                exclude: ['id_resume']
            }
        });

        if(schooling.length === 0){
            logging.warning(':::::::::::::::::::::::');
            logging.warning(`Schooling data not found with resume id: ${verification.id_resume}`);
            logging.warning(':::::::::::::::::::::::');
            return 3;
        }

        loggingInfo(`Schooling data found! ${schooling.length}`);

        return schooling;

    } catch (error: any) {
        logging.warn('::::::::::::::::::::::::::::::::');
        logging.error('Error: ' + error.message);
        logging.warn('::::::::::::::::::::::::::::::::');
        throw error;
    }
}

export { getSchoolingData };