/**
 * @module Schooling
 * This file contains all the necessary services to handle the module's business logic...
 *
 * @GET
 * @POST
 * @PUT
 * @PATCH
 */
import { ISchooling, ISchoolingNoIdResume, ISchoolingNoIdNoResumeId } from "../interfaces/ISchooling";
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
 * @type service
 *
 * This service helps me to insert new data in the schooling table, creating new records in it...
 *
 * @param sch_data --> this is an object array... (type = ISchoolingNoIdNoResumeId[])...
 * @returns --> if everything was created successfully it returns a message of success, and if something
 * went wrong, it returns a number, that the controllers knows how to handle and which message of error has to send to
 * the client...
 */
const insertNewSchRecords = async (id_user: string, sch_data: ISchoolingNoIdNoResumeId[]): Promise<string | number> => {
    try {
        /**
         * Check if the user exists, and if the user already exists check if they have an
         * attached resume, and then obtain the id_resume...
         * If they do not exists or they do not have an attached resume, returns an error number,
         * which the controller already knows how to handle...
         *
         * 1 = user does not exists
         * 2 = the user does not have an attached resume
         */
        const verification: Iverifier = await userResumeVerifier(id_user);

        // if the id_resume is undefine, returns the corresponding error number...
        if(verification.id_resume === undefined){
            return verification.num_response;
        }


        // transfer the value of the id resume to a variable with that name...
        const id_resume: number = verification.id_resume;
        // insert new records into the schooling table...
        const sch_result: ISchooling[] | null = await Promise.all(
            sch_data.map(async (data) => {
                const sch: ISchooling = await Schooling.create({
                    ...data,
                    id_resume
                });
                return sch;
            })
        );

        // If there is a record that was not made...
        if(sch_result.length < sch_data.length){
            logging.warning('::::::::::::::::::::::::::::::');
            logging.warning(`There were ${sch_result.length - sch_data.length} records missing`);
            logging.warning('::::::::::::::::::::::::::::::');
            return 3;
        }

        loggingInfo('All registrations were successful');

        return `All registrations were successful: ${sch_result.length}`;
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

                return `Education in ${record.career_name} updated successfully!`;
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

export { getSchoolingData, insertNewSchRecords, updateASchoolingRecord, toggleSeveralDeleteSchRecords };