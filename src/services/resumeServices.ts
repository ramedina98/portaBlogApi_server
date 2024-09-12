/**
 * @service ->
 * Here we have all the require services to handle the resume endpoints...
 */
import { Tech } from "../models/mysql/technologiesModel";
import { Expe } from "../models/mysql/experienceModel";
import { Course } from "../models/mysql/coursesModel";
import { Schooling } from "../models/mysql/schoolingModel";
import { Resume } from "../models/mysql/resumeModel";
import { Op } from "sequelize";
import { checkEmptyResults } from "../utils/checkEmptyResults";
import {
    // ITech,
    // IExperience,
    // Position,
    // TypeExpe,
    // ICourse,
    //ISchooling,
    // IResume,
    IResumeService
} from "../interfaces/IResume";
import logging from "../config/logging";

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
const getResume = async (id: string): Promise<IResumeService | null> => {
    try {
        const resume: any = await Resume.findByPk(id);

        if(!resume){
            logging.warning('Resume not found!');
            return null;
        }

        const [technologies, experience, courses, schooling]: any = await Promise.all([
            Tech.findAll({
                where: {
                    id_resume: {
                        [Op.eq]: id
                    }
                }
            }),
            Expe.findAll({
                where: {
                    id_expe: {
                        [Op.eq]: id
                    }
                }
            }),
            Course.findAll({
                where: {
                    id_course: {
                        [Op.eq]: id
                    }
                }
            }),
            Schooling.findAll({
                where: {
                    id_sch: {
                        [Op.eq]: id
                    }
                }
            })
        ]);

        const check: boolean = checkEmptyResults([technologies, experience, courses, schooling]);

        if(check){
            logging.warning('Data not found!');
            return null;
        }

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

export { getResume };