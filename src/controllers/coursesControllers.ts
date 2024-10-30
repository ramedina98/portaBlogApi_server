/**
 * @module Courses
 */
import { Request, Response } from "express";
import { ICourseNoResumeId } from "../interfaces/ICourses";
import {
    getCourses,
    insertNewCourseRecord
} from "../services/coursesServices";

/**
 * @method get
 * This controller helps me to manage the get Courses Service and get data from the
 * table, data related to a specific user...
 */
const getCoursesResponse = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id_user }: { id_user: string } = req.body;

        const courses: ICourseNoResumeId[] | number = await getCourses(id_user);

        if(typeof courses === 'number'){
            let message: string = '';

            if(courses === 1){
                message = 'User does not exist';
            } else if(courses === 2){
                message = 'User does not have a resume attached jet';
            } else if(courses === 3){
                message = 'Technologies not found';
            }

            res.status(400).json({ message });
        }

        res.status(200).json({ message: 'Successfully', courses });
    } catch (error: any) {
        res.status(500).json({ message: 'Internal server error' + error.message });
    }
}

/**
 * @method post
 * This controller helps me to handle the creation of new records in the courses table...
 *
 * The frontend onle needs to send the next:
 * @reqBody courses_data
 * @reqBody id_user
 */
const insertNewCourseRecordResponse = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id_user, courses_data }: {id_user: string, courses_data: ICourseNoResumeId[] } = req.body;

        // the course data object array is empty, let the user knows...
        if(courses_data.length === 0){
            res.status(400).json({ message: 'No new courses has been received for storage!'});
        }

        const course: string | number = await insertNewCourseRecord(id_user, courses_data);

        if(typeof course === 'number'){
            let message: string = '';

            if(course === 1){
                message = 'User does not exist';
            } else if(course === 2){
                message = 'User does not have a resume attached jet';
            } else if(course === 3){
                message = 'No registration was made';
            }

            res.status(404).json({ message });
        }

        res.status(200).json({ message: course });
    } catch (error: any) {
        res.status(500).json({ message: 'Internal server error' + error.message });
    }
}

export { getCoursesResponse, insertNewCourseRecordResponse };