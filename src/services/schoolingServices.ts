/**
 * @module Schooling
 * This file contains all the necessary services to handle the module's business logic...
 *
 * @GET
 * @POST
 * @PUT
 * @PATCH
 */
import { ISchooling, ISchoolingNoIdResume, ISchoolingNoId, ISchoolingNoIdNoResumeId } from "../interfaces/ISchooling";
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

/**
 * @method POST
 *
 * This service helps me to create a new register in the schooling table...
 *
 * @param id
 * @param schooling_data
 *
 * @async
 * @returns a message of success, or a number which will be handle for its controller to let the user knows the problem...
 */
const insertNewSchoolingData = async (id: string, schooling_data: ISchoolingNoIdResume): Promise<string | number> => {
    try {
        // check if the user exists, and check if the user has an attached resume...
        const verification: Iverifier = await userResumeVerifier(id);

        /**
         * If the id resume field is undefine, then it only returns the response number,
         * which the controller will already know how to handle it...
         */
        if(verification.id_resume === undefined){
            return verification.num_response;
        }

        // create a new object with the required fields to create a new record in the table...
        const NewSchoolingData: ISchoolingNoId = {
            career_name: schooling_data.career_name,
            university_nam: schooling_data.university_nam,
            start_date: schooling_data.start_date,
            end_date: schooling_data.end_date,
            delete_schooling: schooling_data.delete_schooling,
            id_resume: verification.id_resume
        }

        const schInsert: ISchooling | null= await Schooling.create(NewSchoolingData);

        if(!schInsert){
            logging.warning(':::::::::::::::::::::::::');
            logging.warning('No registration was made');
            logging.warning(':::::::::::::::::::::::::');
            return 3;
        }

        loggingInfo(`Successfully registration of ${schInsert.career_name}!`);

        return `Successfully registration of ${schInsert.career_name}!`;
    } catch (error: any) {
        logging.warn('::::::::::::::::::::::::::::::::');
        logging.error('Error: ' + error.message);
        logging.warn('::::::::::::::::::::::::::::::::');
        throw error;
    }
}

/**
 * @method PUT
 *
 * This service helps me to update an specific record in the schooling table...
 *
 * @param id_shcooling
 * @param data_sch
 *
 * @async
 * @returns It returns a message of succssess or a number, that the controller knows what it means (warning message)
 */
const updateASchoolingRecord = async (id_sch: number, data_sch: ISchoolingNoIdNoResumeId): Promise<string | number> => {
    try {
        // check if the schooling record exists...
        const sch: ISchooling | null = await Schooling.findByPk(id_sch);

        if(!sch){
            logging.warning('::::::::::::::::::::::::::::::::::::');
            logging.warning(`Schooling record does not exists with id: ${id_sch}`);
            logging.warning('::::::::::::::::::::::::::::::::::::');
            return 1;
        }

        // if everything is ok, update the record...
        const schooling: any = await Schooling.update({
            career_name: data_sch.career_name,
            university_nam: data_sch.university_nam,
            start_date: data_sch.start_date,
            end_date: data_sch.end_date,
            delete_schooling: data_sch.delete_schooling,
            id_resume: sch.id_resume
        },{
            where: {
                id_sch
            }
        });

        if(schooling.length === 0){
            logging.warning('::::::::::::::::::::::::::::::::::::');
            logging.warning(`Any schooling record was not update!`);
            logging.warning('::::::::::::::::::::::::::::::::::::');
            return 2;
        }

        loggingInfo(`The "${data_sch.career_name}" record was update successfuly!`);

        return `The "${data_sch.career_name}" record was update successfuly!`;
    } catch (error: any) {
        logging.warn('::::::::::::::::::::::::::::::::');
        logging.error('Error: ' + error.message);
        logging.warn('::::::::::::::::::::::::::::::::');
        throw error;
    }
}

/**
 * @method PATCH
 *
 * This service helps me to toggle the "delete_schooling" filed, from false to true and veseversa...
 *
 * @param id_sch
 */
const toggleDeleteSchoolingStatus = async (id_sch: number): Promise<string | number> => {
    try {
        // check if the schooling data record exists...
        const sch: any = await Schooling.findByPk(id_sch);

        if(!sch){
            logging.warning('::::::::::::::::::::::::::::::::::::');
            logging.warning(`Schooling record does not exists with id: ${id_sch}`);
            logging.warning('::::::::::::::::::::::::::::::::::::');
            return 1;
        }

        // change the status...
        const newStatus: boolean = !sch.delete_schooling;
        // update the delete_schooling status...
        await sch.update({ delete_schooling: newStatus });

        loggingInfo(`Delete status updated successfuly: ${sch.name_tech}`);

        return `Delete status updated successfuly: ${sch.name_tech}`;
    } catch (error: any) {
        logging.warn('::::::::::::::::::::::::::::::::');
        logging.error('Error: ' + error.message);
        logging.warn('::::::::::::::::::::::::::::::::');
        throw error;
    }
}

/**
 * @method PATCH
 *
 * This service helps me to toggle the status of the delete_schooling, of several records...
 *
 * @param sch_ids --> this is an array which contains all the ids of the records that have to be toggled
 */
const toggleSeveralDeleteSchRecords = async (sch_ids: number[]): Promise<string[]> => {
    try {
        // check if the schooling records exists and update them...
        const checkSchRecords: any = await Promise.all(
            sch_ids.map(async (id) => {
                const record: any = await Schooling.findByPk(id); // search each record by its id...
                if(!record) {
                    logging.warning('::::::::::::::::::::::::::::::::::::::::::::::::::::');
                    logging.warning(`Schooling record with id ${id} does not exists.`);
                    logging.warning('::::::::::::::::::::::::::::::::::::::::::::::::::::');
                    throw new Error(`Schooling record with id ${id} does not exists.`);
                }
                //toggle the delete status...
                const newStatus: boolean = !record.delete_schooling;
                await record.update({ delete_schooling: newStatus });

                loggingInfo(`Record with id ${id} updated successfully!`);

                return `Education in "${record.career_name}" updated successfully!`;
            })
        );

        loggingInfo(`All records updated successfully: ${checkSchRecords.join(',')}`);

        return checkSchRecords;
    } catch (error: any) {
        logging.warn('::::::::::::::::::::::::::::::::');
        logging.error('Error: ' + error.message);
        logging.warn('::::::::::::::::::::::::::::::::');
        throw error;
    }
}

export { getSchoolingData, insertNewSchoolingData, updateASchoolingRecord, toggleDeleteSchoolingStatus, toggleSeveralDeleteSchRecords };