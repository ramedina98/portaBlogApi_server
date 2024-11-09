/**
 * @module Courses
 */
import { Request, Response } from "express";
import { ICourseNoResumeId, ICourseNoIdAndResumeId } from "../interfaces/ICourses";
import {
    getCourses,
    insertNewCourseRecord,
    updateACourseRecord,
    toggleDeleteCourse
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

/**
 * @method PUT
 *
 * this controller helps me with the process of update a register of a cuourse...
 *
 * @reqBody courses_data
 * @reqBody id_course
 */
const updateACourseRecordResponse = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id_course, course_data }: { id_course: number, course_data: ICourseNoIdAndResumeId } = req.body;

        // if the course data object array is empty, let the client knows...
        if(!course_data){
            res.status(400).json({
                message: 'No new course has been received for update!'
            });
        }

        const course: string | number = await updateACourseRecord(id_course, course_data);

        if(typeof course === 'number'){
            let message: string = course === 1 ? 'Course does not exists' : course === 2 ? 'Registration not updated, an error occurred' : 'Unknow error';

            res.status(404).json({ message });

        }

        res.status(200).json({ message: course });
    } catch (error: any) {
        res.status(500).json({ message: `Internal server error: ${error.message}` });
    }
}

/**
 * @method PATCH
 *
 * this controller helps me with the process of change the status of the deleted courses...
 *
 * @param id_course []
 */
const toggleDeleteCourseResponse = async (req: Request, res: Response): Promise<void> => {
    try {
        const { courses_ids }: { courses_ids: number[] } = req.body;

        if(!courses_ids || courses_ids.length === 0){
            res.status(400).json({ message: "No courses IDs provided!"});
        }

        // call the function...
        const courses: string[] = await toggleDeleteCourse(courses_ids);

        // if everything went well, returns a success message...
        res.status(200).json({
            message: 'Courses records updated successfully.',
            details: courses
        });
    } catch (error: any) {
        res.status(500).json({ error: `Internal server error: ${error.message}`})
    }
}

export { getCoursesResponse, insertNewCourseRecordResponse, updateACourseRecordResponse, toggleDeleteCourseResponse };